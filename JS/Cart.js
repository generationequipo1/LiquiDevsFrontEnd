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
    const badgeFooter = document.getElementById("cart-items-counts");

    if (badgeIcono) badgeIcono.textContent = totalProductos;
    if (badgeFooter) badgeFooter.textContent = totalProductos;

}

// Al recargar la pagina 
actualizarContadorCarrito();


// ====== Agregar productos al carrito ===// 
document.querySelectorAll("add-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = parseInt(btn.CDATA_SECTION_NODE.id);
        const nombre = btn.dataset.name;
        const precioUnitario = parseFloat(btn.dataset.price);
        const img = btn.dataset.img;

        const index = cart.findIndex(item => Number(item.id) === id);

        if (index > -1) {
            //Ya existe el producto en carrito Aumenta cantidad 
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

function mostrarCarrito() {

}

//===== Mostrar el carrito en el sidebar ====// 

function mostrarCarrito() {
    const container = document.getElementById("cart-items");
    if (!container) return;

    container.innerHTML = "";

    cart.forEach(item => {
        const subtotal = item.precioUnitario * item.quantity;

         container.innerHTML += `
      <div class="card rounded-4 border border-white mb-2 bg-dark text-light" style="max-width: 540px;">
        <div class="card-body p-2">
          <div class="d-flex align-items-center">
            <div class="me-3">
              <i class="bi bi-trash3 text-center d-flex mb-2"
                 onclick="modificarCantidad(${item.id}, 'eliminar')"></i>
            </div>
            <div class="border border-white rounded-4" style="width: 60px; height: 60px; overflow:hidden;">
              <img src="${item.img}" class="img-fluid" alt="${item.name}">
            </div>
            <div class="flex-grow-1 ms-3">
              <h5 class="card-title mb-0 fw-normal">${item.name}</h5>
              <p class="card-text mb-0 small text-secondary fw-bold">En stock</p>
              <p class="card-text fw-bold fs-5">$ ${subtotal.toFixed(2)}</p>
            </div>
            <div class="d-flex flex-column align-items-end justify-content-between" style="height: 80px;">
              <div class="d-flex align-items-center gap-2">
                <button onclick="modificarCantidad(${item.id}, 'incrementar')"
                        class="btn btn-outline-light btn-sm p-0 rounded-2 d-flex justify-content-center align-items-center"
                        style="width: 25px; height: 25px;">+</button>
                <span class="fw-bold">${item.quantity}</span>
                <button onclick="modificarCantidad(${item.id}, 'decrementar')"
                        class="btn btn-outline-light btn-sm p-0 rounded-2 d-flex justify-content-center align-items-center"
                        style="width: 25px; height: 25px;">-</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;       
    });
}

//  ======= Calcular total del carrito ===// 
function actualizarTotalCarrito () {
    const totalSpan = document.getElementById("cart-total-check");
    if (!totalSpan) return;

    let total = 0; 
    cart.forEach(item => {
        total += item.precioUnitario * item.quantity;
    });

    totalSpan.textContent = total.toFixed(2);
}

// ===== Actualizar todo ====== //
function actualizarTodo () {
    actualizarContadorCarrito();
    mostrarCarrito();
    actualizarTotalCarrito();
}