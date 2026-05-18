const SPREADSHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE";
const SHEET_CONFIG = {
  users: "Users",
  employees: "Employees",
  attendance: "Attendance",
  tasks: "Tasks",
  leaves: "Leaves",
  reports: "Reports",
  departments: "Departments",
};

function doGet(e) {
  return handleRequest(e, "GET");
}

function doPost(e) {
  return handleRequest(e, "POST");
}

function doOptions(e) {
  return ContentService.createTextOutput(JSON.stringify({ success: true, message: "CORS preflight OK." }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleRequest(e, method) {
  const path = e.pathInfo || e.parameter.path || "";
  const resource = path.split("/")[1] || "";
  const action = path.split("/")[2] || "";

  try {
    const payload = method === "POST" ? JSON.parse(e.postData.contents || "{}") : e.parameter;

    switch (resource) {
      case "auth":
        return handleAuthRequest(action, payload);
      case "employees":
        return handleEmployeeRequest(method, action, payload);
      case "attendance":
        return handleAttendanceRequest(method, action, payload);
      case "tasks":
        return handleTaskRequest(method, action, payload);
      case "leaves":
        return handleLeaveRequest(method, action, payload);
      case "reports":
        return handleReportRequest(method, action, payload);
      case "admin":
        return handleAdminRequest(action, payload);
      default:
        return jsonResponse({ success: false, message: "Invalid API path." }, 404);
    }
  } catch (error) {
    return jsonResponse({ success: false, message: error.message || "Server error." }, 500);
  }
}

function jsonResponse(payload, statusCode = 200) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleAuthRequest(action, payload) {
  if (action === "login") {
    return handleLogin(payload);
  }
  return jsonResponse({ success: false, message: "Unknown auth action." }, 400);
}

function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getSheetValues(sheetName) {
  const sheet = getSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`Sheet '${sheetName}' not found.`);
  }
  const rows = sheet.getDataRange().getValues();
  const keys = rows.shift();
  return rows.map((row) => {
    const record = {};
    row.forEach((cell, index) => {
      record[keys[index]] = cell;
    });
    return record;
  });
}

function getSheetByName(name) {
  const sheet = getSpreadsheet().getSheetByName(name);
  if (!sheet) {
    throw new Error(`Missing sheet: ${name}`);
  }
  return sheet;
}
