document.addEventListener("DOMContentLoaded", () => {
  const carritoContainer = document.getElementById("carrito-placeholder");

  if (carritoContainer) {
    fetch("../Componentes/carrito.html", { cache: "no-store" })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        carritoContainer.innerHTML = html;
        // Aquí ya existe el HTML del carrito en el DOM:
        // puedes llamar a funciones que dependan de esos IDs si hace falta.
        if (typeof mostrarCarrito === "function") {
          mostrarCarrito();
          actualizarTotalCarrito();
          actualizarContadorCarrito();
        }
      })
      .catch(error => console.error("Error cargando el carrito:", error));
  }
});
