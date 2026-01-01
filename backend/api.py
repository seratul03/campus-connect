# backend/api.py
from ai_engine import calculate_similarity
from ats_engine import evaluate_ats  # New: Enhanced ATS checker
import json
import random
import os
import re
import tempfile
import pdfplumber
import docx

# --- HELPERS ---
def load_data(file):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Special handling for jobs - read from individual files
    if file == "jobs.json":
        # Prefer a single combined jobs.json if present
        jobs_file = os.path.join(base_dir, "data", "jobs.json")
        jobs = []
        if os.path.exists(jobs_file):
            try:
                with open(jobs_file, "r", encoding="utf-8") as f:
                    jobs = json.load(f) or []
            except Exception as e:
                print(f"Error reading jobs.json: {e}")

        # Fallback to reading individual job files from the jobs/ folder
        # If a combined jobs.json wasn't present or was empty, fall back to individual job files
        jobs_dir = os.path.join(base_dir, "data", "jobs")
        if not jobs:
            jobs = []
        if os.path.exists(jobs_dir):
            for filename in os.listdir(jobs_dir):
                if filename.endswith('.json'):
                    filepath = os.path.join(jobs_dir, filename)
                    try:
                        with open(filepath, "r", encoding="utf-8") as f:
                            job = json.load(f)
                            jobs.append(job)
                    except Exception as e:
                        print(f"Error reading {filename}: {e}")
        
        # NOTE: Individual job files (backend/data/jobs/) take priority
        # Admin jobs file is only checked for jobs NOT in individual files
        try:
            admin_file = os.path.abspath(os.path.join(base_dir, "..", "admin", "jobs_admin.json"))
            if os.path.exists(admin_file):
                with open(admin_file, "r", encoding="utf-8") as f:
                    admin_jobs = json.load(f) or []

                if isinstance(admin_jobs, list) and admin_jobs:
                    # Build set of existing job IDs from individual files
                    existing_ids = {str(j.get('id')) for j in jobs if j.get('id')}
                    
                    # Only add admin jobs that DON'T have individual files
                    for aj in admin_jobs:
                        aj_id = str(aj.get('id')) if aj.get('id') else None
                        if aj_id and aj_id not in existing_ids:
                            jobs.append(aj)
        except Exception as e:
            print(f"Error reading admin jobs file: {e}")

        # ensure consistent ordering by numeric id when possible
        try:
            jobs.sort(key=lambda x: int(x.get('id', 0)))
        except Exception:
            pass

        return jobs
    
    # For other files, use the original logic
    path = os.path.join(base_dir, "data", file)
    with open(path) as f:
        return json.load(f)

def extract_pdf(path):
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            t = page.extract_text()
            if t:
                text += t + "\n"
    return text

def extract_docx(path):
    doc = docx.Document(path)
    return "\n".join(p.text for p in doc.paragraphs)

def analyze_resume_text(text, jd_text):
    score = 50
    recs = []
    
    # 1. Word Count Check
    words = re.findall(r"\w+", text)
    if len(words) < 200:
        score -= 10
        recs.append("Resume is too short (under 200 words). Add more details.")
    elif len(words) > 1000:
        score -= 5
        recs.append("Resume is quite long. Try to keep it concise.")

    # 2. Contact Info Check
    email_re = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")
    phone_re = re.compile(r"\b\d{10}\b")
    
    emails = email_re.findall(text)
    phones = phone_re.findall(text)

    if not emails:
        score -= 10
        recs.append("Critical: No email address found.")
    if not phones:
        score -= 5
        recs.append("Warning: No 10-digit phone number found.")

    # 3. Keyword Matching (Basic Check)
    # We keep this to reward explicit mentions of key skills
    default_skills = ["python", "java", "sql", "javascript", "react", "communication", "leadership", "analysis"]
    found_keywords = [k for k in default_skills if k.lower() in text.lower()]
    score += len(found_keywords) * 3

    # 4. AI Semantic JD Matching (The Upgrade)
    match_percentage = 0
    
    if jd_text:
        # Use the AI engine to get semantic similarity
        # This handles synonyms (e.g. "ML" matching "Machine Learning")
        match_percentage = calculate_similarity(text, jd_text)

        # Weighted score calculation
        # Base score (structure/keywords) counts for 40%
        # Content match (AI score) counts for 60%
        score = int((score * 0.4) + (match_percentage * 0.6))
        
        if match_percentage < 40:
            recs.append("Low semantic match with Job Description. Try adding more relevant context and industry terms.")
        elif match_percentage >= 85:
            recs.append("Excellent match! Your resume is highly relevant to this job.")

    # Cap score at 100
    score = min(100, max(0, score))

    return {
        "ats_score": score,
        "match_percentage": match_percentage,
        "found_keywords": found_keywords,
        "feedback": recs if recs else ["Great resume! Looks well formatted."],
        "jd_matches": [] # Semantic search doesn't return exact word matches list
    }

# --- EXPORTED FUNCTIONS ---

def get_jobs():
    return load_data("jobs.json")

def get_internships():
    return load_data("internships.json")

def ats_check(file_storage, jd_text=""):
    """
    Enhanced ATS Check with comprehensive semantic analysis
    Uses both legacy logic (for backward compatibility) and new ATS engine
    """
    # Save to a temporary file to read it
    ext = file_storage.filename.split(".")[-1].lower()
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}") as temp:
        file_storage.save(temp.name)
        temp_path = temp.name

    try:
        text = ""
        if "pdf" in ext:
            text = extract_pdf(temp_path)
        elif "doc" in ext:
            text = extract_docx(temp_path)
        else:
            return {"error": "Unsupported file format. Use PDF or DOCX."}
        
        # If no JD provided, return basic analysis only
        if not jd_text or len(jd_text.strip()) < 50:
            return analyze_resume_text(text, jd_text)
        
        # Enhanced ATS Analysis (New)
        ats_result = evaluate_ats(text, jd_text)
        
        # If there's an error in ATS engine, fall back to legacy
        if "error" in ats_result:
            return analyze_resume_text(text, jd_text)
        
        # Get basic metrics from legacy function for additional context
        legacy_result = analyze_resume_text(text, jd_text)
        
        # Merge results: Use new ATS scores, keep legacy feedback
        enhanced_result = {
            **ats_result,  # All new ATS metrics
            "feedback": legacy_result.get("feedback", []),  # Keep helpful feedback
            "found_keywords": legacy_result.get("found_keywords", [])  # Keep keyword list
        }
        
        return enhanced_result
        
    except Exception as e:
        return {"error": str(e)}
    finally:
        # Clean up temp file
        if os.path.exists(temp_path):
            os.remove(temp_path)

def match_jobs(student_skills):
    jobs = get_jobs()
    results = []
    
    # Convert student skills list to a single string for the AI
    # e.g. "Python DSA HTML"
    student_profile_text = " ".join(student_skills)
    
    for job in jobs:
        # CRITICAL: Use stored short_required_skills for display (NO AI at runtime)
        # These were pre-computed when admin added the job
        display_skills = job.get("short_required_skills", [])
        
        # Fallback: if short_required_skills missing, use required_skills (limited)
        if not display_skills:
            job_skills = []
            for field in ['required_skills', 'skills', 'skills_and_qualifications', 'qualifications', 'technical_expertise']:
                if field in job and job[field]:
                    if isinstance(job[field], list):
                        job_skills = job[field]
                        break
                    elif isinstance(job[field], str):
                        job_skills = [s.strip() for s in job[field].split(',')]
                        break
            display_skills = job_skills[:5]  # Limit to 5 max
        
        # Handle missing description
        description = job.get('description', '') or job.get('role_description', '') or ''
        if isinstance(description, list):
            description = ' '.join(description)
        
        # Create a rich text representation of the job for AI matching
        skills_text = ' '.join(display_skills) if display_skills else ''
        job_text = f"{job.get('role', '')} at {job.get('company', '')}. Requires {skills_text}. {description}"
        
        # Calculate Match using AI (semantic similarity for ranking)
        perc = calculate_similarity(student_profile_text, job_text)
        
        # Identify missing skills based on SHORT list only (3-5 skills)
        # This shows students ONLY the core skills they're missing
        req_set = set(k.lower() for k in display_skills) if display_skills else set()
        stu_set = set(k.lower() for k in student_skills)
        missing = list(req_set - stu_set)
        
        # Limit missing skills display to 5 maximum
        missing = missing[:5]
        
        results.append({
            "company": job.get("company", "Unknown"),
            "role": job.get("role", "Unknown Position"),
            "match_percentage": int(perc), # AI Score
            "missing_skills": missing      # Only core missing skills (3-5 max)
        })
        
    # Return sorted by best AI match
    return sorted(results, key=lambda x: x['match_percentage'], reverse=True)
