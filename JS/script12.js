const textoVision = document.getElementById("p-vision").innerHTML;
const textoMision = document.getElementById("p-mision").innerHTML;
const textoHistoria = document.getElementById("p-historia").innerHTML;



function mostrarMision(){
    let tituloReemplazo = document.querySelector("#titulo-txt");
    tituloReemplazo.innerHTML = "Mision";
    let textoRemplazo = document.querySelector(".texto-mostrar");
    console.log(textoRemplazo);
    textoRemplazo.innerHTML = textoMision;
}
function mostrarVision(){
    let tituloReemplazo = document.querySelector("#titulo-txt");
    tituloReemplazo.innerHTML = "Vision";
    let textoRemplazo = document.querySelector(".texto-mostrar");
    console.log(textoRemplazo);
    textoRemplazo.innerHTML = textoVision;
}
function mostrarHistoria(){
    let tituloReemplazo = document.querySelector("#titulo-txt");
    tituloReemplazo.innerHTML = "Historia";
    let textoRemplazo = document.querySelector(".texto-mostrar");
    console.log(textoRemplazo);
    textoRemplazo.innerHTML = textoHistoria;
}

// Contenido de Botones generales de acerca de nosotros

const botones = document.querySelectorAll(".boton"); 
const contenidos = document.querySelectorAll(".tab-content"); // contenido Botones: (visión, misión, historia)

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        botones.forEach(b => b.classList.remove("active")); // Quitar la clase active de todos los botones
        contenidos.forEach(c => c.classList.remove("active")); // quitar los botonestextos
        boton.classList.add("active"); // Activar el botón que se clickea

        const idContenido = "txt-" + boton.id;
        document.getElementById(idContenido).classList.add("active"); // Mostrar el contenido correcto
    });
});

// formulario prom

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



