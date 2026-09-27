(()=>{"use strict";
const Q=[
{s:"¿Cuál objetivo general es más coherente con el proyecto guía sin anticipar el resultado?",
o:["Demostrar que el seguimiento médico evita la diabetes","Determinar los factores clínicos y metabólicos asociados a progresión a DM2 y evaluar el impacto del seguimiento médico en la población definida","Comprobar que la HbA1c es el mejor predictor","Conocer la diabetes","Probar que todos los pacientes necesitan intervención"],
a:1,e:"El objetivo debe expresar el propósito del estudio con neutralidad, sin asumir de antemano cuál será el resultado.",
r:["Presupone eficacia antes de investigar.","Correcta: cubre los componentes centrales sin anticipar conclusión.","Presupone jerarquía de predictor no establecida.","Es demasiado vago.","Introduce una conclusión normativa."],
f:"Objetivo bien redactado = verbo operativo + fenómeno/variables + población/contexto, sin fabricar la respuesta."},

{s:"Un objetivo específico dice “Comprender ampliamente la diabetes”. ¿Cuál es su principal debilidad?",
o:["Es demasiado operativo","No es concreto ni medible respecto al problema del estudio","Tiene un verbo incorrecto por estar en infinitivo","Incluye demasiada población","Es necesariamente cualitativo"],
a:1,e:"El objetivo no delimita qué aspecto de la diabetes se estudiará ni qué resultado permitirá evaluar su cumplimiento.",
r:["Ocurre lo contrario.","Correcta.","El infinitivo es apropiado; el problema es vaguedad.","No menciona población.","No necesariamente, pero no es el problema principal."],
f:"Objetivo evaluable debe permitir responder: ¿cómo sabré al final si lo cumplí?"},

{s:"¿Cuál objetivo específico descompone mejor el componente metabólico del proyecto?",
o:["Describir diabetes en general","Evaluar la asociación entre HbA1c basal y progresión a DM2 en la población definida","Revisar bibliografía sobre metabolismo","Conocer valores de laboratorio","Demostrar que HbA1c causa diabetes"],
a:1,e:"La opción establece una relación concreta, medible y vinculada al desenlace central.",
r:["Demasiado amplio.","Correcta.","Es una actividad, no el resultado investigativo principal.","Es vago.","Afirma causalidad antes de investigar."],
f:"Objetivo específico debe reducir el problema a una tarea analítica concreta."},

{s:"Si el problema general incluye seguimiento médico, pero el objetivo general solo menciona factores de riesgo, ¿qué corrección corresponde?",
o:["Agregar el componente de seguimiento al objetivo general o ajustar el problema/título para recuperar coherencia","Eliminar todos los objetivos específicos","Mantenerlo porque problema y objetivo son independientes","Agregar una conclusión anticipada","Cambiar solo la bibliografía"],
a:0,e:"El objetivo general debe corresponder al problema general y al título.",
r:["Correcta.","No es necesario.","No son independientes.","No debe anticiparse resultado.","La bibliografía no corrige incoherencia."],
f:"Problema y objetivo general deben poder colocarse uno debajo del otro y reconocerse como la misma investigación."},

{s:"¿Qué objetivo específico es más adecuado para una finalidad descriptiva?",
o:["Estimar la proporción de pacientes con prediabetes que progresan a DM2 durante el periodo de estudio","Demostrar causalidad entre obesidad y DM2","Probar eficacia del seguimiento","Comprender la experiencia emocional","Validar una escala no mencionada"],
a:0,e:"Estimar una proporción describe la frecuencia del desenlace en la población estudiada.",
r:["Correcta.","Es una finalidad analítica/causal.","Es intervención/efecto.","Sería otro enfoque y otra pregunta.","No corresponde al proyecto."],
f:"No todos los objetivos de un estudio analítico son analíticos; puede haber objetivos descriptivos necesarios."},

{s:"¿Qué objetivo específico representa mejor una comparación vinculada al componente de seguimiento?",
o:["Comparar la proporción de progresión a DM2 entre pacientes con y sin seguimiento médico según la definición del estudio","Describir el hospital","Enumerar publicaciones sobre diabetes","Conocer si el seguimiento es bueno","Demostrar beneficio antes de medirlo"],
a:0,e:"La comparación define grupos y desenlace de manera evaluable.",
r:["Correcta.","Irrelevante al objetivo central.","Es actividad de revisión, no objetivo principal.","Vago y valorativo.","Anticipa resultado."],
f:"Para comparar, define claramente grupos y desenlace."},

{s:"¿Qué relación debe existir entre objetivo general y objetivos específicos?",
o:["Los específicos deben contribuir de manera directa al logro del general","Los específicos pueden introducir temas ajenos","El general se redacta después de los resultados","Los específicos sustituyen la hipótesis","No necesitan relación"],
a:0,e:"Los específicos descomponen el propósito general en componentes operativos.",
r:["Correcta.","Eso rompe coherencia.","Debe redactarse antes.","No sustituyen hipótesis.","Sí necesitan relación."],
f:"Si un objetivo específico no ayuda a responder el general, probablemente no pertenece al estudio."},

{s:"¿Cuál de los siguientes verbos es más apropiado para un objetivo que busca cuantificar frecuencia?",
o:["Creer","Estimar","Sentir","Suponer","Imaginar"],
a:1,e:"“Estimar” expresa una acción medible y compatible con análisis cuantitativo.",
r:["No es operativo.","Correcta.","No es operativo.","No expresa una acción de investigación suficiente.","No es operativo."],
f:"El verbo del objetivo anticipa el tipo de análisis que necesitarás."},

{s:"Un objetivo plantea “determinar los factores asociados”, pero el método solo calcula frecuencias. ¿Cuál es el problema?",
o:["El método no permite alcanzar el objetivo analítico","El objetivo es demasiado corto","Las frecuencias siempre prueban asociación","Falta una cita bibliográfica","El objetivo debería escribirse en pasado"],
a:0,e:"Determinar asociación requiere un análisis que contraste relaciones entre variables; las frecuencias por sí solas no son suficientes.",
r:["Correcta.","La extensión no es el problema.","No, describen distribución.","No requiere cita en su redacción.","Los objetivos se formulan en infinitivo."],
f:"Cada objetivo debe tener una ruta metodológica y analítica que permita cumplirlo."},

{s:"¿Cuál afirmación diferencia mejor objetivo e hipótesis?",
o:["El objetivo expresa qué se pretende lograr; la hipótesis propone una relación que será contrastada cuando corresponda","Son exactamente lo mismo","La hipótesis reemplaza al objetivo","El objetivo siempre contiene H0","La hipótesis se redacta después de resultados"],
a:0,e:"Cumplen funciones distintas pero deben ser coherentes entre sí.",
r:["Correcta.","No.","No.","No.","Debe ser previa al contraste."],
f:"Objetivo pregunta qué harás; hipótesis anticipa una relación comprobable, no un resultado garantizado."},

{s:"La justificación dice únicamente: “El estudio se realiza porque es requisito para titularse”. ¿Cuál es el problema principal?",
o:["Expresa un motivo personal, pero no una justificación científica del estudio","Es una justificación metodológica completa","Es suficiente porque toda tesis tiene fin académico","Demuestra impacto social","Define el objetivo general"],
a:0,e:"La justificación debe explicar utilidad, aporte o relevancia científica/social/práctica, no solo el interés personal del investigador.",
r:["Correcta.","No habla de método.","No basta.","No demuestra impacto.","No define el objetivo."],
f:"Motivo personal para hacer una tesis no equivale a justificación del problema investigado."},

{s:"¿Cuál enunciado constituye mejor una justificación práctica?",
o:["Los resultados podrían orientar la identificación y seguimiento de pacientes con mayor riesgo de progresión","La investigación ampliará conceptos de resistencia a la insulina","Se utilizará una ficha estructurada","La diabetes tiene interés académico","Se citarán artículos recientes"],
a:0,e:"La justificación práctica explica cómo los resultados podrían aplicarse en decisiones o acciones.",
r:["Correcta.","Eso es más teórico.","Eso puede relacionarse con justificación metodológica.","Es muy general.","Eso es una práctica de revisión, no justificación."],
f:"Justificación práctica responde: ¿qué podría hacerse mejor con los resultados?"},

{s:"¿Cuál opción corresponde mejor a una justificación teórica?",
o:["Aportar evidencia sobre la relación entre factores clínico-metabólicos y progresión en una población local poco caracterizada","Comprar software","Reducir tiempo de digitación","Organizar turnos de trabajo","Imprimir fichas"],
a:0,e:"La justificación teórica se vincula con ampliar, contrastar o precisar conocimiento.",
r:["Correcta.","Es recurso.","Es logística.","Es organización.","Es presupuesto/material."],
f:"Justificación teórica = qué conocimiento puede fortalecerse, contrastarse o precisarse."},

{s:"¿Cuál ejemplo se aproxima más a una justificación metodológica?",
o:["Desarrollar y documentar una ficha estructurada que estandarice la extracción de variables clínicas y metabólicas cuando ello aporte utilidad al estudio","Señalar que la diabetes es frecuente","Afirmar que los pacientes se beneficiarán directamente","Decir que el hospital es grande","Usar un título extenso"],
a:0,e:"La justificación metodológica se relaciona con aportes o utilidad de procedimientos, medición o herramientas.",
r:["Correcta.","Es relevancia general, no metodología.","No debe prometer beneficios directos sin sustento.","No justifica método.","No tiene relación."],
f:"Justificación metodológica debe explicar qué mejora aporta el modo de producir evidencia."},

{s:"¿Cuál argumento representa mejor una justificación social?",
o:["Identificar perfiles de mayor riesgo podría contribuir a orientar estrategias de seguimiento que beneficien a pacientes y servicios","El análisis usará software estadístico","El protocolo tendrá anexos","Se empleará estilo Vancouver","La muestra será calculada"],
a:0,e:"La justificación social relaciona el estudio con potencial utilidad para personas, servicios o comunidad.",
r:["Correcta.","Es herramienta.","Es estructura documental.","Es formato.","Es método."],
f:"Justificación social = quién puede beneficiarse y de qué forma."},

{s:"Un objetivo específico dice “demostrar que el seguimiento disminuye la progresión”. ¿Qué corrección es más rigurosa?",
o:["Cambiarlo por “evaluar el impacto” o “comparar la progresión” sin anticipar dirección","Mantenerlo porque toda investigación debe demostrar algo","Cambiar “demostrar” por “confirmar”","Agregar “significativamente”","Eliminar el grupo comparador"],
a:0,e:"El objetivo debe formularse con neutralidad y permitir resultados en cualquier dirección.",
r:["Correcta.","No debe sesgarse.","“Confirmar” mantiene el sesgo.","Añadir significancia anticipa resultado.","Eliminar comparación empeora el diseño."],
f:"Objetivo neutral: investiga. Objetivo sesgado: intenta probar lo que ya decidió creer."},

{s:"Si el objetivo general contiene dos componentes —factores asociados e impacto del seguimiento—, ¿qué estructura de objetivos específicos es más coherente?",
o:["Incluir objetivos que desarrollen ambos componentes y un objetivo descriptivo básico si es necesario","Crear objetivos solo sobre edad y sexo","Eliminar el componente de seguimiento","Agregar objetivos de temas no relacionados","Hacer un único objetivo específico idéntico al general"],
a:0,e:"Los específicos deben cubrir las dimensiones relevantes del objetivo general sin introducir asuntos ajenos.",
r:["Correcta.","Sería incompleto.","Rompe coherencia con el general.","Introduce otro estudio.","No descompone el general."],
f:"La suma de objetivos específicos debe cubrir el alcance del objetivo general."},

{s:"¿Qué criterio permite juzgar al final si un objetivo fue cumplido?",
o:["Los resultados obtenidos responden directamente a lo que el objetivo se propuso medir o comparar","El estudio tiene muchas tablas","Todas las pruebas son significativas","La discusión es larga","La bibliografía supera 50 referencias"],
a:0,e:"Un objetivo se evalúa por correspondencia entre propósito y resultado, no por significancia o extensión.",
r:["Correcta.","Número de tablas no prueba cumplimiento.","Un resultado no significativo también puede responder al objetivo.","Extensión no equivale a calidad.","Cantidad de referencias no define logro."],
f:"Resultado no significativo puede cumplir perfectamente un objetivo si responde la pregunta."},

{s:"¿Cuál es la mejor razón para evitar objetivos ambiguos como “conocer” o “comprender” en un estudio cuantitativo cuando existen verbos más precisos?",
o:["Dificultan definir qué análisis o resultado demostrará su cumplimiento","Están prohibidos universalmente","Obligan a usar entrevistas","Impiden citar referencias","Siempre convierten el estudio en cualitativo"],
a:0,e:"En estudios cuantitativos conviene usar verbos que hagan visible la acción analítica esperada.",
r:["Correcta.","No existe una prohibición universal, pero suelen ser poco operativos.","No obligan por sí mismos.","No afectan citas.","No determinan enfoque por sí solos."],
f:"El mejor verbo es el que deja claro qué dato o análisis mostrará que el objetivo se cumplió."},

{s:"¿Qué combinación expresa la cadena de coherencia más sólida?",
o:["Problema general ↔ objetivo general; problemas específicos ↔ objetivos específicos; variables/análisis ↔ cada objetivo","Título ↔ presupuesto; muestra ↔ bibliografía","Objetivo ↔ portada; hipótesis ↔ anexos","Problema ↔ agradecimientos; método ↔ resumen","Justificación ↔ número de páginas"],
a:0,e:"La consistencia exige correspondencia entre preguntas, objetivos, variables y análisis.",
r:["Correcta.","No expresa coherencia científica.","No.","No.","No."],
f:"Si un objetivo no tiene variable o análisis correspondiente, la cadena metodológica está rota."}
];
Q.forEach((q,i)=>window.TESIS_S8_QUESTIONS.push({id:"C3Q"+String(i+1).padStart(2,"0"),classNo:3,topic:"Objetivos y justificación",stem:q.s,options:q.o,answer:q.a,explanation:q.e,rationales:q.r,fija:q.f}));})();