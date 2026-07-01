//======================================================//
//                                                      //
//                      ILIA POS                         //
//             Sistema de Gestión de Ventas             //
//                                                      //
//        Bootcamp Desarrollo Web - Módulo 3            //
//                Autora: Andrea Garrido                //
//                                                      //
//======================================================//



//======================================================//
//                      PRODUCTOS                       //
//======================================================//

const productos = [

    {
        id: 1,
        nombre: "Quesillo Venezolano",
        categoria: "Postres",
        precio: 3500,
        stock: 8,
        emoji: "🍮"
    },

    {
        id: 2,
        nombre: "Churros Españoles",
        categoria: "Dulces",
        precio: 2000,
        stock: 15,
        emoji: "🥖"
    },

    {
        id: 3,
        nombre: "Rollos de Canela",
        categoria: "Panadería",
        precio: 2800,
        stock: 12,
        emoji: "🥐"
    },

    {
        id: 4,
        nombre: "Arroz con Leche",
        categoria: "Postres",
        precio: 2500,
        stock: 10,
        emoji: "🍚"
    },

    {
        id: 5,
        nombre: "Arepa Jamón y Queso",
        categoria: "Comida",
        precio: 3000,
        stock: 6,
        emoji: "🫓"
    }

];



//======================================================//
//                     VARIABLES                        //
//======================================================//

// Arreglo donde se guardarán los productos agregados al carrito
let carrito = [];

// Panel principal donde se mostrará todo el contenido dinámico
const panel = document.getElementById("panel");

// Botones del menú principal
const btnProductos = document.getElementById("btnProductos");
const btnBuscar = document.getElementById("btnBuscar");
const btnCarrito = document.getElementById("btnCarrito");
const btnInventario = document.getElementById("btnInventario");
const btnCompra = document.getElementById("btnCompra");



//======================================================//
//                FUNCIONES GENERALES                   //
//======================================================//

// Limpia completamente el panel antes de mostrar una nueva vista
function limpiarPanel() {

    panel.innerHTML = "";

}



// Muestra la pantalla de bienvenida al iniciar la aplicación
function mostrarInicio() {

    limpiarPanel();

    const titulo = document.createElement("h2");
    titulo.textContent = "👋 Bienvenida Andrea";

    const texto = document.createElement("p");
    texto.textContent =
        "Bienvenida al sistema de gestión de ventas de Ilia.";

    const texto2 = document.createElement("p");
    texto2.textContent =
        "Utiliza las opciones superiores para comenzar.";

    panel.appendChild(titulo);
    panel.appendChild(texto);
    panel.appendChild(texto2);

}



//======================================================//
//                 INICIAR APLICACIÓN                   //
//======================================================//

mostrarInicio();

//======================================================//
//                   PRODUCTOS                          //
//======================================================//

//------------------------------------------------------//
// Crea una tarjeta con la información de un producto
//------------------------------------------------------//

function crearTarjetaProducto(producto) {

    // Tarjeta principal
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-producto");

    // Emoji
    const emoji = document.createElement("div");
    emoji.classList.add("emoji");
    emoji.textContent = producto.emoji;

    // Nombre
    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;

    // Categoría
    const categoria = document.createElement("p");
    categoria.textContent = `Categoría: ${producto.categoria}`;

    // Precio
    const precio = document.createElement("p");
    precio.textContent = `Precio: $${producto.precio}`;

    // Stock
    const stock = document.createElement("p");
    stock.textContent = `Stock disponible: ${producto.stock}`;

    // Botón Agregar
    const boton = document.createElement("button");
    boton.classList.add("btn-agregar");
    boton.textContent = "Agregar al carrito";

    // Guardamos el id del producto
    boton.dataset.id = producto.id;

    // Evento del botón
    boton.addEventListener("click", () => {

        agregarAlCarrito(producto.id, boton);

    });

    // Agregamos todos los elementos a la tarjeta
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



//------------------------------------------------------//
// Muestra todos los productos disponibles
//------------------------------------------------------//

function mostrarProductos() {

    limpiarPanel();

    // Título
    const titulo = document.createElement("h2");
    titulo.textContent = "🧁 Productos de Ilia";

    // Descripción
    const descripcion = document.createElement("p");
    descripcion.textContent =
        "Selecciona un producto para agregarlo al carrito.";

    // Contenedor de tarjetas
    const lista = document.createElement("div");
    lista.classList.add("lista-productos");

    // Recorremos todos los productos
    console.log(productos);
    for (const producto of productos) {

        const tarjeta = crearTarjetaProducto(producto);

        lista.appendChild(tarjeta);

    }

    // Mostramos todo en el panel
    panel.appendChild(titulo);
    panel.appendChild(descripcion);
    panel.appendChild(lista);

}

//======================================================//
//                     CARRITO                          //
//======================================================//

//------------------------------------------------------//
// Agrega un producto al carrito
//------------------------------------------------------//

function agregarAlCarrito(idProducto, boton) {

    // Buscar el producto seleccionado
    const producto = productos.find(producto => producto.id === idProducto);

    // Buscar si el producto ya existe en el carrito
    const itemCarrito = carrito.find(item => item.producto.id === idProducto);

    if (itemCarrito) {

        // Si ya existe aumentamos la cantidad
        itemCarrito.cantidad++;

    } else {

        // Si no existe lo agregamos
        carrito.push({

            producto: producto,

            cantidad: 1

        });

    }

    // Actualizamos el contador
    actualizarContadorCarrito();

    // Animación del botón
    boton.textContent = "✅ Agregado";
    boton.classList.add("btn-agregado");

    setTimeout(() => {

        boton.textContent = "Agregar al carrito";
        boton.classList.remove("btn-agregado");

    }, 800);

}



//------------------------------------------------------//
// Actualiza el contador del carrito
//------------------------------------------------------//

function actualizarContadorCarrito() {

    let totalProductos = 0;

    for (const item of carrito) {

        totalProductos += item.cantidad;

    }

    if (totalProductos === 0) {

        btnCarrito.textContent = "🛒 Carrito";

        btnCarrito.classList.remove("carrito-activo");

    } else {

        btnCarrito.textContent = `🛒 Carrito (${totalProductos})`;

        btnCarrito.classList.add("carrito-activo");

    }

}


//======================================================//
//                     EVENTOS                          //
//======================================================//

btnProductos.addEventListener("click", mostrarProductos);

// Estos los dejaremos preparados para las siguientes etapas
btnBuscar.addEventListener("click", () => {
    limpiarPanel();

    const titulo = document.createElement("h2");
    titulo.textContent = "🔍 Buscar";

    panel.appendChild(titulo);
});

btnCarrito.addEventListener("click", () => {
    limpiarPanel();

    const titulo = document.createElement("h2");
    titulo.textContent = "🛒 Carrito";

    panel.appendChild(titulo);
});

btnInventario.addEventListener("click", () => {
    limpiarPanel();

    const titulo = document.createElement("h2");
    titulo.textContent = "📦 Inventario";

    panel.appendChild(titulo);
});

btnCompra.addEventListener("click", () => {
    limpiarPanel();

    const titulo = document.createElement("h2");
    titulo.textContent = "💳 Comprar";

    panel.appendChild(titulo);
});