/**
 * Offline video library — requires Sharda Setu profile (sign in).
 */
(function () {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function formatSize(bytes) {
    if (!bytes) return "—";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function statusLabel(status) {
    const map = {
      downloading: "Downloading…",
      ready: "Ready",
      failed: "Failed"
    };
    return map[status] || status;
  }

  function fileUrl(downloadId) {
    const token = window.ShardaAuth?.getToken();
    if (!token) return "";
    return `/api/offline/${encodeURIComponent(downloadId)}/file?access_token=${encodeURIComponent(token)}`;
  }

  async function loadLibrary() {
    const listEl = document.getElementById("offline-list");
    const gateEl = document.getElementById("offline-gate");
    if (!listEl) return;

    if (!window.ShardaAuth?.isLoggedIn()) {
      if (gateEl) {
        gateEl.hidden = false;
        gateEl.innerHTML = `
          <div class="offline-gate-card">
            <h2>Sign in required</h2>
            <p>Create a free Sharda Setu profile to download and watch lessons offline.</p>
            <a class="btn btn-primary" href="login.html?next=offline.html">Login</a>
            <a class="btn btn-outline" href="signup.html">Sign Up</a>
          </div>`;
      }
      listEl.innerHTML = "";
      return;
    }

    if (gateEl) gateEl.hidden = true;

    try {
      const data = await window.ShardaAuth.apiFetch("/api/offline");
      const downloads = data.downloads || [];
      if (!downloads.length) {
        listEl.innerHTML = `
          <p class="offline-empty">
            No offline videos yet. Go to <a href="online-education.html">Online Education</a>
            and tap <strong>Save offline</strong> on any lesson (while signed in).
          </p>`;
        return;
      }

      listEl.innerHTML = downloads
        .map((d) => {
          const ready = d.status === "ready";
          return `
        <article class="offline-item" data-id="${escapeHtml(d.id)}">
          <div class="offline-item-head">
            <h3>${escapeHtml(d.title)}</h3>
            <span class="offline-status offline-status-${escapeHtml(d.status)}">${statusLabel(d.status)}</span>
          </div>
          <p class="offline-meta">
            ${d.examId ? escapeHtml(d.examId) + " · " : ""}
            ${formatSize(d.fileSize)}
            ${d.error ? ` · <span class="offline-err">${escapeHtml(d.error)}</span>` : ""}
          </p>
          ${
            ready
              ? `<div class="offline-player-wrap">
              <video class="offline-player" controls preload="metadata" src="${fileUrl(d.id)}"></video>
            </div>`
              : d.status === "downloading"
                ? `<p class="offline-hint">Download in progress. Refresh this page in a minute.</p>`
                : ""
          }
          <div class="offline-item-actions">
            ${ready ? `<a class="btn btn-outline btn-sm" href="${fileUrl(d.id)}" download>Download file</a>` : ""}
            <button type="button" class="btn btn-ghost btn-sm offline-delete" data-id="${escapeHtml(d.id)}">Remove</button>
          </div>
        </article>`;
        })
        .join("");

      listEl.querySelectorAll(".offline-delete").forEach((btn) => {
        btn.addEventListener("click", async () => {
          if (!confirm("Remove this offline video?")) return;
          try {
            await window.ShardaAuth.apiFetch(`/api/offline/${btn.dataset.id}`, { method: "DELETE" });
            loadLibrary();
          } catch (e) {
            alert(e.message || "Could not delete");
          }
        });
      });
    } catch (e) {
      listEl.innerHTML = `<p class="offline-empty">Could not load library: ${escapeHtml(e.message)}. Is the server running?</p>`;
    }
  }

  async function requestDownload(payload) {
    if (!window.ShardaAuth?.isLoggedIn()) {
      window.location.href = "login.html?next=" + encodeURIComponent(window.location.pathname + window.location.search);
      return;
    }
    try {
      const data = await window.ShardaAuth.apiFetch("/api/offline/download", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      const msg = data.alreadyExists
        ? "Already in your offline library."
        : "Download started. Open Offline Library when ready.";
      if (confirm(msg + "\n\nOpen Offline Library now?")) {
        window.location.href = "offline.html";
      }
    } catch (e) {
      alert(e.message || "Download failed");
    }
  }

  function attachDownloadButtons(root) {
    if (!root) return;
    root.querySelectorAll(".btn-offline-dl").forEach((btn) => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", () => {
        requestDownload({
          videoId: btn.dataset.videoId,
          title: btn.dataset.title,
          source: btn.dataset.source || "",
          examId: btn.dataset.examId || "",
          subjectId: btn.dataset.subjectId || ""
        });
      });
    });
  }

  function initPage() {
    loadLibrary();
    const refreshBtn = document.getElementById("offline-refresh");
    refreshBtn?.addEventListener("click", loadLibrary);
    setInterval(() => {
      if (document.querySelector(".offline-status-downloading")) loadLibrary();
    }, 15000);
  }

  window.ShardaOffline = {
    requestDownload,
    attachDownloadButtons,
    loadLibrary,
    initPage
  };

  if (document.getElementById("offline-list")) {
    document.addEventListener("DOMContentLoaded", () => {
      if (window.ShardaAuth) window.ShardaAuth.renderHeaderAuth(document.getElementById("auth-slot"));
      initPage();
    });
  }
})();
