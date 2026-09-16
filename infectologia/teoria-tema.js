(() => {
  "use strict";

  const data = window.BADBEAR_INFECTOLOGIA_TEORIA || {};
  const topicId = new URLSearchParams(location.search).get("t");
  const topic = data[topicId];

  if (!topic) return;

  const main = document.querySelector("main");
  if (!main || document.querySelector("#bb-topic-theory")) return;

  const section = document.createElement("section");
  section.id = "bb-topic-theory";
  section.className = "bb-topic-theory";

  section.innerHTML = `
    <div class="bb-theory-head">
      <span class="bb-theory-kicker">CUADERNO BADBEAR.MED · TEORÍA</span>
      <h2>${topic.titulo}</h2>
      <p>${topic.intro || ""}</p>
    </div>

    <div class="bb-theory-sections">
      ${topic.secciones.map((s, i) => `
        <article class="bb-theory-block" id="teoria-${i + 1}">
          <h3>${s.titulo}</h3>
          <div class="bb-theory-body">${s.html}</div>
        </article>
      `).join("")}
    </div>

    <div class="bb-theory-end">
      <strong>BADBEAR.MED · REPASO DEL TEMA</strong>
      <span>Después de revisar la teoría, continúa con PDF, audios, videos y preguntas del tema.</span>
    </div>
  `;

  const resources = document.querySelector("#bb-topic-resources");
  if (resources && resources.parentNode === main) {
    main.insertBefore(section, resources);
  } else {
    main.appendChild(section);
  }
})();
