const SRS_CLAVE = "badbear_derma_srs_v1";
const SRS_HISTORIAL = "badbear_derma_srs_historial_v1";
const SRS_RESPUESTAS = "badbear_derma_examen_respuestas";
const SRS_RECUPERADAS = "badbear_derma_examen_recuperadas";
const SRS_FAVORITOS = "badbear_derma_favoritos";
const SRS_DATA = window.BADBEAR_REPETICION_DATA || {examen:{},banco:{}};
const SRS_INTERVALOS = [1,3,7,14,30,60,90];
const s$ = id => document.getElementById(id);
let srsFiltro = "hoy";
let srsCola = [];
let srsIndice = 0;

function srsObjeto(clave){
  try{const x=JSON.parse(localStorage.getItem(clave)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{};}catch(e){return {};}
}
function srsArray(clave){
  try{const x=JSON.parse(localStorage.getItem(clave)||"[]");return Array.isArray(x)?x:[];}catch(e){return [];}
}
function srsGuardar(obj){localStorage.setItem(SRS_CLAVE,JSON.stringify(obj));}
function srsClave(tipo,id){return `${tipo}:${id}`;}
function srsDia(ms){return 24*60*60*1000*ms;}
function srsInicioDia(ts=Date.now()){const d=new Date(ts);d.setHours(0,0,0,0);return d.getTime();}
function srsFinDia(ts=Date.now()){const d=new Date(ts);d.setHours(23,59,59,999);return d.getTime();}
function srsContenido(tipo,id){return SRS_DATA[tipo]?.[String(id)] || null;}
function srsTemaLimpio(t){return String(t||"").replace(/^PARTE\s+\d+:\s*/i,"");}

function srsAsegurar(obj,tipo,id,motivo="repaso",forzarHoy=false){
  const key=srsClave(tipo,id); const data=srsContenido(tipo,id);
  if(!data) return;
  const ahora=Date.now();
  const anterior=obj[key];
  if(!anterior){
    obj[key]={key,tipo,id:Number(id),titulo:data.titulo,tema:data.tema||"",motivos:[motivo],etapa:0,intervaloDias:0,creadoEn:ahora,actualizadoEn:ahora,proximoEn:ahora,activo:true,aciertos:0,fallos:0};
  }else{
    anterior.activo=true; anterior.actualizadoEn=ahora;
    anterior.motivos=Array.isArray(anterior.motivos)?anterior.motivos:[];
    if(!anterior.motivos.includes(motivo)) anterior.motivos.push(motivo);
    if(forzarHoy && Number(anterior.proximoEn)>ahora) anterior.proximoEn=ahora;
  }
}

function srsSincronizar(){
  const obj=srsObjeto(SRS_CLAVE);
  const respuestas=srsObjeto(SRS_RESPUESTAS);
  const recuperadas=srsObjeto(SRS_RECUPERADAS);
  Object.entries(respuestas).forEach(([id,r])=>{
    if(r&&r.correcta===false&&recuperadas[id]!==true) srsAsegurar(obj,"examen",id,"error",true);
  });
  srsArray(SRS_FAVORITOS).forEach(f=>{
    if(!f||!["examen","banco"].includes(String(f.tipo))) return;
    srsAsegurar(obj,String(f.tipo),f.id,"FIJA",false);
  });
  srsGuardar(obj);
  srsRenderTodo();
}

function srsTodos(){return Object.values(srsObjeto(SRS_CLAVE)).filter(x=>x&&x.activo!==false&&srsContenido(x.tipo,x.id));}
function srsEsDominado(x){return Number(x.intervaloDias)>=30 || Number(x.etapa)>=5;}
function srsFiltrar(){
  const ahora=Date.now(), fin=srsFinDia(), semana=ahora+srsDia(7);
  let base=srsTodos();
  if(srsFiltro==="hoy") base=base.filter(x=>Number(x.proximoEn||0)<=fin&&!srsEsDominado(x));
  if(srsFiltro==="proximos") base=base.filter(x=>Number(x.proximoEn||0)>fin&&Number(x.proximoEn||0)<=semana&&!srsEsDominado(x));
  if(srsFiltro==="dominados") base=base.filter(srsEsDominado);
  base.sort((a,b)=>(Number(a.proximoEn)||0)-(Number(b.proximoEn)||0));
  return base;
}
function srsFechaRelativa(ts){
  const d=Number(ts)||0, ahora=Date.now(); if(d<=ahora) return "Disponible ahora";
  const dif=d-ahora; if(dif<60*60*1000) return `En ${Math.max(1,Math.ceil(dif/60000))} min`;
  if(dif<srsDia(1)) return `En ${Math.ceil(dif/3600000)} h`;
  return `En ${Math.ceil(dif/srsDia(1))} día${Math.ceil(dif/srsDia(1))===1?"":"s"}`;
}
function srsIntervaloBien(item){const e=Math.min(SRS_INTERVALOS.length-1,Math.max(0,Number(item.etapa)||0)+1);return SRS_INTERVALOS[e];}
function srsIntervaloDominado(item){const e=Math.min(SRS_INTERVALOS.length-1,Math.max(0,Number(item.etapa)||0)+2);return SRS_INTERVALOS[e];}

function srsRenderStats(){
  const todos=srsTodos(), ahora=Date.now(), fin=srsFinDia(), semana=ahora+srsDia(7);
  s$("srs-hoy").textContent=todos.filter(x=>Number(x.proximoEn||0)<=fin&&!srsEsDominado(x)).length;
  s$("srs-semana").textContent=todos.filter(x=>Number(x.proximoEn||0)>fin&&Number(x.proximoEn||0)<=semana&&!srsEsDominado(x)).length;
  s$("srs-dominadas").textContent=todos.filter(srsEsDominado).length;
  const hoy=srsInicioDia();
  s$("srs-repasos-hoy").textContent=srsArray(SRS_HISTORIAL).filter(x=>Number(x.fecha)>=hoy).length;
}

function srsRenderLista(){
  const c=s$("srs-lista"); c.innerHTML="";
  if(!srsCola.length){c.innerHTML='<div class="srs-lista-vacia">No hay elementos en este filtro.</div>';return;}
  srsCola.slice(0,12).forEach((x,i)=>{
    const data=srsContenido(x.tipo,x.id); const b=document.createElement("button");
    b.type="button"; b.className=`srs-lista-item${i===srsIndice?" activo":""}`;
    b.innerHTML=`<span>${x.tipo==="examen"?"EXAMEN":"BANCO"}</span><strong>${data?.titulo||x.titulo}</strong><small>${srsFechaRelativa(x.proximoEn)}</small>`;
    b.addEventListener("click",()=>{srsIndice=i;srsRenderCard();srsRenderLista();}); c.appendChild(b);
  });
}

function srsRenderCard(){
  const vacio=s$("srs-vacio"), contenido=s$("srs-contenido"), footer=document.querySelector(".srs-card-footer");
  if(!srsCola.length){
    vacio.classList.remove("oculto"); contenido.classList.add("oculto"); footer.style.display="none";
    s$("srs-tipo").textContent="REPASO"; s$("srs-titulo").textContent="Sin elementos pendientes"; s$("srs-tema").textContent=""; s$("srs-contador").textContent="0 / 0"; s$("srs-proxima").textContent=""; return;
  }
  if(srsIndice>=srsCola.length) srsIndice=0;
  const item=srsCola[srsIndice], data=srsContenido(item.tipo,item.id); if(!data) return;
  vacio.classList.add("oculto"); contenido.classList.remove("oculto"); footer.style.display="flex";
  s$("srs-tipo").textContent=item.tipo==="examen"?"EXÁMENES PASADOS":"BANCO CLÍNICO";
  s$("srs-titulo").textContent=data.titulo; s$("srs-tema").textContent=srsTemaLimpio(data.tema);
  s$("srs-contador").textContent=`${srsIndice+1} / ${srsCola.length}`; s$("srs-proxima").textContent=srsFechaRelativa(item.proximoEn);
  s$("srs-frente").textContent=data.frente;
  const ops=s$("srs-opciones"); ops.innerHTML="";
  (data.opciones||[]).forEach(o=>{const d=document.createElement("div");d.innerHTML=`<b>${o.letra}</b><span>${o.texto}</span>`;ops.appendChild(d);});
  s$("srs-respuesta-texto").textContent=data.respuesta||""; s$("srs-explicacion").textContent=data.explicacion||""; s$("srs-fija").textContent=data.fija||"Sin FIJA registrada.";
  s$("srs-abrir-origen").href=data.href||"repaso.html";
  s$("srs-respuesta").classList.add("oculto"); s$("srs-revelar").style.display="inline-flex";
  s$("srs-bien-tiempo").textContent=`${srsIntervaloBien(item)} día${srsIntervaloBien(item)===1?"":"s"}`;
  s$("srs-dominado-tiempo").textContent=`${srsIntervaloDominado(item)} días`;
}

function srsRegistrarHist(item,nota,antes){
  const h=srsArray(SRS_HISTORIAL); h.unshift({fecha:Date.now(),key:item.key,tipo:item.tipo,id:item.id,nota,antes,despues:item.proximoEn,intervaloDias:item.intervaloDias});
  localStorage.setItem(SRS_HISTORIAL,JSON.stringify(h.slice(0,600)));
}
function srsCalificar(nota){
  if(!srsCola.length) return;
  const obj=srsObjeto(SRS_CLAVE), item=obj[srsCola[srsIndice].key]; if(!item) return;
  const ahora=Date.now(), antes=item.proximoEn, etapa=Math.max(0,Number(item.etapa)||0);
  if(nota==="otra"){
    item.etapa=0; item.intervaloDias=0; item.proximoEn=ahora+10*60*1000; item.fallos=Number(item.fallos||0)+1;
  }else if(nota==="dificil"){
    const dias=Math.max(1,etapa===0?1:Math.ceil((Number(item.intervaloDias)||1)*0.75)); item.intervaloDias=dias; item.proximoEn=ahora+srsDia(dias); item.fallos=Number(item.fallos||0)+(etapa===0?0:1);
  }else if(nota==="bien"){
    item.etapa=Math.min(SRS_INTERVALOS.length-1,etapa+1); item.intervaloDias=SRS_INTERVALOS[item.etapa]; item.proximoEn=ahora+srsDia(item.intervaloDias); item.aciertos=Number(item.aciertos||0)+1;
  }else{
    item.etapa=Math.min(SRS_INTERVALOS.length-1,etapa+2); item.intervaloDias=SRS_INTERVALOS[item.etapa]; item.proximoEn=ahora+srsDia(item.intervaloDias); item.aciertos=Number(item.aciertos||0)+1;
  }
  item.ultimoResultado=nota; item.ultimoRepasoEn=ahora; item.actualizadoEn=ahora;
  obj[item.key]=item; srsGuardar(obj); srsRegistrarHist(item,nota,antes);
  srsRenderTodo();
}
function srsQuitar(){
  if(!srsCola.length) return; const obj=srsObjeto(SRS_CLAVE), key=srsCola[srsIndice].key;
  if(obj[key]){obj[key].activo=false;obj[key].actualizadoEn=Date.now();srsGuardar(obj);} srsRenderTodo();
}
function srsMezclar(){
  for(let i=srsCola.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[srsCola[i],srsCola[j]]=[srsCola[j],srsCola[i]];} srsIndice=0;srsRenderCard();srsRenderLista();
}
function srsRenderTodo(){srsRenderStats();srsCola=srsFiltrar();srsIndice=0;s$("srs-cola-texto").textContent=`${srsCola.length} elemento${srsCola.length===1?"":"s"}`;srsRenderCard();srsRenderLista();}

s$("srs-sincronizar").addEventListener("click",srsSincronizar);
s$("srs-mezclar").addEventListener("click",srsMezclar);
s$("srs-revelar").addEventListener("click",()=>{s$("srs-respuesta").classList.remove("oculto");s$("srs-revelar").style.display="none";});
s$("srs-quitar").addEventListener("click",srsQuitar);
document.querySelectorAll("[data-filtro]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-filtro]").forEach(x=>x.classList.remove("activo"));b.classList.add("activo");srsFiltro=b.dataset.filtro;srsRenderTodo();}));
document.querySelectorAll("[data-nota]").forEach(b=>b.addEventListener("click",()=>srsCalificar(b.dataset.nota)));

srsSincronizar();
