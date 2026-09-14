const RECON_CLAVE_ESTADO = "badbear_derma_recon_estado";
const RECON_CLAVE_HISTORIAL = "badbear_derma_recon_historial";
const RECON_CLAVE_ERRORES = "badbear_derma_recon_errores";

const $r = id => document.getElementById(id);

const opcionesRecon = {
  lesion:["Mácula / parche","Pápula","Placa","Vesícula","Ampolla","Pústula","Habón / roncha","Costra / erosión","Comedón","Nódulo"],
  tipo:["Primaria","Secundaria","Mixta"],
  color:["Eritematosa","Violácea","Hiperpigmentada","Hipopigmentada","Acrómica","Amarillenta / melicérica","Color piel / perlada","Pigmentada irregular"],
  borde:["Bien delimitados","Mal delimitados","Borde activo anular","Irregulares"],
  superficie:["Escamosa","Lisa","Costrosa","Hiperqueratósica","Vesicular / ampollosa","Erosiva","Edematosa","Umbilicada","Telangiectásica / perlada","Mixta"],
  distribucion:["Extensora","Flexural","Seborreica","Dermatomal","Periorificial","Interdigital","Fotoexpuesta","Centrofacial","Tronco","Generalizada","Localizada","Acral / simétrica"]
};

const casosRecon = [
  {id:"psoriasis",dx:"Psoriasis en placas",categoria:"Inflamatoria",busqueda:"plaque psoriasis elbow clinical photograph",lesion:["Placa"],tipo:["Primaria"],color:["Eritematosa"],borde:["Bien delimitados"],superficie:["Escamosa"],distribucion:["Extensora"],descripcion:"Placas eritematosas bien delimitadas con escama blanquecina o plateada, típicamente en superficies extensoras.",fija:"Psoriasis: placa eritematoescamosa bien delimitada; Auspitz y Koebner son datos clásicos."},
  {id:"atopica",dx:"Dermatitis atópica",categoria:"Inflamatoria",busqueda:"atopic dermatitis flexural lichenification clinical photograph",lesion:["Placa"],tipo:["Mixta"],color:["Eritematosa"],borde:["Mal delimitados"],superficie:["Escamosa","Mixta"],distribucion:["Flexural"],descripcion:"Eccema pruriginoso con xerosis y, en fases crónicas, liquenificación; en niños mayores y adultos predomina en flexuras.",fija:"Dermatitis atópica: prurito + xerosis + patrón flexural; alteración de barrera asociada a filagrina."},
  {id:"seborreica",dx:"Dermatitis seborreica",categoria:"Inflamatoria",busqueda:"seborrheic dermatitis nasolabial fold clinical photograph",lesion:["Placa"],tipo:["Mixta"],color:["Eritematosa"],borde:["Mal delimitados"],superficie:["Escamosa"],distribucion:["Seborreica"],descripcion:"Placas eritematosas con escama grasa en cuero cabelludo, cejas y surcos nasogenianos.",fija:"Distribución seborreica + escama grasa es una combinación de alta rentabilidad."},
  {id:"liquen",dx:"Liquen plano",categoria:"Inflamatoria",busqueda:"lichen planus wrist purple papules clinical photograph",lesion:["Pápula"],tipo:["Primaria"],color:["Violácea"],borde:["Bien delimitados"],superficie:["Lisa"],distribucion:["Flexural"],descripcion:"Pápulas violáceas, poligonales, planas y pruriginosas en muñecas o tobillos; pueden mostrar estrías de Wickham.",fija:"Liquen plano: 4 P — púrpura, pruriginoso, poligonal y plano."},
  {id:"pitiriasis-rosada",dx:"Pitiriasis rosada",categoria:"Inflamatoria",busqueda:"pityriasis rosea trunk christmas tree clinical photograph",lesion:["Placa"],tipo:["Primaria"],color:["Eritematosa"],borde:["Bien delimitados"],superficie:["Escamosa"],distribucion:["Tronco"],descripcion:"Placas ovales eritematoescamosas del tronco siguiendo líneas de tensión, a menudo precedidas por una placa heráldica.",fija:"Placa heráldica seguida de lesiones en árbol de Navidad sugiere pitiriasis rosada."},
  {id:"urticaria",dx:"Urticaria",categoria:"Inflamatoria",busqueda:"urticaria wheals hives clinical photograph",lesion:["Habón / roncha"],tipo:["Primaria"],color:["Eritematosa"],borde:["Mal delimitados","Bien delimitados"],superficie:["Edematosa"],distribucion:["Generalizada","Localizada"],descripcion:"Habones eritematoedematosos, pruriginosos, migratorios y evanescentes.",fija:"Cada habón individual suele durar menos de 24 horas."},
  {id:"impetigo",dx:"Impétigo",categoria:"Bacteriana",busqueda:"impetigo honey colored crust face child clinical photograph",lesion:["Costra / erosión"],tipo:["Secundaria"],color:["Amarillenta / melicérica"],borde:["Bien delimitados","Mal delimitados"],superficie:["Costrosa"],distribucion:["Periorificial","Localizada"],descripcion:"Erosiones superficiales cubiertas por costras melicéricas, frecuentes alrededor de nariz y boca en niños.",fija:"Costra melicérica es una pista clásica del impétigo no ampolloso."},
  {id:"erisipela",dx:"Erisipela",categoria:"Bacteriana",busqueda:"erysipelas leg sharply demarcated clinical photograph",lesion:["Placa"],tipo:["Primaria"],color:["Eritematosa"],borde:["Bien delimitados"],superficie:["Edematosa","Lisa"],distribucion:["Localizada"],descripcion:"Placa eritematosa brillante, caliente, dolorosa y bien delimitada por compromiso de dermis superficial y linfáticos.",fija:"Erisipela: borde nítido; celulitis: borde más difuso."},
  {id:"celulitis",dx:"Celulitis",categoria:"Bacteriana",busqueda:"cellulitis leg diffuse erythema clinical photograph",lesion:["Placa"],tipo:["Primaria"],color:["Eritematosa"],borde:["Mal delimitados"],superficie:["Edematosa","Lisa"],distribucion:["Localizada"],descripcion:"Eritema, edema, calor y dolor con límites poco definidos por infección de dermis profunda y tejido celular subcutáneo.",fija:"Celulitis: dermis profunda + tejido celular subcutáneo; busca puerta de entrada."},
  {id:"herpes-simple",dx:"Herpes simple",categoria:"Viral",busqueda:"herpes simplex grouped vesicles lip clinical photograph",lesion:["Vesícula"],tipo:["Primaria"],color:["Eritematosa"],borde:["Bien delimitados"],superficie:["Vesicular / ampollosa"],distribucion:["Periorificial","Localizada"],descripcion:"Vesículas agrupadas sobre base eritematosa, con ardor o dolor; pueden evolucionar a erosiones.",fija:"HSV: vesículas agrupadas y recurrencia en el mismo territorio."},
  {id:"zoster",dx:"Herpes zóster",categoria:"Viral",busqueda:"herpes zoster dermatomal vesicles clinical photograph",lesion:["Vesícula"],tipo:["Primaria"],color:["Eritematosa"],borde:["Bien delimitados"],superficie:["Vesicular / ampollosa"],distribucion:["Dermatomal"],descripcion:"Vesículas dolorosas agrupadas con distribución unilateral a lo largo de un dermatoma.",fija:"Dolor neurítico + vesículas dermatomales unilaterales = zóster hasta demostrar lo contrario."},
  {id:"molusco",dx:"Molusco contagioso",categoria:"Viral",busqueda:"molluscum contagiosum umbilicated papules child clinical photograph",lesion:["Pápula"],tipo:["Primaria"],color:["Color piel / perlada"],borde:["Bien delimitados"],superficie:["Umbilicada"],distribucion:["Localizada","Generalizada"],descripcion:"Pápulas perladas, cupuliformes y umbilicadas, múltiples en niños o extensas en inmunosupresión.",fija:"Umbilicación central es la pista morfológica más útil del molusco contagioso."},
  {id:"verruga",dx:"Verruga vulgar",categoria:"Viral",busqueda:"verruca vulgaris hand hyperkeratotic papule clinical photograph",lesion:["Pápula"],tipo:["Primaria"],color:["Color piel / perlada"],borde:["Bien delimitados"],superficie:["Hiperqueratósica"],distribucion:["Localizada"],descripcion:"Pápulas hiperqueratósicas rugosas, a menudo en manos y dedos, asociadas a VPH.",fija:"Puntos negros en verrugas pueden corresponder a capilares trombosados."},
  {id:"tinea",dx:"Tiña corporal",categoria:"Micótica",busqueda:"tinea corporis ringworm annular active border clinical photograph",lesion:["Placa"],tipo:["Primaria"],color:["Eritematosa"],borde:["Borde activo anular"],superficie:["Escamosa"],distribucion:["Localizada"],descripcion:"Placa anular eritematoescamosa con borde activo y aclaramiento central.",fija:"Borde activo escamoso + aclaramiento central = dermatofitosis clásica."},
  {id:"versicolor",dx:"Pitiriasis versicolor",categoria:"Micótica",busqueda:"pityriasis versicolor hypopigmented macules trunk clinical photograph",lesion:["Mácula / parche"],tipo:["Primaria"],color:["Hipopigmentada","Hiperpigmentada"],borde:["Mal delimitados"],superficie:["Escamosa"],distribucion:["Tronco"],descripcion:"Máculas hipo o hiperpigmentadas con descamación fina en tronco superior y hombros.",fija:"Pitiriasis versicolor: KOH con hifas cortas y levaduras agrupadas."},
  {id:"escabiosis",dx:"Escabiosis",categoria:"Parasitaria",busqueda:"scabies interdigital papules burrows clinical photograph",lesion:["Pápula"],tipo:["Mixta","Primaria"],color:["Eritematosa"],borde:["Mal delimitados"],superficie:["Erosiva","Mixta"],distribucion:["Interdigital"],descripcion:"Pápulas, excoriaciones y surcos con prurito nocturno intenso, especialmente en espacios interdigitales y muñecas.",fija:"Prurito nocturno + convivientes afectados + surcos interdigitales orienta a escabiosis."},
  {id:"penfigo",dx:"Pénfigo vulgar",categoria:"Ampollosa",busqueda:"pemphigus vulgaris flaccid bullae erosions clinical photograph",lesion:["Ampolla","Costra / erosión"],tipo:["Mixta","Primaria"],color:["Eritematosa"],borde:["Mal delimitados"],superficie:["Erosiva","Vesicular / ampollosa"],distribucion:["Generalizada","Localizada"],descripcion:"Ampollas flácidas que se rompen con facilidad y dejan erosiones; puede existir compromiso mucoso.",fija:"Pénfigo vulgar: anti-desmogleína 3 + acantólisis suprabasal + Nikolsky positivo."},
  {id:"penfigoide",dx:"Penfigoide ampolloso",categoria:"Ampollosa",busqueda:"bullous pemphigoid tense blisters urticarial clinical photograph",lesion:["Ampolla"],tipo:["Primaria"],color:["Eritematosa"],borde:["Bien delimitados","Mal delimitados"],superficie:["Vesicular / ampollosa"],distribucion:["Generalizada","Localizada"],descripcion:"Ampollas tensas sobre base eritematosa o urticariforme, típicas de adultos mayores.",fija:"Penfigoide: ampolla subepidérmica tensa y Nikolsky habitualmente negativo."},
  {id:"vitiligo",dx:"Vitíligo",categoria:"Pigmentaria",busqueda:"vitiligo depigmented patches hands face clinical photograph",lesion:["Mácula / parche"],tipo:["Primaria"],color:["Acrómica"],borde:["Bien delimitados"],superficie:["Lisa"],distribucion:["Acral / simétrica","Periorificial"],descripcion:"Máculas y parches acrómicos bien delimitados por pérdida de melanocitos.",fija:"Vitíligo es acrómico: pérdida completa de pigmento, no solo hipopigmentación."},
  {id:"melasma",dx:"Melasma",categoria:"Pigmentaria",busqueda:"melasma face symmetric hyperpigmentation clinical photograph",lesion:["Mácula / parche"],tipo:["Primaria"],color:["Hiperpigmentada"],borde:["Mal delimitados"],superficie:["Lisa"],distribucion:["Centrofacial","Fotoexpuesta"],descripcion:"Máculas parduzcas hiperpigmentadas y simétricas en áreas fotoexpuestas de la cara.",fija:"Melasma: hiperpigmentación facial simétrica; fotoprotección estricta es fundamental."},
  {id:"acne",dx:"Acné vulgar",categoria:"Anexos",busqueda:"acne vulgaris comedones papules pustules face clinical photograph",lesion:["Comedón","Pápula","Pústula"],tipo:["Primaria"],color:["Eritematosa","Color piel / perlada"],borde:["Bien delimitados"],superficie:["Mixta"],distribucion:["Localizada"],descripcion:"Comedones abiertos o cerrados con pápulas, pústulas o nódulos inflamatorios en áreas pilosebáceas.",fija:"Comedones son clave para diferenciar acné vulgar de rosácea."},
  {id:"rosacea",dx:"Rosácea",categoria:"Anexos",busqueda:"papulopustular rosacea centrofacial clinical photograph",lesion:["Pápula","Pústula"],tipo:["Primaria"],color:["Eritematosa"],borde:["Mal delimitados"],superficie:["Mixta"],distribucion:["Centrofacial"],descripcion:"Eritema centrofacial persistente con telangiectasias y pápulo-pústulas, sin comedones.",fija:"Rosácea: inflamación centrofacial + flushing/pápulo-pústulas sin comedones."},
  {id:"cbc",dx:"Carcinoma basocelular",categoria:"Tumoral",busqueda:"basal cell carcinoma pearly papule telangiectasia face clinical photograph",lesion:["Pápula","Nódulo"],tipo:["Primaria"],color:["Color piel / perlada"],borde:["Bien delimitados"],superficie:["Telangiectásica / perlada"],distribucion:["Fotoexpuesta","Localizada"],descripcion:"Pápula o nódulo perlado con telangiectasias y posible ulceración central, habitual en cara fotoexpuesta.",fija:"Carcinoma basocelular: pápula perlada + telangiectasias + posible ulceración."},
  {id:"melanoma",dx:"Melanoma",categoria:"Tumoral",busqueda:"cutaneous melanoma irregular pigmented lesion clinical photograph",lesion:["Mácula / parche","Placa"],tipo:["Primaria"],color:["Pigmentada irregular"],borde:["Irregulares"],superficie:["Lisa","Mixta"],distribucion:["Localizada"],descripcion:"Lesión melanocítica asimétrica con bordes irregulares, variación de color y evolución reciente.",fija:"ABCDE orienta a melanoma; en enfermedad localizada, Breslow es un factor pronóstico histológico clave."}
];

const camposRecon = ["lesion","tipo","color","borde","superficie","distribucion"];
let cantidadRecon = 10;
let ordenRecon = [];
let indiceRecon = 0;
let puntosRecon = 0;
let maxPuntosRecon = 0;
let dxCorrectosRecon = 0;
let resultadosRecon = [];
let corregidoRecon = false;
let estadoImagenRecon = null;

function barajar(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

function normalizarRecon(s){return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();}

function poblarSelect(id, opciones){
  const sel=$r(id);
  sel.innerHTML='<option value="">Selecciona una opción…</option>'+opciones.map(x=>`<option value="${x}">${x}</option>`).join("");
}

function iniciarSelects(){
  Object.entries(opcionesRecon).forEach(([k,v])=>poblarSelect(`recon-${k}`,v));
}

function cargarHistorialRecon(){
  let h=[];
  try{const x=JSON.parse(localStorage.getItem(RECON_CLAVE_HISTORIAL)||"[]");h=Array.isArray(x)?x:[];}catch(e){h=[];}
  $r("recon-h-sesiones").textContent=h.length;
  if(h.length){
    const mejor=Math.max(...h.map(x=>Number(x.rendimiento)||0));
    $r("recon-h-mejor").textContent=`${mejor}%`;
    $r("recon-h-ultima").textContent=`${Number(h[0].rendimiento)||0}%`;
  }
  let estado=null;
  try{estado=JSON.parse(localStorage.getItem(RECON_CLAVE_ESTADO)||"null");}catch(e){estado=null;}
  $r("recon-reanudar").classList.toggle("oculto",!(estado && Array.isArray(estado.orden) && estado.orden.length));
}

function guardarEstadoRecon(){
  localStorage.setItem(RECON_CLAVE_ESTADO,JSON.stringify({
    orden:ordenRecon,index:indiceRecon,puntos:puntosRecon,max:maxPuntosRecon,dx:dxCorrectosRecon,resultados:resultadosRecon,cantidad:cantidadRecon
  }));
}

function restaurarRecon(){
  let e=null;
  try{e=JSON.parse(localStorage.getItem(RECON_CLAVE_ESTADO)||"null");}catch(_){e=null;}
  if(!e || !Array.isArray(e.orden) || !e.orden.length) return;
  ordenRecon=e.orden; indiceRecon=e.index||0; puntosRecon=e.puntos||0; maxPuntosRecon=e.max||0; dxCorrectosRecon=e.dx||0; resultadosRecon=Array.isArray(e.resultados)?e.resultados:[]; cantidadRecon=e.cantidad||e.orden.length;
  abrirJuegoRecon();
}

function empezarRecon(){
  ordenRecon=barajar(casosRecon.map(x=>x.id)).slice(0,cantidadRecon);
  indiceRecon=0;puntosRecon=0;maxPuntosRecon=0;dxCorrectosRecon=0;resultadosRecon=[];
  guardarEstadoRecon();
  abrirJuegoRecon();
}

function abrirJuegoRecon(){
  $r("recon-inicio").classList.add("oculto");
  $r("recon-final").classList.add("oculto");
  $r("recon-juego").classList.remove("oculto");
  renderCasoRecon();
  window.scrollTo({top:120,behavior:"smooth"});
}

function casoActualRecon(){return casosRecon.find(x=>x.id===ordenRecon[indiceRecon]);}

function opcionesDxRecon(caso){
  const mismo=barajar(casosRecon.filter(x=>x.categoria===caso.categoria && x.id!==caso.id));
  const resto=barajar(casosRecon.filter(x=>x.categoria!==caso.categoria));
  const distractores=[...mismo,...resto].slice(0,5).map(x=>x.dx);
  return barajar([caso.dx,...distractores]);
}

function limpiarFormularioRecon(){
  [...camposRecon,"diagnostico"].forEach(k=>{$r(`recon-${k}`).value="";$r(`recon-${k}`).disabled=false;});
  $r("recon-corregir").disabled=false;
  $r("recon-feedback").classList.add("oculto");
  $r("recon-fuente").classList.add("oculto");
  $r("recon-otra-imagen").disabled=false;
  corregidoRecon=false;
}

function actualizarStatsRecon(){
  const procesados=resultadosRecon.length;
  const rendimiento=maxPuntosRecon?Math.round(puntosRecon/maxPuntosRecon*100):0;
  $r("recon-caso-num").textContent=`${Math.min(indiceRecon+1,ordenRecon.length)} / ${ordenRecon.length}`;
  $r("recon-puntos").textContent=`${puntosRecon} / ${maxPuntosRecon}`;
  $r("recon-dx").textContent=`${dxCorrectosRecon} / ${procesados}`;
  $r("recon-rendimiento").textContent=`${rendimiento}%`;
}

function renderCasoRecon(){
  const c=casoActualRecon();
  if(!c){finalizarRecon();return;}
  limpiarFormularioRecon();
  $r("recon-etiqueta-caso").textContent=`CASO VISUAL ${String(indiceRecon+1).padStart(2,"0")}`;
  poblarSelect("recon-diagnostico",opcionesDxRecon(c));
  actualizarStatsRecon();
  estadoImagenRecon=null;
  cargarImagenRecon(false);
}

function puntuarPaginaRecon(pagina,termino){
  const titulo=normalizarRecon(pagina.title||"");
  const meta=pagina.imageinfo?.[0]?.extmetadata||{};
  const desc=normalizarRecon((meta.ImageDescription?.value||"").replace(/<[^>]+>/g," "));
  let score=0;
  const palabras=normalizarRecon(termino).split(/\s+/).filter(x=>x.length>4);
  palabras.forEach(p=>{if(titulo.includes(p))score+=4;if(desc.includes(p))score+=2;});
  if(/clinical|patient|skin|dermat|lesion|case/.test(titulo+" "+desc))score+=4;
  if(/histolog|microscop|diagram|drawing|illustration|scheme|pathology slide|stain|gross specimen/.test(titulo+" "+desc))score-=16;
  if(/map|logo|icon|svg|chart/.test(titulo))score-=20;
  return score;
}

async function buscarCommonsRecon(termino){
  const url=new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action","query");url.searchParams.set("generator","search");url.searchParams.set("gsrsearch",`${termino} filetype:bitmap`);url.searchParams.set("gsrnamespace","6");url.searchParams.set("gsrlimit","20");url.searchParams.set("prop","imageinfo");url.searchParams.set("iiprop","url|mime|size|extmetadata");url.searchParams.set("iiurlwidth","1200");url.searchParams.set("format","json");url.searchParams.set("origin","*");
  const res=await fetch(url.toString()); if(!res.ok) throw new Error("commons");
  const data=await res.json();
  return Object.values(data.query?.pages||{}).filter(p=>{const i=p.imageinfo?.[0];return i && /^image\/(jpeg|png|webp)$/i.test(i.mime||"") && (i.width||0)>=400 && (i.height||0)>=280;}).map(p=>({score:puntuarPaginaRecon(p,termino),url:p.imageinfo[0].thumburl||p.imageinfo[0].url,source:p.imageinfo[0].descriptionurl||"https://commons.wikimedia.org/",title:p.title||"Wikimedia Commons"})).sort((a,b)=>b.score-a.score);
}

async function cargarImagenRecon(avanzar=false){
  const c=casoActualRecon(); if(!c) return;
  const img=$r("recon-imagen"), load=$r("recon-cargando"), fuente=$r("recon-fuente");
  img.classList.remove("cargada"); load.style.display="flex"; load.textContent="Buscando fotografía clínica real…";
  try{
    if(!estadoImagenRecon){const r=await buscarCommonsRecon(c.busqueda);estadoImagenRecon={resultados:r,indice:0};}
    else if(avanzar && estadoImagenRecon.resultados.length){estadoImagenRecon.indice=(estadoImagenRecon.indice+1)%estadoImagenRecon.resultados.length;}
    if(!estadoImagenRecon.resultados.length)throw new Error("sin resultados");
    const actual=estadoImagenRecon.resultados[estadoImagenRecon.indice];
    img.onload=()=>{load.style.display="none";img.classList.add("cargada");};
    img.onerror=()=>{load.style.display="flex";load.textContent="No se pudo cargar esta imagen. Pulsa ‘Cambiar imagen’.";};
    img.src=actual.url; img.alt="Fotografía clínica para reconocimiento dermatológico";
    fuente.href=actual.source;
  }catch(e){load.style.display="flex";load.textContent="No encontramos una fotografía adecuada. Pulsa ‘Cambiar imagen’ o continúa con otro caso.";fuente.href=`https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=${encodeURIComponent(c.busqueda)}`;}
}

function valorCorrecto(respuesta,aceptadas){return aceptadas.includes(respuesta);}

function corregirRecon(){
  if(corregidoRecon)return;
  const c=casoActualRecon();
  const respuestas={};
  for(const k of [...camposRecon,"diagnostico"]){respuestas[k]=$r(`recon-${k}`).value;if(!respuestas[k]){alert("Completa todos los campos antes de corregir.");return;}}
  corregidoRecon=true;
  let puntosCaso=0;
  const comparaciones=[];
  camposRecon.forEach(k=>{
    const ok=valorCorrecto(respuestas[k],c[k]); if(ok)puntosCaso++;
    comparaciones.push({campo:k,tu:respuestas[k],esperado:c[k].join(" / "),ok});
  });
  const dxOk=respuestas.diagnostico===c.dx; if(dxOk){puntosCaso+=2;dxCorrectosRecon++;}
  puntosRecon+=puntosCaso; maxPuntosRecon+=8;
  resultadosRecon.push({id:c.id,dx:c.dx,puntos:puntosCaso,dxOk,respuestas});
  [...camposRecon,"diagnostico"].forEach(k=>$r(`recon-${k}`).disabled=true);
  $r("recon-corregir").disabled=true; $r("recon-otra-imagen").disabled=true;
  $r("recon-fuente").classList.remove("oculto");
  const labels={lesion:"Lesión",tipo:"Tipo",color:"Color",borde:"Bordes",superficie:"Superficie",distribucion:"Distribución"};
  $r("recon-comparacion").innerHTML=comparaciones.map(x=>`<div class="recon-comp ${x.ok?'ok':'mal'}"><span>${labels[x.campo]}</span><strong>${x.ok?'✓':'✕'} ${x.tu}</strong>${x.ok?'':`<small>Esperado: ${x.esperado}</small>`}</div>`).join("")+`<div class="recon-comp ${dxOk?'ok':'mal'} recon-comp-dx"><span>Diagnóstico</span><strong>${dxOk?'✓':'✕'} ${respuestas.diagnostico}</strong>${dxOk?'':`<small>Correcto: ${c.dx}</small>`}</div>`;
  $r("recon-feedback-titulo").textContent=dxOk?"Diagnóstico correcto":"Caso para reforzar";
  $r("recon-puntaje-caso").textContent=`${puntosCaso} / 8`;
  $r("recon-respuesta-dx").textContent=c.dx;
  $r("recon-respuesta-desc").textContent=c.descripcion;
  $r("recon-respuesta-fija").textContent=c.fija;
  $r("recon-feedback").classList.remove("oculto");
  actualizarStatsRecon();guardarEstadoRecon();
  setTimeout(()=>$r("recon-feedback").scrollIntoView({behavior:"smooth",block:"start"}),80);
}

function siguienteRecon(){
  indiceRecon++;
  if(indiceRecon>=ordenRecon.length){finalizarRecon();return;}
  guardarEstadoRecon();renderCasoRecon();window.scrollTo({top:120,behavior:"smooth"});
}

function finalizarRecon(){
  $r("recon-juego").classList.add("oculto");$r("recon-final").classList.remove("oculto");
  const total=ordenRecon.length,max=total*8,rend=Math.round((puntosRecon/max)*100);
  const nivel=rend>=90?"Dominio visual":rend>=75?"Buen reconocimiento":rend>=60?"En consolidación":"Prioridad de repaso";
  $r("recon-final-rend").textContent=`${rend}%`; $r("recon-final-puntos").textContent=`${puntosRecon} / ${max}`;$r("recon-final-dx").textContent=`${dxCorrectosRecon} / ${total}`;$r("recon-final-nivel").textContent=nivel;
  const errores=resultadosRecon.filter(x=>!x.dxOk);
  $r("recon-errores").innerHTML=errores.length?`<h3>Diagnósticos para reforzar</h3><div class="recon-error-chips">${errores.map(x=>`<span>${x.dx}</span>`).join("")}</div>`:`<div class="recon-perfecto">✓ Diagnosticaste correctamente todos los casos de esta sesión.</div>`;
  let h=[];try{const x=JSON.parse(localStorage.getItem(RECON_CLAVE_HISTORIAL)||"[]");h=Array.isArray(x)?x:[];}catch(e){h=[];}
  h.unshift({fecha:new Date().toISOString(),total,puntos:puntosRecon,max,rendimiento:rend,dxCorrectos:dxCorrectosRecon});localStorage.setItem(RECON_CLAVE_HISTORIAL,JSON.stringify(h.slice(0,20)));
  localStorage.setItem(RECON_CLAVE_ERRORES,JSON.stringify(errores.map(x=>x.dx)));
  localStorage.removeItem(RECON_CLAVE_ESTADO);cargarHistorialRecon();window.scrollTo({top:120,behavior:"smooth"});
}

function volverInicioRecon(){
  localStorage.removeItem(RECON_CLAVE_ESTADO);$r("recon-final").classList.add("oculto");$r("recon-juego").classList.add("oculto");$r("recon-inicio").classList.remove("oculto");cargarHistorialRecon();window.scrollTo({top:100,behavior:"smooth"});
}

iniciarSelects();
document.querySelectorAll(".recon-cantidades button").forEach(btn=>btn.addEventListener("click",()=>{cantidadRecon=Number(btn.dataset.cantidad);document.querySelectorAll(".recon-cantidades button").forEach(b=>b.classList.toggle("activo",b===btn));}));
$r("recon-empezar").addEventListener("click",empezarRecon);
$r("recon-reanudar").addEventListener("click",restaurarRecon);
$r("recon-corregir").addEventListener("click",corregirRecon);
$r("recon-siguiente").addEventListener("click",siguienteRecon);
$r("recon-otra-imagen").addEventListener("click",()=>cargarImagenRecon(true));
$r("recon-repetir").addEventListener("click",volverInicioRecon);
cargarHistorialRecon();
