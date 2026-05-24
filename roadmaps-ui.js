/**
 * Roadmaps section UI — Competitive exams + IT video roadmaps + PDF/Links
 */
(function () {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function escapeAttr(s) {
    return String(s).replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }
  function playlistEmbed(id) {
    return `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(id)}`;
  }
  function videoEmbed(id) {
    return `https://www.youtube.com/embed/${encodeURIComponent(id)}`;
  }
  function embedBlock(url, title) {
    return `<div class="embed-wrap"><iframe src="${url}" title="${escapeAttr(title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  }

  function linkTypeLabel(type) {
    const map = {
      pdf: "PDF",
      interactive: "Interactive",
      roadmap: "Roadmap",
      github: "GitHub"
    };
    return map[type] || "Link";
  }

  function renderVideoItem(item) {
    const embed = item.playlistId
      ? embedBlock(playlistEmbed(item.playlistId), item.title)
      : embedBlock(videoEmbed(item.videoId), item.title);
    const url = item.playlistId
      ? `https://www.youtube.com/playlist?list=${item.playlistId}`
      : `https://www.youtube.com/watch?v=${item.videoId}`;
    return `
      <article class="roadmap-video-card">
        ${embed}
        <h4>${escapeHtml(item.title)}</h4>
        <p class="meta">${escapeHtml(item.channel || "YouTube")} · ${escapeHtml(item.duration || "Video")}</p>
        ${item.note ? `<p class="roadmap-note">${escapeHtml(item.note)}</p>` : ""}
        <a class="yt-link" href="${url}" target="_blank" rel="noopener noreferrer">Open on YouTube ↗</a>
      </article>`;
  }

  function renderLinkItem(link) {
    const isPdf = link.type === "pdf";
    const icon = isPdf ? "📄" : link.type === "interactive" ? "🗺️" : link.type === "github" ? "🐙" : "🔗";
    return `
      <a class="roadmap-link-card roadmap-link-${escapeAttr(link.type || "link")}" href="${escapeAttr(link.url)}" target="_blank" rel="noopener noreferrer">
        <span class="roadmap-link-icon">${icon}</span>
        <div class="roadmap-link-body">
          <h4>${escapeHtml(link.title)}</h4>
          <p class="roadmap-link-source">${escapeHtml(link.source || "")} · <span class="roadmap-link-type">${linkTypeLabel(link.type)}</span></p>
          ${link.hint ? `<p class="roadmap-link-hint">${escapeHtml(link.hint)}</p>` : ""}
        </div>
        <span class="roadmap-link-arrow">↗</span>
      </a>`;
  }

  function renderVideos(data) {
    return (data.videoCategories || [])
      .map(
        (cat) => `
      <section class="roadmap-category-block" id="roadmap-cat-${escapeAttr(cat.id)}">
        <div class="roadmap-category-head">
          <span class="roadmap-cat-icon">${cat.icon}</span>
          <div>
            <h3>${escapeHtml(cat.name)}</h3>
            <p>${escapeHtml(cat.description || "")}</p>
          </div>
          <span class="count-badge">${cat.items.length} videos</span>
        </div>
        <div class="roadmap-video-grid">${cat.items.map(renderVideoItem).join("")}</div>
      </section>`
      )
      .join("");
  }

  function renderExamCategories(data) {
    const cats = data.examCategories || [];
    if (!cats.length) {
      return '<p class="loading-state">Competitive exam roadmaps coming soon.</p>';
    }
    return `
      <p class="roadmap-upload-hint">
        🏛️ Study roadmaps for all <strong>10 competitive exams</strong> on Sharda Setu — strategy videos, official syllabus links, and PDF slots.
        Each exam links to full lessons in <strong>Online Education → Government</strong>.
      </p>
      ${cats
        .map(
          (cat) => `
      <section class="roadmap-category-block" id="exam-roadmap-${escapeAttr(cat.id)}">
        <div class="roadmap-category-head">
          <span class="roadmap-cat-icon">${cat.icon}</span>
          <div>
            <h3>${escapeHtml(cat.name)}</h3>
            <p>${escapeHtml(cat.description || "")}</p>
          </div>
          <span class="count-badge">${(cat.videos || []).length} videos · ${(cat.links || []).length} links</span>
        </div>
        <h4 class="roadmap-subhead">Strategy &amp; subject videos</h4>
        <div class="roadmap-video-grid">${(cat.videos || []).map(renderVideoItem).join("")}</div>
        <h4 class="roadmap-subhead">Syllabus, official links &amp; PDFs</h4>
        <div class="roadmap-link-grid">${(cat.links || []).map(renderLinkItem).join("")}</div>
      </section>`
        )
        .join("")}`;
  }

  function renderLinks(data) {
    return `
      <p class="roadmap-upload-hint">
        📁 Upload your own roadmap PDFs to <code>assets/roadmaps/</code> — see README for file names.
        Interactive links include <strong>Whimsical</strong> and <strong>roadmap.sh</strong>.
      </p>
      ${(data.linkCategories || [])
        .map(
          (cat) => `
      <section class="roadmap-category-block" id="roadmap-links-${escapeAttr(cat.id)}">
        <div class="roadmap-category-head">
          <span class="roadmap-cat-icon">${cat.icon}</span>
          <div>
            <h3>${escapeHtml(cat.name)}</h3>
          </div>
          <span class="count-badge">${cat.links.length} links</span>
        </div>
        <div class="roadmap-link-grid">${cat.links.map(renderLinkItem).join("")}</div>
      </section>`
        )
        .join("")}`;
  }

  function init(container, data) {
    if (!container || !data) return;

    const subsections = data.subsections || [
      { id: "exams", name: "Competitive Exam Roadmaps", icon: "🏛️" },
      { id: "videos", name: "IT Video Roadmaps", icon: "▶️" },
      { id: "links", name: "IT Roadmap PDFs & Links", icon: "📄" }
    ];
    const defaultSub = subsections[0]?.id || "videos";

    container.innerHTML = `
      <div class="roadmap-subsection-tabs" role="tablist">
        ${subsections
          .map(
            (s, i) =>
              `<button type="button" class="roadmap-sub-tab${i === 0 ? " active" : ""}" data-roadmap-sub="${s.id}" role="tab">${s.icon} ${escapeHtml(s.name)}</button>`
          )
          .join("")}
      </div>
      <div id="roadmap-sub-content"></div>`;

    const content = container.querySelector("#roadmap-sub-content");

    function showSub(id) {
      container.querySelectorAll(".roadmap-sub-tab").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.roadmapSub === id);
      });
      if (id === "exams") {
        content.innerHTML = renderExamCategories(data);
      } else if (id === "videos") {
        content.innerHTML = renderVideos(data);
      } else {
        content.innerHTML = renderLinks(data);
      }
    }

    container.querySelectorAll(".roadmap-sub-tab").forEach((btn) => {
      btn.addEventListener("click", () => showSub(btn.dataset.roadmapSub));
    });

    showSub(defaultSub);
  }

  window.RoadmapsUI = { init };
})();
