/* ============================================================
   CONFIG.JS
   ÚNICO archivo que necesitás editar para personalizar la
   invitación con los datos reales del cumpleaños.
   Cada campo tiene un comentario explicando qué va ahí.
   ============================================================ */

const CONFIG = {
  // Nombre de la festejada (se muestra en tipografía script)
  nombre: "Tahis",

  // Título del evento (se muestra chico en el "pase")
  tituloEvento: "Mis XV",

  // Fecha y hora de INICIO del evento en formato ISO (usada para la cuenta
  // regresiva). Formato: "AAAA-MM-DDTHH:MM:SS"
  fechaEventoISO: "2027-01-09T21:00:00",

  // Cómo se muestra la fecha grande en la sección "Cuándo"
  fechaDia: "09",
  fechaMes: "Enero",
  fechaAnio: "2027",

  // Día de la semana + horario (la fiesta cruza la medianoche, por eso se
  // aclaran ambos extremos)
  diaYHorario: "Sábado | 21:00 a 04:00hs",

  // Mensaje de reserva en el "pase" (tarjeta teaser)
  mensajeReserva: "¡Guardamos un lugar para vos!",

  // Mensaje personal en la sección "Bienvenida" de la invitación completa
  // (placeholder: contame si querés un texto distinto y lo cambiamos)
  mensajeBienvenida: "Hay momentos que quedan para siempre. Me encantaría que seas parte de este día tan especial.",

  // --- Ubicación ---
  ubicacion: {
    nombreLugar: "Salón Rotary Club Progreso",
    direccion: "Av. José Artigas y Hno. Engelberto François L. Duchêne, Progreso, Canelones",
    mapsUrl:
      "https://www.google.com/maps/place/Rotary+Club+Progreso/@-34.6622431,-56.2267848,17z/data=!3m1!4b1!4m6!3m5!1s0x95a1ccc059524e2d:0xecc8185297e88331!8m2!3d-34.6622431!4d-56.2242099!16s%2Fg%2F11c384kzz9",
  },

  // --- Código de vestimenta ---
  vestimenta: {
    titulo: "Vestimenta",
    texto: "Formal. Se reservan los colores dorado y rosa para la cumpleañera.",
  },

  // --- Regalos ---
  regalos: {
    titulo: "Regalos",
    texto: "Tu presencia es el mejor regalo. Si además querés hacernos un obsequio, podés colaborar con:",
    // Dejá estos campos vacíos ("") si no querés mostrar alguno
    banco: "Prex",
    numeroCuenta: "24077851",
    titular: "Tahis Pereira",
  },

  // --- Confirmación de asistencia (RSVP) ---
  confirmacion: {
    titulo: "Confirmar",
    texto: "Por favor confirmá tu asistencia antes del",
    fechaLimite: "3 de enero de 2027",
    // ⚠️ PENDIENTE: acá va el link de tu formulario de confirmación.
    // Cómo crearlo (google.com/forms, gratis, 2 min):
    //   1) Andá a https://forms.google.com → "En blanco"
    //   2) Título: p. ej. "Confirmación de asistencia XV Tahis"
    //   3) Agregá las preguntas que quieras, p. ej.:
    //      - "Nombre y apellido" (texto)
    //      - "¿Asistís a la fiesta?" (opción múltiple: Sí / No)
    //      - "¿Cuántas personas van?" (número)
    //      - "¿Algún requisito alimentario?" (párrafo, opcional)
    //   4) Arriba a la derecha elegí el color/estilo que quieras.
    //   5) Botón "Enviar" (arriba a la derecha) → "🔗" (enlace) →
    //      "Acortar URL" para que quede igual al formato de abajo.
    //   6) Pegá ese link acá, en lugar de esto:
    formUrl: "https://forms.gle/",
    // Mientras formUrl quede vacío o en el placeholder, la sección
    // "Confirmar" de la invitación NO se muestra (ver render.js).
  },

  // --- Música de fondo (opcional) ---
  // Poné la ruta a un archivo .mp3 dentro de /audio y se muestra el
  // reproductor en el hero. Si lo dejás vacío, el reproductor no aparece.
  // Intenta sonar automáticamente al abrir la página; si el navegador
  // lo bloquea (política de autoplay), arranca apenas la persona toca
  // o hace scroll en la pantalla (ver js/player.js).
  musica: {
    // Versión comprimida (128 kbps) para que cargue rápido por datos
    // móviles. El archivo original en máxima calidad quedó guardado en
    // audio/cancion.mp3 (sin usar) por las dudas.
    src: "audio/cancion-web.mp3",
  },

  // Insignia/decoración que reemplaza a la corona original (arriba del
  // hero y arriba de la tarjeta blanca). Podés poner un emoji o dejarlo
  // vacío ("") para que no se muestre nada.
  // Placeholder temporal: Tahis pidió sacar la corona y va a indicar
  // qué ícono usar en su lugar; mientras tanto usamos un destello neutro.
  insignia: "✨",

  // --- Crédito opcional al pie de la invitación (podés dejarlo vacío) ---
  credito: {
    texto: "",
    url: "",
  },
};
