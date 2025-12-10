fetch("../Componentes/navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar-placeholder").innerHTML = html;

    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
      });
    }
  });
