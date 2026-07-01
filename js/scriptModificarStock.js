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

  tabla.innerHTML = "";

  for (let i = 0; i < productos.length; i++) {
    let producto = productos[i];

    tabla.innerHTML += `
      <tr>

        <td>${producto.id}</td>

        <td>
          <input
            type="text"
            class="form-control"
            id="nombre-${producto.id}"
            value="${producto.nombre}"
          >
        </td>

        <td>
          <input
            type="number"
            class="form-control"
            id="precio-${producto.id}"
            value="${producto.precio}"
          >
        </td>

        <td>
          <input
            type="text"
            class="form-control"
            id="genero-${producto.id}"
            value="${producto.genero}"
          >
        </td>

        <td>
          <input
            type="number"
            class="form-control"
            id="stock-${producto.id}"
            value="${producto.stock}"
          >
        </td>

        <td>
          <input
            type="text"
            class="form-control"
            id="imagen-${producto.id}"
            value="${producto.imagen}"
          >
        </td>

        <td>

          <button
            class="btn btn-success btn-sm"
            onclick="guardarCambios(${producto.id})"
          >
            <i class="bi bi-floppy"></i>
          </button>

          <button
            class="btn btn-danger btn-sm"
            onclick="eliminarProducto(${producto.id})"
          >
            <i class="bi bi-trash"></i>
          </button>

        </td>

      </tr>
    `;
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
