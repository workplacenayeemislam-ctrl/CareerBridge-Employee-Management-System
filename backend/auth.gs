function handleLogin(payload) {
  const email = (payload.email || "").toString().trim().toLowerCase();
  const password = (payload.password || "").toString().trim();
  if (!email || !password) {
    return jsonResponse({ success: false, message: "Email and password are required." }, 400);
  }

  const users = getSheetValues(SHEET_CONFIG.users);
  const user = users.find((row) => (row.email || "").toString().toLowerCase() === email);

  if (!user) {
    return jsonResponse({ success: false, message: "User not found." }, 401);
  }

  const storedPassword = (user.passwordHash || "").toString();
  if (password !== storedPassword) {
    return jsonResponse({ success: false, message: "Invalid credentials." }, 401);
  }

  return jsonResponse({ success: true, user: { email: user.email, role: user.role, fullName: user.fullName } });
}
