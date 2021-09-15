//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
document.getElementById("log").addEventListener("click", login);

});
 function login(){
 var usuario = document.getElementById('inputUsuario').value;
 var contraseña = document.getElementById('contraseña').value;
 if((usuario !== "") && (contraseña !== "")) {
    window.location.href="home.html"
} else {
   alert("Hay campos vacios, completar para iniciar sesion");
 }
 sessionStorage.setItem("Usuario", usuario);
 sessionStorage.setItem("Contraseña", contraseña);
}

 
