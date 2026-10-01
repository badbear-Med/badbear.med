window.BADBEAR_NEURO_CONTENIDOS = {
  neuroanatomia: `
    <section class="lesson-intro">
      <span class="lesson-label">BLOQUE 0 · LECCIÓN 1</span>
      <h2>Organización general del sistema nervioso</h2>
      <p>Antes de localizar una lesión neurológica hay que dominar el mapa. Esta primera lección organiza el sistema nervioso de lo macroscópico a lo funcional y conecta cada concepto con la clínica.</p>
    </section>

    <section class="lesson-section" id="organizacion">
      <div class="lesson-number">1.1</div>
      <h2>¿Cómo se organiza el sistema nervioso?</h2>
      <p>El sistema nervioso recibe información, la integra y genera respuestas. Anatómicamente se divide en <strong>sistema nervioso central (SNC)</strong> y <strong>sistema nervioso periférico (SNP)</strong>.</p>
      <div class="visual-grid">
        <button class="neuro-figure zoomable" type="button" aria-label="Ampliar esquema del sistema nervioso">
          <svg viewBox="0 0 720 420" role="img" aria-label="Esquema general del sistema nervioso central y periférico">
            <rect width="720" height="420" rx="24" fill="#f8fafc"/>
            <circle cx="360" cy="80" r="48" fill="#7c3aed" opacity=".14"/>
            <path d="M330 72c10-28 51-35 70-12 18 21 4 54-24 58-29 5-56-18-46-46z" fill="#7c3aed"/>
            <rect x="350" y="112" width="20" height="170" rx="10" fill="#6d28d9"/>
            <path d="M355 145L245 205M365 145L475 205M355 205L270 330M365 205L450 330" stroke="#2563eb" stroke-width="10" stroke-linecap="round"/>
            <path d="M245 205L190 255M475 205L530 255M270 330L235 390M450 330L485 390" stroke="#60a5fa" stroke-width="6" stroke-linecap="round"/>
            <text x="70" y="70" font-size="24" font-weight="800" fill="#312e81">SNC</text>
            <text x="70" y="102" font-size="18" fill="#475569">Encéfalo + médula</text>
            <text x="505" y="70" font-size="24" font-weight="800" fill="#1d4ed8">SNP</text>
            <text x="505" y="102" font-size="18" fill="#475569">Nervios + ganglios</text>
          </svg>
          <span>Vista general: SNC y SNP · clic para ampliar</span>
        </button>
        <div class="concept-stack">
          <article><b>SNC</b><span>Encéfalo y médula espinal. Integra y procesa.</span></article>
          <article><b>SNP</b><span>Nervios, ganglios y terminaciones. Comunica el SNC con el organismo.</span></article>
          <article><b>Regla clínica</b><span>Primero localiza la lesión; después busca la etiología.</span></article>
        </div>
      </div>
      <div class="bb-fija-neuro"><b>BADBEAR.MED FIJA:</b> SNC = encéfalo + médula espinal. SNP = estructuras nerviosas periféricas que conectan el SNC con el resto del organismo.</div>
    </section>

    <section class="lesson-section" id="encefalo">
      <div class="lesson-number">1.2</div>
      <h2>Encéfalo: no es sinónimo de cerebro</h2>
      <p>El encéfalo se encuentra dentro de la cavidad craneal y comprende cuatro grandes componentes: <strong>cerebro, diencéfalo, tronco encefálico y cerebelo</strong>.</p>
      <button class="neuro-figure zoomable wide" type="button" aria-label="Ampliar esquema sagital del encéfalo">
        <svg viewBox="0 0 900 470" role="img" aria-label="Esquema sagital simplificado del encéfalo">
          <rect width="900" height="470" rx="24" fill="#f8fafc"/>
          <ellipse cx="410" cy="210" rx="250" ry="145" fill="#ddd6fe" stroke="#7c3aed" stroke-width="5"/>
          <ellipse cx="505" cy="220" rx="86" ry="56" fill="#fde68a" stroke="#d97706" stroke-width="4"/>
          <path d="M520 260c30 18 42 43 38 89" stroke="#ef4444" stroke-width="34" stroke-linecap="round"/>
          <ellipse cx="645" cy="300" rx="92" ry="73" fill="#bfdbfe" stroke="#2563eb" stroke-width="4"/>
          <path d="M552 348v88" stroke="#6d28d9" stroke-width="24" stroke-linecap="round"/>
          <text x="250" y="105" font-size="23" font-weight="800" fill="#5b21b6">Cerebro</text>
          <text x="465" y="216" font-size="20" font-weight="800" fill="#92400e">Diencéfalo</text>
          <text x="553" y="318" font-size="18" font-weight="800" fill="#991b1b">Tronco</text>
          <text x="610" y="305" font-size="20" font-weight="800" fill="#1e40af">Cerebelo</text>
          <text x="575" y="430" font-size="18" font-weight="800" fill="#5b21b6">Médula</text>
        </svg>
        <span>Orientación sagital simplificada · clic para ampliar</span>
      </button>
      <div class="mini-grid">
        <article><h3>Cerebro</h3><p>Hemisferios, corteza y sustancia blanca. Participa en movimiento voluntario, sensibilidad, lenguaje, cognición y conducta.</p></article>
        <article><h3>Diencéfalo</h3><p>Incluye tálamo e hipotálamo. Integra información sensitiva y regula funciones autonómicas y endocrinas.</p></article>
        <article><h3>Tronco encefálico</h3><p>Mesencéfalo, puente y bulbo. Contiene vías largas, núcleos de pares craneales y centros vitales.</p></article>
        <article><h3>Cerebelo</h3><p>Coordina precisión, equilibrio y aprendizaje motor. Corrige el movimiento; no lo inicia.</p></article>
      </div>
    </section>

    <section class="lesson-section" id="tronco">
      <div class="lesson-number">1.3</div>
      <h2>Tronco encefálico: orientación rostrocaudal</h2>
      <p>De superior a inferior, el tronco encefálico se organiza como <strong>mesencéfalo → puente → bulbo raquídeo → médula espinal</strong>. Esta secuencia debe volverse automática porque será la base para localizar síndromes alternos y lesiones de pares craneales.</p>
      <div class="pathway">
        <div><b>Mesencéfalo</b><span>III y IV, pedúnculos, sustancia negra.</span></div><i>↓</i>
        <div><b>Puente</b><span>Conexión con cerebelo y múltiples núcleos pontinos.</span></div><i>↓</i>
        <div><b>Bulbo</b><span>Pirámides, oliva y centros cardiorrespiratorios.</span></div><i>↓</i>
        <div><b>Médula</b><span>Continuación caudal hacia vías ascendentes y descendentes.</span></div>
      </div>
      <div class="bb-fija-neuro"><b>BADBEAR.MED FIJA:</b> Mesencéfalo → puente → bulbo → médula. Si esta secuencia no está clara, la localización de tronco encefálico se vuelve innecesariamente difícil.</div>
    </section>

    <section class="lesson-section" id="medula">
      <div class="lesson-number">1.4</div>
      <h2>Médula espinal: conducción e integración</h2>
      <p>La médula espinal conduce información entre encéfalo y periferia y también integra reflejos. En un corte transversal, la <strong>sustancia gris es central</strong> y la <strong>sustancia blanca periférica</strong>.</p>
      <button class="neuro-figure zoomable" type="button" aria-label="Ampliar corte transversal de médula">
        <svg viewBox="0 0 760 430" role="img" aria-label="Corte transversal simplificado de médula espinal">
          <rect width="760" height="430" rx="24" fill="#f8fafc"/>
          <ellipse cx="375" cy="210" rx="190" ry="145" fill="#e0e7ff" stroke="#4338ca" stroke-width="5"/>
          <path d="M375 115c-38 0-52 38-30 65-41 19-49 76-5 104 18 11 31 6 35-10 4 16 18 21 36 10 44-28 36-85-5-104 22-27 8-65-31-65z" fill="#a78bfa"/>
          <circle cx="375" cy="210" r="9" fill="#312e81"/>
          <path d="M185 190h-78M185 235h-78M565 190h78M565 235h78" stroke="#2563eb" stroke-width="7" stroke-linecap="round"/>
          <circle cx="110" cy="190" r="18" fill="#60a5fa"/>
          <text x="35" y="170" font-size="18" font-weight="800" fill="#1e40af">Raíz dorsal</text>
          <text x="35" y="270" font-size="18" font-weight="800" fill="#1e40af">Raíz ventral</text>
          <text x="305" y="95" font-size="18" font-weight="800" fill="#4338ca">Sustancia blanca</text>
          <text x="310" y="340" font-size="18" font-weight="800" fill="#6d28d9">Sustancia gris</text>
        </svg>
        <span>Corte transversal de médula · clic para ampliar</span>
      </button>
      <div class="compare-table">
        <div class="thead"><span>Estructura</span><span>Función clave</span><span>Dato clínico</span></div>
        <div><span>Raíz dorsal</span><span>Aferencia sensitiva</span><span>Ganglio de raíz dorsal contiene cuerpos neuronales sensitivos.</span></div>
        <div><span>Raíz ventral</span><span>Eferencia motora</span><span>Transporta axones motores hacia la periferia.</span></div>
        <div><span>Sustancia gris</span><span>Integración segmentaria</span><span>Astas anteriores albergan motoneuronas inferiores.</span></div>
        <div><span>Sustancia blanca</span><span>Vías largas</span><span>Contiene tractos ascendentes y descendentes.</span></div>
      </div>
    </section>

    <section class="lesson-section" id="gris-blanca">
      <div class="lesson-number">1.5</div>
      <h2>Sustancia gris vs. sustancia blanca</h2>
      <div class="two-panel">
        <article class="gray-panel"><h3>Sustancia gris</h3><p>Predominan cuerpos neuronales, dendritas y sinapsis. En el cerebro forma corteza y núcleos profundos; en la médula se localiza centralmente.</p></article>
        <article class="white-panel"><h3>Sustancia blanca</h3><p>Predominan axones, muchos de ellos mielinizados. En el cerebro es principalmente profunda; en la médula rodea a la sustancia gris.</p></article>
      </div>
      <div class="bb-fija-neuro"><b>BADBEAR.MED FIJA:</b> Cerebro: gris predominantemente periférica y blanca profunda. Médula: gris central y blanca periférica.</div>
    </section>

    <section class="lesson-section" id="funcional">
      <div class="lesson-number">1.6</div>
      <h2>División funcional: somático y autónomo</h2>
      <div class="functional-map">
        <div class="functional-title">Sistema nervioso periférico</div>
        <div class="functional-columns">
          <article><h3>Sistema somático</h3><p>Sensibilidad corporal, músculo esquelético, movimiento voluntario y reflejos somáticos.</p></article>
          <article><h3>Sistema autónomo</h3><p>Regula músculo liso, músculo cardíaco, glándulas y vísceras.</p></article>
        </div>
        <div class="autonomic-row"><span><b>Simpático</b><small>Alerta y movilización de recursos.</small></span><span><b>Parasimpático</b><small>Reposo, digestión y recuperación.</small></span><span><b>Entérico</b><small>Red neuronal propia del tubo digestivo.</small></span></div>
      </div>
    </section>

    <section class="lesson-section" id="aferencia">
      <div class="lesson-number">1.7</div>
      <h2>Aferente y eferente: la dirección importa</h2>
      <div class="direction-diagram">
        <span class="box receptor">Receptor periférico</span><span class="arrow">→</span><span class="box aff">Aferente</span><span class="arrow">→</span><span class="box snc">SNC</span><span class="arrow">→</span><span class="box eff">Eferente</span><span class="arrow">→</span><span class="box efector">Efector</span>
      </div>
      <p><strong>Aferente</strong> lleva información desde la periferia hacia el SNC. <strong>Eferente</strong> lleva órdenes desde el SNC hacia la periferia.</p>
      <div class="bb-fija-neuro"><b>BADBEAR.MED FIJA:</b> Aferente entra al SNC. Eferente sale del SNC.</div>
    </section>

    <section class="lesson-section" id="nucleo-ganglio">
      <div class="lesson-number">1.8</div>
      <h2>Núcleo y ganglio no significan lo mismo</h2>
      <div class="mini-grid">
        <article><h3>Núcleo</h3><p>Agrupación de cuerpos neuronales dentro del SNC. Ejemplo: núcleo rojo.</p></article>
        <article><h3>Ganglio</h3><p>Agrupación de cuerpos neuronales fuera del SNC. Ejemplo: ganglio de la raíz dorsal.</p></article>
      </div>
    </section>

    <section class="lesson-section clinical-section" id="clinica">
      <div class="lesson-number">1.9</div>
      <h2>Aplicación clínica: empieza localizando</h2>
      <p>En neurología, el diagnóstico no empieza preguntando “¿qué enfermedad es?”, sino <strong>“¿dónde está la lesión?”</strong>.</p>
      <div class="clinical-grid">
        <article><b>Debilidad + hiperreflexia + Babinski</b><span>Vía piramidal / primera motoneurona.</span></article>
        <article><b>Debilidad + hiporreflexia o arreflexia</b><span>Raíz, nervio periférico o segunda motoneurona.</span></article>
        <article><b>Debilidad proximal + sensibilidad conservada</b><span>Considerar músculo.</span></article>
        <article><b>Fatigabilidad fluctuante</b><span>Considerar unión neuromuscular.</span></article>
      </div>
    </section>

    <section class="lesson-section mastery" id="dominio">
      <div class="lesson-number">1.10</div>
      <h2>Lo que debes dominar antes de continuar</h2>
      <ul class="mastery-list">
        <li>SNC = encéfalo + médula espinal.</li>
        <li>Encéfalo = cerebro + diencéfalo + tronco encefálico + cerebelo.</li>
        <li>SNP = nervios + ganglios + terminaciones.</li>
        <li>Núcleo pertenece al SNC; ganglio al SNP.</li>
        <li>Aferente entra; eferente sale.</li>
        <li>Mesencéfalo → puente → bulbo → médula.</li>
        <li>En neurología se localiza primero y se etiqueta la etiología después.</li>
      </ul>
    </section>
  `
};