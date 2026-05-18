// Shared UI utilities used across pages.

const themeKey = "careerbridge-theme";
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

export function buildSidebar() {
  const links = document.querySelectorAll(".sidebar-link");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
}
