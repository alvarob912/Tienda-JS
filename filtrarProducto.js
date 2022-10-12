import { homeController } from "./homeController.js";
import { renderizarProductos } from "./main.js";

const buscar = document.getElementById('form1');

const filtrarProductos = async (productoNombre) => {
    const productos = await homeController();

    const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(productoNombre.toLowerCase()));
    renderizarProductos(productosFiltrados);
};

buscar.addEventListener('input', (e) => {
    filtrarProductos(e.target.value);
})