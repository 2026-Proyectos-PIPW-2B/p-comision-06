document.getElementById("btnInicializar").addEventListener("click", () => {
  crearAdmin();
  crearUsuario();
  crearProductos();
});

function crearAdmin() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const adminExiste = usuarios.some((u) => u.rol === "administrador");

    if (!adminExiste) {
        const admin = {
        nombre: "administrador",
        password: "administrador",
        rol: "administrador",
        habilitado: true,
        };

        usuarios.push(admin);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}

function crearUsuario() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.some((u) => u.nombre === "usuario");

    if (!existe) {
        usuarios.push({
        nombre: "usuario",
        password: "usuario",
        email: "usuario@test.com",
        nombrePersona: "Usuario",
        apellido: "Prueba",
        edad: 20,
        rol: "usuario",
        habilitado: true,
        });

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}

function crearProductos() {
  if (localStorage.getItem("productos")) {
    return;
  }

  const prod = [
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

  guardarProductos(prod);
}

function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}