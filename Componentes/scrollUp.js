document.addEventListener("DOMContentLoaded", () => {
  const btnUp = document.getElementById("btn-up");
  if (!btnUp) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnUp.classList.add("show");
    } else {
      btnUp.classList.remove("show");
    }
  });

  btnUp.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
