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
   primer toque/clic/tecla que la persona haga, sin que tenga que
   tocar el botón de play. El scroll no cuenta como gesto (ver abajo).
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

  iniciarAutoplayMuteadoConDesmuteoAlPrimerToque(audio, marcarEstado, document.getElementById("audioNudge"));
}

/**
 * Arranca la canción muteada apenas carga la página (el navegador sí lo
 * permite) y le saca el mute en el instante del PRIMER GESTO REAL:
 * tocar, hacer clic o apretar una tecla.
 *
 * IMPORTANTE (no se puede evitar): el scroll/rueda no es un gesto que
 * los navegadores acepten para activar sonido. En el celular, eso no es
 * problema: empezar a scrollear siempre implica tocar la pantalla, y ese
 * toque ya desbloquea. En la PC, mover la rueda solo no basta: hace
 * falta un clic o una tecla.
 */
function iniciarAutoplayMuteadoConDesmuteoAlPrimerToque(audio, alCambiarEstado, aviso) {
  // Si el sonido sigue bloqueado unos segundos, mostramos un aviso para
  // que la persona sepa que un solo toque activa la música (en iPhone
  // el scroll NO desbloquea, solo el tap).
  const esconderAviso = () => {
    if (aviso && !aviso.hidden) aviso.hidden = true;
  };
  if (aviso) {
    setTimeout(() => {
      if (audio.muted) aviso.hidden = false;
    }, 2500);
  }

  audio.muted = true;
  audio.play().catch(() => {
    /* Incluso muteado algunos navegadores/in-app se niegan; el primer
       gesto real de abajo lo reanuda. */
  });

  // Únicos gestos que desbloquean audio según la política de los
  // navegadores (Chrome / Safari / WhatsApp / Instagram).
  const gestos = ["keydown", "mousedown", "pointerdown", "pointerup", "touchend", "click"];

  const dejarDeEscuchar = () => {
    gestos.forEach((ev) => document.removeEventListener(ev, intentarDesbloquear));
  };

  const intentarDesbloquear = () => {
    audio.muted = false;

    if (!audio.paused) {
      // Ya estaba sonando (solo muteada): con este gesto real el
      // navegador considera la interacción válida y se oye.
      alCambiarEstado();
      esconderAviso();
      dejarDeEscuchar();
      return;
    }

    // Estaba pausada/blockeada: el play() dentro de este gesto real
    // sí está permitido. Solo nos desarmamos cuando el play tuvo éxito;
    // si un navegador rechaza el primer intento, el próximo gesto
    // vuelve a intentar.
    audio
      .play()
      .then(() => {
        alCambiarEstado();
        esconderAviso();
        dejarDeEscuchar();
      })
      .catch(() => {});
  };

  gestos.forEach((ev) => document.addEventListener(ev, intentarDesbloquear, { passive: true }));
}
