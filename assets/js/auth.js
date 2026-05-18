import { loginUser } from "./api.js";
import { initThemeToggle, loadTheme } from "./ui.js";

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
      window.location.href = "dashboard.html";
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
