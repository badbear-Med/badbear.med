# Portal WAJOMEA.GROUP

## Organización

| Proyecto | Página de entrada | Contenido |
| --- | --- | --- |
| WAJOMEA.GROUP | `index.html` | Portada general del equipo |
| BADBEAR.MED | `badbear-med.html` | Cursos y recursos médicos |
| Examen ENAM | `enam/index.html` | Preparación dentro de BADBEAR.MED |
| BADBEAR.MUSIC | `badbear-music/index.html` | Creaciones musicales y canal de YouTube |
| BADBEAR.BOOKS | `badbear-books/index.html` | Publicaciones del equipo |

El repositorio sigue siendo `badbear-Med/badbear.med`. WAJOMEA.GROUP es el nombre de la portada; este cambio no registra un dominio nuevo.

## Rutas y funcionamiento

Los cursos, bancos, PDF, audios y videos conservan sus ubicaciones. Los accesos al portal médico vuelven a `badbear-med.html`. Los enlaces antiguos a `index.html#cursos`, `#recursos` y `#proyecto` se redirigen a la misma sección médica mediante `assets/js/wajomea-group.js`.

La portada general usa sus propios estilos en `assets/css/wajomea-group.css`. El catálogo médico continúa usando `assets/js/courses.js` y `script.js`. No se han cambiado preguntas, claves ni controles de acceso.

## Añadir un proyecto

1. Crea una carpeta para el proyecto y su `index.html`, con un enlace de retorno a la portada general.
2. Cuando tenga contenido listo para publicar, añade una tarjeta en `index.html`, usando una de las clases de tarjeta existentes o un nuevo acento en el CSS del grupo.

Posibles líneas futuras: ingeniería e innovación, herramientas de programación y curiosidades científicas. Estas son propuestas para decidir; no hay páginas vacías ni contenidos anunciados como ya disponibles.

Incorpora al repositorio el código y los archivos originales de cada proyecto, actualiza esta guía y revisa los enlaces antes de publicar. Para recuperar el conjunto completo, consulta [RECUPERAR-SITIO.md](RECUPERAR-SITIO.md).
