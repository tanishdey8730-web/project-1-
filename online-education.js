const API_BASE = "";

const YT_ICON = `<svg class="yt-mini" viewBox="0 0 28 20" aria-hidden="true"><path fill="#FF0000" d="M27.97 3.12a3.5 3.5 0 0 0-2.47-2.48C23.28.5 14 .5 14 .5s-9.28 0-11.5.14A3.5 3.5 0 0 0 .03 3.12 36.4 36.4 0 0 0 0 10a36.4 36.4 0 0 0 .03 6.88 3.5 3.5 0 0 0 2.47 2.48C4.72 19.5 14 19.5 14 19.5s9.28 0 11.5-.14a3.5 3.5 0 0 0 2.47-2.48A36.4 36.4 0 0 0 28 10a36.4 36.4 0 0 0-.03-6.88z"/><path fill="#fff" d="M11.2 14.4V5.6L18.4 10l-7.2 4.4z"/></svg>`;

let STATE = {
  track: "government",
  govData: null,
  itData: null,
  roadmapsData: null,
  activeExam: null,
  query: ""
};

const TRACK_COPY = {
  government: {
    heading: "10 Competitive Preparation Exams",
    lead: "Pick an exam to see its YouTube playlists and subject-wise video lessons in Maths, Physics & Chemistry."
  },
  it: {
    heading: "IT & Placement Preparation Tracks",
    lead: "DSA, Python, Full Stack, Aptitude, HR interviews, TCS NQT, Infosys, Wipro & more — for engineering students."
  },
  roadmaps: {
    heading: "Exam & Career Roadmaps",
    lead: "Competitive exam roadmaps for SSC, CDS, NDA, AFCAT, CAPF, RRB — plus IT video roadmaps and PDF/link guides for Python, Java, DSA & more."
  }
};

function escapeAttr(s) {
  return String(s).replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function playlistEmbed(id) {
  return `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(id)}`;
}
function videoEmbed(id) {
  return `https://www.youtube.com/embed/${encodeURIComponent(id)}`;
}
function playlistUrl(id) {
  return `https://www.youtube.com/playlist?list=${encodeURIComponent(id)}`;
}
function videoUrl(id) {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
}

function embedBlock(url, title) {
  return `<div class="embed-wrap"><iframe src="${url}" title="${escapeAttr(title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
}

function renderPlaylistCard(p) {
  return `
    <article class="playlist-card">
      ${embedBlock(playlistEmbed(p.playlistId), p.title)}
      <h4>${escapeHtml(p.title)}</h4>
      <p class="meta">${YT_ICON} ${escapeHtml(p.channel || "YouTube Playlist")}</p>
      <a class="yt-link" href="${playlistUrl(p.playlistId)}" target="_blank" rel="noopener noreferrer">Open on YouTube ↗</a>
    </article>`;
}

function renderVideoCard(v, meta) {
  const m = meta || {};
  const loggedIn = typeof window.ShardaAuth !== "undefined" && window.ShardaAuth.isLoggedIn();
  const offlineBtn = loggedIn
    ? `<button type="button" class="btn-offline-dl" data-video-id="${escapeAttr(v.videoId)}" data-title="${escapeAttr(v.title)}" data-source="${escapeAttr(m.source || STATE.track)}" data-exam-id="${escapeAttr(m.examId || "")}" data-subject-id="${escapeAttr(m.subjectId || "")}">📥 Save offline</button>`
    : `<a class="btn-offline-dl btn-offline-login" href="login.html?next=${encodeURIComponent("online-education.html")}">Sign in to save offline</a>`;
  return `
    <article class="video-card" data-title="${escapeAttr(v.title.toLowerCase())}">
      ${embedBlock(videoEmbed(v.videoId), v.title)}
      <h4>${escapeHtml(v.title)}</h4>
      <p class="meta">${YT_ICON} ${escapeHtml(v.duration || "Video lesson")}</p>
      ${offlineBtn}
      <a class="yt-link" href="${videoUrl(v.videoId)}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
    </article>`;
}

function renderLangPlaylistGroup(examId, subjectId, lang, label, list) {
  if (!list || !list.length) return "";
  const groupId = `${examId}-${subjectId}-${lang}`;
  return `
    <div class="lang-playlist-group" data-lang-group="${escapeAttr(groupId)}">
      <h5 class="lang-label">${escapeHtml(label)} <span class="count-badge count-badge-sm">${list.length}</span></h5>
      <div class="playlist-grid">${list.map(renderPlaylistCard).join("")}</div>
    </div>`;
}

function renderSubjectPlaylists(exam, subject) {
  const sp = exam.subjectPlaylists && exam.subjectPlaylists[subject.id];
  if (!sp) return "";

  const hindi = sp.hindi || [];
  const english = sp.english || [];
  const mostWatched = sp.mostWatched || [];
  const total = hindi.length + english.length + mostWatched.length;
  if (!total) return "";

  return `
    <div class="subject-playlist-block" data-subject="${subject.id}">
      <h4 class="subject-heading">${subject.icon} ${escapeHtml(subject.name)} — Full Playlists <span class="count-badge">${total}</span></h4>
      <div class="lang-tabs" role="tablist" aria-label="${escapeAttr(subject.name)} playlist languages">
        ${hindi.length ? `<button type="button" class="lang-tab active" data-lang-panel="${escapeAttr(exam.id)}-${subject.id}-hindi">🇮🇳 Hindi (${hindi.length})</button>` : ""}
        ${english.length ? `<button type="button" class="lang-tab${hindi.length ? "" : " active"}" data-lang-panel="${escapeAttr(exam.id)}-${subject.id}-english">🇬🇧 English (${english.length})</button>` : ""}
        ${mostWatched.length ? `<button type="button" class="lang-tab${!hindi.length && !english.length ? " active" : ""}" data-lang-panel="${escapeAttr(exam.id)}-${subject.id}-popular">🔥 Most Watched (${mostWatched.length})</button>` : ""}
      </div>
      <div class="lang-panels">
        ${hindi.length ? `<div class="lang-panel active" id="${escapeAttr(exam.id)}-${subject.id}-hindi">${renderLangPlaylistGroup(exam.id, subject.id, "hindi", "Hindi Medium Playlists", hindi)}</div>` : ""}
        ${english.length ? `<div class="lang-panel${hindi.length ? "" : " active"}" id="${escapeAttr(exam.id)}-${subject.id}-english">${renderLangPlaylistGroup(exam.id, subject.id, "english", "English Medium Playlists", english)}</div>` : ""}
        ${mostWatched.length ? `<div class="lang-panel${hindi.length || english.length ? "" : " active"}" id="${escapeAttr(exam.id)}-${subject.id}-popular">${renderLangPlaylistGroup(exam.id, subject.id, "popular", "Most Watched Playlists", mostWatched)}</div>` : ""}
      </div>
    </div>`;
}

function renderSubjectVideos(videos, subject, exam) {
  const list = (videos && videos[subject.id]) || [];
  if (!list.length) return "";
  const meta = { examId: exam?.id || "", subjectId: subject.id, source: STATE.track };
  return `
    <h4 class="subject-heading" data-subject="${subject.id}">${subject.icon} ${escapeHtml(subject.name)} — Video Lessons <span class="count-badge">${list.length}</span></h4>
    <div class="video-grid">${list.map((v) => renderVideoCard(v, meta)).join("")}</div>`;
}

function renderExamPanel(exam, subjects) {
  const playlistBlocks = subjects
    .map((s) => renderSubjectPlaylists(exam, s))
    .filter(Boolean)
    .join("");

  const subjectBlocks = subjects
    .map((s) => renderSubjectVideos(exam.videos || {}, s, exam))
    .filter(Boolean)
    .join("");

  const videoTotal = subjects.reduce(
    (acc, s) => acc + ((exam.videos && exam.videos[s.id]) || []).length,
    0
  );

  const playlistTotal = subjects.reduce((acc, s) => {
    const sp = exam.subjectPlaylists && exam.subjectPlaylists[s.id];
    if (!sp) return acc;
    return acc + (sp.hindi?.length || 0) + (sp.english?.length || 0) + (sp.mostWatched?.length || 0);
  }, 0);

  return `
    <div class="exam-panel" id="panel-${escapeAttr(exam.id)}" data-exam="${escapeAttr(exam.id)}">
      <div class="exam-header">
        <h3>${escapeHtml(exam.name)} <span class="count-badge">${playlistTotal} playlists · ${videoTotal} videos</span></h3>
        <p>${escapeHtml(exam.description || "")}</p>
      </div>
      ${playlistBlocks ? `<div class="full-playlists-section">${playlistBlocks}</div>` : ""}
      ${subjectBlocks ? `<div class="video-lessons-section"><h4 class="section-divider">Individual Video Lessons</h4>${subjectBlocks}</div>` : ""}
      ${!playlistBlocks && !subjectBlocks ? `<p class="loading-state">More content coming soon for this exam.</p>` : ""}
    </div>`;
}

function attachLangTabs(root) {
  root.querySelectorAll(".subject-playlist-block").forEach((block) => {
    const tabs = block.querySelectorAll(".lang-tab");
    const panels = block.querySelectorAll(".lang-panel");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.langPanel;
        tabs.forEach((t) => t.classList.toggle("active", t === tab));
        panels.forEach((p) => p.classList.toggle("active", p.id === target));
      });
    });
  });
}

function buildUI(exams, subjects) {
  const tabsRoot = document.getElementById("exam-tabs");
  const panelsRoot = document.getElementById("exam-panels");
  if (!tabsRoot || !panelsRoot) return;

  const topLevel = exams.filter((e) => !e.parent);
  const children = exams.filter((e) => e.parent);

  let tabsHtml = "";
  topLevel.forEach((exam) => {
    tabsHtml += `<button type="button" class="exam-tab" data-target="${escapeAttr(exam.id)}">${escapeHtml(exam.name)}</button>`;
    children
      .filter((c) => c.parent === exam.id)
      .forEach((child) => {
        tabsHtml += `<button type="button" class="exam-tab child" data-target="${escapeAttr(child.id)}">${escapeHtml(child.name)}</button>`;
      });
  });

  tabsRoot.innerHTML = tabsHtml;
  panelsRoot.innerHTML = exams
    .map((exam) => renderExamPanel(exam, subjects))
    .join("");

  attachLangTabs(panelsRoot);

  tabsRoot.querySelectorAll(".exam-tab").forEach((btn) => {
    btn.addEventListener("click", () => activateExam(btn.dataset.target));
  });

  const firstId = exams[0]?.id;
  if (firstId) activateExam(firstId, false);

  if (window.ShardaOffline) {
    window.ShardaOffline.attachDownloadButtons(panelsRoot);
  }
}

function activateExam(id, scroll = true) {
  STATE.activeExam = id;
  document.querySelectorAll(".exam-tab").forEach((t) => {
    t.classList.toggle("active", t.dataset.target === id);
  });
  document.querySelectorAll(".exam-panel").forEach((p) => {
    p.classList.toggle("active", p.id === `panel-${id}`);
  });
  applySearch();
  if (scroll) {
    const top = document.getElementById("courses-section");
    if (top) top.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function applySearch() {
  const q = STATE.query.trim().toLowerCase();
  const panel = document.getElementById(`panel-${STATE.activeExam}`);
  if (!panel) return;

  let visibleCount = 0;
  let totalCount = 0;
  panel.querySelectorAll(".video-card").forEach((card) => {
    totalCount++;
    const title = card.dataset.title || "";
    const match = !q || title.includes(q);
    card.style.display = match ? "" : "none";
    if (match) visibleCount++;
  });

  const status = document.getElementById("search-status");
  if (status) {
    const playlistCards = panel.querySelectorAll(".playlist-card h4");
    const playlistTotal = playlistCards.length;
    if (q) {
      status.textContent = `Showing ${visibleCount} of ${totalCount} videos · ${playlistTotal} playlists available`;
    } else {
      status.textContent = `${playlistTotal} full playlists · ${totalCount} individual videos in this track`;
    }
  }
}

function renderSubjectsStrip(subjects) {
  const strip = document.getElementById("subjects-strip");
  if (!strip) return;
  strip.innerHTML = subjects
    .map(
      (s) => `
      <div class="subject-pill">
        <div class="sub-icon">${s.icon}</div>
        <h3>${escapeHtml(s.name)}</h3>
        <p>${escapeHtml(s.description)}</p>
      </div>`
    )
    .join("");
}

function getTrackData() {
  if (STATE.track === "it") return STATE.itData;
  if (STATE.track === "government") return STATE.govData;
  return null;
}

function showRoadmapPanel(show) {
  const examUi = document.getElementById("courses-exam-ui");
  const roadmapPanel = document.getElementById("roadmap-panel");
  const strip = document.getElementById("subjects-strip");
  if (examUi) examUi.hidden = show;
  if (roadmapPanel) roadmapPanel.hidden = !show;
  if (strip) strip.style.display = show ? "none" : "";
}

function switchTrack(track) {
  STATE.track = track;
  STATE.query = "";
  const input = document.getElementById("video-search");
  if (input) input.value = "";

  document.querySelectorAll(".track-tab").forEach((tab) => {
    const active = tab.dataset.track === track;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  });

  if (track === "roadmaps") {
    showRoadmapPanel(true);
    const data = STATE.roadmapsData;
    if (data && window.RoadmapsUI) {
      window.RoadmapsUI.init(document.getElementById("roadmap-app"), data);
    }
    return;
  }

  showRoadmapPanel(false);

  const copy = TRACK_COPY[track];
  const heading = document.getElementById("courses-heading");
  const lead = document.getElementById("courses-lead");
  if (heading && copy) heading.textContent = copy.heading;
  if (lead && copy) lead.textContent = copy.lead;

  const data = getTrackData();
  if (!data) return;
  renderSubjectsStrip(data.subjects);
  const exams = track === "it" ? data.itExams : data.competitiveExams;
  buildUI(exams, data.subjects);
}

function attachTrackSwitcher() {
  document.querySelectorAll(".track-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.dataset.track === STATE.track) return;
      switchTrack(tab.dataset.track);
    });
  });
}
function attachSearch() {
  const input = document.getElementById("video-search");
  if (!input) return;
  input.addEventListener("input", () => {
    STATE.query = input.value;
    applySearch();
  });
}

async function init() {
  const container = document.getElementById("edu-app");
  let govData = null;
  let itData = null;
  let roadmapsData = null;

  try {
    const [govRes, itRes, roadRes] = await Promise.all([
      fetch(`${API_BASE}/api/online-education`),
      fetch(`${API_BASE}/api/it-education`),
      fetch(`${API_BASE}/api/roadmaps`)
    ]);
    if (govRes.ok) govData = await govRes.json();
    if (itRes.ok) itData = await itRes.json();
    if (roadRes.ok) roadmapsData = await roadRes.json();
  } catch (err) {
    /* fall through to static fallbacks */
  }

  if (!govData && window.EDUCATION_FALLBACK) govData = window.EDUCATION_FALLBACK;
  if (!itData && window.IT_EDUCATION_FALLBACK) itData = window.IT_EDUCATION_FALLBACK;
  if (!roadmapsData && window.ROADMAPS_FALLBACK) roadmapsData = window.ROADMAPS_FALLBACK;

  if (!govData && !itData && !roadmapsData) {
    if (container) {
      container.innerHTML = `<p class="error-state">Could not load courses. Run <code>npm install &amp;&amp; npm start</code> from the project folder, then open <code>http://localhost:3000/online-education.html</code>.</p>`;
    }
    return;
  }

  STATE.govData = govData;
  STATE.itData = itData;
  STATE.roadmapsData = roadmapsData;

  const params = new URLSearchParams(window.location.search);
  const trackParam = params.get("track");
  let initialTrack = "government";
  if (trackParam === "it" && itData) initialTrack = "it";
  else if (trackParam === "roadmaps" && roadmapsData) initialTrack = "roadmaps";

  attachTrackSwitcher();
  switchTrack(initialTrack);
  attachSearch();

  const hash = window.location.hash || "";
  const match = hash.match(/^#panel-(.+)$/);
  if (match && initialTrack !== "roadmaps") {
    const target = decodeURIComponent(match[1]);
    const itIds = (STATE.itData?.itExams || []).map((e) => e.id);
    if (itIds.includes(target) && STATE.itData) {
      switchTrack("it");
    }
    const data = getTrackData();
    if (data) {
      const exams = STATE.track === "it" ? data.itExams : data.competitiveExams;
      if (exams.some((e) => e.id === target)) {
        activateExam(target, true);
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", init);
