(() => {
  "use strict";

  const chapter = document.querySelector(".thoracic-chapter");
  const navigation = document.querySelector(".top-links");
  if (!chapter || !navigation || typeof HTMLDialogElement === "undefined") return;

  const sections = [...chapter.querySelectorAll(":scope > section[id]")];
  if (!sections.length) return;

  function element(tag, text, className) {
    const node = document.createElement(tag);
    node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function button(text, action, className) {
    const node = element("button", text, className);
    node.type = "button";
    node.addEventListener("click", action);
    return node;
  }

  const dialog = element("dialog", "", "chapter-print-dialog");
  dialog.setAttribute("aria-labelledby", "chapter-print-heading");
  const title = element("h2", "Imprimir o guardar en PDF");
  title.id = "chapter-print-heading";
  const description = element("p", "Marca los apartados que quieres incluir. En la ventana de impresión, elige «Guardar como PDF» para descargar el documento.");
  const tools = element("div", "", "chapter-print-actions");
  const list = element("fieldset", "", "chapter-print-list");
  list.append(element("legend", "Apartados de la clase"));
  const status = element("p", "", "chapter-print-status");
  status.setAttribute("role", "status");

  const options = sections.map(section => {
    const label = element("label", "");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = section.id !== "recursos";
    checkbox.addEventListener("change", update);
    const heading = section.querySelector(":scope > h2");
    label.append(checkbox, element("span", heading?.textContent ?? section.id));
    list.append(label);
    return { section, checkbox };
  });

  const all = button("Marcar todos", () => mark(true));
  const none = button("Desmarcar todos", () => mark(false));
  const print = button("Imprimir selección", printSelection, "chapter-print-primary");
  const cancel = button("Cancelar", () => dialog.close());
  const open = button("Imprimir / PDF", () => dialog.showModal(), "chapter-print-open");
  open.setAttribute("aria-haspopup", "dialog");
  const actions = element("div", "", "chapter-print-actions");
  actions.append(cancel, print);
  tools.append(all, none);
  dialog.append(title, description, tools, list, status, actions);
  chapter.before(dialog);
  navigation.append(open);
  update();

  function update() {
    const count = options.filter(({ checkbox }) => checkbox.checked).length;
    status.textContent = `${count} de ${options.length} apartados seleccionados`;
    print.disabled = count === 0;
  }

  function mark(checked) {
    options.forEach(({ checkbox }) => { checkbox.checked = checked; });
    update();
  }

  function printSelection() {
    const selected = options.filter(({ checkbox }) => checkbox.checked);
    if (!selected.length) return;

    for (const { section, checkbox } of options) {
      section.toggleAttribute("data-print-included", checkbox.checked);
    }
    const closed = selected.flatMap(({ section }) => [...section.querySelectorAll("details:not([open])")]);
    const images = selected.flatMap(({ section }) => [...section.querySelectorAll("img[loading=lazy]")]);
    closed.forEach(detail => { detail.open = true; });
    images.forEach(image => { image.loading = "eager"; });
    document.body.classList.add("chapter-print-selection");
    open.disabled = true;
    dialog.close();

    const restore = () => {
      document.body.classList.remove("chapter-print-selection");
      open.disabled = false;
      open.focus();
      options.forEach(({ section }) => section.removeAttribute("data-print-included"));
      closed.forEach(detail => { detail.open = false; });
      images.forEach(image => { image.loading = "lazy"; });
    };

    const ready = Promise.allSettled(images.map(image => image.decode()));
    const timeout = new Promise(resolve => window.setTimeout(resolve, 1700));
    Promise.race([ready, timeout]).then(() => {
      window.addEventListener("afterprint", restore, { once: true });
      try {
        window.print();
      } catch (error) {
        window.removeEventListener("afterprint", restore);
        restore();
        throw error;
      }
    });
  }
})();
