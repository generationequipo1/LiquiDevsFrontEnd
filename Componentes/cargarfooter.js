document.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.getElementById("footer");

    if (footerContainer) {
        fetch("/Componentes/footer.html") 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                footerContainer.innerHTML = html;
            })
            .catch(error => console.error("Error cargando el footer:", error));
    }
});