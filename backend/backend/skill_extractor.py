# backend/skill_extractor.py
"""
AI-based skill extraction using BART summarization + rule-based extraction.
This module runs ONLY when jobs are created/updated, never at runtime.
"""

import re
from typing import List, Dict, Any, Optional
from transformers import pipeline


# Global pipeline - lazy loaded
_summarizer = None

# Comprehensive skill dictionary for extraction
SKILL_DICTIONARY = {
    # Programming Languages
    "python", "java", "javascript", "js", "typescript", "ts", "c++", "cpp", "c#", "csharp",
    "go", "golang", "rust", "kotlin", "swift", "php", "ruby", "scala", "r", "perl",
    
    # Web Technologies
    "html", "css", "react", "reactjs", "angular", "vue", "vuejs", "node", "nodejs", 
    "express", "django", "flask", "fastapi", "spring", "springboot", "asp.net", "dotnet",
    
    # Databases
    "sql", "mysql", "postgresql", "postgres", "mongodb", "redis", "cassandra", 
    "oracle", "dynamodb", "elasticsearch", "neo4j", "sqlite",
    
    # DevOps & Cloud
    "docker", "kubernetes", "k8s", "jenkins", "ci/cd", "cicd", "aws", "azure", 
    "gcp", "terraform", "ansible", "linux", "bash", "shell",
    
    # Data Science & ML
    "machine learning", "ml", "deep learning", "dl", "tensorflow", "pytorch", 
    "scikit-learn", "sklearn", "pandas", "numpy", "matplotlib", "nlp", 
    "computer vision", "cv", "data science", "statistics", "ai",
    
    # Frameworks & Tools
    "git", "github", "gitlab", "jira", "agile", "scrum", "rest api", "restapi",
    "graphql", "microservices", "api", "rest", "soap", "oauth",
    
    # Core CS Concepts
    "dsa", "data structures", "algorithms", "oop", "object oriented", 
    "design patterns", "system design", "problem solving", "debugging",
    
    # Business Tools
    "power bi", "powerbi", "tableau", "excel", "sap", "salesforce", "crm",
    
    # Testing
    "junit", "pytest", "selenium", "testing", "unit testing", "tdd",
    
    # Mobile
    "android", "ios", "react native", "flutter",
    
    # Other
    "networking", "tcp/ip", "http", "https", "security", "cryptography"
}


def _get_summarizer():
    """Lazy load summarization pipeline to avoid startup overhead."""
    global _summarizer
    if _summarizer is None:
        _summarizer = pipeline(
            task="summarization",
            model="facebook/bart-large-cnn",
            local_files_only=True,
            do_sample=False,
            max_length=60,
            min_length=25
        )
    return _summarizer


def _combine_job_text(job: Dict[str, Any]) -> str:
    """
    Combine all relevant job text fields into a single string for summarization.
    Handles various field name variations.
    """
    parts = []
    
    # Description - most common field
    desc = job.get("description", "")
    if desc:
        parts.append(str(desc))
    
    # Responsibilities (may be list or string)
    resp = job.get("responsibilities") or job.get("role_description")
    if resp:
        if isinstance(resp, list):
            parts.append(" ".join(str(r) for r in resp))
        else:
            parts.append(str(resp))
    
    # Qualifications/Skills text (not the required_skills list)
    quals = job.get("qualifications") or job.get("skills_and_qualifications")
    if quals:
        if isinstance(quals, list):
            parts.append(" ".join(str(q) for q in quals))
        else:
            parts.append(str(quals))
    
    combined = " ".join(parts).strip()
    
    # Clean up excessive whitespace
    combined = re.sub(r'\s+', ' ', combined)
    
    return combined


def _extract_skills_from_text(text: str) -> List[str]:
    """
    Extract skills from text using rule-based matching against SKILL_DICTIONARY.
    Returns normalized skill names.
    """
    if not text:
        return []
    
    # Normalize text for matching
    text_lower = text.lower()
    
    found_skills = set()
    
    # Check each skill in dictionary
    for skill in SKILL_DICTIONARY:
        # Use word boundaries for single words, flexible for multi-word
        if " " in skill:
            # Multi-word skill - check if present
            if skill in text_lower:
                found_skills.add(skill)
        else:
            # Single word - use word boundary regex
            pattern = r'\b' + re.escape(skill) + r'\b'
            if re.search(pattern, text_lower):
                found_skills.add(skill)
    
    # Normalize to proper case
    normalized = _normalize_skill_names(list(found_skills))
    
    return normalized


def _extract_skills_from_list(skills_list: List[str]) -> List[str]:
    """
    Extract clean skills from a verbose list of qualification strings.
    Each item in skills_list may be a long sentence - extract keywords from it.
    """
    extracted = set()
    
    for item in skills_list:
        item_lower = str(item).lower()
        
        # Extract skills from this item using dictionary
        for skill in SKILL_DICTIONARY:
            if " " in skill:
                # Multi-word skill
                if skill in item_lower:
                    extracted.add(skill)
            else:
                # Single word with boundary
                pattern = r'\b' + re.escape(skill) + r'\b'
                if re.search(pattern, item_lower):
                    extracted.add(skill)
    
    # Normalize
    normalized = _normalize_skill_names(list(extracted))
    return normalized


def _normalize_skill_names(skills: List[str]) -> List[str]:
    """
    Convert skill names to standard display format.
    E.g., "python" -> "Python", "ml" -> "ML", "javascript" -> "JavaScript"
    """
    normalization_map = {
        "python": "Python",
        "java": "Java",
        "javascript": "JavaScript",
        "js": "JavaScript",
        "typescript": "TypeScript",
        "ts": "TypeScript",
        "sql": "SQL",
        "mysql": "MySQL",
        "postgresql": "PostgreSQL",
        "postgres": "PostgreSQL",
        "mongodb": "MongoDB",
        "html": "HTML",
        "css": "CSS",
        "react": "React",
        "reactjs": "React",
        "angular": "Angular",
        "vue": "Vue",
        "vuejs": "Vue",
        "node": "Node.js",
        "nodejs": "Node.js",
        "django": "Django",
        "flask": "Flask",
        "fastapi": "FastAPI",
        "spring": "Spring",
        "springboot": "Spring Boot",
        "docker": "Docker",
        "kubernetes": "Kubernetes",
        "k8s": "Kubernetes",
        "aws": "AWS",
        "azure": "Azure",
        "gcp": "GCP",
        "git": "Git",
        "github": "GitHub",
        "gitlab": "GitLab",
        "ci/cd": "CI/CD",
        "cicd": "CI/CD",
        "rest api": "REST API",
        "restapi": "REST API",
        "api": "API",
        "rest": "REST",
        "graphql": "GraphQL",
        "dsa": "DSA",
        "data structures": "Data Structures",
        "algorithms": "Algorithms",
        "oop": "OOP",
        "object oriented": "OOP",
        "ml": "ML",
        "machine learning": "Machine Learning",
        "deep learning": "Deep Learning",
        "dl": "Deep Learning",
        "tensorflow": "TensorFlow",
        "pytorch": "PyTorch",
        "nlp": "NLP",
        "ai": "AI",
        "linux": "Linux",
        "bash": "Bash",
        "shell": "Shell",
        "problem solving": "Problem Solving",
        "debugging": "Debugging",
        "design patterns": "Design Patterns",
        "system design": "System Design",
        "microservices": "Microservices",
        "terraform": "Terraform",
        "ansible": "Ansible",
        "jenkins": "Jenkins",
        "redis": "Redis",
        "elasticsearch": "Elasticsearch",
        "power bi": "Power BI",
        "powerbi": "Power BI",
        "tableau": "Tableau",
        "c++": "C++",
        "cpp": "C++",
        "c#": "C#",
        "csharp": "C#",
        "go": "Go",
        "golang": "Go",
        "rust": "Rust",
        "kotlin": "Kotlin",
        "swift": "Swift",
        "ruby": "Ruby",
        "php": "PHP",
        "scala": "Scala",
        "junit": "JUnit",
        "pytest": "Pytest",
        "selenium": "Selenium",
        "testing": "Testing",
        "unit testing": "Unit Testing",
        "tdd": "TDD",
        "android": "Android",
        "ios": "iOS",
        "react native": "React Native",
        "flutter": "Flutter",
        "pandas": "Pandas",
        "numpy": "NumPy",
        "matplotlib": "Matplotlib",
        "scikit-learn": "Scikit-Learn",
        "sklearn": "Scikit-Learn",
    }
    
    result = []
    for skill in skills:
        normalized = normalization_map.get(skill.lower(), skill.title())
        if normalized not in result:  # Avoid duplicates
            result.append(normalized)
    
    return result


def extract_short_skills(job: Dict[str, Any], force: bool = False) -> List[str]:
    """
    Main function: Extract 3-5 core skills from job using BART + rule-based extraction.
    
    Args:
        job: Job dictionary with description/responsibilities/qualifications
        force: If True, re-extract even if short_required_skills already exists
    
    Returns:
        List of 3-5 extracted skill strings
    
    This function:
    1. Checks if extraction already done (unless force=True)
    2. Combines job text fields
    3. Summarizes using BART (compression only)
    4. Extracts skills from summary using rule-based matching
    5. Falls back to original required_skills if extraction fails
    """
    # Check if already extracted
    if not force and job.get("short_required_skills"):
        return job["short_required_skills"]
    
    try:
        # Step 0: Check if original required_skills is already clean (non-verbose)
        original_skills = job.get("required_skills", [])
        if isinstance(original_skills, str):
            original_skills = [s.strip() for s in original_skills.split(",")]
        
        # If original skills are already short and clean, use them directly
        if original_skills and len(original_skills) <= 8:
            # Check if skills are verbose (more than 50 chars indicates verbose)
            avg_length = sum(len(str(s)) for s in original_skills) / len(original_skills)
            if avg_length < 50:
                # Skills are already clean, just normalize and limit
                clean_skills = _extract_skills_from_list(original_skills) if avg_length > 20 else original_skills
                if len(clean_skills) >= 3:
                    return clean_skills[:5]
        
        # Step 1: Combine job text
        combined_text = _combine_job_text(job)
        
        if not combined_text or len(combined_text) < 50:
            # Text too short - extract from original skills list
            if original_skills:
                extracted = _extract_skills_from_list(original_skills)
                if len(extracted) >= 3:
                    return extracted[:5]
            return _fallback_to_original_skills(job)
        
        # Step 2: Summarize using BART (compression)
        summarizer = _get_summarizer()
        
        # BART has input length limits - truncate if necessary
        max_input_length = 1024
        if len(combined_text.split()) > max_input_length:
            # Take first and last parts to preserve key info
            words = combined_text.split()
            combined_text = " ".join(words[:512] + words[-512:])
        
        summary_result = summarizer(combined_text)
        summary_text = summary_result[0]["summary_text"]
        
        # Step 3: Extract skills from summary
        extracted_skills = _extract_skills_from_text(summary_text)
        
        # Also extract from original required_skills if it's a list
        original_extracted = _extract_skills_from_list(original_skills) if original_skills else []
        
        # Prioritize skills that appear in both summary and original list
        priority_skills = [s for s in extracted_skills if any(
            s.lower() in orig.lower() or orig.lower() in s.lower() 
            for orig in original_extracted
        )]
        
        # Add remaining skills from original
        other_original = [s for s in original_extracted if s not in priority_skills]
        
        # Combine: prioritized first, then original skills, then summary-only skills
        other_summary = [s for s in extracted_skills if s not in priority_skills]
        final_skills = priority_skills + other_original + other_summary
        
        # Limit to 3-5 skills (prefer 3-4 for clean display)
        if len(final_skills) >= 3:
            return final_skills[:5]
        
        # If less than 3 extracted, use original skills extraction
        if len(original_extracted) >= 3:
            return original_extracted[:5]
        
        # Last resort fallback
        return _fallback_to_original_skills(job)
        
    except Exception as e:
        # On any error, fallback
        print(f"Skill extraction error: {e}")
        return _fallback_to_original_skills(job)


def _fallback_to_original_skills(job: Dict[str, Any]) -> List[str]:
    """
    Fallback: Use original required_skills, limited to 5.
    """
    original_skills = job.get("required_skills", [])
    
    if isinstance(original_skills, str):
        skills = [s.strip() for s in original_skills.split(",")]
    elif isinstance(original_skills, list):
        skills = [str(s).strip() for s in original_skills]
    else:
        skills = []
    
    # Limit to 5
    return skills[:5] if skills else ["Python", "Problem Solving", "Communication"]
