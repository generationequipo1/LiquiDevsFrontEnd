document.addEventListener("DOMContentLoaded", () => {

    renderizarProductos(productos);

    const btnTodo = document.getElementById("btn-todo");
    const botonesSabor = document.querySelectorAll(".btn-sabor");
    const tarjetasEmocion = document.querySelectorAll(".card-emocion");

    
    btnTodo.addEventListener("click", () => {
        renderizarProductos(productos);
    });

    
    botonesSabor.forEach(btn => {
        btn.addEventListener("click", () => {
            const sabor = btn.dataset.sabor;

            const filtrados = productos.filter(producto =>
                producto.sabores.includes(sabor)
            );

            renderizarProductos(filtrados);
        });
    });

    
    tarjetasEmocion.forEach(card => {
        card.addEventListener("click", () => {
            const emocion = card.dataset.emocion;

            const filtrados = productos.filter(
                producto => producto.emocion === emocion
            );

            renderizarProductos(filtrados);
        });
    });
});

function renderizarProductos(lista) {
    const contenedor = document.getElementById("container-cards-fijas");
    contenedor.innerHTML = "";

    lista.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card3");

        card.innerHTML = `
            <img src="${producto.imagen}" class="img2" alt="${producto.nombre}">
            <div class="card-interna-texto">
                <h4 class="titulo-sabor2">${producto.nombre}</h4>
                <p class="descripcion2">${producto.descripcion}</p>
                <p class="precio2">$${producto.precio.toLocaleString("es-CO")}</p>
                <button 
                    class="add-cart-btn"
                    data-id="${producto.id}"
                    data-name="${producto.nombre}"
                    data-price="${producto.precio}"
                    data-img="${producto.imagen}">
                    Agregar al carrito
                </button>
            </div>
        `;

        contenedor.appendChild(card);
    });
}
