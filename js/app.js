const container = document.getElementById("problem-container");
const dayIndicator = document.getElementById("day-indicator");

/* =========================
   날짜 표시 (기존 유지)
========================= */
let startDate = localStorage.getItem("mathStartDate");
if (!startDate) {
  startDate = new Date().toISOString().slice(0, 10);
  localStorage.setItem("mathStartDate", startDate);
}

const today = new Date();
const start = new Date(startDate);
const day = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;

dayIndicator.innerText = `${day}일차`;

/* =========================
   🔥 랜덤 2문제 선택 로직
========================= */

// 문제 인덱스 배열 생성 [0,1,2,...,29]
const indices = problems.map((_, idx) => idx);

// Fisher–Yates Shuffle
for (let i = indices.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [indices[i], indices[j]] = [indices[j], indices[i]];
}

// 앞에서 2개 선택
const selected = indices.slice(0, 2).map(i => problems[i]);

/* =========================
   화면 렌더링
========================= */

selected.forEach((p, idx) => {
  const div = document.createElement("div");
  div.className = "problem";

  div.innerHTML = `
    <h2>문제 ${p.question.match(/^\d+/)?.[0] ?? idx + 1}</h2>
    <p>${p.question}</p>

    <button onclick="toggle(${idx})">해설 보기</button>

    <div class="solution" id="sol-${idx}">
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
