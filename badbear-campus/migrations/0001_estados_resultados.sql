-- Applied once and tracked by Wrangler D1 migrations. Existing results are preserved.
CREATE TABLE campus_resultados_v2 (
  codigo TEXT NOT NULL REFERENCES campus_alumnos(codigo),
  curso TEXT NOT NULL, periodo TEXT NOT NULL, evaluacion TEXT NOT NULL,
  nota REAL, estado TEXT NOT NULL DEFAULT '', fecha TEXT NOT NULL,
  actualizado_en TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  CHECK ((estado='' AND nota IS NOT NULL AND nota>=0 AND nota<=20)
    OR (estado IN ('NSP','LF') AND nota IS NULL)),
  PRIMARY KEY(codigo,curso,periodo,evaluacion)
);
INSERT INTO campus_resultados_v2(codigo,curso,periodo,evaluacion,nota,fecha,actualizado_en)
  SELECT codigo,curso,periodo,evaluacion,nota,fecha,actualizado_en FROM campus_resultados;
DROP TRIGGER IF EXISTS campus_historial_resultados;
DROP TABLE campus_resultados;
ALTER TABLE campus_resultados_v2 RENAME TO campus_resultados;
CREATE TRIGGER campus_historial_resultados
AFTER UPDATE OF nota,estado,fecha ON campus_resultados
WHEN OLD.nota IS NOT NEW.nota OR OLD.estado<>NEW.estado OR OLD.fecha<>NEW.fecha
BEGIN
  INSERT INTO campus_auditoria(accion,detalle) VALUES ('corregir_resultado',
    json_object('codigo',OLD.codigo,'curso',OLD.curso,'periodo',OLD.periodo,
      'evaluacion',OLD.evaluacion,'nota_anterior',OLD.nota,'nota_nueva',NEW.nota,
      'estado_anterior',OLD.estado,'estado_nuevo',NEW.estado,
      'fecha_anterior',OLD.fecha,'fecha_nueva',NEW.fecha));
END;
