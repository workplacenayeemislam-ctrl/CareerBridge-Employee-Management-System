import { fetchAdminOverview } from "./api.js";
import { initThemeToggle, loadTheme, requireLogin, renderAppHeader, attachLogout, applyRoleNavigation } from "./ui.js";

loadTheme();
initThemeToggle("#themeToggle");

const currentUser = requireLogin({ allowAdminOnly: true });
if (!currentUser) {
  // requireLogin already redirected to the appropriate page.
  throw new Error("Admin access required.");
}

renderAppHeader();
attachLogout();
applyRoleNavigation();

const overviewContainer = document.getElementById("adminOverview");

function renderOverview(data) {
  if (!overviewContainer) return;

  overviewContainer.innerHTML = `
    <div class="grid gap-6 lg:grid-cols-4">
      <div class="admin-card p-6">
        <h3 class="text-lg font-semibold">Users</h3>
        <p class="mt-3 text-slate-400">${data.totalUsers} total users</p>
      </div>
      <div class="admin-card p-6">
        <h3 class="text-lg font-semibold">Admins</h3>
        <p class="mt-3 text-slate-400">${data.adminCount} admin accounts</p>
      </div>
      <div class="admin-card p-6">
        <h3 class="text-lg font-semibold">Departments</h3>
        <p class="mt-3 text-slate-400">${data.totalDepartments} active departments</p>
      </div>
      <div class="admin-card p-6">
        <h3 class="text-lg font-semibold">Pending Leaves</h3>
        <p class="mt-3 text-slate-400">${data.pendingLeaves} requests</p>
      </div>
    </div>
  `;
}

async function loadAdminOverview() {
  if (!overviewContainer) return;
  overviewContainer.innerHTML = `<div class="py-10 text-center text-slate-400">Loading admin overview...</div>`;

  try {
    const response = await fetchAdminOverview();
    if (response.success) {
      renderOverview(response.overview || {});
      return;
    }
    overviewContainer.innerHTML = `<div class="py-10 text-center text-rose-300">${response.message || "Admin overview could not load."}</div>`;
  } catch (error) {
    console.error("Admin overview error:", error);
    overviewContainer.innerHTML = `<div class="py-10 text-center text-rose-300">Unable to load admin overview. Check your API configuration.</div>`;
  }
}

loadAdminOverview();
