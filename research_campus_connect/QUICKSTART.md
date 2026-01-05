# Quick Start Guide

## 🚀 Getting Started (3 Simple Steps)

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Setup Database

```bash
python database/seed.py
```

### 3. Run Application

```bash
python app.py
```

Then open: **http://localhost:5500**

---

## 📱 Quick Test Guide

### Test 1: Browse Research Papers

1. Go to http://localhost:5500/research
2. Use search box to search for "AI" or "Machine Learning"
3. Use filters to select domain and year
4. Click any paper card to view full details

### Test 2: View Faculty Profiles

1. Go to http://localhost:5500/faculty
2. Filter by department (e.g., "Computer Science")
3. Click "View Profile" on any faculty
4. See their bio, research areas, and publications

### Test 3: Apply for Research Project

1. Go to http://localhost:5500/participate
2. Find an "OPEN" project
3. Click "Apply Now"
4. Fill form:
   - Name: John Doe
   - Email: test@student.edu
   - Phone: 555-1234
   - Cover Letter: Your interest...
5. Submit and see success message

### Test 4: Browse Internships

1. Go to http://localhost:5500/internships
2. Filter by domain
3. Click "Apply Now" on any internship
4. Fill and submit application form

### Test 5: Login & Dashboard

1. Go to http://localhost:5500/login
2. Use demo credentials:
   - **Email**: john@student.edu
   - **Password**: password123
3. Click "Sign In"
4. You'll be redirected to dashboard
5. See your applications and stats

### Test 6: Save Papers

1. Go to any research paper details page
2. Click "Save Paper" button
3. Go to Dashboard → Saved Papers section
4. Your saved papers appear there

---

## 🎯 Demo Accounts

### Student Account

- **Email**: john@student.edu
- **Password**: password123
- Has 2 sample applications (1 research, 1 internship)

### Additional Users

- **Email**: jane@student.edu
- **Password**: password123

### Create New Account

1. Go to login page
2. Click "Register"
3. Fill form and submit
4. Login with new credentials

---

## 📊 What's in the Database?

### Research Papers (8 papers)

- Domains: AI, Machine Learning, Computer Vision, Quantum Computing, Blockchain, Cybersecurity, etc.
- Years: 2023-2024
- Full abstracts and citation counts

### Faculty Members (7 faculty)

- Departments: Computer Science, Physics, Information Systems, Cybersecurity
- Each has research areas and bio
- Papers linked to faculty authors

### Research Projects (6 projects)

- Status: Open and Ongoing
- Domains: AI, Quantum Computing, Blockchain, Computer Vision, etc.
- Students can apply

### Internships (8 internships)

- Companies: Google, Microsoft, Amazon, Tesla, Meta, IBM, NVIDIA, Coinbase
- Roles: SWE Intern, AI Intern, Cloud Intern, etc.
- Full details including stipend and eligibility

---

## 🔧 API Testing (Optional)

You can test APIs directly:

### Get All Papers

```bash
curl http://localhost:5500/api/papers
```

### Get Specific Paper

```bash
curl http://localhost:5000/api/papers/1
```

### Get Faculty

```bash
curl http://localhost:5000/api/faculty
```

### Get Projects

```bash
curl http://localhost:5000/api/projects
```

### Submit Application (POST)

```bash
curl -X POST http://localhost:5000/api/projects/apply \
  -H "Content-Type: application/json" \
  -d '{
    "student_name": "Test User",
    "student_email": "test@test.com",
    "student_phone": "1234567890",
    "project_id": 1,
    "project_title": "AI Project",
    "cover_letter": "I am interested..."
  }'
```

---

## ✅ Features Checklist

**Pages:**

- ✅ Home (index.html)
- ✅ Research Papers (research.html)
- ✅ Paper Details (research-details.html)
- ✅ Participate (participate.html)
- ✅ Faculty List (faculty.html)
- ✅ Faculty Profile (faculty-profile.html)
- ✅ Internships (internships.html)
- ✅ Login/Register (login.html)
- ✅ Dashboard (dashboard.html)

**Functionality:**

- ✅ Search & Filter Papers
- ✅ View Paper Details
- ✅ Apply for Research Projects
- ✅ Apply for Internships
- ✅ View Faculty Profiles
- ✅ User Authentication
- ✅ User Dashboard
- ✅ Save Papers (localStorage)
- ✅ Application Tracking

**Technical:**

- ✅ Flask Backend
- ✅ SQLite Database
- ✅ REST APIs
- ✅ Plain HTML (No Jinja)
- ✅ Plain CSS (No frameworks)
- ✅ Plain JavaScript (No frameworks)
- ✅ Responsive Design
- ✅ Dynamic Data Loading

---

## 🎨 UI Features

- Gradient header backgrounds
- Card-based layouts
- Hover animations
- Modal forms
- Responsive grid layouts
- Clean typography
- Color-coded badges
- Loading states
- Success/error messages

---

## 💡 Tips

1. **Clear Browser Cache**: If styles don't load, clear cache or hard refresh (Ctrl+Shift+R)
2. **Check Console**: Open browser DevTools (F12) to see any JavaScript errors
3. **Database Reset**: Run `python database/seed.py` again to reset data
4. **Port Issues**: Change port in app.py if 5000 is busy
5. **CORS Issues**: Make sure Flask-CORS is installed

---

## 🐛 Common Issues

**Problem**: "Module not found"
**Solution**: `pip install -r requirements.txt`

**Problem**: "No module named 'database'"
**Solution**: Make sure you're in the project root directory

**Problem**: "Database locked"
**Solution**: Close any other Python processes accessing the database

**Problem**: Styles not loading
**Solution**: Check that Flask is running and clear browser cache

**Problem**: API returns 404
**Solution**: Check Flask terminal for errors, ensure app.py is running

---

## 📧 Support

If you encounter issues:

1. Check the README.md for detailed documentation
2. Verify all files are in correct locations
3. Check Flask terminal output for errors
4. Check browser console for JavaScript errors

---

**Enjoy exploring the Campus Research Connect portal!** 🎓
