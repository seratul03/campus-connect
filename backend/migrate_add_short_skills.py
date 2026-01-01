#!/usr/bin/env python3
"""
Migration script: Add short_required_skills to all existing jobs.
Run this ONCE after deploying the skill extraction system.

Usage:
    python migrate_add_short_skills.py
"""

import os
import json
import sys

# Add backend to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from skill_extractor import extract_short_skills


def migrate_jobs():
    """Add short_required_skills to all jobs that don't have it."""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    jobs_dir = os.path.join(base_dir, "data", "jobs")
    
    if not os.path.exists(jobs_dir):
        print(f"❌ Jobs directory not found: {jobs_dir}")
        return
    
    print("🔍 Scanning jobs for migration...")
    
    migrated_count = 0
    skipped_count = 0
    failed_count = 0
    
    for filename in sorted(os.listdir(jobs_dir)):
        if not filename.endswith('.json'):
            continue
        
        filepath = os.path.join(jobs_dir, filename)
        
        try:
            # Load job
            with open(filepath, "r", encoding="utf-8") as f:
                job = json.load(f)
            
            job_id = job.get("id", "unknown")
            job_title = f"{job.get('company', 'Unknown')} - {job.get('role', 'Unknown')}"
            
            # Check if already has short_required_skills
            if job.get("short_required_skills"):
                print(f"⏭️  Job {job_id} ({job_title}): Already has short_required_skills, skipping")
                skipped_count += 1
                continue
            
            # Extract skills
            print(f"⚙️  Job {job_id} ({job_title}): Extracting skills...")
            short_skills = extract_short_skills(job, force=True)
            
            # Update job
            job["short_required_skills"] = short_skills
            
            # Save back to file
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(job, f, indent=2, ensure_ascii=False)
            
            print(f"✅ Job {job_id} ({job_title}): Added {len(short_skills)} skills: {', '.join(short_skills)}")
            migrated_count += 1
            
        except Exception as e:
            print(f"❌ Job {filename}: Migration failed - {e}")
            failed_count += 1
            continue
    
    print("\n" + "="*60)
    print("📊 MIGRATION SUMMARY")
    print("="*60)
    print(f"✅ Migrated: {migrated_count} jobs")
    print(f"⏭️  Skipped:  {skipped_count} jobs (already had short_required_skills)")
    print(f"❌ Failed:   {failed_count} jobs")
    print("="*60)
    
    if failed_count > 0:
        print("\n⚠️  Some jobs failed to migrate. Check errors above.")
        return False
    
    print("\n🎉 Migration completed successfully!")
    return True


if __name__ == "__main__":
    success = migrate_jobs()
    sys.exit(0 if success else 1)
