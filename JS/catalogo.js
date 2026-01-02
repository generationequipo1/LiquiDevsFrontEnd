const contenedor = document.getElementById("catalogo");
const btnEmociones = document.getElementById("btn-emociones");
const btnTodo = document.getElementById("btn-todo");
const boxEmociones = document.getElementById("box-emociones");

function pintarProductos(lista) {
  contenedor.innerHTML = "";

  lista.forEach(p => {
    contenedor.innerHTML += `
      <div class="card3">
        <img src="${p.imagen}" class="img2">
        <div class="card-interna-texto">
          <h4 class="titulo-sabor2">${p.nombre}</h4>
          <p class="descripcion2">${p.descripcion}</p>
          <p class="precio2">$${p.precio.toLocaleString("es-CO")}</p>
          <button class="add-cart-btn"
            data-id="${p.id}"
            data-name="${p.nombre}"
            data-price="${p.precio}"
            data-img="${p.imagen}">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  pintarProductos(productos);
});

btnEmociones.addEventListener("click", () => {
  boxEmociones.style.display =
    boxEmociones.style.display === "none" ? "flex" : "none";
});

btnTodo.addEventListener("click", () => {
  boxEmociones.style.display = "none";
  pintarProductos(productos);
});

document.querySelectorAll(".card-emocion").forEach(card => {
  card.addEventListener("click", () => {
    const emocion = card.dataset.emocion;
    const filtrados = productos.filter(p => p.emocion === emocion);
    pintarProductos(filtrados);
  });
});
