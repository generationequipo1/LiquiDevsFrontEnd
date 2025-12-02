// Inventario.js  (solo para inventario.html)

document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('tbody-inventario');
  const productos = JSON.parse(localStorage.getItem('productos')) || [];

  tbody.innerHTML = ''; // limpiar filas estáticas

  productos.forEach((producto, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${producto.nombre}</td>
      <td>${producto.descripcion}</td>
      <td>${producto.precio}</td>
      <td>${producto.stock}</td>
      <td>
        <img src="${producto.imagen}" alt="${producto.nombre}"
             style="width:60px; height:60px; object-fit:cover;">
      </td>
      <td>
        <button class="btn btn-sm btn-primary">Editar</button>
        <button class="btn btn-sm btn-danger">Eliminar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
});
