function handleEmployeeRequest(method, action, payload) {
  if (method === "GET") {
    return jsonResponse({ success: true, items: getSheetValues(SHEET_CONFIG.employees) });
  }

  if (method === "POST") {
    if (action === "delete") {
      return deleteEmployee(payload.employeeId);
    }
    return addEmployee(payload);
  }

  return jsonResponse({ success: false, message: "Unsupported employee request." }, 405);
}

function addEmployee(payload) {
  const sheet = getSheetByName(SHEET_CONFIG.employees);
  const row = [
    payload.employeeId || generateId("EMP"),
    payload.firstName || "",
    payload.lastName || "",
    payload.email || "",
    payload.department || "",
    payload.role || "",
    payload.hireDate || new Date().toISOString().split("T")[0],
    payload.status || "Active",
    payload.phone || "",
    payload.location || "",
    payload.manager || "",
    payload.notes || "",
  ];
  sheet.appendRow(row);
  return jsonResponse({ success: true, message: "Employee added successfully." });
}

function deleteEmployee(employeeId) {
  const sheet = getSheetByName(SHEET_CONFIG.employees);
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  const keyIndex = headers.indexOf("employeeId");
  if (keyIndex < 0) {
    throw new Error("employeeId column not found.");
  }

  const rowIndex = rows.findIndex((row) => row[keyIndex] === employeeId);
  if (rowIndex === -1) {
    return jsonResponse({ success: false, message: "Employee not found." }, 404);
  }

  sheet.deleteRow(rowIndex + 2);
  return jsonResponse({ success: true, message: "Employee removed." });
}

function generateId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}
