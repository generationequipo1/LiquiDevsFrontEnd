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
const crearProductoSeccion = document.querySelector(".noActive");
const botonActivarSeccionCrear = document.getElementById("boton-crear-producto");


// Tabla donde van los productos
const tabla = document.querySelector("tbody");

/*CARGAR INVENTARIO AL INICIAR*/
document.addEventListener("DOMContentLoaded", cargarInventario);

//Cree el evento para que al hacer click aparezca la seccion de crear producto
botonActivarSeccionCrear.addEventListener('click',mostrarSeccionAgregarProducto);
//Funcion que muestra o oculta la seccion de crear productos
function mostrarSeccionAgregarProducto(){
console.log("click detectado");
crearProductoSeccion.classList.toggle("noActive");
crearProductoSeccion.classList.toggle("container","py-5");
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
        nombre: nameInput.value,
        precio: priceInput.value,
        stock: stockInput.value,
        categoria: categoryInput.value,
        descripcion: descInput.value,
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
            <td><input type="checkbox" name="selector-producto" class="selector-producto"></td>
            <td>${index + 1}</td>
            <td>${prod.nombre}</td>
            <td>${prod.descripcion}</td>
            <td>${prod.precio}</td>
            <td>${prod.stock}</td>
            <td><img src="${prod.imagen}" id="imagen-inventario"></td>
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
//Contar elementos en checked


//eliminar productos de la lista usando checkbox
const boton_borrar = document.getElementById("boton-eliminar-producto");
boton_borrar.addEventListener('click', borrar_elemento);

function borrar_elemento(){

    //Se deja por dentro de la funcion porque la busqueda del querySelector se debe ejecutar solamente cuando cuando se hace click
    const elemento_seleccionado = document.querySelectorAll('input[type="checkbox"]:checked');
    
    //Validacion del NodeList por console para hacer seguimiento del comportamiento
    console.log(elemento_seleccionado);
    if(elemento_seleccionado === 0){
      alert("Elemento de lista no seeccionado");
    }else{
      for(let i = 0; i < elemento_seleccionado.length;i++ ){
          elemento_seleccionado[i].closest('tr').remove();
      }
    }
}

// ==============================
// FUNCIÓN: EDITAR PRODUCTO (REDIRIGE)
// ===============================
/*FUNCIÓN: EDITAR PRODUCTO */
function editarProducto(index) {
    localStorage.setItem("productoEditar", index);
    window.location.href = "editar_producto.html";
}

 
