(()=>{"use strict";
const Q=[
{s:"Se desea investigar progresión de prediabetes a DM2. ¿Cuál formulación cumple mejor con relación de variables, población y delimitación temporal-espacial?",
o:["¿Por qué la diabetes es un problema de salud?","¿Qué factores clínicos y metabólicos se asocian con la progresión de prediabetes a DM2 y cuál es el impacto del seguimiento médico en pacientes atendidos en el HNHU durante 2022–2026?","¿Qué sabemos sobre prediabetes?","¿La atención médica es suficiente?","¿Qué factores existen en pacientes diabéticos?"],
a:1,e:"La mejor formulación explicita variables, desenlace, intervención/exposición, población, espacio y periodo en forma interrogativa.",
r:["Es demasiado amplia y no define variables ni población.","Correcta: contiene los elementos centrales de una pregunta investigable.","Es una pregunta de revisión, no del estudio.","Es vaga y valorativa.","No delimita desenlace, población ni periodo."],
f:"Problema bien formulado = variables + población + espacio/tiempo + posibilidad real de prueba empírica."},

{s:"La realidad problemática describe alta prevalencia de diabetes mundial, pero no explica qué ocurre en pacientes con prediabetes del hospital ni qué brecha local existe. ¿Cuál es la principal deficiencia?",
o:["Exceso de delimitación","Falta transición desde el contexto general hacia la situación específica que origina la pregunta","Ausencia de resultados estadísticos propios","Falta de una hipótesis nula","No incluir el presupuesto"],
a:1,e:"La realidad problemática debe contextualizar y conducir progresivamente hacia el vacío concreto que justifica la pregunta.",
r:["En realidad falta delimitación contextual.","Correcta: el lector aún no entiende por qué surge esa pregunta específica.","Los resultados propios aún no existen.","La hipótesis es posterior.","El presupuesto no pertenece a esta sección."],
f:"La realidad problemática no es una colección de cifras; es el argumento que conduce a la pregunta."},

{s:"En la descripción se identifica aumento de progresión a DM2, se señalan posibles causas y se explica qué podría ocurrir si no mejora el seguimiento. ¿Qué componentes se están articulando?",
o:["Situación actual, causas y pronóstico","Objetivo general, hipótesis y muestra","Validez, confiabilidad y objetividad","Presupuesto, cronograma y financiamiento","Discusión, conclusión y recomendación"],
a:0,e:"La realidad problemática puede organizar situación actual, factores relacionados y pronóstico de lo que ocurriría si la situación continúa.",
r:["Correcta.","Son componentes posteriores.","Son propiedades de medición.","Son administrativos.","Son del informe final."],
f:"Una buena realidad problemática muestra qué pasa, por qué podría pasar y por qué importa investigarlo."},

{s:"Un investigador escribe: “¿Cuál es el efecto de todos los factores posibles sobre todas las complicaciones metabólicas en todos los adultos de Lima?”. ¿Qué corrección es prioritaria?",
o:["Añadir más variables","Delimitar variables, población, espacio y tiempo","Convertirla en afirmación","Eliminar toda referencia temporal","Mantenerla para no perder información"],
a:1,e:"La pregunta es demasiado amplia para ser manejable. Debe transformarse en una realidad concreta y delimitada.",
r:["Aumentaría el problema.","Correcta.","El formato interrogativo es adecuado; el problema es amplitud.","La delimitación temporal ayuda.","Mantenerla compromete factibilidad."],
f:"Delimitar no empobrece el estudio; lo hace investigable."},

{s:"El título incluye “impacto de una intervención de seguimiento médico”, pero el problema general solo pregunta por factores de riesgo. ¿Qué se debe corregir?",
o:["Eliminar la población","Alinear título y problema para que ambos incluyan los componentes centrales del estudio","Agregar más referencias","Cambiar el estilo de citación","Eliminar los objetivos específicos"],
a:1,e:"El problema general debe representar los componentes centrales que el título promete investigar.",
r:["La población es necesaria.","Correcta: título y problema deben corresponder.","Las referencias no solucionan incoherencia.","El estilo bibliográfico es irrelevante.","Los objetivos específicos pueden ser útiles."],
f:"Título, problema y objetivo general deben describir el mismo estudio."},

{s:"¿Cuál opción representa una delimitación teórica del proyecto guía?",
o:["Hospital Nacional Hipólito Unanue","Periodo 2022–2026","Factores clínicos/metabólicos, progresión a DM2 y seguimiento médico","Pacientes con prediabetes","Número de historias disponibles"],
a:2,e:"La delimitación teórica define qué variables y conceptos integran el estudio.",
r:["Es delimitación espacial.","Es temporal.","Correcta.","Es delimitación poblacional/social.","Es un dato de factibilidad."],
f:"Delimitación teórica = qué conceptos y variables sí entran al estudio y cuáles no."},

{s:"¿Cuál opción representa mejor la delimitación social o poblacional?",
o:["HbA1c e IMC","Hospital Nacional Hipólito Unanue","2022–2026","Pacientes con prediabetes que cumplen criterios definidos","Lima Metropolitana"],
a:3,e:"La delimitación social/poblacional identifica quiénes conforman las unidades de estudio.",
r:["Son variables.","Es lugar.","Es tiempo.","Correcta.","Es espacio general."],
f:"Población responde: ¿en quiénes se estudiará el problema?"},

{s:"El protocolo pregunta por impacto del seguimiento médico, pero en los registros históricos no existe forma confiable de saber quién recibió seguimiento estructurado. ¿Qué dimensión está principalmente comprometida?",
o:["La forma interrogativa","La factibilidad de responder la pregunta","La delimitación espacial","La gramática","La necesidad de antecedentes"],
a:1,e:"Aunque la pregunta esté bien escrita, si una variable central no puede medirse el estudio puede ser inviable o no factible.",
r:["Puede seguir siendo interrogativa.","Correcta: no se puede responder con los datos disponibles.","El lugar puede estar claro.","No es un problema de redacción.","Los antecedentes no recuperan el dato faltante."],
f:"Una pregunta científicamente interesante puede ser metodológicamente imposible."},

{s:"¿Cuál problema específico se deriva de manera más directa del objetivo de estudiar factores metabólicos?",
o:["¿Cuál es la historia de la diabetes en el Perú?","¿Existe asociación entre HbA1c basal y progresión de prediabetes a DM2 en la población definida?","¿Cuánto cuesta tratar DM2?","¿Qué opinan los médicos sobre la tesis?","¿Qué software se usará?"],
a:1,e:"Un problema específico debe descomponer el problema general en una relación concreta, medible y vinculada con las variables del estudio.",
r:["No corresponde al objetivo central.","Correcta.","Introduce otro problema económico.","No responde al objeto principal.","Es una decisión técnica, no problema de investigación."],
f:"Problema específico = una parte medible del problema general."},

{s:"La pregunta “¿Es malo tener HbA1c alta?” incumple principalmente qué criterio?",
o:["No está en forma de pregunta","Usa un término valorativo y no define relación, población ni desenlace","Tiene demasiada delimitación","Incluye demasiadas variables","Define demasiado bien el tiempo"],
a:1,e:"La pregunta es interrogativa, pero vaga y valorativa. No especifica qué significa “malo”, cuál es el desenlace ni en quiénes se evaluará.",
r:["Sí está en forma de pregunta.","Correcta.","Ocurre lo contrario.","No tiene exceso de variables.","Ni siquiera delimita tiempo."],
f:"Evita términos como “bueno”, “malo” o “adecuado” si no tienen definición operacional."},

{s:"¿Qué elemento demuestra mejor que una formulación permite prueba empírica?",
o:["Las variables pueden observarse o medirse mediante procedimientos definidos","La pregunta es extensa","Tiene una cita bibliográfica","Incluye una opinión clínica","Usa lenguaje técnico"],
a:0,e:"La prueba empírica exige que los conceptos puedan traducirse a observaciones o mediciones.",
r:["Correcta.","La extensión no importa.","Una cita no garantiza medibilidad.","La opinión no sustituye medición.","El tecnicismo no garantiza prueba."],
f:"Pregunta científica = pregunta conectable con datos."},

{s:"El investigador define “pacientes con prediabetes” pero no establece criterio diagnóstico. ¿Qué problema aparece?",
o:["La población está nominalmente mencionada pero no suficientemente definida para selección reproducible","La población ya está perfectamente delimitada","Solo falta presupuesto","El diseño se vuelve experimental","La pregunta deja de ser interrogativa"],
a:0,e:"Nombrar una población no basta si no puede identificarse de manera consistente quién pertenece a ella.",
r:["Correcta.","Falta criterio operativo.","No es principalmente presupuesto.","No vuelve experimental el estudio.","La forma interrogativa no cambia."],
f:"Delimitar población implica poder reconocer de forma reproducible quién entra y quién no."},

{s:"Un problema general incluye progresión a DM2 y seguimiento médico, pero los problemas específicos solo analizan edad y sexo. ¿Qué ocurre?",
o:["Los específicos no cubren completamente el problema general","La delimitación es excesiva","El estudio se vuelve cualitativo","La población se duplica","No existe ninguna incoherencia"],
a:0,e:"Los problemas específicos deben descomponer los componentes esenciales del problema general, no dejar fuera partes centrales.",
r:["Correcta.","No es el problema principal.","No cambia el enfoque.","No.","Sí existe incoherencia."],
f:"La suma de problemas específicos debe permitir reconstruir el problema general."},

{s:"Se formula la pregunta después de revisar qué asociaciones resultaron significativas en una base existente. ¿Cuál es el riesgo principal?",
o:["Formulación guiada por resultados y sesgo post hoc","Exceso de validez externa","Mayor objetividad","Aleatorización involuntaria","Mejor factibilidad"],
a:0,e:"Definir la pregunta a partir de resultados ya observados puede generar hipótesis post hoc presentadas falsamente como confirmatorias.",
r:["Correcta.","No mejora validez externa.","No aumenta objetividad.","No implica aleatorización.","Puede ser factible, pero el sesgo conceptual sigue."],
f:"Primero pregunta; luego analiza. No construyas la pregunta para justificar un resultado ya visto."},

{s:"La investigación pretende usar datos 2022–2026, pero la pregunta solo menciona “actualmente”. ¿Qué dimensión de delimitación necesita precisión?",
o:["Teórica","Temporal","Social","Conceptual","Bibliográfica"],
a:1,e:"El periodo debe expresarse con suficiente precisión cuando forma parte del objeto de estudio.",
r:["Las variables pueden estar claras.","Correcta.","La población puede estar definida.","No es solo conceptual.","No es bibliográfica."],
f:"Tiempo ambiguo = población y resultados difíciles de interpretar."},

{s:"¿Cuál enunciado diferencia mejor viabilidad y factibilidad según el enfoque trabajado?",
o:["Viabilidad se relaciona con recursos; factibilidad con posibilidad real de responder","Son conceptos totalmente opuestos","Viabilidad es estadística y factibilidad es bibliografía","Viabilidad solo aplica a ensayos clínicos","Factibilidad se evalúa después del informe"],
a:0,e:"El material distingue disponibilidad de recursos y posibilidad real de responder la pregunta.",
r:["Correcta.","No son opuestos.","No.","No.","Debe evaluarse antes de ejecutar."],
f:"Antes de continuar pregunta: ¿tengo los recursos? ¿puedo realmente responder?"},

{s:"¿Cuál formulación específica es más sólida para evaluar seguimiento médico?",
o:["¿El seguimiento es bueno?","¿Existe diferencia en la progresión a DM2 entre pacientes con prediabetes con y sin seguimiento médico definido, en la población y periodo del estudio?","¿A los pacientes les gusta ser controlados?","¿La medicina ayuda?","¿Debería el hospital hacer más controles?"],
a:1,e:"La opción define comparación, desenlace y exposición de forma medible y vinculada al problema general.",
r:["Vaga y valorativa.","Correcta.","Es otra pregunta y requeriría otra variable.","Demasiado general.","Es normativa, no formulación del efecto estudiado."],
f:"Una comparación válida necesita exposición definida, desenlace definido y población delimitada."},

{s:"La realidad problemática presenta causas posibles como si ya fueran demostradas en la población del estudio. ¿Qué error comete?",
o:["Confunde antecedentes o hipótesis con resultados propios aún no obtenidos","Mejora la precisión","Hace innecesaria la hipótesis","Convierte el estudio en ensayo","No hay error"],
a:0,e:"Antes de ejecutar el estudio, los factores pueden estar sustentados por literatura, pero no deben presentarse como resultados propios confirmados.",
r:["Correcta.","No.","No.","No.","Sí hay error."],
f:"En la introducción puedes sustentar plausibilidad; no puedes adjudicar resultados que aún no produjiste."},

{s:"¿Cuál criterio de Kerlinger se incumple si la pregunta dice “¿Qué tan preocupante es la diabetes?”?",
o:["Debe expresar relación de variables y posibilitar prueba empírica","Debe tener al menos 30 palabras","Debe incluir presupuesto","Debe usar una escala ordinal","Debe contener una cita"],
a:0,e:"“Preocupante” no define una variable ni una relación empíricamente evaluable.",
r:["Correcta.","La longitud no es criterio.","No.","No necesariamente.","No."],
f:"Una formulación científica sustituye adjetivos por variables observables."},

{s:"¿Qué decisión demuestra que el problema está suficientemente delimitado para avanzar al diseño?",
o:["Se puede identificar qué variables se estudiarán, en quiénes, dónde y en qué periodo","El título suena técnico","La introducción tiene muchas páginas","Se eligió una plantilla bonita","El investigador conoce el tema"],
a:0,e:"La delimitación debe permitir reconocer el objeto de estudio y sus fronteras.",
r:["Correcta.","El estilo no garantiza delimitación.","La extensión no garantiza precisión.","No es científico.","Conocer el tema ayuda, pero no sustituye definición explícita."],
f:"Si no puedes decir qué, quién, dónde y cuándo, aún no has delimitado suficientemente el problema."}
];
Q.forEach((q,i)=>window.TESIS_S8_QUESTIONS.push({id:"C2Q"+String(i+1).padStart(2,"0"),classNo:2,topic:"Problema de investigación",stem:q.s,options:q.o,answer:q.a,explanation:q.e,rationales:q.r,fija:q.f}));})();