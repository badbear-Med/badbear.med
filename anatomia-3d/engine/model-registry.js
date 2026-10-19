const HRA = "https://raw.githubusercontent.com/hubmapconsortium/ccf-releases/main/v1.2/models/";
const MEDPATH = "https://raw.githubusercontent.com/freedom12321/MedPath_3D/main/public/models/";
const BODY_SIM = "https://raw.githubusercontent.com/yamz8/human-body-simulator/main/public/models/";
const ORGANUI = "https://raw.githubusercontent.com/organui/heart-3d/main/public/models/";

export const MODEL_REGISTRY = {
  body: {
    id: "body",
    label: "Écorché",
    urls: [
      "https://raw.githubusercontent.com/Charleeh/ecorche/main/model/ecorche.meshopt.glb",
      "https://raw.githubusercontent.com/Charleeh/ecorche/main/model/ecorche.glb"
    ],
    source: "Écorché · BodyParts3D · Z-Anatomy",
    license: "CC BY-SA 4.0"
  },

  brainAtlas: {
    id: "brain-atlas",
    label: "Brain Project",
    url: "https://raw.githubusercontent.com/itayinbarr/brainproject/main/brain-atlas/models/brain.glb",
    source: "Brain Project · Z-Anatomy · BodyParts3D",
    license: "CC BY-SA 4.0"
  },

  brainBeauty: {
    id: "brain-beauty",
    label: "Model of a human brain · Science Museum Group / MediaWiki3D",
    url: "https://mediawiki3d.org/images/6/61/Model_of_a_human_brain.glb",
    source: "Science Museum Group · MediaWiki3D",
    license: "CC0"
  },

  organModels: {
    organsOverview: {
      id: "organs-overview",
      label: "Órganos internos",
      systemLabel: "Anatomía visceral",
      category: "Órganos internos",
      urls: [BODY_SIM + "anatomy-organs.glb"],
      partLabels: ["Órganos internos"],
      source: "BodyParts3D · human-body-simulator",
      license: "CC BY-SA 2.1 JP"
    },

    cardiovascularOverview: {
      id: "cardiovascular-overview",
      label: "Sistema cardiovascular",
      systemLabel: "Cardiovascular",
      category: "Cardiovascular",
      urls: [HRA + "VH_M_Heart.glb", HRA + "VH_M_Blood_Vasculature.glb"],
      partLabels: ["Corazón", "Vasculatura sanguínea"],
      composeParts: true,
      composition: [
        { position: [0, 0.12, 0.22], scale: 0.42, color: "#b84f5e" },
        { position: [0, 0, -0.16], scale: 1.08, opacity: 0.72 }
      ],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    heart: {
      id: "heart-detailed",
      label: "Corazón",
      systemLabel: "Cardiovascular",
      category: "Corazón",
      urls: [ORGANUI + "heart.glb"],
      partLabels: ["Corazón"],
      source: "BodyParts3D · OrganUI Heart",
      license: "CC BY 4.0"
    },

    vessels: {
      id: "vessels",
      label: "Vasos sanguíneos",
      systemLabel: "Cardiovascular",
      category: "Vasculatura",
      urls: [HRA + "VH_M_Blood_Vasculature.glb"],
      partLabels: ["Vasculatura sanguínea"],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    lungs: {
      id: "lungs",
      label: "Pulmones",
      systemLabel: "Respiratorio",
      category: "Pulmones",
      urls: [HRA + "VH_M_Lung.glb"],
      partLabels: ["Pulmones"],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    digestiveOverview: {
      id: "digestive-overview",
      label: "Sistema digestivo",
      systemLabel: "Digestivo",
      category: "Digestivo",
      urls: [
        HRA + "VH_M_Liver.glb",
        HRA + "VH_M_Pancreas.glb",
        HRA + "VH_M_Small_Intestine.glb",
        HRA + "SBU_M_Intestine_Large.glb"
      ],
      partLabels: ["Hígado", "Páncreas", "Intestino delgado", "Colon"],
      composeParts: true,
      composition: [
        { position: [-0.48, 0.48, 0.05], scale: 0.76, color: "#7a3f47" },
        { position: [0.08, 0.17, 0.16], scale: 0.48, color: "#d9a66f" },
        { position: [0.02, -0.46, 0.06], scale: 0.92, color: "#d89a82" },
        { position: [0.02, -0.42, -0.05], scale: 1.08, color: "#b8796d", opacity: 0.82 }
      ],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    stomach: {
      id: "stomach",
      label: "Estómago",
      systemLabel: "Digestivo",
      category: "Estómago",
      urls: [MEDPATH + "stomach.glb"],
      partLabels: ["Estómago"],
      source: "BodyParts3D · MedPath 3D conversion",
      license: "CC BY 4.0"
    },

    liver: {
      id: "liver",
      label: "Hígado",
      systemLabel: "Digestivo",
      category: "Hígado",
      urls: [HRA + "VH_M_Liver.glb"],
      partLabels: ["Hígado"],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    pancreas: {
      id: "pancreas",
      label: "Páncreas",
      systemLabel: "Digestivo / Endocrino",
      category: "Páncreas",
      urls: [HRA + "VH_M_Pancreas.glb"],
      partLabels: ["Páncreas"],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    smallIntestine: {
      id: "small-intestine",
      label: "Intestino delgado",
      systemLabel: "Digestivo",
      category: "Intestino delgado",
      urls: [HRA + "VH_M_Small_Intestine.glb"],
      partLabels: ["Intestino delgado"],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    colon: {
      id: "colon",
      label: "Colon",
      systemLabel: "Digestivo",
      category: "Colon",
      urls: [HRA + "SBU_M_Intestine_Large.glb"],
      partLabels: ["Colon"],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    urinaryOverview: {
      id: "urinary-overview",
      label: "Sistema urinario",
      systemLabel: "Urinario",
      category: "Urinario",
      urls: [
        HRA + "VH_M_Kidney_L.glb",
        HRA + "VH_M_Kidney_R.glb",
        HRA + "VH_M_Urinary_Bladder.glb"
      ],
      partLabels: ["Riñón izquierdo", "Riñón derecho", "Vejiga urinaria"],
      composeParts: true,
      composition: [
        { position: [-0.52, 0.36, 0], scale: 0.82, color: "#a65a58" },
        { position: [0.52, 0.36, 0], scale: 0.82, color: "#a65a58" },
        { position: [0, -0.80, 0.10], scale: 0.56, color: "#d7c6aa" }
      ],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    kidneys: {
      id: "kidneys",
      label: "Riñones",
      systemLabel: "Urinario",
      category: "Riñones",
      urls: [HRA + "VH_M_Kidney_L.glb", HRA + "VH_M_Kidney_R.glb"],
      partLabels: ["Riñón izquierdo", "Riñón derecho"],
      composeParts: true,
      composition: [
        { position: [-0.46, 0, 0], scale: 0.92, color: "#a65a58" },
        { position: [0.46, 0, 0], scale: 0.92, color: "#a65a58" }
      ],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    bladder: {
      id: "bladder",
      label: "Vejiga urinaria",
      systemLabel: "Urinario",
      category: "Vejiga",
      urls: [HRA + "VH_M_Urinary_Bladder.glb"],
      partLabels: ["Vejiga urinaria"],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    spinalCord: {
      id: "spinal-cord",
      label: "Médula espinal",
      systemLabel: "Sistema nervioso",
      category: "Médula espinal",
      urls: [HRA + "VH_M_Spinal_Cord.glb"],
      partLabels: ["Médula espinal"],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    endocrineOverview: {
      id: "endocrine-overview",
      label: "Endocrino disponible",
      systemLabel: "Endocrino",
      category: "Endocrino",
      urls: [HRA + "VH_M_Thymus.glb", HRA + "VH_M_Pancreas.glb"],
      partLabels: ["Timo", "Páncreas"],
      composeParts: true,
      composition: [
        { position: [0, 0.52, 0], scale: 0.68, color: "#c58e9b" },
        { position: [0, -0.48, 0.08], scale: 0.76, color: "#d9a66f" }
      ],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    thymus: {
      id: "thymus",
      label: "Timo",
      systemLabel: "Endocrino / Inmunitario",
      category: "Timo",
      urls: [HRA + "VH_M_Thymus.glb"],
      partLabels: ["Timo"],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    femaleReproductive: {
      id: "female-reproductive",
      label: "Útero y ovarios",
      systemLabel: "Reproductor femenino",
      category: "Reproductor femenino",
      urls: [
        HRA + "VH_F_Uterus.glb",
        HRA + "VH_F_Ovary_L.glb",
        HRA + "VH_F_Ovary_R.glb"
      ],
      partLabels: ["Útero", "Ovario izquierdo", "Ovario derecho"],
      composeParts: true,
      composition: [
        { position: [0, -0.04, 0], scale: 0.90, color: "#b85f73" },
        { position: [-0.72, 0.08, 0.04], scale: 0.44, color: "#d69679" },
        { position: [0.72, 0.08, 0.04], scale: 0.44, color: "#d69679" }
      ],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    },

    prostate: {
      id: "prostate",
      label: "Próstata",
      systemLabel: "Reproductor masculino",
      category: "Próstata",
      urls: [HRA + "VH_M_Prostate.glb"],
      partLabels: ["Próstata"],
      source: "HuBMAP Human Reference Atlas",
      license: "CC BY 4.0"
    }
  }
};

export const DRACO_DECODER_PATH =
  "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/libs/draco/";
