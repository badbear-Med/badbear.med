-- Retiro reversible del padrón, conservando la identidad y su historial académico.
ALTER TABLE campus_alumnos ADD COLUMN retirado_en TEXT;
CREATE INDEX IF NOT EXISTS campus_padron_estado ON campus_alumnos(retirado_en,activo);
CREATE TRIGGER IF NOT EXISTS campus_alumno_retirado_bloqueado
BEFORE UPDATE OF activo ON campus_alumnos
WHEN NEW.retirado_en IS NOT NULL AND NEW.activo<>0
BEGIN SELECT RAISE(ABORT,'Restaura la ficha antes de habilitar su acceso'); END;
