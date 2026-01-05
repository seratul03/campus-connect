# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from score import bp as score_routes
from practice import bp as practice_routes

# Optional modules (guarded if missing)
HAS_API = False
HAS_AUTH = False
try:
    import api
    HAS_API = True
except Exception:
    api = None

try:
    from auth import authenticate
    HAS_AUTH = True
except Exception:
    def authenticate(*args, **kwargs):
        return None

# ---------- CHATBOT ----------
QA_PAIRS = {
    "hi": "Hello 👋 How can I help you today?",
    "hello": "Hi there! 😊",
    "what is campus connect": "Campus Connect is a smart career and research portal for students.",
    "how to apply for internships": "Go to the Internships section and apply using your profile.",
    "what is ats score": "ATS score shows how well your resume matches job requirements.",
    "bye": "Goodbye 👋 Best of luck!"
}

app = Flask(__name__)
# Enable CORS for all domains so your frontend can talk to it
CORS(app)

# Register the score blueprint(score storer)
app.register_blueprint(score_routes, url_prefix="/")
app.register_blueprint(practice_routes, url_prefix="/")


@app.route("/")
def home():
    return {"status": "Campus Connect Backend Running"}

# ---------- AUTH ----------
@app.route("/login", methods=["POST"])
def login():
    data = request.json or {}
    if not HAS_AUTH:
        return jsonify({"error": "Auth module not available"}), 501
    user = authenticate(data.get("email"), data.get("password"))
    if user:
        return jsonify(user)
    return jsonify({"error": "Invalid credentials"}), 401

# ---------- STUDENT ----------
@app.route("/api/jobs")
def jobs():
    if not HAS_API:
        return jsonify({"error": "API module not available"}), 501
    return jsonify(api.get_jobs())

@app.route("/api/internships")
def internships():
    if not HAS_API:
        return jsonify({"error": "API module not available"}), 501
    return jsonify(api.get_internships())

# [UPDATED] ATS Check Route - Handles File Uploads
@app.route("/api/ats-check", methods=["POST"])
def ats():
    if not HAS_API:
        return jsonify({"error": "API module not available"}), 501
    if 'resume' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['resume']
    jd = request.form.get('jd', '')
    result = api.ats_check(file, jd)
    return jsonify(result)

@app.route("/api/match-jobs", methods=["POST"])
def match():
    if not HAS_API:
        return jsonify({"error": "API module not available"}), 501
    skills = (request.json or {}).get("skills", [])
    return jsonify(api.match_jobs(skills))

# ---------- ADMIN ----------
@app.route("/api/admin/analytics")
def analytics():
    if not HAS_API:
        return jsonify({"error": "API module not available"}), 501
    return jsonify(api.admin_analytics())

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    if not data or "message" not in data:
        return jsonify({"reply": "Invalid request"}), 400

    user_msg = data["message"].lower()

    for q, a in QA_PAIRS.items():
        if q in user_msg:
            return jsonify({"reply": a})

    return jsonify({
        "reply": "Sorry 😅 I don't understand that yet. Please ask something else."
    })


if __name__ == "__main__":
    app.run(debug=True)