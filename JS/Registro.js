const API_BASE = "http://localhost:8080";

// ---------- REGISTRO ----------
document.getElementById("formRegistro").addEventListener("submit", async function (e) {
  e.preventDefault(); // evita recarga

  // Obtener valores
  let nombre = document.getElementById("nombre").value.trim();
  let telefono = document.getElementById("telefono").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let direccion = document.getElementById("direccion").value.trim();
  let infoAdicional = document.getElementById("infoAdicional")?.value.trim() || "";

  // Limpiar mensajes de error previos
  document.getElementById("errorNombre").textContent = "";
  document.getElementById("errorTelefono").textContent = "";
  document.getElementById("errorEmail").textContent = "";
  document.getElementById("errorPassword").textContent = "";

  let valido = true;

  // ========== VALIDACIONES ==========
  
  if (nombre === "") {
    valido = false;
    Swal.fire({ 
      title: "Nombre Inválido", 
      text: "El nombre es obligatorio", 
      icon: "error" 
    });
    return;
  }

  if (!/^\d{10}$/.test(telefono)) {
    valido = false;
    Swal.fire({ 
      title: "Teléfono Inválido", 
      text: "Debe contener 10 números", 
      icon: "error" 
    });
    return;
  }

  if (!email.includes("@")) {
    valido = false;
    Swal.fire({ 
      title: "Correo Inválido", 
      text: "Verifica tu correo", 
      icon: "error" 
    });
    return;
  }

  if (password.length < 8) {
    valido = false;
    Swal.fire({ 
      title: "Contraseña Inválida", 
      text: "Debe tener mínimo 8 caracteres", 
      icon: "error" 
    });
    return;
  }

  if (direccion === "") {
    valido = false;
    Swal.fire({ 
      title: "Dirección Inválida", 
      text: "La dirección es obligatoria", 
      icon: "error" 
    });
    return;
  }

  if (!valido) return;

  // ========== PREPARAR DATOS PARA ENVIAR ==========
  // Esto  Separa nombre en nombre y apellido
  const nombreCompleto = nombre.split(" ");
  const primerNombre = nombreCompleto[0];
  const apellido = nombreCompleto.slice(1).join(" ") || ""; // Si no hay apellido, enviar vacío

  // Estructura correcta según el backend
  const usuario = {
    nombre: primerNombre,
    apellido: apellido || "Sin Apellido", // Backend requiere apellido
    email: email,
    telefono: telefono,
    password: password, 
    confirmarPassword: password // Backend valida que coincidan
  };

  console.log('📤 Enviando registro:', usuario);

  try {
    // CORRECCIÓN: Endpoint correcto es /auth/registro (no /auth/register)
    const resp = await fetch(`${API_BASE}/auth/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });

    // Intentar parsear la respuesta
    const data = await resp.json().catch(() => ({}));

    console.log('📥 Respuesta del servidor:', data);

    //  CORRECCIÓN: Verificar data.success
    if (data.success) {
      // Registro exitoso
      Swal.fire({
        title: "¡Éxito!",
        text: data.mensaje || "Usuario registrado correctamente",
        icon: "success",
        confirmButtonText: "Ir a Iniciar Sesión"
      }).then(() => {
        // Redirigir al login
        window.location.href = "inicioSesion.html";
      });

      document.getElementById("formRegistro").reset();

    } else {
      // Error reportado por el backend
      throw new Error(data.mensaje || "Error desconocido");
    }

  } catch (err) {
    console.error('❌ Error en registro:', err);
    
    Swal.fire({
      title: "No se pudo registrar",
      text: err.message || "Error de conexión con el servidor",
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