# Administracion central de WAJOMEA.GROUP

Entrada: `https://wajomea.group/administracion/index.html`.

El escritorio integra los paneles existentes de Campus y Examenes. Para abrirlo, selecciona el area con la que vas a entrar. Campus valida su credencial administrativa; Examenes utiliza su endpoint de correo y contraseña y luego valida el token de sesion con su API protegida. La otra area puede conectarse desde su panel. No hay una contraseña compartida: ambas conservan sus accesos y autorizaciones actuales. Cada iframe se crea una vez y permanece montado al cambiar de area para conservar la vista, la lista revisada y el acceso durante esa pagina. No se guardan credenciales en localStorage, sessionStorage, URLs ni cookies. Cerrar el escritorio descarta claves y desmonta ambos paneles.

El puente de mensajes comprueba origen, ventana emisora y area antes de pasar la credencial de Campus o el token de sesion de Examenes al panel correspondiente. Los paneles siguen autenticando todas las solicitudes privadas en sus backends originales. Las contraseñas de Examenes se transmiten solo a su endpoint de login y no se pasan al iframe. El formulario permite usar el gestor de contraseñas del navegador; no crea usuarios nuevos.

Esta version centraliza las funciones reales disponibles: Campus (resultados y acceso de alumnos) y Examenes (estadisticas, revision y biblioteca). Nuevas areas de administracion pueden incorporarse cuando tengan funciones y autorizacion de backend. Publicar estos archivos solo requiere GitHub Pages; no cambia servicios ni secretos de Cloudflare.
