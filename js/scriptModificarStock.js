window.addEventListener("load", inicializar);

function inicializar() {
  cargarTabla();
}

function obtenerProductos() {
  let productos = JSON.parse(localStorage.getItem("productos"));

  if (productos == null) {
    productos = [];
  }

  return productos;
}

function cargarTabla() {
  let productos = obtenerProductos();

  let tabla = document.getElementById("tablaProductos");
  tabla.textContent = "";

  for (let i = 0; i < productos.length; i++) {
    let producto = productos[i];

    let fila = document.createElement("tr");

    // ID
    let tdId = document.createElement("td");
    tdId.textContent = producto.id;
    fila.appendChild(tdId);

    // Nombre
    let tdNombre = document.createElement("td");
    let inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.classList.add("form-control");
    inputNombre.id = `nombre-${producto.id}`;
    inputNombre.value = producto.nombre;
    tdNombre.appendChild(inputNombre);
    fila.appendChild(tdNombre);

    // Precio
    let tdPrecio = document.createElement("td");
    let inputPrecio = document.createElement("input");
    inputPrecio.type = "number";
    inputPrecio.classList.add("form-control");
    inputPrecio.id = `precio-${producto.id}`;
    inputPrecio.value = producto.precio;
    tdPrecio.appendChild(inputPrecio);
    fila.appendChild(tdPrecio);

    // genero
    let tdGenero = document.createElement("td");
    let inputGenero = document.createElement("input");
    inputGenero.type = "text";
    inputGenero.classList.add("form-control");
    inputGenero.id = `genero-${producto.id}`;
    inputGenero.value = producto.genero;
    tdGenero.appendChild(inputGenero);
    fila.appendChild(tdGenero);

    // Stock
    let tdStock = document.createElement("td");
    let inputStock = document.createElement("input");
    inputStock.type = "number";
    inputStock.classList.add("form-control");
    inputStock.id = `stock-${producto.id}`;
    inputStock.value = producto.stock;
    tdStock.appendChild(inputStock);
    fila.appendChild(tdStock);

    // Imagen
    let tdImagen = document.createElement("td");
    let inputImagen = document.createElement("input");
    inputImagen.type = "text";
    inputImagen.classList.add("form-control");
    inputImagen.id = `imagen-${producto.id}`;
    inputImagen.value = producto.imagen;
    tdImagen.appendChild(inputImagen);
    fila.appendChild(tdImagen);

    // Acciones
    let tdAcciones = document.createElement("td");

    let btnGuardar = document.createElement("button");
    btnGuardar.classList.add("btn", "btn-success", "btn-sm");
    btnGuardar.innerHTML = '<i class="bi bi-floppy"></i>';
    btnGuardar.addEventListener("click", function () {
      guardarCambios(producto.id);
    });

    let btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
    btnEliminar.innerHTML = '<i class="bi bi-trash"></i>';
    btnEliminar.addEventListener("click", function () {
      eliminarProducto(producto.id);
    });

    tdAcciones.appendChild(btnGuardar);
    tdAcciones.appendChild(document.createTextNode(" "));
    tdAcciones.appendChild(btnEliminar);

    fila.appendChild(tdAcciones);

    tabla.appendChild(fila);
  }
}

function guardarCambios(idProducto) {
  let productos = obtenerProductos();

  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id == idProducto) {
      productos[i].nombre = document.getElementById(
        `nombre-${idProducto}`,
      ).value;

      productos[i].precio = parseFloat(
        document.getElementById(`precio-${idProducto}`).value,
      );

      productos[i].genero = document.getElementById(
        `genero-${idProducto}`,
      ).value;

      productos[i].stock = parseInt(
        document.getElementById(`stock-${idProducto}`).value,
      );

      productos[i].imagen = document.getElementById(
        `imagen-${idProducto}`,
      ).value;
    }
  }

  localStorage.setItem("productos", JSON.stringify(productos));

  alert("Producto actualizado.");
}

function eliminarProducto(idProducto) {
  if (!confirm("¿Desea eliminar este producto?")) {
    return;
  }

  let productos = obtenerProductos();

  let nuevosProductos = [];

  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id != idProducto) {
      nuevosProductos.push(productos[i]);
    }
  }

  localStorage.setItem("productos", JSON.stringify(nuevosProductos));

  cargarTabla();
}
