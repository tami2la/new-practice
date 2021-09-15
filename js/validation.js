

function validation(){

var usuario = sessionStorage.getItem("Usuario");
var contraseña = sessionStorage.getItem("Contraseña");

if ((usuario == undefined) || (contraseña == undefined)) {
    window.location.href = "index.html"
}

}

validation();
