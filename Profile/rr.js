const form = document.getElementById("profileForm");
const backlogRadios = document.querySelectorAll('input[name="backlog_status"]');
const backlogCount = document.getElementById("backlogCount");
const photoInput = document.getElementById("profilePhoto");
const photoPreview = document.getElementById("photoPreview");
const skillInput = document.getElementById("skillInput");
const addSkillBtn = document.getElementById("addSkillBtn");
const skillsList = document.getElementById("skillsList");

// Skills array to track added skills
let userSkills = [];

// Render skills to display
function renderSkills() {
  skillsList.innerHTML = userSkills.map((skill, index) => 
    `<div class="skill-tag">
      <span>${skill}</span>
      <span class="remove-skill" data-index="${index}">&times;</span>
    </div>`
  ).join('');

  // Attach remove event listeners
  document.querySelectorAll('.remove-skill').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      userSkills.splice(idx, 1);
      renderSkills();
    });
  });
}

const skillHint = document.getElementById('skillHint');
const clearSkillsBtn = document.getElementById('clearSkillsBtn');

// Show hint message
function showHint(message) {
  skillHint.textContent = message;
  skillHint.classList.add('show');
  skillInput.classList.add('shake');
  setTimeout(() => {
    skillInput.classList.remove('shake');
  }, 400);
  setTimeout(() => {
    skillHint.classList.remove('show');
  }, 2500);
}

// Add skill handler
function addSkill() {
  const skill = skillInput.value.trim().toLowerCase();
  if (!skill) {
    showHint('⚠️ Please enter a skill first!');
    skillInput.focus();
    return;
  }
  if (userSkills.includes(skill)) {
    showHint('⚠️ This skill is already added!');
    skillInput.focus();
    skillInput.select();
    return;
  }
  userSkills.push(skill);
  skillInput.value = '';
  skillHint.classList.remove('show');
  renderSkills();
  skillInput.focus();
}

addSkillBtn.addEventListener('click', addSkill);

// Clear all skills handler
clearSkillsBtn.addEventListener('click', () => {
  if (userSkills.length === 0) {
    showHint('⚠️ No skills to clear!');
    return;
  }
  userSkills = [];
  renderSkills();
});

// Allow Enter key to add skill
skillInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addSkill();
  }
});

function toggleBacklogVisibility() {
  const active = document.querySelector('input[name="backlog_status"][value="active"]');
  if (active && active.checked) {
    backlogCount.classList.remove("hidden");
  } else {
    backlogCount.classList.add("hidden");
  }
}

backlogRadios.forEach((radio) => {
  radio.addEventListener("change", toggleBacklogVisibility);
});

// Run once on load
toggleBacklogVisibility();

// Live preview when selecting a profile image
photoInput.addEventListener('change', () => {
  const f = photoInput.files && photoInput.files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    photoPreview.src = ev.target.result;
  };
  reader.readAsDataURL(f);
});

// Resume file name visual feedback (Optional)
const resumeInput = document.getElementById("resumeFile");
resumeInput.addEventListener('change', function() {
  const msg = document.querySelector('.file-msg');
  if(this.files && this.files[0]) {
    msg.textContent = `Selected: ${this.files[0].name}`;
    msg.style.color = 'var(--primary)';
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    fullName: document.getElementById('fullName').value || '',
    email: document.getElementById('email').value || '',
    universityName: document.getElementById('universityName').value || '',
    rollNumber: document.getElementById('rollNumber').value || '',
    registrationNumber: document.getElementById('registrationNumber').value || '',
    program: document.getElementById('program').value || '',
    specialization: document.getElementById('specialization').value || '',
    semester: document.getElementById('semester').value || '',
    graduationYear: document.getElementById('graduationYear').value || '',
    backlogStatus: (document.querySelector('input[name="backlog_status"]:checked')||{}).value || '',
    backlogNumber: document.getElementById('backlogNumber').value || '',
    city: document.getElementById('city').value || '',
    district: document.getElementById('district').value || '',
    state: document.getElementById('state').value || '',
    skills: [...userSkills] // Save the skills array
  };

  const file = photoInput.files && photoInput.files[0];

  function finishSave(photoDataUrl) {
    if (photoDataUrl) data.photo = photoDataUrl;
    
    // Save to local storage
    localStorage.setItem('profileData', JSON.stringify(data));
    
    // Visual feedback button
    const btn = document.querySelector('.btn.primary');
    const originalText = btn.innerText;
    btn.innerText = "Saved! ✓";
    btn.style.background = "#10b981"; // Green
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = ""; 
        location.href = 'yo.html';
    }, 1000);
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => finishSave(ev.target.result);
    reader.readAsDataURL(file);
  } else {
    // Preserve existing photo if any
    const existing = localStorage.getItem('profileData');
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        if (parsed && parsed.photo) data.photo = parsed.photo;
      } catch (e) {}
    }
    finishSave();
  }
});