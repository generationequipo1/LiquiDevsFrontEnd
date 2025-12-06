// ============================
//   CARRITO CON LOCALSTORAGE


// Cargar carrito desde LocalStorage o inicializar vacío, traemos
// del almacenamiento local del navegador el valor guardado bajo la clave cart :)
//despues de convertir la cadena en un objeto Json utilizamos el operador logico ||
// si el valor es null lo inicia como un arreglo
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ---- ACtualizamos el Contador ----
function ActualizarCarrito() {
    let totalProductos = 0;
    cart.forEach(item => totalProductos += item.quantity)
    document.getElementById("cart-count").textContent = totalProductos;
    document.getElementById("cart-items-count").textContent = totalProductos;
}
ActualizarCarrito();

// ---- AGREGAR PRODUCTO ---- el querySelectorAll nos permite seleccionar varios elementos del DOM
document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", e => {
        //buscar si esta 
        let nuevoProductoId = parseInt(btn.dataset.id)
        const itemIndex = cart.findIndex(item => Number(item.id) === nuevoProductoId); 
        if (itemIndex > -1) { 
            modificarCantidad(nuevoProductoId, true)
        } else {
            const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: btn.dataset.price,
            img: btn.dataset.img,
            quantity: 1
        };

        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        actualizarTodo();
        }
    });
});

function modificarCantidad(id, proceso) {
    console.log(typeof id); //Numero
    const itemIndex = cart.findIndex(item => Number(item.id) === id);
    
    if (itemIndex > -1) {
        if(proceso) {
            cart[itemIndex].price = cart[itemIndex].price * (cart[itemIndex].quantity + 1); 
            cart[itemIndex].quantity += 1;
        }
        else {
            cart[itemIndex].price = cart[itemIndex].price * (cart[itemIndex].quantity - 1); 
            cart[itemIndex].quantity -= 1;
        }
        console.log(proceso === "eliminar");
        
        if(cart[itemIndex].quantity == 0 || proceso === "eliminar") {
            cart = cart.filter(item => Number(item.id) !== id);
        }
        actualizarTodo()  
    }
    
}
function actualizarTodo() {
    actualizarLocalStorage();
    ActualizarCarrito();
    MostrarCarrito();
    ActualizarTotalCarrito()
}

function actualizarLocalStorage() {
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem('cart', cartJSON);
    console.log(cart);
    
}

// ---- MOSTRAR CARRITO EN EL SIDEBAR ----
function MostrarCarrito() {
    const container = document.getElementById("cart-items");
    container.innerHTML = "";

    cart.forEach(item => {
        container.innerHTML += `
            <div class="card rounded-4 border border-white mb-2 bg-dark text-light" style="max-width: 540px;">
                <div class="card-body p-2">
                    <div class="d-flex align-items-center">
                    <div class="me-3">
                        <i class="bi bi-trash3 text-center d-flex mb-2" onClick="modificarCantidad(${item.id}, 'eliminar')" ></i>
                        <div class="border border-white rounded-4" style="width: 60px; height: 60px;">
                            <img src="${item.img}">
                        </div>
                    </div>

                    <div class="flex-grow-1">
                        <h5 class="card-title mb-0 fw-normal">${item.name}</h5>
                        <p class="card-text mb-0">
                        <small class="text-secondary fw-bold">En stock</small>
                        </p>
                        <p class="card-text fw-bold fs-5">$ ${item.price} </p>
                    </div>

                    <div class="d-flex flex-column align-items-end justify-content-between" style="height: 80px;">
                        <i class="bi bi-heart-fill"></i>
                        <div class="d-flex align-items-center gap-2">
                        <button onClick="modificarCantidad(${item.id}, ${true})" class="btn btn-outline-light btn-sm p-0 rounded-2 d-flex justify-content-center align-items-center" style="width: 25px; height: 25px;">+</button>
                        <span class="fw-bold">${item.quantity || 0}</span>
                        <button onClick="modificarCantidad(${item.id}, ${false})" class="btn btn-outline-light btn-sm p-0 rounded-2 d-flex justify-content-center align-items-center" style="width: 25px; height: 25px;">-</button>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        `;
    });
}
MostrarCarrito();

/* -- Actualizar el total del carrito */
function ActualizarTotalCarrito() {
    let totalCheck = document.getElementById("cart-total-check");
    totalCheck.textContent = ""
    let total = 0;
    cart.forEach(item => {
        total += parseInt(item.price)
    });
    totalCheck.textContent = total;

}
ActualizarTotalCarrito();

// ---- ABRIR Y CERRAR SIDEBAR ----
document.getElementById("btn-cart").addEventListener("click", () => {
    document.getElementById("sidebar").classList.add("open");
});

document.getElementById("close-sidebar").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("open");
});
