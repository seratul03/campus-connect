// Mock data for jobs - no backend dependency
const mockJobs = [
  {
    id: "mock_1",
    company: "Google",
    role: "Software Engineer Intern",
    match_percentage: 92,
    missing_skills: ["Kubernetes", "Docker"]
  },
  {
    id: "mock_2",
    company: "Microsoft",
    role: "Full Stack Developer",
    match_percentage: 88,
    missing_skills: ["Azure", "TypeScript"]
  },
  {
    id: "mock_3",
    company: "Amazon",
    role: "Backend Developer",
    match_percentage: 95,
    missing_skills: []
  },
  {
    id: "mock_4",
    company: "Meta",
    role: "Frontend Engineer",
    match_percentage: 78,
    missing_skills: ["React Native", "GraphQL", "Redux"]
  },
  {
    id: "mock_5",
    company: "Apple",
    role: "iOS Developer",
    match_percentage: 65,
    missing_skills: ["Swift", "Xcode", "UIKit", "SwiftUI"]
  },
  {
    id: "mock_6",
    company: "Netflix",
    role: "Data Engineer",
    match_percentage: 82,
    missing_skills: ["Spark", "Kafka"]
  },
  {
    id: "mock_7",
    company: "Tesla",
    role: "Machine Learning Engineer",
    match_percentage: 87,
    missing_skills: ["TensorFlow", "PyTorch"]
  },
  {
    id: "mock_8",
    company: "SpaceX",
    role: "Software Engineer",
    match_percentage: 90,
    missing_skills: ["C++", "Real-time Systems"]
  },
  {
    id: "mock_9",
    company: "Adobe",
    role: "UI/UX Developer",
    match_percentage: 73,
    missing_skills: ["Figma", "Adobe XD", "Animation"]
  },
  {
    id: "mock_10",
    company: "Salesforce",
    role: "Cloud Engineer",
    match_percentage: 85,
    missing_skills: ["Salesforce Platform", "Apex"]
  },
  {
    id: "mock_11",
    company: "LinkedIn",
    role: "Backend Developer",
    match_percentage: 91,
    missing_skills: ["Scala", "Microservices"]
  },
  {
    id: "mock_12",
    company: "Twitter",
    role: "DevOps Engineer",
    match_percentage: 68,
    missing_skills: ["Jenkins", "Terraform", "AWS", "CI/CD"]
  }
];

function loadJobs() {
  const container = document.getElementById("jobs");
  
  mockJobs.forEach(job => {
    const badgeClass = job.match_percentage >= 85 ? "recommended" : "improve";
    const badgeText = job.match_percentage >= 85 ? "Recommended" : "Needs Improvement";

    const jobCard = document.createElement('div');
    jobCard.className = 'glass job-card';
    jobCard.innerHTML = `
      <span class="badge ${badgeClass}">
        ${badgeText}
      </span>

      <h3>${job.company}</h3>
      <p>${job.role}</p>

      <div class="match">${job.match_percentage}% Match</div>

      <p><b>Missing Skills:</b></p>
      <p>${job.missing_skills.length > 0 ? job.missing_skills.join(", ") : "None 🎉"}</p>

      <div class="job-actions">
        <button class="apply" onclick="handleApply('${job.company}', '${job.role}')">Apply</button>
        <button class="learn-more" onclick="handleLearnMore('${job.id}', '${job.company}', '${job.role}')">Learn more</button>
      </div>
    `;
    
    container.appendChild(jobCard);
  });
}

function handleApply(company, role) {
  alert(`Applying for ${role} at ${company}!\n\nIn a real application, this would redirect you to the application page.`);
}

function handleLearnMore(id, company, role) {
  // Mock navigation to details page
  alert(`Learn more about ${role} at ${company}!\n\nIn a real application, this would show detailed job information.\n\nJob ID: ${id}`);
  // Optionally navigate to a real page if it exists:
  // window.location.href = `job_explanation.html?id=${encodeURIComponent(id)}`;
}

function goBack() {
  window.location.href = "student-dashboard.html";
}

// Load jobs when page loads
loadJobs();
