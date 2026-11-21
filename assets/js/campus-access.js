(() => {
  "use strict";
  const script = document.currentScript;
  const root = new URL("../../", script.src);
  const login = new URL("badbear-campus/index.html", root);
  const page = location.href;
  const cssRoot = document.documentElement;
  cssRoot.dataset.campusAccess = "pending";
  let session;
  let checking;
  function goToCampus() {
    cssRoot.dataset.campusAccess = "pending";
    login.searchParams.set("next", page);
    try { window.top.location.replace(login.href); } catch { location.replace(login.href); }
  }
  async function check() {
    if (checking) return checking;
    checking = (async () => {
      cssRoot.dataset.campusAccess = "pending";
      try {
        session ||= await import(new URL("campus-session.js?v=20261121-campus-only1", script.src));
        const token = await session.readToken();
        if (!token) { goToCampus(); return false; }
        const alumno = await session.validateSession(token);
        cssRoot.dataset.campusAccess = "granted";
        cssRoot.classList.remove("bb-course-lock-pending", "bb-course-locked", "bb-auth-pendiente", "books-access-pending");
        cssRoot.classList.add("books-access-granted");
        const notify = () => {
          document.getElementById("books-access-loading")?.remove();
          document.dispatchEvent(new CustomEvent("campus-access-granted", {detail:{alumno}}));
          document.dispatchEvent(new Event("books-access-granted"));
        };
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", notify, {once:true}); else notify();
        return true;
      } catch (error) {
        if (error.status === 401) { session?.forgetToken(); goToCampus(); return false; }
        // Leave all content hidden on network failure. The public login remains reachable.
        cssRoot.dataset.campusAccess = "unavailable";
        login.searchParams.set("next", page);
        goToCampus();
        return false;
      } finally { checking = null; }
    })();
    return checking;
  }
  window.BADBEAR_CAMPUS_ACCESS = {ready:check()};
  window.addEventListener("campus-session-ended", goToCampus);
  window.addEventListener("pageshow", event => { if (event.persisted) check(); });
  window.addEventListener("focus", check);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") check(); });
})();
