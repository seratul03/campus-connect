async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.role === "student") {
    window.location.href = "student-dashboard.html";
  } else if (data.role === "admin") {
    window.location.href = "../admin/admin-dashboard.html";
  } else {
    document.getElementById("error").innerText =
      "Invalid credentials";
  }
}
