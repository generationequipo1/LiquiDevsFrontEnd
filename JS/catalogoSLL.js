
//boton_borrar.addEventListener('click',mostrarOpciones);
const productosPredefinidos =[{
    imagen: "../Assets/Helados/copa_copa_de_helado_fresa.png",
    nombre: "Copa de Helado",
    categoria:"Copa",
    sabores: "Fresa",
    precio: 19000
},{
    imagen: "../Assets/Helados/cono_de_crema_choc_vain.png",
    nombre: "Helado de crema",
    categoria:"Helado",
    sabores: "chocolate - Vainilla",
    precio: 8000
},
{
    imagen: "../Assets/Helados/helado_de_limon.png",
    nombre: "Helado de Limon",
    categoria:"Helado",
    sabores: "Limon",
    precio: 36000
},
{
    imagen: "../Assets/Helados/waffle_y_helado.png",
    nombre: "Waffle helado",
    categoria:"Waffle",
    sabores: "vainilla con M&M",
    precio: 17000
},
{
    imagen: "../Assets/Helados/helado_knickerbocker.png",
    nombre: "Helado Knickerbocker",
    categoria:"Helado",
    sabores: "Chocolate - Fresas - M&M - Galletas",
    precio: 21000
},
{
    imagen: "../Assets/Helados/cono_fresa.png",
    nombre: "Helado de Crema",
    categoria:"Helado",
    sabores: "Fresa",
    precio: 8000
},
{
    imagen: "../Assets/Helados/copa_helado_fresa_maracuya_limon.png",
    nombre: "Copa de Helado",
    categoria:"Copa",
    sabores: "Limon - Maracuya - Fresa",
    precio: 16000
},

]

localStorage.setItem("productos-predefinidos",JSON.stringify(productosPredefinidos));
document.addEventListener('DOMContentLoaded', function(){
    
    const tarjetaCatalogo = document.getElementsByClassName("tarjeta-producto");

    const productos = JSON.parse(localStorage.getItem("productos"));
    console.log(productos);

   crearTarjetasCatalogoFijo();
    
});





function crearTarjetasCatalogoFijo(){

    

    for(const producto of productosPredefinidos){
        const containerCatalogo = document.getElementById("container-cards-fijas")
        //Colocar un for para crear en masa
        // contenedor Tarjeta de productos
        const tarjetaProducto = document.createElement("div");
        tarjetaProducto.classList.add("tarjeta-producto");
        
        //Imagen
        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        //Contenedor texto
        const contenedorTexto = document.createElement("div");
        contenedorTexto.classList.add("texto-tarjeta");
        //contenido texto
        const titulo = document.createElement("h3");
        titulo.classList.add("titulo-tarjeta");
        titulo.textContent = producto.nombre;
        const categoria = document.createElement("p");
        categoria.classList.add("categoria")
        categoria.textContent = producto.categoria;
        const sabores = document.createElement("p");
        sabores.classList.add("sabores")
        sabores.textContent = producto.sabores;
        const precio = document.createElement("p");
        precio.classList.add("precio")
        precio.textContent = `$${producto.precio.toLocaleString("es-CO")}`;
        const boton = document.createElement("button");
        boton.classList.add("boton");
        boton.textContent = "Lo quiero!"

         //agregar informacion a contenedor de texto
        contenedorTexto.append(titulo,categoria,sabores,precio,boton);
        //Agregar elementos a contenedor tarjeta producto
        tarjetaProducto.append(imagen,contenedorTexto);
        //Agregar tarjeta a container de tarjetas
        containerCatalogo.appendChild(tarjetaProducto);
    }

}
