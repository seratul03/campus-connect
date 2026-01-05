#!/usr/bin/env python3
"""
Migrate jobs from admin/jobs_admin.json to backend/data/jobs/ with short_required_skills.
This syncs admin-posted jobs into the main job system.
"""

import os
import json
import sys

# Add backend to path
backend_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, backend_dir)

from skill_extractor import extract_short_skills


def migrate_admin_jobs():
    """Migrate jobs from admin/jobs_admin.json to backend/data/jobs/."""
    
    # Paths
    base_dir = os.path.dirname(backend_dir)
    admin_file = os.path.join(base_dir, "admin", "jobs_admin.json")
    jobs_dir = os.path.join(backend_dir, "data", "jobs")
    
    if not os.path.exists(admin_file):
        print(f"❌ Admin jobs file not found: {admin_file}")
        return False
    
    os.makedirs(jobs_dir, exist_ok=True)
    
    # Load admin jobs
    with open(admin_file, "r", encoding="utf-8") as f:
        admin_jobs = json.load(f)
    
    if not admin_jobs:
        print("ℹ️  No admin jobs to migrate")
        return True
    
    print(f"🔍 Found {len(admin_jobs)} jobs in admin file")
    
    # Load existing job IDs to avoid duplicates
    existing_ids = set()
    for filename in os.listdir(jobs_dir):
        if filename.endswith('.json'):
            try:
                job_id = filename.replace('job_', '').replace('.json', '')
                existing_ids.add(str(job_id))
            except:
                pass
    
    migrated_count = 0
    skipped_count = 0
    updated_count = 0
    
    for job in admin_jobs:
        job_id = job.get("id")
        if not job_id:
            print(f"⚠️  Skipping job without ID: {job.get('company', 'Unknown')}")
            skipped_count += 1
            continue
        
        job_id_str = str(job_id)
        filepath = os.path.join(jobs_dir, f"job_{job_id_str}.json")
        job_title = f"{job.get('company', 'Unknown')} - {job.get('role', 'Unknown')}"
        
        # Check if job needs migration
        needs_update = False
        if os.path.exists(filepath):
            # Load existing and check if it has short_required_skills
            with open(filepath, "r", encoding="utf-8") as f:
                existing_job = json.load(f)
            
            if not existing_job.get("short_required_skills"):
                needs_update = True
                print(f"🔄 Job {job_id} ({job_title}): Updating existing job...")
            else:
                print(f"⏭️  Job {job_id} ({job_title}): Already migrated, skipping")
                skipped_count += 1
                continue
        else:
            print(f"➕ Job {job_id} ({job_title}): New job, extracting skills...")
        
        # Normalize required_skills field (handle different field names)
        if not job.get("required_skills"):
            # Try to extract from other fields
            for field in ['skills', 'skills_and_qualifications', 'qualifications', 'technical_expertise']:
                if job.get(field):
                    if isinstance(job[field], list):
                        job["required_skills"] = job[field][:8]  # Limit original list
                        break
                    elif isinstance(job[field], str):
                        job["required_skills"] = [s.strip() for s in job[field].split(',')][:8]
                        break
        
        # Ensure required_skills is a list
        if not job.get("required_skills"):
            job["required_skills"] = ["Communication", "Problem Solving", "Teamwork"]
        elif isinstance(job["required_skills"], str):
            job["required_skills"] = [s.strip() for s in job["required_skills"].split(",")]
        
        # Extract short skills using AI
        try:
            short_skills = extract_short_skills(job, force=True)
            job["short_required_skills"] = short_skills
            
            # Save to individual file
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(job, f, indent=2, ensure_ascii=False)
            
            print(f"✅ Job {job_id} ({job_title}): Added {len(short_skills)} skills: {', '.join(short_skills)}")
            
            if needs_update:
                updated_count += 1
            else:
                migrated_count += 1
                
        except Exception as e:
            print(f"❌ Job {job_id} ({job_title}): Failed - {e}")
            skipped_count += 1
            continue
    
    print("\n" + "="*60)
    print("📊 ADMIN JOBS MIGRATION SUMMARY")
    print("="*60)
    print(f"➕ New jobs migrated: {migrated_count}")
    print(f"🔄 Existing jobs updated: {updated_count}")
    print(f"⏭️  Skipped: {skipped_count}")
    print("="*60)
    print("\n🎉 Admin jobs migration completed!")
    
    return True


if __name__ == "__main__":
    success = migrate_admin_jobs()
    sys.exit(0 if success else 1)
