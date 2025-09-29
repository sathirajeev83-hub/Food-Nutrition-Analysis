// Save new user in localStorage
function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (localStorage.getItem(username)) {
    alert("⚠️ Username already exists. Please choose another.");
  } else {
    localStorage.setItem(username, password);
    alert("✅ Registration successful! Please login.");
    window.location.href = "login.html";
  }
}

// Login check
function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const storedPassword = localStorage.getItem(username);

  if (storedPassword && storedPassword === password) {
    alert("✅ Login successful! Welcome " + username);
    localStorage.setItem("loggedInUser", username);
    window.location.href = "home.html";
  } else {
    alert("❌ Invalid username or password.");
  }
}

// Logout function
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// Check if user is logged in (protect index.html)
if (window.location.pathname.includes("index.html")) {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "login.html";
  }
}