// Shared UI utilities used across pages.

const themeKey = "careerbridge-theme";
const sessionKey = "careerbridge-user";
const body = document.body;

export function loadTheme() {
  const saved = localStorage.getItem(themeKey);
  if (saved === "light") {
    body.classList.remove("dark-theme");
  } else {
    body.classList.add("dark-theme");
  }
}

export function toggleTheme() {
  body.classList.toggle("dark-theme");
  const isDark = body.classList.contains("dark-theme");
  localStorage.setItem(themeKey, isDark ? "dark" : "light");
}

export function initThemeToggle(buttonId) {
  const button = document.querySelector(buttonId);
  if (!button) return;
  button.addEventListener("click", () => {
    toggleTheme();
  });
}

export function getUserSession() {
  const json = localStorage.getItem(sessionKey);
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error("Failed to parse user session:", error);
    return null;
  }
}

export function setUserSession(user) {
  if (!user) return;
  localStorage.setItem(sessionKey, JSON.stringify(user));
}

export function clearUserSession() {
  localStorage.removeItem(sessionKey);
}

export function requireLogin(options = {}) {
  const user = getUserSession();
  if (!user) {
    window.location.href = "index.html";
    return null;
  }
  if (options.allowAdminOnly && (user.role || "").toString().toLowerCase() !== "admin") {
    window.location.href = "dashboard.html";
    return null;
  }
  return user;
}

export function renderAppHeader() {
  const user = getUserSession();
  const headerUser = document.getElementById("headerUser");
  if (!headerUser) return;

  if (user) {
    headerUser.textContent = `${user.fullName || user.email} · ${user.role || "User"}`;
  } else {
    headerUser.textContent = "Guest user";
  }
}

export function attachLogout(selector = "#logoutBtn") {
  const logoutButton = document.querySelector(selector);
  if (!logoutButton) return;

  logoutButton.addEventListener("click", () => {
    clearUserSession();
    window.location.href = "index.html";
  });
}

export function applyRoleNavigation() {
  const user = getUserSession();
  const adminLink = document.querySelector('a.sidebar-link[href="admin.html"]');
  if (!adminLink) return;

  const isAdmin = user && (user.role || "").toString().toLowerCase() === "admin";
  adminLink.style.display = isAdmin ? "block" : "none";
}

export function buildSidebar() {
  const links = document.querySelectorAll(".sidebar-link");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
}
