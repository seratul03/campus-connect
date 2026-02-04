# backend/app.py
from flask import Flask, request, jsonify, send_from_directory, send_file
import subprocess
from flask_cors import CORS
import os
import json
import api
from admin.analytics import admin_analytics
from admin.jobs import add_job as admin_add_job, get_jobs as admin_get_jobs, delete_job as admin_delete_job
from auth import authenticate
from werkzeug.utils import secure_filename
from ai_explanation_api import ai_explanation_api

# Try to import AI chatbot dependencies (optional)
try:
    from dotenv import load_dotenv
    load_dotenv()
    DOTENV_AVAILABLE = True
except ImportError:
    print("Warning: python-dotenv not installed. Using environment variables directly.")
    DOTENV_AVAILABLE = False

try:
    from groq import Groq
    GROQ_AVAILABLE = True
except ImportError:
    print("Warning: groq package not installed. Chatbot will use FAQ mode only.")
    print("Install with: pip install groq python-dotenv")
    GROQ_AVAILABLE = False

app = Flask(__name__)
# Enable CORS for all domains so your frontend can talk to it
CORS(app)

# Initialize Groq client for AI chatbot (if available)
groq_client = None
if GROQ_AVAILABLE:
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    if GROQ_API_KEY and GROQ_API_KEY != "your_groq_api_key_here":
        try:
            groq_client = Groq(api_key=GROQ_API_KEY)
            print("✅ AI Chatbot initialized successfully!")
        except Exception as e:
            print(f"Warning: Failed to initialize Groq client: {e}")
            groq_client = None
    else:
        print("ℹ️ GROQ_API_KEY not set. Chatbot will use FAQ fallback mode.")

# Conversation memory for chatbot
conversation_history = []

# Configure paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
PRACTICE_PATH = os.path.join(DATA_DIR, "practice.json")
SCORE_PATH = os.path.join(DATA_DIR, "score.json")
# Profile path now points to backend/profile.json (moved into backend folder)
PROFILE_PATH = os.path.join(BASE_DIR, "profile.json")
CHATBOT_DATA_PATH = os.path.join(BASE_DIR, "chatbot_ans.json")

# Configure upload folder for resumes
RESUME_UPLOAD_FOLDER = r"C:\Users\Seratul Mustakim\Desktop\Ai saves\campus-connect\Resumes_uploaded"
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}

# Create the upload folder if it doesn't exist
if not os.path.exists(RESUME_UPLOAD_FOLDER):
    os.makedirs(RESUME_UPLOAD_FOLDER)

app.config['RESUME_UPLOAD_FOLDER'] = RESUME_UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Helper functions for JSON operations
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

def _safe_write_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def _load_chatbot_faqs():
    """Load chatbot FAQs and fallback reply from chatbot_ans.json."""
    data = _safe_load_json(CHATBOT_DATA_PATH, default={})
    faqs = []

    for item in data.get("faqs", []):
        answer = item.get("answer")
        if not answer:
            continue

        faqs.append({
            "intent": item.get("intent", ""),
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

# ---------- STUDENT ----------
@app.route("/api/jobs")
def jobs():
    return jsonify(api.get_jobs())

# ---------- JOB APPLICATIONS ----------
APPLICATIONS_PATH = os.path.join(DATA_DIR, "applications.json")

@app.route("/api/apply-job", methods=["POST"])
def apply_job():
    payload = request.get_json(force=True, silent=True) or {}

    company = payload.get("company")
    role = payload.get("role")
    email = payload.get("email")

    if not company or not role or not email:
        return jsonify({"error": "Missing fields"}), 400

    applications = _safe_load_json(APPLICATIONS_PATH, default=[])

    applications.append({
        "company": company,
        "role": role,
        "email": email,
        "status": "applied",
        "message": "Your application has been successfully submitted.",
        "unread": True,
        "timestamp": int(__import__("time").time())
    })

    _safe_write_json(APPLICATIONS_PATH, applications)

    return jsonify({"message": "Application stored"})

@app.route("/api/hiring-updates")
def hiring_updates():
    email = request.args.get("email")
    if not email:
        return jsonify([])

    applications = _safe_load_json(APPLICATIONS_PATH, default=[])

    user_updates = [
        a for a in applications if a.get("email") == email
    ]

    return jsonify(user_updates)


@app.route("/api/clear-notifications", methods=["POST"])
def clear_notifications():
    payload = request.get_json(force=True, silent=True) or {}
    email = payload.get("email")
    
    if not email:
        return jsonify({"error": "Email is required"}), 400
    
    applications = _safe_load_json(APPLICATIONS_PATH, default=[])
    
    # Remove all notifications for this user
    filtered_applications = [
        a for a in applications if a.get("email") != email
    ]
    
    _safe_write_json(APPLICATIONS_PATH, filtered_applications)
    
    return jsonify({"message": "Notifications cleared successfully"})


# ---------- AUTH ----------
@app.route("/login", methods=["POST"])
def login():
    data = request.json or {}
    user = authenticate(data.get("email"), data.get("password"))
    if user:
        return jsonify(user)
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/api/internships")
def internships():
    return jsonify(api.get_internships())

# [UPDATED] ATS Check Route - Handles File Uploads
@app.route("/api/ats-check", methods=["POST"])
def ats():
    # 1. Check if a file was actually uploaded
    if 'resume' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
        
    file = request.files['resume']
    
    # 2. Get the Job Description text (optional) from the form data
    jd = request.form.get('jd', '')
    
    # 3. Call the logic in api.py
    result = api.ats_check(file, jd)
    return jsonify(result)

@app.route("/api/match-jobs", methods=["POST"])
def match():
    # Prefer skills from request body
    skills = []
    try:
        payload = request.get_json(silent=True) or {}
        if isinstance(payload, dict):
            skills = payload.get("skills", []) or []
    except Exception:
        skills = []

    # If frontend didn't provide skills, fall back to server-side profile files
    if not skills:
        # Only use the backend-local profile path
        profile_candidates = [PROFILE_PATH]

        for p in profile_candidates:
            try:
                if os.path.exists(p):
                    with open(p, "r", encoding="utf-8") as f:
                        prof = json.load(f)
                        if isinstance(prof, dict) and prof.get("skills"):
                            skills = prof.get("skills", [])
                            break
            except Exception:
                continue

    return jsonify(api.match_jobs(skills))

# ---------- ADMIN ----------
@app.route("/api/admin/analytics")
def analytics():
    return jsonify(admin_analytics())


@app.route("/api/admin/jobs", methods=["GET", "POST"])
def admin_jobs_route():
    # GET returns jobs list; POST adds a new job
    if request.method == "GET":
        # reuse admin jobs loader to get latest file
        return jsonify(admin_get_jobs())

    # POST
    data = request.get_json() or {}
    result = admin_add_job(data)
    if isinstance(result, dict) and result.get("error"):
        return jsonify(result), 400
    return jsonify(result), 201


@app.route("/api/admin/jobs/<job_id>", methods=["DELETE"])
def admin_jobs_delete(job_id):
    # delete job by id
    res = admin_delete_job(job_id)
    if isinstance(res, dict) and res.get("error"):
        return jsonify(res), 404
    return jsonify(res)

@app.route("/chat", methods=["POST"])
def chat():
    """AI-Powered Career Chatbot with conversation memory and context awareness."""
    global conversation_history
    
    data = request.json
    if not data or "message" not in data:
        return jsonify({"reply": "Hey! 👋 I'm here."})

    user_message = data["message"].strip()
    if not user_message:
        return jsonify({"reply": "I'm listening..."})

    # Clear history command
    if user_message.lower() == "/reset":
        conversation_history = []
        return jsonify({"reply": "Memory wiped! 🧹 What shall we talk about?"})

    # If Groq client is available, use AI-powered response
    if groq_client:
        try:
            # Add user message to history
            conversation_history.append({"role": "user", "content": user_message})
            
            # Keep history manageable (last 10 turns)
            if len(conversation_history) > 10:
                conversation_history = conversation_history[-10:]

            # Load user profile and scores for context
            profile_data = _safe_load_json(PROFILE_PATH, default={})
            scores_data = _safe_load_json(SCORE_PATH, default={})
            
            # Data Context
            profile_str = json.dumps(profile_data)
            scores_str = json.dumps(scores_data)

            # System prompt with context
            system_prompt = f"""
You are "CareerBot", a smart, friendly, and concise senior mentor for Campus Connect platform.

### CONTEXT:
- User Profile: {profile_str}
- Scores: {scores_str}

### RULES:
1. **Memory:** use the conversation history to understand context (e.g., if they say "yes", look at what you offered previously).
2. **Brevity:** Max 2-3 sentences. No walls of text.
3. **Tone:** Casual, like a WhatsApp friend.
4. **Actionable:** If they want resources, give 1-2 specific links or names (e.g., "Check out Corey Schafer on YouTube").
5. **Campus Connect Features:** Help users with jobs, internships, ATS scores, research papers, and practice coding.

### CURRENT CONVERSATION:
(The history is automatically attached below)
"""

            messages = [{"role": "system", "content": system_prompt}] + conversation_history

            completion = groq_client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=messages,
                temperature=0.7,
                max_tokens=150,
                top_p=0.9
            )
            
            reply = completion.choices[0].message.content.strip()
            
            # Add AI reply to history
            conversation_history.append({"role": "assistant", "content": reply})
            
            return jsonify({"reply": reply})

        except Exception as e:
            print(f"LLM Error: {e}")
            # Fall back to FAQ-based response on error
            pass
    
    # Fallback to FAQ-based chatbot if Groq is not available or failed
    user_msg_lower = user_message.lower()
    
    for item in CHATBOT_FAQS:
        for q in item.get("questions", []):
            if q in user_msg_lower:
                return jsonify({"reply": item["answer"]})

        for kw in item.get("keywords", []):
            if kw and kw in user_msg_lower:
                return jsonify({"reply": item["answer"]})

    return jsonify({"reply": CHATBOT_FALLBACK})

# ---------- PRACTICE & SCORE ROUTES ----------
# Profile routes
@app.route("/api/profile", methods=["GET"])
def get_profile():
    data = _safe_load_json(PROFILE_PATH, default={})
    return jsonify(data)

@app.route("/api/profile", methods=["PUT"])
def update_profile():
    payload = request.get_json(force=True, silent=True) or {}

    # Persist only the allowed fields (photo is intentionally ignored)
    allowed_fields = [
        "photo",  # photo will be stripped below
        "fullName",
        "email",
        "universityName",
        "rollNumber",
        "registrationNumber",
        "program",
        "specialization",
        "semester",
        "graduationYear",
        "backlogStatus",
        "backlogNumber",
        "city",
        "district",
        "state",
        "skills",
    ]

    clean = {k: payload.get(k, "") for k in allowed_fields}

    # Remove photo before saving to disk
    clean.pop("photo", None)

    # Normalize numbers
    def _to_int(val, default=0):
        try:
            return int(val)
        except Exception:
            return default

    clean["graduationYear"] = _to_int(clean.get("graduationYear"))
    clean["backlogNumber"] = _to_int(clean.get("backlogNumber"))

    # Normalize skills list
    skills = clean.get("skills") or []
    if not isinstance(skills, list):
        skills = []
    clean["skills"] = [str(s).strip().lower() for s in skills if str(s).strip()]

    # Default backlog status
    clean["backlogStatus"] = clean.get("backlogStatus") or "cleared"

    _safe_write_json(PROFILE_PATH, clean)
    return jsonify({"message": "Profile updated!", "profile": clean})

# Practice routes
@app.route("/api/practice", methods=["GET"])
def get_practice():
    try:
        data = _safe_load_json(PRACTICE_PATH, default={"categories": []})
        return jsonify(data)
    except Exception:
        return jsonify({"error": "Failed to load practice data"}), 500

@app.route("/api/practice/progress", methods=["PUT"]) 
def update_practice_progress():
    payload = request.get_json(force=True, silent=True) or {}
    title = payload.get("title")
    progress = payload.get("progress")

    if title is None or progress is None:
        return jsonify({"error": "'title' and 'progress' are required"}), 400

    data = _safe_load_json(PRACTICE_PATH, default={"categories": []})

    for cat in data.get("categories", []):
        for m in cat.get("modules", []):
            if m.get("title") == title:
                m["progress"] = progress

    _safe_write_json(PRACTICE_PATH, data)
    return jsonify({"message": "Progress saved"})

# Score routes
@app.route("/save-score", methods=["POST"])
def save_score():
    data = request.json
    module = data.get("module")
    score = data.get("score")

    scores = _safe_load_json(SCORE_PATH, default={})

    # store BEST score only
    prev = scores.get(module, 0)
    scores[module] = max(prev, score)

    _safe_write_json(SCORE_PATH, scores)

    return jsonify({"status": "saved", "best": scores[module]})

@app.route("/get-scores", methods=["GET"])
def get_scores():
    scores = _safe_load_json(SCORE_PATH, default={})
    return jsonify(scores)

# ---------- RESUME UPLOAD ----------
@app.route("/api/upload-resume", methods=["POST"])
def upload_resume():
    try:
        # Check if file is present
        if 'resume' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        
        file = request.files['resume']
        email = request.form.get('email', 'unknown')
        
        # Check if file has a filename
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Check if file type is allowed
        if not allowed_file(file.filename):
            return jsonify({"error": "File type not allowed. Please upload PDF, DOC, or DOCX"}), 400
        
        # Secure the filename and add user identifier
        original_filename = secure_filename(file.filename)
        file_extension = original_filename.rsplit('.', 1)[1].lower()
        
        # Create a unique filename with email prefix
        safe_email = secure_filename(email.split('@')[0])
        new_filename = f"{safe_email}_resume.{file_extension}"
        
        # Save the file
        filepath = os.path.join(app.config['RESUME_UPLOAD_FOLDER'], new_filename)
        file.save(filepath)
        
        return jsonify({
            "message": "Resume uploaded successfully",
            "filename": new_filename
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/view-resume/<filename>")
def view_resume(filename):
    try:
        # Secure the filename
        filename = secure_filename(filename)
        filepath = os.path.join(app.config['RESUME_UPLOAD_FOLDER'], filename)
        
        if not os.path.exists(filepath):
            return jsonify({"error": "Resume not found"}), 404
        
        return send_file(filepath, mimetype='application/pdf')
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/download-resume/<filename>")
def download_resume(filename):
    try:
        # Secure the filename
        filename = secure_filename(filename)
        filepath = os.path.join(app.config['RESUME_UPLOAD_FOLDER'], filename)
        
        if not os.path.exists(filepath):
            return jsonify({"error": "Resume not found"}), 404
        
        return send_file(filepath, as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Serve static frontend files (register after API routes so they are not shadowed)
    FRONTEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "frontend")
    ADMIN_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "admin")

    # Register AI explanation API blueprint
    app.register_blueprint(ai_explanation_api)

    # Run summarizer.py at startup (ensure summaries are up to date)
    # COMMENTED OUT: This loads large AI models and blocks server startup
    # The ai_explain.json file already contains the summaries
    # summarizer_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'summarizer.py')
    # try:
    #     subprocess.run(['python', summarizer_path], check=True)
    # except Exception as e:
    #     print(f"[Warning] Could not run summarizer.py: {e}")

    @app.route("/backend/<path:filename>")
    def serve_backend(filename):
        BACKEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)))
        return send_from_directory(BACKEND_DIR, filename)

    @app.route("/admin/<path:filename>")
    def serve_admin(filename):
        return send_from_directory(ADMIN_DIR, filename)

    @app.route("/<path:filename>")
    def serve_frontend(filename):
        return send_from_directory(FRONTEND_DIR, filename)

    @app.route("/")
    def home():
        return send_from_directory(FRONTEND_DIR, "index.html")

    app.run(debug=True, use_reloader=False, port=5000)