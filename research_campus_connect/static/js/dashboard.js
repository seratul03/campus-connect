// Dashboard JavaScript - Display user's applications and saved papers

// API base URL (same-origin; default server port is 5500)
const API_BASE = "/api";

// Current user - set default email for demo
let currentUser = {
  name: "Dr. Sandipan Biswas",
  email: "sandipan.biswas@univ.edu",
};
let allApplications = [];
let currentFilter = "all";

// Mock data using faculty names so the dashboard stays populated without the API
const MOCK_APPLICATIONS = [
  {
    id: 101,
    type: "research",
    project_title: "Edge ML for Wireless Receivers",
    applied_date: "2024-12-10",
    status: "pending",
  },
  {
    id: 102,
    type: "research",
    project_title: "Hyperspectral Crop Analytics with Dr. Snigdha Madhab Ghosh",
    applied_date: "2024-11-22",
    status: "accepted",
  },
  {
    id: 103,
    type: "internship",
    internship_company: "AIoT Lab (Dr. Shivnath Ghosh)",
    applied_date: "2024-12-01",
    status: "pending",
  },
  {
    id: 104,
    type: "research",
    project_title: "VLSI Reliability with Dr. Kasturi Ghosh",
    applied_date: "2024-10-30",
    status: "accepted",
  },
];

const MOCK_SAVED_PAPERS = [
  {
    id: 1,
    title: "Federated Soft Computing for Edge IoT",
    authors: "Dr. Shivnath Ghosh",
    year: 2024,
  },
  {
    id: 2,
    title: "Transformers for Medical Image Segmentation",
    authors: "Dr. Saumya Das",
    year: 2023,
  },
  {
    id: 3,
    title: "Nanoelectronic VLSI Co-design with ML",
    authors: "Dr. Kasturi Ghosh",
    year: 2024,
  },
];

// Set user name
function setUserName() {
  const userNameElement = document.getElementById("user-name");
  if (userNameElement) {
    userNameElement.textContent = currentUser.name;
  }
}

// Load user's applications
async function loadApplications() {
  if (!currentUser) return;

  try {
    const response = await fetch(
      `${API_BASE}/dashboard/applications?email=${currentUser.email}`
    );
    const data = await response.json();
    allApplications =
      Array.isArray(data) && data.length > 0 ? data : MOCK_APPLICATIONS;

    document.getElementById("loading").style.display = "none";
    updateStats();
    displayApplications(allApplications);
  } catch (error) {
    console.error("Error loading applications:", error);
    allApplications = MOCK_APPLICATIONS;
    document.getElementById("loading").style.display = "none";
    updateStats();
    displayApplications(allApplications);
  }
}

// Update statistics
function updateStats() {
  const total = allApplications.length;
  const pending = allApplications.filter(
    (app) => app.status === "pending"
  ).length;
  const accepted = allApplications.filter(
    (app) => app.status === "accepted"
  ).length;

  document.getElementById("total-applications").textContent = total;
  document.getElementById("pending-applications").textContent = pending;
  document.getElementById("accepted-applications").textContent = accepted;

  // Load saved papers count
  const savedPapers = JSON.parse(localStorage.getItem("savedPapers") || "[]");
  document.getElementById("saved-papers").textContent = savedPapers.length;
}

// Display applications
function displayApplications(applications) {
  const container = document.getElementById("applications-container");
  const noApplications = document.getElementById("no-applications");

  // Filter applications based on current filter
  let filteredApps = applications;
  if (currentFilter !== "all") {
    filteredApps = applications.filter((app) => app.type === currentFilter);
  }

  if (filteredApps.length === 0) {
    container.innerHTML = "";
    noApplications.style.display = "block";
    return;
  }

  noApplications.style.display = "none";
  container.innerHTML = filteredApps
    .map(
      (app) => `
        <div class="application-item">
            <div class="application-header">
                <div>
                    <h3 class="application-title">
                        ${
                          app.type === "research"
                            ? app.project_title
                            : app.internship_company
                        }
                    </h3>
                    <p class="application-meta">
                        Applied on: ${new Date(
                          app.applied_date
                        ).toLocaleDateString()}
                    </p>
                </div>
                <span class="type-badge ${
                  app.type
                }">${app.type.toUpperCase()}</span>
            </div>
            <span class="status-badge ${
              app.status
            }">${app.status.toUpperCase()}</span>
        </div>
    `
    )
    .join("");
}

// Filter applications
function filterApplications(type) {
  currentFilter = type;
  displayApplications(allApplications);

  // Update active tab
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.tab === type) {
      btn.classList.add("active");
    }
  });
}

// Load saved papers
function loadSavedPapers() {
  let savedPapers = JSON.parse(localStorage.getItem("savedPapers") || "[]");

  // Seed local storage with faculty-authored papers if empty
  if (savedPapers.length === 0) {
    savedPapers = MOCK_SAVED_PAPERS;
    localStorage.setItem("savedPapers", JSON.stringify(savedPapers));
  }
  const container = document.getElementById("saved-papers-container");
  const noSavedPapers = document.getElementById("no-saved-papers");

  if (savedPapers.length === 0) {
    container.innerHTML = "";
    noSavedPapers.style.display = "block";
    return;
  }

  noSavedPapers.style.display = "none";
  container.innerHTML = savedPapers
    .map(
      (paper) => `
        <div class="saved-paper-card" onclick="viewPaper(${paper.id})">
            <h4>${paper.title}</h4>
            <div class="meta">
                <span>${paper.authors}</span> • 
                <span>${paper.year}</span>
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

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  setUserName();
  loadApplications();
  loadSavedPapers();

  // Tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      filterApplications(btn.dataset.tab);
    });
  });
});
