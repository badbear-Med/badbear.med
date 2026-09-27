(()=>{"use strict";
const Q=[
{s:"Para el proyecto guía se revisarán historias clínicas. ¿Cuál combinación técnica–instrumento es más coherente?",
o:["Encuesta – cronograma","Análisis documental – ficha estructurada de registro","Entrevista – presupuesto","Observación participante – matriz de consistencia","Ensayo clínico – cuestionario"],
a:1,e:"Cuando se extraen datos de documentos clínicos, la técnica es análisis documental y el instrumento puede ser una ficha de registro.",
r:["No corresponde al tipo de fuente.","Correcta.","El presupuesto no es instrumento de medición.","La matriz de consistencia no es instrumento de recojo.","No describe la situación."],
f:"Técnica = procedimiento general de obtención; instrumento = herramienta concreta con la que registras el dato."},

{s:"Dos revisores extraen información de la misma historia y clasifican distinto el seguimiento médico. ¿Qué problema debe corregirse antes de continuar?",
o:["Falta de estandarización y posible baja objetividad/confiabilidad de la medición","Tamaño muestral demasiado grande","Exceso de bibliografía","Ausencia de aleatorización","Falta de presupuesto"],
a:0,e:"Criterios ambiguos permiten que el resultado dependa del recolector, comprometiendo consistencia y objetividad.",
r:["Correcta.","No se deduce del desacuerdo.","No es bibliografía.","No aplica a extracción observacional.","No es el problema central."],
f:"Si dos recolectores no aplican la misma regla, el instrumento no está suficientemente estandarizado."},

{s:"Un instrumento produce prácticamente los mismos resultados al repetirse, pero en realidad no mide el constructo que pretende medir. ¿Cómo se describe mejor?",
o:["Alta confiabilidad, baja validez","Alta validez, baja confiabilidad","Alta objetividad necesariamente","Validez perfecta","No puede ocurrir"],
a:0,e:"La consistencia puede ser alta aunque el instrumento mida sistemáticamente algo diferente de lo que debería.",
r:["Correcta.","El caso describe consistencia, no validez.","La objetividad es otra propiedad.","No.","Sí puede ocurrir."],
f:"Confiable no significa válido: puedes medir consistentemente la cosa equivocada."},

{s:"¿Qué propiedad responde a la pregunta “¿realmente mide la variable que pretende medir?”?",
o:["Confiabilidad","Validez","Objetividad","Precisión presupuestaria","Aleatorización"],
a:1,e:"La validez se refiere al grado en que el instrumento mide el constructo o variable pretendida.",
r:["Confiabilidad es consistencia.","Correcta.","Objetividad es resistencia a sesgos del evaluador.","No.","No."],
f:"Validez = medir lo correcto; confiabilidad = medir de forma consistente."},

{s:"¿Qué propiedad se compromete si la puntuación depende excesivamente de quién administra o interpreta el instrumento?",
o:["Objetividad","Tamaño muestral","Viabilidad","Bibliografía","Incidencia"],
a:0,e:"La objetividad disminuye cuando los resultados son permeables a sesgos y tendencias del evaluador.",
r:["Correcta.","No.","No.","No.","No."],
f:"Estandarización de instrucciones y criterios protege la objetividad."},

{s:"Antes de aplicar una nueva ficha a toda la muestra, se usa en 20 historias para detectar campos ambiguos y variables ausentes. ¿Qué etapa representa?",
o:["Prueba piloto","Análisis definitivo","Publicación","Aleatorización","Discusión"],
a:0,e:"La prueba piloto permite detectar y corregir problemas antes de la aplicación completa.",
r:["Correcta.","No produce resultados definitivos.","No.","No.","No."],
f:"Pilotear es ensayar el proceso de medición, no probar la hipótesis principal."},

{s:"La prueba piloto muestra que la variable “seguimiento” no puede extraerse de forma reproducible. ¿Qué acción es más rigurosa?",
o:["Refinar definición operacional e instrumento y repetir la prueba antes de escalar","Ignorar el problema","Inventar una categoría","Cambiar la hipótesis después de recolectar","Aplicar igual para no perder tiempo"],
a:0,e:"El propósito del piloto es precisamente permitir ajustes antes de comprometer toda la muestra.",
r:["Correcta.","Mantendría error.","No es válido.","No corrige medición.","Amplificaría la falla."],
f:"Un piloto que detecta un problema es exitoso si el problema se corrige antes del estudio definitivo."},

{s:"¿Qué secuencia refleja mejor la construcción de un instrumento?",
o:["Variables → definiciones conceptuales → definiciones operacionales → instrumento → codificación → piloto","Piloto → problema → variables → instrumento","Resultados → instrumento → objetivos","Software → muestra → teoría","Conclusiones → instrumento"],
a:0,e:"El material propone partir de variables y sus definiciones, luego seleccionar/construir instrumento, codificar y pilotear.",
r:["Correcta.","Invierte la lógica.","No.","No.","No."],
f:"El instrumento es una consecuencia de la operacionalización."},

{s:"En la base, progresión a DM2 se registra como 0=no y 1=sí. ¿Cuál es la función de esa codificación?",
o:["Representar categorías de forma estandarizada para incorporarlas a la matriz de datos","Convertir una variable clínica en causal","Aumentar muestra","Eliminar datos faltantes","Garantizar validez"],
a:0,e:"La codificación asigna valores representativos a categorías para facilitar registro y análisis.",
r:["Correcta.","No crea causalidad.","No cambia tamaño.","No elimina faltantes.","No garantiza validez por sí sola."],
f:"Código es representación del dato, no sustituto de una definición operacional."},

{s:"¿Qué diferencia existe entre matriz de variables y matriz de datos?",
o:["La primera define nombres, tipos y códigos; la segunda contiene los valores observados por unidad de estudio","Son idénticas","La primera contiene resultados finales","La segunda contiene solo referencias","Ninguna se usa en análisis"],
a:0,e:"Los programas estadísticos distinguen la definición de variables de la tabla donde se introducen observaciones.",
r:["Correcta.","No.","No.","No.","Sí se utilizan."],
f:"Primero define la estructura de la base; después carga las observaciones."},

{s:"Antes de contrastar hipótesis, ¿qué análisis es lógico realizar sobre cada variable?",
o:["Estadística descriptiva: frecuencias, tendencia central y dispersión según corresponda","Publicar resultados","Eliminar valores extremos automáticamente","Cambiar categorías para obtener significancia","Redactar conclusión"],
a:0,e:"El material inicia el proceso analítico describiendo distribución y comportamiento de las variables.",
r:["Correcta.","Es posterior.","Los extremos deben evaluarse, no eliminarse automáticamente.","Sería manipulación post hoc.","Es posterior."],
f:"Primero entiende tus datos; luego pregunta qué relaciones muestran."},

{s:"Un cuestionario con varios ítems pretende medir una misma escala. ¿Qué procedimiento menciona el material para evaluar consistencia interna?",
o:["Alfa de Cronbach","Odds ratio","Riesgo relativo","Chi cuadrado","Prueba t"],
a:0,e:"El alfa de Cronbach se presenta como medida de consistencia interna.",
r:["Correcta.","Mide asociación en otro contexto.","Mide riesgo relativo.","Es prueba de asociación.","Compara medias."],
f:"Alfa de Cronbach evalúa consistencia interna; no demuestra validez del constructo por sí solo."},

{s:"¿Cuál prueba aparece en el material entre los análisis paramétricos?",
o:["Correlación de Pearson","Chi cuadrado","Solo frecuencias","Odds ratio","Kappa"],
a:0,e:"El material menciona Pearson, regresión lineal, prueba t y ANOVA entre los procedimientos paramétricos.",
r:["Correcta.","Se presenta entre no paramétricos.","Es descriptivo.","No es la clasificación central del material.","No fue el ejemplo principal."],
f:"La prueba estadística se selecciona por objetivo, tipo de variable y supuestos; no por costumbre."},

{s:"¿Cuál prueba aparece en el material entre los procedimientos no paramétricos?",
o:["Chi cuadrado","Prueba t","ANOVA","Regresión lineal","Media"],
a:0,e:"Chi cuadrado figura entre las opciones no paramétricas del esquema analítico.",
r:["Correcta.","Paramétrica.","Paramétrica.","Paramétrica.","Es medida descriptiva."],
f:"No confundas una estadística descriptiva con una prueba de hipótesis."},

{s:"La ficha incluye edad, sexo, HbA1c, IMC, triglicéridos y 30 variables sin relación con objetivos. ¿Cuál es el principal problema?",
o:["Recolección desalineada con la pregunta, mayor carga y riesgo de análisis no planificados","Aumento automático de validez","Reducción de sesgo","Conversión del estudio en experimental","Mejora de confiabilidad"],
a:0,e:"El plan de recolección debe centrarse en variables necesarias para responder objetivos e hipótesis.",
r:["Correcta.","Más variables no garantizan validez.","Puede aumentar complejidad y sesgo.","No cambia diseño.","No mejora confiabilidad automáticamente."],
f:"Cada campo del instrumento debe poder justificarse por un objetivo, variable o necesidad metodológica."},

{s:"Una variable central tiene 40% de datos faltantes. ¿Cuál es la respuesta metodológica más adecuada?",
o:["Evaluar patrón e impacto de los faltantes y reconocer la limitación","Completar valores con la media sin justificación","Eliminar todos los registros sin análisis","Cambiar el objetivo después","Ocultar el porcentaje"],
a:0,e:"Los datos faltantes deben cuantificarse, evaluarse y manejarse de forma transparente según un plan adecuado.",
r:["Correcta.","Imputar sin criterio puede sesgar.","Eliminar automáticamente puede sesgar.","Cambiar objetivos post hoc no corrige el problema.","Ocultar afecta integridad."],
f:"Datos faltantes son parte del dato: deben analizarse, no desaparecer del informe."},

{s:"¿Qué pregunta responde “¿con qué se mide?” dentro del plan de recolección?",
o:["Qué instrumento se utilizará","Qué hipótesis se formulará","Qué revista publicará","Qué financiamiento existe","Qué conclusión se espera"],
a:0,e:"El plan diferencia qué se mide, cómo, con qué instrumento, cómo se aplica y cómo se preparan datos.",
r:["Correcta.","Es previo.","No.","No.","No debe anticiparse."],
f:"Plan de recolección = qué + cómo + con qué + aplicación + preparación para análisis."},

{s:"El investigador aplica una ficha sin instrucciones y cada recolector interpreta categorías según su criterio. ¿Qué propiedades se ven amenazadas de forma más directa?",
o:["Objetividad y confiabilidad","Validez externa exclusivamente","Tamaño muestral","Financiamiento","Aleatorización"],
a:0,e:"La falta de estandarización aumenta variación entre recolectores y dependencia del evaluador.",
r:["Correcta.","Puede afectar otros aspectos, pero no es el problema principal.","No.","No.","No."],
f:"Instrumento sin manual de aplicación produce datos dependientes del recolector."},

{s:"Si una variable se define operacionalmente, pero el formulario no tiene ningún campo para registrarla, ¿dónde se rompe la cadena metodológica?",
o:["Entre operacionalización e instrumento","Entre discusión y conclusión","Entre presupuesto y cronograma","Entre bibliografía y portada","Entre título y referencias"],
a:0,e:"La definición operacional debe traducirse en un campo, ítem o procedimiento real de medición.",
r:["Correcta.","No.","No.","No.","No."],
f:"Variable definida pero no registrada = variable inexistente en la base."},

{s:"¿Cuál es la mejor práctica antes de iniciar recolección masiva?",
o:["Revisar variables, definiciones operacionales, instrumento, codificación, piloto y plan de análisis","Esperar a conocer resultados para decidir categorías","Recolectar todo lo disponible","Cambiar objetivos durante digitación","Eliminar la documentación del piloto"],
a:0,e:"La preparación previa reduce errores de medición, codificación y análisis.",
r:["Correcta.","Introduce sesgo post hoc.","No garantiza pertinencia.","Rompe coherencia.","El piloto debe documentarse."],
f:"La calidad del análisis nunca puede ser mayor que la calidad de los datos que entran a la base."}
];
Q.forEach((q,i)=>window.TESIS_S8_QUESTIONS.push({id:"C7Q"+String(i+1).padStart(2,"0"),classNo:7,topic:"Recolección de datos",stem:q.s,options:q.o,answer:q.a,explanation:q.e,rationales:q.r,fija:q.f}));})();