window.addEventListener("load", inicializar);

function inicializar() {
  cargarCatalogo();
  mostrarBotonAdministracion();

  const btnAplicar = document.getElementById("btnAplicarFiltros");

  if (btnAplicar) {
    btnAplicar.addEventListener("click", aplicarFiltros);
  }

  const btnLimpiar = document.getElementById("btnLimpiarFiltros");

  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", limpiarFiltros);
  }
}

function mostrarBotonAdministracion() {
  let sesion = JSON.parse(localStorage.getItem("sesionActiva"));

  if (sesion && sesion.rol === "administrador") {
    const btnAdmin = document.getElementById("btnAdmin");

    if (btnAdmin) {
      btnAdmin.classList.remove("d-none");
    }
  }
}

//LS

function obtenerProductos() {
  return JSON.parse(localStorage.getItem("productos")) || [];
}

//catalogo

function cargarCatalogo() {
  let productos = obtenerProductos();

  let productosDisponibles = [];

  for (let i = 0; i < productos.length; i++) {
    if (productos[i].stock > 0) {
      productosDisponibles.push(productos[i]);
    }
  }

  renderizarProductos(productosDisponibles);
}

//cards

function crearCardProducto(producto) {
  let columna = document.createElement("div");
  columna.classList.add("col-md-6", "col-xl-4");

  let card = document.createElement("div");
  card.classList.add("card", "h-100", "shadow-sm");

  let imagen = document.createElement("img");
  imagen.src = "img/" + producto.imagen;
  imagen.alt = producto.nombre;
  imagen.classList.add("card-img-top");
  imagen.style.height = "250px";
  imagen.style.objectFit = "cover";

  let body = document.createElement("div");
  body.classList.add("card-body", "d-flex", "flex-column");

  let titulo = document.createElement("h5");
  titulo.classList.add("card-title");
  titulo.textContent = producto.nombre;

  let genero = document.createElement("p");
  genero.classList.add("text-muted");
  genero.textContent = producto.genero;

  let precio = document.createElement("h4");
  precio.classList.add("text-warning");
  precio.textContent = "USD " + producto.precio;

  let stock = document.createElement("p");
  stock.textContent = "Stock: " + producto.stock;

  let boton = document.createElement("button");
  boton.classList.add("btn", "btn-dark", "mt-auto");

  boton.innerHTML = '<i class="bi bi-cart-plus"></i> Agregar al carrito';

  boton.addEventListener("click", function () {
    agregarAlCarrito(producto.id);
  });

  body.appendChild(titulo);
  body.appendChild(genero);
  body.appendChild(precio);
  body.appendChild(stock);
  body.appendChild(boton);

  card.appendChild(imagen);
  card.appendChild(body);

  columna.appendChild(card);

  return columna;
}

//FILTROS

function aplicarFiltros() {
  let productos = obtenerProductos();

  let texto = document
    .getElementById("filtroBusqueda")
    .value.trim()
    .toLowerCase();

  let genero = document.getElementById("filtroGenero").value;

  let precioMin = parseFloat(document.getElementById("filtroPrecioMin").value);

  let precioMax = parseFloat(document.getElementById("filtroPrecioMax").value);

  let plataformasSeleccionadas = obtenerPlataformasSeleccionadas();

  productos = productos.filter(function (producto) {
    if (texto !== "" && !producto.nombre.toLowerCase().includes(texto)) {
      return false;
    }

    if (genero !== "Todos" && producto.genero !== genero) {
      return false;
    }

    if (!isNaN(precioMin) && producto.precio < precioMin) {
      return false;
    }

    if (!isNaN(precioMax) && producto.precio > precioMax) {
      return false;
    }

    if (plataformasSeleccionadas.length > 0) {
      let coincide = false;

      for (let i = 0; i < plataformasSeleccionadas.length; i++) {
        if (producto.plataformas.includes(plataformasSeleccionadas[i])) {
          coincide = true;
        }
      }

      if (!coincide) {
        return false;
      }
    }

    return true;
  });

  renderizarProductos(productos);
}

function renderizarProductos(productos) {
  let contenedor = document.getElementById("contenedorCatalogo");

  contenedor.textContent = "";

  for (let i = 0; i < productos.length; i++) {
    contenedor.appendChild(crearCardProducto(productos[i]));
  }
}

function obtenerPlataformasSeleccionadas() {
  let plataformas = [];

  let checkboxes = document.getElementsByClassName("plataforma");

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      plataformas.push(checkboxes[i].value);
    }
  }

  return plataformas;
}

function limpiarFiltros() {
  document.getElementById("filtroBusqueda").value = "";

  document.getElementById("filtroGenero").value = "Todos";

  document.getElementById("filtroPrecioMin").value = "";

  document.getElementById("filtroPrecioMax").value = "";

  document.querySelectorAll(".plataforma").forEach((checkbox) => {
    checkbox.checked = false;
  });

  cargarCatalogo();
}

//CARRITO

function agregarAlCarrito(idProducto) {
  let sesion = JSON.parse(localStorage.getItem("sesionActiva"));

  if (sesion == null) {
    alert("Debe iniciar sesión para agregar productos al carrito.");
    return;
  }

  let productos = obtenerProductos();
  let producto = null;

  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id == idProducto) {
      producto = productos[i];
    }
  }

  if (producto == null) {
    alert("Producto no encontrado.");
    return;
  }
  if (sesion.rol === "administrador") {
    alert("Los administradores no pueden agregar productos al carrito.");

    return;
  }

  let carrito = obtenerCarrito();

  let encontrado = false;

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].idProducto == idProducto) {
      if (carrito[i].cantidad >= producto.stock) {
        alert("No hay más unidades disponibles.");
        return;
      }

      carrito[i].cantidad++;
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    if (producto.stock <= 0) {
      alert("Producto sin stock.");
      return;
    }

    carrito.push({
      idProducto: idProducto,
      cantidad: 1,
    });
  }

  let clave = obtenerClaveCarrito();

  localStorage.setItem(clave, JSON.stringify(carrito));

  alert("Producto agregado al carrito.");
}

function obtenerCarrito() {
  let clave = obtenerClaveCarrito();

  if (clave == null) {
    return [];
  }

  let carrito = JSON.parse(localStorage.getItem(clave));

  if (carrito == null) {
    carrito = [];
  }

  return carrito;
}

function obtenerClaveCarrito() {
  let sesion = JSON.parse(localStorage.getItem("sesionActiva"));

  if (sesion == null) {
    return null;
  }

  return "carrito_" + sesion.nombre;
}
