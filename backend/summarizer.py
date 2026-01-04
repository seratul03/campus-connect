# summarizer.py
"""
Summarizes the 'about company' section using google/pegasus-cnn_dailymail model.
Reads from admin/about_company.json and outputs summaries for each entry.
"""
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

def main():
    # Read about_company.json
    with open(ABOUT_COMPANY_PATH, 'r', encoding='utf-8') as f:
        companies = json.load(f)

    # Summarize each entry
    summaries = []
    for entry in companies:
        # Use correct keys for company name and about_company
        company_name = entry.get('company_name') or entry.get('company') or entry.get('name', 'Unknown')
        text = entry.get('about_company') or entry.get('description') or entry.get('about') or str(entry)
        summary = summarize_text(text)
        summaries.append({
            'company': company_name,
            'summary': summary
        })

    # Output summaries
    for s in summaries:
        print(f"Company: {s['company']}\nSummary: {s['summary']}\n{'-'*40}")

    # Write to a file
    with open(AI_EXPLAIN_PATH, 'w', encoding='utf-8') as f:
        json.dump(summaries, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
