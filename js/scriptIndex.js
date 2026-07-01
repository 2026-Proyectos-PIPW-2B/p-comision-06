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
  renderizarProductos(obtenerProductos());
}

function renderizarProductos(productos) {
  const contenedor = document.getElementById("contenedorCatalogo");

  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (productos.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning">
          No se encontraron productos.
        </div>
      </div>
    `;

    return;
  }

  productos.forEach((producto) => {
    contenedor.innerHTML += crearCardProducto(producto);
  });
}

//cards

function crearCardProducto(producto) {
  return `
    <div class="col-md-6 col-xl-4">

      <div class="card h-100 shadow-sm">

        <img
          src="img/${producto.imagen}"
          class="card-img-top"
          alt="${producto.nombre}"
          style="height:250px; object-fit:cover;"
        >

        <div class="card-body d-flex flex-column">

          <h5 class="card-title">
            ${producto.nombre}
          </h5>

          <p class="text-muted">
            ${producto.genero}
          </p>

          <h4 class="text-warning">
            USD ${producto.precio}
          </h4>

          <p>
            Stock: ${producto.stock}
          </p>

          <button
            class="btn btn-dark mt-auto"
            onclick="agregarAlCarrito(${producto.id})"
          >
            <i class="bi bi-cart-plus"></i>
            Agregar al carrito
          </button>

        </div>

      </div>

    </div>
  `;
}

//FILTROS

function aplicarFiltros() {
  let productos = obtenerProductos();

  const texto = document
    .getElementById("filtroBusqueda")
    .value.trim()
    .toLowerCase();

  const genero = document.getElementById("filtroGenero").value;

  const precioMin = parseFloat(
    document.getElementById("filtroPrecioMin").value,
  );

  const precioMax = parseFloat(
    document.getElementById("filtroPrecioMax").value,
  );

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

  productos = productos.filter((producto) => {
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

    if (
      plataformasSeleccionadas.length > 0 &&
      !plataformasSeleccionadas.some((plataforma) =>
        producto.plataformas.includes(plataforma),
      )
    ) {
      return false;
    }

    return true;
  });

  renderizarProductos(productos);
}

function limpiarFiltros() {
  document.getElementById("filtroBusqueda").value = "";

  document.getElementById("filtroGenero").value = "Todos";

  document.getElementById("filtroPrecioMin").value = "";

  document.getElementById("filtroPrecioMax").value = "";

  document.querySelectorAll(".filtro-plataforma").forEach((checkbox) => {
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

  let carrito = obtenerCarrito();

  let encontrado = false;

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].idProducto == idProducto) {
      carrito[i].cantidad++;

      encontrado = true;

      break;
    }
  }

  if (!encontrado) {
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

  let carrito = JSON.parse(localStorage.getItem(clave));

  if (carrito == null) {
    carrito = [];
  }

  return carrito;
}

function obtenerClaveCarrito() {
  let sesion = JSON.parse(localStorage.getItem("sesionActiva"));

  return "carrito_" + sesion.nombre;
}
