const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const eliminarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const obtenerCarritoStorage = (carrito) =>{
    const carritoStorage = localStorage.getItem('carrito');
    if (carritoStorage)
        carrito.push(...JSON.parse(carritoStorage));
}
export { guardarCarritoStorage, eliminarCarritoStorage, obtenerCarritoStorage };