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
5. Selecciona al alumno y genera su codigo individual de activacion. Entregalo por un canal privado despues de verificar su identidad. Vence en 24 horas y es de un solo uso; generar otro revoca el anterior.
6. El alumno activa su cuenta y crea una contrasena de 12–128 caracteres; despues inicia sesion con su codigo. Una recuperacion requiere un nuevo codigo emitido por administracion. Nunca permitir que el usuario se apropie de una cuenta indicando solo nombre/DNI.

No se conservan los CSV originales en el servidor en esta version. Al recargar o cerrar la pagina, alumno y administrador deben volver a ingresar; los tokens se mantienen exclusivamente en memoria. La sesion del alumno expira a las 8 horas y se puede revocar con cerrar sesion. Los codigos de activacion y sesiones se almacenan como SHA-256; contrasenas con sal aleatoria y PBKDF2-HMAC-SHA256 (100 000 iteraciones, limite del runtime WebCrypto) sobre una entrada protegida con HMAC y el secreto `PASSWORD_PEPPER`. No cambiar ese secreto en una actualizacion normal: invalidaria todas las contrasenas.

La ruta `/api/mis-resultados` obtiene el codigo desde la sesion validada; ignora identificadores externos. Todos los resultados son privados, con `Cache-Control: no-store`, consultas SQL parametrizadas y CORS limitado a `https://wajomea.group`. Login/activacion tienen limites atomicos por cuenta e IP cada 15 minutos. No subir listas, notas, contrasenas ni secretos a GitHub o R2 publico.

## Verificacion

Ejecutar `node --test tests/campus.test.mjs` con Node.js 24. Prueba importacion atomica, correccion de notas, aislamiento entre alumnos, activaciones, expiracion, sesiones, autenticacion administrativa, limites y CSV. Antes de aceptar datos reales, completar la activacion en Cloudflare y verificar el flujo con dos cuentas de prueba, borrandolas despues desde D1.

## Actualizacion del servicio existente

Ejecuta `Actualizar-Campus.ps1` despues de actualizar el repositorio. Recupera el ID de la base existente, aplica las migraciones pendientes y despliega el Worker conservando sus secretos. La migracion `0001_estados_resultados.sql` mantiene todas las notas, fechas y marcas de actualizacion existentes; amplía resultados para admitir NSP y LF con nota NULL, y conserva la auditoria. Wrangler registra cada migracion aplicada y revierte la migracion si falla. `schema.sql` conserva el esquema inicial como base; en instalaciones nuevas, `Activar-Campus.ps1` aplica esquema y migraciones antes del despliegue. No aplicar solo schema.sql para actualizar una instalacion existente.
