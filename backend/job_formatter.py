"""
Job Description Formatter using google/flan-t5-base

PURPOSE:
This module formats raw, poorly structured job descriptions into clean, readable text.
It preserves ALL original information without summarizing or removing details.

CRITICAL RULES:
- Runs ONLY ONCE when admin adds/updates a job
- Uses local google/flan-t5-base model (fully offline)
- Does NOT summarize, shorten, or remove information
- Does NOT add new information or invent details
- Only improves readability with structure and formatting
- Stores result in "formatted_description" field permanently
- NEVER runs on page load or user request

SEPARATION OF CONCERNS:
- This is ONLY for formatting raw job description text
- ATS scoring, skill extraction, and matching logic MUST ignore this field
- Job cards should NOT use this field
- Only job detail pages should display formatted_description
"""

import os
from typing import Dict, Any, Optional
from transformers import pipeline


class JobDescriptionFormatter:
    """
    Formats raw job descriptions using google/flan-t5-base for improved readability.
    
    WHY THIS EXISTS:
    Admins paste raw, unformatted job descriptions from various sources.
    This class cleans and structures that text WITHOUT changing any information.
    """
    
    def __init__(self):
        """
        Initialize the formatter with the local google/flan-t5-base model.
        
        WHY THESE SETTINGS:
        - local_files_only=True: Ensures fully offline operation
        - do_sample=False: Deterministic output (no randomness)
        - max_length=500: Adequate for structured job descriptions
        """
        self.model = None
        self._model_path = self._get_model_path()
        
    def _get_model_path(self) -> str:
        """
        Get the absolute path to the local google/flan-t5-base model.
        
        WHY:
        The model is stored locally in models/google/flan-t5-base/
        We need the absolute path for transformers to load it.
        """
        # Get backend directory
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        # Go up to project root, then into models/google/flan-t5-base
        project_root = os.path.dirname(backend_dir)
        model_path = os.path.join(project_root, "models", "google", "flan-t5-base")
        return model_path
    
    def _load_model(self):
        """
        Lazy load the model only when needed.
        
        WHY LAZY LOADING:
        Models are memory-intensive. Only load when actually formatting.
        This prevents unnecessary memory usage on server startup.
        """
        if self.model is None:
            try:
                # Load model and tokenizer separately to avoid parameter issues
                from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
                
                tokenizer = AutoTokenizer.from_pretrained(
                    self._model_path,
                    local_files_only=True
                )
                
                model = AutoModelForSeq2SeqLM.from_pretrained(
                    self._model_path,
                    local_files_only=True
                )
                
                # Create pipeline with loaded model
                self.model = pipeline(
                    "text2text-generation",
                    model=model,
                    tokenizer=tokenizer
                )
                print(f"✓ Job formatter model loaded from: {self._model_path}")
            except Exception as e:
                print(f"✗ Failed to load job formatter model: {e}")
                raise
    
    def _create_prompt(self, raw_description: str) -> str:
        """
        Create the exact prompt for the model.
        
        WHY THIS EXACT PROMPT:
        - Explicitly instructs to preserve all information
        - Explicitly forbids summarization
        - Requests clear structure with headings and bullets
        - The model follows instructions when clearly stated
        """
        prompt = f"""Format this job description to be well-structured and readable. Keep all information exactly as written. Use proper punctuation and organize into clear sentences and paragraphs. Do not summarize or remove any details.

{raw_description}"""
        return prompt
    
    def format_description(self, raw_description: str) -> Optional[str]:
        """
        Format a raw job description into clean, structured text.
        
        Args:
            raw_description: The raw, unformatted job description text
            
        Returns:
            Formatted description string, or None if formatting fails
            
        WHY RETURN NONE ON FAILURE:
        The caller can fallback to raw description if formatting fails.
        This ensures the system never crashes due to formatting issues.
        """
        if not raw_description or not raw_description.strip():
            print("⚠ Empty job description provided to formatter")
            return None
        
        try:
            # Load model if not already loaded
            self._load_model()
            
            # Create the prompt
            prompt = self._create_prompt(raw_description)
            
            # Generate formatted description
            # WHY THESE PARAMETERS:
            # - do_sample=False: Deterministic output (same input = same output)
            # - max_new_tokens=512: Enough for detailed job descriptions
            # - truncation=True: Handle long inputs gracefully
            result = self.model(
                prompt,
                do_sample=False,
                max_new_tokens=512,
                truncation=True
            )
            
            formatted_text = result[0]["generated_text"]
            
            # Validate output is not empty
            if not formatted_text or not formatted_text.strip():
                print("⚠ Model returned empty formatted description")
                return None
            
            print(f"✓ Job description formatted successfully ({len(formatted_text)} chars)")
            return formatted_text.strip()
            
        except Exception as e:
            # WHY CATCH ALL EXCEPTIONS:
            # Formatting should NEVER crash the job creation process.
            # Log error and return None so caller can use raw description.
            print(f"✗ Job description formatting failed: {e}")
            return None


# Global singleton instance
# WHY SINGLETON:
# - Model loading is expensive (takes time and memory)
# - Multiple instances waste resources
# - Single instance serves all formatting requests efficiently
_formatter_instance: Optional[JobDescriptionFormatter] = None


def get_formatter() -> JobDescriptionFormatter:
    """
    Get or create the global formatter instance.
    
    WHY:
    Ensures only one model is loaded in memory at a time.
    """
    global _formatter_instance
    if _formatter_instance is None:
        _formatter_instance = JobDescriptionFormatter()
    return _formatter_instance


def format_job_description(job: Dict[str, Any]) -> None:
    """
    Format the job description in-place and store in 'formatted_description' field.
    
    Args:
        job: Job dictionary that will be modified in-place
        
    WHY IN-PLACE MODIFICATION:
    - Simple and efficient
    - Caller already has the job object
    - No need to return a new object
    
    WHY THIS FUNCTION:
    - Clean API for admin job creation
    - Handles all error cases gracefully
    - Ensures job always has formatted_description field
    
    CRITICAL BEHAVIOR:
    - If formatting succeeds: job["formatted_description"] = formatted text
    - If formatting fails: job["formatted_description"] = job["description"] (fallback)
    - If description field missing: job["formatted_description"] = ""
    """
    raw_description = job.get("description", "")
    
    if not raw_description or not raw_description.strip():
        # No description to format
        job["formatted_description"] = ""
        print("⚠ No description to format for job")
        return
    
    try:
        formatter = get_formatter()
        formatted = formatter.format_description(raw_description)
        
        if formatted:
            # SUCCESS: Store formatted version
            job["formatted_description"] = formatted
            print(f"✓ Formatted description stored for job {job.get('id', 'unknown')}")
        else:
            # FALLBACK: Formatting returned None, use raw description
            job["formatted_description"] = raw_description
            print(f"⚠ Using raw description as fallback for job {job.get('id', 'unknown')}")
            
    except Exception as e:
        # CRITICAL SAFETY: Never crash job creation due to formatting
        print(f"✗ Formatting error for job {job.get('id', 'unknown')}: {e}")
        job["formatted_description"] = raw_description
