const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "data", "users.json");

function loadStore() {
  if (!fs.existsSync(USERS_FILE)) {
    const initial = { users: [], sessions: [] };
    fs.writeFileSync(USERS_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

function saveStore(store) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(store, null, 2));
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  const attempt = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return attempt === hash;
}

function newId() {
  return crypto.randomBytes(12).toString("hex");
}

function newToken() {
  return crypto.randomBytes(32).toString("hex");
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    examGoal: user.examGoal,
    bio: user.bio,
    phone: user.phone,
    city: user.city,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

function register({ name, email, password, role }) {
  const store = loadStore();
  const normalized = email.trim().toLowerCase();
  if (store.users.some((u) => u.email === normalized)) {
    return { error: "Email already registered", status: 409 };
  }
  const user = {
    id: newId(),
    name: name.trim(),
    email: normalized,
    passwordHash: hashPassword(password),
    role: role === "teacher" ? "teacher" : "student",
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=2b6ef4&color=fff&size=128`,
    examGoal: "",
    bio: "",
    phone: "",
    city: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  store.users.push(user);
  saveStore(store);
  const token = createSession(store, user.id);
  saveStore(store);
  return { user: publicUser(user), token };
}

function createSession(store, userId) {
  const token = newToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  store.sessions = store.sessions.filter((s) => s.userId !== userId);
  store.sessions.push({ token, userId, expiresAt });
  return token;
}

function login({ email, password }) {
  const store = loadStore();
  const normalized = email.trim().toLowerCase();
  const user = store.users.find((u) => u.email === normalized);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Invalid email or password", status: 401 };
  }
  const token = createSession(store, user.id);
  saveStore(store);
  return { user: publicUser(user), token };
}

function getSession(token) {
  if (!token) return null;
  const store = loadStore();
  const session = store.sessions.find((s) => s.token === token);
  if (!session) return null;
  if (new Date(session.expiresAt) < new Date()) {
    store.sessions = store.sessions.filter((s) => s.token !== token);
    saveStore(store);
    return null;
  }
  const user = store.users.find((u) => u.id === session.userId);
  return user ? publicUser(user) : null;
}

function logout(token) {
  const store = loadStore();
  store.sessions = store.sessions.filter((s) => s.token !== token);
  saveStore(store);
}

function updateProfile(userId, updates) {
  const store = loadStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user) return { error: "User not found", status: 404 };

  const allowed = ["name", "role", "examGoal", "bio", "phone", "city", "avatar"];
  for (const key of allowed) {
    if (updates[key] !== undefined) user[key] = String(updates[key]).trim();
  }
  if (updates.role) user.role = updates.role === "teacher" ? "teacher" : "student";
  user.updatedAt = new Date().toISOString();
  saveStore(store);
  return { user: publicUser(user) };
}

function extractToken(req) {
  const header = req.headers.authorization || "";
  if (header.startsWith("Bearer ")) return header.slice(7);
  return req.headers["x-auth-token"] || null;
}

/** Logged-in user with a Sharda Setu profile (name + email from sign-up). */
function requireProfileUser(req) {
  const token = extractToken(req);
  const user = getSession(token);
  if (!user) return { error: "Please sign in to use offline access.", status: 401 };
  if (!user.name || !user.email) {
    return { error: "Complete your Sharda Setu profile first.", status: 403 };
  }
  return { user, token };
}

module.exports = {
  register,
  login,
  logout,
  getSession,
  updateProfile,
  extractToken,
  requireProfileUser,
  publicUser
};
