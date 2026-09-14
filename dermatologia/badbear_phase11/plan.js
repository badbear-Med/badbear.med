const PLAN_CLAVES = {
  estado: "badbear_derma_plan_diario_v1",
  respuestas: "badbear_derma_examen_respuestas",
  recuperadas: "badbear_derma_examen_recuperadas",
  examenTemas: "badbear_derma_examen_temas",
  bancoTemas: "badbear_derma_banco_temas",
  debiles: "badbear_derma_temas_debiles",
  favoritos: "badbear_derma_favoritos",
  reconErrores: "badbear_derma_recon_errores",
  practErrores: "badbear_derma_practico_errores",
  reconHist: "badbear_derma_recon_historial",
  practHist: "badbear_derma_practico_historial",
  simHist: "badbear_derma_simulador_historial",
  audios: "badbear_derma_audios_completados",
  srs: "badbear_derma_srs_v1"
};

const p$ = id => document.getElementById(id);

function pArray(clave){
  try{ const x=JSON.parse(localStorage.getItem(clave)||"[]"); return Array.isArray(x)?x:[]; }
  catch(e){ return []; }
}
function pObjeto(clave){
  try{ const x=JSON.parse(localStorage.getItem(clave)||"{}"); return x&&typeof x==="object"&&!Array.isArray(x)?x:{}; }
  catch(e){ return {}; }
}
function pHoy(){
  const d=new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function pTemaLimpio(t){ return String(t||"Tema").replace(/^PARTE\s+\d+:\s*/i,""); }
function pClamp(v,a=0,b=100){ return Math.max(a,Math.min(b,Number(v)||0)); }
function pPromedioPonderado(items){
  let n=0,d=0;
  items.forEach(x=>{ if(Number.isFinite(x.valor)&&x.peso>0){n+=x.valor*x.peso;d+=x.peso;} });
  return d?Math.round(n/d):null;
}

function pDatos(){
  const respuestas=pObjeto(PLAN_CLAVES.respuestas);
  const recuperadas=pObjeto(PLAN_CLAVES.recuperadas);
  const errores=Object.entries(respuestas)
    .filter(([,r])=>r&&r.correcta===false)
    .map(([id])=>Number(id))
    .filter(id=>Number.isFinite(id)&&recuperadas[id]!==true);

  const srsItems=Object.values(pObjeto(PLAN_CLAVES.srs)).filter(x=>x&&x.activo!==false);
  const ahoraSRS=Date.now();
  const finHoySRS=new Date(); finHoySRS.setHours(23,59,59,999);
  const srsDominada=x=>Number(x.intervaloDias)>=30||Number(x.etapa)>=5;
  const srsHoy=srsItems.filter(x=>Number(x.proximoEn||0)<=finHoySRS.getTime()&&!srsDominada(x));

  const examen=Object.values(pObjeto(PLAN_CLAVES.examenTemas)).filter(x=>x&&Number(x.respondidas)>0).map(x=>({
    fuente:"Exámenes", tema:pTemaLimpio(x.tema), respondidas:Number(x.respondidas)||0,
    rendimiento:pClamp(x.rendimiento), correcta:Number(x.dominadas)||Number(x.correctas)||0
  }));
  const banco=Object.values(pObjeto(PLAN_CLAVES.bancoTemas)).filter(x=>x&&Number(x.respondidas)>0).map(x=>({
    fuente:"Banco", tema:pTemaLimpio(x.tema), respondidas:Number(x.respondidas)||0,
    rendimiento:pClamp(x.rendimiento), correcta:Number(x.correctas)||0
  }));

  const weak=pArray(PLAN_CLAVES.debiles);
  const weakSet=new Set(weak.map(x=>`${String(x.fuente||"").toLowerCase()}|${pTemaLimpio(x.tema)}`));
  const temas=[...examen,...banco].map(x=>{
    const key=`${x.fuente.toLowerCase()}|${x.tema}`;
    const explicita=[...weakSet].some(k=>k.endsWith(`|${x.tema}`));
    const baja=x.rendimiento<60;
    const consolidacion=x.rendimiento>=60&&x.rendimiento<75;
    let prioridad=(100-x.rendimiento)+(baja?25:consolidacion?10:0)+Math.min(x.respondidas,10)*0.6+(explicita?10:0);
    if(x.fuente==="Exámenes") prioridad+=4;
    return {...x,prioridad};
  }).sort((a,b)=>b.prioridad-a.prioridad);

  const reconErrores=[...new Set(pArray(PLAN_CLAVES.reconErrores).filter(Boolean))];
  const practErrores=[...new Set(pArray(PLAN_CLAVES.practErrores).filter(Boolean))];
  const visuales=[...new Set([...reconErrores,...practErrores])];
  const favoritos=pArray(PLAN_CLAVES.favoritos);
  const audios=pArray(PLAN_CLAVES.audios);
  const sim=pArray(PLAN_CLAVES.simHist);
  const pract=pArray(PLAN_CLAVES.practHist);
  const recon=pArray(PLAN_CLAVES.reconHist);

  const avgTemas=arr=>{
    let peso=0,suma=0;
    arr.forEach(x=>{const w=Math.max(1,Math.min(10,x.respondidas));peso+=w;suma+=x.rendimiento*w;});
    return peso?suma/peso:null;
  };
  const examAvg=avgTemas(examen), bancoAvg=avgTemas(banco);
  const simVal=sim.length?pClamp((Number(sim[0].nota)||0)*5):null;
  const practVal=pract.length?pClamp((Number(pract[0].nota)||0)*5):null;
  const reconVal=recon.length?pClamp(Number(recon[0].rendimiento)||0):null;
  const preparacion=pPromedioPonderado([
    {valor:examAvg,peso:.28},{valor:bancoAvg,peso:.16},{valor:simVal,peso:.22},{valor:practVal,peso:.18},{valor:reconVal,peso:.16}
  ]);

  return {errores,srsItems,srsHoy,examen,banco,temas,weak,visuales,reconErrores,practErrores,favoritos,audios,sim,pract,recon,preparacion};
}

function pPrioridades(datos){
  const lista=[];
  if(datos.srsHoy.length){
    lista.push({tipo:"fija",titulo:"Repetición espaciada de hoy",detalle:`${datos.srsHoy.length} elemento${datos.srsHoy.length===1?"":"s"} listo${datos.srsHoy.length===1?"":"s"} para revisión`,valor:115+Math.min(20,datos.srsHoy.length*2),accion:"repeticion.html",boton:"Repasar ahora"});
  }
  if(datos.errores.length){
    lista.push({tipo:"error",titulo:"Errores de Exámenes pasados",detalle:`${datos.errores.length} pregunta${datos.errores.length===1?"":"s"} pendiente${datos.errores.length===1?"":"s"} de recuperación`,valor:Math.min(100,60+datos.errores.length*4),accion:"repaso.html",boton:"Repasar errores"});
  }
  datos.temas.slice(0,5).forEach(t=>{
    lista.push({tipo:t.rendimiento<60?"error":t.rendimiento<75?"alerta":"ok",titulo:t.tema,detalle:`${t.fuente} · ${t.respondidas} respondidas`,valor:t.prioridad,rendimiento:t.rendimiento,accion:t.fuente==="Exámenes"?"examenes.html":"banco.html",boton:t.fuente==="Exámenes"?"Practicar preguntas":"Practicar casos"});
  });
  if(datos.visuales.length){
    lista.push({tipo:"visual",titulo:"Reconocimiento visual",detalle:`${datos.visuales.length} diagnóstico${datos.visuales.length===1?"":"s"} por reforzar`,valor:70+Math.min(20,datos.visuales.length*3),accion:datos.practErrores.length?"practico.html":"reconocimiento.html",boton:"Entrenar imágenes"});
  }
  if(datos.favoritos.length){
    lista.push({tipo:"fija",titulo:"Favoritos + FIJA",detalle:`${datos.favoritos.length} elemento${datos.favoritos.length===1?"":"s"} guardado${datos.favoritos.length===1?"":"s"}`,valor:42,accion:"repaso.html",boton:"Revisar FIJAS"});
  }
  if(datos.audios.length<6){
    lista.push({tipo:"audio",titulo:"Audio de repaso",detalle:`${datos.audios.length} de 6 audios completados`,valor:30+(6-datos.audios.length)*2,accion:"audio.html",boton:"Continuar audio"});
  }
  return lista.sort((a,b)=>b.valor-a.valor);
}

function pDistribucion(min){
  const tabla={30:[8,10,8,4],45:[11,15,12,7],60:[15,20,15,10],90:[20,30,25,15]};
  return tabla[min]||tabla[60];
}

function pCrearTareas(datos,min){
  const [mErr,mTema,mVisual,mCierre]=pDistribucion(min);
  const top=datos.temas[0];
  const second=datos.temas[1];
  const tareas=[];

  if(datos.srsHoy.length){
    tareas.push({id:"srs",min:mErr,titulo:"Repetición espaciada del día",detalle:`Tienes ${datos.srsHoy.length} revisión${datos.srsHoy.length===1?"":"es"} programada${datos.srsHoy.length===1?"":"s"}. Responde antes de revelar y califica con Otra vez, Difícil, Bien o Dominado.`,href:"repeticion.html",cta:"Abrir repetición"});
  } else if(datos.errores.length){
    tareas.push({id:"errores",min:mErr,titulo:"Recuperar errores pendientes",detalle:`Trabaja primero ${Math.min(datos.errores.length, Math.max(3,Math.round(mErr/2)))} preguntas que ya fallaste. No leas la explicación antes de responder.`,href:"examenes.html?modo=repaso",cta:"Iniciar repaso"});
  } else {
    tareas.push({id:"calentamiento",min:mErr,titulo:"Calentamiento activo",detalle:"Resuelve preguntas sin mirar apuntes para detectar vacíos antes de estudiar teoría.",href:"examenes.html",cta:"Abrir preguntas"});
  }

  tareas.push({id:"tema",min:mTema,titulo:top?`Tema central: ${top.tema}`:"Tema central: preguntas mixtas",detalle:top?`${top.fuente}: ${top.rendimiento}% de rendimiento en ${top.respondidas} respuestas. Objetivo: explicar por qué cada distractor es incorrecto.`:"Todavía faltan datos por tema. Genera tu perfil resolviendo un bloque mixto.",href:top&&top.fuente==="Banco"?"banco.html":"examenes.html",cta:"Practicar tema"});

  if(datos.visuales.length){
    tareas.push({id:"visual",min:mVisual,titulo:"Reconocimiento visual dirigido",detalle:`Prioriza: ${datos.visuales.slice(0,3).join(", ")}${datos.visuales.length>3?"…":""}. Describe lesión, color, bordes, superficie y distribución antes del diagnóstico.`,href:datos.practErrores.length?"practico.html":"reconocimiento.html",cta:"Entrenar visual"});
  } else {
    tareas.push({id:"visual",min:mVisual,titulo:"Mantenimiento visual",detalle:"Haz una sesión corta de reconocimiento a ciegas para conservar velocidad de descripción morfológica.",href:"reconocimiento.html",cta:"Abrir reconocimiento"});
  }

  let cierreTitulo="Cierre con BADBEAR.MED FIJA";
  let cierreDetalle=datos.favoritos.length?`Revisa ${Math.min(5,datos.favoritos.length)} FIJAS guardadas y recítalas sin mirar antes de comprobarlas.`:"Revisa las perlas de los errores de hoy y formula 3 reglas de decisión clínica.";
  let cierreHref="repaso.html";
  if(datos.audios.length<6 && !datos.favoritos.length){
    cierreTitulo="Cierre auditivo";
    cierreDetalle=`Completa un tramo de audio. Llevas ${datos.audios.length}/6 audios terminados.`;
    cierreHref="audio.html";
  }
  tareas.push({id:"cierre",min:mCierre,titulo:cierreTitulo,detalle:cierreDetalle,href:cierreHref,cta:"Cerrar sesión"});

  if(second && min>=90){
    // Fold second theme into central detail instead of creating a fifth block and breaking time sum.
    tareas[1].detalle += ` Si terminas antes, continúa con ${second.tema} (${second.rendimiento}%).`;
  }
  return tareas;
}

function pLeerEstado(){
  try{const x=JSON.parse(localStorage.getItem(PLAN_CLAVES.estado)||"null");return x&&typeof x==="object"?x:null;}catch(e){return null;}
}
function pGuardarEstado(x){localStorage.setItem(PLAN_CLAVES.estado,JSON.stringify(x));}

let planDuracion=60;
let planDatos=null;
let planEstado=null;

function pGenerar(reset=false){
  planDatos=pDatos();
  const prioridades=pPrioridades(planDatos);
  const hoy=pHoy();
  const previo=pLeerEstado();
  const nuevaTareas=pCrearTareas(planDatos,planDuracion);
  const mapaHechas={};
  if(!reset && previo && previo.fecha===hoy && Array.isArray(previo.tareas)) previo.tareas.forEach(t=>mapaHechas[t.id]=!!t.hecha);
  planEstado={
    fecha:hoy,
    duracion:planDuracion,
    prioridad:prioridades[0]?.titulo || planDatos.temas[0]?.tema || "Entrenamiento mixto",
    tareas:nuevaTareas.map(t=>({...t,hecha:!!mapaHechas[t.id]})),
    actualizadoEn:Date.now()
  };
  pGuardarEstado(planEstado);
  pRender(prioridades);
}

function pNivelPreparacion(v){
  if(v===null) return ["—","Aún faltan datos"];
  if(v<60) return [`${v}%`,"Prioridad alta"];
  if(v<75) return [`${v}%`,"En consolidación"];
  return [`${v}%`,"Buena base"];
}

function pRenderPrioridades(prioridades){
  const c=p$("plan-prioridades"); c.innerHTML="";
  const vista=prioridades.slice(0,5);
  if(!vista.length){ c.innerHTML='<div class="plan-vacio">Todavía no hay datos suficientes. Empieza resolviendo preguntas del curso y BADBEAR.MED generará prioridades.</div>'; return; }
  vista.forEach((x,i)=>{
    const art=document.createElement("article");
    art.className=`plan-prioridad ${x.tipo}`;
    const rendimiento=Number.isFinite(x.rendimiento)?`<b>${x.rendimiento}%</b>`:`<b>#${i+1}</b>`;
    art.innerHTML=`<div class="plan-prioridad-num">${String(i+1).padStart(2,"0")}</div><div class="plan-prioridad-body"><strong>${x.titulo}</strong><span>${x.detalle}</span></div>${rendimiento}<a href="${x.accion}">${x.boton} →</a>`;
    c.appendChild(art);
  });
}

function pRenderTareas(){
  const c=p$("plan-tareas"); c.innerHTML="";
  planEstado.tareas.forEach((t,i)=>{
    const art=document.createElement("article"); art.className=`plan-tarea${t.hecha?" hecha":""}`;
    art.innerHTML=`<label class="plan-check"><input type="checkbox" ${t.hecha?"checked":""} aria-label="Marcar tarea completada"><span>✓</span></label><div class="plan-tarea-tiempo">${t.min}<small>min</small></div><div class="plan-tarea-body"><span>BLOQUE ${i+1}</span><strong>${t.titulo}</strong><p>${t.detalle}</p></div><a href="${t.href}" class="plan-tarea-link">${t.cta} →</a>`;
    const input=art.querySelector("input");
    input.addEventListener("change",()=>{
      t.hecha=input.checked; art.classList.toggle("hecha",t.hecha); pGuardarEstado(planEstado); pActualizarAvance();
    });
    c.appendChild(art);
  });
  pActualizarAvance();
}

function pActualizarAvance(){
  const total=planEstado.tareas.length, hechas=planEstado.tareas.filter(t=>t.hecha).length;
  const pct=total?Math.round(hechas/total*100):0;
  p$("plan-meta-avance").textContent=`${pct}%`;
  p$("plan-meta-tareas").textContent=`${hechas} / ${total}`;
  p$("plan-barra").style.width=`${pct}%`;
  p$("plan-completado").classList.toggle("oculto",hechas!==total||!total);
}

function pRenderTopTemas(){
  const c=p$("plan-top-temas"); c.innerHTML="";
  const temas=planDatos.temas.slice(0,3);
  if(!temas.length){c.innerHTML='<div class="plan-vacio">Resuelve al menos algunas preguntas o casos para formar tu mapa temático.</div>';return;}
  temas.forEach((t,i)=>{
    const nivel=t.rendimiento<60?"rojo":t.rendimiento<75?"amarillo":"azul";
    const row=document.createElement("div"); row.className="plan-tema-row";
    row.innerHTML=`<div><span>${i+1}. ${t.fuente}</span><strong>${t.tema}</strong><small>${t.respondidas} respondidas</small></div><b class="${nivel}">${t.rendimiento}%</b><div class="plan-tema-bar"><i class="${nivel}" style="width:${t.rendimiento}%"></i></div>`;
    c.appendChild(row);
  });
}

function pRenderEvaluacion(){
  const c=p$("plan-siguiente-evaluacion");
  const prep=planDatos.preparacion;
  const top=planDatos.temas[0];
  let titulo,detalle,href,boton;
  if(planDatos.srsHoy.length>=3){
    titulo="Haz primero tu repetición espaciada"; detalle=`Tienes ${planDatos.srsHoy.length} revisiones vencidas o listas para hoy. Completa esa cola antes de abrir un nuevo simulador.`; href="repeticion.html"; boton="Abrir repetición";
  } else if(planDatos.errores.length>=5){
    titulo="No hagas otro simulador todavía"; detalle=`Primero recupera tus ${planDatos.errores.length} errores pendientes. Luego mide de nuevo el rendimiento.`; href="examenes.html?modo=repaso"; boton="Recuperar errores";
  } else if(planDatos.visuales.length>=3){
    titulo="Evalúa reconocimiento visual"; detalle="Tu señal más útil ahora es practicar diagnóstico por imagen antes de sumar otro examen teórico."; href="reconocimiento.html"; boton="Entrenar reconocimiento";
  } else if(prep!==null && prep>=70){
    titulo="Haz un simulador corto"; detalle="Tu perfil actual permite una medición útil. Empieza por 20 preguntas y revisa cada error al final."; href="simulador.html"; boton="Abrir simulador";
  } else {
    titulo="Consolida antes de medir"; detalle=top?`Refuerza ${top.tema} y vuelve a evaluar después de una sesión activa.`:"Genera primero un perfil resolviendo preguntas y casos."; href=top&&top.fuente==="Banco"?"banco.html":"examenes.html"; boton="Ir a practicar";
  }
  c.innerHTML=`<span>RECOMENDACIÓN ACTUAL</span><h4>${titulo}</h4><p>${detalle}</p><a href="${href}">${boton} →</a>`;
}

function pRender(prioridades){
  const [prepTxt,prepNivel]=pNivelPreparacion(planDatos.preparacion);
  p$("plan-preparacion").textContent=prepTxt; p$("plan-preparacion-nivel").textContent=prepNivel;
  if(p$("plan-repeticion")) p$("plan-repeticion").textContent=planDatos.srsHoy.length;
  p$("plan-errores").textContent=planDatos.errores.length;
  p$("plan-temas-debiles").textContent=planDatos.temas.filter(t=>t.rendimiento<60).length;
  p$("plan-visuales").textContent=planDatos.visuales.length;
  p$("plan-meta-duracion").textContent=`${planDuracion} min`;

  const top=prioridades[0];
  p$("plan-objetivo").textContent=top?top.titulo:"Construir perfil de rendimiento";
  p$("plan-objetivo-detalle").textContent=top?`${top.detalle}. Completa primero este bloque antes de pasar a contenido ya dominado.`:"Resuelve un bloque de preguntas y casos para que BADBEAR.MED detecte tus prioridades reales.";

  pRenderPrioridades(prioridades); pRenderTareas(); pRenderTopTemas(); pRenderEvaluacion();
}

function pInicializar(){
  const previo=pLeerEstado();
  if(previo&&previo.fecha===pHoy()&&[30,45,60,90].includes(Number(previo.duracion))) planDuracion=Number(previo.duracion);
  document.querySelectorAll("#plan-duraciones button").forEach(btn=>{
    btn.classList.toggle("activo",Number(btn.dataset.min)===planDuracion);
    btn.addEventListener("click",()=>{
      planDuracion=Number(btn.dataset.min)||60;
      document.querySelectorAll("#plan-duraciones button").forEach(b=>b.classList.toggle("activo",b===btn));
      pGenerar(false);
    });
  });
  p$("plan-regenerar").addEventListener("click",()=>pGenerar(false));
  pGenerar(false);
}

pInicializar();
