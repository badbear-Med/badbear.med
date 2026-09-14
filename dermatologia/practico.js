const PRACT_CLAVE_ESTADO = "badbear_derma_practico_estado";
const PRACT_CLAVE_HISTORIAL = "badbear_derma_practico_historial";
const PRACT_CLAVE_ERRORES = "badbear_derma_practico_errores";

const $p = id => document.getElementById(id);

const casosPractico = [
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

const aliasDx = {
  psoriasis:["psoriasis","psoriasis en placas","psoriasis vulgar"],
  atopica:["dermatitis atopica","eczema atopico","eccema atopico"],
  seborreica:["dermatitis seborreica","eczema seborreico","eccema seborreico"],
  liquen:["liquen plano","lichen planus"],
  "pitiriasis-rosada":["pitiriasis rosada","pityriasis rosea"],
  urticaria:["urticaria","ronchas","habones"],
  impetigo:["impetigo","impetigo contagioso","impetigo no ampolloso"],
  erisipela:["erisipela"],
  celulitis:["celulitis","celulitis bacteriana"],
  "herpes-simple":["herpes simple","herpes simplex","hsv"],
  zoster:["herpes zoster","zoster","culebrilla"],
  molusco:["molusco contagioso","molluscum contagiosum"],
  verruga:["verruga vulgar","verruca vulgaris","verruga"],
  tinea:["tina corporal","tinea corporis","dermatofitosis corporal","tiña corporal"],
  versicolor:["pitiriasis versicolor","tinea versicolor","tina versicolor","tiña versicolor"],
  escabiosis:["escabiosis","sarna","scabies"],
  penfigo:["penfigo vulgar","pemphigus vulgaris"],
  penfigoide:["penfigoide ampolloso","bullous pemphigoid"],
  vitiligo:["vitiligo"],
  melasma:["melasma","cloasma"],
  acne:["acne vulgar","acne","acne vulgaris"],
  rosacea:["rosacea","rosacea papulopustulosa"],
  cbc:["carcinoma basocelular","basalioma","carcinoma de celulas basales","bcc"],
  melanoma:["melanoma","melanoma cutaneo","melanoma maligno"]
};

const aliasCampo = {
  lesion:{
    "Mácula / parche":["macula","mancha","parche"], "Pápula":["papula"], "Placa":["placa"],
    "Vesícula":["vesicula"], "Ampolla":["ampolla","flictena","bula"], "Pústula":["pustula"],
    "Habón / roncha":["habon","roncha"], "Costra / erosión":["costra","erosion","excoriacion"],
    "Comedón":["comedon","comedones","punto negro"], "Nódulo":["nodulo"]
  },
  tipo:{
    "Primaria":["primaria","lesion primaria"], "Secundaria":["secundaria","lesion secundaria"],
    "Mixta":["mixta","primaria y secundaria","primarias y secundarias","lesiones mixtas"]
  },
  color:{
    "Eritematosa":["eritematosa","eritematoso","eritema","rojiza","rojizo","roja","rojo"],
    "Violácea":["violacea","violaceo","purpura","purpurica","purpurico"],
    "Hiperpigmentada":["hiperpigmentada","hiperpigmentado","parduzca","parduzco","marron","cafe"],
    "Hipopigmentada":["hipopigmentada","hipopigmentado","hipocromica","hipocromico"],
    "Acrómica":["acromica","acromico","despigmentada","despigmentado"],
    "Amarillenta / melicérica":["amarillenta","amarillento","melicerica","melicerico","color miel","miel"],
    "Color piel / perlada":["color piel","color de piel","perlada","perlado","nacarada","nacarado"],
    "Pigmentada irregular":["pigmentada irregular","pigmentacion irregular","policromatica","policromatico","varios colores","variacion de color"]
  },
  borde:{
    "Bien delimitados":["bien delimitado","bien delimitados","definido","definidos","borde neto","bordes netos","nitido","nitidos"],
    "Mal delimitados":["mal delimitado","mal delimitados","difuso","difusos","impreciso","imprecisos","poco definido","poco definidos"],
    "Borde activo anular":["borde activo","borde anular","anular","circinado","borde circinado"],
    "Irregulares":["irregular","irregulares","borde irregular","bordes irregulares"]
  },
  superficie:{
    "Escamosa":["escamosa","escamoso","descamativa","descamativo","descamacion","escama","escamas"],
    "Lisa":["lisa","liso"], "Costrosa":["costrosa","costroso","costra","costras"],
    "Hiperqueratósica":["hiperqueratosica","hiperqueratosico","queratosica","queratosico","rugosa","rugoso"],
    "Vesicular / ampollosa":["vesicular","ampollosa","vesiculas","ampollas","flictenas"],
    "Erosiva":["erosiva","erosivo","erosion","erosiones","denudada","denudado"],
    "Edematosa":["edematosa","edematoso","edema","tumefacta","tumefacto"],
    "Umbilicada":["umbilicada","umbilicado","umbilicacion","depresion central"],
    "Telangiectásica / perlada":["telangiectasica","telangiectasico","telangiectasia","telangiectasias","perlada","perlado","nacarada","nacarado"],
    "Mixta":["mixta","mixto","polimorfa","polimorfo","polimorfica","polimorfico"]
  },
  distribucion:{
    "Extensora":["extensora","extensoras","superficies extensoras","codos","rodillas"],
    "Flexural":["flexural","flexuras","pliegues","antecubital","popliteo","poplitea"],
    "Seborreica":["seborreica","zonas seborreicas","cuero cabelludo","surco nasogeniano","surcos nasogenianos"],
    "Dermatomal":["dermatomal","dermatoma","metamerica","metamerico","en banda unilateral"],
    "Periorificial":["periorificial","perioral","perinasal","alrededor de la boca","alrededor de la nariz"],
    "Interdigital":["interdigital","interdigitales","entre los dedos"],
    "Fotoexpuesta":["fotoexpuesta","fotoexpuestas","expuesta al sol","expuestas al sol","fotodistribuida"],
    "Centrofacial":["centrofacial","centro facial","mejillas y nariz","nariz y mejillas"],
    "Tronco":["tronco","torax","espalda"], "Generalizada":["generalizada","generalizado","diseminada","diseminado","difusa","difuso"],
    "Localizada":["localizada","localizado","focal"],
    "Acral / simétrica":["acral","acra","simetrica","simetrico","manos y pies","acral simetrica"]
  }
};

let cantidadPractico = 10;
let ordenPractico = [];
let indicePractico = 0;
let puntosPractico = 0;
let resultadosPractico = [];
let corregidoPractico = false;
let estadoImagenPractico = null;
let finPractico = 0;
let timerPractico = null;

function norm(s){return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9ñ\s/+-]/g," ").replace(/\s+/g," ").trim();}
function barajar(a){const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}
function contiene(texto, frase){const t=` ${norm(texto)} `, f=norm(frase); return f && t.includes(f);}
function casoActual(){return casosPractico.find(x=>x.id===ordenPractico[indicePractico]);}

function aliasesPara(campo, valores){
  const tabla=aliasCampo[campo]||{}; const out=[];
  valores.forEach(v=>{(tabla[v]||[v]).forEach(a=>out.push(a));});
  return [...new Set(out)];
}

function coincideCampo(texto,campo,valores){return aliasesPara(campo,valores).some(a=>contiene(texto,a));}
function coincideDx(texto,caso){return (aliasDx[caso.id]||[caso.dx]).some(a=>norm(texto)===norm(a) || contiene(texto,a));}

function estadoLocal(){try{return JSON.parse(localStorage.getItem(PRACT_CLAVE_ESTADO)||"null");}catch(e){return null;}}
function historialLocal(){try{const h=JSON.parse(localStorage.getItem(PRACT_CLAVE_HISTORIAL)||"[]");return Array.isArray(h)?h:[];}catch(e){return [];}}

function guardarEstado(){localStorage.setItem(PRACT_CLAVE_ESTADO,JSON.stringify({orden:ordenPractico,index:indicePractico,puntos:puntosPractico,resultados:resultadosPractico,cantidad:cantidadPractico,fin:finPractico}));}

function cargarInicio(){
  const h=historialLocal(); $p("pract-h-sesiones").textContent=h.length;
  if(h.length){const mejor=Math.max(...h.map(x=>Number(x.nota)||0));$p("pract-h-mejor").textContent=`${mejor.toFixed(1).replace('.',',')} / 20`;$p("pract-h-ultima").textContent=`${Number(h[0].nota).toFixed(1).replace('.',',')} / 20`;}
  const e=estadoLocal();$p("pract-reanudar").classList.toggle("oculto",!(e&&Array.isArray(e.orden)&&e.orden.length));
}

function empezar(){
  ordenPractico=barajar(casosPractico.map(x=>x.id)).slice(0,cantidadPractico);indicePractico=0;puntosPractico=0;resultadosPractico=[];
  finPractico=Date.now()+cantidadPractico*2*60*1000;guardarEstado();abrirJuego();
}

function reanudar(){
  const e=estadoLocal();if(!e||!Array.isArray(e.orden)||!e.orden.length)return;
  ordenPractico=e.orden;indicePractico=Number(e.index)||0;puntosPractico=Number(e.puntos)||0;resultadosPractico=Array.isArray(e.resultados)?e.resultados:[];cantidadPractico=e.cantidad||e.orden.length;finPractico=e.fin||Date.now()+e.orden.length*2*60*1000;abrirJuego();
}

function abrirJuego(){
  $p("pract-inicio").classList.add("oculto");$p("pract-final").classList.add("oculto");$p("pract-juego").classList.remove("oculto");
  iniciarTimer();renderCaso();window.scrollTo({top:110,behavior:"smooth"});
}

function iniciarTimer(){
  clearInterval(timerPractico);
  const tick=()=>{
    const ms=Math.max(0,finPractico-Date.now());const s=Math.ceil(ms/1000);const mm=String(Math.floor(s/60)).padStart(2,"0"),ss=String(s%60).padStart(2,"0");
    $p("pract-tiempo").textContent=`${mm}:${ss}`;
    $p("pract-tiempo").classList.toggle("urgente",s<=120);
    if(ms<=0){clearInterval(timerPractico);finalizar(true);}
  };tick();timerPractico=setInterval(tick,1000);
}

function limpiarCaso(){
  $p("pract-descripcion").value="";$p("pract-diagnostico").value="";$p("pract-descripcion").disabled=false;$p("pract-diagnostico").disabled=false;
  $p("pract-corregir").disabled=false;$p("pract-feedback").classList.add("oculto");$p("pract-fuente").classList.add("oculto");$p("pract-otra-imagen").disabled=false;corregidoPractico=false;
}

function actualizarStats(){
  const max=ordenPractico.length*8;const rend=max?Math.round(puntosPractico/max*100):0;const dx=resultadosPractico.filter(x=>x.dxOk).length;
  $p("pract-caso-num").textContent=`${Math.min(indicePractico+1,ordenPractico.length)} / ${ordenPractico.length}`;
  $p("pract-puntos").textContent=`${puntosPractico} / ${max}`;$p("pract-dx").textContent=`${dx} / ${resultadosPractico.length}`;$p("pract-rendimiento").textContent=`${rend}%`;
}

function renderCaso(){
  const c=casoActual();if(!c){finalizar(false);return;}limpiarCaso();actualizarStats();$p("pract-etiqueta-caso").textContent=`CASO PRÁCTICO ${String(indicePractico+1).padStart(2,"0")}`;
  estadoImagenPractico=null;cargarImagen(false);guardarEstado();
}

function puntuarPagina(pagina,termino){
  const titulo=norm(pagina.title||"");const meta=pagina.imageinfo?.[0]?.extmetadata||{};const desc=norm((meta.ImageDescription?.value||"").replace(/<[^>]+>/g," "));let score=0;
  norm(termino).split(/\s+/).filter(x=>x.length>4).forEach(x=>{if(titulo.includes(x))score+=4;if(desc.includes(x))score+=2;});
  if(/clinical|patient|skin|dermat|lesion|case/.test(titulo+" "+desc))score+=4;if(/histolog|microscop|diagram|drawing|illustration|scheme|pathology slide|stain|gross specimen/.test(titulo+" "+desc))score-=16;if(/map|logo|icon|svg|chart/.test(titulo))score-=20;return score;
}

async function buscarCommons(termino){
  const url=new URL("https://commons.wikimedia.org/w/api.php");url.searchParams.set("action","query");url.searchParams.set("generator","search");url.searchParams.set("gsrsearch",`${termino} filetype:bitmap`);url.searchParams.set("gsrnamespace","6");url.searchParams.set("gsrlimit","20");url.searchParams.set("prop","imageinfo");url.searchParams.set("iiprop","url|mime|size|extmetadata");url.searchParams.set("iiurlwidth","1200");url.searchParams.set("format","json");url.searchParams.set("origin","*");
  const res=await fetch(url.toString());if(!res.ok)throw new Error("commons");const data=await res.json();
  return Object.values(data.query?.pages||{}).filter(p=>{const i=p.imageinfo?.[0];return i&&/^image\/(jpeg|png|webp)$/i.test(i.mime||"")&&(i.width||0)>=400&&(i.height||0)>=280;}).map(p=>({score:puntuarPagina(p,termino),url:p.imageinfo[0].thumburl||p.imageinfo[0].url,source:p.imageinfo[0].descriptionurl||"https://commons.wikimedia.org/",title:p.title||"Wikimedia Commons"})).sort((a,b)=>b.score-a.score);
}

async function cargarImagen(avanzar=false){
  const c=casoActual();if(!c)return;const img=$p("pract-imagen"),load=$p("pract-cargando"),fuente=$p("pract-fuente");img.classList.remove("cargada");load.style.display="flex";load.textContent="Buscando fotografía clínica real…";
  try{if(!estadoImagenPractico){estadoImagenPractico={resultados:await buscarCommons(c.busqueda),indice:0};}else if(avanzar&&estadoImagenPractico.resultados.length){estadoImagenPractico.indice=(estadoImagenPractico.indice+1)%estadoImagenPractico.resultados.length;}
    if(!estadoImagenPractico.resultados.length)throw new Error("sin resultados");const a=estadoImagenPractico.resultados[estadoImagenPractico.indice];img.onload=()=>{load.style.display="none";img.classList.add("cargada");};img.onerror=()=>{load.style.display="flex";load.textContent="No se pudo cargar esta imagen. Pulsa ‘Cambiar imagen’.";};img.src=a.url;fuente.href=a.source;
  }catch(e){load.textContent="No encontramos una fotografía adecuada. Pulsa ‘Cambiar imagen’ o continúa.";fuente.href=`https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=${encodeURIComponent(c.busqueda)}`;}
}

function calificar(){
  if(corregidoPractico)return;const c=casoActual();const desc=$p("pract-descripcion").value.trim();const dx=$p("pract-diagnostico").value.trim();
  if(desc.length<12||dx.length<2){alert("Escribe una descripción dermatológica y un diagnóstico presuntivo antes de corregir.");return;}
  const campos=["lesion","tipo","color","borde","superficie","distribucion"];const etiquetas={lesion:"Lesión dominante",tipo:"Tipo",color:"Color",borde:"Bordes",superficie:"Superficie",distribucion:"Distribución"};
  let puntos=0;const detalles=[];
  campos.forEach(campo=>{const ok=coincideCampo(desc,campo,c[campo]);if(ok)puntos++;detalles.push({campo,etiqueta:etiquetas[campo],ok,esperado:c[campo].join(" / ")});});
  const dxOk=coincideDx(dx,c);if(dxOk)puntos+=2;
  puntosPractico+=puntos;resultadosPractico.push({id:c.id,dx:c.dx,puntos,dxOk,detalles,respuestaDx:dx,descripcion:desc});corregidoPractico=true;
  $p("pract-descripcion").disabled=true;$p("pract-diagnostico").disabled=true;$p("pract-corregir").disabled=true;$p("pract-otra-imagen").disabled=true;
  const cards=detalles.map(d=>`<div class="pract-comp ${d.ok?'ok':'mal'}"><span>${d.etiqueta}</span><strong>${d.ok?'✓ Detectado':'✕ No detectado'}</strong><small>Esperado: ${d.esperado}</small></div>`).join("");
  $p("pract-comparacion").innerHTML=cards+`<div class="pract-comp pract-comp-dx ${dxOk?'ok':'mal'}"><span>Diagnóstico</span><strong>${dxOk?'✓ Correcto':'✕ Incorrecto o no reconocido'}</strong><small>Tu respuesta: ${escapeHtml(dx)} · Esperado: ${c.dx}</small></div>`;
  $p("pract-feedback-titulo").textContent=dxOk?"Diagnóstico correcto":"Revisa la descripción y el diagnóstico";$p("pract-puntaje-caso").textContent=`${puntos} / 8`;$p("pract-respuesta-dx").textContent=c.dx;$p("pract-respuesta-desc").textContent=c.descripcion;$p("pract-respuesta-fija").textContent=c.fija;
  $p("pract-feedback").classList.remove("oculto");$p("pract-fuente").classList.remove("oculto");actualizarStats();guardarEstado();setTimeout(()=>$p("pract-feedback").scrollIntoView({behavior:"smooth",block:"start"}),60);
}

function escapeHtml(s){return String(s).replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));}

function siguiente(){if(!corregidoPractico)return;indicePractico++;if(indicePractico>=ordenPractico.length)finalizar(false);else{renderCaso();window.scrollTo({top:105,behavior:"smooth"});}}

function finalizar(porTiempo=false){
  clearInterval(timerPractico);$p("pract-juego").classList.add("oculto");$p("pract-inicio").classList.add("oculto");$p("pract-final").classList.remove("oculto");
  const total=ordenPractico.length,max=total*8,rend=max?Math.round(puntosPractico/max*100):0,nota=max?(puntosPractico/max*20):0,dxCorrectos=resultadosPractico.filter(x=>x.dxOk).length;
  $p("pract-final-rend").textContent=`${rend}%`;$p("pract-final-nota").textContent=`${nota.toFixed(1).replace('.',',')} / 20`;$p("pract-final-puntos").textContent=`${puntosPractico} / ${max}`;$p("pract-final-dx").textContent=`${dxCorrectos} / ${total}`;$p("pract-final-motivo").textContent=porTiempo?"Tiempo agotado: la sesión se cerró automáticamente.":"Sesión completada.";
  const errores=resultadosPractico.filter(x=>!x.dxOk || x.puntos<6);const faltantes=Math.max(0,total-resultadosPractico.length);
  $p("pract-errores").innerHTML=(errores.length||faltantes)?`<h3>Casos para reforzar</h3><div class="pract-error-chips">${errores.map(x=>`<span>${x.dx} · ${x.puntos}/8</span>`).join("")}${faltantes?`<span>${faltantes} caso(s) sin responder</span>`:""}</div>`:`<div class="pract-perfecto">✓ Completaste todos los casos con buen reconocimiento.</div>`;
  const h=historialLocal();h.unshift({fecha:new Date().toISOString(),total,puntos:puntosPractico,max,rendimiento:rend,nota:Number(nota.toFixed(1)),dxCorrectos,respondidos:resultadosPractico.length});localStorage.setItem(PRACT_CLAVE_HISTORIAL,JSON.stringify(h.slice(0,20)));localStorage.setItem(PRACT_CLAVE_ERRORES,JSON.stringify(errores.map(x=>x.dx)));localStorage.removeItem(PRACT_CLAVE_ESTADO);cargarInicio();window.scrollTo({top:100,behavior:"smooth"});
}

function nuevo(){clearInterval(timerPractico);localStorage.removeItem(PRACT_CLAVE_ESTADO);$p("pract-final").classList.add("oculto");$p("pract-juego").classList.add("oculto");$p("pract-inicio").classList.remove("oculto");cargarInicio();window.scrollTo({top:90,behavior:"smooth"});}

document.querySelectorAll(".pract-cantidades button").forEach(btn=>btn.addEventListener("click",()=>{cantidadPractico=Number(btn.dataset.cantidad);document.querySelectorAll(".pract-cantidades button").forEach(b=>b.classList.toggle("activo",b===btn));$p("pract-tiempo-config").textContent=`${cantidadPractico*2} min`;}));
$p("pract-empezar").addEventListener("click",empezar);$p("pract-reanudar").addEventListener("click",reanudar);$p("pract-corregir").addEventListener("click",calificar);$p("pract-siguiente").addEventListener("click",siguiente);$p("pract-otra-imagen").addEventListener("click",()=>cargarImagen(true));$p("pract-nuevo").addEventListener("click",nuevo);
cargarInicio();
