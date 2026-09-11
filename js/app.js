/* ============================================================
   APP.JS
   Punto de entrada: detecta en qué página estamos y ejecuta
   las funciones correspondientes (definidas en render.js,
   countdown.js y reveal.js).
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const pagina = document.body.dataset.page;

  if (pagina === "pase") {
    renderPase();
  }

  if (pagina === "invitacion") {
    renderInvitacion();
    iniciarCuentaRegresiva();
    iniciarBotonCopiar();
    iniciarReproductor();
  }

  iniciarAnimacionesScroll();
});
