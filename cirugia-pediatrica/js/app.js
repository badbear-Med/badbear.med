// ============================================================
// BADBEAR.MED
// CIRUGÍA PEDIÁTRICA
// MOTOR DEL BANCO DE PREGUNTAS
// ============================================================


// ============================================================
// ELEMENTOS DEL DOM
// ============================================================
const btnIniciarExamenes =
  document.getElementById("btn-iniciar-examenes");

const btnExamenesFalladas =
  document.getElementById(
    "btn-examenes-falladas"
  );

const filtroExamenTodas =
  document.getElementById("filtro-examen-todas");

const filtroExamenRepetidas =
  document.getElementById("filtro-examen-repetidas");

const filtroExamenImagen =
  document.getElementById("filtro-examen-imagen");


let filtroExamenesSeleccionado =
  "todas";

const totalExamenesPasados =
  document.getElementById("total-examenes-pasados");

const estadisticasExamenesCorrectas =
  document.getElementById(
    "estadisticas-examenes-correctas"
  );

const estadisticasExamenesIncorrectas =
  document.getElementById(
    "estadisticas-examenes-incorrectas"
  );

const estadisticasExamenesPorcentaje =
  document.getElementById(
    "estadisticas-examenes-porcentaje"
  );

  totalExamenesPasados.textContent =
  examenesPasados.length;
const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaQuiz = document.getElementById("pantalla-quiz");
const pantallaFinal = document.getElementById("pantalla-final");

const cantidadPreguntas = document.getElementById("cantidad-preguntas");

const selectCantidad = document.getElementById("select-cantidad");
const selectTema = document.getElementById("select-tema");
const selectModo = document.getElementById("select-modo");
const mezclarPreguntas = document.getElementById("mezclar-preguntas");
const infoSeleccion = document.getElementById("info-seleccion");

const btnIniciar = document.getElementById("btn-iniciar");

const temaPregunta = document.getElementById("tema-pregunta");
const dificultadPregunta = document.getElementById("dificultad-pregunta");
const modoPregunta = document.getElementById("modo-pregunta");

const contadorPregunta = document.getElementById("contador-pregunta");
const progreso = document.getElementById("progreso");
const porcentajeAvance =
  document.getElementById("porcentaje-avance");

const notaVigesimal =
  document.getElementById("nota-vigesimal");
const contadorCorrectas = document.getElementById("contador-correctas");
const contadorIncorrectas = document.getElementById("contador-incorrectas");

const textoPregunta = document.getElementById("texto-pregunta");
const contenedorImagenPregunta =
  document.getElementById("contenedor-imagen-pregunta");

const imagenPregunta =
  document.getElementById("imagen-pregunta");
const opciones = document.getElementById("opciones");

const btnResponder = document.getElementById("btn-responder");
const btnSiguiente = document.getElementById("btn-siguiente");

const resultado = document.getElementById("resultado");
const estadoRespuesta = document.getElementById("estado-respuesta");
const respuestaCorrecta = document.getElementById("respuesta-correcta");

const bloqueExplicacion = document.getElementById("bloque-explicacion");
const explicacion = document.getElementById("explicacion");

const bloqueFija = document.getElementById("bloque-fija");
const textoFija = document.getElementById("texto-fija");

const tituloResultadoFinal =
  document.getElementById(
    "titulo-resultado-final"
  );

const puntajeFinal = document.getElementById("puntaje-final");
const porcentajeFinal = document.getElementById("porcentaje-final");

const finalCorrectas = document.getElementById("final-correctas");
const finalIncorrectas = document.getElementById("final-incorrectas");
const finalTotal = document.getElementById("final-total");

const mensajeFinal = document.getElementById("mensaje-final");

const btnReiniciar = document.getElementById("btn-reiniciar");
const btnRevisar = document.getElementById("btn-revisar");

const revisionErrores = document.getElementById("revision-errores");


// ============================================================
// VARIABLES
// ============================================================

let preguntasSesion = [];

let origenSesion = "banco";

let tipoSesionExamenes = "normal";

let preguntaActual = 0;

let respuestaSeleccionada = null;

let correctas = 0;

let incorrectas = 0;

let preguntaRespondida = false;

let modoActual = "estudio";

let respuestasUsuario = [];


// ============================================================
// MOSTRAR TOTAL DE PREGUNTAS
// ============================================================

cantidadPreguntas.textContent = questions.length;


// ============================================================
// CARGAR TEMAS AUTOMÁTICAMENTE
// ============================================================

function cargarTemas() {

  const temas = [
    ...new Set(
      questions.map(pregunta => pregunta.tema)
    )
  ];

  temas.sort((a, b) =>
    a.localeCompare(b, "es")
  );


  temas.forEach(tema => {

    const option = document.createElement("option");

    option.value = tema;

    option.textContent = tema;

    selectTema.appendChild(option);

  });

}


cargarTemas();


// ============================================================
// MEZCLAR ARRAY
// ============================================================

function mezclarArray(array) {

  const copia = [...array];

  for (
    let i = copia.length - 1;
    i > 0;
    i--
  ) {

    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [
      copia[i],
      copia[j]
    ] = [
      copia[j],
      copia[i]
    ];

  }

  return copia;

}


// ============================================================
// ACTUALIZAR INFORMACIÓN DE SELECCIÓN
// ============================================================

function actualizarInfoSeleccion() {

  const tema = selectTema.value;

  let disponibles;

  if (tema === "todos") {

    disponibles = questions.length;

  } else {

    disponibles = questions.filter(
      pregunta => pregunta.tema === tema
    ).length;

  }


  const cantidadDeseada = Number(
    selectCantidad.value
  );


  const cantidadReal = Math.min(
    cantidadDeseada,
    disponibles
  );


  if (disponibles === 0) {

    infoSeleccion.textContent =
      "No existen preguntas disponibles para esta selección.";

    btnIniciar.disabled = true;

    return;
  }


  btnIniciar.disabled = false;


  infoSeleccion.textContent =
    `${disponibles} preguntas disponibles · ` +
    `se usarán ${cantidadReal}`;

}


selectTema.addEventListener(
  "change",
  actualizarInfoSeleccion
);


selectCantidad.addEventListener(
  "change",
  actualizarInfoSeleccion
);


actualizarInfoSeleccion();


// ============================================================
// INICIAR BANCO
// ============================================================

btnIniciar.addEventListener(
  "click",
  iniciarBanco
);


function iniciarBanco() {
  origenSesion = "banco";

  preguntaActual = 0;

  respuestaSeleccionada = null;

  correctas = 0;

  incorrectas = 0;

  preguntaRespondida = false;

  respuestasUsuario = [];

  modoActual = selectModo.value;


  let bancoFiltrado;


  if (selectTema.value === "todos") {

    bancoFiltrado = [...questions];

  } else {

    bancoFiltrado = questions.filter(
      pregunta =>
        pregunta.tema === selectTema.value
    );

  }


  if (mezclarPreguntas.checked) {

    bancoFiltrado =
      mezclarArray(bancoFiltrado);

  }


  const cantidadDeseada =
    Number(selectCantidad.value);


  preguntasSesion =
  bancoFiltrado.slice(
    0,
    Math.min(
      cantidadDeseada,
      bancoFiltrado.length
    )
  );


  contadorCorrectas.textContent = "0";

  contadorIncorrectas.textContent = "0";
  porcentajeAvance.textContent = "0%";
notaVigesimal.textContent = "— / 20";
progreso.style.width = "0%";


  pantallaInicio.classList.add("oculto");

  pantallaFinal.classList.add("oculto");

  pantallaQuiz.classList.remove("oculto");

activarNav(navBanco);
  mostrarPregunta();

}


// ============================================================
// MOSTRAR PREGUNTA
// ============================================================

function mostrarPregunta() {

  preguntaRespondida = false;

  respuestaSeleccionada = null;


  resultado.classList.add("oculto");

  respuestaCorrecta.classList.add("oculto");

  btnResponder.classList.remove("oculto");


  const pregunta =
    preguntasSesion[preguntaActual];


  temaPregunta.textContent =
    pregunta.tema;


if (origenSesion === "examenes") {

  dificultadPregunta.textContent =
    `🔥 REPETIDA ${pregunta.repetida} VECES`;

modoPregunta.textContent =
  tipoSesionExamenes === "falladas"
    ? "Repaso de falladas"
    : "Examen pasado";

} else {

  dificultadPregunta.textContent =
    pregunta.dificultad;

  modoPregunta.textContent =
    modoActual === "estudio"
      ? "Modo estudio"
      : "Modo examen";

}


  contadorPregunta.textContent =
    `Pregunta ${preguntaActual + 1} / ${preguntasSesion.length}`;



  textoPregunta.textContent =
    pregunta.pregunta;

    if (pregunta.imagen) {

  contenedorImagenPregunta.classList.remove("oculto");

  imagenPregunta.src =
    pregunta.imagen;

  imagenPregunta.alt =
    pregunta.altImagen ||
    `Imagen clínica de ${pregunta.tema}`;

} else {

  contenedorImagenPregunta.classList.add("oculto");

  imagenPregunta.src = "";

}


  opciones.innerHTML = "";


  pregunta.opciones.forEach(
    (opcion, indice) => {

      const boton =
        document.createElement("button");


      boton.type = "button";

      boton.className = "opcion";

      boton.dataset.indice = indice;


      const letra =
        String.fromCharCode(
          65 + indice
        );


      boton.innerHTML = `
        <span class="opcion-letra">
          ${letra}
        </span>

        <span class="opcion-texto">
          ${opcion}
        </span>
      `;


      boton.addEventListener(
        "click",
        () =>
          seleccionarRespuesta(
            boton,
            indice
          )
      );


      opciones.appendChild(boton);

    }
  );

}


// ============================================================
// SELECCIONAR RESPUESTA
// ============================================================

function seleccionarRespuesta(
  boton,
  indice
) {

  if (preguntaRespondida) {
    return;
  }


  respuestaSeleccionada =
    indice;


  document
    .querySelectorAll(".opcion")
    .forEach(opcion =>
      opcion.classList.remove(
        "seleccionada"
      )
    );


  boton.classList.add(
    "seleccionada"
  );

}


// ============================================================
// RESPONDER
// ============================================================

btnResponder.addEventListener(
  "click",
  responderPregunta
);

// ============================================================
// ACTUALIZAR AVANCE Y NOTA VIGESIMAL
// ============================================================

function actualizarRendimiento() {

  const respondidas =
    correctas + incorrectas;


  const total =
    preguntasSesion.length;


  const avance =
    total > 0
      ? Math.round(
          (respondidas / total) * 100
        )
      : 0;


  porcentajeAvance.textContent =
    `${avance}%`;


  progreso.style.width =
    `${avance}%`;


  if (respondidas === 0) {

    notaVigesimal.textContent =
      "— / 20";

    return;

  }


  const nota =
    (correctas / respondidas) * 20;


  notaVigesimal.textContent =
    `${nota.toFixed(1)} / 20`;

}
function responderPregunta() {

  if (
    respuestaSeleccionada === null
  ) {

    alert(
      "Selecciona una alternativa antes de responder."
    );

    return;

  }


  if (preguntaRespondida) {
    return;
  }


  preguntaRespondida = true;


  const pregunta =
    preguntasSesion[preguntaActual];


  const esCorrecta =
    respuestaSeleccionada ===
    pregunta.correcta;


  if (esCorrecta) {

    correctas++;

  } else {

    incorrectas++;

  }


  contadorCorrectas.textContent =
    correctas;


  contadorIncorrectas.textContent =
    incorrectas;
actualizarRendimiento();

  respuestasUsuario.push({

    pregunta,

    seleccionada:
      respuestaSeleccionada,

    correcta:
      esCorrecta

  });


  const botones =
    document.querySelectorAll(
      ".opcion"
    );


  botones.forEach(
    boton => {

      boton.disabled = true;

    }
  );


  btnResponder.classList.add(
    "oculto"
  );


  resultado.classList.remove(
    "oculto"
  );


  // ==========================================================
  // MODO ESTUDIO
  // ==========================================================

  if (modoActual === "estudio") {

    botones.forEach(
      boton => {

        const indice =
          Number(
            boton.dataset.indice
          );


        if (
          indice === pregunta.correcta
        ) {

          boton.classList.add(
            "correcta"
          );

        }


        if (
          indice === respuestaSeleccionada &&
          indice !== pregunta.correcta
        ) {

          boton.classList.add(
            "incorrecta"
          );

        }

      }
    );


    if (esCorrecta) {

      estadoRespuesta.textContent =
        "¡Respuesta correcta!";

      estadoRespuesta.className =
        "estado-respuesta correcto";

    } else {

      estadoRespuesta.textContent =
        "Respuesta incorrecta";

      estadoRespuesta.className =
        "estado-respuesta incorrecto";


      const letraCorrecta =
        String.fromCharCode(
          65 + pregunta.correcta
        );


      respuestaCorrecta.innerHTML =
        `<strong>Respuesta correcta:</strong> ` +
        `${letraCorrecta}. ` +
        `${pregunta.opciones[pregunta.correcta]}`;


      respuestaCorrecta.classList.remove(
        "oculto"
      );

    }


    bloqueExplicacion.classList.remove(
      "oculto"
    );


    bloqueFija.classList.remove(
      "oculto"
    );


    explicacion.textContent =
      pregunta.explicacion;


    textoFija.textContent =
      pregunta.fija;

  }


  // ==========================================================
  // MODO EXAMEN
  // ==========================================================

  else {

    estadoRespuesta.textContent =
      "Respuesta registrada";

    estadoRespuesta.className =
      "estado-respuesta neutral";


    respuestaCorrecta.classList.add(
      "oculto"
    );


    bloqueExplicacion.classList.add(
      "oculto"
    );


    bloqueFija.classList.add(
      "oculto"
    );

  }

}


// ============================================================
// SIGUIENTE
// ============================================================

btnSiguiente.addEventListener(
  "click",
  siguientePregunta
);


function siguientePregunta() {

  preguntaActual++;


  if (
    preguntaActual <
    preguntasSesion.length
  ) {

    mostrarPregunta();

  } else {

    mostrarResultadoFinal();

  }

}


// ============================================================
// RESULTADO FINAL
// ============================================================

function mostrarResultadoFinal() {
if (origenSesion === "examenes") {

  tituloResultadoFinal.textContent =
    tipoSesionExamenes === "falladas"
      ? "Repaso de falladas completado"
      : "Exámenes pasados completados";

} else {

  tituloResultadoFinal.textContent =
    "Banco completado";

}

  pantallaQuiz.classList.add(
    "oculto"
  );


  pantallaFinal.classList.remove(
    "oculto"
  );

if (origenSesion === "examenes") {
  activarNav(navExamenes);
} else {
  activarNav(navProgreso);
}
  const total =
    preguntasSesion.length;


  const porcentaje =
    Math.round(
      (correctas / total) * 100
    );


  puntajeFinal.textContent =
    `${correctas} / ${total}`;


  porcentajeFinal.textContent =
    `${porcentaje}%`;


  finalCorrectas.textContent =
    correctas;


  finalIncorrectas.textContent =
    incorrectas;


  finalTotal.textContent =
    total;


  if (porcentaje >= 90) {

    mensajeFinal.textContent =
      "Excelente dominio del tema.";

  }

  else if (porcentaje >= 80) {

    mensajeFinal.textContent =
      "Muy buen resultado. Estás en un nivel sólido.";

  }

  else if (porcentaje >= 70) {

    mensajeFinal.textContent =
      "Buen resultado. Revisa los errores para consolidar conceptos.";

  }

  else if (porcentaje >= 60) {

    mensajeFinal.textContent =
      "Vas avanzando. Conviene reforzar los puntos fallados.";

  }

  else {

    mensajeFinal.textContent =
      "Necesitas reforzar este bloque. Revisa los errores y vuelve a intentarlo.";

  }


  revisionErrores.classList.add(
    "oculto"
  );


  revisionErrores.innerHTML = "";


  if (
    modoActual === "examen" &&
    incorrectas > 0
  ) {

    btnRevisar.classList.remove(
      "oculto"
    );

  } else {

    btnRevisar.classList.add(
      "oculto"
    );

  }

}


// ============================================================
// REVISAR ERRORES
// ============================================================

btnRevisar.addEventListener(
  "click",
  mostrarErrores
);


function mostrarErrores() {

  const errores =
    respuestasUsuario.filter(
      respuesta =>
        !respuesta.correcta
    );


  revisionErrores.innerHTML =
    `<h3>Revisión de errores</h3>`;


  errores.forEach(
    (respuesta, indice) => {

      const pregunta =
        respuesta.pregunta;


      const letraElegida =
        String.fromCharCode(
          65 + respuesta.seleccionada
        );


      const letraCorrecta =
        String.fromCharCode(
          65 + pregunta.correcta
        );


      const bloque =
        document.createElement("div");


      bloque.className =
        "revision-item";


      bloque.innerHTML = `

        <p class="revision-numero">
          Error ${indice + 1}
        </p>

        <h4>
          ${pregunta.pregunta}
        </h4>

        <p>
          <strong>Tu respuesta:</strong>
          ${letraElegida}.
          ${pregunta.opciones[
            respuesta.seleccionada
          ]}
        </p>

        <p class="revision-correcta">
          <strong>Correcta:</strong>
          ${letraCorrecta}.
          ${pregunta.opciones[
            pregunta.correcta
          ]}
        </p>

        <p>
          <strong>Explicación:</strong>
          ${pregunta.explicacion}
        </p>

        <div class="revision-fija">
          <strong>
            BADBEAR.MED FIJA:
          </strong>

          ${pregunta.fija}
        </div>

      `;


      revisionErrores.appendChild(
        bloque
      );

    }
  );


  revisionErrores.classList.remove(
    "oculto"
  );


  btnRevisar.classList.add(
    "oculto"
  );

}


// ============================================================
// REINICIAR
// ============================================================

btnReiniciar.addEventListener(
  "click",
  reiniciarBanco
);


function reiniciarBanco() {

  pantallaFinal.classList.add(
    "oculto"
  );


  pantallaQuiz.classList.add(
    "oculto"
  );


  if (origenSesion === "examenes") {

  pantallaExamenes.classList.remove(
    "oculto"
  );

  activarNav(navExamenes);

} else {

  pantallaInicio.classList.remove(
    "oculto"
  );

  activarNav(navBanco);

}

  revisionErrores.innerHTML = "";

  revisionErrores.classList.add(
    "oculto"
  );


  actualizarInfoSeleccion();

}
// ============================================================
// NAVEGACIÓN BADBEAR.MED
// ============================================================

const navInicio =
  document.getElementById("nav-inicio");

const navBanco =
  document.getElementById("nav-banco");

  const navExamenes =
  document.getElementById("nav-examenes");

const navTeoria =
  document.getElementById("nav-teoria");

const navProgreso =
  document.getElementById("nav-progreso");

const navTotalPreguntas =
  document.getElementById("nav-total-preguntas");

const pantallaTeoria =
  document.getElementById("pantalla-teoria");

  const pantallaExamenes =
  document.getElementById("pantalla-examenes");

// ============================================================
// TOTAL DE PREGUNTAS
// ============================================================

navTotalPreguntas.textContent =
  questions.length;


// ============================================================
// BOTÓN ACTIVO
// ============================================================

function activarNav(elemento) {

  document
    .querySelectorAll(".nav-item")
    .forEach(item =>
      item.classList.remove("activo")
    );

  elemento.classList.add("activo");

}


// ============================================================
// OCULTAR TODAS LAS PANTALLAS
// ============================================================

function ocultarPantallas() {

  pantallaInicio.classList.add("oculto");

  pantallaQuiz.classList.add("oculto");

  pantallaFinal.classList.add("oculto");

  pantallaExamenes.classList.add("oculto");

  pantallaTeoria.classList.add("oculto");

}


// ============================================================
// INICIO
// ============================================================

navInicio.addEventListener(
  "click",
  () => {

    ocultarPantallas();

    pantallaInicio.classList.remove(
      "oculto"
    );

    activarNav(navInicio);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


// ============================================================
// BANCO
// ============================================================

navBanco.addEventListener(
  "click",
  () => {

    activarNav(navBanco);


    // Si ya estamos resolviendo un banco
if (
  origenSesion === "banco" &&
  preguntasSesion.length > 0 &&
  preguntaActual < preguntasSesion.length
) {

      ocultarPantallas();

      pantallaQuiz.classList.remove(
        "oculto"
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      return;

    }


    // Si todavía no inició un banco
    ocultarPantallas();

    pantallaInicio.classList.remove(
      "oculto"
    );


    const configuracion =
      document.querySelector(
        ".configuracion-banco"
      );


    if (configuracion) {

      configuracion.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }

  }
);

// ============================================================
// EXÁMENES PASADOS
// ============================================================

navExamenes.addEventListener(
  "click",
  () => {

    activarNav(navExamenes);

    actualizarEstadisticasExamenes();

    if (
      origenSesion === "examenes" &&
      preguntasSesion.length > 0 &&
      preguntaActual < preguntasSesion.length
    ) {

      ocultarPantallas();

      pantallaQuiz.classList.remove(
        "oculto"
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      return;
    }

    ocultarPantallas();

    pantallaExamenes.classList.remove(
      "oculto"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);

// ============================================================
// FILTROS DE EXÁMENES PASADOS
// ============================================================

function actualizarFiltroExamenes(
  filtro,
  botonActivo
) {

  filtroExamenesSeleccionado =
    filtro;

  [
    filtroExamenTodas,
    filtroExamenRepetidas,
    filtroExamenImagen
  ].forEach(
    boton =>
      boton.classList.remove(
        "filtro-examen-activo"
      )
  );

  botonActivo.classList.add(
    "filtro-examen-activo"
  );


  let cantidad = 0;

  if (filtro === "todas") {

    cantidad =
      examenesPasados.length;

  }

  else if (
    filtro === "repetidas"
  ) {

    cantidad =
      examenesPasados.filter(
        pregunta =>
          pregunta.repetida >= 5
      ).length;

  }

  else if (
    filtro === "imagen"
  ) {

    cantidad =
      examenesPasados.filter(
        pregunta =>
          Boolean(pregunta.imagen)
      ).length;

  }


  totalExamenesPasados.textContent =
    cantidad;
btnIniciarExamenes.textContent =
  `Iniciar práctica (${cantidad})`;
}


filtroExamenTodas.addEventListener(
  "click",
  () =>
    actualizarFiltroExamenes(
      "todas",
      filtroExamenTodas
    )
);


filtroExamenRepetidas.addEventListener(
  "click",
  () =>
    actualizarFiltroExamenes(
      "repetidas",
      filtroExamenRepetidas
    )
);


filtroExamenImagen.addEventListener(
  "click",
  () =>
    actualizarFiltroExamenes(
      "imagen",
      filtroExamenImagen
    )
);

// ============================================================
// PRACTICAR FALLADAS - EXÁMENES PASADOS
// ============================================================

btnExamenesFalladas.addEventListener(
  "click",
  () => {

const progresoExamenes =
  obtenerProgresoExamenes();


    const preguntasFalladas =
      examenesPasados.filter(
        pregunta =>
          progresoExamenes.preguntas[
            pregunta.id
          ]?.fallada === true
      );


    if (
      preguntasFalladas.length === 0
    ) {

      alert(
        "No tienes preguntas falladas pendientes."
      );

      return;
    }


    origenSesion =
      "examenes";

      tipoSesionExamenes = "falladas";


    preguntasSesion =
      preguntasFalladas.sort(
        (a, b) =>
          b.repetida - a.repetida
      );


    preguntaActual = 0;

    respuestaSeleccionada = null;

    correctas = 0;

    incorrectas = 0;

    preguntaRespondida = false;

    respuestasUsuario = [];

    modoActual =
      "estudio";


    contadorCorrectas.textContent =
      "0";

    contadorIncorrectas.textContent =
      "0";

    porcentajeAvance.textContent =
      "0%";

    notaVigesimal.textContent =
      "— / 20";

    progreso.style.width =
      "0%";


    ocultarPantallas();

    pantallaQuiz.classList.remove(
      "oculto"
    );

    activarNav(
      navExamenes
    );

    mostrarPregunta();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);

// ============================================================
// INICIAR EXÁMENES PASADOS
// ============================================================

btnIniciarExamenes.addEventListener(
  "click",
  () => {

    origenSesion = "examenes";

    tipoSesionExamenes = "normal";

    let preguntasFiltradas =
  [...examenesPasados];


if (
  filtroExamenesSeleccionado ===
  "repetidas"
) {

  preguntasFiltradas =
    preguntasFiltradas.filter(
      pregunta =>
        pregunta.repetida >= 5
    );

}


if (
  filtroExamenesSeleccionado ===
  "imagen"
) {

  preguntasFiltradas =
    preguntasFiltradas.filter(
      pregunta =>
        Boolean(pregunta.imagen)
    );

}


preguntasSesion =
  preguntasFiltradas.sort(
    (a, b) =>
      b.repetida - a.repetida
  );

    preguntaActual = 0;
    respuestaSeleccionada = null;

    correctas = 0;
    incorrectas = 0;

    preguntaRespondida = false;
    respuestasUsuario = [];

    // Exámenes pasados se estudian con explicación inmediata
    modoActual = "estudio";


    contadorCorrectas.textContent = "0";
    contadorIncorrectas.textContent = "0";

    porcentajeAvance.textContent = "0%";

    notaVigesimal.textContent =
      "— / 20";

    progreso.style.width = "0%";


    ocultarPantallas();

    pantallaQuiz.classList.remove(
      "oculto"
    );

    activarNav(
      navExamenes
    );

    mostrarPregunta();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);

// ============================================================
// TEORÍA
// ============================================================

navTeoria.addEventListener(
  "click",
  () => {

    ocultarPantallas();

    pantallaTeoria.classList.remove(
      "oculto"
    );

    activarNav(navTeoria);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


// ============================================================
// PROGRESO
// ============================================================

navProgreso.addEventListener(
  "click",
  () => {

    activarNav(navProgreso);


    // Si estamos en la pantalla final
    if (
      !pantallaFinal.classList.contains(
        "oculto"
      )
    ) {

      pantallaFinal.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      return;

    }


    // Mostrar inicio para ver estadísticas
    ocultarPantallas();

    pantallaInicio.classList.remove(
      "oculto"
    );


    const progresoGlobal =
      document.querySelector(
        ".progreso-global"
      );


    if (progresoGlobal) {

      progresoGlobal.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  }
);
// ============================================================
// BADBEAR.MED
// PROGRESO PERSISTENTE CON LOCALSTORAGE
// ============================================================

const STORAGE_KEY =
  "badbear_med_cirugia_pediatrica_v1";

const STORAGE_KEY_EXAMENES =
  "badbear_med_cirugia_pediatrica_examenes_v1";

// ============================================================
// ELEMENTOS
// ============================================================

const globalRespondidas =
  document.getElementById(
    "global-respondidas"
  );

const globalCorrectas =
  document.getElementById(
    "global-correctas"
  );

const globalRendimiento =
  document.getElementById(
    "global-rendimiento"
  );

const globalNota =
  document.getElementById(
    "global-nota"
  );

const globalFalladas =
  document.getElementById(
    "global-falladas"
  );

const btnPracticarFalladas =
  document.getElementById(
    "btn-practicar-falladas"
  );

const btnBorrarProgreso =
  document.getElementById(
    "btn-borrar-progreso"
  );


// ============================================================
// ESTRUCTURA INICIAL
// ============================================================

function crearProgresoInicial() {

  return {

    respondidas: 0,

    correctas: 0,

    incorrectas: 0,

    falladas: [],

    preguntas: {}

  };

}

// ============================================================
// PROGRESO INDEPENDIENTE - EXÁMENES PASADOS
// ============================================================

function crearProgresoInicialExamenes() {

  return {

    respondidas: 0,

    correctas: 0,

    incorrectas: 0,

    preguntas: {}

  };

}


function obtenerProgresoExamenes() {

  const guardado =
    localStorage.getItem(
      STORAGE_KEY_EXAMENES
    );

  if (!guardado) {

    return crearProgresoInicialExamenes();

  }

  try {

    return JSON.parse(
      guardado
    );

  } catch (error) {

    return crearProgresoInicialExamenes();

  }

}


function guardarProgresoExamenes(
  progreso
) {

  localStorage.setItem(
    STORAGE_KEY_EXAMENES,
    JSON.stringify(progreso)
  );

}

function actualizarEstadisticasExamenes() {

  const progreso =
    obtenerProgresoExamenes();


  estadisticasExamenesCorrectas.textContent =
    progreso.correctas;


  estadisticasExamenesIncorrectas.textContent =
    progreso.incorrectas;


  const total =
    progreso.correctas +
    progreso.incorrectas;


  const porcentaje =
    total > 0
      ? Math.round(
          (progreso.correctas / total) * 100
        )
      : 0;


  estadisticasExamenesPorcentaje.textContent =
    `${porcentaje}%`;
const falladasPendientes =
  examenesPasados.filter(
    pregunta =>
      progreso.preguntas[
        pregunta.id
      ]?.fallada === true
  ).length;


btnExamenesFalladas.textContent =
  `Practicar preguntas falladas (${falladasPendientes})`;

  btnExamenesFalladas.disabled =
  falladasPendientes === 0;
}

function registrarRespuestaExamenes(
  pregunta,
  esCorrecta
) {

  const progreso =
    obtenerProgresoExamenes();


  progreso.respondidas++;


  if (esCorrecta) {

    progreso.correctas++;

  } else {

    progreso.incorrectas++;

  }


  if (
    !progreso.preguntas[
      pregunta.id
    ]
  ) {

    progreso.preguntas[
      pregunta.id
    ] = {

      intentos: 0,

      correctas: 0,

      incorrectas: 0,

      ultimaCorrecta: false,

      fallada: false

    };

  }


  const registro =
    progreso.preguntas[
      pregunta.id
    ];


  registro.intentos++;


  if (esCorrecta) {

    registro.correctas++;

    registro.fallada = false;

  } else {

    registro.incorrectas++;

    registro.fallada = true;

  }


  registro.ultimaCorrecta =
    esCorrecta;


  guardarProgresoExamenes(
    progreso
  );
actualizarEstadisticasExamenes();
}

// ============================================================
// LEER PROGRESO
// ============================================================

function obtenerProgresoGlobal() {

  const guardado =
    localStorage.getItem(
      STORAGE_KEY
    );


  if (!guardado) {

    return crearProgresoInicial();

  }


  try {

    return JSON.parse(
      guardado
    );

  }

  catch (error) {

    return crearProgresoInicial();

  }

}


// ============================================================
// GUARDAR PROGRESO
// ============================================================

function guardarProgresoGlobal(
  progresoGlobal
) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      progresoGlobal
    )
  );

}


// ============================================================
// REGISTRAR RESPUESTA
// ============================================================

function registrarRespuestaGlobal(
  pregunta,
  esCorrecta
) {

  const progresoGlobal =
    obtenerProgresoGlobal();


  progresoGlobal.respondidas++;


  if (esCorrecta) {

    progresoGlobal.correctas++;

  }

  else {

    progresoGlobal.incorrectas++;

  }


  const id =
    String(pregunta.id);


  if (
    !progresoGlobal.preguntas[id]
  ) {

    progresoGlobal.preguntas[id] = {

      intentos: 0,

      correctas: 0,

      incorrectas: 0,

      ultimaCorrecta: false

    };

  }


  const registro =
    progresoGlobal.preguntas[id];


  registro.intentos++;


  if (esCorrecta) {

    registro.correctas++;

    registro.ultimaCorrecta = true;


    progresoGlobal.falladas =
      progresoGlobal.falladas.filter(
        preguntaId =>
          preguntaId !== pregunta.id
      );

  }

  else {

    registro.incorrectas++;

    registro.ultimaCorrecta = false;


    if (
      !progresoGlobal.falladas.includes(
        pregunta.id
      )
    ) {

      progresoGlobal.falladas.push(
        pregunta.id
      );

    }

  }


  guardarProgresoGlobal(
    progresoGlobal
  );


  actualizarPanelProgresoGlobal();

}


// ============================================================
// CAPTURAR RESPUESTAS DEL BANCO
// ============================================================

// ============================================================
// GUARDAR PROGRESO SEGÚN EL ORIGEN DE LA SESIÓN
// ============================================================

btnResponder.addEventListener(
  "click",
  () => {

    if (
      !preguntaRespondida ||
      respuestaSeleccionada === null
    ) {
      return;
    }

    const pregunta =
      preguntasSesion[
        preguntaActual
      ];

    const esCorrecta =
      respuestaSeleccionada ===
      pregunta.correcta;

    if (
      origenSesion === "examenes"
    ) {

      registrarRespuestaExamenes(
        pregunta,
        esCorrecta
      );

      return;
    }

    if (
      origenSesion === "banco"
    ) {

      registrarRespuestaGlobal(
        pregunta,
        esCorrecta
      );

    }

  }
);


// ============================================================
// ACTUALIZAR PANEL
// ============================================================

function actualizarPanelProgresoGlobal() {

  const progresoGlobal =
    obtenerProgresoGlobal();


  globalRespondidas.textContent =
    progresoGlobal.respondidas;


  globalCorrectas.textContent =
    progresoGlobal.correctas;


  globalFalladas.textContent =
    progresoGlobal.falladas.length;


  if (
    progresoGlobal.respondidas === 0
  ) {

    globalRendimiento.textContent =
      "0%";

    globalNota.textContent =
      "— / 20";

  }

  else {

    const rendimiento =
      (
        progresoGlobal.correctas /
        progresoGlobal.respondidas
      ) * 100;


    const nota =
      (
        progresoGlobal.correctas /
        progresoGlobal.respondidas
      ) * 20;


    globalRendimiento.textContent =
      `${Math.round(rendimiento)}%`;


    globalNota.textContent =
      `${nota.toFixed(1)} / 20`;

  }


  if (
    progresoGlobal.falladas.length === 0
  ) {

    btnPracticarFalladas.disabled =
      true;


    btnPracticarFalladas.textContent =
      "No tienes preguntas falladas";

  }

  else {

    btnPracticarFalladas.disabled =
      false;


    btnPracticarFalladas.textContent =
      `Practicar ${progresoGlobal.falladas.length} preguntas falladas`;

  }

}


// ============================================================
// PRACTICAR SOLO FALLADAS
// ============================================================

btnPracticarFalladas.addEventListener(
  "click",
  iniciarPreguntasFalladas
);


function iniciarPreguntasFalladas() {
  origenSesion = "banco";

  const progresoGlobal =
    obtenerProgresoGlobal();


  if (
    progresoGlobal.falladas.length === 0
  ) {

    return;

  }


  preguntasSesion =
    questions.filter(
      pregunta =>
        progresoGlobal.falladas.includes(
          pregunta.id
        )
    );


  preguntasSesion =
    mezclarArray(
      preguntasSesion
    );


  preguntaActual = 0;

  respuestaSeleccionada = null;

  correctas = 0;

  incorrectas = 0;

  preguntaRespondida = false;

  respuestasUsuario = [];


  // Las falladas se practican como modo estudio
  modoActual = "estudio";


  contadorCorrectas.textContent =
    "0";


  contadorIncorrectas.textContent =
    "0";


  porcentajeAvance.textContent =
    "0%";


  notaVigesimal.textContent =
    "— / 20";


  progreso.style.width =
    "0%";


  pantallaInicio.classList.add(
    "oculto"
  );


  pantallaFinal.classList.add(
    "oculto"
  );


  pantallaQuiz.classList.remove(
    "oculto"
  );


  activarNav(
    navBanco
  );


  mostrarPregunta();

}


// ============================================================
// REINICIAR ESTADÍSTICAS
// ============================================================

btnBorrarProgreso.addEventListener(
  "click",
  () => {

    const confirmar =
      confirm(
        "¿Deseas borrar todo tu progreso de Cirugía Pediátrica?"
      );


    if (!confirmar) {

      return;

    }


    localStorage.removeItem(
      STORAGE_KEY
    );


    actualizarPanelProgresoGlobal();

  }
);


// ============================================================
// CARGAR ESTADÍSTICAS AL ABRIR LA WEB
// ============================================================

actualizarPanelProgresoGlobal();
// ============================================================
// BADBEAR.MED
// ESTADÍSTICAS POR TEMA
// ============================================================

const listaEstadisticasTemas =
  document.getElementById(
    "lista-estadisticas-temas"
  );


// ============================================================
// OBTENER ESTADÍSTICAS DE CADA TEMA
// ============================================================

function calcularEstadisticasPorTema() {

  const progresoGlobal =
    obtenerProgresoGlobal();


  const temas = {};


  // ----------------------------------------------------------
  // CREAR TODOS LOS TEMAS DEL BANCO
  // ----------------------------------------------------------

  questions.forEach(
    pregunta => {

      if (!temas[pregunta.tema]) {

        temas[pregunta.tema] = {

          tema: pregunta.tema,

          totalPreguntas: 0,

          preguntasRespondidas: new Set(),

          intentos: 0,

          correctas: 0,

          incorrectas: 0

        };

      }


      temas[
        pregunta.tema
      ].totalPreguntas++;

    }
  );


  // ----------------------------------------------------------
  // LEER RESPUESTAS GUARDADAS
  // ----------------------------------------------------------

  Object.entries(
    progresoGlobal.preguntas
  ).forEach(
    ([id, registro]) => {

      const pregunta =
        questions.find(
          p =>
            String(p.id) ===
            String(id)
        );


      if (!pregunta) {
        return;
      }


      const estadistica =
        temas[pregunta.tema];


      if (!estadistica) {
        return;
      }


      estadistica
        .preguntasRespondidas
        .add(pregunta.id);


      estadistica.intentos +=
        registro.intentos || 0;


      estadistica.correctas +=
        registro.correctas || 0;


      estadistica.incorrectas +=
        registro.incorrectas || 0;

    }
  );


  return Object.values(
    temas
  );

}


// ============================================================
// CLASIFICAR RENDIMIENTO
// ============================================================

function clasificarTema(
  intentos,
  rendimiento
) {

  if (intentos === 0) {

    return {
      texto: "SIN PRACTICAR",
      clase: "estado-sin-practicar"
    };

  }


  if (rendimiento >= 80) {

    return {
      texto: "DOMINADO",
      clase: "estado-dominado"
    };

  }


  if (rendimiento >= 60) {

    return {
      texto: "EN PROGRESO",
      clase: "estado-progreso"
    };

  }


  return {
    texto: "REFORZAR",
    clase: "estado-reforzar"
  };

}


// ============================================================
// MOSTRAR ESTADÍSTICAS
// ============================================================

function actualizarEstadisticasPorTema() {

  if (!listaEstadisticasTemas) {
    return;
  }


  const estadisticas =
    calcularEstadisticasPorTema();


  listaEstadisticasTemas.innerHTML =
    "";


  // ----------------------------------------------------------
  // ORDENAR:
  // primero los que requieren reforzar
  // ----------------------------------------------------------

  estadisticas.sort(
    (a, b) => {

      const rendimientoA =
        a.intentos > 0
          ? a.correctas /
            a.intentos
          : 2;


      const rendimientoB =
        b.intentos > 0
          ? b.correctas /
            b.intentos
          : 2;


      return (
        rendimientoA -
        rendimientoB
      );

    }
  );


  estadisticas.forEach(
    estadistica => {

      const respondidas =
        estadistica
          .preguntasRespondidas
          .size;


      const rendimiento =
        estadistica.intentos > 0

          ? (
              estadistica.correctas /
              estadistica.intentos
            ) * 100

          : 0;


      const nota =
        estadistica.intentos > 0

          ? (
              estadistica.correctas /
              estadistica.intentos
            ) * 20

          : null;


      const estado =
        clasificarTema(
          estadistica.intentos,
          rendimiento
        );


      const cobertura =
        estadistica.totalPreguntas > 0

          ? (
              respondidas /
              estadistica.totalPreguntas
            ) * 100

          : 0;


      const tarjeta =
        document.createElement(
          "div"
        );


      tarjeta.className =
        "tema-estadistica";


      tarjeta.innerHTML = `

        <div class="tema-estadistica-superior">

          <div class="tema-estadistica-nombre">
            ${estadistica.tema}
          </div>

          <span
            class="
              tema-estadistica-estado
              ${estado.clase}
            "
          >
            ${estado.texto}
          </span>

        </div>


        <div class="tema-estadistica-datos">

          <div class="tema-dato">

            <strong>
              ${respondidas}
              /
              ${estadistica.totalPreguntas}
            </strong>

            <span>
              Preguntas
            </span>

          </div>


          <div class="tema-dato">

            <strong>
              ${
                estadistica.intentos > 0
                  ? Math.round(
                      rendimiento
                    ) + "%"
                  : "—"
              }
            </strong>

            <span>
              Rendimiento
            </span>

          </div>


          <div class="tema-dato">

            <strong>
              ${
                nota !== null
                  ? nota.toFixed(1) +
                    " / 20"
                  : "—"
              }
            </strong>

            <span>
              Nota
            </span>

          </div>


          <div class="tema-dato">

            <strong>
              ${estadistica.intentos}
            </strong>

            <span>
              Intentos
            </span>

          </div>

        </div>


        <div
          class="tema-barra"
          title="Cobertura del tema"
        >

          <div
            class="tema-barra-progreso"
            style="
              width:
              ${Math.min(
                cobertura,
                100
              )}%;
            "
          >
          </div>

        </div>

      `;


      listaEstadisticasTemas.appendChild(
        tarjeta
      );

    }
  );

}


// ============================================================
// ACTUALIZAR AUTOMÁTICAMENTE CUANDO RESPONDES
// ============================================================

btnResponder.addEventListener(
  "click",
  () => {

    setTimeout(
      actualizarEstadisticasPorTema,
      0
    );

  }
);


// ============================================================
// ACTUALIZAR DESPUÉS DE BORRAR PROGRESO
// ============================================================

btnBorrarProgreso.addEventListener(
  "click",
  () => {

    setTimeout(
      actualizarEstadisticasPorTema,
      0
    );

  }
);


// ============================================================
// CARGAR AL ABRIR BADBEAR.MED
// ============================================================

actualizarEstadisticasPorTema();
// ============================================================
// LECTOR DE TEORÍA BADBEAR.MED
// ============================================================

const paginaTeoria =
  document.getElementById("pagina-teoria");

const paginaActualTexto =
  document.getElementById("pagina-actual");

const totalPaginasTeoriaTexto =
  document.getElementById("total-paginas-teoria");

const btnPaginaAnterior =
  document.getElementById("btn-pagina-anterior");

const btnPaginaSiguiente =
  document.getElementById("btn-pagina-siguiente");

const botonesIndiceTeoria =
  document.querySelectorAll(".indice-tema");


const TOTAL_PAGINAS_TEORIA = 300;

let paginaTeoriaActual = 1;


// ============================================================
// MOSTRAR UNA PÁGINA
// ============================================================

function mostrarPaginaTeoria(numeroPagina) {

  numeroPagina = Number(numeroPagina);


  if (numeroPagina < 1) {
    numeroPagina = 1;
  }


  if (numeroPagina > TOTAL_PAGINAS_TEORIA) {
    numeroPagina = TOTAL_PAGINAS_TEORIA;
  }


  paginaTeoriaActual =
    numeroPagina;


  const numeroArchivo =
    String(numeroPagina).padStart(
      3,
      "0"
    );


  paginaTeoria.src =
    `assets/teoria/pagina-${numeroArchivo}.webp`;


  paginaTeoria.alt =
    `Página ${numeroPagina} de Cirugía Pediátrica`;


  paginaActualTexto.textContent =
    numeroPagina;


  totalPaginasTeoriaTexto.textContent =
    TOTAL_PAGINAS_TEORIA;


  // Desactivar botones en los extremos

  btnPaginaAnterior.disabled =
    numeroPagina === 1;


  btnPaginaSiguiente.disabled =
    numeroPagina === TOTAL_PAGINAS_TEORIA;


  // Volver arriba de la página

  const visor =
    document.querySelector(
      ".visor-imagen-teoria"
    );


  if (visor) {

    visor.scrollTop = 0;

  }


  actualizarTemaActivo(
    numeroPagina
  );

}


// ============================================================
// BOTÓN ANTERIOR
// ============================================================

btnPaginaAnterior.addEventListener(
  "click",
  () => {

    mostrarPaginaTeoria(
      paginaTeoriaActual - 1
    );

  }
);


// ============================================================
// BOTÓN SIGUIENTE
// ============================================================

btnPaginaSiguiente.addEventListener(
  "click",
  () => {

    mostrarPaginaTeoria(
      paginaTeoriaActual + 1
    );

  }
);


// ============================================================
// ÍNDICE LATERAL
// ============================================================

botonesIndiceTeoria.forEach(
  boton => {

    boton.addEventListener(
      "click",
      () => {

        const pagina =
          Number(
            boton.dataset.page
          );


        mostrarPaginaTeoria(
          pagina
        );

      }
    );

  }
);


// ============================================================
// MARCAR TEMA ACTIVO
// ============================================================

function actualizarTemaActivo(
  pagina
) {

  let botonActivo = null;


  botonesIndiceTeoria.forEach(
    boton => {

      const inicioTema =
        Number(
          boton.dataset.page
        );


      if (inicioTema <= pagina) {

        botonActivo = boton;

      }


      boton.classList.remove(
        "activo"
      );

    }
  );


  if (botonActivo) {

    botonActivo.classList.add(
      "activo"
    );

  }

}


// ============================================================
// INICIAR LECTOR
// ============================================================

mostrarPaginaTeoria(1);
// ============================================================
// PROTECCIÓN VISUAL DE LA BIBLIOTECA BADBEAR.MED
// ============================================================

const visorImagenTeoria =
  document.querySelector(".visor-imagen-teoria");


// Bloquear clic derecho dentro del lector
if (visorImagenTeoria) {

  visorImagenTeoria.addEventListener(
    "contextmenu",
    (evento) => {

      evento.preventDefault();

    }
  );

}


// Bloquear arrastre de la página
if (paginaTeoria) {

  paginaTeoria.addEventListener(
    "dragstart",
    (evento) => {

      evento.preventDefault();

    }
  );

}


// Evitar selección accidental de la página
if (visorImagenTeoria) {

  visorImagenTeoria.addEventListener(
    "selectstart",
    (evento) => {

      evento.preventDefault();

    }
  );

}