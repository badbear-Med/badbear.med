(()=>{
const base=window.BADBEAR_CG_QUIZ_DATA||[];
const sab=[...(window.CG_EXTRA_SABATINAS||[])];
const teo=[...(window.CG_EXTRA_TEORIAS||[])];
const originals=base[0]?.questions||[];
originals.slice(0,18).forEach((q,i)=>sab.push({...q,id:"sab-repaso-"+(i+1),classId:"sabatina-0"+(Math.floor(i/5)+1)}));
const hepatic=base[2]?.questions||[];
const classForTheory=["teoria-05","teoria-05","teoria-05","teoria-05","teoria-06","teoria-05","teoria-05","teoria-06","teoria-06","teoria-06","teoria-06","teoria-06","teoria-06","teoria-06","teoria-11","teoria-11"];
hepatic.slice(0,16).forEach((q,i)=>teo.push({...q,id:"teo-repaso-"+(i+1),classId:classForTheory[i]}));
const sem=[...(window.CG_EXTRA_SEMINARIOS||[]),...(window.CG_MORE_SEMINARIOS||[])];
const tall=[...(window.CG_EXTRA_TALLERES||[]),...(window.CG_MORE_TALLERES||[])];
const sources=[{id:"sabatinas",title:"Actividades Académicas Sabatinas",questions:sab},{id:"talleres",title:"Talleres de Atención al Paciente",questions:tall},{id:"seminarios",title:"Seminarios",questions:sem},{id:"teorias",title:"Teorías 1–11",questions:teo}];
window.BADBEAR_CG_SECTION_BANKS=sources;
})();