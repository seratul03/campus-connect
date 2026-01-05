// Participate page JavaScript - Display projects and handle applications

// API base URL (use same-origin to avoid port mismatches)
const API_BASE = "/api";

// State
let allProjects = [];
let filteredProjects = [];

// Load all projects
async function loadProjects() {
  try {
    const loading = document.getElementById("loading");
    loading.style.display = "block";

    const response = await fetch(`${API_BASE}/projects`);
    allProjects = await response.json();
    filteredProjects = allProjects;

    loading.style.display = "none";
    displayProjects(filteredProjects);
  } catch (error) {
    console.error("Error loading projects:", error);
    document.getElementById("loading").textContent = "Error loading projects";
  }
}

// Display projects
function displayProjects(projects) {
  const container = document.getElementById("projects-container");
  const noResults = document.getElementById("no-results");

  if (projects.length === 0) {
    container.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  container.innerHTML = projects
    .map(
      (project) => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <div class="project-meta">
                <span class="faculty-name">👨‍🏫 ${project.faculty_name}</span>
                <span class="domain-badge">${project.domain}</span>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-info">
                <p><strong>Duration:</strong> ${project.duration}</p>
                <p><strong>Start Date:</strong> ${project.start_date}</p>
                <p><strong>Requirements:</strong> ${project.requirements}</p>
            </div>
            <span class="status-badge ${
              project.status
            }">${project.status.toUpperCase()}</span>
            ${
              project.status === "open"
                ? `<button class="btn btn-primary" onclick="openApplicationModal(${project.id}, '${project.title}')">Apply Now</button>`
                : `<button class="btn btn-outline" disabled>Applications Closed</button>`
            }
        </div>
    `
    )
    .join("");
}

// Filter projects
function filterProjects() {
  const status = document.getElementById("status-filter").value;
  const domain = document.getElementById("domain-filter").value;

  filteredProjects = allProjects.filter((project) => {
    const matchesStatus = !status || project.status === status;
    const matchesDomain = !domain || project.domain === domain;
    return matchesStatus && matchesDomain;
  });

  displayProjects(filteredProjects);
}

// Open application modal
function openApplicationModal(projectId, projectTitle) {
  const modal = document.getElementById("application-modal");
  document.getElementById("project-id").value = projectId;
  document.getElementById("project-title-input").value = projectTitle;
  modal.style.display = "block";
}

// Close application modal
function closeModal() {
  const modal = document.getElementById("application-modal");
  modal.style.display = "none";
  document.getElementById("application-form").reset();
}

// Submit application
async function submitApplication(event) {
  event.preventDefault();

  const applicationData = {
    student_name: document.getElementById("student-name").value,
    student_email: document.getElementById("student-email").value,
    student_phone: document.getElementById("student-phone").value,
    project_id: document.getElementById("project-id").value,
    project_title: document.getElementById("project-title-input").value,
    cover_letter: document.getElementById("cover-letter").value,
    resume_url: document.getElementById("resume-url").value,
  };

  try {
    const response = await fetch(`${API_BASE}/projects/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });

    const result = await response.json();

    if (result.success) {
      closeModal();
      showSuccessMessage("Application submitted successfully!");
    } else {
      alert("Error submitting application: " + result.message);
    }
  } catch (error) {
    console.error("Error submitting application:", error);
    alert("Error submitting application. Please try again.");
  }
}

// Show success message
function showSuccessMessage(message) {
  const successMsg = document.getElementById("success-message");
  successMsg.textContent = message;
  successMsg.style.display = "block";

  setTimeout(() => {
    successMsg.style.display = "none";
  }, 3000);
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  loadProjects();

  // Filter changes
  document
    .getElementById("status-filter")
    .addEventListener("change", filterProjects);
  document
    .getElementById("domain-filter")
    .addEventListener("change", filterProjects);

  // Form submission
  document
    .getElementById("application-form")
    .addEventListener("submit", submitApplication);

  // Close modal when clicking X
  document.querySelector(".close").addEventListener("click", closeModal);

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("application-modal");
    if (event.target === modal) {
      closeModal();
    }
  });
});
