const container = document.getElementById("problem-container");
const todayText = document.getElementById("today");

const today = new Date();
todayText.innerText = today.toLocaleDateString() + " 출제 문제";

if (!Array.isArray(problems)) {
  container.innerHTML = "<p>문제 데이터를 불러오지 못했습니다.</p>";
} else {
  const dayIndex = today.getDate() % problems.length;

  const todayProblems = [
    problems[dayIndex],
    problems[(dayIndex + 1) % problems.length]
  ];

  todayProblems.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "problem";

    div.innerHTML = `
      <h2>문제 ${index + 1}</h2>
      <p>${p.question}</p>

      <button onclick="toggleSolution(${index})">해설 보기</button>

      <div class="solution" id="solution-${index}">
        <div class="section-box textbook">
          <strong>📘 교과서 개념</strong>
          <pre>${p.textbook}</pre>
        </div>

        <div class="section-box concept">
          <strong>📌 핵심 개념 정리</strong>
          <p>${p.concept}</p>
        </div>

        <div class="section-box explain">
          <strong>🧠 문제 풀이</strong>
          <pre>${p.solution}</pre>
        </div>
      </div>
    `;

    container.appendChild(div);
  });
}

function toggleSolution(index) {
  const sol = document.getElementById(`solution-${index}`);
  sol.style.display = sol.style.display === "block" ? "none" : "block";
}
