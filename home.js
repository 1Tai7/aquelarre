// Obtén las referencias a los elementos
const modal = document.getElementById("myModal");
const btn = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];
const textarea = document.getElementById("create-text-box");

// Cuando se hace clic en el botón, se muestra el modal
btn.onclick = function () {
  modal.style.display = "flex";
};

// Cuando se hace clic en <span> (x), se cierra el modal
span.onclick = function () {
  modal.style.display = "none";
};

// Cuando se hace clic fuera del modal, se cierra
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
textarea.addEventListener("input", (e) => {
  textarea.style.height = "3rem";
  textarea.style.height = textarea.scrollHeight + 0.5 + "rem";
});
