console.log('Ejecutando JS...');

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
var imagen = document.getElementById('image');

const ctx = canvas.getContext('2d');
const Selec1 = document.getElementById("Selec1");
const Gris = document.getElementById('Gris');
const Colores = document.getElementById("Colores");

//-- Para los deslizadores
const deslizador_rojo = document.getElementById('deslizador_rojo');
const deslizador_verde = document.getElementById('deslizador_verde');
const deslizador_azul = document.getElementById('deslizador_azul');
//-- Para el valor de cada deslizador
const value_r = document.getElementById('value_r');
const value_v= document.getElementById('value_v');
const value_a = document.getElementById('value_a');
var estado = "colores";
var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
var img1 = document.createElement("imagen");
img1.data = img;
//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
imagen.onload = function () {

    //-- Se establece como tamaño del canvas el mismo
    //-- que el de la imagen original
    canvas.width = imagen.width;
    canvas.height = imagen.height;
  
    //-- Situar la imagen original en el canvas
    ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);
  
    console.log("Imagen lista...");
  
  };
  
// Para la foto que quiero modificar cuando haga click..(seleccionamos)
Selec1.onclick = () => {
    imagen = document.getElementById('image');
    ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);
  }
  Colores.onclick = () => {
    estado = "colores";
    ctx.putImageData(paraFiltroColor(), 0, 0);
  
  }

  
        //-- Funcion de retrollamada del deslizador rojo
        deslizador_rojo.oninput = () => {
            if (estado == "colores"){
            paraFiltroColor();
        
            }
        }
        //-- Funcion de retrollamada del deslizador verde
        deslizador_verde.oninput = () => {
            if (estado == "colores"){
            paraFiltroColor();
        
            }
        }
        //-- Funcion de retrollamada del deslizador azul
        deslizador_azul.oninput = () => {
            if (estado == "colores"){
            paraFiltroColor();
        
            }
        }
  
  function paraFiltroColor() {
    //-- Mostrar el nuevo valor del deslizador
    value_r.innerHTML = deslizador_rojo.value;
    value_v.innerHTML = deslizador_verde.value;
    value_a.innerHTML = deslizador_azul.value;

    ctx.drawImage(imagen, 0,0, canvas.width, canvas.height)
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;
  
    
    rojo = deslizador_rojo.value;
    verde = deslizador_verde.value;
    azul = deslizador_azul.value;
    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > rojo)
        data[i] = rojo;
      if (data[i+1] > verde)
        data[i+1] = verde;
      if (data[i+2] > azul)
        data[i+2] = azul;
    }
    ctx.putImageData(imgData, 0, 0);
    return imgData;
  }
 

  function paraFiltroGrises(){
    ctx.drawImage(imagen, 0,0 ,canvas.width, canvas.height);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    
    for (var i = 0; i < data.length; i+=4) {
      r = data[i];
      g = data[i+1];
      b = data[i+2];
      brillo = (3 * r + 4 * g + b)/8 
      data[i] = brillo;
      data[i+1] = brillo;
      data[i+2] = brillo;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  Gris.onclick = () => {
    
    paraFiltroGrises();
   
    
  }





