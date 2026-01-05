let current = 0;
let score = 0;
let timeLeft = 0;
let timer = null;

let userAnswers = [];
let questions = [];
let selectedDifficulty = null;

let quizFinished = false;

const module = JSON.parse(localStorage.getItem("selectedModule"));

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

/* ---------- START QUIZ ---------- */
function startQuiz(level) {
  document.getElementById("difficultyScreen").style.display = "none";
  document.getElementById("quizHeader").style.display = "flex";

  const pool = QUESTION_BANK.filter(
    q => q.module === module.title && q.difficulty === level
  );

  questions = shuffle(pool).slice(0, 10);

  function convertEstimatedTimeToSeconds(str) {
    if (!str) return 600;
    return Math.round(parseFloat(str) * 60 * 60);
  }

  timeLeft = convertEstimatedTimeToSeconds(module.estimated_time);

  startTimer();
  load();
}

/* ---------- LOAD QUESTION ---------- */
function load() {
  if (quizFinished) return;

  const q = questions[current];

  document.getElementById("quizHeaderText").textContent =
    `Question ${current + 1}/${questions.length}`;

  document.getElementById("quizBox").innerHTML = `
    <h3>${q.question}</h3>

    ${q.options.map((opt, i) => `
      <label>
        <input type="radio" name="opt" value="${i}"
          ${userAnswers[current] === i ? "checked" : ""}>
        <span>${opt}</span>
      </label>`).join("")}

    <div class="nav-buttons">
      <button class="prev-btn"
        onclick="previous()"
        ${current === 0 ? "disabled" : ""}>
        ← Previous
      </button>

      <button class="next-btn" onclick="next()">
        ${current === questions.length - 1 ? "Finish →" : "Next →"}
      </button>
    </div>
  `;
}

/* ---------- DIFFICULTY UI ---------- */
document.querySelectorAll(".difficulty-option").forEach(opt => {
  opt.addEventListener("click", () => {
    document.querySelectorAll(".difficulty-option")
      .forEach(o => o.classList.remove("active"));

    opt.classList.add("active");
    selectedDifficulty = opt.dataset.level;
  });
});

function begin() {
  if (!selectedDifficulty)
    return showPopup("Please select a difficulty level ");
  startQuiz(selectedDifficulty);
}

/* ---------- TIMER ---------- */
let oneMinuteAlertShown = false;

function startTimer() {
  timer = setInterval(() => {
    if (quizFinished) return;

    if (timeLeft === 60 && !oneMinuteAlertShown) {
      oneMinuteAlertShown = true;
      showPopup("⏳ Only 1 minute left — stay focused!");
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      timeOver();
      return;
    }

    let hrs = Math.floor(timeLeft / 3600);
    let mins = Math.floor((timeLeft % 3600) / 60);
    let secs = timeLeft % 60;

    const timeEl = document.getElementById("time");
    if (timeEl) {
      timeEl.textContent =
        `⏱ ${hrs.toString().padStart(2,'0')}:` +
        `${mins.toString().padStart(2,'0')}:` +
        `${secs.toString().padStart(2,'0')}`;
    }

    timeLeft--;
  }, 1000);
}

/* ---------- TIME OVER ---------- */
function timeOver() {
  if (timer) clearInterval(timer);

  document.querySelectorAll("input[name='opt']").forEach(i => i.disabled = true);
  document.querySelectorAll(".next-btn,.prev-btn").forEach(b => b.disabled = true);

  const modal = document.getElementById("timeModal");
  modal.style.display = "flex";

  document.getElementById("viewResultsBtn").onclick = () => {
    modal.style.display = "none";
    finishQuiz();
  };
}

/* ---------- NAV ---------- */
function next() {
  if (quizFinished) return;

  const chosen = document.querySelector("input[name='opt']:checked");
  if (!chosen) return showPopup("Please select an answer ");

  userAnswers[current] = Number(chosen.value);
  score = userAnswers.filter((a,i)=>a===questions[i].answer).length;

  current++;
  current < questions.length ? load() : finishQuiz();
}

function previous() {
  if (quizFinished) return;

  const chosen = document.querySelector("input[name='opt']:checked");
  if (chosen) userAnswers[current] = Number(chosen.value);

  if (current > 0) {
    current--;
    load();
  }
}

/* ---------- FINISH ---------- */
function finishQuiz() {
  quizFinished = true;
  if (timer) clearInterval(timer);

  document.getElementById("quizBox").innerHTML = `
    <div class="score-box">
      <h2>Quiz Completed 🎯</h2>
      <p>Your Score:
        <strong>${score}/${questions.length}</strong>
        (${Math.round((score/questions.length)*100)}%)
      </p>

      <div style="margin-top:14px;">
        <button class="next-btn" onclick="showReview()">Review Answers</button>
        <button class="prev-btn" onclick="goBack()">Back to Module</button>
      </div>
    </div>
  `;

  saveScoreHistory();
}

/* ---------- REVIEW ---------- */
function showReview() {
  let html = "<h2>Answer Review</h2>";

  questions.forEach((q,i)=>{
    html += `
      <div class="review-card">
        <p><strong>Q${i+1}:</strong> ${q.question}</p>

        <p>Your answer:
          <span style="color:${userAnswers[i]===q.answer?'green':'red'}">
            ${q.options[userAnswers[i]] ?? "—"}
          </span>
        </p>

        <p>Correct answer:
          <strong>${q.options[q.answer]}</strong>
        </p>
      </div>`;
  });

  html += `<button onclick="goBack()">Back</button>`;
  document.getElementById("quizBox").innerHTML = html;
}

/* ---------- SAVE HISTORY ---------- */
function saveScoreHistory() {
  let history = JSON.parse(localStorage.getItem("quizHistory") || "[]");

  history.push({
    module: module.title,
    score,
    total: questions.length,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("quizHistory", JSON.stringify(history));
}

/* ---------- POPUP ---------- */
function showPopup(text) {
  document.getElementById("popupMsg").textContent = text;
  document.getElementById("popupBox").style.display = "flex";
}

function closePopup() {
  document.getElementById("popupBox").style.display = "none";
}

/* ---------- EXIT ---------- */
function goBack() {
  location.replace("practice-detail.html");
}
