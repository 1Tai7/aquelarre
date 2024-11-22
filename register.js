const boton = document.getElementById("mostrar-emojis");
const contenedorEmojis = document.querySelector(".avatar-container");
const emojis = document.querySelectorAll(".emoji");
const avatarSeleccionado = document.getElementById("avatar-seleccionado");
const avatarGuardado = document.getElementById("avatar-guardado");

contenedorEmojis.style.opacity = "0";
const viewEmojis = () => {
  contenedorEmojis.style.opacity =
    contenedorEmojis.style.opacity === "0" ? "1" : "0";
};

// Obtener el avatar guardado (si existe) al cargar la página

const avatarGuardadoEnLocalStorage = localStorage.getItem("avatar") || "";
if (avatarGuardadoEnLocalStorage) {
  avatarGuardado.value = avatarGuardadoEnLocalStorage;
  avatarSeleccionado.textContent = avatarGuardadoEnLocalStorage;
}

emojis.forEach((emoji) => {
  emoji.addEventListener("click", () => {
    // Quitar la clase 'selected' de todos los emojis
    emojis.forEach((emoji) => emoji.classList.remove("selected"));

    // Asignar la clase 'selected' al emoji seleccionado
    emoji.classList.add("selected");

    avatarGuardado.value = emoji.textContent;
    localStorage.setItem("avatar", emoji.textContent);
    avatarSeleccionado.textContent = emoji.textContent;

    // Ocultar el contenedor de emojis
    contenedorEmojis.style.opacity = "0";
  });
});

function validarFormulario(event) {
  event.preventDefault();

  let nombre = document.getElementById("nombre").value;
  let alias = document.getElementById("alias").value;
  let contrasena = document.getElementById("contrasena").value;
  let email = document.getElementById("email").value;

  let errores = [];

  if (nombre === "") {
    errores.push("El nombre es obligatorio.");
  }
  if (alias === "") {
    errores.push("El alias es obligatorio.");
  }
  if (contrasena === "") {
    errores.push("La contraseña es obligatoria.");
  }
  if (email === "") {
    errores.push("El correo electrónico es obligatorio.");
  }

  if (errores.length > 0) {
    document.getElementById("errorNombre").textContent = errores.includes(
      "El nombre es obligatorio."
    )
      ? errores[0]
      : "";
    document.getElementById("errorAlias").textContent = errores.includes(
      "El alias es obligatorio."
    )
      ? errores[0]
      : "";
    document.getElementById("errorContrasena").textContent = errores.includes(
      "La contraseña es obligatoria."
    )
      ? errores[0]
      : "";
    document.getElementById("errorEmail").textContent = errores.includes(
      "El correo electrónico es obligatorio."
    )
      ? errores[0]
      : "";
    return false; // Evita el envío del formulario
  } else {
    const db = firebase.firestore();
    const usuariosRef = db.collection("usuarios");
  
    usuariosRef
      .add({
        nombre,
        alias,
        email,
        contrasena,
      })
      .then((data) => {
        nombre = null;
        alias = null;
        email = null;
        contrasena = null;
        console.log("data :v", data);
        alert("Formulario enviado correctamente");
      })
      .catch((error) => {
        console.error("Error al agregar documento:", error);
      });

    // Aquí puedes agregar código para enviar los datos del formulario
  }
}
