# Rotación con Dr. Sotelo

Entrada del sitio: `../rotacion-dr-sotelo.html`. La portada de Cirugía General tiene accesos en la navegación, en los botones iniciales y en el programa académico.

## Organización del material

| Carpeta | Contenido |
| --- | --- |
| `documentos/` | PDF, presentaciones y apuntes |
| `audios/` | Audios de la rotación |
| `videos/` | Videos de la rotación |
| `imagenes/` | Imágenes de apoyo |
| `materiales.json` | Catálogo publicado |

La página conserva el control de acceso de Cirugía General. No contiene un sistema de subida desde el navegador: los materiales se incorporan al repositorio y el catálogo los presenta.

## Incorporar un recurso

1. Guarda el archivo original en la carpeta correspondiente.
2. Añade una entrada a la categoría de `materiales.json` con `titulo`, `archivo` y, opcionalmente, `descripcion`.

Formato de una entrada (sustituye el nombre por un archivo que realmente exista):

```json
{
  "titulo": "Título del material",
  "archivo": "documentos/nombre-real-del-archivo.pdf",
  "descripcion": "Breve presentación del contenido."
}
```

Las rutas del catálogo se resuelven desde esta carpeta. También admite enlaces HTTP/HTTPS cuando el recurso esté alojado externamente. Conserva el original en el repositorio para incluirlo en el respaldo; un enlace externo solo conserva su dirección.

El catálogo comienza vacío. Los avisos de preparación permanecen visibles hasta incorporar recursos reales.
