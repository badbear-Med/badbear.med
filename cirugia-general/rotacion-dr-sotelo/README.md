# Rotación con Dr. Sotelo

Entrada: `../rotacion-dr-sotelo.html`, dentro de Cirugía General. Edición 1 octubre 2026: diez capítulos desarrollados, manual descargable, material aportado e imágenes extraídas. Se conserva el control de acceso del curso.

## Temas

1. Intususcepción intestinal en adultos.
2. CD4: función, interpretación y prevención de infecciones oportunistas.
3. Cadenas ganglionares en TC, normalidad, neoplasia y RECIST.
4. Gangrena de Fournier.
5. Fístulas anorrectales.
6. Signo de Infante Díaz: denominación del material docente; maniobra heel-drop/Markle.
7. Tipos de neoplasias y nombres completos por segmento del colon.
8. Tratamiento de colon por zona y estadio, con diferenciación del recto.
9. Coledocolitiasis: extracción, apertura papilar, fragmentación y drenaje endoscópico.
10. Incremento del cáncer colorrectal de inicio temprano: evidencia, mecanismos y prevención.

Cada capítulo tiene desarrollo teórico, cuadros, bloques `BADBEAR.MED FIJA:`, repaso y bibliografía enlazada. No se modifican bancos de preguntas ni contenidos de otros cursos. Las imágenes de la exposición son apoyos docentes y no estudios clínicos validados. Véase `imagenes/README.md` para páginas y coordenadas de extracción.

## Archivos y respaldo

| Ruta | Contenido |
| --- | --- |
| `temas/fuentes/*.md` | Texto editable completo de los diez capítulos |
| `temas/*.html` | Lectura web estática, con navegación y control de acceso |
| `temas/indice.json` | Índice y descripciones |
| `documentos/manual-rotacion-sotelo.pdf` | Manual completo con índice enlazado, marcadores y bibliografía |
| `documentos/temas-exposicion-material.pdf` | Las 15 páginas del PDF aportado, recompresión sin pérdida: se verificaron píxeles idénticos en todas las páginas |
| `documentos/temas-colon-coledocolitiasis-original.pptx` | PowerPoint original, byte por byte |
| `documentos/respaldo-original/` | PDF original exacto dividido en dos partes, con tamaños y SHA-256 |
| `documentos/integridad-materiales.json` | Tamaños y SHA-256 de los documentos publicados y las imágenes |
| `imagenes/` | Seis recortes del material aportado |
| `materiales.json` | Catálogo de documentos, audios y videos |

El original PDF excede el límite de una petición del conector de publicación al codificarlo en base64. Se conserva íntegro en dos partes para respaldo, además del PDF de consulta de apariencia idéntica. Para restaurar los bytes exactos tras clonar o descargar el repositorio, desde su raíz:

```sh
python tools/restaurar-pdf-sotelo.py
```

El script verifica cada parte y el resultado completo antes de escribir `documentos/temas-exposicion-original.pdf`. No sobrescribe un archivo existente que sea distinto. El respaldo general del repositorio incluye ambas partes, todos los capítulos y el manual: no depende de enlaces externos para recuperar este material.

## Regenerar la edición

Desde la raíz del repositorio:

```sh
python tools/generar-temas-sotelo.py
```

Para regenerar también el manual: `python tools/generar-temas-sotelo.py --pdf`. HTML utiliza biblioteca estándar; PDF requiere ReportLab, Pillow y fuentes DejaVu Sans. El sitio publicado usa archivos estáticos y no necesita Python. Tras cambios editoriales, actualiza bibliografía, fecha y descripción del tema cuando corresponda, y comprueba los enlaces y el PDF antes de publicar.

## Añadir material de la rotación

1. Guarda el archivo en `documentos/`, `audios/`, `videos/` o `imagenes/`.
2. Añade una entrada en la categoría de `materiales.json` con `titulo`, `archivo` y, opcionalmente, `descripcion`.

Las rutas del catálogo se resuelven desde esta carpeta. Los audios y videos permanecen como categorías disponibles para incorporar material real. Un enlace externo conserva su dirección; para respaldo completo se debe guardar también el archivo cuando se dispone de él y se cuenta con autorización.
