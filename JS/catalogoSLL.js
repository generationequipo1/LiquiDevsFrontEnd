/* referencias dom */
const containerCards = document.getElementById("container-cards-fijas");
const inputBusqueda = document.getElementById("input-busqueda");
const filtroSabor = document.getElementById("filtro-sabor");
const ordenPrecio = document.getElementById("orden-precio");

/* carrito y localstorage */
let carrito = JSON.parse(localStorage.getItem("carritoHelados")) || [];

/* al cargar la pag */
document.addEventListener("DOMContentLoaded", () => {
  if (!containerCards) {
    console.error("❌ falta el contenedor de cards");
    return;
  }

  if (!Array.isArray(productos)) {
    console.error("❌ el array de productos no existe");
    return;
  }

  generarFiltrosSabores(productos);
  renderizarProductos(productos);

  // listeners de los filtros
  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", aplicarFiltros);
  }

  if (filtroSabor) {
    filtroSabor.addEventListener("change", aplicarFiltros);
  }

  if (ordenPrecio) {
    ordenPrecio.addEventListener("change", aplicarFiltros);
  }
});

/* funcion para filtrar todo */
function aplicarFiltros() {
  let lista = [...productos];

  const texto = inputBusqueda
    ? inputBusqueda.value.trim().toLowerCase()
    : "";

  const sabor = filtroSabor ? filtroSabor.value : "todos";
  const orden = ordenPrecio ? ordenPrecio.value : "";

  // por nombre
  if (texto !== "") {
    lista = lista.filter(p =>
      p.nombre.toLowerCase().includes(texto)
    );
  }

  // por sabor
  if (sabor !== "todos") {
    lista = lista.filter(p =>
      Array.isArray(p.sabores) && p.sabores.includes(sabor)
    );
  }

  // por precio
  if (orden === "menor") {
    lista.sort((a, b) => a.precio - b.precio);
  }

  if (orden === "mayor") {
    lista.sort((a, b) => b.precio - a.precio);
  }

  renderizarProductos(lista);
}

/* pintar las cards en el html */
function renderizarProductos(lista) {
  containerCards.innerHTML = "";

  if (!lista.length) {
    containerCards.innerHTML = "<p>No se encontraron productos</p>";
    return;
  }

  lista.forEach(producto => {
    const card = document.createElement("div");
    card.className = "card3";

    card.innerHTML = `
      <div class="img-wrapper">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
      </div>

      <h4 class="titulo-sabor2">${producto.nombre}</h4>
      <p class="precio2">$${producto.precio.toLocaleString("es-CO")}</p>

      <button
        class="btn-compra-animado add-cart-btn"
        data-id="${producto.id}"
        data-name="${producto.nombre}"
        data-price="${producto.precio}">
        Agregar
      </button>
    `;

    containerCards.appendChild(card);
  });
}

/* escuchar clicks en botones de compra */
document.addEventListener("click", e => {
  const btn = e.target.closest(".add-cart-btn");
  if (!btn) return;

  const producto = {
    id: btn.dataset.id,
    nombre: btn.dataset.name,
    precio: Number(btn.dataset.price)
  };

  agregarAlCarrito(producto);
});

/* logica del carrito */
function agregarAlCarrito(producto) {
  const existente = carrito.find(p => p.id === producto.id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carritoHelados", JSON.stringify(carrito));
  console.log("🛒 carrito al día:", carrito);
}

/* armar el select de sabores solo con los que hay */
function generarFiltrosSabores(productos) {
  if (!filtroSabor) return;

  const sabores = new Set();

  productos.forEach(p => {
    if (Array.isArray(p.sabores)) {
      p.sabores.forEach(s => sabores.add(s));
    }
  });

  filtroSabor.innerHTML = `<option value="todos">Todos los sabores</option>`;

  sabores.forEach(sabor => {
    const opt = document.createElement("option");
    opt.value = sabor;
    opt.textContent = sabor.charAt(0).toUpperCase() + sabor.slice(1);
    filtroSabor.appendChild(opt);
  });
}