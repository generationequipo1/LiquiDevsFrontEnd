// js/includes.js

// Cargar navbar
fetch("/Componentes/navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar-placeholder").innerHTML = data;
  })
  .catch(error => console.error("Error cargando navbar:", error));


