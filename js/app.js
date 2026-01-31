const container = document.getElementById("problem-container");
const dayIndicator = document.getElementById("day-indicator");

/* 기준일 저장 */
let startDate = localStorage.getItem("mathStartDate");
if (!startDate) {
  startDate = new Date().toISOString().slice(0, 10);
  localStorage.setItem("mathStartDate", startDate);
}

const today = new Date();
const start = new Date(startDate);
const day = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;

dayIndicator.innerText = `${day}일차 / 총 30일`;

const startIndex = (day - 1) * 2;
const todayProblems = problems.slice(startIndex, startIndex + 2);

todayProblems.forEach((p, i) => {
  const div = document.createElement("div");
  div.className = "problem";

  div.innerHTML = `
    <h2>문제 ${startIndex + i + 1}</h2>
    <p>${p.question}</p>

    <button onclick="toggle(${i})">해설 보기</button>

    <div class="solution" id="sol-${i}">
      <div class="section textbook">
        <strong>📘 교과서 개념 설명</strong>
        <pre>${p.textbook}</pre>
      </div>
      <div class="section explain">
        <strong>🧠 해설</strong>
        <pre>${p.solution}</pre>
      </div>
    </div>
  `;

  container.appendChild(div);
});

function toggle(i) {
  const el = document.getElementById(`sol-${i}`);
  el.style.display = el.style.display === "block" ? "none" : "block";
}
