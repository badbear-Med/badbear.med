/* Todos los proyectos se abren desde la sesión de BADBEAR.CAMPUS. */
(() => {
  const hash=window.location.hash;
  if (["#cursos","#recursos","#proyecto","#proyectos","#universo-badbear"].includes(hash)) {
    const target=new URL("badbear-campus/index.html",location.href);
    if (["#proyectos","#universo-badbear"].includes(hash)) target.searchParams.set("section","proyectos");
    window.location.replace(target.href);
  }
})();
