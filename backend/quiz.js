const fs = require("fs");
const path = require("path");

const QUIZZES_FILE = path.join(__dirname, "data", "quizzes.json");
const SCORES_FILE = path.join(__dirname, "data", "quiz-scores.json");

function loadQuizzes() {
  return JSON.parse(fs.readFileSync(QUIZZES_FILE, "utf8"));
}

function loadScores() {
  if (!fs.existsSync(SCORES_FILE)) {
    fs.writeFileSync(SCORES_FILE, JSON.stringify({ scores: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(SCORES_FILE, "utf8"));
}

function saveScores(store) {
  fs.writeFileSync(SCORES_FILE, JSON.stringify(store, null, 2));
}

function getRank(percent, ranks) {
  const sorted = [...ranks].sort((a, b) => b.minPercent - a.minPercent);
  return sorted.find((r) => percent >= r.minPercent) || sorted[sorted.length - 1];
}

function evaluateQuiz(subject, answers) {
  const data = loadQuizzes();
  const questions = data.quizzes[subject];
  if (!questions) return { error: "Invalid subject", status: 400 };

  let correct = 0;
  const results = questions.map((q, i) => {
    const chosen = answers[i];
    const isCorrect = chosen === q.correct;
    if (isCorrect) correct++;
    return {
      questionId: q.id,
      question: q.question,
      chosen,
      correct: q.correct,
      isCorrect,
      explanation: q.explanation
    };
  });

  const total = questions.length;
  const percent = Math.round((correct / total) * 100);
  const rank = getRank(percent, data.ranks);

  return {
    subject,
    correct,
    total,
    percent,
    score: correct,
    rank: {
      medal: rank.medal,
      label: rank.label,
      title: rank.title,
      emoji: rank.emoji,
      remark: rank.remark
    },
    results
  };
}

function saveScore(userId, payload) {
  const store = loadScores();
  const entry = {
    id: Date.now().toString(36),
    userId: userId || "guest",
    subject: payload.subject,
    correct: payload.correct,
    total: payload.total,
    percent: payload.percent,
    medal: payload.rank.medal,
    title: payload.rank.title,
    at: new Date().toISOString()
  };
  store.scores.unshift(entry);
  if (store.scores.length > 500) store.scores = store.scores.slice(0, 500);
  saveScores(store);
  return entry;
}

function getPublicQuestions(subject) {
  const data = loadQuizzes();
  const questions = data.quizzes[subject];
  if (!questions) return null;
  return questions.map(({ id, question, options }) => ({ id, question, options }));
}

module.exports = {
  loadQuizzes,
  getPublicQuestions,
  evaluateQuiz,
  saveScore,
  getRank
};
