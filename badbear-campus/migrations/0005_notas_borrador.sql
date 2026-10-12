-- Las notas ya existentes se consideran de prueba hasta revisión administrativa.
ALTER TABLE campus_resultados ADD COLUMN publicada INTEGER NOT NULL DEFAULT 0 CHECK(publicada IN (0,1));
CREATE INDEX IF NOT EXISTS idx_campus_resultados_visibilidad ON campus_resultados(codigo,publicada);
