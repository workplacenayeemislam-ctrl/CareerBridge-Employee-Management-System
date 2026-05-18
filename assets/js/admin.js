import { initThemeToggle, loadTheme } from "./ui.js";

loadTheme();
initThemeToggle("#themeToggle");

// Admin page can be extended with API calls and configuration forms.
const adminCards = document.querySelectorAll(".admin-card");
adminCards.forEach((card) => {
  card.addEventListener("click", () => {
    alert("Admin module coming soon. Use this section to manage departments and user roles.");
  });
});
