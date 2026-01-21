const API_BASE = "http://localhost:8080";

const entradaCorreo  = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const botonIniciarSesion = document.getElementById("botonIniciarSesion");
const mensajeValidacion = document.getElementById("notificacion2");

botonIniciarSesion.addEventListener("click", validarContrasena);

let contador = 0;

async function validarContrasena() {
  // bloqueo en frontend (opcional)
  if (contador >= 3) {
    mensajeValidacion.innerText = "Usuario bloqueado";
    return;
  }

  try {
    const payload = {
      email: entradaCorreo.value.trim(),
      password: contrasena.value.trim()
    };

    const resp = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      contador++;
      mensajeValidacion.innerText = `Usuario o contraseña incorrectos. Intento ${contador}`;
      if (contador >= 3) mensajeValidacion.innerText = "Usuario bloqueado";
      return;
    }

    const user = await resp.json();

    localStorage.setItem("usuarioLogueado", JSON.stringify(user));

    alert("Bienvenido " + (user.nombre || ""));
    window.location.href = "../paginaPrincipal.html";

  } catch (err) {
    mensajeValidacion.innerText = "Error de conexión con el servidor";
  }
}




/*const entradaCorreo  =document.getElementById("correo");   
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