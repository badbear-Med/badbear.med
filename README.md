# BADBEAR.MED

Plataforma educativa médica del grupo **WAJOMEA.GROUP**.

Este repositorio maestro integra los cursos BADBEAR.MED en un solo portal y está preparado para crecer por especialidades sin rehacer la página principal.

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

## Universo BADBEAR

- [BADBEAR.MUSIC](badbear-music/index.html): creaciones musicales y canal de YouTube del equipo.
- [Examen ENAM](enam/index.html): preparación, bancos de repaso y futuros simulacros.
- [BADBEAR.BOOKS](badbear-books/index.html): libros redactados por WAJOMEA.GROUP.

## Respaldo y recuperación

Todo el código y los archivos de las nuevas creaciones deben conservarse en este repositorio.

La [guía de recuperación](docs/RECUPERAR-SITIO.md) explica cómo restaurar el sitio. Desde una copia local completa, la herramienta siguiente genera un ZIP verificado, su suma SHA-256 y un inventario de archivos:

```sh
python tools/respaldo-sitio.py
```

El ZIP se guarda fuera de la carpeta del proyecto. Los archivos originales de música y libros deben incorporarse al proyecto para quedar incluidos; un enlace externo por sí solo no contiene esos originales.

[Vista de la portada con las tres secciones](docs/vistas/universo-badbear.jpg).
