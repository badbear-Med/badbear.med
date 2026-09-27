(()=>{"use strict";
const Q=[
{s:"Al revisar literatura sobre progresión de prediabetes, el equipo encuentra 120 artículos. ¿Cuál criterio debería guiar primero la selección de antecedentes?",
o:["Cantidad de páginas","Relación directa con el problema, variables y diseño del proyecto","Prestigio visual de la revista","Que todos reporten resultados positivos","Que sean fáciles de resumir"],
a:1,e:"La selección debe priorizar pertinencia temática y metodológica respecto al problema de investigación.",
r:["La extensión no determina utilidad.","Correcta: pertinencia y comparabilidad son centrales.","La apariencia no es criterio científico.","Excluir resultados negativos sesga la revisión.","La facilidad de resumen no determina calidad."],
f:"Antecedente útil = estudio que ayuda a entender o comparar tu pregunta, método o resultados."},

{s:"Un artículo analiza prevalencia de diabetes en población general, mientras otro sigue personas con prediabetes para estudiar progresión y factores asociados. ¿Cuál es más pertinente como antecedente central del proyecto guía?",
o:["El de prevalencia general porque tiene una muestra mayor","El de progresión desde prediabetes porque comparte desenlace, población conceptual y lógica analítica","Ambos son equivalentes","Ninguno porque no se realizó en el mismo hospital","Solo el más reciente, sin importar contenido"],
a:1,e:"La comparabilidad temática y metodológica hace más útil al estudio de progresión, aunque otros artículos puedan servir para contexto.",
r:["Tamaño no sustituye pertinencia.","Correcta.","No tienen la misma función.","Un estudio externo puede ser útil si es comparable.","La actualidad importa, pero no reemplaza relevancia."],
f:"No toda fuente relacionada con diabetes es un antecedente pertinente."},

{s:"¿Qué función cumple la revisión bibliográfica antes de cerrar el problema?",
o:["Puede aclarar la pregunta, mostrar vacíos y ayudar a evaluar viabilidad","Solo sirve para escribir la discusión final","Sustituye la necesidad de método","Permite evitar definir variables","Garantiza que el estudio será original"],
a:0,e:"La revisión temprana ayuda a identificar qué se sabe, qué falta y cómo se ha investigado.",
r:["Correcta.","También sirve desde etapas iniciales.","No sustituye el método.","Ayuda precisamente a definir conceptos y variables.","No garantiza originalidad absoluta, pero reduce duplicación involuntaria."],
f:"La literatura participa en la construcción del problema, no solo en su decoración."},

{s:"Un estudiante copia el resumen de diez artículos y los coloca uno debajo del otro. ¿Qué falta para que exista una verdadera revisión bibliográfica?",
o:["Más citas textuales","Síntesis crítica y organización que muestre el estado del conocimiento","Un mayor número de artículos","Eliminar resultados contradictorios","Traducir todos los artículos"],
a:1,e:"La revisión debe integrar y analizar evidencia, no concatenar extractos.",
r:["Aumentaría el problema.","Correcta.","Cantidad no sustituye análisis.","Excluir discrepancias sesga la revisión.","La traducción no crea síntesis."],
f:"Revisar literatura = seleccionar + comparar + sintetizar + interpretar."},

{s:"Dos cohortes muestran asociaciones distintas entre obesidad y progresión a DM2. ¿Cuál es el uso más riguroso de esa discrepancia?",
o:["Elegir solo la que coincide con la hipótesis","Comparar diferencias de población, medición y diseño y presentarla como posible brecha o heterogeneidad","Descartar ambas","Promediar sus conclusiones sin revisar métodos","Asumir que una es falsa"],
a:1,e:"Las discrepancias deben analizarse en contexto metodológico; pueden revelar heterogeneidad o una brecha relevante.",
r:["Introduce sesgo de confirmación.","Correcta.","No hay razón para descartar ambas.","No puede combinarse sin evaluar comparabilidad.","No puede asumirse falsedad."],
f:"La contradicción en la literatura es información, no un problema que debas ocultar."},

{s:"¿Qué diferencia mejor antecedente y base teórica?",
o:["El antecedente resume investigaciones previas comparables; la base teórica desarrolla conceptos y relaciones necesarias para comprender el estudio","Son exactamente iguales","La base teórica contiene solo resultados propios","El antecedente no requiere método","La base teórica es la lista de referencias"],
a:0,e:"Antecedentes y bases teóricas cumplen funciones distintas dentro del marco teórico.",
r:["Correcta.","No son iguales.","No contiene resultados propios.","Un antecedente útil debe considerar método.","La lista de referencias es otra sección."],
f:"Antecedente responde ‘qué estudiaron otros’; base teórica responde ‘con qué conceptos entiendo mi problema’."},

{s:"Para el proyecto guía, ¿cuál conjunto pertenece con mayor claridad a bases teóricas?",
o:["Prediabetes, DM2, progresión metabólica, HbA1c, obesidad y seguimiento médico","Historia completa de la endocrinología","Biografías de investigadores","Presupuesto del hospital","Resultados todavía no obtenidos"],
a:0,e:"Las bases teóricas deben concentrarse en conceptos vinculados con las variables y el problema.",
r:["Correcta.","Es demasiado amplio y poco funcional.","No aporta al problema.","Es administrativo.","No pueden incluirse como si ya existieran."],
f:"Cada concepto del marco teórico debe justificar su presencia por una función dentro del estudio."},

{s:"¿Qué criterio debería usarse para decidir si un artículo entra como antecedente?",
o:["Si se relaciona con el problema, qué aspectos aborda, desde qué perspectiva y cómo se conecta con el estudio","Si tiene más de 20 páginas","Si usa muchas figuras","Si fue el primero encontrado","Si tiene palabras similares en el título"],
a:0,e:"El material propone evaluar relación con el problema, contenido y perspectiva.",
r:["Correcta.","La extensión no garantiza relevancia.","Las figuras no determinan pertinencia.","El orden de hallazgo no importa.","Coincidencia de palabras no basta."],
f:"Seleccionar antecedentes exige juicio metodológico, no coincidencia superficial."},

{s:"Un estudio extranjero usa criterios diagnósticos distintos para prediabetes. ¿Cómo debe utilizarse como antecedente?",
o:["Copiar sus resultados sin comentario","Evaluar la diferencia de definición porque afecta comparabilidad con el proyecto guía","Descartarlo automáticamente por ser extranjero","Convertir sus cifras a las locales sin datos","Usarlo solo por ser reciente"],
a:1,e:"Las diferencias de definición operacional pueden explicar variaciones en resultados y deben analizarse.",
r:["Ignora una diferencia clave.","Correcta.","La procedencia geográfica no obliga a descartarlo.","No puede transformarse arbitrariamente.","La actualidad no basta."],
f:"Comparar antecedentes también significa comparar cómo definieron y midieron sus variables."},

{s:"¿Qué fuente constituye mejor evidencia primaria?",
o:["Artículo original que reporta métodos y resultados de una cohorte","Manual que resume varios estudios","Editorial de opinión","Índice bibliográfico","Página de divulgación"],
a:0,e:"Una fuente primaria reporta directamente una investigación original.",
r:["Correcta.","Es secundaria.","No reporta necesariamente datos originales.","Es una herramienta de localización.","Es divulgativa."],
f:"Para antecedentes, vuelve a la fuente original siempre que sea posible."},

{s:"¿Cuál es una ventaja metodológica de revisar bibliografía de calidad?",
o:["Permite conocer métodos previos y prevenir errores ya identificados","Elimina la necesidad de pilotear instrumentos","Garantiza ausencia de sesgos","Sustituye el cálculo muestral","Hace innecesario definir hipótesis"],
a:0,e:"La revisión puede ofrecer sugerencias metodológicas y mostrar errores de trabajos anteriores.",
r:["Correcta.","No sustituye pilotaje.","No elimina sesgo.","No reemplaza cálculo muestral.","No reemplaza hipótesis cuando corresponde."],
f:"La literatura enseña tanto qué se sabe como cómo se ha estudiado."},

{s:"Un marco teórico tiene 40 páginas sobre fisiopatología general de diabetes, pero apenas explica las variables que serán analizadas. ¿Cuál es la mejor crítica?",
o:["Está desalineado: amplitud no equivale a pertinencia","Es sólido porque es extenso","Debe duplicar su tamaño","No necesita relación con variables","El marco teórico debe ser enciclopédico"],
a:0,e:"La profundidad y amplitud deben responder a la naturaleza del problema y a la relevancia de la información.",
r:["Correcta.","La extensión no garantiza utilidad.","Más longitud no corrige enfoque.","Sí debe relacionarse.","No debe ser enciclopédico por defecto."],
f:"Marco teórico útil > marco teórico largo."},

{s:"¿Qué característica debe tener una revisión bibliográfica selectiva?",
o:["Priorizar referencias relevantes y recientes sin excluir evidencia por el sentido de sus resultados","Incluir solo resultados positivos","Usar solo libros","Usar una única base de datos","Eliminar estudios con resultados discordantes"],
a:0,e:"Selectiva significa pertinente y de calidad, no sesgada hacia una conclusión.",
r:["Correcta.","Eso sería sesgo de publicación/selección.","Los artículos originales son esenciales.","Una sola fuente puede limitar cobertura.","Las discrepancias deben analizarse."],
f:"Selectividad científica = relevancia; selectividad sesgada = elegir solo lo que confirma."},

{s:"¿Qué información mínima hace más útil el resumen de un antecedente?",
o:["Pregunta/objetivo, población, diseño, variables principales y resultados relevantes","Solo el título","Solo la conclusión","Solo el tamaño muestral","Solo la revista"],
a:0,e:"Esos elementos permiten comparar el estudio previo con el proyecto actual.",
r:["Correcta.","Insuficiente.","Sin método no puede evaluarse.","El tamaño aislado no explica el estudio.","La revista no resume contenido."],
f:"Antecedente bien resumido permite entender qué se hizo, en quiénes, cómo y qué se encontró."},

{s:"El equipo usa una revisión sistemática para localizar estudios originales y luego consulta esos estudios primarios. ¿Qué práctica refleja?",
o:["Uso de fuentes secundarias para localizar fuentes primarias pertinentes","Plagio","Sustitución de antecedentes por opiniones","Muestreo por conveniencia","Análisis estadístico"],
a:0,e:"Las fuentes secundarias pueden ser útiles para identificar literatura primaria relevante.",
r:["Correcta.","No es plagio si se cita adecuadamente.","No sustituye evidencia por opinión.","No es muestreo de participantes.","No es análisis de datos del estudio."],
f:"Una buena búsqueda usa distintas fuentes para llegar a la evidencia primaria relevante."},

{s:"¿Qué error se comete si un antecedente se elige solo porque tiene la palabra “diabetes” en el título?",
o:["Confundir coincidencia temática superficial con pertinencia metodológica y conceptual","Aumentar demasiado la validez","Mejorar la síntesis","Asegurar comparabilidad","Ninguno"],
a:0,e:"La relación con el problema requiere más que compartir una palabra.",
r:["Correcta.","No aumenta validez.","No garantiza síntesis.","No asegura comparabilidad.","Sí hay error."],
f:"Antecedente pertinente comparte problema, variables, población conceptual o diseño relevante; no solo vocabulario."},

{s:"¿Qué papel cumple el marco conceptual?",
o:["Precisar términos y conceptos utilizados para describir e interpretar el problema","Reemplazar la hipótesis","Calcular tamaño muestral","Definir presupuesto","Presentar resultados"],
a:0,e:"El marco conceptual clarifica el significado de conceptos centrales utilizados en el estudio.",
r:["Correcta.","No reemplaza hipótesis.","No calcula muestra.","No es administrativo.","No presenta resultados."],
f:"Conceptos ambiguos producen variables ambiguas; el marco conceptual ayuda a evitarlos."},

{s:"Una revisión no incluye estudios recientes aunque existan y sean relevantes. ¿Qué criterio se debilita?",
o:["Actualidad de la evidencia","Aleatorización","Confidencialidad","Enmascaramiento","Factibilidad administrativa"],
a:0,e:"El material recomienda seleccionar referencias importantes y recientes.",
r:["Correcta.","No es diseño experimental.","No es ética.","No es cegamiento.","No es administración."],
f:"La evidencia envejece; la relevancia temporal importa especialmente en ciencias de la salud."},

{s:"¿Cuál enunciado integra mejor la función de la revisión en el proyecto guía?",
o:["Ayuda a justificar la pregunta, definir variables, comparar métodos y contextualizar los resultados futuros","Solo llena la introducción","Solo sirve para elegir el título","Reemplaza la recolección de datos","Evita toda incertidumbre"],
a:0,e:"La revisión bibliográfica cumple funciones conceptuales y metodológicas a lo largo del proyecto.",
r:["Correcta.","No es decorativa.","No se limita al título.","No sustituye datos propios.","No elimina incertidumbre."],
f:"La revisión bibliográfica acompaña al proyecto desde la pregunta hasta la discusión."},

{s:"Si el investigador parafrasea un artículo pero no cita la fuente, ¿qué problema existe?",
o:["Uso inadecuado de la fuente y riesgo de plagio","Mejora del estilo","No hay problema porque no copió literalmente","Mayor objetividad","Conversión en fuente primaria"],
a:0,e:"Parafrasear no elimina la obligación de atribuir ideas ajenas.",
r:["Correcta.","No es solo estilo.","La idea sigue siendo ajena.","No mejora objetividad.","No cambia el tipo de fuente."],
f:"Parafrasear correctamente = reescribir con tus palabras + citar la fuente de la idea."}
];
Q.forEach((q,i)=>window.TESIS_S8_QUESTIONS.push({id:"C5Q"+String(i+1).padStart(2,"0"),classNo:5,topic:"Marco teórico y antecedentes",stem:q.s,options:q.o,answer:q.a,explanation:q.e,rationales:q.r,fija:q.f}));})();