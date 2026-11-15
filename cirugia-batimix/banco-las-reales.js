(() => {
  "use strict";
  const units = [
    "Cirugía cardiovascular y de tórax", "Anestesiología", "Cirugía de cabeza y cuello",
    "Técnicas quirúrgicas", "Cirugía plástica"
  ];
  const data = window.BADBEAR_BATIMIX_REALES || {};
  const counts = units.map((_, i) => data[i + 1]?.items?.length ?? data[i + 1]?.length ?? 0);
  const params = new URLSearchParams(location.search);
  const requested = Number(params.get("unidad"));
  const unit = requested >= 1 && requested <= units.length && Number.isInteger(requested) ? requested : 2;
  const bank = (data[unit]?.items ?? data[unit] ?? []).map(question => ({
    ...question, ...data[unit]?.explanations?.[question.group]
  }));
  const anesthesia = (window.BATIMIX_ANESTESIOLOGIA?.secciones ?? []).flatMap(section => section.items);
  const nameById = new Map(anesthesia.map(item => [item.id, item.titulo]));
  const byId = id => document.getElementById(id);
  const quiz = byId("pregunta");
  const topic = byId("tema");
  const status = byId("disponibles");
  const answers = new Map();
  const SIM_SIZE = 20;
  const SIM_SECONDS = 600;
  const bankUrl = `?unidad=${unit}#banco`;
  const timed = params.get("modo") === "simulacro";
  let selection = [];
  let cursor = 0;
  let finished = false;
  let deadline = 0;
  let interval;

  function el(tag, text, className) {
    const node = document.createElement(tag);
    node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function link(label, href, className) {
    const anchor = el("a", label, className);
    anchor.href = href;
    return anchor;
  }

  function button(label, callback, className = "") {
    const item = el("button", label, className);
    item.type = "button";
    item.addEventListener("click", callback);
    return item;
  }

  function uniqueScorable(pool) {
    const byGroup = new Map();
    for (const question of pool) {
      if (question.kind !== "mc") continue;
      if (!byGroup.has(question.group)) byGroup.set(question.group, []);
      byGroup.get(question.group).push(question);
    }
    return [...byGroup.values()].map(variants => variants[Math.floor(Math.random() * variants.length)]);
  }

  function mixed(pool) {
    const items = uniqueScorable(pool);
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items.slice(0, SIM_SIZE);
  }

  function topicName(question) {
    return question.topic || nameById.get(question.lesson) || units[unit - 1];
  }

  function topicKey(question) {
    return question.lesson || question.topic;
  }

  function explanation(question, answer) {
    const result = el("section", "", "feedback");
    const label = question.opts.find(([letter]) => letter === question.correct);
    const title = question.kind === "mc"
      ? (answer ? (answer === question.correct ? "Correcta" : "Respuesta correcta") : "Respuesta correcta")
      : (question.kind === "open" ? "Respuesta orientativa" : "Repaso razonado");
    result.append(el("h3", title));
    if (label) result.append(el("p", label.join(". ")));
    result.append(el("p", question.why));
    if (question.theory) result.append(link("Ir a la teoría", question.theory));
    else if (question.lesson) {
      result.append(link("Ver clase o seminario", `../badbear-campus/aula-batimix.html?unidad=${unit}&recurso=${encodeURIComponent(question.lesson)}#unit-content`));
    }
    if (question.ref) result.append(link("Consultar referencia clínica", question.ref));
    return result;
  }

  function renderQuestion() {
    quiz.replaceChildren();
    if (!selection.length) {
      quiz.append(el("p", "Todavía no hay preguntas de los materiales recibidos para esta unidad."));
      return;
    }
    const question = selection[cursor];
    const answer = answers.get(question.id);
    const form = el("fieldset", "");
    const heading = el("legend", question.stem);
    heading.tabIndex = -1;
    form.append(heading);
    const number = el("p", `${cursor + 1} de ${selection.length} · ${topicName(question)}`, "meta");
    number.setAttribute("aria-live", "polite");
    quiz.append(number, form);
    const showing = !timed && answers.has(question.id);
    for (const [letter, option] of question.opts) {
      const row = el("label", "", "choice");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = letter;
      input.checked = answer === letter;
      input.disabled = question.kind === "review" || showing;
      if (showing && letter === question.correct) row.classList.add("correct");
      if (showing && letter === answer && letter !== question.correct) row.classList.add("incorrect");
      input.addEventListener("change", () => {
        answers.set(question.id, letter);
        if (!timed) renderQuestion().focus();
      });
      row.append(input, el("span", `${letter}. ${option}`));
      form.append(row);
    }
    if (!timed) {
      if (showing) {
        const result = explanation(question, answer);
        result.tabIndex = -1;
        quiz.append(result);
      } else if (question.kind !== "mc") {
        quiz.append(button(question.kind === "open" ? "Ver respuesta razonada" : "Ver repaso razonado", () => {
          answers.set(question.id, "");
          renderQuestion().focus();
        }));
      }
    }
    const actions = el("div", "", "actions");
    const previous = button("Anterior", () => move(-1), "secondary");
    const next = button("Siguiente", () => move(1));
    previous.disabled = cursor === 0;
    next.disabled = cursor === selection.length - 1;
    actions.append(previous, next);
    quiz.append(actions);
    return showing ? quiz.querySelector(".feedback") : heading;
  }

  function move(step) {
    cursor += step;
    renderQuestion().focus();
  }

  function updatePractice() {
    selection = topic.value ? bank.filter(question => topicKey(question) === topic.value) : bank;
    cursor = 0;
    const sim = byId("simulacro");
    const available = uniqueScorable(selection).length;
    sim.hidden = available < SIM_SIZE;
    sim.href = `?unidad=${unit}&modo=simulacro${topic.value ? "&tema=" + encodeURIComponent(topic.value) : ""}#banco`;
    status.textContent = `${selection.length} ${selection.length === 1 ? "pregunta" : "preguntas"}` +
      (available < SIM_SIZE && selection.length ? " · Simulacro disponible al reunir 20 preguntas distintas con clave evaluable." : "");
    renderQuestion();
  }

  function finish() {
    if (finished) return;
    finished = true;
    clearInterval(interval);
    byId("tiempo").hidden = true;
    const points = selection.filter(question => answers.get(question.id) === question.correct).length;
    const result = el("h2", `Resultado · ${points} de ${selection.length}`);
    result.tabIndex = -1;
    quiz.replaceChildren(result, el("p", `${answers.size} respondidas · ${selection.length - answers.size} sin responder`),
      link("Volver a práctica", bankUrl, "button"));
    for (const [index, question] of selection.entries()) {
      const answer = answers.get(question.id);
      const detail = el("details", "", "feedback");
      detail.append(el("summary", `${index + 1}. ${question.stem}`));
      detail.append(el("p", `Tu respuesta: ${question.opts.find(([letter]) => letter === answer)?.join(". ") || "Sin responder"}`));
      detail.append(explanation(question, answer));
      quiz.append(detail);
    }
    result.focus();
  }

  function tick() {
    const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    byId("reloj").textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
    if (seconds === 0) finish();
  }

  byId("unidad-titulo").textContent = units[unit - 1];
  byId("aula").href = `../badbear-campus/aula-batimix.html?unidad=${unit}#unit-content`;
  units.forEach((name, index) => {
    const id = index + 1;
    const anchor = link(`${name} · ${counts[index]}`, `?unidad=${id}#banco`);
    if (id === unit) anchor.setAttribute("aria-current", "page");
    byId("unidades").append(anchor);
  });

  const topics = new Map(bank.map(question => [topicKey(question), topicName(question)]));
  const all = el("option", "Todos los temas");
  all.value = "";
  topic.append(all);
  for (const [key, name] of topics) {
    const option = el("option", name);
    option.value = key;
    topic.append(option);
  }
  if (topics.has(params.get("tema"))) topic.value = params.get("tema");
  if (timed) {
    const pool = topic.value ? bank.filter(question => topicKey(question) === topic.value) : bank;
    selection = mixed(pool);
    if (selection.length !== SIM_SIZE) {
      status.textContent = "Esta selección todavía no reúne 20 preguntas distintas con clave evaluable.";
      quiz.append(link("Volver a práctica", bankUrl, "button"));
      return;
    }
    status.textContent = "Simulacro · 20 preguntas · 10 minutos";
    byId("tiempo").hidden = false;
    byId("finalizar").addEventListener("click", finish);
    deadline = Date.now() + SIM_SECONDS * 1000;
    interval = setInterval(tick, 500);
    tick();
    renderQuestion();
  } else {
    byId("controles").hidden = !bank.length;
    topic.addEventListener("change", updatePractice);
    updatePractice();
  }
})();
