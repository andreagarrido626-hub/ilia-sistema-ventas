// ======================================================
// ILIA POS - Sistema de Gestion de Ventas
// Bootcamp Desarrollo Web - Modulo 3
// Autora: Andrea Garrido
// ======================================================

const STORAGE_KEY = "productosIlia";

const productosBase = [
    { id: 1, nombre: "Quesillo Venezolano", categoria: "Postres", precio: 3500, stock: 8, emoji: "🍮" },
    { id: 2, nombre: "Churros Espanoles", categoria: "Dulces", precio: 2000, stock: 15, emoji: "🥖" },
    { id: 3, nombre: "Rollos de Canela", categoria: "Panaderia", precio: 2800, stock: 12, emoji: "🥐" },
    { id: 4, nombre: "Arroz con Leche", categoria: "Postres", precio: 2500, stock: 10, emoji: "🍚" },
    { id: 5, nombre: "Arepa Jamon y Queso", categoria: "Comida", precio: 3000, stock: 6, emoji: "🫓" }
];

let productos = cargarProductos();
let carrito = [];

const panel = document.getElementById("panel");
const logo = document.getElementById("logo");
const btnProductos = document.getElementById("btnProductos");
const btnBuscar = document.getElementById("btnBuscar");
const btnCarrito = document.getElementById("btnCarrito");
const btnInventario = document.getElementById("btnInventario");
const btnCompra = document.getElementById("btnCompra");
const btnConsola = document.getElementById("btnConsola");

const tienda = {
    nombre: "ILIA",
    iva: 0.19,
    descuentoMayorista: 0.1,
    calcularSubtotal(item) {
        return item.producto.precio * item.cantidad;
    },
    calcularTotal(items) {
        return items.reduce((total, item) => total + this.calcularSubtotal(item), 0);
    },
    calcularIva(total) {
        return Math.round(total * this.iva);
    }
};

const operaciones = {
    sumar: (a, b) => a + b,
    restar: (a, b) => a - b,
    multiplicar: (a, b) => a * b,
    dividir: (a, b) => (b === 0 ? null : a / b)
};

function cargarProductos() {
    const guardados = localStorage.getItem(STORAGE_KEY);

    if (!guardados) {
        return copiarProductosBase();
    }

    try {
        const productosGuardados = JSON.parse(guardados);
        return Array.isArray(productosGuardados) ? productosGuardados : copiarProductosBase();
    } catch (error) {
        console.warn("No se pudo cargar el inventario guardado. Se usara el inventario base.", error);
        return copiarProductosBase();
    }
}

function copiarProductosBase() {
    return productosBase.map(producto => ({ ...producto }));
}

function guardarProductos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
}

function limpiarPanel() {
    panel.innerHTML = "";
}

function formatearPrecio(valor) {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0
    }).format(valor);
}

function crearElemento(etiqueta, texto, clase) {
    const elemento = document.createElement(etiqueta);
    elemento.textContent = texto;

    if (clase) {
        elemento.classList.add(clase);
    }

    return elemento;
}

function mostrarMensaje(mensaje) {
    try {
        alert(mensaje);
    } catch (error) {
        console.log(mensaje);
    }
}

function pedirConfirmacion(mensaje) {
    try {
        return confirm(mensaje);
    } catch (error) {
        console.log(mensaje);
        return false;
    }
}

function pedirDato(mensaje) {
    try {
        return prompt(mensaje);
    } catch (error) {
        console.warn("El navegador de prueba no permite prompt(). Abre el proyecto en Chrome, Safari o Edge para usar el modo consola completo.");
        mostrarAvisoConsolaNoDisponible();
        return null;
    }
}

function mostrarAvisoConsolaNoDisponible() {
    limpiarPanel();

    panel.append(
        crearElemento("h2", "⌨️ Modo consola"),
        crearElemento("p", "Este entorno de prueba bloqueo prompt(). En un navegador normal, presiona Consola o ejecuta iniciarModoConsola() para usar el modo consola solicitado en la pauta."),
        crearElemento("p", "La logica del modo consola esta implementada en JavaScript con prompt, alert, console.log, switch, while, funciones, arreglos y objetos.")
    );
}

function obtenerCantidadCarrito() {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
}

function buscarProductoPorId(idProducto) {
    return productos.find(producto => producto.id === Number(idProducto));
}

function mostrarInicio() {
    limpiarPanel();

    const totalProductos = productos.length;
    const totalStock = productos.reduce((total, producto) => total + producto.stock, 0);
    const totalCarrito = obtenerCantidadCarrito();

    const titulo = crearElemento("h2", "🏠 Panel Principal");
    const descripcion = crearElemento("p", "Bienvenida al sistema de gestion de ventas de Ilia.");

    const dashboard = document.createElement("div");
    dashboard.classList.add("dashboard");
    dashboard.innerHTML = `
        <div class="card-dashboard">
            <h3>📦 Productos</h3>
            <p>${totalProductos}</p>
        </div>
        <div class="card-dashboard">
            <h3>📊 Stock</h3>
            <p>${totalStock}</p>
        </div>
        <div class="card-dashboard">
            <h3>🛒 Carrito</h3>
            <p>${totalCarrito}</p>
        </div>
    `;

    const estado = document.createElement("div");
    estado.classList.add("estado-sistema");
    estado.innerHTML = "✅ <strong>Sistema listo para comenzar las ventas.</strong>";

    panel.append(titulo, descripcion, dashboard, estado);
}

function crearTarjetaProducto(producto) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-producto");

    const emoji = crearElemento("div", producto.emoji, "emoji");
    const nombre = crearElemento("h3", producto.nombre);
    const categoria = crearElemento("p", `Categoria: ${producto.categoria}`);
    const precio = crearElemento("p", `Precio: ${formatearPrecio(producto.precio)}`);
    const stock = crearElemento("p", `Stock disponible: ${producto.stock}`);
    const boton = document.createElement("button");

    boton.classList.add("btn-agregar");
    boton.textContent = producto.stock > 0 ? "Agregar al carrito" : "Sin stock";
    boton.disabled = producto.stock === 0;

    boton.addEventListener("click", () => agregarAlCarrito(producto.id, boton));

    tarjeta.append(emoji, nombre, categoria, precio, stock, boton);
    return tarjeta;
}

function mostrarProductos() {
    limpiarPanel();

    const titulo = crearElemento("h2", "🧁 Productos de Ilia");
    const descripcion = crearElemento("p", "Selecciona un producto para agregarlo al carrito.");
    const lista = document.createElement("div");

    lista.classList.add("lista-productos");
    productos.forEach(producto => lista.appendChild(crearTarjetaProducto(producto)));
    panel.append(titulo, descripcion, lista);
}

function agregarAlCarrito(idProducto, boton) {
    const producto = buscarProductoPorId(idProducto);

    if (!producto || producto.stock <= 0) {
        mostrarMensaje("No hay stock disponible para este producto.");
        return;
    }

    const itemCarrito = carrito.find(item => item.producto.id === producto.id);

    if (itemCarrito && itemCarrito.cantidad >= producto.stock) {
        mostrarMensaje("Stock insuficiente.");
        return;
    }

    if (itemCarrito) {
        itemCarrito.cantidad++;
    } else {
        carrito.push({ producto, cantidad: 1 });
    }

    actualizarContadorCarrito();
    animarBotonAgregado(boton);
}

function animarBotonAgregado(boton) {
    boton.textContent = "Agregado";
    boton.classList.add("btn-agregado");

    setTimeout(() => {
        boton.textContent = "Agregar al carrito";
        boton.classList.remove("btn-agregado");
    }, 800);
}

function actualizarContadorCarrito() {
    const totalProductos = obtenerCantidadCarrito();

    if (totalProductos === 0) {
        btnCarrito.textContent = "🛒 Carrito";
        btnCarrito.classList.remove("carrito-activo");
        return;
    }

    btnCarrito.textContent = `🛒 Carrito (${totalProductos})`;
    btnCarrito.classList.add("carrito-activo");
}

function crearTarjetaCarrito(item, permiteEditar) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-producto");

    const nombre = crearElemento("h3", `${item.producto.emoji} ${item.producto.nombre}`);
    const subtotal = tienda.calcularSubtotal(item);
    const precio = crearElemento("p", `Subtotal: ${formatearPrecio(subtotal)}`);

    if (!permiteEditar) {
        const cantidad = crearElemento("p", `Cantidad: ${item.cantidad}`);
        tarjeta.append(nombre, cantidad, precio);
        return tarjeta;
    }

    const controles = document.createElement("div");
    controles.classList.add("controles-cantidad");

    const btnMenos = crearElemento("button", "-");
    const cantidad = crearElemento("span", item.cantidad);
    const btnMas = crearElemento("button", "+");

    btnMenos.setAttribute("aria-label", `Disminuir ${item.producto.nombre}`);
    btnMas.setAttribute("aria-label", `Aumentar ${item.producto.nombre}`);

    btnMenos.addEventListener("click", () => modificarCantidadCarrito(item.producto.id, -1));
    btnMas.addEventListener("click", () => modificarCantidadCarrito(item.producto.id, 1));

    controles.append(btnMenos, cantidad, btnMas);
    tarjeta.append(nombre, controles, precio);
    return tarjeta;
}

function modificarCantidadCarrito(idProducto, cambio) {
    const item = carrito.find(elemento => elemento.producto.id === idProducto);

    if (!item) {
        return;
    }

    const nuevaCantidad = item.cantidad + cambio;

    if (nuevaCantidad <= 0) {
        carrito = carrito.filter(elemento => elemento.producto.id !== idProducto);
    } else if (nuevaCantidad > item.producto.stock) {
        mostrarMensaje("Stock insuficiente.");
    } else {
        item.cantidad = nuevaCantidad;
    }

    actualizarContadorCarrito();
    mostrarCarrito();
}

function mostrarCarrito() {
    limpiarPanel();

    const titulo = crearElemento("h2", "🛒 Mi Carrito");
    panel.appendChild(titulo);

    if (carrito.length === 0) {
        panel.appendChild(crearElemento("p", "Tu carrito esta vacio. Agrega productos para comenzar.", "carrito-vacio"));
        return;
    }

    carrito.forEach(item => panel.appendChild(crearTarjetaCarrito(item, true)));
    panel.appendChild(crearResumenCompra(false));
}

function mostrarCompra() {
    limpiarPanel();

    const titulo = crearElemento("h2", "💳 Resumen de Compra");
    panel.appendChild(titulo);

    if (carrito.length === 0) {
        panel.appendChild(crearElemento("p", "No hay productos para comprar.", "carrito-vacio"));
        return;
    }

    carrito.forEach(item => panel.appendChild(crearTarjetaCarrito(item, false)));
    panel.appendChild(crearResumenCompra(true));
}

function crearResumenCompra(mostrarIva) {
    const totalNeto = tienda.calcularTotal(carrito);
    const resumen = document.createElement("div");
    resumen.classList.add("resumen-compra");

    if (mostrarIva) {
        const iva = tienda.calcularIva(totalNeto);
        resumen.appendChild(crearElemento("p", `IVA estimado: ${formatearPrecio(iva)}`));
    }

    resumen.appendChild(crearElemento("h3", `Total: ${formatearPrecio(totalNeto)}`));

    const btnFinalizar = crearElemento("button", "Finalizar compra", "btn-finalizar");
    btnFinalizar.addEventListener("click", confirmarCompra);
    resumen.appendChild(btnFinalizar);

    return resumen;
}

function confirmarCompra() {
    const confirmar = pedirConfirmacion("¿Deseas finalizar esta compra? Se descontara el stock y se vaciara el carrito.");

    if (confirmar) {
        finalizarCompra();
    }
}

function finalizarCompra() {
    carrito.forEach(item => {
        item.producto.stock = Math.max(item.producto.stock - item.cantidad, 0);
    });

    guardarProductos();
    carrito = [];
    actualizarContadorCarrito();
    limpiarPanel();

    const confirmacion = document.createElement("div");
    confirmacion.classList.add("confirmacion-compra");
    confirmacion.append(
        crearElemento("h1", "🎉"),
        crearElemento("h2", "Compra realizada con exito"),
        crearElemento("p", "Gracias por comprar en ILIA. Tu pedido fue procesado correctamente.")
    );

    const btnVolver = crearElemento("button", "Volver al inicio", "btn-finalizar");
    btnVolver.addEventListener("click", mostrarInicio);

    confirmacion.appendChild(btnVolver);
    panel.appendChild(confirmacion);
}

function mostrarBuscador() {
    limpiarPanel();

    const titulo = crearElemento("h2", "🔍 Buscar Productos");
    const descripcion = crearElemento("p", "Busca por nombre o categoria.");
    const input = document.createElement("input");
    const resultados = document.createElement("div");

    input.type = "text";
    input.placeholder = "Escribe aqui...";
    input.id = "inputBuscar";
    resultados.id = "resultadosBusqueda";

    input.addEventListener("input", () => {
        const texto = input.value.toLowerCase().trim();
        const encontrados = filtrarProductos(texto);
        mostrarResultadosBusqueda(encontrados, texto);
    });

    panel.append(titulo, descripcion, input, resultados);
    input.focus();
}

function filtrarProductos(texto) {
    return productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto) ||
        producto.categoria.toLowerCase().includes(texto)
    );
}

function mostrarResultadosBusqueda(listaProductos, textoBuscado) {
    const resultados = document.getElementById("resultadosBusqueda");
    resultados.innerHTML = "";

    if (textoBuscado === "") {
        return;
    }

    if (listaProductos.length === 0) {
        resultados.appendChild(crearElemento("p", "No se encontraron productos."));
        return;
    }

    const lista = document.createElement("div");
    lista.classList.add("lista-productos");
    listaProductos.forEach(producto => lista.appendChild(crearTarjetaProducto(producto)));
    resultados.appendChild(lista);
}

function mostrarInventario() {
    limpiarPanel();

    const titulo = crearElemento("h2", "📦 Inventario");
    const descripcion = crearElemento("p", "Administra el stock de todos los productos.");
    const btnRestablecer = crearElemento("button", "Restablecer inventario", "btn-restablecer");
    const lista = document.createElement("div");

    btnRestablecer.addEventListener("click", restablecerInventario);
    lista.classList.add("lista-productos");
    productos.forEach(producto => lista.appendChild(crearTarjetaInventario(producto)));

    panel.append(titulo, descripcion, btnRestablecer, lista);
}

function crearTarjetaInventario(producto) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-producto");

    const emoji = crearElemento("div", producto.emoji, "emoji");
    const nombre = crearElemento("h3", producto.nombre);
    const precio = crearElemento("p", `Precio: ${formatearPrecio(producto.precio)}`);
    const stock = crearElemento("p", `Stock: ${producto.stock}`, "texto-stock");
    const acciones = document.createElement("div");
    const btnMenos = crearElemento("button", "-", "btn-stock");
    const btnMas = crearElemento("button", "+", "btn-stock");

    acciones.classList.add("acciones-stock");
    btnMenos.setAttribute("aria-label", `Disminuir stock de ${producto.nombre}`);
    btnMas.setAttribute("aria-label", `Aumentar stock de ${producto.nombre}`);

    btnMenos.addEventListener("click", () => actualizarStock(producto.id, -1));
    btnMas.addEventListener("click", () => actualizarStock(producto.id, 1));

    acciones.append(btnMenos, btnMas);
    tarjeta.append(emoji, nombre, precio, stock, acciones);
    return tarjeta;
}

function actualizarStock(idProducto, cambio) {
    const producto = buscarProductoPorId(idProducto);

    if (!producto) {
        return;
    }

    producto.stock = Math.max(producto.stock + cambio, 0);
    guardarProductos();
    mostrarInventario();
    actualizarContadorCarrito();
}

function restablecerInventario() {
    if (!pedirConfirmacion("¿Deseas restablecer todo el inventario?")) {
        return;
    }

    productos = copiarProductosBase();
    carrito = [];
    guardarProductos();
    actualizarContadorCarrito();
    mostrarInventario();
}

// ======================================================
// Modo consola solicitado en la pauta del modulo
// ======================================================

function iniciarModoConsola() {
    console.clear();
    console.log("Bienvenida al modo consola de ILIA.");
    console.table(productos.map(producto => ({
        id: producto.id,
        producto: producto.nombre,
        categoria: producto.categoria,
        precio: producto.precio,
        stock: producto.stock
    })));

    let continuar = true;

    while (continuar) {
        const opcion = pedirDato(
            "ILIA - Modo consola\n\n" +
            "1. Listar productos\n" +
            "2. Buscar productos por categoria\n" +
            "3. Calcular venta de un producto\n" +
            "4. Operaciones matematicas\n" +
            "5. Ver resumen de inventario\n" +
            "0. Salir\n\n" +
            "Elige una opcion:"
        );

        if (opcion === null) {
            break;
        }

        switch (opcion.trim()) {
            case "1":
                listarProductosConsola();
                break;
            case "2":
                buscarCategoriaConsola();
                break;
            case "3":
                calcularVentaConsola();
                break;
            case "4":
                ejecutarOperacionesConsola();
                break;
            case "5":
                mostrarResumenInventarioConsola();
                break;
            case "0":
                continuar = false;
                break;
            default:
                mostrarMensaje("Opcion no valida. Intenta nuevamente.");
        }
    }

    mostrarMensaje("Modo consola finalizado. Revisa la consola del navegador para ver los resultados.");
}

function listarProductosConsola() {
    console.log("Listado de productos:");
    productos.forEach(producto => {
        console.log(`${producto.id}. ${producto.nombre} - ${formatearPrecio(producto.precio)} - Stock: ${producto.stock}`);
    });
}

function buscarCategoriaConsola() {
    const categoria = solicitarTexto("Ingresa una categoria para buscar:");

    if (!categoria) {
        return;
    }

    const encontrados = productos.filter(producto =>
        producto.categoria.toLowerCase() === categoria.toLowerCase()
    );

    if (encontrados.length === 0) {
        mostrarMensaje("No se encontraron productos en esa categoria.");
        console.log(`Sin resultados para la categoria: ${categoria}`);
        return;
    }

    console.log(`Productos de la categoria ${categoria}:`);
    console.table(encontrados);
}

function calcularVentaConsola() {
    const idProducto = solicitarNumero("Ingresa el ID del producto:");
    const producto = buscarProductoPorId(idProducto);

    if (!producto) {
        mostrarMensaje("Producto no encontrado.");
        return;
    }

    const cantidad = solicitarNumero(`Ingresa la cantidad para ${producto.nombre}:`);

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
        mostrarMensaje("La cantidad debe ser un numero entero mayor a cero.");
        return;
    }

    if (cantidad > producto.stock) {
        mostrarMensaje("Stock insuficiente para completar la venta.");
        return;
    }

    const subtotal = operaciones.multiplicar(producto.precio, cantidad);
    const descuento = cantidad >= 10 ? operaciones.multiplicar(subtotal, tienda.descuentoMayorista) : 0;
    const total = operaciones.restar(subtotal, descuento);

    console.log("Calculo de venta:");
    console.log(`Producto: ${producto.nombre}`);
    console.log(`Cantidad: ${cantidad}`);
    console.log(`Subtotal: ${formatearPrecio(subtotal)}`);
    console.log(`Descuento: ${formatearPrecio(descuento)}`);
    console.log(`Total: ${formatearPrecio(total)}`);
    mostrarMensaje(`Total de la venta: ${formatearPrecio(total)}`);
}

function ejecutarOperacionesConsola() {
    const numeroA = solicitarNumero("Ingresa el primer numero:");
    const numeroB = solicitarNumero("Ingresa el segundo numero:");

    if (!Number.isFinite(numeroA) || !Number.isFinite(numeroB)) {
        mostrarMensaje("Debes ingresar numeros validos.");
        return;
    }

    const division = operaciones.dividir(numeroA, numeroB);

    console.log("Operaciones matematicas:");
    console.log(`${numeroA} + ${numeroB} = ${operaciones.sumar(numeroA, numeroB)}`);
    console.log(`${numeroA} - ${numeroB} = ${operaciones.restar(numeroA, numeroB)}`);
    console.log(`${numeroA} * ${numeroB} = ${operaciones.multiplicar(numeroA, numeroB)}`);
    console.log(division === null ? "No se puede dividir por cero." : `${numeroA} / ${numeroB} = ${division}`);
    mostrarMensaje("Operaciones realizadas. Revisa la consola.");
}

function mostrarResumenInventarioConsola() {
    const nombres = productos.map(producto => producto.nombre);
    const totalStock = productos.reduce((total, producto) => total + producto.stock, 0);
    const valorInventario = productos.reduce((total, producto) => {
        return operaciones.sumar(total, operaciones.multiplicar(producto.precio, producto.stock));
    }, 0);

    console.log("Resumen de inventario:");
    console.log(`Productos: ${nombres.join(", ")}`);
    console.log(`Total de unidades en stock: ${totalStock}`);
    console.log(`Valor total del inventario: ${formatearPrecio(valorInventario)}`);
}

function solicitarTexto(mensaje) {
    const respuesta = pedirDato(mensaje);
    return respuesta ? respuesta.trim() : "";
}

function solicitarNumero(mensaje) {
    const respuesta = pedirDato(mensaje);
    return respuesta === null ? NaN : Number(respuesta.replace(",", "."));
}

function registrarEventos() {
    btnProductos.addEventListener("click", mostrarProductos);
    btnBuscar.addEventListener("click", mostrarBuscador);
    btnCarrito.addEventListener("click", mostrarCarrito);
    btnCompra.addEventListener("click", mostrarCompra);
    btnInventario.addEventListener("click", mostrarInventario);
    btnConsola.addEventListener("click", iniciarModoConsola);
    logo.addEventListener("click", mostrarInicio);
}

registrarEventos();
mostrarInicio();

window.iniciarModoConsola = iniciarModoConsola;
console.log("ILIA cargado. Puedes usar iniciarModoConsola() para probar la aplicacion de consola.");
