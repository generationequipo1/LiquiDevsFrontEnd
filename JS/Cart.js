let cart = JSON.parse(localStorage.getItem("cart")) || [];

function guardar() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function actualizarContador() {
  const total = cart.reduce((a, p) => a + p.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = total;
}

function agregarProducto(producto) {
  const index = cart.findIndex(p => p.id === producto.id);

  if (index > -1) {
    cart[index].quantity++;
  } else {
    cart.push({ ...producto, quantity: 1 });
  }

  guardar();
  actualizarContador();

  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Agregado al carrito",
    timer: 1500,
    showConfirmButton: false
  });
}

document.addEventListener("click", e => {
  if (e.target.classList.contains("add-cart-btn")) {
    agregarProducto({
      id: Number(e.target.dataset.id),
      name: e.target.dataset.name,
      price: Number(e.target.dataset.price),
      img: e.target.dataset.img
    });
  }
});

document.addEventListener("DOMContentLoaded", actualizarContador);

document.addEventListener("DOMContentLoaded", () => {
  const btnCart = document.getElementById("btn-cart");
  const cartPanel = document.getElementById("cart-panel");
  const cerrar = document.getElementById("cerrar-carrito");

  if (btnCart) {
    btnCart.addEventListener("click", () => {
      cartPanel.classList.toggle("open");
    });
  }

  if (cerrar) {
    cerrar.addEventListener("click", () => {
      cartPanel.classList.remove("open");
    });
  }
});
