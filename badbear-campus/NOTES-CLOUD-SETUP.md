# Despliegue BADBEAR.NOTES en Cloudflare (pendiente de ejecución)

El código de BADBEAR.NOTES ya contiene rutas privadas para apuntes y archivos.
**Publicarlo en GitHub Pages no crea el bucket ni aplica cambios D1 al Worker.**
Requiere acceso del propietario a Cloudflare.

1. En Cloudflare R2, crear el bucket **badbear-campus-notes** y mantenerlo **privado** (sin dominio público ni enlaces r2.dev).
2. En Worker **badbear-campus-api** agregar el binding R2:
   variable `NOTES_BUCKET` → bucket `badbear-campus-notes`.
3. En la base D1 correspondiente al binding `DB`, ejecutar solamente este esquema nuevo:

```sql
CREATE TABLE IF NOT EXISTS campus_notes(
 id TEXT PRIMARY KEY,
 codigo TEXT NOT NULL REFERENCES campus_alumnos(codigo) ON DELETE CASCADE,
 title TEXT NOT NULL,
 specialty TEXT NOT NULL DEFAULT 'Otras',
 topic TEXT NOT NULL DEFAULT '',
 tags TEXT NOT NULL DEFAULT '',
 body TEXT NOT NULL DEFAULT '',
 file_name TEXT,
 file_type TEXT,
 file_size INTEGER,
 created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS campus_notes_owner ON campus_notes(codigo,created_at);
```

4. Desplegar el worker actualizado (`worker-backend.js`) conservando secretos, bindings existentes y rutas. El wrangler.json del repositorio contiene un **database_id de ejemplo**, no debe usarse tal cual en producción. El deploy requiere reemplazarlo por el identificador real de D1 y mantener la configuración ya activa del servicio.
5. Verificar con sesión real de CAMPUS: GET /api/notes, crear apunte POST /api/notes, PUT /api/notes/:id/file, GET protegido del archivo y DELETE. Probar también que otro alumno obtiene 404 para ese mismo id.
6. Desde el mismo navegador y pestaña, entrar a CAMPUS con cuenta personal, abrir NOTAS y pulsar «Subir apuntes locales» para migrar los apuntes ya guardados en IndexedDB. **No borrar los originales locales** hasta confirmar que los archivos abren en la nube.

Limitación: todavía no hay despliegue Cloudflare ni verificación operativa; el almacenamiento remoto NO funciona hasta completar la configuración. No almacenar datos sensibles de pacientes.
