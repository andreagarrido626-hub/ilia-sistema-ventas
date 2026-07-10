# ILIA - Sistema de Gestion de Ventas

Proyecto del Modulo 3 de Fundamentos de Programacion en JavaScript.

La aplicacion simula un sistema de ventas para ILIA, un emprendimiento de reposteria, panaderia y sabores internacionales. Incluye una interfaz web para gestionar productos, carrito, compra e inventario, y tambien un modo consola para cumplir con la consigna del modulo.

## Funcionalidades principales

- Visualizacion de productos con nombre, categoria, precio y stock.
- Busqueda de productos por nombre o categoria.
- Carrito de compras con aumento y disminucion de cantidades.
- Calculo de subtotales, total de compra e IVA estimado.
- Finalizacion de compra con descuento automatico de stock.
- Gestion de inventario con aumento, disminucion y restablecimiento de stock.
- Persistencia del inventario en `localStorage`.
- Modo consola con `prompt`, `alert` y `console.log`.

## Requisitos de la pauta cubiertos

- Uso de variables con `const` y `let`.
- Uso de funciones reutilizables para organizar el codigo.
- Operaciones matematicas: suma, resta, multiplicacion y division.
- Condicionales con `if`, `else` y `switch`.
- Estructuras de repeticion con `forEach`, `map`, `reduce` y `while`.
- Arreglos y objetos para almacenar y manipular productos.
- Objeto `tienda` con metodos para calcular subtotales, totales e IVA.
- Validaciones de entradas para evitar compras sin stock o datos invalidos.
- Documentacion breve del funcionamiento del proyecto.

## Como usar la aplicacion

1. Abre `index.html` en el navegador.
2. Usa el menu superior para navegar por Productos, Buscar, Carrito, Inventario y Comprar.
3. Para probar la consigna de consola, presiona el boton `Consola`.
4. Abre la consola del navegador para revisar los resultados impresos con `console.log`.

Tambien puedes iniciar el modo consola escribiendo esta funcion en la consola del navegador:

```js
iniciarModoConsola()
```

## Estructura del proyecto

```text
.
├── index.html
├── README.md
└── assets
    ├── css
    │   └── style.css
    ├── img
    │   └── logo-ilia.png
    └── js
        └── script.js
```

## Analisis breve

El proyecto trabaja con una lista de productos representada como un arreglo de objetos. Cada producto tiene propiedades como `id`, `nombre`, `categoria`, `precio`, `stock` y `emoji`.

La aplicacion usa funciones separadas para renderizar pantallas, gestionar el carrito, calcular totales, buscar productos y actualizar inventario. Esto permite mantener el codigo ordenado y reutilizable.

El modo consola permite practicar los fundamentos solicitados en la pauta: ingreso de datos mediante `prompt`, resultados con `alert` y `console.log`, calculos matematicos, validaciones, condicionales, ciclos, arreglos y objetos.

## Capturas sugeridas para la entrega

- Pantalla principal del sistema.
- Listado de productos.
- Carrito con productos agregados.
- Resumen de compra.
- Inventario.
- Modo consola ejecutandose con resultados visibles en la consola del navegador.
