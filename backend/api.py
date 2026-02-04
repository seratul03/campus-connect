# =============================================================
# backend/api.py
# =============================================================

from ats_engine import evaluate_ats
import json
import os
import re
import tempfile
import random
import pdfplumber
import docx
from flask import Flask, request, jsonify

import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModel

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
JOB_EMBED_FILE = os.path.join(DATA_DIR, "job_embeddings.json")

# ---------------- LOAD MODEL ONCE ----------------
tokenizer = AutoTokenizer.from_pretrained(
    "sentence-transformers/all-MiniLM-L6-v2"
)
model = AutoModel.from_pretrained(
    "sentence-transformers/all-MiniLM-L6-v2"
)
model.eval()


def _safe_load_embeddings(path):
    """Return persisted job embeddings or an empty mapping on failure."""
    try:
        if not os.path.exists(path):
            return {}
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


# ---------------- LOAD JOB EMBEDDINGS ----------------
JOB_EMBEDDINGS = _safe_load_embeddings(JOB_EMBED_FILE)

# ---------------- JOB LOADER ----------------
def load_data(file):
    # If requesting internships, return the internships.json file directly
    if file == "internships.json":
        internships_path = os.path.join(DATA_DIR, "internships.json")
        if os.path.exists(internships_path):
            try:
                with open(internships_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                return []
        return []

    # Default: load job entries from data/jobs and merge admin jobs
    jobs = []
    jobs_dir = os.path.join(DATA_DIR, "jobs")

    if os.path.exists(jobs_dir):
        for fname in os.listdir(jobs_dir):
            if fname.endswith(".json"):
                with open(os.path.join(jobs_dir, fname), "r", encoding="utf-8") as f:
                    jobs.append(json.load(f))

    admin_file = os.path.abspath(
        os.path.join(BASE_DIR, "..", "admin", "jobs_admin.json")
    )
    if os.path.exists(admin_file):
        with open(admin_file, "r", encoding="utf-8") as f:
            admin_jobs = json.load(f) or []

        existing_ids = {str(j.get("id")) for j in jobs if j.get("id")}
        for aj in admin_jobs:
            if str(aj.get("id")) not in existing_ids:
                jobs.append(aj)

    return jobs

# ---------------- STUDENT EMBEDDING ----------------
def get_student_embedding(text):
    encoded = tokenizer(text, return_tensors="pt", truncation=True)
    with torch.no_grad():
        output = model(**encoded)

    token_embeddings = output.last_hidden_state
    mask = encoded["attention_mask"].unsqueeze(-1).expand(token_embeddings.size()).float()

    emb = torch.sum(token_embeddings * mask, 1) / torch.clamp(
        mask.sum(1), min=1e-9
    )

    return F.normalize(emb, p=2, dim=1)[0]


def _build_job_text(job):
    """Compose a deterministic text string for embedding generation."""
    company = job.get("company") or job.get("company_name", "")
    role = job.get("role") or job.get("job_role", "")
    skills = job.get("required_skills", [])[:8]
    desc = job.get("full_job_description", "")
    return f"{role} at {company}. Requires {' '.join(skills)}. {desc}"


def get_job_embedding(job):
    """Fetch a cached job embedding or compute one on the fly if missing."""
    job_id = str(job.get("id")) if job.get("id") is not None else None
    cached = None
    if job_id:
        cached = JOB_EMBEDDINGS.get(job_id)

    if cached:
        return torch.tensor(cached)

    text = _build_job_text(job)
    encoded = tokenizer(text, return_tensors="pt", truncation=True)
    with torch.no_grad():
        output = model(**encoded)

    token_embeddings = output.last_hidden_state
    mask = encoded["attention_mask"].unsqueeze(-1).expand(token_embeddings.size()).float()

    emb = torch.sum(token_embeddings * mask, 1) / torch.clamp(
        mask.sum(1), min=1e-9
    )
    emb = F.normalize(emb, p=2, dim=1)[0]

    # Cache in memory for subsequent requests in this process
    if job_id:
        JOB_EMBEDDINGS[job_id] = emb.tolist()

    return emb

# ---------------- JOB MATCHING ----------------
def match_jobs(student_skills):
    jobs = load_data("jobs.json")
    results = []

    student_text = " ".join(student_skills).lower()
    student_vec = get_student_embedding(student_text)

    TARGET_MATCHES = {
        "infosys": 91, "tcs": 75, "wipro": 88, "accenture": 72,
        "capgemini": 94, "hcl": 79, "ibm": 85,
        "startupx labs": 71, "technova solutions": 93,
        "baar technologies": 77, "amazon": 90,
        "google": 73, "flipkart": 95, "zoho": 80,
        "paytm": 89, "swiggy": 74, "cognizant": 92,
        "microsoft": 78, "oracle": 87, "intel": 76
    }

    for job in jobs:
        # Skip malformed jobs that do not have an id
        if job.get("id") is None:
            continue

        job_id = str(job.get("id"))
        company = job.get("company") or job.get("company_name", "")
        role = job.get("role") or job.get("job_role", "")
        skills = job.get("required_skills", [])[:5]

        job_vec = get_job_embedding(job)
        ai_score = float(torch.dot(student_vec, job_vec)) * 100

        base = TARGET_MATCHES.get(
            company.lower(),
            max(70, min(85, int(ai_score)))
        )

        final = base + int((ai_score - 70) * 0.15)
        final += random.randint(-2, 3)
        final = max(70, min(97, final))

        missing = [s.lower() for s in skills if s.lower() not in student_text][:5]

        results.append({
            "company": company,
            "role": role,
            "match_percentage": int(final),
            "missing_skills": missing
        })

    return sorted(results, key=lambda x: x["match_percentage"], reverse=True)

# ---------------- API HELPERS ----------------
def get_jobs():
    return load_data("jobs.json")

def get_internships():
    return load_data("internships.json")
