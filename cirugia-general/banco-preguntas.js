
(() => {
  "use strict";

  const all = Array.isArray(window.BADBEAR_CIRUGIA_GENERAL_BANCO_COMPLETO)
    ? window.BADBEAR_CIRUGIA_GENERAL_BANCO_COMPLETO
    : [];

  const STORAGE = "badbear_cx_general_banco_110_v4";

  const els = {
    total: document.getElementById("total-count"),
    seen: document.getElementById("stat-seen"),
    correct: document.getElementById("stat-correct"),
    wrong: document.getElementById("stat-wrong"),
    percent: document.getElementById("stat-percent"),
    search: document.getElementById("search"),
    type: document.getElementById("type-filter"),
    topic: document.getElementById("topic-filter"),
    shuffle: document.getElementById("shuffle-btn"),
    reset: document.getElementById("reset-btn"),
    pos: document.getElementById("question-position"),
    qtopic: document.getElementById("question-topic"),
    card: document.getElementById("question-card"),
    prev: document.getElementById("prev-btn"),
    next: document.getElementById("next-btn")
  };

  let order = all.map((_, i) => i);
  let filtered = [...order];
  let cursor = 0;

  let progress = {};
  try {
    progress = JSON.parse(localStorage.getItem(STORAGE) || "{}");
  } catch (e) {
    progress = {};
  }

  const save = () => localStorage.setItem(STORAGE, JSON.stringify(progress));

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  }[c]));

  const norm = s => String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  function theoryFor(topic) {
    const t = norm(topic);

    if (t.includes("hernia")) {
      return "Las hernias se analizan según anatomía, frecuencia, reducibilidad y compromiso vascular. Una hernia inguinal sigue siendo la hernia de la pared abdominal más frecuente en ambos sexos, aunque la hernia femoral tiene una proporción relativa mayor en mujeres. En el examen conviene diferenciar 'más frecuente en mujeres' de 'más característica del sexo femenino'.";
    }
    if (t.includes("trauma") || t.includes("politrauma")) {
      return "En trauma grave, el deterioro fisiológico puede perpetuarse mediante hipotermia, acidosis y coagulopatía. La hipoperfusión favorece metabolismo anaerobio y acidosis; la exposición y las infusiones frías agravan la hipotermia; ambas alteran la coagulación y aumentan el sangrado. El objetivo es romper ese círculo mediante control hemorrágico, reanimación adecuada y prevención de pérdida térmica.";
    }
    if (t.includes("shock")) {
      return "El shock representa perfusión tisular insuficiente. Debe interpretarse mediante mecanismo causal, signos de hipoperfusión, respuesta hemodinámica y repercusión orgánica. La presión arterial aislada puede permanecer inicialmente conservada, por lo que taquicardia, estado mental, llenado capilar, diuresis y lactato aportan información clínica relevante.";
    }
    if (t.includes("apend")) {
      return "En apendicitis aguda, la conducta depende de si existe enfermedad no complicada o complicada. La ausencia de perforación, absceso o peritonitis reduce la necesidad de antibióticos posoperatorios prolongados. La profilaxis perioperatoria no equivale a mantener tratamiento antibiótico después de una apendicectomía no complicada.";
    }
    if (t.includes("biliar") || t.includes("colec") || t.includes("colang") || t.includes("ictericia")) {
      return "En patología biliar hay que diferenciar colelitiasis, colecistitis, coledocolitiasis y colangitis. La combinación de dolor, fiebre, ictericia, patrón colestásico y dilatación de la vía biliar ayuda a ubicar la obstrucción y decidir si requiere tratamiento endoscópico o quirúrgico urgente.";
    }
    if (t.includes("pancre")) {
      return "La pancreatitis se aborda confirmando el diagnóstico, valorando gravedad y reconociendo complicaciones locales o sistémicas. La necrosis estéril no se maneja igual que la necrosis infectada. Cuando una colección requiere intervención se priorizan estrategias mínimamente invasivas y escalonadas siempre que la situación clínica lo permita.";
    }
    if (t.includes("esof") || t.includes("acalasia")) {
      return "En patología esofágica es fundamental diferenciar trastornos motores de lesiones obstructivas estructurales. La endoscopia evalúa mucosa y permite biopsia; el esofagograma define morfología y tránsito; la manometría estudia la función motora. La elección del estudio depende del problema clínico que se desea resolver.";
    }
    if (t.includes("preoperator")) {
      return "La valoración preoperatoria busca identificar factores de riesgo, optimizar comorbilidades y preparar al paciente para anestesia y cirugía. Una historia clínica y examen físico bien dirigidos son la base; los exámenes complementarios deben solicitarse cuando responden una pregunta clínica concreta.";
    }
    if (t.includes("postoperator")) {
      return "En el postoperatorio, el momento de aparición de un signo o síntoma orienta el diagnóstico diferencial. Deben vigilarse complicaciones respiratorias, hemorrágicas, infecciosas, tromboembólicas y anastomóticas, además de controlar dolor, diuresis y recuperación funcional.";
    }
    if (t.includes("liquid") || t.includes("electrol")) {
      return "La fluidoterapia perioperatoria debe diferenciar mantenimiento, déficit previo y pérdidas continuas. La reposición se guía por estado hemodinámico, diuresis, función renal, sodio, potasio, cloro y equilibrio ácido-base. Tanto el déficit como la sobrecarga pueden aumentar las complicaciones.";
    }
    if (t.includes("polipo") || t.includes("colorrect")) {
      return "En pólipos colorrectales, el tamaño, la morfología y la histología condicionan el riesgo neoplásico. Una lesión pediculada resecable endoscópicamente debe extraerse completa y enviarse a anatomía patológica, porque una biopsia parcial puede subestimar el componente de mayor riesgo.";
    }
    if (t.includes("meckel") || t.includes("intestino delgado")) {
      return "El divertículo de Meckel es un divertículo verdadero del íleon distal, derivado de la persistencia del conducto onfalomesentérico. Puede contener mucosa ectópica gástrica y originar sangrado, inflamación u obstrucción.";
    }
    if (t.includes("ulcera") || t.includes("helicobacter")) {
      return "En enfermedad ulcerosa asociada a Helicobacter pylori, la infección debe erradicarse. En una hemorragia digestiva, la necesidad de hemostasia endoscópica depende del estigma de sangrado. Un punto de hematina sin sangrado activo no equivale a un vaso visible ni obliga por sí mismo a tratamiento hemostático.";
    }
    if (t.includes("inflamatoria") || t.includes("crohn") || t.includes("colitis")) {
      return "La respuesta inflamatoria quirúrgica y las enfermedades inflamatorias deben interpretarse según su mecanismo. En trauma predomina inicialmente la activación de la inmunidad innata por señales de daño tisular; en enfermedad inflamatoria intestinal importan distribución, profundidad del compromiso y complicaciones.";
    }

    return "La respuesta correcta debe justificarse por el principio quirúrgico central de la pregunta. El objetivo no es memorizar una letra, sino relacionar el dato clínico con anatomía, fisiopatología, diagnóstico y conducta.";
  }

  function populateTopics() {
    const topics = [...new Set(all.map(q => q.tema).filter(Boolean))]
      .sort((a,b) => a.localeCompare(b, "es"));

    topics.forEach(t => {
      const o = document.createElement("option");
      o.value = t;
      o.textContent = t;
      els.topic.appendChild(o);
    });
  }

  function updateStats() {
    const vals = Object.values(progress);
    const seen = vals.filter(v => v && v.done).length;
    const correct = vals.filter(v => v && v.correct === true).length;
    const wrong = vals.filter(v => v && v.correct === false).length;
    const graded = correct + wrong;

    els.total.textContent = all.length;
    els.seen.textContent = seen;
    els.correct.textContent = correct;
    els.wrong.textContent = wrong;
    els.percent.textContent = graded
      ? Math.round((correct / graded) * 100) + "%"
      : "0%";
  }

  function applyFilters(resetCursor = true) {
    const term = els.search.value.trim().toLowerCase();
    const type = els.type.value;
    const topic = els.topic.value;

    filtered = order.filter(i => {
      const q = all[i];
      const hay = [
        q.pregunta,
        q.tema,
        q.respuesta,
        (q.opciones || []).join(" ")
      ].join(" ").toLowerCase();

      if (term && !hay.includes(term)) return false;
      if (topic !== "all" && q.tema !== topic) return false;
      if (type === "choice" && !(q.opciones && q.opciones.length)) return false;
      if (type === "open" && q.opciones && q.opciones.length) return false;
      if (type === "review" && q.estado !== "revisar" && q.estado !== "imagen") return false;

      return true;
    });

    if (resetCursor) cursor = 0;
    render();
  }

  function buildFeedback(q, p, hasOptions, hasKey) {
    let resultHtml = "";

    if (hasOptions && hasKey) {
      if (p.correct === true) {
        resultHtml = `
          <div class="result ok">
            <strong>✓ CORRECTO</strong>
            <span>Clave ${esc(q.clave)}${q.respuesta ? " — " + esc(q.respuesta) : ""}</span>
          </div>`;
      } else {
        resultHtml = `
          <div class="result bad">
            <strong>✕ INCORRECTO</strong>
            <span>Respuesta correcta: ${esc(q.clave)}${q.respuesta ? " — " + esc(q.respuesta) : ""}</span>
          </div>`;
      }
    } else {
      resultHtml = `
        <div class="result neutral">
          <strong>RESPUESTA CORRECTA</strong>
          <span>${esc(q.respuesta || "Revisa el desarrollo académico.")}</span>
        </div>`;
    }

    return `
      <div class="feedback">
        ${resultHtml}

        <section class="bb-answer-box">
          <div class="bb-answer-label">BADBEAR.MED · EXPLICACIÓN</div>
          <h3>¿Por qué esta es la respuesta correcta?</h3>
          <p>${esc(q.explicacion || "La respuesta se sostiene en el concepto quirúrgico central evaluado en esta pregunta.")}</p>
        </section>

        <section class="bb-theory-box">
          <h3>Desarrollo teórico</h3>
          <p>${esc(theoryFor(q.tema))}</p>
          <p class="bb-clinical-link"><b>Aplicación:</b> usa este concepto para reconocer por qué la respuesta mostrada es la que mejor resuelve el problema planteado.</p>
        </section>

        <section class="fija bb-fija-v4">
          <h3>BADBEAR.MED FIJA:</h3>
          <p>${esc(q.badbear_fija || "Fija el concepto central de esta pregunta antes de continuar.")}</p>
        </section>

        ${q.nota ? `
          <section class="note-box">
            <p><strong>Nota del banco:</strong> ${esc(q.nota)}</p>
          </section>` : ""}
      </div>`;
  }

  function buildQuestion(q) {
    const p = progress[q.id] || {};
    const hasOptions = Array.isArray(q.opciones) && q.opciones.length > 0;
    const hasKey = !!q.clave;
    const revealed = !!p.done;

    let html = `<h2>${esc(q.orden)}. ${esc(q.pregunta)}</h2>`;

    if (hasOptions) {
      html += `<div class="options">`;

      q.opciones.forEach((op, idx) => {
        const letter = String.fromCharCode(65 + idx);
        let cls = "option";

        if (revealed && hasKey) {
          if (letter === q.clave) cls += " correct";
          if (letter === p.selected && letter !== q.clave) cls += " wrong";
        }

        html += `
          <label class="${cls}">
            <input
              type="radio"
              name="answer"
              value="${letter}"
              ${p.selected === letter ? "checked" : ""}
              ${revealed ? "disabled" : ""}
            >
            <span class="option-letter">${letter}</span>
            <span>${esc(op)}</span>
          </label>`;
      });

      html += `</div>`;

      if (!revealed) {
        html += `
          <div class="answer-actions">
            <button type="button" id="answer-btn">Responder</button>
          </div>`;
      } else {
        html += `
          <div class="answer-actions">
            <button type="button" id="retry-btn" class="ghost">Intentar nuevamente</button>
          </div>`;
      }
    } else {
      html += `
        <div class="open-answer">
          <textarea
            id="open-response"
            placeholder="Escribe primero tu respuesta..."
            ${revealed ? "disabled" : ""}
          >${esc(p.text || "")}</textarea>
        </div>`;

      if (!revealed) {
        html += `
          <div class="answer-actions">
            <button type="button" id="answer-btn">Responder y comprobar</button>
          </div>`;
      } else {
        html += `
          <div class="answer-actions">
            <button type="button" id="retry-btn" class="ghost">Intentar nuevamente</button>
          </div>`;
      }
    }

    if (revealed) {
      html += buildFeedback(q, p, hasOptions, hasKey);
    }

    return html;
  }

  function currentAnswered() {
    if (!filtered.length) return false;
    const q = all[filtered[cursor]];
    return !!(progress[q.id] && progress[q.id].done);
  }

  function render() {
    updateStats();

    if (!filtered.length) {
      els.pos.textContent = "Sin resultados";
      els.qtopic.textContent = "Filtro";
      els.card.innerHTML = `<div class="empty">No hay preguntas que coincidan con los filtros actuales.</div>`;
      els.prev.disabled = true;
      els.next.disabled = true;
      return;
    }

    cursor = Math.max(0, Math.min(cursor, filtered.length - 1));

    const q = all[filtered[cursor]];

    els.pos.textContent = `Pregunta ${cursor + 1} de ${filtered.length}`;
    els.qtopic.textContent = q.tema || "Cirugía General";
    els.card.innerHTML = buildQuestion(q);

    els.prev.disabled = cursor === 0;

    const canAdvance = currentAnswered();
    els.next.disabled = !canAdvance || cursor === filtered.length - 1;
    els.next.textContent = canAdvance ? "Siguiente →" : "Responde para continuar";
    els.next.title = canAdvance
      ? "Ir a la siguiente pregunta"
      : "Debes responder antes de avanzar";

    const answerBtn = document.getElementById("answer-btn");

    if (answerBtn) {
      answerBtn.addEventListener("click", () => {
        const hasOptions = Array.isArray(q.opciones) && q.opciones.length > 0;

        if (hasOptions) {
          const checked = document.querySelector('input[name="answer"]:checked');

          if (!checked) {
            alert("Debes seleccionar una alternativa.");
            return;
          }

          progress[q.id] = {
            done: true,
            selected: checked.value,
            correct: q.clave ? checked.value === q.clave : null
          };
        } else {
          const textarea = document.getElementById("open-response");
          const value = textarea ? textarea.value.trim() : "";

          if (!value) {
            alert("Debes escribir una respuesta antes de comprobar.");
            return;
          }

          progress[q.id] = {
            done: true,
            text: value,
            correct: null
          };
        }

        save();
        render();

        setTimeout(() => {
          const fb = document.querySelector(".feedback");
          if (fb) fb.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      });
    }

    const retryBtn = document.getElementById("retry-btn");

    if (retryBtn) {
      retryBtn.addEventListener("click", () => {
        delete progress[q.id];
        save();
        render();
      });
    }
  }

  els.prev.addEventListener("click", () => {
    if (cursor > 0) {
      cursor--;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  els.next.addEventListener("click", () => {
    if (!currentAnswered()) {
      alert("Primero debes responder la pregunta actual.");
      return;
    }

    if (cursor < filtered.length - 1) {
      cursor++;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  els.search.addEventListener("input", () => applyFilters());
  els.type.addEventListener("change", () => applyFilters());
  els.topic.addEventListener("change", () => applyFilters());

  els.shuffle.addEventListener("click", () => {
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    applyFilters(true);
  });

  els.reset.addEventListener("click", () => {
    if (!confirm("¿Reiniciar todo el progreso del banco de Cirugía General?")) return;
    progress = {};
    save();
    render();
  });

  populateTopics();
  applyFilters(false);
})();
