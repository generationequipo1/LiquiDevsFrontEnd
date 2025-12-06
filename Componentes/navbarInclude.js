// js/includes.js

// Cargar navbar
fetch("/Componentes/navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar-placeholder").innerHTML = data;
  })
  .catch(error => console.error("Error cargando navbar:", error));

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
});


