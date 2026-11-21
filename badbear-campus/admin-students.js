export function setupStudents({ $, call, post, message, action, getToken, reload, getStudents, table }) {
  let serviceReady = true;
  let creating = false;
  let selectionRevision = 0;

  function accessLabel(student) {
    if (student.retirado_en) return "Retirado";
    return student.activo ? "Acceso permitido" : "Acceso bloqueado";
  }

  function renderList() {
    const query = $("manage-search").value.trim().toLocaleLowerCase("es");
    const showRetired = $("manage-show-retired").checked;
    const students = getStudents();
    const filtered = students.filter(student =>
      (showRetired || !student.retirado_en) &&
      [student.codigo, student.nombre, student.correo || ""].join(" ").toLocaleLowerCase("es").includes(query));
    $("manage-total").textContent = filtered.length + " alumnos encontrados de " + students.length + " registrados.";
    const wrap = table([
      {key:"nombre",label:"Apellidos y nombres"}, {key:"codigo",label:"Código"},
      {key:"correo",label:"Correo"}, {key:"acceso",label:"Acceso"}
    ], filtered.map(student => ({...student, acceso:accessLabel(student)})), "Padrón de alumnos");
    const header = document.createElement("th");
    header.scope = "col";
    header.textContent = "Acción";
    wrap.querySelector("thead tr").append(header);
    wrap.querySelectorAll("tbody tr").forEach((row, index) => {
      const student = filtered[index];
      const cell = document.createElement("td");
      const edit = document.createElement("button");
      edit.type = "button";
      edit.className = "secondary";
      edit.textContent = "Editar";
      edit.setAttribute("aria-label", "Editar a " + student.nombre);
      edit.addEventListener("click", () => {
        $("manage-student").value = student.codigo;
        action(show);
      });
      const nameButton = document.createElement("button");
      nameButton.type = "button";
      nameButton.className = "student-name-edit";
      nameButton.textContent = student.nombre;
      nameButton.setAttribute("aria-label", "Modificar datos de " + student.nombre);
      nameButton.addEventListener("click", () => {
        $("manage-student").value = student.codigo;
        action(show);
      });
      row.children[0].replaceChildren(nameButton);
      cell.append(edit);
      row.append(cell);
    });
    $("manage-list").replaceChildren(wrap);
  }

  function render(ready = true) {
    serviceReady = ready;
    $("manage-service-status").hidden = ready;
    const previous = $("manage-student").value;
    const select = $("manage-student");
    select.replaceChildren(new Option("Seleccionar alumno", ""));
    for (const student of getStudents()) select.append(new Option(student.nombre + " · " + student.codigo + " · " + accessLabel(student), student.codigo));
    if (getStudents().some(student => student.codigo === previous)) select.value = previous;
    renderList();
  }

  function fill(student) {
    $("manage-form").reset();
    $("manage-code").readOnly = !creating;
    $("manage-code").value = student?.codigo || "";
    $("manage-name").value = student?.nombre || "";
    $("manage-email").value = student?.correo || "";
    $("manage-dni").value = student?.dni || "";
    $("manage-phone").value = student?.celular || "";
    $("manage-new-access-label").hidden = !creating;
    $("manage-new-access").checked = true;
    $("manage-save").textContent = creating ? "Agregar alumno" : "Guardar cambios";
    $("manage-access").hidden = creating || Boolean(student?.retirado_en);
    $("manage-access").textContent = student?.activo ? "Bloquear acceso" : "Habilitar acceso";
    $("manage-retire").hidden = creating || Boolean(student?.retirado_en);
    $("manage-restore").hidden = creating || !student?.retirado_en;
    $("manage-status").textContent = creating ? "Nueva ficha" : accessLabel(student);
    $("manage-form").hidden = false;
    for (const id of ["manage-name", "manage-email", "manage-dni", "manage-phone"]) {
      $(id).readOnly = false;
      $(id).disabled = false;
    }
  }

  async function show() {
    const revision = ++selectionRevision;
    const student = getStudents().find(student => student.codigo === $("manage-student").value);
    creating = false;
    $("manage-form").hidden = !student;
    $("manage-grades").hidden = true;
    if (!student) return;
    fill(student);
    $("manage-form").scrollIntoView({block:"start", behavior:"smooth"});
    $("manage-name").focus({preventScroll:true});
    $("manage-grade-list").replaceChildren();
    try {
      const grades = await call("/api/admin/notas?codigo=" + encodeURIComponent(student.codigo), getToken());
      if (revision !== selectionRevision) return;
      $("manage-grades").hidden = false;
      if (!grades.items.length) $("manage-grade-list").textContent = "Sin evaluaciones publicadas.";
      for (const grade of grades.items) {
        const line = document.createElement("div");
        line.className = "student-grade";
        const title = document.createElement("strong");
        title.textContent = grade.curso + " · " + grade.periodo + " · " + grade.evaluacion;
        const input = document.createElement("input");
        input.type = "number"; input.min = "0"; input.max = "20"; input.step = "0.01";
        input.value = grade.nota ?? "";
        input.setAttribute("aria-label", "Nota de " + grade.evaluacion);
        const date = document.createElement("input");
        date.type = "date"; date.value = grade.fecha;
        date.setAttribute("aria-label", "Fecha de " + grade.evaluacion);
        const save = document.createElement("button");
        save.type = "button"; save.textContent = "Guardar nota";
        save.addEventListener("click", () => action(async () => {
          if (!confirm("¿Confirmas corregir esta nota?")) return;
          await post("/api/admin/nota/editar", getToken(), {codigo:student.codigo,curso:grade.curso,periodo:grade.periodo,evaluacion:grade.evaluacion,nota:input.value,fecha:date.value});
          message("Nota actualizada.", "success");
        }));
        line.append(title, input, date, save);
        $("manage-grade-list").append(line);
      }
    } catch (error) {
      if (error.status === 401) throw error;
      if (revision !== selectionRevision) return;
      $("manage-grades").hidden = false;
      $("manage-grade-list").textContent = "Las notas no pudieron cargarse. Puedes continuar editando la ficha. " + error.message;
    }
  }

  function requireService() {
    if (!serviceReady) throw Error("Falta actualizar el servicio de Campus. Ejecuta badbear-campus/Actualizar-Campus.ps1 para habilitar estos cambios.");
  }

  async function changeAccess(operation, payload, prompt, success) {
    const student = getStudents().find(student => student.codigo === $("manage-student").value);
    if (!student || creating) throw Error("Selecciona un alumno registrado.");
    if (!confirm(prompt + "\n" + student.nombre + " · " + student.codigo)) return;
    requireService();
    await post("/api/admin/alumnos/" + operation, getToken(), {codigo:student.codigo,...payload});
    await reload();
    $("manage-student").value = student.codigo;
    await show();
    message(success, "success");
  }

  function clear() {
    selectionRevision++;
    creating = false;
    $("manage-form").reset();
    $("manage-form").hidden = true;
    $("manage-grades").hidden = true;
    $("manage-list").replaceChildren();
    $("manage-student").replaceChildren(new Option("Seleccionar alumno", ""));
    $("manage-total").textContent = "";
  }

  for (const [button, field] of [["manage-clear-name","manage-name"],["manage-clear-email","manage-email"],["manage-clear-dni","manage-dni"],["manage-clear-phone","manage-phone"]]) {
    $(button).addEventListener("click", () => {
      $(field).value = "";
      $(field).focus();
      $("manage-status").textContent = "Cambio pendiente. Completa la ficha y pulsa Guardar cambios.";
    });
  }

  $("manage-add").addEventListener("click", () => {
    selectionRevision++;
    creating = true;
    $("manage-student").value = "";
    $("manage-grades").hidden = true;
    fill(null);
    $("manage-form").scrollIntoView({block:"start",behavior:"smooth"});
    $("manage-code").focus();
  });
  $("manage-cancel").addEventListener("click", () => {selectionRevision++;creating=false;$("manage-form").hidden=true;$("manage-grades").hidden=true;$("manage-student").value="";});
  $("manage-search").addEventListener("input", renderList);
  $("manage-show-retired").addEventListener("change", renderList);
  $("manage-student").addEventListener("change", () => action(show));
  $("manage-form").addEventListener("submit", event => {
    event.preventDefault();
    action(async () => {
      const item = {codigo:$("manage-code").value,nombre:$("manage-name").value,correo:$("manage-email").value,dni:$("manage-dni").value,celular:$("manage-phone").value};
      const wasCreating = creating;
      if (wasCreating) item.activo = $("manage-new-access").checked;
      if (serviceReady) {
        await post(wasCreating ? "/api/admin/alumnos/crear" : "/api/admin/alumnos/ficha", getToken(), item);
      } else {
        if (wasCreating && !item.activo) requireService();
        try {
          await post("/api/admin/alumnos/importar", getToken(), {items:[{
            codigo:item.codigo, nombre:item.nombre, correo:item.correo, dni:item.dni, telefono:item.celular
          }]});
        } catch (error) {
          if (error.status === 404) throw Error("El servicio de Campus necesita actualizarse para guardar esta ficha. Tus cambios siguen en el formulario.");
          throw error;
        }
      }
      await reload();
      $("manage-student").value = item.codigo.trim().toUpperCase();
      await show();
      message(wasCreating ? "Alumno agregado." : "Ficha actualizada.", "success");
    });
  });
  $("manage-access").addEventListener("click", () => action(async () => {
    const student = getStudents().find(student => student.codigo === $("manage-student").value);
    if (!student) throw Error("Selecciona un alumno.");
    const enable = !student.activo;
    await changeAccess("acceso", {activo:enable}, enable ? "¿Permitir el acceso de este alumno?" : "¿Bloquear el acceso y cerrar las sesiones de este alumno?", enable ? "Acceso habilitado." : "Acceso bloqueado y sesiones cerradas.");
  }));
  $("manage-retire").addEventListener("click", () => action(() => changeAccess("retirar", {}, "¿Retirar a este alumno del padrón? Su acceso se bloqueará. Su ficha y sus notas quedarán disponibles en Ver retirados.", "Alumno retirado del padrón.")));
  $("manage-restore").addEventListener("click", () => action(() => changeAccess("restaurar", {}, "¿Restaurar la ficha de este alumno al padrón? Después podrás habilitar su acceso.", "Ficha restaurada. Acceso bloqueado hasta que lo habilites.")));
  return {render,clear};
}
