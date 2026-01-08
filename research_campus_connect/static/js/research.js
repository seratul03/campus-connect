// Research page JavaScript - Search and filter papers

// API base URL (use same-origin to avoid port mismatches)
const API_BASE = "/api";

// State
let allPapers = [];
let filteredPapers = [];

// Mock papers seeded from faculty names to keep UI usable without the API
const MOCK_PAPERS = [
  {
    id: 1,
    title: "Federated Soft Computing for Edge IoT",
    authors: "Dr. Shivnath Ghosh",
    domain: "Soft Computing",
    year: 2024,
    citations: 42,
    abstract:
      "A lightweight federated learning pipeline that blends soft computing with on-device optimization for resilient IoT deployments.",
  },
  {
    id: 2,
    title: "Transformers for Medical Image Segmentation",
    authors: "Dr. Saumya Das",
    domain: "Medical Image Analysis",
    year: 2023,
    citations: 58,
    abstract:
      "Evaluates hybrid CNN-transformer backbones for few-shot organ segmentation with constrained annotation budgets.",
  },
  {
    id: 3,
    title: "Nanoelectronic VLSI Co-design with ML",
    authors: "Dr. Kasturi Ghosh",
    domain: "VLSI",
    year: 2024,
    citations: 31,
    abstract:
      "Presents a co-design workflow that couples nanoelectronic device models with ML-driven layout exploration for low-power ICs.",
  },
  {
    id: 4,
    title: "Data-Centric Pipelines for Wireless Communication",
    authors: "Dr. Sandipan Biswas",
    domain: "Wireless Communication",
    year: 2023,
    citations: 26,
    abstract:
      "Benchmarks data-quality interventions that improve robustness of ML receivers in fading-channel simulations.",
  },
  {
    id: 5,
    title: "Deep Vision for Hyperspectral Crop Monitoring",
    authors: "Dr. Snigdha Madhab Ghosh",
    domain: "Computer Vision",
    year: 2024,
    citations: 19,
    abstract:
      "Introduces a compact vision transformer tuned for hyperspectral imagery to detect crop stress in real time.",
  },
  {
    id: 6,
    title: "IRS-Assisted IoT Networks with Learning Loops",
    authors: "Dr. Chandrima Thakur",
    domain: "IoT & Agriculture",
    year: 2023,
    citations: 34,
    abstract:
      "Combines intelligent reflecting surfaces with online RL policies to stabilize rural IoT links for precision farming.",
  },
];

// Load all papers on page load
async function loadPapers() {
  try {
    const loading = document.getElementById("loading");
    loading.style.display = "block";

    const response = await fetch(`${API_BASE}/papers`);
    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json();

    allPapers = Array.isArray(data) && data.length > 0 ? data : MOCK_PAPERS;
    filteredPapers = allPapers;

    loading.style.display = "none";
    displayPapers(filteredPapers);
    updateResultsCount();
  } catch (error) {
    console.error("Error loading papers:", error);
    allPapers = MOCK_PAPERS;
    filteredPapers = allPapers;
    document.getElementById("loading").style.display = "none";
    displayPapers(filteredPapers);
    updateResultsCount();
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
  const searchBtn = document.getElementById("search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", searchPapers);
  }

  // Search on Enter key
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchPapers();
      }
    });
  }

  // Filter changes
  const domainFilter = document.getElementById("domain-filter");
  if (domainFilter) {
    domainFilter.addEventListener("change", searchPapers);
  }

  const yearFilter = document.getElementById("year-filter");
  if (yearFilter) {
    yearFilter.addEventListener("change", searchPapers);
  }

  // Clear filters button
  const clearBtn = document.getElementById("clear-filters");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearFilters);
  }
});
