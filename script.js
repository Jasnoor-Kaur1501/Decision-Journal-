let decisions = JSON.parse(localStorage.getItem("decisions")) || [];

const titleInput = document.getElementById("titleInput");
const contextInput = document.getElementById("contextInput");
const expectedInput = document.getElementById("expectedInput");
const confidenceInput = document.getElementById("confidenceInput");
const confidenceValue = document.getElementById("confidenceValue");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("decisionList");

/* Slider */
confidenceInput.addEventListener("input", () => {
  const v = confidenceInput.value;
  confidenceValue.textContent = v;
  confidenceInput.style.background =
    `linear-gradient(90deg, #6366f1 ${v * 10}%, #e5e7eb ${v * 10}%)`;
});

/* Add */
addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  if (!title) return;

  const biases = [...document.querySelectorAll(".biases input:checked")]
    .map(b => b.value);

  decisions.unshift({
    title,
    context: contextInput.value,
    expected: expectedInput.value,
    confidence: confidenceInput.value,
    biases,
    repeat: null,
    date: new Date().toISOString()
  });

  save();
  render();
  clearInputs();

  addBtn.textContent = "Saved ✓";
  addBtn.disabled = true;
  setTimeout(() => {
    addBtn.textContent = "Add Decision";
    addBtn.disabled = false;
  }, 800);
});

function save() {
  localStorage.setItem("decisions", JSON.stringify(decisions));
}

function clearInputs() {
  titleInput.value = "";
  contextInput.value = "";
  expectedInput.value = "";
  confidenceInput.value = 5;
  confidenceInput.dispatchEvent(new Event("input"));
  document.querySelectorAll(".biases input").forEach(b => b.checked = false);
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function toggleRepeat(i, value) {
  decisions[i].repeat = value;
  save();
  render();
}

function removeDecision(i) {
  decisions.splice(i, 1);
  save();
  render();
}

/* Render */
function render() {
  list.innerHTML = "";

  if (decisions.length === 0) {
    list.innerHTML = "<p style='opacity:.5'>No decisions yet.</p>";
    return;
  }

  decisions.forEach((d, i) => {
    const li = document.createElement("li");
    li.className = "decision";

    li.innerHTML = `
      <button class="delete" onclick="removeDecision(${i})">✕</button>
      <strong>${d.title}</strong>
      <p>${d.context}</p>
      <small>Confidence: ${d.confidence}/10 · ${formatDate(d.date)}</small>
      <div class="repeat">
        Repeat?
        <button onclick="toggleRepeat(${i}, true)">Yes</button>
        <button onclick="toggleRepeat(${i}, false)">No</button>
        ${d.repeat === null ? "" : d.repeat ? "✔️" : "❌"}
      </div>
    `;
    list.appendChild(li);
  });
}

confidenceInput.dispatchEvent(new Event("input"));
render();
