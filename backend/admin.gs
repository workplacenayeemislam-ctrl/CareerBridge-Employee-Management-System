function handleAdminRequest(action, payload) {
  if (action === "overview") {
    const users = getSheetValues(SHEET_CONFIG.users);
    const departments = getSheetValues(SHEET_CONFIG.departments);
    const leaves = getSheetValues(SHEET_CONFIG.leaves);
    const pendingLeaves = leaves.filter((leave) => (leave.status || "").toString().toLowerCase() === "pending").length;

    return jsonResponse({
      success: true,
      overview: {
        totalUsers: users.length,
        adminCount: users.filter((user) => (user.role || "").toString().toLowerCase() === "admin").length,
        totalDepartments: departments.length,
        pendingLeaves,
      },
    });
  }

  return jsonResponse({ success: false, message: "Unknown admin action." }, 400);
}
