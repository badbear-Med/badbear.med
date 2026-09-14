/* =========================================================
   BADBEAR.MED · CATÁLOGO CENTRAL DE DERMATOLOGÍA
   Única fuente para temas, audios, videos y PDFs.

   Para agregar material nuevo:
   1) Sube el MP3 a /audios/
   2) Sube el PDF individual a /pdfs/temas/
   3) Coloca su ruta en audio/pdf y el enlace de YouTube en video.
   4) El reproductor y las páginas asociadas se actualizan automáticamente.
========================================================= */

(function(){
  "use strict";

  const PLAYLIST = "https://www.youtube.com/playlist?list=PLBeP1w0B3Wqc";

  const temas = [
    {
      id:1,
      titulo:"Anatomía y fisiología de la piel",
      audio:"audios/01-anatomia-piel.mp3",
      pdf:"pdfs/temas/01-anatomia-fisiologia-piel.pdf",
      video:"https://youtu.be/9Uk8OmtFwjI",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:2,
      titulo:"Lesiones elementales",
      audio:"audios/02-lesiones-elementales.mp3",
      pdf:"pdfs/temas/02-lesiones-elementales.pdf",
      video:"https://youtu.be/HAd6ZG833Yw",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:3,
      titulo:"Enfermedades inflamatorias de la piel",
      audio:"audios/03-enfermedades-inflamatorias.mp3",
      pdf:"pdfs/temas/03-enfermedades-inflamatorias.pdf",
      video:"https://youtu.be/FKfTnGgf5lk",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:4,
      titulo:"Enfermedades parasitarias de la piel",
      audio:"audios/04-enfermedades-parasitarias.mp3",
      pdf:"pdfs/temas/04-enfermedades-parasitarias.pdf",
      video:"https://youtu.be/WFitfjbQ69M",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:5,
      titulo:"Enfermedades bacterianas de la piel",
      audio:"audios/05-enfermedades-bacterianas.mp3",
      pdf:"pdfs/temas/05-enfermedades-bacterianas.pdf",
      video:"https://youtu.be/iNXyRx2h4vY",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:6,
      titulo:"Enfermedades virales de la piel",
      audio:"audios/06-enfermedades-virales.mp3",
      pdf:"pdfs/temas/06-enfermedades-virales.pdf",
      video:"https://youtu.be/wpaY9z9biXA",
      teoria:"teoria.html",
      estado:"disponible"
    },
    {
      id:7,
      titulo:"Tema 07 · pendiente de definir",
      audio:null,
      pdf:"pdfs/temas/07-tema.pdf",
      video:"https://youtu.be/5crcG0UG3wM",
      teoria:"teoria.html",
      estado:"parcial"
    },
    { id:8,  titulo:"Tema 08 · pendiente de definir", audio:null, pdf:"pdfs/temas/08-tema.pdf", video:null, teoria:"teoria.html", estado:"parcial" },
    { id:9,  titulo:"Tema 09 · pendiente de definir", audio:null, pdf:"pdfs/temas/09-tema.pdf", video:null, teoria:"teoria.html", estado:"parcial" },
    { id:10, titulo:"Tema 10 · pendiente de definir", audio:null, pdf:"pdfs/temas/10-tema.pdf", video:null, teoria:"teoria.html", estado:"parcial" },
    { id:11, titulo:"Tema 11 · pendiente de definir", audio:null, pdf:"pdfs/temas/11-tema.pdf", video:null, teoria:"teoria.html", estado:"parcial" },
    { id:12, titulo:"Tema 12 · pendiente de definir", audio:null, pdf:"pdfs/temas/12-tema.pdf", video:null, teoria:"teoria.html", estado:"parcial" },
    { id:13, titulo:"Tema 13 · pendiente de definir", audio:null, pdf:"pdfs/temas/13-tema.pdf", video:null, teoria:"teoria.html", estado:"parcial" },
    { id:14, titulo:"Tema 14 · pendiente de definir", audio:null, pdf:"pdfs/temas/14-tema.pdf", video:null, teoria:"teoria.html", estado:"parcial" },
    { id:15, titulo:"Tema 15 · pendiente de definir", audio:null, pdf:"pdfs/temas/15-tema.pdf", video:null, teoria:"teoria.html", estado:"parcial" },
    { id:16, titulo:"Tema 16 · pendiente de definir", audio:null, pdf:"pdfs/temas/16-tema.pdf", video:null, teoria:"teoria.html", estado:"parcial" }
  ];

  window.BADBEAR_DERMATOLOGIA = Object.freeze({
    totalTemas:16,
    playlistYouTube:PLAYLIST,
    temas:Object.freeze(temas.map(t=>Object.freeze({...t})))
  });
})();
