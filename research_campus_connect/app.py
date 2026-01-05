from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from database.models import db, Paper, Faculty, Project, Internship, Application
import os

app = Flask(__name__, static_folder='static', template_folder='templates')

# Ensure instance folder exists
instance_path = os.path.join(os.path.dirname(__file__), 'instance')
os.makedirs(instance_path, exist_ok=True)

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(instance_path, "app.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Initialize extensions
db.init_app(app)
CORS(app)

# Create database tables
with app.app_context():
    db.create_all()

# ============================================
# SERVE HTML PAGES (Static Files)
# ============================================

@app.route('/')
def index():
    return send_from_directory('templates', 'index.html')

@app.route('/research')
def research():
    return send_from_directory('templates', 'research.html')

@app.route('/research-details')
def research_details():
    return send_from_directory('templates', 'research-details.html')

@app.route('/participate')
def participate():
    return send_from_directory('templates', 'participate.html')

@app.route('/faculty')
def faculty_page():
    return send_from_directory('templates', 'faculty.html')

@app.route('/faculty-profile')
def faculty_profile():
    return send_from_directory('templates', 'faculty-profile.html')

@app.route('/internships')
def internships_page():
    return send_from_directory('templates', 'internships.html')

@app.route('/dashboard')
def dashboard_page():
    return send_from_directory('templates', 'dashboard.html')

# Serve Faculty folder (JSON and Photos)
@app.route('/Faculty/<path:filename>')
def serve_faculty_files(filename):
    return send_from_directory('Faculty', filename)

# ============================================
# API ROUTES
# ============================================

# Papers API
@app.route('/api/papers', methods=['GET'])
def get_papers():
    """Get all research papers with optional search and filters"""
    search = request.args.get('search', '')
    domain = request.args.get('domain', '')
    year = request.args.get('year', '')
    
    query = Paper.query
    
    if search:
        query = query.filter(Paper.title.contains(search) | Paper.abstract.contains(search))
    if domain:
        query = query.filter(Paper.domain == domain)
    if year:
        query = query.filter(Paper.year == int(year))
    
    papers = query.all()
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'authors': p.authors,
        'abstract': p.abstract,
        'domain': p.domain,
        'year': p.year,
        'citations': p.citations,
        'pdf_url': p.pdf_url,
        'published_date': p.published_date
    } for p in papers])

@app.route('/api/papers/<int:paper_id>', methods=['GET'])
def get_paper(paper_id):
    """Get a specific paper by ID"""
    paper = Paper.query.get_or_404(paper_id)
    return jsonify({
        'id': paper.id,
        'title': paper.title,
        'authors': paper.authors,
        'abstract': paper.abstract,
        'domain': paper.domain,
        'year': paper.year,
        'citations': paper.citations,
        'pdf_url': paper.pdf_url,
        'published_date': paper.published_date,
        'keywords': paper.keywords
    })

# Faculty API
@app.route('/api/faculty', methods=['GET'])
def get_faculty():
    """Get all faculty members"""
    department = request.args.get('department', '')
    
    query = Faculty.query
    if department:
        query = query.filter(Faculty.department == department)
    
    faculty_list = query.all()
    return jsonify([{
        'id': f.id,
        'name': f.name,
        'designation': f.designation,
        'department': f.department,
        'email': f.email,
        'research_areas': f.research_areas,
        'image_url': f.image_url
    } for f in faculty_list])

@app.route('/api/faculty/<int:faculty_id>', methods=['GET'])
def get_faculty_member(faculty_id):
    """Get a specific faculty member by ID"""
    faculty = Faculty.query.get_or_404(faculty_id)
    
    # Get papers by this faculty
    papers = Paper.query.filter(Paper.authors.contains(faculty.name)).all()
    
    return jsonify({
        'id': faculty.id,
        'name': faculty.name,
        'designation': faculty.designation,
        'department': faculty.department,
        'email': faculty.email,
        'phone': faculty.phone,
        'research_areas': faculty.research_areas,
        'bio': faculty.bio,
        'image_url': faculty.image_url,
        'papers': [{
            'id': p.id,
            'title': p.title,
            'year': p.year,
            'citations': p.citations
        } for p in papers]
    })

# Projects API
@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Get all research projects"""
    status = request.args.get('status', '')
    
    query = Project.query
    if status:
        query = query.filter(Project.status == status)
    
    projects = query.all()
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'description': p.description,
        'faculty_name': p.faculty_name,
        'domain': p.domain,
        'duration': p.duration,
        'requirements': p.requirements,
        'status': p.status,
        'start_date': p.start_date
    } for p in projects])

@app.route('/api/projects/apply', methods=['POST'])
def apply_project():
    """Apply for a research project"""
    data = request.json
    
    application = Application(
        student_name=data.get('student_name'),
        student_email=data.get('student_email'),
        student_phone=data.get('student_phone'),
        project_id=data.get('project_id'),
        project_title=data.get('project_title'),
        application_type='research',
        cover_letter=data.get('cover_letter'),
        resume_url=data.get('resume_url'),
        status='pending'
    )
    
    db.session.add(application)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Application submitted successfully',
        'application_id': application.id
    }), 201

# Internships API
@app.route('/api/internships', methods=['GET'])
def get_internships():
    """Get all internship opportunities"""
    domain = request.args.get('domain', '')
    
    query = Internship.query
    if domain:
        query = query.filter(Internship.domain == domain)
    
    internships = query.all()
    return jsonify([{
        'id': i.id,
        'company': i.company,
        'role': i.role,
        'description': i.description,
        'domain': i.domain,
        'location': i.location,
        'duration': i.duration,
        'stipend': i.stipend,
        'eligibility': i.eligibility,
        'application_deadline': i.application_deadline,
        'company_logo': i.company_logo
    } for i in internships])

@app.route('/api/internships/apply', methods=['POST'])
def apply_internship():
    """Apply for an internship"""
    data = request.json
    
    application = Application(
        student_name=data.get('student_name'),
        student_email=data.get('student_email'),
        student_phone=data.get('student_phone'),
        internship_id=data.get('internship_id'),
        internship_company=data.get('company'),
        application_type='internship',
        cover_letter=data.get('cover_letter'),
        resume_url=data.get('resume_url'),
        status='pending'
    )
    
    db.session.add(application)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Application submitted successfully',
        'application_id': application.id
    }), 201

# Dashboard API
@app.route('/api/dashboard/applications', methods=['GET'])
def get_user_applications():
    """Get user's applications"""
    email = request.args.get('email')
    
    if not email:
        return jsonify({'error': 'Email required'}), 400
    
    applications = Application.query.filter_by(student_email=email).all()
    
    return jsonify([{
        'id': a.id,
        'type': a.application_type,
        'project_title': a.project_title,
        'internship_company': a.internship_company,
        'status': a.status,
        'applied_date': a.applied_date
    } for a in applications])

@app.route('/api/dashboard/saved-papers', methods=['GET'])
def get_saved_papers():
    """Get saved papers (mock endpoint)"""
    # In a real app, you'd have a saved_papers table
    return jsonify([])

# ============================================
# RUN APP
# ============================================

if __name__ == '__main__':
    app.run(debug=True, port=5500) 