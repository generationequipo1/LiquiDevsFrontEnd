

fetch("../Componentes/navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar-placeholder").innerHTML = html;

    // 1) Menú hamburguesa
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    if (toggle && menu) {
      toggle.addEventListener("click", () => menu.classList.toggle("active"));
      menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => menu.classList.remove("active"));
      });
    }

    // 2) Inicializar sesión en navbar
    initUserNavbar();
  });

// ------------------------------
// Sesión: leer estado
// ------------------------------
function getUsuarioLogueado() {
  try {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");
    if (!isLoggedIn || !usuario) return null;
    return usuario;
  } catch {
    return null;
  }
}

function logout() {
  localStorage.removeItem("usuarioLogueado");
  localStorage.removeItem("isLoggedIn");
  // Si guardas token luego, aquí también se elimina
  // localStorage.removeItem("auth");

  window.location.href = "/paginaPrincipal.html";
}

// ------------------------------
// Pintar UI + eventos
// ------------------------------
function initUserNavbar() {
  const btnUser = document.getElementById("btn-user");
  const dropdown = document.getElementById("user-dropdown");
  const userName = document.getElementById("user-name");
  const loginLink = document.getElementById("user-login-link");
  const btnLogout = document.getElementById("btn-logout");

  if (!btnUser || !dropdown || !userName || !loginLink || !btnLogout) return;

  const usuario = getUsuarioLogueado();

  // Estado logueado / no logueado
  if (usuario) {
    userName.textContent = `Hola, ${usuario.nombre || "Usuario"}`;
    loginLink.classList.add("hidden");
    btnLogout.classList.remove("hidden");
  } else {
    userName.textContent = "Cuenta";
    loginLink.classList.remove("hidden");
    btnLogout.classList.add("hidden");
  }

  // Abrir/cerrar dropdown
  btnUser.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("hidden");
  });

  // Cerrar dropdown al hacer click fuera
  document.addEventListener("click", () => {
    dropdown.classList.add("hidden");
  });

  // Evitar que click dentro cierre inmediatamente
  dropdown.addEventListener("click", (e) => e.stopPropagation());

  // logout evento 
  btnLogout.addEventListener("click", logout);
}


/*fetch("../Componentes/navbar.html")
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
  });*/