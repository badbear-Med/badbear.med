# Arquitectura BADBEAR.MED

BADBEAR.MED usa un repositorio maestro con una carpeta por curso. Los cursos completos pueden conservar su propia arquitectura interna; los cursos nuevos comienzan usando la plantilla compartida.

## Estructura principal

```text
/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── css/course.css
│   └── js/
│       ├── courses.js
│       └── course-page.js
├── dermatologia/              # sistema completo integrado
├── cirugia-pediatrica/        # sistema completo integrado
├── cardiologia/
├── infectologia/
├── nefrologia/
├── neurologia/
├── psiquiatria/
├── neumologia/
├── traumatologia/
├── cirugia-general/
├── cirugia-batimix/
├── patologia-clinica/
├── parasitologia/
├── fisiologia/
└── medicina-interna/
```

## Registro central de cursos

`assets/js/courses.js` es la fuente central del catálogo. El portal principal se genera automáticamente desde ese archivo.

Para incorporar un curso nuevo:

1. Crear `nombre-del-curso/index.html` usando la plantilla base.
2. Agregar el curso a `assets/js/courses.js`.
3. Mantener `estado: "base"` hasta que el sistema real esté integrado.
4. Cambiar a `estado: "integrado"` y actualizar `href` cuando el curso tenga su propia aplicación.

## Cursos integrados

- Dermatología: entrada canónica `dermatologia/estudio.html?page=index.html`.
- Cirugía Pediátrica: entrada canónica `cirugia-pediatrica/index.html`.

No se deben reemplazar sus sistemas completos por la plantilla genérica.

## Plantilla para cursos nuevos

Cada curso base carga:

```html
<link rel="stylesheet" href="../assets/css/course.css">
<script src="../assets/js/courses.js"></script>
<script src="../assets/js/course-page.js"></script>
```

El identificador del curso se establece en `data-course-id` del `<body>`.

## Módulos estándar previstos

- Teoría
- Resúmenes
- Banco de preguntas
- Exámenes pasados
- PDF
- Videos
- Audios
- Progreso

Cada curso puede evolucionar a una aplicación propia sin romper el portal principal.

## Convención de rutas

Usar nombres de carpetas en minúsculas, sin espacios y con guiones:

- `cirugia-general`
- `patologia-clinica`
- `medicina-interna`

Evitar rutas absolutas que comiencen con `/` cuando el sitio vaya a publicarse mediante GitHub Pages. Preferir rutas relativas.

## Multimedia

Evitar archivos individuales mayores de 50 MB cuando sea posible. GitHub acepta archivos hasta su límite duro, pero recomienda tamaños menores. Para audio o video pesado, comprimir el archivo o usar una estrategia externa de almacenamiento antes de aumentar el repositorio.

## Flujo Git

- `main`: versión estable.
- `integracion-portal`: integración y expansión del portal.
- Cambios grandes: trabajar en una rama y fusionar mediante Pull Request.
