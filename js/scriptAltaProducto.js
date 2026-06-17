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

  const nombre = document.getElementById("nombre");
  const descripcion = document.getElementById("descripcion");
  const precio = document.getElementById("precio");
  const genero = document.getElementById("genero");
  const stock = document.getElementById("stock");
  const imagen = document.getElementById("imagen");

  // NOMBRE

  if (
    validator.isEmpty(nombre.value.trim()) ||
    !validator.isLength(nombre.value.trim(), {
      min: 3,
      max: 100,
    })
  ) {
    mostrarError(nombre, "El nombre debe tener entre 3 y 100 caracteres.");

    valido = false;
  }

  // DESCRIPCION

  if (
    validator.isEmpty(descripcion.value.trim()) ||
    !validator.isLength(descripcion.value.trim(), {
      min: 20,
      max: 500,
    })
  ) {
    mostrarError(
      descripcion,
      "La descripción debe tener entre 20 y 500 caracteres.",
    );

    valido = false;
  }

  // PRECIO

  if (
    validator.isEmpty(precio.value) ||
    !validator.isFloat(precio.value, {
      min: 0.01,
    })
  ) {
    mostrarError(precio, "Ingrese un precio válido.");

    valido = false;
  }

  // GENERO

  if (genero.value === "") {
    mostrarError(genero, "Seleccione un género.");

    valido = false;
  }

  // STOCK

  if (
    validator.isEmpty(stock.value) ||
    !validator.isInt(stock.value, {
      min: 0,
    })
  ) {
    mostrarError(stock, "Ingrese un stock válido.");

    valido = false;
  }

  // IMAGEN

  if (imagen.files.length === 0) {
    mostrarError(imagen, "Debe seleccionar una imagen.");

    valido = false;
  }

  // PLATAFORMAS

  const plataformasSeleccionadas = document.querySelectorAll(
    ".plataforma:checked",
  );

  if (plataformasSeleccionadas.length === 0) {
    document.getElementById("errorPlataformas").textContent =
      "Seleccione al menos una plataforma.";

    valido = false;
  }

  if (valido) {
    alert("Producto registrado correctamente.");

    document.getElementById("formAltaProducto").reset();
  }
}

function mostrarError(campo, mensaje) {
  campo.classList.add("is-invalid");

  campo.nextElementSibling.textContent = mensaje;
}

function limpiarErrores() {
  document.querySelectorAll(".is-invalid").forEach((campo) => {
    campo.classList.remove("is-invalid");
  });

  document.querySelectorAll(".invalid-feedback").forEach((error) => {
    error.textContent = "";
  });

  document.getElementById("errorPlataformas").textContent = "";
}
