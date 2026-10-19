import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const MODEL_URLS = [
  "https://raw.githubusercontent.com/Charleeh/ecorche/main/model/ecorche.meshopt.glb",
  "https://raw.githubusercontent.com/Charleeh/ecorche/main/model/ecorche.glb"
];

const canvas = document.getElementById("anatomyCanvas");
const loadingOverlay = document.getElementById("loadingOverlay");
const loadingText = document.getElementById("loadingText");
const searchInput = document.getElementById("structureSearch");
const searchResults = document.getElementById("searchResults");
const opacityInput = document.getElementById("muscleOpacity");
const opacityValue = document.getElementById("opacityValue");
const emptySelection = document.getElementById("emptySelection");
const selectionCard = document.getElementById("selectionCard");
const systemSelect = document.getElementById("systemSelect");
const systemDescription = document.getElementById("systemDescription");
const systemStatus = document.getElementById("systemStatus");
const systemNotice = document.getElementById("systemNotice");
const organGrid = document.getElementById("organGrid");
const anatomyCatalog = Array.isArray(window.BADBEAR_ANATOMY_CATALOG) ? window.BADBEAR_ANATOMY_CATALOG : [];

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
controls.minDistance = 0.45;
controls.maxDistance = 8;
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
  new THREE.MeshStandardMaterial({ color: 0x0a1a29, roughness: 1, metalness: 0, transparent: true, opacity: 0.7 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.003;
scene.add(floor);

let model = null;
let records = [];
let currentLayer = "both";
let isolatedMesh = null;
let selectedMesh = null;
let selectionHelper = null;
let bounds = null;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function getMetadata(object) {
  let node = object;
  const data = {};
  while (node && node !== model?.parent) {
    if (node.userData) {
      for (const [key, value] of Object.entries(node.userData)) {
        if (data[key] === undefined && value !== undefined && value !== "") data[key] = value;
      }
    }
    node = node.parent;
  }
  return data;
}

function normaliseLayer(value) {
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
    midline: "Línea media",
    muscle: "Músculo",
    bone: "Hueso",
    cartilage: "Cartílago",
    tooth: "Diente",
    eye: "Ojo"
  };
  return dictionary[text.toLowerCase()] || (text.charAt(0).toUpperCase() + text.slice(1));
}

function setMaterialOpacity(mesh, opacity) {
  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  materials.forEach((material) => {
    material.transparent = opacity < 0.999;
    material.opacity = opacity;
    material.depthWrite = opacity > 0.55;
    material.needsUpdate = true;
  });
}

function updateVisibility() {
  const muscleOpacity = Number(opacityInput.value) / 100;
  for (const record of records) {
    const layerMatch =
      currentLayer === "both" ||
      (currentLayer === "skeleton" && record.layer === "skeleton") ||
      (currentLayer === "muscles" && record.layer === "muscles");

    record.mesh.visible = isolatedMesh ? record.mesh === isolatedMesh : layerMatch;
    setMaterialOpacity(record.mesh, record.layer === "muscles" ? muscleOpacity : 1);
  }
}

function setLayer(layer) {
  currentLayer = layer;
  isolatedMesh = null;
  
function updateAnatomyRoute(systemId, organId) {
  const url = new URL(window.location.href);
  if (systemId) url.searchParams.set("sistema", systemId);
  else url.searchParams.delete("sistema");
  if (organId) url.searchParams.set("organo", organId);
  else url.searchParams.delete("organo");
  history.replaceState(null, "", url);
}

function selectCatalogOrgan(system, organ, button) {
  document.querySelectorAll(".organ-chip").forEach((chip) => chip.classList.remove("active"));
  if (button) button.classList.add("active");
  updateAnatomyRoute(system.id, organ?.id || "");

  if (organ?.layer) {
    setLayer(organ.layer);
    systemNotice.hidden = true;
    if (model) fitModel();
    return;
  }

  if (system.layer && system.estado === "disponible") {
    setLayer(system.layer);
  }

  if (organ?.estado === "preparado" || system.estado === "preparado") {
    systemNotice.textContent =
      "Este espacio ya está organizado dentro del atlas. El siguiente paso es incorporar su modelo 3D específico y su ficha anatómica BADBEAR.MED.";
    systemNotice.hidden = false;
  } else {
    systemNotice.hidden = true;
  }
}

function renderCatalog(systemId, organId = "") {
  if (!anatomyCatalog.length || !systemSelect || !organGrid) return;
  const system = anatomyCatalog.find((item) => item.id === systemId) || anatomyCatalog[0];

  systemSelect.value = system.id;
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
    button.addEventListener("click", () => selectCatalogOrgan(system, organ, button));
    organGrid.appendChild(button);
  });

  const selectedOrgan = (system.organos || []).find((organ) => organ.id === organId);
  if (selectedOrgan) {
    const activeButton = [...organGrid.querySelectorAll(".organ-chip")].find((button) => button.classList.contains("active"));
    selectCatalogOrgan(system, selectedOrgan, activeButton);
  } else {
    updateAnatomyRoute(system.id, "");
    if (system.layer && system.estado === "disponible") setLayer(system.layer);
    if (system.estado === "preparado") {
      systemNotice.textContent =
        "La arquitectura de este sistema está lista. Falta incorporar el modelo 3D específico para activar sus órganos y subestructuras.";
      systemNotice.hidden = false;
    } else {
      systemNotice.hidden = true;
    }
  }
}

function initialiseCatalog() {
  if (!anatomyCatalog.length || !systemSelect) return;

  anatomyCatalog.forEach((system) => {
    const option = document.createElement("option");
    option.value = system.id;
    option.textContent = system.icono + "  " + system.nombre;
    systemSelect.appendChild(option);
  });

  const params = new URLSearchParams(window.location.search);
  const requestedSystem = params.get("sistema");
  const requestedOrgan = params.get("organo");
  const firstSystem = anatomyCatalog.find((item) => item.id === requestedSystem)?.id || anatomyCatalog[0].id;

  systemSelect.addEventListener("change", () => renderCatalog(systemSelect.value));
  renderCatalog(firstSystem, requestedOrgan || "");
}

initialiseCatalog();

document.querySelectorAll("[data-layer]").forEach((button) => {
    button.classList.toggle("active", button.dataset.layer === layer);
  });
  updateVisibility();
}

function fitModel() {
  if (!model) return;
  bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  controls.target.copy(center);
  camera.position.set(center.x, center.y + size.y * 0.02, center.z + maxDim * 1.72);
  camera.near = Math.max(maxDim / 1000, 0.001);
  camera.far = maxDim * 20;
  camera.updateProjectionMatrix();
  controls.update();
  floor.scale.setScalar(Math.max(size.x, size.z) * 0.72);
  floor.position.y = bounds.min.y - 0.006;
}

function cameraPreset(view) {
  if (!bounds) return;
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const distance = Math.max(size.x, size.y, size.z) * 1.55;
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

function clearSelectionHelper() {
  if (selectionHelper) {
    scene.remove(selectionHelper);
    selectionHelper.geometry?.dispose();
    selectionHelper.material?.dispose();
    selectionHelper = null;
  }
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
  if (originalName) originalName.textContent = "Nomenclatura original del modelo";
  document.getElementById("structureLayer").textContent = record.layer === "skeleton" ? "Esqueleto" : record.layer === "muscles" ? "Músculo" : "Estructura";
  document.getElementById("structureSide").textContent = pretty(record.meta.side);
  document.getElementById("structureTissue").textContent = pretty(record.meta.tissue || (record.layer === "muscles" ? "muscle" : ""));
  document.getElementById("structureFma").textContent = record.meta.fma || "—";
}

function focusMesh(mesh) {
  const box = new THREE.Box3().setFromObject(mesh);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const distance = Math.max(size.x, size.y, size.z, 0.08) * 3.3;
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
    .slice(0, 28);

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
        if (record.layer === "skeleton") setLayer("skeleton");
        else if (record.layer === "muscles") setLayer("muscles");
        updateVisibility();
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

function prepareModel(root) {
  model = root;
  scene.add(model);
  records = [];

  model.traverse((object) => {
    if (!object.isMesh) return;

    if (Array.isArray(object.material)) {
      object.material = object.material.map((material) => material.clone());
    } else if (object.material) {
      object.material = object.material.clone();
    }

    const meta = getMetadata(object);
    const layer = normaliseLayer(meta.layer);
    const name = String(meta.name || object.name || "Estructura anatómica").replace(/_/g, " ").trim();

    object.userData.badbearPickable = true;
    records.push({ mesh: object, meta, layer, name });
  });

  records.sort((a, b) => a.name.localeCompare(b.name));
  updateVisibility();
  fitModel();

  loadingText.textContent = records.length + " estructuras listas";
  window.setTimeout(() => loadingOverlay.classList.add("done"), 350);
}

function loadModel(index = 0) {
  if (index >= MODEL_URLS.length) {
    loadingText.textContent = "No se pudo cargar el modelo. Revisa la conexión.";
    return;
  }

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);

  loader.load(
    MODEL_URLS[index],
    (gltf) => prepareModel(gltf.scene),
    (event) => {
      if (event.total) {
        const percent = Math.round((event.loaded / event.total) * 100);
        loadingText.textContent = "Descargando modelo · " + percent + "%";
      } else {
        loadingText.textContent = "Descargando modelo anatómico...";
      }
    },
    () => loadModel(index + 1)
  );
}

document.querySelectorAll("[data-layer]").forEach((button) => {
  button.addEventListener("click", () => setLayer(button.dataset.layer));
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => cameraPreset(button.dataset.view));
});

document.getElementById("resetView").addEventListener("click", () => fitModel());

opacityInput.addEventListener("input", () => {
  opacityValue.textContent = opacityInput.value + "%";
  updateVisibility();
});

searchInput.addEventListener("input", renderSearch);
searchInput.addEventListener("focus", renderSearch);
document.addEventListener("click", (event) => {
  if (!event.target.closest(".search-wrap")) searchResults.hidden = true;
});

document.getElementById("isolateButton").addEventListener("click", () => {
  if (!selectedMesh) return;
  isolatedMesh = selectedMesh;
  updateVisibility();
  focusMesh(selectedMesh);
});

document.getElementById("showAllButton").addEventListener("click", () => {
  isolatedMesh = null;
  updateVisibility();
  fitModel();
});

renderer.domElement.addEventListener("pointerup", (event) => {
  if (!records.length) return;
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const visibleMeshes = records.filter((record) => record.mesh.visible).map((record) => record.mesh);
  const hits = raycaster.intersectObjects(visibleMeshes, false);
  if (hits.length) selectMesh(hits[0].object);
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

resize();
loadModel();
animate();
