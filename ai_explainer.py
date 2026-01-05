"""
AI Job Explainer using google/flan-t5-base

PURPOSE:
This module generates concise, easy-to-understand explanations of job postings.
Unlike job_formatter.py which preserves all details, this creates a SHORT summary.

CRITICAL RULES:
- Runs ONLY ONCE when admin adds/updates a job
- Uses local google/flan-t5-base model (fully offline)
- DOES summarize and simplify the job description
- Creates a brief, student-friendly explanation
- Stores result in "ai_explanation" field permanently
- NEVER runs on page load or user request

PURPOSE FOR STUDENTS:
- Quick understanding of what the job is about
- Simplified explanation of requirements
- Easy-to-read summary before diving into full details
"""

import os
from typing import Dict, Any, Optional
from transformers import pipeline


class AIJobExplainer:
    """
    Generates AI-powered explanations of job postings using google/flan-t5-base.
    
    WHY THIS EXISTS:
    Students need a quick, easy way to understand what a job is about.
    This creates a concise summary that highlights the key points.
    """
    
    def __init__(self):
        """
        Initialize the explainer with the local google/flan-t5-base model.
        """
        self.model = None
        self._model_path = self._get_model_path()
        
    def _get_model_path(self) -> str:
        """
        Get the absolute path to the local google/flan-t5-base model.
        """
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(backend_dir)
        model_path = os.path.join(project_root, "models", "google", "flan-t5-base")
        return model_path
    
    def _load_model(self):
        """
        Lazy load the model only when needed.
        """
        if self.model is None:
            try:
                from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
                
                tokenizer = AutoTokenizer.from_pretrained(
                    self._model_path,
                    local_files_only=True
                )
                
                model = AutoModelForSeq2SeqLM.from_pretrained(
                    self._model_path,
                    local_files_only=True
                )
                
                self.model = pipeline(
                    "text2text-generation",
                    model=model,
                    tokenizer=tokenizer
                )
                print(f"✓ AI Job Explainer model loaded from: {self._model_path}")
            except Exception as e:
                print(f"✗ Failed to load AI Job Explainer model: {e}")
                raise
    
    def _create_prompt(self, job: Dict[str, Any]) -> str:
        """
        Create a prompt that asks the AI to explain the job in simple terms.
        """
        role = job.get("role", "this position")
        company = job.get("company", "the company")
        description = job.get("description", "")
        skills = job.get("required_skills", [])
        
        # Build a concise job context
        skills_text = ", ".join(skills[:5]) if isinstance(skills, list) and skills else "various skills"
        
        prompt = f"""Explain this job opportunity in 2-3 simple sentences for students:

Role: {role} at {company}
Description: {description[:500]}
Key Skills: {skills_text}

Write a brief, friendly explanation of what this job is about and what they'll be doing."""
        
        return prompt
    
    def generate_explanation(self, job: Dict[str, Any]) -> Optional[str]:
        """
        Generate an AI explanation for a job posting.
        
        Args:
            job: Job dictionary containing role, company, description, etc.
            
        Returns:
            AI-generated explanation string, or None if generation fails
        """
        try:
            # Load model if not already loaded
            self._load_model()
            
            # Create the prompt
            prompt = self._create_prompt(job)
            
            # Generate explanation
            result = self.model(
                prompt,
                do_sample=False,
                max_new_tokens=200,  # Shorter for concise explanation
                truncation=True
            )
            
            explanation = result[0]["generated_text"]
            
            if not explanation or not explanation.strip():
                print("⚠ Model returned empty AI explanation")
                return None
            
            print(f"✓ AI explanation generated successfully ({len(explanation)} chars)")
            return explanation.strip()
            
        except Exception as e:
            print(f"✗ AI explanation generation failed: {e}")
            return None


# Global singleton instance
_explainer_instance: Optional[AIJobExplainer] = None


def get_explainer() -> AIJobExplainer:
    """
    Get or create the global explainer instance.
    """
    global _explainer_instance
    if _explainer_instance is None:
        _explainer_instance = AIJobExplainer()
    return _explainer_instance


def generate_ai_explanation(job: Dict[str, Any]) -> None:
    """
    Generate AI explanation for a job and store in 'ai_explanation' field.
    
    Args:
        job: Job dictionary that will be modified in-place
        
    CRITICAL BEHAVIOR:
    - If generation succeeds: job["ai_explanation"] = AI-generated text
    - If generation fails: job["ai_explanation"] = fallback message
    """
    try:
        explainer = get_explainer()
        explanation = explainer.generate_explanation(job)
        
        if explanation:
            job["ai_explanation"] = explanation
            print(f"✓ AI explanation stored for job {job.get('id', 'unknown')}")
        else:
            # Fallback message
            job["ai_explanation"] = f"This is a {job.get('role', 'position')} role at {job.get('company', 'a leading company')}. Check the full job description below for details about responsibilities and requirements."
            print(f"⚠ Using fallback explanation for job {job.get('id', 'unknown')}")
            
    except Exception as e:
        print(f"✗ AI explanation error for job {job.get('id', 'unknown')}: {e}")
        # Fallback message
        job["ai_explanation"] = f"This is a {job.get('role', 'position')} role at {job.get('company', 'a leading company')}. Check the full job description below for details about responsibilities and requirements."
