const entradaCorreo  =document.getElementById("correo");   
const contrasena = document.getElementById("contrasena");
const botonIniciarSesion = document.getElementById("botonIniciarSesion");
const mensajeValidacion = document.getElementById("notificacion2");

botonIniciarSesion.addEventListener('click', validarContrasena);
let contador =0; 
function validarContrasena(){
    //console.log(entradaCorreo.value);
    //console.log(contrasena.value);
    const validarContrasena = contrasena.value
    //console.log(validarContrasena);

    const usuario =  JSON.parse(localStorage.getItem("usuarioRegistrado")) || [];
    
    
    if(entradaCorreo.value != usuario.email || contrasena.value != usuario.password){
        contador++;
        console.log("Contraseña incorrecta, intenta de nuevo\nIntento " + contador);

        mensajeValidacion.innerText = "Contraseña o Usuario incorrecto, intenta de nuevo\nIntento " + contador;
        if(contador >= 3){
            mensajeValidacion.innerText = "Usuario bloqueado";   
        }


    }else{
        console.log("contraseña correcta, bienvenido ", usuario.nombre);
        alert("Bienvenido "+ usuario.nombre)
        window.location.href = "../paginaPrincipal.html";
    }

}