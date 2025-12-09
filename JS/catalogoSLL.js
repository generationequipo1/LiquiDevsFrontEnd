const productosPredefinidos = [
    {
        imagen: "../Assets/Helados/copa_copa_de_helado_fresa.png",
        nombre: "Copa de Helado",
        categoria: "Copa",
        sabores: "Fresa",
        emocion: "feliz",
        precio: 19000
    },
    {
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
    }
];

localStorage.setItem("productos-predefinidos", JSON.stringify(productosPredefinidos));

document.addEventListener("DOMContentLoaded", () => {

    crearTarjetasCatalogoFijo(productosPredefinidos);

    const btnEmociones = document.getElementById("btn-emociones");
    const btnTodo = document.getElementById("btn-todo");
    const boxEmociones = document.getElementById("box-emociones");


    const tarjetasEmocion = document.querySelectorAll(".card-emocion");


    btnEmociones.addEventListener("click", () => {
        boxEmociones.style.display =
            boxEmociones.style.display === "none" ? "flex" : "none";
    });

    btnTodo.addEventListener("click", () => {
        boxEmociones.style.display = "none";
        crearTarjetasCatalogoFijo(productosPredefinidos);
    });


    tarjetasEmocion.forEach(card => {
        card.addEventListener("click", () => {

            const emocionSeleccionada = card.dataset.emocion;

            const productosFiltrados = productosPredefinidos.filter(
                producto => producto.emocion === emocionSeleccionada
            );

            crearTarjetasCatalogoFijo(productosFiltrados);
        });
    });

<<<<<<< HEAD
   crearTarjetasCatalogoFijo();
    
=======
>>>>>>> 16647292ce5fa37504c6d5828a623f4873df724c
});


function crearTarjetasCatalogoFijo(listaProductos) {

    const containerCatalogo = document.getElementById("container-cards-fijas");
    containerCatalogo.innerHTML = "";

    listaProductos.forEach(producto => {
        const tarjetaProducto = document.createElement("div");
        tarjetaProducto.classList.add("tarjeta-producto");

        tarjetaProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="texto-tarjeta">
                <h3 class="titulo-tarjeta">${producto.nombre}</h3>
                <p class="categoria">${producto.categoria}</p>
                <p class="sabores">${producto.sabores}</p>
                <p class="precio">$${producto.precio.toLocaleString("es-CO")}</p>
                <button class="boton">Lo quiero!</button>
            </div>
        `;

        containerCatalogo.appendChild(tarjetaProducto);
    });
}
