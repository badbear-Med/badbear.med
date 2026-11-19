(() => {
  "use strict";
  const questions = window.BADBEAR_PSIQ_BOTONI || [];
  const root = document.getElementById("botoni-quiz");
  const mode = document.getElementById("botoni-mode");
  const navigator = document.getElementById("botoni-nav");
  const status = document.getElementById("botoni-status");
  const storageKey = "badbear-psiq-botoni-v1";
  const labels = ["Una alternativa es correcta", "Dos son correctas", "Tres son correctas", "Cuatro son correctas", "Todas son falsas"];
  const counts = [1, 2, 3, 4, 0];
  const romans = ["I", "II", "III", "IV"];
  let answers = {};
  let index = 0;
  let finished = false;

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function button(text, action, disabled = false) {
    const node = element("button", text);
    node.type = "button";
    node.disabled = disabled;
    node.addEventListener("click", action);
    return node;
  }

  function correctCount(question) {
    return question.premisas.filter(premise => premise.verdadera).length;
  }

  function optionText(count) {
    const position = counts.indexOf(count);
    return String.fromCharCode(97 + position) + ") " + labels[position];
  }

  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({answers, index, finished, mode: mode.value}));
    } catch {}
  }

  function restore() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (!saved || typeof saved !== "object") return;
      answers = Object.fromEntries(questions.flatMap(question => {
        const value = saved.answers?.[question.id];
        return Number.isInteger(value) && counts.includes(value) ? [[question.id, value]] : [];
      }));
      if (saved.mode === "study" || saved.mode === "exam") mode.value = saved.mode;
      if (Number.isInteger(saved.index)) index = Math.max(0, Math.min(saved.index, questions.length - 1));
      finished = saved.finished === true && mode.value === "exam";
    } catch {}
  }

  function sourceList(question, sourceIndices) {
    const list = element("ul", undefined, "references");
    for (const sourceIndex of sourceIndices) {
      const [title, url] = question.fuentes[sourceIndex];
      const item = element("li");
      const link = element("a", title);
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      item.append(link);
      list.append(item);
    }
    return list;
  }

  function explanation(question) {
    const count = correctCount(question);
    const chosen = answers[question.id];
    const result = element("section", undefined, "response");
    const heading = element("h3", chosen === undefined ? "Sin responder" : chosen === count ? "Respuesta correcta" : "Respuesta incorrecta");
    heading.tabIndex = -1;
    result.append(heading, element("p", "Clave · " + optionText(count)));
    if (chosen !== undefined) result.append(element("p", "Tu respuesta · " + optionText(chosen)));
    question.premisas.forEach((premise, position) => {
      const block = element("section", undefined, "premise-analysis");
      block.append(element("h4", "Premisa " + romans[position]),
        element("span", premise.verdadera ? "Verdadera" : "Falsa", "verdict " + (premise.verdadera ? "true" : "false")),
        element("p", premise.texto, "statement"), element("p", premise.analisis), sourceList(question, premise.fuentes));
      result.append(block);
    });
    return result;
  }

  function move(nextIndex) {
    index = nextIndex;
    save();
    render();
    root.querySelector("h2").focus();
  }

  function renderNavigation() {
    navigator.replaceChildren();
    navigator.hidden = finished;
    questions.forEach((question, position) => {
      const answered = Object.hasOwn(answers, question.id);
      const item = button(String(position + 1), () => move(position));
      item.setAttribute("aria-label", "Pregunta " + (position + 1) + (answered ? ", respondida" : ", sin responder"));
      if (position === index) item.setAttribute("aria-current", "step");
      if (answered) item.className = "respondida";
      navigator.append(item);
    });
  }

  function renderResults() {
    const score = questions.filter(question => answers[question.id] === correctCount(question)).length;
    const heading = element("h2", "Resultado · " + score + " de " + questions.length);
    heading.tabIndex = -1;
    root.append(heading, element("p", "Revisa la clave y el análisis de cada premisa."));
    questions.forEach((question, position) => {
      const detail = element("details", undefined, "explanation");
      const chosen = answers[question.id];
      const verdict = chosen === undefined ? "Sin responder" : chosen === correctCount(question) ? "Correcta" : "Incorrecta";
      detail.append(element("summary", (position + 1) + ". " + question.tema + " · " + verdict), element("p", question.caso, "case"), explanation(question));
      root.append(detail);
    });
  }

  function render() {
    root.replaceChildren();
    const answeredCount = Object.keys(answers).length;
    document.getElementById("botoni-count").textContent = answeredCount + " respondidas";
    renderNavigation();
    status.textContent = finished ? answeredCount + " respondidas · " + (questions.length - answeredCount) + " sin responder."
      : mode.value === "exam" ? "La clave y las justificaciones aparecen al finalizar el examen. Puedes cambiar tus respuestas."
      : "Al marcar verás la clave y el análisis de las cuatro premisas.";
    if (!questions.length) {
      root.append(element("p", "No se pudo cargar el examen. Recarga la página."));
      return;
    }
    if (finished) {
      renderResults();
      return;
    }
    const question = questions[index];
    const heading = element("h2", (index + 1) + ". " + question.tema);
    heading.tabIndex = -1;
    root.append(heading, element("p", question.caso, "case"));
    const premises = element("ol", undefined, "statements");
    premises.setAttribute("type", "I");
    for (const premise of question.premisas) premises.append(element("li", premise.texto));
    root.append(premises, element("p", "Sobre las aseveraciones antes vertidas", "case"));
    const options = element("div", undefined, "answers");
    options.setAttribute("role", "group");
    options.setAttribute("aria-label", "Número de premisas verdaderas");
    const answered = Object.hasOwn(answers, question.id);
    const reveal = mode.value === "study" && answered;
    for (const count of counts) {
      const option = button(optionText(count), () => {
        answers[question.id] = count;
        save();
        render();
        if (mode.value === "study") root.querySelector("h3").focus();
      }, reveal);
      option.className = "answer";
      option.setAttribute("aria-pressed", String(answers[question.id] === count));
      if (reveal && count === correctCount(question)) option.classList.add("correct");
      if (reveal && count === answers[question.id] && count !== correctCount(question)) option.classList.add("wrong");
      options.append(option);
    }
    root.append(options);
    if (reveal) {
      root.append(explanation(question), button("Volver a responder", () => {
        delete answers[question.id];
        save();
        render();
      }));
    }
    const actions = element("div", undefined, "nav");
    actions.append(button("Anterior", () => move(index - 1), index === 0), button("Siguiente", () => move(index + 1), index === questions.length - 1));
    if (mode.value === "exam") actions.append(button("Finalizar y revisar", () => {
      finished = true;
      save();
      render();
      root.querySelector("h2").focus();
    }));
    root.append(actions);
  }

  mode.addEventListener("change", () => {
    finished = false;
    save();
    render();
  });
  document.getElementById("botoni-reset").addEventListener("click", () => {
    if (Object.keys(answers).length && !window.confirm("¿Empezar un nuevo intento y borrar las respuestas de este examen?")) return;
    answers = {};
    index = 0;
    finished = false;
    save();
    render();
  });
  restore();
  render();
})();
