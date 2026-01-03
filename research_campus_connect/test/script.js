const card = document.getElementById("card");
const flipBtn = document.getElementById("flipBtn");

flipBtn.addEventListener("click", () => {
  card.classList.toggle("flipped");
  flipBtn.textContent = card.classList.contains("flipped")
    ? "See less"
    : "See more";
});

async function loadFaculty() {
  const res = await fetch("faculty.json");
  const data = await res.json();

  // pick first teacher
  const firstKey = Object.keys(data.faculty)[0];
  const teacher = data.faculty[firstKey];

  // FRONT SIDE
  document.getElementById("name").textContent = teacher.name;
  document.getElementById("dept").textContent = data.department;
  document.getElementById("position").textContent = teacher.position;
  document.getElementById("photo").src = teacher.photo;

  // BACK SIDE
  document.getElementById("d-dept").textContent = data.department || "—";
  document.getElementById("d-position").textContent = teacher.position || "—";
  document.getElementById("d-qualification").textContent =
    teacher.qualification || "—";
  document.getElementById("d-roles").textContent =
    teacher.roles?.join(", ") || "—";

  const researchBox = document.getElementById("d-research");

  if (teacher.research_area && teacher.research_area.length) {
    researchBox.innerHTML = "";
    teacher.research_area.forEach((item) => {
      const chip = document.createElement("span");
      chip.textContent = item;
      researchBox.appendChild(chip);
    });
  } else {
    researchBox.innerHTML = "<span>—</span>";
  }

  // exported/updated date
  const date = new Date(data.exported_at);
  document.getElementById("d-updated").textContent = isNaN(date)
    ? "—"
    : date.toLocaleDateString();
}

loadFaculty();
