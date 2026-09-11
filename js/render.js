/* ============================================================
   RENDER.JS
   Vuelca los datos de CONFIG (config.js) dentro del HTML.
   Así, todo el contenido personalizable vive en un solo lugar
   y este archivo solo se encarga de "pintarlo" en la página.
   ============================================================ */

/**
 * Escribe texto en un elemento si este existe en la página.
 * Evita errores cuando una función se llama en una página que
 * no tiene ese elemento (por ejemplo, index.html no tiene
 * las secciones de invitacion.html).
 */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null && value !== "") {
    el.textContent = value;
  }
}

function setHref(id, value) {
  const el = document.getElementById(id);
  if (el && value) {
    el.href = value;
  }
}

/** Renderiza el contenido específico de index.html (el "pase"). */
function renderPase() {
  setText("nombre", CONFIG.nombre);
  setText("tituloEvento", CONFIG.tituloEvento);
  setText("fechaDisplay", `${CONFIG.fechaDia}.${mesANumero(CONFIG.fechaMes)}.${CONFIG.fechaAnio}`);
  setText("mensajeReserva", CONFIG.mensajeReserva);
}

/** Convierte el nombre de un mes a dos dígitos, para mostrar dd.mm.aaaa */
function mesANumero(nombreMes) {
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  const index = meses.indexOf((nombreMes || "").toLowerCase());
  return index === -1 ? "00" : String(index + 1).padStart(2, "0");
}

/** Renderiza el contenido específico de invitacion.html (todas las secciones). */
function renderInvitacion() {
  // Hero
  setText("nombre", CONFIG.nombre);
  setText("mensajeBienvenida", CONFIG.mensajeBienvenida);
  renderInsignia();

  // Cuándo
  setText("fechaDia", CONFIG.fechaDia);
  setText("fechaMes", CONFIG.fechaMes);
  setText("fechaAnio", CONFIG.fechaAnio);
  setText("diaYHorario", CONFIG.diaYHorario);

  // Dónde
  setText("nombreLugar", CONFIG.ubicacion.nombreLugar);
  setText("direccion", CONFIG.ubicacion.direccion);
  setHref("mapsLink", CONFIG.ubicacion.mapsUrl);

  // Vestimenta
  setText("vestimentaTitulo", CONFIG.vestimenta.titulo);
  setText("vestimentaTexto", CONFIG.vestimenta.texto);

  // Regalos
  setText("regalosTitulo", CONFIG.regalos.titulo);
  setText("regalosTexto", CONFIG.regalos.texto);
  renderDatosRegalo();

  // Confirmación
  renderConfirmacion();

  // Crédito del pie de página (opcional)
  renderCredito();
}

/**
 * Muestra la insignia (emoji) arriba del hero y arriba de la tarjeta
 * blanca, en el mismo lugar donde el diseño original tenía la corona.
 * Si CONFIG.insignia está vacío, no se muestra nada en ninguno de los
 * dos lugares.
 */
function renderInsignia() {
  ["insigniaHero", "insigniaArco"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!CONFIG.insignia) {
      el.hidden = true;
      return;
    }
    el.textContent = CONFIG.insignia;
  });
}

/**
 * Muestra los datos bancarios solo si fueron completados en config.js.
 * Cada fila (banco / número / titular) se oculta de forma individual
 * si su valor viene vacío, en vez de ocultar todo el bloque.
 */
function renderDatosRegalo() {
  const { banco, numeroCuenta, titular } = CONFIG.regalos;
  const bloque = document.getElementById("datosRegaloBloque");
  if (!bloque) return;

  if (!banco && !numeroCuenta && !titular) {
    bloque.hidden = true;
    return;
  }

  rellenarFilaODescartar("regaloBanco", banco);
  rellenarFilaODescartar("regaloNumero", numeroCuenta);
  rellenarFilaODescartar("regaloTitular", titular);
}

/** Completa un <dd> con su valor, o esconde el <dt>+<dd> si viene vacío. */
function rellenarFilaODescartar(id, valor) {
  const dd = document.getElementById(id);
  if (!dd) return;

  if (!valor) {
    const dt = dd.previousElementSibling;
    if (dt) dt.hidden = true;
    dd.hidden = true;
    return;
  }

  dd.textContent = valor;
}

/**
 * Muestra la sección "Confirmar" solo si en config.js se cargó un link
 * de formulario válido (no vacío ni el placeholder). Sin formulario, la
 * sección no se pinta porque no habría forma de confirmar.
 */
function renderConfirmacion() {
  const seccion = document.getElementById("rsvp");
  if (!seccion) return;

  const url = CONFIG.confirmacion.formUrl || "";
  const esPlaceholder = url === "https://forms.gle/";
  if (!url || esPlaceholder) {
    seccion.hidden = true;
    return;
  }

  setText("confirmacionTitulo", CONFIG.confirmacion.titulo);
  setText("confirmacionTexto", CONFIG.confirmacion.texto);
  setText("fechaLimite", CONFIG.confirmacion.fechaLimite);
  setHref("rsvpBoton", url);
}

/** Muestra el crédito del pie solo si se configuró texto y url. */
function renderCredito() {
  const footer = document.getElementById("siteFooter");
  if (!footer) return;

  if (!CONFIG.credito.texto) {
    footer.hidden = true;
    return;
  }

  setText("creditoTexto", CONFIG.credito.texto);
  setHref("creditoLink", CONFIG.credito.url);
}
