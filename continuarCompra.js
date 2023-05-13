const storedCarrito = JSON.parse(localStorage.getItem('carrito'));

pintarCarrito()
CalcularYRenderizarTotal()
function pintarCarrito(){
    const containerProducts = document.getElementById('container-products');
    storedCarrito.forEach(element => {
        containerProducts.innerHTML += `
        <div class="container-card">
        <img src="${element.foto}" alt="">
        <p class="nombre">${element.nombre}</p>
        <p class="precio">$${element.precio}</p>
        <p class="cantidad">Cant. ${element.cantidad}</p>
        <p class="subTotal">$${element.total}</p>
    </div>`
    });
}

function CalcularYRenderizarTotal(){
    const total = document.getElementById('total');
    let suamTotal = 0;
    storedCarrito.forEach(element =>{
        suamTotal += element.total;
    })
    total.innerText = "TOTAL: " + suamTotal;
}

function finalizarCompra(){
    alert("MUCHAS GRACIAS POR SU COMPRA!")
    window.location.href = "index.html";
}
