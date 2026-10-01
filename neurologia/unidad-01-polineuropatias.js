(() => {
"use strict";
window.BADBEAR_NEURO_CONTENIDOS = window.BADBEAR_NEURO_CONTENIDOS || {};

window.BADBEAR_NEURO_CONTENIDOS.polineuropatias = `
<section class="lesson-intro deep-intro">
  <span class="lesson-label">UNIDAD 1 · NEUROMUSCULAR · POLINEUROPATÍAS</span>
  <h2>Polineuropatías: del patrón clínico a la localización, el mecanismo y la etiología</h2>
  <p>Esta unidad está construida a partir del material docente <strong>“1. Polineuropatías.pdf”</strong> y de la transcripción de la primera clase. El objetivo no es memorizar una lista de neuropatías, sino aprender a razonar desde la anatomía del nervio periférico: <strong>qué fibra está lesionada, dónde está la lesión, cuál es el patrón temporal, qué mecanismo la produce y qué estudios la demuestran</strong>.</p>
  <p class="source-note"><strong>Arquitectura docente:</strong> nervio periférico → axón y mielina → Guillain-Barré → variantes → LCR y neurofisiología → soporte y tratamiento → neuropatías inflamatorias crónicas → metabólicas → diabéticas → nutricionales → tóxicas → farmacológicas → infecciosas → atrapamiento → diferencial con miopatía y unión neuromuscular.</p>
</section>

<section class="lesson-section" id="u1-objetivos">
  <div class="lesson-number">1.1</div>
  <h2>Objetivos clínicos de la unidad</h2>
  <div class="objective-list-pro">
    <article><b>Localizar</b><span>Distinguir nervio periférico de músculo, unión neuromuscular, médula y vía piramidal.</span></article>
    <article><b>Clasificar</b><span>Axonal vs. desmielinizante; motora, sensitiva, autonómica o mixta; focal, multifocal o difusa.</span></article>
    <article><b>Reconocer urgencias</b><span>Detectar Guillain-Barré con riesgo respiratorio o disautonómico antes del deterioro crítico.</span></article>
    <article><b>Interpretar pruebas</b><span>Entender qué aporta el LCR, la conducción nerviosa y la electromiografía.</span></article>
    <article><b>Construir etiología</b><span>Relacionar el fenotipo con diabetes, deficiencias, tóxicos, fármacos, VIH, lepra y atrapamientos.</span></article>
    <article><b>Diferenciar</b><span>Separar neuropatía de miopatía y de alteración de la unión neuromuscular.</span></article>
  </div>
</section>

<section class="lesson-section" id="u1-localizacion">
  <div class="lesson-number">1.2</div>
  <h2>Primero: ¿dónde está la lesión?</h2>
  <p>En neurología, la palabra <strong>debilidad</strong> por sí sola no localiza. La localización aparece cuando la debilidad se interpreta junto con los reflejos, la sensibilidad, la distribución anatómica y la presencia o ausencia de signos centrales.</p>
  <div class="clinical-grid">
    <article><b>Debilidad + hiporreflexia/arreflexia + síntomas sensitivos</b><span>Favorece nervio periférico o raíz.</span></article>
    <article><b>Debilidad proximal + sensibilidad conservada + reflejos relativamente preservados</b><span>Favorece músculo.</span></article>
    <article><b>Fatigabilidad fluctuante + sensibilidad normal</b><span>Favorece unión neuromuscular.</span></article>
    <article><b>Debilidad + hiperreflexia + Babinski</b><span>Favorece primera motoneurona / vía corticoespinal.</span></article>
  </div>
  <div class="bb-fija-neuro"><b>BADBEAR.MED FIJA · DOCENTE:</b> la clase concluye el bloque de nervio periférico con una idea explícita: <strong>neuropatía periférica = debilidad asociada a reflejos disminuidos o abolidos</strong>. Esta relación es una clave de localización, no una etiología.</div>
</section>

<section class="lesson-section" id="u1-anatomia">
  <div class="lesson-number">1.3</div>
  <h2>Anatomía funcional del nervio periférico</h2>
  <p>El nervio periférico es una estructura compuesta. Puede contener fibras motoras, sensitivas y autonómicas, cada una con diámetros, grados de mielinización y funciones diferentes. Esta heterogeneidad explica por qué una neuropatía puede ser puramente motora, predominantemente sensitiva, autonómica o mixta.</p>
  <figure class="source-figure">
    <div class="figure-title">Figura 1. Organización de una neurona periférica</div>
    <svg viewBox="0 0 980 360" role="img" aria-label="Neurona, axón, mielina y nodos de Ranvier">
      <defs><linearGradient id="axon" x1="0" x2="1"><stop stop-color="#2563eb"/><stop offset="1" stop-color="#0f766e"/></linearGradient></defs>
      <rect width="980" height="360" rx="24" fill="#f8fafc"/>
      <circle cx="150" cy="180" r="64" fill="#ddd6fe" stroke="#6d28d9" stroke-width="5"/>
      <circle cx="150" cy="180" r="22" fill="#7c3aed"/>
      <path d="M96 138L43 88M91 161L34 151M94 206L42 246M111 225L76 298" stroke="#7c3aed" stroke-width="10" stroke-linecap="round"/>
      <path d="M214 180H900" stroke="url(#axon)" stroke-width="14" stroke-linecap="round"/>
      <g fill="#fbbf24" stroke="#d97706" stroke-width="3">
        <rect x="250" y="150" width="90" height="60" rx="30"/><rect x="365" y="150" width="90" height="60" rx="30"/>
        <rect x="480" y="150" width="90" height="60" rx="30"/><rect x="595" y="150" width="90" height="60" rx="30"/>
        <rect x="710" y="150" width="90" height="60" rx="30"/>
      </g>
      <g stroke="#0f766e" stroke-width="6" stroke-linecap="round"><path d="M900 180l55-48"/><path d="M900 180l58 0"/><path d="M900 180l54 48"/></g>
      <text x="100" y="280" font-size="22" font-weight="800" fill="#5b21b6">Soma</text>
      <text x="440" y="112" font-size="21" font-weight="800" fill="#92400e">Vaina de mielina</text>
      <text x="343" y="245" font-size="18" font-weight="800" fill="#1d4ed8">Nodo de Ranvier</text>
      <text x="838" y="275" font-size="20" font-weight="800" fill="#0f766e">Terminal axónica</text>
    </svg>
    <figcaption>Redibujado a partir de la figura anatómica de la diapositiva 4 del material extra. La clase utiliza este esquema para diferenciar lesión de mielina y lesión axonal.</figcaption>
  </figure>
  <h3>Axón</h3>
  <p>El axón es el elemento conductor de larga distancia. Cuando se pierde una cantidad suficiente de axones, disminuye la cantidad de fibras capaces de transportar el impulso. En términos electrofisiológicos, esto se refleja principalmente en una reducción de la respuesta registrada.</p>
  <h3>Mielina</h3>
  <p>La mielina del sistema nervioso periférico envuelve segmentos del axón y permite que el potencial de acción se propague de nodo a nodo. La alteración primaria de la mielina enlentece o bloquea la conducción antes de que necesariamente exista destrucción axonal.</p>
  <h3>Nodo de Ranvier</h3>
  <p>Los nodos interrumpen periódicamente la vaina de mielina. Son regiones especializadas en la regeneración del potencial de acción y resultan fundamentales para la conducción saltatoria.</p>
</section>

<section class="lesson-section" id="u1-patrones">
  <div class="lesson-number">1.4</div>
  <h2>La distribución clínica es información anatómica</h2>
  <p>Antes de pedir estudios, conviene describir el patrón. El material docente utiliza cuatro representaciones corporales para mostrar que el sistema nervioso periférico puede afectarse de maneras radicalmente distintas.</p>
  <figure class="source-figure">
    <div class="figure-title">Figura 2. Patrones de compromiso periférico</div>
    <svg viewBox="0 0 1000 440" role="img" aria-label="Patrones de mononeuropatía, mononeuropatía múltiple y polineuropatía distal">
      <rect width="1000" height="440" rx="24" fill="#f8fafc"/>
      <g font-family="Arial" font-weight="800" font-size="18" text-anchor="middle">
        <text x="125" y="38" fill="#172033">Mononeuropatía</text><text x="375" y="38" fill="#172033">Mononeuropatía múltiple</text>
        <text x="625" y="38" fill="#172033">Compromiso extenso</text><text x="875" y="38" fill="#172033">Polineuropatía distal</text>
      </g>
      <g stroke="#64748b" stroke-width="12" stroke-linecap="round" fill="none">
        <circle cx="125" cy="95" r="30"/><path d="M125 125v130M125 165L75 220M125 165l50 55M125 255L90 350M125 255l35 95"/>
        <circle cx="375" cy="95" r="30"/><path d="M375 125v130M375 165l-50 55M375 165l50 55M375 255l-35 95M375 255l35 95"/>
        <circle cx="625" cy="95" r="30"/><path d="M625 125v130M625 165l-50 55M625 165l50 55M625 255l-35 95M625 255l35 95"/>
        <circle cx="875" cy="95" r="30"/><path d="M875 125v130M875 165l-50 55M875 165l50 55M875 255l-35 95M875 255l35 95"/>
      </g>
      <g stroke="#dc2626" stroke-width="18" stroke-linecap="round">
        <path d="M175 220l20 25"/><path d="M425 220l20 25"/><path d="M340 350l-12 35"/>
        <path d="M575 220l-35 25M675 220l35 25M590 350l-18 35M660 350l18 35"/>
        <path d="M840 220l-20 35M910 220l20 35M840 350l-12 42M910 350l12 42"/>
      </g>
      <text x="875" y="418" text-anchor="middle" font-size="18" font-weight="800" fill="#dc2626">“guante y calcetín”</text>
    </svg>
    <figcaption>Redibujado a partir de la diapositiva inicial de “Polineuropatías”. El patrón distal simétrico es especialmente útil para reconocer neuropatías dependientes de longitud.</figcaption>
  </figure>
  <div class="compare-table">
    <div class="thead"><span>Patrón</span><span>Distribución</span><span>Pregunta clínica</span></div>
    <div><span>Mononeuropatía</span><span>Un nervio individual</span><span>¿Existe atrapamiento, trauma o lesión focal?</span></div>
    <div><span>Mononeuropatía múltiple</span><span>Varios nervios de manera asimétrica</span><span>¿Hay proceso multifocal, vascular, inflamatorio o infeccioso?</span></div>
    <div><span>Polineuropatía</span><span>Difusa, a menudo simétrica y distal</span><span>¿Es metabólica, tóxica, nutricional, hereditaria o inmunológica?</span></div>
  </div>
</section>

<section class="lesson-section" id="u1-clasificacion">
  <div class="lesson-number">1.5</div>
  <h2>Clasificación razonada de las polineuropatías</h2>
  <p>Una clasificación útil no consiste en nombrar enfermedades; consiste en convertir la historia clínica en variables que reducen el diagnóstico diferencial.</p>
  <div class="mini-grid">
    <article><h3>Por función</h3><p><strong>Motora</strong>, <strong>sensitiva</strong>, <strong>autonómica</strong> o <strong>mixta</strong>.</p></article>
    <article><h3>Por estructura</h3><p><strong>Axonal</strong> o <strong>desmielinizante</strong>.</p></article>
    <article><h3>Por tiempo</h3><p><strong>Aguda</strong>, subaguda o <strong>crónica</strong>.</p></article>
    <article><h3>Por distribución</h3><p>Distal/proximal; simétrica/asimétrica; focal/multifocal/difusa.</p></article>
  </div>
  <div class="bb-expand"><b>BADBEAR.MED AMPLÍA:</b> la combinación de estas cuatro dimensiones construye un fenotipo. “Neuropatía sensitivo-motora axonal distal simétrica crónica” contiene mucha más información diagnóstica que la palabra aislada “neuropatía”.</div>
</section>

<section class="lesson-section" id="u1-axonal-desmielinizante">
  <div class="lesson-number">1.6</div>
  <h2>Axonal vs. desmielinizante: dos mecanismos, dos firmas neurofisiológicas</h2>
  <div class="compare-table">
    <div class="thead"><span>Característica</span><span>Desmielinizante</span><span>Axonal</span></div>
    <div><span>Lesión primaria</span><span>Vaina de mielina / segmentos mielinizados</span><span>Axón</span></div>
    <div><span>Velocidad de conducción</span><span>Marcadamente enlentecida</span><span>Relativamente preservada hasta pérdida extensa</span></div>
    <div><span>Latencias distales</span><span>Prolongadas</span><span>Menos prominentes</span></div>
    <div><span>Bloqueo de conducción</span><span>Puede estar presente</span><span>No es el hallazgo cardinal</span></div>
    <div><span>Amplitud de potenciales</span><span>Puede conservarse inicialmente</span><span>Disminuye por pérdida de axones</span></div>
    <div><span>Desnervación</span><span>Secundaria si aparece daño axonal</span><span>Más esperable</span></div>
  </div>
  <p>El material de Guillain-Barré enumera como hallazgos electrofisiológicos la disminución de velocidad de conducción, prolongación de latencias distales, bloqueo de conducción, ausencia de onda F y potenciales de denervación. La interpretación correcta depende de qué variante clínica se sospecha.</p>
</section>

<section class="lesson-section" id="u1-gbs-concepto">
  <div class="lesson-number">1.7</div>
  <h2>Síndrome de Guillain-Barré: prototipo de neuropatía aguda inmunomediada</h2>
  <p>La clase presenta al síndrome de Guillain-Barré como una causa central de <strong>parálisis flácida aguda</strong>, capaz de afectar desde niños hasta adultos mayores. En la mayoría de pacientes existe un antecedente de infección respiratoria o digestiva antes de que aparezca el déficit neurológico.</p>
  <div class="mechanism-flow">
    <div><b>Infección precedente</b><span>Respiratoria o gastrointestinal</span></div><i>→</i>
    <div><b>Respuesta inmunitaria</b><span>Fenómeno autoinmune a distancia</span></div><i>→</i>
    <div><b>Lesión periférica</b><span>Mielina, axón o ambos según variante</span></div><i>→</i>
    <div><b>Fallo de conducción</b><span>Debilidad, arreflexia y otros déficits</span></div>
  </div>
  <p>La fisiopatología no debe reducirse a “inflamación del nervio”. El punto clínico es que un estímulo infeccioso precede a una respuesta inmunitaria que altera la capacidad del nervio para conducir información motora, sensitiva y, en algunos pacientes, autonómica.</p>
</section>

<section class="lesson-section" id="u1-gbs-clinica">
  <div class="lesson-number">1.8</div>
  <h2>Manifestaciones clínicas del Guillain-Barré</h2>
  <p>El material docente define un patrón clásico: <strong>debilidad muscular simétrica, aguda, progresiva y ascendente</strong>, acompañada de <strong>arreflexia</strong>. También subraya la frecuencia de la disfunción autonómica.</p>
  <h3>Debilidad</h3><p>La debilidad suele comenzar en extremidades inferiores y progresar hacia segmentos proximales. Lo verdaderamente importante en urgencias no es solamente cuánto puede mover las piernas, sino si la progresión está alcanzando musculatura respiratoria o bulbar.</p>
  <h3>Reflejos</h3><p>La arreflexia constituye uno de los signos que más apoyan la localización periférica en el contexto adecuado.</p>
  <h3>Dolor</h3><p>En la transcripción, la docente menciona dolor de pantorrillas acompañando la debilidad. El dolor no invalida el diagnóstico de neuropatía: puede formar parte del compromiso radicular y periférico.</p>
  <h3>Disautonomía</h3><p>La afectación autonómica puede expresarse mediante variaciones de presión arterial y alteraciones del ritmo cardíaco. Por ello, el paciente neurológico puede deteriorarse hemodinámicamente aunque el déficit motor parezca ser el hallazgo dominante.</p>
</section>

<section class="lesson-section" id="u1-variantes">
  <div class="lesson-number">1.9</div>
  <h2>Variantes de Guillain-Barré: entender qué estructura está siendo atacada</h2>
  <div class="table-wrap-pro"><table><thead><tr><th>Variante</th><th>Blanco predominante</th><th>Fenotipo destacado por la clase</th><th>Clave</th></tr></thead><tbody>
    <tr><td><strong>AIDP</strong></td><td>Mielina</td><td>Polirradiculoneuropatía inflamatoria desmielinizante aguda</td><td>Forma clásica desmielinizante</td></tr>
    <tr><td><strong>AMSAN</strong></td><td>Axón motor + sensitivo</td><td>Inicio fulminante, parálisis grave y déficit sensitivo</td><td>Compromiso axonal mixto</td></tr>
    <tr><td><strong>AMAN</strong></td><td>Axón motor</td><td>Compromiso clínico y electrofisiológico puramente motor</td><td>Sin déficit sensitivo prominente</td></tr>
    <tr><td><strong>Miller Fisher</strong></td><td>Fenotipo craneal/atáxico</td><td>Oftalmoplejía + ataxia + arreflexia</td><td>Tríada de alta rentabilidad</td></tr>
  </tbody></table></div>
  <div class="bb-fija-neuro"><b>BADBEAR.MED FIJA · DOCENTE:</b> Miller Fisher = <strong>oftalmoplejía + ataxia + arreflexia</strong>. El material lo relaciona con infección entérica y anticuerpos antigangliósido.</div>
</section>

<section class="lesson-section" id="u1-aidp">
  <div class="lesson-number">1.10</div><h2>AIDP: polirradiculoneuropatía inflamatoria desmielinizante aguda</h2>
  <p>En esta variante el blanco primario es la mielina. La consecuencia fisiológica esperable es la pérdida de eficiencia de la conducción saltatoria, por lo que la información eléctrica tarda más en recorrer el nervio o puede bloquearse.</p>
  <div class="bb-expand"><b>Lectura neurofisiológica:</b> velocidad de conducción reducida, latencias prolongadas, alteración de respuestas tardías y, cuando existe suficiente desmielinización, bloqueo de conducción. La clase enfatiza precisamente esta lógica al explicar que la mielina enferma produce una conducción notablemente más lenta.</div>
</section>

<section class="lesson-section" id="u1-amsan">
  <div class="lesson-number">1.11</div><h2>AMSAN: neuropatía axonal motora y sensitiva aguda</h2>
  <p>La clase describe una forma más fulminante en la que se comprometen axones motores y sensitivos. El paciente no solo pierde fuerza; también puede desarrollar déficit sensitivo porque el mecanismo no respeta exclusivamente la vía motora.</p>
  <p>Desde el punto de vista funcional, el daño axonal profundo implica que la recuperación dependa de cuánto axón se haya perdido y de la capacidad de reinervación. Por ello, reconocer una forma axonal modifica la expectativa de recuperación y la interpretación de la neurofisiología.</p>
</section>

<section class="lesson-section" id="u1-aman">
  <div class="lesson-number">1.12</div><h2>AMAN: neuropatía axonal motora aguda</h2>
  <p>El material define la AMAN como una forma <strong>puramente motora</strong> clínica y electrofisiológicamente. En la exposición se resalta su descripción en población pediátrica y su asociación con infección gastrointestinal previa, particularmente con <em>Campylobacter jejuni</em>.</p>
  <div class="clinical-pearl"><b>Razonamiento:</b> un paciente con debilidad flácida y arreflexia pero sin alteración sensitiva significativa obliga a considerar un fenotipo motor puro. El siguiente paso no es etiquetarlo únicamente por clínica; debe correlacionarse con el estudio neurofisiológico.</div>
</section>

<section class="lesson-section" id="u1-miller">
  <div class="lesson-number">1.13</div><h2>Síndrome de Miller Fisher: cuando el fenotipo cambia el mapa</h2>
  <p>La tríada de <strong>oftalmoplejía, ataxia y arreflexia</strong> desplaza la atención hacia pares craneales oculomotores y redes responsables de coordinación, pero dentro del espectro de Guillain-Barré.</p>
  <p>La enseñanza práctica es que una neuropatía inmunomediada no siempre se presenta como la parálisis ascendente clásica. Reconocer variantes evita descartar el diagnóstico por ausencia de un patrón prototípico.</p>
</section>

<section class="lesson-section" id="u1-lcr">
  <div class="lesson-number">1.14</div><h2>Líquido cefalorraquídeo: disociación albuminocitológica</h2>
  <p>La clase desarrolla con detalle el concepto de <strong>disociación albuminocitológica</strong>: aumento desproporcionado de proteínas en el LCR sin aumento paralelo de la celularidad.</p>
  <div class="two-panel"><article class="gray-panel"><h3>Lo que aumenta</h3><p><strong>Proteínas</strong>, reflejando alteración de la barrera a nivel de raíces y nervios proximales.</p></article><article class="white-panel"><h3>Lo que no aumenta de forma proporcional</h3><p><strong>Células</strong>. De ahí el término disociación.</p></article></div>
  <p>Un punto insistido en la transcripción es la <strong>temporalidad</strong>: un LCR obtenido demasiado temprano puede no mostrar todavía el patrón esperado. Esto obliga a interpretar un resultado normal según el momento clínico y no de forma aislada.</p>
  <div class="bb-fija-neuro"><b>BADBEAR.MED FIJA · DOCENTE:</b> Guillain-Barré → <strong>disociación albuminocitológica</strong>. Un LCR precoz puede ser no contributivo; el resultado siempre se interpreta en contexto temporal.</div>
</section>

<section class="lesson-section" id="u1-neurofisiologia">
  <div class="lesson-number">1.15</div><h2>Neurofisiología: convertir la sospecha anatómica en datos objetivos</h2>
  <p>El material docente propone medir la conducción motora y sensitiva y utiliza la neurofisiología como herramienta de corroboración. No se trata simplemente de obtener un valor alto o bajo: la morfología de la alteración ayuda a separar desmielinización, bloqueo y daño axonal.</p>
  <figure class="source-figure">
    <div class="figure-title">Figura 3. Músculo normal vs. músculo denervado</div>
    <svg viewBox="0 0 1000 440" role="img" aria-label="Representación de unidad motora normal y denervación">
      <rect width="1000" height="440" rx="24" fill="#f8fafc"/>
      <text x="250" y="42" text-anchor="middle" font-size="24" font-weight="900" fill="#172033">Unidad motora conservada</text><text x="750" y="42" text-anchor="middle" font-size="24" font-weight="900" fill="#172033">Denervación</text>
      <g stroke="#2563eb" stroke-width="7" fill="none" stroke-linecap="round"><path d="M210 85v110M210 118l-95 78M210 118l95 78"/><path d="M115 196l-55 80M115 196l20 95M305 196l-20 95M305 196l55 80"/></g>
      <g fill="#93c5fd"><ellipse cx="60" cy="302" rx="42" ry="18"/><ellipse cx="135" cy="316" rx="42" ry="18"/><ellipse cx="285" cy="316" rx="42" ry="18"/><ellipse cx="360" cy="302" rx="42" ry="18"/></g>
      <g stroke="#dc2626" stroke-width="7" fill="none" stroke-linecap="round"><path d="M710 85v110M710 118l-95 78M710 118l95 78"/><path d="M615 196l-55 80M805 196l55 80"/></g>
      <g fill="#fecaca"><ellipse cx="560" cy="302" rx="42" ry="18"/><ellipse cx="860" cy="302" rx="42" ry="18"/></g>
      <g stroke="#64748b" stroke-width="3" fill="none"><path d="M90 380c35-65 70 65 105 0s70 65 105 0"/><path d="M590 380c25-90 50 90 75 0s50 90 75 0"/></g>
    </svg>
    <figcaption>Redibujado a partir de la diapositiva 12 (“Músculo normal vs músculo desnervado”). El esquema ayuda a visualizar por qué la pérdida de inervación modifica la respuesta electromiográfica.</figcaption>
  </figure>
  <h3>Conducción nerviosa</h3>
  <ul class="pro-list"><li><strong>Velocidad:</strong> útil para documentar enlentecimiento desmielinizante.</li><li><strong>Latencia distal:</strong> puede prolongarse en desmielinización.</li><li><strong>Bloqueo:</strong> indica que el impulso no atraviesa adecuadamente un segmento.</li><li><strong>Onda F:</strong> aporta información sobre segmentos proximales y raíces.</li><li><strong>Amplitud:</strong> ayuda a estimar pérdida axonal funcional.</li></ul>
</section>

<section class="lesson-section" id="u1-respiratorio">
  <div class="lesson-number">1.16</div><h2>¿Por qué Guillain-Barré es una urgencia neurológica?</h2>
  <p>Porque el proceso no se queda en las piernas. La progresión puede comprometer músculos respiratorios y el sistema nervioso autónomo. La clase insiste en pensar desde el inicio en una UCI cercana, monitorizar capacidad vital, ritmo cardíaco y presión arterial y anticipar la posibilidad de ventilación mecánica.</p>
  <div class="alarm-grid-pro"><article><b>Progresión rápida</b><span>Debilidad que asciende en horas o pocos días.</span></article><article><b>Compromiso respiratorio</b><span>Disminución de reserva ventilatoria o debilidad bulbar.</span></article><article><b>Disautonomía</b><span>Variabilidad de presión arterial y alteraciones de ritmo.</span></article><article><b>Cuadriparesia</b><span>Compromiso motor extenso y mayor dependencia funcional.</span></article></div>
  <div class="bb-fija-neuro"><b>BADBEAR.MED FIJA · DOCENTE:</b> en Guillain-Barré hay que pensar anticipadamente en <strong>respiración + autonomía cardiovascular</strong>, no solo en fuerza de extremidades.</div>
</section>

<section class="lesson-section" id="u1-tratamiento-gbs">
  <div class="lesson-number">1.17</div><h2>Tratamiento del Guillain-Barré: soporte + inmunomodulación</h2>
  <h3>Soporte vital y prevención de complicaciones</h3>
  <div class="mini-grid"><article><h3>UCI cuando corresponda</h3><p>Especialmente si existe progresión, riesgo respiratorio o disautonomía.</p></article><article><h3>Monitorización respiratoria</h3><p>El material destaca la capacidad vital y la posibilidad de ventilación mecánica.</p></article><article><h3>Monitorización autonómica</h3><p>Ritmo cardíaco y presión arterial.</p></article><article><h3>Rehabilitación precoz</h3><p>Fisioterapia respiratoria y movilizaciones articulares pasivas.</p></article></div>
  <h3>Plasmaféresis</h3><p>El PDF la presenta como estrategia inmunomoduladora capaz de retirar componentes circulantes de la respuesta inmune. La clase remarca tanto su utilidad como las limitaciones logísticas: disponibilidad de equipo, personal entrenado y costo.</p>
  <h3>Inmunoglobulina intravenosa</h3><p>El material la plantea como alternativa de elección práctica, administrada en esquema total distribuido durante varios días. La enseñanza docente enfatiza que el tratamiento debe iniciarse cuando está indicado antes de que el daño periférico sea más extenso.</p>
  <div class="source-note"><strong>Nota editorial BADBEAR.MED:</strong> las dosis y ventanas terapéuticas publicadas en el PDF se preservan como contenido del material docente. En una futura capa de actualización de guías se contrastarán por separado con recomendaciones contemporáneas; no se mezclan silenciosamente ambas fuentes.</div>
</section>

<section class="lesson-section" id="u1-cidp">
  <div class="lesson-number">1.18</div><h2>Neuropatía inflamatoria desmielinizante crónica: el tiempo cambia el diagnóstico</h2>
  <p>Después del bloque agudo, el PDF introduce la neuropatía desmielinizante inflamatoria crónica adquirida. El contraste didáctico es esencial: el Guillain-Barré se instala en un horizonte agudo, mientras que este grupo evoluciona durante <strong>semanas, meses o años</strong> y puede mostrar un patrón progresivo o remitente-recidivante.</p>
  <div class="compare-table"><div class="thead"><span>Característica</span><span>Guillain-Barré</span><span>Neuropatía desmielinizante crónica</span></div><div><span>Temporalidad</span><span>Aguda</span><span>Semanas-meses-años</span></div><div><span>Debilidad</span><span>Frecuentemente ascendente</span><span>Proximal y distal, simétrica</span></div><div><span>Reflejos</span><span>Disminuidos o abolidos</span><span>Disminuidos o abolidos</span></div><div><span>Sensibilidad</span><span>Variable</span><span>Déficit sensitivo y parestesias; puede haber ataxia sensitiva</span></div><div><span>LCR</span><span>Disociación albuminocitológica</span><span>El PDF también la describe</span></div></div>
  <p>El material propone además buscar asociaciones sistémicas y hematológicas, incluyendo gammapatía monoclonal, VIH, lupus y enfermedad de Hodgkin.</p>
</section>

<section class="lesson-section" id="u1-metabolicas">
  <div class="lesson-number">1.19</div><h2>Neuropatías metabólicas adquiridas</h2>
  <h3>Insuficiencia renal crónica</h3><p>El PDF describe un inicio con síntomas sensitivos predominantes en extremidades inferiores, déficit motor leve y patrón distal simétrico.</p>
  <h3>Hepatopatías</h3><p>Se relaciona hepatitis viral aguda con síndrome de Guillain-Barré, hepatitis viral crónica con neuropatía periférica asociada a vasculopatía y cirrosis con neuropatía sensitiva crónica atáxica.</p>
  <h3>Hipotiroidismo</h3><p>El material señala una polineuropatía rara, de predominio sensitivo, que incluso puede preceder a las manifestaciones clínicas del hipotiroidismo.</p>
  <div class="bb-expand"><b>BADBEAR.MED AMPLÍA:</b> cuando el patrón es distal y simétrico, el diagnóstico etiológico debe buscar enfermedades sistémicas antes de asumir que se trata de una neuropatía idiopática.</div>
</section>

<section class="lesson-section" id="u1-diabetes">
  <div class="lesson-number">1.20</div><h2>Neuropatía diabética: varios fenotipos bajo una misma enfermedad</h2>
  <p>El PDF presenta la diabetes mellitus como una causa mayor de neuropatía y relaciona la frecuencia con el control metabólico. No existe una sola neuropatía diabética: el material separa formas clínicas con distribuciones y mecanismos diferentes.</p>
  <h3>1. Polineuropatía distal simétrica sensitiva o sensitivomotora</h3><p>Existe pérdida distal de sensibilidad superficial y profunda con distribución en <strong>guante y calcetín</strong>, predominio en extremidades inferiores, posible déficit motor distal e hiporreflexia.</p>
  <div class="mechanism-flow"><div><b>Longitud axonal</b><span>Las fibras más largas son vulnerables</span></div><i>→</i><div><b>Inicio distal</b><span>Pies antes que manos</span></div><i>→</i><div><b>Pérdida sensitiva</b><span>Superficial y profunda</span></div><i>→</i><div><b>Riesgo clínico</b><span>Lesiones inadvertidas y alteración de la marcha</span></div></div>
  <h3>2. Neuropatía autonómica</h3><p>El material desarrolla compromiso cardiovascular, genitourinario, gastrointestinal y termorregulador. Aquí la neuropatía deja de ser un problema exclusivamente sensitivo-motor y pasa a afectar funciones viscerales.</p>
  <div class="mini-grid"><article><h3>Cardiovascular</h3><p>Alteración de frecuencia cardíaca, hipotensión postural y presentación atípica de isquemia.</p></article><article><h3>Genitourinario</h3><p>Atonía vesical, disfunción sexual y otros trastornos autonómicos.</p></article><article><h3>Gastrointestinal</h3><p>Alteraciones de motilidad esofágica e intestinal y trastornos esfinterianos.</p></article><article><h3>Sudomotor/vasomotor</h3><p>Alteración de sudoración y respuesta vasomotora.</p></article></div>
  <h3>3. Neuropatía motora proximal</h3><p>El PDF describe inicio brusco o subagudo y asimétrico, afectación de cintura pélvica, dolor lumbar continuo, déficit sensitivo leve y arreflexia rotuliana, con predominio en varones de edad avanzada.</p>
  <h3>4. Mononeuropatías focales</h3><p>El material menciona atrapamiento de mediano, cubital y peroneo; compromiso de pares craneales III, VI y IV; y radiculopatía toracoabdominal asociada a microangiopatía.</p>
  <h3>Neurofisiología</h3><p>La conducción nerviosa se describe como compatible con polineuropatía axonal y la electromiografía puede mostrar signos de denervación.</p>
</section>

<section class="lesson-section" id="u1-nutricionales">
  <div class="lesson-number">1.21</div><h2>Neuropatías nutricionales: cuando el déficit metabólico altera sistema central y periférico</h2>
  <h3>Vitamina B12</h3><p>El material relaciona déficit de B12 con malabsorción por anemia perniciosa y dieta vegetariana estricta. Describe síntomas sensitivos por compromiso de cordones posteriores asociados a neuropatía periférica, junto con niveles bajos de B12 y anemia megaloblástica.</p>
  <div class="clinical-pearl"><b>Localización doble:</b> el déficit de B12 es didácticamente valioso porque puede combinar compromiso de <strong>cordones posteriores del SNC</strong> con <strong>neuropatía periférica</strong>. El paciente no debe forzarse dentro de una única localización si la biología explica dos niveles.</div>
  <h3>Ácido fólico</h3><p>El PDF lo relaciona con dieta pobre y tratamiento crónico con difenilhidantoína.</p>
  <h3>Vitamina B6</h3><p>Se vincula al tratamiento con isoniacida y se describe una polineuropatía sensitivomotora leve, con recomendación preventiva de piridoxina dentro del material docente.</p>
</section>

<section class="lesson-section" id="u1-toxicas">
  <div class="lesson-number">1.22</div><h2>Neuropatías tóxicas: el contexto ambiental también localiza la etiología</h2>
  <p>El PDF las presenta como polineuropatías axonales de curso subagudo o crónico.</p>
  <div class="compare-table"><div class="thead"><span>Tóxico</span><span>Manifestaciones destacadas</span><span>Confirmación propuesta en el material</span></div><div><span>Arsénico</span><span>Síntomas gastrointestinales, alteraciones del SNC y polineuropatía sensitivomotora axonal simétrica</span><span>Arsénico en orina</span></div><div><span>Plomo</span><span>Neuropatía motora de miembros superiores con parálisis radial bilateral; ribete gingival y anemia microcítica</span><span>Plomo aumentado en sangre</span></div></div>
  <p>El mensaje clínico es que la neuropatía puede ser la punta visible de una intoxicación sistémica. La historia ocupacional, ambiental y farmacológica es parte del examen neurológico, no un apéndice administrativo.</p>
</section>

<section class="lesson-section" id="u1-farmacos">
  <div class="lesson-number">1.23</div><h2>Neuropatías por fármacos</h2>
  <p>El material docente enumera <strong>nitrofurantoína, vincristina, amiodarona y disulfiram</strong> como ejemplos de fármacos asociados a neuropatía periférica.</p>
  <div class="bb-expand"><b>BADBEAR.MED AMPLÍA:</b> ante una neuropatía nueva o progresiva, la revisión de medicación debe incluir fármacos actuales, acumulativos y tratamientos previos. El reconocimiento de una causa farmacológica puede evitar estudios innecesarios y, sobre todo, exposición continua al agente.</div>
</section>

<section class="lesson-section" id="u1-infecciosas">
  <div class="lesson-number">1.24</div><h2>Neuropatías infecciosas: VIH, CMV y lepra</h2>
  <h3>VIH: polineuropatía distal sensitiva</h3><p>El PDF la describe como la forma más frecuente dentro del contexto de VIH avanzado: disestesias distales en extremidades inferiores, <strong>dolor plantar urente</strong> y déficit motor mínimo durante la evolución.</p>
  <h3>VIH: neuropatía desmielinizante inflamatoria</h3><p>El material menciona formas inflamatorias desmielinizantes en fases tempranas y relaciona el Guillain-Barré con la seroconversión.</p>
  <h3>Mononeuritis múltiple</h3><p>Se describe como compromiso sensitivomotor multifocal asociado al propio VIH o a vasculitis.</p>
  <h3>CMV: polirradiculopatía progresiva</h3><p>El PDF la sitúa en fases avanzadas, con dolor lumbar irradiado y posterior síndrome de cola de caballo asimétrico de predominio motor.</p>
  <h3>Lepra</h3><p>Se presentan patrones de mononeuropatía por afectación de troncos nerviosos y neuropatía múltiple sensitiva asimétrica y asincrónica, con anestesia y parálisis.</p>
</section>

<section class="lesson-section" id="u1-atrapamiento">
  <div class="lesson-number">1.25</div><h2>Neuropatías por atrapamiento: anatomía focal, clínica focal</h2>
  <h3>Síndrome del túnel carpiano</h3><p>El material lo atribuye a compresión o isquemia del nervio mediano y lo relaciona con factores mecánicos. Describe acroparestesias de predominio nocturno en el territorio sensitivo del mediano, sensación de tumefacción y disminución de la velocidad de conducción.</p>
  <div class="territory-map"><div class="hand hand-median"><b>Mediano</b><span>Parestesias predominantes en territorio radial palmar de la mano; el material enfatiza la clínica nocturna.</span></div><div class="hand hand-ulnar"><b>Cubital</b><span>Parestesias en cuarto y quinto dedos y debilidad de musculatura dependiente del cubital.</span></div></div>
  <h3>Mononeuropatía cubital</h3><p>La clase la relaciona con atrapamiento en el codo por factores posicionales o artrosis. La distribución en cuarto y quinto dedos ayuda a traducir anatomía en diagnóstico.</p>
  <div class="bb-fija-neuro"><b>BADBEAR.MED FIJA · DOCENTE:</b> la neurofisiología no solo confirma que hay neuropatía; en los atrapamientos puede <strong>localizar el segmento</strong> donde la conducción está alterada.</div>
</section>

<section class="lesson-section" id="u1-neuropatia-miopatia">
  <div class="lesson-number">1.26</div><h2>Neuropatía vs. miopatía: el diferencial que debe resolverse en la cama del paciente</h2>
  <p>La primera clase utiliza este contraste como transición pedagógica hacia distrofias musculares. El mensaje es excelente: antes de solicitar CK, EMG, biopsia o genética, el patrón clínico ya debe orientar la localización.</p>
  <div class="table-wrap-pro"><table><thead><tr><th>Variable</th><th>Neuropatía periférica</th><th>Miopatía</th></tr></thead><tbody>
    <tr><td>Distribución típica</td><td>Frecuentemente distal; depende de etiología</td><td>Frecuentemente proximal / cinturas</td></tr>
    <tr><td>Sensibilidad</td><td>Puede alterarse</td><td>Conservada</td></tr>
    <tr><td>Reflejos</td><td>Disminuidos o abolidos</td><td>Presentes o ligeramente disminuidos al inicio</td></tr>
    <tr><td>Atrofia</td><td>Puede aparecer por denervación</td><td>Puede ser prominente en distrofias</td></tr>
    <tr><td>Conducción nerviosa</td><td>Puede ser anormal</td><td>Motora y sensitiva habitualmente conservadas en el material</td></tr>
    <tr><td>CK</td><td>No es la prueba primaria del nervio</td><td>Puede elevarse marcadamente en determinadas miopatías</td></tr>
    <tr><td>EMG</td><td>Patrón neurogénico según lesión</td><td>Patrón miopático / interferencia precoz según el PDF</td></tr>
  </tbody></table></div>
</section>

<section class="lesson-section" id="u1-union">
  <div class="lesson-number">1.27</div><h2>Neuropatía vs. unión neuromuscular</h2>
  <p>La transcripción termina enlazando el nervio periférico con la placa neuromuscular. Esto permite construir una segunda distinción de localización:</p>
  <div class="compare-table"><div class="thead"><span>Característica</span><span>Neuropatía</span><span>Miastenia gravis</span></div><div><span>Sensibilidad</span><span>Puede alterarse</span><span>Conservada</span></div><div><span>Reflejos</span><span>Frecuentemente disminuidos</span><span>Generalmente conservados</span></div><div><span>Patrón motor</span><span>Depende de nervios/fibras</span><span>Fatigabilidad y fluctuación</span></div><div><span>Curso durante el día</span><span>No necesariamente fluctuante</span><span>Puede empeorar con actividad y mejorar con reposo</span></div><div><span>Estudio clave</span><span>Conducción y EMG según patrón</span><span>Estimulación repetitiva / anticuerpos dentro del bloque específico</span></div></div>
</section>

<section class="lesson-section" id="u1-algoritmo">
  <div class="lesson-number">1.28</div><h2>Algoritmo BADBEAR.MED para aproximarse a una polineuropatía</h2>
  <div class="decision-tree"><div class="decision-node primary"><b>1. ¿Es periférico?</b><span>Debilidad + reflejos bajos/abolidos ± síntomas sensitivos</span></div><div class="decision-arrow">↓</div><div class="decision-node"><b>2. ¿Cuál es la distribución?</b><span>Focal · multifocal · distal simétrica · proximal/distal</span></div><div class="decision-arrow">↓</div><div class="decision-node"><b>3. ¿Qué fibras?</b><span>Motoras · sensitivas · autonómicas · mixtas</span></div><div class="decision-arrow">↓</div><div class="decision-node"><b>4. ¿Qué tiempo?</b><span>Horas-días · semanas · meses-años</span></div><div class="decision-arrow">↓</div><div class="decision-node"><b>5. ¿Axonal o desmielinizante?</b><span>Usar conducción nerviosa + EMG</span></div><div class="decision-arrow">↓</div><div class="decision-node"><b>6. Construir etiología</b><span>Inmunológica · metabólica · nutricional · tóxica · fármaco · infecciosa · atrapamiento</span></div></div>
</section>

<section class="lesson-section" id="u1-casos">
  <div class="lesson-number">1.29</div><h2>Correlaciones clínicas de alto rendimiento</h2>
  <div class="case-grid"><article><span>Caso A</span><h3>Debilidad ascendente tras diarrea</h3><p>Debilidad simétrica progresiva, arreflexia y antecedente digestivo. Localización periférica aguda → espectro de Guillain-Barré. Luego se define variante con neurofisiología.</p></article><article><span>Caso B</span><h3>Dolor plantar urente en VIH</h3><p>Disestesias distales de predominio sensitivo en extremidades inferiores con escaso déficit motor → patrón descrito de polineuropatía distal sensitiva.</p></article><article><span>Caso C</span><h3>Parestesias nocturnas en mano</h3><p>Distribución del mediano + factores mecánicos + conducción alterada → neuropatía focal por atrapamiento.</p></article><article><span>Caso D</span><h3>Debilidad proximal sin síntomas sensitivos</h3><p>Reflejos relativamente conservados y ausencia de parestesias → reconsiderar localización: músculo más que nervio periférico.</p></article></div>
</section>

<section class="lesson-section" id="u1-errores">
  <div class="lesson-number">1.30</div><h2>Errores de razonamiento que esta unidad debe evitar</h2>
  <ul class="pro-list"><li><strong>Debilidad = neuropatía.</strong> Falso: primero hay que integrar reflejos, sensibilidad y distribución.</li><li><strong>Todo Guillain-Barré es desmielinizante.</strong> Falso dentro del propio material: existen formas axonales motoras y sensitivomotoras.</li><li><strong>Un LCR temprano normal descarta Guillain-Barré.</strong> La transcripción advierte expresamente que el tiempo de obtención importa.</li><li><strong>La neuropatía diabética es una sola entidad.</strong> El PDF describe formas distal simétrica, autonómica, motora proximal y focal.</li><li><strong>Parestesias = miopatía.</strong> La presencia de síntomas sensitivos obliga a reconsiderar una localización primaria muscular.</li><li><strong>El estudio neurofisiológico solo confirma.</strong> También caracteriza mecanismo y localización.</li></ul>
</section>

<section class="lesson-section mastery" id="u1-fija">
  <div class="lesson-number">FIJA</div><h2>BADBEAR.MED FIJA · reales de la clase y del PDF</h2>
  <div class="gold-list-pro">
    <p><b>01.</b> El nervio periférico contiene fibras motoras y sensitivas; una enfermedad puede comprometer una, otra o ambas.</p>
    <p><b>02.</b> Una neuropatía puede atacar predominantemente <strong>mielina</strong> o <strong>axón</strong>.</p>
    <p><b>03.</b> Guillain-Barré es presentado como causa fundamental de <strong>parálisis flácida aguda</strong>.</p>
    <p><b>04.</b> La mayoría de pacientes con GBS tiene antecedente de infección respiratoria o digestiva.</p>
    <p><b>05.</b> GBS: debilidad aguda progresiva + <strong>arreflexia</strong> + posible disfunción autonómica.</p>
    <p><b>06.</b> AIDP = variante desmielinizante; AMSAN = axonal motora y sensitiva; AMAN = axonal motora.</p>
    <p><b>07.</b> Miller Fisher = <strong>oftalmoplejía + ataxia + arreflexia</strong>.</p>
    <p><b>08.</b> LCR en GBS: <strong>disociación albuminocitológica</strong>.</p>
    <p><b>09.</b> El LCR demasiado precoz puede no mostrar todavía el patrón esperado.</p>
    <p><b>10.</b> Neurofisiología: velocidad, latencias, bloqueo de conducción, onda F y signos de denervación permiten caracterizar la lesión.</p>
    <p><b>11.</b> En GBS hay que vigilar <strong>capacidad respiratoria, ritmo cardíaco y presión arterial</strong>.</p>
    <p><b>12.</b> El tratamiento del GBS combina soporte vital con inmunomodulación mediante IVIG o plasmaféresis según el contexto.</p>
    <p><b>13.</b> La neuropatía inflamatoria desmielinizante crónica se diferencia del GBS por su <strong>temporalidad prolongada</strong>.</p>
    <p><b>14.</b> Neuropatía diabética distal: patrón sensitivo distal en <strong>guante y calcetín</strong>.</p>
    <p><b>15.</b> Diabetes también puede producir neuropatía autonómica, motora proximal y mononeuropatías focales.</p>
    <p><b>16.</b> Déficit de B12 puede combinar cordones posteriores y neuropatía periférica.</p>
    <p><b>17.</b> Tóxicos y fármacos forman parte obligatoria de la historia etiológica.</p>
    <p><b>18.</b> En VIH, el PDF destaca la polineuropatía distal sensitiva con <strong>dolor plantar urente</strong>.</p>
    <p><b>19.</b> Túnel carpiano = compromiso del nervio mediano; atrapamiento cubital = cuarto y quinto dedos.</p>
    <p><b>20.</b> Neuropatía periférica: <strong>debilidad + reflejos disminuidos/abolidos</strong>; miopatía: debilidad proximal sin componente sensitivo.</p>
  </div>
</section>

<section class="lesson-section final-review" id="u1-repaso">
  <div class="lesson-number">REPASO</div><h2>Mapa mental final</h2>
  <p>El estudio de las polineuropatías se vuelve coherente cuando se abandona la memorización por enfermedades y se sigue una secuencia constante:</p>
  <div class="mechanism-flow final-flow"><div><b>LOCALIZA</b><span>¿Nervio periférico?</span></div><i>→</i><div><b>DESCRIBE</b><span>Distribución + fibras + tiempo</span></div><i>→</i><div><b>CARACTERIZA</b><span>Axonal vs. desmielinizante</span></div><i>→</i><div><b>ETIOLOGÍA</b><span>Inmune · metabólica · tóxica · infecciosa · atrapamiento</span></div></div>
  <p><strong>Si el estudiante puede explicar por qué una lesión de mielina enlentece la conducción, por qué la arreflexia localiza periféricamente, por qué el patrón guante-calcetín es distal y por qué un Guillain-Barré puede comprometer respiración y autonomía cardiovascular, entonces ya no está memorizando: está razonando neurología.</strong></p>
</section>
`;
})();