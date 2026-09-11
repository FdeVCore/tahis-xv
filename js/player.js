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

  // Toques/clics/teclas: son los gestos que CUALQUIER navegador acepta
  // para desbloquear el audio (PC y celular).
  const gestosReales = ["pointerdown", "touchstart", "click", "keydown"];
  // Scroll con rueda en PC también desbloquea (algunos navegadores sí lo
  // cuentan como gesto); en el celular no, pero igual lo intentamos.
  const gestosScroll = ["scroll", "wheel"];

  const desbloquearScroll = () => {
    audio.muted = false;
    if (audio.paused) audio.play().catch(() => {});
    alCambiarEstado();
  };

  const desbloquearReal = () => {
    desbloquearScroll();
    gestosReales.forEach((ev) => document.removeEventListener(ev, desbloquearReal));
    gestosScroll.forEach((ev) => document.removeEventListener(ev, desbloquearScroll));
  };

  // El primer gesto real (toque/clic/tecla) desbloquea y ahí sí nos
  // desarmamos ("once: true").
  gestosReales.forEach((ev) =>
    document.addEventListener(ev, desbloquearReal, { once: true, passive: true })
  );

  // Scroll/wheel desbloquea pero NO remueve a los listeners de toque:
  // así, si el scroll en el celular no alcanza para desbloquear, el
  // primer toque de la persona vuelve a intentarlo (ese era el bug: el
  // scroll "gastaba" el gesto y después los toques no hacían nada).
  gestosScroll.forEach((ev) =>
    document.addEventListener(ev, desbloquearScroll, { passive: true })
  );
}
