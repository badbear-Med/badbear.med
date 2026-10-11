-- Ejecutar una sola vez en Cloudflare D1: badbear-exams-db.
-- Mantiene el historial de huellas digitales de documentos enviados.
CREATE TABLE IF NOT EXISTS huellas_examenes (
  sha256 TEXT PRIMARY KEY NOT NULL,
  examen_id INTEGER NOT NULL UNIQUE,
  creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (examen_id) REFERENCES examenes(id)
);
CREATE INDEX IF NOT EXISTS idx_examenes_estado_anio
  ON examenes (estado, anio);
