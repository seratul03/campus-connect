import os
import json
from typing import List, Dict, Any
import sys

# Add parent directory to path for skill_extractor import
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from skill_extractor import extract_short_skills
from job_formatter import format_job_description


def _jobs_directory() -> str:
    # backend/admin -> go up one level to backend, then data/jobs/
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base, "data", "jobs")


def get_jobs() -> List[Dict[str, Any]]:
    """Load all jobs from individual JSON files in data/jobs/ directory."""
    jobs_dir = _jobs_directory()
    jobs = []
    
    if not os.path.exists(jobs_dir):
        return []
    
    try:
        for filename in os.listdir(jobs_dir):
            if filename.endswith('.json'):
                filepath = os.path.join(jobs_dir, filename)
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        job = json.load(f)
                        jobs.append(job)
                except Exception as e:
                    print(f"Error reading {filename}: {e}")
                    continue
    except Exception as e:
        print(f"Error listing jobs directory: {e}")
        return []
    
    # Sort by id for consistent ordering
    jobs.sort(key=lambda x: int(x.get('id', 0)))
    return jobs


def save_job_file(job: Dict[str, Any]) -> None:
    """Save a single job as an individual JSON file."""
    jobs_dir = _jobs_directory()
    # ensure directory exists
    os.makedirs(jobs_dir, exist_ok=True)
    
    job_id = job.get('id')
    if not job_id:
        raise ValueError("Job must have an id")
    
    filename = f"job_{job_id}.json"
    filepath = os.path.join(jobs_dir, filename)
    
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(job, f, indent=2, ensure_ascii=False)


def add_job(job: Dict[str, Any]) -> Dict[str, Any]:
    """Validate and append a job to data/jobs.json.

    Returns the saved job object or a dict with an "error" key.
    """
    required_fields = [
        "company",
        "role",
        "ctc",
        "location",
        "experience",
        "employment_type",
        "required_skills",
        "eligibility",
        "description",
    ]

    missing = [f for f in required_fields if not job.get(f)]
    if missing:
        return {"error": "Missing fields: " + ", ".join(missing)}

    jobs = get_jobs()

    # ID handling: if client provides `id`, ensure not duplicate; otherwise auto-increment numeric id
    if job.get("id"):
        # keep as provided but check uniqueness
        if any(str(j.get("id")) == str(job.get("id")) for j in jobs):
            return {"error": "Job id already exists"}
        new_id = job.get("id")
    else:
        maxid = 0
        for j in jobs:
            try:
                mid = int(j.get("id", 0))
                if mid > maxid:
                    maxid = mid
            except Exception:
                continue
        new_id = maxid + 1

    job["id"] = new_id

    # Normalize required_skills into a list
    rs = job.get("required_skills")
    if isinstance(rs, str):
        job["required_skills"] = [s.strip() for s in rs.split(",") if s.strip()]
    elif isinstance(rs, list):
        job["required_skills"] = [str(s).strip() for s in rs if str(s).strip()]
    else:
        job["required_skills"] = [str(rs)]

    # CRITICAL: Extract short skills using AI (runs ONCE here)
    # This is stored persistently and NEVER recomputed at runtime
    try:
        short_skills = extract_short_skills(job, force=False)
        job["short_required_skills"] = short_skills
    except Exception as e:
        print(f"Skill extraction failed for job {job.get('id')}: {e}")
        # Fallback to first 5 required_skills
        job["short_required_skills"] = job["required_skills"][:5]

    # DISABLED: Job description formatter (google/flan-t5-base paused)
    # Uncomment the block below to re-enable AI-powered description formatting
    # 
    # try:
    #     format_job_description(job)
    #     print(f"✓ Job description formatted for job {job.get('id')}")
    # except Exception as e:
    #     print(f"⚠ Job description formatting failed for job {job.get('id')}: {e}")
    #     if "formatted_description" not in job:
    #         job["formatted_description"] = job.get("description", "")
    
    # Ensure field exists even when formatter is disabled
    if "formatted_description" not in job:
        job["formatted_description"] = job.get("description", "")

    # Save as individual file
    try:
        save_job_file(job)
    except Exception as e:
        return {"error": f"Failed to save job: {e}"}

    return job


def delete_job(job_id: Any) -> Dict[str, Any]:
    """Delete a job by removing its JSON file. Returns deleted job or {"error": ...}."""
    jobs_dir = _jobs_directory()
    jid = str(job_id)
    filename = f"job_{jid}.json"
    filepath = os.path.join(jobs_dir, filename)
    
    if not os.path.exists(filepath):
        return {"error": "Job not found"}
    
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            removed = json.load(f)
        os.remove(filepath)
        return removed
    except Exception as e:
        return {"error": f"Failed to delete job: {e}"}
