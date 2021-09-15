
//nuevo codigo


var product = {};
var comments = {};
function showImages(array) {

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
function showComments(array) {

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

        document.getElementById("comments-section").innerHTML = htmlContentToAppend;
    }
}
function mostrarEstrellas(puntaje) {
    let estrellaLlena = '<span class="fa fa-star"checked> </span>'
    let estrellaVacia = '<span class="fa fa-star>"</span>'
   
    let puntajeEstrella = ""
   
    for(let i = 0; i < puntaje ; i++){
        puntajeEstrella += estrellaLlena
    }
    for(let i = 0; i < 5-puntaje ; i++){
        puntajeEstrella += estrellaVacia
    }
    return puntajeEstrella
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("product-name");
            let productDescriptionHTML = document.getElementById("product-description");
            let productCountHTML = document.getElementById("product-count");
           

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            

            //Muestro las imagenes en forma de galería
            showImages(product.images);
        }
    });
});
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;

            showComments(comments);
            comment()
        }
    });
});

document.getElementById("enviar").addEventListener("click", comment)
function comment(){
        let user = sessionStorage.getItem("Usuario");
        let addComment = document.getElementById("comment").value;
        let commentToAppend = "";
    if (addComment!= ""){    
        
            commentToAppend = `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">` + user + `</h5><p style="text-align: right"> ` + addComment + `</p> 
                        <p> ` + mostrarEstrellas(comment.score) + `</p>
                    </div>
                    <p class="mb-1"> 01/02/2022</p>

                </div>
            </div>

            `

            document.getElementById("comments-section").innerHTML += commentToAppend;
    }
};


