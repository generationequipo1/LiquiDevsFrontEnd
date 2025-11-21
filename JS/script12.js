
const botonMision = document.getElementById("mision");
const botonVision = document.getElementById("vision");
const botonHistoria = document.getElementById("historia");

const textoVision = document.getElementById("p-vision").innerHTML;
const textoMision = document.getElementById("p-mision").innerHTML;
const textoHistoria = document.getElementById("p-historia").innerHTML;



function mostrarMision(){
    let textoRemplazo = document.querySelector(".texto-mostrar");
    console.log(textoRemplazo);
    textoRemplazo.innerHTML = textoMision;
}
function mostrarVision(){
    let textoRemplazo = document.querySelector(".texto-mostrar");
    console.log(textoRemplazo);
    textoRemplazo.innerHTML = textoVision;
}
function mostrarHistoria(){
    let textoRemplazo = document.querySelector(".texto-mostrar");
    console.log(textoRemplazo);
    textoRemplazo.innerHTML = textoHistoria;
}