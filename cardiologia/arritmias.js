(() => {
  "use strict";
  const toc = document.querySelector(".toc");
  if (window.matchMedia("(max-width: 760px)").matches && !location.hash) toc.open = false;
  const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  document.getElementById("toc-search").addEventListener("input", event => {
    const query = normalize(event.target.value);
    let matches = 0;
    document.querySelectorAll(".toc li").forEach(item => {
      item.hidden = !normalize(item.textContent).includes(query);
      if (!item.hidden) matches++;
    });
    document.getElementById("toc-empty").hidden = matches > 0;
  });
  document.querySelectorAll('a[href="#indice"]').forEach(link => link.addEventListener("click", () => { toc.open = true; }));
  const cases = [...document.querySelectorAll(".caso")];
  let priorCases = [];
  window.addEventListener("beforeprint", () => {
    priorCases = cases.map(item => item.open);
    cases.forEach(item => { item.open = true; });
  });
  window.addEventListener("afterprint", () => cases.forEach((item, index) => { item.open = priorCases[index] || false; }));
  document.querySelectorAll("[data-print]").forEach(button => button.addEventListener("click", () => window.print()));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      const active = entries.find(entry => entry.isIntersecting);
      if (!active) return;
      document.querySelectorAll(".toc a").forEach(link => {
        if (link.hash === `#${active.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, {rootMargin:"-15% 0px -65% 0px"});
    document.querySelectorAll(".chapter-body h2[id]").forEach(section => observer.observe(section));
  }
})();
