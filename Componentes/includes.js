// js/includes.js

// Cargar navbar
fetch("partials/navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar-placeholder").innerHTML = data;
  })
  .catch(error => console.error("Error cargando navbar:", error));

// Cargar footer
fetch("partials/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer-placeholder").innerHTML = data;
  })
  .catch(error => console.error("Error cargando footer:", error));
