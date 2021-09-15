const ORDER_ASC_BY_COST = "Min-Max";
const ORDER_DESC_BY_COST = "Max-Min";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

 //Clasificacion de los productos
  function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

//Creamos la funcion que muestra la lista de productos
function showProductsList(array) {

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = array[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {


            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                        </div>
                        <p class="desc">` + product.description + `</p>
                        <div class="sold">
                            <small class="text-muted"><h3>` + product.currency + product.cost + `</h3>` + product.soldCount + ` Productos vendidos</small>
                        </div>
                        <p>
                         <a type="button" class="btn btn-sm btn-outline-secondary" href="product-info.html" >🛈</a>
                         <a type="button"  class="btn btn-sm btn-outline-secondary" href="cart.html">Añadir al carrito</a>
                        </p>
                    </div>
                </div>
            </div>
            `
        }
        
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

//Creamos el criterio de clasificacion de los productos.
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList(currentProductsArray);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function(e){
    showSpinner()
    setTimeout(() => {
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                currentProductsArray = resultObj.data;
                //Muestro los productos ordenados
                showProductsList(currentProductsArray);
            }
            hideSpinner();
        });
    }, 300);
//Para activar los botones Min-Max Max-Min y Relevancia:

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });
    
// Para limpiar el filtro de rango de precio elegido.
    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList(currentProductsArray);
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por rango de precio seleccionado.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        } else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        } else {
            maxCost = undefined;
        }

        showProductsList(currentProductsArray);
    });
});

//Pedimos la informacion detallada de los productos
