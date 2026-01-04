// Research details page JavaScript - Display specific paper details

// API base URL (use same-origin to avoid port mismatches)
const API_BASE = "/api";

// Mock data for additional paper details (citation history, H-index data)
const mockPaperExtras = {
  1: {
    citation_history: {
      years: [2019, 2020, 2021, 2022, 2023, 2024],
      citations: [5, 15, 35, 55, 95, 145],
    },
    author_citations: [
      245, 189, 156, 134, 98, 76, 54, 45, 32, 28, 21, 15, 12, 8, 5,
    ],
  },
  2: {
    citation_history: {
      years: [2020, 2021, 2022, 2023, 2024],
      citations: [3, 12, 28, 52, 89],
    },
    author_citations: [
      178, 145, 123, 98, 87, 76, 65, 54, 43, 32, 21, 15, 10, 7, 4,
    ],
  },
  3: {
    citation_history: {
      years: [2022, 2023, 2024],
      citations: [8, 32, 67],
    },
    author_citations: [
      156, 134, 112, 98, 87, 76, 65, 54, 43, 32, 28, 21, 15, 12, 8,
    ],
  },
  4: {
    citation_history: {
      years: [2019, 2020, 2021, 2022, 2023, 2024],
      citations: [15, 38, 72, 108, 165, 234],
    },
    author_citations: [
      298, 245, 198, 167, 145, 123, 98, 87, 76, 65, 54, 43, 32, 28, 21, 18, 15,
      12,
    ],
  },
  5: {
    citation_history: {
      years: [2021, 2022, 2023, 2024],
      citations: [12, 35, 68, 112],
    },
    author_citations: [
      189, 156, 134, 112, 98, 87, 76, 65, 54, 43, 32, 28, 21, 15, 12,
    ],
  },
  6: {
    citation_history: {
      years: [2020, 2021, 2022, 2023, 2024],
      citations: [18, 42, 78, 118, 178],
    },
    author_citations: [
      234, 189, 167, 145, 123, 112, 98, 87, 76, 65, 54, 43, 32, 28, 21, 18,
    ],
  },
  7: {
    citation_history: {
      years: [2022, 2023, 2024],
      citations: [15, 48, 95],
    },
    author_citations: [
      178, 156, 134, 112, 98, 87, 76, 65, 54, 43, 32, 28, 21, 15,
    ],
  },
  8: {
    citation_history: {
      years: [2020, 2021, 2022, 2023, 2024],
      citations: [8, 28, 52, 88, 134],
    },
    author_citations: [
      198, 167, 145, 123, 112, 98, 87, 76, 65, 54, 43, 32, 28, 21, 18, 15,
    ],
  },
};

// Get paper ID from URL
function getPaperIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Load paper details
async function loadPaperDetails() {
  const paperId = getPaperIdFromURL();

  if (!paperId) {
    document.getElementById("loading").textContent = "No paper ID provided";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/papers/${paperId}`);

    if (!response.ok) {
      throw new Error("Paper not found");
    }

    const paper = await response.json();

    // Merge mock data with API data
    const paperWithExtras = {
      ...paper,
      ...mockPaperExtras[paperId],
    };

    displayPaperDetails(paperWithExtras);
    loadRelatedPapers(paper.domain, paperId);
  } catch (error) {
    console.error("Error loading paper:", error);
    document.getElementById("loading").textContent =
      "Error loading paper details";
  }
}

// Display paper details
function displayPaperDetails(paper) {
  document.getElementById("loading").style.display = "none";
  document.getElementById("paper-content").style.display = "block";

  // Title and meta
  document.getElementById("paper-title").textContent = paper.title;
  document.getElementById("paper-year").textContent = paper.year;
  document.getElementById("paper-domain").textContent = paper.domain;

  // Authors
  document.getElementById("paper-authors").textContent = paper.authors;

  // Abstract
  document.getElementById("paper-abstract").textContent = paper.abstract;

  // Keywords
  if (paper.keywords) {
    const keywordsContainer = document.getElementById("paper-keywords");
    const keywords = paper.keywords.split(",").map((k) => k.trim());
    keywordsContainer.innerHTML = keywords
      .map((keyword) => `<span class="keyword">${keyword}</span>`)
      .join("");
  }

  // PDF link
  const pdfLink = document.getElementById("pdf-link");
  if (paper.pdf_url) {
    pdfLink.href = paper.pdf_url;
  } else {
    pdfLink.style.display = "none";
  }

  // Save button (remove previous listeners to avoid duplicates)
  const saveBtn = document.getElementById("save-btn");
  const newSaveBtn = saveBtn.cloneNode(true);
  saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
  newSaveBtn.addEventListener("click", () => savePaper(paper));

  // --- H-index ---
  if (paper.author_citations) {
    const h = calculateHIndex(paper.author_citations);
    document.getElementById("h-index-badge").textContent = `H-index: ${h}`;
  } else {
    document.getElementById("h-index-badge").textContent = `H-index: —`;
  }

  // --- Citation Graph ---
  if (paper.citation_history) {
    drawCitationGraph(
      paper.citation_history.years,
      paper.citation_history.citations
    );
  }
}

// Load related papers (same domain)
async function loadRelatedPapers(domain, currentPaperId) {
  try {
    const response = await fetch(`${API_BASE}/papers?domain=${domain}`);
    const papers = await response.json();

    // Filter out current paper and limit to 3
    const relatedPapers = papers
      .filter((p) => p.id != currentPaperId)
      .slice(0, 3);

    displayRelatedPapers(relatedPapers);
  } catch (error) {
    console.error("Error loading related papers:", error);
  }
}

// Display related papers
function displayRelatedPapers(papers) {
  const container = document.getElementById("related-papers");

  if (papers.length === 0) {
    container.innerHTML = "<p>No related papers found.</p>";
    return;
  }

  container.innerHTML = papers
    .map(
      (paper) => `
        <div class="related-paper-card" onclick="viewPaper(${paper.id})">
            <h4>${paper.title}</h4>
            <div class="meta">
                <span>${paper.authors}</span> • 
                <span>${paper.year}</span> • 
                <span>${paper.citations} citations</span>
            </div>
        </div>
    `
    )
    .join("");
}

// Save paper to local storage
function savePaper(paper) {
  let savedPapers = JSON.parse(localStorage.getItem("savedPapers") || "[]");

  // Check if already saved
  if (savedPapers.some((p) => p.id === paper.id)) {
    alert("Paper already saved!");
    return;
  }

  savedPapers.push({
    id: paper.id,
    title: paper.title,
    authors: paper.authors,
    year: paper.year,
  });

  localStorage.setItem("savedPapers", JSON.stringify(savedPapers));
  alert("Paper saved successfully!");
}

// Navigate to another paper
function viewPaper(paperId) {
  window.location.href = `/research-details?id=${paperId}`;
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  loadPaperDetails();
});

function calculateHIndex(citationsArray) {
  citationsArray.sort((a, b) => b - a);
  let h = 0;
  for (let i = 0; i < citationsArray.length; i++) {
    if (citationsArray[i] >= i + 1) h++;
    else break;
  }
  return h;
}

function drawCitationGraph(years, citations) {
  const svg = document.getElementById("citation-graph");
  svg.innerHTML = "";

  // const width = svg.clientWidth;
  const width = 800;
  const height = 200;
  const padding = 40;

  const maxCite = Math.max(...citations);
  const minCite = 0;

  // Draw grid lines
  const gridLines = 5;
  for (let i = 0; i <= gridLines; i++) {
    const y = padding + (i / gridLines) * (height - padding * 2);
    const value = Math.round(maxCite - (i / gridLines) * maxCite);

    svg.innerHTML += `
      <line 
        x1="${padding}" 
        y1="${y}" 
        x2="${width - padding}" 
        y2="${y}" 
        stroke="rgba(0,0,0,0.05)" 
        stroke-width="1"
      />
      <text 
        x="${padding - 10}" 
        y="${y + 5}" 
        text-anchor="end" 
        font-size="12" 
        fill="#64748b"
      >${value}</text>
    `;
  }

  // Calculate points
  const points = citations
    .map((c, i) => {
      const x = padding + (i / (citations.length - 1)) * (width - padding * 2);
      const y =
        height -
        padding -
        ((c - minCite) / (maxCite - minCite)) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  // Draw gradient area under the line
  const areaPoints = citations
    .map((c, i) => {
      const x = padding + (i / (citations.length - 1)) * (width - padding * 2);
      const y =
        height -
        padding -
        ((c - minCite) / (maxCite - minCite)) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  svg.innerHTML += `
    <defs>
      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:#667eea;stop-opacity:0" />
      </linearGradient>
    </defs>
    <polygon 
      fill="url(#areaGradient)"
      points="${areaPoints} ${width - padding},${height - padding} ${padding},${
    height - padding
  }"
    />
  `;

  // Draw the line
  svg.innerHTML += `
    <polyline 
      fill="none"
      stroke="#667eea"
      stroke-width="3"
      points="${points}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  `;

  // Draw dots and year labels
  citations.forEach((c, i) => {
    const x = padding + (i / (citations.length - 1)) * (width - padding * 2);
    const y =
      height -
      padding -
      ((c - minCite) / (maxCite - minCite)) * (height - padding * 2);

    // Dot
    svg.innerHTML += `
      <circle 
        cx="${x}" 
        cy="${y}" 
        r="5" 
        fill="#667eea"
        stroke="white"
        stroke-width="2"
        class="citation-dot"
      />
    `;

    // Year label
    svg.innerHTML += `
      <text 
        x="${x}" 
        y="${height - padding + 20}" 
        text-anchor="middle" 
        font-size="12" 
        fill="#64748b"
        font-weight="600"
      >${years[i]}</text>
    `;

    // Citation count on hover (tooltip effect)
    svg.innerHTML += `
      <title>${years[i]}: ${c} citations</title>
    `;
  });

  // Add axis labels
  svg.innerHTML += `
    <text 
      x="${width / 2}" 
      y="${height - 5}" 
      text-anchor="middle" 
      font-size="14" 
      fill="#334155"
      font-weight="600"
    >Year</text>
    <text 
      x="${15}" 
      y="${height / 2}" 
      text-anchor="middle" 
      font-size="14" 
      fill="#334155"
      font-weight="600"
      transform="rotate(-90, 15, ${height / 2})"
    >Citations</text>
  `;
}
