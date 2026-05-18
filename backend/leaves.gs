function handleLeaveRequest(method, action, payload) {
  if (method === "GET") {
    return jsonResponse({ success: true, items: getSheetValues(SHEET_CONFIG.leaves) });
  }

  if (method === "POST") {
    return addLeave(payload);
  }

  return jsonResponse({ success: false, message: "Unsupported leave request." }, 405);
}

function addLeave(payload) {
  const sheet = getSheetByName(SHEET_CONFIG.leaves);
  const row = [
    payload.leaveId || generateId("LV"),
    payload.employeeId || "",
    payload.startDate || "",
    payload.endDate || "",
    payload.type || "Vacation",
    payload.reason || "",
    payload.status || "Pending",
    payload.approval || "Awaiting",
  ];
  sheet.appendRow(row);
  return jsonResponse({ success: true, message: "Leave request recorded." });
}
