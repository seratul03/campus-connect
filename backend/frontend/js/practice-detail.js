/* -------- LOAD MODULE -------- */
const module = JSON.parse(localStorage.getItem("selectedModule"));

if (!module) {
  alert("No module selected!");
  window.location.href = "practice.html";
}

/* populate UI */
d_title.textContent = module.title;
d_level.textContent = module.level;
d_time.textContent = module.estimated_time;

/* topics list */
module.topics.forEach(t => {
  const li = document.createElement("li");
  li.textContent = t;
  d_topics.appendChild(li);
});

/* ---------- STORAGE SETUP ---------- */
let savedProgress = JSON.parse(localStorage.getItem("moduleProgress") || "{}");
let taskProgress = JSON.parse(localStorage.getItem("taskProgress") || "{}");

taskProgress[module.title] =
  taskProgress[module.title] || { quiz: false, code: false };

const progressBar = document.getElementById("progressBar");
const percentText = document.getElementById("percentText");
const statusText  = document.getElementById("statusText");
const badge = document.getElementById("completedBadge");
const completeBtn = document.getElementById("completeBtn");

/* ---------- PROGRESS CALCULATOR ---------- */
/* Quiz = 40%   Coding = 60%  (you can change later) */
function recalcProgress() {
  let t = taskProgress[module.title];
  let val = (t.quiz ? 40 : 0) + (t.code ? 60 : 0);

  savedProgress[module.title] = val;
  localStorage.setItem("moduleProgress", JSON.stringify(savedProgress));
  localStorage.setItem("taskProgress", JSON.stringify(taskProgress));

  updateProgressUI(val);

  // optional backend sync
  fetch("http://localhost:5000/api/practice/progress", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: module.title, progress: val })
  }).catch(() => console.log("Backend not connected — local only"));
}

/* ---------- UI UPDATE ---------- */
function updateProgressUI(val) {
  progressBar.style.width = val + "%";
  percentText.textContent = val + "%";

  if (val === 0) statusText.textContent = "Not Started";
  else if (val < 100) statusText.textContent = "In Progress";
  else statusText.textContent = "Completed";

  if (val === 100) {
    badge.style.display = "inline-block";
    completeBtn.textContent = "Completed";
    completeBtn.classList.add("done");
    completeBtn.disabled = true;
  }
}

/* ---------- INITIAL LOAD ---------- */
updateProgressUI(Number(savedProgress[module.title] ?? 0));

/* ---------- NAVIGATION ---------- */
function startQuiz() {
  window.location.href = "quiz.html";
}

function reattemptQuiz() {
  taskProgress[module.title].quiz = false;
  recalcProgress();
  window.location.href = "quiz.html";
}

function startCoding() {
  taskProgress[module.title].code = true;   // mark coding done when visited
  recalcProgress();
  window.location.href = "coding.html";
}

/* ---------- MARK COMPLETE (only after quiz done) ---------- */
function markComplete() {
  let t = taskProgress[module.title];

  if (!t.quiz) {
    alert("Finish the quiz to mark this module complete!");
    return;
  }

  t.code = true;
  recalcProgress();
}

function goPractice() {
  location.replace("practice.html");
}
function loadScores() {
  let history = JSON.parse(localStorage.getItem("quizHistory") || "[]");

  // filter only this module
  let myScores = history.filter(h => h.module === module.title);

  if (myScores.length === 0) return;

  let last = myScores[myScores.length - 1];
  let best = Math.max(...myScores.map(h => (h.score / h.total) * 100));

  document.getElementById("lastScore").textContent =
    `${last.score}/${last.total}`;

  document.getElementById("bestScoreDetail").textContent =
    `${Math.round(best)}%`;

  document.getElementById("attemptsCount").textContent =
    myScores.length;
}
updateProgressUI(Number(savedProgress[module.title] ?? 0));
loadScores();
