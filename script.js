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

    const top = document.createElement("div");
    top.className = "tarjeta-top";

    const icono = document.createElement("div");
    icono.className = "icono";
    icono.setAttribute("aria-hidden", "true");

    if (curso.logo) {
      icono.classList.add("logo-curso");
      const img = document.createElement("img");
      img.src = curso.logo;
      img.alt = "";
      img.loading = "lazy";
      img.addEventListener("error", () => {
        icono.classList.remove("logo-curso");
        icono.textContent = curso.icono || "📘";
      });
      icono.appendChild(img);
    } else {
      icono.textContent = curso.icono || "📘";
    }

    const estado = document.createElement("span");
    estado.className = `estado-curso ${curso.estado}`;
    estado.textContent = etiquetaEstado(curso.estado);

    top.append(icono, estado);

    const categoria = document.createElement("span");
    categoria.className = "categoria-curso";
    categoria.textContent = curso.categoria;

    const titulo = document.createElement("h3");
    titulo.textContent = curso.nombre;

    const descripcion = document.createElement("p");
    descripcion.textContent = curso.descripcion;

    const entrar = document.createElement("span");
    entrar.className = "entrar";
    entrar.textContent = `${curso.estado === "integrado" ? "Ingresar al curso" : "Abrir estructura"} →`;

    a.append(top, categoria, titulo, descripcion, entrar);
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
