const API_BASE = window.API_BASE_URL || "http://127.0.0.1:5000";
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

// Resume input (optional) - only attach handler if present
const resumeInput = document.getElementById("resumeFile");
if (resumeInput) {
  resumeInput.addEventListener('change', function() {
    const msg = document.querySelector('.file-msg');
    if(this.files && this.files[0] && msg) {
      msg.textContent = `Selected: ${this.files[0].name}`;
      msg.style.color = 'var(--primary)';
    }
  });
}

// Helper to gather form data into object (only fields present in rr.html)
function gatherFormData() {
  return {
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
    backlogNumber: Number(document.getElementById('backlogNumber').value) || 0,
    city: document.getElementById('city').value || '',
    district: document.getElementById('district').value || '',
    state: document.getElementById('state').value || '',
    skills: [...userSkills]
  };
}

// Load existing profile from backend and populate form
async function loadProfile() {
  try {
    const resp = await fetch(`${API_BASE}/api/profile`);
    if (!resp.ok) return;
    const p = await resp.json();
    if (!p) return;

    // Load photo from localStorage (not from JSON)
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) photoPreview.src = savedPhoto;
    if (p.fullName) document.getElementById('fullName').value = p.fullName;
    if (p.email) document.getElementById('email').value = p.email;
    if (p.universityName) document.getElementById('universityName').value = p.universityName;
    if (p.rollNumber) document.getElementById('rollNumber').value = p.rollNumber;
    if (p.registrationNumber) document.getElementById('registrationNumber').value = p.registrationNumber;
    if (p.program) document.getElementById('program').value = p.program;
    if (p.specialization) document.getElementById('specialization').value = p.specialization;
    if (p.semester) document.getElementById('semester').value = p.semester;
    if (p.graduationYear) document.getElementById('graduationYear').value = p.graduationYear;
    if (p.backlogStatus) {
      const sel = document.querySelector(`input[name="backlog_status"][value="${p.backlogStatus}"]`);
      if (sel) sel.checked = true;
    }
    if (p.backlogNumber !== undefined) document.getElementById('backlogNumber').value = p.backlogNumber || '';
    if (p.city) document.getElementById('city').value = p.city;
    if (p.district) document.getElementById('district').value = p.district;
    if (p.state) document.getElementById('state').value = p.state;
    if (Array.isArray(p.skills)) {
      userSkills = p.skills.map(s => String(s).toLowerCase());
      renderSkills();
    }

    toggleBacklogVisibility();
  } catch (e) {
    console.warn('Could not load profile:', e);
  }
}

// Save profile to backend (PUT /api/profile)
// Photo is excluded from JSON save - stored only in localStorage
async function saveProfile(data) {
  try {
    // Clone data and remove photo before saving to JSON file
    const dataForJson = {...data};
    delete dataForJson.photo;
    
    const resp = await fetch(`${API_BASE}/api/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataForJson)
    });
    return resp.ok;
  } catch (e) {
    console.error('Save failed', e);
    return false;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = photoInput.files && photoInput.files[0];
  const data = gatherFormData();

  // If there's a new photo, save to localStorage only (not JSON)
  if (file) {
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const photoDataUrl = ev.target.result;
      // Save photo to localStorage
      localStorage.setItem('profilePhoto', photoDataUrl);
      
      // Save profile data (without photo) to JSON via backend
      const ok = await saveProfile(data);
      if (ok) {
        const btn = document.querySelector('.btn.primary');
        const originalText = btn.innerText;
        btn.innerText = "Saved! ✓";
        btn.style.background = "#10b981";
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.background = "";
          location.href = 'yo.html';
        }, 800);
      }
    };
    reader.readAsDataURL(file);
  } else {
    // No new photo uploaded - just save profile data
    const ok = await saveProfile(data);
    if (ok) {
      const btn = document.querySelector('.btn.primary');
      const originalText = btn.innerText;
      btn.innerText = "Saved! ✓";
      btn.style.background = "#10b981";
      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "";
        location.href = 'yo.html';
      }, 800);
    }
  }
});

// Initialize
loadProfile();