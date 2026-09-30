window.BADBEAR_CG_VIDEO_URL = function(raw) {
  if (!raw) return "";
  try {
    const url = new URL(raw, "https://badbear-med.github.io/badbear.med/cirugia-general/");
    if (!/^https?:$/.test(url.protocol)) return "";
    const host = url.hostname.toLowerCase();
    let id = "";
    if (host === "youtu.be") id = url.pathname.slice(1);
    else if (host === "youtube.com" || host === "www.youtube.com" || host === "m.youtube.com") id = url.searchParams.get("v") || "";
    else return /\.mp4$/i.test(url.pathname) ? raw : "";
    return /^[A-Za-z0-9_-]{11}$/.test(id) ? raw : "";
  } catch (_) { return ""; }
};
window.BADBEAR_CG_ACADEMIC_STRUCTURE = [
  {
    id:"sabatinas",
    title:"Actividades Académicas Sabatinas",
    subtitle:"Diapositivas, grabaciones y contenidos de estudio de las actividades sabatinas.",
    items:[
      {id:"sabatina-01",label:"ACTIVIDAD SABATINA 01",title:"Actividad Académica Sabatina 1",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=sabatina-01-integrada&v=7",resources:{pdf:"",ppt:"recursos-nuevo-programa/sabatinas/sabatina-01/diapositivas.pdf",audio:"recursos-nuevo-programa/sabatinas/sabatina-01/audio.m4a",video:"https://youtu.be/f3oT1ri7Z5M"}},
      {id:"sabatina-02",label:"ACTIVIDAD SABATINA 02",title:"Actividad Académica Sabatina 2",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=sabatina-02-abdomen-agudo&v=7",resources:{pdf:"",ppt:"recursos-nuevo-programa/sabatinas/sabatina-02/diapositivas.pdf",audio:"recursos-nuevo-programa/sabatinas/sabatina-02/audio.m4a",video:"https://youtu.be/V5nEL9i_a1c"}},
      {id:"sabatina-03",label:"ACTIVIDAD SABATINA 03",title:"Actividad Académica Sabatina 3",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=sabatina-03-integrada&v=7",resources:{pdf:"",ppt:"recursos-nuevo-programa/sabatinas/sabatina-03/diapositivas.pdf",audio:"recursos-nuevo-programa/sabatinas/sabatina-03/audio.m4a",video:"https://youtu.be/bB6W5BaRi5o"}},
      {id:"sabatina-04",label:"ACTIVIDAD SABATINA 04",title:"Actividad Académica Sabatina 4",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=sabatina-04-integrada&v=7",resources:{pdf:"",ppt:"recursos-nuevo-programa/sabatinas/sabatina-04/diapositivas.pdf",audio:"recursos-nuevo-programa/sabatinas/sabatina-04/audio.m4a",video:"https://youtu.be/fnpbtyee_ac"}}
    ]
  },
  {
    id:"seminarios",
    title:"Seminarios",
    subtitle:"Material de estudio para profundizar en los temas de cada seminario.",
    items:[
      {id:"seminario-01",label:"SEMINARIO 01",title:"Anatomía y patología quirúrgica de la pared abdominal, hernias ventrales y dorsales",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=seminario-01-pared-abdominal&v=6",resources:{pdf:"",ppt:"recursos-nuevo-programa/seminarios/seminario-01/diapositivas.pdf",audio:"recursos-nuevo-programa/seminarios/seminario-01/audio.m4a",video:"https://youtu.be/NIwN1X1vtSw"}},
      {id:"seminario-02",label:"SEMINARIO 02",title:"Patología quirúrgica benigna y maligna del estómago y duodeno",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=seminario-02-estomago-duodeno&v=5",resources:{pdf:"",ppt:"recursos-nuevo-programa/seminarios/seminario-02/diapositivas.pdf",audio:"recursos-nuevo-programa/seminarios/seminario-02/audio.m4a",video:"https://youtu.be/1RunAiTOOBM"}},
      {id:"seminario-03",label:"SEMINARIO 03",title:"Abdomen agudo quirúrgico inflamatorio y obstructivo",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=seminario-03-abdomen-agudo-inflamatorio-obstructivo&v=6",resources:{pdf:"",ppt:"recursos-nuevo-programa/seminarios/seminario-03/diapositivas.pdf",audio:"recursos-nuevo-programa/seminarios/seminario-03/audio.m4a",video:"https://youtu.be/ymHkC9ZnqGI"}},
      {id:"seminario-04",label:"SEMINARIO 04",title:"Hemorragia digestiva alta y baja",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=seminario-04-hemorragia-digestiva&v=6",resources:{pdf:"",ppt:"recursos-nuevo-programa/seminarios/seminario-04/diapositivas.pdf",audio:"recursos-nuevo-programa/seminarios/seminario-04/audio.m4a",video:"https://youtu.be/KTo6eOqV68g"}},
      {id:"seminario-05",label:"SEMINARIO 05",title:"Seminario 5",status:"missing",statusText:"Material en preparación",study:"",resources:{pdf:"",ppt:"",audio:"",video:""}},
      {id:"seminario-06",label:"SEMINARIO 06",title:"Pancreatitis aguda y complicaciones. Procedimientos quirúrgicos",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=seminario-06-pancreatitis-aguda&v=6",resources:{pdf:"",ppt:"recursos-nuevo-programa/seminarios/seminario-06/diapositivas.pdf",audio:"recursos-nuevo-programa/seminarios/seminario-06/audio.m4a",video:"https://youtu.be/RjqDCn4AxfU"}},
      {id:"seminario-07",label:"SEMINARIO 07",title:"Patología quirúrgica y cirugía robótica: actualidad y futuro con IA",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=seminario-07-cirugia-robotica&v=6",resources:{pdf:"",ppt:"recursos-nuevo-programa/seminarios/seminario-07/diapositivas.pdf",audio:"recursos-nuevo-programa/seminarios/seminario-07/audio.m4a",video:"https://youtu.be/BglSNFdoSrY"}}
    ]
  },
  {
    id:"talleres",
    title:"Talleres de Atención al Paciente",
    subtitle:"Material y grabaciones para repasar la atención quirúrgica del paciente.",
    items:[
      {id:"taller-01",label:"TALLER 01",title:"Atención del paciente politraumatizado. Traumatismo abdominal",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=taller-01-trauma-abdominal&v=7",resources:{pdf:"",ppt:"recursos-nuevo-programa/talleres/taller-01/diapositivas.pdf",audio:"recursos-nuevo-programa/talleres/taller-01/audio.m4a",video:"https://youtu.be/iS92g8BfoMM"}},
      {id:"taller-02",label:"TALLER 02",title:"Abdomen agudo quirúrgico perforativo, hemorrágico, vascular e isquémico",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=taller-02-abdomen-agudo-complejo&v=7",resources:{pdf:"",ppt:"recursos-nuevo-programa/talleres/taller-02/diapositivas.pdf",audio:"recursos-nuevo-programa/talleres/taller-02/video.mp4",video:"https://youtu.be/AoAgz1VZkhw"}}
    ]
  },
  {
    id:"teorias",
    title:"Teorías 1–11",
    subtitle:"Consulta las diapositivas, grabaciones y recursos de las clases teóricas.",
    items:[
      {id:"teoria-01",label:"TEORÍA 01",title:"Estudio pre, trans y postoperatorio inmediato + líquidos y electrolitos",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-01-pre-posoperatorio.html",resources:{pdf:"",ppt:"recursos-nuevo-programa/teorias/teoria-01/diapositivas.pdf",audio:"recursos-nuevo-programa/teorias/teoria-01/audio.m4a",video:"https://youtu.be/YFXHsfIz8Bg"}},
      {id:"teoria-02",label:"TEORÍA 02",title:"Nutrición en cirugía + heridas y cicatrización",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-02-nutricion-paciente-quirurgico.html",resources:{pdf:"",ppt:"recursos-nuevo-programa/teorias/teoria-02/diapositivas.pdf",audio:"recursos-nuevo-programa/teorias/teoria-02/audio.m4a",video:"https://youtu.be/HihPErlyA_U"}},
      {id:"teoria-03",label:"TEORÍA 03",title:"Patología quirúrgica benigna y maligna del esófago",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-03-esofago.html",resources:{pdf:"",ppt:"recursos-nuevo-programa/teorias/teoria-03/diapositivas.pdf",audio:"recursos-nuevo-programa/teorias/teoria-03/audio.m4a",video:"https://youtu.be/wEFcD9TGLaU"}},
      {id:"teoria-04",label:"TEORÍA 04",title:"Patología quirúrgica benigna y maligna del hígado",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=teoria-04-higado&v=5",resources:{pdf:"",ppt:"recursos-nuevo-programa/teorias/teoria-04/diapositivas.pdf",audio:"recursos-nuevo-programa/teorias/teoria-04/audio.m4a",video:"https://youtu.be/J7Pd8mgDhaE"}},
      {id:"teoria-05",label:"TEORÍA 05",title:"Patología quirúrgica benigna y maligna de vesícula y vías biliares",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=teoria-05-vesicula-vias-biliares&v=5",resources:{pdf:"",ppt:"recursos-nuevo-programa/teorias/teoria-05/diapositivas.pdf",audio:"recursos-nuevo-programa/teorias/teoria-05/audio.m4a",video:"https://youtu.be/KBXsVJ4oNE0"}},
      {id:"teoria-06",label:"TEORÍA 06",title:"Patología quirúrgica benigna y maligna del páncreas",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=teoria-06-pancreas&v=5",resources:{pdf:"",ppt:"recursos-nuevo-programa/teorias/teoria-06/diapositivas.pdf",audio:"recursos-nuevo-programa/teorias/teoria-06/audio.m4a",video:"https://youtu.be/wLCVV2HgqD8"}},
      {id:"teoria-07",label:"TEORÍA 07",title:"Patología quirúrgica benigna y maligna del yeyuno e íleon",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=teoria-07-yeyuno-ileon&v=5",resources:{pdf:"",ppt:"recursos-nuevo-programa/teorias/teoria-07/diapositivas.pdf",audio:"recursos-nuevo-programa/teorias/teoria-07/audio.m4a",video:"https://youtu.be/yKeftTmZYgY"}},
      {id:"teoria-08",label:"TEORÍA 08",title:"Hemorragia digestiva alta y baja",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=teoria-08-hemorragia-digestiva&v=7",resources:{pdf:"",ppt:"recursos-nuevo-programa/teorias/teoria-08/diapositivas.pdf",audio:"recursos-nuevo-programa/teorias/teoria-08/audio.m4a",video:"https://youtu.be/woX72UgoZYg"}},
      {id:"teoria-09",label:"TEORÍA 09",title:"Trasplante hepático: donante vivo y donante con muerte cerebral",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=teoria-09-trasplante-hepatico&v=5",resources:{pdf:"",ppt:"recursos-nuevo-programa/teorias/teoria-09/diapositivas.pdf",audio:"recursos-nuevo-programa/teorias/teoria-09/audio.m4a",video:"https://youtu.be/7gkZ7OoCobU"}},
      {id:"teoria-10",label:"TEORÍA 10",title:"Cirugía bariátrica + cirugía del tubo digestivo en cáncer",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=teoria-10-integrada&v=7",resources:{pdf:"",ppt:"recursos-nuevo-programa/teorias/teoria-10/diapositivas.pdf",audio:"recursos-nuevo-programa/teorias/teoria-10/audio.m4a",video:"https://youtu.be/T6hmiD_arlw"}},
      {id:"teoria-11",label:"TEORÍA 11",title:"Tumores mixtos benignos y malignos + hipertensión portal",status:"developed",statusText:"PPT + audio + video + teoría",study:"clase-cirugia-general.html?c=teoria-11-tumores-mixtos-hipertension-portal&v=5",resources:{pdf:"",ppt:"recursos-nuevo-programa/teorias/teoria-11/diapositivas.pdf",audio:"recursos-nuevo-programa/teorias/teoria-11/audio.m4a",video:"https://youtu.be/QVwKazV9kQQ"}}
    ]
  }
];