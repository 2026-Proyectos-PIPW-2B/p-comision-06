window.addEventListener("load", inicializarNavbar);

function inicializarNavbar() {
  actualizarNavbar();
  const linkCerrarSesion = document.getElementById("navCerrarSesion");
  if (linkCerrarSesion) {
    linkCerrarSesion.addEventListener("click", cerrarSesion);
  }
}

function obtenerSesion() {
  return JSON.parse(localStorage.getItem("sesionActiva"));
}

function cerrarSesion() {
  localStorage.removeItem("sesionActiva");
  window.location.href = "login.html";
}

function cerrarSesionAdmin() {
  localStorage.removeItem("sesionActiva");
  window.location.href = "../login.html";
}

function actualizarNavbar() {
  const sesion = obtenerSesion();

  const navLogin = document.getElementById("navLogin");
  const navCarrito = document.getElementById("navCarrito");
  const navAdmin = document.getElementById("navAdmin");
  const navCerrarSesion = document.getElementById("navCerrarSesion");

  if (sesion) {
    if (navLogin) navLogin.classList.add("d-none");
    if (navCerrarSesion) navCerrarSesion.classList.remove("d-none");

    if (sesion.rol === "administrador") {
      if (navAdmin) navAdmin.classList.remove("d-none");
      if (navCarrito) navCarrito.classList.add("d-none");
    } else {
      if (navCarrito) navCarrito.classList.remove("d-none");
      if (navAdmin) navAdmin.classList.add("d-none");
    }
  } else {
    if (navLogin) navLogin.classList.remove("d-none");
    if (navCarrito) navCarrito.classList.add("d-none");
    if (navAdmin) navAdmin.classList.add("d-none");
    if (navCerrarSesion) navCerrarSesion.classList.add("d-none");
  }
}

function protegerPaginaCliente() {
  const sesion = obtenerSesion();
  if (!sesion || sesion.rol === "administrador") {
    window.location.href = "login.html";
  }
}

function protegerPaginaAdmin() {
  const sesion = obtenerSesion();
  if (!sesion || sesion.rol !== "administrador") {
    window.location.href = "../login.html";
  }
}