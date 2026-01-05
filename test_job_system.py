"""
Quick test to verify job creation works with individual files
"""
from admin.jobs import add_job, get_jobs
import os

# Test adding a new job
test_job = {
    "company": "Test Company",
    "role": "Test Engineer",
    "ctc": "10 LPA",
    "location": "Remote",
    "experience": "2-3 Years",
    "employment_type": "Full-time",
    "required_skills": "Python, Testing",
    "eligibility": "B.Tech",
    "description": "Test job posting"
}

print("Adding test job...")
result = add_job(test_job)

if "error" in result:
    print(f"❌ Error: {result['error']}")
else:
    job_id = result.get('id')
    print(f"✓ Job added with ID: {job_id}")
    
    # Check if file exists
    base_dir = os.path.dirname(os.path.abspath(__file__))
    job_file = os.path.join(base_dir, "data", "jobs", f"job_{job_id}.json")
    
    if os.path.exists(job_file):
        print(f"✓ File created: job_{job_id}.json")
    else:
        print(f"❌ File not found: job_{job_id}.json")
    
    # Verify it's in the list
    jobs = get_jobs()
    if any(j.get('id') == job_id for j in jobs):
        print(f"✓ Job appears in get_jobs() list")
    else:
        print(f"❌ Job not found in list")

print(f"\nTotal jobs: {len(get_jobs())}")
