# backend/ats_engine.py
"""
AI-Powered ATS Checker Module
Uses all-MiniLM-L6-v2 for semantic similarity analysis
Stateless and reusable - does NOT modify existing AI models
"""

import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModel
import re
from typing import Dict, List, Tuple

# Load ATS-specific model (all-MiniLM-L6-v2)
# This reuses the same model architecture but is dedicated to ATS analysis
print("Loading ATS Semantic Model...")
ats_tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
ats_model = AutoModel.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
print("✅ ATS Model Ready")


def _mean_pooling(model_output, attention_mask):
    """Helper: Convert token embeddings to sentence embedding"""
    token_embeddings = model_output.last_hidden_state
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)


def _get_embedding(text: str):
    """Generate semantic embedding for text"""
    encoded = ats_tokenizer(text, padding=True, truncation=True, max_length=512, return_tensors='pt')
    with torch.no_grad():
        output = ats_model(**encoded)
    embedding = _mean_pooling(output, encoded['attention_mask'])
    return F.normalize(embedding, p=2, dim=1)


def _semantic_similarity(text1: str, text2: str) -> float:
    """Calculate cosine similarity between two texts (0-100)"""
    if not text1 or not text2:
        return 0.0
    
    emb1 = _get_embedding(text1)
    emb2 = _get_embedding(text2)
    
    similarity = torch.nn.functional.cosine_similarity(emb1, emb2)
    return float(similarity) * 100


def _extract_sections(resume_text: str) -> Dict[str, str]:
    """Extract key sections from resume using pattern matching"""
    sections = {
        'skills': '',
        'experience': '',
        'projects': '',
        'education': ''
    }
    
    # Normalize text
    text = resume_text.lower()
    
    # Try to find skills section
    skills_pattern = r'(skills?|technical skills?|expertise)(.*?)(?=experience|education|projects?|\Z)'
    skills_match = re.search(skills_pattern, text, re.DOTALL)
    if skills_match:
        sections['skills'] = skills_match.group(2).strip()
    
    # Try to find experience section
    exp_pattern = r'(experience|work experience|employment)(.*?)(?=education|projects?|skills?|\Z)'
    exp_match = re.search(exp_pattern, text, re.DOTALL)
    if exp_match:
        sections['experience'] = exp_match.group(2).strip()
    
    # Try to find projects section
    proj_pattern = r'(projects?|academic projects?)(.*?)(?=experience|education|skills?|\Z)'
    proj_match = re.search(proj_pattern, text, re.DOTALL)
    if proj_match:
        sections['projects'] = proj_match.group(2).strip()
    
    # Try to find education section
    edu_pattern = r'(education|academic background)(.*?)(?=experience|projects?|skills?|\Z)'
    edu_match = re.search(edu_pattern, text, re.DOTALL)
    if edu_match:
        sections['education'] = edu_match.group(2).strip()
    
    # Fallback: if sections not found, use full text for each
    if not any(sections.values()):
        sections = {
            'skills': resume_text[:500],
            'experience': resume_text,
            'projects': resume_text,
            'education': resume_text[:300]
        }
    
    return sections


def _extract_jd_requirements(jd_text: str) -> Tuple[List[str], List[str]]:
    """Extract mandatory and nice-to-have requirements from JD"""
    jd_lower = jd_text.lower()
    
    mandatory = []
    nice_to_have = []
    
    # Look for mandatory indicators
    mandatory_patterns = [
        r'required(?:\s+skills?)?:?\s*([^\n]+)',
        r'must have:?\s*([^\n]+)',
        r'essential:?\s*([^\n]+)',
        r'minimum qualifications?:?\s*([^\n]+)'
    ]
    
    for pattern in mandatory_patterns:
        matches = re.findall(pattern, jd_lower)
        mandatory.extend(matches)
    
    # Look for nice-to-have indicators
    nice_patterns = [
        r'preferred:?\s*([^\n]+)',
        r'nice to have:?\s*([^\n]+)',
        r'bonus:?\s*([^\n]+)',
        r'plus:?\s*([^\n]+)'
    ]
    
    for pattern in nice_patterns:
        matches = re.findall(pattern, jd_lower)
        nice_to_have.extend(matches)
    
    # If no explicit sections, split JD into parts
    if not mandatory:
        # First half is likely mandatory
        mid = len(jd_text) // 2
        mandatory = [jd_text[:mid]]
        nice_to_have = [jd_text[mid:]]
    
    return mandatory, nice_to_have


def _detect_role_level(resume_text: str, jd_text: str) -> Dict[str, int]:
    """Analyze resume fit for different role levels"""
    resume_lower = resume_text.lower()
    
    # Experience indicators
    years_match = re.findall(r'(\d+)\+?\s*(?:years?|yrs?)', resume_lower)
    years = [int(y) for y in years_match]
    max_years = max(years) if years else 0
    
    # Role level keywords
    intern_keywords = ['intern', 'learning', 'coursework', 'student', 'academic project']
    junior_keywords = ['junior', '1 year', '2 year', 'entry level', 'associate']
    mid_keywords = ['3 years', '4 years', '5 years', 'mid level', 'senior', 'lead']
    
    intern_count = sum(1 for kw in intern_keywords if kw in resume_lower)
    junior_count = sum(1 for kw in junior_keywords if kw in resume_lower)
    mid_count = sum(1 for kw in mid_keywords if kw in resume_lower)
    
    # Semantic matching with role descriptions
    intern_desc = "entry level intern position fresh graduate learning on the job"
    junior_desc = "junior developer 1-2 years experience entry level professional"
    mid_desc = "mid level engineer 3-5 years experience technical lead senior developer"
    
    intern_score = _semantic_similarity(resume_text[:500], intern_desc)
    junior_score = _semantic_similarity(resume_text[:500], junior_desc)
    mid_score = _semantic_similarity(resume_text[:500], mid_desc)
    
    # Combine heuristics and semantic scores
    return {
        'intern': min(100, int(intern_score * 0.7 + intern_count * 5 + (10 if max_years == 0 else 0))),
        'junior': min(100, int(junior_score * 0.7 + junior_count * 5 + (15 if 0 < max_years <= 2 else 0))),
        'mid': min(100, int(mid_score * 0.7 + mid_count * 5 + (20 if max_years >= 3 else 0)))
    }


def _find_missing_concepts(resume_text: str, jd_text: str, threshold: float = 30.0) -> List[str]:
    """Identify JD concepts poorly covered in resume"""
    # Split JD into sentences/concepts
    jd_sentences = [s.strip() for s in re.split(r'[.!?\n]', jd_text) if len(s.strip()) > 20]
    
    missing = []
    for sentence in jd_sentences[:15]:  # Limit to first 15 concepts for performance
        similarity = _semantic_similarity(resume_text, sentence)
        if similarity < threshold:
            # Clean up the sentence
            clean = sentence[:80] + '...' if len(sentence) > 80 else sentence
            if clean not in missing:
                missing.append(clean)
    
    return missing[:5]  # Return top 5 missing concepts


def evaluate_ats(resume_text: str, jd_text: str) -> Dict:
    """
    Main ATS evaluation function
    Returns comprehensive semantic analysis in JSON format
    
    Args:
        resume_text: Extracted text from resume
        jd_text: Job description text
    
    Returns:
        Dictionary with all ATS metrics
    """
    
    if not resume_text:
        return {"error": "Resume text is empty"}
    
    if not jd_text:
        return {"error": "Job description is required for ATS analysis"}
    
    # Extract resume sections
    sections = _extract_sections(resume_text)
    
    # Extract JD requirements
    mandatory_reqs, nice_to_have_reqs = _extract_jd_requirements(jd_text)
    mandatory_text = ' '.join(mandatory_reqs)
    nice_text = ' '.join(nice_to_have_reqs)
    
    # 1. Overall ATS Match Score (resume vs full JD)
    ats_match_score = _semantic_similarity(resume_text, jd_text)
    
    # 2. Skill Relevance (skills section vs JD skills)
    skill_relevance = _semantic_similarity(sections['skills'] or resume_text[:300], jd_text)
    
    # 3. Experience Alignment (experience section vs JD)
    experience_alignment = _semantic_similarity(sections['experience'] or resume_text, jd_text)
    
    # 4. Project Alignment (projects vs JD)
    project_alignment = _semantic_similarity(sections['projects'] or resume_text, jd_text)
    
    # 5. Mandatory Coverage (must-haves from JD)
    mandatory_coverage = _semantic_similarity(resume_text, mandatory_text) if mandatory_text else ats_match_score
    
    # 6. Nice-to-Have Coverage (preferred requirements)
    nice_to_have_coverage = _semantic_similarity(resume_text, nice_text) if nice_text else ats_match_score * 0.8
    
    # 7. Role Fit Analysis
    role_fit = _detect_role_level(resume_text, jd_text)
    
    # 8. Missing Concepts
    missing_jd_concepts = _find_missing_concepts(resume_text, jd_text)
    
    # Return pure JSON output (no explanations)
    return {
        "ats_match_score": round(ats_match_score, 1),
        "skill_relevance": round(skill_relevance, 1),
        "experience_alignment": round(experience_alignment, 1),
        "project_alignment": round(project_alignment, 1),
        "mandatory_coverage": round(mandatory_coverage, 1),
        "nice_to_have_coverage": round(nice_to_have_coverage, 1),
        "role_fit": {
            "intern": role_fit['intern'],
            "junior": role_fit['junior'],
            "mid": role_fit['mid']
        },
        "missing_jd_concepts": missing_jd_concepts
    }
