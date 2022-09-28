const stock = [
    {
        "id" : 1,
        "nombre": "Buzo Nike SB",
        "img": "./resource/buzonike.jpg",
        "precio": 18500,
        "cantidad": 1
    },
    {
        "id" : 2,
        "nombre": "Remera Nike blanca 002",
        "img": "./resource/remerablanca.jpg",
        "precio": 8500,
        "cantidad": 1
    },
    {
        "id" : 3,
        "nombre": "Remera Nike SB3",
        "img": "./resource/remerablancaroja.jpg",
        "precio": 8500,
        "cantidad": 1
    },
    {
        "id" : 4,
        "nombre": "Pantalon Nike FJ",
        "img": "./resource/pantalon.jpg",
        "precio": 12500,
        "cantidad": 1
    },
    {
        "id" : 5,
        "nombre": "Campera Nike gris",
        "img": "./resource/camperagris.jfif",
        "precio": 14000,
        "cantidad": 1
    },
    {
        "id" : 6,
        "nombre": "Zapatillas Nike air 97 gris",
        "img": "./resource/zapatillasnike.webp",
        "precio": 31500,
        "cantidad": 1
    }
]

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {

    function renderizarProductos (){
        
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

});

function agregarAlCarrito (id){
    
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

function renderizarCarrito(){

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

function EliminarCarrito(indice){

    carrito[indice].cantidad--;

    if(carrito[indice].cantidad === 0){
        //elimina la card cuando llegue a 0
        carrito.splice(indice,1);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
    calcularTotal();
}


function calcularTotal(){

    let total = 0;

    carrito.forEach((p)=>{
        total += p.precio*p.cantidad;
    })

    const t= document.getElementById('total');
    t.innerHTML = `<h5>$${total}</h5>`;
}

