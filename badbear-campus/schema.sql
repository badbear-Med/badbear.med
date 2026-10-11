PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS campus_alumnos (
  codigo TEXT PRIMARY KEY, nombre TEXT NOT NULL,
  password_hash TEXT, salt TEXT, invitacion_hash TEXT,
  invitacion_expira INTEGER, activo INTEGER NOT NULL DEFAULT 1,
  creado_en TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TABLE IF NOT EXISTS campus_resultados (
  codigo TEXT NOT NULL REFERENCES campus_alumnos(codigo),
  curso TEXT NOT NULL, periodo TEXT NOT NULL, evaluacion TEXT NOT NULL,
  nota REAL NOT NULL CHECK(nota>=0 AND nota<=20), fecha TEXT NOT NULL,
  actualizado_en TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  PRIMARY KEY(codigo,curso,periodo,evaluacion)
);
CREATE TABLE IF NOT EXISTS campus_sesiones (
  token_hash TEXT PRIMARY KEY, codigo TEXT NOT NULL REFERENCES campus_alumnos(codigo),
  expira INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS campus_sesiones_expira ON campus_sesiones(expira);
CREATE TABLE IF NOT EXISTS campus_limites (
  identificador TEXT NOT NULL, ventana INTEGER NOT NULL, intentos INTEGER NOT NULL,
  PRIMARY KEY(identificador,ventana)
);
CREATE TABLE IF NOT EXISTS campus_auditoria (
  id INTEGER PRIMARY KEY AUTOINCREMENT, accion TEXT NOT NULL,
  detalle TEXT NOT NULL, creado_en TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TRIGGER IF NOT EXISTS campus_proteger_identidad
BEFORE UPDATE OF nombre ON campus_alumnos WHEN OLD.nombre<>NEW.nombre
BEGIN SELECT RAISE(ABORT,'El código pertenece a otro nombre'); END;
CREATE TRIGGER IF NOT EXISTS campus_historial_resultados
AFTER UPDATE OF nota,fecha ON campus_resultados WHEN OLD.nota<>NEW.nota OR OLD.fecha<>NEW.fecha
BEGIN
  INSERT INTO campus_auditoria(accion,detalle) VALUES ('corregir_resultado',
    json_object('codigo',OLD.codigo,'curso',OLD.curso,'periodo',OLD.periodo,
      'evaluacion',OLD.evaluacion,'nota_anterior',OLD.nota,'nota_nueva',NEW.nota,
      'fecha_anterior',OLD.fecha,'fecha_nueva',NEW.fecha));
END;
