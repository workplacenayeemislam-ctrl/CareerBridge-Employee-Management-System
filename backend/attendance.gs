function handleAttendanceRequest(method, action, payload) {
  if (method === "GET") {
    return jsonResponse({ success: true, items: getSheetValues(SHEET_CONFIG.attendance) });
  }

  if (method === "POST") {
    return addAttendance(payload);
  }

  return jsonResponse({ success: false, message: "Unsupported attendance request." }, 405);
}

function addAttendance(payload) {
  const sheet = getSheetByName(SHEET_CONFIG.attendance);
  const row = [
    payload.recordId || generateId("ATD"),
    payload.employeeId || "",
    payload.date || new Date().toISOString().split("T")[0],
    payload.status || "Present",
    payload.checkIn || "",
    payload.checkOut || "",
    payload.notes || "",
  ];
  sheet.appendRow(row);
  return jsonResponse({ success: true, message: "Attendance record saved." });
}
