const shopContent = document.getElementById("shopContent");
const vercarrito = document.getElementById("btn");
const modalcontainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("CantidadCarrito")


let cart= [];

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
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

        if(repeat){
            cart.map((prod) => {
                if(prod.id === product.id)
                    prod.cantidad++
            })
        }else{
            cart.push({
                id: product.id,
                titulo: product.titulo,
                precio: product.precio,
                img: product.img,
                cantidad: product.cantidad,
            });
        }
        console.log(cart);
        carritoCounter();
    });
});



