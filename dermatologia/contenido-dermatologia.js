/* =========================================================
   BADBEAR.MED · CATÁLOGO CENTRAL DE DERMATOLOGÍA
   Única fuente para temas, audios, videos y PDFs.

   Curso oficial: 12 temas.
   El tema 10 se divide en 10.1 y 10.2, por lo que existen
   13 unidades multimedia (13 audios, 13 PDF y 13 videos).
========================================================= */

(function(){
  "use strict";

  const PLAYLIST = "https://www.youtube.com/playlist?list=PLBeP1w0B3Wqc";

  const temas = [
    {
      id:1,
      titulo:"Anatomía y fisiología de la piel",
      audio:"audios/01-anatomia-fisiologia-piel.mp3",
      pdf:"pdfs/temas/01-anatomia-fisiologia-piel.pdf",
      video:"https://youtu.be/9Uk8OmtFwjI",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:2,
      titulo:"Micosis superficiales",
      audio:"audios/02-micosis-superficiales.mp3",
      pdf:"pdfs/temas/02-micosis-superficiales.pdf",
      video:"https://youtu.be/HAd6ZG833Yw",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:3,
      titulo:"Acné y rosácea",
      audio:"audios/03-acne-rosacea.mp3",
      pdf:"pdfs/temas/03-acne-rosacea.pdf",
      video:"https://youtu.be/O48WzRqTyh0",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:4,
      titulo:"Enfermedades inflamatorias de la piel",
      audio:"audios/04-enfermedades-inflamatorias-piel.mp3",
      pdf:"pdfs/temas/04-enfermedades-inflamatorias-piel.pdf",
      video:"https://youtu.be/WFitfjbQ69M",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:5,
      titulo:"Enfermedades parasitarias de la piel",
      audio:"audios/05-enfermedades-parasitarias-piel.mp3",
      pdf:"pdfs/temas/05-enfermedades-parasitarias-piel.pdf",
      video:"https://youtu.be/iNXyRx2h4vY",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:6,
      titulo:"Enfermedades bacterianas de la piel",
      audio:"audios/06-enfermedades-bacterianas-piel.mp3",
      pdf:"pdfs/temas/06-enfermedades-bacterianas-piel.pdf",
      video:"https://youtu.be/wpaY9z9biXA",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:7,
      titulo:"Enfermedades virales de la piel",
      audio:"audios/07-enfermedades-virales-piel.mp3",
      pdf:"pdfs/temas/07-enfermedades-virales-piel.pdf",
      video:"https://youtu.be/5crcG0UG3wM",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:8,
      titulo:"Manifestaciones dermatológicas de enfermedades sistémicas",
      audio:"audios/08-manifestaciones-dermatologicas-sistemicas.mp3",
      pdf:"pdfs/temas/08-manifestaciones-dermatologicas-sistemicas.pdf",
      video:"https://youtu.be/FZOH0kihz6g",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:9,
      titulo:"Neoplasias benignas de la piel",
      audio:"audios/09-neoplasias-benignas-piel.mp3",
      pdf:"pdfs/temas/09-neoplasias-benignas-piel.pdf",
      video:"https://youtu.be/wJFWiTpJZSE",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:10.1,
      titulo:"Neoplasias malignas no melanoma",
      audio:"audios/10-1-neoplasias-malignas-no-melanoma.mp3",
      pdf:"pdfs/temas/10-1-neoplasias-malignas-no-melanoma.pdf",
      video:"https://youtu.be/lWnIbAGIJYA",
      teoria:"teoria.html",
      estado:"disponible",
      temaPadre:10
    },
    {
      id:10.2,
      titulo:"Melanoma maligno",
      audio:"audios/10-2-melanoma-maligno.mp3",
      pdf:"pdfs/temas/10-2-melanoma-maligno.pdf",
      video:"https://youtu.be/NHct07qrcI0",
      teoria:"teoria.html",
      estado:"disponible",
      temaPadre:10
    },
    {
      id:11,
      titulo:"Enfermedades ampollares de la piel",
      audio:"audios/11-enfermedades-ampollares-piel.mp3",
      pdf:"pdfs/temas/11-enfermedades-ampollares-piel.pdf",
      video:"https://youtu.be/cBfHetINMcs",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:12,
      titulo:"Trastornos pigmentarios de la piel",
      audio:"audios/12-trastornos-pigmentarios-piel.mp3",
      pdf:"pdfs/temas/12-trastornos-pigmentarios-piel.pdf",
      video:"https://youtu.be/WjI_PJ9dE7I",
      teoria:"teoria.html",
      estado:"disponible"
    }
  ];

  window.BADBEAR_DERMATOLOGIA = Object.freeze({
    totalTemas:12,
    totalMateriales:13,
    playlistYouTube:PLAYLIST,
    temas:Object.freeze(temas.map(t=>Object.freeze({...t})))
  });
})();
