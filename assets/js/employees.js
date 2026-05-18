import { fetchEmployees } from "./api.js";
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

const tableBody = document.getElementById("employeesTable");
const addEmployeeBtn = document.getElementById("addEmployeeBtn");
if (addEmployeeBtn && (currentUser.role || "").toString().toLowerCase() !== "admin") {
  addEmployeeBtn.style.display = "none";
}

function renderRows(employees) {
  if (!employees || employees.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-500">No employees found.</td></tr>`;
    return;
  }

  tableBody.innerHTML = employees
    .map((employee) => {
      const name = `${employee.firstName} ${employee.lastName}`;
      return `
        <tr class="border-b border-slate-700">
          <td class="py-4">${name}</td>
          <td class="py-4">${employee.department || "Unassigned"}</td>
          <td class="py-4">${employee.role || "Staff"}</td>
          <td class="py-4">${employee.status || "Active"}</td>
          <td class="py-4">
            <button class="btn-secondary mr-2">Edit</button>
            <button class="btn-secondary">Delete</button>
          </td>
        </tr>`;
    })
    .join("");
}

async function loadEmployees() {
  try {
    const data = await fetchEmployees();
    renderRows(data.items || []);
  } catch (error) {
    console.error("Employee load error:", error);
    tableBody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-rose-300">Unable to load employees. Check the API connection.</td></tr>`;
  }
}

loadEmployees();
