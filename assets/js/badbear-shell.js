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

  const launcher = document.getElementById("bb-player-launcher");
  const minimizeBtn = document.getElementById("bb-minimize");
  const closeBtn = document.getElementById("bb-close");
  let playerView = "mini";
  try {
    const saved = localStorage.getItem("bb-player-view");
    if (["mini", "expanded", "closed"].includes(saved)) playerView = saved;
  } catch (_) {}

  function setPlayerView(view, moveFocus = false) {
    playerView = view;
    const expanded = view === "expanded";
    document.body.dataset.bbPlayerView = view;
    player.hidden = !expanded;
    launcher.hidden = view !== "mini";
    launcher.setAttribute("aria-expanded", String(expanded));
    try { localStorage.setItem("bb-player-view", view); } catch (_) {}
    if (moveFocus) {
      if (expanded) minimizeBtn.focus();
      else if (view === "mini") launcher.focus();
      else frame.focus();
    }
  }

  function updateLauncher() {
    const playing = !!currentTrack && !audio.paused;
    const label = (playing ? "Sonando: " : "Abrir reproductor: ") +
      (currentTrack?.title || "badbear.music");
    launcher.dataset.playing = String(playing);
    launcher.title = label;
    launcher.setAttribute("aria-label", label);
  }

  launcher.addEventListener("click", () => setPlayerView("expanded", true));
  minimizeBtn.addEventListener("click", () => setPlayerView("mini", true));
  closeBtn.addEventListener("click", () => {
    audio.pause();
    setPlayerView("closed", true);
  });
  player.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.preventDefault();
      setPlayerView("mini", true);
    }
  });

  const catalog = Array.isArray(window.BADBEAR_MUSIC_CATALOG)
    ? window.BADBEAR_MUSIC_CATALOG
    : [];

  let currentLibrary = null;
  let currentIndex = -1;
  let currentTrack = null;
  let seeking = false;
  let lastFrameUrl = "";
  let pendingStartAt = 0;

  const baseUrl = new URL(".", location.href);
  const basePath = baseUrl.pathname;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return m + ":" + s;
  }

  function cleanText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .replace(/\|\s*BADBEAR\.MED.*$/i, "")
      .trim();
  }

  function humanizeFileName(url) {
    try {
      const name = decodeURIComponent(new URL(url).pathname.split("/").pop() || "Audio de clase")
        .replace(/\.(mp3|m4a|wav|ogg)$/i, "")
        .replace(/[_-]+/g, " ")
        .replace(/^\d+[\s.-]*/, "")
        .trim();
      return name || "Audio de clase";
    } catch {
      return "Audio de clase";
    }
  }

  function allMusicLibrary() {
    return {
      id: "all",
      name: "Todas las canciones",
      kind: "music",
      loop: true,
      tracks: catalog.flatMap(library => library.tracks || [])
    };
  }

  function findLibrary(libraryId, trackId) {
    if (libraryId === "all") return allMusicLibrary();
    let library = catalog.find(item => item.id === libraryId);
    if (!library && trackId) {
      library = catalog.find(item =>
        Array.isArray(item.tracks) &&
        item.tracks.some(track => track.id === trackId)
      );
    }
    if (!library) return null;

    return {
      ...library,
      kind: "music",
      loop: true
    };
  }

  function resolveTrackSrc(track) {
    if (track.absoluteSrc) return track.absoluteSrc;
    return new URL("badbear-music/" + track.src, baseUrl).href;
  }

  function setPlayerText() {
    updateLauncher();
    if (!currentTrack || !currentLibrary) {
      player.classList.add("bb-player--idle");
      titleEl.textContent = "Selecciona un audio";
      libraryEl.textContent = "WAJOMEA.GROUP";
      artEl.textContent = "BB";
      return;
    }

    player.classList.remove("bb-player--idle");
    titleEl.textContent = currentTrack.title;

    const position =
      currentLibrary.tracks.length > 1
        ? " · " + (currentIndex + 1) + " de " + currentLibrary.tracks.length
        : "";

    libraryEl.textContent = currentLibrary.name + position;

    if (currentLibrary.kind === "class") {
      artEl.textContent = "CL";
    } else {
      artEl.textContent = currentLibrary.name
        .split(/\s+/)
        .map(word => word[0] || "")
        .join("")
        .slice(0, 2)
        .toUpperCase();
    }

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentLibrary.kind === "class" ? "BADBEAR.MED · Audio de clase" : "badbear.music",
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

  function loadTrack(library, index, autoplay = true, startAt = 0) {
    if (!library || !Array.isArray(library.tracks) || !library.tracks.length) return;

    currentLibrary = library;
    const total = library.tracks.length;
    currentIndex = Math.max(0, Math.min(index, total - 1));
    currentTrack = library.tracks[currentIndex];
    pendingStartAt = Number.isFinite(startAt) ? Math.max(0, startAt) : 0;

    if (playerView === "closed") setPlayerView("mini");
    audio.src = resolveTrackSrc(currentTrack);
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
      if (playerView === "closed") setPlayerView("mini");
      if (audio.paused) audio.play().catch(() => {});
      else audio.pause();
      return;
    }

    loadTrack(library, index, true, 0);
  }

  function nextTrack() {
    if (!currentLibrary) return;

    if (currentIndex + 1 < currentLibrary.tracks.length) {
      loadTrack(currentLibrary, currentIndex + 1, true, 0);
      return;
    }

    if (currentLibrary.loop) {
      loadTrack(currentLibrary, 0, true, 0);
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    playBtn.textContent = "▶";
  }

  function previousTrack() {
    if (!currentLibrary) return;

    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    if (currentIndex > 0) {
      loadTrack(currentLibrary, currentIndex - 1, true, 0);
      return;
    }

    if (currentLibrary.loop && currentLibrary.tracks.length > 1) {
      loadTrack(currentLibrary, currentLibrary.tracks.length - 1, true, 0);
      return;
    }

    audio.currentTime = 0;
  }

  function togglePlay() {
    if (!currentTrack) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }

  playBtn.addEventListener("click", togglePlay);
  prevBtn.addEventListener("click", previousTrack);
  nextBtn.addEventListener("click", nextTrack);

  audio.addEventListener("play", () => {
    playBtn.textContent = "❚❚";
    playBtn.setAttribute("aria-label", "Pausar");
    updateLauncher();
    notifyFrame();
  });

  audio.addEventListener("pause", () => {
    playBtn.textContent = "▶";
    playBtn.setAttribute("aria-label", "Reproducir");
    updateLauncher();
    notifyFrame();
  });

  audio.addEventListener("ended", nextTrack);

  audio.addEventListener("loadedmetadata", () => {
    if (pendingStartAt > 0 && Number.isFinite(audio.duration)) {
      audio.currentTime = Math.min(pendingStartAt, Math.max(0, audio.duration - 0.25));
      pendingStartAt = 0;
    }
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

    if (data.type === "badbear-music-filter") {
      const library = findLibrary(data.libraryId, null);
      if (!library || !currentTrack || currentLibrary?.kind !== "music") return;
      const index = library.tracks.findIndex(track => track.id === currentTrack.id);
      if (index >= 0) {
        currentLibrary = library;
        currentIndex = index;
        setPlayerText();
        notifyFrame();
      } else {
        const wasPlaying = !audio.paused;
        loadTrack(library, 0, wasPlaying, 0);
      }
      return;
    }

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
    if (playerView === "closed" &&
        new URL(target).pathname.startsWith(basePath + "badbear-music/")) {
      setPlayerView("expanded");
    }
    frame.src = target;

    if (pushHistory) {
      const rel = relativePageFromUrl(target);
      const shellUrl = new URL(location.href);
      shellUrl.searchParams.set("page", rel);
      history.pushState({ page: rel }, "", shellUrl);
    }
  }

  function bindFrameNavigation() {
    try {
      const doc = frame.contentDocument;
      if (!doc || doc.documentElement.dataset.bbShellBound === "1") return;

      doc.documentElement.dataset.bbShellBound = "1";

      doc.addEventListener("click", event => {
        if (event.defaultPrevented) return;
        if (event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const anchor = event.target.closest("a[href]");
        if (!anchor) return;
        if (anchor.hasAttribute("download")) return;
        if (anchor.target === "_blank") return;

        const raw = anchor.getAttribute("href") || "";
        if (!raw) return;
        if (
          raw.startsWith("#") ||
          raw.startsWith("mailto:") ||
          raw.startsWith("tel:") ||
          raw.startsWith("javascript:")
        ) return;

        let target;
        try {
          target = new URL(raw, frame.contentWindow.location.href);
        } catch {
          return;
        }

        if (target.origin !== location.origin) return;
        if (!target.pathname.startsWith(basePath)) return;
        if (target.pathname.endsWith("/app.html")) return;

        event.preventDefault();
        navigateFrame(target.href, true);
      }, true);
    } catch (_) {}
  }

  function getAudioSource(audioEl, doc) {
    const raw =
      audioEl.currentSrc ||
      audioEl.getAttribute("src") ||
      audioEl.querySelector("source[src]")?.getAttribute("src") ||
      "";

    if (!raw) return "";

    try {
      return new URL(raw, doc.location.href).href;
    } catch {
      return "";
    }
  }

  function getAcademicTitle(audioEl, src) {
    const direct = cleanText(
      audioEl.dataset.title ||
      audioEl.getAttribute("aria-label") ||
      audioEl.getAttribute("title")
    );
    if (direct) return direct;

    const container = audioEl.closest(
      "article,section,.card,.resource,.audio-card,.lesson,.tema,.topic,.module,.bloque,.contenido"
    );

    if (container) {
      const heading = container.querySelector("h1,h2,h3,h4,h5,strong");
      const value = cleanText(heading?.textContent);
      if (value && value.length <= 140) return value;
    }

    let sibling = audioEl.previousElementSibling;
    let tries = 0;
    while (sibling && tries < 3) {
      const value = cleanText(sibling.textContent);
      if (value && value.length <= 140) return value;
      sibling = sibling.previousElementSibling;
      tries++;
    }

    return humanizeFileName(src);
  }

  function getAcademicLibraryName(doc) {
    const h1 = cleanText(doc.querySelector("h1")?.textContent);
    if (h1 && h1.length <= 100) return h1;

    const title = cleanText(doc.title);
    if (title) return title;

    try {
      const segment = decodeURIComponent(doc.location.pathname.split("/").filter(Boolean).slice(-2, -1)[0] || "");
      return segment.replace(/[-_]+/g, " ") || "Audio de clase";
    } catch {
      return "Audio de clase";
    }
  }

  function buildAcademicQueue(doc, targetAudio) {
    const elements = [...doc.querySelectorAll("audio")];
    const tracks = [];
    let selectedIndex = 0;

    elements.forEach((audioEl, index) => {
      const src = getAudioSource(audioEl, doc);
      if (!src) return;

      const id = "class-" + btoa(unescape(encodeURIComponent(src))).replace(/[^a-z0-9]/gi, "").slice(-32);
      const track = {
        id,
        title: getAcademicTitle(audioEl, src),
        absoluteSrc: src,
        kind: "class"
      };

      if (audioEl === targetAudio) {
        selectedIndex = tracks.length;
      }

      tracks.push(track);
    });

    return {
      library: {
        id: "class-" + encodeURIComponent(doc.location.pathname),
        name: getAcademicLibraryName(doc),
        kind: "class",
        loop: false,
        tracks
      },
      selectedIndex
    };
  }

  function transferInlineAudio(audioEl, doc) {
    if (audioEl.dataset.bbTransferLock === "1") return;

    const src = getAudioSource(audioEl, doc);
    if (!src) return;

    audioEl.dataset.bbTransferLock = "1";

    const startAt = Number.isFinite(audioEl.currentTime) ? audioEl.currentTime : 0;
    audioEl.pause();

    const { library, selectedIndex } = buildAcademicQueue(doc, audioEl);
    if (!library.tracks.length) {
      delete audioEl.dataset.bbTransferLock;
      return;
    }

    loadTrack(library, selectedIndex, true, startAt);

    setTimeout(() => {
      delete audioEl.dataset.bbTransferLock;
    }, 250);
  }

  function bindOneInlineAudio(audioEl, doc) {
    if (audioEl.dataset.bbGlobalAudioBound === "1") return;
    audioEl.dataset.bbGlobalAudioBound = "1";

    audioEl.addEventListener("play", () => {
      transferInlineAudio(audioEl, doc);
    });

    audioEl.addEventListener("playing", () => {
      if (!audioEl.paused) transferInlineAudio(audioEl, doc);
    });
  }

  function bindFrameMedia() {
    try {
      const doc = frame.contentDocument;
      if (!doc) return;

      doc.querySelectorAll("audio").forEach(audioEl => {
        bindOneInlineAudio(audioEl, doc);
      });

      if (doc.documentElement.dataset.bbMediaObserver === "1") return;
      doc.documentElement.dataset.bbMediaObserver = "1";

      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (!(node instanceof frame.contentWindow.Element)) return;

            if (node.matches?.("audio")) {
              bindOneInlineAudio(node, doc);
            }

            node.querySelectorAll?.("audio").forEach(audioEl => {
              bindOneInlineAudio(audioEl, doc);
            });
          });
        });
      });

      observer.observe(doc.body || doc.documentElement, {
        childList: true,
        subtree: true
      });
    } catch (_) {}
  }

  frame.addEventListener("load", () => {
    bindFrameNavigation();
    bindFrameMedia();

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

  setPlayerView(playerView);
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
