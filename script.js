(() => {
  "use strict";

  const cursos = Array.isArray(window.BADBEAR_COURSES) ? window.BADBEAR_COURSES : [];
  const contenedor = document.getElementById("lista-cursos");
  const buscador = document.getElementById("buscar-curso");
  const filtro = document.getElementById("filtro-categoria");
  const contador = document.getElementById("contador-cursos");

  if (!contenedor) return;

  const normalizar = (texto) => String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  function etiquetaEstado(estado) {
    return estado === "integrado" ? "Integrado" : "Base preparada";
  }

  function tarjetaCurso(curso) {
    const a = document.createElement("a");
    a.className = "tarjeta";
    a.href = curso.href;
    a.innerHTML = `
      <div class="tarjeta-top">
        <div class="icono" aria-hidden="true">${curso.icono || "📘"}</div>
        <span class="estado-curso ${curso.estado}">${etiquetaEstado(curso.estado)}</span>
      </div>
      <span class="categoria-curso">${curso.categoria}</span>
      <h3>${curso.nombre}</h3>
      <p>${curso.descripcion}</p>
      <span class="entrar">${curso.estado === "integrado" ? "Ingresar al curso" : "Abrir estructura"} →</span>
    `;
    return a;
  }

  function render() {
    const texto = normalizar(buscador?.value);
    const categoria = filtro?.value || "todos";

    const filtrados = cursos.filter((curso) => {
      const coincideTexto = !texto || normalizar(`${curso.nombre} ${curso.descripcion} ${curso.categoria}`).includes(texto);
      const coincideCategoria = categoria === "todos" || curso.categoria === categoria;
      return coincideTexto && coincideCategoria;
    });

    contenedor.innerHTML = "";
    filtrados.forEach((curso) => contenedor.appendChild(tarjetaCurso(curso)));

    if (!filtrados.length) {
      const vacio = document.createElement("div");
      vacio.className = "sin-resultados";
      vacio.textContent = "No encontramos cursos con esos filtros.";
      contenedor.appendChild(vacio);
    }

    if (contador) contador.textContent = String(filtrados.length);
  }

  buscador?.addEventListener("input", render);
  filtro?.addEventListener("change", render);
  render();
})();
