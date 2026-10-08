(() => {
  "use strict";

  const h = (s) => s.trim();

  function unidad({fuente,objetivo,secciones,fijas,nota=""}) {
    const bloques = secciones.map((s,i)=>h(`
      <section class="lesson-section" id="sec-${i+1}">
        <div class="lesson-number">${i+1}</div>
        <h2>${s.titulo}</h2>
        ${s.html}
      </section>`)).join("");
    const fijasHtml = fijas.map(x=>`<li>${x}</li>`).join("");
    return h(`
      <section class="lesson-intro">
        <span class="lesson-label">DESARROLLO TEÓRICO · MATERIAL EXTRA</span>
        <h2>${objetivo}</h2>
        <p class="source-line"><strong>Fuente base del desarrollo:</strong> ${fuente}</p>
        ${nota ? `<p class="source-note">${nota}</p>` : ""}
      </section>
      ${bloques}
      <section class="lesson-section mastery">
        <div class="lesson-number">FIJA</div>
        <h2>BADBEAR.MED FIJA · puntos del material</h2>
        <ul class="mastery-list">${fijasHtml}</ul>
      </section>`);
  }

  const neuroanatomia = h(`
    <section class="lesson-intro">
      <span class="lesson-label">BLOQUE 0 · LECCIÓN 1</span>
      <h2>Organización general del sistema nervioso</h2>
      <p>Antes de localizar una lesión neurológica hay que dominar el mapa. Esta primera lección organiza el sistema nervioso de lo macroscópico a lo funcional y conecta cada concepto con la clínica.</p>
    </section>
    <section class="lesson-section" id="organizacion">
      <div class="lesson-number">1.1</div><h2>¿Cómo se organiza el sistema nervioso?</h2>
      <p>El sistema nervioso recibe información, la integra y genera respuestas. Anatómicamente se divide en <strong>sistema nervioso central (SNC)</strong> y <strong>sistema nervioso periférico (SNP)</strong>.</p>
      <div class="visual-grid">
        <button class="neuro-figure zoomable" type="button" aria-label="Ampliar esquema del sistema nervioso">
          <svg viewBox="0 0 720 420" role="img"><rect width="720" height="420" rx="24" fill="#f8fafc"/><circle cx="360" cy="80" r="48" fill="#7c3aed" opacity=".14"/><path d="M330 72c10-28 51-35 70-12 18 21 4 54-24 58-29 5-56-18-46-46z" fill="#7c3aed"/><rect x="350" y="112" width="20" height="170" rx="10" fill="#6d28d9"/><path d="M355 145L245 205M365 145L475 205M355 205L270 330M365 205L450 330" stroke="#2563eb" stroke-width="10" stroke-linecap="round"/><path d="M245 205L190 255M475 205L530 255M270 330L235 390M450 330L485 390" stroke="#60a5fa" stroke-width="6" stroke-linecap="round"/><text x="70" y="70" font-size="24" font-weight="800" fill="#312e81">SNC</text><text x="70" y="102" font-size="18" fill="#475569">Encéfalo + médula</text><text x="505" y="70" font-size="24" font-weight="800" fill="#1d4ed8">SNP</text><text x="505" y="102" font-size="18" fill="#475569">Nervios + ganglios</text></svg>
          <span>Vista general: SNC y SNP · clic para ampliar</span>
        </button>
        <div class="concept-stack"><article><b>SNC</b><span>Encéfalo y médula espinal. Integra y procesa.</span></article><article><b>SNP</b><span>Nervios, ganglios y terminaciones. Comunica el SNC con el organismo.</span></article><article><b>Regla clínica</b><span>Primero localiza la lesión; después busca la etiología.</span></article></div>
      </div>
      <div class="bb-fija-neuro"><b>BADBEAR.MED FIJA:</b> SNC = encéfalo + médula espinal. SNP = estructuras nerviosas periféricas que conectan el SNC con el resto del organismo.</div>
    </section>
    <section class="lesson-section"><div class="lesson-number">1.2</div><h2>Encéfalo: cerebro, diencéfalo, tronco y cerebelo</h2><p>El encéfalo no es sinónimo de cerebro. Incluye cerebro, diencéfalo, tronco encefálico y cerebelo. El tronco se ordena de superior a inferior como <strong>mesencéfalo → puente → bulbo → médula</strong>.</p><div class="mini-grid"><article><h3>Cerebro</h3><p>Funciones motoras, sensitivas, lenguaje, cognición y conducta.</p></article><article><h3>Diencéfalo</h3><p>Tálamo e hipotálamo: relevo sensitivo, regulación autonómica y endocrina.</p></article><article><h3>Tronco</h3><p>Vías largas, pares craneales y centros vitales.</p></article><article><h3>Cerebelo</h3><p>Coordinación, equilibrio y precisión del movimiento.</p></article></div></section>
    <section class="lesson-section"><div class="lesson-number">1.3</div><h2>Médula, sustancia gris y sustancia blanca</h2><p>La médula conduce información y también integra reflejos. En ella la sustancia gris es central y la blanca periférica; en el cerebro, la corteza gris es periférica y la sustancia blanca predominantemente profunda.</p><div class="bb-fija-neuro"><b>BADBEAR.MED FIJA:</b> núcleo = cuerpos neuronales dentro del SNC; ganglio = cuerpos neuronales fuera del SNC.</div></section>
    <section class="lesson-section"><div class="lesson-number">1.4</div><h2>Somático, autónomo, aferente y eferente</h2><div class="functional-map"><div class="functional-title">Sistema nervioso periférico</div><div class="functional-columns"><article><h3>Somático</h3><p>Sensibilidad corporal y músculo esquelético.</p></article><article><h3>Autónomo</h3><p>Regulación visceral: simpático, parasimpático y sistema entérico.</p></article></div></div><p><strong>Aferente</strong> lleva información hacia el SNC. <strong>Eferente</strong> lleva órdenes desde el SNC hacia la periferia.</p></section>
    <section class="lesson-section clinical-section"><div class="lesson-number">1.5</div><h2>Aplicación clínica: ¿dónde está la lesión?</h2><div class="clinical-grid"><article><b>Debilidad + hiperreflexia + Babinski</b><span>Vía piramidal / primera motoneurona.</span></article><article><b>Debilidad + hiporreflexia/arreflexia</b><span>Raíz, nervio periférico o segunda motoneurona.</span></article><article><b>Debilidad proximal + sensibilidad conservada</b><span>Considerar músculo.</span></article><article><b>Fatigabilidad fluctuante</b><span>Considerar unión neuromuscular.</span></article></div></section>
  `);

  window.BADBEAR_NEURO_CONTENIDOS = {
    neuroanatomia,

    polineuropatias: unidad({
      fuente:"1. Polineuropatías.pdf + transcripción de la primera clase.",
      objetivo:"Polineuropatías: localizar primero, clasificar después",
      nota:"La clase utiliza Guillain-Barré como prototipo de neuropatía aguda y luego contrasta neuropatías crónicas, metabólicas, nutricionales, tóxicas, infecciosas y por atrapamiento.",
      secciones:[
        {titulo:"Localización en el sistema nervioso periférico",html:h(`<p>El material parte del nervio periférico como estructura mixta, con fibras motoras y sensitivas. Una neuropatía puede comprometer preferentemente <strong>mielina, axón o ambos</strong>, y puede ser motora, sensitiva o mixta.</p><div class="compare-table"><div class="thead"><span>Patrón</span><span>Clínica orientadora</span><span>Neurofisiología</span></div><div><span>Desmielinizante</span><span>Debilidad, arreflexia; déficit variable</span><span>Enlentecimiento de conducción y alteraciones desmielinizantes.</span></div><div><span>Axonal</span><span>Motor y/o sensitivo según fibras dañadas</span><span>Compromiso de amplitudes por pérdida axonal.</span></div></div>`)},
        {titulo:"Síndrome de Guillain-Barré",html:h(`<p>El PDF lo presenta como causa frecuente de <strong>parálisis flácida aguda</strong>, a cualquier edad, habitualmente precedida por infección respiratoria o digestiva y con mecanismo autoinmune.</p><div class="mini-grid"><article><h3>AIDP</h3><p>Polirradiculoneuropatía inflamatoria desmielinizante aguda: forma desmielinizante clásica.</p></article><article><h3>AMSAN</h3><p>Neuropatía axonal motora y sensitiva aguda.</p></article><article><h3>AMAN</h3><p>Neuropatía axonal motora aguda, sin compromiso sensitivo prominente.</p></article><article><h3>Miller Fisher</h3><p>Oftalmoplejía, ataxia y arreflexia; el material la vincula a anticuerpos antigangliósido y C. jejuni.</p></article></div>`)},
        {titulo:"Diagnóstico: LCR y neurofisiología",html:h(`<p>La clase enfatiza la <strong>disociación albuminocitológica</strong>: aumento de proteínas con celularidad conservada o escasa. Advierte que una punción lumbar demasiado precoz puede ser todavía normal.</p><p>El estudio neurofisiológico permite medir conducción motora y sensitiva y separar patrones predominantemente desmielinizantes de axonales.</p>`)},
        {titulo:"Vigilancia y tratamiento del Guillain-Barré",html:h(`<p>El material insiste en vigilar <strong>función respiratoria y sistema nervioso autónomo</strong>, porque el paciente puede deteriorarse rápidamente y requerir UCI y ventilación mecánica.</p><p>Como tratamiento inmunomodulador se desarrollan <strong>inmunoglobulina intravenosa</strong> y <strong>plasmaféresis</strong>, además de soporte, nutrición, movilización y terapia respiratoria.</p>`)},
        {titulo:"Neuropatías crónicas y metabólicas",html:h(`<p>Se revisan polineuropatías desmielinizantes crónicas adquiridas, con debilidad proximal y distal, hiporreflexia/arreflexia y posible compromiso sensitivo. También se relacionan neuropatías con insuficiencia renal, hepatopatía, hipotiroidismo y especialmente diabetes.</p><p>La neuropatía diabética típica es <strong>distal y simétrica</strong>, con distribución en “guante y calcetín”; el PDF también menciona formas autonómicas, proximales y focales.</p>`)},
        {titulo:"Nutricionales, tóxicas, infecciosas y atrapamiento",html:h(`<p>El material incluye déficit de B12, ácido fólico y B6, exposición a plomo, neuropatías farmacológicas, neuropatía asociada a VIH y neuropatías por atrapamiento.</p><p>En atrapamiento destaca el <strong>túnel carpiano</strong> y el compromiso cubital a nivel del codo. En VIH se describe polineuropatía distal sensitiva y dolor plantar urente.</p>`)}
      ],
      fijas:["Debilidad con reflejos disminuidos o abolidos orienta a compromiso periférico.","Guillain-Barré: antecedente infeccioso + debilidad flácida progresiva + arreflexia.","LCR del SGB: disociación albuminocitológica.","Miller Fisher: oftalmoplejía + ataxia + arreflexia.","Diabetes: patrón distal simétrico en guante y calcetín."]
    }),

    parkinson: unidad({
      fuente:"2. Enfermedad Parkinson.pdf.",
      objetivo:"Enfermedad de Parkinson y síndrome parkinsoniano",
      secciones:[
        {titulo:"Síndrome parkinsoniano",html:"<p>El material organiza el tema a partir del síndrome parkinsoniano y luego desarrolla definición, fisiopatología, clínica, diagnóstico, escalas, diagnóstico diferencial y tratamiento.</p>"},
        {titulo:"Base neuroanatómica y fisiopatológica",html:"<p>El eje fisiopatológico se centra en los circuitos de los ganglios basales y la pérdida progresiva de neuronas dopaminérgicas de la sustancia negra, con alteración de la modulación del movimiento.</p>"},
        {titulo:"Manifestaciones clínicas",html:"<p>Se integran manifestaciones motoras del parkinsonismo y síntomas no motores. El enfoque clínico exige reconocer el patrón, la simetría, la respuesta terapéutica y los signos que sugieren parkinsonismos atípicos.</p>"},
        {titulo:"Diagnóstico y escalas",html:"<p>El diagnóstico se construye fundamentalmente desde la clínica y se apoya en escalas para cuantificar gravedad y evolución. El material dedica un bloque al diagnóstico diferencial con otros síndromes parkinsonianos.</p>"},
        {titulo:"Tratamiento",html:"<p>El PDF desarrolla tratamiento farmacológico y estrategias para síntomas motores, fluctuaciones y complicaciones, además de opciones de rescate en enfermedad avanzada.</p>"}
      ],
      fijas:["Parkinsonismo es un síndrome; enfermedad de Parkinson es una causa específica.","La sustancia negra y los circuitos de ganglios basales son el núcleo anatómico del trastorno.","La evaluación debe incluir síntomas motores y no motores.","El diagnóstico diferencial con parkinsonismos atípicos es parte central del tema."]
    }),

    epilepsias: unidad({
      fuente:"3. Epilepsia.pdf.",
      objetivo:"Epilepsias: de la crisis al síndrome epiléptico",
      secciones:[
        {titulo:"Fisiopatología de la crisis",html:"<p>El PDF explica las crisis como un desequilibrio entre excitación e inhibición cortical, con participación de canales iónicos, glutamato, GABA y redes neuronales.</p>"},
        {titulo:"Crisis y epilepsia",html:"<p>Se diferencia el evento crítico de la enfermedad epiléptica y se desarrolla la clasificación de las crisis, incluyendo crisis focales con difusión bilateral y crisis generalizadas.</p>"},
        {titulo:"Clasificación etiológica",html:"<p>El material aborda causas genéticas y estructurales y desarrolla la clasificación etiológica de las epilepsias, con especial énfasis en epilepsias estructurales.</p>"},
        {titulo:"EEG y síndromes epilépticos",html:"<p>El electroencefalograma se presenta como herramienta central para caracterizar actividad epileptiforme y apoyar la clasificación sindrómica, sin sustituir el contexto clínico.</p>"},
        {titulo:"Tratamiento de largo plazo",html:"<p>El material favorece monoterapia cuando sea posible, revisión periódica del esquema y reevaluación cuando el tratamiento combinado no resulta satisfactorio.</p>"}
      ],
      fijas:["Crisis epiléptica no equivale automáticamente a epilepsia.","La fisiopatología se entiende como alteración del equilibrio excitación/inhibición.","Clasificar tipo de crisis y etiología orienta el tratamiento.","El EEG complementa la clínica; no reemplaza la historia del evento."]
    }),

    neurotuberculosis: unidad({
      fuente:"9. Neurotuberculosis.pdf.",
      objetivo:"Neurotuberculosis: meningitis, tuberculomas y complicaciones",
      secciones:[
        {titulo:"Formas clínicas",html:"<p>El material desarrolla las formas clínicas de tuberculosis del sistema nervioso, con especial atención a la meningitis tuberculosa y lesiones granulomatosas.</p>"},
        {titulo:"Meningitis tuberculosa",html:"<p>Se revisan presentación clínica, progresión neurológica, signos meníngeos y compromiso de pares craneales, además de complicaciones por inflamación basal y vasculopatía.</p>"},
        {titulo:"LCR y microbiología",html:"<p>El PDF dedica apartados a estudio de LCR, coloración, cultivo y técnicas moleculares como PCR, integrándolos con la sospecha clínica.</p>"},
        {titulo:"Neuroimagen",html:"<p>La neuroimagen se utiliza para identificar hidrocefalia, realce meníngeo, lesiones granulomatosas y otras complicaciones intracraneales.</p>"},
        {titulo:"Tratamiento, pronóstico y complicaciones",html:"<p>El material incluye esquemas de tratamiento antituberculoso, fármacos de segunda línea, pronóstico y complicaciones. Destaca el impacto negativo del retraso terapéutico.</p>"}
      ],
      fijas:["La neurotuberculosis puede presentarse como meningitis y/o tuberculomas.","LCR + microbiología + neuroimagen se interpretan de manera conjunta.","El retraso en iniciar tratamiento empeora el pronóstico.","Buscar hidrocefalia y complicaciones vasculares."]
    }),

    neurocisticercosis: unidad({
      fuente:"8. Neurocisticercosis.pdf.",
      objetivo:"Neurocisticercosis: ubicación, estadio y tratamiento",
      secciones:[
        {titulo:"Concepto y formas de presentación",html:"<p>El material aborda neurocisticercosis como infección parasitaria del SNC y organiza la evaluación según localización, estadio de la lesión y manifestaciones clínicas.</p>"},
        {titulo:"Manifestaciones neurológicas",html:"<p>Las crisis epilépticas ocupan un lugar importante en la presentación; también se revisan formas meníngeas, ventriculares y otras localizaciones con manifestaciones dependientes del sitio comprometido.</p>"},
        {titulo:"Diagnóstico",html:"<p>Se integran neuroimagen, pruebas en suero y LCR y diagnóstico diferencial. El material insiste en interpretar la imagen en relación con el estadio evolutivo.</p>"},
        {titulo:"Tratamiento sintomático y antiparasitario",html:"<p>El PDF separa tratamiento sintomático del antiparasitario y desarrolla ciclos terapéuticos según la forma clínica.</p>"},
        {titulo:"Tratamiento quirúrgico",html:"<p>Se reserva para situaciones específicas, especialmente formas con obstrucción, compromiso ventricular o complicaciones que no se resuelven solo con tratamiento médico.</p>"}
      ],
      fijas:["En neurocisticercosis importa tanto la localización como el estadio de la lesión.","Neuroimagen es central para clasificar la enfermedad.","Tratamiento sintomático y antiparasitario son componentes distintos.","Las formas ventriculares o complicadas pueden requerir intervención quirúrgica."]
    }),

    miopatias: unidad({
      fuente:"4. Miopatías.pdf.",
      objetivo:"Miopatías: enfoque clínico de la debilidad muscular",
      secciones:[
        {titulo:"Definición y unidad motora",html:"<p>El PDF define las miopatías como trastornos que afectan funcional o estructuralmente la fibra muscular esquelética y comienza recordando la unidad motora.</p>"},
        {titulo:"Patogénesis",html:"<p>Las alteraciones pueden localizarse en la estructura muscular, el metabolismo o canales, lo que explica la heterogeneidad de las miopatías.</p>"},
        {titulo:"Evaluación clínica",html:"<p>El enfoque incluye edad de inicio, curso, antecedentes personales y familiares, distribución de la debilidad y síntomas asociados. La debilidad proximal es un patrón orientador.</p>"},
        {titulo:"Diagnóstico",html:"<p>Se integran CK y otras enzimas musculares, estudio neurofisiológico, electromiografía, resonancia muscular, genética y biopsia según la sospecha.</p>"},
        {titulo:"Clasificación y tratamiento",html:"<p>El material compara miopatías hereditarias e inflamatorias y menciona distrofias de Duchenne y Becker. El tratamiento depende de la causa y puede requerir rehabilitación y seguimiento cardiopulmonar.</p>"}
      ],
      fijas:["Miopatía = lesión primaria de la fibra muscular.","Debilidad proximal con sensibilidad conservada orienta a músculo.","CK es una prueba inicial relevante; la biopsia se reserva para escenarios seleccionados.","La historia familiar es clave ante sospecha hereditaria."]
    }),

    "infecciones-snc-sgb": unidad({
      fuente:"5. Enfermedades Infecciosas del SN.pdf + correlación con 1. Polineuropatías.pdf para SGB.",
      objetivo:"Infecciones del sistema nervioso y correlación con SGB",
      secciones:[
        {titulo:"Agudas vs. crónicas",html:"<p>La clase plantea como objetivo distinguir infecciones agudas de crónicas y seleccionar el examen diagnóstico prioritario.</p>"},
        {titulo:"Meningitis bacteriana aguda",html:"<p>Se desarrollan manifestaciones clínicas, LCR turbio con presión aumentada y tratamiento antibiótico precoz. El esquema empírico debe ajustarse cuando estén disponibles cultivos de LCR o hemocultivos.</p>"},
        {titulo:"Penetración al LCR",html:"<p>El material compara antibióticos según penetración al LCR, aspecto esencial para elegir tratamiento en infecciones del SNC.</p>"},
        {titulo:"Complicaciones y focos intracraneales",html:"<p>Se incluyen tromboflebitis venosa, abscesos y necesidad de seguimiento con neuroimagen; algunas complicaciones requieren cirugía cuando fracasa el manejo médico.</p>"},
        {titulo:"SGB como secuela inmunomediada",html:"<p>El Guillain-Barré no es una infección del SNC: el material de polineuropatías lo presenta como polirradiculoneuropatía periférica autoinmune frecuentemente precedida por infección.</p>"}
      ],
      fijas:["En infección del SNC, diferenciar aguda vs. crónica cambia el enfoque.","El LCR es una pieza diagnóstica central cuando no está contraindicado.","El tratamiento antibiótico de meningitis bacteriana debe ser precoz.","SGB es periférico e inmunomediado, no una infección directa del SNC."]
    }),

    "esclerosis-multiple": unidad({
      fuente:"6. Esclerosis Multiple.pdf.",
      objetivo:"Esclerosis múltiple: desmielinización inflamatoria del SNC",
      secciones:[
        {titulo:"Concepto",html:"<p>El material define la EM como enfermedad desmielinizante inflamatoria autoinmune crónica del SNC, con afectación encefálica y medular y evolución variable en brotes, remisiones o progresión.</p>"},
        {titulo:"Etiopatogenia y factores de riesgo",html:"<p>Se revisan mecanismos inmunológicos, autoanticuerpos y factores asociados al desarrollo de la enfermedad.</p>"},
        {titulo:"Formas clínicas",html:"<p>El PDF diferencia formas clínicas y desarrolla el síndrome clínico aislado como escenario relevante en la evolución diagnóstica.</p>"},
        {titulo:"Diagnóstico",html:"<p>La evaluación integra clínica, resonancia magnética, criterios de McDonald y hallazgos de LCR como bandas oligoclonales.</p>"},
        {titulo:"Tratamiento y pronóstico",html:"<p>Se revisan terapias modificadoras de enfermedad, vías de administración y consideraciones según forma clínica y progresión.</p>"}
      ],
      fijas:["EM afecta SNC, no nervio periférico.","La resonancia demuestra diseminación de lesiones; el LCR puede mostrar bandas oligoclonales.","El síndrome clínico aislado puede ser la primera manifestación.","Diagnóstico y tratamiento dependen del patrón clínico y radiológico."]
    }),

    "encefalitis-autoinmune": unidad({
      fuente:"7. Encefalitis AutoInmunes.pdf.",
      objetivo:"Encefalitis autoinmune: anticuerpos, receptor y síndrome",
      secciones:[
        {titulo:"Anticuerpos que afectan al SNC",html:"<p>El material diferencia anticuerpos contra superficie neuronal/proteínas sinápticas de anticuerpos contra antígenos intracelulares, estos últimos relacionados con síndromes paraneoplásicos.</p>"},
        {titulo:"Encefalitis anti-NMDA",html:"<p>Se desarrollan receptores NMDA y el efecto de anticuerpos contra sus subunidades. La unión del anticuerpo altera la función de receptores implicados en excitación, plasticidad y redes cognitivas.</p>"},
        {titulo:"Clínica",html:"<p>El PDF contrasta encefalitis viral con autoinmune y destaca alteraciones cognitivas/conductuales, convulsiones y trastornos del sensorio, con perfiles de LCR que pueden diferir.</p>"},
        {titulo:"Diagnóstico etiológico",html:"<p>La evaluación integra clínica, LCR, EEG, neuroimagen y búsqueda de anticuerpos, además de investigación de neoplasia cuando el fenotipo lo sugiere.</p>"},
        {titulo:"Tratamiento",html:"<p>Las formas mediadas por anticuerpos de superficie pueden responder a inmunoterapia y corticoides; el enfoque depende del anticuerpo y del contexto asociado.</p>"}
      ],
      fijas:["Encefalitis autoinmune puede simular infección viral.","Anti-NMDA es un prototipo de anticuerpo contra superficie/sinapsis.","LCR puede ser poco llamativo; debe integrarse con EEG, imagen y anticuerpos.","Anticuerpos intracelulares obligan a considerar síndrome paraneoplásico."]
    }),

    "miastenia-gravis": unidad({
      fuente:"10. Miastenia Gravis.pdf.",
      objetivo:"Miastenia gravis: fisiología de la unión neuromuscular aplicada a la clínica",
      secciones:[
        {titulo:"Unión neuromuscular",html:"<p>El material repasa canales de calcio presinápticos, receptores nicotínicos de acetilcolina y proteínas postsinápticas como MuSK y LRP4.</p>"},
        {titulo:"Definición y patogénesis",html:"<p>La miastenia gravis se presenta como enfermedad autoinmune mediada por autoanticuerpos contra componentes de la membrana postsináptica de la unión neuromuscular.</p>"},
        {titulo:"Clasificación",html:"<p>El PDF clasifica según anticuerpos, edad de inicio, timo y gravedad clínica, y diferencia formas autoinmunes de síndromes miasténicos congénitos y miastenia neonatal transitoria.</p>"},
        {titulo:"Evaluación clínica",html:"<p>La característica clínica central es la <strong>fatigabilidad</strong>: debilidad que empeora con actividad y mejora con reposo, con formas oculares, bulbares y generalizadas.</p>"},
        {titulo:"Diagnóstico y tratamiento",html:"<p>Se desarrollan anticuerpos, neurofisiología y evaluación tímica. El tratamiento incluye medidas sintomáticas e inmunomodulación y reserva recambio plasmático para situaciones graves seleccionadas.</p>"}
      ],
      fijas:["Miastenia = trastorno de la unión neuromuscular postsináptica.","Fatigabilidad fluctuante es la pista clínica mayor.","Buscar anticuerpos y correlacionarlos con el fenotipo.","La evaluación del timo forma parte del estudio."]
    }),

    coma: unidad({
      fuente:"11. Coma - Seminario.pdf.",
      objetivo:"Coma: estabilización, semiología y localización",
      secciones:[
        {titulo:"ABC y nivel de conciencia",html:"<p>El material inicia con manejo inmediato, posición y escalas de alerta. La prioridad es estabilizar vía aérea, respiración y circulación antes de profundizar en la etiología.</p>"},
        {titulo:"Escala de Glasgow",html:"<p>Se desarrolla la escala de coma de Glasgow como herramienta sistemática para objetivar apertura ocular, respuesta verbal y respuesta motora.</p>"},
        {titulo:"Focal vs. difuso",html:"<p>La semiología separa patrones focales de alteración difusa. La anamnesis pregunta velocidad de instalación, síntomas previos, antecedentes, tóxicos, fármacos y traumatismo.</p>"},
        {titulo:"Exploración",html:"<p>La evaluación combina examen físico general y neurológico, con atención a pupilas, motilidad ocular, patrón respiratorio, respuesta motora y reflejos.</p>"},
        {titulo:"Diagnóstico diferencial y fisiopatología",html:"<p>El seminario integra causas estructurales, metabólicas, tóxicas e infecciosas y desarrolla mecanismos de daño neuronal e hipertensión intracraneal.</p>"}
      ],
      fijas:["Primero ABC; luego localización y etiología.","Glasgow cuantifica nivel de respuesta, no reemplaza el examen neurológico.","Déficit focal sugiere lesión estructural hasta demostrar lo contrario.","Inicio brusco vs. progresivo orienta el diagnóstico diferencial."]
    }),

    demencias: unidad({
      fuente:"12. Demencias.pdf.",
      objetivo:"Demencias y enfermedad de Alzheimer",
      secciones:[
        {titulo:"Generalidades",html:"<p>El material define demencia como síndrome cerebral progresivo que afecta cognición, lenguaje y conducta, con pérdida de habilidades previamente adquiridas e interferencia en actividades cotidianas.</p>"},
        {titulo:"Dominios cognitivos",html:"<p>Se evalúan memoria, razonamiento, funciones visuoespaciales y otros dominios, además del impacto funcional.</p>"},
        {titulo:"Enfermedad de Alzheimer",html:"<p>El PDF dedica un bloque amplio a Alzheimer: historia, etiopatogenia, fase preclínica, fase clínica y criterios diagnósticos.</p>"},
        {titulo:"Diagnóstico",html:"<p>Se integran historia clínica, examen cognitivo, resonancia magnética y criterios diagnósticos. El material menciona limitaciones del MMSE para deterioro leve.</p>"},
        {titulo:"Diagnóstico diferencial y tratamiento",html:"<p>Se compara Alzheimer con demencia vascular y otras causas, y se revisan objetivos y opciones de tratamiento farmacológico.</p>"}
      ],
      fijas:["Demencia implica deterioro cognitivo adquirido con repercusión funcional.","Alzheimer es una causa de demencia, no sinónimo de todas las demencias.","Evaluar múltiples dominios cognitivos y funcionalidad.","Diferenciar Alzheimer de demencia vascular forma parte del enfoque."]
    }),

    cefaleas: unidad({
      fuente:"13. Cefalea.pdf.",
      objetivo:"Cefaleas: primarias, secundarias y neuralgias",
      secciones:[
        {titulo:"Clasificación",html:"<p>El PDF divide cefaleas en primarias, secundarias y neuralgias craneales. Dentro de las primarias desarrolla migraña, cefalea tensional y cefalea en racimos/trigémino-autonómicas.</p>"},
        {titulo:"Migraña",html:"<p>Se revisan migraña sin aura y con aura, criterios diagnósticos, fisiopatología del dolor y del aura y tratamiento de la crisis.</p>"},
        {titulo:"Cefalea tensional",html:"<p>El material presenta criterios diagnósticos, fisiopatología y tratamiento, además de profilaxis cuando corresponde.</p>"},
        {titulo:"Cefalea en racimos y otras TAC",html:"<p>Se desarrolla como entidad clínica diferenciada con síntomas autonómicos y patrón temporal característico.</p>"},
        {titulo:"Cefalea secundaria",html:"<p>El enfoque busca causa orgánica y define cuándo la historia clínica obliga a neuroimagen o evaluación adicional.</p>"}
      ],
      fijas:["Primaria = no se identifica causa intracraneal o sistémica responsable.","Secundaria = existe causa orgánica identificable.","Migraña con aura y sin aura son subtipos distintos.","La indicación de neuroimagen depende de la sospecha de cefalea secundaria."]
    }),

    ela: unidad({
      fuente:"14. ELA.pdf.",
      objetivo:"Esclerosis lateral amiotrófica: primera y segunda motoneurona",
      secciones:[
        {titulo:"Concepto anatomopatológico",html:"<p>El material recuerda la descripción de Charcot: esclerosis de cordones laterales por compromiso de primera motoneurona asociada a atrofia muscular por pérdida de motoneuronas del asta anterior.</p>"},
        {titulo:"Fisiopatología",html:"<p>Se revisan mecanismos de degeneración de motoneuronas y la combinación de signos de neurona motora superior e inferior.</p>"},
        {titulo:"Cuadro clínico y fenotipos",html:"<p>El PDF desarrolla fenotipos clínicos y signos que deben hacer dudar del diagnóstico, lo que obliga a una localización cuidadosa.</p>"},
        {titulo:"Estudios diagnósticos",html:"<p>La evaluación utiliza clínica, neurofisiología y neuroimagen principalmente para apoyar el diagnóstico y excluir mimetizadores.</p>"},
        {titulo:"Tratamiento y seguimiento",html:"<p>No existe tratamiento curativo en el material. Se enfatiza manejo multidisciplinario, tratamiento modificador disponible y seguimiento funcional con escalas específicas.</p>"}
      ],
      fijas:["ELA combina datos de primera y segunda motoneurona.","La atrofia muscular refleja pérdida de motoneuronas del asta anterior.","Neuroimagen ayuda sobre todo a excluir diagnósticos alternativos.","El seguimiento funcional es parte del manejo."]
    }),

    "segunda-neurona": unidad({
      fuente:"14. ELA.pdf + 1. Polineuropatías.pdf, usados para localización de segunda motoneurona.",
      objetivo:"Patología de la segunda neurona: localización clínica",
      nota:"No existe un PDF independiente de 'Patología de la segunda neurona' en el ZIP; esta unidad se construye únicamente con los apartados pertinentes de ELA y polineuropatías.",
      secciones:[
        {titulo:"¿Qué es la segunda motoneurona?",html:"<p>El material de ELA sitúa la motoneurona inferior en el asta anterior y relaciona su pérdida con atrofia muscular. Desde allí, el axón sale por raíz ventral y nervio periférico hasta el músculo.</p>"},
        {titulo:"Signos de lesión periférica",html:"<p>La clase de polineuropatías insiste en la asociación de debilidad con <strong>hiporreflexia o arreflexia</strong>. Cuando existe daño axonal importante puede aparecer atrofia.</p>"},
        {titulo:"Diferenciación con primera motoneurona",html:"<p>En ELA pueden coexistir signos superiores e inferiores; esta combinación sirve para contrastar el patrón periférico con el piramidal.</p>"},
        {titulo:"Localización diferencial",html:"<p>La segunda motoneurona puede lesionarse en asta anterior, raíz o nervio periférico; la distribución clínica y el estudio neurofisiológico ayudan a precisar el nivel.</p>"}
      ],
      fijas:["Segunda motoneurona: asta anterior → raíz ventral → nervio periférico → músculo.","Lesión: debilidad + reflejos bajos/abolidos + atrofia según severidad.","La sensibilidad ayuda a distinguir asta anterior de nervio periférico.","ELA puede combinar signos de 1MN y 2MN."]
    }),

    "infarto-cerebral": unidad({
      fuente:"15. Infarto Cerebral.pdf.",
      objetivo:"Infarto cerebral: reconocimiento, etiología y manejo agudo",
      secciones:[
        {titulo:"Definición y fisiopatología",html:"<p>El material define infarto cerebral como oclusión vascular con disminución o ausencia de flujo sanguíneo en un territorio cerebral definido.</p>"},
        {titulo:"Reconocimiento clínico",html:"<p>Se incluyen escalas prehospitalarias como Cincinnati y Los Ángeles, además de valoración neurológica sistemática.</p>"},
        {titulo:"Diagnóstico inicial",html:"<p>El estudio se orienta a confirmar el evento, definir territorio, excluir hemorragia y estudiar la fuente embolígena o aterotrombótica.</p>"},
        {titulo:"Clasificación etiológica TOAST",html:"<p>El PDF desarrolla subtipos aterotrombótico, cardioembólico y otras categorías etiológicas, útiles para prevención secundaria.</p>"},
        {titulo:"Escalas y tratamiento",html:"<p>Se revisan NIHSS, Rankin modificada, tratamiento general de fase aguda y estrategias de reperfusión, seguidas de prevención secundaria.</p>"}
      ],
      fijas:["Infarto = oclusión vascular con déficit en territorio definido.","TC inicial ayuda a excluir hemorragia.","NIHSS cuantifica déficit neurológico.","TOAST organiza la etiología y orienta prevención secundaria."]
    }),

    "rescate-vascular": unidad({
      fuente:"15. Infarto Cerebral.pdf, apartado Tratamiento en la fase aguda.",
      objetivo:"Terapia de rescate vascular en infarto cerebral",
      nota:"No existe un PDF independiente de 'Terapia de rescate vascular' en el ZIP. El desarrollo se extrae del bloque de reperfusión del PDF de Infarto Cerebral.",
      secciones:[
        {titulo:"Objetivo de la reperfusión",html:"<p>La terapia de rescate busca restaurar flujo sanguíneo en tejido potencialmente recuperable durante la fase aguda del ictus isquémico.</p>"},
        {titulo:"Trombólisis intravenosa",html:"<p>El material señala una ventana de tratamiento intravenoso de hasta <strong>4,5 horas</strong> en pacientes seleccionados.</p>"},
        {titulo:"Trombectomía mecánica",html:"<p>El PDF incluye trombectomía mecánica en ventana temprana y selección extendida hasta <strong>24 horas</strong> en casos apropiados.</p>"},
        {titulo:"Selección y seguridad",html:"<p>La decisión requiere confirmar ictus isquémico, excluir hemorragia y valorar gravedad clínica, tiempo, neuroimagen y elegibilidad para reperfusión.</p>"},
        {titulo:"Después del rescate",html:"<p>El material continúa con manejo de fase aguda y prevención secundaria según etiología.</p>"}
      ],
      fijas:["Reperfusión es tiempo-dependiente.","Trombólisis IV: el PDF señala ventana <4,5 h en seleccionados.","Trombectomía: el PDF contempla ventanas tempranas y selección hasta 24 h.","Siempre excluir hemorragia antes de reperfusión."]
    }),

    "hemorragia-intracerebral": unidad({
      fuente:"16. Hemorragia Cerebral.pdf.",
      objetivo:"Hemorragia intracerebral: topografía, etiología y manejo",
      secciones:[
        {titulo:"Clasificación",html:"<p>El material organiza la hemorragia intracerebral por clasificación general, topográfica y etiológica.</p>"},
        {titulo:"Fisiopatología",html:"<p>Se desarrolla la lesión primaria por sangrado y el daño secundario asociado a expansión, edema y aumento de presión intracraneal.</p>"},
        {titulo:"Diagnóstico",html:"<p>La neuroimagen es esencial para confirmar hemorragia, localizarla y estimar extensión, además de buscar datos que orienten etiología.</p>"},
        {titulo:"Tratamiento",html:"<p>El PDF revisa tratamiento inicial, control de variables fisiológicas, estrategias hemostáticas y prevención de complicaciones tromboembólicas.</p>"},
        {titulo:"Prevención de trombosis y complicaciones",html:"<p>Se incluyen medidas para prevención de TEP/trombosis y consideraciones sobre anticoagulación profiláctica según evolución.</p>"}
      ],
      fijas:["TC identifica rápidamente una hemorragia intracerebral.","La topografía aporta información etiológica.","Evitar expansión del hematoma es un objetivo del manejo temprano.","Prevenir complicaciones sistémicas forma parte del tratamiento."]
    }),

    "neuroimagenes-infecciosas": unidad({
      fuente:"Dx por Imágenes - Enfermedades Infecciosas.pdf.",
      objetivo:"Neuroimágenes en infecciones del SNC",
      secciones:[
        {titulo:"Métodos de estudio",html:"<p>El material revisa TC sin/con contraste y RM con T1, T2, FLAIR, difusión, ADC, perfusión, espectroscopia, eco de gradiente y otras técnicas.</p>"},
        {titulo:"Cómo leer T1, T2 y FLAIR",html:"<p>T1 se utiliza para detalle morfológico; T2 es sensible al agua y muestra LCR hiperintenso; FLAIR suprime la señal del LCR y permite resaltar lesiones patológicas adyacentes.</p>"},
        {titulo:"Tuberculosis del SNC",html:"<p>El PDF muestra casos de meningoencefalitis tuberculosa y granulomas con necrosis/licuefacción central, correlacionando morfología y realce.</p>"},
        {titulo:"Otras infecciones",html:"<p>Se incluyen ejemplos de infecciones oportunistas y criptococosis, con correlación entre imagen y estudios de LCR.</p>"},
        {titulo:"Método de lectura",html:"<p>Para cada lesión se debe describir localización, número, señal/densidad, edema, realce, efecto de masa y patrón de distribución antes de asignar una etiología.</p>"}
      ],
      fijas:["T1 = detalle morfológico; T2 = sensible al agua.","FLAIR suprime LCR pero mantiene visibles muchas lesiones patológicas.","Describir primero la imagen; diagnosticar después.","En infección, correlacionar neuroimagen con LCR y contexto inmunológico."]
    }),

    "estado-epileptico": unidad({
      fuente:"17. Estado Epiléptico.pdf.",
      objetivo:"Estado epiléptico: emergencia neurológica tiempo-dependiente",
      secciones:[
        {titulo:"Definición clínica",html:"<p>El material define estado epiléptico como crisis que dura más de <strong>5 minutos</strong> o crisis repetidas sin recuperación completa de la conciencia entre episodios.</p>"},
        {titulo:"Clasificación clínica",html:"<p>Se separa EE convulsivo, no convulsivo y focal. El no convulsivo requiere especial atención porque puede necesitar confirmación electroencefalográfica.</p>"},
        {titulo:"Fisiopatología",html:"<p>Se desarrolla actividad neuronal hipersincrónica persistente, fallo de mecanismos inhibitorios y desequilibrio de neurotransmisores.</p>"},
        {titulo:"Diagnóstico",html:"<p>La evaluación es clínica y electroencefalográfica, buscando simultáneamente la causa desencadenante.</p>"},
        {titulo:"Tratamiento y pronóstico",html:"<p>El PDF presenta protocolos escalonados y recalca que retrasar el tratamiento incrementa daño neuronal y complicaciones. El pronóstico depende de etiología y tiempo hasta el control.</p>"}
      ],
      fijas:["EE: >5 min o crisis repetidas sin recuperación completa.","Es una emergencia neurológica.","EE no convulsivo puede requerir EEG para confirmación.","Tiempo hasta tratamiento y etiología influyen en pronóstico."]
    }),

    "neuroimagenes-vasculares": unidad({
      fuente:"Dx por imágenes - ECV.pdf.",
      objetivo:"Neuroimagen en enfermedad cerebrovascular",
      secciones:[
        {titulo:"Herramientas disponibles",html:"<p>El material revisa TC, RM, angiorresonancia y angio-TC para estudiar parénquima y vasos supraórticos/cerebrales.</p>"},
        {titulo:"Secuencias de RM",html:"<p>Se desarrollan T1, T2, FLAIR, difusión, ADC, perfusión, espectroscopia y eco de gradiente, cada una con aportes distintos.</p>"},
        {titulo:"Isquemia aguda",html:"<p>El PDF compara TC y RM y organiza cambios de imagen según estadio fisiopatológico, con especial utilidad de difusión/ADC en lesión isquémica.</p>"},
        {titulo:"Estudio vascular",html:"<p>Angio-TC y angiorresonancia permiten estudiar oclusiones, estenosis y trombosis de vasos intracraneales.</p>"},
        {titulo:"Lectura integrada",html:"<p>La interpretación debe combinar parénquima, vaso, territorio y tiempo de evolución para responder si existe isquemia, hemorragia u oclusión susceptible de tratamiento.</p>"}
      ],
      fijas:["TC es clave para evaluación inicial y hemorragia.","Difusión/ADC aportan información crítica en isquemia aguda.","Angio-TC/angiorresonancia evalúan el vaso.","Interpretar imagen en función del tiempo de evolución."]
    })
  };

  window.BADBEAR_NEURO_RECURSOS = {
    polineuropatias:{
      pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/01-polineuropatias.pdf",
      nombre:"1. Polineuropatías.pdf",
      fuente:"Material extra",
      audios:[{
        src:"https://media.wajomea.group/badbear-med/neurologia/audios/1.Neuropat%C3%ADas_perif%C3%A9ricas_y_miastenia_gravisA.m4a",
        titulo:"Neuropatías periféricas y miastenia gravis",
        descripcion:"Audio de clase compatible con el bloque de neuropatías periféricas. Incluye además contenido de miastenia gravis."
      }]
    },
    parkinson:{
      pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/02-enfermedad-parkinson.pdf",
      nombre:"2. Enfermedad Parkinson.pdf",
      fuente:"Material extra",
      audios:[{
        src:"audios/2.El_Parkinson_no_empieza_con_un_temblor.m4a",
        titulo:"El Parkinson no empieza con un temblor",
        descripcion:"Audio de clase correspondiente al bloque de enfermedad de Parkinson y síndrome parkinsoniano."
      }]
    },
    epilepsias:{
      pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/03-epilepsia.pdf",
      nombre:"3. Epilepsia.pdf",
      fuente:"Material extra"
    },
    neurotuberculosis:{
      pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/09-neurotuberculosis.pdf",
      nombre:"9. Neurotuberculosis.pdf",
      fuente:"Material extra",
      audios:[{
        src:"audios/4.neurotuberculosis.m4a",
        titulo:"Neurotuberculosis",
        descripcion:"Audio de clase correspondiente a neurotuberculosis."
      }]
    },
    neurocisticercosis:{
      pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/08-neurocisticercosis.pdf",
      nombre:"8. Neurocisticercosis.pdf",
      fuente:"Material extra",
      audios:[{
        src:"audios/5.neurocisticercosisA.m4a",
        titulo:"Neurocisticercosis",
        descripcion:"Audio de clase correspondiente a neurocisticercosis."
      }]
    },
    miopatias:{
      pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/04-miopatias.pdf",
      nombre:"4. Miopatías.pdf",
      fuente:"Material extra",
      audios:[{
        src:"audios/6.miopatías.m4a",
        titulo:"Miopatías",
        descripcion:"Audio de clase correspondiente al bloque de miopatías."
      }]
    },
    "infecciones-snc-sgb":{
      pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/05-enfermedades-infecciosas-snc.pdf",
      nombre:"5. Enfermedades Infecciosas del SN.pdf",
      fuente:"Material extra",
      audios:[{
        src:"audios/7.Meningitis_y_encefalitis_en_urgencias.m4a",
        titulo:"Meningitis y encefalitis en urgencias",
        descripcion:"Audio de clase compatible con el componente de infecciones del SNC de esta unidad."
      }]
    },
    "esclerosis-multiple":{pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/06-esclerosis-multiple.pdf",nombre:"6. Esclerosis Multiple.pdf",fuente:"Material extra"},
    "encefalitis-autoinmune":{pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/07-encefalitis-autoinmunes.pdf",nombre:"7. Encefalitis AutoInmunes.pdf",fuente:"Material extra"},
    "miastenia-gravis":{
      pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/10-miastenia-gravis.pdf",
      nombre:"10. Miastenia Gravis.pdf",
      fuente:"Material extra",
      audios:[{
        src:"https://media.wajomea.group/badbear-med/neurologia/audios/1.Neuropat%C3%ADas_perif%C3%A9ricas_y_miastenia_gravisA.m4a",
        titulo:"Neuropatías periféricas y miastenia gravis",
        descripcion:"Audio compartido con Polineuropatías; la segunda parte corresponde al bloque de miastenia gravis."
      }]
    },
    coma:{pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/11-coma-seminario.pdf",nombre:"11. Coma - Seminario.pdf",fuente:"Material extra"},
    demencias:{pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/12-demencias.pdf",nombre:"12. Demencias.pdf",fuente:"Material extra"},
    cefaleas:{
      pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/13-cefalea.pdf",
      nombre:"13. Cefalea.pdf",
      fuente:"Material extra",
      audios:[{
        src:"audios/12.Diagnóstico_y_manejo_de_las_cefaleas.m4a",
        titulo:"Diagnóstico y manejo de las cefaleas",
        descripcion:"Aunque el archivo está numerado como 12, por contenido corresponde al tema Cefaleas."
      }]
    },
    ela:{pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/14-ela.pdf",nombre:"14. ELA.pdf",fuente:"Material extra"},
    "segunda-neurona":{pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/14-ela.pdf",nombre:"14. ELA.pdf",fuente:"Fuente compartida"},
    "infarto-cerebral":{pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/15-infarto-cerebral.pdf",nombre:"15. Infarto Cerebral.pdf",fuente:"Material extra"},
    "rescate-vascular":{pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/15-infarto-cerebral.pdf",nombre:"15. Infarto Cerebral.pdf",fuente:"Fuente compartida"},
    "hemorragia-intracerebral":{pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/16-hemorragia-cerebral.pdf",nombre:"16. Hemorragia Cerebral.pdf",fuente:"Material extra"},
    "neuroimagenes-infecciosas":{pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/19-neuroimagenes-infecciosas-snc.pdf",nombre:"Dx por Imágenes - Enfermedades Infecciosas.pdf",fuente:"Material extra"},
    "estado-epileptico":{pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/17-estado-epileptico.pdf",nombre:"17. Estado Epiléptico.pdf",fuente:"Material extra"},
    "neuroimagenes-vasculares":{pdf:"https://raw.githubusercontent.com/badbear-Med/badbear.med/main/neurologia/pdf/21-neuroimagenes-ecv.pdf",nombre:"Dx por imágenes - ECV.pdf",fuente:"Material extra"}
  };
})();