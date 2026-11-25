"use strict";
const questions = [
  [
    "Asepsia",
    "¿Qué pareja corresponde a antisépticos para la preparación de la piel?",
    "Yodóforos y clorhexidina",
    "Autoclave y calor seco",
    "Clorhexidina y autoclave",
    "Vapor y calor seco",
    "Los yodóforos y la clorhexidina son agentes químicos usados en piel con formulaciones apropiadas. El autoclave y el calor seco son métodos de esterilización para materiales compatibles.",
    "1"
  ],
  [
    "Asepsia",
    "¿Qué distingue a un antiséptico de un desinfectante de superficies?",
    "Se utiliza sobre tejidos vivos con una formulación apta",
    "Se aplica exclusivamente a instrumental crítico",
    "Garantiza esterilidad de la piel",
    "Es equivalente a un ciclo de vapor",
    "La antisepsia reduce la carga microbiana en tejidos vivos. La desinfección se aplica a objetos o superficies. La piel preparada no se convierte en un tejido estéril.",
    "3"
  ],
  [
    "Asepsia",
    "En un lavado quirúrgico con agua, ¿qué práctica debe corregirse?",
    "Dejar escurrir agua de los codos hacia las manos",
    "Mantener las manos por encima de los codos",
    "Evitar tocar el lavamanos",
    "Realizar higiene de manos después de retirar guantes",
    "Con las manos elevadas, el agua escurre hacia los codos. El flujo en sentido inverso puede recontaminar las manos. Los guantes no sustituyen la higiene de manos.",
    "6"
  ],
  [
    "Asepsia",
    "¿Qué conviene hacer si hay materia orgánica visible antes de la antisepsia?",
    "Retirarla según el protocolo y usar el producto indicado",
    "Asumir que todos los yodóforos mantienen la misma actividad",
    "Duplicar de forma rutinaria la concentración",
    "Sustituir el antiséptico por un desinfectante de superficies",
    "La materia orgánica puede reducir la eficacia de distintos productos. El efecto depende del agente, la formulación y el tiempo de contacto. Por eso la pregunta original no admite una regla universal.",
    "7"
  ],
  [
    "Campo quirúrgico",
    "¿Cuál es la conducta adecuada de un observador no estéril?",
    "Mantenerse fuera del campo estéril y seguir las indicaciones del equipo",
    "Acercarse al campo tras lavarse solamente las manos",
    "Tocar instrumental si lleva guantes de examen",
    "Mover el campo para observar mejor",
    "Lavarse las manos no convierte al observador en integrante estéril. Su ubicación debe proteger el campo y respetar el protocolo del quirófano.",
    "9"
  ],
  [
    "Campo quirúrgico",
    "¿Qué determina principalmente dónde se sitúa el primer ayudante?",
    "El procedimiento, el abordaje y las necesidades de exposición",
    "Una posición fija a la derecha del paciente",
    "Una posición fija en la cabecera",
    "El lado de la mano dominante por sí solo",
    "El ayudante se coloca donde pueda apoyar la exposición y la maniobra sin interferir con el equipo. La pregunta original necesita especificar qué operación se realiza.",
    "1"
  ],
  [
    "Instrumental",
    "¿A qué grupo funcional pertenece el bisturí?",
    "Diéresis",
    "Hemostasia",
    "Síntesis",
    "Exposición",
    "La diéresis es la separación de tejidos por corte o división. Una pinza hemostática sirve para el control del sangrado y un portaagujas para la síntesis.",
    "6"
  ],
  [
    "Instrumental",
    "¿Qué clasificación distingue de manera más completa las funciones del instrumental?",
    "Diéresis, hemostasia, prensión, exposición, síntesis y especiales",
    "Solo diéresis y síntesis",
    "Laparotomía, toracotomía y laparoscopia",
    "Solo corte y coagulación",
    "La clasificación agrupa instrumentos por su uso. Laparotomía y toracotomía son abordajes, no funciones de instrumentos.",
    "4"
  ],
  [
    "Instrumental",
    "¿Cuál de estas acciones sí pertenece a los tiempos quirúrgicos fundamentales?",
    "Hemostasia",
    "Inducción anestésica",
    "Registro de consentimientos",
    "Traslado a recuperación",
    "La hemostasia controla el sangrado durante el acto quirúrgico. La exposición, la disección y la síntesis también forman parte de los esquemas docentes habituales.",
    "7"
  ],
  [
    "Instrumental",
    "¿Cómo se debe retirar una hoja desmontable de bisturí?",
    "Con un dispositivo o instrumental adecuado, siguiendo el protocolo de punzocortantes",
    "Con los dedos si se utilizan dos pares de guantes",
    "Haciendo palanca sobre el campo estéril",
    "Dejando la hoja suelta en una bandeja de circulación",
    "El contacto manual con la hoja expone al personal a cortes. Se prefiere un mecanismo de retiro seguro y el descarte inmediato en un contenedor para punzocortantes.",
    "6"
  ],
  [
    "Suturas y drenajes",
    "¿Qué grupo está formado por suturas no absorbibles?",
    "Seda, nailon y lino",
    "Catgut, poliglactina y ácido poliglicólico",
    "Seda, catgut y poliglactina",
    "Nailon, catgut y ácido poliglicólico",
    "Seda, nailon y lino se clasifican como no absorbibles. Catgut, poliglactina y ácido poliglicólico son absorbibles y difieren en su mecanismo de degradación.",
    "9"
  ],
  [
    "Suturas y drenajes",
    "¿Qué propiedad es deseable en un material de sutura?",
    "Comportamiento predecible para el tejido y el tiempo de soporte requeridos",
    "Máxima reacción tisular",
    "Pérdida inmediata de resistencia en todos los tejidos",
    "El mismo material para toda indicación",
    "Se valora resistencia adecuada, estabilidad del nudo y un comportamiento predecible. El material se elige según la velocidad de cicatrización, el sitio y la contaminación.",
    "6"
  ],
  [
    "Suturas y drenajes",
    "¿Por qué debe diferenciarse un dren Penrose de un Redon?",
    "El Penrose es pasivo y el Redon emplea aspiración en un sistema cerrado",
    "Ambos funcionan siempre mediante succión",
    "El Penrose es exclusivo del tórax",
    "El Redon es un dren en T de la vía biliar",
    "El Penrose facilita la salida pasiva de líquido. El Redon se asocia a succión cerrada. El dren de Kehr tiene forma de T y se asocia a la vía biliar.",
    "4"
  ],
  [
    "Suturas y drenajes",
    "¿En qué debe basarse la orientación de una aguja curva al suturar?",
    "En su curvatura, la trayectoria prevista y el acceso al tejido",
    "En mantenerla siempre paralela a la herida",
    "En imponer siempre un ángulo de 45 grados",
    "En rectificar la curvatura con el portaagujas",
    "La aguja curva se guía siguiendo su arco. La posición en el portaagujas depende de la maniobra y del acceso. Un ángulo fijo respecto a la línea de sutura no describe todas las situaciones.",
    "9"
  ],
  [
    "Heridas y estomas",
    "¿Cómo se clasifica por mecanismo una herida producida por un objeto puntiagudo?",
    "Punzante",
    "Crónica",
    "Contusa",
    "Por mordedura",
    "Punzante describe el mecanismo de la lesión. Aguda y crónica corresponden a la evolución temporal, de modo que una herida puede ser aguda y punzante al mismo tiempo.",
    "2"
  ],
  [
    "Heridas y estomas",
    "¿Qué efecto busca una colostomía de derivación?",
    "Desviar el tránsito fecal para disminuir el paso hacia el colon distal",
    "Descomprimir directamente el estómago",
    "Drenar de forma primaria una hemorragia intestinal",
    "Restituir siempre el tránsito distal de inmediato",
    "La derivación desvía las heces hacia el estoma y reduce el tránsito en el segmento distal. Su finalidad depende de la indicación y del tipo de estoma.",
    "1"
  ],
  [
    "Heridas y estomas",
    "¿Cuál puede ser una finalidad de una gastrostomía?",
    "Nutrición enteral o descompresión gástrica, según la indicación",
    "Suturar el estómago como finalidad principal",
    "Derivar exclusivamente el colon distal",
    "Drenar la vía biliar",
    "Una gastrostomía proporciona acceso al estómago. Según el caso, permite alimentación o salida de contenido para descompresión. La fijación o sutura es parte de la técnica.",
    "1"
  ],
  [
    "Anestesia y perfusión",
    "¿A qué clase ASA corresponde una persona sana sin enfermedad sistémica?",
    "ASA I",
    "ASA II",
    "ASA III",
    "ASA IV",
    "ASA I identifica al paciente sano en la clasificación de estado físico. La categoría describe su condición preanestésica y por sí sola no expresa todo el riesgo del procedimiento.",
    "4"
  ],
  [
    "Anestesia y perfusión",
    "¿Qué modalidades se utilizan en los procedimientos quirúrgicos?",
    "General, local y técnicas neuroaxiales como raquídea o epidural",
    "Únicamente anestesia general",
    "Solo anestesia local y general",
    "Solo anestesia epidural",
    "En cirugía pueden emplearse varias modalidades. La elección depende del procedimiento, el contexto y la evaluación anestésica del paciente.",
    "2"
  ],
  [
    "Anestesia y perfusión",
    "¿Qué representa la presión venosa central?",
    "La presión cercana a la aurícula derecha, expresada respecto a un nivel de referencia",
    "Una medición directa del volumen intravascular total",
    "La presión arterial media",
    "Una prueba aislada y concluyente de respuesta a líquidos",
    "La lectura se relaciona con la presión auricular derecha y depende, entre otros factores, de la ventilación y la función cardíaca. No equivale a una medición directa de la volemia.",
    "2"
  ],
  [
    "Anestesia y perfusión",
    "Según la clasificación clásica de ATLS, ¿qué clase corresponde a una pérdida superior al 40 % del volumen sanguíneo?",
    "Clase IV",
    "Clase I",
    "Clase II",
    "Clase III",
    "En el esquema docente clásico, una pérdida superior al 40 % corresponde a clase IV. En la práctica, los signos vitales y la estimación de pérdidas se interpretan en conjunto.",
    "2"
  ],
  [
    "Anestesia y perfusión",
    "¿Qué cuadro sugiere hipotensión asociada a sepsis que persiste pese a la reanimación inicial?",
    "Choque séptico",
    "Choque cardiogénico por definición",
    "Infección localizada sin disfunción circulatoria",
    "Respuesta inflamatoria sin alteración hemodinámica",
    "La hipotensión persistente en sepsis orienta a choque séptico. La definición Sepsis-3 también requiere vasopresores para sostener una PAM de al menos 65 mmHg y lactato mayor de 2 mmol/L pese a reanimación adecuada.",
    "4"
  ],
  [
    "Anestesia y perfusión",
    "¿Qué par de causas sí corresponde típicamente a choque cardiogénico?",
    "Infarto extenso y arritmia grave",
    "Hemorragia y deshidratación",
    "Anafilaxia y choque neurógeno",
    "Sepsis y anafilaxia",
    "El choque cardiogénico se debe a una falla primaria de la bomba. El ítem original de exclusión es ambiguo porque incluye más de una causa clásicamente distributiva.",
    "5"
  ],
  [
    "Asepsia",
    "¿Qué debe hacerse con un instrumento crítico que tolera calor y humedad?",
    "Esterilizarlo con un ciclo de vapor validado tras la limpieza",
    "Aplicarle un antiséptico cutáneo y secarlo",
    "Desinfectarlo con alcohol como proceso final",
    "Enjuagarlo y guardarlo si luce limpio",
    "Los artículos críticos penetran tejidos estériles y deben esterilizarse. El vapor es un método preferido cuando el material es compatible. La limpieza previa y el ciclo validado son esenciales.",
    "15"
  ],
  [
    "Campo quirúrgico",
    "Tras una exposición percutánea a sangre, ¿qué dato es decisivo para evaluar la protección del trabajador frente al VHB?",
    "Vacunación y respuesta anti-HBs documentada",
    "El grupo sanguíneo del trabajador",
    "El color de los guantes utilizados",
    "El tiempo transcurrido desde la última cirugía del paciente",
    "La evaluación depende del estado de la fuente y de si el trabajador completó la vacunación y tiene una respuesta protectora documentada. El cuestionario agrupa hepatitis B y C, pero su riesgo y manejo difieren.",
    "14"
  ],
  [
    "Instrumental",
    "¿Qué debe evitarse al intentar controlar un sangrado de un vaso cuya anatomía aún no se ve?",
    "Pinzar a ciegas",
    "Pedir ayuda y mejorar la exposición",
    "Identificar el origen antes del control definitivo",
    "Aplicar una medida temporal apropiada al contexto",
    "La hemostasia exige identificar la fuente y proteger estructuras vecinas. Pinzar a ciegas puede lesionar vasos, nervios u otros tejidos. La pregunta original se reformuló para evaluar este principio.",
    "4"
  ],
  [
    "Heridas y estomas",
    "¿Cómo debe interpretarse una distensión intestinal marcada antes de una posible laparoscopia?",
    "Aumenta la dificultad y el riesgo, por lo que el abordaje se individualiza",
    "Garantiza una laparoscopia más segura",
    "Obliga a operar por laparoscopia en todos los casos",
    "Siempre tiene el mismo efecto que una adherencia única",
    "La distensión puede reducir el espacio de trabajo y dificultar el acceso seguro. La decisión depende del caso y de la experiencia del equipo. La categoría de contraindicación absoluta del examen se reformuló para evitar generalizar.",
    "11"
  ],
  [
    "Anestesia y perfusión",
    "¿Cuál es una indicación habitual de traqueostomía en cuidados críticos?",
    "Necesidad prevista de ventilación mecánica prolongada",
    "Tos leve con ventilación espontánea adecuada",
    "Faringitis sin compromiso respiratorio",
    "Intubación breve sin otros factores",
    "La ventilación prolongada es una indicación reconocida. La decisión y el momento se individualizan según el cuadro, los objetivos asistenciales y la evaluación del equipo.",
    "17"
  ],
  [
    "Anestesia y perfusión",
    "¿Qué error debe evitarse al comparar dos lecturas de presión venosa central?",
    "Comparar directamente cifras expresadas en cm de agua y mmHg",
    "Revisar cómo se calibró el transductor",
    "Considerar el efecto de la ventilación",
    "Interpretar la cifra junto con los datos clínicos",
    "Las unidades representan escalas distintas. La presión de 1 mmHg equivale aproximadamente a 1,36 cm de agua. Las condiciones de medición también afectan la lectura, por lo que los rangos superpuestos del examen no permiten una clave inequívoca.",
    "14"
  ],
  [
    "Anestesia y perfusión",
    "¿Qué mecanismo explica el choque hipovolémico tras una hemorragia importante?",
    "Pérdida de volumen circulante y menor retorno venoso",
    "Falla primaria de bomba sin pérdida de volumen",
    "Vasodilatación aislada de causa alérgica",
    "Obstrucción al llenado cardíaco por taponamiento",
    "La hemorragia reduce la precarga y puede comprometer el gasto cardíaco. El mecanismo difiere de los choques cardiogénico, distributivo y obstructivo.",
    "16"
  ]
];
const theory = {
  "Asepsia": "clases/u4-c1-asepsia-antisepsia.html",
  "Campo quirúrgico": "clases/u4-c3-preparacion-campo-quirurgico.html",
  "Instrumental": "clases/u4-c5-tiempos-operatorios-instrumental.html",
  "Suturas y drenajes": "clases/u4-c5-tiempos-operatorios-instrumental.html",
  "Heridas y estomas": "clases/u5-c1-cicatrizacion-injertos.html",
  "Anestesia y perfusión": "clases/u2-t01-conceptos-basicos-anestesia.html"
};

const get = id => document.getElementById(id);
const topicSelect = get("topic");
const answers = new Map();
let active = questions;
let index = 0;

for (const topic of new Set(questions.map(question => question[0]))) {
  topicSelect.add(new Option(topic, topic));
}

function render() {
  const question = active[index];
  const [, title, ...options] = question;
  const correct = options[0];
  const rotated = options.slice(0, 4);
  const shift = questions.indexOf(question) % rotated.length;
  rotated.push(...rotated.splice(0, shift));

  const legend = document.createElement("legend");
  legend.textContent = title;
  const choices = get("choices");
  choices.replaceChildren(legend);
  const saved = answers.get(question);

  for (const option of rotated) {
    const label = document.createElement("label");
    label.className = "choice";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.required = true;
    radio.value = option;
    radio.checked = saved === option;
    label.append(radio, option);
    if (saved !== undefined) {
      const verdict = document.createElement("strong");
      verdict.textContent = option === correct ? "Correcta" : "Incorrecta";
      label.append(verdict);
    }
    choices.append(label);
  }

  get("progress").textContent = `Pregunta ${index + 1} de ${active.length} · ${active.filter(item => answers.has(item)).length} respondidas`;
  get("back").disabled = index === 0;
  get("next").disabled = index === active.length - 1;
  const feedback = get("feedback");
  feedback.replaceChildren();
  if (saved !== undefined) {
    const result = document.createElement("strong");
    result.textContent = saved === correct ? "Correcta" : "Incorrecta";
    const answerKey = document.createElement("p");
    answerKey.textContent = `Respuesta correcta: ${correct}`;
    const rationale = document.createElement("h3");
    rationale.textContent = "BADBEAR.FIJAS · Fundamento";
    const explanation = document.createElement("p");
    explanation.textContent = options[4];
    const link = document.createElement("a");
    link.href = theory[question[0]];
    link.textContent = "Repasar teoría relacionada";
    const source = document.createElement("p");
    source.textContent = `Material original · página ${options[5]}`;
    feedback.append(result, answerKey, rationale, explanation, link, source);
  }
}

get("quiz").addEventListener("submit", event => {
  event.preventDefault();
  answers.set(active[index], new FormData(event.currentTarget).get("answer"));
  render();
});
topicSelect.addEventListener("change", () => {
  active = topicSelect.value ? questions.filter(question => question[0] === topicSelect.value) : questions;
  index = 0;
  render();
});
get("back").addEventListener("click", () => { index -= 1; render(); });
get("next").addEventListener("click", () => { index += 1; render(); });
render();

const totalPages = 20;
const pageImage = get("pdf-page");
const pdfStatus = get("pdf-status");
const viewer = get("pdf-view");
const openPdf = get("open-pdf");
let page = 1;
let loadingPage;

function showPage() {
  loadingPage?.abort();
  const request = new AbortController();
  loadingPage = request;
  const current = page;
  get("pdf-back").disabled = page === 1;
  get("pdf-next").disabled = page === totalPages;
  pageImage.hidden = true;
  pdfStatus.textContent = `Cargando página ${page} de ${totalPages}…`;
  const asset = `media/banqueoreal-tec-qx/p-${String(page).padStart(2, "0")}.jpg`;
  fetch(asset, {signal: request.signal}).then(response => {
    if (!response.ok || !response.headers.get("Content-Type")?.startsWith("image/jpeg")) {
      throw new Error("Página no disponible");
    }
    if (request.signal.aborted) return;
    pageImage.onload = () => {
      pageImage.hidden = false;
      pdfStatus.textContent = `Página ${current} de ${totalPages}`;
    };
    pageImage.onerror = () => { pdfStatus.textContent = "No se pudo mostrar esta página del material."; };
    pageImage.alt = `Página ${current} del examen original de Técnicas Quirúrgicas`;
    pageImage.src = asset;
  }).catch(() => {
    if (!request.signal.aborted) pdfStatus.textContent = "El material original aún no está disponible.";
  });
}
openPdf.addEventListener("click", () => {
  viewer.hidden = !viewer.hidden;
  openPdf.setAttribute("aria-expanded", String(!viewer.hidden));
  if (!viewer.hidden) showPage();
});
get("pdf-back").addEventListener("click", () => { page -= 1; showPage(); });
get("pdf-next").addEventListener("click", () => { page += 1; showPage(); });
