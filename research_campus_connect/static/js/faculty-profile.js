// Faculty profile page JavaScript - Display specific faculty member details

// API base URL (same-origin; default server port is 5500)
const API_BASE = "/api";

// Get faculty ID from URL
function getFacultyIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Load faculty profile
async function loadFacultyProfile() {
  const facultyId = getFacultyIdFromURL();

  if (!facultyId) {
    document.getElementById("loading").textContent = "No faculty ID provided";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/faculty/${facultyId}`);

    if (!response.ok) {
      throw new Error("Faculty not found");
    }

    const faculty = await response.json();
    displayFacultyProfile(faculty);
  } catch (error) {
    console.error("Error loading faculty profile:", error);
    document.getElementById("loading").textContent =
      "Error loading faculty profile";
  }
}

// Display faculty profile
function displayFacultyProfile(faculty) {
  document.getElementById("loading").style.display = "none";
  document.getElementById("profile-content").style.display = "block";

  // Profile header
  document.getElementById("faculty-image").src = faculty.image_url;
  document.getElementById("faculty-image").alt = faculty.name;
  document.getElementById("faculty-name").textContent = faculty.name;
  document.getElementById("faculty-designation").textContent =
    faculty.designation;
  document.getElementById("faculty-department").textContent =
    faculty.department;

  // Contact info
  document.getElementById("faculty-email").textContent = faculty.email;
  document.getElementById("faculty-phone").textContent =
    faculty.phone || "Not provided";

  // Biography
  document.getElementById("faculty-bio").textContent = faculty.bio;

  // Research areas
  const researchAreasContainer = document.getElementById("research-areas");
  const researchAreas = faculty.research_areas
    .split(",")
    .map((area) => area.trim());
  researchAreasContainer.innerHTML = researchAreas
    .map((area) => `<span class="research-area">${area}</span>`)
    .join("");

  // Publications
  displayPublications(faculty.papers);

  // Email button
  document.getElementById("email-button").href = `mailto:${faculty.email}`;
}

// Display publications
function displayPublications(papers) {
  const container = document.getElementById("publications");
  const noPublications = document.getElementById("no-publications");

  if (!papers || papers.length === 0) {
    container.style.display = "none";
    noPublications.style.display = "block";
    return;
  }

  noPublications.style.display = "none";
  container.innerHTML = papers
    .map(
      (paper) => `
        <div class="publication-item" onclick="viewPaper(${paper.id})">
            <h4>${paper.title}</h4>
            <div class="publication-meta">
                <span>${paper.year}</span> • 
                <span>${paper.citations} citations</span>
            </div>
        </div>
    `
    )
    .join("");
}

// Navigate to paper details
function viewPaper(paperId) {
  window.location.href = `/research-details?id=${paperId}`;
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  loadFacultyProfile();
});
