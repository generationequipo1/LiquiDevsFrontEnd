document.addEventListener('DOMContentLoaded', function() {
    // Pequeño delay para asegurar que localStorage se actualizó
    setTimeout(() => {
        const mostrarUsuario = document.getElementById("nombreUsuarioNav");
        const irInicio = document.getElementById("botonUsuario");
        const usuario = JSON.parse(localStorage.getItem("usuarioRegistrado")) || {};
        
        // Actualizar nombre
        if (mostrarUsuario) {
            mostrarUsuario.textContent = usuario.nombre || "Invitado";
            console.log("Nombre actualizado:", usuario.nombre || "Invitado");
        }
        
        // Evento del botón
        if (irInicio) {
    irInicio.addEventListener('click', () => {
        const usuarioActual = JSON.parse(localStorage.getItem("usuarioRegistrado")) || {};
        
        if (usuarioActual.email) {
            // Alert con opción de cerrar sesión
            const confirmar = confirm(
                `Ya estás logeado como: ${usuarioActual.nombre}\n\n` +
                `¿Quieres cerrar sesión?`
            );
            
            if (confirmar) {
                // Cerrar sesión
                //localStorage.removeItem("usuarioRegistrado");
                alert("Sesión cerrada correctamente");
                window.location.href = "../HTML/iniciosesion.html";
            }
        } else {
            window.location.href = "../HTML/iniciosesion.html";
        }
    });
}
    }, 100); // 100ms de delay
});


/*document.addEventListener('DOMContentLoaded', function() {
    const usuario = JSON.parse(localStorage.getItem("usuarioRegistrado")) || {};
    console.log();
    const mostrarUsuario = document.getElementById("nombreUsuarioNav");
    const irInicio = document.getElementById("botonUsuario");

    // Actualizar nombre
    if (mostrarUsuario.textContent =="Invitado") {
        mostrarUsuario.textContent = usuario.nombre;
    }

    if (irInicio) {
        irInicio.addEventListener('click', function() {
            // Verificar si hay usuario en localStorage
            const usuarioActual = JSON.parse(localStorage.getItem("usuarioRegistrado")) || {};
            
            if (usuarioActual.email && usuarioActual.nombre) {
                alert("Ya tienes sesión iniciada como: " + usuarioActual.nombre);
            } else {
                window.location.href = "../HTML/iniciosesion.html";
            }
        });
    }
});
*/

/*
import { logeado } from "./iniciosesion.js";
document.addEventListener('DOMContentLoaded', function() {

console.log(logeado);

const usuario = JSON.parse(localStorage.getItem("usuarioRegistrado")) || [];

console.log(usuario.nombre);

const mostrarUsuario = document.getElementById("nombreUsuarioNav");
const irInicio = document.getElementById("botonUsuario");

        if (mostrarUsuario && usuario && usuario.nombre) {
            mostrarUsuario.textContent = usuario.nombre;
        } else {
            mostrarUsuario.textContent = "Invitado";
            irInicio.addEventListener('click', redirigirInicioSesion);
        }


    function redirigirInicioSesion (){
        const usuario = JSON.parse(localStorage.getItem("usuarioRegistrado")) || {};
    
        if (usuario.email && usuario.nombre) {
            alert("Ya tienes la sesión iniciada como: " + usuario.nombre);
        } else {
            window.location.href = "../HTML/iniciosesion.html";
        }
    }
});

*/