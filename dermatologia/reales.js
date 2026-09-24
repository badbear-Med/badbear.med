const preguntasReales = [
    {
        id: "001",
        enunciado: "Sobre la estructura de la piel, señale lo incorrecto:",
        opciones: [
            "Embriológicamente se desarrolla del ectodermo y mesodermo",
            "En el segundo trimestre se inicia la queratinización",
            "Consta de 3 capas: epidermis, dermis e hipodermis",
            "Está constituida por 90% por células epidérmicas, dérmicas e hipodérmicas",
            "El estrato espinoso tiene células cuboides"
        ],
        correcta: 3,
        desarrollo:
            "La piel se organiza en epidermis, dermis e hipodermis, pero no puede describirse como si el 90% de toda su constitución correspondiera a células epidérmicas, dérmicas e hipodérmicas. La epidermis está formada principalmente por queratinocitos y contiene también melanocitos, células de Langerhans y células de Merkel. La dermis posee abundante matriz extracelular, colágeno, elastina, fibroblastos, vasos, nervios y anexos; la hipodermis contiene sobre todo tejido adiposo organizado en lobulillos. La composición de la piel, por tanto, no se resume mediante ese porcentaje celular.",
        fija:
            "Epidermis + dermis + hipodermis describen la organización anatómica de la piel; no memorices un supuesto 90% celular como composición normal.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "002",
        enunciado: "Son características de las pápulas, EXCEPTO:",
        opciones: [
            "Pueden ser dermoepidérmicas",
            "Son consistentes",
            "No se hallan en el liquen amiloideo",
            "No dejan cicatriz",
            "Presentación multilocular"
        ],
        correcta: 2,
        desarrollo:
            "La pápula es una lesión sólida, elevada y circunscrita. Puede originarse en epidermis, dermis superficial o en ambas, por lo que algunas son dermoepidérmicas. Su consistencia se aprecia a la palpación y habitualmente, cuando desaparecen sin destrucción profunda del tejido, no dejan cicatriz. El liquen amiloideo sí puede manifestarse con múltiples pápulas pruriginosas que incluso confluyen, de modo que negar la presencia de pápulas en esta entidad es la afirmación incorrecta.",
        fija:
            "Pápula = lesión sólida, elevada y pequeña. El liquen amiloideo sí presenta pápulas.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "003",
        enunciado: "En la estructura de la piel, NO se relaciona:",
        opciones: [
            "Neuroectodermo",
            "Peridermo en embrión",
            "Lanugo hasta 5 meses",
            "Células de Langerhans de origen óseo",
            "Hemidesmosomas en capa basal"
        ],
        correcta: 2,
        desarrollo:
            "El desarrollo y la organización de la piel integran varios elementos embrionarios y celulares. El peridermo es una capa transitoria de la epidermis fetal; las células de Langerhans pertenecen al sistema inmunitario cutáneo y derivan de precursores hematopoyéticos; y los hemidesmosomas permiten la adhesión de los queratinocitos basales a la membrana basal. La relación planteada con el lanugo y el límite de cinco meses es la que no corresponde en esta pregunta.",
        fija:
            "Hemidesmosomas → estrato basal. Langerhans → inmunidad cutánea. Lanugo → pelo fetal transitorio.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "004",
        enunciado: "El diagnóstico diferencial de urticaria se realiza con los siguientes, EXCEPTO:",
        opciones: [
            "Dermatitis herpetiforme",
            "Penfigoide ampollar",
            "Dermatitis atópica",
            "Eritema polimorfo",
            "Todos los anteriores"
        ],
        correcta: 4,
        desarrollo:
            "La urticaria se reconoce por habones o ronchas de aparición rápida, pruriginosos y habitualmente transitorios. Diversas dermatosis inflamatorias, pruriginosas o ampollares pueden plantear confusión clínica, especialmente cuando el aspecto inicial no es típico. La clave para separarlas está en la lesión elemental y en su evolución: el habón urticarial es edematoso y fugaz, mientras que las lesiones de otras dermatosis persisten, evolucionan a vesículas o ampollas, descaman o dejan cambios residuales.",
        fija:
            "La lesión elemental típica de la urticaria es la roncha o habón: elevada, edematosa, pruriginosa y fugaz.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "005",
        enunciado: "Diagnóstico diferencial de pénfigo vulgar:",
        opciones: [
            "Psoriasis vulgar",
            "Varicela",
            "Herpes zóster",
            "Todas son ciertas",
            "Ninguna es correcta"
        ],
        correcta: 3,
        desarrollo:
            "El pénfigo vulgar es una dermatosis ampollar caracterizada por ampollas flácidas que se rompen con facilidad y dejan erosiones; el compromiso de mucosas es frecuente y constituye una pista clínica importante. En una pregunta de diagnóstico diferencial, lo esencial es reconocer qué cuadros pueden confundirse por la presencia de vesículas, ampollas, erosiones o lesiones superficiales. La identificación de ampollas flácidas, erosiones extensas y afectación mucosa orienta con mayor fuerza hacia pénfigo vulgar.",
        fija:
            "Pénfigo vulgar → ampolla flácida + erosiones + frecuente compromiso mucoso.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "006",
        enunciado: "Son características de las pápulas:",
        opciones: [
            "Puede ser dermoepidérmico",
            "Son consistentes",
            "Se hallan en liquen amiloideo",
            "No dejan cicatriz",
            "Todas las anteriores"
        ],
        correcta: 4,
        desarrollo:
            "Las pápulas son lesiones elementales sólidas y sobreelevadas. Pueden localizarse en epidermis, dermis superficial o abarcar ambas, de acuerdo con el proceso patológico. Su consistencia se aprecia al tacto y, en ausencia de destrucción profunda, suelen resolverse sin cicatriz. El liquen amiloideo es un ejemplo clínico en el que aparecen múltiples pápulas, por lo que las características propuestas son compatibles con este tipo de lesión.",
        fija:
            "Pápula = sólida + elevada + pequeña + generalmente resolutiva. No la confundas con vesícula, que contiene líquido.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "007",
        enunciado: "Diagnósticos diferenciales del lentigo, EXCEPTO:",
        opciones: [
            "Queratosis seborreicas",
            "Efélides",
            "Lentigo maligno",
            "a + c",
            "Ninguno"
        ],
        correcta: 2,
        desarrollo:
            "La pregunta busca distinguir el lentigo simple de lesiones pigmentadas que pueden parecerse clínicamente. En este banco, las efélides y algunas queratosis seborreicas forman parte del razonamiento diferencial, mientras que el lentigo maligno se señala como la alternativa que no corresponde dentro del planteamiento. Para resolverla conviene fijarse en que el examen está preguntando por la excepción, no por una característica positiva del lentigo.",
        fija:
            "En preguntas con EXCEPTO, primero identifica qué entidades sí pertenecen al grupo y luego elimina la que rompe la relación.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "008",
        enunciado: "Se usa en el tratamiento del melasma, EXCEPTO:",
        opciones: [
            "Ácido kójico",
            "Ácido azelaico",
            "Arbutina",
            "Peeling químico",
            "Calcipotriol"
        ],
        correcta: 4,
        desarrollo:
            "El ítem agrupa medidas despigmentantes y procedimientos empleados para reducir la hiperpigmentación del melasma. Ácido kójico, ácido azelaico, arbutina y peelings químicos aparecen dentro de las opciones terapéuticas del planteamiento. El calcipotriol es la alternativa que queda fuera de ese grupo, por lo que corresponde marcarlo como excepción.",
        fija:
            "Melasma: piensa en despigmentantes y procedimientos para hiperpigmentación. Calcipotriol no pertenece a este grupo terapéutico.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "009",
        enunciado: "NO es factor de riesgo para melanoma maligno:",
        opciones: [
            "Lesiones precursoras",
            "Fototipo I y II",
            "Antecedente familiar",
            "Excesiva exposición solar",
            "VPH"
        ],
        correcta: 4,
        desarrollo:
            "La pregunta reúne factores asociados al riesgo de melanoma y pide reconocer el elemento que no pertenece al conjunto. El banco considera como factores relevantes las lesiones precursoras, los fototipos claros, el antecedente familiar y la exposición solar excesiva. El VPH es la alternativa que no se incluye como factor de riesgo en este planteamiento.",
        fija:
            "Melanoma: recuerda fototipo claro + exposición solar + antecedentes familiares + lesiones melanocíticas de riesgo. VPH no forma parte de este grupo.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "010",
        enunciado: "Las variantes del carcinoma espinocelular son:",
        opciones: [
            "Superficial y ulceroso",
            "Nodular y pigmentado",
            "Nodular y vegetante",
            "a + b son correctas",
            "a + c son correctas"
        ],
        correcta: 4,
        desarrollo:
            "El objetivo es reconocer las formas clínicas incluidas en el carcinoma espinocelular dentro del banco. Se consideran las variantes superficial, ulcerosa, nodular y vegetante. Por eso la combinación que reúne las alternativas a y c es la respuesta marcada como correcta.",
        fija:
            "Carcinoma espinocelular: en este banco debes reconocer formas superficial, ulcerosa, nodular y vegetante.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "011",
        enunciado: "En dermatitis atópica del lactante o infante, señale lo correcto:",
        opciones: [
            "Desde los 2–3 meses hasta los 2 años",
            "Placas eritematoescamosas pruriginosas en mejillas",
            "En zonas flexoras en lactantes",
            "Solo a y b son correctas",
            "Todas son correctas"
        ],
        correcta: 3,
        desarrollo:
            "En la forma infantil se consideran correctos el inicio aproximado desde los primeros meses de vida y la presencia de placas eritematoescamosas pruriginosas en las mejillas. El patrón flexural no es el dato que el banco asigna como predominante en el lactante. Por ello, la combinación correcta es la que reúne únicamente las dos primeras afirmaciones.",
        fija:
            "Dermatitis atópica del lactante: inicio precoz + prurito + compromiso facial, especialmente mejillas.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "012",
        enunciado: "La escama es lesión elemental de las siguientes entidades, EXCEPTO:",
        opciones: [
            "Psoriasis",
            "Dermatitis seborreica",
            "Liquen",
            "a + c",
            "Ninguna de ellas"
        ],
        correcta: 4,
        desarrollo:
            "La escama corresponde al desprendimiento visible de material córneo en la superficie cutánea. En el planteamiento, psoriasis, dermatitis seborreica y liquen pueden presentar componente descamativo. Como ninguna de esas entidades queda excluida, la alternativa marcada es «Ninguna de ellas».",
        fija:
            "Escama = desprendimiento visible de la capa córnea. Psoriasis y dermatitis seborreica son ejemplos clásicos de dermatosis descamativas.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "013",
        enunciado: "La tiña microspórica de la cabeza se caracteriza por:",
        opciones: [
            "Parasitación endotrix",
            "Afectación ectothrix",
            "Placas del mismo tamaño",
            "Placa alopécica",
            "Todas son falsas"
        ],
        correcta: 1,
        desarrollo:
            "La característica que el banco utiliza para identificar la tiña microspórica del cuero cabelludo es el patrón ectothrix. En este tipo de parasitación, la relación del hongo con el tallo piloso permite diferenciarla de patrones endotrix. Esa asociación es la que debe reconocerse rápidamente en el examen.",
        fija:
            "Tiña microspórica del cuero cabelludo → patrón ectothrix.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "014",
        enunciado: "Producen con más frecuencia tiña ungueal, EXCEPTO:",
        opciones: [
            "E. floccosum",
            "T. mentagrophytes",
            "M. canis",
            "T. rubrum",
            "Todas"
        ],
        correcta: 2,
        desarrollo:
            "El ítem diferencia dermatofitos vinculados con compromiso ungueal de uno que se relaciona preferentemente con otras localizaciones. Dentro del banco, Microsporum canis es la excepción y no se considera un agente frecuente de tiña ungueal, a diferencia de los otros dermatofitos listados.",
        fija:
            "Onicomicosis dermatofítica: T. rubrum y T. mentagrophytes son nombres que debes reconocer; M. canis es la excepción de esta pregunta.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "015",
        enunciado: "Término que NO se relaciona con rosácea:",
        opciones: [
            "Stress",
            "Demodex folliculorum",
            "Alimentos calientes",
            "Helicobacter pylori",
            "Ingesta de comida grasa"
        ],
        correcta: 4,
        desarrollo:
            "La pregunta reúne factores y asociaciones que el banco vincula con rosácea. Estrés, Demodex folliculorum, alimentos calientes y Helicobacter pylori aparecen dentro de ese grupo. La ingesta de comida grasa es la alternativa señalada como la que no guarda relación en el planteamiento.",
        fija:
            "Rosácea: recuerda desencadenantes vasomotores y algunas asociaciones microbiológicas; la comida grasa es la excepción de este ítem.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "016",
        enunciado: "En infecciones por VPH señale lo correcto:",
        opciones: [
            "Causan dolor y son estéticas",
            "Siempre hay que tratarlas",
            "Tratamiento de elección: electrocauterio",
            "Condiloma acuminado asociado a VPH de bajo riesgo",
            "Verrugas planas más frecuentes en manos"
        ],
        correcta: 2,
        desarrollo:
            "La clave consignada para esta pregunta es el electrocauterio. Sin embargo, el propio formato del ítem contiene afirmaciones que pueden depender del tipo de lesión, localización y contexto clínico, por lo que no conviene convertir esta clave de examen en una regla terapéutica universal. Para estudio de banco, conserva la respuesta marcada y revisa cada modalidad de VPH por separado cuando estudies tratamiento.",
        fija:
            "Pregunta de banco: clave c). No conviertas «electrocauterio» en una regla universal para todas las lesiones por VPH.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "017",
        enunciado: "Se usan en el tratamiento de psoriasis, EXCEPTO:",
        opciones: [
            "Acitretina",
            "Emolientes",
            "Corticoides sistémicos",
            "Calcipotriol",
            "Metotrexato"
        ],
        correcta: 2,
        desarrollo:
            "La pregunta obliga a separar tratamientos utilizados habitualmente en psoriasis de una opción que no se considera de elección dentro del banco. Acitretina, emolientes, calcipotriol y metotrexato forman parte del manejo en distintos escenarios. Los corticoides sistémicos son la excepción señalada, especialmente por el riesgo de exacerbación o rebote al suspenderlos.",
        fija:
            "Psoriasis: evita fijar corticoides sistémicos como tratamiento habitual; el banco los marca como la excepción.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "018",
        enunciado: "Enfermedad de Nicolás Fabre, señale lo correcto:",
        opciones: [
            "Agente H. Ducreyi",
            "Los ganglios no se abscedan",
            "Se trata con doxiciclina",
            "Agente etiológico corynebacterium → granulomatosis",
            "Es poco contagioso"
        ],
        correcta: 3,
        desarrollo:
            "Esta pregunta presenta una inconsistencia interna en el propio banco: la alternativa marcada como correcta menciona un agente y la explicación asociada al ítem menciona otro. Por seguridad académica, se conserva la clave original para reconocer el examen, pero no debe utilizarse este ítem para memorizar etiología hasta que sea revisado con la teoría del curso.",
        fija:
            "ALERTA DE BANCO: esta pregunta tiene una inconsistencia interna. Memoriza que la clave del examen es d), pero revisa la etiología antes de fijarla como concepto.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "019",
        enunciado: "Sífilis secundaria:",
        opciones: [
            "Lesión fundamental: condiloma acuminado",
            "Se localiza en palmas",
            "Se trata con penicilina sódica",
            "Localización en piel: condiloma plano",
            "Es poco contagioso"
        ],
        correcta: 3,
        desarrollo:
            "La alternativa que el banco identifica como correcta es la presencia de condiloma plano dentro de las manifestaciones cutáneas de la sífilis secundaria. El objetivo de la pregunta es diferenciarlo del condiloma acuminado y reconocer que la fase secundaria posee manifestaciones dermatológicas características.",
        fija:
            "Sífilis secundaria → recuerda el condiloma plano como manifestación cutánea clásica del banco.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
        id: "020",
        enunciado: "El carcinoma basocelular se caracteriza por:",
        opciones: [
            "Segundo lugar de cáncer no melanoma",
            "Más frecuente variantes planas",
            "Variante esclerotrófica es más infiltrante",
            "Histología similar a psoriasis"
        ],
        correcta: 2,
        desarrollo:
            "La característica que el banco exige reconocer es el comportamiento infiltrativo de la variante esclerotrófica. Las otras opciones no corresponden al dato distintivo señalado en esta pregunta. En el examen, cuando aparezca la variante esclerotrófica o morfeiforme, debes asociarla con un patrón de crecimiento más infiltrante.",
        fija:
            "Carcinoma basocelular esclerotrófico/morfeiforme → patrón más infiltrante.",
        imagen: null,
        imagenAlt: "",
        imagenPie: ""
    },
    {
    "id": "021",
    "enunciado": "El diagnóstico diferencial de la tiña cruris se realiza mayormente con:",
    "opciones": [
        "Ictiosis",
        "Pitiriasis rosada",
        "Psoriasis inversa",
        "Granuloma inguinal",
        "Eczema numular"
    ],
    "correcta": 2,
    "desarrollo": "La psoriasis inversa puede parecerse a una tiña cruris porque ambas afectan pliegues. Para fijar la diferencia, la tiña suele mostrar un borde periférico más activo y descamativo, mientras la psoriasis inversa suele ser más lisa y bien delimitada.",
    "fija": "Tiña cruris en pliegues: uno de los diferenciales clásicos es psoriasis inversa.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "022",
    "enunciado": "La tiña fávica es producida mayormente por:",
    "opciones": [
        "Trichophyton rubrum",
        "Trichophyton mentagrophytes",
        "Epidermophyton floccosum",
        "Microsporum canis",
        "Microsporum gypseum"
    ],
    "correcta": 4,
    "desarrollo": "La clave marcada en este examen es Microsporum gypseum. Esta pregunta debe conservarse como clave real del banco; no conviene extrapolarla como una regla etiológica general sin contrastarla con la teoría del curso.",
    "fija": "Clave de este examen: Microsporum gypseum. Ítem para revisar junto con la teoría de tiña fávica.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "023",
    "enunciado": "La exulceración se caracteriza por:",
    "opciones": [
        "Deja cicatriz",
        "Pérdida de epidermis",
        "Indolora",
        "Pérdida hasta dermis",
        "Se extiende un borde y se va cicatrizando el otro borde"
    ],
    "correcta": 1,
    "desarrollo": "La exulceración corresponde a una pérdida superficial de sustancia limitada principalmente a la epidermis. Al no alcanzar planos profundos, se diferencia de la ulceración verdadera, que compromete dermis y puede dejar cicatriz.",
    "fija": "Exulceración = pérdida superficial de epidermis; úlcera = pérdida más profunda.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "024",
    "enunciado": "Sobre el carcinoma basocelular:",
    "opciones": [
        "Mayor responsable la UVA",
        "Cámaras bronceadoras: factor predisponente",
        "Incidencia menor al carcinoma espinocelular",
        "Llega hasta dermis papilar",
        "Se usan queratolíticos en el tratamiento"
    ],
    "correcta": 1,
    "desarrollo": "El examen identifica a las cámaras bronceadoras como factor predisponente porque incrementan la exposición a radiación ultravioleta. Es una asociación útil para reconocer factores de riesgo vinculados con daño actínico acumulado.",
    "fija": "Exposición UV artificial también cuenta como factor de riesgo cutáneo.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "025",
    "enunciado": "El vitíligo se caracteriza por:",
    "opciones": [
        "Mayor presentación dentro de los primeros 10 años de vida",
        "No presenta poliosis",
        "Presentación acrofacial es muy rara",
        "La pitiriasis versicolor es un diagnóstico diferencial",
        "Todos los anteriores son correctos"
    ],
    "correcta": 3,
    "desarrollo": "La pitiriasis versicolor puede confundirse con vitíligo por producir alteraciones del color cutáneo. La diferencia visual clave es que el vitíligo genera áreas acrómicas bien delimitadas, mientras la pitiriasis versicolor suele mostrar cambio de pigmentación con descamación fina.",
    "fija": "Vitíligo: máculas acrómicas; pitiriasis versicolor: alteración pigmentaria con fina descamación.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "026",
    "enunciado": "En niños es más frecuente la psoriasis:",
    "opciones": [
        "Invertida",
        "Vulgar",
        "En gota",
        "Pustulosa",
        "En placas"
    ],
    "correcta": 2,
    "desarrollo": "La psoriasis en gotas es una forma clásica en niños y adolescentes. Se presenta con numerosas lesiones pequeñas eritematoescamosas, habitualmente distribuidas en tronco y extremidades.",
    "fija": "Psoriasis en gotas = forma muy preguntada en población pediátrica.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "027",
    "enunciado": "Los gomas sifilíticos se presentan en:",
    "opciones": [
        "Sífilis latente",
        "Sífilis primaria",
        "Sífilis terciaria",
        "Sífilis congénita",
        "Sífilis secundaria"
    ],
    "correcta": 2,
    "desarrollo": "Los gomas pertenecen a las manifestaciones tardías de la sífilis y se asocian a la fase terciaria. Son lesiones granulomatosas destructivas que pueden afectar piel y otros tejidos.",
    "fija": "Goma sifilítico → sífilis terciaria.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "028",
    "enunciado": "El diagnóstico diferencial más próximo de la verruga vulgar se hace con:",
    "opciones": [
        "Carcinoma escamoso",
        "Queratosis seborreica",
        "Papilomatosis fibroepitelial",
        "Liquen plano",
        "Ninguno de los anteriores"
    ],
    "correcta": 1,
    "desarrollo": "La queratosis seborreica puede compartir con la verruga vulgar una superficie queratósica y sobreelevada. El contexto clínico, la distribución y el aspecto de la superficie ayudan a separarlas.",
    "fija": "Verruga vulgar vs queratosis seborreica: compara superficie, edad y distribución.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "029",
    "enunciado": "La dermatitis alérgica de contacto se caracteriza por:",
    "opciones": [
        "Mayor ardor",
        "Ocurre en la segunda exposición",
        "Es localizada",
        "Mayor dolor",
        "Muy inflamatoria"
    ],
    "correcta": 1,
    "desarrollo": "La dermatitis alérgica de contacto requiere sensibilización previa. Por eso una reexposición al alérgeno puede desencadenar la respuesta eccematosa característica.",
    "fija": "Dermatitis alérgica de contacto = sensibilización previa y reacción tras nueva exposición.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "030",
    "enunciado": "El diagnóstico diferencial de la queratosis seborreica se realiza con:",
    "opciones": [
        "Queratosis actínica",
        "Verruga vulgar",
        "Nevo",
        "Acrocordón",
        "Todas las anteriores"
    ],
    "correcta": 4,
    "desarrollo": "La queratosis seborreica tiene una morfología muy variable y puede simular varias lesiones benignas o premalignas. En el examen se consideran todos los diagnósticos propuestos dentro del diferencial.",
    "fija": "Queratosis seborreica: su variabilidad clínica explica un diferencial amplio.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "031",
    "enunciado": "Característica del molusco contagioso:",
    "opciones": [
        "Produce bastante prurito",
        "Se disemina por fómites",
        "Más común en mujeres",
        "Se puede usar calcipotriol",
        "Virosis de la dermis"
    ],
    "correcta": 1,
    "desarrollo": "La transmisión indirecta mediante objetos contaminados puede ocurrir en molusco contagioso. También existe transmisión por contacto directo piel con piel.",
    "fija": "Molusco contagioso: contagio directo y también mediante fómites.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "032",
    "enunciado": "Es representativo en la dermatitis atópica:",
    "opciones": [
        "Aumento de IgA",
        "Aumento de IgM",
        "Disminución de IgE",
        "Aumento de IgE",
        "Disminución de IgM"
    ],
    "correcta": 3,
    "desarrollo": "El examen vincula dermatitis atópica con aumento de IgE, hallazgo frecuente dentro del contexto atópico. No sustituye al diagnóstico clínico, pero es una asociación clásica de estudio.",
    "fija": "Dermatitis atópica ↔ IgE elevada es una asociación clásica.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "033",
    "enunciado": "Manifestación cutánea de diabetes mellitus:",
    "opciones": [
        "Macroangiopatía",
        "Necrobiosis lipoídica",
        "Xantomas",
        "Acantosis nigricans",
        "Todas las anteriores"
    ],
    "correcta": 4,
    "desarrollo": "La diabetes y la insulinorresistencia pueden acompañarse de múltiples alteraciones cutáneas y vasculares. El examen agrupa estas manifestaciones y marca que todas pueden relacionarse con el contexto metabólico.",
    "fija": "Diabetes: piensa en necrobiosis lipoídica y acantosis nigricans como asociaciones de alto rendimiento.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "034",
    "enunciado": "El signo del hoyuelo es característico de:",
    "opciones": [
        "Queratosis actínica",
        "Psoriasis",
        "Pénfigo",
        "Dermatofibroma",
        "Carcinoma basocelular ulcerado"
    ],
    "correcta": 3,
    "desarrollo": "El signo del hoyuelo aparece al comprimir lateralmente un dermatofibroma, produciendo una depresión central. Es una maniobra semiológica clásica.",
    "fija": "Signo del hoyuelo o dimple sign → dermatofibroma.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "035",
    "enunciado": "Factor en la causa del acné:",
    "opciones": [
        "Estrés",
        "Andrógenos",
        "Propionibacterium acnes",
        "Aumento de secreción de sebo",
        "Todas las anteriores"
    ],
    "correcta": 4,
    "desarrollo": "El acné es multifactorial. Intervienen producción sebácea, influencia androgénica, alteraciones foliculares, proliferación bacteriana e inflamación; además, el estrés puede agravar el cuadro.",
    "fija": "Acné = sebo + hiperqueratinización folicular + C. acnes + inflamación.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "036",
    "enunciado": "NO es característica en el herpes simple tipo 1:",
    "opciones": [
        "Dolor urente",
        "Adenopatía cervical",
        "Recurrencia",
        "Incubación de 6 días a 6 semanas",
        "Transmisión por secreciones"
    ],
    "correcta": 3,
    "desarrollo": "La alternativa señalada como incorrecta es el intervalo de incubación propuesto. Para resolverla, separa características clínicas del HSV-1 de cifras temporales excesivamente amplias.",
    "fija": "En HSV-1, cuidado con cifras de incubación exageradamente largas.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "037",
    "enunciado": "El fenómeno dermatofítide en manos por tiña pedis se manifiesta con:",
    "opciones": [
        "Ampollas",
        "Vesículas",
        "Pústulas",
        "Pápulas",
        "Fisuras"
    ],
    "correcta": 1,
    "desarrollo": "La dermatofítide es una reacción a distancia asociada a una dermatofitosis activa. En manos puede aparecer como una erupción vesicular sin que el hongo necesariamente esté presente en esas lesiones secundarias.",
    "fija": "Tiña pedis + vesículas en manos puede sugerir dermatofítide.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "038",
    "enunciado": "Marque la secuencia clínica del impétigo contagioso:",
    "opciones": [
        "Pápulas–vesículas–pústulas",
        "Vesículas–pústulas–costras",
        "Mácula–vesícula–pústula",
        "Pápulo-pústula–costra",
        "Pústula–vesícula–costra"
    ],
    "correcta": 1,
    "desarrollo": "La evolución descrita en el examen progresa de vesícula a pústula y finalmente a costra. La costra melicérica es uno de los signos clínicos que más orientan a impétigo contagioso.",
    "fija": "Impétigo contagioso: vesícula → pústula → costra melicérica.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "039",
    "enunciado": "En el nevo melanocítico congénito se puede apreciar:",
    "opciones": [
        "Nevos satélites",
        "Cambian con la edad",
        "Superficie lisa siempre",
        "Bordes no definidos",
        "Bordes irregulares"
    ],
    "correcta": 0,
    "desarrollo": "Los nevos melanocíticos congénitos pueden acompañarse de lesiones satélites. Este hallazgo resulta especialmente relevante en lesiones congénitas extensas.",
    "fija": "Nevo melanocítico congénito: recuerda la posibilidad de lesiones satélites.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "040",
    "enunciado": "El ensanchamiento del estrato espinoso se llama:",
    "opciones": [
        "Papilomatosis",
        "Acantosis",
        "Paraqueratosis",
        "Hiperqueratosis",
        "Esclerosis"
    ],
    "correcta": 1,
    "desarrollo": "La acantosis es el aumento del grosor de la epidermis por ensanchamiento del estrato espinoso. No debe confundirse con hiperqueratosis, que afecta principalmente la capa córnea.",
    "fija": "Acantosis = engrosamiento del estrato espinoso.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "041",
    "enunciado": "Es característica de la dermatitis atópica en un lactante:",
    "opciones": [
        "Compromete toda la cara y cuero cabelludo",
        "Compromete áreas extensoras",
        "No es pruriginosa",
        "Mínima resequedad",
        "Todas las anteriores"
    ],
    "correcta": 1,
    "desarrollo": "En el lactante, el patrón puede comprometer superficies extensoras. El prurito y la xerosis siguen siendo elementos fundamentales, por lo que las alternativas que los niegan no encajan.",
    "fija": "Dermatitis atópica del lactante: prurito + xerosis + predominio facial/extensor.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "042",
    "enunciado": "El vitíligo se caracteriza por:",
    "opciones": [
        "Mayor presentación dentro los primeros 10 años de vida",
        "No presenta poliosis",
        "Presentación acrofacial muy rara",
        "Diagnóstico diferencial con pitiriasis versicolor",
        "Diagnóstico diferencial con pitiriasis rosada"
    ],
    "correcta": 3,
    "desarrollo": "La clave marcada vuelve a señalar a la pitiriasis versicolor como diagnóstico diferencial. La presencia de descamación fina favorece pitiriasis versicolor; la despigmentación franca orienta a vitíligo.",
    "fija": "Vitíligo vs pitiriasis versicolor: busca descamación y grado de pérdida pigmentaria.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "043",
    "enunciado": "Medicamento oral que se usa en el tratamiento de psoriasis:",
    "opciones": [
        "Corticoides",
        "Adapaleno",
        "Calcipotriol",
        "Metotrexato",
        "Tacrolimus"
    ],
    "correcta": 3,
    "desarrollo": "Metotrexato es la alternativa oral seleccionada en este examen. Las demás opciones corresponden a otros contextos terapéuticos o a vías de administración diferentes.",
    "fija": "Psoriasis sistémica: metotrexato es una respuesta clásica de examen.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "044",
    "enunciado": "En el tratamiento del acné, actúa suprimiendo la actividad de la glándula sebácea:",
    "opciones": [
        "Azitromicina",
        "Minociclina",
        "Ciproterona",
        "Isotretinoína",
        "Tetraciclina"
    ],
    "correcta": 3,
    "desarrollo": "La isotretinoína disminuye de forma marcada la producción de sebo y la actividad de la glándula sebácea. Esa acción explica buena parte de su eficacia en acné severo.",
    "fija": "Isotretinoína → potente reducción de secreción sebácea.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "045",
    "enunciado": "Es una lesión elemental primaria:",
    "opciones": [
        "Escamas",
        "Liquenificación",
        "Placa",
        "Excoriación",
        "Ninguna de las anteriores"
    ],
    "correcta": 2,
    "desarrollo": "La clave marcada en este examen es placa. Las otras alternativas corresponden a cambios secundarios de la piel producidos por descamación, rascado o evolución de una lesión.",
    "fija": "Placa = lesión primaria; escama, liquenificación y excoriación = secundarias.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "046",
    "enunciado": "En un niño de 6 años con diagnóstico de onicomicosis, ¿cuál sería el fármaco más indicado?",
    "opciones": [
        "Fluconazol",
        "Tiabendazol",
        "Ketoconazol",
        "Itraconazol",
        "Griseofulvina"
    ],
    "correcta": 4,
    "desarrollo": "La clave marcada en este examen es griseofulvina. Conservar esta respuesta sirve para reconocer el banco; la selección antifúngica real depende del agente, localización, edad y protocolos terapéuticos.",
    "fija": "Clave de este examen: griseofulvina. Diferencia siempre clave histórica de conducta clínica actual.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "047",
    "enunciado": "Es diagnóstico diferencial de la queratosis actínica:",
    "opciones": [
        "Lupus eritematoso discoide",
        "Dermatitis seborreica extensas y múltiples",
        "Carcinoma basocelular nodular",
        "Liquen simple plano",
        "Psoriasis invertida"
    ],
    "correcta": 0,
    "desarrollo": "El lupus eritematoso discoide puede presentar placas eritematoescamosas en áreas fotoexpuestas y entrar en el diagnóstico diferencial de una queratosis actínica.",
    "fija": "Queratosis actínica en área fotoexpuesta: recuerda lupus discoide entre los diferenciales.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "048",
    "enunciado": "Es característica de la verruga filiforme:",
    "opciones": [
        "Difícil tratamiento",
        "Frecuente en niños",
        "Pruriginosas",
        "Aparecen en cara",
        "Dolor a la palpación"
    ],
    "correcta": 3,
    "desarrollo": "Las verrugas filiformes son proyecciones estrechas y alargadas que aparecen con frecuencia en la cara, especialmente alrededor de párpados, labios y nariz.",
    "fija": "Verruga filiforme → lesión alargada, típicamente facial.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "049",
    "enunciado": "Son células presentadoras de antígenos:",
    "opciones": [
        "Meissner",
        "Hapteno",
        "Langerhans",
        "Merkel"
    ],
    "correcta": 2,
    "desarrollo": "Las células de Langerhans participan en la inmunovigilancia epidérmica y presentación antigénica. Meissner y Merkel están relacionadas principalmente con función sensorial.",
    "fija": "Langerhans = presentación de antígeno en epidermis.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "050",
    "enunciado": "El pénfigo vulgar se caracteriza por:",
    "opciones": [
        "Afectar solo piel",
        "Ampolla suprabasal",
        "Ampolla subcorneal",
        "Afecta solo mucosas",
        "Cubrirse por escamas finas"
    ],
    "correcta": 1,
    "desarrollo": "La ampolla del pénfigo vulgar es intraepidérmica y suprabasal. Esta localización explica su fragilidad y la tendencia a formar erosiones.",
    "fija": "Pénfigo vulgar → ampolla suprabasal y flácida.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "051",
    "enunciado": "El nevo compuesto tiene:",
    "opciones": [
        "Relación con características fenotípicas",
        "Células névicas en epidermis",
        "Células névicas en dermis",
        "Patrón en media luna",
        "Ninguna relación con la geografía"
    ],
    "correcta": 2,
    "desarrollo": "La clave marcada resalta la presencia de células névicas en dermis. Para estudiar el concepto completo, el término compuesto implica participación de más de un compartimento cutáneo, no únicamente una localización aislada.",
    "fija": "Nevo compuesto: recuerda que combina componentes de distintos niveles cutáneos.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "052",
    "enunciado": "NO se usa en el tratamiento de verrugas:",
    "opciones": [
        "Crioterapia",
        "Ácido salicílico",
        "Bleomicina",
        "Arbutina",
        "Imiquimod"
    ],
    "correcta": 3,
    "desarrollo": "La arbutina es un despigmentante y no forma parte de las opciones terapéuticas habituales para verrugas. Las demás alternativas sí aparecen en distintos escenarios de manejo.",
    "fija": "Arbutina = despigmentante, no tratamiento de verrugas.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "053",
    "enunciado": "El panadizo herpético se ve en:",
    "opciones": [
        "Herpes 2",
        "Herpes 1",
        "Herpes 3",
        "Dermatitis herpetiforme",
        "Todas las anteriores"
    ],
    "correcta": 1,
    "desarrollo": "La clave de este examen es herpes simple tipo 1. El panadizo herpético se manifiesta con vesículas dolorosas en dedos y debe diferenciarse de infecciones bacterianas.",
    "fija": "Panadizo herpético = vesículas dolorosas en dedo por herpes simple.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "054",
    "enunciado": "Las queratosis seborreicas NO se localizan en:",
    "opciones": [
        "Genitales",
        "Tórax anterior",
        "Palmas",
        "Tórax posterior",
        "Cara"
    ],
    "correcta": 2,
    "desarrollo": "Las queratosis seborreicas suelen respetar palmas y plantas. Se observan con frecuencia en tronco, cara y otras superficies cutáneas.",
    "fija": "Queratosis seborreica: típicamente respeta palmas y plantas.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "055",
    "enunciado": "Sobre el nevo melanocítico congénito:",
    "opciones": [
        "Algunos son ulcerados oscuros",
        "Es debido a un error en la embriogénesis del mesodermo",
        "No hay hipertricosis",
        "Hay lesiones satélites",
        "Tratamiento de elección es dermoabrasión"
    ],
    "correcta": 3,
    "desarrollo": "El examen vuelve a destacar la presencia de lesiones satélites como característica posible de los nevos melanocíticos congénitos.",
    "fija": "Nevo melanocítico congénito → pueden existir lesiones satélites.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "056",
    "enunciado": "Es una característica de la tiña seca:",
    "opciones": [
        "Placa alopécica única",
        "Placas alopécicas variadas",
        "Costras",
        "Pelos con cambios de coloración",
        "Todas son correctas"
    ],
    "correcta": 3,
    "desarrollo": "La clave marcada es la alteración visible de los pelos. En tiñas del cuero cabelludo el tallo piloso puede volverse frágil y mostrar cambios clínicos que ayudan al reconocimiento.",
    "fija": "Tiña del cuero cabelludo: examina siempre el pelo, no solo la piel.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "057",
    "enunciado": "Es característica del impétigo contagioso:",
    "opciones": [
        "Presencia de vesículo-ampollas",
        "Ubicación periorificial",
        "Presencia de pápulo-ampollas",
        "Compromete la dermis en estadio avanzado",
        "Pueden ulcerarse"
    ],
    "correcta": 0,
    "desarrollo": "El examen señala la presencia de lesiones vesículo-ampollares. En el impétigo superficial, estas lesiones evolucionan y terminan formando las costras características.",
    "fija": "Impétigo: lesión superficial que puede iniciar con vesículas/ampollas y formar costras.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "058",
    "enunciado": "Es característica de la escabiosis:",
    "opciones": [
        "Transmisión principal por fómites",
        "Mayor incidencia en verano",
        "Respeta en lactantes las palmas",
        "Lesiones corporales bilaterales",
        "Aplicación de benzoato de bencilo al 30%"
    ],
    "correcta": 3,
    "desarrollo": "La distribución bilateral de las lesiones es la opción seleccionada en este examen. En escabiosis importa además reconocer prurito intenso, distribución típica y surcos.",
    "fija": "Escabiosis: prurito + distribución característica + surco son claves de reconocimiento.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "059",
    "enunciado": "¿Cuál de los siguientes medicamentos es el tratamiento para el acné durante el embarazo?",
    "opciones": [
        "Eritromicina vía oral",
        "Isotretinoína",
        "Clindamicina 1%",
        "Cotrimoxazol",
        "Tetraciclinas"
    ],
    "correcta": 2,
    "desarrollo": "La clave marcada es clindamicina tópica al 1%. En embarazo deben evitarse fármacos teratógenos como isotretinoína y se seleccionan opciones con mejor perfil de seguridad.",
    "fija": "Embarazo + acné: isotretinoína está contraindicada; en este examen la clave es clindamicina 1%.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "060",
    "enunciado": "Es diagnóstico diferencial del pénfigo vulgar:",
    "opciones": [
        "Varicela",
        "Psoriasis vulgar",
        "Herpes zóster",
        "Pitiriasis liquenoide",
        "Ninguna"
    ],
    "correcta": 4,
    "desarrollo": "Este examen marca «Ninguna». Es importante conservarla como clave real porque en otro examen del mismo conjunto aparece una formulación diferente con otra respuesta; no deben fusionarse ambas preguntas.",
    "fija": "Pregunta real con clave propia: no mezclarla con la otra versión de diagnóstico diferencial de pénfigo vulgar.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "061",
    "enunciado": "Es característica de la urticaria traumática:",
    "opciones": [
        "Sinónimo de dermografismo",
        "Es provocado por ejercicios físicos",
        "El calor como causante",
        "Es provocado por alimentos",
        "Ninguna es correcta"
    ],
    "correcta": 0,
    "desarrollo": "La urticaria traumática se relaciona con dermografismo: el roce o presión sobre la piel desencadena una roncha lineal.",
    "fija": "Dermografismo = urticaria física inducida por fricción.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "062",
    "enunciado": "En relación al melanoma maligno marque lo incorrecto:",
    "opciones": [
        "Afecta meninges",
        "Existe melanoma amelanótico",
        "Índice de Breslow mide extensión lesional",
        "Más frecuente en personas con múltiples nevos",
        "Existe localización acral"
    ],
    "correcta": 2,
    "desarrollo": "La alternativa marcada como incorrecta es la formulación sobre Breslow. Breslow se utiliza específicamente para cuantificar el grosor tumoral, por lo que no debe memorizarse como una expresión inespecífica de «extensión lesional».",
    "fija": "Breslow = grosor tumoral del melanoma.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "063",
    "enunciado": "El pénfigo foliáceo se caracteriza por:",
    "opciones": [
        "Afecta mucosas",
        "Ampolla subcorneal",
        "Ampolla suprabasal",
        "Se cubre por escamas finas",
        "Afecta piel y mucosas"
    ],
    "correcta": 1,
    "desarrollo": "El pénfigo foliáceo produce una separación muy superficial, de localización subcorneal. Por ello sus ampollas son frágiles y el compromiso mucoso es mucho menos característico que en pénfigo vulgar.",
    "fija": "Pénfigo foliáceo = subcorneal; pénfigo vulgar = suprabasal.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "064",
    "enunciado": "En relación con la forunculosis estafilocócica recurrente es probable:",
    "opciones": [
        "Existe el estado de portador nasal o perineal",
        "No se presenta en inmunosuprimidos",
        "Es una entidad infrecuente",
        "Aparece en zonas de presión",
        "La lesión inicial es un quiste"
    ],
    "correcta": 0,
    "desarrollo": "La recurrencia puede estar favorecida por colonización persistente por Staphylococcus aureus, especialmente en nariz o región perineal.",
    "fija": "Forunculosis recurrente → busca estado de portador nasal/perineal.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "065",
    "enunciado": "Producen acné iatrogénico, a excepción de:",
    "opciones": [
        "Isoniacida",
        "Corticoides",
        "Carbonato de calcio",
        "Penicilina",
        "Difenilhidantoína"
    ],
    "correcta": 2,
    "desarrollo": "El carbonato de calcio es la excepción marcada en este examen. El objetivo es reconocer que diversos fármacos pueden producir erupciones acneiformes, pero no todos los medicamentos listados tienen esa asociación.",
    "fija": "Ante acné de inicio brusco, revisa medicamentos; aquí la excepción es carbonato de calcio.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "066",
    "enunciado": "La escabiosis se caracteriza por:",
    "opciones": [
        "Mayor frecuencia en verano",
        "En lactantes respeta las plantas",
        "Lesiones corporales bilaterales",
        "Transmisión principal por fómites",
        "Tratamiento con benzoato de bencilo al 30%"
    ],
    "correcta": 2,
    "desarrollo": "La clave vuelve a ser la distribución bilateral. La opción sobre respeto de plantas en lactantes no encaja con el patrón pediátrico clásico, donde manos y pies pueden comprometerse.",
    "fija": "Escabiosis pediátrica puede afectar palmas y plantas.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "067",
    "enunciado": "La queratosis seborreica NO se caracteriza por:",
    "opciones": [
        "Aparición insidiosa",
        "Curso progresivo",
        "Transformación maligna",
        "Patrón paraneoplásico de Leser-Trélat",
        "Envejecimiento cutáneo"
    ],
    "correcta": 2,
    "desarrollo": "La queratosis seborreica es una proliferación benigna y no se define por transformación maligna. El signo de Leser-Trélat se refiere a la aparición súbita de múltiples lesiones en un contexto paraneoplásico.",
    "fija": "Queratosis seborreica = benigna; Leser-Trélat = aparición eruptiva asociada a neoplasia interna.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "068",
    "enunciado": "Está relacionado con la dermatitis seborreica:",
    "opciones": [
        "Sedentarismo y obesidad",
        "Enfermedades neurológicas",
        "Marcador de infección por VIH",
        "Marcador de infección por liquen plano",
        "Todas son correctas"
    ],
    "correcta": 2,
    "desarrollo": "La dermatitis seborreica intensa o de aparición llamativa puede observarse en personas con infección por VIH. El examen la utiliza como asociación clínica relevante.",
    "fija": "Dermatitis seborreica severa o inusual: recuerda su asociación con VIH.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "069",
    "enunciado": "En el carcinoma de células escamosas NO corresponde:",
    "opciones": [
        "Eritroplasia de Queyrat",
        "Úlcera de roedor",
        "Enfermedad de Bowen",
        "Ulcerosos mayor frecuencia",
        "Siempre metástasis"
    ],
    "correcta": 1,
    "desarrollo": "La úlcera de roedor es una denominación clásica asociada al carcinoma basocelular, no al carcinoma espinocelular. Esa es la asociación que rompe el grupo.",
    "fija": "Úlcera de roedor → carcinoma basocelular.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "070",
    "enunciado": "Son formas de presentación del vitíligo, EXCEPTO:",
    "opciones": [
        "Segmentario",
        "Generalizado",
        "En gota",
        "Acral",
        "Todas ellas"
    ],
    "correcta": 2,
    "desarrollo": "El examen marca «en gota» como la opción que no pertenece a las formas clínicas propuestas de vitíligo.",
    "fija": "Vitíligo: reconoce formas segmentaria, generalizada y acral; «en gota» es la excepción del examen.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "071",
    "enunciado": "La pitiriasis alba se caracteriza por:",
    "opciones": [
        "Son muy descamativas",
        "No se relaciona con atopia",
        "Se usa clobetasol 5% en el tratamiento",
        "Importante el factor ambiental",
        "Todas son correctas"
    ],
    "correcta": 3,
    "desarrollo": "La clave marcada destaca la influencia ambiental. La pitiriasis alba suele manifestarse como áreas hipopigmentadas con descamación fina, y se relaciona con piel seca y contexto atópico.",
    "fija": "Pitiriasis alba: hipopigmentación + fina descamación, frecuente en contexto de xerosis/atopia.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "072",
    "enunciado": "Uno de ellos NO es componente del sistema inmunitario cutáneo:",
    "opciones": [
        "Eosinófilos",
        "Monocitos",
        "Células de Merkel",
        "Células de Langerhans",
        "Macrófagos tisulares"
    ],
    "correcta": 2,
    "desarrollo": "Las células de Merkel cumplen principalmente una función mecanorreceptora. Las células de Langerhans, en cambio, sí tienen función inmunológica y presentación antigénica.",
    "fija": "Merkel = sensorial; Langerhans = inmunitaria.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "073",
    "enunciado": "NO es característica de la epidermis:",
    "opciones": [
        "Capa basal es zona de proliferación",
        "Capa granulosa es zona funcional",
        "La capa córnea es acelular",
        "La capa espinosa tiene varias hileras de células",
        "Estrato lúcido en palmoplantar"
    ],
    "correcta": 1,
    "desarrollo": "La alternativa marcada como incorrecta es «capa granulosa es zona funcional». El resto describe relaciones estructurales clásicas de las capas epidérmicas.",
    "fija": "Basal = proliferación; espinosa = varias hileras; córnea = células queratinizadas sin núcleo.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "074",
    "enunciado": "Es característica de la escabiosis, a excepción de:",
    "opciones": [
        "Nódulos en genitales",
        "Pápulas acrales en lactantes",
        "Surco",
        "Lesión en palmas de adultos",
        "Todas las anteriores"
    ],
    "correcta": 3,
    "desarrollo": "La afectación de palmas en adultos no es la localización típica que el examen espera. En lactantes, en cambio, el compromiso acral de palmas y plantas es mucho más característico.",
    "fija": "Escabiosis: palmas/plantas son especialmente importantes en lactantes.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "075",
    "enunciado": "¿Cuál de las siguientes alternativas en relación a la pitiriasis versicolor es probable?",
    "opciones": [
        "El signo de Besnier es positivo",
        "La dermatitis seborreica es la causa",
        "No hay prurito",
        "El cultivo se realiza en el medio de Sabouraud",
        "Se da predominantemente en prepúberes"
    ],
    "correcta": 0,
    "desarrollo": "El signo de Besnier corresponde a la descamación fina que se hace evidente al raspar la lesión. Es una pista semiológica útil para pitiriasis versicolor.",
    "fija": "Pitiriasis versicolor → signo de Besnier positivo.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "076",
    "enunciado": "Es diagnóstico diferencial de la queratosis actínica:",
    "opciones": [
        "Lupus eritematoso discoide",
        "Carcinoma basocelular nodular",
        "Liquen plano",
        "Psoriasis guttata",
        "Ninguna de las anteriores"
    ],
    "correcta": 0,
    "desarrollo": "Esta segunda versión del examen mantiene como clave lupus eritematoso discoide, aunque modifica las otras alternativas. Por eso se conserva como pregunta distinta.",
    "fija": "Queratosis actínica: lupus discoide vuelve a aparecer como diferencial de examen.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "077",
    "enunciado": "¿Cuál de las siguientes alternativas en relación al acné es probable?",
    "opciones": [
        "El acetato de ciproterona es un antiandrógeno hormonal",
        "El comedón es de color negruzco por la suciedad",
        "El sebo no es comedogénico",
        "Los receptores para la testosterona se localizan en los queratinocitos",
        "Su patogénesis no es compleja"
    ],
    "correcta": 0,
    "desarrollo": "La ciproterona posee acción antiandrogénica y puede reducir el estímulo hormonal sobre la unidad pilosebácea. Las demás afirmaciones simplifican o describen de forma incorrecta mecanismos del acné.",
    "fija": "Acetato de ciproterona = antiandrógeno.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "078",
    "enunciado": "El diagnóstico diferencial más próximo de la verruga vulgar se hace con:",
    "opciones": [
        "Carcinoma escamoso",
        "Liquen simple",
        "Queratosis seborreica",
        "Papilomatosis fibroepitelial",
        "Ninguna de las anteriores"
    ],
    "correcta": 2,
    "desarrollo": "Esta versión modifica las alternativas, pero mantiene queratosis seborreica como respuesta. La similitud puede deberse al aspecto hiperqueratósico y sobreelevado.",
    "fija": "Verruga vulgar vs queratosis seborreica es una pareja repetida en estos exámenes.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "079",
    "enunciado": "Índice de Breslow y niveles de Clark se utilizan en:",
    "opciones": [
        "Psoriasis",
        "Carcinoma basocelular",
        "Pénfigo",
        "Melanoma maligno",
        "Carcinoma espinocelular"
    ],
    "correcta": 3,
    "desarrollo": "Breslow y Clark forman parte de la evaluación anatomopatológica del melanoma. Breslow mide el grosor vertical y es un dato pronóstico fundamental.",
    "fija": "Breslow y Clark → melanoma maligno.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "080",
    "enunciado": "NO es característico del nevo melanocítico adquirido:",
    "opciones": [
        "Ubicación en tronco",
        "Contorno regular",
        "Mayor de 10 mm",
        "Forma redonda",
        "Todas las anteriores"
    ],
    "correcta": 2,
    "desarrollo": "Un nevo melanocítico adquirido común suele ser pequeño, simétrico y de contorno regular. Un tamaño mayor de 10 mm obliga a analizarlo con mayor atención y no corresponde al patrón típico que pregunta el examen.",
    "fija": "Nevo adquirido típico: pequeño, simétrico y regular.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "081",
    "enunciado": "En un niño de 6 años con diagnóstico de onicomicosis, ¿cuál de los siguientes fármacos sería el más indicado?",
    "opciones": [
        "Fluconazol",
        "Ivermectina",
        "Itraconazol",
        "Terbinafina",
        "Ketoconazol"
    ],
    "correcta": 3,
    "desarrollo": "En esta segunda versión la clave marcada es terbinafina y las alternativas difieren del otro examen pediátrico. Por eso se mantiene como pregunta distinta dentro de Reales Fijas.",
    "fija": "Esta versión del examen marca terbinafina; no mezclarla con la versión que ofrece griseofulvina.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "082",
    "enunciado": "Es característica del herpes zóster oftálmico:",
    "opciones": [
        "Compromiso de nervio IX y X",
        "Complicación severa de 20 a 30%",
        "Activación del ganglio trigémino",
        "Parálisis facial",
        "Todas son correctas"
    ],
    "correcta": 2,
    "desarrollo": "El herpes zóster oftálmico se relaciona con reactivación del virus en la división oftálmica del trigémino. El compromiso ocular hace que requiera especial atención clínica.",
    "fija": "Zóster oftálmico → territorio del trigémino, especialmente V1.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "083",
    "enunciado": "El penfigoide se presenta con más frecuencia:",
    "opciones": [
        "Niños menores de 10 años",
        "Mujeres mayores de 70 años",
        "Mujeres de 20 a 40 años",
        "Varones de 20 a 40 años",
        "Cualquier edad tanto varones como mujeres"
    ],
    "correcta": 1,
    "desarrollo": "El examen sitúa el penfigoide principalmente en adultos mayores, aquí representado por mujeres mayores de 70 años.",
    "fija": "Penfigoide ampollar → enfermedad típica del adulto mayor.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "084",
    "enunciado": "NO se usa en tratamiento de escabiosis:",
    "opciones": [
        "Lindano",
        "Permetrina",
        "Azufre",
        "Crotamitón",
        "Bisabolol"
    ],
    "correcta": 4,
    "desarrollo": "Bisabolol no forma parte de los escabicidas propuestos en este examen. Las otras alternativas corresponden a fármacos o sustancias utilizadas históricamente o actualmente contra escabiosis.",
    "fija": "Escabiosis: permetrina es una opción clave; bisabolol es la excepción de este banco.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "085",
    "enunciado": "Es característica del melasma:",
    "opciones": [
        "Presenta asimetría",
        "Afecta a varones en más de 30%",
        "No hay afectación hormonal",
        "Presentación malar es la más frecuente",
        "La diascopia ayuda en el diagnóstico"
    ],
    "correcta": 3,
    "desarrollo": "La distribución malar es uno de los patrones faciales clásicos de melasma. Se caracteriza por hiperpigmentación adquirida, habitualmente simétrica, en áreas fotoexpuestas.",
    "fija": "Melasma → hiperpigmentación facial simétrica; patrón malar es clásico.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "086",
    "enunciado": "¿Cuál de las siguientes opciones en relación a la eritroplasia de Queyrat es probable?",
    "opciones": [
        "Es un estado precanceroso",
        "Solo afecta genitales masculinos",
        "En dermis papilar existe un infiltrado en banda plasmocitario",
        "Solo afecta genitales femeninos",
        "Se confunde con el granuloma piógeno"
    ],
    "correcta": 0,
    "desarrollo": "La eritroplasia de Queyrat representa una lesión intraepitelial con potencial de progresión y por eso el examen la reconoce como estado precanceroso.",
    "fija": "Eritroplasia de Queyrat → lesión precancerosa/in situ de mucosa genital.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "087",
    "enunciado": "¿Cuál de las siguientes opciones en relación al herpes zóster es probable?",
    "opciones": [
        "El dolor es un síntoma significativo",
        "El dolor es frecuente en niños",
        "Es causado por un paramixovirus",
        "La neuralgia postherpética es común en jóvenes",
        "Se encuentra incluida en infecciones de transmisión sexual"
    ],
    "correcta": 0,
    "desarrollo": "El dolor neurítico es una manifestación importante del herpes zóster y puede preceder a la erupción. La neuralgia postherpética aumenta con la edad, no en pacientes jóvenes.",
    "fija": "Herpes zóster → dolor neurítico es una pista clínica fuerte.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "088",
    "enunciado": "La pitiriasis alba se caracteriza por:",
    "opciones": [
        "Localización mayormente en tórax",
        "Más frecuente en piel clara",
        "Etiología genética",
        "Fina escama blanquecina",
        "Todas son correctas"
    ],
    "correcta": 3,
    "desarrollo": "La pitiriasis alba suele mostrar máculas o parches hipopigmentados con descamación fina blanquecina. Esta versión del examen utiliza esa característica morfológica como clave.",
    "fija": "Pitiriasis alba → lesión hipopigmentada con fina escama blanquecina.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "089",
    "enunciado": "El molusco contagioso se caracteriza por:",
    "opciones": [
        "Virosis de la dermis",
        "Tratamiento con calcipotriol",
        "Más frecuente en mujeres",
        "Contagio por fómites",
        "Produce mucho prurito"
    ],
    "correcta": 3,
    "desarrollo": "Esta versión del examen vuelve a destacar la transmisión indirecta mediante fómites. Se mantiene separada porque cambia el orden y la formulación de las alternativas.",
    "fija": "Molusco contagioso: transmisión por contacto directo y posibilidad de fómites.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
},
    {
    "id": "090",
    "enunciado": "¿Cuál de las siguientes posibilidades en relación con la urticaria es la probable?",
    "opciones": [
        "La hidroxicina es eficaz para la urticaria mecánica",
        "La adrenalina no eleva los niveles de AMP intracelular",
        "La urticaria papulosa aparece al poco tiempo de exponerse al sol",
        "La urticaria crónica aparece en un plazo mayor de 6 meses",
        "Se presenta con angioedema"
    ],
    "correcta": 0,
    "desarrollo": "La clave marcada en este examen es hidroxicina para urticaria mecánica. Además, recuerda que la urticaria crónica se define por una duración superior a seis semanas, por lo que «más de seis meses» no es el criterio diagnóstico estándar.",
    "fija": "Urticaria mecánica/dermografismo: antihistamínicos son la base del control sintomático.",
    "imagen": null,
    "imagenAlt": "",
    "imagenPie": ""
}
];

let indiceActual = 0;
let seleccionActual = null;
let respondida = false;
let aciertos = 0;
let errores = 0;

const progreso = document.getElementById("real-progreso");
const aciertosEl = document.getElementById("real-aciertos");
const erroresEl = document.getElementById("real-errores");
const idEl = document.getElementById("real-id");
const enunciadoEl = document.getElementById("real-enunciado");
const opcionesEl = document.getElementById("real-opciones");
const confirmarBtn = document.getElementById("real-confirmar");
const siguienteBtn = document.getElementById("real-siguiente");
const alertaEl = document.getElementById("real-alerta");
const resultadoEl = document.getElementById("real-resultado");
const estadoEl = document.getElementById("real-estado");
const desarrolloEl = document.getElementById("real-desarrollo");
const fijaEl = document.getElementById("real-fija");
const imagenWrap = document.getElementById("real-imagen-wrap");
const imagenEl = document.getElementById("real-imagen");
const imagenPieEl = document.getElementById("real-imagen-pie");

function letra(indice) {
    return String.fromCharCode(97 + indice);
}

function renderPregunta() {
    const pregunta = preguntasReales[indiceActual];

    seleccionActual = null;
    respondida = false;

    progreso.textContent = `${indiceActual + 1} / ${preguntasReales.length}`;
    aciertosEl.textContent = aciertos;
    erroresEl.textContent = errores;

    idEl.textContent = `REAL FIJA #${pregunta.id}`;
    enunciadoEl.textContent = pregunta.enunciado;

    opcionesEl.innerHTML = "";
    pregunta.opciones.forEach((texto, i) => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "real-opcion";
        boton.innerHTML = `<span class="real-letra">${letra(i)})</span><span>${texto}</span>`;

        boton.addEventListener("click", () => {
            if (respondida) return;

            opcionesEl.querySelectorAll(".real-opcion").forEach(b => {
                b.classList.remove("seleccionada");
            });

            boton.classList.add("seleccionada");
            seleccionActual = i;
            alertaEl.hidden = true;
        });

        opcionesEl.appendChild(boton);
    });

    confirmarBtn.hidden = false;
    siguienteBtn.hidden = true;
    resultadoEl.hidden = true;
    alertaEl.hidden = true;

    imagenWrap.hidden = true;
    imagenEl.removeAttribute("src");
    imagenEl.alt = "";
    imagenPieEl.textContent = "";
}

function confirmarRespuesta() {
    if (respondida) return;

    if (seleccionActual === null) {
        alertaEl.hidden = false;
        return;
    }

    respondida = true;
    const pregunta = preguntasReales[indiceActual];
    const esCorrecta = seleccionActual === pregunta.correcta;

    if (esCorrecta) {
        aciertos += 1;
    } else {
        errores += 1;
    }

    aciertosEl.textContent = aciertos;
    erroresEl.textContent = errores;

    opcionesEl.querySelectorAll(".real-opcion").forEach((boton, i) => {
        boton.disabled = true;
        boton.classList.remove("seleccionada");

        if (i === pregunta.correcta) {
            boton.classList.add("correcta");
        } else if (i === seleccionActual) {
            boton.classList.add("incorrecta");
        }
    });

    estadoEl.className = `real-estado ${esCorrecta ? "estado-ok" : "estado-error"}`;
    estadoEl.innerHTML = esCorrecta
        ? `<strong>Correcto.</strong> Clave: ${letra(pregunta.correcta)}) ${pregunta.opciones[pregunta.correcta]}`
        : `<strong>Incorrecto.</strong> Clave: ${letra(pregunta.correcta)}) ${pregunta.opciones[pregunta.correcta]}`;

    desarrolloEl.textContent = pregunta.desarrollo;
    fijaEl.textContent = pregunta.fija;

    if (pregunta.imagen) {
        imagenEl.src = pregunta.imagen;
        imagenEl.alt = pregunta.imagenAlt || "Imagen de apoyo dermatológico";
        imagenPieEl.textContent = pregunta.imagenPie || "";
        imagenWrap.hidden = false;
    } else {
        imagenWrap.hidden = true;
    }

    resultadoEl.hidden = false;
    confirmarBtn.hidden = true;
    siguienteBtn.hidden = false;

    resultadoEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function siguientePregunta() {
    indiceActual += 1;

    if (indiceActual >= preguntasReales.length) {
        indiceActual = 0;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    renderPregunta();
}

confirmarBtn.addEventListener("click", confirmarRespuesta);
siguienteBtn.addEventListener("click", siguientePregunta);

renderPregunta();