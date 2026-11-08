/* Adaptación de las preguntas de respuesta única al formato de aseveraciones. */
(() => {
  "use strict";

  const examples = {
    1: [
      {"texto":"Una evaluación con intérprete facilitaría la formulación clínica.","verdadera":true,"justificacion":"La comunicación en el idioma preferido permite conocer síntomas, contexto y significado del malestar."},
      {"texto":"La explicación cultural basta para establecer un delirio.","verdadera":false,"justificacion":"Debe valorarse el contexto cultural y el resto del examen mental."},
      {"texto":"Puede acordarse un plan escalonado desde atención primaria.","verdadera":true,"justificacion":"La atención comunitaria coordina evaluación, seguimiento y derivación según necesidad."},
      {"texto":"La ausencia de psicosis elimina la necesidad de seguimiento.","verdadera":false,"justificacion":"El sufrimiento y el deterioro pueden requerir atención aunque no haya psicosis."}
    ],
    2: [
      {"texto":"El patrón es compatible con un episodio depresivo mayor.","verdadera":true,"justificacion":"La duración, los síntomas nucleares y los hallazgos asociados apoyan el síndrome."},
      {"texto":"Las ideas de muerte requieren explorar el riesgo suicida.","verdadera":true,"justificacion":"Hay que valorar intención, planificación, acceso a medios y apoyos según el caso."},
      {"texto":"Las ideas de culpa establecen por sí solas depresión psicótica.","verdadera":false,"justificacion":"Se necesita evidencia de síntomas psicóticos, como convicción delirante."},
      {"texto":"La historia de manía o hipomanía es relevante para la formulación.","verdadera":true,"justificacion":"La trayectoria afectiva ayuda a diferenciar depresión unipolar y bipolar."}
    ],
    3: [
      {"texto":"El deterioro marcado favorece manía frente a hipomanía.","verdadera":true,"justificacion":"La gravedad funcional es un dato discriminante del episodio."},
      {"texto":"La exposición a un antidepresivo obliga a descartar bipolar I.","verdadera":false,"justificacion":"Un episodio completo persistente más allá del efecto fisiológico puede contar como manía."},
      {"texto":"Es importante corroborar la duración y la relación temporal con el fármaco.","verdadera":true,"justificacion":"La cronología permite diferenciar un episodio sostenido de una activación transitoria."},
      {"texto":"Se necesita un episodio depresivo mayor para establecer bipolar I.","verdadera":false,"justificacion":"Un episodio maníaco que satisface los criterios puede establecer bipolar I."}
    ],
    4: [
      {"texto":"Cuatro meses de alteración bastan para el criterio temporal de esquizofrenia del DSM-5-TR.","verdadera":false,"justificacion":"El criterio exige signos continuos durante al menos seis meses."},
      {"texto":"La duración documentada es compatible con trastorno esquizofreniforme.","verdadera":true,"justificacion":"El curso total está entre un mes y menos de seis meses."},
      {"texto":"El cuadro cumple la duración de un trastorno psicótico breve.","verdadera":false,"justificacion":"Los síntomas activos ya superaron un mes."},
      {"texto":"La fase prodrómica se excluye del cómputo de signos continuos para esquizofrenia.","verdadera":false,"justificacion":"Ese intervalo puede incluir periodos prodrómicos o residuales."}
    ],
    5: [
      {"texto":"La preocupación sostenida tras las crisis aporta al diagnóstico diferencial.","verdadera":true,"justificacion":"Al menos un mes de preocupación o cambio conductual tras crisis inesperadas apoya el trastorno de pánico."},
      {"texto":"Alcanzar el pico en minutos descarta una crisis de pánico.","verdadera":false,"justificacion":"El aumento abrupto con máximo en minutos es característico."},
      {"texto":"Conviene indagar si algunas crisis aparecen de forma inesperada.","verdadera":true,"justificacion":"Las crisis inesperadas recurrentes son centrales para el trastorno de pánico."},
      {"texto":"Evitar el transporte basta para diagnosticar agorafobia.","verdadera":false,"justificacion":"Deben explorarse el motivo de la evitación y los tipos de situaciones temidas."}
    ],
    6: [
      {"texto":"Una lesión musculoesquelética demostrada excluye un trastorno de síntomas somáticos.","verdadera":false,"justificacion":"El diagnóstico puede coexistir con enfermedad física."},
      {"texto":"El tiempo dedicado a vigilar síntomas es clínicamente relevante.","verdadera":true,"justificacion":"Las conductas excesivas relacionadas con síntomas forman parte de la valoración."},
      {"texto":"La repercusión laboral aporta información diagnóstica.","verdadera":true,"justificacion":"El impacto funcional ayuda a valorar el cuadro y las prioridades de atención."},
      {"texto":"La ausencia de síntomas médicamente inexplicables impide plantear el diagnóstico.","verdadera":false,"justificacion":"El foco está en síntomas perturbadores y respuestas excesivas o persistentes."}
    ],
    7: [
      {"texto":"El curso afectivo reactivo de horas orienta la evaluación longitudinal.","verdadera":true,"justificacion":"Los cambios breves ligados al contexto no equivalen a episodios maníacos sostenidos."},
      {"texto":"Las autolesiones requieren valoración de seguridad.","verdadera":true,"justificacion":"El patrón de personalidad no determina por sí solo el riesgo actual."},
      {"texto":"La terapia dialéctico-conductual incluye tolerancia al malestar.","verdadera":true,"justificacion":"También trabaja regulación emocional y habilidades interpersonales."},
      {"texto":"La impulsividad y la irritabilidad bastan para diagnosticar bipolar I.","verdadera":false,"justificacion":"Para ese diagnóstico se requiere un episodio maníaco."}
    ],
    9: [
      {"texto":"La inatención aguda fluctuante orienta a delirium.","verdadera":true,"justificacion":"La combinación de instalación rápida, inatención y fluctuación es discriminante."},
      {"texto":"Corresponde buscar causas precipitantes concomitantes.","verdadera":true,"justificacion":"Infección, alteraciones metabólicas y medicamentos pueden contribuir simultáneamente."},
      {"texto":"La reorientación puede integrarse al manejo.","verdadera":true,"justificacion":"Apoyar orientación, sueño y comunicación sensorial forma parte de las medidas de soporte."},
      {"texto":"Las alucinaciones visuales establecen una psicosis primaria.","verdadera":false,"justificacion":"En este contexto también son compatibles con delirium."}
    ],
    10: [
      {"texto":"La desorientación con hiperactividad autonómica sugiere abstinencia complicada.","verdadera":true,"justificacion":"La alteración global de atención y orientación apoya delirium por abstinencia."},
      {"texto":"Las benzodiacepinas tienen un papel de primera línea.","verdadera":true,"justificacion":"Se ajustan al cuadro clínico con monitorización y soporte."},
      {"texto":"Un antipsicótico solo sustituye el tratamiento de la abstinencia.","verdadera":false,"justificacion":"No trata el mecanismo central ni sustituye el manejo de primera línea."},
      {"texto":"Se debe valorar el aporte de tiamina.","verdadera":true,"justificacion":"El contexto obliga a considerar el riesgo de deficiencia y encefalopatía de Wernicke."}
    ],
    11: [
      {"texto":"El lavado funciona como un intento de neutralizar ansiedad.","verdadera":true,"justificacion":"La relación entre intrusión, ansiedad y ritual apoya una compulsión."},
      {"texto":"Reconocer la intrusión como indeseada excluye TOC.","verdadera":false,"justificacion":"El grado de introspección en el TOC es variable."},
      {"texto":"La exposición con prevención de respuesta aborda el ritual.","verdadera":true,"justificacion":"Se practica el contacto con el estímulo temido y se evita la respuesta compulsiva."},
      {"texto":"La pérdida de clases documenta repercusión funcional.","verdadera":true,"justificacion":"La interferencia y el tiempo dedicado ayudan a establecer gravedad."}
    ],
    12: [
      {"texto":"La pérdida de independencia favorece trastorno neurocognitivo leve frente al mayor.","verdadera":false,"justificacion":"La interferencia con la autonomía favorece el grado mayor."},
      {"texto":"Las dificultades para manejar finanzas y medicación son relevantes.","verdadera":true,"justificacion":"Son actividades instrumentales que ayudan a valorar independencia."},
      {"texto":"Los olvidos progresivos establecen por sí solos la etiología.","verdadera":false,"justificacion":"Se necesita una evaluación adicional para atribuir la causa."},
      {"texto":"El curso descrito contrasta con el inicio típico del delirium.","verdadera":true,"justificacion":"El delirium suele iniciarse de forma aguda y con alteración fluctuante de la atención."}
    ],
    13: [
      {"texto":"La concreción del plan obliga a valorar la inminencia de la amenaza.","verdadera":true,"justificacion":"Intención, medios, oportunidad y factores protectores orientan el manejo del riesgo."},
      {"texto":"El diagnóstico de psicosis basta para estimar el riesgo inmediato.","verdadera":false,"justificacion":"La estimación requiere datos individualizados sobre conducta y contexto."},
      {"texto":"Corresponde documentar la evaluación y las medidas de protección.","verdadera":true,"justificacion":"El registro explica la decisión y facilita la continuidad."},
      {"texto":"La respuesta jurídica es idéntica en cualquier jurisdicción.","verdadera":false,"justificacion":"Las obligaciones y procedimientos dependen del marco aplicable."}
    ],
    14: [
      {"texto":"Los datos describen dificultades en la comunicación e interacción social.","verdadera":true,"justificacion":"La reciprocidad y el uso de señales no verbales son parte de ese dominio."},
      {"texto":"Las estereotipias y la rigidez aportan un segundo dominio diagnóstico.","verdadera":true,"justificacion":"Ambas son manifestaciones de patrones restringidos o repetitivos."},
      {"texto":"La capacidad intelectual promedio excluye autismo.","verdadera":false,"justificacion":"El autismo puede presentarse con distintos niveles de funcionamiento intelectual."},
      {"texto":"La evaluación debe identificar apoyos y comorbilidades.","verdadera":true,"justificacion":"El diagnóstico y la planificación de apoyos responden a preguntas clínicas complementarias."}
    ],
    15: [
      {"texto":"Para Tourette, los tics vocales y motores deben ocurrir al mismo tiempo.","verdadera":false,"justificacion":"Pueden ocurrir en momentos diferentes del curso."},
      {"texto":"El conjunto de tics motores y vocales orienta a Tourette.","verdadera":true,"justificacion":"La coexistencia a lo largo del curso es un dato diagnóstico clave."},
      {"texto":"Dieciocho meses supera el umbral temporal de un año.","verdadera":true,"justificacion":"La duración se cuenta desde el primer tic."},
      {"texto":"Las fluctuaciones de frecuencia contradicen el diagnóstico.","verdadera":false,"justificacion":"Los tics pueden aumentar y disminuir a lo largo del tiempo."}
    ],
    16: [
      {"texto":"Identificar pensamientos automáticos es compatible con TCC.","verdadera":true,"justificacion":"La TCC explora interpretaciones y su relación con la conducta y el ánimo."},
      {"texto":"La activación conductual puede abordar la evitación.","verdadera":true,"justificacion":"La programación gradual facilita retomar actividades significativas."},
      {"texto":"Las tareas entre sesiones son incompatibles con el enfoque.","verdadera":false,"justificacion":"Las tareas permiten practicar y revisar habilidades fuera de consulta."},
      {"texto":"Pueden acordarse objetivos funcionales observables.","verdadera":true,"justificacion":"Los objetivos medibles permiten valorar el avance junto a los síntomas."}
    ],
    17: [
      {"texto":"Las pausas respiratorias presenciadas apoyan la sospecha de apnea obstructiva.","verdadera":true,"justificacion":"El hallazgo gana peso junto a ronquido y somnolencia diurna."},
      {"texto":"El IMC por sí solo confirma apnea obstructiva.","verdadera":false,"justificacion":"El peso aporta riesgo; no sustituye la evaluación diagnóstica."},
      {"texto":"Está indicado considerar un estudio de sueño.","verdadera":true,"justificacion":"La evaluación clínica orienta qué modalidad de estudio usar."},
      {"texto":"La cefalea matinal permite atribuir el cuadro a depresión.","verdadera":false,"justificacion":"Es inespecífica y debe interpretarse con los demás hallazgos."}
    ],
    18: [
      {"texto":"El curso descrito orienta a desregulación disruptiva del estado de ánimo.","verdadera":true,"justificacion":"La irritabilidad persistente entre estallidos y la afectación en varios contextos apoyan esa hipótesis."},
      {"texto":"La irritabilidad crónica equivale a manía.","verdadera":false,"justificacion":"En manía se identifica un cambio episódico con síntomas característicos y aumento de energía o actividad."},
      {"texto":"La edad de inicio y la duración deben verificarse.","verdadera":true,"justificacion":"Son datos necesarios para contrastar los criterios y el diagnóstico diferencial."},
      {"texto":"Los informes de casa y escuela aportan datos complementarios.","verdadera":true,"justificacion":"Permiten verificar persistencia, frecuencia y repercusión en diferentes entornos."}
    ]
  };

  function shuffled(items, seed) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const j = Math.floor(seed / 4294967296 * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function keyOrder(unit, example) {
    const keys = shuffled(Array.from({ length: 20 }, (_, i) => i % 5), unit * 54391);
    if (example) {
      const firstKey = example.filter(assertion => assertion.verdadera).length;
      const index = keys.indexOf(firstKey);
      [keys[0], keys[index]] = [keys[index], keys[0]];
    }
    return keys;
  }

  function convert(question) {
    if (question.aseveraciones) return question;

    const position = Number(question.id.split("-").at(-1)) - 1;
    const example = examples[question.unidad];
    const keys = keyOrder(question.unidad, example);
    const count = keys[position % keys.length];
    const seed = question.unidad * 97189 + position * 19937;
    const truthOrder = shuffled([0, 1, 2, 3], seed + 1549);
    const useExample = position === 0 && example;
    const statements = useExample ? example : shuffled(
      question.opciones.map((text, index) => ({ text, index })), seed
    ).slice(0, 4).map(({ text, index }, i) => {
      const supportsAnswer = index === question.correcta;
      const isTrue = truthOrder.indexOf(i) < count;
      const endorse = supportsAnswer === isTrue;
      return {
        texto: endorse
          ? "Como respuesta principal, corresponde «" + text + "»."
          : "Como respuesta principal, no corresponde «" + text + "».",
        verdadera: isTrue,
        justificacion: question.analisis[index] || question.fundamento
      };
    });
    return {
      ...question,
      id: question.id + "-ASEV",
      caso: useExample ? question.caso.replace(/\s*¿[^¿]*\?\s*$/u, "") : question.caso,
      aseveraciones: statements,
      correcta: statements.filter(assertion => assertion.verdadera).length,
      respuestaOriginal: question.opciones[question.correcta]
    };
  }

  window.BADBEAR_PSIQ_CONVERTIR_ASEVERACIONES = convert;
})();
