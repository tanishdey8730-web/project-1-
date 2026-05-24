const STATE = {
  meta: null,
  category: "government",
  subject: null,
  subjectLabel: "",
  questions: [],
  answers: [],
  currentIndex: 0
};

const CATEGORY_COPY = {
  government: {
    title: "Government Exam Subjects",
    lead: "Maths, Physics, Chemistry & General Studies — for SSC, CDS, AFCAT & more"
  },
  "it-tech": {
    title: "IT & Placement Quiz Arena",
    lead: "DSA, Python, Full Stack, Aptitude, HR & TCS NQT — for engineering students"
  }
};

function showStep(id) {
  document.querySelectorAll(".game-step").forEach((el) => {
    el.classList.toggle("active", el.id === id);
    el.hidden = el.id !== id;
  });
}

function evaluateLocal(subject, answers) {
  const data = window.QUIZ_FALLBACK;
  if (!data) throw new Error("Quiz data unavailable");
  const questions = data.quizzes[subject];
  let correct = 0;
  const results = questions.map((q, i) => {
    const chosen = answers[i];
    const isCorrect = chosen === q.correct;
    if (isCorrect) correct++;
    return {
      question: q.question,
      chosen,
      correct: q.correct,
      isCorrect,
      explanation: q.explanation,
      options: q.options
    };
  });
  const total = questions.length;
  const percent = Math.round((correct / total) * 100);
  const ranks = [...data.ranks].sort((a, b) => b.minPercent - a.minPercent);
  const rank = ranks.find((r) => percent >= r.minPercent) || ranks[ranks.length - 1];
  return {
    correct,
    total,
    percent,
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

async function loadMeta() {
  try {
    const res = await fetch("/api/quiz");
    if (!res.ok) throw new Error("API");
    return await res.json();
  } catch {
    const fb = window.QUIZ_FALLBACK;
    if (!fb) throw new Error("No quiz data");
    return {
      title: fb.title,
      description: fb.description,
      categories: fb.categories || [],
      subjects: fb.subjects,
      questionsPerQuiz: fb.questionsPerQuiz,
      ranks: fb.ranks
    };
  }
}

async function loadQuestions(subject) {
  try {
    const res = await fetch(`/api/quiz/${subject}`);
    if (!res.ok) throw new Error("API");
    const data = await res.json();
    return data.questions;
  } catch {
    const fb = window.QUIZ_FALLBACK;
    return (fb.quizzes[subject] || []).map(({ id, question, options }) => ({
      id,
      question,
      options
    }));
  }
}

async function submitAnswers(subject, answers) {
  try {
    const token = window.ShardaAuth?.getToken?.();
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(`/api/quiz/${subject}/submit`, {
      method: "POST",
      headers,
      body: JSON.stringify({ answers })
    });
    if (!res.ok) throw new Error("API");
    return await res.json();
  } catch {
    return evaluateLocal(subject, answers);
  }
}

function renderCategories(meta) {
  const root = document.getElementById("category-tabs");
  if (!root) return;
  const categories = meta.categories?.length
    ? meta.categories
    : [{ id: "government", name: "All Subjects", icon: "📚", subjects: meta.subjects.map((s) => s.id) }];

  root.innerHTML = categories
    .map(
      (c, i) => `
    <button type="button" class="category-tab${i === 0 ? " active" : ""}" data-category="${c.id}" role="tab">
      ${c.icon} ${c.name}
    </button>`
    )
    .join("");

  root.querySelectorAll(".category-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.category === STATE.category) return;
      STATE.category = btn.dataset.category;
      root.querySelectorAll(".category-tab").forEach((t) => {
        t.classList.toggle("active", t === btn);
      });
      renderSubjects(meta);
    });
  });

  if (categories.length) STATE.category = categories[0].id;
}

function renderSubjects(meta) {
  const root = document.getElementById("subject-cards");
  const copy = CATEGORY_COPY[STATE.category] || CATEGORY_COPY.government;
  const titleEl = document.getElementById("step-subjects-title");
  const leadEl = document.getElementById("step-subjects-lead");
  if (titleEl) titleEl.textContent = copy.title;
  if (leadEl) leadEl.textContent = copy.lead;

  const categoryDef = (meta.categories || []).find((c) => c.id === STATE.category);
  const subjectIds = categoryDef?.subjects;
  const subjects = subjectIds
    ? meta.subjects.filter((s) => subjectIds.includes(s.id))
    : meta.subjects;

  root.innerHTML = subjects
    .map(
      (s) => `
    <button type="button" class="subject-card" data-subject="${s.id}" style="--card-color:${s.color}">
      <div class="sub-icon">${s.icon}</div>
      <h3>${s.name}</h3>
      <p>${meta.questionsPerQuiz} questions · Win a medal</p>
      <span class="play-btn">Start Quiz</span>
    </button>`
    )
    .join("");

  root.querySelectorAll(".subject-card").forEach((btn) => {
    btn.addEventListener("click", () => startQuiz(btn.dataset.subject));
  });
}

async function startQuiz(subjectId) {
  const sub = STATE.meta.subjects.find((s) => s.id === subjectId);
  STATE.subject = subjectId;
  STATE.subjectLabel = `${sub.icon} ${sub.name}`;
  STATE.answers = [];
  STATE.currentIndex = 0;

  document.getElementById("quiz-subject-tag").textContent = STATE.subjectLabel;
  STATE.questions = await loadQuestions(subjectId);
  showStep("step-quiz");
  renderQuestion();
}

function renderQuestion() {
  const i = STATE.currentIndex;
  const q = STATE.questions[i];
  const total = STATE.questions.length;

  document.getElementById("question-text").textContent = q.question;
  document.getElementById("progress-text").textContent = `Question ${i + 1} of ${total}`;
  document.getElementById("progress-fill").style.width = `${((i + 1) / total) * 100}%`;

  const grid = document.getElementById("options-grid");
  grid.innerHTML = q.options
    .map(
      (opt, idx) =>
        `<button type="button" class="option-btn" data-idx="${idx}">${opt}</button>`
    )
    .join("");

  const nextBtn = document.getElementById("btn-next");
  nextBtn.disabled = true;
  nextBtn.textContent = i === total - 1 ? "See Results" : "Next Question";

  grid.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", () => selectOption(Number(btn.dataset.idx)));
  });
}

function selectOption(idx) {
  STATE.answers[STATE.currentIndex] = idx;
  document.querySelectorAll(".option-btn").forEach((btn, i) => {
    btn.classList.toggle("selected", i === idx);
  });
  document.getElementById("btn-next").disabled = false;
}

async function nextQuestion() {
  if (STATE.answers[STATE.currentIndex] === undefined) return;
  if (STATE.currentIndex < STATE.questions.length - 1) {
    STATE.currentIndex++;
    renderQuestion();
  } else {
    await showResults();
  }
}

async function showResults() {
  const result = await submitAnswers(STATE.subject, STATE.answers);
  const medalEl = document.getElementById("medal-display");
  medalEl.className = `medal-display ${result.rank.medal}`;
  medalEl.textContent = result.rank.emoji;

  document.getElementById("result-title").textContent = "Quiz Complete!";
  document.getElementById("result-score").textContent = `${result.correct} / ${result.total}`;
  document.getElementById("result-percent").textContent = `${result.percent}%`;
  document.getElementById("result-learner").textContent = `${result.rank.label} — ${result.rank.title}`;
  document.getElementById("result-remark").textContent = result.rank.remark;

  const fb = window.QUIZ_FALLBACK?.quizzes?.[STATE.subject];
  const review = document.getElementById("review-list");
  review.innerHTML = result.results
    .map((r, i) => {
      const opts = fb?.[i]?.options || STATE.questions[i]?.options || [];
      const chosenText = opts[r.chosen] ?? "—";
      const correctText = opts[r.correct] ?? "—";
      return `
      <div class="review-item ${r.isCorrect ? "correct" : "wrong"}">
        <strong>Q${i + 1}. ${r.question}</strong>
        <div>Your answer: ${chosenText}${r.isCorrect ? " ✓" : ` ✗ (Correct: ${correctText})`}</div>
        <div class="explain">${r.explanation || ""}</div>
      </div>`;
    })
    .join("");

  showStep("step-results");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindControls() {
  document.getElementById("btn-next").addEventListener("click", nextQuestion);
  document.getElementById("btn-quit").addEventListener("click", () => showStep("step-subjects"));
  document.getElementById("btn-try-again").addEventListener("click", () => startQuiz(STATE.subject));
  document.getElementById("btn-other-subject").addEventListener("click", () => {
    renderSubjects(STATE.meta);
    showStep("step-subjects");
  });
}

async function init() {
  bindControls();
  try {
    STATE.meta = await loadMeta();
    renderCategories(STATE.meta);
    renderSubjects(STATE.meta);
  } catch (err) {
    document.getElementById("subject-cards").innerHTML =
      `<p style="color:#fff;text-align:center">Could not load quiz. Run npm start and refresh.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", init);
