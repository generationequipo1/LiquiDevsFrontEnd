const textoVision = document.getElementById("p-vision").innerHTML;
const textoMision = document.getElementById("p-mision").innerHTML;
const textoHistoria = document.getElementById("p-historia").innerHTML;



function mostrarMision(){
    let tituloReemplazo = document.querySelector("#titulo-txt");
    tituloReemplazo.innerHTML = "Mision";
    let textoRemplazo = document.querySelector(".texto-mostrar");
    console.log(textoRemplazo);
    textoRemplazo.innerHTML = textoMision;
}
function mostrarVision(){
    let tituloReemplazo = document.querySelector("#titulo-txt");
    tituloReemplazo.innerHTML = "Vision";
    let textoRemplazo = document.querySelector(".texto-mostrar");
    console.log(textoRemplazo);
    textoRemplazo.innerHTML = textoVision;
}
function mostrarHistoria(){
    let tituloReemplazo = document.querySelector("#titulo-txt");
    tituloReemplazo.innerHTML = "Historia";
    let textoRemplazo = document.querySelector(".texto-mostrar");
    console.log(textoRemplazo);
    textoRemplazo.innerHTML = textoHistoria;
}

// Contenido de Botones generales de acerca de nosotros

const botones = document.querySelectorAll(".boton"); 
const contenidos = document.querySelectorAll(".tab-content"); // contenido Botones: (visión, misión, historia)

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        botones.forEach(b => b.classList.remove("active")); // Quitar la clase active de todos los botones
        contenidos.forEach(c => c.classList.remove("active")); // quitar los botonestextos
        boton.classList.add("active"); // Activar el botón que se clickea

        const idContenido = "txt-" + boton.id;
        document.getElementById(idContenido).classList.add("active"); // Mostrar el contenido correcto
    });
});
