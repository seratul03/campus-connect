# ai_explanation_api.py
"""
Flask route to serve AI explanation (summarized about company) for a given company name.
"""
import os
import json
from flask import Blueprint, request, jsonify

ai_explanation_api = Blueprint('ai_explanation_api', __name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EXPLAIN_PATH = os.path.join(BASE_DIR, 'ai_explain.json')

# Load explanations once at startup
if os.path.exists(EXPLAIN_PATH):
    with open(EXPLAIN_PATH, 'r', encoding='utf-8') as f:
        explanations = json.load(f)
else:
    explanations = []

@ai_explanation_api.route('/api/ai-explanation', methods=['GET'])
def get_ai_explanation():
    company = request.args.get('company', '').strip().lower()
    if not company:
        return jsonify({'error': 'Missing company parameter'}), 400
    for entry in explanations:
        if entry.get('company', '').strip().lower() == company:
            return jsonify({'summary': entry.get('summary', '')})
    return jsonify({'summary': ''})
