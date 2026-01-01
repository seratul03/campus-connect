function showToast(message) {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toastMsg");

  if (!toast || !msg) return;
  msg.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function goBack() {
  window.location.href = "admin-dashboard.html";
}

document.getElementById("submitBtn").addEventListener("click", () => {
  const payload = {
    id: document.getElementById("job_id").value || undefined,
    company: document.getElementById("company").value,
    role: document.getElementById("role").value,
    ctc: document.getElementById("ctc").value,
    location: document.getElementById("location").value,
    experience: document.getElementById("experience").value,
    employment_type: document.getElementById("employment_type").value,
    required_skills: document.getElementById("required_skills").value,
    eligibility: document.getElementById("eligibility").value,
    description: document.getElementById("description").value,
  };

  if (!payload.company || !payload.role) {
    showToast("⚠️ Please fill Company & Role");
    return;
  }

  fetch("http://127.0.0.1:5000/api/admin/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
    .then(({ ok, data }) => {
      if (!ok) {
        showToast("⚠️ Error: " + (data.error || "Failed to add job"));
        return;
      }
      showToast("✅ Job posted successfully");
      setTimeout(() => (window.location.href = "admin-dashboard.html"), 900);
    })
    .catch((e) => {
      console.error(e);
      showToast("⚠️ Network error");
    });
});
