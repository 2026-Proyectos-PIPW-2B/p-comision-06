window.addEventListener("load", inicializar);

function inicializar() {
  document
    .getElementById("formAltaUsuario")
    .addEventListener("submit", validarFormulario);
}

function validarFormulario(event) {
  event.preventDefault();

  limpiarErrores();

  let valido = true;

  const nombre = document.getElementById("nombre");
  const password = document.getElementById("password");
  const email = document.getElementById("email");
  const nombrePersona = document.getElementById("nombrePersona");
  const apellido = document.getElementById("apellido");
  const edad = document.getElementById("edad");

  

  if (
    validator.isEmpty(nombre.value.trim()) ||
    !validator.isLength(nombre.value.trim(), {
      min: 3,
      max: 20,
    }) ||
    !validator.isAlphanumeric(nombre.value.trim())
  ) {
    mostrarError(
      nombre,
      "El nombre de usuario debe tener entre 3 y 20 caracteres alfanuméricos.",
    );

    valido = false;
  } else if (existeUsuario(nombre.value.trim())) {
    mostrarError(nombre, "Ya existe un usuario con ese nombre.");

    valido = false;
  }

  

  if (
    validator.isEmpty(password.value) ||
    !validator.isLength(password.value, {
      min: 6,
      max: 50,
    })
  ) {
    mostrarError(password, "La contraseña debe tener al menos 6 caracteres.");

    valido = false;
  }

  

  if (
    validator.isEmpty(email.value.trim()) ||
    !validator.isEmail(email.value.trim())
  ) {
    mostrarError(email, "Ingrese un email válido.");

    valido = false;
  }

  

  if (
    validator.isEmpty(nombrePersona.value.trim()) ||
    !validator.isLength(nombrePersona.value.trim(), {
      min: 2,
      max: 50,
    })
  ) {
    mostrarError(nombrePersona, "Ingrese un nombre válido.");

    valido = false;
  }



  if (
    validator.isEmpty(apellido.value.trim()) ||
    !validator.isLength(apellido.value.trim(), {
      min: 2,
      max: 50,
    })
  ) {
    mostrarError(apellido, "Ingrese un apellido válido.");

    valido = false;
  }



  if (
    validator.isEmpty(edad.value) ||
    !validator.isInt(edad.value, {
      min: 13,
      max: 120,
    })
  ) {
    mostrarError(edad, "Ingrese una edad válida (mínimo 13 años).");

    valido = false;
  }

  if (valido) {
    guardarUsuario(nombre, password, email, nombrePersona, apellido, edad);

    alert("Usuario registrado correctamente.");

    document.getElementById("formAltaUsuario").reset();
  }
}

function existeUsuario(nombreUsuario) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  return usuarios.some((u) => u.nombre === nombreUsuario);
}

function guardarUsuario(nombre, password, email, nombrePersona, apellido, edad) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const nuevoUsuario = {
    id: "user-" + Date.now(),
    nombre: nombre.value.trim(),
    password: password.value,
    email: email.value.trim(),
    nombrePersona: nombrePersona.value.trim(),
    apellido: apellido.value.trim(),
    edad: Number(edad.value),
    habilitado: true,
  };

  usuarios.push(nuevoUsuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
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
}