document.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.getElementById("footer");

    if (footerContainer) {
        fetch("../Componentes/footer.html")
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html;
            })
            .catch(error => console.error("Error cargando el footer:", error));
    }
});
