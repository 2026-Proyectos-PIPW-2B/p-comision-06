window.addEventListener("load", inicializar);

function inicializar() {
  document
    .getElementById("formAltaProducto")
    .addEventListener("submit", validarFormulario);
}

function validarFormulario(event) {
  event.preventDefault();

  limpiarErrores();

  let valido = true;

  valido = validarNombre() && valido;
  valido = validarDescripcion() && valido;
  valido = validarPrecio() && valido;
  valido = validarGenero() && valido;
  valido = validarStock() && valido;
  valido = validarImagen() && valido;
  valido = validarPlataformas() && valido;

  if (valido) {
    guardarProducto();
  }
}

function validarNombre() {
  let nombre = document.getElementById("nombre");

  if (
    validator.isEmpty(nombre.value.trim()) ||
    !validator.isLength(nombre.value.trim(), {
      min: 3,
      max: 100,
    })
  ) {
    mostrarMensaje(
      nombre,
      "errorNombre",
      "El nombre debe tener entre 3 y 100 caracteres.",
    );

    return false;
  }

  mostrarExito(nombre);

  return true;
}

function validarDescripcion() {
  let descripcion = document.getElementById("descripcion");

  if (
    validator.isEmpty(descripcion.value.trim()) ||
    !validator.isLength(descripcion.value.trim(), {
      min: 20,
      max: 500,
    })
  ) {
    mostrarMensaje(
      descripcion,
      "errorDescripcion",
      "La descripción debe tener entre 20 y 500 caracteres.",
    );

    return false;
  }

  mostrarExito(descripcion);

  return true;
}

function validarPrecio() {
  let precio = document.getElementById("precio");

  if (
    validator.isEmpty(precio.value) ||
    !validator.isFloat(precio.value, {
      min: 0.01,
    })
  ) {
    mostrarMensaje(precio, "errorPrecio", "Ingrese un precio válido.");

    return false;
  }

  mostrarExito(precio);

  return true;
}

function validarGenero() {
  let genero = document.getElementById("genero");

  if (genero.value === "") {
    mostrarMensaje(genero, "errorGenero", "Seleccione un género.");

    return false;
  }

  mostrarExito(genero);

  return true;
}

function validarStock() {
  let stock = document.getElementById("stock");

  if (
    validator.isEmpty(stock.value) ||
    !validator.isInt(stock.value, {
      min: 0,
    })
  ) {
    mostrarMensaje(stock, "errorStock", "Ingrese un stock válido.");

    return false;
  }

  mostrarExito(stock);

  return true;
}

function validarImagen() {
  let imagen = document.getElementById("imagen");

  if (validator.isEmpty(imagen.value.trim())) {
    mostrarMensaje(imagen, "errorImagen", "Ingrese la ruta de la imagen.");

    return false;
  }

  mostrarExito(imagen);

  return true;
}

function validarPlataformas() {
  let plataformas = obtenerPlataformas();

  if (plataformas.length === 0) {
    document.getElementById("errorPlataformas").textContent =
      "Seleccione al menos una plataforma.";

    return false;
  }

  return true;
}

function obtenerPlataformas() {
  let plataformas = [];

  let checkboxes = document.getElementsByClassName("plataforma");

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      plataformas.push(checkboxes[i].value);
    }
  }

  return plataformas;
}

//guardadp

function guardarProducto() {
  let producto = obtenerProductoFormulario();

  agregarProducto(producto);

  alert("Producto registrado correctamente.");

  limpiarFormulario();
}

function obtenerProductoFormulario() {
  let producto = {
    id: Date.now(),

    nombre: document.getElementById("nombre").value.trim(),

    descripcion: document.getElementById("descripcion").value.trim(),

    precio: parseFloat(document.getElementById("precio").value),

    genero: document.getElementById("genero").value,

    stock: parseInt(document.getElementById("stock").value),

    plataformas: obtenerPlataformas(),

    imagen: document.getElementById("imagen").value.trim(),
  };

  return producto;
}

function obtenerProductos() {
  let productos = JSON.parse(localStorage.getItem("productos"));

  if (productos == null) {
    productos = [];
  }

  return productos;
}

function agregarProducto(producto) {
  let productos = obtenerProductos();

  productos.push(producto);

  localStorage.setItem("productos", JSON.stringify(productos));
}

//limpieza y mesnsajes feedback

function limpiarFormulario() {
  document.getElementById("formAltaProducto").reset();

  limpiarErrores();

  let camposValidos = document.getElementsByClassName("is-valid");

  while (camposValidos.length > 0) {
    camposValidos[0].classList.remove("is-valid");
  }
}

function mostrarMensaje(input, idDivError, mensaje) {
  input.classList.remove("is-valid");

  input.classList.add("is-invalid");

  document.getElementById(idDivError).textContent = mensaje;
}

function mostrarExito(input) {
  input.classList.remove("is-invalid");

  input.classList.add("is-valid");
}

function limpiarErrores() {
  let camposInvalidos = document.getElementsByClassName("is-invalid");

  while (camposInvalidos.length > 0) {
    camposInvalidos[0].classList.remove("is-invalid");
  }

  document.getElementById("errorNombre").textContent = "";

  document.getElementById("errorDescripcion").textContent = "";

  document.getElementById("errorPrecio").textContent = "";

  document.getElementById("errorGenero").textContent = "";

  document.getElementById("errorStock").textContent = "";

  document.getElementById("errorImagen").textContent = "";

  document.getElementById("errorPlataformas").textContent = "";
}
