const plantarcarrito = () => {
    modalcontainer.innerHTML = "";
    modalcontainer.style.display = "flex";
    const modalheader = document.createElement("div");
    modalheader.className = "modal-header"
    modalheader.innerHTML = `
    <h1 class="modal-header-title">VENTAS</h1>
    `;
    modalcontainer.append(modalheader);
  
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";
  
    // boton de la cruz para cerrar //
    modalbutton.addEventListener("click", () =>{
        modalcontainer.style.display= "none";
    })
  
    modalheader.append(modalbutton);
  
    cart.forEach((product) =>{
        let carritocontent = document.createElement("div");
        carritocontent.className = "modal-content";
        carritocontent.innerHTML = `
        
            <img src="${product.img}"/>
            <div class="product-info">
                <h3>${product.titulo}</h3>
            </div>
            <p>${product.precio}$</p>
            <p>Cant: ${product.cantidad}</p>
            <p> Total: ${product.cantidad * product.precio}$</p>
            <div class="quantity">
            <div class="quantity">
                <span class="quantity-btn-decrese">➖</span>
                <span class="quantity-input">${product.cantidad}</span>
                <span class="quantity-btn-increse">➕</span>
                <span class="delete">❌</span>
            </div>
            <div class="price>${product.prrcio * product.cantidad}$</div>
            
        `;
        modalcontainer.append(carritocontent);
  
        // CODIGO PARA RESTAR PRODUCTOS // 
        const decrese = carritocontent.querySelector(".quantity-btn-decrese");
        decrese.addEventListener("click", () =>{
            if ( product.cantidad !== 1){ 
                product.cantidad--;
                plantarcarrito();
            }
          
            
        });
  
        // CODIGO PARA SUMAR PRODUCTOS // 
        const increse = carritocontent.querySelector(".quantity-btn-increse");
        increse.addEventListener("click", () =>{
            product.cantidad++;
            plantarcarrito();
        });
        //CODIGO ELIMINAR PRODUCTO DEL CARRITO//
        const eleminarProducto = carritocontent.querySelector(".delete");
        eleminarProducto.addEventListener("click", () => {
         EliminarProductoCarrito(product.id);
        
        }); 
          
    });  
  
    // CODIGO DE SUMAR TODOS LOS PRODUCTOS//
    const total = cart.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `
        <div class="total_price"> Total a pagar = $ ${total}</div>
        <button class="btn-primary" id="checkout-btn">go to checkout</button>
        <div id="button-checkout"></div>
        `;
    modalcontainer.append(totalBuying); 
  
    //mercadoPago
    const mercadopago = new MercadoPago("TEST-9e9a08a7-5bc7-455e-b973-9b1edaf30e49", {
        locale: "es-AR", // The most cammon are: "pt-BR", "es-AR", "en-US"
    });
  
    const checkoutButton = totalBuying.querySelector("#checkout-btn");
   
    checkoutButton.addEventListener("click", function () {
  
        checkoutButton.remove();
      
        const orderData = {
          quantity: 1,
          description: "compra de e-commers" ,
          price: total,
        };
      
        fetch("http://localhost:8080/create_preference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (preference) {
            createCheckoutButton(preference.id);
          })
          .catch(function () {
            alert("Unexpected error");
            $('#checkout-btn').attr("disabled", false);
          });
      });
      
      function createCheckoutButton(preferenceId) {
        // Initialize the checkout
        const bricksBuilder = mercadopago.bricks();
      
        const renderComponent = async (bricksBuilder) => {
          //if (window.checkoutButton) window.checkoutButton.unmount();
          await bricksBuilder.create(
            'wallet',
            'button-checkout', // class/id where the payment button will be displayed
            {
              initialization: {
                preferenceId: preferenceId
              },
              callbacks: {
                onError: (error) => console.error(error),
                onReady: () => {}
              }
            }
          );
        };
        window.checkoutButton =  renderComponent(bricksBuilder);
      }
  };
  
  
  // LLAMAR Y MOSTRAR CARRITO//
  vercarrito.addEventListener("click", plantarcarrito);
  
  // FUNCION PARA ELIMINAR PRODUCTO//
  const EliminarProductoCarrito = (productId) => {
    const foundIndex = cart.findIndex((element) => element.id === productId);
  
    if (foundIndex !== -1) {/*splice se usa para para eliminar ese elemento del carrito. */
      cart.splice(foundIndex, 1);
    }
  
    carritoCounter();
    plantarcarrito();
  }
  
  
  const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    cantidadCarrito.innerText = cart.length;
  }
   
  
  