#!/usr/bin/env python3
"""
Genera images/og-image.jpg (1200x630), la imagen que WhatsApp usa como
vista previa al compartir el link de la invitación.

Lee los datos (nombre, título, fecha) desde js/config.js, así se puede
volver a ejecutar cada vez que cambie algo:

    python3 scripts/make-og-image.py

Requiere PIL/Pillow y las tipografías (se bajan solas la primera vez).
"""

import re
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

RAIZ = Path(__file__).resolve().parent.parent
CONFIG_JS = RAIZ / "js" / "config.js"
SALIDA = RAIZ / "images" / "og-image.jpg"
ANCHO, ALTO = 1200, 630

ROSA_TOP = (249, 201, 219)
ROSA_BOTTOM = (253, 240, 244)
MAUVE = (201, 115, 143)
ROSA_TEXT = (162, 72, 100)
AZUL = (48, 66, 84)

FUENTE_SCRIPT = "GreatVibes-Regular.ttf"
FUENTE_SANS = "Poppins-SemiBold.ttf"
FUENTES_URLS = {
    FUENTE_SCRIPT: "https://github.com/google/fonts/raw/main/ofl/greatvibes/GreatVibes-Regular.ttf",
    FUENTE_SANS: "https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-SemiBold.ttf",
}


def valor_config(clave):
    texto = CONFIG_JS.read_text(encoding="utf-8")
    m = re.search(rf'{clave}\s*:\s*"([^"]*)"', texto)
    return m.group(1) if m else ""


def fuente(nombre, tamano):
    destino = RAIZ / "scripts" / nombre
    if not destino.exists():
        subprocess.run(["curl", "-sL", "-o", str(destino), FUENTES_URLS[nombre]], check=True)
    return ImageFont.truetype(str(destino), tamano)


def fondo():
    img = Image.new("RGB", (ANCHO, ALTO))
    p = ImageDraw.Draw(img)
    for y in range(ALTO):
        t = y / ALTO
        color = tuple(round(a + (b - a) * t) for a, b in zip(ROSA_TOP, ROSA_BOTTOM))
        p.line([(0, y), (ANCHO, y)], fill=color)
    return img


def textocentrado(d, texto, font, color, y):
    caja = d.textbbox((0, 0), texto, font=font)
    w = caja[2] - caja[0]
    d.text(((ANCHO - w) / 2 - caja[0], y), texto, font=font, fill=color)


def main():
    nombre = valor_config("nombre")
    titulo = valor_config("tituloEvento")
    dia = valor_config("fechaDia")
    mes = valor_config("fechaMes")
    anio = valor_config("fechaAnio")
    fecha = f"{dia}.{mes}.{anio}"

    img = fondo()

    confeti = Image.open(RAIZ / "images" / "decorativo" / "confetti-dorado.png").convert("RGBA")

    arriba = confeti.resize((300, 292), Image.LANCZOS).rotate(-15, expand=True)
    img.paste(arriba, (ANCHO - 320, 10), arriba)

    abajo = confeti.resize((200, 195), Image.LANCZOS).rotate(200, expand=True)
    img.paste(abajo, (6, ALTO - 230), abajo)

    p = ImageDraw.Draw(img)
    textocentrado(p, nombre, fuente(FUENTE_SCRIPT, 205), ROSA_TEXT, 120)
    textocentrado(p, titulo, fuente(FUENTE_SCRIPT, 105), MAUVE, 360)
    textocentrado(p, fecha, fuente(FUENTE_SANS, 50), AZUL, 505)

    img = img.filter(ImageFilter.SMOOTH)
    img.save(SALIDA, "JPEG", quality=88)
    print(f"OK -> {SALIDA.relative_to(RAIZ)} ({SALIDA.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()