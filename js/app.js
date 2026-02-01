const container = document.getElementById("problem-container");
const dayIndicator = document.getElementById("day-indicator");

/* =========================
   날짜 계산
========================= */
let startDate = localStorage.getItem("mathStartDate");
if (!startDate) {
  startDate = new Date().toISOString().slice(0, 10);
  localStorage.setItem("mathStartDate", startDate);
}

const today = new Date().toISOString().slice(0, 10);
const start = new Date(startDate);
const now = new Date(today);
const day = Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;

dayIndicator.innerText = `${day}일차`;

/* =========================
   하루 고정 랜덤 문제
========================= */
const key = `dailyProblems_${today}`;
let selected = JSON.parse(localStorage.getItem(key));

if (!selected) {
  const indices = problems.map((_, i) => i);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  selected = indices.slice(0, 2);
  localStorage.setItem(key, JSON.stringify(selected));
}

/* =========================
   렌더링
========================= */
selected.forEach((idx, i) => {
  const p = problems[idx];
  const div = document.createElement("div");
  div.className = "problem";

  div.innerHTML = `
    <h2>문제</h2>
    <p>${p.question}</p>
    <button onclick="toggle(${i})">해설 보기</button>

    <div class="solution" id="sol-${i}">
      <div class="section textbook">
        <strong>📘 교과서 개념</strong>
        <pre>${p.textbook}</pre>
      </div>
      <div class="section explain">
        <strong>🧠 풀이</strong>
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
