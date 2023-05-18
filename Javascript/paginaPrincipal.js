///clase viaje
class Viaje{
    constructor(origen, destino, cantidad, fini, ffin, clase, tipo){
        this.origen=origen.toUpperCase();
        this.destino=destino.toUpperCase();
        this.cantidad = parseInt(cantidad);
        this.fini = fini;
        this.ffin = ffin;
        this.clase = clase;
        this.tipo = tipo;
    }

}

///Funcion que determina el valor del dolar turista
function valordolar(){
    let dolarof = Math.round((Math.random()*100 + 200)*100)/100; //genera un valor de dolar oficial entre 200 y 300, con 2 decimales
    
    return Math.round((dolarof*1.3)*1.35);
}

//funcion que inicializa el tipo de de viaje (si es solamente ida, o si es ida y vuelta)
function inicializarVarios(ele1, tipo){
    const div = document.createElement('div');
    div.setAttribute("id","circ2");
    ele1.appendChild(div);


    const pfechas = document.getElementById("fin");
    pfechas.disabled = true;


    const fecha = new Date(); //Fecha actual
    let mes = fecha.getMonth()+1; //obtengo el mes
    let dia = fecha.getDate(); //obtengo el dia
    let anio = fecha.getFullYear(); //obtengo el anio 
    if(dia<10){dia='0'+ dia; }//agrega cero si el menor de 10
    if(mes<10){mes='0'+ mes; }//agrega cero si el menor de 10 
    const pfecha = document.getElementById('ini');
        pfecha.value = anio+"-"+mes+"-"+dia;
        pfecha.min = anio+"-"+mes+"-"+dia;
        const pfechaf = document.getElementById('fin');
        pfechaf.value = "XXXX-XX-XX"; 
}

//funcion que determina las fechas de salida y de vuelta, si el cliente elije la opcion de solo salida, no se mostrara ninguna fecha de vuelta.
//en caso de que el cliente elija ida y vuelta, se habilitara la muestra de la fecha de salida, que sera como minimo el mismo dia que la de la ida.
function seteaFechas(tipo){
    const fecha = new Date(); //Fecha actual
    let mes = fecha.getMonth()+1; //obtengo el mes
    let dia = fecha.getDate(); //obtengo el dia
    let anio = fecha.getFullYear(); //obtengo el anio
    if(dia<10){dia='0'+ dia; }//agrega cero si el menor de 10
    if(mes<10){mes='0'+ mes; }//agrega cero si el menor de 10
    if(tipo==false){
        const pfecha = document.getElementById('ini');
        pfecha.value = anio+"-"+mes+"-"+dia;
        pfecha.min = anio+"-"+mes+"-"+dia;
        const pfechaf = document.getElementById('fin');
        pfechaf.value = "XXXX-XX-XX";
    }
    else{
    const pfechaf = document.getElementById('fin');
    pfechaf.value = anio+"-"+mes+"-"+dia;
    pfechaf.min = anio+"-"+mes+"-"+dia;
    }
}

//funcion que habilita o deshabilita la opcion de poder elegir la fecha de vuelta en funcion de la eleccion del cliente (ida - ida y vuelta)
function habDeshabFVuelta(pfecha, tipo){
    if(tipo==false){
        pfecha.disabled = true;
    }
    else{
        pfecha.disabled = false;
    }
}


//funcion que utilizamos para filtrar y mostrarle al usuario lo que desea buscar
function filtrar (lista, arrib, palabra){

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
      }
const resultado = arrib.filter((el)=> el.includes(palabra));   

if(resultado[0]===undefined){
resultado[0] = "No se encontraron resultados";
}
    
for (let i = 0; i < resultado.length; i++) {
        const option = document.createElement('option');
        option.value = resultado[i];
        option.text = resultado[i];
        lista.appendChild(option);    
    }
}


let fin = false;
let opcion;
let pasajes;
let tipo = false;
let pago;
let origen;
let destino;
let malaEleccion = false;
let bandera = false;
const clases = ["Turista", "Bussines", "Primera clase"];

//////////////////////////////////////
const arrib = ["BUENOS AIRES", "TENESSE", "NEW YORK", "PARANA","CORDOBA", "ROSARIO", "MOSKU","BARCELONA", "MADRID", "MALLORCA","PARANACITO"];

//rellenamos el input con las ciudades de vuelo
const menu2 = document.getElementById("destino");
for (let i = 0; i < arrib.length; i++) {
    const option = document.createElement('option');
    option.value = arrib[i];
    option.text = arrib[i];
    menu2.appendChild(option);    
}


const prueba1 = document.getElementById("filtraro");
prueba1.addEventListener('input', function(){
    const lista = document.getElementById("origen");
    filtrar(lista, arrib, prueba1.value.toUpperCase());
});

const prueba2 = document.getElementById("filtrard");
prueba2.addEventListener('input', function(){
    const lista = document.getElementById("destino");
    filtrar(lista, arrib, prueba2.value.toUpperCase());
});
//////////////////////////////////////////
//rellenamos el select de la cantidad de pasajes con numeros del 1 al 10 (maximo 10 personas)
const cant = document.getElementById("cant");
for (let i = 0; i < 10; i++) {
    const option = document.createElement('option');
    option.value = i+1;
    option.text = i+1;
    cant.appendChild(option);    
}

//rellenamos el select de la clase del vuelo coin las 3 clases disponibles
const clase = document.getElementById("clase");
for (let i = 0; i < clases.length ; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = clases[i];
    clase.appendChild(option);    
}

//generamos el evento para seleccionar si el tipo de viaje es de ida, o ida y vuelta
const ele1 = document.getElementById("circi");
 //inicializamos con un valor       
 inicializarVarios(ele1, tipo);
const ele2 = document.getElementById("circiv");
ele1.addEventListener('click', function(){
    if(tipo==true){
        const div2 = document.getElementById('circ2');
        ele2.removeChild(div2);
        const div = document.createElement('div');
        div.setAttribute("id","circ2");
        ele1.appendChild(div);
        tipo = false;
        seteaFechas(tipo);
        const pfecha = document.getElementById("fin");
        habDeshabFVuelta(pfecha, tipo);
    }
});

ele2.addEventListener('click', function(){
    if(tipo==false){
        const div2 = document.getElementById('circ2');
        ele1.removeChild(div2);
        const div = document.createElement('div');
        div.setAttribute("id","circ2");
        ele2.appendChild(div);
        tipo = true;
        seteaFechas(tipo);
        const pfecha = document.getElementById("fin");
        habDeshabFVuelta(pfecha, tipo);
    }
});


