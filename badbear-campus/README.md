# BADBEAR.CAMPUS

Portal del estudiante con resultados privados. Interfaz publicada por GitHub Pages; backend independiente en Cloudflare Workers y una base D1 exclusiva `badbear-campus`. No usa el bucket publico de musica ni la base de examenes.

## Activacion inicial desde Windows

Actualiza tu copia del repositorio y ejecuta `Activar-Campus.ps1` desde PowerShell. Requiere Node.js LTS y acceso de Cloudflare a Workers y D1. El script abre la autenticacion oficial de Wrangler, crea la base exclusiva, aplica el esquema, publica el Worker y genera dos secretos de 256 bits. Las copias locales se guardan mediante DPAPI en `%LOCALAPPDATA%\BadbearCampus`, fuera del repositorio, y solo las puede abrir el mismo usuario de Windows. La credencial administrativa se muestra en tu consola para pegarla en el panel privado.

La API esperada es `https://badbear-campus-api.wajomea-group.workers.dev`. Si se usa otra cuenta/subdominio, actualiza `core.js` y la comprobacion final del script. La credencial de Campus es independiente de BADBEAR.EXAMS.

`wrangler.json` contiene un UUID marcador hasta que el script escribe el ID real de D1. No desplegar manualmente con ese marcador. El Worker responde 503 mientras falten bindings, esquema o secretos; la interfaz muestra «Conexion en preparacion». La publicacion de la interfaz no activa por si sola el backend.

## Carga y acceso

1. En administracion, carga CSV UTF-8 (Excel: Guardar como CSV UTF-8), hasta 200 resultados por archivo y 500 KB. Coma o punto y coma como delimitador.
2. Columnas: `codigo,nombre,curso,periodo,evaluacion,nota,fecha`. Codigos de 2–40 caracteres alfanumericos, guion o guion bajo, siempre tratados como texto y normalizados a mayusculas; no usar nombres como identificador. Notas 0–20 con hasta dos decimales, o NSP (No se presentó) y LF (Límite de faltas) en la misma columna `nota`; estos estados se guardan con nota NULL y nunca como cero. Fecha ISO `AAAA-MM-DD`.
3. Revisa la vista previa. La clave de cada resultado es alumno + curso + periodo + evaluacion. No se aceptan duplicados dentro de la misma carga ni nombres distintos para un codigo existente. Para actualizar notas publicadas, revisa los valores anteriores y marca la autorizacion de reemplazo.
4. Publica: alumnos y notas se guardan en una sola transaccion D1. Los cambios de nota, estado y fecha quedan auditados con el valor anterior y el nuevo.
5. En «Correos de los alumnos», carga un CSV UTF-8 con `codigo,correo`, hasta 200 filas y 500 KB. Revisa la correspondencia con los nombres ya registrados y guarda. Cada correo debe pertenecer a un unico alumno. Cambiar correos existentes exige autorizacion de reemplazo y revoca enlaces pendientes; las contrasenas actuales se conservan.
6. El alumno abre «Activa o recupera tu cuenta por correo», escribe su codigo y recibe un enlace en el correo registrado por administracion. El enlace vence en 30 minutos; sirve una sola vez para crear una contrasena de 12–128 caracteres. Luego ingresa con su codigo y contrasena. Solicitar una recuperacion no cambia la contrasena ni cierra sesiones: hacerlo requiere completar el enlace. Al cambiar la contrasena se revocan todas las sesiones y enlaces anteriores. La respuesta publica es la misma para codigos conocidos o desconocidos. Nunca aceptar un correo indicado por el solicitante como destino de recuperacion.
7. La seccion «Recuperacion manual para alumnos sin correo» mantiene los codigos de activacion anteriores, validos por 24 horas, para casos donde administracion verifica la identidad y entrega el codigo de forma privada.

No se conservan los CSV originales en el servidor en esta version. Al recargar o cerrar la pagina, alumno y administrador deben volver a ingresar; los tokens se mantienen exclusivamente en memoria. La sesion del alumno expira a las 8 horas y se puede revocar con cerrar sesion. Los codigos de activacion y sesiones se almacenan como SHA-256; contrasenas con sal aleatoria y PBKDF2-HMAC-SHA256 (100 000 iteraciones, limite del runtime WebCrypto) sobre una entrada protegida con HMAC y el secreto `PASSWORD_PEPPER`. No cambiar ese secreto en una actualizacion normal: invalidaria todas las contrasenas.

La ruta `/api/mis-resultados` obtiene el codigo desde la sesion validada; ignora identificadores externos. Todos los resultados son privados, con `Cache-Control: no-store`, consultas SQL parametrizadas y CORS limitado a `https://wajomea.group`. Login/activacion tienen limites atomicos por cuenta e IP cada 15 minutos. No subir listas, notas, contrasenas ni secretos a GitHub o R2 publico.

## Verificacion

Ejecutar `node --test tests/*.test.mjs` con Node.js 24. Prueba importacion atomica, correccion de notas, aislamiento entre alumnos, activaciones, expiracion, sesiones, autenticacion administrativa, limites y CSV. Antes de aceptar datos reales, completar la activacion en Cloudflare y verificar el flujo con dos cuentas de prueba, borrandolas despues desde D1.

## Actualizacion del servicio existente

Ejecuta `Actualizar-Campus.ps1` despues de actualizar el repositorio. Recupera el ID de la base existente, aplica las migraciones pendientes y despliega el Worker conservando sus secretos. La migracion `0001_estados_resultados.sql` mantiene todas las notas, fechas y marcas de actualizacion existentes; amplía resultados para admitir NSP y LF con nota NULL, y conserva la auditoria. Wrangler registra cada migracion aplicada y revierte la migracion si falla. `schema.sql` conserva el esquema inicial como base; en instalaciones nuevas, `Activar-Campus.ps1` aplica esquema y migraciones antes del despliegue. No aplicar solo schema.sql para actualizar una instalacion existente.


## Configurar el envio por correo (una vez)

El backend usa la API HTTPS de [Resend](https://resend.com/docs/api-reference/emails/send-email), sin paquetes de terceros en el Worker. No se ha creado una cuenta ni enviado correos reales automaticamente durante el desarrollo.

1. Crea una cuenta en [Resend](https://resend.com) y selecciona el plan gratuito. El plan publicado permite 3.000 correos al mes y 100 al dia; confirma las condiciones actuales antes de configurarlo.
2. En Domains, añade `notificaciones.wajomea.group`. Copia en Cloudflare DNS los registros exactos que Resend muestre para verificar ese subdominio. No borres ni sustituyas registros existentes del sitio. Desactiva el seguimiento de clics y aperturas para estos mensajes de acceso. No hace falta crear un buzon para el remitente.
3. Cuando el dominio figure como Verified, crea una API key con **Sending access**, limitada a ese dominio. Guarda la clave en tu gestor de contrasenas; no la pegues en un chat ni en archivos del repositorio.
4. Con el repositorio actualizado, ejecuta en PowerShell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "D:\BADBEAR-MED\badbear-campus\Configurar-Correo.ps1"
```

El script pide el remitente (por defecto `campus@notificaciones.wajomea.group`) y la clave con entrada oculta. Guarda `RESEND_API_KEY` y `CAMPUS_EMAIL_FROM` en los secretos del Worker existente, aplica migraciones pendientes y despliega el servicio. No cambia ADMIN_API_TOKEN ni PASSWORD_PEPPER. Una clave anterior de Resend se sustituye solo al ejecutar este script de configuracion; las actualizaciones normales conservan los secretos.

5. Carga en el panel privado el CSV de correos y prueba el flujo con una cuenta de prueba propia. Confirma tanto la recepcion del correo como su estado en Resend. `acceso_correo: true` confirma configuracion y esquema, no que Resend haya validado el dominio o entregado un mensaje.
6. Comparte solo el enlace publico del portal con la clase. Cada alumno solicita su enlace cuando lo necesita; no hay que enviar invitaciones individuales desde administracion. Para corregir una direccion, revisa primero la identidad del alumno y actualiza la lista desde el panel privado.

Los mensajes contienen un enlace y el codigo del alumno, sin notas ni contrasenas. El enlace lleva un token aleatorio en el fragmento de URL; el navegador lo elimina al abrir la pagina y lo mantiene en memoria hasta guardar la nueva contrasena. Abrir el enlace no lo consume, de modo que un escaner de seguridad del correo no activa la cuenta. D1 conserva solo su SHA-256, el correo y la version de contrasena asociada; caducar, cambiar el correo o cambiar la contrasena invalida el enlace. No se escribe el token ni la clave API en logs.

Limites locales: hasta 90 solicitudes de envio al dia y 2.700 al mes, reservadas atomicamente en D1; incluyen intentos que fallen o no terminen. Hasta 3 solicitudes de enlace por codigo y hora, con una espera de dos minutos, y 100 por IP y hora. Los limites de correo son independientes del login, para que solicitar recuperaciones no bloquee el acceso normal. Dia/mes se calculan en UTC; estos limites solo cubren esta aplicacion y no otros usos de la misma cuenta de Resend. Mantener el plan gratuito y las sobrecuotas desactivadas. Los reintentos usan la misma Idempotency-Key para impedir correos duplicados.

En Administracion, «Actualizar estado del correo» muestra el remitente, las reservas de envio y el ultimo resultado del proveedor. `aceptado` significa que Resend acepto el mensaje; verifica la entrega y los rebotes en su panel. `HTTP_401/403` indica revisar clave, dominio y permisos; `HTTP_429`, los limites del proveedor; `limite_de_envios`, el presupuesto local. La plantilla `plantilla-correos.csv` es publica y contiene solo cabeceras: los archivos reales de alumnos permanecen privados y no se suben a GitHub ni a R2 publico.

La migracion `0002_acceso_correo.sql` conserva los resultados, las cuentas y las sesiones existentes, añade contactos y tokens privados, y revoca sesiones al cambiar una contrasena. Las pruebas cubren preservacion de datos, importacion de contactos, ausencia de enumeracion en respuestas, uso unico/expiracion, carreras de confirmacion, aislamiento, reintentos y presupuestos simultaneos. El flujo tambien se verifico en workerd mediante Miniflare con D1 real y un proveedor de correo simulado: no se enviaron mensajes reales.
