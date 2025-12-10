// Estado del carrito
let cart = [];

// Referencias al DOM
const cartItemsEl   = document.getElementById('cart-items');
const cartCountEl   = document.getElementById('cart-count');
const cartTotalEl   = document.getElementById('cart-total');
const cartClearBtn  = document.getElementById('cart-clear');
const cartCheckoutBtn = document.getElementById('cart-checkout');

// 1. Escuchar clicks en todos los botones "Agregar al carrito"
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-agregar')) {
    const btn = e.target;
    const id      = btn.dataset.id;
    const nombre  = btn.dataset.nombre;
    const precio  = parseFloat(btn.dataset.precio);

    agregarAlCarrito({ id, nombre, precio });
  }

  if (e.target.classList.contains('btn-eliminar-item')) {
    const id = e.target.dataset.id;
    eliminarDelCarrito(id);
  }

  if (e.target.classList.contains('btn-mas')) {
    const id = e.target.dataset.id;
    cambiarCantidad(id, 1);
  }

  if (e.target.classList.contains('btn-menos')) {
    const id = e.target.dataset.id;
    cambiarCantidad(id, -1);
  }
});

// 2. Funciones de lógica
function agregarAlCarrito(producto) {
  const itemExistente = cart.find(item => item.id === producto.id);

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    cart.push({ ...producto, cantidad: 1 });
  }

  renderCarrito();
}

function eliminarDelCarrito(id) {
  cart = cart.filter(item => item.id !== id);
  renderCarrito();
}

function cambiarCantidad(id, delta) {
  cart = cart.map(item => {
    if (item.id === id) {
      const nuevaCantidad = item.cantidad + delta;
      return { ...item, cantidad: nuevaCantidad < 1 ? 1 : nuevaCantidad };
    }
    return item;
  });
  renderCarrito();
}

function vaciarCarrito() {
  cart = [];
  renderCarrito();
}

// 3. Render del carrito en el sidebar
function renderCarrito() {
  cartItemsEl.innerHTML = '';

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    count += item.cantidad;

    const li = document.createElement('li');
    li.classList.add('cart-item');
    li.innerHTML = `
      <div class="cart-item-details">
        <strong>${item.nombre}</strong><br>
        $${item.precio.toFixed(2)} x ${item.cantidad} = $${subtotal.toFixed(2)}
      </div>
      <div class="cart-item-actions">
        <button class="btn-menos" data-id="${item.id}">-</button>
        <button class="btn-mas" data-id="${item.id}">+</button>
        <button class="btn-eliminar-item" data-id="${item.id}">X</button>
      </div>
    `;
    cartItemsEl.appendChild(li);
  });

  cartCountEl.textContent = count;
  cartTotalEl.textContent = total.toFixed(2);
}

// 4. Botones generales
cartClearBtn.addEventListener('click', vaciarCarrito);

cartCheckoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  alert('Simulación de pago realizada. Gracias por tu compra.');
  vaciarCarrito();
});
