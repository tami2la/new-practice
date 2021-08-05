const LIST_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";


let showSpinner = function showSpinner(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function hideSpinner(){
  document.getElementById("spinner-wrapper").display = "none";
}

let getJSONData = function(url){
  let result = [];
  return fetch(url);
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    }}
    .then(function (response){
      result.status = 'ok';
      result.data = response;
      return result;

    }} 

    .catch(function(error) {
      result.status = 'error';
      result.data = error;
      return result;
    ))}
}
