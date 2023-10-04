 // Función para mostrar el modal
 function mostrarModal() {
    document.getElementById("modal").style.display = "block";
}

// si el usuario pone si se va a utilizar esta funcion 
//va a entrar a la pagina web sino va a utilizar la funcion redirigir a google de abajo 
function entrar() {
    document.getElementById("modal").style.display = "none";
}
// Función para redirigir a Google
function redirigirAGoogle() {
    document.getElementById("modal").style.display = "none";
    // Redirige a Google
    window.location.href = "https://www.google.com";
}

// cuando se abre la pagina carga este modal de verificacion de edad 
mostrarModal();






