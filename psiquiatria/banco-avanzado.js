(()=>{"use strict";
const baseBank = Array.isArray(window.BADBEAR_PSIQ_BANCO) ? window.BADBEAR_PSIQ_BANCO : [];
const pilotUnit = 8;
const pilot = Array.isArray(window.BADBEAR_PSIQ_UNIDAD_8) ? window.BADBEAR_PSIQ_UNIDAD_8 : [];
const pilotStart = baseBank.findIndex(question => question.unidad === pilotUnit);
const combinedBank = pilot.length && pilotStart !== -1
  ? [...baseBank.slice(0, pilotStart), ...pilot, ...baseBank.slice(pilotStart).filter(question => question.unidad !== pilotUnit)]
  : baseBank;
const convert = window.BADBEAR_PSIQ_CONVERTIR_ASEVERACIONES;
const bank = convert ? combinedBank.map(convert) : combinedBank;
const units=Array.isArray(window.BADBEAR_PSIQUIATRIA_CLASES)?window.BADBEAR_PSIQUIATRIA_CLASES:[];
const root=document.getElementById("quiz"),filter=document.getElementById("unit"),mode=document.getElementById("mode"),counter=document.getElementById("answered");
let selected={},index=0,submitted=false;
const params = new URLSearchParams(window.location.search);
const timed = params.get("modo") === "simulacro";
const requestedUnit = units.find(unit => String(unit.numero) === params.get("unidad"));
const timedUnit = timed && requestedUnit ? Number(requestedUnit.numero) : null;
const timedPool = timedUnit ? bank.filter(question => question.unidad === timedUnit) : bank;
const timedSize = 20;
const timedDuration = 10 * 60 * 1000;
const timedStorageKey = "badbear-psiq-simulacro-10m-v1" + (timedUnit ? "-unidad-" + timedUnit : "");
const clock = document.getElementById("timed-clock");
// Las versiones previas siguen disponibles para restaurar simulacros ya iniciados.
const bankById = timed ? new Map([...baseBank, ...combinedBank, ...bank].map(question => [question.id, question])) : null;
let attempt = null;
let timer = null;

function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startTimed() {
  if (attempt && !attempt.closed) return;
  const shuffledBank = shuffled(timedPool);
  const firstByUnit = new Map();
  for (const question of shuffledBank) {
    if (!firstByUnit.has(question.unidad)) firstByUnit.set(question.unidad, question);
  }
  const first = new Set(firstByUnit.values());
  const sample = [...first, ...shuffledBank.filter(question => !first.has(question))].slice(0, timedSize);
  attempt = { ids: shuffled(sample).map(question => question.id), deadline: Date.now() + timedDuration, closed: null };
  selected = {};
  index = 0;
  store();
  render();
  timer = setInterval(tick, 250);
}

function restoreTimed() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(timedStorageKey) || "null");
    if (!saved || !Array.isArray(saved.ids) || saved.ids.length !== timedSize ||
        new Set(saved.ids).size !== timedSize || !saved.ids.every(id => bankById.has(id) && (!timedUnit || bankById.get(id).unidad === timedUnit)) ||
        !Number.isFinite(saved.deadline) || ![null, "manual", "time"].includes(saved.closed)) return;
    attempt = { ids: saved.ids, deadline: saved.deadline, closed: saved.closed };
    selected = Object.fromEntries(saved.ids.flatMap(id => {
      const answer = saved.selected?.[id];
      return Number.isInteger(answer) && answer >= 0 && answer < bankById.get(id).opciones.length
        ? [[id, answer]]
        : [];
    }));
    index = Number.isInteger(saved.index) ? Math.max(0, Math.min(saved.index, timedSize - 1)) : 0;
  } catch {}
}

function closeTimed(reason) {
  if (!attempt || attempt.closed) return;
  attempt.closed = reason;
  clearInterval(timer);
  timer = null;
  store();
}

function updateClock() {
  clock.hidden = !attempt || Boolean(attempt.closed);
  if (clock.hidden) return;
  const seconds = Math.max(0, Math.ceil((attempt.deadline - Date.now()) / 1000));
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  clock.textContent = "Tiempo restante: " + minutes + ":" + String(seconds % 60).padStart(2, "0");
}

function tick() {
  if (!attempt || attempt.closed) return;
  if (Date.now() >= attempt.deadline) {
    closeTimed("time");
    render();
    return;
  }
  updateClock();
}

function moveQuestion(offset) {
  index += offset;
  if (timed) store();
  render();
}
const letter=i=>String.fromCharCode(65+i);
// La respuesta almacenada es el número de verdades. La posición visible es independiente.
const assertionOrder = [1, 2, 3, 4, 0];
const assertionLabels = [
  "NINGUNA ES VERDADERA",
  "SOLO UNA ES VERDADERA",
  "SOLO DOS SON VERDADERAS",
  "SOLAMENTE TRES SON VERDADERAS",
  "TODAS SON VERDADERAS"
];
const answerLetter = (question, index) => letter(question.aseveraciones ? assertionOrder.indexOf(index) : index);
const el=(tag,text,cls)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(cls)node.className=cls;return node;};
function getList(){
  if (timed) return attempt ? attempt.ids.map(id => bankById.get(id)) : [];
  return bank.filter(q=>filter.value==="all"||String(q.unidad)===filter.value);
}
function store(){
  try {
    if (timed) sessionStorage.setItem(timedStorageKey, JSON.stringify({...attempt, selected, index}));
    else localStorage.setItem("badbear-psiq-banco-v1",JSON.stringify({selected,unit:filter.value,mode:mode.value}));
  } catch {}
}
function restore(){try{const v=JSON.parse(localStorage.getItem("badbear-psiq-banco-v1")||"{}");if(v&&typeof v==="object"){selected=v.selected||{};if(v.unit&&[...filter.options].some(x=>x.value===v.unit))filter.value=v.unit;if(["study","exam"].includes(v.mode))mode.value=v.mode;}}catch{}}
function button(text,callback,disabled=false){const b=el("button",text);b.type="button";b.disabled=disabled;b.addEventListener("click",callback);return b;}
function addLink(parent,url,text){if(!url)return;const a=el("a",text);a.href=url;a.target="_blank";a.rel="noopener noreferrer";parent.appendChild(a);}
function assertionList(question, reveal = false) {
  const list = el("ol", undefined, "statements");
  list.setAttribute("type", "I");
  for (const assertion of question.aseveraciones) {
    const item = el("li", assertion.texto);
    if (reveal) {
      item.append(
        el("strong", assertion.verdadera ? "Verdadera. " : "Falsa. "),
        document.createTextNode(assertion.justificacion)
      );
    }
    list.append(item);
  }
  return list;
}

function explain(q,chosen){const box=el("div",undefined,"response");
const right=chosen===q.correcta;
const feedback = chosen === undefined ? "Sin responder" : "Respuesta incorrecta";
box.append(el("h3",right?"Respuesta correcta":feedback+". Respuesta esperada: "+answerLetter(q,q.correcta)));
if(q.aseveraciones){
  box.append(el("h4","Corrección de las aseveraciones"));
  box.append(el("p","Clave "+answerLetter(q,q.correcta)+" · "+assertionLabels[q.correcta]));
  box.append(assertionList(q,true));
  if (q.respuestaOriginal) {
    box.append(el("h4","Respuesta clínica del caso"));
    box.append(el("p",q.respuestaOriginal),el("p",q.fundamento));
  }
} else {
box.append(el("h4","Interpretación clínica del caso"));box.append(el("p",q.fundamento));
if(q.desarrollo?.razonamiento){box.append(el("h4","Razonamiento diagnóstico y fisiopatológico"));box.append(el("p",q.desarrollo.razonamiento));}
if(q.desarrollo?.conducta){box.append(el("h4","Conducta, seguridad y aplicación práctica"));box.append(el("p",q.desarrollo.conducta));}
box.append(el("h4","Análisis individual de las cinco alternativas"));
const ul=el("ol");q.opciones.forEach((opt,i)=>{const li=el("li");const strong=el("strong",letter(i)+". "+opt+" — ");li.append(strong,document.createTextNode(q.analisis[i] || q.fundamento));ul.append(li);});box.append(ul);
}
box.append(el("h4","Fundamento bibliográfico"));
const reference = el("p");
if (q.fuente) addLink(reference,q.fuente,q.bibliografia);
else reference.textContent=q.bibliografia;
box.append(reference);
const unit=units.find(x=>Number(x.numero)===Number(q.unidad));if(unit&&unit.teoria){const p=el("p");
const theoryUrl=new URL(unit.teoria,document.baseURI);if(q.desarrollo?.ancla)theoryUrl.hash=q.desarrollo.ancla;
addLink(p,theoryUrl.href,q.desarrollo?.ancla?"Consultar directamente el apartado relevante de la teoría · Unidad "+q.unidad+" ↗":"Consultar teoría de la unidad "+q.unidad+" ↗");box.append(p);}else box.append(el("p","Teoría propia de esta unidad: pendiente de publicación y verificación editorial."));
return box;}
function render(){
  root.replaceChildren();
  if (timed) {
    if (attempt && !attempt.closed && Date.now() >= attempt.deadline) closeTimed("time");
    updateClock();
    if (!attempt) {
      root.append(el("h2","20 preguntas · 10 minutos"));
      if (timedPool.length < timedSize) {
        root.append(el("p","El banco aún no tiene suficientes preguntas para iniciar."));
        return;
      }
      root.append(el("p", timedUnit
        ? "Unidad "+timedUnit+" · "+requestedUnit.titulo+". Cada pregunta presenta cuatro aseveraciones."
        : "La selección mezcla unidades de Psiquiatría."));
      root.append(el("p","El tiempo empieza al pulsar Iniciar simulacro. Al terminar, podrás revisar tu puntuación y las explicaciones."));
      const start = button("Iniciar simulacro", startTimed);
      start.className = "main-btn";
      root.append(start);
      return;
    }
  }
  const list=getList();
  const isExam = timed || mode.value === "exam";
  const answeredCount = list.filter(q=>Object.hasOwn(selected,q.id)).length;
  document.getElementById("total").textContent=bank.length;
  counter.textContent=answeredCount;
if(!timed&&filter.value!=="all"){const available=list.length;const info=el("p",available>=20?"Esta unidad cumple el mínimo de 20 preguntas.":"Unidad en desarrollo: "+available+" de 20 preguntas mínimas. La cobertura todavía es parcial.","pill");root.append(info);}
if (!timed && filter.value !== "all" && list.length >= timedSize) {
  const unit = Number(filter.value);
  const link = el("a", "Simulacro de la unidad "+unit+" · 20 preguntas / 10 min", "main-btn unit-simulacro");
  link.href = "?modo=simulacro&unidad="+unit;
  root.append(link);
}
if(!list.length){root.append(el("p","No hay preguntas para esta selección.","empty"));return;}
if(index>=list.length)index=list.length-1;
if(isExam && (timed ? attempt.closed : submitted)){
  const correct=list.filter(q=>selected[q.id]===q.correcta).length;
  root.append(el("h2","Resultados del simulacro"));
  if (timed && attempt.closed === "time") root.append(el("p","Se agotaron los 10 minutos. Tu intento se cerró automáticamente."));
  root.append(el("p",correct+" respuestas correctas de "+list.length,"score"));
  if (timed) root.append(el("p",answeredCount+" respondidas · "+(list.length-answeredCount)+" sin responder."));
  list.forEach(q=>{
    const row=el("details",undefined,"explanation");
    const result = !Object.hasOwn(selected,q.id) ? "Sin responder" : selected[q.id]===q.correcta ? "Correcta" : "Incorrecta";
    const summary=el("summary","Unidad "+q.unidad+" — "+result);
    row.append(summary,el("p",q.caso),explain(q,selected[q.id]));
    root.append(row);
  });
  const restart = button(timed ? "Iniciar otro simulacro" : "Reiniciar simulacro", ()=>{
    if (timed) startTimed();
    else {selected={};index=0;submitted=false;store();render();}
  });
  if (timed) restart.className = "main-btn";
  root.append(restart);
  return;
}
const q=list[index];const head=el("div",undefined,"head");head.append(el("span","Unidad "+q.unidad+" · "+q.tema),el("span",(index+1)+" / "+list.length+" · "+q.nivel));root.append(head,el("p",q.caso,"case"));
if(q.aseveraciones){
  root.append(assertionList(q));
  root.append(el("p","¿Cuántas aseveraciones son correctas?","case"));
}
if (timed) root.append(el("p",answeredCount+" de "+list.length+" respondidas","pill"));
const opts=el("div",undefined,"answers");const answered=Number.isInteger(selected[q.id]);
const order = q.aseveraciones ? assertionOrder : q.opciones.map((_, i) => i);
order.forEach(i=>{
  const option = q.aseveraciones ? assertionLabels[i] : q.opciones[i];
  const b=button(answerLetter(q,i)+".  "+option,()=>{
    if (timed) {
      tick();
      if (attempt.closed) return;
    } else if (Object.hasOwn(selected,q.id)) return;
    selected[q.id]=i;
    store();
    render();
  },!timed&&answered);
  b.className="answer";
  if (timed) b.setAttribute("aria-pressed", String(i===selected[q.id]));
  if(answered&&!isExam){if(i===q.correcta)b.classList.add("correct");else if(i===selected[q.id])b.classList.add("wrong");}
  opts.append(b);
});root.append(opts);
if(answered&&!isExam)root.append(explain(q,selected[q.id]));
const nav=el("div",undefined,"nav");
nav.append(button("← Anterior",()=>moveQuestion(-1),index===0));
if(isExam)nav.append(el("span","Las respuestas se revelan al finalizar.","pill"));
nav.append(button("Siguiente →",()=>moveQuestion(1),index===list.length-1));root.append(nav);
if(isExam){
  const finish = button("Finalizar y revisar todas las respuestas",()=>{
    if (timed) closeTimed(Date.now() >= attempt.deadline ? "time" : "manual");
    else submitted=true;
    render();
  });
  if (timed) finish.className = "main-btn";
  root.append(finish);
}
}
if (timed) {
  document.title = "Simulacro de 10 minutos · Psiquiatría | BADBEAR.MED";
  document.getElementById("bank-title").textContent = timedUnit ? "Simulacro de Psiquiatría · Unidad "+timedUnit : "Simulacro de Psiquiatría";
  document.getElementById("bank-stat").hidden = true;
  document.getElementById("bank-settings").hidden = true;
  document.getElementById("timed-bar").hidden = false;
  restoreTimed();
  render();
  if (attempt && !attempt.closed) timer = setInterval(tick, 250);
  return;
}
units.forEach(x=>{const count=bank.filter(q=>q.unidad===Number(x.numero)).length;
const label=String(x.numero).padStart(2,"0")+" · "+x.titulo+" ("+count+"/20 mínimo"+(count>=20?" ✓":" · EN DESARROLLO")+")";
const opt=el("option",label);opt.value=String(x.numero);filter.append(opt);});
restore();
if (requestedUnit) filter.value = String(requestedUnit.numero);
filter.addEventListener("change",()=>{index=0;submitted=false;store();render()});mode.addEventListener("change",()=>{index=0;submitted=false;selected={};store();render()});document.getElementById("reset").addEventListener("click",()=>{if(!confirm("¿Reiniciar las respuestas de esta sesión?"))return;selected={};index=0;submitted=false;store();render()});render();
})();