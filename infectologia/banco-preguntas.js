(() => {
"use strict";

const all = Array.isArray(window.BADBEAR_INFECTO_BANCO)
  ? window.BADBEAR_INFECTO_BANCO
  : [];

const $ = (s) => document.querySelector(s);
const letters = "ABCDE";
const STORE = "badbear_infectologia_banco_100_v1";

let progress = {};
try {
  progress = JSON.parse(localStorage.getItem(STORE) || "{}");
} catch {
  progress = {};
}

let pool = [...all];
let pos = 0;
let selected = null;
let answered = false;

const topicFilter = $("#topicFilter");
const difficultyFilter = $("#difficultyFilter");
const answerBtn = $("#answerBtn");
const nextBtn = $("#nextBtn");

if (!topicFilter || !difficultyFilter || !answerBtn || !nextBtn) {
  console.error("BADBEAR.MED: faltan controles esenciales del banco.");
  return;
}

[...new Set(all.map(q => q.tema))].sort().forEach(t => {
  const o = document.createElement("option");
  o.value = t;
  o.textContent = t;
  topicFilter.appendChild(o);
});

function save() {
  localStorage.setItem(STORE, JSON.stringify(progress));
}

function filtered() {
  const t = topicFilter.value;
  const d = difficultyFilter.value;
  return all.filter(q =>
    (!t || q.tema === t) &&
    (!d || q.dificultad === d)
  );
}

function applyFilters() {
  pool = filtered();
  pos = 0;
  selected = null;
  answered = false;
  render();
}

function render() {
  if (!pool.length) {
    $("#questionText").textContent = "No hay preguntas con esos filtros.";
    $("#options").innerHTML = "";
    $("#counter").textContent = "0 preguntas";
    answerBtn.disabled = true;
    nextBtn.disabled = true;
    const fb = $("#feedback");
    if (fb) fb.hidden = true;
    updateStats();
    return;
  }

  if (pos >= pool.length) pos = 0;

  const q = pool[pos];
  selected = null;
  answered = false;

  answerBtn.disabled = false;
  nextBtn.disabled = true;

  const feedback = $("#feedback");
  if (feedback) feedback.hidden = true;

  $("#counter").textContent = `Pregunta ${pos + 1} / ${pool.length}`;
  $("#topicBadge").textContent = q.tema || "Infectología";
  $("#difficultyBadge").textContent = q.dificultad || "";
  $("#questionText").textContent = q.pregunta || "";

  const box = $("#options");
  box.innerHTML = "";

  (q.opciones || []).forEach((opt, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "bbq-option";
    b.innerHTML = `
      <span class="opt-letter">${letters[i] || (i + 1)}</span>
      <span>${escapeHtml(opt)}</span>
    `;

    b.addEventListener("click", () => {
      if (answered) return;

      selected = i;
      box.querySelectorAll(".bbq-option").forEach(x => {
        x.classList.remove("selected");
      });
      b.classList.add("selected");
    });

    box.appendChild(b);
  });

  updateStats();
}

function answer() {
  if (!pool.length || selected === null || answered) return;

  answered = true;
  const q = pool[pos];
  const ok = selected === q.correcta;

  [...$("#options").children].forEach((b, i) => {
    if (i === q.correcta) b.classList.add("correct");
    if (i === selected && !ok) b.classList.add("wrong");
    b.disabled = true;
  });

  progress[q.id] = {
    ok,
    selected,
    at: Date.now()
  };
  save();

  /*
    IMPORTANTE:
    habilitamos "Siguiente" ANTES de pintar la explicación.
    Así, un bloque opcional nunca puede bloquear el avance.
  */
  answerBtn.disabled = true;
  nextBtn.disabled = false;

  const rb = $("#resultBanner");
  if (rb) {
    rb.className = "result-banner " + (ok ? "ok" : "bad");
    rb.textContent = ok
      ? "✓ Correcto"
      : `✗ Incorrecto — respuesta correcta: ${letters[q.correcta]} · ${q.opciones[q.correcta]}`;
  }

  const explanation = $("#explanation");
  if (explanation) {
    explanation.textContent = q.explicacion || "";
  }

  const fija = $("#fijaText");
  if (fija) {
    fija.textContent = q.fija || "";
  }

  const notes = $("#alternativeNotes");
  if (notes) {
    notes.innerHTML = "";
    (q.notas || []).forEach((txt, i) => {
      const div = document.createElement("div");
      div.className = "why-item";
      div.innerHTML = `<b>${letters[i] || (i + 1)}.</b> ${escapeHtml(txt)}`;
      notes.appendChild(div);
    });
  }

  const feedback = $("#feedback");
  if (feedback) {
    feedback.hidden = false;
  }

  updateStats();

  if (feedback) {
    setTimeout(() => {
      feedback.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 80);
  }
}

function next() {
  if (!pool.length) return;

  pos += 1;

  if (pos >= pool.length) {
    pos = 0;
  }

  render();

  const card = $(".bbq-question-card");
  if (card) {
    window.scrollTo({
      top: Math.max(0, card.offsetTop - 95),
      behavior: "smooth"
    });
  }
}

function shuffle() {
  pool = filtered();

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  pos = 0;
  selected = null;
  answered = false;
  render();
}

function updateStats() {
  const ids = new Set(all.map(q => String(q.id)));
  const entries = Object.entries(progress)
    .filter(([id]) => ids.has(String(id)));

  const answeredN = entries.length;
  const correctN = entries.filter(([, v]) => v && v.ok).length;
  const wrongN = answeredN - correctN;
  const pct = answeredN
    ? Math.round((correctN / answeredN) * 100)
    : 0;

  const answeredStat = $("#answeredStat");
  const correctStat = $("#correctStat");
  const wrongStat = $("#wrongStat");
  const percentStat = $("#percentStat");
  const progressLabel = $("#progressLabel");
  const progressBar = $("#progressBar");

  if (answeredStat) answeredStat.textContent = answeredN;
  if (correctStat) correctStat.textContent = correctN;
  if (wrongStat) wrongStat.textContent = wrongN;
  if (percentStat) percentStat.textContent = pct + "%";
  if (progressLabel) {
    progressLabel.textContent = `${answeredN} de ${all.length} respondidas`;
  }
  if (progressBar) {
    progressBar.style.width =
      Math.min(100, answeredN / Math.max(1, all.length) * 100) + "%";
  }
}

function reset() {
  if (!confirm("¿Reiniciar todo el progreso de este banco?")) return;

  progress = {};
  save();
  pos = 0;
  selected = null;
  answered = false;
  render();
}

function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

topicFilter.addEventListener("change", applyFilters);
difficultyFilter.addEventListener("change", applyFilters);
answerBtn.addEventListener("click", answer);
nextBtn.addEventListener("click", next);

const shuffleBtn = $("#shuffleBtn");
if (shuffleBtn) shuffleBtn.addEventListener("click", shuffle);

const resetBtn = $("#resetBtn");
if (resetBtn) resetBtn.addEventListener("click", reset);

render();
})();