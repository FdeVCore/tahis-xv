/* ============================================================
   COUNTDOWN.JS
   Cuenta regresiva en vivo hasta la fecha del evento definida
   en CONFIG.fechaEventoISO (config.js). Se usa en la sección
   "Cuándo" de invitacion.html.
   ============================================================ */

function iniciarCuentaRegresiva() {
  const contenedor = document.getElementById("countdown");
  if (!contenedor) return; // Esta página no tiene cuenta regresiva

  const fechaObjetivo = new Date(CONFIG.fechaEventoISO).getTime();
  if (Number.isNaN(fechaObjetivo)) return;

  const elementos = {
    dias: document.getElementById("cdDias"),
    horas: document.getElementById("cdHoras"),
    minutos: document.getElementById("cdMinutos"),
    segundos: document.getElementById("cdSegundos"),
  };

  function actualizar() {
    const ahora = Date.now();
    const restante = fechaObjetivo - ahora;

    if (restante <= 0) {
      contenedor.innerHTML = '<p class="section__text">¡Hoy es el gran día! 🎉</p>';
      clearInterval(intervalo);
      return;
    }

    const segundoMs = 1000;
    const minutoMs = segundoMs * 60;
    const horaMs = minutoMs * 60;
    const diaMs = horaMs * 24;

    const dias = Math.floor(restante / diaMs);
    const horas = Math.floor((restante % diaMs) / horaMs);
    const minutos = Math.floor((restante % horaMs) / minutoMs);
    const segundos = Math.floor((restante % minutoMs) / segundoMs);

    elementos.dias.textContent = String(dias).padStart(2, "0");
    elementos.horas.textContent = String(horas).padStart(2, "0");
    elementos.minutos.textContent = String(minutos).padStart(2, "0");
    elementos.segundos.textContent = String(segundos).padStart(2, "0");
  }

  actualizar();
  const intervalo = setInterval(actualizar, 1000);
}
