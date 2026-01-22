const API_BASE = "http://localhost:8080";

const entradaCorreo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const botonIniciarSesion = document.getElementById("botonIniciarSesion");
const mensajeValidacion = document.getElementById("notificacion2");

let contador = 0;
const MAX_INTENTOS = 3;

botonIniciarSesion.addEventListener("click", validarContrasena);

// También permitir login con Enter
contrasena.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    validarContrasena();
  }
});

async function validarContrasena() {
  // Bloqueo por intentos fallidos
  if (contador >= MAX_INTENTOS) {
    mensajeValidacion.innerText = " Usuario bloqueado. Recarga la página para intentar de nuevo.";
    mensajeValidacion.style.color = "red";
    return;
  }

  // Validaciones básicas
  const email = entradaCorreo.value.trim();
  const password = contrasena.value.trim();

  if (!email || !password) {
    mensajeValidacion.innerText = " Completa todos los campos";
    mensajeValidacion.style.color = "orange";
    return;
  }

  if (!email.includes("@")) {
    mensajeValidacion.innerText = "⚠️ Email inválido";
    mensajeValidacion.style.color = "orange";
    return;
  }

  try {
    // Mostrar indicador de carga
    mensajeValidacion.innerText = "⏳ Verificando...";
    mensajeValidacion.style.color = "blue";
    botonIniciarSesion.disabled = true;

    //  Estructura correcta del payload
    const payload = {
      email: email,
      password: password
    };

    console.log(' Enviando login:', { email }); 

    // Endpoint correcto /auth/login
    const resp = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // Intentar dar respuesta
    const data = await resp.json().catch(() => ({}));

    console.log(' Respuesta del servidor:', data);

    //  Verificar data.success
    if (data.success && data.usuario) {
      // Login exitoso
      console.log(' Login exitoso:', data.usuario);

      // Guardar usuario en localStorage
      localStorage.setItem("usuarioLogueado", JSON.stringify(data.usuario));
      localStorage.setItem("isLoggedIn", "true");

      mensajeValidacion.innerText = " Login exitoso";
      mensajeValidacion.style.color = "green";

      // Mostrar mensaje de bienvenida
      alert(`¡Bienvenido ${data.usuario.nombre}!`);

      // Redirigir a página principal
      setTimeout(() => {
        window.location.href = "../paginaPrincipal.html";
      }, 500);

    } else {
      // Login fallido
      contador++;
      const intentosRestantes = MAX_INTENTOS - contador;

      if (intentosRestantes > 0) {
        mensajeValidacion.innerText = ` ${data.mensaje || "Usuario o contraseña incorrectos"}. Intentos restantes: ${intentosRestantes}`;
        mensajeValidacion.style.color = "red";
      } else {
        mensajeValidacion.innerText = " Usuario bloqueado por múltiples intentos fallidos";
        mensajeValidacion.style.color = "red";
        botonIniciarSesion.disabled = true;
      }

      botonIniciarSesion.disabled = false;
    }

  } catch (err) {
    console.error(' Error en login:', err);
    
    mensajeValidacion.innerText = " Error de conexión con el servidor. Verifica que el backend esté corriendo.";
    mensajeValidacion.style.color = "red";
    botonIniciarSesion.disabled = false;
  }
}

// Verificar si ya está logueado
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  
  if (isLoggedIn === "true") {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado") || "{}");
    
    if (usuario.nombre) {
      const redirigir = confirm(`Ya tienes una sesión activa como ${usuario.nombre}. ¿Quieres ir a la página principal?`);
      
      if (redirigir) {
        window.location.href = "../paginaPrincipal.html";
      } else {
        // Cerrar sesión actual
        localStorage.removeItem("usuarioLogueado");
        localStorage.removeItem("isLoggedIn");
      }
    }
  }
});

console.log(' inicioSesion.js cargado');
console.log(' API Base:', API_BASE);


/*const entradaCorreo  =document.getElementById("correo");   
const contrasena = document.getElementById("contrasena");
const botonIniciarSesion = document.getElementById("botonIniciarSesion");
const mensajeValidacion = document.getElementById("notificacion2");
//export let logeado = false; 

if (document.getElementById("botonIniciarSesion")) {
    // Tu código actual aquí
    botonIniciarSesion.addEventListener('click', validarContrasena);
    
    let contador = 0; 

    function validarContrasena(){
        //console.log(entradaCorreo.value);
        //console.log(contrasena.value);
        const validarContrasena = contrasena.value
        //console.log(validarContrasena);

        const usuario =  JSON.parse(localStorage.getItem("usuarioRegistrado")) || [];
        
        
        if(entradaCorreo.value != usuario.email || contrasena.value != usuario.password){
            contador++;
            console.log("Contraseña incorrecta, intenta de nuevo\nIntento " + contador);

            mensajeValidacion.innerText = "La contreseña incorrecta, intenta de nuevo\nIntento " + contador;
            if(contador >= 3){
                mensajeValidacion.innerText = "Usuario bloqueado por favor registrese de nuevo";   
            }


        }else{
            //logeado = true; 
            console.log("contraseña correcta, bienvenido ", usuario.nombre, " ",usuario.email);
            alert("Bienvenido "+ usuario.nombre)
            window.location.href = "../paginaPrincipal.html";
        }

    }
}

}*/
