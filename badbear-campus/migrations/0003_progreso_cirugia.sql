-- Ejecutar una sola vez sobre D1 de BADBEAR.CAMPUS antes de activar la sincronización.
CREATE TABLE IF NOT EXISTS campus_progreso_cirugia (
 codigo TEXT NOT NULL REFERENCES campus_alumnos(codigo) ON DELETE CASCADE,
 clase_id TEXT NOT NULL,
 estudiada INTEGER NOT NULL DEFAULT 1 CHECK(estudiada IN (0,1)),
 actualizado_en TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
 PRIMARY KEY(codigo,clase_id)
);
