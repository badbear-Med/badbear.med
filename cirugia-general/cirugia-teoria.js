(() => {
  "use strict";

  const sections = [...document.querySelectorAll(".cg-section[id]")];
  const desktopToc = document.getElementById("desktopToc");
  const mobileTocLinks = document.getElementById("mobileTocLinks");
  const btn = document.getElementById("mobileTocBtn");
  const drawer = document.getElementById("mobileToc");
  const close = document.getElementById("mobileTocClose");
  const overlay = document.getElementById("mobileTocOverlay");
  const bar = document.getElementById("progressBar");
  const label = document.getElementById("progressText");
  const reviewedBtn = document.getElementById("markReviewed");

  const pageKey = (() => {
    const file = (location.pathname.split("/").pop() || "teoria").replace(/\.html?$/i,"");
    return "badbear_cirugia_general_" + file.replace(/[^a-z0-9_-]/gi,"_") + "_revisada";
  })();

  function buildToc(target){
    if(!target || !sections.length) return;
    target.innerHTML = "";
    sections.forEach(sec => {
      const a = document.createElement("a");
      a.href = "#" + sec.id;
      const n = sec.querySelector(".section-number")?.textContent || "";
      const h = sec.querySelector("h2")?.textContent || sec.id;
      a.textContent = `${n} · ${h}`;
      a.dataset.target = sec.id;
      a.addEventListener("click", closeDrawer);
      target.appendChild(a);
    });
  }

  buildToc(desktopToc);
  buildToc(mobileTocLinks);

  function openDrawer(){
    drawer?.classList.add("open");
    overlay?.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer(){
    drawer?.classList.remove("open");
    overlay?.classList.remove("show");
    document.body.style.overflow = "";
  }

  btn?.addEventListener("click", openDrawer);
  close?.addEventListener("click", closeDrawer);
  overlay?.addEventListener("click", closeDrawer);

  function updateProgress(){
    if(!sections.length || !bar || !label) return;
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const pct = Math.max(0, Math.min(100, Math.round((window.scrollY / max) * 100)));
    bar.style.width = pct + "%";
    label.textContent = pct + "%";

    let current = sections[0]?.id;
    const y = window.scrollY + 150;
    sections.forEach(s => {
      if(s.offsetTop <= y) current = s.id;
    });
    document.querySelectorAll(".toc-links a, #mobileTocLinks a").forEach(a => {
      a.classList.toggle("active", a.dataset.target === current);
    });
  }

  window.addEventListener("scroll", updateProgress, {passive:true});
  window.addEventListener("resize", updateProgress);
  updateProgress();

  if(reviewedBtn){
    const sync = () => {
      const done = localStorage.getItem(pageKey) === "1";
      reviewedBtn.textContent = done ? "✓ Tema revisado" : "Marcar como revisado";
      reviewedBtn.classList.toggle("done", done);
    };
    reviewedBtn.addEventListener("click", () => {
      const done = localStorage.getItem(pageKey) === "1";
      localStorage.setItem(pageKey, done ? "0" : "1");
      sync();
    });
    sync();
  }
})();