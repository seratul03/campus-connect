"""
Migration script to convert jobs.json to individual job files.
Run this once to migrate existing jobs.
"""
import os
import json

def migrate():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    old_file = os.path.join(base_dir, "data", "jobs.json")
    new_dir = os.path.join(base_dir, "data", "jobs")
    
    # Create jobs directory
    os.makedirs(new_dir, exist_ok=True)
    
    # Read existing jobs.json
    if not os.path.exists(old_file):
        print(f"No existing {old_file} found. Nothing to migrate.")
        return
    
    with open(old_file, "r", encoding="utf-8") as f:
        jobs = json.load(f)
    
    if not jobs:
        print("No jobs to migrate.")
        return
    
    # Save each job as individual file
    for job in jobs:
        job_id = job.get('id')
        if not job_id:
            print(f"Skipping job without id: {job}")
            continue
        
        filename = f"job_{job_id}.json"
        filepath = os.path.join(new_dir, filename)
        
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(job, f, indent=2, ensure_ascii=False)
        
        print(f"✓ Created {filename}")
    
    # Rename old file as backup
    backup_file = old_file + ".backup"
    os.rename(old_file, backup_file)
    print(f"\n✓ Migrated {len(jobs)} jobs")
    print(f"✓ Original file backed up to {backup_file}")

if __name__ == "__main__":
    migrate()
