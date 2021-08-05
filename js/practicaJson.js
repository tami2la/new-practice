async function listaVideojuegos() {
    let promesa = await fetch('http://www.json-generator.com/api/json/get/bONgOdnCeW?indent=2');
    let data = await promesa.json()
    console.log(data)
    let contenido = ""
    for (let i = 0; i < data.length; i++) {

        let nombre = data[i].nombre
        let imagen = data[i].imagen
        let link = data[i].link
        let descripcion = data[i].descripcion


        contenido += `<h1> <a href=${data[i].link}> ${data[i].nombre}</a></h1> <br> 
                        <img src= ${data[i].imagen}>  <br> 
                        <p id="hola">${data[i].descripcion}</p> `

    }
    document.getElementById("contenido").innerHTML = contenido
}
listaVideojuegos()