(()=>{"use strict";
const Q=[
{s:"En el proyecto guía se definió el título, pero antes de formular el problema el equipo construyó una ficha con 42 variables porque “todo podría servir”. ¿Cuál es la corrección metodológica más importante?",
o:["Aplicar la ficha y eliminar variables después del análisis","Reformular primero problema, objetivos e hipótesis/variables y recién después diseñar la ficha","Mantener las 42 variables para aumentar potencia estadística","Sustituir la ficha por una entrevista cualitativa","Esperar a conocer los resultados para decidir qué variables conservar"],
a:1,e:"El instrumento debe derivarse de las variables necesarias para responder el problema y los objetivos. Diseñar primero la ficha invierte la lógica del proceso y favorece datos irrelevantes o decisiones post hoc.",
r:["Recolectar primero y decidir después rompe la secuencia del planeamiento.","Correcta: problema y objetivos determinan qué medir y con qué instrumento.","Más variables no corrigen incoherencia y pueden añadir ruido.","Cambiar de técnica no resuelve que aún no se definió qué medir.","Decidir después de ver resultados introduce sesgo."],
f:"En investigación, el instrumento no crea las variables; las variables bien definidas crean el instrumento."},

{s:"Un equipo ya formuló problema, objetivos, hipótesis y variables. Ahora valida la ficha, confirma acceso a registros, dispone de recursos y capacita a quienes extraerán datos. ¿Qué etapa predomina?",
o:["Planeamiento","Organización","Implementación","Ejecución","Comunicación"],
a:2,e:"La implementación prepara las condiciones concretas para ejecutar el estudio: instrumentos, recursos, personal y procedimientos listos para usar.",
r:["El planeamiento ya definió el proyecto.","La organización estructura actividades y recursos, pero aquí se está dejando operativo el estudio.","Correcta: se preparan y validan los medios para ejecutar.","La ejecución comienza cuando se obtienen y procesan datos del estudio.","La comunicación ocurre después del análisis."],
f:"Implementar significa convertir el proyecto escrito en un estudio listo para ejecutarse."},

{s:"Durante la recolección se observa que el 35% de historias clínicas no contiene HbA1c basal, variable principal de exposición. ¿Qué respuesta refleja mejor la lógica del proceso de investigación?",
o:["Imputar valores sin criterio para completar la base","Cambiar el objetivo principal para evitar HbA1c","Reconocer el problema, evaluar su impacto y revisar factibilidad/limitaciones según lo planificado","Excluir todos los pacientes con datos faltantes sin analizar consecuencias","Continuar como si la ausencia no afectara el estudio"],
a:2,e:"La ejecución puede revelar limitaciones no previstas. Deben evaluarse de forma transparente y relacionarse con factibilidad, sesgo y capacidad de responder los objetivos.",
r:["Inventar datos es metodológicamente inaceptable.","Cambiar objetivos según los datos compromete coherencia.","Correcta: se evalúa el impacto y se documenta la limitación.","Excluir automáticamente puede producir sesgo de selección.","Ignorar el problema compromete validez."],
f:"Los problemas detectados en ejecución se gestionan; no se esconden ni se corrigen inventando datos."},

{s:"El protocolo establece que se comparará progresión a DM2 entre pacientes con y sin seguimiento médico. Sin embargo, el plan de análisis no define cómo se compararán los grupos. ¿En qué momento debió resolverse esta omisión?",
o:["En la comunicación final","Durante el planeamiento metodológico","Después de obtener significancia estadística","Al redactar las conclusiones","Durante la difusión"],
a:1,e:"El plan de análisis forma parte del planeamiento. Debe decidirse antes de conocer los resultados para evitar decisiones guiadas por los datos.",
r:["La comunicación solo reporta lo ya analizado.","Correcta: análisis y procesamiento se planifican antes de ejecutar.","Elegir análisis después de ver significancia introduce sesgo.","Las conclusiones dependen del análisis previamente definido.","Difusión es posterior."],
f:"El análisis se diseña antes de ver los resultados."},

{s:"Un investigador afirma: “Ya terminé la investigación porque terminé la base de datos y obtuve los resultados”. ¿Qué componente del proceso aún falta necesariamente?",
o:["Solo el presupuesto","Evaluación, interpretación y comunicación de resultados","Formular el problema","Elegir la población","Construir la hipótesis"],
a:1,e:"El proceso no concluye con una base de datos. Deben interpretarse los hallazgos, evaluar el estudio y comunicar los resultados mediante informe y difusión.",
r:["El presupuesto es previo y no cierra por sí solo la investigación.","Correcta: aún falta convertir resultados en conocimiento comunicable.","El problema debió existir antes.","La población se definió antes.","La hipótesis, si corresponde, es previa."],
f:"Resultados no equivalen a investigación terminada: falta interpretar, concluir y comunicar."},

{s:"El cronograma asigna dos semanas para obtener permisos, validar instrumentos, revisar 2 500 historias y depurar la base. ¿Cuál es la mejor interpretación?",
o:["El problema científico está mal formulado","Existe una incoherencia entre método, organización y factibilidad","La hipótesis es necesariamente nula","El diseño debe convertirse en cualitativo","La muestra siempre debe reducirse"],
a:1,e:"El cronograma debe representar de manera realista las actividades del método. Un plazo incompatible con las tareas compromete la factibilidad operativa.",
r:["La pregunta puede estar bien formulada aunque el cronograma sea irreal.","Correcta: el método y la planificación administrativa no son compatibles.","La hipótesis no depende del cronograma.","No se resuelve cambiando de enfoque.","Reducir muestra no es la única ni automática solución."],
f:"Cronograma y presupuesto deben describir el mismo estudio que propone el método."},

{s:"¿Cuál secuencia conserva mejor la dependencia lógica entre componentes del proyecto?",
o:["Instrumento → variables → objetivos → problema → análisis","Problema → objetivos → marco/hipótesis/variables → diseño → recolección → análisis → comunicación","Resultados → problema → objetivos → muestra → teoría","Presupuesto → diseño → problema → hipótesis → discusión","Muestra → instrumento → título → problema → resultados"],
a:1,e:"El proceso avanza desde la definición del problema hacia el sustento teórico y metodológico, luego ejecución, análisis y comunicación.",
r:["Invierte la lógica: el instrumento depende de las variables.","Correcta: mantiene una secuencia coherente de decisiones.","Los resultados no pueden preceder al problema.","La administración no define el problema científico.","La muestra no antecede al problema ni al diseño."],
f:"Cada componente debe poder justificarse por el componente anterior."},

{s:"El equipo desea estudiar progresión de prediabetes a DM2, pero no puede identificar una población accesible ni una fuente de datos que permita conocer el desenlace. ¿Qué decisión es metodológicamente más prudente?",
o:["Mantener el problema y asumir que aparecerán datos","Revisar viabilidad/factibilidad antes de continuar con el protocolo definitivo","Inventar una población teórica","Definir primero el análisis estadístico","Pasar directamente a redacción del informe"],
a:1,e:"Una pregunta interesante no basta; debe existir una ruta realista para responderla con recursos y datos disponibles.",
r:["Confiar en datos inexistentes no hace viable el estudio.","Correcta: debe evaluarse si el estudio puede realizarse.","Una población teórica no sustituye acceso real.","El análisis depende de datos posibles.","No puede redactarse un informe sin estudio."],
f:"Una buena investigación empieza con una buena pregunta y una posibilidad real de responderla."},

{s:"Durante la evaluación interna se detecta que el instrumento aplicado no registró una variable incluida en un objetivo específico. ¿Qué conclusión es más rigurosa?",
o:["El objetivo sigue siendo plenamente evaluable","Existe una falla de coherencia entre planeamiento e implementación que limita la respuesta al objetivo","Basta con discutir la variable sin medirla","Puede inferirse la variable desde otras sin validación","El problema se corrige cambiando el título"],
a:1,e:"Si una variable necesaria para un objetivo no fue medida, el estudio no puede responder ese objetivo de forma completa. La falla se origina en planeamiento/implementación.",
r:["Sin datos, el objetivo no es plenamente evaluable.","Correcta: faltó traducir el objetivo en medición efectiva.","Discutir no sustituye medir.","Inferir sin validación introduce error.","Cambiar el título no recupera el dato."],
f:"Objetivo sin variable medida = objetivo sin respuesta válida."},

{s:"¿Cuál actividad pertenece con mayor precisión a la comunicación de resultados y no a la ejecución?",
o:["Aplicar una ficha de recolección","Depurar la base de datos","Calcular medidas de asociación","Definir el tipo de usuario y redactar el reporte final","Codificar variables"],
a:3,e:"La comunicación incluye definir destinatarios, elaborar el esquema del reporte, redactarlo, publicarlo y difundirlo.",
r:["Es ejecución.","Es ejecución/procesamiento.","Es análisis.","Correcta: pertenece a comunicación.","Es preparación de datos."],
f:"Comunicar no es solo publicar: implica adaptar el reporte al usuario y difundirlo responsablemente."},

{s:"En el proyecto guía, definir de antemano qué criterio diagnóstico señalará que un paciente progresó a DM2 pertenece principalmente a:",
o:["Comunicación","Planeamiento y operacionalización","Evaluación final","Difusión","Organización administrativa"],
a:1,e:"El desenlace debe definirse antes de recolectar datos. Es una decisión de planeamiento vinculada con operacionalización.",
r:["No es comunicación.","Correcta: establece cómo se medirá el desenlace.","La evaluación final ocurre después.","No es difusión.","No es principalmente administrativa."],
f:"Una variable central debe tener regla de medición antes de iniciar la ejecución."},

{s:"Un equipo recopila datos adicionales no contemplados en el protocolo porque “quizá luego aparezca algo interesante”. ¿Qué riesgo metodológico principal introduce?",
o:["Ninguno, más datos siempre mejoran el estudio","Desalineación entre pregunta y recolección, además de análisis exploratorios no planificados","Disminución automática del tamaño muestral","Conversión del diseño en experimental","Pérdida obligatoria de confidencialidad"],
a:1,e:"Recolectar sin relación con preguntas u objetivos aumenta carga, ruido y posibilidades de análisis no planificados guiados por datos.",
r:["Más datos no garantizan calidad.","Correcta: se rompe la lógica problema→variables→datos.","El tamaño muestral no disminuye por eso.","No convierte el diseño.","La confidencialidad puede verse afectada, pero no es el riesgo metodológico central descrito."],
f:"Dato útil es el dato que responde a una pregunta definida."},

{s:"¿Qué situación representa mejor una falla de implementación y no de formulación del problema?",
o:["La pregunta no define población","El problema no relaciona variables","La ficha fue diseñada correctamente pero no se capacitó a los recolectores y se aplicó de manera inconsistente","El objetivo general no corresponde al título","La pregunta no puede probarse empíricamente"],
a:2,e:"La capacitación y aplicación uniforme de instrumentos son condiciones operativas de la implementación.",
r:["Es falla del problema.","Es falla del problema.","Correcta: el proyecto estaba definido, pero la ejecución no fue preparada adecuadamente.","Es falla de coherencia conceptual.","Es falla de formulación."],
f:"Una buena metodología escrita puede fracasar si no se implementa de forma estandarizada."},

{s:"En el informe final, los autores presentan tablas y p-valores pero no discuten su significado ni los relacionan con objetivos y antecedentes. ¿Qué parte del proceso está incompleta?",
o:["Identificación de la idea","Interpretación y comunicación de resultados","Selección de muestra","Operacionalización","Factibilidad"],
a:1,e:"La información analizada debe interpretarse y discutirse antes de convertirse en conclusiones y recomendaciones.",
r:["La idea fue previa.","Correcta: faltan interpretación, discusión y comunicación científica adecuada.","La muestra ya fue seleccionada.","La operacionalización fue previa.","La factibilidad se evalúa antes."],
f:"Una tabla no responde por sí sola al objetivo; la interpretación conecta resultados con la pregunta."},

{s:"El proyecto dispone de una pregunta bien delimitada y un diseño adecuado, pero carece de personal, tiempo y acceso a historias clínicas. ¿Qué componente está principalmente comprometido?",
o:["Validez conceptual del problema","Viabilidad operativa para pasar del planeamiento a la ejecución","Necesidad de hipótesis","Elección de paradigma","Redacción bibliográfica"],
a:1,e:"El estudio puede ser científicamente coherente pero operativamente inviable si no dispone de recursos y acceso.",
r:["El problema puede seguir siendo conceptualmente válido.","Correcta: faltan condiciones para ejecutar.","No depende de que tenga hipótesis.","El paradigma no resuelve recursos.","No es un problema de estilo bibliográfico."],
f:"La calidad científica y la viabilidad operativa deben coexistir."},

{s:"Durante la ejecución, el equipo modifica el criterio de progresión a DM2 porque con el criterio original “no salen suficientes casos”. ¿Qué principio se vulnera?",
o:["La comunicación a usuarios","La estabilidad del planeamiento y la definición operacional previa","El presupuesto","La selección de bibliografía","La organización del índice"],
a:1,e:"Cambiar una definición después de observar su efecto sobre los resultados introduce una decisión post hoc y compromete la objetividad.",
r:["No es un problema de comunicación.","Correcta: las reglas de medición deben fijarse antes de conocer resultados.","No es costo.","No es bibliografía.","No es formato."],
f:"Nunca cambies la regla de medición para fabricar un resultado más conveniente."},

{s:"¿Qué actividad pertenece mejor a la etapa de organización?",
o:["Formular el problema","Programar actividades y estimar presupuesto","Aplicar el instrumento","Calcular OR","Redactar discusión"],
a:1,e:"La organización traduce el proyecto en actividades, tiempos y recursos.",
r:["Es planeamiento conceptual.","Correcta.","Es ejecución.","Es análisis.","Es comunicación/interpretación."],
f:"Organización = cuándo, con qué recursos y en qué secuencia se ejecutará lo ya diseñado."},

{s:"Un estudio piloto revela que dos recolectores interpretan de forma distinta la variable “seguimiento médico”. ¿Cuál es la acción más coherente antes de iniciar la ejecución definitiva?",
o:["Mantener el instrumento y promediar diferencias","Refinar la definición operacional, capacitar recolectores y volver a probar el procedimiento","Eliminar la variable sin revisar objetivos","Cambiar la hipótesis después","Aplicar inmediatamente a toda la muestra"],
a:1,e:"El piloto existe para detectar fallas de medición e implementación antes de escalar el estudio.",
r:["Promediar interpretaciones no corrige ambigüedad.","Correcta: se corrige definición y procedimiento antes de aplicar.","Eliminarla puede romper objetivos.","Cambiar hipótesis no soluciona medición.","Aplicar sin corregir amplifica el error."],
f:"El piloto sirve para corregir antes de comprometer toda la muestra."},

{s:"¿Cuál situación demuestra mejor una evaluación de proceso útil?",
o:["Comparar lo ejecutado con el cronograma, revisar calidad de datos y documentar desviaciones","Esperar al final y solo contar páginas","Cambiar objetivos para que coincidan con resultados","Eliminar registros problemáticos sin documentar","Publicar sin revisión interna"],
a:0,e:"Evaluar implica controlar si el estudio se desarrolla según lo planificado y detectar desviaciones relevantes.",
r:["Correcta: permite control y mejora documentada.","No evalúa calidad del proceso.","Es sesgo post hoc.","Oculta problemas.","Omitir revisión reduce calidad."],
f:"Evaluar es verificar si la ejecución real conserva la lógica y calidad del plan."},

{s:"¿Qué producto representa la integración final de problema, marco teórico, método, resultados, discusión, conclusiones y recomendaciones?",
o:["La ficha de recolección","El informe final de investigación","El marco muestral","La matriz de variables","El cronograma"],
a:1,e:"El informe final documenta el proceso completo y comunica sus resultados.",
r:["Solo es un instrumento.","Correcta.","Solo lista unidades elegibles.","Solo organiza variables.","Solo organiza tiempo."],
f:"El informe final es la síntesis documentada del proceso completo, no una simple colección de tablas."}
];
Q.forEach((q,i)=>window.TESIS_S8_QUESTIONS.push({id:"C1Q"+String(i+1).padStart(2,"0"),classNo:1,topic:"Proceso de investigación",stem:q.s,options:q.o,answer:q.a,explanation:q.e,rationales:q.r,fija:q.f}));})();