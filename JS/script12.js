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