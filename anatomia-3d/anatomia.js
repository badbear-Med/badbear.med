import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { MODEL_REGISTRY, DRACO_DECODER_PATH } from "./engine/model-registry.js";

const BODY_MODEL_URLS = MODEL_REGISTRY.body.urls;
const BRAIN_MODEL_URL = MODEL_REGISTRY.brainAtlas.url;
const BRAIN_BEAUTY_MODEL_URL = MODEL_REGISTRY.brainBeauty.url;

const BRAIN_PALETTE = {
  cortex: "#CBBEA4",
  white_matter: "#D9DFEA",
  deep_grey: "#A768E8",
  diencephalon: "#687CFF",
  brainstem: "#F0A52E",
  cerebellum: "#E9783B",
  ventricles: "#24C6D8",
  arteries: "#F0445E",
  veins_sinuses: "#426FE8",
  cranial_nerves: "#E2D83D",
  meninges_dura: "#C75BC7",
  tracts: "#4FAFC4"
};

const BRAIN_EMISSIVE = {
  cortex: 0.05,
  white_matter: 0.16,
  deep_grey: 0.44,
  diencephalon: 0.42,
  brainstem: 0.22,
  cerebellum: 0.12,
  ventricles: 0.54,
  arteries: 0.60,
  veins_sinuses: 0.50,
  cranial_nerves: 0.54,
  meninges_dura: 0.06,
  tracts: 0.50
};

const BRAIN_MAX_OPACITY = {
  meninges_dura: 0.34,
  ventricles: 0.90
};

const BASAL_GANGLIA_LABELS = new Set([
  "Caudate nucleus",
  "Putamen",
  "Nucleus accumbens",
  "Globus pallidus external",
  "Globus pallidus internal",
  "Subthalamic nucleus",
  "Substantia nigra"
]);

const BASAL_GANGLIA_BRAINSTEM_LABELS = new Set([
  "Red nucleus"
]);

const canvas = document.getElementById("anatomyCanvas");
const loadingOverlay = document.getElementById("loadingOverlay");
const loadingText = document.getElementById("loadingText");
const searchInput = document.getElementById("structureSearch");
const searchResults = document.getElementById("searchResults");
const opacityInput = document.getElementById("muscleOpacity");
const opacityValue = document.getElementById("opacityValue");
const brainOpacityInput = document.getElementById("brainOpacity");
const brainOpacityValue = document.getElementById("brainOpacityValue");
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
const brainOpacitySection = document.getElementById("brainOpacitySection");
const sourceNoteTitle = document.getElementById("sourceNoteTitle");
const sourceNoteText = document.getElementById("sourceNoteText");
const viewerBadgeText = document.getElementById("viewerBadgeText");
const structureLabel = document.getElementById("structureLabel");
const structureLabelName = document.getElementById("structureLabelName");
const structureLabelMeta = document.getElementById("structureLabelMeta");
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

const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);
camera.position.set(0, 0.95, 3.7);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.minDistance = 0.04;
controls.maxDistance = 10;
controls.target.set(0, 0.9, 0);

const hemiLight = new THREE.HemisphereLight(0xbfeaff, 0x1a2030, 2.1);
scene.add(hemiLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
keyLight.position.set(4.5, 6.5, 7);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x9fc7ff, 0);
fillLight.position.set(-5.5, 2.5, 4);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0x61c8ff, 2.0);
rimLight.position.set(-4, 3, -6);
scene.add(rimLight);

const warmRimLight = new THREE.DirectionalLight(0xffa46b, 0);
warmRimLight.position.set(5, -1.5, -5);
scene.add(warmRimLight);

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
  brain: { root: null, records: [], loaded: false },
  brainBeauty: { root: null, records: [], loaded: false },
  generic: { root: null, records: [], loaded: false, key: null }
};

let records = [];
let activeDataset = "body";
let currentLayer = "both";
let isolatedMesh = null;
let selectedMesh = null;
let selectedRecord = null;
let activeSystemId = "cuerpo-completo";
let activeOrganId = "";
let selectedLabelLocalPoint = null;
let currentGenericSpec = null;
let currentGenericFilterTerms = [];

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function isNeuroDataset(type = activeDataset) {
  return type === "brain" || type === "brainBeauty";
}

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
    meninges_dura: "Duramadre",
    brain: "Cerebro"
  };

  return labels[key] || pretty(value);
}

function setMaterialOpacity(mesh, opacity) {
  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

  materials.forEach((material) => {
    if (!material) return;
    material.transparent = opacity < 0.999;
    material.opacity = opacity;
    material.depthWrite = opacity >= 0.35;
    material.needsUpdate = true;
  });
}

function clearSelectionVisual() {
  if (selectedRecord && activeDataset === "brain") {
    selectedRecord.isSelected = false;
    applyBrainRecordVisual(selectedRecord);
  } else if (selectedRecord && activeDataset === "brainBeauty") {
    selectedRecord.isSelected = false;
    applyBeautyRecordVisual(selectedRecord);
  } else if (selectedRecord && activeDataset === "generic") {
    selectedRecord.isSelected = false;
    applyGenericRecordVisual(selectedRecord);
  } else if (selectedRecord) {
    selectedRecord.isSelected = false;
    applyBodyRecordVisual(selectedRecord, false);
  }

  selectedRecord = null;
}

function resetSelectionPanel() {
  clearSelectionVisual();
  hideStructureLabel();
  selectedMesh = null;
  emptySelection.hidden = false;
  selectionCard.hidden = true;
}

function updateBodyControls() {
  const isBody = activeDataset === "body";
  if (bodyLayersSection) bodyLayersSection.hidden = !isBody;
  if (muscleOpacitySection) muscleOpacitySection.hidden = !isBody;
  if (brainOpacitySection) brainOpacitySection.hidden = isBody;

  if (sourceNoteTitle && sourceNoteText && viewerBadgeText) {
    if (isBody) {
      sourceNoteTitle.textContent = "Modelo osteomuscular abierto";
      sourceNoteText.textContent = "Écorché · BodyParts3D · Z-Anatomy";
      viewerBadgeText.textContent = "Cuerpo 3D interactivo";
    } else if (activeDataset === "brainBeauty") {
      sourceNoteTitle.textContent = "Modelo cerebral visual";
      sourceNoteText.textContent = "Science Museum Group · MediaWiki3D · CC0";
      viewerBadgeText.textContent = "Cerebro 3D · vista realista";
    } else if (activeDataset === "generic" && currentGenericSpec) {
      sourceNoteTitle.textContent = currentGenericSpec.label || "Modelo anatómico 3D";
      sourceNoteText.textContent =
        (currentGenericSpec.source || "Fuente anatómica abierta") +
        " · " +
        (currentGenericSpec.license || "Licencia abierta");
      viewerBadgeText.textContent = (currentGenericSpec.systemLabel || "Anatomía") + " 3D";
    } else {
      sourceNoteTitle.textContent = "Atlas neuroanatómico segmentado";
      sourceNoteText.textContent = "Brain Project · Z-Anatomy · BodyParts3D";
      viewerBadgeText.textContent = "Neuroanatomía 3D interactiva";
    }
  }
}

function setActiveDataset(type) {
  activeDataset = type;

  if (datasets.body.root) datasets.body.root.visible = type === "body";
  if (datasets.brain.root) datasets.brain.root.visible = type === "brain";
  if (datasets.brainBeauty.root) datasets.brainBeauty.root.visible = type === "brainBeauty";
  if (datasets.generic.root) datasets.generic.root.visible = type === "generic";

  floor.visible = type === "body";
  records = datasets[type].records;

  if (isNeuroDataset(type)) {
    hemiLight.intensity = 0.78;
    keyLight.intensity = 2.15;
    fillLight.intensity = 0.72;
    rimLight.intensity = 1.15;
    warmRimLight.intensity = 0.38;
    renderer.toneMappingExposure = 1.02;
    if (scene.fog) scene.fog.density = 0.018;
  } else if (type === "generic") {
    hemiLight.intensity = 1.05;
    keyLight.intensity = 2.35;
    fillLight.intensity = 0.82;
    rimLight.intensity = 1.2;
    warmRimLight.intensity = 0.34;
    renderer.toneMappingExposure = 1.04;
    if (scene.fog) scene.fog.density = 0.02;
  } else {
    hemiLight.intensity = 2.1;
    keyLight.intensity = 2.8;
    fillLight.intensity = 0;
    rimLight.intensity = 2.0;
    warmRimLight.intensity = 0;
    renderer.toneMappingExposure = 1.05;
    if (scene.fog) scene.fog.density = 0.075;
  }

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

function applyBodyRegionFilter(terms = [], layer = "both") {
  setActiveDataset("body");
  currentLayer = layer || "both";
  isolatedMesh = null;

  const normalizedTerms = (terms || []).map((term) => String(term).toLowerCase());

  datasets.body.records.forEach((record) => {
    const layerMatch =
      currentLayer === "both" ||
      (currentLayer === "skeleton" && record.layer === "skeleton") ||
      (currentLayer === "muscles" && record.layer === "muscles");

    const haystack = [
      record.name,
      record.meta?.name,
      record.meta?.region,
      record.meta?.fma
    ].filter(Boolean).join(" ").toLowerCase();

    const termMatch = !normalizedTerms.length || normalizedTerms.some((term) => haystack.includes(term));
    record.mesh.visible = layerMatch && termMatch;
  });

  const matched = datasets.body.records.filter((record) => record.mesh.visible);
  if (!matched.length) updateBodyVisibility();

  fitVisibleRecords();
}

function brainFilterForOrgan(organId) {
  const filters = {
    cerebro: (record) =>
      ["cortex", "cerebellum", "brainstem"].includes(record.category),

    lobulos: (record) => record.category === "cortex",

    "ganglios-basales": (record) =>
      BASAL_GANGLIA_LABELS.has(record.name) ||
      BASAL_GANGLIA_BRAINSTEM_LABELS.has(record.name),

    diencefalo: (record) => record.category === "diencephalon",
    tronco: (record) => record.category === "brainstem",
    cerebelo: (record) => record.category === "cerebellum",
    ventriculos: (record) => record.category === "ventricles",
    "pares-craneales": (record) => record.category === "cranial_nerves"
  };

  return filters[organId] || null;
}

function brainGhostOpacity(record, organId) {
  if (organId === "ganglios-basales") {
    if (record.category === "cortex") return 0.08;
    if (record.category === "brainstem") return 0.10;
  }

  if (organId === "diencefalo") {
    if (record.category === "cortex") return 0.07;
    if (record.category === "brainstem") return 0.10;
  }

  if (organId === "tronco") {
    if (record.category === "cortex") return 0.05;
    if (record.category === "cerebellum") return 0.10;
  }

  if (organId === "cerebelo") {
    if (record.category === "brainstem") return 0.13;
  }

  if (organId === "ventriculos") {
    if (record.category === "cortex") return 0.06;
    if (record.category === "brainstem") return 0.08;
  }

  if (organId === "pares-craneales") {
    if (record.category === "brainstem") return 0.16;
    if (record.category === "cortex") return 0.04;
  }

  return 0;
}

function applyBrainFilter(organId = "") {
  if (!datasets.brain.loaded) return;

  const filter = brainFilterForOrgan(organId);

  for (const record of datasets.brain.records) {
    const isPrimary = filter ? filter(record) : true;
    const ghostOpacity = filter ? brainGhostOpacity(record, organId) : 0;

    record.contextGhost = false;
    record.pickable = true;

    if (isPrimary) {
      record.mesh.visible = true;
      record.viewOpacity = 1;
      applyBrainRecordVisual(record);
      continue;
    }

    if (ghostOpacity > 0) {
      record.mesh.visible = true;
      record.contextGhost = true;
      record.pickable = false;
      record.viewOpacity = ghostOpacity;
      applyBrainRecordVisual(record);
      continue;
    }

    record.viewOpacity = 0;
    record.pickable = false;
    record.mesh.visible = false;
  }

  isolatedMesh = null;
  resetSelectionPanel();
}

function visibleRecords(includeContext = true) {
  return records.filter((record) =>
    record.mesh.visible && (includeContext || !record.contextGhost)
  );
}

function fitVisibleRecords() {
  let visible = visibleRecords(activeDataset !== "brain");

  if (!visible.length) visible = visibleRecords(true);
  if (!visible.length) return;

  const box = new THREE.Box3();
  visible.forEach((record) => box.expandByObject(record.mesh));
  if (box.isEmpty()) return;

  const sphere = box.getBoundingSphere(new THREE.Sphere());
  const center = sphere.center;
  const radius = Math.max(sphere.radius, 0.02);

  const aspect = Math.max(canvas.clientWidth / Math.max(canvas.clientHeight, 1), 0.2);
  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
  const limitingFov = Math.min(vFov, hFov);
  const padding = activeDataset === "brain" ? 1.22 : 1.16;
  const distance = (radius / Math.sin(limitingFov / 2)) * padding;

  controls.target.copy(center);
  camera.position.set(center.x, center.y, center.z + distance);

  camera.near = Math.max(distance / 500, 0.001);
  camera.far = Math.max(distance * 20, 20);
  camera.updateProjectionMatrix();
  controls.update();

  if (activeDataset === "body") {
    const size = box.getSize(new THREE.Vector3());
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


function hideStructureLabel() {
  selectedLabelLocalPoint = null;
  if (structureLabel) {
    structureLabel.classList.remove("visible");
    structureLabel.setAttribute("aria-hidden", "true");
  }
}

function labelMetaForRecord(record) {
  if (!record) return "";
  if (isNeuroDataset()) return prettyBrainCategory(record.category);
  if (activeDataset === "generic") return currentGenericSpec?.category || record.category || "Anatomía";

  if (record.meta?.label_es) return String(record.meta.label_es);
  if (record.meta?.system) return pretty(record.meta.system);
  if (record.meta?.organ) return pretty(record.meta.organ);
  if (record.layer === "skeleton") return "Esqueleto";
  if (record.layer === "muscles") return "Músculo";
  if (record.category) return pretty(record.category);

  return "Estructura anatómica";
}

function setStructureLabelAnchor(mesh, worldPoint = null) {
  if (!mesh || !structureLabel) return;

  let point = worldPoint?.clone?.() || null;

  if (!point) {
    const box = new THREE.Box3().setFromObject(mesh);
    point = box.getCenter(new THREE.Vector3());
  }

  selectedLabelLocalPoint = mesh.worldToLocal(point.clone());

  if (structureLabelName) structureLabelName.textContent = selectedRecord?.name || "Estructura anatómica";
  if (structureLabelMeta) structureLabelMeta.textContent = labelMetaForRecord(selectedRecord);

  structureLabel.classList.add("visible");
  structureLabel.setAttribute("aria-hidden", "false");
  updateStructureLabelPosition();
}

function updateStructureLabelPosition() {
  if (!structureLabel || !selectedMesh || !selectedLabelLocalPoint || !structureLabel.classList.contains("visible")) return;

  const world = selectedMesh.localToWorld(selectedLabelLocalPoint.clone());
  const projected = world.clone().project(camera);

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (!width || !height) return;

  const x = (projected.x * 0.5 + 0.5) * width;
  const y = (-projected.y * 0.5 + 0.5) * height;
  const onScreen =
    projected.z > -1 && projected.z < 1 &&
    x >= 0 && x <= width &&
    y >= 0 && y <= height;

  structureLabel.classList.toggle("offscreen", !onScreen);
  if (!onScreen) return;

  structureLabel.style.left = x + "px";
  structureLabel.style.top = y + "px";
}

function recordForObject(object) {
  if (!object) return null;

  let node = object;
  while (node) {
    const direct = records.find((item) => item.mesh === node);
    if (direct) return direct;
    node = node.parent;
  }

  return records.find((item) => {
    let current = object.parent;
    while (current) {
      if (current === item.mesh) return true;
      current = current.parent;
    }
    return false;
  }) || null;
}

function applyBodyRecordVisual(record, selected = false) {
  if (!record?.mesh) return;

  const materials = Array.isArray(record.mesh.material)
    ? record.mesh.material
    : [record.mesh.material];

  materials.forEach((material, index) => {
    if (!material) return;
    const base = record.baseMaterialStates?.[index];

    if (base?.color && material.color) {
      material.color.copy(base.color);
      if (selected) material.color.offsetHSL(0.01, 0.05, 0.10);
    }

    if (material.emissive) {
      if (base?.emissive) material.emissive.copy(base.emissive);
      else material.emissive.set(0x000000);

      if (selected) {
        material.emissive.lerp(new THREE.Color("#39d7ff"), 0.34);
        material.emissiveIntensity = 0.75;
      } else {
        material.emissiveIntensity = base?.emissiveIntensity ?? 1;
      }
    }

    material.needsUpdate = true;
  });
}

function selectMesh(mesh, worldPoint = null) {
  if (!mesh) return;

  const record = recordForObject(mesh);
  if (!record) return;

  if (record.pickable === false) return;

  clearSelectionVisual();

  selectedMesh = record.mesh;
  selectedRecord = record;

  if (activeDataset === "brain") {
    record.isSelected = true;
    applyBrainRecordVisual(record);
  } else if (activeDataset === "brainBeauty") {
    record.isSelected = true;
    applyBeautyRecordVisual(record);
  } else if (activeDataset === "generic") {
    record.isSelected = true;
    applyGenericRecordVisual(record);
  } else {
    record.isSelected = true;
    applyBodyRecordVisual(record, true);
  }

  emptySelection.hidden = true;
  selectionCard.hidden = false;

  document.getElementById("structureName").textContent = record.name;

  const originalName = document.getElementById("structureOriginalName");
  const labelTissue = document.getElementById("detailLabelTissue");
  const labelRef = document.getElementById("detailLabelRef");

  if (isNeuroDataset()) {
    if (originalName) {
      originalName.textContent = activeDataset === "brainBeauty"
        ? "Modelo visual general del cerebro"
        : "Brain Project · nomenclatura anatómica original";
    }
    if (labelTissue) labelTissue.textContent = "Categoría";
    if (labelRef) labelRef.textContent = "Región";

    document.getElementById("structureLayer").textContent = "Neuroanatomía";
    document.getElementById("structureSide").textContent = pretty(record.side);
    document.getElementById("structureTissue").textContent = prettyBrainCategory(record.category);
    document.getElementById("structureFma").textContent = pretty(record.region);
  } else if (activeDataset === "generic") {
    if (originalName) originalName.textContent = currentGenericSpec?.source || "Modelo anatómico abierto";
    if (labelTissue) labelTissue.textContent = "Sistema";
    if (labelRef) labelRef.textContent = "Fuente";

    document.getElementById("structureLayer").textContent = currentGenericSpec?.category || "Anatomía 3D";
    document.getElementById("structureSide").textContent = pretty(record.side);
    document.getElementById("structureTissue").textContent = currentGenericSpec?.systemLabel || "Anatomía";
    document.getElementById("structureFma").textContent = currentGenericSpec?.source || "—";
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

  setStructureLabelAnchor(record.mesh, worldPoint);
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
        updateStructureLabelPosition();

        searchInput.value = record.name;
        searchResults.hidden = true;
      });

      searchResults.appendChild(item);
    });
  }

  searchResults.hidden = false;
}


const GENERIC_NAME_ALIASES = new Map([
  ["right-atrium", "Aurícula derecha"],
  ["left-atrium", "Aurícula izquierda"],
  ["ventricular-wall", "Pared ventricular"],
  ["right-ventricle", "Ventrículo derecho"],
  ["left-ventricle", "Ventrículo izquierdo"],
  ["ascending-aorta", "Aorta ascendente"],
  ["aortic-arch", "Arco aórtico"],
  ["pulmonary-trunk", "Tronco pulmonar"],
  ["superior-vena-cava", "Vena cava superior"],
  ["left-coronary", "Arteria coronaria izquierda"],
  ["right-coronary", "Arteria coronaria derecha"]
]);

function cleanGenericName(raw, fallback = "Estructura anatómica") {
  const value = String(raw || "").trim();
  if (!value) return fallback;

  const normalized = value.toLowerCase();
  if (GENERIC_NAME_ALIASES.has(normalized)) return GENERIC_NAME_ALIASES.get(normalized);

  const cleaned = value
    .replace(/^https?:\/\/[^/]+\//i, "")
    .replace(/^(mesh|node|object|geometry)[-_ ]*\d*$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned || /^[0-9.]+$/.test(cleaned)) return fallback;

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function genericSideFromName(name) {
  const value = String(name || "").toLowerCase();
  if (/\b(left|izquierd[oa])\b/.test(value) || /(^|[_.-])l($|[_.-])/.test(value)) return "left";
  if (/\b(right|derech[oa])\b/.test(value) || /(^|[_.-])r($|[_.-])/.test(value)) return "right";
  return "median";
}

function genericMaterials(mesh) {
  return Array.isArray(mesh.material) ? mesh.material : [mesh.material];
}

function buildGenericRecords(root, spec) {
  const result = [];
  let counter = 0;

  root.traverse((object) => {
    if (!object.isMesh) return;

    const inherited = getMetadata(object, root);
    const fallbackName = inherited.badbearPartLabel || spec.label || "Estructura anatómica";
    const rawName = object.name || inherited.name || fallbackName;
    const name = cleanGenericName(rawName, fallbackName);

    if (Array.isArray(object.material)) {
      object.material = object.material.map((material) => material?.clone?.() || material);
    } else if (object.material) {
      object.material = object.material.clone();
    }

    const materials = genericMaterials(object);
    const baseMaterialStates = materials.map((material) => ({
      color: material?.color?.clone?.() || null,
      emissive: material?.emissive?.clone?.() || null,
      emissiveIntensity: material?.emissiveIntensity ?? 1,
      opacity: material?.opacity ?? 1,
      transparent: material?.transparent ?? false,
      depthWrite: material?.depthWrite ?? true
    }));

    materials.forEach((material) => {
      if (!material) return;
      if ("roughness" in material) material.roughness = Math.max(0.38, Math.min(0.72, material.roughness ?? 0.55));
      if ("metalness" in material) material.metalness = Math.min(0.08, material.metalness ?? 0);
      material.needsUpdate = true;
    });

    result.push({
      mesh: object,
      meta: inherited,
      name,
      rawName,
      category: spec.category || spec.systemLabel || "Anatomía",
      side: genericSideFromName(name + " " + rawName),
      region: spec.systemLabel || spec.category || "",
      pickable: true,
      isSelected: false,
      baseMaterialStates,
      searchText: (name + " " + rawName + " " + fallbackName).toLowerCase(),
      order: counter++
    });
  });

  return result.sort((a, b) => a.name.localeCompare(b.name));
}

function applyGenericRecordVisual(record) {
  if (!record?.mesh) return;

  const opacity = record.isSelected ? 1 : brainOpacityFactor();
  const materials = genericMaterials(record.mesh);

  materials.forEach((material, index) => {
    if (!material) return;
    const base = record.baseMaterialStates?.[index];

    if (base?.color && material.color) {
      material.color.copy(base.color);
      if (record.isSelected) material.color.offsetHSL(0.01, 0.04, 0.10);
    }

    if (material.emissive) {
      if (base?.emissive) material.emissive.copy(base.emissive);
      else material.emissive.set(0x000000);

      if (record.isSelected) {
        material.emissive.lerp(new THREE.Color("#42d9ff"), 0.32);
        material.emissiveIntensity = 0.75;
      } else {
        material.emissiveIntensity = base?.emissiveIntensity ?? 1;
      }
    }

    material.transparent = opacity < 0.999 || base?.transparent === true;
    material.opacity = Math.min(base?.opacity ?? 1, opacity);
    material.depthWrite = record.isSelected || (material.opacity >= 0.62 && (base?.depthWrite ?? true));
    material.needsUpdate = true;
  });
}

function applyGenericVisuals() {
  if (!datasets.generic.loaded) return;
  datasets.generic.records.forEach((record) => applyGenericRecordVisual(record));
}

function applyGenericFilter(terms = []) {
  currentGenericFilterTerms = Array.isArray(terms) ? terms : [];
  const normalizedTerms = currentGenericFilterTerms.map((term) => String(term).toLowerCase());

  datasets.generic.records.forEach((record) => {
    const matches =
      !normalizedTerms.length ||
      normalizedTerms.some((term) => record.searchText.includes(term));

    record.mesh.visible = matches;
    record.pickable = matches;
    if (matches) applyGenericRecordVisual(record);
  });

  const anyVisible = datasets.generic.records.some((record) => record.mesh.visible);
  if (!anyVisible) {
    datasets.generic.records.forEach((record) => {
      record.mesh.visible = true;
      record.pickable = true;
      applyGenericRecordVisual(record);
    });
  }

  isolatedMesh = null;
  resetSelectionPanel();
}

function disposeGenericDataset() {
  if (!datasets.generic.root) return;

  scene.remove(datasets.generic.root);
  datasets.generic.root.traverse((object) => {
    if (!object.isMesh) return;
    object.geometry?.dispose?.();
    genericMaterials(object).forEach((material) => material?.dispose?.());
  });

  datasets.generic = { root: null, records: [], loaded: false, key: null };
}

function loadGltfUrl(url, loader) {
  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });
}

async function loadGenericModel(modelKey) {
  const spec = MODEL_REGISTRY.organModels?.[modelKey];
  if (!spec) throw new Error("Modelo 3D no registrado: " + modelKey);

  if (datasets.generic.loaded && datasets.generic.key === modelKey) {
    currentGenericSpec = spec;
    return datasets.generic.root;
  }

  showLoading("Cargando " + spec.label + " 3D...");

  disposeGenericDataset();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(DRACO_DECODER_PATH);

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.setMeshoptDecoder(MeshoptDecoder);

  try {
    const scenes = await Promise.all(
      spec.urls.map((url) => loadGltfUrl(url, loader))
    );

    const root = new THREE.Group();
    root.name = "BADBEAR_" + spec.id;

    scenes.forEach((gltf, index) => {
      const wrapper = new THREE.Group();
      wrapper.name = spec.partLabels?.[index] || spec.label;
      wrapper.userData.badbearPartLabel = spec.partLabels?.[index] || spec.label;
      wrapper.add(gltf.scene);
      root.add(wrapper);
    });

    root.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(root);
    const center = box.getCenter(new THREE.Vector3());
    const radius = box.getBoundingSphere(new THREE.Sphere()).radius || 1;

    root.position.sub(center);
    root.scale.setScalar(1.62 / radius);
    root.updateMatrixWorld(true);

    const recordsForModel = buildGenericRecords(root, spec);

    datasets.generic = {
      root,
      records: recordsForModel,
      loaded: true,
      key: modelKey
    };

    currentGenericSpec = spec;
    scene.add(root);
    root.visible = false;

    hideLoading(recordsForModel.length + " estructuras listas");
    return root;
  } finally {
    dracoLoader.dispose();
  }
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

    const bodyMaterials = Array.isArray(object.material) ? object.material : [object.material];
    const baseMaterialStates = bodyMaterials.map((material) => ({
      color: material?.color?.clone?.() || null,
      emissive: material?.emissive?.clone?.() || null,
      emissiveIntensity: material?.emissiveIntensity ?? 1
    }));

    result.push({
      mesh: object,
      meta,
      layer,
      name,
      category: layer,
      side: String(meta.side || "").trim(),
      region: String(meta.region || meta.fma || "").trim(),
      pickable: true,
      isSelected: false,
      baseMaterialStates
    });
  });

  return result.sort((a, b) => a.name.localeCompare(b.name));
}

function brainMaterial(category) {
  const baseHex = BRAIN_PALETTE[category] || "#8C9BAD";
  const base = new THREE.Color(baseHex);
  const vessel = ["arteries", "veins_sinuses", "cranial_nerves", "tracts"].includes(category);

  const material = new THREE.MeshStandardMaterial({
    color: base,
    roughness: vessel ? 0.48 : 0.72,
    metalness: 0.0,
    transparent: false,
    opacity: 1,
    emissive: base.clone().multiplyScalar(vessel ? 0.10 : 0.025),
    emissiveIntensity: 1,
    side: category === "meninges_dura" ? THREE.DoubleSide : THREE.FrontSide,
    depthTest: true,
    depthWrite: true,
    toneMapped: true,
    flatShading: false
  });

  material.name = "BADBEAR_BRAIN_" + (category || "other");
  return material;
}

function forceBrainMaterial(record, opacity = 1, selected = false) {
  if (!record?.mesh) return;

  const category = record.category || "other";
  const base = new THREE.Color(BRAIN_PALETTE[category] || "#8C9BAD");

  const materials = Array.isArray(record.mesh.material)
    ? record.mesh.material
    : [record.mesh.material];

  materials.forEach((material) => {
    if (!material) return;

    if (material.color) {
      material.color.copy(base);
      if (selected) material.color.offsetHSL(0, 0.025, 0.08);
    }

    if (material.emissive) {
      material.emissive.copy(base);
      material.emissive.multiplyScalar(selected ? 0.34 : 0.025);
      material.emissiveIntensity = 1;
    }

    if ("roughness" in material) material.roughness = selected ? 0.56 : 0.72;
    if ("metalness" in material) material.metalness = 0;

    material.vertexColors = false;
    material.wireframe = false;
    material.transparent = opacity < 0.999;
    material.opacity = opacity;
    material.depthTest = true;
    material.depthWrite = selected || opacity >= 0.58;
    material.blending = THREE.NormalBlending;
    material.toneMapped = true;
    material.fog = true;
    material.polygonOffset = false;
    material.needsUpdate = true;
  });
}

function brainOpacityFactor() {
  return brainOpacityInput ? Number(brainOpacityInput.value) / 100 : 1;
}

function applyBrainRecordVisual(record) {
  if (!record?.mesh || !record.mesh.visible) return;

  const baseViewOpacity = record.viewOpacity ?? 1;
  const opacity = record.isSelected
    ? 1
    : Math.max(0.04, Math.min(1, baseViewOpacity * brainOpacityFactor()));

  forceBrainMaterial(record, opacity, record.isSelected === true);
}

function applyBrainVisuals() {
  if (datasets.brain.loaded) {
    datasets.brain.records.forEach((record) => applyBrainRecordVisual(record));
  }
  if (datasets.brainBeauty.loaded) {
    datasets.brainBeauty.records.forEach((record) => applyBeautyRecordVisual(record));
  }
  if (datasets.generic.loaded) {
    applyGenericVisuals();
  }
}

function restoreBrainPalette() {
  if (!datasets.brain.loaded) return;

  datasets.brain.records.forEach((record) => {
    record.viewOpacity = record.contextGhost ? (record.viewOpacity ?? 0.08) : 1;
    applyBrainRecordVisual(record);
  });
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

    const category = String(meta.bx_cat || meta.category || "").trim();
    const side = String(meta.bx_side || meta.side || "").trim();
    const region = String(meta.bx_region || meta.region || "").trim();
    const baseOpacity = 1;

    if (object.geometry) {
      if (!object.geometry.attributes.normal) object.geometry.computeVertexNormals();
      object.geometry.computeBoundingSphere();
    }

    if (Array.isArray(object.material)) {
      object.material.forEach((material) => material?.dispose?.());
    } else {
      object.material?.dispose?.();
    }

    object.material = brainMaterial(category);
    object.castShadow = false;
    object.receiveShadow = false;

    result.push({
      mesh: object,
      meta,
      name,
      category,
      side,
      region,
      baseOpacity,
      viewOpacity: 1,
      core: meta.bx_core === 1 || meta.bx_core === true,
      contextGhost: false,
      pickable: true,
      isSelected: false
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


function buildBeautyBrainRecords(root) {
  const result = [];

  root.traverse((object) => {
    if (!object.isMesh) return;

    const materials = Array.isArray(object.material)
      ? object.material.map((material) => material.clone())
      : [object.material ? object.material.clone() : new THREE.MeshStandardMaterial()];

    materials.forEach((material) => {
      if ("roughness" in material) material.roughness = 0.46;
      if ("metalness" in material) material.metalness = 0;
      if ("clearcoat" in material) material.clearcoat = 0.18;
      if ("clearcoatRoughness" in material) material.clearcoatRoughness = 0.55;
      if (!material.map && material.color) material.color.set("#b8897f");
      material.transparent = false;
      material.opacity = 1;
      material.depthWrite = true;
      material.needsUpdate = true;
    });

    object.material = Array.isArray(object.material) ? materials : materials[0];

    const baseStates = materials.map((material) => ({
      color: material.color?.clone?.() || null,
      emissive: material.emissive?.clone?.() || null
    }));

    result.push({
      mesh: object,
      meta: {},
      name: "Cerebro",
      category: "brain",
      side: "median",
      region: "Encéfalo",
      pickable: true,
      isSelected: false,
      baseStates
    });
  });

  return result;
}

function applyBeautyRecordVisual(record) {
  if (!record?.mesh) return;

  const opacity = brainOpacityFactor();
  const materials = Array.isArray(record.mesh.material)
    ? record.mesh.material
    : [record.mesh.material];

  materials.forEach((material, index) => {
    if (!material) return;
    const base = record.baseStates?.[index];

    if (base?.color && material.color) {
      material.color.copy(base.color);
      if (record.isSelected) material.color.offsetHSL(0, 0.02, 0.08);
    }

    if (material.emissive) {
      if (base?.emissive) material.emissive.copy(base.emissive);
      if (record.isSelected) {
        material.emissive.lerp(new THREE.Color("#5bc8ff"), 0.20);
        material.emissiveIntensity = 0.55;
      } else {
        material.emissiveIntensity = 1;
      }
    }

    material.transparent = opacity < 0.999;
    material.opacity = opacity;
    material.depthWrite = opacity >= 0.6;
    material.needsUpdate = true;
  });
}

function loadBeautyBrainModel() {
  return new Promise((resolve, reject) => {
    if (datasets.brainBeauty.loaded) {
      resolve(datasets.brainBeauty.root);
      return;
    }

    showLoading("Cargando cerebro anatómico de alta calidad...");

    const loader = new GLTFLoader();

    loader.load(
      BRAIN_BEAUTY_MODEL_URL,
      (gltf) => {
        gltf.scene.updateMatrixWorld(true);

        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const radius = box.getBoundingSphere(new THREE.Sphere()).radius || 1;

        gltf.scene.position.sub(center);
        gltf.scene.scale.setScalar(1.65 / radius);
        gltf.scene.rotation.y = -0.22;
        gltf.scene.updateMatrixWorld(true);

        datasets.brainBeauty.root = gltf.scene;
        datasets.brainBeauty.records = buildBeautyBrainRecords(gltf.scene);
        datasets.brainBeauty.loaded = true;

        scene.add(gltf.scene);
        gltf.scene.visible = false;

        hideLoading("Cerebro visual listo");
        resolve(gltf.scene);
      },
      (event) => {
        if (event.total) {
          const percent = Math.round((event.loaded / event.total) * 100);
          loadingText.textContent = "Cargando cerebro visual · " + percent + "%";
        }
      },
      (error) => {
        loadingText.textContent = "No se pudo cargar el cerebro visual.";
        reject(error);
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
        gltf.scene.updateMatrixWorld(true);

        const coreBox = new THREE.Box3();
        let hasCore = false;

        gltf.scene.traverse((object) => {
          if (!object.isMesh) return;
          const meta = getMetadata(object, gltf.scene);
          if (meta.bx_core === 1 || meta.bx_core === true) {
            coreBox.expandByObject(object);
            hasCore = true;
          }
        });

        if (!hasCore) coreBox.setFromObject(gltf.scene);

        const coreCenter = coreBox.getCenter(new THREE.Vector3());
        const coreRadius = coreBox.getBoundingSphere(new THREE.Sphere()).radius || 1;

        gltf.scene.position.sub(coreCenter);
        gltf.scene.scale.setScalar(1.7 / coreRadius);
        gltf.scene.rotation.y = Math.PI;
        gltf.scene.updateMatrixWorld(true);

        datasets.brain.root = gltf.scene;
        datasets.brain.records = buildBrainRecords(gltf.scene);
        datasets.brain.loaded = true;

        restoreBrainPalette();

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
  const requestedModelKey = organ?.modelKey || (!organ ? system.defaultModelKey : null);

  if (requestedModelKey) {
    try {
      await loadGenericModel(requestedModelKey);
      if (activeSystemId !== system.id) return;

      setActiveDataset("generic");
      applyGenericFilter(organ?.filterTerms || []);
      fitVisibleRecords();
      showSystemNotice("");
    } catch (error) {
      console.error(error);
      showSystemNotice("No se pudo cargar este modelo 3D desde su fuente anatómica abierta.");
    }
    return;
  }

  if (system.id === "nervioso") {
    const organId = organ?.id || "cerebro";

    if (organId === "cerebro") {
      try {
        await loadBeautyBrainModel();
        if (activeSystemId !== "nervioso") return;

        setActiveDataset("brainBeauty");
        datasets.brainBeauty.records.forEach((record) => {
          record.mesh.visible = true;
          applyBeautyRecordVisual(record);
        });
        fitVisibleRecords();
        showSystemNotice(
          "Vista general de alta calidad. Para lóbulos y estructuras profundas usa los módulos neuroanatómicos del panel."
        );
      } catch {
        await loadBrainModel();
        if (activeSystemId !== "nervioso") return;

        setActiveDataset("brain");
        restoreBrainPalette();
        applyBrainFilter("cerebro");
        fitVisibleRecords();
        showSystemNotice("Se cargó el atlas segmentado como respaldo del cerebro general.");
      }

      return;
    }

    try {
      await loadBrainModel();

      if (activeSystemId !== "nervioso") return;

      setActiveDataset("brain");
      restoreBrainPalette();
      applyBrainFilter(organId);
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
        "No se pudo cargar el atlas neuroanatómico desde su fuente abierta. Revisa la conexión e inténtalo nuevamente."
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
    showSystemNotice("Selecciona una estructura disponible del sistema para abrir su modelo 3D.");
  }
}

function selectCatalogOrgan(system, organ, button) {
  document.querySelectorAll(".organ-chip").forEach((chip) => chip.classList.remove("active"));
  if (button) button.classList.add("active");

  resetSelectionPanel();
  activeOrganId = organ?.id || "";
  updateAnatomyRoute(system.id, activeOrganId);

  if (system.id === "osteomuscular" && organ?.bodyTerms?.length) {
    applyBodyRegionFilter(organ.bodyTerms, organ.layer || "both");
    showSystemNotice("");
    return;
  }

  if (system.id === "osteomuscular" && organ?.layer) {
    setActiveDataset("body");
    setLayer(organ.layer);
    fitVisibleRecords();
    showSystemNotice("");
    return;
  }

  if (system.id === "cuerpo-completo" && organ?.id === "vista-global") {
    setActiveDataset("body");
    setLayer("both");
    fitVisibleRecords();
    showSystemNotice("");
    return;
  }

  applySystemModel(system, organ);
}

function renderCatalog(systemId, organId = "", options = {}) {
  if (!anatomyCatalog.length || !systemGrid || !organGrid) return;

  const system = anatomyCatalog.find((item) => item.id === systemId) || anatomyCatalog[0];

  resetSelectionPanel();
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

if (brainOpacityInput) {
  brainOpacityInput.addEventListener("input", () => {
    if (brainOpacityValue) brainOpacityValue.textContent = brainOpacityInput.value + "%";
    applyBrainVisuals();
  });
}

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
  } else if (activeDataset === "brainBeauty") {
    datasets.brainBeauty.records.forEach((record) => {
      record.mesh.visible = true;
      applyBeautyRecordVisual(record);
    });
  } else if (activeDataset === "generic") {
    applyGenericFilter(currentGenericFilterTerms);
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
    .filter((record) => {
      if (!record.mesh.visible) return false;
      if (isNeuroDataset() && record.pickable === false) return false;
      return true;
    })
    .map((record) => record.mesh);

  const hits = raycaster.intersectObjects(visibleMeshes, true);

  const hit = hits.find((candidate) => {
    const record = recordForObject(candidate.object);
    return record && record.pickable !== false;
  });

  if (hit) selectMesh(hit.object, hit.point);
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
  updateStructureLabelPosition();

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
