window.addEventListener("load", inicializar);

function inicializar() {
  document.getElementById("btnLogin").addEventListener("click", manejarLogin);
}

function manejarLogin() {
  const inputUsuario = document.getElementById("inputUsuario");
  const inputPassword = document.getElementById("inputPassword");
  const mensajeError = document.getElementById("mensajeError");

  const nombre = inputUsuario.value.trim();
  const password = inputPassword.value.trim();

  mensajeError.classList.add("d-none");

  if (nombre === "" || password === "") {
    mostrarError(mensajeError, "Completá usuario y contraseña.");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = usuarios.find(
    (u) => u.nombre === nombre && u.password === password,
  );

  if (!usuario) {
    mostrarError(mensajeError, "Usuario o contraseña incorrectos.");
    return;
  }

  if (!usuario.habilitado) {
    mostrarError(mensajeError, "Tu cuenta está deshabilitada.");
    return;
  }

  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    rol: usuario.rol,
  };

  localStorage.setItem("sesionActiva", JSON.stringify(sesion));

  if (usuario.rol === "administrador") {
    window.location.href = "admin/indexAdmin.html";
  } else {
    window.location.href = "index.html";
  }
}

function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje;
  elemento.classList.remove("d-none");
}
