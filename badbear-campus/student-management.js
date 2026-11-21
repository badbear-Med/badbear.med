export function createStudentManagement({ Problem, code }) {
  async function ready(env) {
    return Boolean(await env.DB.prepare("SELECT name FROM pragma_table_info('campus_alumnos') WHERE name='retirado_en'").first());
  }

  function profile(body, previous = null) {
    const codigo = code(body.codigo);
    let nombres = String(body.nombres || "").trim().replace(/\s+/g, " ");
    let apellidos = String(body.apellidos || "").trim().replace(/\s+/g, " ");
    const nombre = String(body.nombre || (nombres && apellidos ? apellidos + ", " + nombres : "")).trim().replace(/\s+/g, " ");
    if (body.nombre) {
      nombres = previous?.nombre === nombre ? previous.nombres : null;
      apellidos = previous?.nombre === nombre ? previous.apellidos : null;
    }
    const correo = String(body.correo || "").trim().toLowerCase();
    const dni = String(body.dni || "").trim();
    const celular = String(body.celular || "").trim();
    if (!nombre || nombre.length > 220 || (nombres && nombres.length > 100) || (apellidos && apellidos.length > 120)) throw new Problem("Introduce apellidos y nombres válidos.");
    if (correo && (correo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))) throw new Problem("Correo inválido.");
    if (dni && !/^[0-9]{8}$/.test(dni)) throw new Problem("El DNI debe tener exactamente 8 dígitos.");
    if (celular && !/^[+0-9 ()-]{7,20}$/.test(celular)) throw new Problem("Celular inválido.");
    return { codigo, nombres, apellidos, nombre, correo: correo || null, dni: dni || null, celular: celular || null };
  }

  async function manage(action, body, env) {
    if (!await ready(env)) throw new Problem("Actualiza el servicio de Campus con Actualizar-Campus.ps1 para habilitar la gestión individual de alumnos.", 503);
    const codigo = code(body.codigo);
    const previous = await env.DB.prepare("SELECT codigo,nombre,nombres,apellidos,activo,retirado_en FROM campus_alumnos WHERE codigo=?").bind(codigo).first();
    const statements = [];
    let result;
    if (action === "crear") {
      if (previous) throw new Problem("Este código ya está registrado. Busca su ficha para editarla o restaurarla.", 409);
      if (typeof body.activo !== "boolean") throw new Problem("Indica si se permite el acceso del alumno.");
      const item = profile(body);
      statements.push(env.DB.prepare("INSERT INTO campus_alumnos(codigo,nombre,nombres,apellidos,correo,dni,celular,activo) VALUES(?,?,?,?,?,?,?,?)")
        .bind(codigo, item.nombre, item.nombres, item.apellidos, item.correo, item.dni, item.celular, body.activo ? 1 : 0));
      result = { codigo, activo: body.activo, retirado: false };
    } else {
      if (!previous) throw new Problem("Alumno no registrado.", 404);
      if (action === "guardar") {
        const item = profile(body, previous);
        statements.push(env.DB.prepare("UPDATE campus_alumnos SET nombre=?,nombres=?,apellidos=?,correo_verificado=CASE WHEN correo IS ? THEN correo_verificado ELSE 0 END,correo=?,dni=?,celular=? WHERE codigo=?")
          .bind(item.nombre, item.nombres, item.apellidos, item.correo, item.correo, item.dni, item.celular, codigo));
        result = { codigo, activo: Boolean(previous.activo), retirado: Boolean(previous.retirado_en) };
      } else if (action === "acceso") {
        if (typeof body.activo !== "boolean") throw new Problem("Indica si se permite el acceso del alumno.");
        if (previous.retirado_en) throw new Problem("Restaura la ficha retirada antes de cambiar el acceso.", 409);
        statements.push(env.DB.prepare("UPDATE campus_alumnos SET activo=? WHERE codigo=? AND retirado_en IS NULL").bind(body.activo ? 1 : 0, codigo));
        result = { codigo, activo: body.activo, retirado: false };
      } else if (action === "retirar") {
        statements.push(env.DB.prepare("UPDATE campus_alumnos SET activo=0,retirado_en=COALESCE(retirado_en,strftime('%Y-%m-%dT%H:%M:%fZ','now')) WHERE codigo=?").bind(codigo));
        result = { codigo, activo: false, retirado: true };
      } else if (action === "restaurar") {
        if (!previous.retirado_en) throw new Problem("La ficha ya pertenece al padrón.", 409);
        statements.push(env.DB.prepare("UPDATE campus_alumnos SET activo=0,retirado_en=NULL WHERE codigo=?").bind(codigo));
        result = { codigo, activo: false, retirado: false };
      } else throw new Problem("Operación no disponible.", 404);
      if (action === "retirar" || action === "restaurar" || (action === "acceso" && !body.activo)) {
        statements.push(env.DB.prepare("DELETE FROM campus_sesiones WHERE codigo=?").bind(codigo),
          env.DB.prepare("UPDATE campus_alumnos SET invitacion_hash=NULL,invitacion_expira=NULL WHERE codigo=?").bind(codigo),
          env.DB.prepare("DELETE FROM campus_correo_tokens WHERE codigo=?").bind(codigo));
      }
    }
    statements.push(env.DB.prepare("INSERT INTO campus_auditoria(accion,detalle) VALUES(?,?)")
      .bind("alumno_" + action, JSON.stringify({codigo, activo: result.activo, retirado: result.retirado})));
    try {
      await env.DB.batch(statements);
    } catch (error) {
      if (/UNIQUE|constraint/i.test(error.message || "")) throw new Problem("Código, DNI o correo ya registrado, o datos incompatibles. Revisa la ficha.", 409);
      throw error;
    }
    return { ok: true, ...result };
  }

  return { ready, manage };
}
