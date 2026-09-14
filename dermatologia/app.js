// =========================================================
// BADBEAR.MED · CONTROL BÁSICO DE ACCESO (GitHub Pages)
// =========================================================
(() => {
    const hasta = Number(localStorage.getItem("badbear_med_access_until") || 0);
    if (!(hasta > Date.now())) {
        const destino = encodeURIComponent("banco.html" + location.search + location.hash);
        location.replace(`index.html?bbnext=${destino}`);
        throw new Error("BADBEAR.MED: acceso no autorizado");
    }
})();

// =========================================================
// QUIZ CLÍNICO DE DERMATOLOGÍA
// 66 enfermedades · 133 viñetas clínicas razonadas (sin respuestas morfológicas explícitas)
// =========================================================



// =========================================================
// BANCOS MORFOLÓGICOS
// =========================================================

const bancoLesiones = [
    "Mácula",
    "Pápula",
    "Placa",
    "Vesícula",
    "Ampolla",
    "Pústula",
    "Nódulo",
    "Habón",
    "Erosión",
    "Úlcera"
];


const bancoColores = [
    "Eritematosa",
    "Violácea",
    "Hiperpigmentada",
    "Hipopigmentada",
    "Acrómica",
    "Parduzca",
    "Negra",
    "Amarillenta",
    "Color piel"
];


const bancoBordes = [
    "Bien delimitado",
    "Mal delimitado",
    "Irregular",
    "Regular",
    "Difuso",
    "Elevado"
];


const bancoDistribuciones = [
    "Extensora",
    "Flexural",
    "Dermatomal",
    "Periorificial",
    "Simétrica",
    "Asimétrica",
    "Generalizada",
    "Localizada",
    "Interdigital",
    "Fotoexpuesta",
    "Seborreica"
];

// =========================================================
// SINÓNIMOS PARA BÚSQUEDA DE IMÁGENES
// =========================================================

const sinonimosImagen = {

    "Psoriasis en placas": [
        "plaque psoriasis",
        "psoriasis vulgaris",
        "psoriasis elbow",
        "psoriasis knee"
    ],

    "Dermatitis atópica": [
        "atopic dermatitis",
        "atopic eczema"
    ],

    "Dermatitis seborreica": [
        "seborrheic dermatitis"
    ],

    "Dermatitis de contacto alérgica": [
        "allergic contact dermatitis"
    ],

    "Liquen plano": [
        "lichen planus"
    ],

    "Pitiriasis rosada": [
        "pityriasis rosea"
    ],

    "Urticaria": [
        "urticaria",
        "hives"
    ],

    "Impétigo": [
    "impetigo honey crust",
    "impetigo face child",
    "impetigo perioral",
    "impetigo skin lesions"
    ],

    "Erisipela": [
        "erysipelas"
    ],

    "Celulitis": [
        "cellulitis skin"
    ],

    "Foliculitis bacteriana": [
        "bacterial folliculitis",
        "folliculitis"
    ],

    "Herpes simple": [
        "herpes simplex",
        "herpes labialis"
    ],

    "Herpes zóster": [
        "herpes zoster",
        "shingles"
    ],

    "Molusco contagioso": [
    "molluscum contagiosum umbilicated papules",
    "molluscum contagiosum face",
    "molluscum contagiosum child",
    "molluscum contagiosum skin lesions"
    ],

    "Verruga vulgar": [
        "verruca vulgaris",
        "common wart"
    ],

    "Tiña corporis": [
        "tinea corporis",
        "ringworm skin"
    ],

    "Tiña cruris": [
        "tinea cruris"
    ],

    "Tiña pedis": [
        "tinea pedis",
        "athletes foot"
    ],

    "Tiña capitis": [
        "tinea capitis"
    ],

    "Pitiriasis versicolor": [
        "pityriasis versicolor",
        "tinea versicolor"
    ],

    "Candidiasis cutánea": [
        "cutaneous candidiasis",
        "candidal intertrigo"
    ],

    "Escabiosis": [
        "scabies",
        "sarcoptes scabiei skin"
    ],

    "Larva migrans cutánea": [
        "cutaneous larva migrans",
        "creeping eruption"
    ],

    "Pénfigo vulgar": [
        "pemphigus vulgaris"
    ],

    "Pénfigo foliáceo": [
        "pemphigus foliaceus"
    ],

    "Penfigoide ampolloso": [
        "bullous pemphigoid"
    ],

    "Dermatitis herpetiforme": [
        "dermatitis herpetiformis"
    ],

    "Vitíligo": [
    "vitiligo acral depigmentation",
    "vitiligo hands",
    "vitiligo face",
    "vitiligo skin patches"
    ],

    "Melasma": [
        "melasma"
    ],

    "Acné vulgar": [
        "acne vulgaris"
    ],

"Rosácea": [
    "rosacea face",
    "facial rosacea",
    "rosacea facial erythema",
    "papulopustular rosacea",
    "rosacea skin lesions",
    "rosacea patient face"
],

    "Hidradenitis supurativa": [
        "hidradenitis suppurativa"
    ],

    "Alopecia areata": [
        "alopecia areata"
    ],

    "Eritema multiforme": [
        "erythema multiforme"
    ],

    "Eritema nodoso": [
        "erythema nodosum"
    ],

    "Lupus cutáneo discoide": [
        "discoid lupus erythematosus",
        "discoid lupus"
    ],

    "Dermatomiositis": [
        "dermatomyositis",
        "gottron papules",
        "heliotrope rash"
    ],

    "Esclerodermia localizada": [
        "morphea",
        "localized scleroderma"
    ],

    "Queratosis seborreica": [
        "seborrheic keratosis"
    ],

    "Queratosis actínica": [
        "actinic keratosis"
    ],

    "Carcinoma basocelular": [
        "basal cell carcinoma"
    ],

    "Carcinoma epidermoide cutáneo": [
        "cutaneous squamous cell carcinoma",
        "squamous cell carcinoma skin"
    ],

    "Melanoma": [
        "cutaneous melanoma",
        "malignant melanoma skin"
    ],

    "Nevo melanocítico": [
        "melanocytic nevus",
        "benign melanocytic nevus"
    ],

    "Dermatofibroma": [
        "dermatofibroma"
    ],

    "Acrocordón": [
        "acrochordon",
        "skin tag"
    ],

    "Hemangioma infantil": [
        "infantile hemangioma",
        "strawberry hemangioma"
    ],

    "Nevus simplex": [
        "nevus simplex",
        "salmon patch"
    ],

    "Malformación capilar tipo vino de Oporto": [
        "port wine stain",
        "capillary malformation"
    ],

    "Púrpura": [
        "purpura skin"
    ],

    "Petequias": [
        "petechiae skin"
    ],

    "Granuloma anular": [
        "granuloma annulare"
    ],

    "Eczema numular": [
        "nummular dermatitis",
        "discoid eczema"
    ],

    "Liquen simple crónico": [
        "lichen simplex chronicus"
    ],

    "Prúrigo nodular": [
        "prurigo nodularis"
    ],

    "Psoriasis en placas": [
    "plaque psoriasis extensor surface",
    "plaque psoriasis elbow",
    "plaque psoriasis knee",
    "psoriasis vulgaris plaques"
    ],

    "Psoriasis inversa": [
        "inverse psoriasis",
        "flexural psoriasis"
    ],

    "Sífilis secundaria": [
        "secondary syphilis rash",
        "secondary syphilis palms soles"
    ],

    "Herpes zóster": [
    "herpes zoster dermatomal vesicles",
    "shingles thorax",
    "herpes zoster rash",
    "herpes zoster clinical skin"
    ],

    "Ectima": [
        "ecthyma"
    ],

    "Onicomicosis": [
        "onychomycosis",
        "fungal nail infection"
    ],

    "Psoriasis ungueal": [
        "nail psoriasis"
    ],

    "Intertrigo": [
        "intertrigo",
        "intertriginous dermatitis"
    ],

    "Eritrasma": [
        "erythrasma"
    ],

    "Pitiriasis alba": [
        "pityriasis alba"
    ],

    "Hiperpigmentación postinflamatoria": [
        "post inflammatory hyperpigmentation"
    ]
};

// =========================================================
// BANCO DE ENFERMEDADES
// Casos clínicos simulados con fines educativos.
// Los hospitales reales mencionados se usan únicamente como contexto académico.
// No corresponden a historias clínicas ni a pacientes reales identificables.
// =========================================================
// =========================================================
// SINÓNIMOS PARA BÚSQUEDA DE IMÁGENES
// =========================================================

const enfermedades = [

{
    nombre: "Psoriasis en placas",

    busquedas: [
        "plaque psoriasis clinical photograph",
        "psoriasis elbow skin",
        "psoriasis knee clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Extensora"
    },

    casos: [
        "Paciente varón de 23 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por ocho meses de evolución con exacerbaciones periódicas. Presenta lesiones crónicas recurrentes sobre codos y rodillas. Al examen se observan áreas cutáneas sobreelevadas de superficie amplia rojizas de contorno nítido cubiertas por escamas blanquecinas. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; predominan en superficies externas de las extremidades.",
        "Paciente mujer de 51 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por seis meses de evolución progresiva. Presenta lesiones descamativas simétricas en superficies extensoras y cuero cabelludo. Refiere exacerbaciones periódicas. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; predominan en superficies externas de las extremidades."
    ],

    definicion:
        "Dermatosis inflamatoria crónica inmunomediada caracterizada por hiperproliferación epidérmica.",

    lesion:
        "Placas eritematosas bien delimitadas con escamas blanquecinas o plateadas.",

    clinica:
        "Predomina en superficies extensoras, cuero cabelludo y región lumbosacra. Puede asociarse con afectación ungueal y artritis psoriásica.",

    diagnostico:
        "Generalmente clínico. La biopsia puede utilizarse cuando la presentación es atípica.",

    tratamiento:
        "Emolientes, corticoides tópicos y análogos de vitamina D en enfermedad localizada; fototerapia o tratamiento sistémico/biológico según gravedad.",

    diferencial:
        "Tiña corporis, dermatitis seborreica, eczema numular y liquen plano.",

    perla:
        "Placa eritematosa bien delimitada con escama plateada en superficies extensoras sugiere psoriasis."
},


{
    nombre: "Dermatitis atópica",

    busquedas: [
        "atopic dermatitis clinical photograph",
        "atopic eczema flexural skin"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Mal delimitado",
        distribucion: "Flexural"
    },

    casos: [
        "Paciente de 9 años, acompañada de su madre, acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por ocho meses de evolución con exacerbaciones periódicas. Tiene antecedente de asma y presenta prurito intenso y lesiones eccematosas crónicas en pliegues antecubitales y poplíteos. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de transición gradual hacia la piel vecina; predominan en pliegues de flexión.",
        "Paciente mujer de 32 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por seis meses de evolución progresiva. Con rinitis alérgica presenta brotes recurrentes de prurito, xerosis y áreas cutáneas sobreelevadas de superficie amplia eccematosas predominantes en superficies flexoras. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de transición gradual hacia la piel vecina; predominan en pliegues de flexión."
    ],

    definicion:
        "Dermatosis inflamatoria crónica y recurrente asociada con disfunción de la barrera cutánea y predisposición atópica.",

    lesion:
        "Eritema, pápulas, excoriaciones, descamación y liquenificación en fases crónicas.",

    clinica:
        "Prurito intenso, xerosis y distribución característica según la edad.",

    diagnostico:
        "Clínico, basado en morfología, distribución, prurito y antecedentes atópicos.",

    tratamiento:
        "Emolientes, corticoides tópicos, inhibidores de calcineurina y terapias sistémicas o biológicas en enfermedad moderada a grave.",

    diferencial:
        "Dermatitis de contacto, psoriasis, escabiosis y dermatitis seborreica.",

    perla:
        "Prurito crónico + superficies flexoras + antecedentes de atopia."
},


{
    nombre: "Dermatitis seborreica",

    busquedas: [
        "seborrheic dermatitis clinical photograph",
        "seborrheic dermatitis scalp face"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Mal delimitado",
        distribucion: "Seborreica"
    },

    casos: [
        "Paciente mujer de 40 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por ocho meses de evolución con exacerbaciones periódicas. Presenta enrojecimiento y descamación grasosa en cuero cabelludo, cejas y surcos nasolabiales. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de transición gradual hacia la piel vecina; predominan en cuero cabelludo, cejas, surcos nasolabiales u otras zonas ricas en sebo.",
        "Paciente mujer de 23 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por seis meses de evolución progresiva. Refiere caspa persistente con áreas cutáneas sobreelevadas de superficie amplia eritematodescamativas en regiones ricas en glándulas sebáceas. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de transición gradual hacia la piel vecina; predominan en cuero cabelludo, cejas, surcos nasolabiales u otras zonas ricas en sebo."
    ],

    definicion:
        "Dermatosis inflamatoria frecuente asociada con áreas sebáceas y proliferación de Malassezia.",

    lesion:
        "Placas eritematosas con escamas finas o grasosas amarillentas.",

    clinica:
        "Cuero cabelludo, cejas, glabela, surcos nasolabiales y región retroauricular.",

    diagnostico:
        "Principalmente clínico.",

    tratamiento:
        "Champús antifúngicos, ketoconazol tópico y corticoides tópicos de baja potencia durante periodos cortos.",

    diferencial:
        "Psoriasis, tiña y dermatitis atópica.",

    perla:
        "Escama grasosa en cuero cabelludo y surcos nasolabiales."
},


{
    nombre: "Dermatitis de contacto alérgica",

    busquedas: [
        "allergic contact dermatitis clinical photograph",
        "contact dermatitis skin rash"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente varón de 18 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por tres semanas de evolución. Desarrolla prurito y enrojecimiento vesicular en muñeca después de usar una pulsera metálica nueva. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica.",
        "Paciente mujer de 40 años acude al Servicio de Dermatología del Hospital María Auxiliadora por dos meses de evolución. Trabajadora presenta áreas cutáneas sobreelevadas de superficie amplia eccematosas pruriginosas en manos luego del contacto repetido con un producto químico. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Reacción de hipersensibilidad retardada tipo IV frente a un alérgeno cutáneo.",

    lesion:
        "Eritema, pápulas, vesículas y eccema en el área de contacto.",

    clinica:
        "Prurito y distribución relacionada directamente con el agente desencadenante.",

    diagnostico:
        "Clínico; pruebas epicutáneas ayudan a identificar el alérgeno.",

    tratamiento:
        "Evitar el agente causal, emolientes y corticoides tópicos.",

    diferencial:
        "Dermatitis irritativa, dermatitis atópica y tiña.",

    perla:
        "La geometría o localización suele delatar el contacto causal."
},


{
    nombre: "Liquen plano",

    busquedas: [
        "lichen planus clinical photograph",
        "lichen planus skin purple papules"
    ],

    morfologia: {
        lesion: "Pápula",
        color: "Violácea",
        borde: "Bien delimitado",
        distribucion: "Flexural"
    },

    casos: [
        "Paciente mujer de 39 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por ocho meses de evolución con exacerbaciones periódicas. Presenta múltiples pequeñas elevaciones sólidas rojizo-purpúreas intensamente pruriginosas en muñecas y tobillos. En la inspección se observan pequeñas elevaciones sólidas, de aspecto rojizo-purpúreas y de contorno nítido; predominan en pliegues de flexión.",
        "Paciente mujer de 65 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por seis meses de evolución progresiva. Presenta lesiones poligonales planas de color violáceo en superficies flexoras, algunas con finas líneas blanquecinas. En la inspección se observan pequeñas elevaciones sólidas, de aspecto rojizo-purpúreas y de contorno nítido; predominan en pliegues de flexión."
    ],

    definicion:
        "Dermatosis inflamatoria inmunomediada que afecta piel y mucosas.",

    lesion:
        "Pápulas planas, poligonales, violáceas y pruriginosas, a veces con estrías de Wickham.",

    clinica:
        "Muñecas, tobillos, región lumbar y mucosa oral.",

    diagnostico:
        "Clínico y, cuando es necesario, biopsia cutánea.",

    tratamiento:
        "Corticoides tópicos; casos extensos pueden requerir tratamiento sistémico.",

    diferencial:
        "Psoriasis, liquen simple crónico y erupciones liquenoides.",

    perla:
        "Las clásicas 5 P: pruritic, purple, polygonal, planar papules."
},


{
    nombre: "Pitiriasis rosada",

    busquedas: [
        "pityriasis rosea clinical photograph",
        "pityriasis rosea christmas tree rash"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Generalizada"
    },

    casos: [
        "Paciente varón de 63 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por tres semanas de evolución. Presenta inicialmente una área cutánea sobreelevada de superficie amplia ovalada en tronco y días después múltiples lesiones menores siguiendo líneas de tensión. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se observan en varias regiones corporales.",
        "Paciente mujer de 20 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por dos meses de evolución. Presenta erupción autolimitada en tronco con distribución en árbol de Navidad. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se observan en varias regiones corporales."
    ],

    definicion:
        "Erupción papuloescamosa aguda y habitualmente autolimitada.",

    lesion:
        "Placas ovaladas eritematosas con collarete descamativo.",

    clinica:
        "Suele iniciar con placa heraldo seguida de erupción secundaria en tronco.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Generalmente sintomático con antihistamínicos o corticoides tópicos si existe prurito.",

    diferencial:
        "Sífilis secundaria, tiña corporis, psoriasis guttata.",

    perla:
        "Placa heraldo seguida de patrón en árbol de Navidad."
},


{
    nombre: "Urticaria",

    busquedas: [
        "urticaria wheals clinical photograph",
        "hives skin clinical"
    ],

    morfologia: {
        lesion: "Habón",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Generalizada"
    },

    casos: [
        "Paciente varón de 65 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por cuatro días de evolución y progresión reciente. Desarrolla lesiones sobreelevadas muy pruriginosas que aparecen y desaparecen en diferentes áreas en menos de 24 horas. En la inspección se observan elevaciones edematosas transitorias, de aspecto rojizas y de contorno nítido; se observan en varias regiones corporales. Presión arterial 118/74 mmHg, frecuencia cardiaca 82 lpm y saturación de oxígeno 98%. No presenta disnea, estridor ni hipotensión; las lesiones individuales desaparecen en pocas horas.",
        "Paciente varón de 53 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por siete días de evolución. Tras ingerir un alimento, paciente presenta múltiples ronchas edematosas pruriginosas migratorias. En la inspección se observan elevaciones edematosas transitorias, de aspecto rojizas y de contorno nítido; se observan en varias regiones corporales. Los signos vitales son estables y no hay compromiso de la vía aérea. Los elevaciones edematosas transitorias son migratorios y cada uno dura menos de 24 horas."
    ],

    definicion:
        "Trastorno caracterizado por aparición transitoria de habones debido a edema dérmico superficial.",

    lesion:
        "Habones eritematosos o pálidos, edematosos y pruriginosos.",

    clinica:
        "Cada lesión individual suele desaparecer en menos de 24 horas.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Antihistamínicos H1 de segunda generación como tratamiento inicial.",

    diferencial:
        "Vasculitis urticarial, picaduras y dermatitis.",

    perla:
        "Si la lesión migra y desaparece en menos de 24 horas, piense en urticaria."
},


{
    nombre: "Impétigo",

    busquedas: [
        "impetigo clinical photograph",
        "impetigo honey crust skin"
    ],

    morfologia: {
        lesion: "Pústula",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Periorificial"
    },

    casos: [
        "Paciente mujer de 5 años acude al Servicio de Dermatología del Instituto Nacional de Salud del Niño - Breña por cuatro días de evolución y progresión reciente. Presenta pequeñas elevaciones con contenido líquido claro superficiales alrededor de nariz y boca que dejan costras amarillo-doradas color miel. En la inspección se observan pequeñas elevaciones con contenido purulento, de aspecto rojizas y de contorno nítido; se agrupan alrededor de orificios faciales. Se encuentra afebril, activo para la edad y hemodinámicamente estable, sin signos de compromiso sistémico.",
        "Paciente mujer de 10 años acude al Servicio de Dermatología del Instituto Nacional de Salud del Niño - Breña por siete días de evolución. Presenta lesiones contagiosas periorales con áreas superficiales de pérdida de epidermis y costras melicéricas. En la inspección se observan pequeñas elevaciones con contenido purulento, de aspecto rojizas y de contorno nítido; se agrupan alrededor de orificios faciales. Se encuentra afebril, activo para la edad y hemodinámicamente estable, sin signos de compromiso sistémico."
    ],

    definicion:
        "Infección bacteriana superficial de la epidermis, habitualmente por S. aureus o S. pyogenes.",

    lesion:
        "Vesículas o pústulas que evolucionan a erosiones con costras melicéricas.",

    clinica:
        "Frecuente en niños y altamente contagioso.",

    diagnostico:
        "Clínico; cultivo si enfermedad recurrente o resistente.",

    tratamiento:
        "Mupirocina tópica en enfermedad limitada; antibiótico sistémico cuando es extensa.",

    diferencial:
        "Herpes simple, eczema infectado y tiña facial.",

    perla:
        "Costra color miel = impétigo."
},


{
    nombre: "Erisipela",

    busquedas: [
        "erysipelas clinical photograph skin",
        "erysipelas leg clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 41 años acude al Servicio de Dermatología del Hospital María Auxiliadora por cuatro días de evolución y progresión reciente. Con fiebre presenta área cutánea sobreelevada de superficie amplia roja, caliente, dolorosa y claramente delimitada en pierna. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica. Al ingreso presenta temperatura de 38,4 °C, frecuencia cardiaca de 102 lpm y presión arterial de 118/72 mmHg. El hemograma muestra 14 800 leucocitos/µL con neutrofilia y proteína C reactiva elevada.",
        "Paciente mujer de 45 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por siete días de evolución. Presenta inicio súbito de fiebre y lesión rojiza brillante, elevada y con límites netos en miembro inferior. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica. Llega con fiebre de 38,1 °C y escalofríos, con presión arterial de 122/76 mmHg. Se documenta leucocitosis neutrofílica moderada y elevación de reactantes de fase aguda."
    ],

    definicion:
        "Infección bacteriana superficial de dermis superior y vasos linfáticos.",

    lesion:
        "Placa eritematosa, caliente, dolorosa y bien delimitada.",

    clinica:
        "Inicio agudo con síntomas sistémicos frecuentes.",

    diagnostico:
        "Principalmente clínico.",

    tratamiento:
        "Antibióticos con actividad frente a estreptococos según gravedad.",

    diferencial:
        "Celulitis, dermatitis de contacto y trombosis venosa.",

    perla:
        "Erisipela tiene límites más nítidos y aspecto más superficial que la celulitis."
},


{
    nombre: "Celulitis",

    busquedas: [
        "cellulitis skin clinical photograph",
        "leg cellulitis clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Mal delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 42 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por cuatro días de evolución y progresión reciente. Presenta aumento de volumen, calor, dolor y enrojecimiento difuso en pierna sin límites claramente definidos. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de transición gradual hacia la piel vecina; se limitan a una región anatómica. Signos vitales: temperatura 38,0 °C, frecuencia cardiaca 98 lpm y presión arterial 116/70 mmHg. Hemograma con 13 200 leucocitos/µL y neutrofilia; no se palpa fluctuación ni se aprecia crepitación.",
        "Paciente varón de 27 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por siete días de evolución. Presenta infección de tejidos blandos con área rojiza caliente y dolorosa de bordes imprecisos. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de transición gradual hacia la piel vecina; se limitan a una región anatómica. Presenta febrícula y dolor progresivo. Leucocitos 12 600/µL con neutrofilia y proteína C reactiva elevada; pulsos distales conservados y sin signos clínicos de absceso."
    ],

    definicion:
        "Infección bacteriana de dermis profunda y tejido celular subcutáneo.",

    lesion:
        "Área eritematosa, caliente, dolorosa y mal delimitada.",

    clinica:
        "Puede acompañarse de fiebre, edema y síntomas sistémicos.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Antibioterapia dirigida a estreptococos y estafilococos según contexto clínico.",

    diferencial:
        "Erisipela, dermatitis por estasis y trombosis venosa profunda.",

    perla:
        "Celulitis = bordes difusos; erisipela = borde más nítido."
},


{
    nombre: "Foliculitis bacteriana",

    busquedas: [
        "bacterial folliculitis clinical photograph",
        "folliculitis skin pustules"
    ],

    morfologia: {
        lesion: "Pústula",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 38 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por tres semanas de evolución. Presenta pequeñas pequeñas elevaciones con contenido purulento centradas en folículos pilosos después de depilación. En la inspección se observan pequeñas elevaciones con contenido purulento, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica.",
        "Paciente mujer de 55 años acude al Servicio de Dermatología del Hospital María Auxiliadora por dos meses de evolución. Desarrolla múltiples pequeñas elevaciones con contenido purulento superficiales perifoliculares en tronco después de sudoración intensa. En la inspección se observan pequeñas elevaciones con contenido purulento, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Inflamación infecciosa superficial del folículo piloso.",

    lesion:
        "Pústulas pequeñas centradas en folículos.",

    clinica:
        "Puede producir prurito o dolor leve.",

    diagnostico:
        "Clínico; cultivo en recurrencias.",

    tratamiento:
        "Medidas locales, antisépticos o antibióticos tópicos según extensión.",

    diferencial:
        "Acné, foliculitis por Malassezia y pseudofoliculitis.",

    perla:
        "La pústula está centrada exactamente sobre un folículo."
},


{
    nombre: "Herpes simple",

    busquedas: [
        "herpes simplex skin clinical photograph",
        "herpes labialis clinical photograph"
    ],

    morfologia: {
        lesion: "Vesícula",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 47 años acude al Servicio de Dermatología del Hospital María Auxiliadora por cuatro días de evolución y progresión reciente. Presenta ardor seguido de pequeñas pequeñas elevaciones con contenido líquido claro agrupadas dolorosas en borde del labio. En la inspección se observan pequeñas elevaciones con contenido líquido claro, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica.",
        "Paciente mujer de 19 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por siete días de evolución. Refiere episodios recurrentes de pequeñas elevaciones con contenido líquido claro agrupadas sobre base rojiza en la misma región. En la inspección se observan pequeñas elevaciones con contenido líquido claro, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Infección recurrente por virus herpes simple.",

    lesion:
        "Vesículas agrupadas sobre base eritematosa que pueden evolucionar a erosiones.",

    clinica:
        "Pródromo de ardor, dolor o parestesias.",

    diagnostico:
        "Generalmente clínico; PCR en situaciones seleccionadas.",

    tratamiento:
        "Aciclovir, valaciclovir o famciclovir.",

    diferencial:
        "Herpes zóster, impétigo y aftas.",

    perla:
        "Vesículas agrupadas recurrentes en el mismo sitio."
},


{
    nombre: "Herpes zóster",

    busquedas: [
        "herpes zoster clinical photograph",
        "shingles dermatome clinical",
        "herpes zoster vesicles skin"
    ],

    morfologia: {
        lesion: "Vesícula",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Dermatomal"
    },

    casos: [
        "Paciente varón de 77 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por cuatro días de evolución y progresión reciente. Presenta dolor intenso en hemitórax seguido de pequeñas elevaciones con contenido líquido claro agrupadas en una banda unilateral. En la inspección se observan pequeñas elevaciones con contenido líquido claro, de aspecto rojizas y de contorno nítido; siguen una banda unilateral correspondiente a un territorio sensitivo.",
        "Paciente varón de 70 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por siete días de evolución. Desarrolla ardor y parestesias, seguidas por erupción vesicular que respeta un dermatoma. En la inspección se observan pequeñas elevaciones con contenido líquido claro, de aspecto rojizas y de contorno nítido; siguen una banda unilateral correspondiente a un territorio sensitivo."
    ],

    definicion:
        "Reactivación del virus varicela-zóster latente en ganglios sensitivos.",

    lesion:
        "Vesículas agrupadas sobre base eritematosa siguiendo un dermatoma.",

    clinica:
        "Dolor neuropático precede o acompaña la erupción.",

    diagnostico:
        "Clínico; PCR en casos atípicos.",

    tratamiento:
        "Valaciclovir, aciclovir o famciclovir y adecuado manejo del dolor.",

    diferencial:
        "Herpes simple y dermatitis de contacto.",

    perla:
        "Dolor + vesículas + distribución dermatomal unilateral."
},


{
    nombre: "Molusco contagioso",

    busquedas: [
        "molluscum contagiosum clinical photograph",
        "molluscum umbilicated papules"
    ],

    morfologia: {
        lesion: "Pápula",
        color: "Color piel",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 8 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por tres semanas de evolución. Presenta múltiples pequeñas elevaciones sólidas perladas pequeñas con depresión central. En la inspección se observan pequeñas elevaciones sólidas, de aspecto del mismo tono que la piel circundante y de contorno nítido; se limitan a una región anatómica. Se encuentra afebril, activo para la edad y hemodinámicamente estable, sin signos de compromiso sistémico.",
        "Paciente mujer de 7 años acude al Servicio de Dermatología del Instituto Nacional de Salud del Niño - Breña por dos meses de evolución. Presenta lesiones hemisféricas color piel, brillantes y umbilicadas. En la inspección se observan pequeñas elevaciones sólidas, de aspecto del mismo tono que la piel circundante y de contorno nítido; se limitan a una región anatómica. Se encuentra afebril, activo para la edad y hemodinámicamente estable, sin signos de compromiso sistémico."
    ],

    definicion:
        "Infección cutánea por un poxvirus.",

    lesion:
        "Pápulas perladas, cupuliformes y umbilicadas.",

    clinica:
        "Frecuente en niños; en adultos puede transmitirse por contacto sexual.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Puede resolverse espontáneamente; crioterapia, curetaje u otras terapias en casos seleccionados.",

    diferencial:
        "Verrugas, hiperplasia sebácea y criptococosis cutánea en inmunosupresión.",

    perla:
        "Pápula perlada con umbilicación central."
},


{
    nombre: "Verruga vulgar",

    busquedas: [
        "verruca vulgaris clinical photograph",
        "common wart skin clinical"
    ],

    morfologia: {
        lesion: "Pápula",
        color: "Color piel",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente varón de 45 años acude al Servicio de Dermatología del Hospital María Auxiliadora por tres semanas de evolución. Presenta pequeña elevación sólida áspera hiperqueratósica en dedo de evolución lenta. En la inspección se observan pequeñas elevaciones sólidas, de aspecto del mismo tono que la piel circundante y de contorno nítido; se limitan a una región anatómica.",
        "Paciente varón de 34 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por dos meses de evolución. Presenta varias lesiones verrugosas rugosas en dorso de las manos. En la inspección se observan pequeñas elevaciones sólidas, de aspecto del mismo tono que la piel circundante y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Proliferación epidérmica benigna causada por infección por virus del papiloma humano.",

    lesion:
        "Pápula hiperqueratósica de superficie rugosa.",

    clinica:
        "Frecuente en manos y dedos.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Ácido salicílico, crioterapia u otros métodos destructivos según localización.",

    diferencial:
        "Callos, queratosis seborreica y carcinoma epidermoide.",

    perla:
        "Superficie rugosa y puntos negros trombosados pueden sugerir verruga."
},


{
    nombre: "Tiña corporis",

    busquedas: [
        "tinea corporis clinical photograph",
        "ringworm skin clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Elevado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 43 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por tres semanas de evolución. Presenta área cutánea sobreelevada de superficie amplia anular pruriginosa con borde activo descamativo y aclaramiento central. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y elevados; se limitan a una región anatómica.",
        "Paciente varón de 31 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por dos meses de evolución. Deportista desarrolla lesión circular que crece centrífugamente con descamación predominante en la periferia. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y elevados; se limitan a una región anatómica."
    ],

    definicion:
        "Dermatofitosis de la piel glabra.",

    lesion:
        "Placa anular eritematodescamativa con borde periférico activo.",

    clinica:
        "Pruriginosa y de crecimiento centrífugo.",

    diagnostico:
        "Examen directo con KOH puede demostrar hifas.",

    tratamiento:
        "Antifúngicos tópicos; tratamiento sistémico cuando es extensa o refractaria.",

    diferencial:
        "Eczema numular, psoriasis y granuloma anular.",

    perla:
        "Borde activo + aclaramiento central = dermatofitosis."
},


{
    nombre: "Tiña cruris",

    busquedas: [
        "tinea cruris clinical photograph",
        "jock itch clinical skin"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Elevado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente varón de 24 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por tres semanas de evolución. Presenta áreas cutáneas sobreelevadas de superficie amplia pruriginosas anulares en región inguinal con borde descamativo activo. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y elevados; se limitan a una región anatómica.",
        "Paciente varón de 18 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por dos meses de evolución. Presenta lesión rojiza que se extiende desde pliegues inguinales hacia cara interna del muslo. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y elevados; se limitan a una región anatómica."
    ],

    definicion:
        "Dermatofitosis de región inguinal.",

    lesion:
        "Placas eritematodescamativas con borde activo.",

    clinica:
        "Prurito inguinal frecuente; suele respetar el escroto.",

    diagnostico:
        "KOH en escamas periféricas.",

    tratamiento:
        "Antifúngicos tópicos y medidas para mantener la zona seca.",

    diferencial:
        "Candidiasis, eritrasma y psoriasis inversa.",

    perla:
        "Tiña cruris suele respetar el escroto; candidiasis puede comprometerlo."
},


{
    nombre: "Tiña pedis",

    busquedas: [
        "tinea pedis clinical photograph",
        "athletes foot interdigital clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Mal delimitado",
        distribucion: "Interdigital"
    },

    casos: [
        "Paciente mujer de 20 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por tres semanas de evolución. Presenta prurito, descamación y maceración entre cuarto y quinto dedos del pie. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de transición gradual hacia la piel vecina; predominan entre los dedos.",
        "Paciente mujer de 33 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por dos meses de evolución. Deportista presenta fisuras y descamación interdigital recurrente en ambos pies. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de transición gradual hacia la piel vecina; predominan entre los dedos."
    ],

    definicion:
        "Dermatofitosis del pie.",

    lesion:
        "Descamación, maceración, fisuras o placas hiperqueratósicas.",

    clinica:
        "Frecuente en espacios interdigitales.",

    diagnostico:
        "Examen directo con KOH.",

    tratamiento:
        "Antifúngicos tópicos y medidas de higiene y secado.",

    diferencial:
        "Dermatitis de contacto, psoriasis y candidiasis.",

    perla:
        "Maceración interdigital crónica en el pie = tiña pedis hasta demostrar lo contrario."
},


{
    nombre: "Tiña capitis",

    busquedas: [
        "tinea capitis clinical photograph",
        "scalp ringworm child clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente varón de 12 años acude al Servicio de Dermatología del Instituto Nacional de Salud del Niño San Borja por tres semanas de evolución. Presenta áreas de alopecia con descamación y cabellos quebrados. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica. Se encuentra afebril, activo para la edad y hemodinámicamente estable, sin signos de compromiso sistémico.",
        "Paciente varón de 7 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por dos meses de evolución. Desarrolla áreas cutáneas sobreelevadas de superficie amplia descamativas del cuero cabelludo con pérdida focal del cabello. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica. Se encuentra afebril, activo para la edad y hemodinámicamente estable, sin signos de compromiso sistémico."
    ],

    definicion:
        "Dermatofitosis del cuero cabelludo y tallo piloso.",

    lesion:
        "Placas descamativas alopécicas con cabellos rotos.",

    clinica:
        "Predomina en niños.",

    diagnostico:
        "KOH, cultivo y otras pruebas micológicas según disponibilidad.",

    tratamiento:
        "Requiere antifúngico sistémico.",

    diferencial:
        "Alopecia areata, dermatitis seborreica y psoriasis.",

    perla:
        "Tiña capitis no se trata adecuadamente solo con crema: necesita terapia sistémica."
},


{
    nombre: "Pitiriasis versicolor",

    busquedas: [
        "pityriasis versicolor clinical photograph",
        "tinea versicolor skin clinical"
    ],

    morfologia: {
        lesion: "Mácula",
        color: "Hipopigmentada",
        borde: "Bien delimitado",
        distribucion: "Generalizada"
    },

    casos: [
        "Paciente varón de 32 años acude al Servicio de Dermatología del Hospital María Auxiliadora por tres semanas de evolución. Presenta múltiples cambios planos de coloración más claras que la piel circundante finamente descamativas en tronco. En la inspección se observan cambios planos de coloración, de aspecto más claras que la piel circundante y de contorno nítido; se observan en varias regiones corporales.",
        "Paciente mujer de 43 años acude al Servicio de Dermatología del Hospital María Auxiliadora por dos meses de evolución. Presenta manchas de diferente tonalidad en espalda y tórax que se hacen más evidentes tras exposición solar. En la inspección se observan cambios planos de coloración, de aspecto más claras que la piel circundante y de contorno nítido; se observan en varias regiones corporales."
    ],

    definicion:
        "Micosis superficial asociada con Malassezia.",

    lesion:
        "Máculas hipo o hiperpigmentadas con fina descamación.",

    clinica:
        "Predomina en tronco, hombros y cuello.",

    diagnostico:
        "KOH puede mostrar patrón de hifas cortas y levaduras.",

    tratamiento:
        "Azoles tópicos o sulfuro de selenio; terapia sistémica en casos seleccionados.",

    diferencial:
        "Vitíligo, pitiriasis alba y otras alteraciones pigmentarias.",

    perla:
        "Hipopigmentación con descamación fina en tronco."
},


{
    nombre: "Candidiasis cutánea",

    busquedas: [
        "cutaneous candidiasis clinical photograph",
        "candidal intertrigo clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 28 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por tres semanas de evolución. Obeso presenta área cutánea sobreelevada de superficie amplia rojiza húmeda en pliegue submamario con pequeñas elevaciones con contenido purulento satélite. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica. Glucemia capilar de 196 mg/dL y antecedente de diabetes mellitus con controles irregulares. No presenta fiebre ni compromiso sistémico.",
        "Paciente varón de 60 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por dos meses de evolución. Diabético presenta intertrigo intensamente rojizo con lesiones satélite en pliegue inguinal. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica. Signos vitales estables. Glucosa en ayunas de 168 mg/dL y antecedente de humedad persistente en el pliegue afectado."
    ],

    definicion:
        "Infección cutánea por Candida, especialmente en áreas húmedas y ocluidas.",

    lesion:
        "Placa eritematosa macerada con pápulas o pústulas satélite.",

    clinica:
        "Frecuente en pliegues.",

    diagnostico:
        "Clínico y examen directo en casos dudosos.",

    tratamiento:
        "Medidas para reducir humedad y antifúngicos tópicos.",

    diferencial:
        "Tiña cruris, eritrasma y psoriasis inversa.",

    perla:
        "Pústulas satélite alrededor de un intertrigo sugieren Candida."
},


{
    nombre: "Escabiosis",

    busquedas: [
        "scabies clinical photograph",
        "scabies burrows interdigital clinical"
    ],

    morfologia: {
        lesion: "Pápula",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Interdigital"
    },

    casos: [
        "Paciente mujer de 31 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por tres semanas de evolución. Presenta prurito intenso predominantemente nocturno con lesiones en espacios interdigitales y muñecas. En la inspección se observan pequeñas elevaciones sólidas, de aspecto rojizas y de contorno nítido; predominan entre los dedos.",
        "Paciente mujer de 44 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por dos meses de evolución. Varios miembros de una familia presentan prurito nocturno y pequeñas pequeñas elevaciones sólidas excoriadas en manos y cintura. En la inspección se observan pequeñas elevaciones sólidas, de aspecto rojizas y de contorno nítido; predominan entre los dedos."
    ],

    definicion:
        "Infestación cutánea producida por Sarcoptes scabiei.",

    lesion:
        "Pápulas pruriginosas, excoriaciones y surcos acarinos.",

    clinica:
        "Prurito nocturno intenso y contagio entre convivientes.",

    diagnostico:
        "Clínico; dermatoscopia o raspado puede demostrar el ácaro.",

    tratamiento:
        "Permetrina tópica o ivermectina según contexto; tratar contactos y ropa.",

    diferencial:
        "Dermatitis atópica, urticaria papular y pediculosis.",

    perla:
        "Prurito nocturno + convivientes afectados + espacios interdigitales."
},


{
    nombre: "Larva migrans cutánea",

    busquedas: [
        "cutaneous larva migrans clinical photograph",
        "creeping eruption skin clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 31 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por tres semanas de evolución. Que caminó descalzo en playa presenta trayecto serpiginoso muy pruriginoso en el pie. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica.",
        "Paciente mujer de 51 años acude al Servicio de Dermatología del Hospital María Auxiliadora por dos meses de evolución. Viajero presenta lesión lineal migratoria de aspecto serpiginoso que avanza lentamente. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Dermatosis causada por migración intraepidérmica de larvas de anquilostomas animales.",

    lesion:
        "Trayecto eritematoso serpiginoso y migratorio.",

    clinica:
        "Prurito intenso, común en pies o zonas expuestas a suelo contaminado.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Ivermectina o albendazol.",

    diferencial:
        "Larva currens, dermatitis de contacto y miasis.",

    perla:
        "Trayecto serpiginoso que avanza después de contacto con arena o suelo."
},


{
    nombre: "Pénfigo vulgar",

    busquedas: [
        "pemphigus vulgaris clinical photograph",
        "pemphigus vulgaris skin blisters"
    ],

    morfologia: {
        lesion: "Ampolla",
        color: "Eritematosa",
        borde: "Mal delimitado",
        distribucion: "Generalizada"
    },

    casos: [
        "Paciente mujer de 46 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por tres semanas de evolución. Presenta áreas superficiales de pérdida de epidermis orales dolorosas seguidas por elevaciones de mayor tamaño con contenido líquido flácidas que se rompen fácilmente. En la inspección se observan elevaciones de mayor tamaño con contenido líquido, de aspecto rojizas y de transición gradual hacia la piel vecina; se observan en varias regiones corporales. Presenta múltiples áreas superficiales de pérdida de epidermis dolorosas en la mucosa oral y signo de Nikolsky clínicamente positivo en piel perilesional; los signos vitales son estables.",
        "Paciente mujer de 70 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por dos meses de evolución. Presenta elevaciones de mayor tamaño con contenido líquido frágiles y áreas superficiales de pérdida de epidermis extensas con compromiso de mucosa oral. En la inspección se observan elevaciones de mayor tamaño con contenido líquido, de aspecto rojizas y de transición gradual hacia la piel vecina; se observan en varias regiones corporales. No hay fiebre ni datos de infección secundaria. Las elevaciones de mayor tamaño con contenido líquido son flácidas y se rompen con facilidad, dejando áreas superficiales de pérdida de epidermis húmedas."
    ],

    definicion:
        "Enfermedad ampollosa autoinmune por autoanticuerpos contra desmogleínas.",

    lesion:
        "Ampollas flácidas intraepidérmicas que se rompen y producen erosiones.",

    clinica:
        "El compromiso mucoso es muy frecuente.",

    diagnostico:
        "Biopsia e inmunofluorescencia directa.",

    tratamiento:
        "Rituximab y corticoides sistémicos, con inmunosupresores según necesidad.",

    diferencial:
        "Penfigoide ampolloso y otras enfermedades ampollosas.",

    perla:
        "Ampolla flácida + mucosa oral = pénfigo vulgar."
},


{
    nombre: "Pénfigo foliáceo",

    busquedas: [
        "pemphigus foliaceus clinical photograph",
        "pemphigus foliaceus skin"
    ],

    morfologia: {
        lesion: "Erosión",
        color: "Eritematosa",
        borde: "Mal delimitado",
        distribucion: "Seborreica"
    },

    casos: [
        "Paciente mujer de 58 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por tres semanas de evolución. Presenta áreas superficiales de pérdida de epidermis superficiales costrosas en cara, cuero cabelludo y tronco sin compromiso oral. En la inspección se observan áreas superficiales de pérdida de epidermis, de aspecto rojizas y de transición gradual hacia la piel vecina; predominan en cuero cabelludo, cejas, surcos nasolabiales u otras zonas ricas en sebo.",
        "Paciente varón de 45 años acude al Servicio de Dermatología del Hospital María Auxiliadora por dos meses de evolución. Desarrolla lesiones descamativas y erosivas superficiales en áreas seborreicas. En la inspección se observan áreas superficiales de pérdida de epidermis, de aspecto rojizas y de transición gradual hacia la piel vecina; predominan en cuero cabelludo, cejas, surcos nasolabiales u otras zonas ricas en sebo."
    ],

    definicion:
        "Pénfigo superficial asociado principalmente con autoanticuerpos contra desmogleína 1.",

    lesion:
        "Ampollas muy superficiales que suelen verse clínicamente como erosiones y costras.",

    clinica:
        "Generalmente no compromete mucosa oral.",

    diagnostico:
        "Biopsia e inmunofluorescencia directa.",

    tratamiento:
        "Corticoides y terapias inmunomoduladoras según gravedad.",

    diferencial:
        "Dermatitis seborreica, psoriasis y pénfigo vulgar.",

    perla:
        "Pénfigo foliáceo: superficial y típicamente sin mucosa."
},


{
    nombre: "Penfigoide ampolloso",

    busquedas: [
        "bullous pemphigoid clinical photograph",
        "bullous pemphigoid tense blisters"
    ],

    morfologia: {
        lesion: "Ampolla",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Generalizada"
    },

    casos: [
        "Paciente varón de 85 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por tres semanas de evolución. Presenta elevaciones de mayor tamaño con contenido líquido tensas muy pruriginosas sobre piel rojiza. En la inspección se observan elevaciones de mayor tamaño con contenido líquido, de aspecto rojizas y de contorno nítido; se observan en varias regiones corporales. Se encuentra afebril y hemodinámicamente estable. Las elevaciones de mayor tamaño con contenido líquido son tensas, pruriginosas y la mucosa oral está respetada.",
        "Paciente mujer de 84 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por dos meses de evolución. De edad avanzada desarrolla lesiones ampollosas firmes que no se rompen fácilmente. En la inspección se observan elevaciones de mayor tamaño con contenido líquido, de aspecto rojizas y de contorno nítido; se observan en varias regiones corporales. Los signos vitales no muestran alteraciones. Refiere prurito intenso previo a la aparición de elevaciones de mayor tamaño con contenido líquido firmes que no se rompen con facilidad."
    ],

    definicion:
        "Enfermedad ampollosa autoinmune subepidérmica.",

    lesion:
        "Ampollas tensas sobre piel normal o eritematosa.",

    clinica:
        "Predomina en adultos mayores y suele producir prurito intenso.",

    diagnostico:
        "Biopsia e inmunofluorescencia directa.",

    tratamiento:
        "Corticoides tópicos potentes o sistémicos y terapias inmunomoduladoras según gravedad.",

    diferencial:
        "Pénfigo vulgar, dermatitis herpetiforme y reacciones ampollosas.",

    perla:
        "Penfigoide = ampolla tensa; pénfigo = ampolla flácida."
},


{
    nombre: "Dermatitis herpetiforme",

    busquedas: [
        "dermatitis herpetiformis clinical photograph",
        "dermatitis herpetiformis elbows clinical"
    ],

    morfologia: {
        lesion: "Vesícula",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Extensora"
    },

    casos: [
        "Paciente mujer de 32 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por tres semanas de evolución. Presenta pequeñas elevaciones con contenido líquido claro pequeñas extremadamente pruriginosas y excoriadas en codos y rodillas. En la inspección se observan pequeñas elevaciones con contenido líquido claro, de aspecto rojizas y de contorno nítido; predominan en superficies externas de las extremidades.",
        "Paciente varón de 47 años acude al Servicio de Dermatología del Hospital María Auxiliadora por dos meses de evolución. Con síntomas intestinales presenta lesiones papulovesiculares simétricas sobre superficies extensoras. En la inspección se observan pequeñas elevaciones con contenido líquido claro, de aspecto rojizas y de contorno nítido; predominan en superficies externas de las extremidades."
    ],

    definicion:
        "Dermatosis ampollosa asociada con enfermedad celíaca y depósitos de IgA.",

    lesion:
        "Pápulas y vesículas agrupadas intensamente pruriginosas.",

    clinica:
        "Predomina en codos, rodillas, glúteos y cuero cabelludo.",

    diagnostico:
        "Biopsia perilesional con inmunofluorescencia directa.",

    tratamiento:
        "Dapsona y dieta libre de gluten.",

    diferencial:
        "Escabiosis, eczema y enfermedades ampollosas.",

    perla:
        "Prurito intenso en extensores + celiaquía."
},


{
    nombre: "Vitíligo",

    busquedas: [
        "vitiligo clinical photograph",
        "vitiligo hands face clinical"
    ],

    morfologia: {
        lesion: "Mácula",
        color: "Acrómica",
        borde: "Bien delimitado",
        distribucion: "Simétrica"
    },

    casos: [
        "Paciente mujer de 40 años acude al Servicio de Dermatología del Hospital María Auxiliadora por ocho meses de evolución con exacerbaciones periódicas. Presenta manchas completamente blancas de contorno nítido en dorso de manos y alrededor de boca. En la inspección se observan cambios planos de coloración, de aspecto blanco tiza sin pigmento visible y de contorno nítido; aparecen de forma semejante a ambos lados del cuerpo.",
        "Paciente mujer de 20 años acude al Servicio de Dermatología del Hospital María Auxiliadora por seis meses de evolución progresiva. Presenta despigmentación simétrica progresiva sin descamación ni síntomas. En la inspección se observan cambios planos de coloración, de aspecto blanco tiza sin pigmento visible y de contorno nítido; aparecen de forma semejante a ambos lados del cuerpo."
    ],

    definicion:
        "Trastorno adquirido de despigmentación por pérdida funcional de melanocitos.",

    lesion:
        "Máculas o parches acrómicos bien delimitados.",

    clinica:
        "Frecuente en manos, cara y regiones periorificiales.",

    diagnostico:
        "Clínico; lámpara de Wood puede facilitar la evaluación.",

    tratamiento:
        "Corticoides tópicos, inhibidores de calcineurina, fototerapia y tratamientos dirigidos según extensión.",

    diferencial:
        "Pitiriasis versicolor, pitiriasis alba e hipopigmentación postinflamatoria.",

    perla:
        "Vitíligo = acrómico, no simplemente hipopigmentado."
},


{
    nombre: "Melasma",

    busquedas: [
        "melasma clinical photograph face",
        "facial melasma clinical"
    ],

    morfologia: {
        lesion: "Mácula",
        color: "Hiperpigmentada",
        borde: "Irregular",
        distribucion: "Simétrica"
    },

    casos: [
        "Paciente mujer de 28 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por ocho meses de evolución con exacerbaciones periódicas. Presenta cambios planos de coloración marrones simétricas en mejillas y frente que aumentan con exposición solar. En la inspección se observan cambios planos de coloración, de aspecto marrón más oscuro que la piel vecina y irregulares; aparecen de forma semejante a ambos lados del cuerpo.",
        "Paciente mujer de 36 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por seis meses de evolución progresiva. Desarrolla hiperpigmentación facial bilateral durante el embarazo. En la inspección se observan cambios planos de coloración, de aspecto marrón más oscuro que la piel vecina y irregulares; aparecen de forma semejante a ambos lados del cuerpo."
    ],

    definicion:
        "Trastorno adquirido de hiperpigmentación facial.",

    lesion:
        "Máculas parduzcas irregulares y simétricas.",

    clinica:
        "Predomina en zonas fotoexpuestas de la cara.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Fotoprotección estricta y agentes despigmentantes; otros procedimientos según el caso.",

    diferencial:
        "Hiperpigmentación postinflamatoria y léntigos.",

    perla:
        "Hiperpigmentación facial simétrica que empeora con sol."
},


{
    nombre: "Acné vulgar",

    busquedas: [
        "acne vulgaris clinical photograph",
        "comedonal acne clinical"
    ],

    morfologia: {
        lesion: "Pápula",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Seborreica"
    },

    casos: [
        "Paciente varón de 22 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por ocho meses de evolución con exacerbaciones periódicas. Presenta comedones abiertos y cerrados junto con pequeñas elevaciones sólidas y pequeñas elevaciones con contenido purulento en cara. En la inspección se observan pequeñas elevaciones sólidas, de aspecto rojizas y de contorno nítido; predominan en cuero cabelludo, cejas, surcos nasolabiales u otras zonas ricas en sebo.",
        "Paciente varón de 15 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por seis meses de evolución progresiva. Joven presenta lesiones inflamatorias y comedones en cara, pecho y espalda. En la inspección se observan pequeñas elevaciones sólidas, de aspecto rojizas y de contorno nítido; predominan en cuero cabelludo, cejas, surcos nasolabiales u otras zonas ricas en sebo."
    ],

    definicion:
        "Enfermedad inflamatoria de la unidad pilosebácea.",

    lesion:
        "Comedones, pápulas, pústulas y eventualmente nódulos.",

    clinica:
        "Predomina en cara y tronco superior.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Retinoides tópicos, peróxido de benzoilo, antibióticos seleccionados, terapias hormonales o isotretinoína según gravedad.",

    diferencial:
        "Rosácea, foliculitis y dermatitis perioral.",

    perla:
        "La presencia de comedones orienta fuertemente a acné."
},


{
    nombre: "Rosácea",

    busquedas: [
        "rosacea clinical photograph",
        "papulopustular rosacea clinical"
    ],

    morfologia: {
        lesion: "Pápula",
        color: "Eritematosa",
        borde: "Mal delimitado",
        distribucion: "Simétrica"
    },

    casos: [
        "Paciente mujer de 54 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por ocho meses de evolución con exacerbaciones periódicas. Presenta enrojecimiento centrofacial persistente, telangiectasias y pequeñas elevaciones sólidas sin comedones. En la inspección se observan pequeñas elevaciones sólidas, de aspecto rojizas y de transición gradual hacia la piel vecina; aparecen de forma semejante a ambos lados del cuerpo.",
        "Paciente mujer de 46 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por seis meses de evolución progresiva. Refiere flushing facial recurrente y posteriormente pequeñas elevaciones sólidas y pequeñas elevaciones con contenido purulento en mejillas y nariz. En la inspección se observan pequeñas elevaciones sólidas, de aspecto rojizas y de transición gradual hacia la piel vecina; aparecen de forma semejante a ambos lados del cuerpo."
    ],

    definicion:
        "Dermatosis inflamatoria crónica de la región centrofacial.",

    lesion:
        "Eritema persistente, telangiectasias, pápulas y pústulas.",

    clinica:
        "Puede agravarse con calor, alcohol, sol y alimentos picantes.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Fotoprotección, metronidazol, ivermectina o ácido azelaico tópicos; tetraciclinas en casos seleccionados.",

    diferencial:
        "Acné, lupus y dermatitis seborreica.",

    perla:
        "Rosácea tiene pápulas/pústulas, pero no comedones."
},


{
    nombre: "Hidradenitis supurativa",

    busquedas: [
        "hidradenitis suppurativa clinical photograph",
        "hidradenitis axilla clinical"
    ],

    morfologia: {
        lesion: "Nódulo",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 34 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por ocho meses de evolución con exacerbaciones periódicas. Presenta lesiones sólidas profundas y palpables dolorosos recurrentes y abscesos en axilas con cicatrices y trayectos fistulosos. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica. Permanece afebril, con presión arterial de 124/78 mmHg. El hemograma no muestra leucocitosis marcada y la proteína C reactiva está discretamente elevada; refiere episodios similares desde hace tres años.",
        "Paciente mujer de 67 años acude al Servicio de Dermatología del Hospital María Auxiliadora por seis meses de evolución progresiva. Presenta lesiones inflamatorias recurrentes en ingles y axilas que drenan material purulento. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica. Los signos vitales son estables. Se observan cicatrices retraídas y trayectos de drenaje en pliegues, sin datos clínicos de sepsis."
    ],

    definicion:
        "Enfermedad inflamatoria crónica de áreas intertriginosas asociada con oclusión folicular.",

    lesion:
        "Nódulos profundos, abscesos, fístulas y cicatrices.",

    clinica:
        "Axilas, ingles, región perineal e inframamaria.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Medidas generales, antibióticos, terapias biológicas y cirugía dependiendo del estadio.",

    diferencial:
        "Forunculosis y abscesos recurrentes.",

    perla:
        "Nódulos recurrentes + fístulas + cicatrices en pliegues."
},


{
    nombre: "Alopecia areata",

    busquedas: [
        "alopecia areata clinical photograph",
        "alopecia areata scalp patch"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Color piel",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 42 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por ocho meses de evolución con exacerbaciones periódicas. Presenta pérdida súbita de cabello en una área cutánea sobreelevada de superficie amplia redonda completamente lisa. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto del mismo tono que la piel circundante y de contorno nítido; se limitan a una región anatómica.",
        "Paciente varón de 67 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por seis meses de evolución progresiva. Presenta área alopécica de contorno nítido sin descamación ni inflamación evidente. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto del mismo tono que la piel circundante y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Alopecia no cicatricial autoinmune.",

    lesion:
        "Placa alopécica lisa y bien delimitada.",

    clinica:
        "Puede observarse pelo en signo de admiración en la periferia.",

    diagnostico:
        "Clínico y dermatoscópico.",

    tratamiento:
        "Corticoides tópicos o intralesionales y otras terapias según extensión.",

    diferencial:
        "Tiña capitis, tricotilomanía y alopecia cicatricial.",

    perla:
        "Placa alopécica lisa sin escama."
},


{
    nombre: "Eritema multiforme",

    busquedas: [
        "erythema multiforme target lesions clinical",
        "erythema multiforme skin photograph"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Extensora"
    },

    casos: [
        "Paciente varón de 29 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por cuatro días de evolución y progresión reciente. Presenta lesiones concéntricas en diana sobre manos y extremidades después de episodio de herpes simple. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; predominan en superficies externas de las extremidades.",
        "Paciente mujer de 24 años acude al Servicio de Dermatología del Hospital María Auxiliadora por siete días de evolución. Desarrolla múltiples lesiones target simétricas en superficies extensoras. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; predominan en superficies externas de las extremidades."
    ],

    definicion:
        "Reacción cutánea inmunológica aguda frecuentemente desencadenada por infección por herpes simple.",

    lesion:
        "Lesión típica en diana con zonas concéntricas.",

    clinica:
        "Predomina acralmente y suele ser simétrica.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Tratamiento del desencadenante y medidas sintomáticas; manejo especializado si existe afectación importante.",

    diferencial:
        "Urticaria y síndrome de Stevens-Johnson.",

    perla:
        "La lesión en diana clásica es la clave."
},


{
    nombre: "Eritema nodoso",

    busquedas: [
        "erythema nodosum clinical photograph",
        "erythema nodosum legs clinical"
    ],

    morfologia: {
        lesion: "Nódulo",
        color: "Eritematosa",
        borde: "Mal delimitado",
        distribucion: "Simétrica"
    },

    casos: [
        "Paciente mujer de 33 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por cuatro días de evolución y progresión reciente. Presenta lesiones sólidas profundas y palpables dolorosos rojizos simétricos en cara anterior de ambas piernas. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto rojizas y de transición gradual hacia la piel vecina; aparecen de forma semejante a ambos lados del cuerpo. Presenta temperatura de 37,7 °C y artralgias de tobillos. El hemograma no muestra leucocitosis importante, pero la VSG y la proteína C reactiva están elevadas.",
        "Paciente mujer de 31 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por siete días de evolución. Presenta lesiones subcutáneas dolorosas en tibias asociadas con malestar general. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto rojizas y de transición gradual hacia la piel vecina; aparecen de forma semejante a ambos lados del cuerpo. Refiere malestar general y dolor articular. Los signos vitales son estables y los reactantes de fase aguda están elevados."
    ],

    definicion:
        "Paniculitis septal inflamatoria asociada con múltiples desencadenantes.",

    lesion:
        "Nódulos subcutáneos eritematosos y dolorosos.",

    clinica:
        "Predomina en superficies pretibiales.",

    diagnostico:
        "Clínico; debe investigarse la causa subyacente.",

    tratamiento:
        "Reposo, antiinflamatorios cuando son apropiados y tratamiento de la causa.",

    diferencial:
        "Otras paniculitis y celulitis.",

    perla:
        "Nódulos dolorosos pretibiales bilaterales."
},


{
    nombre: "Lupus cutáneo discoide",

    busquedas: [
        "discoid lupus erythematosus clinical photograph",
        "discoid lupus skin face"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Fotoexpuesta"
    },

    casos: [
        "Paciente mujer de 48 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por ocho meses de evolución con exacerbaciones periódicas. Presenta áreas cutáneas sobreelevadas de superficie amplia rojizas descamativas en cara con atrofia y alteración pigmentaria residual. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; predominan en zonas expuestas al sol.",
        "Paciente mujer de 33 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por seis meses de evolución progresiva. Presenta lesiones crónicas discoides en cuero cabelludo y cara que dejan cicatriz. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; predominan en zonas expuestas al sol."
    ],

    definicion:
        "Forma crónica de lupus cutáneo caracterizada por placas inflamatorias con potencial cicatricial.",

    lesion:
        "Placas eritematosas escamosas que pueden evolucionar a atrofia y cicatriz.",

    clinica:
        "Predomina en áreas fotoexpuestas.",

    diagnostico:
        "Clínico, serológico según contexto y biopsia cutánea.",

    tratamiento:
        "Fotoprotección, corticoides tópicos o intralesionales y antipalúdicos según extensión.",

    diferencial:
        "Psoriasis, dermatitis seborreica y rosácea.",

    perla:
        "Lupus discoide puede dejar cicatriz y alopecia cicatricial."
},


{
    nombre: "Dermatomiositis",

    busquedas: [
        "dermatomyositis gottron papules clinical",
        "dermatomyositis heliotrope rash clinical"
    ],

    morfologia: {
        lesion: "Pápula",
        color: "Violácea",
        borde: "Bien delimitado",
        distribucion: "Extensora"
    },

    casos: [
        "Paciente mujer de 38 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por tres semanas de evolución. Con debilidad muscular proximal presenta pequeñas elevaciones sólidas rojizo-purpúreas sobre nudillos. En la inspección se observan pequeñas elevaciones sólidas, de aspecto rojizo-purpúreas y de contorno nítido; predominan en superficies externas de las extremidades. Refiere además dificultad para levantarse de una silla y elevar los brazos. CK 1 480 U/L, AST y ALT discretamente elevadas y VSG aumentada.",
        "Paciente mujer de 54 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por dos meses de evolución. Presenta enrojecimiento violáceo periocular y lesiones de Gottron en articulaciones de manos. En la inspección se observan pequeñas elevaciones sólidas, de aspecto rojizo-purpúreas y de contorno nítido; predominan en superficies externas de las extremidades. Al examen neuromuscular presenta debilidad proximal simétrica 4/5. CK 1 120 U/L y aldolasa elevada; los signos vitales son estables."
    ],

    definicion:
        "Miopatía inflamatoria autoinmune con manifestaciones cutáneas características.",

    lesion:
        "Pápulas de Gottron y eritema heliotropo entre otras manifestaciones.",

    clinica:
        "Debilidad muscular proximal asociada con lesiones cutáneas.",

    diagnostico:
        "Evaluación clínica, enzimas musculares, autoanticuerpos, estudios electrofisiológicos o biopsia según caso.",

    tratamiento:
        "Corticoides sistémicos e inmunosupresores; fotoprotección.",

    diferencial:
        "Lupus y otras miopatías inflamatorias.",

    perla:
        "Pápulas de Gottron + debilidad proximal."
},


{
    nombre: "Esclerodermia localizada",

    busquedas: [
        "morphea clinical photograph",
        "localized scleroderma skin clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Parduzca",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 62 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por ocho meses de evolución con exacerbaciones periódicas. Presenta área cutánea sobreelevada de superficie amplia endurecida, brillante y progresivamente más oscura que la piel vecina en tronco. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto marrones y de contorno nítido; se limitan a una región anatómica.",
        "Paciente varón de 63 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por seis meses de evolución progresiva. Presenta lesión indurada de contorno nítido con centro esclerótico y halo violáceo. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto marrones y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Trastorno inflamatorio fibrosante localizado de la piel también denominado morfea.",

    lesion:
        "Placa indurada y esclerótica.",

    clinica:
        "Puede presentar halo violáceo durante fase activa.",

    diagnostico:
        "Clínico y biopsia en casos seleccionados.",

    tratamiento:
        "Terapias tópicas, fototerapia o inmunomodulación sistémica según profundidad y extensión.",

    diferencial:
        "Esclerodermia sistémica y otras dermatosis esclerosantes.",

    perla:
        "Placa dura e indurada con aspecto esclerótico."
},


{
    nombre: "Queratosis seborreica",

    busquedas: [
        "seborrheic keratosis clinical photograph",
        "seborrheic keratosis skin lesion"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Hiperpigmentada",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 50 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por ocho meses de evolución con exacerbaciones periódicas. Presenta lesión marrón verrugosa con apariencia de estar pegada sobre la piel. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto marrón más oscuro que la piel vecina y de contorno nítido; se limitan a una región anatómica.",
        "Paciente varón de 44 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por seis meses de evolución progresiva. Consulta por múltiples lesiones pigmentadas de superficie cerosa en tronco. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto marrón más oscuro que la piel vecina y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Tumor epidérmico benigno muy frecuente.",

    lesion:
        "Pápula o placa bien delimitada, verrugosa o cerosa con aspecto adherido.",

    clinica:
        "Aumenta en número con la edad.",

    diagnostico:
        "Clínico y dermatoscópico.",

    tratamiento:
        "No requiere tratamiento salvo síntomas o razones diagnósticas/cosméticas.",

    diferencial:
        "Melanoma, nevo y verruga.",

    perla:
        "Aspecto de lesión pegada o 'stuck-on'."
},


{
    nombre: "Queratosis actínica",

    busquedas: [
        "actinic keratosis clinical photograph",
        "actinic keratosis face clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Mal delimitado",
        distribucion: "Fotoexpuesta"
    },

    casos: [
        "Paciente mujer de 59 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por ocho meses de evolución con exacerbaciones periódicas. Con exposición solar crónica presenta pequeña área cutánea sobreelevada de superficie amplia áspera en cuero cabelludo. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de transición gradual hacia la piel vecina; predominan en zonas expuestas al sol.",
        "Paciente mujer de 81 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por seis meses de evolución progresiva. Presenta múltiples lesiones rojizas rugosas al tacto en cara y dorso de manos. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de transición gradual hacia la piel vecina; predominan en zonas expuestas al sol."
    ],

    definicion:
        "Proliferación queratinocítica intraepidérmica asociada con daño solar crónico y potencial de progresión a carcinoma epidermoide.",

    lesion:
        "Mácula, pápula o placa áspera y descamativa.",

    clinica:
        "Predomina en áreas fotoexpuestas.",

    diagnostico:
        "Clínico y dermatoscópico; biopsia si hay sospecha de carcinoma invasivo.",

    tratamiento:
        "Crioterapia, terapias de campo u otros procedimientos según cantidad y características.",

    diferencial:
        "Carcinoma epidermoide, psoriasis y queratosis seborreica.",

    perla:
        "Muchas veces se siente áspera antes de verse claramente."
},


{
    nombre: "Carcinoma basocelular",

    busquedas: [
        "basal cell carcinoma clinical photograph",
        "basal cell carcinoma pearly papule clinical"
    ],

    morfologia: {
        lesion: "Nódulo",
        color: "Color piel",
        borde: "Elevado",
        distribucion: "Fotoexpuesta"
    },

    casos: [
        "Paciente mujer de 76 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por ocho meses de evolución con exacerbaciones periódicas. Presenta pequeña elevación sólida perlada facial con telangiectasias y ulceración central. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto del mismo tono que la piel circundante y elevados; predominan en zonas expuestas al sol. Los signos vitales son estables. La lesión sangra con traumatismos mínimos y presenta un borde perlado con telangiectasias superficiales.",
        "Paciente varón de 73 años acude al Servicio de Dermatología del Hospital María Auxiliadora por seis meses de evolución progresiva. Con exposición solar crónica presenta lesión nodular brillante de crecimiento lento en nariz. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto del mismo tono que la piel circundante y elevados; predominan en zonas expuestas al sol. No se palpan adenopatías regionales. Se observa un pápulo-lesión sólida profunda y palpable perlado de crecimiento lento con ulceración central."
    ],

    definicion:
        "Neoplasia maligna de queratinocitos basales con invasión local y muy bajo potencial metastásico.",

    lesion:
        "Pápula o nódulo perlado con telangiectasias y posible ulceración.",

    clinica:
        "Predomina en áreas fotoexpuestas.",

    diagnostico:
        "Dermatoscopia y confirmación histológica.",

    tratamiento:
        "Escisión, cirugía de Mohs u otras modalidades según subtipo, tamaño y localización.",

    diferencial:
        "Carcinoma epidermoide, melanoma amelanótico y nevos.",

    perla:
        "Pápula perlada + telangiectasias = carcinoma basocelular."
},


{
    nombre: "Carcinoma epidermoide cutáneo",

    busquedas: [
        "cutaneous squamous cell carcinoma clinical photograph",
        "squamous cell carcinoma skin clinical"
    ],

    morfologia: {
        lesion: "Nódulo",
        color: "Eritematosa",
        borde: "Irregular",
        distribucion: "Fotoexpuesta"
    },

    casos: [
        "Paciente varón de 77 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por ocho meses de evolución con exacerbaciones periódicas. Presenta lesión sólida profunda y palpable hiperqueratósico ulcerado de crecimiento progresivo en dorso de mano. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto rojizas y irregulares; predominan en zonas expuestas al sol. Está afebril y hemodinámicamente estable. No se palpan adenopatías regionales y la lesión ha crecido de forma progresiva durante los últimos meses.",
        "Paciente varón de 78 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por seis meses de evolución progresiva. Con daño solar presenta lesión costrosa e infiltrada en región facial. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto rojizas y irregulares; predominan en zonas expuestas al sol. El hemograma no muestra alteraciones relevantes. Se observa una lesión indurada, hiperqueratósica y parcialmente ulcerada en una zona fotoexpuesta."
    ],

    definicion:
        "Neoplasia maligna de queratinocitos epidérmicos.",

    lesion:
        "Pápula, placa o nódulo hiperqueratósico, costroso o ulcerado.",

    clinica:
        "Frecuente en áreas fotoexpuestas y puede metastatizar.",

    diagnostico:
        "Biopsia cutánea.",

    tratamiento:
        "Escisión quirúrgica; cirugía de Mohs en lesiones seleccionadas.",

    diferencial:
        "Queratosis actínica, queratoacantoma y carcinoma basocelular.",

    perla:
        "Lesión queratósica infiltrada o ulcerada sobre piel fotodañada."
},


{
    nombre: "Melanoma",

    busquedas: [
        "cutaneous melanoma clinical photograph",
        "malignant melanoma skin lesion clinical",
        "melanoma clinical photograph"
    ],

    morfologia: {
        lesion: "Mácula",
        color: "Hiperpigmentada",
        borde: "Irregular",
        distribucion: "Asimétrica"
    },

    casos: [
        "Paciente mujer de 48 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por ocho meses de evolución con exacerbaciones periódicas. Presenta lesión pigmentada que ha aumentado de tamaño, con asimetría, bordes irregulares y varios colores. En la inspección se observan cambios planos de coloración, de aspecto marrón más oscuro que la piel vecina y irregulares; predominan de manera desigual entre ambos lados. Los signos vitales y el hemograma no presentan alteraciones relevantes. En la dermatoscopia se aprecia asimetría estructural, red pigmentaria atípica y múltiples tonalidades.",
        "Paciente mujer de 49 años acude al Servicio de Dermatología del Hospital María Auxiliadora por seis meses de evolución progresiva. Consulta por nevo que ha cambiado recientemente de forma y tonalidad. En la inspección se observan cambios planos de coloración, de aspecto marrón más oscuro que la piel vecina y irregulares; predominan de manera desigual entre ambos lados. Se encuentra hemodinámicamente estable. La lesión ha aumentado de tamaño en los últimos meses y presenta asimetría, bordes irregulares y variación de color."
    ],

    definicion:
        "Neoplasia maligna originada en melanocitos con importante capacidad metastásica.",

    lesion:
        "Mácula, placa o nódulo pigmentado con asimetría y heterogeneidad.",

    clinica:
        "Debe sospecharse ante evolución o cambio de una lesión pigmentada.",

    diagnostico:
        "Dermatoscopia y biopsia excisional cuando es posible.",

    tratamiento:
        "Escisión quirúrgica y manejo adicional según estadio.",

    diferencial:
        "Nevo, queratosis seborreica y carcinoma basocelular pigmentado.",

    perla:
        "ABCDE: Asimetría, Bordes, Color, Diámetro y Evolución."
},


{
    nombre: "Nevo melanocítico",

    busquedas: [
        "melanocytic nevus clinical photograph",
        "benign melanocytic nevus skin"
    ],

    morfologia: {
        lesion: "Pápula",
        color: "Hiperpigmentada",
        borde: "Regular",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente varón de 56 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por ocho meses de evolución con exacerbaciones periódicas. Presenta lesión pigmentada estable durante años, simétrica y de bordes regulares. En la inspección se observan pequeñas elevaciones sólidas, de aspecto marrón más oscuro que la piel vecina y regulares; se limitan a una región anatómica.",
        "Paciente mujer de 56 años acude al Servicio de Dermatología del Hospital María Auxiliadora por seis meses de evolución progresiva. Presenta pequeño nevo homogéneo, sin cambios recientes ni síntomas. En la inspección se observan pequeñas elevaciones sólidas, de aspecto marrón más oscuro que la piel vecina y regulares; se limitan a una región anatómica."
    ],

    definicion:
        "Proliferación benigna de melanocitos.",

    lesion:
        "Mácula o pápula pigmentada, simétrica y homogénea.",

    clinica:
        "Habitualmente estable y asintomática.",

    diagnostico:
        "Clínico y dermatoscópico.",

    tratamiento:
        "No requiere tratamiento salvo sospecha diagnóstica o indicación específica.",

    diferencial:
        "Melanoma y queratosis seborreica.",

    perla:
        "Simetría y homogeneidad favorecen benignidad, pero siempre se evalúa evolución."
},


{
    nombre: "Dermatofibroma",

    busquedas: [
        "dermatofibroma clinical photograph",
        "dermatofibroma skin lesion"
    ],

    morfologia: {
        lesion: "Nódulo",
        color: "Hiperpigmentada",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente varón de 60 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por ocho meses de evolución con exacerbaciones periódicas. Presenta pequeño lesión sólida profunda y palpable firme parduzco en pierna que se deprime al comprimirlo lateralmente. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto marrón más oscuro que la piel vecina y de contorno nítido; se limitan a una región anatómica.",
        "Paciente varón de 30 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por seis meses de evolución progresiva. Presenta lesión estable y firme en miembro inferior con signo del hoyuelo. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto marrón más oscuro que la piel vecina y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Tumor fibrohistiocítico cutáneo benigno.",

    lesion:
        "Pápula o nódulo firme parduzco.",

    clinica:
        "Frecuente en extremidades inferiores.",

    diagnostico:
        "Clínico y dermatoscópico.",

    tratamiento:
        "Generalmente ninguno.",

    diferencial:
        "Nevo, melanoma y dermatofibrosarcoma.",

    perla:
        "Compresión lateral produce signo del hoyuelo."
},


{
    nombre: "Acrocordón",

    busquedas: [
        "skin tag acrochordon clinical photograph",
        "acrochordon clinical skin"
    ],

    morfologia: {
        lesion: "Pápula",
        color: "Color piel",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente varón de 45 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por ocho meses de evolución con exacerbaciones periódicas. Presenta múltiples pequeñas lesiones pediculadas blandas en cuello y axilas. En la inspección se observan pequeñas elevaciones sólidas, de aspecto del mismo tono que la piel circundante y de contorno nítido; se limitan a una región anatómica.",
        "Paciente mujer de 32 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por seis meses de evolución progresiva. Con obesidad presenta pequeñas elevaciones sólidas blandas color piel en pliegues. En la inspección se observan pequeñas elevaciones sólidas, de aspecto del mismo tono que la piel circundante y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Pólipo fibroepitelial benigno.",

    lesion:
        "Pápula blanda, pediculada y color piel.",

    clinica:
        "Frecuente en cuello, axilas e ingles.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Solo si molesta: escisión, crioterapia u otros métodos.",

    diferencial:
        "Nevos pediculados y verrugas.",

    perla:
        "Lesión blanda y pediculada en pliegues."
},


{
    nombre: "Hemangioma infantil",

    busquedas: [
        "infantile hemangioma clinical photograph",
        "strawberry hemangioma infant clinical"
    ],

    morfologia: {
        lesion: "Nódulo",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente varón de 10 meses acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por tres semanas de evolución. Presenta lesión vascular roja sobreelevada que creció durante los primeros meses de vida. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica. Se encuentra afebril, activo para la edad y hemodinámicamente estable, sin signos de compromiso sistémico.",
        "Paciente varón de 7 meses acude al Servicio de Dermatología del Instituto Nacional de Salud del Niño - Breña por dos meses de evolución. Madre consulta por tumoración rojo brillante tipo fresa en la cara de su bebé. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica. Se encuentra afebril, activo para la edad y hemodinámicamente estable, sin signos de compromiso sistémico."
    ],

    definicion:
        "Tumor vascular benigno de la infancia con fase proliferativa seguida de involución espontánea.",

    lesion:
        "Pápula, placa o nódulo vascular rojo brillante.",

    clinica:
        "Aparece en las primeras semanas de vida.",

    diagnostico:
        "Generalmente clínico.",

    tratamiento:
        "Observación en lesiones no complicadas; propranolol en lesiones de riesgo o con indicación terapéutica.",

    diferencial:
        "Malformaciones vasculares.",

    perla:
        "Hemangioma infantil prolifera después del nacimiento y posteriormente involuciona."
},


{
    nombre: "Nevus simplex",

    busquedas: [
        "nevus simplex clinical photograph infant",
        "salmon patch newborn clinical"
    ],

    morfologia: {
        lesion: "Mácula",
        color: "Eritematosa",
        borde: "Mal delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente varón de 2 meses acude al Servicio de Dermatología del Instituto Nacional de Salud del Niño San Borja por tres semanas de evolución. Recién nacido presenta cambio plano de coloración rosada plana en nuca que se intensifica con el llanto. En la inspección se observan cambios planos de coloración, de aspecto rojizas y de transición gradual hacia la piel vecina; se limitan a una región anatómica. Se encuentra afebril, activo para la edad y hemodinámicamente estable, sin signos de compromiso sistémico.",
        "Paciente varón de 8 meses acude al Servicio de Dermatología del Instituto Nacional de Salud del Niño - Breña por dos meses de evolución. Presenta mancha rosada tenue en glabela desde el nacimiento. En la inspección se observan cambios planos de coloración, de aspecto rojizas y de transición gradual hacia la piel vecina; se limitan a una región anatómica. Se encuentra afebril, activo para la edad y hemodinámicamente estable, sin signos de compromiso sistémico."
    ],

    definicion:
        "Malformación capilar congénita muy frecuente y generalmente transitoria.",

    lesion:
        "Mácula rosada o eritematosa plana.",

    clinica:
        "Frecuente en nuca, glabela y párpados.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Habitualmente ninguno.",

    diferencial:
        "Malformación capilar tipo vino de Oporto.",

    perla:
        "También llamado beso de ángel o picotazo de cigüeña según localización."
},


{
    nombre: "Malformación capilar tipo vino de Oporto",

    busquedas: [
        "port wine stain clinical photograph",
        "capillary malformation port wine stain"
    ],

    morfologia: {
        lesion: "Mácula",
        color: "Violácea",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente varón de 58 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por tres semanas de evolución. Presenta desde el nacimiento una cambio plano de coloración rojo-vinosa unilateral en cara que persiste con la edad. En la inspección se observan cambios planos de coloración, de aspecto rojizo-purpúreas y de contorno nítido; se limitan a una región anatómica.",
        "Paciente mujer de 47 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por dos meses de evolución. Presenta malformación vascular plana que progresivamente se oscurece con el crecimiento. En la inspección se observan cambios planos de coloración, de aspecto rojizo-purpúreas y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Malformación capilar congénita persistente.",

    lesion:
        "Mácula rojo-violácea plana y bien delimitada.",

    clinica:
        "No involuciona espontáneamente como el nevus simplex.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Láser vascular en casos seleccionados.",

    diferencial:
        "Nevus simplex y hemangioma.",

    perla:
        "Vino de Oporto persiste; nevus simplex suele aclararse."
},


{
    nombre: "Púrpura",

    busquedas: [
        "purpura skin clinical photograph",
        "non blanching purpura clinical"
    ],

    morfologia: {
        lesion: "Mácula",
        color: "Violácea",
        borde: "Bien delimitado",
        distribucion: "Generalizada"
    },

casos: [
        "Paciente mujer de 41 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por tres semanas de evolución. Consulta por aparición progresiva, desde hace 4 días, de múltiples lesiones rojizo-purpúreas en ambas extremidades inferiores. Refiere que las lesiones no desaparecen al presionarlas y algunas son ligeramente palpables. Niega traumatismos recientes. Al examen se observan cambios planos de coloración y pequeñas pequeñas elevaciones sólidas purpúricas, simétricas, predominantes en piernas, sin blanqueamiento a la digitopresión. En la inspección se observan cambios planos de coloración, de aspecto rojizo-purpúreas y de contorno nítido; se observan en varias regiones corporales. Se encuentra hemodinámicamente estable. Hemograma: hemoglobina 12,8 g/dL, leucocitos 7 400/µL y plaquetas 238 000/µL; tiempo de protrombina y TTPa dentro de rango.",
        "Paciente mujer de 42 años acude al Servicio de Dermatología del Hospital María Auxiliadora por una semana de evolución. Presenta manchas rojizo-purpúreas de aparición espontánea en miembros inferiores y antebrazos. Refiere evolución de una semana, sin prurito ni dolor intenso. Al examen físico se observan lesiones purpúricas de tamaño variable, no blanqueables, algunas con tendencia a confluir. No se evidencian pequeñas elevaciones con contenido líquido claro ni pequeñas elevaciones con contenido purulento. En la inspección se observan cambios planos de coloración, de aspecto rojizo-purpúreas y de contorno nítido; se observan en varias regiones corporales. Presión arterial 114/68 mmHg, afebril. Hemograma sin anemia ni leucocitosis, con plaquetas 210 000/µL. Las lesiones no blanquean a la digitopresión.",
        "Paciente mujer de 26 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por aparición progresiva durante las últimas cuatro semanas. Consulta por lesiones rojo-rojizo-purpúreas múltiples en ambas piernas, de inicio reciente, acompañadas de leve artralgia. Las lesiones son simétricas, no desaparecen con la presión y algunas se palpan discretamente elevadas. No presenta fiebre ni compromiso del estado general. En la inspección se observan cambios planos de coloración, de aspecto rojizo-purpúreas y de contorno nítido; se observan en varias regiones corporales. Se encuentra hemodinámicamente estable. Hemograma: hemoglobina 12,8 g/dL, leucocitos 7 400/µL y plaquetas 238 000/µL; tiempo de protrombina y TTPa dentro de rango."
    ],

    definicion:
        "Extravasación de sangre hacia piel o mucosas.",

    lesion:
        "Máculas violáceas no blanqueables.",

    clinica:
        "Puede estar asociada con trastornos plaquetarios, vasculares o de coagulación.",

    diagnostico:
        "Clínico acompañado de estudio etiológico.",

    tratamiento:
        "Depende de la causa subyacente.",

    diferencial:
        "Eritema y lesiones vasculares.",

    perla:
        "La púrpura no desaparece con la presión."
},


{
    nombre: "Petequias",

    busquedas: [
        "petechiae clinical photograph skin",
        "petechial rash clinical"
    ],

    morfologia: {
        lesion: "Mácula",
        color: "Violácea",
        borde: "Bien delimitado",
        distribucion: "Generalizada"
    },

    casos: [
        "Paciente varón de 50 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por tres semanas de evolución. Presenta múltiples puntos rojo-violáceos de pocos milímetros que no desaparecen a la presión. En la inspección se observan cambios planos de coloración, de aspecto rojizo-purpúreas y de contorno nítido; se observan en varias regiones corporales. Hemograma: hemoglobina 11,9 g/dL, leucocitos 6 900/µL y plaquetas 42 000/µL; TP y TTPa sin prolongación significativa. Se mantiene hemodinámicamente estable.",
        "Paciente mujer de 63 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por dos meses de evolución. Desarrolla numerosas lesiones puntiformes no blanqueables en extremidades. En la inspección se observan cambios planos de coloración, de aspecto rojizo-purpúreas y de contorno nítido; se observan en varias regiones corporales. Presión arterial 110/70 mmHg y afebril. El hemograma muestra trombocitopenia de 58 000/µL, sin leucocitosis y sin sangrado activo."
    ],

    definicion:
        "Pequeñas extravasaciones sanguíneas puntiformes en piel.",

    lesion:
        "Máculas purpúricas puntiformes generalmente menores de pocos milímetros.",

    clinica:
        "Pueden observarse en trombocitopenia, infecciones y otras condiciones.",

    diagnostico:
        "Clínico y evaluación etiológica.",

    tratamiento:
        "Según la causa.",

    diferencial:
        "Exantemas eritematosos y angiomas.",

    perla:
        "Petequia = púrpura puntiforme no blanqueable."
},


{
    nombre: "Granuloma anular",

    busquedas: [
        "granuloma annulare clinical photograph",
        "granuloma annulare hand clinical"
    ],

    morfologia: {
        lesion: "Pápula",
        color: "Color piel",
        borde: "Elevado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 38 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por ocho meses de evolución con exacerbaciones periódicas. Presenta anillo de pequeñas elevaciones sólidas color piel en dorso de mano sin descamación. En la inspección se observan pequeñas elevaciones sólidas, de aspecto del mismo tono que la piel circundante y elevados; se limitan a una región anatómica.",
        "Paciente mujer de 45 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por seis meses de evolución progresiva. Presenta lesión anular asintomática formada por pequeñas pequeñas elevaciones sólidas y centro aparentemente normal. En la inspección se observan pequeñas elevaciones sólidas, de aspecto del mismo tono que la piel circundante y elevados; se limitan a una región anatómica."
    ],

    definicion:
        "Dermatosis inflamatoria benigna de etiología no completamente definida.",

    lesion:
        "Pápulas firmes que forman configuraciones anulares sin descamación.",

    clinica:
        "Frecuente en manos y pies.",

    diagnostico:
        "Clínico; biopsia si existe duda.",

    tratamiento:
        "Muchas lesiones involucionan espontáneamente; terapias locales en casos seleccionados.",

    diferencial:
        "Tiña corporis.",

    perla:
        "Anillo sin escama periférica favorece granuloma anular frente a tiña."
},


{
    nombre: "Eczema numular",

    busquedas: [
        "nummular dermatitis clinical photograph",
        "discoid eczema skin clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 38 años acude al Servicio de Dermatología del Hospital María Auxiliadora por ocho meses de evolución con exacerbaciones periódicas. Presenta áreas cutáneas sobreelevadas de superficie amplia redondas en forma de moneda, intensamente pruriginosas, en extremidades. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica.",
        "Paciente mujer de 32 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por seis meses de evolución progresiva. Con xerosis desarrolla múltiples áreas cutáneas sobreelevadas de superficie amplia eccematosas circulares de contorno nítido. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Dermatitis eccematosa caracterizada por lesiones discoides.",

    lesion:
        "Placas redondas eritematosas, descamativas o exudativas.",

    clinica:
        "Frecuentemente pruriginosa.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Emolientes y corticoides tópicos.",

    diferencial:
        "Tiña corporis y psoriasis.",

    perla:
        "Placa eccematosa con forma de moneda."
},


{
    nombre: "Liquen simple crónico",

    busquedas: [
        "lichen simplex chronicus clinical photograph",
        "lichenification skin clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Hiperpigmentada",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 42 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por ocho meses de evolución con exacerbaciones periódicas. Con prurito crónico presenta área cutánea sobreelevada de superficie amplia engrosada con acentuación de los pliegues cutáneos. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto marrón más oscuro que la piel vecina y de contorno nítido; se limitan a una región anatómica.",
        "Paciente mujer de 25 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por seis meses de evolución progresiva. Refiere rascar repetidamente la nuca y presenta área más oscura que la piel vecina liquenificada. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto marrón más oscuro que la piel vecina y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Engrosamiento reactivo de la piel secundario al ciclo crónico de prurito y rascado.",

    lesion:
        "Placa engrosada y liquenificada con líneas cutáneas acentuadas.",

    clinica:
        "Prurito intenso y rascado persistente.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Romper el ciclo prurito-rascado, corticoides tópicos y tratamiento del desencadenante.",

    diferencial:
        "Dermatitis atópica, psoriasis y liquen plano.",

    perla:
        "Liquenificación = rascado crónico."
},


{
    nombre: "Prúrigo nodular",

    busquedas: [
        "prurigo nodularis clinical photograph",
        "prurigo nodularis skin nodules"
    ],

    morfologia: {
        lesion: "Nódulo",
        color: "Hiperpigmentada",
        borde: "Bien delimitado",
        distribucion: "Extensora"
    },

    casos: [
        "Paciente mujer de 38 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por ocho meses de evolución con exacerbaciones periódicas. Presenta múltiples lesiones sólidas profundas y palpables hiperqueratósicos intensamente pruriginosos en superficies extensoras. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto marrón más oscuro que la piel vecina y de contorno nítido; predominan en superficies externas de las extremidades.",
        "Paciente mujer de 56 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por seis meses de evolución progresiva. Con prurito crónico desarrolla lesiones sólidas profundas y palpables excoriados simétricos en brazos y piernas. En la inspección se observan lesiones sólidas profundas y palpables, de aspecto marrón más oscuro que la piel vecina y de contorno nítido; predominan en superficies externas de las extremidades."
    ],

    definicion:
        "Dermatosis neuroinflamatoria crónica caracterizada por nódulos intensamente pruriginosos.",

    lesion:
        "Nódulos hiperqueratósicos y excoriados.",

    clinica:
        "Prurito severo y ciclo persistente de rascado.",

    diagnostico:
        "Clínico, con evaluación de causas de prurito.",

    tratamiento:
        "Terapias tópicas, fototerapia y tratamientos sistémicos según gravedad.",

    diferencial:
        "Liquen simple crónico y otras dermatosis pruriginosas.",

    perla:
        "Nódulos pruriginosos excoriados en extensores."
},


{
    nombre: "Psoriasis guttata",

    busquedas: [
        "guttate psoriasis clinical photograph",
        "guttate psoriasis skin"
    ],

    morfologia: {
        lesion: "Pápula",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Generalizada"
    },

    casos: [
        "Paciente varón de 15 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por tres semanas de evolución. Desarrolla numerosas pequeñas lesiones descamativas en tronco después de faringitis. En la inspección se observan pequeñas elevaciones sólidas, de aspecto rojizas y de contorno nítido; se observan en varias regiones corporales.",
        "Paciente varón de 15 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por dos meses de evolución. Joven presenta erupción súbita de múltiples pequeñas elevaciones sólidas eritematodescamativas en forma de gotas. En la inspección se observan pequeñas elevaciones sólidas, de aspecto rojizas y de contorno nítido; se observan en varias regiones corporales."
    ],

    definicion:
        "Variante de psoriasis caracterizada por numerosas lesiones pequeñas, a menudo después de infección estreptocócica.",

    lesion:
        "Pequeñas pápulas o placas eritematodescamativas en forma de gota.",

    clinica:
        "Frecuente en jóvenes y puede seguir a faringitis.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Terapias tópicas, fototerapia y manejo individualizado.",

    diferencial:
        "Pitiriasis rosada y sífilis secundaria.",

    perla:
        "Psoriasis en gotas después de faringitis."
},


{
    nombre: "Psoriasis inversa",

    busquedas: [
        "inverse psoriasis clinical photograph",
        "flexural psoriasis clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Flexural"
    },

    casos: [
        "Paciente varón de 34 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por tres semanas de evolución. Con psoriasis conocida presenta áreas cutáneas sobreelevadas de superficie amplia rojas lisas y brillantes en axilas e ingles, con poca escama. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; predominan en pliegues de flexión.",
        "Paciente mujer de 51 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por dos meses de evolución. Presenta lesiones rojizas de contorno nítido en pliegues inframamarios y genitales. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de contorno nítido; predominan en pliegues de flexión."
    ],

    definicion:
        "Variante de psoriasis localizada en pliegues.",

    lesion:
        "Placas eritematosas lisas, brillantes y con poca descamación.",

    clinica:
        "Predomina en axilas, ingles, pliegues submamarios e interglúteos.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Terapias tópicas adaptadas a zonas intertriginosas.",

    diferencial:
        "Candidiasis, eritrasma y dermatitis de contacto.",

    perla:
        "Psoriasis de pliegues puede casi no tener escama."
},


{
    nombre: "Sífilis secundaria",

    busquedas: [
        "secondary syphilis rash clinical photograph",
        "secondary syphilis palms soles clinical"
    ],

    morfologia: {
        lesion: "Mácula",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Generalizada"
    },

    casos: [
        "Paciente varón de 24 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por cuatro días de evolución y progresión reciente. Presenta exantema generalizado no pruriginoso que compromete palmas y plantas. En la inspección se observan cambios planos de coloración, de aspecto rojizas y de contorno nítido; se observan en varias regiones corporales. Refiere adenopatías generalizadas y antecedente de una lesión genital indolora semanas antes. RPR reactivo 1:64 y prueba treponémica confirmatoria positiva.",
        "Paciente varón de 35 años acude al Servicio de Dermatología del Hospital Nacional Arzobispo Loayza por siete días de evolución. Con antecedente sexual de riesgo presenta lesiones maculopapulares difusas, adenopatías y compromiso palmoplantar. En la inspección se observan cambios planos de coloración, de aspecto rojizas y de contorno nítido; se observan en varias regiones corporales. Se encuentra afebril y hemodinámicamente estable. Presenta adenopatías cervicales e inguinales; VDRL reactivo y prueba treponémica positiva."
    ],

    definicion:
        "Fase sistémica de infección por Treponema pallidum.",

    lesion:
        "Exantema macular o papular de distribución generalizada.",

    clinica:
        "Puede comprometer palmas y plantas y asociarse con adenopatías.",

    diagnostico:
        "Pruebas treponémicas y no treponémicas.",

    tratamiento:
        "Penicilina benzatínica según estadio y guías clínicas.",

    diferencial:
        "Pitiriasis rosada, exantemas virales y psoriasis guttata.",

    perla:
        "Exantema palmoplantar debe hacer recordar sífilis secundaria."
},


{
    nombre: "Herpes zóster oftálmico",

    busquedas: [
        "herpes zoster ophthalmicus clinical photograph",
        "zoster ophthalmicus forehead clinical"
    ],

    morfologia: {
        lesion: "Vesícula",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Dermatomal"
    },

    casos: [
        "Paciente mujer de 72 años acude al Servicio de Dermatología del Hospital María Auxiliadora por cuatro días de evolución y progresión reciente. Presenta dolor y pequeñas elevaciones con contenido líquido claro en frente unilateral con compromiso de punta nasal. En la inspección se observan pequeñas elevaciones con contenido líquido claro, de aspecto rojizas y de contorno nítido; siguen una banda unilateral correspondiente a un territorio sensitivo. La agudeza visual está discretamente disminuida en el ojo afectado y refiere dolor ocular. Se observa compromiso de la punta nasal, por lo que se solicita valoración oftalmológica urgente.",
        "Paciente varón de 64 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por siete días de evolución. Presenta erupción vesicular dolorosa en territorio de la primera rama del trigémino. En la inspección se observan pequeñas elevaciones con contenido líquido claro, de aspecto rojizas y de contorno nítido; siguen una banda unilateral correspondiente a un territorio sensitivo. Presenta fotofobia y dolor ocular ipsilateral. La erupción respeta la línea media y compromete el territorio de la primera rama del trigémino."
    ],

    definicion:
        "Reactivación del virus varicela-zóster en la división oftálmica del trigémino.",

    lesion:
        "Vesículas agrupadas en territorio V1.",

    clinica:
        "Puede producir complicaciones oculares graves.",

    diagnostico:
        "Clínico, con valoración oftalmológica cuando existe riesgo ocular.",

    tratamiento:
        "Antivirales sistémicos tempranos y evaluación oftalmológica.",

    diferencial:
        "Herpes simple y dermatitis de contacto.",

    perla:
        "Lesión en punta nasal puede indicar afectación nasociliar y mayor riesgo ocular."
},


{
    nombre: "Ectima",

    busquedas: [
        "ecthyma clinical photograph",
        "ecthyma skin ulcer clinical"
    ],

    morfologia: {
        lesion: "Úlcera",
        color: "Eritematosa",
        borde: "Bien delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente varón de 31 años acude al Servicio de Dermatología del Hospital María Auxiliadora por cuatro días de evolución y progresión reciente. Presenta lesión costrosa profunda en pierna que al desprenderse revela una pérdida profunda de sustancia cutánea. En la inspección se observan pérdidas profundas de sustancia cutánea, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica.",
        "Paciente mujer de 55 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por siete días de evolución. En malas condiciones higiénicas presenta pérdidas profundas de sustancia cutánea superficiales cubiertas por costras gruesas. En la inspección se observan pérdidas profundas de sustancia cutánea, de aspecto rojizas y de contorno nítido; se limitan a una región anatómica."
    ],

    definicion:
        "Forma ulcerativa más profunda de infección bacteriana similar al impétigo.",

    lesion:
        "Úlcera superficial cubierta por costra gruesa.",

    clinica:
        "Frecuente en extremidades inferiores.",

    diagnostico:
        "Clínico; cultivo en casos seleccionados.",

    tratamiento:
        "Antibióticos con cobertura adecuada según gravedad.",

    diferencial:
        "Impétigo, úlceras vasculares y leishmaniasis cutánea.",

    perla:
        "Ectima es un impétigo más profundo y ulcerativo."
},


{
    nombre: "Onicomicosis",

    busquedas: [
        "onychomycosis clinical photograph toenail",
        "fungal nail infection clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Amarillenta",
        borde: "Mal delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 57 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por ocho meses de evolución con exacerbaciones periódicas. Presenta uña del primer dedo del pie engrosada, amarillo-dorada y quebradiza. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto amarillo-doradas y de transición gradual hacia la piel vecina; se limitan a una región anatómica.",
        "Paciente varón de 22 años acude al Servicio de Dermatología del Hospital Nacional Hipólito Unanue por seis meses de evolución progresiva. Presenta hiperqueratosis subungueal, decoloración y onicólisis progresiva. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto amarillo-doradas y de transición gradual hacia la piel vecina; se limitan a una región anatómica."
    ],

    definicion:
        "Infección fúngica de la unidad ungueal.",

    lesion:
        "Engrosamiento, decoloración, friabilidad y detritos subungueales.",

    clinica:
        "Más frecuente en uñas de pies.",

    diagnostico:
        "Confirmación micológica antes de terapia sistémica cuando sea posible.",

    tratamiento:
        "Antifúngicos tópicos o sistémicos según patrón, extensión y paciente.",

    diferencial:
        "Psoriasis ungueal y traumatismo.",

    perla:
        "No toda uña amarilla es hongo: conviene confirmación micológica."
},


{
    nombre: "Psoriasis ungueal",

    busquedas: [
        "nail psoriasis clinical photograph",
        "psoriatic nail pitting clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Amarillenta",
        borde: "Mal delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente varón de 22 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por ocho meses de evolución con exacerbaciones periódicas. Con psoriasis presenta múltiples depresiones puntiformes en lámina ungueal. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto amarillo-doradas y de transición gradual hacia la piel vecina; se limitan a una región anatómica.",
        "Paciente mujer de 48 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por seis meses de evolución progresiva. Presenta onicólisis y mancha de aceite junto con lesiones psoriásicas cutáneas. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto amarillo-doradas y de transición gradual hacia la piel vecina; se limitan a una región anatómica."
    ],

    definicion:
        "Compromiso ungueal de la psoriasis.",

    lesion:
        "Pitting, onicólisis, hiperqueratosis subungueal y manchas de aceite.",

    clinica:
        "Puede asociarse con artritis psoriásica.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Terapias tópicas o sistémicas según gravedad y psoriasis asociada.",

    diferencial:
        "Onicomicosis.",

    perla:
        "Pitting y mancha de aceite son pistas clásicas."
},


{
    nombre: "Intertrigo",

    busquedas: [
        "intertrigo clinical photograph",
        "intertriginous dermatitis clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Eritematosa",
        borde: "Mal delimitado",
        distribucion: "Flexural"
    },

    casos: [
        "Paciente mujer de 67 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por tres semanas de evolución. Obeso presenta enrojecimiento y maceración simétrica en pliegues abdominales por humedad y fricción. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de transición gradual hacia la piel vecina; predominan en pliegues de flexión.",
        "Paciente mujer de 25 años acude al Servicio de Dermatología del Hospital Nacional Daniel Alcides Carrión por dos meses de evolución. Presenta irritación dolorosa en pliegue submamario sin pequeñas elevaciones con contenido purulento satélite. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto rojizas y de transición gradual hacia la piel vecina; predominan en pliegues de flexión."
    ],

    definicion:
        "Inflamación de pliegues cutáneos causada por humedad, fricción y oclusión.",

    lesion:
        "Placa eritematosa y macerada.",

    clinica:
        "Puede complicarse con Candida o bacterias.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Mantener seco el pliegue, reducir fricción y tratar sobreinfecciones si existen.",

    diferencial:
        "Candidiasis, psoriasis inversa y eritrasma.",

    perla:
        "Primero piense en humedad y fricción; luego descarte sobreinfección."
},


{
    nombre: "Eritrasma",

    busquedas: [
        "erythrasma clinical photograph",
        "erythrasma groin clinical"
    ],

    morfologia: {
        lesion: "Placa",
        color: "Parduzca",
        borde: "Bien delimitado",
        distribucion: "Flexural"
    },

    casos: [
        "Paciente mujer de 49 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por tres semanas de evolución. Presenta área cutánea sobreelevada de superficie amplia marrón rojiza poco sintomática en pliegue inguinal. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto marrones y de contorno nítido; predominan en pliegues de flexión.",
        "Paciente varón de 60 años acude al Servicio de Dermatología del Hospital María Auxiliadora por dos meses de evolución. Con diabetes presenta lesiones marrones finamente descamativas en axilas. En la inspección se observan áreas sobreelevadas de superficie amplia, de aspecto marrones y de contorno nítido; predominan en pliegues de flexión."
    ],

    definicion:
        "Infección superficial por Corynebacterium minutissimum.",

    lesion:
        "Placas marrón-rojizas bien delimitadas con descamación fina.",

    clinica:
        "Predomina en pliegues.",

    diagnostico:
        "Lámpara de Wood puede mostrar fluorescencia coral-roja.",

    tratamiento:
        "Antibióticos tópicos o sistémicos según extensión.",

    diferencial:
        "Tiña cruris, candidiasis y psoriasis inversa.",

    perla:
        "Fluorescencia coral-roja con Wood."
},


{
    nombre: "Pitiriasis alba",

    busquedas: [
        "pityriasis alba clinical photograph",
        "pityriasis alba child face"
    ],

    morfologia: {
        lesion: "Mácula",
        color: "Hipopigmentada",
        borde: "Mal delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente varón de 12 años acude al Servicio de Dermatología del Hospital Nacional Dos de Mayo por tres semanas de evolución. Con piel seca presenta cambios planos de coloración más claras que la piel circundante de transición gradual hacia la piel vecina en mejillas. En la inspección se observan cambios planos de coloración, de aspecto más claras que la piel circundante y de transición gradual hacia la piel vecina; se limitan a una región anatómica. Se encuentra afebril, activo para la edad y hemodinámicamente estable, sin signos de compromiso sistémico.",
        "Paciente mujer de 11 años acude al Servicio de Dermatología del Instituto Nacional de Salud del Niño San Borja por dos meses de evolución. Presenta manchas claras faciales con fina descamación, más evidentes después del verano. En la inspección se observan cambios planos de coloración, de aspecto más claras que la piel circundante y de transición gradual hacia la piel vecina; se limitan a una región anatómica. Se encuentra afebril, activo para la edad y hemodinámicamente estable, sin signos de compromiso sistémico."
    ],

    definicion:
        "Trastorno benigno frecuente asociado con xerosis y atopia.",

    lesion:
        "Máculas hipopigmentadas mal delimitadas con descamación fina.",

    clinica:
        "Frecuente en cara de niños.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Emolientes y manejo de inflamación leve si existe.",

    diferencial:
        "Vitíligo y pitiriasis versicolor.",

    perla:
        "Pitiriasis alba es hipopigmentada y mal delimitada; vitíligo es acrómico y más definido."
},


{
    nombre: "Hiperpigmentación postinflamatoria",

    busquedas: [
        "post inflammatory hyperpigmentation clinical photograph",
        "postinflammatory hyperpigmentation skin"
    ],

    morfologia: {
        lesion: "Mácula",
        color: "Hiperpigmentada",
        borde: "Mal delimitado",
        distribucion: "Localizada"
    },

    casos: [
        "Paciente mujer de 26 años acude al Servicio de Dermatología del Hospital Nacional Edgardo Rebagliati Martins por ocho meses de evolución con exacerbaciones periódicas. Presenta manchas oscuras persistentes en sitios donde previamente tuvo acné inflamatorio. En la inspección se observan cambios planos de coloración, de aspecto marrón más oscuro que la piel vecina y de transición gradual hacia la piel vecina; se limitan a una región anatómica.",
        "Paciente mujer de 39 años acude al Servicio de Dermatología del Hospital Nacional Cayetano Heredia por seis meses de evolución progresiva. Después de un episodio de dermatitis, paciente conserva cambios planos de coloración marrones residuales. En la inspección se observan cambios planos de coloración, de aspecto marrón más oscuro que la piel vecina y de transición gradual hacia la piel vecina; se limitan a una región anatómica."
    ],

    definicion:
        "Aumento de pigmentación secundario a inflamación cutánea previa.",

    lesion:
        "Máculas o parches hiperpigmentados en áreas previamente inflamadas.",

    clinica:
        "Puede persistir meses.",

    diagnostico:
        "Clínico.",

    tratamiento:
        "Fotoprotección y manejo del proceso inflamatorio causal; despigmentantes según caso.",

    diferencial:
        "Melasma y otras hiperpigmentaciones.",

    perla:
        "La historia de una lesión inflamatoria previa es la pista."
}

];



// =========================================================
// GENERAR LOS 100 CASOS
// =========================================================

let preguntasOriginales = [];


enfermedades.forEach(enfermedad => {

    enfermedad.casos.forEach(caso => {

        preguntasOriginales.push({

            idCaso:
                preguntasOriginales.length + 1,

            enfermedad:
                enfermedad.nombre,

            busquedas:
                enfermedad.busquedas,

            morfologia:
                enfermedad.morfologia,

            caso:
                caso,

            definicion:
                enfermedad.definicion,

            lesion:
                enfermedad.lesion,

            clinica:
                enfermedad.clinica,

            diagnosticoInfo:
                enfermedad.diagnostico,

            tratamiento:
                enfermedad.tratamiento,

            diferencial:
                enfermedad.diferencial,

            perla:
                enfermedad.perla

        });

    });

});



// =========================================================
// ESTADO GENERAL
// =========================================================

let preguntas =
    mezclar([...preguntasOriginales]);


let indice = 0;

let aciertos = 0;

let errores = 0;

let respondida = false;


let seleccionLesion = null;

let seleccionColor = null;

let seleccionBorde = null;

let seleccionDistribucion = null;


let imagenesUsadas = new Set();

let consultaImagenActual = [];



// =========================================================
// FAVORITOS + BADBEAR.MED FIJA
// =========================================================

const CLAVE_FAVORITOS_DERMA =
    "badbear_derma_favoritos";

const CLAVE_SRS_DERMA =
    "badbear_derma_srs_v1";

function leerSRSDerma() {
    try {
        const valor = JSON.parse(localStorage.getItem(CLAVE_SRS_DERMA) || "{}");
        return valor && typeof valor === "object" && !Array.isArray(valor) ? valor : {};
    } catch (error) { return {}; }
}

function guardarSRSDerma(valor) {
    localStorage.setItem(CLAVE_SRS_DERMA, JSON.stringify(valor));
}

function asegurarSRSBancoDerma(pregunta, motivo = "repaso", forzarHoy = false) {
    if (!pregunta || !pregunta.idCaso) return;
    const srs = leerSRSDerma();
    const clave = `banco:${pregunta.idCaso}`;
    const ahora = Date.now();
    let item = srs[clave];

    if (!item) {
        item = {
            key: clave, tipo: "banco", id: pregunta.idCaso,
            titulo: pregunta.enfermedad, tema: pregunta.enfermedad,
            motivos: [motivo], etapa: 0, intervaloDias: 0,
            creadoEn: ahora, actualizadoEn: ahora, proximoEn: ahora,
            activo: true, aciertos: 0, fallos: 0,
            frente: pregunta.caso, respuesta: pregunta.enfermedad,
            explicacion: `${pregunta.lesion || ""} ${pregunta.diagnosticoInfo || ""}`.trim(),
            fija: pregunta.perla || "", href: `banco.html?caso=${pregunta.idCaso}`
        };
    } else {
        item.activo = true;
        item.actualizadoEn = ahora;
        item.motivos = Array.isArray(item.motivos) ? item.motivos : [];
        if (!item.motivos.includes(motivo)) item.motivos.push(motivo);
        if (forzarHoy && Number(item.proximoEn) > ahora) item.proximoEn = ahora;
    }

    srs[clave] = item;
    guardarSRSDerma(srs);
}

function asegurarNavRepeticionDerma() {
    const nav = document.querySelector(".nav-principal");
    if (!nav || nav.querySelector('a[href="repeticion.html"]')) return;
    const enlace = document.createElement("a");
    enlace.href = "repeticion.html";
    enlace.className = "nav-item";
    enlace.textContent = "Repetición";
    const repaso = nav.querySelector('a[href="repaso.html"]');
    if (repaso) nav.insertBefore(enlace, repaso); else nav.appendChild(enlace);
}

asegurarNavRepeticionDerma();


/* Cargar la nueva paleta también en Banco clínico */
if (
    !document.querySelector(
        'link[href="badbear-theme.css"]'
    )
) {

    const enlaceTema =
        document.createElement("link");

    enlaceTema.rel =
        "stylesheet";

    enlaceTema.href =
        "badbear-theme.css";

    document.head.appendChild(
        enlaceTema
    );

}


function leerFavoritosDerma() {

    try {

        const guardados =
            JSON.parse(
                localStorage.getItem(
                    CLAVE_FAVORITOS_DERMA
                )
            );

        return Array.isArray(guardados)
            ? guardados
            : [];

    }
    catch(error) {

        return [];

    }

}


function guardarFavoritosDerma(
    favoritos
) {

    localStorage.setItem(
        CLAVE_FAVORITOS_DERMA,
        JSON.stringify(favoritos)
    );

}


function claveFavoritoDerma(
    tipo,
    id
) {

    return `${tipo}:${id}`;

}


function estaEnFavoritosDerma(
    tipo,
    id
) {

    const clave =
        claveFavoritoDerma(
            tipo,
            id
        );

    return leerFavoritosDerma()
        .some(
            item =>
                item &&
                claveFavoritoDerma(
                    item.tipo,
                    item.id
                ) === clave
        );

}


function alternarFavoritoDerma(
    item
) {

    let favoritos =
        leerFavoritosDerma();

    const clave =
        claveFavoritoDerma(
            item.tipo,
            item.id
        );

    const posicion =
        favoritos.findIndex(
            favorito =>
                favorito &&
                claveFavoritoDerma(
                    favorito.tipo,
                    favorito.id
                ) === clave
        );


    if (
        posicion >= 0
    ) {

        favoritos.splice(
            posicion,
            1
        );

        guardarFavoritosDerma(
            favoritos
        );

        return false;

    }


    favoritos.unshift({
        ...item,
        guardadoEn:
            Date.now()
    });


    guardarFavoritosDerma(
        favoritos
    );

    return true;

}


function asegurarBotonFavoritoBanco(
    pregunta
) {

    const explicacion =
        document.getElementById(
            "explicacion"
        );

    if (
        !explicacion
    ) {

        return;

    }


    const perla =
        explicacion.querySelector(
            ".perla"
        );

    if (
        perla
    ) {

        const titulo =
            perla.querySelector("h3");

        if (
            titulo
        ) {

            titulo.textContent =
                "BADBEAR.MED FIJA:";

        }

    }


    let boton =
        document.getElementById(
            "btn-favorito-banco"
        );


    if (
        !boton
    ) {

        boton =
            document.createElement(
                "button"
            );

        boton.id =
            "btn-favorito-banco";

        boton.type =
            "button";

        boton.className =
            "bb-favorito-btn";


        const siguiente =
            document.getElementById(
                "btn-siguiente"
            );


        if (
            siguiente &&
            siguiente.parentNode
        ) {

            siguiente.parentNode
                .insertBefore(
                    boton,
                    siguiente
                );

        }
        else {

            explicacion.appendChild(
                boton
            );

        }

    }


    const actualizar =
        () => {

            const guardado =
                estaEnFavoritosDerma(
                    "banco",
                    pregunta.idCaso
                );

            boton.classList.toggle(
                "guardado",
                guardado
            );

            boton.textContent =
                guardado
                    ? "★ Guardado en favoritos"
                    : "☆ Guardar caso + FIJA";

        };


    boton.onclick =
        () => {

            const guardado = alternarFavoritoDerma({

                tipo:
                    "banco",

                id:
                    pregunta.idCaso,

                titulo:
                    pregunta.enfermedad,

                subtitulo:
                    `Caso clínico ${pregunta.idCaso}`,

                pregunta:
                    pregunta.caso,

                fija:
                    pregunta.perla,

                tema:
                    pregunta.enfermedad

            });

            if (guardado) {
                asegurarSRSBancoDerma(pregunta, "FIJA", false);
            }

            actualizar();

        };


    actualizar();

}




// =========================================================
// RENDIMIENTO POR TEMA · BANCO CLÍNICO
// =========================================================

const CLAVE_BANCO_TEMAS =
    "badbear_derma_banco_temas";

const CLAVE_EXAMEN_TEMAS =
    "badbear_derma_examen_temas";

const CLAVE_TEMAS_DEBILES =
    "badbear_derma_temas_debiles";

const CLAVE_HISTORIAL_TEMAS =
    "badbear_derma_historial_temas_v1";

function registrarSnapshotTemasDerma() {

    const compactar = objeto => {
        const salida = {};
        Object.entries(objeto || {}).forEach(([clave, item]) => {
            if (!item) return;
            salida[clave] = {
                tema: item.tema || clave,
                respondidas: Number(item.respondidas) || 0,
                rendimiento: Number(item.rendimiento) || 0
            };
        });
        return salida;
    };

    const examen = compactar(leerObjetoLocal(CLAVE_EXAMEN_TEMAS));
    const banco = compactar(leerObjetoLocal(CLAVE_BANCO_TEMAS));

    if (!Object.keys(examen).length && !Object.keys(banco).length) return;

    let historial = [];
    try {
        const guardado = JSON.parse(localStorage.getItem(CLAVE_HISTORIAL_TEMAS) || "[]");
        historial = Array.isArray(guardado) ? guardado : [];
    } catch (error) { historial = []; }

    const firma = JSON.stringify({examen, banco});
    if (historial[0] && historial[0].firma === firma) return;

    historial.unshift({fecha: Date.now(), examen, banco, firma});
    localStorage.setItem(CLAVE_HISTORIAL_TEMAS, JSON.stringify(historial.slice(0,80)));
}


function categoriaBancoDerma(
    enfermedad
) {

    const grupos = {

        "Inflamatorias y eccematosas": [
            "Psoriasis en placas",
            "Psoriasis guttata",
            "Psoriasis inversa",
            "Psoriasis ungueal",
            "Dermatitis atópica",
            "Dermatitis seborreica",
            "Dermatitis de contacto alérgica",
            "Liquen plano",
            "Pitiriasis rosada",
            "Urticaria",
            "Granuloma anular",
            "Eczema numular",
            "Liquen simple crónico",
            "Prúrigo nodular",
            "Pitiriasis alba",
            "Intertrigo"
        ],

        "Bacterianas": [
            "Impétigo",
            "Erisipela",
            "Celulitis",
            "Foliculitis bacteriana",
            "Ectima",
            "Eritrasma",
            "Sífilis secundaria"
        ],

        "Virales": [
            "Herpes simple",
            "Herpes zóster",
            "Herpes zóster oftálmico",
            "Molusco contagioso",
            "Verruga vulgar"
        ],

        "Micóticas": [
            "Tiña corporis",
            "Tiña cruris",
            "Tiña pedis",
            "Tiña capitis",
            "Pitiriasis versicolor",
            "Candidiasis cutánea",
            "Onicomicosis"
        ],

        "Parasitarias": [
            "Escabiosis",
            "Larva migrans cutánea"
        ],

        "Ampollosas autoinmunes": [
            "Pénfigo vulgar",
            "Pénfigo foliáceo",
            "Penfigoide ampolloso",
            "Dermatitis herpetiforme"
        ],

        "Pigmentarias y anexos": [
            "Vitíligo",
            "Melasma",
            "Hiperpigmentación postinflamatoria",
            "Acné vulgar",
            "Rosácea",
            "Hidradenitis supurativa",
            "Alopecia areata"
        ],

        "Autoinmunes y sistémicas": [
            "Eritema multiforme",
            "Eritema nodoso",
            "Lupus cutáneo discoide",
            "Dermatomiositis",
            "Esclerodermia localizada",
            "Púrpura",
            "Petequias"
        ],

        "Tumores y lesiones benignas": [
            "Queratosis seborreica",
            "Queratosis actínica",
            "Carcinoma basocelular",
            "Carcinoma epidermoide cutáneo",
            "Melanoma",
            "Nevo melanocítico",
            "Dermatofibroma",
            "Acrocordón",
            "Hemangioma infantil",
            "Nevus simplex",
            "Malformación capilar tipo vino de Oporto"
        ]

    };


    for (
        const [categoria, enfermedadesGrupo]
        of Object.entries(grupos)
    ) {

        if (
            enfermedadesGrupo.includes(
                enfermedad
            )
        ) {

            return categoria;

        }

    }


    return "Otros temas dermatológicos";

}


function leerObjetoLocal(
    clave
) {

    try {

        const valor =
            JSON.parse(
                localStorage.getItem(
                    clave
                ) || "{}"
            );

        return valor &&
            typeof valor === "object" &&
            !Array.isArray(valor)
            ? valor
            : {};

    }
    catch(error) {

        return {};

    }

}


function recalcularTemasDebilesDerma() {

    const banco =
        leerObjetoLocal(
            CLAVE_BANCO_TEMAS
        );

    const examen =
        leerObjetoLocal(
            CLAVE_EXAMEN_TEMAS
        );

    const debiles = [];


    Object.values(banco)
        .forEach(item => {

            if (
                item &&
                Number(item.respondidas) >= 2 &&
                Number(item.rendimiento) < 60
            ) {

                debiles.push({
                    fuente: "Banco clínico",
                    tema: item.tema,
                    respondidas: Number(item.respondidas) || 0,
                    correctas: Number(item.correctas) || 0,
                    rendimiento: Number(item.rendimiento) || 0
                });

            }

        });


    Object.values(examen)
        .forEach(item => {

            if (
                item &&
                Number(item.respondidas) >= 3 &&
                Number(item.rendimiento) < 60
            ) {

                debiles.push({
                    fuente: "Exámenes pasados",
                    tema: item.tema,
                    respondidas: Number(item.respondidas) || 0,
                    correctas: Number(item.dominadas) || Number(item.correctas) || 0,
                    rendimiento: Number(item.rendimiento) || 0
                });

            }

        });


    debiles.sort(
        (a, b) =>
            a.rendimiento -
            b.rendimiento
    );


    localStorage.setItem(
        CLAVE_TEMAS_DEBILES,
        JSON.stringify(debiles)
    );

}


function registrarRendimientoBanco(
    pregunta,
    correcta
) {

    const estadisticas =
        leerObjetoLocal(
            CLAVE_BANCO_TEMAS
        );

    const tema =
        categoriaBancoDerma(
            pregunta.enfermedad
        );

    const actual =
        estadisticas[tema] || {
            tema: tema,
            respondidas: 0,
            correctas: 0,
            rendimiento: 0
        };


    actual.respondidas =
        Number(actual.respondidas || 0) + 1;

    if (
        correcta
    ) {

        actual.correctas =
            Number(actual.correctas || 0) + 1;

    }

    actual.rendimiento =
        Math.round(
            (
                Number(actual.correctas || 0) /
                actual.respondidas
            ) * 100
        );

    actual.actualizadoEn =
        Date.now();

    estadisticas[tema] =
        actual;


    localStorage.setItem(
        CLAVE_BANCO_TEMAS,
        JSON.stringify(estadisticas)
    );


    recalcularTemasDebilesDerma();
    registrarSnapshotTemasDerma();

}


// =========================================================
// ABRIR UN CASO GUARDADO DESDE REPASO
// =========================================================

const parametrosBanco =
    new URLSearchParams(
        window.location.search
    );

const casoSolicitadoBanco =
    Number(
        parametrosBanco.get("caso")
    );


if (
    Number.isInteger(
        casoSolicitadoBanco
    ) &&
    casoSolicitadoBanco > 0
) {

    const posicionCaso =
        preguntas.findIndex(
            pregunta =>
                pregunta.idCaso ===
                casoSolicitadoBanco
        );


    if (
        posicionCaso >= 0
    ) {

        indice =
            posicionCaso;

    }

}



// =========================================================
// UTILIDADES
// =========================================================

function mezclar(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }


    return array;
}



function generarAlternativas(
    correcta,
    banco,
    cantidad = 4
) {

    let distractores =
        banco.filter(
            item =>
                item !== correcta
        );


    distractores =
        mezclar([...distractores]);


    distractores =
        distractores.slice(
            0,
            cantidad - 1
        );


    distractores.push(
        correcta
    );


    return mezclar(
        distractores
    );
}



// =========================================================
// ALTERNATIVAS DIAGNÓSTICAS
// =========================================================

function generarDiagnosticos(
    respuestaCorrecta
) {

    let nombres =
        enfermedades
        .map(e => e.nombre)
        .filter(
            nombre =>
                nombre !==
                respuestaCorrecta
        );


    nombres =
        mezclar([...nombres]);


    let alternativas =
        nombres.slice(0, 3);


    alternativas.push(
        respuestaCorrecta
    );


    return mezclar(
        alternativas
    );
}



// =========================================================
// BÚSQUEDA DE IMÁGENES EN WIKIMEDIA COMMONS
// =========================================================

async function obtenerImagenesWikimedia(termino) {

    console.log("BUSCANDO EN WIKIMEDIA:", termino);

    // Quitar palabras auxiliares para dejar el nombre médico
    let terminoBase = termino
        .replace(/clinical photograph/gi, "")
        .replace(/skin lesion/gi, "")
        .replace(/patient/gi, "")
        .replace(/clinical/gi, "")
        .trim();


    // =====================================================
    // 1. PRIMER INTENTO: BUSCAR EN CATEGORÍA ESPECÍFICA
    // =====================================================

    const parametrosCategoria =
        new URLSearchParams({

            action: "query",
            format: "json",
            origin: "*",

            generator: "categorymembers",

            gcmtitle:
                "Category:" + terminoBase,

            gcmtype: "file",

            gcmlimit: "50",

            prop: "imageinfo",

            iiprop:
                "url|mime|size",

            iiurlwidth: "1200"

        });


    const urlCategoria =
        "https://commons.wikimedia.org/w/api.php?" +
        parametrosCategoria.toString();


    try {

        let respuesta =
            await fetch(urlCategoria);

        let datos =
            await respuesta.json();

        let resultados =
            procesarResultadosWikimedia(datos);


        console.log(
            "RESULTADOS EN CATEGORÍA:",
            resultados.length
        );


        if (resultados.length > 0) {

            return resultados;
        }


        // =================================================
        // 2. RESPALDO: BÚSQUEDA NORMAL
        // =================================================

        console.log(
            "Categoría vacía. Probando búsqueda normal..."
        );


        const parametrosBusqueda =
            new URLSearchParams({

                action: "query",
                format: "json",
                origin: "*",

                generator: "search",

                gsrsearch:
                    `"${terminoBase}"`,

                gsrnamespace: "6",

                gsrlimit: "40",

                prop: "imageinfo",

                iiprop:
                    "url|mime|size",

                iiurlwidth: "1200"

            });


        const urlBusqueda =
            "https://commons.wikimedia.org/w/api.php?" +
            parametrosBusqueda.toString();


        respuesta =
            await fetch(urlBusqueda);

        datos =
            await respuesta.json();


        resultados =
            procesarResultadosWikimedia(datos);


        console.log(
            "RESULTADOS BÚSQUEDA NORMAL:",
            resultados.length
        );


        return resultados;

    }

    catch (error) {

        console.error(
            "ERROR WIKIMEDIA:",
            error
        );

        return [];
    }
}



// =========================================================
// PROCESAR Y FILTRAR ARCHIVOS DE WIKIMEDIA
// =========================================================

function procesarResultadosWikimedia(datos) {

    if (
        !datos.query ||
        !datos.query.pages
    ) {

        return [];
    }


    const paginas =
        Object.values(
            datos.query.pages
        );


    const palabrasProhibidas = [

        "book",
        "journal",
        "volume",
        "page",
        "pages",
        "plate",
        "atlas",

        "handbook",
        "textbook",
        "treatise",

        "illustration",
        "illustrated",
        "drawing",
        "diagram",

        "scheme",
        "schematic",

        "histology",
        "histopathology",
        "micrograph",
        "microscopy",

        "figure",
        "fig.",

        "cover",
        "contents",

        "archive",
        "document",

        "poster",
        "presentation",
        "treatment",
"therapy",
"laser",
"device",
"procedure",
"equipment",
"machine",
"surgery",
"before and after",
"before-and-after",

        "graph",
        "chart",
        "map",

        "logo",
        "icon",

        "wellcome",
        "welcome",

        "museum",

        "research",
        "study",
        "review",

        "mechanism",
        "pathway",

        "cytokine",
        "receptor",
        "protein",
        "gene",

        "immune system",

        "1890",
        "1891",
        "1892",
        "1893",
        "1894",
        "1895",
        "1896",
        "1897",
        "1898",
        "1899",

        "1900",
        "1901",
        "1902",
        "1903",
        "1904",
        "1905",
        "1910",
        "1920"

    ];


    const resultados = [];


    paginas.forEach(pagina => {

        if (
            !pagina.imageinfo ||
            !pagina.imageinfo[0]
        ) {

            return;
        }


        const info =
            pagina.imageinfo[0];


        const titulo =
            (pagina.title || "")
            .toLowerCase();


        // ---------------------------------------------
        // DESCARTAR MATERIAL HISTÓRICO / DIDÁCTICO
        // ---------------------------------------------

        const prohibido =
            palabrasProhibidas.some(
                palabra =>
                    titulo.includes(palabra)
            );


        if (prohibido) {

            console.log(
                "DESCARTADA:",
                pagina.title
            );

            return;
        }


        // ---------------------------------------------
        // SOLO JPEG / PNG / WEBP
        // ---------------------------------------------

        const urlImagen =
            info.thumburl ||
            info.url;


        if (!urlImagen) {

            return;
        }


        const urlMinuscula =
            urlImagen.toLowerCase();


        if (
            !urlMinuscula.includes(".jpg") &&
            !urlMinuscula.includes(".jpeg") &&
            !urlMinuscula.includes(".png") &&
            !urlMinuscula.includes(".webp")
        ) {

            return;
        }


        // ---------------------------------------------
        // EVITAR IMÁGENES DEMASIADO PEQUEÑAS
        // ---------------------------------------------

        if (
            info.width &&
            info.width < 300
        ) {

            return;
        }


        if (
            info.height &&
            info.height < 300
        ) {

            return;
        }


        resultados.push({

            url:
                urlImagen,

            pagina:
                info.descriptionurl ||
                "https://commons.wikimedia.org",

            titulo:
                pagina.title

        });

    });


    return resultados;
}



// =========================================================
// CARGAR FOTO REAL
// =========================================================

async function cargarImagenWeb(forzarCambio = false) {

    const pregunta = preguntas[indice];

    const imagen =
        document.getElementById("imagen-enfermedad");

    const cargando =
        document.getElementById("cargando-imagen");

    const fuente =
        document.getElementById("fuente-imagen");


    imagen.style.display = "none";
    imagen.removeAttribute("src");

    cargando.style.display = "block";
    cargando.textContent =
        "Buscando fotografía dermatológica...";

    fuente.innerHTML = "";


    // =====================================================
    // OBTENER TÉRMINOS MÉDICOS ÚTILES
    // =====================================================

    const palabrasIgnoradas = [

        "clinical",
        "photograph",
        "photo",
        "skin",
        "cutaneous",
        "dermatology",
        "dermatological",
        "patient",
        "lesion",
        "disease"
    ];


    function limpiarTermino(texto) {

        return texto
            .toLowerCase()
            .replace(/[áàäâ]/g, "a")
            .replace(/[éèëê]/g, "e")
            .replace(/[íìïî]/g, "i")
            .replace(/[óòöô]/g, "o")
            .replace(/[úùüû]/g, "u")
            .replace(/ñ/g, "n")
            .replace(/[^a-z0-9\s-]/g, " ")
            .split(/\s+/)
            .filter(palabra =>
                palabra.length >= 4 &&
                !palabrasIgnoradas.includes(palabra)
            );
    }


    // =====================================================
    // CREAR CONSULTAS
    // =====================================================

let consultas = [];

// 1. PRIORIDAD: SINÓNIMOS CENTRALIZADOS
if (
    sinonimosImagen[pregunta.enfermedad]
) {

    sinonimosImagen[pregunta.enfermedad]
        .forEach(termino => {

            consultas.push(
                `${termino} clinical photograph`
            );

            consultas.push(
                `${termino} skin lesion`
            );

            consultas.push(
                `${termino} patient`
            );

        });
}


// 2. RESPALDO: BÚSQUEDAS PROPIAS DEL CASO
if (
    pregunta.busquedas &&
    pregunta.busquedas.length > 0
) {

    consultas.push(
        ...pregunta.busquedas
    );
}


// 3. ÚLTIMO RESPALDO
consultas.push(
    pregunta.enfermedad
);


// 4. ELIMINAR DUPLICADOS
consultas =
    [...new Set(consultas)];


    // =====================================================
    // PALABRAS QUE DEBEN APARECER EN EL RESULTADO
    // =====================================================

 let palabrasClave = [];


// 1. NOMBRE ORIGINAL
palabrasClave.push(
    ...limpiarTermino(
        pregunta.enfermedad
    )
);


// 2. SINÓNIMOS CENTRALIZADOS
if (
    sinonimosImagen[pregunta.enfermedad]
) {

    sinonimosImagen[pregunta.enfermedad]
        .forEach(termino => {

            palabrasClave.push(
                ...limpiarTermino(
                    termino
                )
            );

        });

}


// 3. BÚSQUEDAS DEL CASO
if (
    pregunta.busquedas &&
    pregunta.busquedas.length > 0
) {

    pregunta.busquedas.forEach(
        busqueda => {

            palabrasClave.push(
                ...limpiarTermino(
                    busqueda
                )
            );

        }
    );

}


// 4. ELIMINAR DUPLICADOS
palabrasClave =
    [...new Set(palabrasClave)];


console.log(
    "PALABRAS CLAVE:",
    palabrasClave
);

    // =====================================================
    // MATERIAL QUE NO QUEREMOS
    // =====================================================

const prohibidas = [

    "book",
    "journal",
    "magazine",
    "newspaper",

    "volume",
    "contents",
    "index",
    "cover",
    "title page",

    "archive",
    "document",
    "manuscript",

    "poster",
    "presentation",

    "diagram",
    "drawing",
    "illustration",
    "illustrated",
    "painting",
    "engraving",
    "infographic",
"infographics",
"educational",
"education",
"types of",
"classification",
"comparison",
"comparative",
"overview",
"vector",
"cartoon",
"animation",
"template",
"medical illustration",

    "histology",
    "histopathology",
    "microscope",
    "microscopy",
    "micrograph",

    "radiograph",
    "x-ray",
    "mri",
    "ct scan",

    "logo",
    "icon",
    "map",
    "chart",
    "graph",

    "museum",
    "building",
    "hospital",

    "radium",

    "pdf",
    "djvu",
    "scan",

    "plate",
    "fig",
    "figure",
    "atlas",
    "treatise",
    "handbook",
    "reference",
    "students",
    "practitioners",
    "1897",
    "1901",
    "1910",
    "1920",
    "wellcome",
    "welcome",
    "illustrated",
    "colour plate",
    "color plate",
    "immune system",
"immune",
"immunity",
"pathway",
"pathways",
"pathogenesis",
"mechanism",
"mechanisms",
"modulation",
"cytokine",
"cytokines",
"interleukin",
"receptor",
"receptors",
"cell signaling",
"signaling",
"molecular",
"protein",
"proteins",
"gene",
"genes",
"expression",
"model",
"models",
"concept",
"conceptual",
"overview",
"proposed",
"potential role",
"role of",
"research",
"study",
"studies",
"review",
"flowchart",
"workflow",
"algorithm",
"schematic",
"infographic"
];


    // =====================================================
    // BUSCAR
    // =====================================================

    let imagenesValidas = [];


    for (const consulta of consultas) {

        console.log(
            "PROBANDO:",
            consulta
        );


        const resultados =
            await obtenerImagenesWikimedia(
                consulta
            );


        console.log(
            "RESULTADOS RECIBIDOS:",
            resultados.length
        );


        const filtrados =
            resultados.filter(resultado => {

                const titulo =
                    (resultado.titulo || "")
                    .toLowerCase()
                    .replace(/[áàäâ]/g, "a")
                    .replace(/[éèëê]/g, "e")
                    .replace(/[íìïî]/g, "i")
                    .replace(/[óòöô]/g, "o")
                    .replace(/[úùüû]/g, "u")
                    .replace(/ñ/g, "n");


                // ------------------------------------------
                // RECHAZAR MATERIAL NO CLÍNICO
                // ------------------------------------------

                const esProhibida =
                    prohibidas.some(
                        palabra =>
                            titulo.includes(
                                palabra
                            )
                    );


                if (esProhibida) {

                    console.log(
                        "DESCARTADA:",
                        resultado.titulo
                    );

                    return false;
                }


                // ------------------------------------------
                // EXIGIR RELACIÓN CON LA ENFERMEDAD
                // ------------------------------------------

               // =====================================================
// CALCULAR PUNTAJE DE RELACIÓN CON EL DIAGNÓSTICO
// =====================================================

const coincidencias =
    palabrasClave.filter(
        palabra =>
            titulo.includes(palabra)
    );


let puntaje = 0;


// Cada término médico coincidente suma 2 puntos
puntaje +=
    coincidencias.length * 2;


// Palabras que favorecen fotografía dermatológica
const palabrasClinicas = [

    "skin",
    "cutaneous",
    "lesion",
    "rash",
    "dermatology",
    "clinical",
    "patient",

    "papule",
    "plaque",
    "vesicle",
    "blister",
    "pustule",
    "nodule",

    "face",
    "hand",
    "foot",
    "arm",
    "leg",
    "scalp"

];


palabrasClinicas.forEach(
    palabra => {

        if (
            titulo.includes(palabra)
        ) {

            puntaje += 1;

        }

    }
);


// Mostrar el puntaje en consola
console.log(
    "EVALUANDO:",
    resultado.titulo,
    "PUNTAJE:",
    puntaje,
    "COINCIDENCIAS:",
    coincidencias
);


// =====================================================
// EXIGIR RELACIÓN MÍNIMA
// =====================================================

if (
    coincidencias.length === 0
) {

    return false;

}


// Requerimos por lo menos 3 puntos
if (
    puntaje < 3
) {

    return false;

}


                // ------------------------------------------
                // EVITAR IMÁGENES YA UTILIZADAS
                // ------------------------------------------

                if (
                    imagenesUsadas.has(
                        resultado.url
                    )
                ) {

                    return false;
                }


                return true;

            });


        console.log(
            "FOTOS CLÍNICAS VÁLIDAS:",
            filtrados.length
        );


        if (
            filtrados.length > 0
        ) {

            imagenesValidas =
                filtrados;

            break;
        }

    }


    // =====================================================
    // SI NO EXISTE UNA FOTO SEGURA
    // =====================================================

    if (
        imagenesValidas.length === 0
    ) {

        cargando.textContent =
            "No encontré una fotografía suficientemente fiable para este diagnóstico.";

        fuente.innerHTML =
            "El caso puede responderse sin imagen.";

        console.warn(
            "SIN FOTO CLÍNICA VALIDADA:",
            pregunta.enfermedad
        );

        return;
    }


    // =====================================================
    // ESCOGER FOTO
    // =====================================================

    const elegida =
        imagenesValidas[
            Math.floor(
                Math.random() *
                imagenesValidas.length
            )
        ];


    console.log(
        "FOTO FINAL:",
        elegida
    );


    imagenesUsadas.add(
        elegida.url
    );


    // =====================================================
    // CARGAR
    // =====================================================

    imagen.onload =
        function () {

            cargando.style.display =
                "none";

            imagen.style.display =
                "block";


            console.log(
                "✓ IMAGEN VALIDADA Y CARGADA"
            );
        };


    imagen.onerror =
        function () {

            imagen.style.display =
                "none";

            cargando.style.display =
                "block";

            cargando.textContent =
                "La fotografía seleccionada no pudo cargarse.";

        };


    imagen.src =
        elegida.url;


    fuente.innerHTML = `

        Fuente:
        <a
            href="${elegida.pagina}"
            target="_blank"
            rel="noopener noreferrer"
        >
            Wikimedia Commons
        </a>

    `;
}



// =========================================================
// BOTONES MORFOLÓGICOS
// =========================================================

function crearOpcionesDescriptivas(
    idContenedor,
    opciones,
    tipo
) {

    const contenedor =
        document.getElementById(
            idContenedor
        );


    contenedor.innerHTML =
        "";


    opciones.forEach(texto => {

        const boton =
            document.createElement(
                "button"
            );


        boton.className =
            "opcion-descriptiva";


        boton.textContent =
            texto;


        boton.addEventListener(
            "click",
            function() {

                if (
                    respondida
                ) {

                    return;

                }


                contenedor
                    .querySelectorAll(
                        ".opcion-descriptiva"
                    )
                    .forEach(b => {

                        b.classList.remove(
                            "seleccionada"
                        );

                    });


                boton.classList.add(
                    "seleccionada"
                );


                if (
                    tipo ===
                    "lesion"
                ) {

                    seleccionLesion =
                        texto;

                }


                if (
                    tipo ===
                    "color"
                ) {

                    seleccionColor =
                        texto;

                }


                if (
                    tipo ===
                    "borde"
                ) {

                    seleccionBorde =
                        texto;

                }


                if (
                    tipo ===
                    "distribucion"
                ) {

                    seleccionDistribucion =
                        texto;

                }

            }
        );


        contenedor.appendChild(
            boton
        );

    });

}



// =========================================================
// CARGAR CASO
// =========================================================

function cargarPregunta() {

    respondida =
        false;


    seleccionLesion =
        null;

    seleccionColor =
        null;

    seleccionBorde =
        null;

    seleccionDistribucion =
        null;


    const p =
        preguntas[indice];


    document.getElementById(
        "caso-clinico"
    ).textContent =
        p.caso;


    document.getElementById(
        "contador-caso"
    ).textContent =
        `Caso ${indice + 1}`;


    document.getElementById(
        "contador-total"
    ).textContent =
        `${indice + 1} / ${preguntas.length}`;


    document.getElementById(
        "barra-progreso"
    ).style.width =
        `${
            (
                (indice + 1) /
                preguntas.length
            ) * 100
        }%`;


    crearOpcionesDescriptivas(

        "opciones-lesion",

        generarAlternativas(
            p.morfologia.lesion,
            bancoLesiones
        ),

        "lesion"

    );


    crearOpcionesDescriptivas(

        "opciones-color",

        generarAlternativas(
            p.morfologia.color,
            bancoColores
        ),

        "color"

    );


    crearOpcionesDescriptivas(

        "opciones-borde",

        generarAlternativas(
            p.morfologia.borde,
            bancoBordes
        ),

        "borde"

    );


    crearOpcionesDescriptivas(

        "opciones-distribucion",

        generarAlternativas(
            p.morfologia.distribucion,
            bancoDistribuciones
        ),

        "distribucion"

    );


    const diagnosticos =
        generarDiagnosticos(
            p.enfermedad
        );


    const opciones =
        document.getElementById(
            "opciones"
        );


    opciones.innerHTML =
        "";


    diagnosticos.forEach(
        (diagnostico, posicion) => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.className =
                "opcion";


            boton.textContent =
                `${String.fromCharCode(
                    65 + posicion
                )}. ${diagnostico}`;


            boton.addEventListener(
                "click",
                function() {

                    responder(
                        diagnostico,
                        boton
                    );

                }
            );


            opciones.appendChild(
                boton
            );

        }
    );


    document
        .getElementById(
            "explicacion"
        )
        .classList.add(
            "oculto"
        );


    cargarImagenWeb();

}



// =========================================================
// RESPONDER
// =========================================================

function responder(
    diagnosticoSeleccionado,
    botonSeleccionado
) {

    if (
        respondida
    ) {

        return;

    }


    if (
        !seleccionLesion ||
        !seleccionColor ||
        !seleccionBorde ||
        !seleccionDistribucion
    ) {

        alert(
            "Primero debes completar lesión, color, bordes y distribución."
        );


        return;

    }


    respondida =
        true;


    const p =
        preguntas[indice];


    const respuestaCorrectaTema =
        diagnosticoSeleccionado ===
        p.enfermedad;

    registrarRendimientoBanco(
        p,
        respuestaCorrectaTema
    );

    if (!respuestaCorrectaTema) {
        asegurarSRSBancoDerma(p, "error", true);
    }


    const botonesDiagnostico =
        document.querySelectorAll(
            ".opcion"
        );


    botonesDiagnostico.forEach(
        boton => {

            boton.disabled =
                true;


            const texto =
                boton.textContent
                .substring(3);


            if (
                texto ===
                p.enfermedad
            ) {

                boton.classList.add(
                    "correcta"
                );

            }

        }
    );


    const mensaje =
        document.getElementById(
            "mensaje-respuesta"
        );


    if (
        diagnosticoSeleccionado ===
        p.enfermedad
    ) {

        aciertos++;
let casosGuardados =
    Number(localStorage.getItem("badbear_derma_casos")) || 0;

let correctasGuardadas =
    Number(localStorage.getItem("badbear_derma_correctas")) || 0;

casosGuardados++;
correctasGuardadas++;

localStorage.setItem(
    "badbear_derma_casos",
    casosGuardados
);

localStorage.setItem(
    "badbear_derma_correctas",
    correctasGuardadas
);

        mensaje.className =
            "mensaje-correcto";


        mensaje.textContent =
            "✓ Diagnóstico correcto";

    }

    else {

        let casosGuardados =
    Number(localStorage.getItem("badbear_derma_casos")) || 0;

casosGuardados++;

localStorage.setItem(
    "badbear_derma_casos",
    casosGuardados
);

        errores++;


        botonSeleccionado
            .classList.add(
                "incorrecta"
            );


        mensaje.className =
            "mensaje-incorrecto";


        mensaje.textContent =
            `✗ Diagnóstico incorrecto. La respuesta correcta es: ${p.enfermedad}`;

    }


const scoreElemento =
    document.getElementById("score");

const errorsElemento =
    document.getElementById("errors");


if (scoreElemento) {
    scoreElemento.textContent = aciertos;
}

if (errorsElemento) {
    errorsElemento.textContent = errores;
}


    corregirGrupo(

        "opciones-lesion",

        seleccionLesion,

        p.morfologia.lesion

    );


    corregirGrupo(

        "opciones-color",

        seleccionColor,

        p.morfologia.color

    );


    corregirGrupo(

        "opciones-borde",

        seleccionBorde,

        p.morfologia.borde

    );


    corregirGrupo(

        "opciones-distribucion",

        seleccionDistribucion,

        p.morfologia.distribucion

    );


    document.getElementById(
        "diagnostico"
    ).textContent =
        p.enfermedad;


    document.getElementById(
        "definicion"
    ).textContent =
        p.definicion;


    document.getElementById(
        "lesion"
    ).textContent =
        p.lesion;


    document.getElementById(
        "clinica"
    ).textContent =
        p.clinica;


    document.getElementById(
        "diagnostico-info"
    ).textContent =
        p.diagnosticoInfo;


    document.getElementById(
        "tratamiento"
    ).textContent =
        p.tratamiento;


    document.getElementById(
        "diferencial"
    ).textContent =
        p.diferencial;


    document.getElementById(
        "perla"
    ).textContent =
        p.perla;


    asegurarBotonFavoritoBanco(
        p
    );


    document
        .getElementById(
            "explicacion"
        )
        .classList.remove(
            "oculto"
        );


    document
        .getElementById(
            "explicacion"
        )
        .scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });

}



// =========================================================
// CORREGIR MORFOLOGÍA
// =========================================================

function corregirGrupo(
    id,
    seleccion,
    correcta
) {

    const botones =
        document
        .getElementById(id)
        .querySelectorAll(
            ".opcion-descriptiva"
        );


    botones.forEach(
        boton => {

            boton.disabled =
                true;


            if (
                boton.textContent ===
                correcta
            ) {

                boton.classList.add(
                    "descripcion-correcta"
                );

            }


            if (
                boton.textContent ===
                    seleccion &&
                seleccion !==
                    correcta
            ) {

                boton.classList.add(
                    "descripcion-incorrecta"
                );

            }

        }
    );

}



// =========================================================
// CAMBIAR FOTO
// =========================================================

document
    .getElementById(
        "btn-cambiar-imagen"
    )
    .addEventListener(
        "click",
        function() {

            cargarImagenWeb(
                true
            );

        }
    );



// =========================================================
// SIGUIENTE
// =========================================================

document
    .getElementById(
        "btn-siguiente"
    )
    .addEventListener(
        "click",
        function() {

            indice++;


            if (
                indice >=
                preguntas.length
            ) {

                mostrarResultadoFinal();


                return;

            }


            cargarPregunta();


            window.scrollTo({

                top:
                    0,

                behavior:
                    "smooth"

            });

        }
    );



// =========================================================
// FINAL
// =========================================================

function mostrarResultadoFinal() {

    const porcentaje =
        Math.round(
            (
                aciertos /
                preguntas.length
            ) *
            100
        );


    document.querySelector(
        ".contenedor"
    ).innerHTML = `

        <div class="resultado-final">

            <h1>
                Quiz finalizado
            </h1>

            <div class="porcentaje">
                ${porcentaje}%
            </div>

            <h2>
                ${aciertos}
                de
                ${preguntas.length}
                diagnósticos correctos
            </h2>

            <p>
                Errores:
                <strong>${errores}</strong>
            </p>

            <button
                class="btn-final"
                onclick="location.reload()"
            >
                Repetir los 100 casos
            </button>

        </div>

    `;

}



// =========================================================
// COMPROBACIÓN
// =========================================================

console.log(
    "Número de casos:",
    preguntas.length
);



// =========================================================
// INICIAR
// =========================================================

cargarPregunta();