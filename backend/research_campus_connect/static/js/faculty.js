// Faculty page JavaScript - Display faculty list with filters

// State
let allFaculty = [];
let filteredFaculty = [];

// Load all faculty from local JSON file
async function loadFaculty() {
  try {
    const loading = document.getElementById("loading");
    loading.style.display = "block";

    const response = await fetch("/Faculty/faculty.json");
    const data = await response.json();

    // Convert the faculty object to an array with proper structure
    allFaculty = Object.entries(data.faculty).map(([id, faculty], index) => ({
      id: index + 1,
      name: faculty.name,
      designation: faculty.position,
      department: data.department,
      research_areas: faculty.research_area
        ? faculty.research_area.join(", ")
        : " ",
      email: `${id.replace(/-/g, ".")}@university.edu`, // Generate email from id
      image_url: `/${faculty.photo}`,
      qualification: faculty.qualification,
    }));

    filteredFaculty = allFaculty;

    loading.style.display = "none";
    displayFaculty(filteredFaculty);
  } catch (error) {
    console.error("Error loading faculty:", error);
    document.getElementById("loading").textContent =
      "Error loading faculty. Please check if faculty.json exists.";
  }
}

// Display faculty
function displayFaculty(faculty) {
  const container = document.getElementById("faculty-container");
  const noResults = document.getElementById("no-results");

  if (faculty.length === 0) {
    container.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  container.innerHTML = faculty
    .map(
      (member) => `
        <div class="faculty-card" onclick="viewFacultyProfile(${member.id})">
            <div class="faculty-image">
                <img src="${member.image_url}" alt="${member.name}">
            </div>
            <h3>${member.name}</h3>
            <p class="designation">${member.designation}</p>
            <p class="department">${member.department}</p>
            <p class="research-areas">${member.research_areas}</p>
            <p class="email">${member.email}</p>
            <a href="/faculty-profile?id=${member.id}" class="btn btn-primary" onclick="event.stopPropagation()">View Profile</a>
        </div>
    `
    )
    .join("");
}

// Filter faculty by name search
function filterFaculty() {
  const searchTerm = document.getElementById("name-search").value.toLowerCase();

  if (!searchTerm) {
    filteredFaculty = allFaculty;
  } else {
    filteredFaculty = allFaculty.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm) ||
        member.research_areas.toLowerCase().includes(searchTerm) ||
        member.designation.toLowerCase().includes(searchTerm)
    );
  }

  displayFaculty(filteredFaculty);
}

// Navigate to faculty profile
function viewFacultyProfile(facultyId) {
  window.location.href = `/faculty-profile?id=${facultyId}`;
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  loadFaculty();

  // Name search filter with debouncing
  let searchTimeout;
  document.getElementById("name-search").addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(filterFaculty, 300);
  });
});
