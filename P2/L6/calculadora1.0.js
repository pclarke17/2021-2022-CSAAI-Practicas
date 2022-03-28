console.log("Ejecutando la calculadora en js...");

display = document.getElementById("display");

boton1 = document.getElementById("boton1");
boton2 = document.getElementById("boton2");
boton3 = document.getElementById("boton3");
boton4 = document.getElementById("boton4");
boton5 = document.getElementById("boton5");
boton6 = document.getElementById("boton6");
boton7 = document.getElementById("boton7");
boton8 = document.getElementById("boton8");
boton9 = document.getElementById("boton9");
boton0 = document.getElementById("boton0");

suma = document.getElementById("suma");
resta = document.getElementById("resta");
multiplicacion = document.getElementById("multiplicacion");
division = document.getElementById("division");

igual = document.getElementById("igual");
clear = document.getElementById("clear");
del = document.getElementById("Delete");


  //------------------------------------------------------/
//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3
}
 let estado = ESTADO.INIT;   
function digito(ev)
{
    if (estado == ESTADO.INIT) {
        display.innerHTML = ev.target.value;
        estado = ESTADO.OP1;
    } else {
        display.innerHTML += ev.target.value;
    } 
    
}

digitos = document.getElementsByClassName("digito")

for (let boton of digitos) {
    boton.onclick = digito;
}
suma.onclick = (ev) => {

    //-- Insertar simbolo de sumar
    display.innerHTML += ev.target.value;

    //-- ¡Ojo! Aquí se inserta el + siempre!
    //-- Para que la calculadora funcione bien
    //-- sólo se debe permitir insertar el operador
    //-- en el estado OP1, y debe cambiar el estado
    //-- a OPERATION (según el diagrama de estados)
  
}

//-- Evaluar la expresión
igual.onclick = () => {
  
    display.innerHTML = eval(display.innerHTML); 
}

clear.onclick = () => {
  display.innerHTML = "";
  estado = ESTADO.INIT;
}  


// -- Insertar digito 1
boton1.onclick = () => {
  display.innerHTML += boton1.value;
}

//-- Insertar digito 2
boton2.onclick = () => {
  display.innerHTML += boton2.value;
}

boton3.onclick = () => {
    display.innerHTML += boton3.value;
}

boton4.onclick = () => {
    display.innerHTML += boton4.value;
}

boton5.onclick = () => {
    display.innerHTML += boton5.value;
}

boton6.onclick = () => {
    display.innerHTML += boton6.value;
}

boton7.onclick = () => {
    display.innerHTML += boton7.value;
}

boton8.onclick = () => {
    display.innerHTML += boton8.value;
}

boton9.onclick = () => {
    display.innerHTML += boton9.value;
}

boton0.onclick = () => {
    display.innerHTML += boton0.value;
}

suma.onclick = () => {
  display.innerHTML += suma.value;
}

resta.onclick = () => {
    display.innerHTML += resta.value;
}

multiplicacion.onclick = () => {
    display.innerHTML += multiplicacion.value;
}

division.onclick = () => {
    display.innerHTML += division.value;
}

del.onclick = () => {

display.innerHtml = digitos;

}

