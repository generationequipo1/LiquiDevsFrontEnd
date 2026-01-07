// ======================
// Validación - Contactanos finales
// ======================
const form = document.getElementById("form-contacto");
const btnEnviar = document.getElementById("btn-enviar");
const statusEl = document.getElementById("form-status");

const fields = {
  email: document.getElementById("email"),
  nombre: document.getElementById("nombre"),
  telefono: document.getElementById("telefono"),
  mensaje: document.getElementById("mensaje"),
};

const validators = {
  email: (value) => {
    const v = value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
    return ok ? { ok: true, msg: "Correo válido." } : { ok: false, msg: "Ingresa un correo válido (ej: correo@dominio.com)." };
  },
  nombre: (value) => {
    const v = value.trim();
    if (v.length < 3) return { ok: false, msg: "El nombre debe tener al menos 3 caracteres." };
    return { ok: true, msg: "Nombre válido." };
  },
  telefono: (value) => {
    const v = value.replace(/\s+/g, "").trim();
    const ok = /^[0-9]{7,12}$/.test(v);
    return ok ? { ok: true, msg: "Teléfono válido." } : { ok: false, msg: "Usa solo números (7 a 12 dígitos)." };
  },
  mensaje: (value) => {
    const v = value.trim();
    if (v.length < 10) return { ok: false, msg: "El mensaje debe tener al menos 10 caracteres." };
    return { ok: true, msg: "Mensaje listo para enviar." };
  },
};

function setFieldState(inputEl, result) {
  const wrapper = inputEl.closest(".field");
  const msgEl = wrapper.querySelector(".msg");

  wrapper.classList.remove("is-ok", "is-error");

  // Si está vacío, no lo marcamos en verde aún (pero sí podemos orientar)
  if (inputEl.value.trim() === "") {
    msgEl.textContent = "Este campo es obligatorio.";
    wrapper.classList.add("is-error");
    return false;
  }

  if (result.ok) {
    wrapper.classList.add("is-ok");
    msgEl.textContent = result.msg;
    return true;
  } else {
    wrapper.classList.add("is-error");
    msgEl.textContent = result.msg;
    return false;
  }
}

function validateAll() {
  const rEmail = setFieldState(fields.email, validators.email(fields.email.value));
  const rNombre = setFieldState(fields.nombre, validators.nombre(fields.nombre.value));
  const rTel = setFieldState(fields.telefono, validators.telefono(fields.telefono.value));
  const rMsg = setFieldState(fields.mensaje, validators.mensaje(fields.mensaje.value));

  const allOk = rEmail && rNombre && rTel && rMsg;

  btnEnviar.disabled = !allOk;

  if (allOk) {
    statusEl.textContent = "Todo listo. Puedes enviar el mensaje.";
    statusEl.style.color = "#1e8e3e";
  } else {
    statusEl.textContent = "Completa correctamente los campos para habilitar el envío.";
    statusEl.style.color = "#6b7280";
  }

  return allOk;
}

// Validación en tiempo real
Object.values(fields).forEach((input) => {
  input.addEventListener("input", validateAll);
  input.addEventListener("blur", validateAll);
});

// Estado inicial
validateAll();

// Submit Formspree 
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const ok = validateAll();
    if (!ok) return;

    btnEnviar.disabled = true;
    statusEl.textContent = "Enviando mensaje...";
    statusEl.style.color = "#6b7280";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        statusEl.textContent = "Mensaje enviado correctamente. Te responderemos pronto.";
        statusEl.style.color = "#1e8e3e";
        form.reset();
        validateAll();
      } else {
        statusEl.textContent = "Hubo un error al enviar. Intenta nuevamente.";
        statusEl.style.color = "#c0392b";
        btnEnviar.disabled = false;
      }
    } catch (err) {
      statusEl.textContent = "Error de conexión. Revisa tu internet e intenta de nuevo.";
      statusEl.style.color = "#c0392b";
      btnEnviar.disabled = false;
    }
  });
}

// ======================
// FAQ: acordeon
// ======================
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((btn) => {
  btn.addEventListener("click", () => {
    // cerrar los otros
    faqQuestions.forEach((other) => {
      if (other !== btn) {
        other.setAttribute("aria-expanded", "false");
        const otherAnswer = other.parentElement.querySelector(".faq-answer");
        otherAnswer.hidden = true;
      }
    });

    // toggle del actual
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!expanded));
    const answer = btn.parentElement.querySelector(".faq-answer");
    answer.hidden = expanded;
  });
});

// ======================
// Scroll FAQ
// ======================
const btnFaqAnchor = document.getElementById("btn-faq");
if (btnFaqAnchor) {
  btnFaqAnchor.addEventListener("click", (e) => {
    // Deja funcionar el href, pero con scroll suave
    e.preventDefault();
    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}




