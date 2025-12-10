/*VARIABLES*/
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Elementos del formulario
const form = document.getElementById("formularioProductos");
const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const stockInput = document.getElementById("productStock");
const categoryInput = document.getElementById("productCategory");
const descInput = document.getElementById("productDescription");
const imgInput = document.getElementById("productImageInput");
const imgPreview = document.getElementById("productImagePreview");

// ESTA CLASE NO EXISTE EN TU HTML
// LA CORRIJO PARA QUE NO TE GENERE ERROR
const crearProductoSeccion = document.querySelector(".product-card");

const botonActivarSeccionCrear = document.getElementById("boton-crear-producto");

// Tabla donde van los productos
const tabla = document.querySelector("tbody");

/*CARGAR INVENTARIO AL INICIAR*/
document.addEventListener("DOMContentLoaded", cargarInventario);

//Cree el evento para que al hacer click aparezca la seccion de crear producto
botonActivarSeccionCrear.addEventListener('click', mostrarSeccionAgregarProducto);

//Funcion que muestra o oculta la seccion de crear productos
function mostrarSeccionAgregarProducto(){
    console.log("click detectado");
    crearProductoSeccion.classList.toggle("d-none");
} 

/*FUNCIÓN: PREVISUALIZAR IMAGEN*/
function previewProductImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        imgPreview.src = e.target.result;
        imgPreview.classList.remove("d-none");

        // Ocultamos el texto "Imagen"
        document.querySelector(".image-text").style.display = "none";
    };
    reader.readAsDataURL(file);
}

/*FUNCIÓN: GUARDAR PRODUCTO NUEVO*/
function guardarProducto(e) {
    e.preventDefault();

    const producto = {
        nombre: nameInput.value.trim(),
        precio: Number(priceInput.value),
        stock: Number(stockInput.value),
        categoria: categoryInput.value,
        descripcion: descInput.value.trim(),
        imagen: imgPreview.src || ""
    };

    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));

    cargarInventario();
    form.reset();

    imgPreview.classList.add("d-none");
    document.querySelector(".image-text").style.display = "block";
}

/*FUNCIÓN: CARGAR TABLA*/
function cargarInventario() {
    tabla.innerHTML = "";

    productos.forEach((prod, index) => {
        const row = document.createElement("tr");
        row.classList.add("fila");

        row.innerHTML = `
            <td><input type="checkbox" name="selector-producto" class="selector-producto" data-index="${index}"></td>
            <td>${index + 1}</td>
            <td>${prod.nombre}</td>
            <td>${prod.descripcion}</td>
            <td>${prod.precio}</td>
            <td>${prod.stock}</td>
            <td><img src="${prod.imagen}" class="imagen-inventario"></td>
            <td>
                <button onclick="editarProducto(${index})" class="btn btn-warning btn-sm">Editar</button>
                <button onclick="eliminarProducto(${index})" class="btn btn-danger btn-sm">Eliminar</button>
            </td>`;
        
        tabla.appendChild(row);
    });
}

/*FUNCIÓN: ELIMINAR PRODUCTO */
function eliminarProducto(index) {
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarInventario();
}

// eliminar productos de la lista usando checkbox
const boton_borrar = document.getElementById("boton-eliminar-producto");
boton_borrar.addEventListener('click', borrar_elemento);

function borrar_elemento(){

    //Se deja por dentro de la funcion porque la busqueda del querySelector se debe ejecutar solamente cuando cuando se hace click
    const elementos_seleccionados = document.querySelectorAll('input.selector-producto:checked');
    
    //Validacion del NodeList por console para hacer seguimiento del comportamiento
    console.log(elementos_seleccionados);

    if(elementos_seleccionados.length === 0){
        alert("Elemento de lista no seleccionado");
        return;
    }

    // BORRAR DEL ARREGLO USANDO SU INDEX REAL
    const indices = [...elementos_seleccionados].map(chk => Number(chk.getAttribute("data-index")));

    indices.sort((a,b) => b - a); // evitar desfase

    indices.forEach(i => productos.splice(i, 1));

    localStorage.setItem("productos", JSON.stringify(productos));
    cargarInventario();
}

/*FUNCIÓN: EDITAR PRODUCTO */
function editarProducto(index) {
    localStorage.setItem("productoEditar", index);
    window.location.href = "editar_producto.html";
}

// =====================================
// FUNCIÓN: ABRIR MODAL Y CARGAR PRODUCTO
// =====================================
function editarProducto(index) {
    const prod = productos[index];

    document.getElementById("editIndex").value = index;
    document.getElementById("editName").value = prod.nombre;
    document.getElementById("editPrice").value = prod.precio;
    document.getElementById("editStock").value = prod.stock;
    document.getElementById("editCategory").value = prod.categoria;
    document.getElementById("editDescription").value = prod.descripcion;

    const preview = document.getElementById("editPreview");
    preview.src = prod.imagen;
    preview.classList.remove("d-none");

    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById("modalEditar"));
    modal.show();
}

// =====================================
// FUNCIÓN: GUARDAR CAMBIOS DEL MODAL
// =====================================
document.getElementById("guardarCambios").addEventListener("click", function () {

    const i = document.getElementById("editIndex").value;

    productos[i].nombre = document.getElementById("editName").value;
    productos[i].precio = document.getElementById("editPrice").value;
    productos[i].stock = document.getElementById("editStock").value;
    productos[i].categoria = document.getElementById("editCategory").value;
    productos[i].descripcion = document.getElementById("editDescription").value;

    const img = document.getElementById("editImageInput").files[0];
    if (img) {
        const reader = new FileReader();
        reader.onload = (e) => {
            productos[i].imagen = e.target.result;
            localStorage.setItem("productos", JSON.stringify(productos));
            cargarInventario();
        };
        reader.readAsDataURL(img);
    } else {
        localStorage.setItem("productos", JSON.stringify(productos));
        cargarInventario();
    }

    bootstrap.Modal.getInstance(document.getElementById("modalEditar")).hide();
});

// =====================================
// FUNCIÓN: PREVISUALIZAR IMAGEN EN MODAL
// =====================================
document.getElementById("editImageInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const preview = document.getElementById("editPreview");
        preview.src = e.target.result;
        preview.classList.remove("d-none");
    };
    reader.readAsDataURL(file);
});
