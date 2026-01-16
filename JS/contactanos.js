const form = document.getElementById("form-contacto");
const btnEnviar = document.getElementById("btn-enviar");
const fields = {
  email: document.getElementById("email"),
  nombre: document.getElementById("nombre"),
  telefono: document.getElementById("telefono"),
  mensaje: document.getElementById("mensaje")
};
const validators = {
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v.trim()) ? { ok: true, msg: "Correo válido." } : { ok: false, msg: "Ingresa un correo válido." },
  nombre: (v) => v.trim().length >= 3 ? { ok: true, msg: "Nombre válido." } : { ok: false, msg: "Mínimo 3 caracteres." },
  telefono: (v) => /^[0-9]{7,12}$/.test(v.replace(/\s+/g, "").trim()) ? { ok: true, msg: "Teléfono válido." } : { ok: false, msg: "Usa 7 a 12 números." },
  mensaje: (v) => v.trim().length >= 10 ? { ok: true, msg: "Mensaje listo." } : { ok: false, msg: "Mínimo 10 caracteres." }
};
function updateFieldVisuals(inputEl, forceShow = false) {
  const wrapper = inputEl.closest(".field");
  const msgEl = wrapper.querySelector(".msg");
  const valResult = validators[inputEl.id](inputEl.value);
  const isDirty = inputEl.dataset.touched === "true";
  wrapper.classList.remove("is-ok", "is-error");
  if (inputEl.value.trim() === "") {
    if (forceShow || isDirty) {
      wrapper.classList.add("is-error");
      msgEl.textContent = "Este campo es obligatorio.";
    }
    return false;
  }
  if (valResult.ok) {
    if (isDirty) wrapper.classList.add("is-ok");
    msgEl.textContent = valResult.msg;
    return true;
  } else {
    if (forceShow || isDirty) {
      wrapper.classList.add("is-error");
      msgEl.textContent = valResult.msg;
    }
    return false;
  }
}
function checkAll() {
  const rEmail = updateFieldVisuals(fields.email, false);
  const rNombre = updateFieldVisuals(fields.nombre, false);
  const rTel = updateFieldVisuals(fields.telefono, false);
  const rMsg = updateFieldVisuals(fields.mensaje, false);
  const allOk = rEmail && rNombre && rTel && rMsg;
  btnEnviar.disabled = !allOk;
  return allOk;
}
Object.values(fields).forEach((input) => {
  input.addEventListener("input", () => {
    input.dataset.touched = "true";
    checkAll();
  });
  input.addEventListener("blur", () => {
    input.dataset.touched = "true";
    updateFieldVisuals(input, true);
    checkAll();
  });
});
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ok = Object.values(fields).every(input => updateFieldVisuals(input, true));
    if (!ok) return;
    btnEnviar.disabled = true;
    Swal.fire({
      title: 'Enviando mensaje...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });
      Swal.close();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Mensaje enviado!',
          text: 'Tu mensaje se ha enviado correctamente. Te responderemos pronto.',
          confirmButtonText: 'Aceptar'
        });
        form.reset();
        Object.values(fields).forEach(input => {
          delete input.dataset.touched;
          input.closest(".field").classList.remove("is-ok", "is-error");
        });
        checkAll();
      } else {
        throw new Error();
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar el mensaje. Intenta nuevamente.',
        confirmButtonText: 'Aceptar'
      });
      btnEnviar.disabled = false;
    }
  });
}
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const isExpanded = btn.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".faq-question").forEach(other => {
      other.setAttribute("aria-expanded", "false");
      other.nextElementSibling.hidden = true;
    });
    if (!isExpanded) {
      btn.setAttribute("aria-expanded", "true");
      btn.nextElementSibling.hidden = false;
    }
  });
});
