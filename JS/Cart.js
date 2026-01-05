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

    // si no hay productos muestra mensaje

  if (cart.length === 0) {
    contenedor.innerHTML = `
      <div class="cart-empty">
        🛒<br>
        Tu carrito está vacío
      </div>
    `;
    totalEl.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach((p, index) => {
    total += p.price * p.quantity;

    contenedor.innerHTML += `
      <div class="cart-item">
        <img src="${p.img}">
        <div class="cart-item-info">
          <strong>${p.name}</strong>
          <span>$${p.price.toLocaleString()} x ${p.quantity}</span>
          <small class="cart-subtotal">
            Subtotal: $${(p.price * p.quantity).toLocaleString()}
          </small>

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

    // animación del icono carrito

  const btnCart = document.getElementById("btn-cart");
  if (btnCart) {
    btnCart.classList.add("shake");
    setTimeout(() => btnCart.classList.remove("shake"), 400);
  }

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
  if (!e.target.classList.contains("add-cart-btn")) return;

  e.target.classList.add("added");
  setTimeout(() => e.target.classList.remove("added"), 300);

  const id = Number(e.target.dataset.id);
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  agregarProducto({
    id: producto.id,
    name: producto.nombre,
    price: producto.precio,
    img: producto.imagen
  });
});

// abre y cierra el panel del carrito

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();

  const btnCart = document.getElementById("btn-cart");
  const cartPanel = document.getElementById("cart-panel");
  const cerrar = document.getElementById("cerrar-carrito");

  if (btnCart) {
    btnCart.onclick = () => {
      cartPanel.classList.toggle("open");
      renderCart();
    };
  }

  if (cerrar) {
    cerrar.onclick = () => cartPanel.classList.remove("open");
  }
});

// controla sumar, restar y eliminar

document.addEventListener("click", e => {

  if (e.target.classList.contains("btn-plus")) {
    cart[e.target.dataset.index].quantity++;
  }

  if (e.target.classList.contains("btn-minus")) {
    const i = e.target.dataset.index;
    cart[i].quantity--;
    if (cart[i].quantity <= 0) cart.splice(i, 1);
  }
  // confirma antes de borrar

  if (e.target.classList.contains("btn-remove")) {
    const i = e.target.dataset.index;

    Swal.fire({
      title: "¿Eliminar producto?",
      text: "Se quitará del carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(res => {
      if (res.isConfirmed) {
        cart.splice(i, 1);
        guardar();
        actualizarContador();
        renderCart();
      }
    });
    return;
  }

  guardar();
  actualizarContador();
  renderCart();
});


