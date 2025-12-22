document.addEventListener("DOMContentLoaded", () => {

  
  if (typeof productos === "undefined") {
    console.error("productos.js no está cargado");
    return;
  }

  const contenedor = document.querySelector(".grupo2");
  if (!contenedor) {
    console.warn("No se encontró .grupo2");
    return;
  }

  // filtrar destacados
  const destacados = productos.filter(p => p.destacado === true);

  if (destacados.length === 0) {
    contenedor.innerHTML = `
      <p class="text-center text-muted">
        No hay productos destacados
      </p>`;
    return;
  }

  contenedor.innerHTML = "";

  destacados.forEach(producto => {
    contenedor.innerHTML += `
      <div class="card3">
        <img src="${producto.imagen}" class="img2" alt="${producto.nombre}">
        <div class="card-interna-texto">
          <h4 class="titulo-sabor2">${producto.nombre}</h4>
          <p class="descripcion2">${producto.descripcion}</p>
          <p class="precio2">$${producto.precio.toLocaleString("es-CO")}</p>
          <button 
            class="add-cart-btn"
            data-id="${producto.id}">
            Agregar
          </button>
        </div>
      </div>
    `;
  });

});
