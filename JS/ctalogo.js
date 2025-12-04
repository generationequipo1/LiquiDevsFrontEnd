// ===============================
// CARGAR PRODUCTOS EN EL CATÁLOGO
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.querySelector('.grupo');
    
    if (!contenedor) {
        console.error('No se encontró el contenedor de productos');
        return;
    }

    // Obtener productos del localStorage
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    
    // Limpiar el contenedor (remover productos hardcodeados)
    contenedor.innerHTML = '';
    
    // Si no hay productos, mostrar mensaje
    if (productos.length === 0) {
        contenedor.innerHTML = '<p style="text-align: center; width: 100%; padding: 20px;">No hay productos disponibles en este momento.</p>';
        return;
    }
    
    // Crear cards para cada producto
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Formatear el precio
        const precioFormateado = typeof producto.precio === 'number' 
            ? `$${producto.precio.toLocaleString('es-CO')}` 
            : `$${producto.precio}`;
        
        card.innerHTML = `
            <img src="${producto.imagen || '../Assets/image1.png'}" class="img" alt="${producto.nombre}">
            <h4 class="titulo-sabor">${producto.nombre || 'Producto sin nombre'}</h4>
            <p class="descripcion">${producto.descripcion || 'Sin descripción'}</p>
            <p class="precio">${precioFormateado}</p>
        `;
        
        contenedor.appendChild(card);
    });
});

    


