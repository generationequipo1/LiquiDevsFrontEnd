// PREGUNTAS FRECUENTES

const btnFAQ = document.getElementById("btn-toggle");
const faqBox = document.querySelector('#faq-div');

if (btnFAQ && faqBox) {
    btnFAQ.addEventListener('click', function () {
        faqBox.classList.toggle('active');
    });
}

// Abrir y cerrar cada pregunta
const faqQuestions = document.querySelectorAll('.faq-question');

if (faqQuestions.length > 0) {
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            btn.nextElementSibling.classList.toggle('open');
        });
    });
}


// FORMULARIO – FORMSPREE

const form = document.getElementById("form-contacto");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita recargar la página

        const data = new FormData(form);

        const response = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            alert("Tu mensaje ha sido enviado correctamente ❤️");
            form.reset();
        } else {
            alert("Hubo un error al enviar el mensaje.");
        }
    });
}





