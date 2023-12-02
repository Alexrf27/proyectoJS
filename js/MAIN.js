// PRODUCTOS
const productos = [
    // CALENDARIOS
    {
        id: "CALENDARIOS",
        titulo: "CALENDARIOS",
        imagen: "./img/CALENDARIOS.JPG",
        categoria: {
            nombre: "CALENDARIOS",
            id: "CALENDARIOS" // CAMPO CLAVE CON ID HTML
        },
        precio: 15000
    },
    {
        id: "DISEÑO PARA EMPAQUES",
        titulo: "DISEÑO PARA EMPAQUES",
        imagen: "./img/DISEÑO PARA EMPAQUES.3.JPG",
        categoria: {
            nombre: "DISEÑO PARA EMPAQUES.3",
            id: "DISEÑO PARA EMPAQUES" // CAMPO CLAVE CON ID HTML
        },
        precio: 25000
    },
    {
        id: "DISEÑO PARA EMPAQUES",
        titulo: "DISEÑO PARA EMPAQUES",
        imagen: "./img/DISEÑO PARA EMPAQUES.JPG",
        categoria: {
            nombre: "DISEÑO PARA EMPAQUES",
            id: "DISEÑO PARA EMPAQUES" // CAMPO CLAVE CON ID HTML
        },
        precio: 30000
    },
    {
        id: "DISEÑO PARA LLAVEROS",
        titulo: "DISEÑO PARA LLAVEROS",
        imagen: "./img/DISEÑO PARA LLAVEROS.JPG",
        categoria: {
            nombre: "DISEÑO PARA LLAVEROS",
            id: "DISEÑO PARA EMPAQUES" // CAMPO CLAVE CON ID HTML
        },
        precio: 12000
    },
    {
        id: "DISEÑO PARA EMPAQUES",
        titulo: "MUG",
        imagen: "./img/MUSK.JPG",
        categoria: {
            nombre: "MUG",
            id: "DISEÑO PARA EMPAQUES" // CAMPO CLAVE CON ID HTML
        },
        precio: 10000
    },
    // Camisetas
    {
        id: "ESTAMPADOS",
        titulo: "DISEÑO PARA ESTAMPAR",
        imagen: "./img/DISEÑO PARA ESTAMPAR.2.JPG",
        categoria: {
            nombre: "ESTAMPADOS",
            id: "ESTAMPADOS" // CAMPO CLAVE CON ID HTML
        },
        precio: 20000
    },
    {
        id: "ESTAMPADOS",
        titulo: "DISEÑOS PARA ESTAMPAR",
        imagen: "./img/DISEÑOS PARA ESTAMPAR.JPG",
        categoria: {
            nombre: "ESTAMPADOS",
            id: "ESTAMPADOS" // CAMPO CLAVE CON ID HTML
        },
        precio: 15000
    },
    {
        id: "ESTAMPADOS",
        titulo: "PIN",
        imagen: "./img/PIN.JPG",
        categoria: {
            nombre: "PIN",
            id: "ESTAMPADOS" // CAMPO CLAVE CON ID HTML
        },
        precio: 5000
    },
    {
        id: "ESTAMPADOS",
        titulo: "PINES MEDIANOS",
        imagen: "./img/PIN.2.JPG",
        categoria: {
            nombre: "PIN.2",
            id: "ESTAMPADOS" // CAMPO CLAVE CON ID HTML
        },
        precio: 10000
    },
    {
        id: "MONTAJES",
        titulo: "MONTAJES PHOTOSHOP",
        imagen: "./img/MONTAJES.JPG",
        categoria: {
            nombre: "MONTAJES",
            id: "MONTAJES" // CAMPO CLAVE CON ID HTML
        },
        precio: 45000
    },
    {
        id: "MONTAJES CALAVERA",
        titulo: "MONTAJES ILUSTRATOR",
        imagen: "./img/MONTAJES CALAVERA.JPG",
        categoria: {
            nombre: "MONTAJES",
            id: "MONTAJES" // CAMPO CLAVE CON ID HTML
        },
        precio: 30000
    },
    // Pantalones
    {
        id: "ILUSTRACION STICKERS",
        titulo: "ILUSTRACION STICKERS",
        imagen: "./img/MONTAJES 3.JPG",
        categoria: {
            nombre: "ILUSTRACION STICKERS",
            id: "MONTAJES"
        },
        precio: 15000
    },
    {
        id: "cartel",
        titulo: "CARTELES PUBLICITARIOS",
        imagen: "./img/cartel.JPG",
        categoria: {
            nombre: "MONTAJES",
            id: "MONTAJES"   
        },
        precio: 50000
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}