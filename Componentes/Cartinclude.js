fetch("/Componentes/carrito.html")
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);
    
    //aqui esto para inciialziar el carrito
    if (typeof initCart === "function") {
      initCart();
    }
  });
