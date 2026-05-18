function handleReportRequest(method, action, payload) {
  if (method === "GET") {
    return jsonResponse({ success: true, items: getSheetValues(SHEET_CONFIG.reports) });
  }

  return jsonResponse({ success: false, message: "Unsupported report request." }, 405);
}
