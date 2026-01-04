# Campus Research Connect

A complete research + internship portal built with Flask backend and plain HTML/CSS/JavaScript frontend.

## 🚀 Features

### For Students:

- **Browse Research Papers**: Search and filter research papers by domain, year, and keywords
- **View Faculty Profiles**: Explore faculty members and their research areas
- **Participate in Projects**: Apply for ongoing research projects
- **Find Internships**: Discover internship opportunities at top companies
- **User Dashboard**: Track applications and save papers
- **Authentication**: Login/Register functionality with localStorage

### For Faculty:

- Profile pages with research areas and publications
- Project listings with application management

## 📁 Project Structure

```
research_campus_connect/
│
├── app.py                      # Flask application with API routes
├── requirements.txt            # Python dependencies
│
├── database/
│   ├── models.py              # SQLAlchemy database models
│   └── seed.py                # Database seeding script
│
├── instance/
│   └── app.db                 # SQLite database (created automatically)
│
├── static/
│   ├── css/                   # CSS stylesheets (9 files)
│   │   ├── home.css
│   │   ├── research.css
│   │   ├── research-details.css
│   │   ├── participate.css
│   │   ├── faculty.css
│   │   ├── faculty-profile.css
│   │   ├── internships.css
│   │   ├── login.css
│   │   └── dashboard.css
│   │
│   └── js/                    # JavaScript files (9 files)
│       ├── home.js
│       ├── research.js
│       ├── research-details.js
│       ├── participate.js
│       ├── faculty.js
│       ├── faculty-profile.js
│       ├── internships.js
│       ├── auth.js
│       └── dashboard.js
│
└── templates/                 # HTML pages (9 files)
    ├── index.html
    ├── research.html
    ├── research-details.html
    ├── participate.html
    ├── faculty.html
    ├── faculty-profile.html
    ├── internships.html
    ├── login.html
    └── dashboard.html
```

## 🛠️ Installation & Setup

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Initialize Database

```bash
python database/seed.py
```

This will:

- Create the SQLite database
- Create all tables (papers, faculty, projects, internships, applications, users)
- Seed the database with mock data

### Step 3: Run the Application

```bash
python app.py
```

The application will start on `http://localhost:5500`

## 🎯 Usage

### Accessing the Application

1. **Home Page**: `http://localhost:5500/`

   - View featured papers, projects, and internships
   - Quick navigation to all sections

2. **Research Papers**: `http://localhost:5500/research`

   - Search and filter papers
   - Click any paper to view details

3. **Participate in Research**: `http://localhost:5500/participate`

   - Browse open research projects
   - Apply for projects (fills application form)

4. **Faculty**: `http://localhost:5500/faculty`

   - View all faculty members
   - Click to see detailed profiles with publications

5. **Internships**: `http://localhost:5500/internships`

   - Browse internship opportunities
   - Apply for internships

6. **Login**: `http://localhost:5500/login`

   - Demo credentials: `john@student.edu` / `password123`
   - Or create a new account

7. **Dashboard**: `http://localhost:5500/dashboard` (requires login)
   - View your applications
   - Track saved papers
   - See notifications

## 🗄️ Database Schema

### Tables:

1. **papers** - Research papers

   - id, title, authors, abstract, domain, year, citations, pdf_url, published_date, keywords

2. **faculty** - Faculty members

   - id, name, designation, department, email, phone, research_areas, bio, image_url

3. **projects** - Research projects

   - id, title, description, faculty_name, domain, duration, requirements, status, start_date

4. **internships** - Internship opportunities

   - id, company, role, description, domain, location, duration, stipend, eligibility, application_deadline, company_logo

5. **applications** - Student applications

   - id, student_name, student_email, student_phone, application_type, project_id, internship_id, cover_letter, resume_url, status, applied_date

6. **users** - User accounts
   - id, name, email, password, role, created_at

## 🔌 API Endpoints

### Papers

- `GET /api/papers` - Get all papers (supports search, domain, year filters)
- `GET /api/papers/<id>` - Get specific paper

### Faculty

- `GET /api/faculty` - Get all faculty (supports department filter)
- `GET /api/faculty/<id>` - Get specific faculty with publications

### Projects

- `GET /api/projects` - Get all projects (supports status filter)
- `POST /api/projects/apply` - Submit research project application

### Internships

- `GET /api/internships` - Get all internships (supports domain filter)
- `POST /api/internships/apply` - Submit internship application

### Authentication

- `POST /api/login` - User login
- `POST /api/register` - User registration

### Dashboard

- `GET /api/dashboard/applications?email=<email>` - Get user's applications

## 🎨 Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Clean UI**: Modern gradient backgrounds, card layouts, hover effects
- **No Frameworks**: Pure CSS with Flexbox and Grid
- **Dynamic Loading**: JavaScript fetch() API for all data
- **Client-Side Filtering**: Fast search and filter without page reloads
- **LocalStorage**: Save papers and maintain login state

## 🧪 Testing the Application

1. **Browse Papers**: Go to Research page and use search/filters
2. **Apply for Project**:
   - Go to Participate page
   - Click "Apply Now" on any open project
   - Fill and submit the form
3. **Login**: Use demo credentials to access dashboard
4. **View Dashboard**: See your applications and saved papers
5. **Faculty Profiles**: Click any faculty to see their publications

## 📝 Notes

- **No Jinja Templating**: HTML files are static, all data loaded via JavaScript
- **Mock Authentication**: Passwords are stored in plain text (for demo only)
- **Client-Side State**: Login state stored in localStorage
- **CORS Enabled**: Flask-CORS allows frontend to call APIs
- **Mock Data**: seed.py creates realistic sample data

## 🔧 Customization

### Add More Data

Edit `database/seed.py` and add more entries to the respective lists, then run:

```bash
python database/seed.py
```

### Change Styling

Edit CSS files in `static/css/` directory

### Add New Features

1. Create new API routes in `app.py`
2. Add corresponding JavaScript in `static/js/`
3. Update HTML templates in `templates/`

## 🐛 Troubleshooting

**Database not found:**

```bash
python database/seed.py
```

**CORS errors:**

- Ensure Flask-CORS is installed
- Use relative API base (`/api`) in JS files so it matches the Flask server port (default 5500)

**Port already in use:**
The default port is 5500. To change the port, edit `app.py`:

```python
app.run(debug=True, port=5501)
```

## 📦 Dependencies

- Flask 3.0.0 - Web framework
- Flask-SQLAlchemy 3.1.1 - ORM for database
- Flask-CORS 4.0.0 - Enable CORS

## 🚀 Production Deployment

For production:

1. Use proper password hashing (bcrypt)
2. Add proper session management
3. Use environment variables for secrets
4. Deploy with Gunicorn/uWSGI
5. Use PostgreSQL instead of SQLite
6. Add proper error handling and validation
7. Implement proper authentication (JWT/sessions)

## 📄 License

This is a demo project for educational purposes.

## 👨‍💻 Development

Built with:

- **Backend**: Python Flask + SQLite
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Architecture**: RESTful API + SPA-style frontend
