const AUTH_KEY = "sharda_setu_auth";

function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
  } catch {
    return null;
  }
}

function setAuth(data) {
  if (data) localStorage.setItem(AUTH_KEY, JSON.stringify(data));
  else localStorage.removeItem(AUTH_KEY);
}

function getToken() {
  return getAuth()?.token || null;
}

function getUser() {
  return getAuth()?.user || null;
}

function isLoggedIn() {
  return Boolean(getToken());
}

async function apiFetch(url, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

async function register(payload) {
  const data = await apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  setAuth(data);
  return data;
}

async function login(payload) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  setAuth(data);
  return data;
}

async function logout() {
  try {
    await apiFetch("/api/auth/logout", { method: "POST" });
  } catch (_) {}
  setAuth(null);
  window.location.href = "index.html";
}

async function fetchProfile() {
  const data = await apiFetch("/api/profile/me");
  const auth = getAuth();
  if (auth) {
    auth.user = data.user;
    setAuth(auth);
  }
  return data.user;
}

async function updateProfile(updates) {
  const data = await apiFetch("/api/profile/me", {
    method: "PUT",
    body: JSON.stringify(updates)
  });
  const auth = getAuth();
  if (auth) {
    auth.user = data.user;
    setAuth(auth);
  }
  return data.user;
}

function renderHeaderAuth(container) {
  if (!container) return;
  const user = getUser();

  if (user) {
    container.innerHTML = `
      <div class="profile-menu">
        <button type="button" class="profile-trigger" id="profile-trigger" aria-expanded="false">
          <img class="profile-avatar" src="${escapeAttr(user.avatar)}" alt="${escapeAttr(user.name)}" width="36" height="36"/>
          <span class="profile-name">${escapeHtml(user.name.split(" ")[0])}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path fill="currentColor" d="M2 4l4 4 4-4"/></svg>
        </button>
        <div class="profile-dropdown" id="profile-dropdown" hidden>
          <div class="profile-dropdown-head">
            <img src="${escapeAttr(user.avatar)}" alt="" width="48" height="48"/>
            <div>
              <strong>${escapeHtml(user.name)}</strong>
              <span>${escapeHtml(user.email)}</span>
              <span class="role-badge">${user.role === "teacher" ? "Teacher" : "Student"}</span>
            </div>
          </div>
          <a href="profile.html">My Profile</a>
          <a href="online-education.html">My Courses</a>
          <a href="offline.html">Offline Library</a>
          <button type="button" id="logout-btn">Sign Out</button>
        </div>
      </div>`;

    const trigger = document.getElementById("profile-trigger");
    const dropdown = document.getElementById("profile-dropdown");
    trigger?.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = dropdown.hidden;
      dropdown.hidden = !open;
      trigger.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", () => {
      dropdown.hidden = true;
      trigger?.setAttribute("aria-expanded", "false");
    });
    document.getElementById("logout-btn")?.addEventListener("click", logout);
  } else {
    container.innerHTML = `
      <a href="login.html"><button class="btn btn-ghost" type="button">Login</button></a>
      <a href="signup.html"><button class="btn btn-primary" type="button">Sign Up</button></a>`;
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}

function initHeader() {
  renderHeaderAuth(document.getElementById("auth-slot"));
}

window.ShardaAuth = {
  getAuth,
  getToken,
  getUser,
  isLoggedIn,
  apiFetch,
  register,
  login,
  logout,
  fetchProfile,
  updateProfile,
  renderHeaderAuth,
  initHeader
};

document.addEventListener("DOMContentLoaded", initHeader);
