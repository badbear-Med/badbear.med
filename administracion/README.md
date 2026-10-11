# Administracion central de WAJOMEA.GROUP

Entrada: `https://wajomea.group/administracion/index.html`.

El escritorio usa el mismo correo y contraseña de administrador que BADBEAR.EXAMS. Un solo inicio de sesion permite abrir Campus y Examenes. Cada iframe se monta una vez para conservar la vista y las listas revisadas al cambiar de area.

## Activacion unica

Publicar GitHub Pages actualiza la interfaz. Tambien hay que desplegar el Worker de Campus: ejecuta `badbear-campus/Actualizar-Campus.ps1` desde la copia actualizada del repositorio. El script descubre la D1 existente, añade el service binding EXAMS_AUTH hacia badbear-exams-api, aplica solo migraciones pendientes y conserva ADMIN_API_TOKEN y PASSWORD_PEPPER. Añade el enlace al wrangler.json local sin modificar el archivo base del repositorio, para evitar conflictos con el UUID local de D1 al actualizar Git. No requiere cambiar secretos ni desplegar el Worker de Examenes. Comprueba `acceso_unificado: true` en `/api/health`.

## Autenticacion

El escritorio envia correo y contraseña por HTTPS a `/api/admin/login` de Campus. El Worker reenvia esas credenciales exclusivamente al servicio interno EXAMS_AUTH y su endpoint fijo de inicio de sesion de Examenes, con tiempo limite y sin seguir redirecciones. No usa fetch publico entre Workers workers.dev. La conexion interna se comprueba sin credenciales mediante /health de Examenes antes de anunciar acceso_unificado: true; si falta el enlace o el destino no responde como BADBEAR.EXAMS, se mantiene acceso_unificado: false. Solo emite una sesion firmada de Campus si el servicio de Examenes confirma el administrador existente. La sesion de Campus se firma con su propio ADMIN_API_TOKEN, caduca como maximo a las ocho horas y no dura mas que la sesion de Examenes. La respuesta incluye ambas sesiones; cada panel recibe exclusivamente la que le corresponde. La contraseña nunca se envia a los iframes ni se almacena.

Los backends autorizan cada solicitud privada. No se guardan claves ni sesiones en localStorage, sessionStorage, URLs ni cookies. El puente comprueba origen, ventana y area. Cerrar el escritorio o desconectar una de las areas descarta ambas sesiones de la pagina. Los tokens firmados no tienen revocacion individual: un token copiado antes de cerrar permanece valido hasta su vencimiento, como en el acceso actual de Examenes.

Las solicitudes internas usan `redirect: "manual"` y rechazan respuestas 3xx. El runtime workerd de Cloudflare rechaza `redirect: "error"` al construir Request, aunque Node lo admita; por eso hay que verificar tambien la conexion entre ambos Workers en workerd al cambiar estas opciones. Esta correccion se comprobo con ambos backends, D1 y el service binding en Miniflare: health confirma acceso_unificado y el inicio de sesion devuelve las dos sesiones.

Los estudiantes conservan su activacion y acceso propios y solo consultan sus resultados. La credencial antigua de Campus se conserva para recuperacion y acceso directo; no concede acceso a Examenes. Las pruebas verifican que ni sesiones de estudiantes ni sesiones de Examenes sin intercambio concedan acceso administrativo a Campus.

```sh
node --test administracion/tests/*.test.mjs badbear-campus/tests/*.test.mjs
```
