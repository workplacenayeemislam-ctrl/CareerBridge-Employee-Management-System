import { fetchReports } from "./api.js";
import { initThemeToggle, loadTheme, requireLogin, renderAppHeader, attachLogout, applyRoleNavigation } from "./ui.js";

loadTheme();
initThemeToggle("#themeToggle");

const currentUser = requireLogin();
if (!currentUser) {
  throw new Error("Login required");
}

renderAppHeader();
attachLogout();
applyRoleNavigation();

const placeholder = document.querySelector(".report-card");

async function loadReports() {
  try {
    const data = await fetchReports();
    if (!data.items || data.items.length === 0) {
      return;
    }

    const reportElements = data.items
      .slice(0, 4)
      .map((report) => `
        <div class="report-card p-6">
          <h3 class="text-lg font-semibold">${report.name}</h3>
          <p class="mt-3 text-slate-400">${report.type || "Summary report"}</p>
          <p class="mt-4 text-sm text-slate-300">${report.details || "No details available."}</p>
        </div>`)
      .join("");

    document.querySelector("section .grid").innerHTML = reportElements;
  } catch (error) {
    console.error("Reports load error:", error);
  }
}

loadReports();
