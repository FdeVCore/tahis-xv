/* ============================================================
   REVEAL.JS
   Anima con un fundido + deslizamiento los elementos marcados
   con la clase ".reveal" a medida que entran en pantalla,
   usando IntersectionObserver (liviano, sin librerías externas).
   ============================================================ */

function iniciarAnimacionesScroll() {
  const elementos = document.querySelectorAll(".reveal");
  if (!elementos.length) return;

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elementos.forEach((el) => observer.observe(el));
}

/** Copia al portapapeles el número de cuenta de la sección "Regalos". */
function iniciarBotonCopiar() {
  const boton = document.getElementById("copiarDatosRegalo");
  if (!boton) return;

  boton.addEventListener("click", async () => {
    const numero = document.getElementById("regaloNumero")?.textContent || "";
    try {
      await navigator.clipboard.writeText(numero);
      const textoOriginal = boton.textContent;
      boton.textContent = "¡Copiado!";
      setTimeout(() => (boton.textContent = textoOriginal), 1800);
    } catch (error) {
      console.warn("No se pudo copiar automáticamente:", error);
    }
  });
}
