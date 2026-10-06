(() => {
  const frame = document.getElementById("bb-site-frame");
  const player = document.getElementById("bb-global-player");
  const audio = document.getElementById("bb-audio");
  const titleEl = document.getElementById("bb-track-title");
  const libraryEl = document.getElementById("bb-track-library");
  const artEl = document.getElementById("bb-track-art");
  const playBtn = document.getElementById("bb-play");
  const prevBtn = document.getElementById("bb-prev");
  const nextBtn = document.getElementById("bb-next");
  const progress = document.getElementById("bb-progress");
  const currentTimeEl = document.getElementById("bb-current-time");
  const durationEl = document.getElementById("bb-duration");
  const volume = document.getElementById("bb-volume");

  const catalog = Array.isArray(window.BADBEAR_MUSIC_CATALOG)
    ? window.BADBEAR_MUSIC_CATALOG
    : [];

  let currentLibrary = null;
  let currentIndex = -1;
  let currentTrack = null;
  let seeking = false;
  let lastFrameUrl = "";

  const baseUrl = new URL(".", location.href);
  const basePath = baseUrl.pathname;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return m + ":" + s;
  }

  function findLibrary(libraryId, trackId) {
    let library = catalog.find(item => item.id === libraryId);
    if (!library && trackId) {
      library = catalog.find(item =>
        Array.isArray(item.tracks) &&
        item.tracks.some(track => track.id === trackId)
      );
    }
    return library || null;
  }

  function setPlayerText() {
    if (!currentTrack || !currentLibrary) {
      player.classList.add("bb-player--idle");
      titleEl.textContent = "Selecciona una canción";
      libraryEl.textContent = "badbear.music";
      artEl.textContent = "BM";
      return;
    }

    player.classList.remove("bb-player--idle");
    titleEl.textContent = currentTrack.title;
    libraryEl.textContent =
      currentLibrary.name + " · " + (currentIndex + 1) + " de " + currentLibrary.tracks.length;
    artEl.textContent = currentLibrary.name
      .split(/\s+/)
      .map(word => word[0] || "")
      .join("")
      .slice(0, 2)
      .toUpperCase();

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: "badbear.music",
        album: currentLibrary.name
      });
    }
  }

  function notifyFrame() {
    if (!frame || !frame.contentWindow) return;
    frame.contentWindow.postMessage({
      type: "badbear-player-state",
      libraryId: currentLibrary?.id || null,
      trackId: currentTrack?.id || null,
      playing: !audio.paused && !!currentTrack
    }, location.origin);
  }

  function loadTrack(library, index, autoplay = true) {
    if (!library || !Array.isArray(library.tracks) || !library.tracks.length) return;

    currentLibrary = library;
    const total = library.tracks.length;
    currentIndex = ((index % total) + total) % total;
    currentTrack = library.tracks[currentIndex];

    audio.src = new URL(
      "badbear-music/" + currentTrack.src,
      baseUrl
    ).href;

    audio.load();
    setPlayerText();
    notifyFrame();

    if (autoplay) {
      audio.play().catch(() => {});
    }
  }

  function playTrackById(libraryId, trackId) {
    const library = findLibrary(libraryId, trackId);
    if (!library) return;

    const index = library.tracks.findIndex(track => track.id === trackId);
    if (index < 0) return;

    const sameTrack =
      currentTrack &&
      currentLibrary &&
      currentLibrary.id === library.id &&
      currentTrack.id === trackId;

    if (sameTrack) {
      if (audio.paused) audio.play().catch(() => {});
      return;
    }

    loadTrack(library, index, true);
  }

  function nextTrack() {
    if (!currentLibrary) return;
    loadTrack(currentLibrary, currentIndex + 1, true);
  }

  function previousTrack() {
    if (!currentLibrary) return;
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    loadTrack(currentLibrary, currentIndex - 1, true);
  }

  function togglePlay() {
    if (!currentTrack) {
      const firstLibrary = catalog.find(item => item.tracks?.length);
      if (firstLibrary) loadTrack(firstLibrary, 0, true);
      return;
    }

    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }

  playBtn.addEventListener("click", togglePlay);
  prevBtn.addEventListener("click", previousTrack);
  nextBtn.addEventListener("click", nextTrack);

  audio.addEventListener("play", () => {
    playBtn.textContent = "❚❚";
    playBtn.setAttribute("aria-label", "Pausar");
    notifyFrame();
  });

  audio.addEventListener("pause", () => {
    playBtn.textContent = "▶";
    playBtn.setAttribute("aria-label", "Reproducir");
    notifyFrame();
  });

  audio.addEventListener("ended", nextTrack);

  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
    progress.max = Number.isFinite(audio.duration) ? audio.duration : 0;
  });

  audio.addEventListener("timeupdate", () => {
    if (!seeking) progress.value = audio.currentTime || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  });

  progress.addEventListener("input", () => {
    seeking = true;
    currentTimeEl.textContent = formatTime(Number(progress.value));
  });

  progress.addEventListener("change", () => {
    audio.currentTime = Number(progress.value) || 0;
    seeking = false;
  });

  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
  });
  audio.volume = Number(volume.value);

  window.addEventListener("message", event => {
    if (event.origin !== location.origin) return;
    const data = event.data || {};

    if (data.type === "badbear-music-play") {
      playTrackById(data.libraryId, data.trackId);
      return;
    }

    if (data.type === "badbear-player-request-state") {
      notifyFrame();
      return;
    }

    if (data.type === "badbear-shell-navigate" && data.href) {
      navigateFrame(data.href, true);
    }
  });

  function sanitizePage(raw) {
    try {
      const target = new URL(raw || "index.html", baseUrl);
      if (target.origin !== location.origin) return new URL("index.html", baseUrl).href;
      if (!target.pathname.startsWith(basePath)) return new URL("index.html", baseUrl).href;
      if (target.pathname.endsWith("/app.html")) return new URL("index.html", baseUrl).href;
      return target.href;
    } catch {
      return new URL("index.html", baseUrl).href;
    }
  }

  function relativePageFromUrl(url) {
    const target = new URL(url);
    let rel = target.pathname.startsWith(basePath)
      ? target.pathname.slice(basePath.length)
      : "index.html";
    if (!rel) rel = "index.html";
    return rel + target.search + target.hash;
  }

  function navigateFrame(raw, pushHistory = false) {
    const target = sanitizePage(raw);
    frame.src = target;

    if (pushHistory) {
      const rel = relativePageFromUrl(target);
      const shellUrl = new URL(location.href);
      shellUrl.searchParams.set("page", rel);
      history.pushState({ page: rel }, "", shellUrl);
    }
  }

  frame.addEventListener("load", () => {
    try {
      const href = frame.contentWindow.location.href;
      if (!href || href === lastFrameUrl) {
        notifyFrame();
        return;
      }
      lastFrameUrl = href;

      const target = new URL(href);
      if (target.origin === location.origin && target.pathname.startsWith(basePath)) {
        const rel = relativePageFromUrl(target);
        const shellUrl = new URL(location.href);
        shellUrl.searchParams.set("page", rel);
        history.replaceState({ page: rel }, "", shellUrl);
      }
    } catch (_) {}

    notifyFrame();
  });

  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(location.search);
    navigateFrame(params.get("page") || "index.html", false);
  });

  const params = new URLSearchParams(location.search);
  navigateFrame(params.get("page") || "index.html", false);

  if ("mediaSession" in navigator) {
    try {
      navigator.mediaSession.setActionHandler("play", () => audio.play());
      navigator.mediaSession.setActionHandler("pause", () => audio.pause());
      navigator.mediaSession.setActionHandler("nexttrack", nextTrack);
      navigator.mediaSession.setActionHandler("previoustrack", previousTrack);
    } catch (_) {}
  }

  setPlayerText();
})();
