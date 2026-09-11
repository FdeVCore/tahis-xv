# Invitación XV de Tahis ✨

Invitación digital para los XV de Tahis (09 de enero de 2027, Progreso, Canelones).
Todo está hecho en HTML/CSS/JS puro: no requiere servidores ni código complicado.

**Ya está publicada en:** https://fdevcore.github.io/tahis-xv/

Para publicar un cambio: editá los archivos, y en la PC:
`git add .` → `git commit -m "mensaje"` → `git push`. En 1-2 minutos GitHub
Pages actualiza el sitio automáticamente.

## Estructura

```
index.html          → La tarjeta "pase" que se comparte por WhatsApp (el sobre con sello)
invitacion.html     → La invitación completa (hero, cuenta regresiva, dónde, regalos, confirmar)
js/config.js        → ★ ÚNICO archivo que hay que editar para personalizar todo
js/                 → render.js, countdown.js, reveal.js, player.js (no tocar)
css/                → base.css, pase.css, invitacion.css (no tocar)
images/             → imágenes decorativas + og-image.jpg (vista previa de WhatsApp)
audio/              → cancion-web.mp3 (música comprimida) y cancion.mp3 (original, sin usar)
scripts/            → make-og-image.py (regenera la imagen de vista previa si cambia algo)
```

## Cómo personalizar

Abrí `js/config.js` con cualquier editor de texto y cambiá los datos
(nombre, fecha, lugar, vestimenta, banco, etc.). Cada campo tiene un
comentario explicando qué va ahí.

## Pendiente: formulario de confirmación (RSVP)

La sección "Confirmar" de la invitación **está oculta hasta que le pongas
el link de tu formulario**. Para hacerlo:

1. Andá a **https://forms.google.com** → botón "En blanco".
2. Poné un título, p. ej. "Confirmación de asistencia XV Tahis".
3. Creá las preguntas (botón "+"), por ejemplo:
   - Nombre y apellido → texto
   - ¿Asistís a la fiesta? → opción múltiple (Sí / No)
   - ¿Cuántas personas van? → número
4. Elegí colores/estilo si querés.
5. Botón **"Enviar"** (arriba a la derecha) → pestaña **🔗 Enlace** → tildá
   **"Acortar URL"** → copiá el link (queda tipo `https://forms.gle/...`).
6. Pegalo en `js/config.js` en `confirmacion.formUrl` (reemplazando el
   placeholder). En ese momento la sección "Confirmar" aparece sola.

## Pendiente: dominio en las meta tags (vista previa de WhatsApp)

Para que WhatsApp muestre la imagen y el título al compartir, en
`index.html` e `invitacion.html` hay dos lugares con `TU-DOMINIO` que hay
que reemplazar por la URL real de la página (p. ej.
`https://tahisxv.netlify.app`). En el paso "Subir la invitación" de más
abajo vas a obtener esa URL.

## Regenerar la imagen de vista previa (opcional)

La imagen `images/og-image.jpg` se genera automáticamente con estos
datos de `config.js` (nombre, título y fecha). Si cambiás alguno, volvé a
generarla:

```bash
python3 scripts/make-og-image.py
```

La primera vez descarga las tipografías en `scripts/`. Requiere Python 3
con Pillow (`python3 -m pip install Pillow`).

## Probar en tu celular (sin subirla)

En la PC, dentro de esta carpeta:

```bash
python3 -m http.server 8000
```

y abrí `http://localhost:8000` en el navegador. Para verlo en el celular,
conectá el celular a la misma red WiFi y abrí `http://IP-de-la-pc:8000`
(la IP aparece en el nombre de la red de tu PC). El "pase" se comparte con
la dirección base, la invitación completa es `/invitacion.html`.

## Subir la invitación (para compartir el link)

### Opción más fácil: Netlify Drop (sin cuenta obligatoria)

1. Entrá a **https://app.netlify.com/drop**
2. Arrastrá esta carpeta completa al recuadro.
3. Te da una URL tipo `https://nombreelegido.netlify.app` (podés cambiarla).
4. Reemplazá `TU-DOMINIO` en `index.html` e `invitacion.html` por esa URL,
   arrastrá de nuevo la carpeta y listo.

Cada vez que cambies algo, repetí los pasos 2 y 4.

### Opción con cuenta de GitHub (Gratis, permanente)

1. Creá una cuenta/fuente de datos en **https://github.com**.
2. En la PC: `git init` en esta carpeta, `git add .`, `git commit`, creá un
   repo en GitHub y subilo (`git remote add origin ... && git push`).
3. En **https://github.com/NOMBRE/repo/settings/pages** activá GitHub Pages
   desde la rama `main` en la carpeta `/root`.
4. La URL queda `https://NOMBRE.github.io/repo/`. Reemplazá `TU-DOMINIO`
   por esa URL en los dos HTML y volvé a subir el cambio (`git push`).

### Opción con Vercel (también gratis)

1. Entrá a **https://vercel.com** → "Add New Project" → Import.
2. Conectá tu repositorio de GitHub o arrastrá la carpeta en
   https://vercel.com/new (deploy sin git).
3. Te da una URL tipo `https://tahisxv.vercel.app`. Mismo paso 4 que antes.

> Ojo: una vez que cambies `TU-DOMINIO` por la URL real, WhatsApp puede
> tardar unos minutos en mostrar la nueva vista previa (el cache se
> actualiza solo; si quiere verlo de inmediato se usa
> https://developers.facebook.com/tools/debug/sharing con esa URL).

## Checklist antes de compartir

- [ ] Link del Google Form pegado en `config.js` → la sección "Confirmar" aparece
- [ ] `TU-DOMINIO` reemplazado por la URL real en los dos HTML
- [ ] Vista previa probada (abrir el link en WhatsApp y ver que salga la imagen)
- [ ] Reproducir `cancion-web.mp3` para confirmar que es la canción correcta