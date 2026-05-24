const fs = require("fs");
const path = require("path");
const { buildSubjectPlaylistsForExam } = require("./data/playlist-catalog");

const dataPath = path.join(__dirname, "data", "education.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

data.competitiveExams = data.competitiveExams.map((exam) => ({
  ...exam,
  subjectPlaylists: buildSubjectPlaylistsForExam(exam.id)
}));

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n");
console.log("Updated education.json with subjectPlaylists for", data.competitiveExams.length, "exams");
