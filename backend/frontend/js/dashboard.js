async function loadDashboard() {
  // Check authentication first
  const user = checkAuth("student");
  if (!user) return;

  // Update welcome message with actual user name
  const welcomeEl = document.querySelector(".header h2");
  if (welcomeEl) {
    welcomeEl.innerText = `Welcome, ${user.name} 👋`;
  }

  /* -----------------------------
     MOCK DATA (Fallback Safe)
  ------------------------------ */
  const mockATS = {
    ats_score: 78,
    feedback: [
      "Add more role-specific keywords",
      "Improve project descriptions",
      "Include measurable achievements",
      "Optimize resume for ATS-friendly formatting",
    ],
  };

  const mockMatch = {
    match_percentage: 84,
  };

  let atsData = mockATS;
  let matchData = mockMatch;

  /* -----------------------------
     TRY REAL API (Optional)
  ------------------------------ */
  try {
    const atsRes = await fetch("http://127.0.0.1:5000/api/ats-check", {
      method: "POST",
    });

    if (atsRes.ok) {
      const apiATS = await atsRes.json();
      if (apiATS?.ats_score !== undefined) {
        atsData = apiATS;
      }
    }
  } catch (e) {
    console.warn("ATS API not available, using mock data");
  }

  try {
    const matchRes = await fetch("http://127.0.0.1:5000/api/match-jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skills: ["Python", "DSA", "HTML"],
      }),
    });

    if (matchRes.ok) {
      const apiMatch = await matchRes.json();
      if (Array.isArray(apiMatch) && apiMatch[0]?.match_percentage) {
        matchData.match_percentage = apiMatch[0].match_percentage;
      }
    }
  } catch (e) {
    console.warn("Match API not available, using mock data");
  }

  /* -----------------------------
     RENDER UI (SAFE)
  ------------------------------ */
  document.getElementById("ats").innerText = atsData.ats_score + "%";

  document.getElementById("match").innerText = matchData.match_percentage + "%";

  const list = document.getElementById("suggestions");
  list.innerHTML = "";

  atsData.feedback.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}

function go(page) {
  window.location.href = page;
}

loadDashboard();
