window.addEventListener("load", inicializar);

function inicializar() {
  cargarProductosDemo();
  cargarCatalogo();

  const btnAplicar = document.getElementById("btnAplicarFiltros");

  if (btnAplicar) {
    btnAplicar.addEventListener("click", aplicarFiltros);
  }

  const btnLimpiar = document.getElementById("btnLimpiarFiltros");

  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", limpiarFiltros);
  }
}

/* =========================
   STORAGE
========================= */

function obtenerProductos() {
  return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

/* =========================
   CATALOGO
========================= */

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

/* =========================
   CARDS
========================= */

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

function agregarAlCarrito(id) {
  alert("Producto agregado al carrito (pendiente)");
}

//catalogo temp

function cargarProductosDemo() {
  if (localStorage.getItem("productos")) {
    return;
  }

  const demo = [
    {
      id: 1,
      nombre: "Cyberpunk 2077",
      descripcion: "RPG futurista",
      precio: 39.99,
      genero: "RPG",
      plataformas: ["PC"],
      stock: 20,
      imagen: "cyberpunk.jpg",
    },
    {
      id: 2,
      nombre: "Elden Ring",
      descripcion: "Soulslike",
      precio: 49.99,
      genero: "RPG",
      plataformas: ["PC", "PS5"],
      stock: 15,
      imagen: "er.jpg",
    },
    {
      id: 3,
      nombre: "Red Dead Redemption 2",
      descripcion: "Western",
      precio: 29.99,
      genero: "Aventura",
      plataformas: ["PC"],
      stock: 30,
      imagen: "rdr2.jpg",
    },
  ];

  guardarProductos(demo);
}
