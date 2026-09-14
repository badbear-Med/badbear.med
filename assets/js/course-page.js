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
    ["📚", "Teoría", "Desarrollo organizado por unidades y temas."],
    ["📖", "Resúmenes", "Repaso de alta rentabilidad y BADBEAR.MED FIJA."],
    ["🧠", "Banco de preguntas", "Modo estudio, examen, errores y estadísticas."],
    ["📝", "Exámenes pasados", "Banco histórico depurado y organizado."],
    ["📄", "PDF", "Cuadernos, clases y material complementario."],
    ["🎥", "Videos", "Clases y material audiovisual por tema."],
    ["🎧", "Audios", "Repaso persistente y material para escuchar."],
    ["📊", "Progreso", "Seguimiento del rendimiento y temas por reforzar."]
  ];

  app.innerHTML = `
    <header class="header">
      <a href="../index.html" class="logo">🐼 BADBEAR.<span>MED</span></a>
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
              <a href="#modulos" class="btn btn-primary">Ver estructura</a>
              <a href="../index.html" class="btn btn-secondary">Todos los cursos</a>
            </div>
          </div>
          <div class="hero-icon" aria-hidden="true">${curso.icono || "📘"}</div>
        </div>
      </section>

      <section class="contenido" id="modulos">
        <div class="encabezado-seccion">
          <span>ESTRUCTURA PREPARADA</span>
          <h2>Módulos del curso</h2>
          <p>Esta rama ya está creada dentro del repositorio maestro. El contenido se activará progresivamente sin modificar el resto de BADBEAR.MED.</p>
        </div>
        <div class="modulos">
          ${modulos.map(([icono, nombre, descripcion]) => `
            <div class="modulo modulo-pendiente">
              <div class="modulo-icon">${icono}</div>
              <h3>${nombre}</h3>
              <p>${descripcion}</p>
              <strong>Pendiente de integrar</strong>
            </div>
          `).join("")}
        </div>

        <div class="fija">
          <div class="fija-icon">⭐</div>
          <div>
            <h3>BADBEAR.MED FIJA:</h3>
            <p>La estructura ya está lista. Cuando incorporemos el contenido de ${curso.nombre}, mantendremos el mismo estándar de navegación, preguntas explicadas, material multimedia y puntos de alta rentabilidad.</p>
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
