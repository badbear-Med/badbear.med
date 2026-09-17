
(() => {
  "use strict";

  /* No modificar páginas que están embebidas dentro de un iframe. */
  if (window.self !== window.top) return;

  const MOBILE_MAX = 820;
  const DESKTOP_MIN = 1100;

  function visible(el){
    if(!el) return false;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return cs.display !== "none" &&
           cs.visibility !== "hidden" &&
           r.width > 1 &&
           r.height > 1;
  }

  function centeredInViewport(el){
    const r = el.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const leftGap = r.left;
    const rightGap = vw - r.right;
    return Math.abs(leftGap - rightGap) < 140;
  }

  function excluded(el){
    if(!el) return true;
    if(el.closest("header,nav,footer,aside,.bb-global-mobile-menu")) return true;

    const cls = String(el.className || "").toLowerCase();
    return /card|button|btn|badge|chip|modal|dialog|toast|logo|icon|menu/.test(cls);
  }

  function candidateScore(el){
    if(!el || excluded(el)) return -1;

    const r = el.getBoundingClientRect();
    if(r.width < 560 || r.width > 1280) return -1;
    if(r.height < 150) return -1;
    if(!centeredInViewport(el)) return -1;

    let score = 0;
    if(el.matches("main")) score += 6;
    if(el.parentElement && el.parentElement.matches("body,main,section")) score += 4;

    const cls = String(el.className || "").toLowerCase();
    if(/inner|container|shell|wrap|layout|content/.test(cls)) score += 6;
    if(/hero|section|main/.test(cls)) score += 2;

    const txt = (el.textContent || "").trim();
    if(txt.length > 250) score += 2;

    return score;
  }

  function widenDesktop(){
    document.querySelectorAll(".bb-global-wide").forEach(el=>{
      el.classList.remove("bb-global-wide","bb-global-centered");
    });

    if(innerWidth < DESKTOP_MIN) return;

    const explicitSelectors = [
      ".bb-clean-study-layout",
      ".bb-study-layout",
      ".bb-shell",
      ".course-shell",
      ".module-shell",
      ".portal-shell",
      ".page-shell",
      ".main-shell",
      "main > .inner",
      "main > .container",
      "main > [class*='-inner']",
      "main > [class*='container']",
      "section > .inner",
      "section > [class*='-inner']",
      ".mi-hero-inner",
      ".mi-section",
      ".nefro-hero .inner",
      ".neuro-hero .inner",
      ".infecto-hero .inner",
      ".psiquiatria-hero .inner"
    ];

    const picked = new Set();

    explicitSelectors.forEach(sel=>{
      document.querySelectorAll(sel).forEach(el=>{
        if(!excluded(el) && centeredInViewport(el)){
          picked.add(el);
        }
      });
    });

    /*
      Rescate automático: detecta el wrapper principal aunque cada curso
      tenga clases distintas.
    */
    const generic = [
      ...document.querySelectorAll(
        "main, main > div, main > section, main > section > div, body > main > div"
      )
    ]
      .map(el=>({el,score:candidateScore(el)}))
      .filter(x=>x.score >= 7)
      .sort((a,b)=>b.score-a.score);

    generic.slice(0,3).forEach(x=>picked.add(x.el));

    /*
      Si un elemento elegido está dentro de otro elegido, conservamos
      preferentemente el más externo.
    */
    [...picked].forEach(el=>{
      let p = el.parentElement;
      while(p){
        if(picked.has(p)){
          picked.delete(el);
          break;
        }
        p = p.parentElement;
      }
    });

    picked.forEach(el=>{
      el.classList.add("bb-global-wide");
      if(centeredInViewport(el)){
        el.classList.add("bb-global-centered");
      }
    });
  }

  function chooseNavigation(){
    const candidates = [
      ...document.querySelectorAll(
        "header nav, .top-nav, .main-nav, .course-nav, .nefro-nav, .neuro-nav, .infecto-nav, .mi-nav, [class$='-nav']"
      )
    ].filter(nav=>{
      if(nav.closest("aside,.bb-sidebar,.bb-global-mobile-menu")) return false;
      return nav.querySelectorAll("a[href]").length >= 2;
    });

    candidates.sort((a,b)=>{
      const av = visible(a) ? 100 : 0;
      const bv = visible(b) ? 100 : 0;
      return (bv + b.querySelectorAll("a").length) -
             (av + a.querySelectorAll("a").length);
    });

    return candidates[0] || null;
  }

  function uniqueLinks(source){
    const result = [];
    const seen = new Set();

    const anchors = source
      ? [...source.querySelectorAll("a[href]")]
      : [...document.querySelectorAll("header a[href]")];

    anchors.forEach(a=>{
      const href = a.getAttribute("href");
      const label = (a.textContent || a.getAttribute("aria-label") || "").replace(/\s+/g," ").trim();

      if(!href || href === "#" || href.startsWith("javascript:")) return;
      if(!label) return;

      const key = href + "|" + label;
      if(seen.has(key)) return;
      seen.add(key);

      result.push({href,label,target:a.getAttribute("target") || ""});
    });

    return result.slice(0,18);
  }

  function ensureMobileMenu(){
    if(document.querySelector("#bb-global-menu-toggle")) return;

    const source = chooseNavigation();
    let links = uniqueLinks(source);

    if(links.length < 2){
      links = uniqueLinks(null);
    }

    if(links.length === 0) return;

    const toggle = document.createElement("button");
    toggle.id = "bb-global-menu-toggle";
    toggle.className = "bb-global-menu-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded","false");
    toggle.setAttribute("aria-controls","bb-global-mobile-menu");
    toggle.innerHTML =
      '<span class="bb-global-menu-bars" aria-hidden="true">☰</span>' +
      '<span class="bb-global-menu-label">Menú</span>';

    const menu = document.createElement("nav");
    menu.id = "bb-global-mobile-menu";
    menu.className = "bb-global-mobile-menu";
    menu.setAttribute("aria-label","Menú móvil");

    links.forEach(item=>{
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      if(item.target) a.target = item.target;
      menu.appendChild(a);
    });

    document.body.append(toggle,menu);

    if(source){
      source.classList.add("bb-global-nav-source");
    }

    const close = ()=>{
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded","false");
    };

    const open = ()=>{
      menu.classList.add("is-open");
      toggle.setAttribute("aria-expanded","true");
    };

    toggle.addEventListener("click",e=>{
      e.stopPropagation();
      menu.classList.contains("is-open") ? close() : open();
    });

    menu.addEventListener("click",e=>{
      if(e.target.closest("a")) close();
    });

    document.addEventListener("keydown",e=>{
      if(e.key === "Escape") close();
    });

    document.addEventListener("click",e=>{
      if(!menu.contains(e.target) && !toggle.contains(e.target)) close();
    });
  }

  function refresh(){
    widenDesktop();
    ensureMobileMenu();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",refresh,{once:true});
  }else{
    refresh();
  }

  let timer;
  addEventListener("resize",()=>{
    clearTimeout(timer);
    timer = setTimeout(widenDesktop,120);
  });

  setTimeout(refresh,350);
  setTimeout(refresh,1000);
})();
