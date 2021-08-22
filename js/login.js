//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
document.getElementById("log").addEventListener("click", login);

});
 function login(){
 let usuario = document.getElementById('usuario').value;
 let contraseña = document.getElementById('contraseña').value;
 if((usuario != "") && (contraseña != "")) {
    window.location.href="home.html"
} else {
   alert("Hay campos vacios, completar para iniciar sesion");
 }
 
}
 
 
 
