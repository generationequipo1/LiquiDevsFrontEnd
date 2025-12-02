
 // Funcion guardar informacion de productos 

 function guardarProducto(event) {
  event.preventDefault(); // evitar recarga

  const nombre = document.getElementById('productName').value;
  const precio = document.getElementById('productPrice').value;
  const stock  = document.getElementById('productStock').value;
  const categoria = document.getElementById('productCategory').value;
  const descripcion = document.getElementById('productDescription').value;
  const imagen = document.getElementById('productImagePreview').src || '';

  const producto = { nombre, precio, stock, categoria, descripcion, imagen };

  // Leer lista existente o crear una nueva
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos.push(producto);

  // Guardar en localStorage
  localStorage.setItem('productos', JSON.stringify(productos));

  // Mostrar la lista de productos en formato JSON en la consola
  console.log('Lista de productos:', JSON.stringify(productos, null, 2));

  // Redirigir al inventario
  window.location.href = 'inventario.html';
 }


 
 
 // Previsualizacion de imagenes 
 function previewProductImage(event) {
  const input = event.target;
  const preview = document.getElementById('productImagePreview');
  const text = document.querySelector('.image-box .image-text');

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.classList.remove('d-none');
      text.classList.add('d-none');
    };

    reader.readAsDataURL(input.files[0]);
  }
}

 // Activación del CRUD de productos
function previewProductImage(event) {
  const input = event.target;
  const preview = document.getElementById('productImagePreview');
  const text = document.querySelector('.image-box .image-text');

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.classList.remove('d-none');
      text.classList.add('d-none');
    };

    reader.readAsDataURL(input.files[0]);
  }
}

// Añadir las funciones de validación de Bootstrap
(function () {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener(
      'submit',
      event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      },
      false
    );
  });
})();


