-- Private contact data; existing passwords, grades and sessions are preserved.
ALTER TABLE campus_alumnos ADD COLUMN correo TEXT
  CHECK(correo IS NULL OR (length(correo) BETWEEN 6 AND 254 AND correo=lower(trim(correo)) AND instr(correo,'@')>1));
ALTER TABLE campus_alumnos ADD COLUMN correo_verificado INTEGER NOT NULL DEFAULT 0 CHECK(correo_verificado IN (0,1));
CREATE UNIQUE INDEX campus_correo_unico ON campus_alumnos(correo) WHERE correo IS NOT NULL;
CREATE TABLE campus_correo_tokens (
  token_hash TEXT PRIMARY KEY, codigo TEXT NOT NULL REFERENCES campus_alumnos(codigo),
  correo TEXT NOT NULL, password_version TEXT, expira INTEGER NOT NULL
);
CREATE INDEX campus_correo_tokens_expira ON campus_correo_tokens(expira);
CREATE TABLE campus_correo_limites (
  identificador TEXT NOT NULL, ventana INTEGER NOT NULL, intentos INTEGER NOT NULL,
  CHECK(identificador<>'envios:dia' OR intentos<=90),
  CHECK(identificador<>'envios:mes' OR intentos<=2700),
  PRIMARY KEY(identificador,ventana)
);
CREATE TRIGGER campus_correo_cambiado AFTER UPDATE OF correo ON campus_alumnos
WHEN OLD.correo IS NOT NEW.correo
BEGIN
  UPDATE campus_alumnos SET correo_verificado=0 WHERE codigo=NEW.codigo;
  DELETE FROM campus_correo_tokens WHERE codigo=NEW.codigo;
  INSERT INTO campus_auditoria(accion,detalle) VALUES ('cambiar_correo',json_object('codigo',NEW.codigo));
END;
CREATE TRIGGER campus_password_cambiado AFTER UPDATE OF password_hash ON campus_alumnos
WHEN OLD.password_hash IS NOT NEW.password_hash
BEGIN
  DELETE FROM campus_sesiones WHERE codigo=NEW.codigo;
  DELETE FROM campus_correo_tokens WHERE codigo=NEW.codigo;
END;
