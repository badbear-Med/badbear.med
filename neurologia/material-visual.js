(() => {
"use strict";
window.BADBEAR_NEURO_VISUAL = {
  "polineuropatias":[
    {page:2,title:"Patrones anatómicos de neuropatía",note:"Mononeuropatía, mononeuropatía múltiple, plexopatía y polineuropatía."},
    {page:10,title:"Síndrome de Miller Fisher",note:"Variante del espectro Guillain-Barré: oftalmoplejía, ataxia y arreflexia."},
    {page:12,title:"Músculo normal vs. músculo denervado",note:"Correlación anatómica y electrofisiológica de la denervación."},
    {page:20,title:"Neuropatía diabética",note:"Fenotipos de neuropatía asociados a diabetes."}
  ],
  "parkinson":[
    {page:4,title:"Síndrome parkinsoniano",note:"Temblor de reposo, rigidez, hipoquinesia y pérdida de reflejos posturales."},
    {page:32,title:"Sustancia negra",note:"Base anatómica de la degeneración nigroestriada."},
    {page:61,title:"Estadios de progresión",note:"Progresión anatómica de la enfermedad."},
    {page:113,title:"Circuitos de ganglios basales",note:"Organización funcional para entender bradicinesia y rigidez."}
  ],
  "epilepsias":[
    {page:7,title:"Fisiopatología de las crisis",note:"Desequilibrio entre excitación e inhibición neuronal."},
    {page:11,title:"Hipocampo y epilepsia mesial temporal",note:"Anatomía del circuito temporal."},
    {page:31,title:"Síndrome de West",note:"Espasmos, hipsarritmia y deterioro del desarrollo."},
    {page:61,title:"Neuroimagen y epilepsia estructural",note:"Correlación de RM con etiología focal."}
  ],
  "neurotuberculosis":[
    {page:31,title:"Foco de Rich y meningitis basal",note:"Ruptura al espacio subaracnoideo y exudado inflamatorio."},
    {page:34,title:"Hidrocefalia",note:"Bloqueo de circulación/reabsorción del LCR por exudado basal."},
    {page:38,title:"Tuberculoma",note:"Lesión ocupante de espacio con distribución dependiente de edad."},
    {page:50,title:"LCR",note:"Hiperproteinorraquia, hipoglucorraquia y pleocitosis linfocítica."}
  ],
  "neurocisticercosis":[
    {page:20,title:"Formas parenquimatosas",note:"Representación de cisticercos en diferentes fases."},
    {page:28,title:"Síndromes de presentación",note:"Crisis, hipertensión intracraneal y otros fenotipos."},
    {page:31,title:"Western blot",note:"Apoyo inmunodiagnóstico."},
    {page:39,title:"Tratamiento antiparasitario",note:"Duración según número y viabilidad de lesiones."}
  ],
  "miopatias":[
    {page:4,title:"Unidad motora",note:"Relación motoneurona-axón-unión neuromuscular-músculo."},
    {page:19,title:"Signo de Gowers",note:"Expresión funcional de debilidad proximal de cintura pélvica."},
    {page:26,title:"Resonancia muscular",note:"Patrones de compromiso y selección de biopsia."},
    {page:42,title:"Algoritmo diagnóstico",note:"Secuencia clínica, laboratorio, EMG, RM y etiología."}
  ],
  "infecciones-snc-sgb":[
    {page:6,title:"LCR en meningitis bacteriana",note:"Patrón citoquímico y microbiológico."},
    {page:20,title:"Absceso cerebral",note:"Neuroimagen y lógica de tratamiento médico/quirúrgico."},
    {page:33,title:"Infección crónica y LCR",note:"Diferencial de meningitis subaguda-crónica."},
    {page:38,title:"Encefalitis y EEG",note:"Correlación entre compromiso parenquimatoso y actividad eléctrica."}
  ],
  "esclerosis-multiple":[
    {page:34,title:"LCR",note:"Bandas oligoclonales y apoyo diagnóstico."},
    {page:44,title:"Bandas oligoclonales",note:"Síntesis intratecal de inmunoglobulinas."},
    {page:86,title:"Resonancia magnética",note:"Lesiones desmielinizantes y distribución anatómica."},
    {page:97,title:"Criterios diagnósticos",note:"Integración clínica y radiológica."}
  ],
  "encefalitis-autoinmune":[
    {page:7,title:"Anticuerpos contra SNC",note:"Superficie neuronal y proteínas sinápticas."},
    {page:12,title:"Anti-NMDA",note:"LCR, RM y EEG en el fenotipo anti-NMDA."},
    {page:19,title:"Diagnóstico etiológico",note:"Anticuerpos, LCR, EEG y búsqueda de neoplasia."},
    {page:29,title:"Tratamiento",note:"Inmunoterapia y control del desencadenante/paraneoplasia."}
  ],
  "miastenia-gravis":[
    {page:5,title:"Unión neuromuscular",note:"Canales presinápticos, acetilcolina y membrana postsináptica."},
    {page:15,title:"Clasificación",note:"Edad, anticuerpos y estado del timo."},
    {page:24,title:"Cuadro clínico",note:"Fluctuación y distribución de la debilidad."},
    {page:37,title:"Diagnóstico",note:"Anticuerpos y pruebas neurofisiológicas."}
  ],
  "coma":[
    {page:4,title:"Escala de Glasgow",note:"Cuantificación de respuesta ocular, verbal y motora."},
    {page:9,title:"Examen pupilar",note:"Tamaño, simetría y reactividad como herramienta de localización."},
    {page:12,title:"Patrones respiratorios",note:"Correlación con niveles anatómicos y causas metabólicas."},
    {page:34,title:"LCR y diferencial",note:"Citoquímica en comas infecciosos."}
  ],
  "demencias":[
    {page:15,title:"Etiopatogenia de Alzheimer",note:"Amiloidopatía, taupatía y otros mecanismos."},
    {page:21,title:"Diagnóstico de Alzheimer",note:"Historia, exploración, laboratorio e imagen."},
    {page:29,title:"Fase preclínica y clínica",note:"Relación entre carga patológica, cognición y función."},
    {page:44,title:"Diagnóstico diferencial",note:"Elementos para separar etiologías de demencia."}
  ],
  "cefaleas":[
    {page:4,title:"Clasificación",note:"Primarias, secundarias y neuralgias craneales."},
    {page:9,title:"Migraña",note:"Fenotipo clínico y criterios del material."},
    {page:27,title:"Cefalea en racimos",note:"Dolor orbitario intenso y síntomas autonómicos."},
    {page:31,title:"Tratamiento del racimo",note:"Manejo agudo y preventivo."}
  ],
  "ela":[
    {page:4,title:"Primera y segunda motoneurona",note:"Esclerosis de cordones laterales y pérdida de asta anterior."},
    {page:15,title:"Fisiopatología",note:"Mecanismos de neurodegeneración motoneuronal."},
    {page:26,title:"Fasciculaciones",note:"Expresión clínica de denervación."},
    {page:33,title:"Diagnóstico",note:"Exploración, EMG y exclusión de mimetizadores."}
  ],
  "segunda-neurona":[
    {page:2,title:"Mapa de unidad motora",note:"Asta anterior, raíz, nervio, unión neuromuscular y músculo."},
    {page:4,title:"ELA y motoneuronas",note:"Correlación entre 1MN y 2MN."},
    {page:26,title:"Fasciculaciones",note:"Descargas de unidades motoras denervadas."},
    {page:33,title:"EMG y VCN",note:"Herramientas para localizar lesión periférica."}
  ],
  "infarto-cerebral":[
    {page:13,title:"DWI/ADC/FLAIR",note:"Secuencias para isquemia aguda."},
    {page:19,title:"Clasificación TOAST",note:"Aterotrombótico, cardioembólico, pequeños vasos y otros."},
    {page:26,title:"NIHSS",note:"Cuantificación de severidad neurológica."},
    {page:31,title:"Reperfusión",note:"Trombólisis y trombectomía en ventanas seleccionadas."}
  ],
  "rescate-vascular":[
    {page:13,title:"Selección por RM",note:"Difusión, ADC y FLAIR para caracterizar tejido."},
    {page:17,title:"Angio-TC / Angio-RM",note:"Identificación de oclusión o estenosis arterial."},
    {page:26,title:"NIHSS",note:"Carga clínica que acompaña la selección terapéutica."},
    {page:31,title:"Terapia de rescate",note:"Trombólisis endovenosa y trombectomía mecánica."}
  ],
  "hemorragia-intracerebral":[
    {page:5,title:"Fisiopatología",note:"Lesión primaria, expansión y daño secundario."},
    {page:11,title:"Clasificación topográfica",note:"Lobar, profunda, troncoencefálica y cerebelosa."},
    {page:15,title:"Control de presión arterial",note:"Recomendaciones del material AHA/ASA 2022."},
    {page:18,title:"Anticoagulación",note:"Manejo de hemorragia relacionada con ACO."}
  ],
  "neuroimagenes-infecciosas":[
    {page:9,title:"Meningitis tuberculosa",note:"Realce leptomeníngeo basal."},
    {page:15,title:"Signo de la diana",note:"Tuberculoma con realce anular/central."},
    {page:22,title:"NCC coloide",note:"Realce anular con edema perilesional."},
    {page:31,title:"Absceso cerebral",note:"Etapas y patrón de realce."}
  ],
  "estado-epileptico":[
    {page:3,title:"Clasificación clínica",note:"Convulsivo, no convulsivo y focal."},
    {page:4,title:"Bases neurobiológicas",note:"Excitación persistente y fracaso inhibitorio."},
    {page:5,title:"Tiempo 1 y Tiempo 2",note:"Conceptos temporales ILAE 2015."},
    {page:12,title:"Protocolo terapéutico",note:"Benzodiacepina y segunda línea IV."}
  ],
  "neuroimagenes-vasculares":[
    {page:6,title:"Difusión",note:"Movimiento de agua y restricción en isquemia."},
    {page:13,title:"ACM hiperdensa",note:"Signo vascular temprano en TC."},
    {page:15,title:"Restricción DWI/ADC",note:"Patrón de isquemia aguda."},
    {page:29,title:"Evolución de la hemorragia",note:"Cambios de señal de productos sanguíneos según tiempo."}
  ]
};
})();