const HIST_CLAVES = {
  simulador: "badbear_derma_simulador_historial",
  practico: "badbear_derma_practico_historial",
  recon: "badbear_derma_recon_historial",
  examenTemas: "badbear_derma_examen_temas",
  bancoTemas: "badbear_derma_banco_temas",
  temasHist: "badbear_derma_historial_temas_v1"
};

const h$ = id => document.getElementById(id);

function hLeerArray(clave){
  try{ const x=JSON.parse(localStorage.getItem(clave)||"[]"); return Array.isArray(x)?x:[]; }
  catch(e){ return []; }
}

function hLeerObjeto(clave){
  try{ const x=JSON.parse(localStorage.getItem(clave)||"{}"); return x && typeof x==="object" && !Array.isArray(x)?x:{}; }
  catch(e){ return {}; }
}

function hFecha(valor){
  if(typeof valor === "number") return valor;
  const n = Date.parse(valor);
  return Number.isFinite(n) ? n : 0;
}

function hFechaCorta(valor){
  const f = new Date(hFecha(valor));
  if(Number.isNaN(f.getTime())) return "—";
  return f.toLocaleDateString("es-PE", {day:"2-digit", month:"2-digit"});
}

function hFechaLarga(valor){
  const f = new Date(hFecha(valor));
  if(Number.isNaN(f.getTime())) return "—";
  return f.toLocaleString("es-PE", {dateStyle:"short", timeStyle:"short"});
}

function hNota(n){ return Number(n).toFixed(1).replace(".", ","); }
function hPromedio(arr){ return arr.length ? arr.reduce((s,x)=>s+Number(x||0),0)/arr.length : null; }

function hRegistrarSnapshotTemas(){
  const compactar = obj => {
    const salida = {};
    Object.entries(obj||{}).forEach(([k,item]) => {
      if(!item) return;
      salida[k] = {tema:item.tema||k, respondidas:Number(item.respondidas)||0, rendimiento:Number(item.rendimiento)||0};
    });
    return salida;
  };

  const examen = compactar(hLeerObjeto(HIST_CLAVES.examenTemas));
  const banco = compactar(hLeerObjeto(HIST_CLAVES.bancoTemas));
  if(!Object.keys(examen).length && !Object.keys(banco).length) return;

  const historial = hLeerArray(HIST_CLAVES.temasHist);
  const firma = JSON.stringify({examen,banco});
  if(historial[0] && historial[0].firma === firma) return;

  historial.unshift({fecha:Date.now(), examen, banco, firma});
  localStorage.setItem(HIST_CLAVES.temasHist, JSON.stringify(historial.slice(0,80)));
}

function hDatos(){
  const sim = hLeerArray(HIST_CLAVES.simulador);
  const pract = hLeerArray(HIST_CLAVES.practico);
  const recon = hLeerArray(HIST_CLAVES.recon);

  const notas = [
    ...sim.map(x=>({tipo:"Simulador", clase:"azul", fecha:hFecha(x.fecha), valor:Number(x.nota)||0, detalle:`${x.total||0} preguntas · ${x.rendimiento||0}%`})),
    ...pract.map(x=>({tipo:"Práctico", clase:"naranja", fecha:hFecha(x.fecha), valor:Number(x.nota)||0, detalle:`${x.total||0} casos · ${x.rendimiento||0}%`}))
  ].filter(x=>x.fecha).sort((a,b)=>a.fecha-b.fecha);

  const reconocimiento = recon.map(x=>({tipo:"Reconocimiento", clase:"amarillo", fecha:hFecha(x.fecha), valor:Number(x.rendimiento)||0, detalle:`${x.total||0} casos · ${x.dxCorrectos||0} diagnósticos`})).filter(x=>x.fecha).sort((a,b)=>a.fecha-b.fecha);

  return {sim, pract, recon, notas, reconocimiento};
}

function hResumen(datos){
  const total = datos.sim.length + datos.pract.length + datos.recon.length;
  const notas = datos.notas.map(x=>x.valor);
  const prom = hPromedio(notas);
  const mejor = notas.length ? Math.max(...notas) : null;
  const tendencia = notas.length>=2 ? notas.at(-1)-notas.at(-2) : null;

  h$("hist-total-sesiones").textContent = total;
  h$("hist-promedio-notas").textContent = prom===null ? "—" : `${hNota(prom)} / 20`;
  h$("hist-mejor-nota").textContent = mejor===null ? "—" : `${hNota(mejor)} / 20`;

  const t = h$("hist-tendencia");
  t.className = "";
  if(tendencia===null){ t.textContent="—"; }
  else if(Math.abs(tendencia)<0.05){ t.textContent="→ estable"; t.classList.add("estable"); }
  else if(tendencia>0){ t.textContent=`↑ +${hNota(tendencia)}`; t.classList.add("sube"); }
  else { t.textContent=`↓ ${hNota(tendencia)}`; t.classList.add("baja"); }
}

function hSvgSerie(contenedorId, series, maxY, ticks, sufijo){
  const cont = h$(contenedorId);
  cont.innerHTML = "";
  const todos = series.flatMap(s=>s.datos);
  if(!todos.length){
    cont.innerHTML = '<div class="hist-vacio">Todavía no hay registros suficientes para dibujar esta evolución.</div>';
    return;
  }

  const NS="http://www.w3.org/2000/svg", w=760, h=285, ml=48, mr=18, mt=18, mb=42;
  const svg=document.createElementNS(NS,"svg"); svg.setAttribute("viewBox",`0 0 ${w} ${h}`); svg.setAttribute("class","hist-svg");
  const minF=Math.min(...todos.map(x=>x.fecha)), maxF=Math.max(...todos.map(x=>x.fecha));
  const span=Math.max(1,maxF-minF);
  const x=f=>ml+((f-minF)/span)*(w-ml-mr);
  const y=v=>mt+(1-Math.max(0,Math.min(maxY,v))/maxY)*(h-mt-mb);

  ticks.forEach(v=>{
    const yy=y(v);
    const line=document.createElementNS(NS,"line"); line.setAttribute("x1",ml); line.setAttribute("x2",w-mr); line.setAttribute("y1",yy); line.setAttribute("y2",yy); line.setAttribute("class","hist-gridline"); svg.appendChild(line);
    const tx=document.createElementNS(NS,"text"); tx.setAttribute("x",ml-10); tx.setAttribute("y",yy+4); tx.setAttribute("text-anchor","end"); tx.setAttribute("class","hist-axis-text"); tx.textContent=`${v}${sufijo}`; svg.appendChild(tx);
  });

  const first=document.createElementNS(NS,"text"); first.setAttribute("x",ml); first.setAttribute("y",h-13); first.setAttribute("class","hist-axis-text"); first.textContent=hFechaCorta(minF); svg.appendChild(first);
  const last=document.createElementNS(NS,"text"); last.setAttribute("x",w-mr); last.setAttribute("y",h-13); last.setAttribute("text-anchor","end"); last.setAttribute("class","hist-axis-text"); last.textContent=hFechaCorta(maxF); svg.appendChild(last);

  series.forEach(s=>{
    if(!s.datos.length) return;
    const puntos=s.datos.map(p=>`${x(p.fecha)},${y(p.valor)}`).join(" ");
    if(s.datos.length>1){
      const poly=document.createElementNS(NS,"polyline"); poly.setAttribute("points",puntos); poly.setAttribute("class",`hist-line ${s.clase}`); svg.appendChild(poly);
    }
    s.datos.forEach(p=>{
      const c=document.createElementNS(NS,"circle"); c.setAttribute("cx",x(p.fecha)); c.setAttribute("cy",y(p.valor)); c.setAttribute("r","5"); c.setAttribute("class",`hist-point ${s.clase}`);
      const title=document.createElementNS(NS,"title"); title.textContent=`${p.tipo} · ${hFechaLarga(p.fecha)} · ${p.valor}${sufijo}`; c.appendChild(title); svg.appendChild(c);
    });
  });
  cont.appendChild(svg);
}

function hModalidad(nombre, clase, datos, metrica, sufijo){
  const article=document.createElement("article"); article.className=`hist-mod-card ${clase}`;
  const vals=datos.map(metrica).filter(v=>Number.isFinite(v));
  const ultimo=vals.length ? metrica(datos[0]) : null;
  const mejor=vals.length ? Math.max(...vals) : null;
  const promedio=vals.length ? hPromedio(vals) : null;
  const formato=v=>v===null?"—":`${hNota(v)}${sufijo}`;
  article.innerHTML=`<span>${nombre.toUpperCase()}</span><strong>${datos.length} intentos</strong><div><small>Último</small><b>${formato(ultimo)}</b></div><div><small>Promedio</small><b>${formato(promedio)}</b></div><div><small>Mejor</small><b>${formato(mejor)}</b></div>`;
  return article;
}

function hRenderModalidades(datos){
  const cont=h$("hist-modalidades"); cont.innerHTML="";
  cont.append(
    hModalidad("Simulador","azul",datos.sim,x=>Number(x.nota)||0," / 20"),
    hModalidad("Práctico","naranja",datos.pract,x=>Number(x.nota)||0," / 20"),
    hModalidad("Reconocimiento","amarillo",datos.recon,x=>Number(x.rendimiento)||0,"%")
  );
}

function hTemasActuales(){
  const examen=Object.values(hLeerObjeto(HIST_CLAVES.examenTemas)).map(x=>({...x,fuente:"Exámenes"}));
  const banco=Object.values(hLeerObjeto(HIST_CLAVES.bancoTemas)).map(x=>({...x,fuente:"Banco"}));
  const items=[...examen,...banco].filter(x=>x && Number(x.respondidas)>0).sort((a,b)=>Number(a.rendimiento)-Number(b.rendimiento)).slice(0,12);
  const cont=h$("hist-temas-actuales"); cont.innerHTML="";
  if(!items.length){cont.innerHTML='<div class="hist-vacio">Aún no hay datos por tema.</div>';return;}

  items.forEach(item=>{
    const r=Number(item.rendimiento)||0;
    const clase=r<60?"rojo":r<75?"amarillo":"azul";
    const row=document.createElement("div"); row.className="hist-tema-row";
    row.innerHTML=`<div class="hist-tema-top"><div><strong>${item.tema||"Tema"}</strong><small>${item.fuente} · ${Number(item.respondidas)||0} respondidas</small></div><b class="${clase}">${r}%</b></div><div class="hist-tema-bar"><i class="${clase}" style="width:${Math.max(0,Math.min(100,r))}%"></i></div>`;
    cont.appendChild(row);
  });
}

function hSnapshotMapa(snap){
  const mapa={};
  [["Exámenes",snap.examen||{}],["Banco",snap.banco||{}]].forEach(([fuente,obj])=>{
    Object.values(obj).forEach(item=>{
      if(!item) return;
      mapa[`${fuente}|${item.tema}`]={fuente,tema:item.tema,rendimiento:Number(item.rendimiento)||0,respondidas:Number(item.respondidas)||0};
    });
  });
  return mapa;
}

function hTendenciasTemas(){
  const hist=hLeerArray(HIST_CLAVES.temasHist);
  const cont=h$("hist-tendencias-temas"); cont.innerHTML="";
  if(hist.length<2){cont.innerHTML='<div class="hist-vacio">El seguimiento por tema acaba de comenzar. Responde nuevas preguntas o casos y aquí aparecerá la tendencia.</div>';return;}

  const actual=hSnapshotMapa(hist[0]);
  const cambios=[];
  Object.entries(actual).forEach(([clave,ult])=>{
    let ant=null;
    for(let i=hist.length-1;i>=1;i--){
      const m=hSnapshotMapa(hist[i]);
      if(m[clave]){ant=m[clave];break;}
    }
    if(!ant) return;
    if(ult.respondidas<=ant.respondidas && ult.rendimiento===ant.rendimiento) return;
    cambios.push({...ult,delta:ult.rendimiento-ant.rendimiento,desde:ant.rendimiento});
  });

  if(!cambios.length){cont.innerHTML='<div class="hist-vacio">Todavía no hay cambios suficientes para comparar temas.</div>';return;}
  cambios.sort((a,b)=>b.delta-a.delta);
  const mejora=cambios.filter(x=>x.delta>0).slice(0,4);
  const reforzar=cambios.filter(x=>x.delta<0 || x.rendimiento<60).sort((a,b)=>a.rendimiento-b.rendimiento).slice(0,4);

  const grupo=(titulo,items,tipo)=>{
    const sec=document.createElement("div"); sec.className="hist-tend-grupo";
    sec.innerHTML=`<h4>${titulo}</h4>`;
    if(!items.length){sec.innerHTML+='<p class="hist-mini-vacio">Sin cambios relevantes todavía.</p>';return sec;}
    items.forEach(x=>{
      const el=document.createElement("div"); el.className=`hist-cambio ${tipo}`;
      const delta=x.delta>0?`+${x.delta}`:`${x.delta}`;
      el.innerHTML=`<div><strong>${x.tema}</strong><small>${x.fuente} · ${x.respondidas} respondidas</small></div><b>${x.rendimiento}% <em>${delta}</em></b>`;
      sec.appendChild(el);
    });
    return sec;
  };
  cont.append(grupo("↑ Mejorando",mejora,"mejora"),grupo("Prioridad de repaso",reforzar,"alerta"));
}

function hTimeline(datos){
  const eventos=[
    ...datos.sim.map(x=>({tipo:"Simulador",clase:"azul",fecha:hFecha(x.fecha),valor:`${hNota(x.nota)} / 20`,detalle:`${x.total||0} preguntas · ${x.rendimiento||0}%`})),
    ...datos.pract.map(x=>({tipo:"Práctico",clase:"naranja",fecha:hFecha(x.fecha),valor:`${hNota(x.nota)} / 20`,detalle:`${x.total||0} casos · ${x.rendimiento||0}%`})),
    ...datos.recon.map(x=>({tipo:"Reconocimiento",clase:"amarillo",fecha:hFecha(x.fecha),valor:`${Number(x.rendimiento)||0}%`,detalle:`${x.total||0} casos · ${x.dxCorrectos||0} diagnósticos`}))
  ].filter(x=>x.fecha).sort((a,b)=>b.fecha-a.fecha).slice(0,15);

  const cont=h$("hist-timeline"); cont.innerHTML="";
  if(!eventos.length){cont.innerHTML='<div class="hist-vacio">Todavía no hay evaluaciones registradas.</div>';return;}
  eventos.forEach(e=>{
    const row=document.createElement("div"); row.className="hist-time-row";
    row.innerHTML=`<i class="${e.clase}"></i><div><strong>${e.tipo}</strong><small>${hFechaLarga(e.fecha)} · ${e.detalle}</small></div><b>${e.valor}</b>`;
    cont.appendChild(row);
  });
}

function hInit(){
  hRegistrarSnapshotTemas();
  const datos=hDatos();
  hResumen(datos);
  hSvgSerie("hist-chart-notas",[
    {clase:"azul",datos:datos.notas.filter(x=>x.tipo==="Simulador")},
    {clase:"naranja",datos:datos.notas.filter(x=>x.tipo==="Práctico")}
  ],20,[0,5,10,15,20],"");
  hSvgSerie("hist-chart-recon",[{clase:"amarillo",datos:datos.reconocimiento}],100,[0,25,50,75,100],"%");
  hRenderModalidades(datos);
  hTemasActuales();
  hTendenciasTemas();
  hTimeline(datos);
}

document.addEventListener("DOMContentLoaded",hInit);
