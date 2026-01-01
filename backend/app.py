# backend/app.py
from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import os
import api
from auth import authenticate
from admin.analytics import admin_analytics
from admin.jobs import add_job as admin_add_job, get_jobs as admin_get_jobs, delete_job as admin_delete_job
from werkzeug.utils import secure_filename
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

# ---------- AUTH ----------
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    # This calls the authenticate function in auth.py
    user = authenticate(data.get("email"), data.get("password"))
    if user:
        return jsonify(user)
    return jsonify({"error": "Invalid credentials"}), 401

# ---------- STUDENT ----------
@app.route("/api/jobs")
def jobs():
    return jsonify(api.get_jobs())

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
    skills = request.json.get("skills", [])
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

    @app.route("/<path:filename>")
    def serve_frontend(filename):
        return send_from_directory(FRONTEND_DIR, filename)

    @app.route("/")
    def home():
        return send_from_directory(FRONTEND_DIR, "index.html")

    app.run(debug=True, use_reloader=False)