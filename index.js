const laptops = [
  { id: 1,
    nombre: "Lenovo ThinkPad X1 Carbon",
    precio: 1399,
    foto: "https://www.cetrogar.com.ar/media/catalog/product/9/4/94jm5-1.jpg?width=500&height=500&canvas=500,500&quality=80&bg-color=255,255,255&fit=bounds"
  },
  { id: 2,
    nombre: "HP Spectre x360",
    precio: 1299,
    foto: "https://www.cetrogar.com.ar/media/catalog/product/c/m/cm4456_a515_-_43_r26e.png?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:"
  },
  { id: 3,
    nombre: "Dell Alienware 15 intel i7",
    precio: 999,
    foto: "https://www.cetrogar.com.ar/media/catalog/product/a/l/alw3070-1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:"
  },
  { id: 4,
    nombre: "Razer Blade 15",
    precio: 1599,
    foto: "https://www.cetrogar.com.ar/media/catalog/product/i/n/in3511nt-cnb-05000ff090-bl_-_copia.jpeg?quality=80&bg-color=255,255,255&fit=bounds&height=500&width=500&canvas=500:500"
  },
  { id: 6,
    nombre: "Acer Predator Triton 500",
    precio: 1699,
    foto: "https://www.cetrogar.com.ar/media/catalog/product/c/m/cm4457_a515-54-38f9.png?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:"
  },
  { id: 8,
    nombre: "LG Gram",
    precio: 1199,
    foto: "https://www.cetrogar.com.ar/media/catalog/product/9/4/94jm5-1.jpg?width=500&height=500&canvas=500,500&quality=80&bg-color=255,255,255&fit=bounds" 
  },
  { id: 9,
    nombre: "Alienware m15 R5",
    precio: 1999,
    foto: "https://www.cetrogar.com.ar/media/catalog/product/9/4/94jm5-1.jpg?width=500&height=500&canvas=500,500&quality=80&bg-color=255,255,255&fit=bounds"
  },
  { id: 2,
    nombre: "HP Spectre x360",
    precio: 1299,
    foto: "https://www.cetrogar.com.ar/media/catalog/product/c/m/cm4456_a515_-_43_r26e.png?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:"
  }
];

const containerProducts = document.getElementById("container-products");


let carrito = [];


// Mostramos todas las laptos en inicio
laptops.forEach((laptop) =>{
  containerProducts.innerHTML += `
  <div class="col-12 col-md-4 col-lg-3 mb-4">
  <div class="card">
    <img src="${laptop.foto}" alt="laptop">
    <p class="name">${laptop.nombre}</p>
    <p class="price">$${laptop.precio}</p>
    <button class="comprar" 
    data-precio="${laptop.precio}" 
    data-foto="${laptop.foto}" 
    data-nombre="${laptop.nombre}"
    data-id="${laptop.id}">
    COMPRAR
    </button>
  </div>
</div>`
})

// Obtener todos los botones de compra
const botonesCompra = document.querySelectorAll('.comprar');
// Agregar un manejador de eventos a cada botón
botonesCompra.forEach((boton) => {
  boton.addEventListener('click', (evento) => {
    // Obtener los datos de la laptop desde los atributos data-*
    const nombre = evento.target.dataset.nombre;
    const precio = parseFloat(evento.target.dataset.precio);
    const foto = evento.target.dataset.foto;
    const id = evento.target.dataset.id;

    if(carrito.length == 0){
      carrito.push({
        id: id,
        nombre: nombre,
        precio: precio,
        foto: foto,
        cantidad: 1,
        total: precio
      })
    }else{
      const found = carrito.find(laptop => laptop.id == id);
      if(found){
        carrito.forEach(laptop =>{
          if(laptop.id == id){
            laptop.cantidad ++;
            laptop.total = laptop.cantidad * laptop.precio;
          }
        })
      }else{
        carrito.push({
          id: id,
          nombre: nombre,
          precio: precio,
          foto: foto,
          cantidad: 1,
          total: precio
        })
      }
    } 
    
    sumarIndicadorCarrito()
    console.log(carrito)
  });
});

// CADA VEZ QUE HACEMOS CLICK EN CARRITO LO PINTAMOS CON LO QUE TIENE EL CARRITO EN ESE MOMENTO
const modalCarrito = document.getElementById('modalCarrito');
modalCarrito.addEventListener("click",()=>{
pintarCarrito()

} )
 
function pintarCarrito(){
  const cardModal = document.getElementById("card-modal");
  cardModal.innerHTML = "";
  carrito.forEach((laptop, index) =>{
  cardModal.innerHTML += `
    <div class="card-modal-container">
      <img src="${laptop.foto}" alt="">
      <div class="divs">
        <div class="div1">
          <p class="nombre">${laptop.nombre}</p>
          <p class="precio">$${laptop.precio}</p>
        </div>
        <div class="div2">
          <p id="sumar" onclick="restarProducto(${index})">-</p>
          <p>${laptop.cantidad}</p>
          <p id="restar" onclick="sumarProducto(${index})">+</p>
          <p>$${laptop.total}</p> 
        </div>
      </div>
      <p class="quitar" id="quitar" onclick="eliminarProducto(event)" data-id="${laptop.id}">❌</p>
    </div>

    `;
    
  }) 
  
  sumarTotal()

}

function eliminarProducto(e){
  console.log(e.target.dataset.id)
  carrito = carrito.filter((laptop) =>{
    return laptop.id !== e.target.dataset.id;
  })
  pintarCarrito()
  sumarIndicadorCarrito()
  console.log(carrito)
}

function sumarTotal(){
  const total = document.getElementById('total');
  let suma = 0;
  if(carrito.length !== 0){
    carrito.forEach(ele =>{
      suma = suma + ele.total;
      total.innerText = "$" + suma;
    })
    
  }else{
    total.innerText = "$0"
  }
}


function sumarIndicadorCarrito(){
  const indicador = document.getElementById('indicador');
  indicador.innerText = carrito.length 
}

function sumarProducto(i){

  carrito.forEach((laptop, index) =>{
    if(index == i){
      laptop.cantidad ++;
      laptop.total = (laptop.precio * laptop.cantidad);
    }
    
  })
  sumarTotal()
  pintarCarrito()
}

function restarProducto(i){
  carrito.forEach((laptop, index) =>{
    
    if(index == i){
      if(laptop.cantidad !== 1){
        laptop.cantidad --;
        laptop.total = laptop.total - laptop.precio;
      }
    }
    
  })
  sumarTotal()
  pintarCarrito()
}

function continuarCompra(){
  localStorage.setItem('carrito', JSON.stringify(carrito));
  if(carrito.length == 0){
    alert("Carrito vacio!")
  }else{
    window.location.href = "continuarCompra.html";
  }

}

