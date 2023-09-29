const plantarcarrito = () => {
    modalcontainer.innerHTML = "";
    modalcontainer.style.display = "flex";
    const modalheader = document.createElement("div");
    modalheader.className = "modal-header"
    modalheader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
    `;
    modalcontainer.append(modalheader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    /*boton de la cruz para cerrar */
    modalbutton.addEventListener("click", () =>{
        modalcontainer.style.display= "none";
    })

    modalheader.append(modalbutton);

    cart.forEach((product) =>{
        let carritocontent = document.createElement("div");
        carritocontent.className = "modal-content";
        carritocontent.innerHTML = `
         <img src ="${product.img}">
         <h3>${product.titulo}</h3>
         <p>${product.precio}</p>
         <p>Cantidad: ${product.cantidad}</p>
         <p> Total: ${product.cantidad * product.precio}</p>
        `;
        modalcontainer.append(carritocontent);

        let eliminar = document.createElement("span");
        eliminar.innerText= ("❌");
        eliminar.className = "delete-product";
        carritocontent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);
        eliminar.setAttribute("data-product-id", product.id);
    });
   const total = cart.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

   const totalBuying = document.createElement("div");
   totalBuying.className = "total-content";
   totalBuying.innerHTML = `Total a pagar: ${total} $`;
   modalcontainer.append(totalBuying);
};

vercarrito.addEventListener("click", plantarcarrito);


/*funcion eliminar producto del carrito */
const eliminarProducto = (event) =>{
    const productId = event.target.getAttribute("data-product-id");

    cart = cart.filter((product) => product.id !== parseInt(productId));

    carritoCounter();
    plantarcarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    cantidadCarrito.innerText = cart.length;
}