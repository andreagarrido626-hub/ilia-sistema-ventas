//======================================================
// ILIA POS
// Sistema de Gestión de Ventas
// Bootcamp Desarrollo Web - Módulo 3
// Autora: Andrea Garrido
//======================================================


//======================================================
// DATOS
//======================================================

const productos = [

    {
        id:1,
        nombre:"Quesillo Venezolano",
        categoria:"Postres",
        precio:3500,
        stock:8,
        emoji:"🍮"
    },

    {
        id:2,
        nombre:"Churros Españoles",
        categoria:"Dulces",
        precio:2000,
        stock:15,
        emoji:"🥨"
    },

    {
        id:3,
        nombre:"Rollos de Canela",
        categoria:"Panadería",
        precio:2800,
        stock:12,
        emoji:"🥐"
    },

    {
        id:4,
        nombre:"Arroz con Leche",
        categoria:"Postres",
        precio:2500,
        stock:10,
        emoji:"🍚"
    },

    {
        id:5,
        nombre:"Arepa Jamón y Queso",
        categoria:"Comida",
        precio:3000,
        stock:6,
        emoji:"🫓"
    }

];


//======================================================
// VARIABLES
//======================================================

let carrito = [];

const panel = document.getElementById("panel");


//======================================================
// FUNCIONES
//======================================================

function limpiarPanel() {

    panel.innerHTML = "";

}

function mostrarInicio() {

    limpiarPanel();

    const titulo = document.createElement("h2");
    titulo.textContent = "👋 Bienvenida Andrea";

    const texto = document.createElement("p");
    texto.textContent =
        "Selecciona una opción del menú para comenzar a gestionar tu emprendimiento Ilia.";

    panel.appendChild(titulo);
    panel.appendChild(texto);

}



//======================================
// EVENTOS
//======================================

const btnProductos = document.getElementById("btnProductos");

btnProductos.addEventListener("click", mostrarProductos);





//======================================================
// INICIAR APP
//======================================================

mostrarInicio();

function crearTarjetaProducto(producto) {

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-producto");

    const emoji = document.createElement("div");
    emoji.classList.add("emoji");
    emoji.textContent = producto.emoji;

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;

    const categoria = document.createElement("p");
    categoria.textContent = `Categoría: ${producto.categoria}`;

    const precio = document.createElement("p");
    precio.textContent = `Precio: $${producto.precio}`;

    const stock = document.createElement("p");
    stock.textContent = `Stock: ${producto.stock}`;

    const boton = document.createElement("button");
    boton.classList.add("btn-agregar");
    boton.textContent = "Agregar al carrito";

    tarjeta.append(
        emoji,
        nombre,
        categoria,
        precio,
        stock,
        boton
    );

    return tarjeta;

}

function mostrarProductos() {

    limpiarPanel();

    const titulo = document.createElement("h2");
    titulo.textContent = "🧁 Productos de Ilia";

    const descripcion = document.createElement("p");
    descripcion.textContent = "Selecciona un producto para agregarlo al carrito.";

    const lista = document.createElement("div");
    lista.classList.add("lista-productos");

    for (const producto of productos) {

        const tarjeta = crearTarjetaProducto(producto);

        lista.appendChild(tarjeta);

    }

    panel.appendChild(titulo);
    panel.appendChild(descripcion);
    panel.appendChild(lista);

}