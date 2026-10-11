/* BADBEAR.MUSIC · Catálogo conectado a Cloudflare R2. */
window.BADBEAR_MUSIC_CATALOG = (() => {
  const mediaBase = "https://media.wajomea.group/badbear-music/";
  const libraries = [
  {
    "id": "bachata",
    "name": "Bachata",
    "accent": "blue",
    "tracks": [
      {
        "id": "cuando-me-miras",
        "title": "Cuando me miras",
        "src": "audios/bachata/CUANDO ME MIRAS”.mp3"
      },
      {
        "id": "te-extrano-pero-no-te-necesito",
        "title": "Te extraño pero no te necesito",
        "src": "audios/bachata/TE EXTRANÑO PERO NO TE NECESITO.mp3"
      },
      {
        "id": "contigo-si",
        "title": "Contigo sí",
        "src": "audios/bachata/contigo si.mp3"
      },
      {
        "id": "me-quedo-tu-voz",
        "title": "Me quedó tu voz",
        "src": "audios/bachata/me-quedo-tu-voz.mp3"
      },
      {
        "id": "no-era-para-siempre",
        "title": "No era para siempre",
        "src": "audios/bachata/no era para siempre.mp3"
      }
    ]
  },
  {
    "id": "badbear-latin",
    "name": "Badbear Latin",
    "accent": "orange",
    "tracks": [
      {
        "id": "me-hiciste-falta-hoy",
        "title": "Me hiciste falta hoy",
        "src": "audios/badbear-latin/ME HICISTE FALLTA HOY.mp3"
      },
      {
        "id": "si-tu-te-quedas",
        "title": "Si tú te quedas",
        "src": "audios/badbear-latin/SI TÚ TE QUEDASP.mp3"
      },
      {
        "id": "alas-de-mariposa",
        "title": "Alas de mariposa",
        "src": "audios/badbear-latin/alas-de-mariposa.mp3"
      },
      {
        "id": "no-voy-a-volver",
        "title": "No voy a volver",
        "src": "audios/badbear-latin/no-voy-a-volver.mp3"
      },
      {
        "id": "donde-te-conoci-v2",
        "title": "Donde te conocí · versión 2",
        "src": "audios/badbear-latin/“DONDE TE CONOCÍ” (1).mp3"
      },
      {
        "id": "donde-te-conoci",
        "title": "Donde te conocí",
        "src": "audios/badbear-latin/“DONDE TE CONOCÍ”.mp3"
      },
      {
        "id": "que-suerte-encontrarte",
        "title": "Qué suerte encontrarte",
        "src": "audios/badbear-latin/“QUÉ SUERTE ENCONTRARTE”.mp3"
      },
      {
        "id": "latin-nunca-nos-despedimos",
        "title": "Nunca nos despedimos · WAV",
        "src": "audios/badbear-latin/NUNCA NOS DESPEDIMOS.wav"
      }
    ]
  },
  {
    "id": "badbear-cumbia",
    "name": "Badbear Cumbia",
    "accent": "orange",
    "tracks": [
      {
        "id": "me-duele-quererte",
        "title": "Me duele quererte",
        "src": "audios/badbear.cumbia/ME DUELE QUERERTEq.mp3"
      },
      {
        "id": "no-me-acostumbro-sin-ti",
        "title": "No me acostumbro sin ti",
        "src": "audios/badbear.cumbia/NO ME ACOSTUMBRO SIN TI-q.mp3"
      }
    ]
  },
  {
    "id": "badbear-salsa",
    "name": "Badbear Salsa",
    "accent": "orange",
    "tracks": [
      {
        "id": "hoy-se-baila",
        "title": "Hoy se baila",
        "src": "audios/badbear.salsa/HOY SE BAILA-s.mp3"
      },
      {
        "id": "no-me-mires-asi",
        "title": "No me mires así",
        "src": "audios/badbear.salsa/NO ME MIRES ASÍ.mp3"
      },
      {
        "id": "no-me-quitaste-nada",
        "title": "No me quitaste nada",
        "src": "audios/badbear.salsa/NO ME QUITASTE NADA-s.mp3"
      },
      {
        "id": "que-se-entere-todo-el-mundo",
        "title": "Que se entere todo el mundo",
        "src": "audios/badbear.salsa/QUE SE ENTERE TODO EL MUNDO-s.mp3"
      },
      {
        "id": "que-se-entere-todo-el-mundo-v2",
        "title": "Que se entere todo el mundo · versión 2",
        "src": "audios/badbear.salsa/QUE SE ENTERE TODO EL MUNDOss.mp3"
      },
      {
        "id": "quedate-esta-noche",
        "title": "Quédate esta noche",
        "src": "audios/badbear.salsa/QUÉDATE ESTA NOCHE-s.mp3"
      }
    ]
  },
  {
    "id": "badbear-urban",
    "name": "Badbear Urban",
    "accent": "orange",
    "tracks": [
      {
        "id": "despues-de-las-2",
        "title": "Después de las 2",
        "src": "audios/badbear.urban/DESPUES DE LAS 2r.mp3"
      },
      {
        "id": "me-enamore-de-lo-cotidiano",
        "title": "Me enamoré de lo cotidiano",
        "src": "audios/badbear.urban/ME ENAMORE DE LO COTIDIANOr.mp3"
      },
      {
        "id": "no-me-da-a-gana",
        "title": "No me da a gana",
        "src": "audios/badbear.urban/NO ME DA A GANAr.mp3"
      },
      {
        "id": "ya-no-me-duele-igual",
        "title": "Ya no me duele igual",
        "src": "audios/badbear.urban/YA NO ME DUELE IGUALr.mp3"
      },
      {
        "id": "urban-no-se-que-hacer",
        "title": "No sé qué hacer · WAV",
        "src": "audios/badbear.urban/no sé que haccer.wav"
      },
      {
        "id": "urban-una-noche",
        "title": "Una noche",
        "src": "audios/badbear.urban/una noche.mp3"
      }
    ]
  },
  {
    "id": "huayno",
    "name": "Huayno",
    "accent": "orange",
    "tracks": [
      {
        "id": "huayno-donde-estaras",
        "title": "Dónde estarás · WAV",
        "src": "audios/huayno/DÓNDE ESTARÁS.wav"
      }
    ]
  },
  {
    "id": "musica-variada",
    "name": "Música variada",
    "accent": "blue",
    "tracks": [
      {
        "id": "variada-2desconocidos-mp3",
        "title": "2 desconocidos",
        "src": "audios/musica variada/2DESCONOCIDOS.mp3"
      },
      {
        "id": "variada-aasa2-dejaste-jodio-mp3",
        "title": "AASA2 · Dejaste jodío",
        "src": "audios/musica variada/AASA2-DEJASTE JODIO.mp3"
      },
      {
        "id": "variada-dile-a-la-bb-mp3-mp3",
        "title": "Dile a la BB",
        "src": "audios/musica variada/DILE-A-LA-BB.mp3.mp3"
      },
      {
        "id": "variada-donde-estaras-wav",
        "title": "Dónde estarás · WAV",
        "src": "audios/musica variada/DÓNDE ESTARÁS.wav"
      },
      {
        "id": "variada-farruco-mp3",
        "title": "Farruco",
        "src": "audios/musica variada/FARRUCO.mp3"
      },
      {
        "id": "variada-finde-mp3",
        "title": "Finde",
        "src": "audios/musica variada/FINDE.mp3"
      },
      {
        "id": "variada-fui-solo-un-capitulo-en-tu-vida-bb-mp3",
        "title": "Fui solo un capítulo en tu vida BB",
        "src": "audios/musica variada/FUI SOLO UN CAPITULO EN TU VIDA BB.mp3"
      },
      {
        "id": "variada-fuiste-tu-quien-lo-jodiste-mp3",
        "title": "Fuiste tú quien lo jodiste",
        "src": "audios/musica variada/fuiste tu quien lo jodiste.mp3"
      },
      {
        "id": "variada-malas-vibras-bad-bear-youtube-1-mp3",
        "title": "Malas vibras · versión YouTube",
        "src": "audios/musica variada/malas vibras - Bad Bear! (youtube) (1).mp3"
      },
      {
        "id": "variada-me-marcho-d1-bad-bear-youtube-mp3",
        "title": "Me marcho D1 · versión YouTube",
        "src": "audios/musica variada/ME MARCHO D1 - Bad Bear! (youtube).mp3"
      },
      {
        "id": "variada-me-vale-bad-bear-youtube-mp3",
        "title": "Me vale · versión YouTube",
        "src": "audios/musica variada/ME VALE - Bad Bear! (youtube).mp3"
      },
      {
        "id": "variada-mia1-1-mp3",
        "title": "Mía 1",
        "src": "audios/musica variada/mia1 (1).mp3"
      },
      {
        "id": "variada-motel-bad-bear-youtube-mp3",
        "title": "Motel · versión YouTube",
        "src": "audios/musica variada/MOTEL - Bad Bear! (youtube).mp3"
      },
      {
        "id": "variada-no-se-que-haccer-wav",
        "title": "No sé qué hacer · WAV",
        "src": "audios/musica variada/no sé que haccer.wav"
      },
      {
        "id": "variada-nunca-nos-despedimos-wav",
        "title": "Nunca nos despedimos · WAV",
        "src": "audios/musica variada/NUNCA NOS DESPEDIMOS.wav"
      },
      {
        "id": "variada-paramiti-el-mundo-se-acabao-bb-mp3",
        "title": "Para mí el mundo se acabó BB",
        "src": "audios/musica variada/PARAMITI EL MUNDO SE ACABAO BB.mp3"
      },
      {
        "id": "variada-re21-mp3",
        "title": "Re21",
        "src": "audios/musica variada/re21.mp3"
      },
      {
        "id": "variada-salgo-pa-la-calle-mp3",
        "title": "Salgo pa la calle",
        "src": "audios/musica variada/SALGO PA LA CALLE.mp3"
      },
      {
        "id": "variada-te-rogue-mp3",
        "title": "Te rogué",
        "src": "audios/musica variada/TE  ROGUE.mp3"
      },
      {
        "id": "variada-te-fuite-bad-bear-youtube-mp3",
        "title": "Te fuiste · versión YouTube",
        "src": "audios/musica variada/TE FUITE - Bad Bear! (youtube).mp3"
      },
      {
        "id": "variada-te-fuite-mp3",
        "title": "Te fuiste",
        "src": "audios/musica variada/te fuite.mp3"
      },
      {
        "id": "variada-tu-me-prendias-bad-bear-youtube-mp3",
        "title": "Tú me prendías · versión YouTube",
        "src": "audios/musica variada/tu me prendias... - Bad Bear! (youtube).mp3"
      },
      {
        "id": "variada-tu-me-prendias-wav",
        "title": "Tú me prendías · WAV",
        "src": "audios/musica variada/tu me prendias.wav"
      },
      {
        "id": "variada-tus-besos-en-hd-wav",
        "title": "Tus besos en HD · WAV",
        "src": "audios/musica variada/tus besos en hd.wav"
      },
      {
        "id": "variada-una-noche-mp3",
        "title": "Una noche",
        "src": "audios/musica variada/una noche.mp3"
      },
      {
        "id": "variada-yo-no-creia-en-nada-mp3",
        "title": "Yo no creía en nada",
        "src": "audios/musica variada/yo no creia en nada.mp3"
      }
    ]
  }
];

  return libraries.map(library => ({
    ...library,
    tracks: library.tracks.map(track => ({
      ...track,
      absoluteSrc: mediaBase + track.src.split("/").map(encodeURIComponent).join("/")
    }))
  }));
})();
