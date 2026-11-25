"use strict";
const labels = {
  I: "I · Diéresis", II: "II · Exéresis y síntesis", III: "III · Especiales", IV: "IV · Hemostasia",
  campo: "Campo operatorio · fijación de campos",
  separacion: "Separación y exposición · sin cuadrante fijo en la rúbrica",
};
const $ = id => document.getElementById(id);
const stations = [
  {
    "id": "metzenbaum",
    "name": "Metzenbaum",
    "place": "I",
    "use": "Disecar y seccionar tejidos blandos delicados, como tejido celular subcutáneo o planos finos.",
    "reason": "Hojas finas y cortas en proporción al mango. La Mayo curva es más robusta.",
    "rivals": [
      "mayo-curva",
      "mayo-recta"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75cd0b898d8300123e555c/664bc300368214fbd75a0823e4cfc938",
        "alt": "Foto de catálogo de Metzenbaum · modelo 1",
        "source": "https://www.sklarcorp.com/p/sklarcut-metzenbaum-dissecting-scissors-7-curved-blunt-blunt-1-standard-edge-1-micro-serrated-edge/15-3575"
      },
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75cd13bae1c90012f36ccc/49452b3f9a279de6bcd2621cde5f46c2",
        "alt": "Foto de catálogo de Metzenbaum · modelo 2",
        "source": "https://www.sklarcorp.com/p/sklarhone-sklarlite-metzenbaum-dissecting-scissors-7-curved-bluntblunt-1-razor-edge-1-standard-edge-extra-light/15-9117"
      }
    ],
    "anchor": "metzenbaum"
  },
  {
    "id": "mayo-recta",
    "name": "Mayo recta",
    "place": "I",
    "use": "Cortar hilos de ligadura y recortar cabos de sutura; la rúbrica la reserva para material quirúrgico.",
    "reason": "Las hojas continúan rectas sobre el eje. En la mesa de la cátedra va en I aunque se utilice al cerrar.",
    "rivals": [
      "mayo-curva",
      "metzenbaum"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a7532e1092f8d00120562e7/4cd4ac0c68f71c56d86fa8ca93c4fd72",
        "alt": "Foto de catálogo de Mayo recta · modelo 1",
        "source": "https://www.sklarcorp.com/p/sklar-mayo-dissecting-scissors-6-3-4-straight/15-1567"
      },
      {
        "url": "https://cdn.swell.store/sklar-staging/6a7532e20d7967001216a991/7fc91b287ffc2117f56b957d235e242d",
        "alt": "Foto de catálogo de Mayo recta · modelo 2",
        "source": "https://www.sklarcorp.com/p/sklar-mayo-dissecting-scissors-5-1-2-straight/15-1555"
      }
    ],
    "anchor": "mayo-recta"
  },
  {
    "id": "mayo-curva",
    "name": "Mayo curva",
    "place": "I",
    "use": "Seccionar tejidos resistentes, como fascia o aponeurosis, tejido fibroso y, según la indicación, tendón o tejido muscular firme.",
    "reason": "Las hojas curvas son más robustas que las de una Metzenbaum del mismo tamaño. La curvatura sola no basta.",
    "rivals": [
      "metzenbaum",
      "mayo-recta"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75d0fead691d00121caec1/d5b8d51ab26de46de97dfe6cf33dcb22",
        "alt": "Foto de catálogo de Mayo curva",
        "source": "https://www.sklarcorp.com/p/econo-mayo-dissecting-scissors-5-1-2-curved/21-312"
      }
    ],
    "anchor": "mayo-curva"
  },
  {
    "id": "mango-3",
    "name": "Mango de bisturí n.º 3",
    "place": "I",
    "use": "Sostener hojas de acople pequeño, como las n.º 10, 11 y 15, para incisiones o cortes precisos según la hoja.",
    "reason": "Busca el número grabado y el acople más estrecho. Confirma la compatibilidad del fabricante.",
    "rivals": [
      "mango-4",
      "sonda-acanalada"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a7531a781af6e0012c2cc63/9573642f1830b61be406de2f5612c83c",
        "alt": "Foto de catálogo de Mango n.º 3 · modelo 1",
        "source": "https://www.sklarcorp.com/p/Sklar-Scalpel-Handle-3/06-2903?view=super_skus"
      },
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75be6b149754001204a577/e863ebed112337188570bc4def696272",
        "alt": "Foto de catálogo de Mango n.º 3 · modelo 2",
        "source": "https://www.sklarcorp.com/p/merit-scalpel-handle-3/97-033"
      }
    ],
    "anchor": "mangos-de-bisturi-n-3-y-4"
  },
  {
    "id": "mango-4",
    "name": "Mango de bisturí n.º 4",
    "place": "I",
    "use": "Sostener hojas de acople grande, como las n.º 20, 22 y 24, para incisiones o cortes que requieran ese perfil de hoja.",
    "reason": "El acople es más ancho que en el n.º 3. La longitud total del mango no determina compatibilidad.",
    "rivals": [
      "mango-3",
      "sonda-acanalada"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a7531a4b482250011550c54/b5bf7155df138c5a347b09f9ddb4b272",
        "alt": "Foto de catálogo de Mango n.º 4 · modelo 1",
        "source": "https://www.sklarcorp.com/p/sklar-scalpel-handle-4/06-2904?view=super_skus"
      },
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75be6a328ffd00126a047d/e8b661781843f3cbd98bb7cf96dad63c",
        "alt": "Foto de catálogo de Mango n.º 4 · modelo 2",
        "source": "https://www.sklarcorp.com/p/merit-scalpel-handle-4/97-038"
      }
    ],
    "anchor": "mangos-de-bisturi-n-3-y-4"
  },
  {
    "id": "pinza-de-diseccion-con-dientes",
    "name": "Pinza de disección con dientes",
    "place": "I",
    "use": "Sujetar y estabilizar tejidos resistentes, como bordes cutáneos o fascia cuando corresponda, aprovechando el encaje de sus dientes.",
    "reason": "En el ejemplo Adson 1×2, un diente se intercala entre dos. Las estrías de una pinza sin dientes no forman ese encaje.",
    "rivals": [
      "pinza-de-diseccion-sin-dientes",
      "backhaus"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75cd8838bbe500113fd94d/58d9e7587407ac34f6c58b64f54a88df",
        "alt": "Foto de catálogo de Pinza de disección con dientes · modelo 1",
        "source": "https://www.sklarcorp.com/p/sklar-adson-tissue-forceps-6-straight-1x2-teeth/50-3170"
      },
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75cd8d80630e00122fb75c/5c5fe234189869327095a91610cdf740",
        "alt": "Foto de catálogo de Pinza de disección con dientes · modelo 2",
        "source": "https://www.sklarcorp.com/p/sklar-adson-tissue-forceps-4-3-4-angled-1x2-teeth/50-3046"
      }
    ],
    "anchor": "pinza-de-diseccion-con-dientes"
  },
  {
    "id": "pinza-de-diseccion-sin-dientes",
    "name": "Pinza de disección sin dientes",
    "place": "I",
    "use": "Sujetar tejidos delicados y manipular gasas u otros materiales, según el modelo, sin dientes terminales.",
    "reason": "Mira los extremos de frente: pueden verse estrías, pero las puntas no tienen dientes terminales que se interdigiten.",
    "rivals": [
      "pinza-de-diseccion-con-dientes",
      "sonda-acanalada"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75325ef8c9ad0011ec279a/0cfa160cb6d344793b4243b2882f940a",
        "alt": "Foto de catálogo de Pinza de disección sin dientes · modelo 1",
        "source": "https://www.sklarcorp.com/p/Sklar-Adson-Ewald-Dressing-Forceps-4-3-4-Straight-Serrated/50-3147"
      },
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75cb8252739f00128d348b/18758c470fe454505dae422aa7e7f18f",
        "alt": "Foto de catálogo de Pinza de disección sin dientes · modelo 2",
        "source": "https://www.sklarcorp.com/p/sklar-adson-dressing-forceps-6-straight-serrated/50-3070"
      }
    ],
    "anchor": "pinza-de-diseccion-sin-dientes"
  },
  {
    "id": "crile",
    "name": "Crile",
    "place": "IV",
    "use": "Realizar pinzamiento hemostático de vasos según su tamaño y sujetar estructuras cuando se requiere cierre con cremallera.",
    "reason": "En el patrón clásico el estriado transversal cubre prácticamente toda la mandíbula; en Kelly se concentra hacia la punta.",
    "rivals": [
      "kelly",
      "halsted-o-mosquito",
      "mayo-hegar"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75cdfb055fd3001235f204/60d050485fec10c72097112b6e24f351",
        "alt": "Foto de catálogo de Crile",
        "source": "https://www.sklarcorp.com/p/sklar-crile-hemostatic-forceps-5-1-2-straight-delicate/18-1952"
      }
    ],
    "anchor": "crile"
  },
  {
    "id": "kelly",
    "name": "Kelly",
    "place": "IV",
    "use": "Realizar pinzamiento hemostático según el calibre y sostener tejido o material cuando se necesita mantener el cierre.",
    "reason": "En el patrón clásico las estrías se concentran en la mitad distal. Ver la mandíbula por dentro es más útil que mirar solo la curvatura.",
    "rivals": [
      "crile",
      "halsted-o-mosquito",
      "mayo-hegar"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75cdae01c8b20012e819cb/7296b013dea2bc5f427bb8031e35cc71",
        "alt": "Foto de catálogo de Kelly",
        "source": "https://www.sklarcorp.com/p/sklar-kelly-hemostatic-forceps-5-1-2-straight-delicate/18-1552"
      }
    ],
    "anchor": "kelly"
  },
  {
    "id": "halsted-o-mosquito",
    "name": "Halsted o mosquito",
    "place": "IV",
    "use": "Pinzar vasos pequeños y realizar prensión fina en un campo reducido según la indicación.",
    "reason": "Es menor y más delicada que Kelly o Crile comparables. La cremallera y las anillas son rasgos compartidos.",
    "rivals": [
      "kelly",
      "crile",
      "backhaus"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75cdd47adadb0013449487/b5ac80dfee20c925adda40c96bbfbff2",
        "alt": "Foto de catálogo de Halsted o mosquito · curva",
        "source": "https://www.sklarcorp.com/p/Sklar-Halsted-Mosquito-Hemostatic-Forceps-5-Curved/93-1550"
      },
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75329d743ad000120d8f58/ef3c2ec0762cf2c65946a5b28630087a",
        "alt": "Foto de catálogo de Halsted o mosquito · recta",
        "source": "https://www.sklarcorp.com/p/sklar-halsted-mosquito-hemostatic-forceps-5-straight/17-1450"
      }
    ],
    "anchor": "halsted-o-mosquito"
  },
  {
    "id": "mayo-hegar",
    "name": "Mayo-Hegar",
    "place": "II",
    "use": "Sujetar y dirigir una aguja quirúrgica para colocar puntos y aproximar planos durante la síntesis.",
    "reason": "Mandíbulas cortas y robustas acondicionadas para sostener agujas. El surco depende del modelo; no lo uses como criterio único.",
    "rivals": [
      "crile",
      "kelly",
      "halsted-o-mosquito"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a753304763f2200120a5722/4976277ff5ad1d9e96b051ab242adf9e",
        "alt": "Foto de catálogo de Mayo-Hegar · modelo 1",
        "source": "https://www.sklarcorp.com/p/Sklar-TC-Mayo-Hegar-Needle-Holder-6-Serrated/21-8031"
      },
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75d2deef697e0012d7b6a3/cc904207332f00fce5925cb41c19a7ea",
        "alt": "Foto de catálogo de Mayo-Hegar · modelo 2",
        "source": "https://www.sklarcorp.com/p/sklar-mayo-hegar-needle-holder-6-serrated/20-2060"
      }
    ],
    "anchor": "mayo-hegar"
  },
  {
    "id": "sonda-acanalada",
    "name": "Sonda acanalada",
    "place": "III",
    "use": "Explorar o delimitar un trayecto accesible y servir de guía o protección durante la disección en los contextos indicados.",
    "reason": "El canal longitudinal es el rasgo clave. El mango de bisturí tiene un acople de hoja. La forma de la lengüeta varía.",
    "rivals": [
      "mango-3",
      "mango-4",
      "pinza-de-diseccion-sin-dientes"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75c8a36c0b8b0012b64fe9/682fab00c8aa862e278d2512a0bd97f6",
        "alt": "Foto de catálogo de Sonda acanalada",
        "source": "https://www.sklarcorp.com/p/sklar-doyen-grooved-director-5-3-4/30-1260"
      }
    ],
    "anchor": "sonda-acanalada"
  },
  {
    "id": "backhaus",
    "name": "Backhaus",
    "place": "campo",
    "use": "Prender y mantener unidos los campos operatorios de acuerdo con la técnica y la organización del equipo.",
    "reason": "Sus puntas agudas se aproximan para prender el campo. Según la rúbrica aportada se identifica con su destino en el campo.",
    "rivals": [
      "halsted-o-mosquito",
      "kelly",
      "pinza-de-diseccion-con-dientes"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a7532b70ce366001276914d/9e08ea4fa06cb42a2d268cefa13fb46a",
        "alt": "Foto de catálogo de Backhaus",
        "source": "https://www.sklarcorp.com/p/sklar-backhaus-towel-clamp-3-1-2/47-2935"
      }
    ],
    "anchor": "backhaus"
  },
  {
    "id": "doyen-intestinal",
    "name": "Doyen intestinal",
    "place": "III",
    "use": "Comprimir temporalmente la luz intestinal para limitar el tránsito del contenido mediante mandíbulas de diseño no aplastante.",
    "reason": "Las mandíbulas largas lo diferencian de una hemostática convencional. El apellido Doyen también aparece en otros tipos de instrumental.",
    "rivals": [
      "crile",
      "kelly",
      "sonda-acanalada"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75a35ff8d3dc0013d87e6d/66995f084afbda8fa7d1fa1adb7b9099",
        "alt": "Foto de catálogo de Doyen intestinal",
        "source": "https://www.sklarcorp.com/p/sklar-doyen-intestinal-forceps/36-3694"
      }
    ],
    "anchor": "doyen-intestinal"
  },
  {
    "id": "farabeuf",
    "name": "Farabeuf",
    "place": "separacion",
    "use": "Retraer manualmente bordes y exponer planos superficiales; sus dos valvas ofrecen profundidades de trabajo distintas.",
    "reason": "Busca los dos extremos angulados. Richardson tiene mango y una sola valva de trabajo.",
    "rivals": [
      "richardson",
      "deaver",
      "valva-maleable"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a752fb16b50cc00126b8e84/2f52fcd706bd2dd7db1a308b9e902b8c",
        "alt": "Foto de catálogo de Farabeuf · modelo 1",
        "source": "https://www.sklarcorp.com/p/sklar-farabeuf-retractor/60-1460"
      },
      {
        "url": "https://cdn.swell.store/sklar-staging/6a7594ab70bfa6001268b7db/f2d1766de9950f0a3338dffc976501d5",
        "alt": "Foto de catálogo de Farabeuf · modelo 2",
        "source": "https://www.sklarcorp.com/p/sklar-baby-farabeuf-retractor/60-1461"
      }
    ],
    "anchor": "farabeuf"
  },
  {
    "id": "richardson",
    "name": "Richardson",
    "place": "separacion",
    "use": "Separar manualmente tejidos de la pared o bordes de una incisión para exponer un plano accesible con su valva angulada.",
    "reason": "La transición entre mango y valva tiene un ángulo definido. El Deaver muestra una curva amplia y continua.",
    "rivals": [
      "farabeuf",
      "deaver",
      "valva-maleable"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a752fa96b50cc00126b8e61/7420619d5595aabd6e176aa8cd3cb923",
        "alt": "Foto de catálogo de Richardson · modelo 1",
        "source": "https://www.sklarcorp.com/p/Sklar-Richardson-Retractor/60-1691"
      },
      {
        "url": "https://cdn.swell.store/sklar-staging/6a752fab2aeed5001386bcbf/8bae25528d7ef6a4c7d278783aa022b0",
        "alt": "Foto de catálogo de Richardson · modelo 2",
        "source": "https://www.sklarcorp.com/p/sklar-richardson-retractor/60-1681"
      }
    ],
    "anchor": "richardson"
  },
  {
    "id": "deaver",
    "name": "Deaver",
    "place": "separacion",
    "use": "Retraer manualmente tejidos o vísceras y mantener exposición profunda con una valva rígida de curva amplia.",
    "reason": "Su perfil curvo es preformado. Una valva maleable es una lámina que se adapta al contorno según el modelo.",
    "rivals": [
      "richardson",
      "valva-maleable",
      "farabeuf"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75b2191abddd00125b64e4/763287eeb3be79adf64fd3acfc2d6434",
        "alt": "Foto de catálogo de Deaver · modelo 1",
        "source": "https://www.sklarcorp.com/p/sklar-deaver-000-3-4x7/60-3070"
      },
      {
        "url": "https://cdn.swell.store/sklar-staging/6a753141a27b2200123da6f0/eabd3b5c3703c5b399c1aad4d9e82c13",
        "alt": "Foto de catálogo de Deaver · modelo 2",
        "source": "https://www.sklarcorp.com/p/Sklar-Deaver-1-1X12/60-3112"
      }
    ],
    "anchor": "deaver"
  },
  {
    "id": "valva-maleable",
    "name": "Valva maleable",
    "place": "separacion",
    "use": "Adaptar la superficie de contacto a la anatomía para separar tejidos y mantener un campo visible con apoyo amplio.",
    "reason": "Parece una cinta metálica, a menudo recta en la foto. El Deaver tiene un perfil curvo rígido preformado.",
    "rivals": [
      "deaver",
      "richardson",
      "farabeuf"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75d17c3099c40012295cc6/d1609854fe29a4a68e42b5b2ebb754c7",
        "alt": "Foto de catálogo de Valva maleable · modelo 1",
        "source": "https://www.sklarcorp.com/p/sklar-zalkind-ribbon-retractor-13-x-2-1-2/60-3625"
      },
      {
        "url": "https://cdn.swell.store/sklar-staging/6a75d17d2d99160012118153/c5609c4c9c67b6e1ecf8f418bf3380a6",
        "alt": "Foto de catálogo de Valva maleable · modelo 2",
        "source": "https://www.sklarcorp.com/p/sklar-zalkind-ribbon-retractor-13-x-1-1-4/60-3612"
      }
    ],
    "anchor": "valva-maleable"
  },
  {
    "id": "gosset",
    "name": "Gosset",
    "place": "separacion",
    "use": "Mantener la separación de los bordes y el campo abdominal con un sistema autoestático de valvas laterales.",
    "reason": "En el montaje bipala ilustrado se ven dos valvas laterales. Compáralo con la configuración Balfour que añade una central.",
    "rivals": [
      "balfour",
      "richardson",
      "farabeuf"
    ],
    "photos": [
      {
        "url": "https://img.medicalexpo.com/images_me/photo-g/4580889-20978391.jpg",
        "alt": "Foto de catálogo de Gosset · modelo 1",
        "source": "https://www.medicalexpo.com/prod/hk-medical-instruments/product-4580889-2779533.html"
      },
      {
        "url": "https://img.medicalexpo.com/images_me/photo-g/4580972-19692907.jpg",
        "alt": "Foto de catálogo de Gosset · modelo 2",
        "source": "https://www.medicalexpo.com/prod/blue-surgical-instruments/product-4580972-1158171.html"
      }
    ],
    "anchor": "gosset-y-balfour"
  },
  {
    "id": "balfour",
    "name": "Balfour",
    "place": "separacion",
    "use": "Mantener la exposición abdominal con valvas laterales autoestáticas y ampliar la exposición mediante una valva central según el montaje.",
    "reason": "La configuración de la ficha muestra una valva central además de las dos laterales. Compara el montaje completo con Gosset.",
    "rivals": [
      "gosset",
      "deaver",
      "farabeuf"
    ],
    "photos": [
      {
        "url": "https://cdn.swell.store/sklar-staging/6a7594205733910012b51b32/396772febf7e54f078bd605770c7648b",
        "alt": "Foto de catálogo de Balfour · modelo 1",
        "source": "https://www.sklarcorp.com/p/Sklar-Balfour-Retractor/60-7112"
      },
      {
        "url": "https://cdn.swell.store/sklar-staging/6a759425bd1f830012caf831/f34d61d6f85dcf815f2964d9f77e1761",
        "alt": "Foto de catálogo de Balfour · modelo 2",
        "source": "https://www.sklarcorp.com/p/Sklar-Balfour-Abdominal-Retractor/60-6870"
      }
    ],
    "anchor": "gosset-y-balfour"
  }
];
const byId = new Map(stations.map(item => [item.id, item]));
const functionDistractors = {
  crile: ["mayo-hegar", "doyen-intestinal", "backhaus"],
  kelly: ["mayo-hegar", "doyen-intestinal", "backhaus"],
  "halsted-o-mosquito": ["mayo-hegar", "doyen-intestinal", "backhaus"],
};
const comparedFunctions = {
  crile: " Usar el patrón con estrías a lo largo de las mandíbulas.",
  kelly: " Usar el patrón clásico con estrías en la porción distal.",
  "halsted-o-mosquito": " Aprovechar su punta fina y de menor tamaño.",
};
let run = [], index = 0, results = [], failedImage = false;
let currentValues;

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function element(tag, text) {
  const node = document.createElement(tag);
  node.textContent = text;
  return node;
}

function start(all) {
  if (run.length && results.length < run.length && !window.confirm("¿Reiniciar el simulacro en curso?")) return;
  run = shuffle(stations.flatMap(item => (all ? item.photos : shuffle(item.photos).slice(0, 1)).map(photo => ({item, photo}))));
  index = 0;
  results = [];
  $("summary").hidden = true;
  $("station").hidden = false;
  $("status").textContent = "Tres respuestas por estación. Puedes empezar de nuevo al finalizar.";
  render();
}

function question(id, title, values, getLabel) {
  const wrapper = document.createElement("div");
  const label = element("label", title);
  label.htmlFor = id;
  const select = document.createElement("select");
  select.id = id;
  select.required = true;
  select.add(new Option("Elige una opción", ""));
  for (const value of shuffle(values)) select.add(new Option(getLabel(value), value));
  wrapper.append(label, select);
  return wrapper;
}

function render() {
  const {item, photo} = run[index];
  failedImage = false;
  $("image-error").hidden = true;
  $("photo").alt = "Fotografía de un instrumento para identificar";
  $("photo").hidden = false;
  $("photo").src = photo.url;
  $("position").textContent = "Estación " + (index + 1) + " de " + run.length;
  $("feedback").replaceChildren();
  $("answers").hidden = false;
  $("next").hidden = true;
  const ids = [item.id, ...item.rivals];
  const uses = [item.id, ...(functionDistractors[item.id] || item.rivals)];
  currentValues = [item.id, item.place, item.id];
  $("questions").replaceChildren(
    question("identify", "1. ¿Qué instrumento es?", ids, id => byId.get(id).name),
    question("place", "2. ¿En qué cuadrante o destino se ubica según la cátedra?", Object.keys(labels), id => labels[id]),
    question("use", "3. ¿Qué funciones y rasgos corresponden a esta pieza?", uses, id => byId.get(id).use + (comparedFunctions[id] || ""))
  );
  $("check").disabled = false;
  $("position").focus();
}

function grade(skipped) {
  if (results.length !== index) return;
  const {item, photo} = run[index];
  const actual = ["identify", "place", "use"].map(id => $(id).value);
  const marks = currentValues.map((value, i) => !skipped && actual[i] === value);
  const answered = skipped ? 0 : 3;
  results.push({item, marks, answered, unavailable: skipped && failedImage});
  $("answers").hidden = true;
  $("photo").alt = item.name;
  const feedback = $("feedback");
  feedback.replaceChildren(element("h3", skipped ? "Estación omitida" : "Aciertos: " + marks.filter(Boolean).length + " de 3"));
  ["Identificación", "Ubicación", "Funciones"].forEach((name, i) => {
    const value = [item.name, labels[item.place], item.use][i];
    feedback.append(element("p", name + (!skipped ? (marks[i] ? " · Correcto: " : " · Incorrecto: ") : ": ") + value));
  });
  feedback.append(element("p", "Rasgo diferencial: " + item.reason));
  if (item.place === "separacion") feedback.append(element("p", "La clase distingue los separadores por su función. El esquema de evaluación no les asigna un cuadrante fijo."));
  const atlas = element("a", "Ver ficha y comparación en el atlas");
  atlas.href = "instrumentacion.html#" + item.anchor;
  atlas.target = "_blank";
  atlas.rel = "noopener";
  const source = element("a", " Ver fuente de la fotografía");
  source.href = photo.source;
  source.target = "_blank";
  source.rel = "noopener noreferrer";
  feedback.append(atlas, source);
  const pages = ({"metzenbaum":[10,11,12],"mayo-recta":[13,14,15],"mayo-curva":[13,14,15],"mangos-de-bisturi-n-3-y-4":[5],"pinza-de-diseccion-con-dientes":[25,26],"pinza-de-diseccion-sin-dientes":[25],"crile":[28],"kelly":[32],"halsted-o-mosquito":[27],"mayo-hegar":[64],"sonda-acanalada":[62],"backhaus":[37],"doyen-intestinal":[],"farabeuf":[68],"richardson":[],"deaver":[],"valva-maleable":[],"gosset-y-balfour":[67]})[item.anchor] || [];
  if (item.id !== "gosset") for (const page of pages) {
    const catalog = element("a", "TRIMED · pág. " + page);
    catalog.href = "media/instrumentacion/catalogo-trimed.pdf#page=" + page;
    catalog.target = "_blank";
    catalog.rel = "noopener";
    feedback.append(catalog);
  }
  $("next").textContent = index === run.length - 1 ? "Ver resultado final" : "Siguiente estación";
  $("next").hidden = false;
  $("next").focus();
}

function finish() {
  $("station").hidden = true;
  const summary = $("summary");
  const valid = results.filter(result => !result.unavailable);
  const correct = valid.reduce((sum, row) => sum + row.marks.filter(Boolean).length, 0);
  const title = element("h2", "Resultado: " + correct + " de " + (valid.length * 3));
  title.tabIndex = -1;
  const metrics = ["Identificación", "Ubicación", "Funciones"].map((name, i) => name + ": " + valid.filter(row => row.marks[i]).length + "/" + valid.length);
  const count = results.filter(row => row.unavailable).length;
  summary.replaceChildren(title, element("p", metrics.join(" · ")),
    element("p", results.filter(row => row.answered > 0).length + " estaciones respondidas." + (count ? " Fotos no disponibles excluidas del puntaje: " + count + "." : "")));
  summary.hidden = false;
  $("status").textContent = "Simulacro finalizado. Puedes iniciar otra ronda.";
  title.focus();
}

$("photo").referrerPolicy = "no-referrer";
$("photo").addEventListener("error", () => {
  failedImage = true;
  $("image-error").hidden = false;
  $("check").disabled = true;
});
$("quick").addEventListener("click", () => start(false));
$("all").addEventListener("click", () => start(true));
$("answers").addEventListener("submit", event => { event.preventDefault(); if (!failedImage) grade(false); });
$("skip").addEventListener("click", () => grade(true));
$("next").addEventListener("click", () => { if (index + 1 === run.length) finish(); else { index++; render(); } });
