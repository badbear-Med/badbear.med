const atlasDatos = {
  lesion: [
    { titulo:"Mácula", subtitulo:"Lesión primaria", busqueda:"macule dermatology clinical photograph", descripcion:"Cambio circunscrito de coloración sin elevación ni depresión palpable.", morfologia:"Plana · no palpable · cambio de color", ejemplos:"Vitíligo, melasma, exantemas maculares", fija:"Mácula = lesión plana; si es extensa suele denominarse parche." },
    { titulo:"Pápula", subtitulo:"Lesión primaria", busqueda:"papule skin clinical photograph dermatology", descripcion:"Elevación sólida, circunscrita y superficial, habitualmente menor de 1 cm.", morfologia:"Sólida · superficial · pequeña", ejemplos:"Liquen plano, verruga, molusco", fija:"Pápula: elevación sólida superficial; el nódulo es más profundo." },
    { titulo:"Placa", subtitulo:"Lesión primaria", busqueda:"plaque psoriasis clinical photograph", descripcion:"Elevación de superficie amplia, mayor de 1 cm, con extensión lateral predominante.", morfologia:"Elevada · amplia · >1 cm", ejemplos:"Psoriasis, eccema crónico", fija:"Placa = lesión elevada y extensa; puede surgir por confluencia de pápulas." },
    { titulo:"Vesícula", subtitulo:"Lesión primaria", busqueda:"vesicles herpes simplex clinical photograph", descripcion:"Elevación pequeña con contenido líquido claro, seroso o hemorrágico.", morfologia:"Líquida · pequeña · techo epidérmico", ejemplos:"Herpes simple, herpes zóster", fija:"Vesícula pequeña; ampolla cuando la colección líquida es de mayor tamaño." },
    { titulo:"Ampolla", subtitulo:"Lesión primaria", busqueda:"bullous pemphigoid tense blister clinical photograph", descripcion:"Colección líquida elevada de mayor tamaño que una vesícula; puede ser tensa o flácida.", morfologia:"Líquida · grande · tensa o flácida", ejemplos:"Penfigoide ampolloso, pénfigo vulgar", fija:"Ampolla tensa sugiere plano subepidérmico; flácida, plano más superficial." },
    { titulo:"Pústula", subtitulo:"Lesión primaria", busqueda:"pustule acne clinical photograph dermatology", descripcion:"Elevación con contenido purulento desde su origen, folicular o no folicular.", morfologia:"Purulenta · elevada", ejemplos:"Acné, foliculitis, psoriasis pustulosa", fija:"Pústula = pus desde el inicio; no es una vesícula secundariamente infectada." },
    { titulo:"Nódulo", subtitulo:"Lesión primaria", busqueda:"cutaneous nodule dermatology clinical photograph", descripcion:"Lesión sólida y profunda que compromete dermis o tejido celular subcutáneo.", morfologia:"Sólida · profunda · palpable", ejemplos:"Eritema nodoso, tumores cutáneos", fija:"Nódulo: profundidad mayor que una pápula y posibilidad de dejar cicatriz." },
    { titulo:"Habón / roncha", subtitulo:"Lesión primaria", busqueda:"urticaria wheals clinical photograph", descripcion:"Elevación eritematoedematosa, pruriginosa y evanescente por edema de dermis superficial.", morfologia:"Edematosa · pruriginosa · <24 h", ejemplos:"Urticaria", fija:"Cada habón individual suele desaparecer en menos de 24 horas." },
    { titulo:"Escama", subtitulo:"Lesión secundaria", busqueda:"psoriasis scale plaque clinical photograph", descripcion:"Láminas de estrato córneo que se desprenden de la superficie cutánea.", morfologia:"Descamación · seca o grasa", ejemplos:"Psoriasis, dermatitis seborreica, tiñas", fija:"Escama = queratina desprendida; costra = exudado desecado." },
    { titulo:"Costra", subtitulo:"Lesión secundaria", busqueda:"impetigo honey colored crust clinical photograph", descripcion:"Material seco formado por suero, sangre, pus o combinación de estos.", morfologia:"Exudado desecado · superficial", ejemplos:"Impétigo, erosiones exudativas", fija:"Costra melicérica es un dato clásico de impétigo no ampolloso." },
    { titulo:"Erosión", subtitulo:"Lesión secundaria", busqueda:"skin erosion dermatology clinical photograph", descripcion:"Pérdida superficial de epidermis que no rebasa la membrana basal.", morfologia:"Superficial · húmeda · sin cicatriz", ejemplos:"Ampollas rotas, excoriaciones", fija:"Erosión cura sin cicatriz porque no destruye dermis." },
    { titulo:"Úlcera", subtitulo:"Lesión secundaria", busqueda:"cutaneous ulcer clinical photograph dermatology", descripcion:"Pérdida profunda de sustancia que compromete epidermis y dermis, a veces hipodermis.", morfologia:"Profunda · pérdida de sustancia", ejemplos:"Ectima, vasculitis, úlcera tumoral", fija:"Úlcera destruye dermis y por eso puede dejar cicatriz." },
    { titulo:"Liquenificación", subtitulo:"Lesión secundaria", busqueda:"lichenification atopic dermatitis clinical photograph", descripcion:"Engrosamiento cutáneo con acentuación de pliegues por rascado o fricción crónica.", morfologia:"Engrosada · cuadriculado marcado", ejemplos:"Dermatitis atópica crónica", fija:"Prurito crónico + rascado repetido → liquenificación." }
  ],
  enfermedad: [
    { titulo:"Psoriasis en placas", subtitulo:"Inflamatoria", busqueda:"plaque psoriasis elbow clinical photograph", descripcion:"Placas eritematosas bien delimitadas con escama blanquecina o plateada.", morfologia:"Placa · eritematosa · escamosa", ejemplos:"Extensores, cuero cabelludo, región sacra", fija:"Auspitz y Koebner apoyan psoriasis; revisar uñas y articulaciones." },
    { titulo:"Dermatitis atópica", subtitulo:"Inflamatoria", busqueda:"atopic dermatitis flexural clinical photograph", descripcion:"Dermatosis eccematosa intensamente pruriginosa con xerosis y patrón dependiente de la edad.", morfologia:"Eritema · eccema · liquenificación", ejemplos:"Flexuras en niños mayores y adultos", fija:"Prurito es cardinal; el defecto de barrera se asocia a filagrina." },
    { titulo:"Dermatitis seborreica", subtitulo:"Inflamatoria", busqueda:"seborrheic dermatitis scalp face clinical photograph", descripcion:"Placas eritematosas con escama grasa en zonas ricas en glándulas sebáceas.", morfologia:"Eritema · escama grasa", ejemplos:"Cuero cabelludo, cejas, surcos nasogenianos", fija:"Distribución seborreica + escama grasa orientan el diagnóstico." },
    { titulo:"Liquen plano", subtitulo:"Inflamatoria", busqueda:"lichen planus wrist clinical photograph", descripcion:"Pápulas violáceas, poligonales, planas y pruriginosas, a veces con estrías de Wickham.", morfologia:"Pápula · violácea · poligonal", ejemplos:"Muñecas y tobillos flexores", fija:"Las 4 P clásicas: púrpura, pruriginoso, poligonal y plano." },
    { titulo:"Pitiriasis rosada", subtitulo:"Inflamatoria", busqueda:"pityriasis rosea christmas tree clinical photograph", descripcion:"Erupción ovalada descamativa del tronco, frecuentemente precedida por placa heráldica.", morfologia:"Placas ovales · collarete de escama", ejemplos:"Tronco · líneas de tensión", fija:"Placa heráldica seguida de patrón en árbol de Navidad." },
    { titulo:"Urticaria", subtitulo:"Inflamatoria", busqueda:"urticaria hives clinical photograph", descripcion:"Habones pruriginosos, migratorios y evanescentes.", morfologia:"Habón · eritematoedematoso", ejemplos:"Generalizada o localizada", fija:"Una lesión fija por >24 h obliga a pensar en diagnósticos alternativos." },
    { titulo:"Impétigo", subtitulo:"Bacteriana", busqueda:"impetigo honey crust child clinical photograph", descripcion:"Infección superficial con erosiones y costras melicéricas, frecuente en niños.", morfologia:"Costra melicérica · erosión", ejemplos:"Perinasal, perioral, extremidades", fija:"Impétigo localizado: mupirocina tópica es una opción clásica." },
    { titulo:"Erisipela", subtitulo:"Bacteriana", busqueda:"erysipelas leg sharply demarcated clinical photograph", descripcion:"Infección de dermis superficial y linfáticos con placa brillante y borde bien delimitado.", morfologia:"Placa eritematosa · elevada · borde nítido", ejemplos:"Cara o extremidades inferiores", fija:"Erisipela: borde bien delimitado; celulitis: borde más difuso." },
    { titulo:"Celulitis", subtitulo:"Bacteriana", busqueda:"cellulitis leg clinical photograph", descripcion:"Infección de dermis profunda y tejido celular subcutáneo con calor, dolor y bordes mal definidos.", morfologia:"Eritema · edema · calor · dolor", ejemplos:"Extremidades inferiores", fija:"Busca puerta de entrada, incluida tiña pedis interdigital." },
    { titulo:"Herpes simple", subtitulo:"Viral", busqueda:"herpes simplex grouped vesicles clinical photograph", descripcion:"Vesículas agrupadas sobre base eritematosa, con ardor o dolor.", morfologia:"Vesículas agrupadas · erosiones", ejemplos:"Labial o genital", fija:"Vesículas agrupadas y recurrencia en el mismo territorio orientan a HSV." },
    { titulo:"Herpes zóster", subtitulo:"Viral", busqueda:"herpes zoster dermatomal clinical photograph", descripcion:"Vesículas dolorosas agrupadas con distribución unilateral dermatomal.", morfologia:"Vesículas · dermatomal · unilateral", ejemplos:"Un dermatoma, sin cruzar típicamente la línea media", fija:"Dolor neurítico + vesículas dermatomales = zóster hasta demostrar lo contrario." },
    { titulo:"Molusco contagioso", subtitulo:"Viral", busqueda:"molluscum contagiosum umbilicated papules clinical photograph", descripcion:"Pápulas perladas, cupuliformes y umbilicadas por poxvirus.", morfologia:"Pápula · perlada · umbilicada", ejemplos:"Niños; extensa en inmunosupresión", fija:"Umbilicación central es la pista morfológica más útil." },
    { titulo:"Verruga vulgar", subtitulo:"Viral", busqueda:"verruca vulgaris hand clinical photograph", descripcion:"Pápulas hiperqueratósicas de superficie rugosa asociadas a VPH.", morfologia:"Pápula · hiperqueratósica · rugosa", ejemplos:"Manos, dedos, rodillas", fija:"Puntos negros pueden corresponder a capilares trombosados." },
    { titulo:"Tiña corporal", subtitulo:"Micótica", busqueda:"tinea corporis ringworm clinical photograph", descripcion:"Placa anular eritematoescamosa con borde activo y aclaramiento central.", morfologia:"Anular · borde escamoso activo", ejemplos:"Tronco y extremidades", fija:"Borde activo + aclaramiento central = patrón clásico de dermatofitosis." },
    { titulo:"Pitiriasis versicolor", subtitulo:"Micótica", busqueda:"pityriasis versicolor trunk clinical photograph", descripcion:"Máculas hipo o hiperpigmentadas con fina descamación en tronco y hombros.", morfologia:"Máculas · descamación fina", ejemplos:"Tronco superior", fija:"KOH: hifas cortas + levaduras agrupadas." },
    { titulo:"Escabiosis", subtitulo:"Parasitaria", busqueda:"scabies burrows hand interdigital clinical photograph", descripcion:"Prurito nocturno intenso con pápulas, excoriaciones y surcos en sitios típicos.", morfologia:"Pápulas · surcos · excoriaciones", ejemplos:"Interdigital, muñecas, cintura, genitales", fija:"Prurito nocturno + convivientes afectados es una combinación muy orientadora." },
    { titulo:"Pénfigo vulgar", subtitulo:"Ampollosa", busqueda:"pemphigus vulgaris flaccid bullae clinical photograph", descripcion:"Ampollas flácidas y erosiones por acantólisis intraepidérmica; puede comprometer mucosas.", morfologia:"Ampolla flácida · erosión", ejemplos:"Tronco, cuero cabelludo, mucosa oral", fija:"Pénfigo vulgar: anti-desmogleína 3 y acantólisis suprabasal." },
    { titulo:"Penfigoide ampolloso", subtitulo:"Ampollosa", busqueda:"bullous pemphigoid tense blisters clinical photograph", descripcion:"Ampollas tensas sobre base urticariforme, típica de adultos mayores.", morfologia:"Ampolla tensa · base eritematosa", ejemplos:"Tronco y extremidades", fija:"Penfigoide: ampolla subepidérmica tensa, Nikolsky habitualmente negativo." },
    { titulo:"Vitíligo", subtitulo:"Pigmentaria", busqueda:"vitiligo depigmented patches clinical photograph", descripcion:"Máculas y parches acrómicos bien delimitados por pérdida de melanocitos.", morfologia:"Mácula acrómica · borde definido", ejemplos:"Periorificial, acral, simétrico", fija:"Acrómico no es lo mismo que hipopigmentado: en vitíligo se pierde pigmento." },
    { titulo:"Melasma", subtitulo:"Pigmentaria", busqueda:"melasma face clinical photograph", descripcion:"Máculas hiperpigmentadas simétricas en áreas fotoexpuestas de la cara.", morfologia:"Mácula parduzca · simétrica", ejemplos:"Malar, centrofacial, mandibular", fija:"Fotoprotección estricta es parte central del manejo." },
    { titulo:"Acné vulgar", subtitulo:"Anexos", busqueda:"acne vulgaris comedones papules pustules clinical photograph", descripcion:"Enfermedad pilosebácea con comedones y lesiones inflamatorias variables.", morfologia:"Comedón · pápula · pústula · nódulo", ejemplos:"Cara, pecho, espalda", fija:"La presencia de comedones ayuda a diferenciar acné de rosácea." },
    { titulo:"Rosácea", subtitulo:"Anexos", busqueda:"rosacea papulopustular face clinical photograph", descripcion:"Eritema centrofacial persistente con flushing, telangiectasias y pápulo-pústulas sin comedones.", morfologia:"Eritema · pápulas/pústulas · telangiectasias", ejemplos:"Centrofacial", fija:"Rosácea: inflamación centrofacial sin comedones." },
    { titulo:"Carcinoma basocelular", subtitulo:"Tumoral", busqueda:"basal cell carcinoma pearly papule telangiectasia clinical photograph", descripcion:"Pápula o nódulo perlado con telangiectasias y posible ulceración central.", morfologia:"Pápula perlada · telangiectasias", ejemplos:"Cara y otras áreas fotoexpuestas", fija:"CBC es el cáncer cutáneo más frecuente y metastatiza excepcionalmente." },
    { titulo:"Melanoma", subtitulo:"Tumoral", busqueda:"cutaneous melanoma clinical photograph ABCDE", descripcion:"Lesión melanocítica sospechosa por asimetría, bordes, color, diámetro y evolución.", morfologia:"Mácula/placa pigmentada · asimétrica", ejemplos:"Cualquier localización", fija:"En melanoma localizado, Breslow es un factor pronóstico histológico clave." }
  ],
  distribucion: [
    { titulo:"Extensora", subtitulo:"Patrón de distribución", busqueda:"psoriasis extensor elbow clinical photograph", descripcion:"Predominio sobre superficies extensoras, especialmente codos y rodillas.", morfologia:"Codos · rodillas · superficies extensoras", ejemplos:"Psoriasis", fija:"Psoriasis clásica: placas bien delimitadas en extensores." },
    { titulo:"Flexural", subtitulo:"Patrón de distribución", busqueda:"atopic dermatitis flexural elbow clinical photograph", descripcion:"Predominio en pliegues de flexión como fosas antecubitales y poplíteas.", morfologia:"Pliegues · flexuras", ejemplos:"Dermatitis atópica", fija:"En niños mayores y adultos, dermatitis atópica suele preferir flexuras." },
    { titulo:"Dermatomal", subtitulo:"Patrón de distribución", busqueda:"herpes zoster dermatomal unilateral clinical photograph", descripcion:"Lesiones siguiendo el territorio de una raíz sensitiva, habitualmente unilateral.", morfologia:"Banda unilateral · dermatoma", ejemplos:"Herpes zóster", fija:"Zóster típicamente no cruza la línea media." },
    { titulo:"Periorificial", subtitulo:"Patrón de distribución", busqueda:"vitiligo perioral face clinical photograph", descripcion:"Lesiones agrupadas alrededor de orificios naturales como boca, ojos o nariz.", morfologia:"Perioral · periocular · perinasal", ejemplos:"Vitíligo, dermatitis periorificial", fija:"La localización periorificial puede orientar mucho el diagnóstico diferencial." },
    { titulo:"Simétrica", subtitulo:"Patrón de distribución", busqueda:"vitiligo symmetric hands clinical photograph", descripcion:"Compromiso comparable de ambos lados del cuerpo.", morfologia:"Bilateral · espejo", ejemplos:"Vitíligo, psoriasis, melasma", fija:"Simetría favorece procesos sistémicos o patrones dermatológicos característicos." },
    { titulo:"Asimétrica", subtitulo:"Patrón de distribución", busqueda:"contact dermatitis localized asymmetric clinical photograph", descripcion:"Distribución desigual o unilateral sin patrón en espejo.", morfologia:"Unilateral o irregular", ejemplos:"Dermatitis de contacto, infecciones localizadas", fija:"Asimetría obliga a pensar en exposición localizada, inoculación o distribución neural." },
    { titulo:"Generalizada", subtitulo:"Patrón de distribución", busqueda:"generalized drug eruption clinical photograph", descripcion:"Compromiso de múltiples regiones corporales o gran superficie cutánea.", morfologia:"Extensa · múltiples regiones", ejemplos:"Exantemas, urticaria, toxicodermias", fija:"En enfermedad generalizada, siempre busca compromiso sistémico y mucoso." },
    { titulo:"Localizada", subtitulo:"Patrón de distribución", busqueda:"localized plaque psoriasis clinical photograph", descripcion:"Lesiones restringidas a una zona anatómica definida.", morfologia:"Una región limitada", ejemplos:"Dermatitis de contacto, infecciones focales", fija:"La localización precisa puede revelar la exposición o mecanismo causal." },
    { titulo:"Interdigital", subtitulo:"Patrón de distribución", busqueda:"scabies interdigital web spaces clinical photograph", descripcion:"Predominio en espacios entre los dedos de manos o pies.", morfologia:"Espacios interdigitales", ejemplos:"Escabiosis, tiña pedis", fija:"Interdigital + prurito nocturno sugiere escabiosis; maceración orienta a tiña pedis." },
    { titulo:"Fotoexpuesta", subtitulo:"Patrón de distribución", busqueda:"photodermatitis sun exposed skin clinical photograph", descripcion:"Lesiones en áreas expuestas a radiación ultravioleta con respeto relativo de zonas cubiertas.", morfologia:"Cara · escote · dorso de manos", ejemplos:"Fotodermatosis, lupus cutáneo, melasma", fija:"Observa líneas de corte por ropa, reloj, mentón o pabellón auricular." },
    { titulo:"Seborreica", subtitulo:"Patrón de distribución", busqueda:"seborrheic dermatitis nasolabial scalp clinical photograph", descripcion:"Predominio en áreas ricas en glándulas sebáceas.", morfologia:"Cuero cabelludo · cejas · nasogenianos · presternal", ejemplos:"Dermatitis seborreica", fija:"Zona seborreica + escama grasa es un patrón clásico." }
  ]
};

const nombresSeccion = {
  lesion: "Lesiones elementales",
  enfermedad: "Enfermedades",
  distribucion: "Patrones de distribución"
};

let atlasTab = "lesion";
let atlasBusqueda = "";
const estadoImagenes = new WeakMap();

const $ = id => document.getElementById(id);

function normalizar(texto = "") {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function datosFiltrados() {
  const base = atlasDatos[atlasTab] || [];
  const q = normalizar(atlasBusqueda.trim());
  if (!q) return base;
  return base.filter(item => normalizar([
    item.titulo, item.subtitulo, item.descripcion, item.morfologia,
    item.ejemplos, item.fija
  ].join(" ")).includes(q));
}

function tarjetaHTML(item, index) {
  return `
    <article class="atlas-card" data-index="${index}" data-search="${encodeURIComponent(item.busqueda)}">
      <div class="atlas-imagen-wrap">
        <div class="atlas-loading">Buscando fotografía clínica real…</div>
        <img class="atlas-imagen" alt="Ejemplo clínico de ${item.titulo}" loading="lazy">
        <span class="atlas-real-badge">FOTO REAL · COMMONS</span>
        <button class="atlas-otra" type="button" title="Mostrar otra fotografía">↻ Otra imagen</button>
      </div>

      <div class="atlas-card-body">
        <div class="atlas-card-top">
          <span class="atlas-tipo">${item.subtitulo}</span>
          <span class="atlas-num">${String(index + 1).padStart(2,"0")}</span>
        </div>
        <h3>${item.titulo}</h3>
        <p class="atlas-desc">${item.descripcion}</p>

        <dl class="atlas-datos">
          <div><dt>Morfología clave</dt><dd>${item.morfologia}</dd></div>
          <div><dt>Ejemplos / patrón</dt><dd>${item.ejemplos}</dd></div>
        </dl>

        <div class="atlas-fija"><strong>BADBEAR.MED FIJA:</strong><span>${item.fija}</span></div>
        <a class="atlas-fuente" href="#" target="_blank" rel="noopener noreferrer">Fuente de la fotografía →</a>
      </div>
    </article>
  `;
}

function renderAtlas() {
  const items = datosFiltrados();
  $("atlas-seccion").textContent = nombresSeccion[atlasTab];
  $("atlas-total").textContent = items.length;
  $("atlas-grid").innerHTML = items.map(tarjetaHTML).join("");
  $("atlas-vacio").classList.toggle("oculto", items.length !== 0);

  document.querySelectorAll(".atlas-card").forEach((card, i) => {
    const item = items[i];
    card.querySelector(".atlas-otra").addEventListener("click", async () => {
      await cargarImagen(card, item, true);
    });
    observer.observe(card);
  });
}

function puntuarPagina(pagina, termino) {
  const titulo = normalizar(pagina.title || "");
  const meta = pagina.imageinfo?.[0]?.extmetadata || {};
  const desc = normalizar((meta.ImageDescription?.value || "").replace(/<[^>]+>/g," "));
  let score = 0;
  const palabras = normalizar(termino).split(/\s+/).filter(x => x.length > 4);
  palabras.forEach(p => {
    if (titulo.includes(p)) score += 4;
    if (desc.includes(p)) score += 2;
  });
  if (/clinical|patient|skin|dermat|lesion|case/.test(titulo + " " + desc)) score += 4;
  if (/histolog|microscop|diagram|drawing|illustration|scheme|pathology slide|stain|gross specimen/.test(titulo + " " + desc)) score -= 14;
  if (/map|logo|icon|svg|chart/.test(titulo)) score -= 20;
  return score;
}

async function buscarCommons(termino) {
  const query = `${termino} filetype:bitmap`;
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("generator", "search");
  url.searchParams.set("gsrsearch", query);
  url.searchParams.set("gsrnamespace", "6");
  url.searchParams.set("gsrlimit", "18");
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|mime|size|extmetadata");
  url.searchParams.set("iiurlwidth", "1000");
  url.searchParams.set("format", "json");
  url.searchParams.set("origin", "*");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("No se pudo consultar Wikimedia Commons");
  const data = await res.json();
  const paginas = Object.values(data.query?.pages || {});

  return paginas
    .filter(p => {
      const info = p.imageinfo?.[0];
      if (!info) return false;
      if (!/^image\/(jpeg|png|webp)$/i.test(info.mime || "")) return false;
      if ((info.width || 0) < 350 || (info.height || 0) < 250) return false;
      return true;
    })
    .map(p => ({
      page: p,
      score: puntuarPagina(p, termino),
      url: p.imageinfo[0].thumburl || p.imageinfo[0].url,
      source: p.imageinfo[0].descriptionurl || "https://commons.wikimedia.org/",
      title: p.title || "Wikimedia Commons"
    }))
    .sort((a,b) => b.score - a.score);
}

async function cargarImagen(card, item, avanzar = false) {
  if (!card || !item) return;
  const img = card.querySelector(".atlas-imagen");
  const loading = card.querySelector(".atlas-loading");
  const source = card.querySelector(".atlas-fuente");

  let estado = estadoImagenes.get(card);
  try {
    if (!estado) {
      loading.style.display = "flex";
      loading.textContent = "Buscando fotografía clínica real…";
      const resultados = await buscarCommons(item.busqueda);
      estado = { resultados, indice: 0 };
      estadoImagenes.set(card, estado);
    } else if (avanzar && estado.resultados.length) {
      estado.indice = (estado.indice + 1) % estado.resultados.length;
    }

    if (!estado.resultados.length) throw new Error("Sin fotografía disponible");
    const actual = estado.resultados[estado.indice];
    img.onload = () => {
      loading.style.display = "none";
      img.classList.add("cargada");
    };
    img.onerror = () => {
      loading.style.display = "flex";
      loading.textContent = "No se pudo cargar esta fotografía. Usa ‘Otra imagen’.";
    };
    img.src = actual.url;
    img.alt = `${item.titulo} — ${actual.title.replace(/^File:/i, "")}`;
    source.href = actual.source;
    source.textContent = "Fuente de la fotografía · Wikimedia Commons →";
  } catch (e) {
    loading.style.display = "flex";
    loading.textContent = "No se encontró una fotografía adecuada en este momento.";
    source.href = `https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=${encodeURIComponent(item.busqueda)}`;
    source.textContent = "Buscar manualmente en Wikimedia Commons →";
  }
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const card = entry.target;
    observer.unobserve(card);
    const items = datosFiltrados();
    const index = Number(card.dataset.index);
    cargarImagen(card, items[index], false);
  });
}, { rootMargin: "350px 0px" });

document.querySelectorAll(".atlas-tab").forEach(btn => {
  btn.addEventListener("click", () => {
    atlasTab = btn.dataset.tab;
    document.querySelectorAll(".atlas-tab").forEach(b => b.classList.toggle("activo", b === btn));
    renderAtlas();
    window.scrollTo({ top: Math.max(0, document.querySelector(".atlas-toolbar").offsetTop - 100), behavior:"smooth" });
  });
});

$("atlas-busqueda").addEventListener("input", e => {
  atlasBusqueda = e.target.value;
  renderAtlas();
});

$("atlas-limpiar").addEventListener("click", () => {
  atlasBusqueda = "";
  $("atlas-busqueda").value = "";
  renderAtlas();
  $("atlas-busqueda").focus();
});

renderAtlas();
