"use strict";
const el = id => document.getElementById(id);
const answers = new Map();
let bank, pool, index, mode, deadline, timer;
const params = new URLSearchParams(location.search);
const finalMode = params.get("modo") === "final";
const topic = el("topic");
const status = el("status");

function node(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function sample(items, count) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function begin(exam) {
  if (mode === "exam" && !confirm("¿Abandonar el simulacro en curso?")) return;
  clearInterval(timer);
  answers.clear();
  mode = exam ? "exam" : "practice";
  index = 0;
  pool = exam ? (finalMode ? [...bank] : sample(bank, 20)) : bank.filter(item => !topic.value || item.topic === topic.value);
  el("quiz").hidden = false;
  el("review").hidden = true;
  el("finish").hidden = !exam;
  topic.disabled = exam;
  el("clock").textContent = "";
  status.textContent = exam ? (finalMode ? "Examen final en curso. La corrección aparece al finalizar." : "Simulacro en curso. La corrección aparece al finalizar.") : "";
  if (exam) {
    deadline = Date.now() + 600000;
    timer = setInterval(tick, 250);
    tick();
  }
  render();
}

function tick() {
  const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  el("clock").textContent = Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
  if (!seconds) finish(true);
}

function explanation(item, answer) {
  const box = document.createElement("div");
  const correct = answer === item.key;
  box.className = correct ? "correct" : "incorrect";
  box.append(node("strong", correct ? "Correcto" : answer === undefined ? "Sin responder" : "Incorrecto"),
    node("p", "Respuesta correcta: " + item.options[item.key]),
    node("p", item.reason));
  if (item.theory) {
    const link = node("a", "Consultar teoría de esta pregunta");
    link.href = item.theory;
    link.target = "_blank";
    link.rel = "noopener";
    box.append(link);
  }
  return box;
}

function render(focus = false) {
  const item = pool[index];
  const answer = answers.get(item.id);
  el("position").textContent = (index + 1) + " de " + pool.length + " · " + item.topic;
  const title = node("h2", item.prompt);
  title.tabIndex = -1;
  const field = document.createElement("fieldset");
  field.append(node("legend", "Selecciona una alternativa"));
  item.options.forEach((option, choice) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.checked = answer === choice;
    radio.disabled = mode === "practice" && answer !== undefined;
    radio.addEventListener("change", () => {
      if (mode === "exam" && Date.now() >= deadline) { finish(true); return; }
      answers.set(item.id, choice);
      if (mode === "practice") {
        field.querySelectorAll("input").forEach(input => { input.disabled = true; });
        el("feedback").replaceChildren(explanation(item, choice));
      }
    });
    label.append(radio, node("span", String.fromCharCode(65 + choice) + ". " + option));
    field.append(label);
  });
  el("question").replaceChildren(node("p", item.source), title, field);
  el("feedback").replaceChildren(...(mode === "practice" && answer !== undefined ? [explanation(item, answer)] : []));
  el("previous").disabled = index === 0;
  el("next").disabled = index === pool.length - 1;
  if (focus) title.focus();
}

function finish(expired = false) {
  if (mode !== "exam") return;
  clearInterval(timer);
  mode = "review";
  topic.disabled = false;
  el("quiz").hidden = true;
  const score = pool.filter(item => answers.get(item.id) === item.key).length;
  const review = el("review");
  const title = node("h2", "Resultado: " + score + " de " + pool.length);
  title.tabIndex = -1;
  review.replaceChildren(title, node("p", answers.size + " respondidas · " + (pool.length - answers.size) + " sin responder"));
  for (const item of pool) {
    const details = document.createElement("details");
    const answer = answers.get(item.id);
    details.append(node("summary", item.prompt), node("p", "Tu respuesta: " + (item.options[answer] ?? "Sin responder")), explanation(item, answer));
    review.append(details);
  }
  review.hidden = false;
  status.textContent = expired ? "Se acabó el tiempo." : finalMode ? "Examen finalizado." : "Simulacro finalizado.";
  title.focus();
}

async function init() {
  try {
    const result = await fetch(finalMode ? "examen-final-datos.json" : "banco-semana16.json");
    if (!result.ok) throw new Error("Banco no disponible.");
    bank = await result.json();
    if (finalMode ? bank.length !== 20 : bank.length < 20) throw new Error("El banco requiere al menos 20 preguntas.");
    topic.add(new Option("Todos los temas", ""));
    for (const name of new Set(bank.map(item => item.topic))) topic.add(new Option(name, name));
    topic.addEventListener("change", () => begin(false));
    el("practice").addEventListener("click", () => begin(false));
    el("exam").addEventListener("click", () => begin(true));
    el("previous").addEventListener("click", () => { index--; render(true); });
    el("next").addEventListener("click", () => { index++; render(true); });
    el("finish").addEventListener("click", () => finish());
    if (finalMode) {
      document.title = "Examen final de Tesis I | BADBEAR.MED";
      el("bank-title").textContent = "Examen final de Tesis I";
      el("bank-intro").textContent = "20 preguntas en 10 minutos. Revisa los fundamentos y enlaces a la teoría al terminar.";
      el("practice").hidden = true;
      el("topic-picker").hidden = true;
      el("exam").textContent = "Iniciar examen final";
      el("finish").textContent = "Finalizar examen";
      el("exam").focus();
      status.textContent = "Pulsa Iniciar examen final cuando estés listo.";
      return;
    }
    el("quiz").hidden = false;
    if ([...topic.options].some(option => option.value === params.get("tema"))) topic.value = params.get("tema");
    begin(false);
    if (params.get("modo") === "simulacro") {
      status.textContent = "Pulsa Iniciar simulacro cuando estés listo. Tendrás 10 minutos.";
      el("exam").focus();
    }
  } catch {
    el("quiz").hidden = true;
    status.textContent = "No se pudo cargar el banco. Recarga la página.";
  }
}
void init();
