(() => {
  "use strict";
  const script = document.currentScript;
  const name = location.pathname.split("/").pop() || "";
  const topic = name.match(/^(\d{2})-/)?.[1];
  const article = document.querySelector(".sotelo-article");
  if (!topic || !article) return;
  const block = document.createElement("section");
  block.id = "recursos-clase";
  block.style.cssText = "margin:2rem 0;padding:1.3rem;border:1px solid #cedde8;border-radius:14px;background:#f7fbff;color:#17324b";
  const title = document.createElement("h2");
  title.textContent = "Material de este tema";
  block.append(title);
  const categories = [["pdfs","PDF y presentaciones"],["audios","Audio de clase"],["videos","Video de clase"]];
  const panels = {};
  for (const [key,label] of categories) {
    const div = document.createElement("div");
    div.style.cssText = "margin-top:1rem;padding:1rem;border-radius:10px;background:white;border:1px solid #dfe8f0";
    const h = document.createElement("h3");h.textContent=label;div.append(h);
    const content=document.createElement("div");content.textContent="Pendiente de incorporar.";
    div.append(content);block.append(div);panels[key]=content;
  }
  const pager = article.querySelector(".sotelo-pager");
  if (pager) pager.before(block); else article.append(block);
  const base = new URL("../materiales.json?v=20261008-temas22",script.src);
  const safeURL = path => {try{const u=new URL(path,base);return ["https:","http:"].includes(u.protocol)?u.href:"";}catch{return "";}};
  const youtube = raw => {try{const u=new URL(raw),h=u.hostname.replace(/^www\./,""),parts=u.pathname.split("/");let id=h==="youtu.be"?parts[1]:"";if(["youtube.com","m.youtube.com","youtube-nocookie.com"].includes(h))id=u.searchParams.get("v")||(["embed","shorts","live"].includes(parts[1])?parts[2]:"");return /^[A-Za-z0-9_-]{11}$/.test(id||"")?id:"";}catch{return "";}};
  fetch(base).then(r=>{if(!r.ok)throw Error("Catalog");return r.json();}).then(data=>{
    const resources=data.temas?.[topic] || {};
    for(const [key] of categories) {
      const list=Array.isArray(resources[key])?resources[key]:[];
      if(!list.length)continue;
      panels[key].replaceChildren();
      for(const item of list) {
        const u=safeURL(item.url||item.archivo||"");if(!u)continue;
        const itemBox=document.createElement("div");itemBox.style.margin="12px 0";
        const name=document.createElement("strong");name.textContent=item.titulo||"Material de clase";itemBox.append(name);
        const id=key==="videos"?youtube(u):"";
        if(key==="pdfs"||id) {
          const frame=document.createElement("iframe");frame.src=id?"https://www.youtube.com/embed/"+id+"?origin=https%3A%2F%2Fwajomea.group":u+"#view=FitH";frame.title=item.titulo||"Recurso";frame.loading="lazy";
          frame.style.cssText=id?"display:block;width:100%;aspect-ratio:16/9;border:0":"display:block;width:100%;height:65vh;min-height:380px;border:0";
          if(id){frame.allow="autoplay; encrypted-media; picture-in-picture; fullscreen";frame.allowFullscreen=true;frame.referrerPolicy="strict-origin-when-cross-origin";}
          itemBox.append(frame);
        } else {
          const media=document.createElement(key==="audios"?"audio":"video");media.controls=true;media.src=u;media.style.cssText="display:block;max-width:100%;width:100%";if(key==="videos")media.playsInline=true;itemBox.append(media);
        }
        panels[key].append(itemBox);
      }
    }
  }).catch(()=>{});
})();