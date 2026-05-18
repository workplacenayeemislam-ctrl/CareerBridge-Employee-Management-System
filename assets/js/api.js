import { API_BASE_URL } from "./config.js";

const defaultHeaders = {
  "Content-Type": "application/json",
};

async function handleResponse(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("Invalid JSON response from API");
  }
}

function buildUrl(path, query = {}) {
  const url = new URL(API_BASE_URL);
  url.pathname = path;
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

export async function getRequest(path, query) {
  const url = buildUrl(path, query);
  const response = await fetch(url, {
    method: "GET",
    headers: defaultHeaders,
    mode: "cors",
  });
  if (!response.ok) {
    const error = await handleResponse(response);
    throw new Error(error.message || "API GET request failed");
  }
  return handleResponse(response);
}

export async function postRequest(path, body) {
  const response = await fetch(buildUrl(path), {
    method: "POST",
    headers: defaultHeaders,
    mode: "cors",
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error = await handleResponse(response);
    throw new Error(error.message || "API POST request failed");
  }
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

export async function fetchReports() {
  return getRequest("/reports");
}
