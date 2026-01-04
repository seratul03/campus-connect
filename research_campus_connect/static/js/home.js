// Use same-origin to work on any port (default 5500)
const API_BASE = "/api";

async function loadPapers() {
  const res = await fetch(`${API_BASE}/papers`);
  const papers = await res.json();

  document.getElementById("papers-container").innerHTML = papers
    .slice(0, 3)
    .map(
      (p) => `
            <div class="card">
                <h3>${p.title}</h3>
                <p>${p.authors}</p>
                <small>📊 ${p.citations} citations</small>
            </div>
        `
    )
    .join("");
}

async function loadProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  const projects = await res.json();

  document.getElementById("projects-container").innerHTML = projects
    .slice(0, 3)
    .map(
      (p) => `
            <div class="card">
                <h3>${p.title}</h3>
                <p>${p.description.substring(0, 120)}...</p>
            </div>
        `
    )
    .join("");
}

async function loadInternships() {
  const res = await fetch(`${API_BASE}/internships`);
  const internships = await res.json();

  document.getElementById("internships-container").innerHTML = internships
    .slice(0, 4)
    .map(
      (i) => `
            <div class="card">
                <h3>${i.company}</h3>
                <p>${i.role}</p>
                <small>📍 ${i.location}</small>
            </div>
        `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  loadPapers();
  loadProjects();
  loadInternships();
});
