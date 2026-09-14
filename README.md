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
