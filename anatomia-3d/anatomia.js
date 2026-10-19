import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const BODY_MODEL_URLS = [
  "https://raw.githubusercontent.com/Charleeh/ecorche/main/model/ecorche.meshopt.glb",
  "https://raw.githubusercontent.com/Charleeh/ecorche/main/model/ecorche.glb"
];

const BRAIN_MODEL_URL =
  "https://raw.githubusercontent.com/itayinbarr/brainproject/main/brain-atlas/models/brain.glb";

const DRACO_DECODER_PATH =
  "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/libs/draco/";

const canvas = document.getElementById("anatomyCanvas");
const loadingOverlay = document.getElementById("loadingOverlay");
const loadingText = document.getElementById("loadingText");
const searchInput = document.getElementById("structureSearch");
const searchResults = document.getElementById("searchResults");
const opacityInput = document.getElementById("muscleOpacity");
const opacityValue = document.getElementById("opacityValue");
const emptySelection = document.getElementById("emptySelection");
const selectionCard = document.getElementById("selectionCard");
const systemGrid = document.getElementById("systemGrid");
const systemDescription = document.getElementById("systemDescription");
const systemStatus = document.getElementById("systemStatus");
const systemNotice = document.getElementById("systemNotice");
const organGrid = document.getElementById("organGrid");
const panelLeft = document.querySelector(".panel-left");
const bodyLayersSection = document.getElementById("bodyLayersSection");
const muscleOpacitySection = document.getElementById("muscleOpacitySection");
const sourceNoteTitle = document.getElementById("sourceNoteTitle");
const sourceNoteText = document.getElementById("sourceNoteText");
const viewerBadgeText = document.getElementById("viewerBadgeText");
const anatomyCatalog = Array.isArray(window.BADBEAR_ANATOMY_CATALOG)
  ? window.BADBEAR_ANATOMY_CATALOG
  : [];

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x06111f, 0.075);

const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 100);
camera.position.set(0, 0.95, 3.7);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.minDistance = 0.04;
controls.maxDistance = 10;
controls.target.set(0, 0.9, 0);

scene.add(new THREE.HemisphereLight(0xbfeaff, 0x1a2030, 2.1));

const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
keyLight.position.set(3, 5, 4);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0x61c8ff, 2.0);
rimLight.position.set(-4, 2, -4);
scene.add(rimLight);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(1.7, 96),
  new THREE.MeshStandardMaterial({
    color: 0x0a1a29,
    roughness: 1,
    metalness: 0,
    transparent: true,
    opacity: 0.7
  })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.003;
scene.add(floor);

const datasets = {
  body: { root: null, records: [], loaded: false },
  brain: { root: null, records: [], loaded: false }
};

let records = [];
let activeDataset = "body";
let currentLayer = "both";
let isolatedMesh = null;
let selectedMesh = null;
let selectionHelper = null;
let activeSystemId = "cuerpo-completo";
let activeOrganId = "";

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function showLoading(message) {
  loadingText.textContent = message;
  loadingOverlay.classList.remove("done");
}

function hideLoading(message = "") {
  if (message) loadingText.textContent = message;
  window.setTimeout(() => loadingOverlay.classList.add("done"), 220);
}

function getMetadata(object, root) {
  let node = object;
  const data = {};

  while (node) {
    if (node.userData) {
      for (const [key, value] of Object.entries(node.userData)) {
        if (data[key] === undefined && value !== undefined && value !== "") {
          data[key] = value;
        }
      }
    }
    if (node === root) break;
    node = node.parent;
  }

  return data;
}

function normaliseBodyLayer(value) {
  const layer = String(value || "").toLowerCase();
  if (layer.includes("skeleton")) return "skeleton";
  if (layer.includes("muscle")) return "muscles";
  return "other";
}

function pretty(value) {
  const text = String(value || "").trim();
  if (!text) return "—";

  const dictionary = {
    left: "Izquierdo",
    right: "Derecho",
    median: "Línea media",
    midline: "Línea media",
    muscle: "Músculo",
    bone: "Hueso",
    cartilage: "Cartílago",
    tooth: "Diente",
    eye: "Ojo"
  };

  return dictionary[text.toLowerCase()] || (text.charAt(0).toUpperCase() + text.slice(1));
}

function prettyBrainCategory(value) {
  const key = String(value || "").toLowerCase();

  const labels = {
    cortex: "Corteza cerebral",
    deep_grey: "Núcleos profundos",
    diencephalon: "Diencéfalo",
    brainstem: "Tronco encefálico",
    cerebellum: "Cerebelo",
    ventricles: "Sistema ventricular",
    cranial_nerves: "Pares craneales",
    tracts: "Tractos de sustancia blanca",
    white_matter: "Sustancia blanca",
    arteries: "Arterias cerebrales",
    veins_sinuses: "Venas y senos durales",
    meninges_dura: "Duramadre"
  };

  return labels[key] || pretty(value);
}

function setMaterialOpacity(mesh, opacity) {
  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

  materials.forEach((material) => {
    if (!material) return;
    material.transparent = opacity < 0.999;
    material.opacity = opacity;
    material.depthWrite = opacity > 0.55;
    material.needsUpdate = true;
  });
}

function clearSelectionHelper() {
  if (!selectionHelper) return;

  scene.remove(selectionHelper);
  selectionHelper.geometry?.dispose();
  selectionHelper.material?.dispose();
  selectionHelper = null;
}

function resetSelectionPanel() {
  selectedMesh = null;
  clearSelectionHelper();
  emptySelection.hidden = false;
  selectionCard.hidden = true;
}

function updateBodyControls() {
  const isBody = activeDataset === "body";
  if (bodyLayersSection) bodyLayersSection.hidden = !isBody;
  if (muscleOpacitySection) muscleOpacitySection.hidden = !isBody;

  if (sourceNoteTitle && sourceNoteText && viewerBadgeText) {
    if (isBody) {
      sourceNoteTitle.textContent = "Modelo osteomuscular abierto";
      sourceNoteText.textContent = "Écorché · BodyParts3D · Z-Anatomy";
      viewerBadgeText.textContent = "Cuerpo 3D interactivo";
    } else {
      sourceNoteTitle.textContent = "Modelo neuroanatómico abierto";
      sourceNoteText.textContent = "Brain Project · Z-Anatomy · BodyParts3D";
      viewerBadgeText.textContent = "Cerebro 3D interactivo";
    }
  }
}

function setActiveDataset(type) {
  activeDataset = type;

  if (datasets.body.root) datasets.body.root.visible = type === "body";
  if (datasets.brain.root) datasets.brain.root.visible = type === "brain";

  floor.visible = type === "body";
  records = datasets[type].records;

  isolatedMesh = null;
  resetSelectionPanel();
  updateBodyControls();
}

function updateBodyVisibility() {
  if (!datasets.body.loaded) return;

  const muscleOpacity = Number(opacityInput.value) / 100;

  for (const record of datasets.body.records) {
    const layerMatch =
      currentLayer === "both" ||
      (currentLayer === "skeleton" && record.layer === "skeleton") ||
      (currentLayer === "muscles" && record.layer === "muscles");

    record.mesh.visible = isolatedMesh ? record.mesh === isolatedMesh : layerMatch;

    setMaterialOpacity(
      record.mesh,
      record.layer === "muscles" ? muscleOpacity : 1
    );
  }
}

function setLayer(layer) {
  currentLayer = layer;
  isolatedMesh = null;

  document.querySelectorAll("[data-layer]").forEach((button) => {
    button.classList.toggle("active", button.dataset.layer === layer);
  });

  updateBodyVisibility();
}

function brainFilterForOrgan(organId) {
  const filters = {
    cerebro: () => true,
    lobulos: (record) => record.category === "cortex",
    "ganglios-basales": (record) => record.category === "deep_grey",
    diencefalo: (record) => record.category === "diencephalon",
    tronco: (record) => record.category === "brainstem",
    cerebelo: (record) => record.category === "cerebellum",
    ventriculos: (record) => record.category === "ventricles",
    "pares-craneales": (record) => record.category === "cranial_nerves"
  };

  return filters[organId] || null;
}

function applyBrainFilter(organId = "") {
  if (!datasets.brain.loaded) return;

  const filter = brainFilterForOrgan(organId);

  for (const record of datasets.brain.records) {
    record.mesh.visible = filter ? filter(record) : true;
  }

  isolatedMesh = null;
  resetSelectionPanel();
}

function visibleRecords() {
  return records.filter((record) => record.mesh.visible);
}

function fitVisibleRecords() {
  const visible = visibleRecords();
  if (!visible.length) return;

  const box = new THREE.Box3();

  visible.forEach((record) => {
    box.expandByObject(record.mesh);
  });

  if (box.isEmpty()) return;

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);

  controls.target.copy(center);

  const distanceMultiplier = activeDataset === "brain" ? 1.85 : 1.72;
  camera.position.set(
    center.x,
    center.y + size.y * 0.02,
    center.z + Math.max(maxDim * distanceMultiplier, 0.18)
  );

  camera.near = Math.max(maxDim / 2500, 0.0005);
  camera.far = Math.max(maxDim * 30, 10);
  camera.updateProjectionMatrix();
  controls.update();

  if (activeDataset === "body") {
    floor.scale.setScalar(Math.max(size.x, size.z) * 0.72);
    floor.position.y = box.min.y - 0.006;
  }
}

function cameraPreset(view) {
  const visible = visibleRecords();
  if (!visible.length) return;

  const box = new THREE.Box3();
  visible.forEach((record) => box.expandByObject(record.mesh));

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const distance = Math.max(size.x, size.y, size.z) * 1.75;

  const positions = {
    front: [center.x, center.y, center.z + distance],
    back: [center.x, center.y, center.z - distance],
    left: [center.x - distance, center.y, center.z],
    right: [center.x + distance, center.y, center.z]
  };

  const target = positions[view];
  if (!target) return;

  camera.position.set(...target);
  controls.target.copy(center);
  controls.update();
}

function selectMesh(mesh) {
  if (!mesh) return;

  selectedMesh = mesh;
  const record = records.find((item) => item.mesh === mesh);
  if (!record) return;

  clearSelectionHelper();

  selectionHelper = new THREE.BoxHelper(mesh, 0x2fd9ff);
  selectionHelper.material.transparent = true;
  selectionHelper.material.opacity = 0.82;
  scene.add(selectionHelper);

  emptySelection.hidden = true;
  selectionCard.hidden = false;

  document.getElementById("structureName").textContent = record.name;

  const originalName = document.getElementById("structureOriginalName");
  const labelTissue = document.getElementById("detailLabelTissue");
  const labelRef = document.getElementById("detailLabelRef");

  if (activeDataset === "brain") {
    if (originalName) originalName.textContent = "Brain Project · nomenclatura anatómica original";
    if (labelTissue) labelTissue.textContent = "Categoría";
    if (labelRef) labelRef.textContent = "Región";

    document.getElementById("structureLayer").textContent = "Neuroanatomía";
    document.getElementById("structureSide").textContent = pretty(record.side);
    document.getElementById("structureTissue").textContent = prettyBrainCategory(record.category);
    document.getElementById("structureFma").textContent = pretty(record.region);
  } else {
    if (originalName) originalName.textContent = "Nomenclatura original del modelo";
    if (labelTissue) labelTissue.textContent = "Tejido";
    if (labelRef) labelRef.textContent = "FMA";

    document.getElementById("structureLayer").textContent =
      record.layer === "skeleton" ? "Esqueleto" :
      record.layer === "muscles" ? "Músculo" :
      "Estructura";

    document.getElementById("structureSide").textContent = pretty(record.meta.side);
    document.getElementById("structureTissue").textContent =
      pretty(record.meta.tissue || (record.layer === "muscles" ? "muscle" : ""));
    document.getElementById("structureFma").textContent = record.meta.fma || "—";
  }
}

function focusMesh(mesh) {
  const box = new THREE.Box3().setFromObject(mesh);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const distance = Math.max(size.x, size.y, size.z, activeDataset === "brain" ? 0.004 : 0.08) * 3.3;

  controls.target.copy(center);
  camera.position.set(center.x, center.y + distance * 0.15, center.z + distance);
  controls.update();
}

function renderSearch() {
  const query = searchInput.value.trim().toLowerCase();

  if (query.length < 2) {
    searchResults.hidden = true;
    searchResults.innerHTML = "";
    return;
  }

  const matches = records
    .filter((record) => record.name.toLowerCase().includes(query))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 32);

  searchResults.innerHTML = "";

  if (!matches.length) {
    const item = document.createElement("button");
    item.type = "button";
    item.disabled = true;
    item.textContent = "Sin coincidencias";
    searchResults.appendChild(item);
  } else {
    matches.forEach((record) => {
      const item = document.createElement("button");
      item.type = "button";
      item.textContent = record.name;

      item.addEventListener("click", () => {
        isolatedMesh = null;

        if (activeDataset === "body") {
          if (record.layer === "skeleton") setLayer("skeleton");
          else if (record.layer === "muscles") setLayer("muscles");
          updateBodyVisibility();
        } else {
          record.mesh.visible = true;
        }

        selectMesh(record.mesh);
        focusMesh(record.mesh);

        searchInput.value = record.name;
        searchResults.hidden = true;
      });

      searchResults.appendChild(item);
    });
  }

  searchResults.hidden = false;
}

function buildBodyRecords(root) {
  const result = [];

  root.traverse((object) => {
    if (!object.isMesh) return;

    if (Array.isArray(object.material)) {
      object.material = object.material.map((material) => material.clone());
    } else if (object.material) {
      object.material = object.material.clone();
    }

    const meta = getMetadata(object, root);
    const layer = normaliseBodyLayer(meta.layer);
    const name = String(meta.name || object.name || "Estructura anatómica")
      .replace(/_/g, " ")
      .trim();

    result.push({ mesh: object, meta, layer, name });
  });

  return result.sort((a, b) => a.name.localeCompare(b.name));
}

function buildBrainRecords(root) {
  const result = [];

  root.traverse((object) => {
    if (!object.isMesh) return;

    const meta = getMetadata(object, root);

    const name = String(
      meta.bx_label ||
      meta.label ||
      meta.name ||
      object.name ||
      "Estructura neuroanatómica"
    )
      .replace(/_/g, " ")
      .trim();

    result.push({
      mesh: object,
      meta,
      name,
      category: String(meta.bx_cat || meta.category || "").trim(),
      side: String(meta.bx_side || meta.side || "").trim(),
      region: String(meta.bx_region || meta.region || "").trim()
    });
  });

  return result.sort((a, b) => a.name.localeCompare(b.name));
}

function loadBodyModel(index = 0) {
  return new Promise((resolve, reject) => {
    if (datasets.body.loaded) {
      resolve(datasets.body.root);
      return;
    }

    if (index >= BODY_MODEL_URLS.length) {
      reject(new Error("No se pudo cargar el modelo corporal."));
      return;
    }

    showLoading("Cargando cuerpo 3D...");

    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    loader.load(
      BODY_MODEL_URLS[index],
      (gltf) => {
        datasets.body.root = gltf.scene;
        datasets.body.records = buildBodyRecords(gltf.scene);
        datasets.body.loaded = true;

        scene.add(gltf.scene);

        if (activeDataset !== "body") gltf.scene.visible = false;

        hideLoading(datasets.body.records.length + " estructuras corporales listas");
        resolve(gltf.scene);
      },
      (event) => {
        if (event.total) {
          const percent = Math.round((event.loaded / event.total) * 100);
          loadingText.textContent = "Cargando cuerpo 3D · " + percent + "%";
        }
      },
      () => {
        loadBodyModel(index + 1).then(resolve).catch(reject);
      }
    );
  });
}

function loadBrainModel() {
  return new Promise((resolve, reject) => {
    if (datasets.brain.loaded) {
      resolve(datasets.brain.root);
      return;
    }

    showLoading("Cargando cerebro 3D...");

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(DRACO_DECODER_PATH);

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      BRAIN_MODEL_URL,
      (gltf) => {
        datasets.brain.root = gltf.scene;
        datasets.brain.records = buildBrainRecords(gltf.scene);
        datasets.brain.loaded = true;

        scene.add(gltf.scene);
        gltf.scene.visible = false;

        dracoLoader.dispose();

        hideLoading(datasets.brain.records.length + " estructuras neuroanatómicas listas");
        resolve(gltf.scene);
      },
      (event) => {
        if (event.total) {
          const percent = Math.round((event.loaded / event.total) * 100);
          loadingText.textContent = "Cargando cerebro 3D · " + percent + "%";
        } else {
          loadingText.textContent = "Descargando cerebro 3D...";
        }
      },
      (error) => {
        dracoLoader.dispose();
        loadingText.textContent = "No se pudo cargar el cerebro 3D.";
        reject(error);
      }
    );
  });
}

function updateAnatomyRoute(systemId, organId = "") {
  const url = new URL(window.location.href);

  if (systemId) url.searchParams.set("sistema", systemId);
  else url.searchParams.delete("sistema");

  if (organId) url.searchParams.set("organo", organId);
  else url.searchParams.delete("organo");

  history.replaceState({ systemId, organId }, "", url);
}

function showSystemNotice(message) {
  systemNotice.textContent = message;
  systemNotice.hidden = !message;
}

async function applySystemModel(system, organ) {
  if (system.id === "nervioso") {
    try {
      await loadBrainModel();

      if (activeSystemId !== "nervioso") return;

      setActiveDataset("brain");
      applyBrainFilter(organ?.id || "");
      fitVisibleRecords();

      if (organ && brainFilterForOrgan(organ.id)) {
        showSystemNotice("");
      } else if (organ?.estado === "preparado") {
        showSystemNotice(
          "Esta subestructura aún no está resuelta en el modelo neuroanatómico actual."
        );
      }
    } catch {
      showSystemNotice(
        "No se pudo cargar el modelo cerebral desde su fuente abierta. Revisa la conexión e inténtalo nuevamente."
      );
    }

    return;
  }

  setActiveDataset("body");
  updateBodyVisibility();
  fitVisibleRecords();

  if (system.id === "cuerpo-completo" || system.id === "osteomuscular") {
    showSystemNotice("");
  } else {
    showSystemNotice(
      "Este sistema ya está organizado en BADBEAR.MED. Falta incorporar su modelo 3D específico."
    );
  }
}

function selectCatalogOrgan(system, organ, button) {
  document.querySelectorAll(".organ-chip").forEach((chip) => chip.classList.remove("active"));
  if (button) button.classList.add("active");

  activeOrganId = organ?.id || "";
  updateAnatomyRoute(system.id, activeOrganId);

  if (system.id === "osteomuscular" && organ?.layer) {
    setActiveDataset("body");
    setLayer(organ.layer);
    fitVisibleRecords();
    showSystemNotice("");
    return;
  }

  applySystemModel(system, organ);
}

function renderCatalog(systemId, organId = "", options = {}) {
  if (!anatomyCatalog.length || !systemGrid || !organGrid) return;

  const system = anatomyCatalog.find((item) => item.id === systemId) || anatomyCatalog[0];

  activeSystemId = system.id;
  activeOrganId = organId || "";

  systemGrid.querySelectorAll(".system-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.systemId === system.id);
  });

  systemDescription.textContent = system.descripcion || "";
  systemStatus.textContent = system.estado === "disponible" ? "Disponible" : "Preparado";
  systemStatus.classList.toggle("preparado", system.estado !== "disponible");

  organGrid.innerHTML = "";

  (system.organos || []).forEach((organ) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "organ-chip";
    button.dataset.state = organ.estado || "preparado";
    button.textContent = organ.nombre;

    if (organ.id === organId) button.classList.add("active");

    button.addEventListener("click", () => {
      selectCatalogOrgan(system, organ, button);
    });

    organGrid.appendChild(button);
  });

  updateAnatomyRoute(system.id, organId);

  const selectedOrgan = (system.organos || []).find((organ) => organ.id === organId);

  if (selectedOrgan) {
    const activeButton = [...organGrid.querySelectorAll(".organ-chip")]
      .find((button) => button.classList.contains("active"));

    selectCatalogOrgan(system, selectedOrgan, activeButton);
  } else {
    applySystemModel(system, null);
  }

  if (options.scrollPanelTop && panelLeft) {
    panelLeft.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function initialiseCatalog() {
  if (!anatomyCatalog.length || !systemGrid) return;

  systemGrid.innerHTML = "";

  anatomyCatalog.forEach((system) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "system-button";
    button.dataset.systemId = system.id;
    button.dataset.state = system.estado || "preparado";

    const icon = document.createElement("span");
    icon.className = "system-icon";
    icon.textContent = system.icono || "•";

    const copy = document.createElement("span");
    copy.className = "system-copy";

    const name = document.createElement("span");
    name.className = "system-name";
    name.textContent = system.nombre;

    const status = document.createElement("span");
    status.className = "system-mini-status";
    status.textContent = system.estado === "disponible" ? "Modelo activo" : "Preparado";

    copy.append(name, status);
    button.append(icon, copy);

    button.addEventListener("click", () => {
      renderCatalog(system.id, "", { scrollPanelTop: true });
    });

    systemGrid.appendChild(button);
  });

  const params = new URLSearchParams(window.location.search);
  const requestedSystem = params.get("sistema");
  const requestedOrgan = params.get("organo");

  const firstSystem =
    anatomyCatalog.find((item) => item.id === requestedSystem)?.id ||
    anatomyCatalog[0].id;

  if (panelLeft) panelLeft.scrollTop = 0;

  renderCatalog(firstSystem, requestedOrgan || "");
}

document.querySelectorAll("[data-layer]").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveDataset("body");
    setLayer(button.dataset.layer);
    fitVisibleRecords();
  });
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => cameraPreset(button.dataset.view));
});

document.getElementById("resetView").addEventListener("click", () => fitVisibleRecords());

opacityInput.addEventListener("input", () => {
  opacityValue.textContent = opacityInput.value + "%";
  updateBodyVisibility();
});

searchInput.addEventListener("input", renderSearch);
searchInput.addEventListener("focus", renderSearch);

document.addEventListener("click", (event) => {
  if (!event.target.closest(".search-wrap")) searchResults.hidden = true;
});

document.getElementById("isolateButton").addEventListener("click", () => {
  if (!selectedMesh) return;

  isolatedMesh = selectedMesh;

  records.forEach((record) => {
    record.mesh.visible = record.mesh === selectedMesh;
  });

  focusMesh(selectedMesh);
});

document.getElementById("showAllButton").addEventListener("click", () => {
  isolatedMesh = null;

  if (activeDataset === "body") {
    updateBodyVisibility();
  } else {
    applyBrainFilter(activeOrganId);
  }

  fitVisibleRecords();
});

renderer.domElement.addEventListener("pointerup", (event) => {
  if (!records.length) return;

  const rect = renderer.domElement.getBoundingClientRect();

  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const visibleMeshes = records
    .filter((record) => record.mesh.visible)
    .map((record) => record.mesh);

  const hits = raycaster.intersectObjects(visibleMeshes, false);

  if (hits.length) selectMesh(hits[0].object);
});

window.addEventListener("popstate", () => {
  const params = new URLSearchParams(window.location.search);
  const requestedSystem = params.get("sistema") || activeSystemId;
  const requestedOrgan = params.get("organo") || "";

  renderCatalog(requestedSystem, requestedOrgan);
});

function resize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (!width || !height) return;

  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", resize);

function animate() {
  resize();
  controls.update();

  if (selectionHelper) selectionHelper.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

async function start() {
  try {
    await loadBodyModel();
    setActiveDataset("body");
    updateBodyVisibility();
    initialiseCatalog();
  } catch {
    loadingText.textContent = "No se pudo cargar el modelo anatómico inicial.";
  }

  resize();
  animate();
}

start();
