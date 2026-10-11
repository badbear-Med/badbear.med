-- Ficha de estudiantes. Los datos no se exponen por endpoints públicos.
ALTER TABLE campus_alumnos ADD COLUMN nombres TEXT;
ALTER TABLE campus_alumnos ADD COLUMN apellidos TEXT;
ALTER TABLE campus_alumnos ADD COLUMN dni TEXT;
ALTER TABLE campus_alumnos ADD COLUMN celular TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS campus_alumno_dni_unico ON campus_alumnos(dni) WHERE dni IS NOT NULL;
-- Los cambios autorizados del nombre requieren auditoría, no un bloqueo permanente.
DROP TRIGGER IF EXISTS campus_proteger_identidad;
CREATE TRIGGER IF NOT EXISTS campus_auditar_ficha AFTER UPDATE OF nombre,nombres,apellidos,dni,celular ON campus_alumnos
WHEN OLD.nombre IS NOT NEW.nombre OR OLD.nombres IS NOT NEW.nombres OR OLD.apellidos IS NOT NEW.apellidos OR OLD.dni IS NOT NEW.dni OR OLD.celular IS NOT NEW.celular
BEGIN
INSERT INTO campus_auditoria(accion,detalle) VALUES ('editar_ficha_alumno',json_object('codigo',NEW.codigo,'nombre_anterior',OLD.nombre,'nombre_nuevo',NEW.nombre));
END;
