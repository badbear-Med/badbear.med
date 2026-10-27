/* Casos clínicos simulados: aprendizaje progresivo por estación. */
window.FIJAS_ECOS_DATA={
  "version": "20261026-2",
  "fields": [
    {
      "id": "datos",
      "label": "1. Datos positivos y negativos",
      "hint": "Identifica hallazgos positivos, negativos, cronología y signos de alarma."
    },
    {
      "id": "sindromico",
      "label": "2. Diagnóstico sindrómico",
      "hint": "Define el síndrome o los síndromes y sustenta cada uno."
    },
    {
      "id": "topografico",
      "label": "3. Diagnóstico topográfico",
      "hint": "Localiza el proceso y explica la lateralidad cuando corresponda."
    },
    {
      "id": "nosologico",
      "label": "4. Diagnóstico nosológico y diferenciales",
      "hint": "Plantea una enfermedad principal y alternativas razonables."
    },
    {
      "id": "etiologico",
      "label": "5. Diagnóstico etiológico",
      "hint": "Explica el mecanismo y distingue sospecha de confirmación."
    },
    {
      "id": "probabilidades",
      "label": "6. Probabilidad clínica de cada hipótesis",
      "hint": "Prioriza diagnósticos como alta, intermedia o baja con argumentos. No inventes porcentajes."
    },
    {
      "id": "examenes",
      "label": "7. Exámenes auxiliares y su justificación",
      "hint": "Prioriza estudios urgentes, hallazgos esperados y precauciones."
    },
    {
      "id": "prioridad",
      "label": "8. Orden, urgencia y seguridad de los exámenes",
      "hint": "Qué solicitar primero, contraindicaciones y qué decisiones no pueden esperar."
    },
    {
      "id": "esperados",
      "label": "9. Hallazgos que esperas encontrar",
      "hint": "Qué resultado apoyaría o debilitaría tus diagnósticos."
    },
    {
      "id": "interpretacion",
      "label": "10. Interpretación de los resultados del estudio",
      "hint": "Explica qué significa cada resultado y sus limitaciones."
    },
    {
      "id": "diagnostico_final",
      "label": "11. Diagnóstico integrado y probabilidad actualizada",
      "hint": "Actualiza las hipótesis y distingue lo confirmado de lo probable."
    },
    {
      "id": "manejo",
      "label": "12. Manejo inicial y prioridades",
      "hint": "Estabilización, urgencias, seguimiento y complicaciones. Separa manejo del fármaco específico."
    },
    {
      "id": "tratamiento",
      "label": "13. Tratamiento específico, dosis y alternativas",
      "hint": "Elige tratamiento, dosis y vía cuando corresponda; menciona alternativas y vigilancia."
    },
    {
      "id": "justificacion",
      "label": "14. Justificación de las decisiones",
      "hint": "Integra fisiopatología, criterios diagnósticos y razones del tratamiento."
    }
  ],
  "cases": [
    {
      "id": "eco01",
      "title": "Cefalea subaguda y debilidad progresiva",
      "stem": "Varón de 29 años con 18 días de cefalea progresiva, fiebre, vómitos, pérdida de 4 kg y sudoración nocturna. En las últimas 48 horas presenta somnolencia y confusión. Convivió hace tres meses con un familiar con tuberculosis pulmonar.\nExamen: T 38,5 °C; FC 108/min; Glasgow 13/15; rigidez de nuca y Kernig positivo. Limitación de abducción del ojo derecho, fuerza 4/5 en hemicuerpo izquierdo, hiperreflexia y Babinski izquierdo.\nTodavía no se ha practicado punción lumbar.",
      "extra": "Para interpretar después de proponer exámenes: resonancia con realce meníngeo basal e hidrocefalia. Si se valora la punción lumbar como segura, líquido cefalorraquídeo con predominio linfocitario, proteínas elevadas y glucosa disminuida. Confirmación microbiológica aún pendiente."
    },
    {
      "id": "eco02",
      "title": "Pérdida de conciencia en una oficina",
      "stem": "Varón de 34 años que interrumpe una conversación, permanece con mirada fija, gira la cabeza hacia la izquierda y cae al suelo. Un testigo describe rigidez seguida de sacudidas de las cuatro extremidades por unos 90 segundos. Luego está confundido durante unos 15 minutos.\nDesde hace dos meses ha tenido episodios breves de desconexión, en ocasiones precedidos de déjà vu y una sensación que asciende desde el abdomen. Sin antecedentes neurológicos conocidos.\nAl ingreso: Glasgow 15/15, sin déficit focal persistente, glucosa 94 mg/dL y electrolitos dentro de límites habituales.",
      "extra": "Estudios simulados para interpretar: electroencefalograma de rutina con puntas y ondas agudas de predominio temporal derecho, sin registrar una crisis. Resonancia cerebral con discreta reducción de volumen y aumento de señal T2/FLAIR del hipocampo derecho; sin masas."
    },
    {
      "id": "eco03",
      "title": "Dolor intermitente de mejilla y dientes superiores",
      "stem": "Mujer de 57 años con cuatro meses de dolor intenso intermitente en mejilla derecha y región de los dientes superiores. Evaluación odontológica sin causa evidente. Refiere episodios de descarga eléctrica de 15–30 segundos, desencadenados por lavarse la cara, cepillarse los dientes, masticar o recibir viento frío.\nSe extiende hacia la nariz y labio superior derechos. Entre episodios suele estar asintomática. Examen: sensibilidad facial aparentemente conservada, fuerza de masticación normal y sin déficits de pares craneales.",
      "extra": "Resonancia con protocolo de nervios craneales: asa de arteria cerebelosa superior derecha comprime la raíz cisternal del trigémino, con indentación y desplazamiento. Sin tumor ni lesiones desmielinizantes."
    },
    {
      "id": "eco04",
      "title": "Déficit focal súbito durante el desayuno",
      "stem": "Varón de 68 años con hipertensión, diabetes y palpitaciones previas. A las 07:35 deja caer una taza de la mano derecha y presenta dificultad para hablar. Última vez conocido bien a las 07:10. A las 09:00: PA 178/100 mmHg tras control, NIHSS 14, afasia, hemiparesia y disminución sensitiva derechas, mirada preferente hacia la izquierda. Peso 78 kg.\nTomografía sin contraste: sin hemorragia, cambios isquémicos insulares izquierdos limitados. ASPECTS 8/10. Glucemia 146 mg/dL; INR 1,0; plaquetas 218 000/µL. ECG: fibrilación auricular. Sin contraindicaciones mayores de reperfusión identificadas.",
      "extra": "Angiotomografía de cabeza y cuello: oclusión del segmento M1 de arteria cerebral media izquierda; colaterales distales parciales. Sin estenosis carotídea significativa. Funcionalmente independiente antes del evento."
    },
    {
      "id": "eco05",
      "title": "Problemas progresivos de memoria y autonomía",
      "stem": "Mujer de 72 años, profesora jubilada, con dos años de dificultades progresivas para administrar pagos, recordar conversaciones recientes y orientarse al volver de sitios conocidos. Repite preguntas y dejó una olla encendida. Recuerda acontecimientos lejanos. Minimiza el problema.\nHipertensión y diabetes tipo 2. Examen: alerta, se equivoca en fecha y mes, lenguaje espontáneo fluido, fuerza y sensibilidad conservadas, sin focalidad ni parkinsonismo relevante. Recuerda 1 de 3 palabras tras cinco minutos.",
      "extra": "Evaluación simulada: MMSE 21/30, MoCA 16/30, dependencia para finanzas y algunas tareas instrumentales. TSH, vitamina B12, sodio y función renal sin alteraciones significativas. Resonancia: atrofia hipocampal bilateral y temporoparietal discreta; cambios microangiopáticos leves, sin infartos extensos ni hidrocefalia."
    },
    {
      "id": "eco06",
      "title": "Dolor de cabeza explosivo durante un esfuerzo",
      "stem": "Mujer de 54 años con hipertensión tratada irregularmente y tabaquismo. Mientras levantaba una caja presenta cefalea súbita de máxima intensidad y deja de responder durante unos 40 segundos. Al recuperarse persisten cefalea intensa, vómitos y fotofobia. Nunca había tenido un dolor similar.\nA los 90 minutos: PA 174/98, Glasgow 14/15, rigidez de nuca, pupilas reactivas y fuerza normal en las cuatro extremidades. No toma anticoagulantes ni refiere traumatismo.",
      "extra": "Tomografía a las 2 horas: sangre en cisternas supraselares, cisura interhemisférica anterior y cisuras silvianas; discreta dilatación ventricular. Angiotomografía: aneurisma sacular de 6 mm del complejo de arteria comunicante anterior, con distribución de sangrado concordante."
    },
    {
      "id": "eco07",
      "title": "Fiebre alta con cefalea y rigidez cervical",
      "stem": "Varón de 42 años con 48 horas de fiebre y malestar, seguido de cefalea intensa, fotofobia y vómitos. Hace dos horas responde más lentamente según su esposa. Sin inmunosupresión ni traumatismo; tuvo infección respiratoria alta reciente.\nExamen: T 39,2 °C, FC 112, FR 22, Glasgow 15/15, orientado, rigidez de nuca y Kernig positivo, sin papiledema observado, sin focalidad, sin crisis y sin petequias.",
      "extra": "Punción lumbar realizada tras valorar seguridad: presión de apertura 27 cm H₂O, LCR turbio, leucocitos 2 200/µL (92 % neutrófilos), proteínas 240 mg/dL, glucosa 22 mg/dL con glucemia 110 mg/dL. Gram: diplococos grampositivos. Hemocultivos y cultivo de LCR pendientes."
    },
    {
      "id": "eco08",
      "title": "Debilidad de piernas que progresa hacia brazos",
      "stem": "Varón de 32 años con cinco días de hormigueo en pies y debilidad progresiva. Ya no camina sin ayuda; desde ayer tiene dificultad para abrir botellas. Refiere diarrea autolimitada hace dos semanas y cierta dificultad al respirar acostado.\nExamen: fuerza 3/5 en piernas, 4/5 en brazos, ausencia de reflejos aquíleos y rotulianos, reflejos de brazos disminuidos, Babinski negativo, parestesias distales sin nivel sensitivo, sin trastornos esfinterianos. SpO₂ 97 %.",
      "extra": "Peso 70 kg; capacidad vital forzada 1,65 L (23,6 mL/kg), presión inspiratoria máxima −38 cm H₂O. LCR al sexto día: 3 leucocitos/µL, proteínas 112 mg/dL. Neuroconducción: enlentecimiento motor, latencias distales prolongadas, ondas F anormales y dispersión temporal; sin pérdida axonal extensa."
    },
    {
      "id": "eco09",
      "title": "Episodios repetidos de debilidad de un lado",
      "stem": "Varón de 66 años, hipertenso, diabético y con dislipidemia, presenta debilidad súbita del brazo derecho y dificultad de expresión. Tres días antes tuvo un episodio de diez minutos con síntomas similares y resolución espontánea.\nExamen: NIHSS 7, paresia facial central derecha, brazo derecho 3/5, pierna derecha 4/5 y dificultad para emitir frases. Última vez conocido bien hace 2 h 15 min. Pulso regular.",
      "extra": "Tomografía: sin hemorragia. Resonancia con pequeños focos isquémicos de territorio de arteria cerebral media izquierda. Angiotomografía: placa carotídea izquierda irregular con estenosis cervical proximal de 85 %, sin oclusión intracraneal proximal. ECG en ritmo sinusal; estudio cardíaco inicial sin fuente embólica demostrada."
    },
    {
      "id": "eco10",
      "title": "Ardor de pies y dificultad para caminar a oscuras",
      "stem": "Varón de 59 años con diez meses de hormigueo distal bilateral que ascendió hasta tobillos y después afectó manos. Ardor plantar nocturno y molestia por el contacto de sábanas; empeora el equilibrio al cerrar los ojos. Diabetes mellitus tipo 2 de ocho años, metformina irregular.\nExamen: fuerza proximal 5/5, dorsiflexión de pies 4+/5, disminución de dolor, vibración y propiocepción distal, arreflexia aquílea, reflejos rotulianos reducidos, Babinski negativo y Romberg positivo.",
      "extra": "Glucemia en ayunas 186 mg/dL, HbA1c 9,1 %, vitamina B12 425 pg/mL, TSH 2,1 mUI/L, función renal normal, inmunofijación sin componente monoclonal. Neuroconducción: amplitud sensitiva sural reducida bilateralmente, respuestas motoras distales algo reducidas, velocidades relativamente conservadas, sin bloqueo."
    },
    {
      "id": "eco11",
      "title": "Dolor de dientes y hemicara derecha: diagnóstico abierto",
      "stem": "Paciente adulto que consulta por episodios de dolor en dientes y hemicara derecha. El enunciado disponible no precisa si son dientes superiores o inferiores, duración exacta, desencadenantes, presencia de caries ni examen neurológico.\nEsta estación reproduce deliberadamente la incertidumbre de la variante de examen que se comentó en clase. NO debes dar un diagnóstico definitivo únicamente por la distribución inespecífica del dolor.\nDesarrolla diagnósticos diferenciales y preguntas que completarían la anamnesis.",
      "extra": "No se aportaron estudios complementarios del caso original. Propón qué preguntas, exploración odontológica y examen neurológico permitirían distinguir dolor odontógeno, neuralgia de V2/V3 y otras causas. No inventes hallazgos de resonancia."
    }
  ],
  "stages": [
    {
      "id": "clinica",
      "title": "1 · Análisis clínico",
      "description": "Extrae información, localiza el síndrome y ordena tus sospechas sin conocer todavía los exámenes.",
      "fields": [
        "datos",
        "sindromico",
        "topografico",
        "nosologico",
        "etiologico",
        "probabilidades"
      ]
    },
    {
      "id": "estudios",
      "title": "2 · Plan de estudios",
      "description": "Decide qué pruebas pides, en qué orden y qué resultados esperas. Luego se desbloquean los resultados del caso.",
      "fields": [
        "examenes",
        "prioridad",
        "esperados"
      ]
    },
    {
      "id": "interpretar",
      "title": "3 · Interpretación de resultados",
      "description": "Ya puedes revisar los resultados simulados. Interprétalos y reajusta tus probabilidades diagnósticas.",
      "fields": [
        "interpretacion",
        "diagnostico_final"
      ]
    },
    {
      "id": "terapeutica",
      "title": "4 · Manejo y tratamiento",
      "description": "Explica estabilización, manejo de complicaciones, tratamiento con dosis y justificación. Al terminar se muestra la corrección de este caso.",
      "fields": [
        "manejo",
        "tratamiento",
        "justificacion"
      ]
    }
  ]
};
