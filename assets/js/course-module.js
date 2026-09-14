(() => {
  "use strict";

  const app = document.getElementById("module-app");
  const id = document.body.dataset.courseId;
  const cursos = Array.isArray(window.BADBEAR_COURSES) ? window.BADBEAR_COURSES : [];
  const curso = cursos.find((item) => item.id === id);
  const params = new URLSearchParams(window.location.search);

  const modulos = {
    teoria: {
      icono: "📚",
      nombre: "Teoría",
      descripcion: "Desarrollo ordenado por unidades, temas y subtemas con enfoque clínico y de evaluación.",
      siguiente: "resumenes"
    },
    resumenes: {
      icono: "📖",
      nombre: "Resúmenes",
      descripcion: "Repaso de alta rentabilidad, cuadros comparativos y puntos BADBEAR.MED FIJA.",
      siguiente: "preguntas"
    },
    preguntas: {
      icono: "🧠",
      nombre: "Banco de preguntas",
      descripcion: "Preguntas tipo examen con alternativas, respuesta correcta, explicación y seguimiento de errores.",
      siguiente: "examenes"
    },
    examenes: {
      icono: "📝",
      nombre: "Exámenes pasados",
      descripcion: "Banco histórico depurado para practicar preguntas reales del curso.",
      siguiente: "pdf"
    },
    pdf: {
      icono: "📄",
      nombre: "PDF",
      descripcion: "Cuadernos, clases, separatas y material académico complementario.",
      siguiente: "videos"
    },
    videos: {
      icono: "🎥",
      nombre: "Videos",
      descripcion: "Clases, explicaciones y material audiovisual organizado por tema.",
      siguiente: "audios"
    },
    audios: {
      icono: "🎧",
      nombre: "Audios",
      descripcion: "Repaso auditivo y material para estudiar mientras te desplazas.",
      siguiente: "progreso"
    },
    progreso: {
      icono: "📊",
      nombre: "Progreso",
      descripcion: "Estadísticas de rendimiento, errores pendientes y temas que necesitan refuerzo.",
      siguiente: "teoria"
    }
  };

  const moduloId = params.get("m") || "teoria";
  const modulo = modulos[moduloId] || modulos.teoria;

  if (!app || !curso) {
    if (app) app.innerHTML = "<p>No se pudo cargar este módulo.</p>";
    return;
  }

  document.title = `${modulo.nombre} · ${curso.nombre} | BADBEAR.MED`;

  const enlaces = Object.entries(modulos).map(([clave, item]) => `
    <a class="module-nav-link ${clave === moduloId ? "activo" : ""}" href="modulo.html?m=${clave}">
      <span>${item.icono}</span>${item.nombre}
    </a>
  `).join("");

  app.innerHTML = `
    <header class="header module-header">
      <a href="../index.html" class="logo">🐼 BADBEAR.<span>MED</span></a>
      <nav class="menu">
        <a href="index.html">${curso.nombre}</a>
        <a href="../index.html" class="volver">← Portal principal</a>
      </nav>
    </header>

    <main class="module-page">
      <div class="module-container">
        <aside class="module-sidebar" aria-label="Módulos del curso">
          <div class="module-sidebar-title">${curso.icono || "📘"} ${curso.nombre}</div>
          <nav>${enlaces}</nav>
        </aside>

        <section class="module-main">
          <div class="breadcrumb">
            <a href="../index.html">BADBEAR.MED</a>
            <span>›</span>
            <a href="index.html">${curso.nombre}</a>
            <span>›</span>
            <strong>${modulo.nombre}</strong>
          </div>

          <div class="module-hero-card">
            <div class="module-hero-icon">${modulo.icono}</div>
            <div>
              <span class="module-kicker">${curso.categoria.toUpperCase()} · ${curso.nombre.toUpperCase()}</span>
              <h1>${modulo.nombre}</h1>
              <p>${modulo.descripcion}</p>
            </div>
          </div>

          <div class="module-status-card">
            <div class="module-status-badge">ESTRUCTURA LISTA</div>
            <h2>Este módulo ya tiene una ubicación estable</h2>
            <p>
              El portal, las rutas y la navegación ya están preparados. El contenido específico de
              <strong>${curso.nombre}</strong> se incorporará aquí sin modificar el resto del sitio.
            </p>
            <div class="module-actions">
              <a class="btn btn-primary" href="index.html">← Volver al curso</a>
              <a class="btn btn-secondary" href="modulo.html?m=${modulo.siguiente}">Siguiente módulo →</a>
            </div>
          </div>

          <div class="module-ready-grid">
            <article>
              <span>01</span>
              <h3>Contenido independiente</h3>
              <p>Cada curso puede crecer con sus propios temas, bancos y recursos.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Navegación común</h3>
              <p>Todos los cursos conservan el acceso al portal BADBEAR.MED y sus módulos.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Escalable</h3>
              <p>Podemos integrar nuevas especialidades sin reconstruir la página principal.</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  `;
})();
