import { loginUser } from "./api.js";
import { initThemeToggle, loadTheme, setUserSession } from "./ui.js";

loadTheme();
initThemeToggle("#themeToggle");

const loginForm = document.getElementById("loginForm");

async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await loginUser({ email, password });
    if (response.success) {
      setUserSession(response.user);
      const destination = (response.user.role || "").toString().toLowerCase() === "admin" ? "admin.html" : "dashboard.html";
      window.location.href = destination;
      return;
    }
    alert(response.message || "Login failed. Check your credentials.");
  } catch (error) {
    console.error(error);
    alert("Unable to authenticate. Please try again later.");
  }
}

if (loginForm) {
  loginForm.addEventListener("submit", handleLogin);
}
