// productos.js (carga de productos desde backend)
const API_URL = "http://localhost:8080/productos";

// Funciones para detectar tipo, sabores y emoción a partir del nombre
function detectarTipo(nombre = "") {
  const n = nombre.toLowerCase();
  if (n.includes("cono")) return "cono";
  if (n.includes("vaso")) return "vaso";
  return "vaso";
}

function detectarSabores(nombre = "") {
  const n = nombre.toLowerCase();
  const sabores = [];
  if (n.includes("vainilla")) sabores.push("vainilla");
  if (n.includes("chocolate")) sabores.push("chocolate");
  if (n.includes("fresa")) sabores.push("fresa");
  if (n.includes("limón") || n.includes("limon")) sabores.push("limon");
  if (n.includes("frutos rojos")) sabores.push("frutos rojos");
  if (n.includes("pistacho")) sabores.push("pistacho");
  if (n.includes("tiramisu") || n.includes("tiramisú")) sabores.push("tiramisu");
  return sabores;
}

function detectarEmocion(nombre = "") {
  const n = nombre.toLowerCase();
  if (n.includes("limón") || n.includes("limon")) return "refrescante";
  if (n.includes("chocolate") || n.includes("tiramisu") || n.includes("tiramisú")) return "intenso";
  if (n.includes("vainilla") || n.includes("pistacho")) return "relajado";
  return "feliz";
}

function mapProductoBackend(p) {
  // imagen url para catálogoSLL
  const imagen = p.imagenUrl
    ? `../Assets/${p.imagenUrl}`
    : "../Assets/Helados/cono-vainilla.png";

  const nombre = p.nombre ?? "Sin nombre";

  return {
    id: Number(p.idProducto),
    nombre,
    descripcion: p.descripcion ?? "",
    precio: Number(p.precio ?? 0),
    stock: p.stock ?? 0,
    categoria: p.categoria ?? "Tradicional",
    imagen,

    // campos que usa catálogoSLL:
    tipo: detectarTipo(nombre),
    sabores: detectarSabores(nombre),
    mixto: nombre.toLowerCase().includes("mixto") || detectarSabores(nombre).length > 1,
    emocion: detectarEmocion(nombre),
  };
}

async function cargarProductosDesdeBackend() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error consultando backend");

    const data = await res.json();

    // Normaliza al formato del catálogo
    window.productos = (Array.isArray(data) ? data : []).map(mapProductoBackend);

    console.log("Productos cargados desde backend:", window.productos);

    // Dispara evento para que catalogoSLL inicialice
    window.dispatchEvent(new Event("productosCargados"));
  } catch (error) {
    console.error("No se pudieron cargar productos:", error);
    window.productos = [];
    window.dispatchEvent(new Event("productosCargados"));
  }
}

cargarProductosDesdeBackend();


