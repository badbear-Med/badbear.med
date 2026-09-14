# Arquitectura BADBEAR.MED

BADBEAR.MED usa un repositorio maestro con una carpeta por curso. Los cursos completos conservan su propia arquitectura interna; los cursos nuevos usan una plantilla compartida y una navegación modular común.

## Estructura principal

```text
/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── css/
│   │   ├── course.css
│   │   └── module.css
│   └── js/
│       ├── courses.js
│       ├── course-page.js
│       └── course-module.js
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
2. Crear `nombre-del-curso/modulo.html` usando el motor modular compartido.
3. Agregar el curso a `assets/js/courses.js`.
4. Mantener `estado: "base"` hasta que el sistema real esté integrado.
5. Cambiar a `estado: "integrado"` y actualizar `href` cuando el curso tenga su propia aplicación.

## Cursos integrados

- Dermatología: entrada canónica `dermatologia/estudio.html?page=index.html`.
- Cirugía Pediátrica: entrada canónica `cirugia-pediatrica/index.html`.

No se deben reemplazar sus sistemas completos por la plantilla genérica.

## Plantilla para cursos nuevos

Cada `index.html` base carga:

```html
<link rel="stylesheet" href="../assets/css/course.css">
<script src="../assets/js/courses.js"></script>
<script src="../assets/js/course-page.js"></script>
```

El identificador del curso se establece en `data-course-id` del `<body>`.

Cada `modulo.html` carga:

```html
<link rel="stylesheet" href="../assets/css/course.css">
<link rel="stylesheet" href="../assets/css/module.css">
<script src="../assets/js/courses.js"></script>
<script src="../assets/js/course-module.js"></script>
```

La página modular usa el parámetro `?m=` para seleccionar el módulo, por ejemplo:

```text
nefrologia/modulo.html?m=teoria
psiquiatria/modulo.html?m=preguntas
infectologia/modulo.html?m=pdf
```

## Módulos estándar activos

- Teoría
- Resúmenes
- Banco de preguntas
- Exámenes pasados
- PDF
- Videos
- Audios
- Progreso

Las rutas ya existen en todos los cursos base. El contenido específico puede integrarse progresivamente sin modificar la portada ni las demás especialidades.

## Evolución de un curso

Un curso puede pasar por estas etapas:

1. `base`: portada y módulos compartidos.
2. `en desarrollo`: contenido propio incorporado en algunos módulos.
3. `integrado`: aplicación completa o sistema especializado con su propia navegación.

Cuando un curso evoluciona a una aplicación propia, el portal principal solo necesita actualizar su `href` y estado en `assets/js/courses.js`.

## Convención de rutas

Usar nombres de carpetas en minúsculas, sin espacios y con guiones:

- `cirugia-general`
- `patologia-clinica`
- `medicina-interna`

Evitar rutas absolutas que comiencen con `/` cuando el sitio vaya a publicarse mediante GitHub Pages. Preferir rutas relativas.

## Multimedia

Evitar archivos individuales mayores de 50 MB cuando sea posible. Para audio o video pesado, comprimir el archivo o usar una estrategia externa de almacenamiento antes de aumentar el repositorio.

## Flujo Git

- `main`: versión estable.
- Cambios grandes: trabajar en una rama independiente.
- Revisar la rama mediante Pull Request.
- Fusionar a `main` solo después de verificar navegación, rutas y visualización.
