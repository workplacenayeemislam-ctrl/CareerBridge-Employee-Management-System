import { API_BASE_URL } from "./config.js";

async function handleResponse(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("Invalid JSON response from API");
  }
}

export async function postRequest(path, body) {
  const url = `${API_BASE_URL}?path=${path}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}

export async function getRequest(path, query = {}) {
  const params = new URLSearchParams({ path, ...query });
  const url = `${API_BASE_URL}?${params.toString()}`;
  const response = await fetch(url, {
    method: "GET",
  });
  return handleResponse(response);
}

export async function loginUser(credentials) {
  return postRequest("/auth/login", credentials);
}

export async function fetchEmployees() {
  return getRequest("/employees");
}

export async function fetchAttendance() {
  return getRequest("/attendance");
}

export async function fetchTasks() {
  return getRequest("/tasks");
}

export async function fetchLeaves() {
  return getRequest("/leaves");
}

export async function fetchAdminOverview() {
  return getRequest("/admin/overview");
}

export async function fetchReports() {
  return getRequest("/reports");
}