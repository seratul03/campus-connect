# ============================================================
# generate_job_embeddings.py
# ============================================================
# One-time / on-demand script
# Generates semantic embeddings for ALL jobs
# Stores them in backend/data/job_embeddings.json
# ============================================================

import os
import json
import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModel

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
JOBS_DIR = os.path.join(DATA_DIR, "jobs")
ADMIN_JOBS_FILE = os.path.abspath(
    os.path.join(BASE_DIR, "..", "admin", "jobs_admin.json")
)
OUTPUT_FILE = os.path.join(DATA_DIR, "job_embeddings.json")

# ---------------- LOAD MODEL ONCE ----------------
print("🔄 Loading embedding model...")
tokenizer = AutoTokenizer.from_pretrained(
    "sentence-transformers/all-MiniLM-L6-v2"
)
model = AutoModel.from_pretrained(
    "sentence-transformers/all-MiniLM-L6-v2"
)
model.eval()
print("✅ Model loaded")

# ---------------- LOAD ALL JOBS ----------------
jobs = []

# 1️⃣ Individual job files
if os.path.exists(JOBS_DIR):
    for fname in os.listdir(JOBS_DIR):
        if fname.endswith(".json"):
            with open(os.path.join(JOBS_DIR, fname), "r", encoding="utf-8") as f:
                jobs.append(json.load(f))

# 2️⃣ Admin jobs
if os.path.exists(ADMIN_JOBS_FILE):
    with open(ADMIN_JOBS_FILE, "r", encoding="utf-8") as f:
        admin_jobs = json.load(f) or []

    existing_ids = {str(j.get("id")) for j in jobs if j.get("id")}
    for aj in admin_jobs:
        if str(aj.get("id")) not in existing_ids:
            jobs.append(aj)

print(f"📦 Total jobs found: {len(jobs)}")

# ---------------- BUILD JOB TEXTS ----------------
job_ids = []
job_texts = []

for job in jobs:
    job_id = str(job.get("id"))
    company = job.get("company") or job.get("company_name", "")
    role = job.get("role") or job.get("job_role", "")
    skills = job.get("required_skills", [])[:8]
    desc = job.get("full_job_description", "")

    text = f"{role} at {company}. Requires {' '.join(skills)}. {desc}"
    job_ids.append(job_id)
    job_texts.append(text)

# ---------------- CREATE EMBEDDINGS ----------------
print("🧠 Generating embeddings (this may take ~1 minute)...")

encoded = tokenizer(
    job_texts,
    padding=True,
    truncation=True,
    return_tensors="pt"
)

with torch.no_grad():
    output = model(**encoded)

token_embeddings = output.last_hidden_state
mask = encoded["attention_mask"].unsqueeze(-1).expand(token_embeddings.size()).float()

embeddings = torch.sum(token_embeddings * mask, 1) / torch.clamp(
    mask.sum(1), min=1e-9
)
embeddings = F.normalize(embeddings, p=2, dim=1)

# ---------------- SAVE TO JSON ----------------
job_embeddings = {
    job_ids[i]: embeddings[i].tolist()
    for i in range(len(job_ids))
}

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(job_embeddings, f)

print(f"✅ Saved embeddings to: {OUTPUT_FILE}")
print("🎉 DONE")
