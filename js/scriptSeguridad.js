verificarAcceso();

function verificarAcceso() {
  let sesion = JSON.parse(localStorage.getItem("sesionActiva"));

  let pagina = window.location.pathname.toLowerCase();

  // Cualquier pag dentro de /admin/
  if (pagina.includes("/admin/")) {
    if (sesion == null || sesion.rol != "administrador") {
      alert("No tiene permisos para acceder a esta página.");

      window.location.href = "../index.html";
    }

    return;
  }

  // Carrito
  if (pagina.endsWith("carrito.html")) {
    if (sesion == null) {
      alert("Debe iniciar sesión para acceder al carrito.");

      window.location.href = "login.html";
    }
  }
}
