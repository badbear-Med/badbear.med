window.BADBEAR_ANATOMY_CATALOG = [
  {
    id: "cuerpo-completo",
    nombre: "Cuerpo completo",
    icono: "◉",
    color: "#53d8ff",
    estado: "disponible",
    descripcion: "Vista global del cuerpo y acceso rápido a órganos internos.",
    layer: "both",
    organos: [
      { id: "vista-global", nombre: "Vista global", estado: "disponible" },
      { id: "organos-internos", nombre: "Órganos internos", estado: "disponible", modelKey: "organsOverview" }
    ]
  },
  {
    id: "osteomuscular",
    nombre: "Osteomuscular",
    icono: "🦴",
    color: "#7ee3ff",
    estado: "disponible",
    descripcion: "Huesos y músculos con selección directa por región anatómica.",
    layer: "both",
    organos: [
      { id: "esqueleto", nombre: "Esqueleto", estado: "disponible", layer: "skeleton" },
      { id: "musculos", nombre: "Músculos", estado: "disponible", layer: "muscles" },
      { id: "craneo", nombre: "Cráneo y cara", estado: "disponible", bodyTerms: ["skull","cranium","cranial","mandible","maxilla","zygomatic","frontal bone","parietal bone","temporal bone","occipital bone"], layer: "skeleton" },
      { id: "columna", nombre: "Columna vertebral", estado: "disponible", bodyTerms: ["vertebra","vertebral","spine","sacrum","coccyx"], layer: "skeleton" },
      { id: "torax", nombre: "Tórax", estado: "disponible", bodyTerms: ["rib","sternum","thoracic"], layer: "skeleton" },
      { id: "miembro-superior", nombre: "Miembro superior", estado: "disponible", bodyTerms: ["humerus","radius","ulna","scapula","clavicle","carpal","metacarpal","hand","biceps","triceps","deltoid","forearm"], layer: "both" },
      { id: "pelvis", nombre: "Pelvis", estado: "disponible", bodyTerms: ["pelvis","ilium","ischium","pubis","sacrum","glute"], layer: "both" },
      { id: "miembro-inferior", nombre: "Miembro inferior", estado: "disponible", bodyTerms: ["femur","tibia","fibula","patella","tarsal","metatarsal","foot","quadriceps","hamstring","gastrocnemius","soleus"], layer: "both" }
    ]
  },
  {
    id: "nervioso",
    nombre: "Sistema nervioso",
    icono: "🧠",
    color: "#9b8cff",
    estado: "disponible",
    descripcion: "Neuroanatomía central con cerebro segmentado y médula espinal.",
    organos: [
      { id: "cerebro", nombre: "Cerebro", estado: "disponible" },
      { id: "lobulos", nombre: "Lóbulos cerebrales", estado: "disponible" },
      { id: "ganglios-basales", nombre: "Ganglios basales", estado: "disponible" },
      { id: "diencefalo", nombre: "Diencéfalo", estado: "disponible" },
      { id: "tronco", nombre: "Tronco encefálico", estado: "disponible" },
      { id: "cerebelo", nombre: "Cerebelo", estado: "disponible" },
      { id: "ventriculos", nombre: "Sistema ventricular", estado: "disponible" },
      { id: "medula", nombre: "Médula espinal", estado: "disponible", modelKey: "spinalCord" },
      { id: "pares-craneales", nombre: "Pares craneales", estado: "disponible" },
      { id: "nervios-perifericos", nombre: "Nervios periféricos", estado: "preparado" }
    ]
  },
  {
    id: "cardiovascular",
    nombre: "Cardiovascular",
    icono: "🫀",
    color: "#ff647c",
    estado: "disponible",
    descripcion: "Corazón segmentado y vasculatura sistémica en 3D.",
    defaultModelKey: "cardiovascularOverview",
    organos: [
      { id: "corazon", nombre: "Corazón completo", estado: "disponible", modelKey: "heart" },
      { id: "camaras", nombre: "Cámaras cardíacas", estado: "disponible", modelKey: "heart", filterTerms: ["atrium","ventricle","ventricular","aurícula","ventrículo"] },
      { id: "coronarias", nombre: "Arterias coronarias", estado: "disponible", modelKey: "heart", filterTerms: ["coronary","coronaria"] },
      { id: "grandes-vasos", nombre: "Grandes vasos", estado: "disponible", modelKey: "heart", filterTerms: ["aorta","aortic","pulmonary trunk","vena cava","cava","tronco pulmonar"] },
      { id: "vasculatura", nombre: "Vasculatura sistémica", estado: "disponible", modelKey: "vessels" },
      { id: "valvulas", nombre: "Válvulas", estado: "preparado" },
      { id: "conduccion", nombre: "Sistema de conducción", estado: "preparado" }
    ]
  },
  {
    id: "respiratorio",
    nombre: "Respiratorio",
    icono: "🫁",
    color: "#61d9c8",
    estado: "disponible",
    descripcion: "Pulmones y relaciones torácicas en un modelo 3D de referencia.",
    defaultModelKey: "lungs",
    organos: [
      { id: "pulmones", nombre: "Pulmones", estado: "disponible", modelKey: "lungs" },
      { id: "laringe", nombre: "Laringe", estado: "preparado" },
      { id: "traquea", nombre: "Tráquea", estado: "preparado" },
      { id: "bronquios", nombre: "Árbol bronquial", estado: "preparado" },
      { id: "segmentos", nombre: "Segmentos broncopulmonares", estado: "preparado" },
      { id: "pleura", nombre: "Pleuras", estado: "preparado" }
    ]
  },
  {
    id: "digestivo",
    nombre: "Digestivo",
    icono: "◒",
    color: "#ffb65f",
    estado: "disponible",
    descripcion: "Órganos digestivos principales cargados desde modelos anatómicos abiertos.",
    defaultModelKey: "digestiveOverview",
    organos: [
      { id: "estomago", nombre: "Estómago", estado: "disponible", modelKey: "stomach" },
      { id: "intestino-delgado", nombre: "Intestino delgado", estado: "disponible", modelKey: "smallIntestine" },
      { id: "colon", nombre: "Colon", estado: "disponible", modelKey: "colon" },
      { id: "higado", nombre: "Hígado", estado: "disponible", modelKey: "liver" },
      { id: "pancreas", nombre: "Páncreas", estado: "disponible", modelKey: "pancreas" },
      { id: "esofago", nombre: "Esófago", estado: "preparado" },
      { id: "duodeno", nombre: "Duodeno", estado: "preparado" },
      { id: "via-biliar", nombre: "Vía biliar", estado: "preparado" }
    ]
  },
  {
    id: "urinario",
    nombre: "Urinario",
    icono: "◐",
    color: "#76b9ff",
    estado: "disponible",
    descripcion: "Riñones y vejiga urinaria en 3D.",
    defaultModelKey: "urinaryOverview",
    organos: [
      { id: "rinones", nombre: "Riñones", estado: "disponible", modelKey: "kidneys" },
      { id: "vejiga", nombre: "Vejiga", estado: "disponible", modelKey: "bladder" },
      { id: "hilio-renal", nombre: "Hilio renal", estado: "preparado" },
      { id: "ureteres", nombre: "Uréteres", estado: "preparado" },
      { id: "uretra", nombre: "Uretra", estado: "preparado" }
    ]
  },
  {
    id: "endocrino",
    nombre: "Endocrino",
    icono: "✦",
    color: "#e58aff",
    estado: "disponible",
    descripcion: "Modelos endocrinos disponibles y preparados para ampliación progresiva.",
    defaultModelKey: "endocrineOverview",
    organos: [
      { id: "timo", nombre: "Timo", estado: "disponible", modelKey: "thymus" },
      { id: "pancreas-endocrino", nombre: "Páncreas", estado: "disponible", modelKey: "pancreas" },
      { id: "hipofisis", nombre: "Hipófisis", estado: "preparado" },
      { id: "tiroides", nombre: "Tiroides", estado: "preparado" },
      { id: "paratiroides", nombre: "Paratiroides", estado: "preparado" },
      { id: "suprarrenales", nombre: "Suprarrenales", estado: "preparado" }
    ]
  },
  {
    id: "reproductor",
    nombre: "Reproductor",
    icono: "◇",
    color: "#ff7fb6",
    estado: "disponible",
    descripcion: "Útero, ovarios y próstata disponibles como modelos 3D de referencia.",
    organos: [
      { id: "femenino", nombre: "Útero y ovarios", estado: "disponible", modelKey: "femaleReproductive" },
      { id: "prostata", nombre: "Próstata", estado: "disponible", modelKey: "prostate" },
      { id: "masculino", nombre: "Sistema reproductor masculino completo", estado: "preparado" },
      { id: "pelvis-perine", nombre: "Pelvis y periné", estado: "preparado" }
    ]
  }
];
