(() => {
  "use strict";

  const mojibakeMap = new Map([
    ["huÃ©sped","huésped"],["sÃ©ptico","séptico"],["transmisiÃ³n","transmisión"],
    ["infecciÃ³n","infección"],["farmacologÃ­a","farmacología"],["diagnÃ³stico","diagnóstico"],
    ["etiologÃ­a","etiología"],["fisiopatologÃ­a","fisiopatología"],["clÃ­nica","clínica"],
    ["prevenciÃ³n","prevención"],["evaluaciÃ³n","evaluación"],["navegaciÃ³n","navegación"],
    ["teorÃ­a","teoría"],["mÃ³dulos","módulos"],["pÃ¡gina","página"],["ubicaciÃ³n","ubicación"],
    ["incorporarÃ¡","incorporará"],["aquÃ­","aquí"],["mÃ¡s","más"],["especÃ­fico","específico"],
    ["âš•","⚕"],["â†","←"],["â†’","→"],["â€¢","•"]
  ]);

  function repairTextNodes(root=document.body){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{
      let s=n.nodeValue;
      let out=s;
      mojibakeMap.forEach((v,k)=>{out=out.split(k).join(v);});
      if(out!==s) n.nodeValue=out;
    });
  }

  function findBlockByExactHeading(label){
    const candidates=[...document.querySelectorAll("h1,h2,h3,h4,strong,b")];
    const head=candidates.find(el=>(el.textContent||"").trim()===label);
    if(!head) return null;

    let node=head;
    for(let i=0;i<6 && node && node!==document.body;i++,node=node.parentElement){
      const text=(node.textContent||"").replace(/\s+/g," ").trim();
      if(text.includes(label) && text.length<1800){
        const r=node.getBoundingClientRect();
        if(r.width>250) return node;
      }
    }
    return head.parentElement;
  }

  function removeLegacy(){
    ["Ruta de estudio","Recursos del tema"].forEach(label=>{
      const block=findBlockByExactHeading(label);
      if(block) block.remove();
    });

    [...document.querySelectorAll("main *, body *")].forEach(el=>{
      const t=(el.textContent||"").replace(/\s+/g," ").trim();
      if(
        t.includes("BADBEAR.MED FIJA:") &&
        (t.includes("contenido definitivo") || t.includes("mayor rentabilidad clínica y de examen del tema"))
      ){
        let box=el;
        for(let i=0;i<5 && box.parentElement;i++){
          const txt=(box.textContent||"").replace(/\s+/g," ").trim();
          if(txt.includes("BADBEAR.MED FIJA:") && txt.length<800){
            box.remove();
            break;
          }
          box=box.parentElement;
        }
      }
    });
  }

  function findNavigationCard(){
    const heads=[...document.querySelectorAll("h1,h2,h3,h4,strong,b")];
    const h=heads.find(el=>(el.textContent||"").trim()==="Navegación");
    if(!h) return null;
    let n=h;
    for(let i=0;i<6 && n && n!==document.body;i++,n=n.parentElement){
      const t=(n.textContent||"").replace(/\s+/g," ").trim();
      if(t.includes("Navegación") && t.includes("Todos los temas") && t.length<1800) return n;
    }
    return h.parentElement;
  }

  function reflow(){
    const theory=document.querySelector("#bb-topic-theory");
    if(!theory) return;

    let layout=document.querySelector(".bb-clean-study-layout");
    if(layout) return;

    const resources=document.querySelector("#bb-topic-resources");
    const nav=findNavigationCard();
    const host=theory.parentElement;
    if(!host) return;

    layout=document.createElement("div");
    layout.className="bb-clean-study-layout";

    const main=document.createElement("div");
    main.className="bb-clean-study-main";

    const aside=document.createElement("aside");
    aside.className="bb-clean-study-aside";

    host.insertBefore(layout,theory);
    layout.append(main,aside);

    main.appendChild(theory);
    if(resources) main.appendChild(resources);

    if(nav){
      aside.appendChild(nav);
    }else{
      aside.remove();
      layout.classList.add("no-aside");
    }
  }

  function run(){
    repairTextNodes();
    removeLegacy();
    repairTextNodes();
    reflow();
    repairTextNodes();
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",()=>setTimeout(run,100),{once:true});
  }else{
    setTimeout(run,100);
  }

  const observer=new MutationObserver(()=>run());
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  setTimeout(()=>observer.disconnect(),4500);

  setTimeout(run,400);
  setTimeout(run,900);
  setTimeout(run,1800);
})();
