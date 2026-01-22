// ../JS/AdminCrud.js 
// API real según tu controller: @RequestMapping("/productos")
const API_URL = "http://localhost:8080/productos";

// Estado de edición
let editandoId = null;

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
const botonBorrarSeleccionados = document.getElementById("boton-eliminar-producto");

const contador = document.getElementById("contador-elementos-inventario");
const tablaBody = document.querySelector("tbody");

// ------------------------------
// INICIO DE LA APLICACIÓN
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Cargar desde backend
  cargarInventarioDesdeBackend();

  // Mostrar/ocultar sección crear
  botonActivarSeccionCrear.addEventListener("click", mostrarSeccionAgregarProducto);

  // Borrar seleccionados
  botonBorrarSeleccionados.addEventListener("click", borrarSeleccionados);

  // formuario submit
  form.addEventListener("submit", guardarProducto);
});

// ------------------------------
// Funciones UI
// ------------------------------
function mostrarSeccionAgregarProducto() {
  crearProductoSeccion.classList.toggle("noActive");
  crearProductoSeccion.classList.toggle("container", "py-5");

  // Se abre para crear nuevo producto
  if (!crearProductoSeccion.classList.contains("noActive") && editandoId === null) {
    limpiarFormulario();
  }
}

// Vista previa de imagen al seleccionar archivo
function previewProductImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    imgPreview.src = e.target.result;
    imgPreview.classList.remove("d-none");
    const text = document.querySelector(".image-text");
    if (text) text.style.display = "none";
  };
  reader.readAsDataURL(file);
}

// ------------------------------
// backend CRUD
// ------------------------------
async function cargarInventarioDesdeBackend() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error cargando productos: " + res.status);

    const productos = await res.json(); // trae idProducto, nombre, etc.

    pintarTabla(productos);
    if (contador) contador.textContent = productos.length;

  } catch (err) {
    console.error(err);
    tablaBody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center; opacity:.7; padding: 16px;">
          No se pudieron cargar productos desde el backend.
          Revisa que el backend esté corriendo y CORS permitido.
        </td>
      </tr>`;
    if (contador) contador.textContent = "0";
  }
}

function pintarTabla(productos) {
  tablaBody.innerHTML = "";

  productos.forEach((p, index) => {
    const tr = document.createElement("tr");
    tr.classList.add("fila");
// idproducto en backend
    const id = p.idProducto;

    tr.innerHTML = `
      <td>
        <input type="checkbox" class="selector-producto" data-id="${id}">
      </td>
      <td>${index + 1}</td>
      <td>${escapeHtml(p.nombre ?? "")}</td>
      <td>${escapeHtml(p.descripcion ?? "")}</td>
      <td>${formatPrecio(p.precio)}</td>
      <td>${p.stock ?? 0}</td>
      <td>
        ${p.imagenUrl ? `<img src="${p.imagenUrl}" style="width:60px;height:60px;object-fit:cover;border-radius:10px;">` : ""}
      </td>
      <td style="display:flex; gap:8px;">
        <button class="btn btn-warning btn-sm" data-action="edit" data-id="${id}">Editar</button>
        <button class="btn btn-danger btn-sm" data-action="delete" data-id="${id}">Eliminar</button>
      </td>
    `;

    tablaBody.appendChild(tr);
  });
}
// Manejo de botones Editar/Eliminar en tabla
document.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;
  const id = btn.dataset.id;

  if (action === "delete") {
    await eliminarProductoBackend(id);
    await cargarInventarioDesdeBackend();
  }

  if (action === "edit") {
    await cargarProductoEnFormularioParaEditar(id);
  }
});

async function cargarProductoEnFormularioParaEditar(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("No se pudo consultar el producto: " + res.status);

    const p = await res.json();

    // set edición
    editandoId = p.idProducto;

    // abrir formulario si está cerrado
    if (crearProductoSeccion.classList.contains("noActive")) {
      mostrarSeccionAgregarProducto();
    }

    // cargar datos
    nameInput.value = p.nombre ?? "";
    descInput.value = p.descripcion ?? "";
    priceInput.value = p.precio ?? 0;
    stockInput.value = p.stock ?? 0;

    // tu select tiene opciones Copas/Helados/Wafles...
    if (p.categoria) {
      // intenta setear; si no existe en options, no rompe
      categoryInput.value = p.categoria;
    }

    // imagen
    if (p.imagenUrl) {
      imgPreview.src = p.imagenUrl;
      imgPreview.classList.remove("d-none");
      const text = document.querySelector(".image-text");
      if (text) text.style.display = "none";
    } else {
      imgPreview.classList.add("d-none");
      const text = document.querySelector(".image-text");
      if (text) text.style.display = "block";
    }

    // feedback mínimo
    console.log("Editando producto id:", editandoId);

  } catch (err) {
    console.error(err);
    alert("No se pudo cargar el producto para editar.");
  }
}

async function guardarProducto(e) {
  e.preventDefault();

  // Validación básica
  const nombre = nameInput.value.trim();
  if (!nombre) {
    alert("El nombre del producto es obligatorio.");
    return;
  }

  const precio = Number(priceInput.value);
  if (!Number.isFinite(precio) || precio <= 0) {
    alert("El precio debe ser mayor a 0.");
    return;
  }

  const stock = Number(stockInput.value);
  if (!Number.isFinite(stock) || stock < 0) {
    alert("El stock debe ser 0 o mayor.");
    return;
  }

  const categoria = categoryInput.value;
  const descripcion = descInput.value.trim();

  let imagenUrl = "";
  if (imgPreview && !imgPreview.classList.contains("d-none") && imgPreview.src) {
    // Si es una URL http(s), úsala
    if (imgPreview.src.startsWith("http://") || imgPreview.src.startsWith("https://")) {
      imagenUrl = imgPreview.src;
    } else {
      // Si es base64 (data:image/...), pedimos URL (recomendado)
      imagenUrl = prompt("Pega la URL pública de la imagen (recomendado).") || "";
    }
  } else {
    imagenUrl = prompt("Pega la URL pública de la imagen (opcional).") || "";
  }

  const payload = {
    nombre,
    descripcion,
    // BigDecimal en backend acepta número o string; enviamos número
    precio,
    stock,
    categoria,
    imagenUrl
    // fechaCreacion y estado los maneja tu service
  };

  try {
    if (editandoId === null) {
      // CREAR
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errBody = await safeJson(res);
        throw new Error(errBody?.mensaje || "No se pudo crear el producto.");
      }

      alert("Producto creado en backend ✅");
    } else {
      // ACTUALIZAR
      const res = await fetch(`${API_URL}/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errBody = await safeJson(res);
        throw new Error(errBody?.mensaje || "No se pudo actualizar el producto.");
      }

      alert("Producto actualizado ✅");
    }

    // reset y recargar tabla
    limpiarFormulario();
    await cargarInventarioDesdeBackend();

  } catch (err) {
    console.error(err);
    alert(err.message || "Error guardando producto.");
  }
}

async function eliminarProductoBackend(id) {
  if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!res.ok) {
      const errBody = await safeJson(res);
      throw new Error(errBody?.mensaje || "No se pudo eliminar el producto.");
    }

    alert("Producto eliminado ✅");
  } catch (err) {
    console.error(err);
    alert(err.message || "Error eliminando producto.");
  }
}

async function borrarSeleccionados() {
  const checks = document.querySelectorAll('input.selector-producto:checked');
  if (!checks.length) {
    alert("No seleccionaste productos.");
    return;
  }

  if (!confirm(`¿Eliminar ${checks.length} producto(s) seleccionados?`)) return;

  // borrar uno por uno
  for (const chk of checks) {
    const id = chk.dataset.id;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errBody = await safeJson(res);
        console.warn("No se pudo borrar id", id, errBody);
      }
    } catch (err) {
      console.warn("Error borrando id", id, err);
    }
  }

  await cargarInventarioDesdeBackend();
}

// limpia el formulario y estado de edición
function limpiarFormulario() {
  editandoId = null;
  form.reset();

  if (imgPreview) {
    imgPreview.src = "";
    imgPreview.classList.add("d-none");
  }
  const text = document.querySelector(".image-text");
  if (text) text.style.display = "block";

  // opcional: cerrar panel al guardar
  if (!crearProductoSeccion.classList.contains("noActive")) mostrarSeccionAgregarProducto();
}

function formatPrecio(valor) {
  const n = Number(valor ?? 0);
  return n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function safeJson(res) {
  try { return await res.json(); } catch { return null; 
  }
}

 