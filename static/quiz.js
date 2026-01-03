/* Quiz #1 — static/quiz.js
   - browser-only
   - in-memory quiz
*/

const progressText = document.getElementById("progress-text");
const questionArea = document.getElementById("question-area");
const progressBar = document.getElementById("progress-bar");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const QUIZ = {
  title: "Emoji Quiz #1 — Emotions & Context",
  cards: [
    {
      question: "What does the Red Heart emoji ❤️ most commonly represent?",
      choices: ["Romantic love and deep affection", "Anger or frustration", "Sarcasm or irony"],
      correct_index: 0,
      hint: "It is one of the most widely used symbols for love."
    },
    {
      question: "Which emoji is typically used to express excitement or celebration?",
      choices: ["😢 Crying Face", "🥳 Partying Face", "😠 Angry Face"],
      correct_index: 1,
      hint: "It is often used for birthdays and parties."
    },
    {
      question: "What does the 😢 Crying Face emoji usually convey?",
      choices: ["Extreme anger", "Happiness with tears", "Sadness or emotional pain"],
      correct_index: 2,
      hint: "It shows a single tear and a sad expression."
    },
    {
      question: "Which emoji best represents fear or shock?",
      choices: ["😱 Face Screaming in Fear", "😊 Smiling Face", "😴 Sleeping Face"],
      correct_index: 0,
      hint: "It often appears in scary or shocking situations."
    },
    {
      question: "What is the main meaning of the 💔 Broken Heart emoji?",
      choices: ["Strong friendship", "Emotional pain or heartbreak", "Excitement"],
      correct_index: 1,
      hint: "It is commonly used after breakups."
    },
    {
      question: "Which emoji is commonly used to show happiness or friendliness?",
      choices: ["😊 Smiling Face with Smiling Eyes", "😡 Pouting Face", "😨 Fearful Face"],
      correct_index: 0,
      hint: "It has relaxed eyes and a gentle smile."
    },
    {
      question: "What does the 😡 Pouting Face emoji usually express?",
      choices: ["Joy and excitement", "Anger or strong annoyance", "Sleepiness"],
      correct_index: 1,
      hint: "It has furrowed brows and a red face."
    },
    {
      question: "Which emoji is best for expressing love-struck feelings?",
      choices: ["😍 Smiling Face with Heart-Eyes", "😢 Crying Face", "😴 Sleeping Face"],
      correct_index: 0,
      hint: "Its eyes are shaped like hearts."
    },
    {
      question: "What does the 🎉 Party Popper emoji represent?",
      choices: ["Warning or danger", "Celebration or achievement", "Sad news"],
      correct_index: 1,
      hint: "It is often used for milestones and success."
    },
    {
      question: "Which emoji is commonly used to show anxiety or nervous fear?",
      choices: ["😨 Fearful Face", "😂 Face with Tears of Joy", "😎 Smiling Face with Sunglasses"],
      correct_index: 0,
      hint: "It has wide eyes and a worried look."
    }
  ]
};

let currentIndex = -1;
let userAnswers = new Array(QUIZ.cards.length).fill(null);
let answeredCorrect = 0;

/* ---------------- START SCREEN ---------------- */

function renderStart() {
  questionArea.innerHTML = `
    <div style="text-align:center;padding:18px">
      <p>This quiz has <strong>${QUIZ.cards.length}</strong> questions.</p>
      <p class="hint">Select an answer to proceed.</p>
    </div>
  `;
  progressBar.style.width = "0%";
  progressText.textContent = "Progress: 0%";
  prevBtn.disabled = true;
  nextBtn.textContent = "Start Quiz";
  nextBtn.onclick = startQuiz;
}

function startQuiz() {
  currentIndex = 0;
  answeredCorrect = 0;
  userAnswers.fill(null);
  prevBtn.disabled = false;
  nextBtn.textContent = "Next";
  renderQuestion();
}

/* ---------------- QUESTION RENDER ---------------- */

function renderQuestion() {
  const q = QUIZ.cards[currentIndex];
  const progressPct = Math.round((currentIndex / QUIZ.cards.length) * 100);

  progressBar.style.width = `${progressPct}%`;
  progressText.textContent = `Progress: ${progressPct}%`;

  const choicesHtml = q.choices.map((c, i) =>
    `<button class="choice" data-index="${i}">${escapeHtml(c)}</button>`
  ).join("");

  questionArea.innerHTML = `
    <div>
      <div class="question">Q${currentIndex + 1}. ${escapeHtml(q.question)}</div>
      <div class="choices">${choicesHtml}</div>
      <div class="hint" id="hint-area"></div>
    </div>
  `;

  document.querySelectorAll(".choice").forEach(btn => {
    btn.addEventListener("click", onChoice);
  });

  prevBtn.onclick = onPrev;
  nextBtn.onclick = onNext;
  nextBtn.disabled = true;
}

/* ---------------- ANSWER HANDLING ---------------- */

function onChoice(e) {
  if (userAnswers[currentIndex] !== null) return;

  const btn = e.target;
  const idx = Number(btn.dataset.index);
  const q = QUIZ.cards[currentIndex];

  userAnswers[currentIndex] = idx;

  if (idx === q.correct_index) {
    btn.classList.add("correct");
    answeredCorrect++;
    document.getElementById("hint-area").textContent = "Correct ✓";
  } else {
    btn.classList.add("incorrect");
    document.getElementById("hint-area").textContent =
      "Incorrect — " + q.hint;

    document.querySelectorAll(".choice")[q.correct_index]
      .classList.add("correct");
  }

  nextBtn.disabled = false;
}

/* ---------------- NAVIGATION ---------------- */

function onNext() {
  if (currentIndex === QUIZ.cards.length - 1) {
    showResult();
    return;
  }

  currentIndex++;
  renderQuestion();
}

function onPrev() {
  if (currentIndex <= 0) {
    renderStart();
    currentIndex = -1;
    return;
  }
  currentIndex--;
  renderQuestion();
}

/* ---------------- RESULT ---------------- */

function showResult() {
  progressBar.style.width = "100%";
  progressText.textContent = "Progress: 100%";

  const total = QUIZ.cards.length;
  const score = answeredCorrect;

  if (score === total) {
    launchConfetti();
  }

  questionArea.innerHTML = `
    <div class="result">
      <div class="result-score">${score} / ${total}</div>
      <div>${score === total ? "Perfect! 🎉" : "Good effort!"}</div>
      <button class="btn primary" id="retry-btn">Retry Quiz</button>
    </div>
  `;

  prevBtn.disabled = true;
  nextBtn.textContent = "Done";
  nextBtn.onclick = () => location.href = "/";
  document.getElementById("retry-btn").onclick = renderStart;
}

/* ---------------- CONFETTI ---------------- */

function launchConfetti() {
  const colors = ["#ff6b6b", "#ffd93d", "#6bcf63", "#4dabf7", "#845ef7"];
  const end = Date.now() + 3000;

  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    for (let i = 0; i < 6; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration =
        (2 + Math.random() * 2) + "s";

      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  }, 180);
}

/* ---------------- UTILS ---------------- */

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
  );
}

/* ---------------- INIT ---------------- */

renderStart();
