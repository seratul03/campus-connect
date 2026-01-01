/* =====================================
   api.js
   Central API helper for Campus Connect
   Handles backend + mock data fallback
   ===================================== */

/* -------------------------------------
   Backend Base URL (Flask – Local)
------------------------------------- */
const API_BASE_URL = "http://127.0.0.1:5000";

/* -------------------------------------
   Generic GET helper
------------------------------------- */
async function apiGet(endpoint, fallbackPath = null) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error("Backend not available");
    }

    return await response.json();
  } catch (error) {
    console.warn(`API failed for ${endpoint}. Using mock data.`);

    if (!fallbackPath) return null;

    try {
      const mockResponse = await fetch(fallbackPath);
      return await mockResponse.json();
    } catch (mockError) {
      console.error("Mock data load failed:", mockError);
      return null;
    }
  }
}

/* -------------------------------------
   PRACTICE MODULES
------------------------------------- */
async function getPracticeModules() {
  const data = await apiGet(
    "/api/practice",
    "../backend/data/practice.json"
  );

  if (!data || !data.categories) return [];

  /* Flatten categories → modules */
  return data.categories.flatMap(category =>
    category.modules.map(module => ({
      ...module,
      category: category.title
    }))
  );
}

/* -------------------------------------
   RESEARCH PROJECTS
------------------------------------- */
async function getResearchProjects() {
  const data = await apiGet(
    "/api/research",
    "../backend/data/research.json"
  );

  return data?.projects || [];
}

/* -------------------------------------
   JOBS
------------------------------------- */
async function getJobs() {
  const data = await apiGet(
    "/api/jobs",
    "../backend/data/jobs.json"
  );

  return data?.jobs || [];
}

/* -------------------------------------
   INTERNSHIPS
------------------------------------- */
async function getInternships() {
  const data = await apiGet(
    "/api/internships",
    "../backend/data/internships.json"
  );

  return data?.internships || [];
}

/* -------------------------------------
   ATS RESUME CHECK (Mock / Backend)
------------------------------------- */
async function checkResumeATS(resumeData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resumeData)
    });

    if (!response.ok) {
      throw new Error("ATS backend not available");
    }

    return await response.json();
  } catch (error) {
    console.warn("Using mock ATS response");

    /* Mock ATS response */
    return {
      score: 72,
      matched_keywords: ["Python", "HTML", "CSS", "JavaScript"],
      missing_keywords: ["React", "SQL"],
      suggestions: [
        "Add measurable achievements",
        "Include more technical keywords",
        "Improve project descriptions"
      ]
    };
  }
}
