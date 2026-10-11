# BADBEAR.MUSIC

Creaciones musicales del equipo de WAJOMEA.GROUP.

- Página pública: `index.html`.
- Audios: `audios/`.
- Canal musical confirmado por el equipo: https://www.youtube.com/channel/UCnc55BHaNhhi2OlOKLkT01A
- Los botones de la portada musical y de la sección `#youtube` enlazan al canal.
- Publicar solo canciones y enlaces confirmados; no crear títulos o archivos ficticios.

## Almacenamiento musical

- Los audios se sirven desde Cloudflare R2: `https://media.wajomea.group/badbear-music/audios/`.
- Bucket: `wajomea-group`. Prefijo: `badbear-music/audios/`.
- `catalog.js` conserva las rutas originales y genera los enlaces públicos codificando cada segmento; el reproductor continuo utiliza `absoluteSrc`.
- Catálogo: 54 archivos en siete bibliotecas. Las versiones MP3/WAV y las canciones presentes en distintas bibliotecas se conservan.
- La copia local de originales está en `D:\\BADBEAR-MED\\badbear-music\\audios`.
- Actualizar la versión de `catalog.js` tanto en `app.html` como en `badbear-music/index.html` al cambiar el catálogo.
