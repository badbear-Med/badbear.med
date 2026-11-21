# Acceso único por BADBEAR.CAMPUS

La portada institucional y el inicio/recuperación de Campus son públicos. Las páginas, proyectos y cursos requieren validar una sesión real en `/api/mi-perfil`. Las claves compartidas de cursos, Libros y Dermatología ya no autorizan el acceso.

## Activación del bloqueo de archivos

Ejecutar `Activar-Acceso-Campus.ps1` desde una sesión Wrangler autorizada. No requiere claves nuevas: usa el vínculo interno `CAMPUS_API` con el Worker existente. Las rutas se colocan delante de GitHub Pages y del dominio `media.wajomea.group`, conservando los orígenes.

Ambos dominios deben estar activos en la zona y pasar por Cloudflare. Revisar que no existan rutas más específicas que omitan este Worker. No configurar modo de fallo abierto. La comprobación de identidad falla cerrada y no se guarda en caché.

La cookie de sesión es Secure, HttpOnly y SameSite=Strict, con dominio wajomea.group para las solicitudes de archivos al subdominio media. No se envían cookies ni Authorization al origen estático. La API verifica que el alumno siga activo y que la sesión no haya expirado o sido revocada.

## Límites que deben cerrarse en infraestructura

- Hasta desplegar el Worker, las redirecciones del navegador no protegen las descargas directas ni los datos JS.
- Los enlaces R2 `r2.dev` y otros dominios públicos alternativos deben desactivarse en sus buckets. El dominio protegido `media.wajomea.group` no hace privados esos enlaces alternativos por sí solo.
- El repositorio y los orígenes alternativos de GitHub Pages no deben ofrecer una copia pública de contenido que se quiera mantener privado. Revisar la visibilidad/origen antes de afirmar que el material es confidencial.
- Las copias ya descargadas no se pueden revocar con este cambio.

## Comprobación

En una ventana privada: visitar una clase o BADBEAR.MED por URL directa debe ir a Campus; un PDF o JS académico directo debe devolver 401. Iniciar sesión con una cuenta activa permite continuar al destino solicitado. Cerrar sesión, desactivar o retirar al alumno debe impedir nuevas solicitudes. Una caída del servicio de identidad debe devolver 503 sin entregar el archivo.
