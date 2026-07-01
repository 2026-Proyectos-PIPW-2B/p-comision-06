window.addEventListener("load", inicializar);

function inicializar() {
  crearTabla();
}

function crearTabla() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const cuerpo = document.getElementById("cuerpoTabla");
  const sinUsuarios = document.getElementById("sinUsuarios");
  const tabla = document.getElementById("tablaUsuarios");

  cuerpo.innerHTML = "";

  const usuariosFinales = usuarios.filter((u) => u.rol !== "administrador");

  if (usuariosFinales.length === 0) {
    sinUsuarios.classList.remove("d-none");
    tabla.classList.add("d-none");
    return;
  }

  sinUsuarios.classList.add("d-none");
  tabla.classList.remove("d-none");

  usuariosFinales.forEach((usuario) => {
    const fila = crearFila(usuario);
    cuerpo.appendChild(fila);
  });
}

function crearFila(usuario) {
  const fila = document.createElement("tr");

  fila.appendChild(crearCelda(usuario.nombre));
  fila.appendChild(crearCelda(usuario.nombrePersona + " " + usuario.apellido));
  fila.appendChild(crearCelda(usuario.email));
  fila.appendChild(crearCelda(usuario.edad));
  fila.appendChild(crearCeldaEstado(usuario.habilitado));
  fila.appendChild(crearCeldaAccion(usuario));
  fila.appendChild(crearCeldaEliminar(usuario));

  return fila;
}

function crearCelda(texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}

function crearCeldaEstado(habilitado) {
  const td = document.createElement("td");
  const badge = document.createElement("span");

  badge.classList.add("badge");

  if (habilitado) {
    badge.classList.add("bg-success");
    badge.textContent = "Habilitado";
  } else {
    badge.classList.add("bg-secondary");
    badge.textContent = "Deshabilitado";
  }

  td.appendChild(badge);
  return td;
}

function crearCeldaAccion(usuario) {
  const td = document.createElement("td");
  const boton = document.createElement("button");
  const icono = document.createElement("i");

  boton.classList.add("btn", "btn-sm");

  if (usuario.habilitado) {
    boton.classList.add("btn-outline-danger");
    icono.classList.add("bi", "bi-slash-circle", "me-1");
    boton.appendChild(icono);
    boton.appendChild(document.createTextNode("Deshabilitar"));
  } else {
    boton.classList.add("btn-outline-success");
    icono.classList.add("bi", "bi-check-circle", "me-1");
    boton.appendChild(icono);
    boton.appendChild(document.createTextNode("Habilitar"));
  }

  boton.addEventListener("click", () => toggleHabilitado(usuario.id));

  td.appendChild(boton);
  return td;
}

function crearCeldaEliminar(usuario) {
  const td = document.createElement("td");
  const boton = document.createElement("button");
  const icono = document.createElement("i");
 
  boton.classList.add("btn", "btn-sm", "btn-outline-dark");
  icono.classList.add("bi", "bi-trash", "me-1");
 
  boton.appendChild(icono);
  boton.appendChild(document.createTextNode("Eliminar"));
 
  boton.addEventListener("click", () => eliminarUsuario(usuario.id));
 
  td.appendChild(boton);
  return td;
}

function eliminarUsuario(id) { 
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
 
  const usuariosFiltrados = usuarios.filter((u) => u.id !== id);
 
  localStorage.setItem("usuarios", JSON.stringify(usuariosFiltrados));
 
  crearTabla();
}

function toggleHabilitado(id) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const indice = usuarios.findIndex((u) => u.id === id);

  if (indice === -1) return;

  usuarios[indice].habilitado = !usuarios[indice].habilitado;

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  crearTabla();
}