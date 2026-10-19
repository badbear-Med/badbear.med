window.BADBEAR_ANATOMY_CATALOG = [
  {
    id: "cuerpo-completo",
    nombre: "Cuerpo completo",
    icono: "◉",
    color: "#53d8ff",
    estado: "disponible",
    descripcion: "Vista global del cuerpo con esqueleto y musculatura.",
    layer: "both",
    organos: [
      { id: "vista-global", nombre: "Vista global", estado: "disponible" }
    ]
  },
  {
    id: "osteomuscular",
    nombre: "Osteomuscular",
    icono: "🦴",
    color: "#7ee3ff",
    estado: "disponible",
    descripcion: "Huesos, articulaciones y músculos por regiones anatómicas.",
    layer: "both",
    organos: [
      { id: "esqueleto", nombre: "Esqueleto", estado: "disponible", layer: "skeleton" },
      { id: "musculos", nombre: "Músculos", estado: "disponible", layer: "muscles" },
      { id: "craneo", nombre: "Cráneo y cara", estado: "preparado" },
      { id: "columna", nombre: "Columna vertebral", estado: "preparado" },
      { id: "torax", nombre: "Tórax", estado: "preparado" },
      { id: "miembro-superior", nombre: "Miembro superior", estado: "preparado" },
      { id: "pelvis", nombre: "Pelvis", estado: "preparado" },
      { id: "miembro-inferior", nombre: "Miembro inferior", estado: "preparado" }
    ]
  },
  {
    id: "nervioso",
    nombre: "Sistema nervioso",
    icono: "🧠",
    color: "#9b8cff",
    estado: "preparado",
    descripcion: "Neuroanatomía central y periférica con énfasis clínico.",
    organos: [
      { id: "cerebro", nombre: "Cerebro", estado: "preparado" },
      { id: "lobulos", nombre: "Lóbulos cerebrales", estado: "preparado" },
      { id: "ganglios-basales", nombre: "Ganglios basales", estado: "preparado" },
      { id: "diencefalo", nombre: "Diencéfalo", estado: "preparado" },
      { id: "tronco", nombre: "Tronco encefálico", estado: "preparado" },
      { id: "cerebelo", nombre: "Cerebelo", estado: "preparado" },
      { id: "ventriculos", nombre: "Sistema ventricular", estado: "preparado" },
      { id: "medula", nombre: "Médula espinal", estado: "preparado" },
      { id: "pares-craneales", nombre: "Pares craneales", estado: "preparado" },
      { id: "nervios-perifericos", nombre: "Nervios periféricos", estado: "preparado" }
    ]
  },
  {
    id: "cardiovascular",
    nombre: "Cardiovascular",
    icono: "🫀",
    color: "#ff647c",
    estado: "preparado",
    descripcion: "Corazón, coronarias, grandes vasos y circulación.",
    organos: [
      { id: "corazon", nombre: "Corazón", estado: "preparado" },
      { id: "camaras", nombre: "Cámaras cardíacas", estado: "preparado" },
      { id: "valvulas", nombre: "Válvulas", estado: "preparado" },
      { id: "coronarias", nombre: "Arterias coronarias", estado: "preparado" },
      { id: "conduccion", nombre: "Sistema de conducción", estado: "preparado" },
      { id: "grandes-vasos", nombre: "Grandes vasos", estado: "preparado" },
      { id: "circulacion-pulmonar", nombre: "Circulación pulmonar", estado: "preparado" },
      { id: "circulacion-sistemica", nombre: "Circulación sistémica", estado: "preparado" }
    ]
  },
  {
    id: "respiratorio",
    nombre: "Respiratorio",
    icono: "🫁",
    color: "#61d9c8",
    estado: "preparado",
    descripcion: "Vía aérea, pulmones, pleuras y árbol bronquial.",
    organos: [
      { id: "laringe", nombre: "Laringe", estado: "preparado" },
      { id: "traquea", nombre: "Tráquea", estado: "preparado" },
      { id: "bronquios", nombre: "Árbol bronquial", estado: "preparado" },
      { id: "pulmones", nombre: "Pulmones", estado: "preparado" },
      { id: "segmentos", nombre: "Segmentos broncopulmonares", estado: "preparado" },
      { id: "pleura", nombre: "Pleuras", estado: "preparado" }
    ]
  },
  {
    id: "digestivo",
    nombre: "Digestivo",
    icono: "◒",
    color: "#ffb65f",
    estado: "preparado",
    descripcion: "Tubo digestivo y órganos hepatobiliopancreáticos.",
    organos: [
      { id: "esofago", nombre: "Esófago", estado: "preparado" },
      { id: "estomago", nombre: "Estómago", estado: "preparado" },
      { id: "duodeno", nombre: "Duodeno", estado: "preparado" },
      { id: "intestino-delgado", nombre: "Intestino delgado", estado: "preparado" },
      { id: "colon", nombre: "Colon y recto", estado: "preparado" },
      { id: "higado", nombre: "Hígado", estado: "preparado" },
      { id: "via-biliar", nombre: "Vía biliar", estado: "preparado" },
      { id: "pancreas", nombre: "Páncreas", estado: "preparado" }
    ]
  },
  {
    id: "urinario",
    nombre: "Urinario",
    icono: "◐",
    color: "#76b9ff",
    estado: "preparado",
    descripcion: "Riñones, uréteres, vejiga y relaciones retroperitoneales.",
    organos: [
      { id: "rinones", nombre: "Riñones", estado: "preparado" },
      { id: "hilio-renal", nombre: "Hilio renal", estado: "preparado" },
      { id: "ureteres", nombre: "Uréteres", estado: "preparado" },
      { id: "vejiga", nombre: "Vejiga", estado: "preparado" },
      { id: "uretra", nombre: "Uretra", estado: "preparado" }
    ]
  },
  {
    id: "endocrino",
    nombre: "Endocrino",
    icono: "✦",
    color: "#e58aff",
    estado: "preparado",
    descripcion: "Glándulas endocrinas y relaciones anatómicas.",
    organos: [
      { id: "hipofisis", nombre: "Hipófisis", estado: "preparado" },
      { id: "tiroides", nombre: "Tiroides", estado: "preparado" },
      { id: "paratiroides", nombre: "Paratiroides", estado: "preparado" },
      { id: "suprarrenales", nombre: "Suprarrenales", estado: "preparado" },
      { id: "pancreas-endocrino", nombre: "Páncreas endocrino", estado: "preparado" }
    ]
  },
  {
    id: "reproductor",
    nombre: "Reproductor",
    icono: "◇",
    color: "#ff7fb6",
    estado: "preparado",
    descripcion: "Pelvis y órganos reproductores masculino y femenino.",
    organos: [
      { id: "masculino", nombre: "Sistema reproductor masculino", estado: "preparado" },
      { id: "femenino", nombre: "Sistema reproductor femenino", estado: "preparado" },
      { id: "pelvis-perine", nombre: "Pelvis y periné", estado: "preparado" }
    ]
  }
];
