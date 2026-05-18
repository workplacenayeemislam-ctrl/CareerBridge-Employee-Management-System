import { fetchLeaves } from "./api.js";
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

const tableBody = document.getElementById("leavesTable");

function renderRows(leaves) {
  if (!leaves || leaves.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-500">No leave requests found.</td></tr>`;
    return;
  }

  tableBody.innerHTML = leaves
    .map((leave) => {
      return `
        <tr class="border-b border-slate-700">
          <td class="py-4">${leave.employeeName || leave.employeeId}</td>
          <td class="py-4">${leave.startDate} → ${leave.endDate}</td>
          <td class="py-4">${leave.type || "Leave"}</td>
          <td class="py-4">${leave.status || "Pending"}</td>
          <td class="py-4">${leave.approval || "Awaiting"}</td>
        </tr>`;
    })
    .join("");
}

async function loadLeaves() {
  try {
    const data = await fetchLeaves();
    renderRows(data.items || []);
  } catch (error) {
    console.error("Leave load error:", error);
    tableBody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-rose-300">Unable to load leave records. Check the API connection.</td></tr>`;
  }
}

loadLeaves();
