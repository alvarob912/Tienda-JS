import { stock } from "./stock.js";
import { guardarCarritoStorage, eliminarCarritoStorage, obtenerCarritoStorage } from "./storage.js"


document.addEventListener('DOMContentLoaded', () => {

    renderizarProductos();
    obtenerCarritoStorage(carrito);
    renderizarCarrito();
    calcularTotal();
});

    let carrito = [];

    const renderizarProductos = () => {
        
        //capturo el div
        const tienda = document.getElementById('tienda');
        
        //recorro los objetos
        stock.forEach(({img, nombre, precio, id})=>{

            //creo un div por cada objeto
            let producto = document.createElement('div');
            //aplico las clases que quiero
                producto.classList.add('col-12');
                producto.classList.add('col-md-4');
                producto.classList.add('mb-5');
                producto.classList.add('d-flex');
                producto.classList.add('justify-content-center');


            producto.innerHTML = `
            <div class="card border-dark text-dark bg-light" style="width: 18rem;">
            <img class="card-img-top" src="${img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p>$${precio}</p>
                <button class="btn btn-dark btn btn-outline-light" id="${id}">Añadir al carrito</button>
            </div>
        </div>`


            tienda.appendChild(producto);

            producto.querySelector('button').addEventListener('click', ()=>{
                
                agregarAlCarrito(id);
            })
        })
        
    }
    
const agregarAlCarrito = (id) =>{
    
    let producto = stock.find(producto => producto.id === id);

    let productoEnCarrito = carrito.find(producto => producto.id === id);

    if(productoEnCarrito){

        productoEnCarrito.cantidad++;
        
    }else{

        producto.cantidad=1;

        carrito.push(producto);
    }
    renderizarCarrito();
    calcularTotal();
    guardarCarritoStorage(carrito);

}

const renderizarCarrito = () => {

    let carritoHTML = document.querySelector('#carrito');

    carritoHTML.innerHTML= '';
    
    carrito.forEach(({img, nombre, precio, cantidad}, index) => {

        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p>$${precio}</p>
                <p>Cantidad: ${cantidad}</p>
                <button class="btn btn-danger">Eliminar</button>
            </div>
        </div>`

        producto.querySelector('button').addEventListener('click', ()=>{
            //eliminar prod del carrito
            EliminarCarrito(index);

        })

        carritoHTML.appendChild(producto);
    })
}

const EliminarCarrito = (indice) =>{

    carrito[indice].cantidad--;

    (carrito[indice].cantidad === 0) && carrito.splice(indice,1);

    eliminarCarritoStorage(carrito);
    renderizarCarrito();
    calcularTotal();
}


const calcularTotal = () =>{

    let total = 0;

    carrito.forEach(({precio, cantidad})=>{
        total += precio*cantidad;
    })

    const t= document.getElementById('total');
    t.innerHTML = `<h5>$${total}</h5>`;
}

