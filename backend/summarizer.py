# summarizer.py
import json
from transformers import PegasusTokenizer, PegasusForConditionalGeneration
import torch
import os

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ABOUT_COMPANY_PATH = os.path.join(BASE_DIR, 'admin', 'about_company.json')
MODEL_DIR = os.path.join(BASE_DIR, 'models', 'pegasus_cnn_dailymail')
AI_EXPLAIN_PATH = os.path.join(BASE_DIR, 'backend', 'ai_explain.json')

# Load model and tokenizer
print("Loading model...")
tokenizer = PegasusTokenizer.from_pretrained(MODEL_DIR)
model = PegasusForConditionalGeneration.from_pretrained(MODEL_DIR)

def summarize_text(text: str) -> str:
    inputs = tokenizer(text, truncation=True, padding='longest', return_tensors='pt')
    with torch.no_grad():
        summary_ids = model.generate(
            inputs['input_ids'],
            num_beams=2,
            max_length=150,
            min_length=100,
            do_sample=False,
            early_stopping=True
        )
    return tokenizer.decode(summary_ids[0], skip_special_tokens=True)

def clean_spacing(text: str) -> str:
    text = text.replace(" .", ". ")
    text = text.replace(" ,", ", ")
    text = " ".join(text.split())
    return text.strip()

JUNK_PHRASES = [
    "for more information",
    "visit our website",
    "click here",
    "learn more",
    "is looking for",
    "results-oriented"
]

def remove_junk(text: str) -> str:
    lowered = text.lower()
    for phrase in JUNK_PHRASES:
        if phrase in lowered:
            text = text[:lowered.index(phrase)]
            break
    return text.strip()

def remove_newline_tokens(text: str) -> str:
    text = text.replace("<n>", " ")
    text = text.replace("\n", " ")
    text = " ".join(text.split())
    return text.strip()

def post_process_summary(summary: str, company: str) -> str:
    summary = remove_newline_tokens(summary)
    summary = clean_spacing(summary)
    summary = remove_junk(summary)
    summary = normalize_voice(summary)
    summary = enforce_company_start(summary, company)
    summary = deduplicate_sentences(summary)
    return summary.strip()

def normalize_voice(text: str) -> str:
    text = text.replace("We ", "The company ")
    text = text.replace("we ", "the company ")
    return text

def enforce_company_start(text: str, company: str) -> str:
    if not text.lower().startswith(company.lower()):
        return f"{company} {text}"
    return text

def deduplicate_sentences(text: str) -> str:
    sentences = []
    seen = set()
    for s in text.split(". "):
        key = s.lower()
        if key not in seen:
            seen.add(key)
            sentences.append(s)
    return ". ".join(sentences)

def fix_company_prefix(text: str, company: str) -> str:
    if text.startswith(f"{company} The"):
        return text.replace(f"{company} The", f"{company}. The", 1)
    return text

def fix_grammar(text: str) -> str:
    fixes = {
        "company place ": "company places ",
        "company foster ": "company fosters ",
        "company continue ": "company continues ",
        "company contribute ": "company contributes ",
        "company emphasize ": "company emphasizes "
    }
    for wrong, right in fixes.items():
        text = text.replace(wrong, right)
    return text

def remove_trailing_fragments(text: str) -> str:
    bad_endings = ["The company", "The organization", "The firm"]
    for end in bad_endings:
        if text.endswith(end):
            text = text[: -len(end)].strip()
    return text

def post_process_summary(summary: str, company: str) -> str:
    summary = remove_newline_tokens(summary)
    summary = clean_spacing(summary)
    summary = remove_junk(summary)
    summary = normalize_voice(summary)
    summary = enforce_company_start(summary, company)
    summary = fix_company_prefix(summary, company)
    summary = fix_grammar(summary)
    summary = deduplicate_sentences(summary)
    summary = remove_trailing_fragments(summary)
    return summary.strip()

def fix_company_prefix(text: str, company: str) -> str:
    text = text.replace(f"{company}. The", f"{company} is a company. The", 1)
    text = text.replace(f"{company}. the", f"{company} is a company. The", 1)
    return text

def fix_missing_subjects(text: str, company: str) -> str:
    sentences = text.split(". ")
    fixed = []

    for s in sentences:
        if s.startswith("Offers ") or s.startswith("Provides "):
            s = f"{company} {s}"
        fixed.append(s)

    return ". ".join(fixed)

def fix_grammar(text: str) -> str:
    fixes = {
        "company actively contribute": "company actively contributes",
        "company contribute": "company contributes",
        "future digital finance": "future of digital finance"
    }
    for wrong, right in fixes.items():
        text = text.replace(wrong, right)
    return text

def deduplicate_sentences(text: str) -> str:
    sentences = [s.strip() for s in text.split(".") if s.strip()]
    seen = set()
    unique = []

    for s in sentences:
        key = s.lower()
        if key not in seen:
            seen.add(key)
            unique.append(s)

    return ". ".join(unique) + "."

def post_process_summary(summary: str, company: str) -> str:
    summary = remove_newline_tokens(summary)
    summary = clean_spacing(summary)
    summary = remove_junk(summary)
    summary = normalize_voice(summary)
    summary = enforce_company_start(summary, company)
    summary = fix_company_prefix(summary, company)
    summary = fix_missing_subjects(summary, company)
    summary = fix_grammar(summary)
    summary = deduplicate_sentences(summary)
    return summary.strip()


def main():
    with open(ABOUT_COMPANY_PATH, 'r', encoding='utf-8') as f:
        companies = json.load(f)

    summaries = []

    for entry in companies:
        # Resolve company name safely
        company_name = (
            entry.get('company_name')
            or entry.get('company')
            or entry.get('name')
            or "Unknown"
        )

        # Resolve about-company text safely
        text = (
            entry.get('about_company')
            or entry.get('description')
            or entry.get('about')
            or ""
        )

        # Skip empty entries (safety)
        if not text.strip():
            continue

        # Generate raw summary
        raw_summary = summarize_text(text)

        # Post-process for 5★ quality
        summary = post_process_summary(raw_summary, company_name)

        summaries.append({
            "company": company_name,
            "summary": summary
        })

    # Print output (debug / visibility)
    for item in summaries:
        print(f"Company: {item['company']}")
        print(f"Summary: {item['summary']}")
        print("-" * 40)

    # Write final summaries to file
    with open(AI_EXPLAIN_PATH, 'w', encoding='utf-8') as f:
        json.dump(summaries, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
