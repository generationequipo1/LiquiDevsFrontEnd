const containerCards = document.getElementById("container-cards-fijas");
const inputBusqueda = document.getElementById("input-busqueda");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroSabor = document.getElementById("filtro-sabor");
const filtroMixto = document.getElementById("filtro-mixto");
const filtroEmocion = document.getElementById("filtro-emocion");
const ordenPrecio = document.getElementById("orden-precio");
const btnMostrarTodos = document.getElementById("btn-mostrar-todos");
const contadorResultados = document.getElementById("contador-resultados");
const btnFavoritos = document.getElementById("btn-favoritos");

document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos(productos);
  animarContador(productos.length);

  [
    inputBusqueda,
    filtroTipo,
    filtroSabor,
    filtroMixto,
    filtroEmocion,
    ordenPrecio
  ].forEach(el => el.addEventListener("input", aplicarFiltros));

  btnMostrarTodos.addEventListener("click", resetFiltros);

  btnFavoritos.addEventListener("click", () => {
    const favoritos = productos.filter(p => p.categoria === "Artesanal");
    renderizarProductos(favoritos);
    animarContador(favoritos.length);
    btnMostrarTodos.classList.remove("d-none");
  });
});

function aplicarFiltros() {
  let lista = [...productos];

  if (inputBusqueda.value)
    lista = lista.filter(p => p.nombre.toLowerCase().includes(inputBusqueda.value.toLowerCase()));

  if (filtroTipo.value !== "todos")
    lista = lista.filter(p => p.tipo === filtroTipo.value);

  if (filtroSabor.value !== "todos")
    lista = lista.filter(p => p.sabores.includes(filtroSabor.value));

  if (filtroMixto.value !== "todos")
    lista = lista.filter(p => filtroMixto.value === "si" ? p.mixto : !p.mixto);

  if (filtroEmocion.value !== "todos")
    lista = lista.filter(p => p.emocion === filtroEmocion.value);

  if (ordenPrecio.value === "menor")
    lista.sort((a, b) => a.precio - b.precio);

  if (ordenPrecio.value === "mayor")
    lista.sort((a, b) => b.precio - a.precio);

  renderizarProductos(lista);
  animarContador(lista.length);
  actualizarUI();
}

function resetFiltros() {
  inputBusqueda.value = "";
  filtroTipo.value = "todos";
  filtroSabor.value = "todos";
  filtroMixto.value = "todos";
  filtroEmocion.value = "todos";
  ordenPrecio.value = "";

  renderizarProductos(productos);
  animarContador(productos.length);
  actualizarUI();
}

function actualizarUI() {
  const hayFiltros =
    inputBusqueda.value ||
    filtroTipo.value !== "todos" ||
    filtroSabor.value !== "todos" ||
    filtroMixto.value !== "todos" ||
    filtroEmocion.value !== "todos" ||
    ordenPrecio.value;

  btnMostrarTodos.classList.toggle("d-none", !hayFiltros);
}

function animarContador(valor) {
  let actual = 0;
  const step = Math.max(1, Math.floor(valor / 20));

  const interval = setInterval(() => {
    actual += step;
    if (actual >= valor) {
      actual = valor;
      clearInterval(interval);
    }
    contadorResultados.textContent = `${actual} resultado${actual !== 1 ? "s" : ""}`;
  }, 20);
}

function renderizarProductos(lista) {
  containerCards.innerHTML = "";

  if (!lista.length) {
    containerCards.innerHTML = `<p style="grid-column:1/-1;text-align:center;opacity:.6">Sin resultados 🍦</p>`;
    return;
  }

  lista.forEach(p => {
    const card = document.createElement("div");
    card.className = "card3";

    card.innerHTML = `
      <div class="img-wrapper">
        <img src="${p.imagen}" alt="${p.nombre}">
      </div>
      <h4 class="titulo-sabor2">${p.nombre}</h4>
      <p class="precio2">$${p.precio.toLocaleString("es-CO")}</p>
      <button class="btn-compra-animado add-cart-btn"
        data-id="${p.id}"
        data-name="${p.nombre}"
        data-price="${p.precio}">
        Agregar
      </button>
    `;

    containerCards.appendChild(card);
  });
}
