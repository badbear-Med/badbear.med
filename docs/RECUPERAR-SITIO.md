# Respaldo y recuperación de WAJOMEA.GROUP

Repositorio principal: https://github.com/badbear-Med/badbear.med

El repositorio conserva las páginas, estilos, scripts y archivos publicados del sitio. La organización principal es:

- `index.html`: portada WAJOMEA.GROUP.
- `badbear-med.html`: portal BADBEAR.MED, cursos y acceso a ENAM.

- `badbear-music/`: música y acceso al canal de YouTube; los audios originales se guardan en `audios/`.
- `enam/`: preparación ENAM; sus materiales se guardan en `recursos/`.
- `badbear-books/`: publicaciones del equipo; los libros se guardan en `libros/`.

Todo archivo utilizado en una nueva creación debe incorporarse al repositorio junto con su página y sus enlaces. Si el alojamiento deja de funcionar, estos archivos permiten volver a publicar el sitio en GitHub Pages u otro alojamiento estático sin reconstruirlo.

## Obtener una copia completa del repositorio

Desde una carpeta vacía:

```powershell
git clone https://github.com/badbear-Med/badbear.med.git
cd badbear.med
```

Una copia local ya existente debe estar actualizada antes de generar el respaldo.

## Crear un respaldo independiente

Con Python 3.9 o posterior, desde la carpeta del proyecto:

```powershell
python tools/respaldo-sitio.py
```

La herramienta crea, en `RESPALDOS-BADBEAR` junto a la carpeta del proyecto:

- Un ZIP con los archivos locales del sitio, conservando sus rutas.
- Un archivo SHA-256 para verificar que el ZIP no cambió.
- Un manifiesto que enumera los archivos incluidos.

Incluye páginas, código, imágenes, PDF, libros y audios que estén presentes en la copia local. También conserva cambios locales aún no enviados a GitHub. Excluye el historial `.git`, dependencias de desarrollo y cachés; el historial del proyecto sigue conservándose en Git.

Los respaldos usan nombres únicos y ZIP64 para archivos grandes. No crean enlaces a archivos inexistentes ni dependen de un servicio de pago. Guarda una copia del ZIP fuera del repositorio y otra en un disco o servicio que controles.

## Restaurar desde el ZIP

1. Descomprime el ZIP en una carpeta vacía y confirma que `index.html`, `badbear-med.html`, `assets/` y las carpetas de los cursos están en el mismo nivel.
2. Publica esa carpeta en un alojamiento estático. Para GitHub Pages, sube los archivos a un repositorio y activa **Settings → Pages → Deploy from a branch → main → / (root)**.

Conserva las rutas relativas: no muevas solamente `index.html` ni separes los audios, imágenes o libros de sus carpetas.

## Música y material externo

El enlace confirmado del canal musical es:

https://www.youtube.com/channel/UCnc55BHaNhhi2OlOKLkT01A

Un enlace a YouTube respalda la dirección, no los archivos de las canciones o los videos. Para preservar también esas creaciones, incorpora al proyecto sus archivos originales o copias autorizadas. La herramienta de respaldo incluirá los archivos que realmente estén presentes.
