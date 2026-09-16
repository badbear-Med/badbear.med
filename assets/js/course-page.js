(() => {
  "use strict";

  const app = document.getElementById("course-app");
  const id = document.body.dataset.courseId;
  const cursos = Array.isArray(window.BADBEAR_COURSES) ? window.BADBEAR_COURSES : [];
  const curso = cursos.find((item) => item.id === id);

  if (!app || !curso) {
    if (app) app.innerHTML = "<p>No se pudo cargar la configuración del curso.</p>";
    return;
  }

  document.title = `${curso.nombre} | BADBEAR.MED`;

  const modulos = [
    ["teoria", "📚", "Teoría", "Desarrollo organizado por unidades y temas."],
    ["resumenes", "📖", "Resúmenes", "Repaso de alta rentabilidad y BADBEAR.MED FIJA."],
    ["preguntas", "🧠", "Banco de preguntas", "Modo estudio, examen, errores y estadísticas."],
    ["examenes", "📝", "Exámenes pasados", "Banco histórico depurado y organizado."],
    ["pdf", "📄", "PDF", "Cuadernos, clases y material complementario."],
    ["videos", "🎥", "Videos", "Clases y material audiovisual por tema."],
    ["audios", "🎧", "Audios", "Repaso persistente y material para escuchar."],
    ["progreso", "📊", "Progreso", "Seguimiento del rendimiento y temas por reforzar."]
  ];

  app.innerHTML = `
    <header class="header">
      <a href="../index.html" class="logo">BADBEAR.<span>MED</span></a>
      <nav class="menu">
        <a href="../index.html" class="volver">← Portal principal</a>
      </nav>
    </header>

    <main>
      <section class="hero-curso">
        <div class="hero-container">
          <div>
            <span class="categoria">${curso.categoria.toUpperCase()} · BADBEAR.MED</span>
            <h1>${curso.nombre}</h1>
            <p>${curso.descripcion}</p>
            <div class="hero-botones">
              <a href="modulo.html?m=teoria" class="btn btn-primary">Comenzar por teoría</a>
              <a href="#modulos" class="btn btn-secondary">Ver módulos</a>
            </div>
          </div>
          <div class="hero-icon" aria-hidden="true">${curso.icono || "📘"}</div>
        </div>
      </section>

      <section class="contenido" id="modulos">
        <div class="encabezado-seccion">
          <span>RAMA PREPARADA</span>
          <h2>Módulos del curso</h2>
          <p>La navegación y las rutas ya están activas. Cada módulo puede recibir contenido propio sin modificar las demás especialidades.</p>
        </div>
        <div class="modulos">
          ${modulos.map(([slug, icono, nombre, descripcion]) => `
            <a class="modulo" href="modulo.html?m=${slug}">
              <div class="modulo-icon">${icono}</div>
              <h3>${nombre}</h3>
              <p>${descripcion}</p>
              <strong>Abrir módulo →</strong>
            </a>
          `).join("")}
        </div>

        <div class="fija">
          <div class="fija-icon">⭐</div>
          <div>
            <h3>BADBEAR.MED FIJA:</h3>
            <p>${curso.nombre} ya tiene una arquitectura estable y escalable. Podemos integrar teoría, bancos, exámenes, PDFs, videos y audios progresivamente sin rehacer el portal.</p>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <strong>BADBEAR.<span>MED</span></strong>
      <p>${curso.nombre} · Proyecto WAJOMEA.GROUP</p>
    </footer>
  `;
})();
