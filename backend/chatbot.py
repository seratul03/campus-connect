from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CHATBOT_DATA_PATH = os.path.join(BASE_DIR, "chatbot_ans.json")


def _safe_load_json(path, default=None):
    if default is None:
        default = {}
    try:
        if not os.path.exists(path):
            return default
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default


def _load_chatbot_faqs():
    data = _safe_load_json(CHATBOT_DATA_PATH, default={})
    faqs = []

    for item in data.get("faqs", []):
        answer = item.get("answer")
        if not answer:
            continue

        faqs.append({
            "questions": [q.lower() for q in item.get("questions", []) if isinstance(q, str)],
            "keywords": [k.lower() for k in item.get("keywords", []) if isinstance(k, str)],
            "answer": answer,
        })

    fallback = data.get("fallback_response", {}).get(
        "answer",
        "Sorry, I couldn't understand that. Please try rephrasing your question or visit the help section.",
    )

    return faqs, fallback


CHATBOT_FAQS, CHATBOT_FALLBACK = _load_chatbot_faqs()

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "").lower()

    for item in CHATBOT_FAQS:
        for q in item.get("questions", []):
            if q in user_msg:
                return jsonify({"reply": item["answer"]})

        for kw in item.get("keywords", []):
            if kw and kw in user_msg:
                return jsonify({"reply": item["answer"]})

    return jsonify({"reply": CHATBOT_FALLBACK})

if __name__ == "__main__":
    app.run(debug=True)
