// ============================================================
// BADBEAR.MED
// CIRUGÍA PEDIÁTRICA
// EXÁMENES PASADOS DEPURADOS
// ============================================================

// Banco independiente de las 400 preguntas principales.
//
// Las respuestas NO dependen de las claves marcadas
// en los exámenes originales.
//
// Las preguntas repetidas fueron agrupadas para evitar
// duplicados y corregidas por BADBEAR.MED.

// ============================================================

const examenesPasados = [

  // ==========================================================
  // 8 APARICIONES
  // ==========================================================

  {
    id: "EP-001",
    tema: "Onfalocele y gastrosquisis",
    dificultad: "Muy frecuente",
    repetida: 8,

    pregunta:
      "¿Cuál es el principal método para el diagnóstico prenatal de onfalocele y gastrosquisis?",

    opciones: [
      "Radiografía abdominal fetal",
      "Ecografía prenatal",
      "Tomografía computarizada",
      "Radiografía simple de abdomen materno",
      "Endoscopía fetal"
    ],

    correcta: 1,

    explicacion:
      "El diagnóstico prenatal de los defectos de la pared abdominal se realiza fundamentalmente mediante ecografía fetal, que permite identificar la exteriorización de las vísceras y su relación con el cordón umbilical.",

    fija:
      "DEFECTO DE PARED ABDOMINAL FETAL → ECOGRAFÍA PRENATAL."
  },


  // ==========================================================
  // 7 APARICIONES
  // ==========================================================

  {
    id: "EP-002",
    tema: "Estenosis hipertrófica del píloro",
    dificultad: "Muy frecuente",
    repetida: 7,

    pregunta:
      "¿En qué periodo suele presentarse la estenosis hipertrófica del píloro?",

    opciones: [
      "En las primeras 24 horas de vida",
      "Principalmente entre la 2.ª y 4.ª semana de vida",
      "Entre los 3 y 6 meses",
      "Después del primer año",
      "Exclusivamente durante el periodo neonatal inmediato"
    ],

    correcta: 1,

    explicacion:
      "La estenosis hipertrófica del píloro suele comenzar hacia el final de la segunda semana, se hace especialmente evidente alrededor de la tercera semana y se presenta típicamente entre la segunda y cuarta semana de vida.",

    fija:
      "VARÓN + PRIMOGÉNITO + 2.ª–4.ª SEMANA + VÓMITO EN PROYECTIL NO BILIOSO."
  },

  {
    id: "EP-003",
    tema: "Hernia inguinal pediátrica",
    dificultad: "Muy frecuente",
    repetida: 7,

    pregunta:
      "¿Cuál es el tipo de hernia inguinal predominante en pediatría?",

    opciones: [
      "Directa",
      "Indirecta",
      "Femoral",
      "Incisional",
      "Epigástrica"
    ],

    correcta: 1,

    explicacion:
      "En pediatría predomina claramente la hernia inguinal indirecta. Su base anatómica es la persistencia del conducto peritoneovaginal.",

    fija:
      "HERNIA INGUINAL PEDIÁTRICA = INDIRECTA + CONDUCTO PERITONEOVAGINAL PERSISTENTE."
  },

  {
    id: "EP-004",
    tema: "Colelitiasis pediátrica",
    dificultad: "Muy frecuente",
    repetida: 7,

    pregunta:
      "¿Cuál es el estudio de imagen inicial de elección ante sospecha de colelitiasis en un paciente pediátrico?",

    opciones: [
      "Radiografía simple de abdomen",
      "Tomografía abdominal",
      "Ecografía abdominal",
      "Resonancia magnética",
      "Colangiografía intraoperatoria"
    ],

    correcta: 2,

    explicacion:
      "La ecografía abdominal es el estudio inicial de elección para identificar cálculos vesiculares, evaluar la pared de la vesícula y valorar la vía biliar.",

    fija:
      "COLELITIASIS PEDIÁTRICA → PRIMER ESTUDIO: ECOGRAFÍA ABDOMINAL."
  },


  // ==========================================================
  // 6 APARICIONES
  // ==========================================================

  {
    id: "EP-005",
    tema: "Gastrosquisis",
    dificultad: "Muy frecuente",
    repetida: 6,

    pregunta:
      "Respecto a la gastrosquisis, ¿cuál de las siguientes afirmaciones es correcta?",

    opciones: [
      "Se asocia característicamente a síndromes genéticos",
      "Las vísceras se encuentran cubiertas por un saco",
      "No se asocia característicamente a síndromes genéticos",
      "El cordón umbilical se inserta sobre el saco",
      "El defecto siempre se encuentra en la línea media"
    ],

    correcta: 2,

    explicacion:
      "La gastrosquisis suele presentarse como un defecto lateral al cordón umbilical, generalmente a la derecha, sin saco de cobertura. Las asociaciones sindrómicas no son características.",

    fija:
      "GASTROSQUISIS = DERECHA DEL CORDÓN + SIN SACO + INTESTINO EXPUESTO."
  },


  // ==========================================================
  // 5 APARICIONES
  // ==========================================================

  {
    id: "EP-006",
    tema: "Atresia esofágica",
    dificultad: "Muy frecuente",
    repetida: 5,

    pregunta:
      "Observa la radiografía. ¿Cuál es el diagnóstico más probable?",

    imagen:
      "assets/images/examenes-pasados/atresia-esofagica-sonda.webp",

    altImagen:
      "Radiografía neonatal con sonda enrollada en el fondo de saco esofágico proximal",

    opciones: [
      "Atresia duodenal",
      "Estenosis hipertrófica del píloro",
      "Atresia esofágica",
      "Hernia diafragmática congénita",
      "Invaginación intestinal"
    ],

    correcta: 2,

    explicacion:
      "La imposibilidad de progresar una sonda orogástrica o nasogástrica y su visualización enrollada en el fondo de saco esofágico proximal son hallazgos característicos de atresia esofágica.",

    fija:
      "SONDA QUE NO PROGRESA Y SE ENROLLA EN EL CABO PROXIMAL → ATRESIA ESOFÁGICA."
  },

  {
    id: "EP-007",
    tema: "Atresia esofágica",
    dificultad: "Muy frecuente",
    repetida: 5,

    pregunta:
      "¿Cuál es la variante anatómica más frecuente de atresia esofágica?",

    imagen:
      "assets/images/examenes-pasados/tipos-atresia-esofagica.webp",

    altImagen:
      "Esquema de los principales tipos anatómicos de atresia esofágica y fístula traqueoesofágica",

    opciones: [
      "Atresia esofágica sin fístula",
      "Fístula traqueoesofágica aislada",
      "Atresia esofágica con fístula traqueoesofágica distal",
      "Atresia esofágica con fístula proximal",
      "Atresia esofágica con doble fístula"
    ],

    correcta: 2,

    explicacion:
      "La forma más frecuente es la atresia esofágica asociada a fístula traqueoesofágica distal, que representa aproximadamente 85–87 % de los casos.",

    fija:
      "ATRESIA ESOFÁGICA + FÍSTULA DISTAL = FORMA MÁS FRECUENTE."
  },

  {
    id: "EP-008",
    tema: "Hernia diafragmática congénita",
    dificultad: "Muy frecuente",
    repetida: 5,

    pregunta:
      "¿Cuál de los siguientes hallazgos es más característico de una hernia diafragmática congénita posterolateral de Bochdalek?",

    opciones: [
      "Abdomen distendido y ausencia de dificultad respiratoria",
      "Dificultad respiratoria, abdomen excavado y desplazamiento mediastínico",
      "Vómitos en proyectil con oliva pilórica",
      "Masa abdominal en forma de salchicha",
      "Signo de doble burbuja"
    ],

    correcta: 1,

    explicacion:
      "La hernia de Bochdalek suele producir dificultad respiratoria neonatal por hipoplasia y compresión pulmonar. El abdomen puede verse excavado o escafoide y las vísceras intratorácicas desplazan el mediastino hacia el lado contrario.",

    fija:
      "NEONATO + DISTRÉS RESPIRATORIO + ABDOMEN ESCAFOIDE → PENSAR EN HERNIA DIAFRAGMÁTICA."
  },


  // ==========================================================
  // 4 APARICIONES
  // ==========================================================

  {
    id: "EP-009",
    tema: "Atresia duodenal",
    dificultad: "Frecuente",
    repetida: 4,

    pregunta:
      "Observa la radiografía. ¿Cuál es el diagnóstico más probable?",

    imagen:
      "assets/images/examenes-pasados/doble-burbuja.webp",

    altImagen:
      "Radiografía abdominal neonatal con signo de doble burbuja",

    opciones: [
      "Atresia yeyunoileal",
      "Estenosis hipertrófica del píloro",
      "Malrotación intestinal",
      "Íleo meconial",
      "Atresia duodenal"
    ],

    correcta: 4,

    explicacion:
      "El signo de doble burbuja corresponde a la distensión del estómago y del duodeno proximal. Es un hallazgo radiológico clásico de la atresia duodenal.",

    fija:
      "DOBLE BURBUJA + AUSENCIA DE GAS DISTAL → ATRESIA DUODENAL."
  },

  {
    id: "EP-010",
    tema: "Apendicitis aguda",
    dificultad: "Frecuente",
    repetida: 4,

    pregunta:
      "¿Cuál es la causa más frecuente de abdomen agudo quirúrgico en el niño en edad escolar?",

    opciones: [
      "Invaginación intestinal",
      "Divertículo de Meckel",
      "Colecistitis aguda",
      "Apendicitis aguda",
      "Pancreatitis aguda"
    ],

    correcta: 3,

    explicacion:
      "La apendicitis aguda constituye una de las causas más importantes y frecuentes de cirugía abdominal de emergencia en el niño, especialmente durante la edad escolar.",

    fija:
      "ESCOLAR + DOLOR PERIUMBILICAL QUE MIGRA A FOSA ILÍACA DERECHA → APENDICITIS."
  },

  {
    id: "EP-011",
    tema: "Invaginación intestinal",
    dificultad: "Frecuente",
    repetida: 4,

    pregunta:
      "En un niño con invaginación intestinal, ¿qué hallazgo contraindica intentar reducción mediante enema y obliga a valorar manejo quirúrgico?",

    opciones: [
      "Dolor abdominal tipo cólico",
      "Signo de la diana en ecografía",
      "Signos de irritación peritoneal",
      "Edad menor de un año",
      "Masa abdominal palpable"
    ],

    correcta: 2,

    explicacion:
      "La reducción mediante enema puede utilizarse en pacientes estables y sin signos de perforación o sufrimiento intestinal avanzado. La presencia de irritación peritoneal, perforación, neumoperitoneo o compromiso intestinal importante obliga a manejo quirúrgico.",

    fija:
      "INVAGINACIÓN + PERITONISMO/PERFORACIÓN → NO ENEMA → CIRUGÍA."
  },


  // ==========================================================
  // 3 APARICIONES
  // ==========================================================

  {
    id: "EP-012",
    tema: "Malformación anorrectal",
    dificultad: "Frecuente",
    repetida: 3,

    pregunta:
      "¿Cuál es el esquema terapéutico habitual para una malformación anorrectal alta?",

    opciones: [
      "Dilataciones anales como único tratamiento",
      "Anoplastia inmediata sin colostomía",
      "Colostomía, corrección definitiva mediante descenso anorectal y posterior cierre de colostomía",
      "Tratamiento exclusivamente conservador",
      "Resección intestinal amplia"
    ],

    correcta: 2,

    explicacion:
      "Las malformaciones anorrectales altas o intermedias suelen requerir tratamiento por etapas: inicialmente colostomía, posteriormente corrección definitiva mediante descenso anorectal y finalmente cierre de la colostomía después de asegurar una adecuada permeabilidad anal.",

    fija:
      "MAR ALTA → COLOSTOMÍA → PSARP/PEÑA → DILATACIONES → CIERRE DE COLOSTOMÍA."
  },

  {
    id: "EP-013",
    tema: "Invaginación intestinal",
    dificultad: "Frecuente",
    repetida: 3,

    pregunta:
      "¿Cuál de los siguientes NO corresponde a un hallazgo clásico de invaginación intestinal?",

    opciones: [
      "Masa abdominal en forma de salchicha",
      "Heces en jalea de grosella",
      "Signo de Dance",
      "Signo de Murphy",
      "Dolor abdominal paroxístico"
    ],

    correcta: 3,

    explicacion:
      "La invaginación puede presentar dolor abdominal paroxístico, masa abdominal alargada, heces con sangre y moco y signo de Dance. El signo de Murphy corresponde a patología biliar.",

    fija:
      "INVAGINACIÓN: DOLOR CÓLICO + MASA EN SALCHICHA + DANCE + JALEA DE GROSELLA."
  },

  {
    id: "EP-014",
    tema: "Estenosis hipertrófica del píloro",
    dificultad: "Frecuente",
    repetida: 3,

    pregunta:
      "¿Cuál es la alteración ácido-base clásica de la estenosis hipertrófica del píloro?",

    opciones: [
      "Acidosis metabólica hiperclorémica",
      "Acidosis respiratoria",
      "Alcalosis metabólica hipoclorémica",
      "Alcalosis respiratoria",
      "Acidosis metabólica con hiperpotasemia"
    ],

    correcta: 2,

    explicacion:
      "Los vómitos persistentes producen pérdida de ácido clorhídrico gástrico, generando clásicamente alcalosis metabólica hipoclorémica.",

    fija:
      "EHP + VÓMITOS PERSISTENTES → ALCALOSIS METABÓLICA HIPOCLORÉMICA."
  },

  {
    id: "EP-015",
    tema: "Hernia umbilical e hidrocele",
    dificultad: "Frecuente",
    repetida: 3,

    pregunta:
      "Observa la imagen clínica. ¿Cuál es el diagnóstico más probable?",

    imagen:
      "assets/images/examenes-pasados/hernia-umbilical-hidrocele.webp",

    altImagen:
      "Imagen clínica pediátrica con hernia umbilical y aumento de volumen escrotal bilateral",

    opciones: [
      "Hernia inguinal bilateral",
      "Gastrosquisis e hidrocele",
      "Onfalocele y hernia inguinal",
      "Hernia umbilical e hidrocele bilateral",
      "Hernia umbilical y criptorquidia bilateral"
    ],

    correcta: 3,

    explicacion:
      "La imagen muestra una protrusión umbilical compatible con hernia umbilical y aumento de volumen escrotal bilateral compatible con hidrocele.",

    fija:
      "AUMENTO ESCROTAL TRANSLUMINABLE → HIDROCELE."
  },

  {
    id: "EP-016",
    tema: "Divertículo de Meckel",
    dificultad: "Frecuente",
    repetida: 3,

    pregunta:
      "Respecto al divertículo de Meckel, ¿cuál de las siguientes afirmaciones es correcta?",

    opciones: [
      "Se encuentra típicamente en el borde mesentérico del colon",
      "Puede contener mucosa gástrica ectópica",
      "Nunca produce hemorragia digestiva",
      "No puede actuar como punto guía de invaginación",
      "Es una lesión adquirida"
    ],

    correcta: 1,

    explicacion:
      "El divertículo de Meckel es una anomalía congénita del intestino delgado y puede contener tejido ectópico, especialmente mucosa gástrica. Esta mucosa puede producir ulceración y hemorragia.",

    fija:
      "MECKEL → ÍLEON + BORDE ANTIMESENTÉRICO + POSIBLE MUCOSA GÁSTRICA ECTÓPICA."
  },


  // ==========================================================
  // 2 APARICIONES
  // ==========================================================

  {
    id: "EP-017",
    tema: "Atresia esofágica",
    dificultad: "Repetida",
    repetida: 2,

    pregunta:
      "¿Cuál es la presentación clínica que debe hacer sospechar atresia esofágica en un recién nacido?",

    opciones: [
      "Vómito en proyectil no bilioso aislado",
      "Sialorrea, episodios de cianosis y dificultad para progresar una sonda al estómago",
      "Ictericia y hepatomegalia",
      "Masa abdominal palpable",
      "Diarrea sanguinolenta"
    ],

    correcta: 1,

    explicacion:
      "La atresia esofágica suele manifestarse con sialorrea excesiva, tos, atragantamiento o cianosis durante la alimentación y dificultad o imposibilidad para progresar una sonda orogástrica o nasogástrica.",

    fija:
      "SIALORREA + CIANOSIS + SONDA QUE NO PASA → ATRESIA ESOFÁGICA."
  },

  {
    id: "EP-018",
    tema: "Invaginación intestinal",
    dificultad: "Repetida",
    repetida: 2,

    pregunta:
      "¿Qué hallazgo ecográfico es característico de la invaginación intestinal?",

    opciones: [
      "Signo de doble burbuja",
      "Signo de la diana o escarapela",
      "Signo del lápiz",
      "Signo del menisco",
      "Signo de la silueta"
    ],

    correcta: 1,

    explicacion:
      "En el corte transversal de la invaginación intestinal, la ecografía puede mostrar imágenes concéntricas conocidas como signo de la diana, escarapela o cockade.",

    fija:
      "ECOGRAFÍA + DIANA/ESCARAPELA/COCKADE → INVAGINACIÓN."
  },

  {
    id: "EP-019",
    tema: "Defectos de pared abdominal",
    dificultad: "Repetida",
    repetida: 2,

    pregunta:
      "¿Cuál es la conducta inicial adecuada ante un recién nacido con un defecto congénito de la pared abdominal?",

    opciones: [
      "Iniciar alimentación oral inmediatamente",
      "Intentar introducir las vísceras a presión",
      "Proteger las vísceras, evitar pérdida de calor, descomprimir el tubo digestivo, obtener acceso venoso y estabilizar al paciente",
      "Enviar al domicilio para observación",
      "Realizar colon por enema"
    ],

    correcta: 2,

    explicacion:
      "La prioridad inicial es proteger las vísceras expuestas, disminuir las pérdidas de calor y líquidos, realizar descompresión gastrointestinal, iniciar fluidoterapia y estabilizar al recién nacido antes del tratamiento quirúrgico.",

    fija:
      "PARED ABDOMINAL ABIERTA → PROTEGER + CALOR + SONDA + VÍA EV + ESTABILIZAR."
  },

  {
    id: "EP-020",
    tema: "Divertículo de Meckel",
    dificultad: "Repetida",
    repetida: 2,

    pregunta:
      "¿Dónde se localiza típicamente el divertículo de Meckel?",

    opciones: [
      "Borde mesentérico del yeyuno",
      "Borde antimesentérico del íleon",
      "Ciego",
      "Colon ascendente",
      "Duodeno proximal"
    ],

    correcta: 1,

    explicacion:
      "El divertículo de Meckel se origina en el borde antimesentérico del íleon y corresponde a un remanente del conducto onfalomesentérico.",

    fija:
      "MECKEL = BORDE ANTIMESENTÉRICO DEL ÍLEON."
  },

  {
    id: "EP-021",
    tema: "Estenosis hipertrófica del píloro",
    dificultad: "Repetida",
    repetida: 2,

    pregunta:
      "El denominado signo de 'punta de lápiz' observado en un estudio contrastado del tracto gastrointestinal superior orienta principalmente a:",

    opciones: [
      "Atresia esofágica",
      "Atresia duodenal",
      "Estenosis hipertrófica del píloro",
      "Invaginación intestinal",
      "Hernia diafragmática"
    ],

    correcta: 2,

    explicacion:
      "El estrechamiento y elongación del canal pilórico puede generar una imagen contrastada fina y alargada compatible con estenosis hipertrófica del píloro. Actualmente la ecografía es el método diagnóstico principal.",

    fija:
      "LA EHP SE CONFIRMA PRINCIPALMENTE CON ECOGRAFÍA."
  },
    // ==========================================================
  // APARICIÓN ÚNICA - CONCEPTOS ÚTILES DEL EXAMEN
  // ==========================================================

  {
    id: "EP-022",
    tema: "Obstrucción intestinal",
    dificultad: "Examen pasado",
    repetida: 1,

    pregunta:
      "Ante la sospecha de obstrucción intestinal en un paciente pediátrico, ¿cuál es el estudio de imagen inicial más útil?",

    opciones: [
      "Resonancia magnética abdominal",
      "Colonoscopía",
      "Radiografía simple de abdomen",
      "Angiografía",
      "Gammagrafía"
    ],

    correcta: 2,

    explicacion:
      "La radiografía simple de abdomen permite evaluar dilatación de asas, distribución del gas y presencia de niveles hidroaéreos, por lo que constituye un estudio inicial fundamental ante sospecha de obstrucción intestinal.",

    fija:
      "OBSTRUCCIÓN INTESTINAL → PRIMER ESTUDIO: RADIOGRAFÍA SIMPLE DE ABDOMEN."
  },

  {
    id: "EP-023",
    tema: "Atresia esofágica",
    dificultad: "Examen pasado",
    repetida: 1,

    pregunta:
      "En un recién nacido con atresia esofágica, la presencia de gas en el abdomen sugiere principalmente:",

    opciones: [
      "Atresia esofágica pura sin fístula",
      "Fístula traqueoesofágica distal",
      "Fístula traqueoesofágica proximal aislada",
      "Atresia duodenal asociada",
      "Estenosis hipertrófica del píloro"
    ],

    correcta: 1,

    explicacion:
      "Cuando existe una fístula traqueoesofágica distal, el aire procedente de la vía respiratoria puede pasar hacia el tubo digestivo, produciendo gas en estómago e intestino.",

    fija:
      "ATRESIA ESOFÁGICA + GAS ABDOMINAL → PENSAR EN FÍSTULA DISTAL."
  },

  {
    id: "EP-024",
    tema: "Invaginación intestinal",
    dificultad: "Examen pasado",
    repetida: 1,

    pregunta:
      "En un niño mayor o con episodios recurrentes de invaginación intestinal, ¿qué conducta diagnóstica adquiere especial importancia?",

    opciones: [
      "Buscar un punto guía anatómico",
      "Diagnosticar siempre invaginación idiopática",
      "Realizar piloromiotomía",
      "Buscar exclusivamente enfermedad biliar",
      "Indicar apendicectomía profiláctica"
    ],

    correcta: 0,

    explicacion:
      "En niños mayores o cuando la invaginación es recurrente debe considerarse la existencia de un punto guía patológico, como divertículo de Meckel, pólipo, duplicación intestinal o linfoma.",

    fija:
      "INVAGINACIÓN EN NIÑO MAYOR O RECURRENTE → BUSCAR PUNTO GUÍA."
  },

  {
    id: "EP-025",
    tema: "Invaginación intestinal",
    dificultad: "Examen pasado",
    repetida: 1,

    pregunta:
      "Durante la reducción quirúrgica de una invaginación intestinal, ¿cuál es la maniobra correcta?",

    opciones: [
      "Traccionar enérgicamente el segmento invaginado",
      "Realizar reducción retrógrada mediante presión suave",
      "Resecar siempre todo el colon",
      "Realizar únicamente una gastrostomía",
      "No intentar reducción aun si el intestino es viable"
    ],

    correcta: 1,

    explicacion:
      "La reducción quirúrgica debe realizarse mediante presión manual suave y progresiva desde distal hacia proximal. Debe evitarse la tracción porque aumenta el riesgo de lesión intestinal.",

    fija:
      "INVAGINACIÓN QUIRÚRGICA → EMPUJAR, NO TRACCIONAR."
  },

  {
    id: "EP-026",
    tema: "Invaginación intestinal",
    dificultad: "Examen pasado",
    repetida: 1,

    pregunta:
      "Si durante la cirugía por invaginación intestinal se identifica un segmento intestinal necrótico, ¿cuál es la conducta indicada?",

    opciones: [
      "Dejar el intestino necrótico y observar",
      "Realizar únicamente reducción manual",
      "Resección del segmento comprometido y anastomosis intestinal",
      "Realizar piloromiotomía",
      "Administrar contraste baritado"
    ],

    correcta: 2,

    explicacion:
      "Cuando el intestino es viable se intenta preservar mediante reducción. Si existe necrosis irreversible, el segmento comprometido debe resecarse y restablecerse la continuidad intestinal mediante anastomosis.",

    fija:
      "INVAGINACIÓN + NECROSIS → RESECCIÓN + ANASTOMOSIS."
  },

  {
    id: "EP-027",
    tema: "Divertículo de Meckel",
    dificultad: "Examen pasado",
    repetida: 1,

    pregunta:
      "Un niño presenta hemorragia digestiva baja importante sin un cuadro típico de dolor abdominal paroxístico. ¿Qué diagnóstico debe considerarse especialmente?",

    opciones: [
      "Estenosis hipertrófica del píloro",
      "Divertículo de Meckel",
      "Atresia esofágica",
      "Hernia umbilical",
      "Gastrosquisis"
    ],

    correcta: 1,

    explicacion:
      "El divertículo de Meckel puede contener mucosa gástrica ectópica. La secreción ácida puede ulcerar la mucosa ileal vecina y producir hemorragia digestiva.",

    fija:
      "NIÑO + SANGRADO DIGESTIVO BAJO IMPORTANTE → CONSIDERAR MECKEL."
  }

];