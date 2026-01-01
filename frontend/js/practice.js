/* =====================================================
   PRACTICE PAGE LOGIC – FINAL
===================================================== */

let RAW_MODULES = [];
let ACTIVE_MODULES = [];

/* ---------- MOCK ATS PROFILE ---------- */
const ATS_PROFILE = {
  matched_skills: ["python", "html", "css"],
  missing_skills: ["dsa", "sql", "javascript"]
};

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", loadPracticeData);

async function loadPracticeData() {
  const res = await fetch("../backend/data/practice.json");
  const data = await res.json();

  RAW_MODULES = flattenData(data.categories);
  ACTIVE_MODULES = [...RAW_MODULES];

  renderModules(ACTIVE_MODULES);
  populateFilters(RAW_MODULES);
  renderRecommendedModules();
}

/* ---------- DATA NORMALIZATION ---------- */
function flattenData(categories) {
  const list = [];

  categories.forEach(cat => {
    cat.modules.forEach(m => {
      const progress = Math.floor(Math.random() * 90);
      const status =
        progress === 100 ? "Completed" :
        progress > 0 ? "In Progress" : "Not Started";

      list.push({
        category_id: cat.id,
        category_title: cat.title,
        title: m.title,
        level: m.level,
        estimated_time: m.estimated_time,
        practice_type: m.practice_type,
        topics: m.topics || [],
        sample_questions: m.sample_questions || [],
        progress,
        status
      });
    });
  });

  return list;
}

/* ---------- SEARCH ---------- */
function searchModules(q) {
  q = q.toLowerCase();
  ACTIVE_MODULES = RAW_MODULES.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.category_title.toLowerCase().includes(q) ||
    m.topics.join(" ").toLowerCase().includes(q) ||
    m.sample_questions.join(" ").toLowerCase().includes(q)
  );
  renderModules(ACTIVE_MODULES);
}

/* ---------- FILTER ---------- */
function applyFilters() {
  const cat = categoryFilter.value;
  const lvl = levelFilter.value;

  ACTIVE_MODULES = RAW_MODULES.filter(m =>
    (cat === "All" || m.category_id === cat) &&
    (lvl === "All" || m.level === lvl)
  );
  renderModules(ACTIVE_MODULES);
}

/* ---------- SORT ---------- */
function sortModules(type) {
  const order = { Beginner: 1, Intermediate: 2, Advanced: 3 };

  ACTIVE_MODULES.sort((a, b) => {
    if (type === "level") return order[a.level] - order[b.level];
    if (type === "time")
      return parseFloat(a.estimated_time) - parseFloat(b.estimated_time);
    return 0;
  });

  renderModules(ACTIVE_MODULES);
}

/* ---------- RENDER PRACTICE ---------- */
function renderModules(list) {
  const container = document.getElementById("practiceContainer");
  container.innerHTML = "";

  list.forEach(m => container.appendChild(createCard(m)));
}

/* ---------- CARD ---------- */
function createCard(m) {
  const card = document.createElement("div");
  card.className = "practice-card";

  card.innerHTML = `
    <span class="badge">${m.level}</span>
    <h3>${m.title}</h3>
    <p>${m.category_title}</p>

    <div class="status">${m.status}</div>

    <div class="progress-bar">
      <div style="width:${m.progress}%"></div>
    </div>

    <button>Continue →</button>
  `;

  return card;
}

/* ---------- RECOMMENDATIONS ---------- */
function renderRecommendedModules() {
  const recs = RAW_MODULES
    .map(m => {
      let score = 0;
      ATS_PROFILE.missing_skills.forEach(skill => {
        if (m.category_id.includes(skill)) score += 3;
        if (m.topics.join(" ").toLowerCase().includes(skill)) score += 2;
      });
      return { ...m, score };
    })
    .filter(m => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const panel = document.getElementById("recommendationList");
  panel.innerHTML = "";

  recs.forEach(m => {
    const card = document.createElement("div");
    card.className = "practice-card recommended";

    card.innerHTML = `
      <span class="badge">${m.level}</span>
      <h3>${m.title}</h3>
      <p>${m.category_title}</p>

      <div class="why-tooltip">
        Why recommended?
        <span class="tooltip-text">
          Your ATS analysis shows gaps in:
          <strong>${ATS_PROFILE.missing_skills.join(", ")}</strong>.
          This module helps strengthen those skills.
        </span>
      </div>

      <button>Start →</button>
    `;

    panel.appendChild(card);
  });
}

/* ---------- FILTER OPTIONS ---------- */
function populateFilters(data) {
  const cats = new Map();
  const lvls = new Set();

  data.forEach(m => {
    cats.set(m.category_id, m.category_title);
    lvls.add(m.level);
  });

  cats.forEach((v, k) => {
    categoryFilter.innerHTML += `<option value="${k}">${v}</option>`;
  });

  lvls.forEach(l => {
    levelFilter.innerHTML += `<option value="${l}">${l}</option>`;
  });
}
