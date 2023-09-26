const shopContent = document.getElementById("shopContent");
const vercarrito = document.getElementById("btn");
const modalcontainer = document.getElementById("modal-container");

const cart= [];

productos.forEach((product) =>{
    const content = document.createElement("div");
    content.innerHTML =`
    <img src="${product.img}">
    <h3>${product.titulo}</h3>
    <p>${product.precio} $ </p>
    `
    shopContent.append(content)


    /*Creacion del boton para comprar */

    const comprarBoton = document.createElement("button");
    comprarBoton.innerHTML = "Comprar";

    content.append(comprarBoton);

    //creacion del boton del carrito 

    comprarBoton.addEventListener("click", () =>{
        cart.push({
            id: product.id,
            titulo: product.titulo,
            precio: product.precio,
            cantidad: product.cantidad,
            img: product.img,
        })
        
    });
});

vercarrito.addEventListener("click", () =>{
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
        `;
        modalcontainer.append(carritocontent);
    });
   const total = cart.reduce((acc, el) => + el.precio, 0);

   const totalBuying = document.createElement("div");
   totalBuying.className = "total-content";
   totalBuying.innerHTML = `Total a pagar: ${total} $`;
   modalcontainer.append(totalBuying);
});

