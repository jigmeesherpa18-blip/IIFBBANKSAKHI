let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let timeLeft = 3600; // 1 hour

const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const questionList = document.getElementById("questionList");

function loadQuestion(index) {
  const q = questions[index];
  questionText.innerText = (index + 1) + ". " + q.q;

  optionsDiv.innerHTML = "";
  q.o.forEach((opt, i) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="option"
        ${answers[index] === i ? "checked" : ""}
        onclick="selectAnswer(${i})">
      ${opt}
    `;
    optionsDiv.appendChild(label);
  });
}

function selectAnswer(option) {
  answers[currentQuestion] = option;
  updateQuestionButtons();
  updateStatus();
}

function clearAnswer() {
  answers[currentQuestion] = null;
  loadQuestion(currentQuestion);
  updateQuestionButtons();
  updateStatus();
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
}

function createQuestionButtons() {
  questionList.innerHTML = "";
  questions.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.innerText = i + 1;
    btn.className = "q-btn";
    btn.onclick = () => {
      currentQuestion = i;
      loadQuestion(i);
    };
    questionList.appendChild(btn);
  });
}

function updateQuestionButtons() {
  document.querySelectorAll(".q-btn").forEach((btn, i) => {
    btn.classList.toggle("attempted", answers[i] !== null);
  });
}

function updateStatus() {
  const attempted = answers.filter(a => a !== null).length;
  document.querySelector(".status-badge.attempted").innerText =
    attempted + " Attempted";
  document.querySelector(".status-badge.not-attempted").innerText =
    (questions.length - attempted) + " Not Attempted";
}

function startTimer() {
  setInterval(() => {
    if (timeLeft <= 0) {
      alert("Time Up!");
      return;
    }
    timeLeft--;
    let h = Math.floor(timeLeft / 3600);
    let m = Math.floor((timeLeft % 3600) / 60);
    let s = timeLeft % 60;
    document.getElementById("timer").innerText =
      `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }, 1000);
}

document.getElementById("submitBtn").onclick = () => {
  let score = 0;
  answers.forEach((a, i) => {
    if (a === questions[i].a) score++;
  });
  alert(`Test Submitted!\nScore: ${score}/${questions.length}`);
};

createQuestionButtons();
loadQuestion(0);
updateStatus();
startTimer();
