(() => {
  if (window.top !== window.self) return;

  document.addEventListener("click", event => {
    const anchor = event.target.closest("a[href]");
    if (!anchor) return;
    if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

    const raw = anchor.getAttribute("href") || "";
    if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:")) return;

    let target;
    try {
      target = new URL(raw, location.href);
    } catch {
      return;
    }

    if (target.origin !== location.origin) return;

    const base = new URL(".", location.href);
    if (!target.pathname.startsWith(base.pathname)) return;
    if (target.pathname.endsWith("/app.html")) return;

    event.preventDefault();

    let relative = target.pathname.slice(base.pathname.length);
    if (!relative) relative = "index.html";
    relative += target.search + target.hash;

    location.href = "app.html?page=" + encodeURIComponent(relative);
  });
})();
