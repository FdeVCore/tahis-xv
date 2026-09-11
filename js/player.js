/* ============================================================
   PLAYER.JS
   Reproductor de música de fondo, opcional. Si CONFIG.musica.src
   está vacío, el bloque completo permanece oculto (ver el atributo
   "hidden" en invitacion.html) y esta función no hace nada.

   IMPORTANTE sobre el autoplay: ningún navegador (Chrome, Safari,
   el navegador interno de WhatsApp/Instagram) permite que una página
   arranque sonido SIN que la persona haya tocado la pantalla todavía;
   es una política de seguridad del navegador, no algo que se pueda
   evitar con código. Lo más parecido a "suena solo" que se puede
   lograr es: arrancar la canción muteada apenas carga la página (eso
   sí está permitido) y activarle el sonido automáticamente en el
   primerísimo toque/scroll/tecla que la persona haga en la pantalla,
   sin que tenga que tocar el botón de play.
   ============================================================ */

function iniciarReproductor() {
  const contenedor = document.getElementById("reproductor");
  if (!contenedor || !CONFIG.musica || !CONFIG.musica.src) return;

  const audio = document.getElementById("audioElemento");
  const botonPlay = document.getElementById("playerPlay");
  const botonPause = document.getElementById("playerPause");
  const barra = document.getElementById("playerBar");

  audio.src = CONFIG.musica.src;
  contenedor.hidden = false;

  function marcarEstado() {
    botonPlay.classList.toggle("is-active", !audio.paused && !audio.muted);
    botonPause.classList.toggle("is-active", audio.paused || audio.muted);
  }

  botonPlay.addEventListener("click", () => {
    audio.muted = false;
    audio.play().then(marcarEstado).catch(() => {});
  });

  botonPause.addEventListener("click", () => {
    audio.pause();
    marcarEstado();
  });

  audio.addEventListener("play", marcarEstado);
  audio.addEventListener("pause", marcarEstado);
  audio.addEventListener("volumechange", marcarEstado);

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    barra.value = (audio.currentTime / audio.duration) * 100;
  });

  barra.addEventListener("input", () => {
    if (!audio.duration) return;
    audio.currentTime = (barra.value / 100) * audio.duration;
  });

  iniciarAutoplayMuteadoConDesmuteoAlPrimerToque(audio, marcarEstado);
}

/**
 * Arranca la canción muteada apenas carga la página (el navegador sí
 * lo permite) y le saca el mute en el instante en que la persona hace
 * el primer click, touch, tecla o scroll en cualquier parte de la
 * página. El resultado: la música ya está sonando (en silencio) desde
 * antes, y el sonido se activa con la primera interacción, sin que
 * haga falta tocar el botón de play.
 */
function iniciarAutoplayMuteadoConDesmuteoAlPrimerToque(audio, alCambiarEstado) {
  audio.muted = true;
  audio.play().then(alCambiarEstado).catch(() => {
    /* Incluso muteado algún navegador puede negarse; en ese caso el
       primer gesto de abajo también dispara el play(). */
  });

  const eventos = ["pointerdown", "touchstart", "keydown", "scroll", "wheel"];
  const activarSonido = () => {
    audio.muted = false;
    if (audio.paused) audio.play().catch(() => {});
    alCambiarEstado();
    eventos.forEach((ev) => document.removeEventListener(ev, activarSonido));
  };
  eventos.forEach((ev) => document.addEventListener(ev, activarSonido, { once: true, passive: true }));
}
