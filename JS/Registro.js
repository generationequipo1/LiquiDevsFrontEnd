const API_BASE = "http://localhost:8080";

// ====== FUNCIONES DE VALIDACIÓN ======
function marcarError(input, mensaje) {
  input.classList.add("input-error");
  input.classList.remove("input-ok");
  input.nextElementSibling.textContent = mensaje;
}

function marcarOk(input) {
  input.classList.remove("input-error");
  input.classList.add("input-ok");
  input.nextElementSibling.textContent = "";
}

// ====== VALIDACIONES INDIVIDUALES ======
function validarNombre() {
  const input = document.getElementById("nombre");
  if (input.value.trim() === "") {
    marcarError(input, "El nombre es obligatorio");
    return false;
  }
  marcarOk(input);
  return true;
}

function validarTelefono() {
  const input = document.getElementById("telefono");
  if (!/^\d{10}$/.test(input.value.trim())) {
    marcarError(input, "Debe tener 10 números");
    return false;
  }
  marcarOk(input);
  return true;
}

function validarEmail() {
  const input = document.getElementById("email");
  if (!input.value.includes("@")) {
    marcarError(input, "Correo inválido");
    return false;
  }
  marcarOk(input);
  return true;
}

function validarPassword() {
  const input = document.getElementById("password");
  if (input.value.length < 8) {
    marcarError(input, "Mínimo 8 caracteres");
    return false;
  }
  marcarOk(input);
  return true;
}

function validarDireccion() {
  const input = document.getElementById("direccion");
  if (input.value.trim() === "") {
    marcarError(input, "La dirección es obligatoria");
    return false;
  }
  marcarOk(input);
  return true;
}

// ====== EVENTOS EN TIEMPO REAL ======
document.getElementById("nombre").addEventListener("input", validarNombre);
document.getElementById("telefono").addEventListener("input", validarTelefono);
document.getElementById("email").addEventListener("input", validarEmail);
document.getElementById("password").addEventListener("input", validarPassword);
document.getElementById("direccion").addEventListener("input", validarDireccion);

// ====== SUBMIT FINAL ======
document.getElementById("formRegistro").addEventListener("submit", async function (e) {
  e.preventDefault();

  const valido =
    validarNombre() &
    validarTelefono() &
    validarEmail() &
    validarPassword() &
    validarDireccion();

  if (!valido) {
    Swal.fire({
      title: "Formulario incompleto",
      text: "Revisa los campos marcados en rojo",
      icon: "warning"
    });
    return;
  }

  // ====== PREPARAR DATOS ======
  const nombreCompleto = document.getElementById("nombre").value.trim().split(" ");
  const usuario = {
    nombre: nombreCompleto[0],
    apellido: nombreCompleto.slice(1).join(" ") || "Sin Apellido",
    email: document.getElementById("email").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    password: document.getElementById("password").value.trim(),
    confirmarPassword: document.getElementById("password").value.trim()
  };

  try {
    const resp = await fetch(`${API_BASE}/auth/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });

    const data = await resp.json();

    if (data.success) {
      Swal.fire({
        title: "¡Registro exitoso!",
        icon: "success",
        confirmButtonText: "Iniciar sesión"
      }).then(() => {
        window.location.href = "inicioSesion.html";
      });
    } else {
      throw new Error(data.mensaje);
    }

  } catch (err) {
    Swal.fire({
      title: "Error",
      text: err.message || "Error del servidor",
      icon: "error"
    });
  }
});


/*document.getElementById("formRegistro").addEventListener("submit", function(e) {
    e.preventDefault(); //borrar cuando se regcarga la pagina 

    
    let nombre = document.getElementById("nombre").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let direccion = document.getElementById("direccion").value.trim();
    let infoAdicional = document.getElementById("infoAdicional").value.trim();

     document.getElementById("errorNombre").textContent = "";//pa borrar
    document.getElementById("errorTelefono").textContent = "";
    document.getElementById("errorEmail").textContent = "";
    document.getElementById("errorPassword").textContent = "";
    
    
    let valido = true;
        if (nombre === "") {
        //document.getElementById("errorNombre").textContent = "El nombre es obligatorio";
        valido = false;
        Swal.fire({
            title: "Nombre Invalido",
            text: "El nombre es obligatorio",
            icon: "error"
        });
        return;
    }
    if (!/^\d{10}$/.test(telefono)) {
        //document.getElementById("errorTelefono").textContent = "Debe tener 10 números";
        valido = false;
        Swal.fire({
            title: "Teléfono Inválido",
            text: "Debe contener 10 números",
            icon: "error"
        });
        return;
    }
    if (!email.includes("@")) {
        //document.getElementById("errorEmail").textContent = "Correo inválido";
        valido = false;
        Swal.fire({
            title: "Correo Inválido",
            text: "Verifica tu correo",
            icon: "error"
        });
        return;
    }
    if (password.length < 8) {
        //document.getElementById("errorPassword").textContent = "Mínimo 8 caracteres";
        valido = false;
         Swal.fire({
            title: "Contraseña Inválida",
            text: "Debe tener mínimo 8 caracteres",
            icon: "error"
        });
        return;
         
    }
    if (direccion === "") { 
        //document.getElementById("errorDireccion").textContent = "La dirección es obligatoria"; // Se corrigió ID
        valido = false;
        Swal.fire({
            title: "Dirección Inválida",
            text: "La dirección es obligatoria",
            icon: "error"
        });
        return;
    }
  
    if (!valido) return;//con este return lo regresamos a donde empeiza la funcion

    
    const usuario = {
        nombre: nombre,
        telefono: telefono,
        email: email,
        password: password,
        direccion: direccion,
        infoAdicional: infoAdicional
        
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
}); */