const IT_EXAM_GOALS = new Set([
  "dsa", "python", "fullstack", "aptitude", "hr-interview",
  "tcs-nqt", "infosys", "wipro-nth", "accenture", "java-placements"
]);

const EXAM_LABELS = {
  "ssc-cgl": "SSC CGL", "ssc-chsl": "SSC CHSL", "ssc-mts": "SSC MTS", "ssc-gd": "SSC GD",
  cds: "CDS", afcat: "AFCAT", nda: "NDA", capf: "CAPF AC", "rrb-ntpc": "RRB NTPC",
  dsa: "DSA", python: "Python", fullstack: "Full Stack", aptitude: "Aptitude",
  "hr-interview": "HR Interview", "tcs-nqt": "TCS NQT", infosys: "Infosys",
  "wipro-nth": "Wipro NTH", accenture: "Accenture", "java-placements": "Java Placements"
};

function fillProfile(user) {
  document.getElementById("profile-avatar-lg").src = user.avatar;
  document.getElementById("profile-display-name").textContent = user.name;
  document.getElementById("profile-display-email").textContent = user.email;
  document.getElementById("profile-display-role").textContent =
    user.role === "teacher" ? "Teacher" : "Student";

  document.getElementById("pf-name").value = user.name || "";
  document.getElementById("pf-email").value = user.email || "";
  document.getElementById("pf-role").value = user.role || "student";
  document.getElementById("pf-exam").value = user.examGoal || "";
  document.getElementById("pf-city").value = user.city || "";
  document.getElementById("pf-phone").value = user.phone || "";
  document.getElementById("pf-bio").value = user.bio || "";

  const examLink = document.getElementById("profile-exam-link");
  if (user.examGoal) {
    const track = IT_EXAM_GOALS.has(user.examGoal) ? "it" : "government";
    const qs = track === "it" ? "?track=it" : "";
    examLink.href = `online-education.html${qs}#panel-${user.examGoal}`;
    examLink.textContent = `Go to ${EXAM_LABELS[user.examGoal] || user.examGoal.toUpperCase().replace(/-/g, " ")}`;
  }
}

async function initProfile() {
  const guest = document.getElementById("profile-guest");
  const app = document.getElementById("profile-app");

  if (!window.ShardaAuth?.isLoggedIn()) {
    guest.hidden = false;
    app.hidden = true;
    return;
  }

  guest.hidden = true;
  app.hidden = false;

  let user = window.ShardaAuth.getUser();
  try {
    user = await window.ShardaAuth.fetchProfile();
  } catch (_) {}

  if (user) fillProfile(user);

  document.getElementById("profile-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("profile-msg");
    msg.textContent = "Saving…";
    msg.className = "profile-msg";

    try {
      const updated = await window.ShardaAuth.updateProfile({
        name: document.getElementById("pf-name").value,
        role: document.getElementById("pf-role").value,
        examGoal: document.getElementById("pf-exam").value,
        city: document.getElementById("pf-city").value,
        phone: document.getElementById("pf-phone").value,
        bio: document.getElementById("pf-bio").value
      });
      fillProfile(updated);
      window.ShardaAuth.renderHeaderAuth(document.getElementById("auth-slot"));
      msg.textContent = "Profile saved successfully!";
      msg.className = "profile-msg ok";
    } catch (err) {
      msg.textContent = err.message || "Could not save profile.";
      msg.className = "profile-msg err";
    }
  });
}

document.addEventListener("DOMContentLoaded", initProfile);
