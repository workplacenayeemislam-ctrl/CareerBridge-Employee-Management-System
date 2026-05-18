import { fetchTasks } from "./api.js";
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

const tableBody = document.getElementById("tasksTable");

function renderRows(tasks) {
  if (!tasks || tasks.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-500">No active tasks found.</td></tr>`;
    return;
  }

  tableBody.innerHTML = tasks
    .map((task) => {
      return `
        <tr class="border-b border-slate-700">
          <td class="py-4">${task.title}</td>
          <td class="py-4">${task.assignedTo || "Unassigned"}</td>
          <td class="py-4">${task.department || "General"}</td>
          <td class="py-4">${task.status || "Open"}</td>
          <td class="py-4">${task.dueDate || "TBD"}</td>
        </tr>`;
    })
    .join("");
}

async function loadTasks() {
  try {
    const data = await fetchTasks();
    renderRows(data.items || []);
  } catch (error) {
    console.error("Task load error:", error);
    tableBody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-rose-300">Unable to load tasks. Check the API connection.</td></tr>`;
  }
}

loadTasks();
