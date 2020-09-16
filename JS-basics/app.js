
//funciones basicas
console.log("Hola Mundo");
//TIPOS DE DATOS
//array
let arreglo = ["Diego", "Pepe", "pablito"];


let username = "Diego";

let pass;
pass= "jkashdjk"

document.write(pass)
const PI = 3.14 //convencion constante en mayuscula

let result = 11+0
//OBJETO JS
var miAuto = new Object();
miAuto.marca = "Ford";
miAuto.modelo = "Mustang";
miAuto.año = 1969;

document.write(miAuto.año)

//if anidados
if(result>10){
    document.write("LA SUMA ES MAYOR A 10")
}
else if(result>=7){
    document.write("LA SUMA ES MAYOR A 7")
}else{
    document.write("LA SUMA ES MENOR A 7")
}

let typeCard = "CrediSto"

//CASE
switch(typeCard){
    case "Debito":
        document.write("TARJETA DE DEBITO")
        break;
    case "Credito":
        document.write("TARJETA DE CREDITO")
        break;
    default:
        document.write("NO TIENES TARJETA")
        break;

}
//BUCLES
let cont=0
while(cont<10 ){
    document.write("Hola");
    cont++;
}

for(let i=0; i<arreglo.length;i++){
    document.write(" "+arreglo[i]);
}

//FUNCIONES

function saludar(nombre){
    document.write("Hola"+ nombre);
}
saludar("Diego");
saludar("Pepe");





