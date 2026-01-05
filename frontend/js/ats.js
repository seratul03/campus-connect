// Handle File Selection
const fileInput = document.getElementById("resumeInput");
const fileNameDisplay = document.getElementById("fileName");

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    fileNameDisplay.innerText = "Selected: " + fileInput.files[0].name;
    fileNameDisplay.classList.remove("hidden");
  }
});

async function analyze() {
  const file = fileInput.files[0];
  const jdText = document.getElementById("jdInput").value;

  if (!file) {
    alert("Please upload a resume first.");
    return;
  }

  // UI State: Loading
  document.getElementById("emptyState").classList.add("hidden");
  document.getElementById("results").classList.add("hidden");
  document.getElementById("loader").classList.remove("hidden");

  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jd", jdText);

  try {
    const res = await fetch("http://127.0.0.1:5000/api/ats-check", {
      method: "POST",
      body: formData, // No Content-Type header needed for FormData
    });

    const data = await res.json();

    if (data.error) {
      alert("Error: " + data.error);
      document.getElementById("loader").classList.add("hidden");
      document.getElementById("emptyState").classList.remove("hidden");
      return;
    }

    // Populate Main Score
    document.getElementById("scoreVal").innerText = Math.round(data.ats_match_score || data.ats_score || 0);

    // Populate Detail Metrics
    document.getElementById("skillRelevanceVal").innerText = Math.round(data.skill_relevance || 0) + "%";
    document.getElementById("experienceVal").innerText = Math.round(data.experience_alignment || 0) + "%";
    document.getElementById("projectVal").innerText = Math.round(data.project_alignment || 0) + "%";
    document.getElementById("mandatoryVal").innerText = Math.round(data.mandatory_coverage || 0) + "%";
    document.getElementById("niceToHaveVal").innerText = Math.round(data.nice_to_have_coverage || 0) + "%";

    // Populate Role Fit
    if (data.role_fit) {
      const internFit = data.role_fit.intern || 0;
      const juniorFit = data.role_fit.junior || 0;
      const midFit = data.role_fit.mid || 0;

      document.getElementById("internBar").style.width = internFit + "%";
      document.getElementById("internScore").innerText = internFit + "%";
      
      document.getElementById("juniorBar").style.width = juniorFit + "%";
      document.getElementById("juniorScore").innerText = juniorFit + "%";
      
      document.getElementById("midBar").style.width = midFit + "%";
      document.getElementById("midScore").innerText = midFit + "%";
    }

    // Feedback List
    const list = document.getElementById("feedbackList");
    list.innerHTML = "";
    if (data.feedback && data.feedback.length > 0) {
      data.feedback.forEach((item) => {
        const li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
      });
    } else {
      list.innerHTML = "<li>Resume structure looks good!</li>";
    }

    // Missing Concepts
    const conceptsDiv = document.getElementById("missingConcepts");
    conceptsDiv.innerHTML = "";
    if (data.missing_jd_concepts && data.missing_jd_concepts.length > 0) {
      data.missing_jd_concepts.forEach((concept) => {
        const div = document.createElement("div");
        div.className = "concept-item";
        div.innerText = "• " + concept;
        conceptsDiv.appendChild(div);
      });
    } else {
      conceptsDiv.innerHTML = "<span style='font-size:13px; color:#666'>✅ All major JD concepts are covered!</span>";
    }

    // Keywords Chips
    const chips = document.getElementById("matchedKeywords");
    chips.innerHTML = "";
    if (data.found_keywords && data.found_keywords.length > 0) {
        data.found_keywords.forEach((kw) => {
            const span = document.createElement("span");
            span.className = "chip";
            span.innerText = kw;
            chips.appendChild(span);
        });
    } else {
        chips.innerHTML = "<span style='font-size:13px; color:#666'>Using semantic analysis (not keyword matching)</span>";
    }

    // UI State: Show Results
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");

  } catch (err) {
    console.error(err);
    alert("Failed to connect to server.");
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("emptyState").classList.remove("hidden");
  }
}

function goBack() {
  window.location.href = "student-dashboard.html";
}

function updateJDCount() {
  const textarea = document.getElementById("jdInput");
  const counter = document.getElementById("jdCount");
  counter.innerText = textarea.value.length;
}
document.getElementById("jdInput").addEventListener("input", updateJDCount);
// Initialize JD count on load
updateJDCount();
