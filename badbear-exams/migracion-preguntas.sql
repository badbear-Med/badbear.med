-- Ejecutar una sola vez en Cloudflare D1: badbear-exams-db
CREATE TABLE IF NOT EXISTS preguntas_examen (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 examen_id INTEGER NOT NULL,
 numero INTEGER NOT NULL,
 enunciado TEXT NOT NULL,
 alternativa_a TEXT NOT NULL,
 alternativa_b TEXT NOT NULL,
 alternativa_c TEXT NOT NULL,
 alternativa_d TEXT NOT NULL,
 alternativa_e TEXT,
 correcta TEXT NOT NULL CHECK(correcta IN ('A','B','C','D','E')),
 explicacion TEXT NOT NULL,
 bibliografia TEXT,
 estado TEXT NOT NULL DEFAULT 'borrador' CHECK(estado IN ('borrador','publicada')),
 actualizado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE(examen_id,numero),
 FOREIGN KEY(examen_id) REFERENCES examenes(id)
);
CREATE INDEX IF NOT EXISTS idx_preguntas_examen_estado ON preguntas_examen(examen_id,estado,numero);
