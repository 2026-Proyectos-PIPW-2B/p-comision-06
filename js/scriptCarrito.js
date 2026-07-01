window.addEventListener("load", inicializar);

function inicializar() {
  cargarCarrito();

  document
    .getElementById("btnFinalizarCompra")
    .addEventListener("click", finalizarCompra);
}

function obtenerCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito"));

  if (carrito == null) {
    carrito = [];
  }

  return carrito;
}

function obtenerProductos() {
  let productos = JSON.parse(localStorage.getItem("productos"));

  if (productos == null) {
    productos = [];
  }

  return productos;
}

function obtenerHistorial() {
  let historial = JSON.parse(localStorage.getItem("historialCompras"));

  if (historial == null) {
    historial = [];
  }

  return historial;
}

function cargarCarrito() {
  let carrito = obtenerCarrito();

  let tabla = document.getElementById("tablaCarrito");

  tabla.innerHTML = "";

  if (carrito.length == 0) {
    document.getElementById("carritoVacio").classList.remove("d-none");

    document.getElementById("contenedorCarrito").classList.add("d-none");

    return;
  }

  document.getElementById("carritoVacio").classList.add("d-none");

  document.getElementById("contenedorCarrito").classList.remove("d-none");

  let productos = obtenerProductos();

  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    let item = carrito[i];

    let producto = buscarProducto(item.idProducto, productos);

    if (producto != null) {
      let subtotal = producto.precio * item.cantidad;

      total += subtotal;

      let fila = crearFilaCarrito(producto, item, subtotal);

      tabla.appendChild(fila);
    }
  }

  document.getElementById("totalCarrito").textContent = "$" + total.toFixed(2);
}

function crearFilaCarrito(producto, item, subtotal) {
  let fila = document.createElement("tr");

  // Nombre
  let tdNombre = document.createElement("td");
  tdNombre.textContent = producto.nombre;

  // Precio
  let tdPrecio = document.createElement("td");
  tdPrecio.textContent = "$" + producto.precio.toFixed(2);

  // Cantidad
  let tdCantidad = document.createElement("td");

  let inputCantidad = document.createElement("input");

  inputCantidad.type = "number";
  inputCantidad.min = 1;
  inputCantidad.max = producto.stock;
  inputCantidad.value = item.cantidad;

  inputCantidad.classList.add("form-control");

  inputCantidad.addEventListener("change", function () {
    actualizarCantidad(item.idProducto, this.value);
  });

  tdCantidad.appendChild(inputCantidad);

  // Subtotal
  let tdSubtotal = document.createElement("td");

  tdSubtotal.textContent = "$" + subtotal.toFixed(2);

  // Botón eliminar
  let tdAcciones = document.createElement("td");

  let botonEliminar = document.createElement("button");

  botonEliminar.classList.add("btn", "btn-danger", "btn-sm");

  botonEliminar.innerHTML = '<i class="bi bi-trash"></i>';

  botonEliminar.addEventListener("click", function () {
    eliminarDelCarrito(item.idProducto);
  });

  tdAcciones.appendChild(botonEliminar);

  fila.appendChild(tdNombre);
  fila.appendChild(tdPrecio);
  fila.appendChild(tdCantidad);
  fila.appendChild(tdSubtotal);
  fila.appendChild(tdAcciones);

  return fila;
}

function buscarProducto(idProducto, productos) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id == idProducto) {
      return productos[i];
    }
  }

  return null;
}

function actualizarCantidad(idProducto, nuevaCantidad) {
  nuevaCantidad = parseInt(nuevaCantidad);

  if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
    nuevaCantidad = 1;
  }

  let carrito = obtenerCarrito();

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].idProducto == idProducto) {
      carrito[i].cantidad = nuevaCantidad;
    }
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  cargarCarrito();
}

function eliminarDelCarrito(idProducto) {
  let carrito = obtenerCarrito();

  let nuevoCarrito = [];

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].idProducto != idProducto) {
      nuevoCarrito.push(carrito[i]);
    }
  }

  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

  cargarCarrito();
}

function calcularTotal() {
  let carrito = obtenerCarrito();

  let productos = obtenerProductos();

  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    let producto = buscarProducto(carrito[i].idProducto, productos);

    if (producto != null) {
      total += producto.precio * carrito[i].cantidad;
    }
  }

  return total;
}

function guardarCompra(carrito, total) {
  let historial = obtenerHistorial();

  let sesion = JSON.parse(localStorage.getItem("sesion"));

  let compra = {
    idCompra: Date.now(),

    usuario: sesion.usuario,

    fecha: new Date().toLocaleDateString(),

    total: total,

    productos: carrito,
  };

  historial.push(compra);

  localStorage.setItem("historialCompras", JSON.stringify(historial));
}

function descontarStock(carrito) {
  let productos = obtenerProductos();

  for (let i = 0; i < carrito.length; i++) {
    let item = carrito[i];

    for (let j = 0; j < productos.length; j++) {
      if (productos[j].id == item.idProducto) {
        productos[j].stock -= item.cantidad;

        if (productos[j].stock < 0) {
          productos[j].stock = 0;
        }
      }
    }
  }

  localStorage.setItem("productos", JSON.stringify(productos));
}

function finalizarCompra() {
  let carrito = obtenerCarrito();

  if (carrito.length == 0) {
    alert("El carrito está vacío.");
    return;
  }

  let total = calcularTotal();

  guardarCompra(carrito, total);

  descontarStock(carrito);

  localStorage.removeItem("carrito");

  document.getElementById("mensajeCompra").classList.remove("d-none");

  cargarCarrito();
}
