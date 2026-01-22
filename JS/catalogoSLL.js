// catalogoSLL.js (FULL, backend + frontend catálogo)
let emocionDesdeHero = "todos";

const containerCards = document.getElementById("container-cards-fijas");
const inputBusqueda = document.getElementById("input-busqueda");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroSabor = document.getElementById("filtro-sabor");
const filtroMixto = document.getElementById("filtro-mixto");
const ordenPrecio = document.getElementById("orden-precio");
const btnMostrarTodos = document.getElementById("btn-mostrar-todos");
const contadorResultados = document.getElementById("contador-resultados");
const btnFavoritos = document.getElementById("btn-favoritos");

// ------------------------------
// renderiza la lista de productos en el catálogo
// ------------------------------
function renderizarProductos(lista) {
  containerCards.innerHTML = "";

  if (!lista || !lista.length) {
    containerCards.innerHTML = `<p style="grid-column:1/-1;text-align:center;opacity:.6">Sin resultados 🍦</p>`;
    return;
  }

  lista.forEach(p => {
    const card = document.createElement("div");
    card.className = "card3";

    const precio = Number(p.precio ?? 0);
    const img = p.imagen || "../Assets/Helados/cono-vainilla.png";

    card.innerHTML = `
      <div class="img-wrapper">
        <img src="${img}" alt="${p.nombre || "Producto"}"
             onerror="this.src='../Assets/Helados/cono-vainilla.png'">
      </div>
      <h4 class="titulo-sabor2">${p.nombre || "Sin nombre"}</h4>
      <p class="precio2">$${precio.toLocaleString("es-CO")}</p>
      <button class="btn-compra-animado add-cart-btn"
        data-id="${p.id}"
        data-name="${p.nombre}"
        data-price="${precio}">
        Agregar
      </button>
    `;

    containerCards.appendChild(card);
  });
}

function animarContador(valor) {
  let actual = 0;
  const total = Number(valor || 0);
  const step = Math.max(1, Math.floor(total / 20));

  const interval = setInterval(() => {
    actual += step;
    if (actual >= total) {
      actual = total;
      clearInterval(interval);
    }
    contadorResultados.textContent = `${actual} resultado${actual !== 1 ? "s" : ""}`;
  }, 20);
}

function actualizarUI() {
  const hayFiltros =
    (inputBusqueda.value || "").trim() ||
    filtroTipo.value !== "todos" ||
    filtroSabor.value !== "todos" ||
    filtroMixto.value !== "todos" ||
    ordenPrecio.value ||
    emocionDesdeHero !== "todos";

  btnMostrarTodos.classList.toggle("d-none", !hayFiltros);
}

// ------------------------------
// se aplican los filtros seleccionados
// ------------------------------
function aplicarFiltros() {
  let lista = [...(window.productos || [])];

  const q = (inputBusqueda.value || "").trim().toLowerCase();
  if (q) lista = lista.filter(p => (p.nombre || "").toLowerCase().includes(q));

  if (filtroTipo.value !== "todos")
    lista = lista.filter(p => (p.tipo || "").toLowerCase() === filtroTipo.value);

  if (filtroSabor.value !== "todos")
    lista = lista.filter(p => (p.sabores || []).includes(filtroSabor.value));

  if (filtroMixto.value !== "todos")
    lista = lista.filter(p => (filtroMixto.value === "si") ? !!p.mixto : !p.mixto);

  if (emocionDesdeHero !== "todos")
    lista = lista.filter(p => (p.emocion || "") === emocionDesdeHero);

  if (ordenPrecio.value === "menor") lista.sort((a, b) => Number(a.precio) - Number(b.precio));
  if (ordenPrecio.value === "mayor") lista.sort((a, b) => Number(b.precio) - Number(a.precio));

  renderizarProductos(lista);
  animarContador(lista.length);
  actualizarUI();
}

function resetFiltros() {
  inputBusqueda.value = "";
  filtroTipo.value = "todos";
  filtroSabor.value = "todos";
  filtroMixto.value = "todos";
  ordenPrecio.value = "";
  emocionDesdeHero = "todos";

  const lista = window.productos || [];
  renderizarProductos(lista);
  animarContador(lista.length);
  actualizarUI();
}

// ------------------------------
// Inicia cuando backend ya cargó productos.
// ------------------------------
function initCatalogo() {
  const listaInicial = window.productos || [];
  renderizarProductos(listaInicial);
  animarContador(listaInicial.length);

  [inputBusqueda, filtroTipo, filtroSabor, filtroMixto, ordenPrecio]
    .forEach(el => el && el.addEventListener("input", aplicarFiltros));

  btnMostrarTodos.addEventListener("click", resetFiltros);

  btnFavoritos.addEventListener("click", () => {
    emocionDesdeHero = "todos";
    const favoritos = (window.productos || []).filter(p => (p.categoria || "") === "Artesanal");
    renderizarProductos(favoritos);
    animarContador(favoritos.length);
    btnMostrarTodos.classList.remove("d-none");
  });

  document.querySelectorAll(".hero-moods-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
      resetFiltros();
      emocionDesdeHero = btn.dataset.emocion;
      aplicarFiltros();
      btnMostrarTodos.classList.remove("d-none");
      location.href = "#container-cards-fijas";
    });
  });
}

window.addEventListener("productosCargados", initCatalogo);

// ------------------------------
// Click Agregar (solo alerta; el carrito lo conectas luego)
// ------------------------------
document.addEventListener("click", e => {
  const btn = e.target.closest(".add-cart-btn");
  if (!btn) return;

  const nombre = btn.dataset.name || "Producto";
  const precio = Number(btn.dataset.price || 0);

  Swal.fire({
    icon: "success",
    title: "¡Agregado al carrito! 🍦",
    text: `${nombre} – $${precio.toLocaleString("es-CO")}`,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true
  });
});