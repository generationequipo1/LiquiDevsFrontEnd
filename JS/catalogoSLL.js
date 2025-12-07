
//boton_borrar.addEventListener('click',mostrarOpciones);
const productosPredefinidos = [{
    imagen: "../Assets/Helados/copa_copa_de_helado_fresa.png",
    nombre: "Copa de Helado",
    categoria: "Copa",
    sabores: "Fresa",
    emocion: "feliz",
    precio: 19000
}, {
    imagen: "../Assets/Helados/cono_de_crema_choc_vain.png",
    nombre: "Helado de crema",
    categoria: "Helado",
    sabores: "chocolate - Vainilla",
    emocion: "relajado",
    precio: 8000
},
{
    imagen: "../Assets/Helados/helado_de_limon.png",
    nombre: "Helado de Limon",
    categoria: "Helado",
    sabores: "Limon",
    emocion: "intenso",
    precio: 36000
},
{
    imagen: "../Assets/Helados/waffle_y_helado.png",
    nombre: "Waffle helado",
    categoria: "Waffle",
    sabores: "vainilla con M&M",
    emocion: "feliz",
    precio: 17000
},
{
    imagen: "../Assets/Helados/helado_knickerbocker.png",
    nombre: "Helado Knickerbocker",
    categoria: "Helado",
    sabores: "Chocolate - Fresas - M&M - Galletas",
    emocion: "melancolico",
    precio: 21000
},
{
    imagen: "../Assets/Helados/cono_fresa.png",
    nombre: "Helado de Crema",
    categoria: "Helado",
    sabores: "Fresa",
    emocion: "feliz",
    precio: 8000
},
{
    imagen: "../Assets/Helados/copa_helado_fresa_maracuya_limon.png",
    nombre: "Copa de Helado",
    categoria: "Copa",
    sabores: "Limon - Maracuya - Fresa",
    emocion: "relajado",
    precio: 16000
},

]

localStorage.setItem("productos-predefinidos", JSON.stringify(productosPredefinidos));

document.addEventListener('DOMContentLoaded', function () {
    crearTarjetasCatalogoFijo(productosPredefinidos);
});

function crearTarjetasCatalogoFijo(listaProductos) {

    const containerCatalogo = document.getElementById("container-cards-fijas");
    containerCatalogo.innerHTML = "";

    for (const producto of listaProductos) {

        const tarjetaProducto = document.createElement("div");
        tarjetaProducto.classList.add("tarjeta-producto");

        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;

        const contenedorTexto = document.createElement("div");
        contenedorTexto.classList.add("texto-tarjeta");

        const titulo = document.createElement("h3");
        titulo.classList.add("titulo-tarjeta");
        titulo.textContent = producto.nombre;

        const categoria = document.createElement("p");
        categoria.classList.add("categoria");
        categoria.textContent = producto.categoria;

        const sabores = document.createElement("p");
        sabores.classList.add("sabores");
        sabores.textContent = producto.sabores;

        const precio = document.createElement("p");
        precio.classList.add("precio");
        precio.textContent = `$${producto.precio.toLocaleString("es-CO")}`;

        const boton = document.createElement("button");
        boton.classList.add("boton");
        boton.textContent = "Lo quiero!";

        contenedorTexto.append(titulo, categoria, sabores, precio, boton);
        tarjetaProducto.append(imagen, contenedorTexto);
        containerCatalogo.appendChild(tarjetaProducto);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    crearTarjetasCatalogoFijo(productosPredefinidos);

    const btnEmociones = document.getElementById("btn-emociones");
    const btnTodo = document.getElementById("btn-todo");
    const boxEmociones = document.getElementById("box-emociones");
    const botonesEmocion = document.querySelectorAll(".btn-emocion");

    // para mostrar o desplegar emociones
    btnEmociones.addEventListener("click", () => {
        boxEmociones.style.display =
            boxEmociones.style.display === "none" ? "block" : "none";
    });

    // para desplegar todos los productos
    btnTodo.addEventListener("click", () => {
        boxEmociones.style.display = "none";
        crearTarjetasCatalogoFijo(productosPredefinidos);
    });

    // filtro apra poder seleccionar por emoción
    botonesEmocion.forEach(boton => {
        boton.addEventListener("click", () => {
            const emocionSeleccionada = boton.dataset.emocion;

            const productosFiltrados = productosPredefinidos.filter(producto =>
                producto.emocion === emocionSeleccionada
            );

            crearTarjetasCatalogoFijo(productosFiltrados);
        });
    });

});
