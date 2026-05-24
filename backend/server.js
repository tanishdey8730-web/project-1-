const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const auth = require("./auth");
const quiz = require("./quiz");
const offline = require("./offline");

const app = express();
const ROOT = path.join(__dirname, "..");
const REQUESTED_PORT = Number(process.env.PORT) || 3000;
const MAX_PORT_TRIES = 10;

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(ROOT));

function loadEducation() {
  const file = path.join(__dirname, "data", "education.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function loadItEducation() {
  const file = path.join(__dirname, "data", "it-education.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function loadRoadmaps() {
  const file = path.join(__dirname, "data", "roadmaps.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const examFile = path.join(__dirname, "data", "exam-roadmaps.json");
  if (fs.existsSync(examFile)) {
    const examData = JSON.parse(fs.readFileSync(examFile, "utf8"));
    Object.assign(data, examData);
  }
  return data;
}

function loadBanners() {
  const file = path.join(__dirname, "data", "banners.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function requireAuth(req, res, next) {
  const token = auth.extractToken(req);
  const user = auth.getSession(token);
  if (!user) return res.status(401).json({ error: "Not authenticated" });
  req.user = user;
  req.token = token;
  next();
}

function requireProfile(req, res, next) {
  const result = auth.requireProfileUser(req);
  if (result.error) return res.status(result.status).json({ error: result.error });
  req.user = result.user;
  req.token = result.token;
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "sharda-setu" });
});

app.get("/api/banners", (_req, res) => {
  res.json(loadBanners());
});

app.get("/api/online-education", (_req, res) => {
  res.json(loadEducation());
});

app.get("/api/online-education/exams", (_req, res) => {
  const data = loadEducation();
  res.json({ exams: data.competitiveExams });
});

app.get("/api/online-education/exams/:id", (req, res) => {
  const data = loadEducation();
  const exam = data.competitiveExams.find((e) => e.id === req.params.id);
  if (!exam) return res.status(404).json({ error: "Exam not found" });
  res.json(exam);
});

app.get("/api/online-education/subjects", (_req, res) => {
  const data = loadEducation();
  res.json({ subjects: data.subjects, playlists: data.subjectPlaylists });
});

app.get("/api/it-education", (_req, res) => {
  res.json(loadItEducation());
});

app.get("/api/it-education/exams", (_req, res) => {
  const data = loadItEducation();
  res.json({ exams: data.itExams });
});

app.get("/api/it-education/exams/:id", (req, res) => {
  const data = loadItEducation();
  const exam = data.itExams.find((e) => e.id === req.params.id);
  if (!exam) return res.status(404).json({ error: "Exam not found" });
  res.json(exam);
});

app.get("/api/roadmaps", (_req, res) => {
  res.json(loadRoadmaps());
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, password, role } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }
  const result = auth.register({ name, email, password, role });
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.status(201).json(result);
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const result = auth.login({ email, password });
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json(result);
});

app.post("/api/auth/logout", (req, res) => {
  const token = auth.extractToken(req);
  if (token) auth.logout(token);
  res.json({ ok: true });
});

app.get("/api/profile/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

app.put("/api/profile/me", requireAuth, (req, res) => {
  const result = auth.updateProfile(req.user.id, req.body || {});
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json(result);
});

app.get("/api/quiz", (_req, res) => {
  const data = quiz.loadQuizzes();
  res.json({
    title: data.title,
    description: data.description,
    categories: data.categories || [],
    subjects: data.subjects,
    questionsPerQuiz: data.questionsPerQuiz,
    ranks: data.ranks
  });
});

app.get("/api/quiz/:subject", (req, res) => {
  const questions = quiz.getPublicQuestions(req.params.subject);
  if (!questions) return res.status(404).json({ error: "Subject not found" });
  res.json({ subject: req.params.subject, questions });
});

app.post("/api/quiz/:subject/submit", (req, res) => {
  const { answers } = req.body || {};
  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: "answers array is required" });
  }
  const result = quiz.evaluateQuiz(req.params.subject, answers);
  if (result.error) return res.status(result.status).json({ error: result.error });

  const token = auth.extractToken(req);
  const user = auth.getSession(token);
  if (user) quiz.saveScore(user.id, result);

  res.json(result);
});

/* —— Offline video library (profile required) —— */
app.get("/api/offline/status", requireProfile, (_req, res) => {
  res.json({
    enabled: offline.isEngineReady(),
    maxPerUser: 30,
    requiresProfile: true
  });
});

app.get("/api/offline", requireProfile, (req, res) => {
  res.json({ downloads: offline.listForUser(req.user.id), user: { id: req.user.id, name: req.user.name } });
});

app.get("/api/offline/:id", requireProfile, (req, res) => {
  const row = offline.findForUser(req.user.id, req.params.id);
  if (!row) return res.status(404).json({ error: "Download not found" });
  const { id, userId, filename, ...pub } = row;
  res.json({
    download: {
      id: row.id,
      videoId: row.videoId,
      title: row.title,
      source: row.source,
      examId: row.examId,
      subjectId: row.subjectId,
      status: row.status,
      error: row.error || "",
      fileSize: row.fileSize || 0,
      createdAt: row.createdAt,
      completedAt: row.completedAt || null
    }
  });
});

app.post("/api/offline/download", requireProfile, (req, res) => {
  const result = offline.startDownload(req.user.id, req.body || {});
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.status(result.alreadyExists ? 200 : 202).json(result);
});

app.get("/api/offline/:id/file", (req, res) => {
  const token =
    auth.extractToken(req) ||
    (req.query.access_token ? String(req.query.access_token) : null);
  const user = auth.getSession(token);
  if (!user) return res.status(401).json({ error: "Please sign in to watch offline videos." });
  if (!user.name || !user.email) {
    return res.status(403).json({ error: "Complete your Sharda Setu profile first." });
  }
  const result = offline.streamDownload(user.id, req.params.id, req, res);
  if (result && result.error) return res.status(result.status).json({ error: result.error });
});

app.delete("/api/offline/:id", requireProfile, (req, res) => {
  const result = offline.removeDownload(req.user.id, req.params.id);
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json(result);
});

function start(port, attemptsLeft) {
  const server = app.listen(port, () => {
    const used = server.address().port;
    if (used !== REQUESTED_PORT) {
      console.log(`[warn] Port ${REQUESTED_PORT} was busy. Started on ${used} instead.`);
    }
    console.log(`Sharda Setu backend running at http://localhost:${used}`);
    console.log(`Home: http://localhost:${used}/index.html`);
    console.log(`Learn with Game: http://localhost:${used}/learn-game.html`);
    console.log(`Offline Library: http://localhost:${used}/offline.html (sign in required)`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && attemptsLeft > 0) {
      console.log(`[warn] Port ${port} is in use. Trying ${port + 1}…`);
      setTimeout(() => start(port + 1, attemptsLeft - 1), 250);
    } else {
      console.error("Failed to start server:", err.message);
      process.exit(1);
    }
  });
}

start(REQUESTED_PORT, MAX_PORT_TRIES);
