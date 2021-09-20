//Creamos una variable de producto
var product = {};

//Funcion para desplegar todas las imagenes del producto
function mostrarImagenes(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let images = array[i];

        htmlContentToAppend += `
            <a href="` + images + `"
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
                    </div>
                </div>
            </a>
            `

        document.getElementById("product-images").innerHTML = htmlContentToAppend;
    }
}

//Funcion para mostrar la seccion de comentarios y su respectiva valoracion
function mostrarComentarios(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let comments = array[i];
        
        htmlContentToAppend += `
        
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">` + comments.user + `</h5><p style="text-align: right"> ` + comments.description + `</p>
                    <p>` + mostrarEstrellas(comments.score) + ` </p>
                </div>
                <p class="mb-1"> ` + comments.dateTime + `</p>
                
            </div>
        </div>
        
        `
        //Guardamos la informacion en el html
        document.getElementById("comments-section").innerHTML = htmlContentToAppend;
    }
}

//Activamos la funcion JSON para mostrar la informacion completa del producto obtenida del servidor
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
//Creamos las variables que contienen la informacion
            let nombreProducto= document.getElementById("product-name");
            let descripcionProducto = document.getElementById("product-description");
            let cantidadProducto = document.getElementById("product-count");
           
//Agregamos la informacion de las variables como items de la variable producto
            nombreProducto.innerHTML = product.name;
            descripcionProducto.innerHTML = product.description;
            cantidadProducto.innerHTML = product.soldCount;
            

            //Muestro las imagenes en forma de galería
            mostrarImagenes(product.images);
        }
    });
});
//Activo la funcion JSON para obtener la informacion de los comentarios del servidor.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;

            mostrarComentarios(comments);
            commentario()
        }
    });
});

//Activo el escuchador de eventos para que al hacer click se active la funcion
//que agrega comentarios con su respectivo nombre de usuario y su valoracion en estrellas.
document.getElementById("enviar").addEventListener("click", commentario)
    function commentario(){
            let user = sessionStorage.getItem("Usuario");
            let agregarComentario = document.getElementById("comment").value;
            let valoracion = agregarEstrellas(document.getElementsByName("estrellas"));
          //Obtenemos la fecha y hora actual y la guardamos en variables
            let hoy = new Date();
            let dia = hoy.getDate();
            let mes = hoy.getMonth() +1 ;
            let anio = hoy.getFullYear();
            let hora = hoy.getHours();
            let minutos = hoy.getMinutes();
            let segundos = hoy.getSeconds();
            let fechaActual = `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
             
           
            let htmlcommentToAppend = "";
                if (agregarComentario!= ""){    
            
                    htmlcommentToAppend = `
                    <div class="list-group-item list-group-item-action">
                        <div class="row">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">` + user + `</h5><p style="text-align: right"> ` + agregarComentario + `</p> 
                                <p> ` + mostrarEstrellas(valoracion) + `</p>  
                            </div>
                            <p class="mb-1"> ` + fechaActual + `</p>

                        </div>
                    </div>

                    `
                 //Agregamos la informacion al html
                document.getElementById("comments-section").innerHTML += htmlcommentToAppend;
        }
    };

//Funcion para mostrar las estrellas segun la valoracion de cada comentario
function mostrarEstrellas(puntaje) {
    let estrellaVacia = '<span class="fa fa-star>"</span>'
    let estrellaLlena = '<span class="fa fa-star"checked></span>'
    
   
    let puntajeEstrella = ""
   
    for(let i = 0; i < puntaje ; i++){
        puntajeEstrella += estrellaLlena
    }
    for(let i = 0; i < (5-puntaje) ; i++){
        puntajeEstrella += estrellaVacia
    }
    return puntajeEstrella
}

//Creamos la funcion para agregar una puntuacion en un nuevo comentario
function agregarEstrellas (puntuacion){
    if (puntuacion[0].checked) {
        return 5;        
    }else if (puntuacion[1].checked) {
        return 4;
    }else if (puntuacion[2].checked) {
        return 3;
    }else if (puntuacion[3].checked) {
        return 2;
    }else if (puntuacion[4].checked) {
        return 1;        
    }

}




