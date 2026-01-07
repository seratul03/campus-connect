from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# ============================================
# MODELS
# ============================================


class User(db.Model):
    """Basic user model for dashboard/demo auth"""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(50), default='student')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.email}>'


class Paper(db.Model):
    """Research papers model"""
    __tablename__ = 'papers'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500), nullable=False)
    authors = db.Column(db.String(500), nullable=False)
    abstract = db.Column(db.Text, nullable=False)
    domain = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    citations = db.Column(db.Integer, default=0)
    pdf_url = db.Column(db.String(500))
    published_date = db.Column(db.String(50))
    keywords = db.Column(db.String(500))
    
    def __repr__(self):
        return f'<Paper {self.title}>'


class Faculty(db.Model):
    """Faculty members model"""
    __tablename__ = 'faculty'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    designation = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    research_areas = db.Column(db.String(500))
    bio = db.Column(db.Text)
    image_url = db.Column(db.String(500))
    
    def __repr__(self):
        return f'<Faculty {self.name}>'


class Project(db.Model):
    """Research projects model"""
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500), nullable=False)
    description = db.Column(db.Text, nullable=False)
    faculty_name = db.Column(db.String(200), nullable=False)
    domain = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.String(50))
    requirements = db.Column(db.Text)
    status = db.Column(db.String(50), default='open')  # open, ongoing, closed
    start_date = db.Column(db.String(50))
    
    def __repr__(self):
        return f'<Project {self.title}>'


class Internship(db.Model):
    """Internship opportunities model"""
    __tablename__ = 'internships'
    
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    domain = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200))
    duration = db.Column(db.String(50))
    stipend = db.Column(db.String(100))
    eligibility = db.Column(db.Text)
    application_deadline = db.Column(db.String(50))
    company_logo = db.Column(db.String(500))
    
    def __repr__(self):
        return f'<Internship {self.company} - {self.role}>'


class Application(db.Model):
    """Student applications model"""
    __tablename__ = 'applications'
    
    id = db.Column(db.Integer, primary_key=True)
    student_name = db.Column(db.String(200), nullable=False)
    student_email = db.Column(db.String(200), nullable=False)
    student_phone = db.Column(db.String(20))
    
    # Can be either research project or internship
    application_type = db.Column(db.String(50), nullable=False)  # 'research' or 'internship'
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=True)
    project_title = db.Column(db.String(500), nullable=True)
    internship_id = db.Column(db.Integer, db.ForeignKey('internships.id'), nullable=True)
    internship_company = db.Column(db.String(200), nullable=True)
    
    cover_letter = db.Column(db.Text)
    resume_url = db.Column(db.String(500))
    status = db.Column(db.String(50), default='pending')  # pending, accepted, rejected
    applied_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Application {self.student_name} - {self.application_type}>'
