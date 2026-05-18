function handleTaskRequest(method, action, payload) {
  if (method === "GET") {
    return jsonResponse({ success: true, items: getSheetValues(SHEET_CONFIG.tasks) });
  }

  if (method === "POST") {
    if (action === "update") {
      return updateTask(payload);
    }
    return addTask(payload);
  }

  return jsonResponse({ success: false, message: "Unsupported task request." }, 405);
}

function addTask(payload) {
  const sheet = getSheetByName(SHEET_CONFIG.tasks);
  const row = [
    payload.taskId || generateId("TSK"),
    payload.title || "",
    payload.description || "",
    payload.assignedTo || "",
    payload.department || "",
    payload.priority || "Medium",
    payload.status || "Open",
    payload.dueDate || "",
    new Date().toISOString(),
  ];
  sheet.appendRow(row);
  return jsonResponse({ success: true, message: "Task created." });
}

function updateTask(payload) {
  const sheet = getSheetByName(SHEET_CONFIG.tasks);
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  const idIndex = headers.indexOf("taskId");
  if (idIndex < 0) {
    throw new Error("taskId column not found.");
  }

  const rowIndex = rows.findIndex((row) => row[idIndex] === payload.taskId);
  if (rowIndex === -1) {
    return jsonResponse({ success: false, message: "Task not found." }, 404);
  }

  const record = rows[rowIndex];
  headers.forEach((header, index) => {
    if (payload[header] !== undefined) {
      record[index] = payload[header];
    }
  });
  sheet.getRange(rowIndex + 2, 1, 1, record.length).setValues([record]);
  return jsonResponse({ success: true, message: "Task updated." });
}
