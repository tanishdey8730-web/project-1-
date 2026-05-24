const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const STORAGE_ROOT = path.join(__dirname, "storage", "offline");
const META_FILE = path.join(__dirname, "data", "offline-library.json");
const MAX_DOWNLOADS_PER_USER = 30;

let ytdl = null;
try {
  ytdl = require("@distube/ytdl-core");
} catch {
  ytdl = null;
}

function ensureDirs() {
  fs.mkdirSync(STORAGE_ROOT, { recursive: true });
  if (!fs.existsSync(META_FILE)) {
    fs.writeFileSync(META_FILE, JSON.stringify({ downloads: [] }, null, 2));
  }
}

function loadMeta() {
  ensureDirs();
  return JSON.parse(fs.readFileSync(META_FILE, "utf8"));
}

function saveMeta(store) {
  fs.writeFileSync(META_FILE, JSON.stringify(store, null, 2));
}

function newId() {
  return crypto.randomBytes(10).toString("hex");
}

function userDir(userId) {
  const dir = path.join(STORAGE_ROOT, userId);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function publicDownload(row) {
  return {
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
  };
}

function listForUser(userId) {
  const store = loadMeta();
  return store.downloads
    .filter((d) => d.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(publicDownload);
}

function findForUser(userId, downloadId) {
  const store = loadMeta();
  const row = store.downloads.find((d) => d.id === downloadId && d.userId === userId);
  return row || null;
}

function filePathFor(row) {
  return path.join(userDir(row.userId), row.filename);
}

function startDownload(userId, payload) {
  const { videoId, title, source, examId, subjectId } = payload || {};
  if (!videoId || !title) {
    return { error: "videoId and title are required", status: 400 };
  }
  if (!ytdl) {
    return {
      error: "Video download engine is not installed. Run: npm install",
      status: 503
    };
  }
  if (!ytdl.validateURL(`https://www.youtube.com/watch?v=${videoId}`)) {
    return { error: "Invalid YouTube video ID", status: 400 };
  }

  const store = loadMeta();
  const existing = store.downloads.find(
    (d) => d.userId === userId && d.videoId === videoId && d.status !== "failed"
  );
  if (existing) {
    return { download: publicDownload(existing), alreadyExists: true };
  }

  const userDownloads = store.downloads.filter((d) => d.userId === userId);
  if (userDownloads.length >= MAX_DOWNLOADS_PER_USER) {
    return {
      error: `Offline limit reached (${MAX_DOWNLOADS_PER_USER} videos). Delete old downloads first.`,
      status: 403
    };
  }

  const id = newId();
  const filename = `${id}.mp4`;
  const row = {
    id,
    userId,
    videoId: String(videoId).trim(),
    title: String(title).trim().slice(0, 200),
    source: source || "",
    examId: examId || "",
    subjectId: subjectId || "",
    filename,
    mimeType: "video/mp4",
    status: "downloading",
    error: "",
    fileSize: 0,
    createdAt: new Date().toISOString(),
    completedAt: null
  };
  store.downloads.push(row);
  saveMeta(store);

  runDownloadJob(row.id).catch(() => {});

  return { download: publicDownload(row) };
}

async function runDownloadJob(downloadId) {
  const store = loadMeta();
  const row = store.downloads.find((d) => d.id === downloadId);
  if (!row || row.status === "ready") return;

  const dest = filePathFor(row);
  try {
    const info = await ytdl.getInfo(row.videoId);
    const format =
      ytdl.chooseFormat(info.formats, {
        quality: "lowestvideo",
        filter: (f) => f.hasVideo && f.hasAudio
      }) ||
      ytdl.chooseFormat(info.formats, { quality: "lowest", filter: "audioandvideo" });

    if (!format) throw new Error("No downloadable format found");

    await new Promise((resolve, reject) => {
      const stream = ytdl.downloadFromInfo(info, { format });
      const write = fs.createWriteStream(dest);
      stream.pipe(write);
      stream.on("error", reject);
      write.on("finish", resolve);
      write.on("error", reject);
    });

    const stat = fs.statSync(dest);
    row.status = "ready";
    row.fileSize = stat.size;
    row.completedAt = new Date().toISOString();
    row.error = "";
  } catch (err) {
    row.status = "failed";
    row.error = err.message || "Download failed";
    if (fs.existsSync(dest)) {
      try {
        fs.unlinkSync(dest);
      } catch (_) {}
    }
  }
  saveMeta(store);
}

function removeDownload(userId, downloadId) {
  const store = loadMeta();
  const idx = store.downloads.findIndex((d) => d.id === downloadId && d.userId === userId);
  if (idx === -1) return { error: "Download not found", status: 404 };
  const row = store.downloads[idx];
  const fp = filePathFor(row);
  if (fs.existsSync(fp)) {
    try {
      fs.unlinkSync(fp);
    } catch (_) {}
  }
  store.downloads.splice(idx, 1);
  saveMeta(store);
  return { ok: true };
}

function streamDownload(userId, downloadId, req, res) {
  const row = findForUser(userId, downloadId);
  if (!row) return { error: "Download not found", status: 404 };
  if (row.status !== "ready") {
    return { error: "Video is not ready yet", status: 409 };
  }

  const fp = filePathFor(row);
  if (!fs.existsSync(fp)) {
    return { error: "File missing on server", status: 410 };
  }

  const stat = fs.statSync(fp);
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
    if (start >= stat.size || end >= stat.size) {
      res.status(416).send("Range not satisfiable");
      return { sent: true };
    }
    const chunk = end - start + 1;
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${stat.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunk,
      "Content-Type": row.mimeType || "video/mp4",
      "Content-Disposition": `inline; filename="${encodeURIComponent(row.title)}.mp4"`
    });
    fs.createReadStream(fp, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": stat.size,
      "Content-Type": row.mimeType || "video/mp4",
      "Accept-Ranges": "bytes",
      "Content-Disposition": `inline; filename="${encodeURIComponent(row.title)}.mp4"`
    });
    fs.createReadStream(fp).pipe(res);
  }
  return { sent: true };
}

ensureDirs();

module.exports = {
  listForUser,
  startDownload,
  removeDownload,
  streamDownload,
  findForUser,
  isEngineReady: () => Boolean(ytdl)
};
