window.addEventListener("load", inicializar);

function inicializar() {
  protegerPaginaAdmin();
  const linkCerrarSesion = document.getElementById("btnCerrarSesionAdmin");
  if (linkCerrarSesion) {
    linkCerrarSesion.addEventListener("click", cerrarSesionAdmin);
}
}

function obtenerSesion() {
  return JSON.parse(localStorage.getItem("sesionActiva"));
}

function cerrarSesionAdmin() {
  localStorage.removeItem("sesionActiva");
  window.location.href = "../login.html";
}

function protegerPaginaAdmin() {
  const sesion = obtenerSesion();
  if (!sesion || sesion.rol !== "administrador") {
    window.location.href = "../login.html";
  }
}