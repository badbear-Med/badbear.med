(()=>{"use strict";
const Q=[
{s:"El proyecto guía utilizará registros 2022–2026 para identificar pacientes con prediabetes, clasificarlos según HbA1c basal y determinar posteriormente quién desarrolló DM2. No se asignó ninguna exposición. ¿Qué clasificación describe mejor este componente?",
o:["Experimental verdadero, longitudinal","Observacional, analítico y longitudinal con lógica de cohorte","Transversal descriptivo","Casos y controles necesariamente","Cuasiexperimental"],
a:1,e:"El investigador no asigna la exposición; parte de una exposición basal y observa un desenlace posterior, lo que corresponde a una lógica de cohorte observacional y longitudinal.",
r:["No existe manipulación ni aleatorización.","Correcta: exposición→desenlace en el tiempo sin intervención del investigador.","Una medición única no captura progresión.","Podría diseñarse como casos y controles si se seleccionara por desenlace, pero aquí se parte de exposición.","No hay intervención asignada."],
f:"Para clasificar el diseño pregunta primero: ¿quién asignó la exposición y desde dónde empieza la comparación?"},

{s:"Se seleccionan 150 pacientes que progresaron a DM2 y 150 que no progresaron, y luego se revisa si tenían obesidad al inicio. ¿Qué diseño refleja esa lógica?",
o:["Cohorte","Casos y controles","Ensayo clínico","Transversal descriptivo","Panel cualitativo"],
a:1,e:"La selección se hace según el desenlace y luego se reconstruye la exposición previa: lógica clásica de casos y controles.",
r:["La cohorte parte de exposición.","Correcta.","No hay intervención asignada.","No es un único corte descriptivo.","No corresponde."],
f:"Casos y controles: primero desenlace, después exposición previa."},

{s:"En el estudio anterior, ¿qué medida de asociación es la más coherente con el esquema trabajado en clase?",
o:["Riesgo relativo calculado directamente de incidencia","Odds ratio","Alfa de Cronbach","Diferencia de medias obligatoria","Valor predictivo positivo"],
a:1,e:"El material muestra el odds ratio como medida típica en casos y controles.",
r:["En casos y controles no se estima incidencia de forma directa con esa lógica.","Correcta.","Mide consistencia interna.","No es obligatoria ni central.","No es la medida del esquema."],
f:"En el esquema de clase: casos y controles → OR; cohortes → RR."},

{s:"Una cohorte clasifica pacientes como expuestos o no a HbA1c elevada y luego registra progresión a DM2. ¿Qué medida de asociación se deriva de comparar incidencias?",
o:["Odds ratio exclusivamente","Riesgo relativo","Alfa de Cronbach","Kappa","Mediana"],
a:1,e:"El riesgo relativo compara la incidencia en expuestos con la incidencia en no expuestos.",
r:["Puede estimarse OR, pero el esquema trabajado enfatiza RR.","Correcta.","No mide asociación exposición-desenlace.","No es la medida principal aquí.","No compara riesgo."],
f:"RR = riesgo en expuestos / riesgo en no expuestos."},

{s:"El hospital implementó seguimiento médico intensivo en una unidad por decisión institucional, sin asignación al azar, y se compara su progresión con otra unidad que mantuvo atención habitual. ¿Qué diseño se aproxima más si el investigador evalúa esa intervención?",
o:["Experimental verdadero","Cuasiexperimental","Casos y controles","Transversal descriptivo","Fenomenológico"],
a:1,e:"Existe una intervención/comparación, pero no hay aleatorización; por ello no reúne las condiciones de un experimento verdadero.",
r:["Falta aleatorización.","Correcta.","La selección no parte del desenlace.","No es una sola medición descriptiva.","No es enfoque cualitativo."],
f:"Intervención sin aleatorización suele corresponder a un cuasiexperimento."},

{s:"Si los pacientes son asignados al azar a seguimiento intensivo o atención habitual, ¿qué elemento se agrega respecto al escenario cuasiexperimental?",
o:["Solo mayor tamaño muestral","Aleatorización","Eliminación del grupo control","Diseño transversal","Ausencia de manipulación"],
a:1,e:"La aleatorización asigna sujetos al azar a los grupos y es un componente clave del experimento verdadero.",
r:["El tamaño no define la diferencia esencial.","Correcta.","El grupo control sigue siendo importante.","No se vuelve transversal.","Sí existe manipulación."],
f:"Experimento verdadero: manipulación + control + aleatorización."},

{s:"¿Cuál es la función metodológica más importante de la aleatorización?",
o:["Garantizar que todos los resultados sean significativos","Reducir sesgo de selección y favorecer comparabilidad entre grupos","Eliminar necesidad de seguimiento","Sustituir el consentimiento informado","Convertir cualquier variable en causal"],
a:1,e:"La aleatorización busca distribuir características conocidas y desconocidas de forma más equilibrada entre grupos y disminuir sesgo de selección.",
r:["No garantiza significancia.","Correcta.","No elimina seguimiento.","No sustituye ética.","No crea causalidad por sí sola."],
f:"Aleatorización mejora comparabilidad; no garantiza éxito terapéutico ni elimina otros sesgos."},

{s:"En un ensayo, los pacientes desconocen su grupo, pero el personal que evalúa resultados y el analista conocen la asignación. ¿Qué nivel de enmascaramiento representa mejor el esquema de clase?",
o:["Sin enmascaramiento","Simple","Doble","Triple","Cuádruple"],
a:1,e:"En el esquema, el cegamiento simple puede aplicarse al sujeto mientras otros participantes del proceso conocen la asignación.",
r:["El sujeto sí está ciego.","Correcta.","Doble implica al menos otro actor cegado.","Triple incluye sujeto, observador y analista.","No fue el esquema presentado."],
f:"El nombre del enmascaramiento depende de quién desconoce la asignación."},

{s:"Si sujeto, observador y analista desconocen el grupo asignado, ¿qué denominación corresponde al esquema presentado?",
o:["Simple","Doble","Triple","Cuasiexperimental","Observacional"],
a:2,e:"El material muestra enmascaramiento triple cuando sujeto, observador y analista permanecen ciegos.",
r:["Solo un nivel de cegamiento.","No alcanza a los tres actores.","Correcta.","Es tipo de diseño, no cegamiento.","No es cegamiento."],
f:"Triple cegamiento busca reducir sesgos en participación, medición y análisis."},

{s:"¿Cuál escenario representa mejor un estudio transversal?",
o:["Medir una sola vez HbA1c, IMC y presencia de DM2 en una población en un momento definido","Seguir cinco años hasta progresión","Partir de expuestos y observar incidencia futura","Asignar seguimiento y medir antes/después","Seleccionar casos y revisar exposición previa"],
a:0,e:"Un estudio transversal mide variables en un corte temporal sin seguimiento del cambio individual.",
r:["Correcta.","Es longitudinal.","Es cohorte longitudinal.","Es intervención longitudinal.","Es casos y controles."],
f:"Transversal = fotografía; longitudinal = película."},

{s:"El título del proyecto usa la palabra “impacto”. ¿Por qué no basta para afirmar que el estudio es experimental?",
o:["Porque el diseño depende de cómo se asignó la exposición/intervención y cómo se formaron los grupos","Porque toda investigación en salud es observacional","Porque la palabra impacto está prohibida","Porque un experimento nunca usa pacientes","Porque los experimentos no tienen objetivos"],
a:0,e:"La clasificación metodológica se determina por la arquitectura real del estudio, no por el vocabulario del título.",
r:["Correcta.","No: existen ensayos clínicos.","No está prohibida.","Sí pueden incluir pacientes.","Sí tienen objetivos."],
f:"No clasifiques el diseño por palabras del título; clasifícalo por lo que realmente hizo el investigador."},

{s:"Un investigador observa exposición a seguimiento habitual ya registrada y compara progresión sin intervenir. ¿Cuál es la interpretación más rigurosa?",
o:["Es experimental porque existe una exposición llamada seguimiento","Es observacional porque el investigador no asignó la exposición","Es cuasiexperimental siempre","Es cualitativo","Es preexperimental"],
a:1,e:"Si el seguimiento ocurrió como parte de la práctica clínica y el investigador solo observa, no hay manipulación experimental.",
r:["El nombre de la exposición no define intervención experimental.","Correcta.","No hay intervención asignada.","No se basa en experiencias narrativas.","No se manipula."],
f:"Intervención clínica previa puede ser una exposición observacional para el investigador."},

{s:"¿Qué distingue mejor un paradigma empírico-positivista dentro del material?",
o:["Énfasis en medición, rigor, precisión estadística y replicabilidad","Rechazo de toda medición","Investigador necesariamente participante","Ausencia de planificación a priori","Uso exclusivo de narrativas"],
a:0,e:"El material asocia el paradigma empírico-positivista con investigación clásica cuantitativa, medición y rigor.",
r:["Correcta.","Ocurre lo contrario.","Se asocia más con otros enfoques.","La investigación clásica se planifica a priori.","No es exclusivo."],
f:"Paradigma define cómo concebimos conocimiento válido y cómo debe producirse."},

{s:"En una investigación cualitativa, ¿qué característica contrasta con la investigación clásica cuantitativa según las diapositivas?",
o:["El diseño puede modificarse durante el proceso y el investigador puede formar parte de la investigación","Siempre usa aleatorización","Solo mide variables numéricas","Necesita grupo control","No puede estudiar salud"],
a:0,e:"El material señala que la investigación cualitativa puede ser flexible y reconocer la participación del investigador.",
r:["Correcta.","No es requisito.","No se limita a medición numérica.","No requiere grupo control.","Sí puede aplicarse en salud."],
f:"Flexibilidad del proceso no significa ausencia de rigor; significa otra lógica de investigación."},

{s:"El estudio añade entrevistas a pacientes para comprender barreras al seguimiento además del análisis cuantitativo de progresión. ¿Qué enfoque global podría justificarse?",
o:["Exclusivamente cuantitativo","Mixto","Solo experimental","Solo transversal","Solo ecológico"],
a:1,e:"Integrar mediciones cuantitativas con una fase cualitativa formal corresponde a un enfoque mixto.",
r:["No incluye la fase cualitativa.","Correcta.","El enfoque no depende de intervención.","La temporalidad no define enfoque.","No se trabaja necesariamente con datos agregados."],
f:"Mixto no significa ‘usar muchas técnicas’; significa integrar componentes cuantitativos y cualitativos con propósito."},

{s:"¿Qué afirmación distingue mejor alcance y diseño?",
o:["El alcance indica profundidad de la pregunta; el diseño organiza cómo se obtendrá evidencia para responderla","Son sinónimos","El diseño solo se decide al final","El alcance depende del software","Ninguno depende del problema"],
a:0,e:"El alcance se refiere a lo que se pretende lograr —explorar, describir, relacionar, explicar— y el diseño a la estrategia metodológica.",
r:["Correcta.","No son sinónimos.","Se decide antes de ejecutar.","No depende del software.","Ambos dependen de la pregunta."],
f:"Primero define qué quieres saber; luego elige el diseño capaz de saberlo."},

{s:"El objetivo es estimar proporción de progresión y luego identificar factores asociados. ¿Qué combinación de alcances representa mejor esa estructura?",
o:["Solo exploratorio","Descriptivo + analítico/correlacional","Solo cualitativo","Experimental por definición","Solo predictivo"],
a:1,e:"Estimar frecuencia es descriptivo; analizar asociaciones agrega un componente analítico/correlacional.",
r:["No necesariamente hay ausencia de conocimiento.","Correcta.","No corresponde al tipo de datos descrito.","La intervención no se deduce de esos objetivos.","La predicción no está necesariamente planteada."],
f:"Un mismo estudio puede contener objetivos de distinto alcance."},

{s:"¿Cuál error metodológico aparece si se llama “cohorte” a cualquier grupo de pacientes que comparten un diagnóstico, sin considerar exposición y seguimiento?",
o:["Se confunde el significado epidemiológico del diseño con el uso coloquial de grupo","Se mejora validez externa","Se elimina necesidad de desenlace","Se vuelve experimental","No hay error"],
a:0,e:"En diseño epidemiológico, una cohorte implica una estructura temporal y seguimiento respecto de exposición/desenlace, no solo un conjunto de personas.",
r:["Correcta.","No mejora por nombrarla cohorte.","El desenlace sigue siendo esencial.","No implica intervención.","Sí existe error conceptual."],
f:"Cohorte no es sinónimo de ‘grupo’; es una estrategia de seguimiento."},

{s:"Un estudio compara dos grupos de pacientes, pero los grupos se formaron por decisión del investigador sin aleatorización y se mide antes y después. ¿Qué elemento impide llamarlo experimento verdadero?",
o:["Ausencia de hipótesis","Ausencia de aleatorización","Presencia de grupo comparador","Medición longitudinal","Uso de pacientes"],
a:1,e:"El experimento verdadero requiere aleatorización además de manipulación y control.",
r:["Puede tener hipótesis.","Correcta.","El control favorece el experimento.","La longitudinalidad es compatible.","Los pacientes pueden participar."],
f:"No toda intervención controlada es un experimento verdadero."},

{s:"¿Qué decisión metodológica ayuda más a reducir sesgo del evaluador cuando el desenlace exige juicio clínico?",
o:["Enmascarar al observador respecto al grupo cuando sea posible","Aumentar el título","Eliminar el grupo control","Reducir seguimiento","Cambiar hipótesis después"],
a:0,e:"El cegamiento del observador reduce la influencia del conocimiento de la asignación sobre la medición del desenlace.",
r:["Correcta.","No tiene efecto.","Empeora comparación.","No resuelve sesgo del observador.","Introduce sesgo post hoc."],
f:"El enmascaramiento protege la medición y análisis frente a expectativas sobre los grupos."}
];
Q.forEach((q,i)=>window.TESIS_S8_QUESTIONS.push({id:"C4Q"+String(i+1).padStart(2,"0"),classNo:4,topic:"Enfoque, tipo y diseño",stem:q.s,options:q.o,answer:q.a,explanation:q.e,rationales:q.r,fija:q.f}));})();