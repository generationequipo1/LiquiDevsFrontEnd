const form = document.getElementById("form-contacto");

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
// preguntas frecuentes
const btnFAQ = document.querySelector('.btn-faq-toggle');
const faqBox = document.querySelector('.faq-box');

btnFAQ.addEventListener('click', () => {
    faqBox.classList.toggle('oculto');
});

// Abrir y cerrar cada pregunta
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        btn.nextElementSibling.classList.toggle('open');
    });
});


