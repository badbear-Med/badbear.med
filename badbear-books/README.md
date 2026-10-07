# BADBEAR.BOOKS

Biblioteca de publicaciones de WAJOMEA.GROUP para lectura en la página web.

## WAJOMEÍSMO PURO

- Catálogo: `index.html`.
- Presentación e índice: `wajomeismo-puro/index.html`.
- Prólogo y veinte capítulos: páginas HTML individuales en `wajomeismo-puro/`.
- Portada original: `wajomeismo-puro/portada.jpeg`.
- Ampliación editorial independiente: `wajomeismo-puro/guia-de-lectura.html`.
- Veinte desarrollos de crecimiento, uno por capítulo: `wajomeismo-puro/crecimiento.json`, integrados en las páginas de lectura.
- Texto de respaldo estructurado: `wajomeismo-puro/contenido.json`.
- Reconstrucción: `python badbear-books/scripts/build_wajomeismo.py` desde la raíz del repositorio. Solo utiliza Python estándar y los archivos incluidos.

La transcripción conserva el contenido del prólogo y los veinte capítulos. El índice web sigue los capítulos efectivamente desarrollados, no los dos índices preliminares del documento. Se excluyen encabezados repetidos y números de página; se corrige el rótulo «APÍTULO 15». Se conserva el contenido de las dos aperturas del prólogo.

Cada capítulo conserva su texto original y añade un desarrollo editorial diferenciado: objetivo, profundización, método, ejemplo aplicado, tres oportunidades de crecimiento, ejercicio, plan de siete días, preguntas de evaluación y una idea de cierre. Las ampliaciones desarrollan disciplina, autonomía, criterio, relaciones responsables y legado. Las aplicaciones relacionales evalúan conductas individuales, consentimiento y acuerdos; no amplifican descalificaciones sobre grupos de personas ni añaden afirmaciones biomédicas al capítulo de intimidad.

La guía general de lectura también es un texto editorial separado de la obra original. La biblioteca se presenta como una publicación de WAJOMEA.GROUP; no se atribuye una autoría individual no confirmada.

El PDF de trabajo no forma parte de la publicación ni del repositorio. El contenido se lee en HTML. La lectura web no impide técnicamente copiar, imprimir o guardar el texto.

## Recuperación del portal

Los textos, las páginas, la portada, el CSS y el JavaScript quedan versionados en este repositorio. Una copia del repositorio permite restaurar la sección en cualquier servidor de archivos estáticos. No requiere una base de datos ni servicios externos de lectura.

Las preferencias de tamaño, tono de página y último capítulo se guardan, cuando el navegador lo permite, en el dispositivo del lector. La clave requiere JavaScript para permitir la lectura.

## Acceso con clave

El catálogo, la presentación, el prólogo, los veinte capítulos y la guía incluyen `acceso.js` y `acceso.css`. La clave exclusiva de Libros se configura mediante su hash SHA-256 en `acceso-config.js`. No se reutiliza ni se modifica la configuración de Medicina o Música. La autorización de Libros tiene su propia clave de almacenamiento de sesión. «Cerrar acceso a Libros» elimina esa autorización.

El contenido permanece oculto antes de verificar la clave, también al abrir un enlace directo. Si falta la configuración o JavaScript está desactivado, la interfaz no permite leer. El lector guarda preferencias y registra el capítulo únicamente después de autorizar el acceso. El generador conserva este bloqueo al reconstruir las páginas.

Este mecanismo es un control visual en el navegador, adecuado al portal estático actual. No autentica en un servidor ni cifra los archivos. El código HTML, `contenido.json` y el texto del repositorio público pueden obtenerse directamente. La confidencialidad real requiere servir el contenido desde un sistema que verifique la autorización antes de entregar los archivos y revisar la visibilidad del repositorio.

## Publicaciones siguientes

Añadir una carpeta por libro con su portada, presentación, índice y contenido HTML; incorporarlo al catálogo. Cada página debe utilizar el patrón de acceso del generador: clase inicial `books-access-pending`, ocultación en línea, scripts de configuración y acceso, y contenido dentro de `#books-page`. Confirmar sus títulos y autoría a partir del material suministrado. No añadir un enlace de descarga de PDF salvo nueva instrucción del equipo.


## WAJOMEÍSMO MASCULINO

Segunda publicación: `wajomeismo-masculino/index.html`. Conserva apertura, 33 capítulos y epílogo; el capítulo 25 está en el cuerpo del original aunque falta en su índice preliminar. La portada original identifica a WAJHOUMEA. `contenido.json` conserva los bloques transcritos y sus páginas de procedencia. Se retiran índice preliminar, folios y páginas sin texto. El PDF de trabajo no se sube ni se enlaza.

Cada capítulo tiene un desarrollo editorial propio en `crecimiento.json`: objetivo, dos explicaciones, método, ejemplo, tres oportunidades, ejercicio, plan de siete días, preguntas y principio final. Estas ampliaciones distinguen el lenguaje metafórico de afirmaciones biomédicas y aplican autonomía, consentimiento, responsabilidad y evaluación de conductas individuales.

Reconstrucción: `python badbear-books/scripts/build_masculino.py`. Para volver a escribir exclusivamente las ampliaciones desde sus fichas editoriales: `python badbear-books/scripts/growth_masculino.py`. El CSS de lectura se comparte con el primer libro. Tamaño, tono y capítulo recordado usan almacenamiento independiente para cada obra.

## Lectura en audio

`audiolibro.js` y `audiolibro.css` añaden un panel a los capítulos de ambos libros, después de conceder el acceso. Requiere un clic para comenzar y utiliza Web Speech API, con voces en español disponibles en el dispositivo. No hay archivo MP3 ni grabación descargable.

Incluye selección de original/desarrollo/ambos, voz, velocidad, pausa y reanudación, detención, navegación y posición por fragmentos. Los fragmentos cortos evitan enviar capítulos enteros a una sola locución. La pausa cancela la locución y conserva el desplazamiento de palabra cuando el motor emite eventos de límite; de lo contrario puede repetir el fragmento actual al reanudar. Posición y preferencias se guardan localmente si hay almacenamiento disponible. Cambiar de página o cerrar acceso cancela la voz. La escucha en segundo plano depende del navegador; la interfaz pide mantener la página abierta.

La lectura original conserva las opiniones de la obra; los desarrollos editoriales pueden escucharse por separado. Los generadores incluyen las referencias al panel compartido para mantenerlo al reconstruir las páginas.
