import { fetchEmployees, fetchAttendance, fetchTasks } from "./api.js";
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

async function renderDashboard() {
  try {
    const [employeeData, attendanceData, taskData] = await Promise.all([
      fetchEmployees(),
      fetchAttendance(),
      fetchTasks(),
    ]);

    document.getElementById("employeeCount").textContent = employeeData.items?.length || 0;
    document.getElementById("attendanceCount").textContent = attendanceData.items?.length || 0;
    document.getElementById("taskCount").textContent = taskData.items?.filter((task) => task.status !== "Completed").length || 0;
  } catch (error) {
    console.error("Dashboard error:", error);
    document.getElementById("employeeCount").textContent = "N/A";
    document.getElementById("attendanceCount").textContent = "N/A";
    document.getElementById("taskCount").textContent = "N/A";
  }
}

renderDashboard();
