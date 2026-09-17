(() => {
  const hideSource = () => {
    const el = document.querySelector("#sourceText");
    if (el) el.remove();
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hideSource, {once:true});
  } else {
    hideSource();
  }
})();