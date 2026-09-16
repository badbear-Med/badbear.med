(() => {
  "use strict";

  const temas = [
  {
    "id": "febril-sirs-sepsis",
    "titulo": "Paciente febril, SIRS y sepsis",
    "nombre": "Paciente febril, SIRS y sepsis",
    "area": "Bases",
    "categoria": "Bases",
    "icono": "âš•",
    "descripcion": "Enfoque del huÃ©sped, foco infeccioso, SIRS, sepsis, choque sÃ©ptico y neutropenia febril."
  },
  {
    "id": "emergentes-reemergentes",
    "titulo": "Infecciones emergentes y reemergentes",
    "nombre": "Infecciones emergentes y reemergentes",
    "area": "Emergentes",
    "categoria": "Emergentes",
    "icono": "â—‰",
    "descripcion": "Arbovirosis, vectores, sÃ­ndromes tropicales, Oropouche, Mayaro, chikungunya, Zika y leishmaniasis."
  },
  {
    "id": "vih-sida",
    "titulo": "VIH / SIDA",
    "nombre": "VIH / SIDA",
    "area": "VIH",
    "categoria": "VIH",
    "icono": "âœš",
    "descripcion": "Ciclo viral, CD4, carga viral, diagnÃ³stico, infecciones oportunistas y terapia antirretroviral."
  },
  {
    "id": "fungicas-invasivas",
    "titulo": "Infecciones fÃºngicas invasivas",
    "nombre": "Infecciones fÃºngicas invasivas",
    "area": "MicologÃ­a",
    "categoria": "MicologÃ­a",
    "icono": "âœ¦",
    "descripcion": "Candida, Aspergillus, Cryptococcus, Mucorales, diagnÃ³stico y farmacologÃ­a antifÃºngica."
  },
  {
    "id": "antimicrobianos",
    "titulo": "Antimicrobianos y antibiÃ³ticos",
    "nombre": "Antimicrobianos y antibiÃ³ticos",
    "area": "FarmacologÃ­a",
    "categoria": "FarmacologÃ­a",
    "icono": "Rx",
    "descripcion": "Mecanismos, espectro, farmacocinÃ©tica, resistencia, toxicidad y elecciÃ³n racional del antimicrobiano."
  },
  {
    "id": "parasitosis-intestinales",
    "titulo": "Parasitosis intestinales",
    "nombre": "Parasitosis intestinales",
    "area": "ParasitologÃ­a",
    "categoria": "ParasitologÃ­a",
    "icono": "âˆ¿",
    "descripcion": "Blastocystis, Enterobius, Ascaris, Hymenolepis, Taenia, Echinococcus y tratamiento del cuaderno."
  },
  {
    "id": "fiebre-tifoidea",
    "titulo": "Fiebre tifoidea",
    "nombre": "Fiebre tifoidea",
    "area": "Bacterianas",
    "categoria": "Bacterianas",
    "icono": "B",
    "descripcion": "Salmonella Typhi, patogenia, cultivos por fase, complicaciones intestinales y tratamiento."
  },
  {
    "id": "brucelosis",
    "titulo": "Brucelosis",
    "nombre": "Brucelosis",
    "area": "Zoonosis",
    "categoria": "Zoonosis",
    "icono": "Z",
    "descripcion": "Zoonosis intracelular, fiebre ondulante, diagnÃ³stico microbiolÃ³gico y tratamiento combinado."
  },
  {
    "id": "ofidismo",
    "titulo": "Ofidismo",
    "nombre": "Ofidismo",
    "area": "ToxicologÃ­a",
    "categoria": "ToxicologÃ­a",
    "icono": "S",
    "descripcion": "SÃ­ndromes botrÃ³pico, lachÃ©sico, crotÃ¡lico y elapÃ­dico, soporte y antiveneno."
  },
  {
    "id": "diarrea-aguda",
    "titulo": "Enfermedad diarreica aguda",
    "nombre": "Enfermedad diarreica aguda",
    "area": "Gastrointestinal",
    "categoria": "Gastrointestinal",
    "icono": "H2O",
    "descripcion": "Diarrea acuosa e inflamatoria, deshidrataciÃ³n, enteropatÃ³genos e indicaciones de antimicrobianos."
  },
  {
    "id": "mononucleosis",
    "titulo": "Mononucleosis infecciosa",
    "nombre": "Mononucleosis infecciosa",
    "area": "Virales",
    "categoria": "Virales",
    "icono": "V",
    "descripcion": "Virus de Epstein-Barr, sÃ­ndrome mononucleÃ³sico, diagnÃ³stico, complicaciones y manejo."
  },
  {
    "id": "tuberculosis",
    "titulo": "Tuberculosis",
    "nombre": "Tuberculosis",
    "area": "Micobacterias",
    "categoria": "Micobacterias",
    "icono": "TB",
    "descripcion": "Tuberculosis pulmonar y extrapulmonar, diagnÃ³stico microbiolÃ³gico, HRZE y toxicidades."
  },
  {
    "id": "its",
    "titulo": "Infecciones de transmisiÃ³n sexual",
    "nombre": "Infecciones de transmisiÃ³n sexual",
    "area": "ITS",
    "categoria": "ITS",
    "icono": "ITS",
    "descripcion": "SÃ­filis, gonorrea, clamidia, herpes, EIP, vaginitis, bubÃ³n inguinal y manejo sindrÃ³mico."
  }
];

  // Variable principal usada por el portal actual.
  window.BADBEAR_INFECTOLOGIA_TEMAS = temas;

  // Alias de compatibilidad para versiones anteriores del portal.
  window.BADBEAR_INFECTO_TEMAS = temas;
  window.INFECTOLOGIA_TEMAS = temas;
  window.BADBEAR_TEMAS = window.BADBEAR_TEMAS || temas;
})();