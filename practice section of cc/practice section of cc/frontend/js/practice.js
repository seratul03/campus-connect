/* =====================================================
   PRACTICE PAGE LOGIC – FINAL
===================================================== */

let RAW_MODULES = [];
let ACTIVE_MODULES = [];

/* ---------- MOCK ATS PROFILE (demo) ---------- */
const ATS_PROFILE = {
  matched_skills: ["python", "html", "css"],
  missing_skills: ["dsa", "sql", "javascript"]
};

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", loadPracticeData);

/* ---------- LOAD PRACTICE DATA ---------- */
async function loadPracticeData() {
  const res = await fetch("http://localhost:5000/api/practice");
  const data = await res.json();

  RAW_MODULES = flattenData(data.categories);
  ACTIVE_MODULES = [...RAW_MODULES];

  renderModules(ACTIVE_MODULES);
  populateFilters(RAW_MODULES);
  renderRecommendedModules();

  // dashboards
  updateOverallProgress();
  updateScoreStats();
  showSkillGapSuggestion();
}

/* ---------- DATA NORMALIZATION ---------- */
function flattenData(categories) {
  const list = [];

  categories.forEach(cat => {
    cat.modules.forEach(m => {
      const progress = Math.floor(Math.random() * 90);

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
        status:
          progress === 100 ? "Completed" :
          progress > 0 ? "In Progress" :
          "Not Started"
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

/* ---------- RENDER PRACTICE LIST ---------- */
function renderModules(list) {
  const container = document.getElementById("practiceContainer");
  container.innerHTML = "";
  list.forEach(m => container.appendChild(createCard(m)));
}

/* ---------- CARD (SYNCED WITH DETAIL PAGE) ---------- */
function createCard(m) {
  const stored = JSON.parse(localStorage.getItem("moduleProgress") || "{}");
  const progress = stored[m.title] ?? m.progress;

  const status =
    progress === 100
      ? "Completed"
      : progress > 0
      ? "In Progress"
      : "Not Started";

  const card = document.createElement("div");
  card.className = "practice-card";

  card.innerHTML = `
    <span class="badge">${m.level}</span>

    <h3>${m.title}</h3>
    <p>${m.category_title}</p>

    <div class="status">${status}</div>

    <div class="progress-bar">
      <div class="pb-fill" style="width:${progress}%"></div>
    </div>

    <button class="open-btn">Continue →</button>
  `;

  card.querySelector(".open-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    localStorage.setItem("selectedModule", JSON.stringify(m));
    window.location.href = "practice-detail.html";
  });

  return card;
}

/* ---------- RECOMMENDATIONS ---------- */
function renderRecommendedModules() {
  const recs = RAW_MODULES
    .map(m => {
      let score = 0;
      ATS_PROFILE.missing_skills.forEach(skill => {
        if (m.category_id.toLowerCase().includes(skill)) score += 3;
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

    card.addEventListener("click", () => {
      localStorage.setItem("selectedModule", JSON.stringify(m));
      window.location.href = "practice-detail.html";
    });

    panel.appendChild(card);
  });
}

/* ---------- FILTER DROPDOWNS ---------- */
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

/* ---------- MODAL ---------- */
function openProgress() {
  document.getElementById("progressModal").style.display = "flex";
  updateOverallProgress();
  updateScoreStats();
}

function closeProgress() {
  document.getElementById("progressModal").style.display = "none";
}

/* ---------- ANIMATION ---------- */
function animateValue(el, start, end, duration = 700) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = Math.min((timestamp - startTime) / duration, 1);
    let value = Math.floor(progress * (end - start) + start);

    el.textContent = value + (el.id === "overallPercent" ? "%" : "");

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ---------- OVERALL DASHBOARD ---------- */
function updateOverallProgress() {
  let savedProgress = JSON.parse(localStorage.getItem("moduleProgress") || "{}");

  let total = RAW_MODULES.length;
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;
  let sum = 0;

  RAW_MODULES.forEach(m => {
    let p = Number(savedProgress[m.title] ?? 0);
    sum += p;

    if (p === 100) completed++;
    else if (p > 0) inProgress++;
    else notStarted++;
  });

  let percent = total ? Math.round(sum / total) : 0;

  animateValue(document.getElementById("overallPercent"), 0, percent);
  animateValue(document.getElementById("countCompleted"), 0, completed);
  animateValue(document.getElementById("countProgress"), 0, inProgress);
  animateValue(document.getElementById("countNot"), 0, notStarted);

  const ring = document.querySelector(".ring");
  ring.style.transition = "background .8s ease";
  ring.style.background =
    `conic-gradient(#4f7cff ${percent * 3.6}deg, #e5e7eb 0deg)`;
}

/* ---------- AI SUGGESTION ---------- */
function showSkillGapSuggestion() {
  const gaps = JSON.parse(localStorage.getItem("atsMissingSkills") || "[]");
  if (!gaps.length) return;

  let savedProgress = JSON.parse(localStorage.getItem("moduleProgress") || "{}");

  let match = RAW_MODULES.find(m =>
    gaps.some(skill =>
      m.topics.join(" ").toLowerCase().includes(skill)
    ) &&
    (savedProgress[m.title] ?? 0) < 100
  );

  if (!match) return;

  const box = document.createElement("div");
  box.className = "ai-suggest";

  box.innerHTML = `
    <h4>🔍 Skill Gap Suggestion</h4>
    <p>
      Your ATS results show you're missing <strong>${gaps.join(", ")}</strong>.
      Practicing <strong>${match.title}</strong> will improve your job matches.
    </p>

    <button onclick="openSuggested('${match.title}')">
      Practice This Module →
    </button>
  `;

  document.querySelector(".practice-layout").prepend(box);
}

function openSuggested(title) {
  const m = RAW_MODULES.find(x => x.title === title);
  localStorage.setItem("selectedModule", JSON.stringify(m));
  window.location.href = "practice-detail.html";
}

/* ---------- QUIZ SCORE (OVERALL) ---------- */
function updateScoreStats() {
  let history = JSON.parse(localStorage.getItem("quizHistory") || "[]");

  if (!history.length) {
    document.getElementById("bestScore").textContent = "—";
    document.getElementById("avgScore").textContent = "—";
    document.getElementById("scoreAttempts").textContent = "0";
    return;
  }

  let best = 0;
  let totalPercent = 0;

  history.forEach(h => {
    let percent = Math.round((h.score / h.total) * 100);
    totalPercent += percent;
    if (percent > best) best = percent;
  });

  let avg = Math.round(totalPercent / history.length);

  document.getElementById("bestScore").textContent = best + "%";
  document.getElementById("avgScore").textContent = avg + "%";
  document.getElementById("scoreAttempts").textContent = history.length;
}

/* ---------- SCORE MODAL ---------- */
function openScoreModal() {
  saveBestScoresToLocal();

  let history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
  const box = document.getElementById("scoreList");

  if (!history.length) {
    box.innerHTML = "<p>No quiz attempts yet.</p>";
  } else {
    let best = {};

    history.forEach(h => {
      let percent = Math.round((h.score / h.total) * 100);
      if (!best[h.module] || percent > best[h.module])
        best[h.module] = percent;
    });

    box.innerHTML = Object.entries(best)
  .map(([module, percent]) =>
    `<p><strong>${module}</strong> <span>${percent}%</span></p>`
  )
  .join("");
  }

  document.getElementById("scoreModal").style.display = "flex";
}

function closeScoreModal() {
  document.getElementById("scoreModal").style.display = "none";
}
//Save the best scores to localStorage as a JSON file
function saveBestScoresToLocal() {
  let history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
  let best = {};

  history.forEach(h => {
    let percent = Math.round((h.score / h.total) * 100);

    if (!best[h.module] || percent > best[h.module]) {
      best[h.module] = percent;
    }
  });

  // store as JSON file in localStorage
  localStorage.setItem("bestQuizScores", JSON.stringify(best));
}
