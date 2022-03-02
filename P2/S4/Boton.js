console.log("Boton")
const boton = document.getElementById('boton')
boton.onclick = () => {
    console.log("Pulsado!!");
    test1.innerHTML="Parrafo Nuevo";
    test2.innerHTML+="1";
}
console.log("Boton2")
const boton2 = document.getElementById('boton2')
boton2.onclick = () => {
    console.log("Pulsado el boton!!2");
    test3.innerHTML+="2";
}