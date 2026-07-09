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
//                 MOSTRAR CARRITO                      //
//======================================================//

function mostrarCarrito() {

    // Limpiar el panel
    limpiarPanel();

    // Título
    const titulo = document.createElement("h2");
    titulo.textContent = "🛒 Mi Carrito";

    panel.appendChild(titulo);

    // Si el carrito está vacío
    //------------------------------------------------------//
    // Si el carrito está vacío
    //------------------------------------------------------//

    if (carrito.length === 0) {

        const mensaje = document.createElement("p");

        mensaje.textContent =
            "🛒 Tu carrito está vacío. Agrega algunos productos para comenzar.";

        mensaje.classList.add("carrito-vacio");

        panel.appendChild(mensaje);

        return;

    }

    let totalCompra = 0;

    // Recorrer el carrito
    for (const item of carrito) {

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-producto");

        // Nombre
        const nombre = document.createElement("h3");
        nombre.textContent =
            `${item.producto.emoji} ${item.producto.nombre}`;

        //======================================================//
        // CONTROLES DE CANTIDAD
        //======================================================//

        const controles = document.createElement("div");
        controles.classList.add("controles-cantidad");

        // Botón disminuir
        const btnMenos = document.createElement("button");
        btnMenos.textContent = "➖";

        btnMenos.addEventListener("click", () => {

            item.cantidad--;

            if (item.cantidad <= 0) {

                carrito = carrito.filter(elemento => elemento !== item);

            }

            actualizarContadorCarrito();

            mostrarCarrito();

        });

        // Cantidad
        const cantidad = document.createElement("span");
        cantidad.textContent = item.cantidad;

        // Botón aumentar
        const btnMas = document.createElement("button");
        btnMas.textContent = "➕";

        btnMas.addEventListener("click", () => {

            item.cantidad++;

            actualizarContadorCarrito();

            mostrarCarrito();

        });

        controles.append(
            btnMenos,
            cantidad,
            btnMas
        );

        // Subtotal
        const subtotal = item.producto.precio * item.cantidad;

        totalCompra += subtotal;

        const precio = document.createElement("p");
        precio.textContent =
            `Subtotal: $${subtotal}`;

        tarjeta.append(
            nombre,
            controles,
            precio
        );

        panel.appendChild(tarjeta);

    }

    // Total
    const total = document.createElement("h3");
    total.textContent =
        `💰 Total: $${totalCompra}`;

    panel.appendChild(total);

}


//======================================================//
//                     BUSCADOR                         //
//======================================================//

//------------------------------------------------------//
// Muestra la pantalla del buscador
//------------------------------------------------------//

function mostrarBuscador() {

    limpiarPanel();

    // Título
    const titulo = document.createElement("h2");
    titulo.textContent = "🔍 Buscar Productos";

    // Descripción
    const descripcion = document.createElement("p");
    descripcion.textContent =
        "Busca por nombre o categoría.";

    // Input
    const input = document.createElement("input");

    input.type = "text";
    input.placeholder = "Escribe aquí...";

    input.id = "inputBuscar";

    // Contenedor de resultados
    const resultados = document.createElement("div");
    resultados.id = "resultadosBusqueda";

    //------------------------------------------------------//
    // Evento de búsqueda en tiempo real
    //------------------------------------------------------//

    input.addEventListener("input", () => {

        const texto = input.value.toLowerCase().trim();

        const encontrados = productos.filter(producto =>

            producto.nombre.toLowerCase().includes(texto) ||

            producto.categoria.toLowerCase().includes(texto)

        );

        mostrarResultadosBusqueda(encontrados);

    });

    panel.append(
        titulo,
        descripcion,
        input,
        resultados
    );

}


//------------------------------------------------------//
// Muestra los resultados encontrados
//------------------------------------------------------//

function mostrarResultadosBusqueda(listaProductos) {

    const resultados = document.getElementById("resultadosBusqueda");

    resultados.innerHTML = "";

    // Si no hay texto escrito todavía
    const textoBuscado = document.getElementById("inputBuscar").value.trim();

    if (textoBuscado === "") {

        return;

    }

    // No se encontraron productos
    if (listaProductos.length === 0) {

        const mensaje = document.createElement("p");

        mensaje.textContent = "❌ No se encontraron productos.";

        resultados.appendChild(mensaje);

        return;

    }

    // Crear un contenedor igual al de Productos
    const lista = document.createElement("div");

    lista.classList.add("lista-productos");

    // Crear tarjetas
    for (const producto of listaProductos) {

        const tarjeta = crearTarjetaProducto(producto);

        lista.appendChild(tarjeta);

    }

    // Agregamos el contenedor al panel
    resultados.appendChild(lista);

}


//======================================================//
//                    INVENTARIO                        //
//======================================================//

//------------------------------------------------------//
// Muestra todos los productos del inventario
//------------------------------------------------------//

function mostrarInventario() {

    limpiarPanel();

    // Título
    const titulo = document.createElement("h2");
    titulo.textContent = "📦 Inventario";

    // Descripción
    const descripcion = document.createElement("p");
    descripcion.textContent = "Administra el stock de todos los productos.";

    // Contenedor principal
    const lista = document.createElement("div");
    lista.classList.add("lista-productos");

    // Crear una tarjeta por cada producto
    for (const producto of productos) {

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-producto");

        // Emoji
        const emoji = document.createElement("div");
        emoji.classList.add("emoji");
        emoji.textContent = producto.emoji;

        // Nombre
        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        // Precio
        const precio = document.createElement("p");
        precio.textContent = `Precio: $${producto.precio}`;

        // Stock
        const stock = document.createElement("p");
        stock.classList.add("texto-stock");
        stock.textContent = `Stock: ${producto.stock}`;

        // Contenedor de botones
        const acciones = document.createElement("div");
        acciones.classList.add("acciones-stock");

        // Botón -
        const btnMenos = document.createElement("button");
        btnMenos.textContent = "➖";
        btnMenos.classList.add("btn-stock");

        // Botón +
        const btnMas = document.createElement("button");
        btnMas.textContent = "➕";
        btnMas.classList.add("btn-stock");

        // Disminuir stock
        btnMenos.addEventListener("click", () => {

            if (producto.stock > 0) {
                producto.stock--;
                stock.textContent = `Stock: ${producto.stock}`;
            }

        });

        // Aumentar stock
        btnMas.addEventListener("click", () => {

            producto.stock++;
            stock.textContent = `Stock: ${producto.stock}`;

        });

        // Agregar botones
        acciones.append(btnMenos, btnMas);

        // Armar tarjeta
        tarjeta.append(
            emoji,
            nombre,
            precio,
            stock,
            acciones
        );

        // Agregar tarjeta a la lista
        lista.appendChild(tarjeta);

    }

    // Mostrar todo
    panel.append(
        titulo,
        descripcion,
        lista
    );

}

//======================================================//
//                     EVENTOS                          //
//======================================================//

btnProductos.addEventListener("click", mostrarProductos);

// Estos los dejaremos preparados para las siguientes etapas
btnBuscar.addEventListener("click", mostrarBuscador);

btnCarrito.addEventListener("click", mostrarCarrito);


btnCompra.addEventListener("click", () => {
    limpiarPanel();

    const titulo = document.createElement("h2");
    titulo.textContent = "💳 Comprar";

    panel.appendChild(titulo);
});

btnInventario.addEventListener("click", () => {

    mostrarInventario();

});
