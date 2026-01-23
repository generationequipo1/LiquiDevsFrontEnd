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


function initCart() {
  actualizarContador();

  const btnCart = document.getElementById("btn-cart");
  const cartPanel = document.getElementById("cart-panel");
  const cerrar = document.getElementById("cerrar-carrito");

  if (!btnCart || !cartPanel) {
    console.warn("Carrito no encontrado en el DOM");
    return;
  }

  btnCart.addEventListener("click", () => {
    cartPanel.classList.toggle("open");
    renderCart();
  });

  if (cerrar) {
    cerrar.addEventListener("click", () => {
      cartPanel.classList.remove("open");
    });
  }
}


//simulacion de compra checkout 

document.addEventListener("click", e => {
  if (e.target.id !== "btn-checkout") return;

  if (cart.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Carrito vacío",
      text: "Agregá al menos un producto para continuar"
    });
    return;
  }

  const resumen = cart.map(p =>
    `${p.name} x${p.quantity} — $${(p.price * p.quantity).toLocaleString()}`
  ).join("<br>");

  const total = cart.reduce((a, p) => a + p.price * p.quantity, 0);

  Swal.fire({
    title: "Confirmar pedido 🍦",
    html: `
      <div style="text-align:left;font-size:14px">
        ${resumen}
        <hr>
        <strong>Total: $${total.toLocaleString()}</strong>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Confirmar pedido",
    cancelButtonText: "Seguir comprando"
  }).then(res => {
    if (res.isConfirmed) {
      procesarPedido(total);
    }
  });
});

function procesarPedido(total) {

  Swal.fire({
    title: "Procesando pedido...",
    text: "Preparando tus helados 🍨",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  setTimeout(() => {

    const pedidoId = Math.floor(Math.random() * 90000) + 10000;

    Swal.fire({
      icon: "success",
      title: "¡Pedido confirmado!",
      html: `
        <p>Pedido Nº <strong>${pedidoId}</strong></p>
        <p>Total: <strong>$${total.toLocaleString()}</strong></p>
        <p style="font-size:13px;color:#666">
          Estado: Preparando 🍨
        </p>
      `
    });

    guardarPedido(pedidoId, total);

    cart = [];
    guardar();
    actualizarContador();
    renderCart();

    const panel = document.getElementById("cart-panel");
    if (panel) panel.classList.remove("open");

  }, 1500);
}

function guardarPedido(id, total) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  pedidos.push({
    id,
    total,
    fecha: new Date().toLocaleString(),
    //estado: "Preparando" //Lo comento porque estado no es un atributo que exista en BD
  });

  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}
//función global para agregar al carrito desde otros scripts
window.addToCart = function (producto) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const idx = cart.findIndex(i => i.id === producto.id);

  if (idx >= 0) cart[idx].cantidad += 1;
  else cart.push({ ...producto, cantidad: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
};

//Desde aca empieza la conexion de back con front de pedido desde carrito
const API_URL = 'http://localhost:8080/carrito';



//Este metodo obtiene el token pero no se si esta funcional la validacion del token igual lo dejo de una vez listo 
function obtenerToken() {
  return localStorage.getItem('jwt');
}

//Este metodo debe validar el token si no tiene sesion iniciada lo redirije a iniciar sesion, pero no deberia ser obligatorio entonces lo voy a comentar
/*
function validarToken(){
  if(!obtenerToken()){
    alert('Debes iniciar sesion antes de continuar con tu pedido');
    window.location.href = 'inicioSesion.html';
    return false;
  }
  return true;  
}*/

//Desde aca voy a enviar el pedido al backend con una promesa

async function enviarPedidoAlBackEnd(InformacionPedido) {

  try {
    const botonCrearPedido = document.getElementById("btn-checkout");
    //sOLO por estetica :D 
    if (botonCrearPedido) {
      botonCrearPedido.disabled = true;
      botonCrearPedido.textContent = "Procesando..."
    }

    //voy a dejar la validacion de token pero comentada porque no es necesario, un cliente puede comprar sin tener cuenta
    const respuesta = await fetch('${API_URL}/carrito/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization':'Bearer ${token}' 
      },
      body: JSON.stringify(InformacionPedido)
    });

    if (respuesta.ok) {
      const resultado = await respuesta.json();
      localStorage.removeItem('pedido');
    } else {
      const errorMensaje = await respuesta.text();
      alert("No se puede procesar el pedido" + errorMensaje)
    }

  } catch (error) {
    console.error('Error al enviar el pedido', error)
    alert('Error de conexión con el servidor. Intenta más tarde.');
  }
  finally {
    const botonCrearPedido = document.getElementById("btn-checkout"); // Este no es el boton
    if (botonCrearPedido) {
      btn.disabled = false;
      btn.textContent = 'Confirmar Pedido';
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const botonConfirmar = document.getElementById('btn-checkout');

  if(botonConfirmar){
    botonConfirmar.addEventListener('click', async (e)=>{

        const carrito = JSON.parse(localStorage.getItem('pedido')) || [];

  if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
  }

  const pedidoData = {
        items: carrito.map(item => ({
          productoId: item.id,
          cantidad: item.cantidad
        })),

        total: carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),


        // Campos obligatorios para pedidos de invitados
        nombreCliente: document.getElementById('nombre-cliente')?.value || '',
        email: document.getElementById('email-cliente')?.value || '',
        telefono: document.getElementById('telefono-cliente')?.value || '',
        direccionEnvio: document.getElementById('direccion-envio')?.value || '',
  };

      await enviarPedidoAlBackEnd(pedidoData)
    });
  }


});
