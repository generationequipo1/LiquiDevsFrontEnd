// PREGUNTAS FRECUENTES
const btnFaq = document.getElementById("btn-faq");
const faqBox = document.getElementById("faq-box");

btnFaq.addEventListener("click", () => {
    faqBox.classList.toggle("active");
});

// Abrir preguntas
document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
    q.nextElementSibling.classList.toggle("open");
  });
});



