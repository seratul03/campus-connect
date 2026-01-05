// ==========================================
// LOGIN FUNCTION
// ==========================================
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.role === "student") {
      // Store user session in localStorage
      localStorage.setItem("campusConnectUser", JSON.stringify({
        id: data.id,
        name: data.name,
        email: email,
        role: data.role
      }));
      window.location.href = "student-dashboard.html";
    } else if (data.role === "admin") {
      // Store admin session in localStorage
      localStorage.setItem("campusConnectUser", JSON.stringify({
        id: data.id,
        name: data.name,
        email: email,
        role: data.role
      }));
      window.location.href = "../admin/admin-dashboard.html";
    } else {
      document.getElementById("error").innerText = "Invalid credentials";
    }
  } catch (error) {
    console.error("Login error:", error);
    document.getElementById("error").innerText = "Login failed. Please try again.";
  }
}

// ==========================================
// LOGOUT FUNCTION
// ==========================================
function logout() {
  localStorage.removeItem("campusConnectUser");
  window.location.href = "../frontend/login.html";
}

// ==========================================
// CHECK AUTHENTICATION FOR PROTECTED PAGES
// ==========================================
function checkAuth(requiredRole = null) {
  const userStr = localStorage.getItem("campusConnectUser");
  
  if (!userStr) {
    // Not logged in - redirect to login
    window.location.href = "login.html";
    return null;
  }
  
  const user = JSON.parse(userStr);
  
  // If specific role required, check it
  if (requiredRole && user.role !== requiredRole) {
    alert("Access denied. You don't have permission to view this page.");
    window.location.href = "login.html";
    return null;
  }
  
  return user;
}

// ==========================================
// GET CURRENT USER
// ==========================================
function getCurrentUser() {
  const userStr = localStorage.getItem("campusConnectUser");
  return userStr ? JSON.parse(userStr) : null;
}

// ==========================================
// CHECK IF USER IS LOGGED IN
// ==========================================
function isLoggedIn() {
  return localStorage.getItem("campusConnectUser") !== null;
}
