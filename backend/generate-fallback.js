const fs = require("fs");
const path = require("path");

function writeFallback(jsonName, globalName) {
  const jsonPath = path.join(__dirname, "data", jsonName);
  const outPath = path.join(__dirname, "data", jsonName.replace(".json", "-fallback.js"));
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const js = `window.${globalName} = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(outPath, js);
  console.log(`Generated ${path.basename(outPath)} from ${jsonName}`);
}

writeFallback("education.json", "EDUCATION_FALLBACK");
writeFallback("it-education.json", "IT_EDUCATION_FALLBACK");

(function mergeRoadmapsFallback() {
  const dataDir = path.join(__dirname, "data");
  const roadmaps = JSON.parse(fs.readFileSync(path.join(dataDir, "roadmaps.json"), "utf8"));
  const examPath = path.join(dataDir, "exam-roadmaps.json");
  if (fs.existsSync(examPath)) {
    Object.assign(roadmaps, JSON.parse(fs.readFileSync(examPath, "utf8")));
  }
  const outPath = path.join(dataDir, "roadmaps-fallback.js");
  fs.writeFileSync(outPath, `window.ROADMAPS_FALLBACK = ${JSON.stringify(roadmaps, null, 2)};\n`);
  console.log("Generated roadmaps-fallback.js from roadmaps.json + exam-roadmaps.json");
})();
