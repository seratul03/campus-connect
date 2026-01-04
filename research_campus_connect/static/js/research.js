// Research page JavaScript - Search and filter papers

// API base URL (use same-origin to avoid port mismatches)
const API_BASE = "/api";

// State
let allPapers = [];
let filteredPapers = [];

// Load all papers on page load
async function loadPapers() {
  try {
    const loading = document.getElementById("loading");
    loading.style.display = "block";

    const response = await fetch(`${API_BASE}/papers`);
    allPapers = await response.json();
    filteredPapers = allPapers;

    loading.style.display = "none";
    displayPapers(filteredPapers);
    updateResultsCount();
  } catch (error) {
    console.error("Error loading papers:", error);
    document.getElementById("loading").textContent = "Error loading papers";
  }
}

// Display papers in the grid
function displayPapers(papers) {
  const container = document.getElementById("papers-container");
  const noResults = document.getElementById("no-results");

  if (papers.length === 0) {
    container.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  container.innerHTML = papers
    .map(
      (paper) => `
        <div class="paper-card" onclick="viewPaper(${paper.id})">
            <h3>${paper.title}</h3>
            <div class="paper-meta">
                <span class="authors">✍️ ${paper.authors}</span>
                <span class="domain-badge">${paper.domain}</span>
                <span class="year-badge">${paper.year}</span>
            </div>
            <p class="abstract">${paper.abstract}</p>
            <div class="citations">📊 ${paper.citations} citations</div>
        </div>
    `
    )
    .join("");
}

// Update results count
function updateResultsCount() {
  const countElement = document.getElementById("papers-count");
  countElement.textContent = `Showing ${filteredPapers.length} of ${allPapers.length} papers`;
}

// Search papers
function searchPapers() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const domain = document.getElementById("domain-filter").value;
  const year = document.getElementById("year-filter").value;

  filteredPapers = allPapers.filter((paper) => {
    const matchesSearch =
      !searchTerm ||
      paper.title.toLowerCase().includes(searchTerm) ||
      paper.authors.toLowerCase().includes(searchTerm) ||
      paper.abstract.toLowerCase().includes(searchTerm);

    const matchesDomain = !domain || paper.domain === domain;
    const matchesYear = !year || paper.year.toString() === year;

    return matchesSearch && matchesDomain && matchesYear;
  });

  displayPapers(filteredPapers);
  updateResultsCount();
}

// Clear all filters
function clearFilters() {
  document.getElementById("search-input").value = "";
  document.getElementById("domain-filter").value = "";
  document.getElementById("year-filter").value = "";

  filteredPapers = allPapers;
  displayPapers(filteredPapers);
  updateResultsCount();
}

// Navigate to paper details
function viewPaper(paperId) {
  window.location.href = `/research-details?id=${paperId}`;
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  loadPapers();

  // Search button
  document.getElementById("search-btn").addEventListener("click", searchPapers);

  // Search on Enter key
  document.getElementById("search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchPapers();
    }
  });

  // Filter changes
  document
    .getElementById("domain-filter")
    .addEventListener("change", searchPapers);
  document
    .getElementById("year-filter")
    .addEventListener("change", searchPapers);

  // Clear filters button
  document
    .getElementById("clear-filters")
    .addEventListener("click", clearFilters);
});
