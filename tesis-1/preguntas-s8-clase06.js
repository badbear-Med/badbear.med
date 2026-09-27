(()=>{"use strict";
const Q=[
{s:"El problema específico pregunta si HbA1c elevada se asocia con progresión a DM2. ¿Cuál hipótesis es metodológicamente coherente?",
o:["La HbA1c es una prueba de laboratorio","La HbA1c elevada se asocia con mayor probabilidad de progresión a DM2 en la población estudiada","La diabetes es importante","Todos los pacientes con HbA1c alta progresarán","Se medirá HbA1c"],
a:1,e:"La hipótesis debe plantear una relación comprobable entre variables en la unidad de estudio.",
r:["Es una definición, no una hipótesis.","Correcta.","No plantea relación comprobable.","Es determinista y excesiva.","Describe procedimiento, no relación."],
f:"Hipótesis = relación entre variables que puede contrastarse con datos."},

{s:"¿Cuál es la hipótesis nula correspondiente al escenario anterior?",
o:["La HbA1c elevada no se asocia con la progresión a DM2","La HbA1c causa DM2","La HbA1c no se medirá","La progresión no existe","Todos los pacientes son iguales"],
a:0,e:"La hipótesis nula plantea ausencia de la asociación postulada.",
r:["Correcta.","Afirma causalidad.","Es una decisión de medición.","No corresponde.","Es impreciso."],
f:"H0 no significa ‘el estudio no sirve’; significa ausencia de la relación/diferencia contrastada."},

{s:"En la frase “el seguimiento médico se asocia con menor progresión a DM2 en pacientes con prediabetes”, ¿cuál es la unidad de estudio?",
o:["Seguimiento médico","Progresión a DM2","Pacientes con prediabetes","Se asocia con","Menor"],
a:2,e:"La unidad de estudio es la entidad sobre la que se observan las variables.",
r:["Es una variable/exposición.","Es un desenlace.","Correcta.","Es nexo lógico.","Es dirección de asociación."],
f:"Unidad de estudio = sobre quién o qué se mide."},

{s:"En la misma hipótesis, ¿cuál es el nexo lógico?",
o:["Pacientes","Seguimiento médico","Se asocia con","DM2","Prediabetes"],
a:2,e:"El nexo lógico expresa la relación propuesta entre las variables.",
r:["Unidad de estudio.","Variable/exposición.","Correcta.","Desenlace.","Condición de la población."],
f:"Sin nexo lógico no hay relación explícita que contrastar."},

{s:"¿Qué diferencia mejor definición conceptual y definición operacional?",
o:["La conceptual explica qué significa la variable en teoría; la operacional especifica cómo se medirá o clasificará en el estudio","Son iguales","La operacional solo cita libros","La conceptual se escribe después de resultados","La operacional no depende de objetivos"],
a:0,e:"La definición conceptual aporta significado teórico; la operacional traduce ese significado a reglas observables.",
r:["Correcta.","No son iguales.","Eso es conceptual.","Debe existir antes.","Sí debe corresponder al objetivo y contexto."],
f:"Conceptual = qué es; operacional = cómo sé, en mis datos, que está presente y cuánto vale."},

{s:"“Progresión a DM2” se define como diagnóstico de DM2 durante 2022–2026 según un criterio diagnóstico especificado. ¿Qué tipo de definición es?",
o:["Conceptual exclusivamente","Operacional","Bibliográfica","Hipótesis","Justificación"],
a:1,e:"Se está estableciendo una regla concreta para clasificar el desenlace en los datos.",
r:["No solo explica el concepto; indica cómo clasificar.","Correcta.","Puede basarse en bibliografía, pero su función es operacional.","No plantea relación.","No justifica el estudio."],
f:"Una definición operacional permite que dos investigadores clasifiquen al mismo paciente de la misma forma."},

{s:"HbA1c registrada como porcentaje continuo corresponde principalmente a una variable:",
o:["Cualitativa nominal","Cuantitativa","Ordinal necesariamente","Dicotómica","No medible"],
a:1,e:"Es una medición numérica con valores continuos.",
r:["No.","Correcta.","Solo sería ordinal si se categorizara en niveles ordenados.","No es solo sí/no.","Sí es medible."],
f:"No categorices una variable continua sin necesidad: puedes perder información."},

{s:"Si HbA1c se categoriza como normal, prediabetes y diabetes, ¿qué escala representa mejor esas categorías?",
o:["Nominal sin orden","Ordinal","Razón","Intervalo puro","Dicotómica"],
a:1,e:"Las categorías tienen una jerarquía clínica ordenada.",
r:["Sí existe orden.","Correcta.","La escala original numérica puede ser razón/continua, pero estas categorías son ordinales.","No describe categorías.","Hay tres categorías."],
f:"La misma variable puede analizarse en forma continua o categorizada; la escala cambia con la forma de representación."},

{s:"Sexo registrado como categorías sin jerarquía corresponde a escala:",
o:["Nominal","Ordinal","Intervalo","Razón","Continua"],
a:0,e:"Las categorías sin orden se clasifican como nominales.",
r:["Correcta.","Ordinal requiere orden.","No.","No.","No."],
f:"Nominal clasifica; ordinal clasifica y ordena."},

{s:"¿Qué significa operacionalizar una variable?",
o:["Transformar un concepto abstracto en dimensiones, indicadores, categorías y reglas de medición","Eliminar la variable","Escribir una hipótesis","Buscar una referencia","Calcular el tamaño muestral"],
a:0,e:"La operacionalización permite convertir conceptos en datos observables.",
r:["Correcta.","No.","No.","La bibliografía puede apoyar, pero no es la operación.","No."],
f:"Sin operacionalización, una variable existe en el papel pero no en la base de datos."},

{s:"El protocolo usa “seguimiento médico adecuado” sin definir número de controles, periodo ni criterio. ¿Qué problema existe?",
o:["La variable está conceptualmente vaga y operacionalmente indefinida","La variable es necesariamente cuantitativa","No necesita definición porque es clínica","La hipótesis está probada","El diseño se vuelve cualitativo"],
a:0,e:"“Adecuado” es valorativo y no permite clasificación reproducible sin una regla operacional.",
r:["Correcta.","Podría operacionalizarse de varias formas.","Sí necesita definición.","No está probada.","No cambia enfoque automáticamente."],
f:"Evita adjetivos sin criterio operativo: adecuado, alto, bajo, buen control, mal seguimiento."},

{s:"¿Cuál indicador podría representar de forma directa la intensidad de seguimiento médico?",
o:["Número de controles realizados dentro del periodo definido","Color de la historia clínica","Nombre del médico","Número de páginas del expediente","Fecha de impresión"],
a:0,e:"El número de controles es una observación concreta vinculada con la dimensión seguimiento.",
r:["Correcta.","No mide seguimiento.","No mide intensidad por sí solo.","No mide seguimiento.","No mide seguimiento."],
f:"Indicador = manifestación observable de una variable o dimensión."},

{s:"La hipótesis incluye obesidad, pero el instrumento no recoge peso, talla, IMC ni diagnóstico de obesidad. ¿Qué ocurre?",
o:["La hipótesis no puede contrastarse de manera adecuada porque falta medición de una variable","No hay problema","Se puede inferir obesidad por edad","La hipótesis se vuelve nula","El estudio se vuelve experimental"],
a:0,e:"Una hipótesis exige que sus variables estén operacionalizadas y medidas.",
r:["Correcta.","Sí hay problema.","Edad no sustituye obesidad.","H0/H1 no dependen de que falte el dato.","No cambia el diseño."],
f:"Hipótesis sin variable medida = hipótesis no contrastable."},

{s:"¿Cuál elemento de la matriz de operacionalización evita mayor ambigüedad en la recolección?",
o:["Definición operacional e indicador","Color de la tabla","Nombre del archivo","Número de referencias","Orden alfabético"],
a:0,e:"La definición operacional y el indicador especifican cómo se observará y registrará la variable.",
r:["Correcta.","Es formato.","No.","No.","No."],
f:"La matriz de operacionalización debe poder convertirse casi directamente en campos del instrumento."},

{s:"Un investigador cambia el punto de corte de HbA1c después de comprobar que así obtiene una asociación significativa. ¿Cuál es el problema principal?",
o:["Decisión post hoc que altera la definición operacional en función del resultado","Mayor precisión","Mejor validez","Aleatorización","Ninguno"],
a:0,e:"Modificar reglas de clasificación tras ver resultados compromete la objetividad y puede inflar falsos positivos.",
r:["Correcta.","No necesariamente.","No mejora validez.","No tiene relación.","Sí existe un problema serio."],
f:"Puntos de corte y categorías se definen antes de mirar el resultado."},

{s:"Una variable se define conceptualmente con una fuente especializada, pero su definición operacional no coincide con la información realmente disponible en las historias clínicas. ¿Qué debe hacerse?",
o:["Reformular la definición operacional para que sea válida y factible sin traicionar el concepto","Inventar datos faltantes","Mantenerla aunque no pueda medirse","Cambiar los resultados","Eliminar la población"],
a:0,e:"La operacionalización debe ser conceptualmente válida y factible con los datos del estudio.",
r:["Correcta.","No.","No.","No.","No es la solución general."],
f:"Una buena operacionalización equilibra validez conceptual y factibilidad empírica."},

{s:"¿Cuál hipótesis es más adecuada para el componente de intervención sin afirmar causalidad más allá del diseño?",
o:["Los pacientes con seguimiento médico presentan una frecuencia de progresión diferente respecto a quienes no lo tienen, según el diseño definido","El seguimiento cura la prediabetes","Todos los pacientes seguidos no desarrollarán DM2","El seguimiento es bueno","El médico evita la diabetes"],
a:0,e:"La formulación compara grupos y deja que los datos establezcan dirección y magnitud, especialmente si el diseño no garantiza inferencia causal.",
r:["Correcta.","Exagera causalidad y concepto de curación.","Determinista.","Vaga.","Excesivamente causal y vaga."],
f:"La fuerza de la hipótesis debe ser compatible con la fuerza inferencial del diseño."},

{s:"¿Qué relación de coherencia debe existir entre objetivos, hipótesis y variables?",
o:["Cada relación planteada en hipótesis debe corresponder a objetivos y variables que realmente se medirán","Pueden referirse a fenómenos distintos","La hipótesis puede agregar variables no medidas","Las variables se eligen después del análisis","No existe dependencia"],
a:0,e:"La consistencia requiere que problema, objetivos, hipótesis, variables e instrumento describan el mismo estudio.",
r:["Correcta.","Rompe coherencia.","No sería contrastable.","Introduce sesgo post hoc.","Sí existe relación."],
f:"Toda variable de una hipótesis debe poder rastrearse hasta un objetivo y un dato."},

{s:"¿Qué característica hace a una hipótesis científicamente útil?",
o:["Es clara, lógica, sustentada y susceptible de comprobación","Es muy larga","Usa terminología compleja","Garantiza un resultado positivo","Incluye muchas variables"],
a:0,e:"La utilidad de una hipótesis depende de claridad, fundamento y posibilidad de contrastarla.",
r:["Correcta.","La longitud no importa.","La complejidad verbal no mejora ciencia.","No puede garantizarse resultado.","Más variables pueden empeorar claridad."],
f:"Hipótesis fuerte no es la más complicada; es la que puede ponerse a prueba con precisión."},

{s:"¿Qué representa mejor una variable dependiente o desenlace en el proyecto guía?",
o:["Progresión de prediabetes a DM2","HbA1c basal","IMC basal","Seguimiento médico","Antecedente familiar"],
a:0,e:"La progresión es el resultado cuya ocurrencia se intenta explicar o comparar respecto de exposiciones/factores.",
r:["Correcta.","Es una exposición/predictor potencial.","Es predictor potencial.","Es exposición/intervención.","Es predictor potencial."],
f:"En un análisis de factores de riesgo, el desenlace es el evento cuya aparición queremos explicar."}
];
Q.forEach((q,i)=>window.TESIS_S8_QUESTIONS.push({id:"C6Q"+String(i+1).padStart(2,"0"),classNo:6,topic:"Hipótesis y variables",stem:q.s,options:q.o,answer:q.a,explanation:q.e,rationales:q.r,fija:q.f}));})();