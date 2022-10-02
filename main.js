import { stock } from "./stock.js";

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {

    const renderizarProductos = () => {
        
        //capturo el div
        const tienda = document.getElementById('tienda');
        
        //recorro los objetos
        stock.forEach((p)=>{

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
            <img class="card-img-top" src="${p.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p>$${p.precio}</p>
                <button class="btn btn-dark btn btn-outline-light" id="${p.id}">Añadir al carrito</button>
            </div>
        </div>`


            tienda.appendChild(producto);

            producto.querySelector('button').addEventListener('click', ()=>{
                
                agregarAlCarrito(p.id);
            })
        })
        
    }
    
    renderizarProductos();
    renderizarCarrito();
    calcularTotal();

});

const agregarAlCarrito = (id) =>{
    
    let producto = stock.find(producto => producto.id === id);

    let productoEnCarrito = carrito.find(producto => producto.id === id);

    if(productoEnCarrito){

        productoEnCarrito.cantidad++;
        
    }else{

        producto.cantidad=1;

        carrito.push(producto);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
    calcularTotal();

}

const renderizarCarrito = () => {

    let carritoHTML = document.querySelector('#carrito');

    carritoHTML.innerHTML= '';
    
    carrito.forEach((p, index) => {

        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${p.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p>$${p.precio}</p>
                <p>Cantidad: ${p.cantidad}</p>
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

    if(carrito[indice].cantidad === 0){
        //elimina la card cuando llegue a 0
        carrito.splice(indice,1);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
    calcularTotal();
}


const calcularTotal = () =>{

    let total = 0;

    carrito.forEach((p)=>{
        total += p.precio*p.cantidad;
    })

    const t= document.getElementById('total');
    t.innerHTML = `<h5>$${total}</h5>`;
}

