const API_BASE = window.API_BASE_URL || "http://127.0.0.1:5000";
const PROFILE_ENDPOINT = `${API_BASE}/api/profile`;
const MATCH_ENDPOINT = `${API_BASE}/api/match-jobs`;
const JOBS_ENDPOINT = `${API_BASE}/api/jobs`;

// Real jobs functionality - fetches from backend API
async function loadJobs() {
  // Check authentication first
  const user = checkAuth("student");
  if (!user) return;

  const container = document.getElementById("jobs");

  try {
    // Try to get real user skills from backend profile API
    let skillsPayload = [];
    try {
      const profileRes = await fetch(PROFILE_ENDPOINT);
      if (profileRes.ok) {
        const profileJson = await profileRes.json();
        skillsPayload = profileJson.skills || [];
      } else {
        const local = JSON.parse(localStorage.getItem('profileData') || '{}');
        skillsPayload = local.skills || [];
      }
    } catch (e) {
      const local = JSON.parse(localStorage.getItem('profileData') || '{}');
      skillsPayload = local.skills || [];
    }

    const res = await fetch(
      MATCH_ENDPOINT,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: skillsPayload })
      }
    );

    const jobs = await res.json();
    const allRes = await fetch(JOBS_ENDPOINT);
    const allJobs = allRes.ok ? await allRes.json() : [];

    jobs.forEach(job => {
      // find original job entry to get the id and extra details
      const source = allJobs.find(j => {
        const comp = j.company || j.company_name || "";
        const role = j.role || j.job_role || "";
        return comp === job.company && role === job.role;
      }) || {};
      const jobId = source.id || source.job_id || "";
      const badgeClass =
        job.match_percentage >= 85 ? "recommended" : "improve";

      const badgeText =
        job.match_percentage >= 85
          ? "Recommended"
          : "Needs Improvement";

      const jobCard = document.createElement("div");
      jobCard.className = "glass job-card";
      jobCard.innerHTML = `
        <span class="badge ${badgeClass}">
          ${badgeText}
        </span>

        <h3>${job.company}</h3>
        <p>${job.role}</p>

        <div class="match">${job.match_percentage}% Match</div>

        <p><b>Missing Skills:</b></p>
        <p>${job.missing_skills.join(", ") || "None 🎉"}</p>

        <div class="job-actions">
          <button class="apply" onclick="handleApply('${job.company}', '${job.role}')">Apply</button>
          <button class="learn-more" data-id="${jobId}" data-company="${job.company}" data-role="${job.role}">Learn more</button>
        </div>
      `;

      container.appendChild(jobCard);
    });

    // Delegate click for learn-more buttons — navigate to details page
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".learn-more");
      if (!btn) return;
      const id = btn.dataset.id || "";
      const company = btn.dataset.company || "";
      const role = btn.dataset.role || "";
      const url = id
        ? `job_explanation.html?id=${encodeURIComponent(id)}`
        : `job_explanation.html?company=${encodeURIComponent(company)}&role=${encodeURIComponent(role)}`;
      window.location.href = url;
    });
  } catch (error) {
    console.error("Error loading jobs:", error);
    showToast(
      "Error loading jobs",
      "Could not fetch jobs from the server. Please try again later.",
      "error"
    );
  }
}

async function handleApply(company, role) {
  const profileRes = await fetch(PROFILE_ENDPOINT);
  const profile = profileRes.ok ? await profileRes.json() : {};
  const email = profile.email;

  if (!email) {
    showToast("Profile incomplete", "Add email in profile first", "error");
    return;
  }

  await fetch(`${API_BASE}/api/apply-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ company, role, email })
  });

  showToast(
    "Application sent",
    `Applied for ${role} at ${company}`,
    "success"
  );
}


function goBack() {
  window.location.href = "student-dashboard.html";
}

// Centered modal notification with backdrop blur
function showToast(title, desc = "", type = "info") {
  try {
    const container =
      document.getElementById("toast-container") ||
      (function () {
        const el = document.createElement("div");
        el.id = "toast-container";
        el.className = "toast-container";
        document.body.appendChild(el);
        return el;
      })();

    // Remove any existing toasts to prevent overlap
    const existingToasts = container.querySelectorAll(".toast");
    existingToasts.forEach(existingToast => {
      existingToast.classList.remove("show");
      setTimeout(() => existingToast.remove(), 100);
    });

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="icon">${type === "success" ? "✓" : "i"}</div>
      <div class="content">
        <div class="title">${title}</div>
        <div class="desc">${desc}</div>
      </div>
    `;

    container.appendChild(toast);

    // Activate backdrop blur
    requestAnimationFrame(() => {
      container.classList.add("active");
      requestAnimationFrame(() => toast.classList.add("show"));
    });

    // Auto-remove with fade out
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        container.classList.remove("active");
        setTimeout(() => toast.remove(), 100);
      }, 360);
    }, 2800);

    // Click backdrop to dismiss
    const dismissHandler = (e) => {
      if (e.target === container) {
        toast.classList.remove("show");
        container.classList.remove("active");
        setTimeout(() => toast.remove(), 360);
        container.removeEventListener("click", dismissHandler);
      }
    };
    container.addEventListener("click", dismissHandler);
  } catch (e) {
    console.error("Notification error", e);
  }
}

// Load jobs when page loads
loadJobs();


