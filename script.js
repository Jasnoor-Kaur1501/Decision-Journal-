let decisions = JSON.parse(localStorage.getItem("decisions")) || [];

const titleInput = document.getElementById("titleInput");
const contextInput = document.getElementById("contextInput");
const expectedInput = document.getElementById("expectedInput");
const confidenceInput = document.getElementById("confidenceInput");
const confidenceValue = document.getElementById("confidenceValue");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("decisionList");

confidenceInput.addEventListener("input", () => {
  confidenceValue.textContent = confidenceInput.value;
});

addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  if (!title) return;

  decisions.push({
    title,
    context: contextInput.value,
    expected: expectedInput.value,
    confidence: confidenceInput.value,
    date: new Date().toISOString().slice(0,10)
  });

  save();
  render();
  clearInputs();
});

function save() {
  localStorage.setItem("decisions", JSON.stringify(decisions));
}

function clearInputs() {
  titleInput.value = "";
  contextInput.value = "";
  expectedInput.value = "";
  confidenceInput.value = 5;
  confidenceValue.textContent = 5;
}

function render() {
  list.innerHTML = "";

  decisions.forEach(d => {
    const li = document.createElement("li");
    li.className = "decision";
    li.innerHTML = `
      <strong>${d.title}</strong>
      <p>${d.context}</p>
      <small>Confidence: ${d.confidence}/10 · ${d.date}</small>
    `;
    list.appendChild(li);
  });
}

render();
