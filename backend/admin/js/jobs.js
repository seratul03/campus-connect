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

async function loadAllJobs() {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/admin/jobs");
    if (!res.ok) {
      showToast("Failed to load jobs");
      return;
    }
    const jobs = await res.json();
    const list = document.getElementById("allJobsList");
    list.innerHTML = "";
    if (!jobs || !jobs.length) {
      list.innerHTML = '<li>No job postings found.</li>';
      return;
    }

    // render each job with details and delete button
    jobs.slice().reverse().forEach((j) => {
      const li = document.createElement("li");
      li.style.padding = '12px 0';
      li.style.borderBottom = '1px solid rgba(0,0,0,0.06)';

      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.justifyContent = 'space-between';
      container.style.alignItems = 'center';

      const left = document.createElement('div');
      left.innerHTML = `<strong style="font-size:16px">${j.role}</strong>
            <div style="font-size:13px; color:var(--text-muted)">${j.company} · ${j.location || ''} · ${j.ctc || ''}</div>`;

      const right = document.createElement('div');
      right.style.textAlign = 'right';
      right.style.fontSize = '13px';
      right.style.color = 'var(--text-muted)';
      right.innerText = `ID: ${j.id}`;

      const delBtn = document.createElement('button');
      delBtn.innerText = 'Delete';
      delBtn.style.marginLeft = '12px';
      delBtn.style.background = '#ff3b30';
      delBtn.style.color = '#fff';
      delBtn.style.border = 'none';
      delBtn.style.padding = '6px 10px';
      delBtn.style.borderRadius = '8px';
      delBtn.addEventListener('click', () => deleteJob(j.id));

      const rightWrap = document.createElement('div');
      rightWrap.appendChild(right);
      rightWrap.appendChild(delBtn);

      container.appendChild(left);
      container.appendChild(rightWrap);

      li.appendChild(container);
      const desc = document.createElement('div');
      desc.style.marginTop = '8px';
      desc.style.fontSize = '14px';
      desc.innerText = (j.description || '');
      li.appendChild(desc);
      const skills = document.createElement('div');
      skills.style.marginTop = '8px';
      skills.style.fontSize = '13px';
      skills.style.color = 'var(--text-muted)';
      skills.innerText = 'Skills: ' + ((j.required_skills || []).join(', '));
      li.appendChild(skills);

      list.appendChild(li);
    });
  } catch (e) {
    console.error(e);
    showToast('Network error');
  }
}

document.addEventListener('DOMContentLoaded', loadAllJobs);

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
    loadAllJobs();
  } catch (e) {
    console.error(e);
    showToast('Network error');
  }
}

async function deleteAllJobs() {
  if (!confirm('Are you sure you want to delete ALL jobs? This action cannot be undone!')) return;
  
  try {
    // First, fetch all jobs to get their IDs
    const res = await fetch("http://127.0.0.1:5000/api/admin/jobs");
    if (!res.ok) {
      showToast("Failed to load jobs");
      return;
    }
    const jobs = await res.json();
    
    if (!jobs || !jobs.length) {
      showToast('No jobs to delete');
      return;
    }
    
    // Delete each job
    let successCount = 0;
    let failCount = 0;
    
    for (const job of jobs) {
      try {
        const deleteRes = await fetch(`http://127.0.0.1:5000/api/admin/jobs/${job.id}`, { method: 'DELETE' });
        if (deleteRes.ok) {
          successCount++;
        } else {
          failCount++;
        }
      } catch (e) {
        failCount++;
        console.error('Error deleting job:', job.id, e);
      }
    }
    
    showToast(`Deleted ${successCount} jobs. ${failCount > 0 ? failCount + ' failed.' : ''}`);
    loadAllJobs();
  } catch (e) {
    console.error(e);
    showToast('Network error');
  }
}
