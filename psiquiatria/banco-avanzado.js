(()=>{"use strict";
const bank=Array.isArray(window.BADBEAR_PSIQ_BANCO)?window.BADBEAR_PSIQ_BANCO:[];
const units=Array.isArray(window.BADBEAR_PSIQUIATRIA_CLASES)?window.BADBEAR_PSIQUIATRIA_CLASES:[];
const root=document.getElementById("quiz"),filter=document.getElementById("unit"),mode=document.getElementById("mode"),counter=document.getElementById("answered");
let selected={},index=0,submitted=false;
const letter=i=>String.fromCharCode(65+i);
const el=(tag,text,cls)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(cls)node.className=cls;return node;};
function getList(){return bank.filter(q=>filter.value==="all"||String(q.unidad)===filter.value);}
function store(){try{localStorage.setItem("badbear-psiq-banco-v1",JSON.stringify({selected,unit:filter.value,mode:mode.value}));}catch{}}
function restore(){try{const v=JSON.parse(localStorage.getItem("badbear-psiq-banco-v1")||"{}");if(v&&typeof v==="object"){selected=v.selected||{};if(v.unit&&[...filter.options].some(x=>x.value===v.unit))filter.value=v.unit;if(["study","exam"].includes(v.mode))mode.value=v.mode;}}catch{}}
function button(text,callback,disabled=false){const b=el("button",text);b.type="button";b.disabled=disabled;b.addEventListener("click",callback);return b;}
function addLink(parent,url,text){if(!url)return;const a=el("a",text);a.href=url;a.target="_blank";a.rel="noopener noreferrer";parent.appendChild(a);}
function explain(q,chosen){const box=el("div",undefined,"response");
const right=chosen===q.correcta;box.append(el("h3",right?"Respuesta correcta":"Respuesta incorrecta. Respuesta esperada: "+letter(q.correcta)));
box.append(el("h4","Interpretación clínica del caso"));box.append(el("p",q.fundamento));
if(q.desarrollo?.razonamiento){box.append(el("h4","Razonamiento diagnóstico y fisiopatológico"));box.append(el("p",q.desarrollo.razonamiento));}
if(q.desarrollo?.conducta){box.append(el("h4","Conducta, seguridad y aplicación práctica"));box.append(el("p",q.desarrollo.conducta));}
box.append(el("h4","Análisis individual de las cinco alternativas"));
const ul=el("ol");q.opciones.forEach((opt,i)=>{const li=el("li");const strong=el("strong",letter(i)+". "+opt+" — ");li.append(strong,document.createTextNode(q.analisis[i] || q.fundamento));ul.append(li);});box.append(ul);
box.append(el("h4","Fundamento bibliográfico"));box.append(el("p",q.bibliografia));
const unit=units.find(x=>Number(x.numero)===Number(q.unidad));if(unit&&unit.teoria){const p=el("p");
const theoryUrl=new URL(unit.teoria,document.baseURI);if(q.desarrollo?.ancla)theoryUrl.hash=q.desarrollo.ancla;
addLink(p,theoryUrl.href,q.desarrollo?.ancla?"Consultar directamente el apartado relevante de la teoría · Unidad "+q.unidad+" ↗":"Consultar teoría de la unidad "+q.unidad+" ↗");box.append(p);}else box.append(el("p","Teoría propia de esta unidad: pendiente de publicación y verificación editorial."));
return box;}
function render(){const list=getList();root.replaceChildren();document.getElementById("total").textContent=bank.length;counter.textContent=Object.keys(selected).filter(k=>list.some(q=>q.id===k)).length;
if(!list.length){root.append(el("p","No hay preguntas para esta selección.","empty"));return;}
if(index>=list.length)index=list.length-1;
if(submitted&&mode.value==="exam"){const correct=list.filter(q=>selected[q.id]===q.correcta).length;root.append(el("h2","Resultados del simulacro"));root.append(el("p",correct+" respuestas correctas de "+list.length,"score"));list.forEach(q=>{const row=el("details",undefined,"explanation");const summary=el("summary","Unidad "+q.unidad+" — "+(selected[q.id]===q.correcta?"Correcta":"Incorrecta o sin responder"));row.append(summary,el("p",q.caso),explain(q,selected[q.id]));root.append(row);});root.append(button("Reiniciar simulacro",()=>{selected={};index=0;submitted=false;store();render()}));return;}
const q=list[index];const head=el("div",undefined,"head");head.append(el("span","Unidad "+q.unidad+" · "+q.tema),el("span",(index+1)+" / "+list.length+" · "+q.nivel));root.append(head,el("p",q.caso,"case"));
const opts=el("div",undefined,"answers");const answered=Number.isInteger(selected[q.id]);
q.opciones.forEach((opt,i)=>{const b=button(letter(i)+".  "+opt,()=>{if(Object.hasOwn(selected,q.id))return;selected[q.id]=i;store();render()},answered);b.className="answer";if(answered&&mode.value==="study"){if(i===q.correcta)b.classList.add("correct");else if(i===selected[q.id])b.classList.add("wrong");}opts.append(b);});root.append(opts);
if(answered&&mode.value==="study")root.append(explain(q,selected[q.id]));
const nav=el("div",undefined,"nav");nav.append(button("← Anterior",()=>{index--;render()},index===0));if(mode.value==="exam")nav.append(el("span","Las respuestas se revelan al finalizar.","pill"));nav.append(button("Siguiente →",()=>{index++;render()},index===list.length-1));root.append(nav);
if(mode.value==="exam")root.append(button("Finalizar y revisar todas las respuestas",()=>{submitted=true;render()}));
}
units.forEach(x=>{const opt=el("option",String(x.numero).padStart(2,"0")+" · "+x.titulo);opt.value=String(x.numero);filter.append(opt);});
restore();filter.addEventListener("change",()=>{index=0;submitted=false;store();render()});mode.addEventListener("change",()=>{index=0;submitted=false;selected={};store();render()});document.getElementById("reset").addEventListener("click",()=>{if(!confirm("¿Reiniciar las respuestas de esta sesión?"))return;selected={};index=0;submitted=false;store();render()});render();
})();