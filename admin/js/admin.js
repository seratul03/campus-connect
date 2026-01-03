async function loadAnalytics() {
  // Check authentication first - admin only
  const user = checkAuth("admin");
  if (!user) return;

  const res = await fetch(
    "http://127.0.0.1:5000/api/admin/analytics"
  );
  const data = await res.json();

  animateValue("students", data.total_students);
  animateValue("ready", data.resume_ready);
  document.getElementById("ats").innerText =
    data.average_ats + "%";
  document.getElementById("skill").innerText =
    data.top_skill;
}

function animateValue(id, value) {
  const el = document.getElementById(id);
  el.innerText = "0";
  let current = 0;
  const interval = setInterval(() => {
    current++;
    el.innerText = current;
    if (current >= value) clearInterval(interval);
  }, 15);
}

function addJob() {
  // addJob moved to a dedicated page (add-job.html)
  console.warn("addJob() moved to add-job.html");
}


async function loadJobs() {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/admin/jobs");
    if (!res.ok) return;
    const jobs = await res.json();
    const list = document.getElementById("jobList");
    if (!list) return;
    list.innerHTML = "";

    // determine limit from dropdown (default 3)
    let limit = 3;
    const limitEl = document.getElementById("jobLimit");
    if (limitEl) {
      const v = parseInt(limitEl.value, 10);
      if (!isNaN(v) && v > 0) limit = v;
    }

    const items = jobs.slice().reverse().slice(0, limit);
    items.forEach((j) => {
      const li = document.createElement("li");
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';

      const txt = document.createElement('div');
      txt.innerHTML = `<strong>${j.role}</strong><span style="display:block; font-size:13px; color:var(--text-muted)">${j.company} · ${j.ctc || ''}</span>`;

      const btns = document.createElement('div');
      const del = document.createElement('button');
      del.innerText = 'Delete';
      del.style.background = '#ff3b30';
      del.style.color = '#fff';
      del.style.border = 'none';
      del.style.padding = '6px 10px';
      del.style.borderRadius = '8px';
      del.addEventListener('click', () => deleteJob(j.id));

      btns.appendChild(del);

      li.appendChild(txt);
      li.appendChild(btns);
      list.appendChild(li);
    });
  } catch (e) {
    console.error("Failed to load jobs", e);
  }
}

// wire dropdown change to re-load the list when present
document.addEventListener("DOMContentLoaded", () => {
  const limitEl = document.getElementById("jobLimit");
  if (limitEl) limitEl.addEventListener("change", loadJobs);
});

async function deleteJob(id) {
  if (!confirm('Delete job ID ' + id + '?')) return;
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/admin/jobs/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      showToast('Delete failed: ' + (d.error || res.statusText));
      return;
    }
    showToast('Job deleted');
    loadJobs();
  } catch (e) {
    console.error(e);
    showToast('Network error');
  }
}


// Helper functions for authentication check and logout
function checkAuth(requiredRole) {
  const userStr = localStorage.getItem("campusConnectUser");
  if (!userStr) {
    window.location.href = "../frontend/login.html";
    return null;
  }
  const user = JSON.parse(userStr);
  if (requiredRole && user.role !== requiredRole) {
    alert("Access denied. You don't have permission to view this page.");
    window.location.href = "../frontend/login.html";
    return null;
  }
  return user;
}

function logout() {
  localStorage.removeItem("campusConnectUser");
  window.location.href = "../frontend/login.html";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toastMsg");

  msg.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

loadAnalytics();
loadJobs();
