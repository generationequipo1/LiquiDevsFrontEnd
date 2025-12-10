fetch("../Componentes/navbar.html")
  .then(res => res.text())
  .then(html => {
    
    document.getElementById("navbar-placeholder").innerHTML = html; 

    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    
    if (toggle && menu) {
      // y al hacer clcic en menu hamburgues asale menu
      toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
      });
      
      // abre y cierra el menu en movil
      const menuLinks = menu.querySelectorAll('a');
      
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          menu.classList.remove('active');
        });
      });
    }
  });