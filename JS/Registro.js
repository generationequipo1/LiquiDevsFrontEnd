
document.getElementById("formRegistro").addEventListener("submit", function(e) {
    e.preventDefault(); //borrar cuando se regcarga la pagina 

    
    let nombre = document.getElementById("nombre").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

     document.getElementById("errorNombre").textContent = "";//pa borrar
    document.getElementById("errorTelefono").textContent = "";
    document.getElementById("errorEmail").textContent = "";
    document.getElementById("errorPassword").textContent = "";
    
    let valido = true;
        if (nombre === "") {
        //document.getElementById("errorNombre").textContent = "El nombre es obligatorio";
        valido = false;
        Swal.fire({
            title: "NOMBRE INVALIDO",
            text: "El Nombre es obligatorio",
            icon: "error"
        });
        return;
    }
    if (!/^\d{10}$/.test(telefono)) {
        //document.getElementById("errorTelefono").textContent = "Debe tener 10 números";
        valido = false;
        Swal.fire({
            title: "TELEFONO INVALIDO",
            text: "debe contener 10 numeros",
            icon: "error"
        });
        return;
    }
    if (!email.includes("@")) {
        //document.getElementById("errorEmail").textContent = "Correo inválido";
        valido = false;
        Swal.fire({
            title: "CORREO INVALIDO",
            text: "verifica tu correo",
            icon: "error"
        });
        return;
    }
    if (password.length < 8) {
        //document.getElementById("errorPassword").textContent = "Mínimo 8 caracteres";
        valido = false;
         Swal.fire({
            title: "CONTRASEÑA INVALIDA",
            text: "debe tener minimo 8 caracteres",
            icon: "error"
        });
        return;
    }
    if (!valido) return;//con este return lo regresamos a donde empeiza la funcion

    
    let usuario = {
        nombre: nombre,
        telefono: telefono,
        email: email,
        password: password
    };

    
    localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));

    
    //document.getElementById("mensajeExito").textContent =
       // "USUARIO REGISTRADO";
        Swal.fire({
        title: '¡Éxito!',
        text: 'Usuario registrado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
});

    
    document.getElementById("formRegistro").reset();
});
