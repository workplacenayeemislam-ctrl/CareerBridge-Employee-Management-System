import { fetchAttendance } from "./api.js";
import { initThemeToggle, loadTheme } from "./ui.js";

loadTheme();
initThemeToggle("#themeToggle");

const tableBody = document.getElementById("attendanceTable");

function renderRows(records) {
  if (!records || records.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-500">No attendance records available.</td></tr>`;
    return;
  }

  tableBody.innerHTML = records
    .map((record) => {
      return `
        <tr class="border-b border-slate-700">
          <td class="py-4">${record.date}</td>
          <td class="py-4">${record.employeeName || record.employeeId}</td>
          <td class="py-4">${record.status || "Present"}</td>
          <td class="py-4">${record.checkIn || "-"}</td>
          <td class="py-4">${record.checkOut || "-"}</td>
        </tr>`;
    })
    .join("");
}

async function loadAttendance() {
  try {
    const data = await fetchAttendance();
    renderRows(data.items || []);
  } catch (error) {
    console.error("Attendance load error:", error);
    tableBody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-rose-300">Unable to load attendance. Check the API connection.</td></tr>`;
  }
}

loadAttendance();
