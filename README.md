# WAJOMEA.GROUP

Portal general del equipo: medicina, música original y publicaciones. El repositorio conserva su nombre `badbear.med` y reúne todos los proyectos.

La portada general está en `index.html`. El portal médico se encuentra en `badbear-med.html`, con sus cursos y preparación ENAM. Los materiales de los cursos conservan sus carpetas y rutas.

## Estado actual

### Integrados
- Dermatología
- Cirugía Pediátrica

### Estructura base preparada
- Cardiología
- Infectología
- Nefrología
- Neurología
- Psiquiatría
- Neumología
- Traumatología y Ortopedia
- Cirugía General
- Cirugía BATIMIX
- Patología Clínica
- Parasitología
- Fisiología
- Medicina Interna

## Arquitectura

La configuración central del catálogo vive en `assets/js/courses.js`.

Los cursos base usan `assets/js/course-page.js` y `assets/css/course.css`. Los cursos integrados pueden conservar su aplicación completa dentro de su propia carpeta.

Consulta `docs/ARQUITECTURA.md` para agregar nuevas especialidades y mantener rutas compatibles con GitHub Pages.

## Ramas

- `main`: versión estable.
- `integracion-portal`: expansión y reorganización del portal.

## Proyectos de WAJOMEA.GROUP

- [BADBEAR.MED](badbear-med.html): cursos, preguntas, actividades y acceso al ENAM.
- [BADBEAR.MUSIC](badbear-music/index.html): creaciones musicales y canal de YouTube del equipo.
- [Examen ENAM](enam/index.html): preparación, bancos de repaso y futuros simulacros.
- [BADBEAR.BOOKS](badbear-books/index.html): libros redactados por WAJOMEA.GROUP.
- [BADBEAR.LAB](badbear-lab/index.html): ingeniería y programación; primeros proyectos en preparación.
- [Curiosidades científicas](curiosidades/index.html): divulgación científica; primeros contenidos en preparación.

En Cirugía General, [Rotación con Dr. Sotelo](cirugia-general/rotacion-dr-sotelo.html) dispone de carpetas y catálogo para incorporar apuntes, documentos, audios y videos. Consulta [sus instrucciones](cirugia-general/rotacion-dr-sotelo/README.md).

## Respaldo y recuperación

Todo el código y los archivos de las nuevas creaciones deben conservarse en este repositorio.

La [guía de recuperación](docs/RECUPERAR-SITIO.md) explica cómo restaurar el sitio. Desde una copia local completa, la herramienta siguiente genera un ZIP verificado, su suma SHA-256 y un inventario de archivos:

```sh
python tools/respaldo-sitio.py
```

El ZIP se guarda fuera de la carpeta del proyecto. Los archivos originales de música y libros deben incorporarse al proyecto para quedar incluidos; un enlace externo por sí solo no contiene esos originales.

[Vista de los cinco proyectos de WAJOMEA.GROUP](docs/vistas/wajomea-cinco-proyectos.jpg).

[Vista anterior de las secciones](docs/vistas/universo-badbear.jpg).

Consulta [la estructura del portal y cómo añadir proyectos](docs/PORTAL-WAJOMEA.md).
