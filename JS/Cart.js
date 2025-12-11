//======== Estado Inicial del carrito =====//
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ====== Guardar en el localstorage ====//
function guardarCarrito() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ====== Actualizar la cantidad en el icono del carrito ===//
function actualizarContadorCarrito() {
  let totalProductos = 0;
  cart.forEach(item => {
    totalProductos += item.quantity;
  });

  const badgeIcono = document.getElementById("cart-count");
  const badgeFooter = document.getElementById("cart-items-count"); // debe existir en HTML

  if (badgeIcono) badgeIcono.textContent = totalProductos;
  if (badgeFooter) badgeFooter.textContent = totalProductos;
}

// Al recargar la pagina
actualizarContadorCarrito();

// ====== Agregar productos al carrito ===//
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const nombre = btn.dataset.name;
      const precioUnitario = parseFloat(btn.dataset.price);
      const img = btn.dataset.img;

      const index = cart.findIndex(item => Number(item.id) === id);

      if (index > -1) {
        //Ya existe el producto en carrito: aumenta cantidad
        modificarCantidad(id, "incrementar");
      } else {
        //Nuevo producto
        const producto = {
          id: id,
          name: nombre,
          precioUnitario: precioUnitario,
          quantity: 1,
          img: img
        };
        cart.push(producto);
        guardarCarrito();
        actualizarTodo();
      }
    });
  });
});

// ====== Modificar Cantidad ====//
function modificarCantidad(id, accion) {
  const index = cart.findIndex(item => Number(item.id) === id);
  if (index === -1) return;

  if (accion === "incrementar") {
    cart[index].quantity += 1;
  } else if (accion === "decrementar") {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  } else if (accion === "eliminar") {
    cart.splice(index, 1);
  }

  guardarCarrito();
  actualizarTodo();
}

//===== Mostrar el carrito en el sidebar/página carrito ====//
function mostrarCarrito() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  container.innerHTML = "";
  cart.forEach(item => {
    const subtotal = item.precioUnitario * item.quantity;

    container.innerHTML += `
      <div class="cart-item d-flex align-items-center mb-3">
        <img src="${item.img}" alt="${item.name}" class="me-3" style="width:60px;height:60px;object-fit:cover;">
        <div class="flex-grow-1">
          <strong>${item.name}</strong><br>
          <span>Cant: ${item.quantity}</span><br>
          <span>$ ${subtotal.toFixed(2)}</span>
        </div>
        <div class="d-flex flex-column align-items-end gap-1">
          <button onclick="modificarCantidad(${item.id}, 'incrementar')" class="btn btn-sm btn-success">+</button>
          <button onclick="modificarCantidad(${item.id}, 'decrementar')" class="btn btn-sm btn-warning">-</button>
          <button onclick="modificarCantidad(${item.id}, 'eliminar')" class="btn btn-sm btn-danger">X</button>
        </div>
      </div>
    `;
  });
}

//===== Total carrito ====//
function actualizarTotalCarrito() {
  const totalSpan = document.getElementById("cart-total-check");
  if (!totalSpan) return;

  let total = 0;
  cart.forEach(item => {
    total += item.precioUnitario * item.quantity;
  });

  totalSpan.textContent = total.toFixed(2);
}

//===== Mostrar totales ====//
function actualizarTodo() {
  actualizarContadorCarrito();
  mostrarCarrito();
  actualizarTotalCarrito();
}

// Ejecutar en páginas donde haya listado del carrito
document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
  actualizarTotalCarrito();
});
