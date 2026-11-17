CREATE TABLE IF NOT EXISTS campus_reuniones (
  curso TEXT PRIMARY KEY,
  sala TEXT NOT NULL UNIQUE,
  anfitrion TEXT NOT NULL REFERENCES campus_alumnos(codigo) ON DELETE CASCADE,
  abierta INTEGER NOT NULL DEFAULT 0 CHECK (abierta IN (0, 1)),
  expira INTEGER NOT NULL
);
