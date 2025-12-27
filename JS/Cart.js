let cart = JSON.parse(localStorage.getItem("cart")) || [];

function guardar() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function actualizarContador() {
  const total = cart.reduce((a, p) => a + p.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = total;
}

function renderCart() {
  const contenedor = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!contenedor || !totalEl) return;

  contenedor.innerHTML = "";
  let total = 0;

  cart.forEach((p, index) => {
    total += p.price * p.quantity;

    contenedor.innerHTML += `
      <div class="cart-item">
        <img src="${p.img}">
        
        <div class="cart-item-info">
          <strong>${p.name}</strong>
          <span>$${p.price.toLocaleString()}</span>

          <div class="cart-controls">
            <button class="btn-minus" data-index="${index}">−</button>
            <span>${p.quantity}</span>
            <button class="btn-plus" data-index="${index}">+</button>
          </div>
        </div>

        <button class="btn-remove" data-index="${index}">🗑</button>
      </div>
    `;
  });

  totalEl.textContent = total.toLocaleString();
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
  renderCart();

  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Agregado al carrito",
    timer: 1200,
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

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();

  setTimeout(() => {
    const btnCart = document.getElementById("btn-cart");
    const cartPanel = document.getElementById("cart-panel");
    const cerrar = document.getElementById("cerrar-carrito");

    if (btnCart && cartPanel) {
      btnCart.onclick = () => {
        cartPanel.classList.toggle("open");
        renderCart();
      };
    }

    if (cerrar && cartPanel) {
      cerrar.onclick = () => cartPanel.classList.remove("open");
    }
  }, 100);
});

document.addEventListener("click", e => {

  // para las operaciones, suma
  if (e.target.classList.contains("btn-plus")) {
    const i = e.target.dataset.index;
    cart[i].quantity++;
  }

  // resta
  if (e.target.classList.contains("btn-minus")) {
    const i = e.target.dataset.index;
    cart[i].quantity--;
    if (cart[i].quantity <= 0) cart.splice(i, 1);
  }

  // eliminar producto
  if (e.target.classList.contains("btn-remove")) {
    const i = e.target.dataset.index;
    cart.splice(i, 1);
  }

  guardar();
  actualizarContador();
  renderCart();
});
