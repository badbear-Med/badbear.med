# Clases en vivo de BADBEAR.CAMPUS

Cada curso del catálogo de BADBEAR.MED tiene una sala independiente, disponible para quienes hayan iniciado sesión con una cuenta activa del Campus. Los anfitriones se asignan por código de cuenta y curso en el Worker. Cuando un anfitrión entra en Jitsi, la sala se abre para los demás usuarios autenticados con rol de invitado.

## Activación en Cloudflare

1. En el Worker existente **badbear-campus-api**, abre **Settings → Variables and Secrets**. Añade estos valores como secretos.

   | Nombre | Valor |
   | --- | --- |
   | `JAAS_APP_ID` | AppID de JaaS que empieza por `vpaas-magic-cookie-`. |
   | `JAAS_KEY_ID` | Identificador completo de la clave, tal como aparece en `kid` del JWT. Incluye el AppID y el sufijo después de la barra. |
   | `JAAS_PRIVATE_KEY` | Contenido completo del archivo de clave privada RSA descargado de 8x8, incluidas las líneas BEGIN y END. Se admite PEM PKCS#1 o PKCS#8. |
   | `CAMPUS_LIVE_HOSTS` | Objeto JSON de cursos y códigos de cuentas existentes. Por ejemplo, `{"cirugia-batimix":["DOCENTE01"],"psiquiatria":["DOCENTE02"]}`. Para autorizar un mismo anfitrión en todos los cursos, usa `{"*":["DOCENTE01"]}`. Reemplaza los ejemplos con los códigos reales, tal como figuran en el Campus. |

2. Actualiza la copia del repositorio y ejecuta `badbear-campus/Actualizar-Campus.ps1` desde PowerShell con la cuenta de Cloudflare autorizada. El script usa la base D1 existente, aplica la migración `0007_clases_en_vivo.sql` y despliega el Worker. El ID incluido en el archivo versionado de Wrangler es un marcador.
3. Abre **Clases en vivo** desde el catálogo. Prueba que una cuenta sin sesión no pueda acceder, que una cuenta invitada no pueda iniciar y que un anfitrión designado pueda abrir una sala. Entra con una segunda cuenta y comparte una ventana desde Jitsi. Comprueba el nombre y los permisos de ambos participantes.
4. Prueba **Finalizar reunión**. El Campus cierra la sala a nuevas entradas y envía el comando `endConference` a Jitsi. Para desconectar a los participantes que ya están en la llamada, el despliegue JaaS debe tener habilitada esa función.

Los tokens JaaS se firman en el Worker, autorizan una sola sala y duran como máximo cinco minutos. El nombre proviene de la cuenta del Campus y los permisos provienen de la configuración del Worker. Cada sala caduca en el Campus a las cuatro horas y la siguiente reunión usa un identificador nuevo. La clave privada debe mantenerse en Cloudflare y en una copia local segura.

Referencias

- [JaaS · Identificador de clave y formato del JWT](https://developer.8x8.com/jaas/docs/api-keys-jwt/)
- [Cloudflare · Secretos del Worker](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Jitsi · Comando de cierre](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe-commands/#endconference)
