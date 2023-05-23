

class PrecioViaje{
    constructor(viajeUSD, dolarOF, cantPersonas, claseViaje, tipoViaje){
        this.viajeUSD = viajeUSD; //valor del vuelo individual en dolares;
        this.dolarOF = dolarOF; //valor del dolar oficial (sin impuestos);
        this.cantPersonas = cantPersonas; //cantidad de personas para calcular el viaje
        this.claseViaje = claseViaje; //boleto de clase (turista, bussines, primera clase);
        this.tipoViaje = tipoViaje; //si el viaje es solo de ida, o de ida y vuelta;
    }

    calculaPrecioIViaje() { //Se calcula el precio del viaje individual tomando en cuenta el impuesto pais del 35%
        let precioI=0;
        switch(this.tipoViaje){
            case 1: //en caso de que sea 1 quiere decir que el usuario eleigio clase turista (tiene un costo del 3% del pasaje)
            precioI = (((this.viajeUSD*this.dolarOF)*1.03));
            break;
            case 2: //en caso de que sea 2 quiere decir que el usuario eleigio clase bussines(tiene un costo del 7% del pasaje)
            precioI = (((this.viajeUSD*this.dolarOF)*1.07));
            break;
            default: //en caso de que sea 3 (el valor por default) quiere decir que el usuario eleigio primera clase(tiene un costo del 15% del pasaje)
            precioI = (((this.viajeUSD*this.dolarOF)*1.15));
            break;
        }
    return Math.round(precioI);
    }

    calculaPrecioTotal(){ //calcula el precio total con los valores del dolar oficial, el valor del viaje en dolares, la cantidad de personas, el tipo de clase y si es de ida o de vuelta
        let precioF=0;
        let tipvia=1;
        if(this.tipoViaje==true){
            tipvia=2;
        }
        switch(this.tipoViaje){
            case 1: //en caso de que sea 1 quiere decir que el usuario eleigio clase turista (tiene un costo del 3% del pasaje)
            precioF = (((this.viajeUSD*this.dolarOF)*1.03)*1.35)*parseInt(this.cantPersonas)*tipvia;
            break;
            case 2: //en caso de que sea 2 quiere decir que el usuario eleigio clase bussines(tiene un costo del 7% del pasaje)
            precioF = (((this.viajeUSD*this.dolarOF)*1.07)*1.35)*parseInt(this.cantPersonas)*tipvia;
            break;
            default: //en caso de que sea 3 (el valor por default) quiere decir que el usuario eleigio primera clase(tiene un costo del 15% del pasaje)
            precioF = (((this.viajeUSD*this.dolarOF)*1.15)*1.35)*parseInt(this.cantPersonas)*tipvia;
            break;
        }
        return Math.round(precioF); 
    }
    
    calculaTasaseImpuestos(){
        const precioImp = (((this.viajeUSD*this.dolarOF))*1.35)-(((this.viajeUSD*this.dolarOF))); //calcula los gastos individuales de los impuestos
        return Math.round(precioImp);
    }
    
    
}



const viajeUSD = Math.round((Math.random()*100 + 300)*100)/100; //genera un valor del viaje en dolares con un valor entre 300 y 400 usd, con 2 decimales
const dolarOf = parseInt(localStorage.getItem('dolarOf')); //recuperamos el valor del dolar oficial dentro del local storage
const via = JSON.parse(localStorage.getItem('viaje')); //recuperamos el objeto viaje del local storage

const pviaje = new PrecioViaje(viajeUSD,dolarOf,via.cantidad,via.clase,via.tipo); //creamos el objeto de tipo viaje


//en esta seccion rellenamos los recuadros de las distintas empresas, en funcion del DOM presentado
//primero el titulo
const loc1 = document.getElementById('origenv');
loc1.innerHTML = via.origen;
const loc2 = document.getElementById('destinov');
loc2.innerHTML = via.destino;

//luego los campos de los recuadros para las empresas
const loc3 = document.querySelectorAll('#lugar1');
loc3.forEach(el => {
    el.innerHTML = via.origen;
});
const loc4 = document.querySelectorAll('#lugar2');
loc4.forEach(el => {
    el.innerHTML = via.destino;
});
 const loc5 = document.querySelectorAll('#fecha1');
    loc5.forEach(el => {
        el.innerHTML = via.fini;
    });

const loc7 = document.querySelectorAll('#fecha2a');
    loc7.forEach(el => {
        el.innerHTML = via.fini;
    });


if(via.ffin===null){
    const elimina = document.querySelectorAll('.vuelta');
    elimina.forEach(el => {
        el.parentNode.removeChild(el);
    });
    
}

else{

    
    const loc11 = document.querySelectorAll('#fecha1b');
    loc11.forEach(el => {
        el.innerHTML = via.ffin;
    });

const loc6 = document.querySelectorAll('#fecha2b');
    
    loc6.forEach(el => {
        el.innerHTML = via.ffin;
    });

}

//luego rellenamos los campos de los precios
//en este caso, se vario un poco el valor de cada precio, de forma aleatoria
const piniv = numeral(pviaje.calculaPrecioIViaje()).format('$0,'); //calculamos el valor y luego lo presentamos en las distintas aerolineas
const p1 = document.getElementById('precAd1');
p1.innerHTML=piniv;
const p2 = document.getElementById('precAd2');
p2.innerHTML=piniv;
const p3 = document.getElementById('precAd3');
p3.innerHTML=piniv;

const pteimp = numeral(pviaje.calculaTasaseImpuestos()).format('$0,'); //calculamos el valor y luego lo presentamos en las distintas aerolineas
const p4 = document.getElementById('precITC1');
p4.innerHTML=pteimp;
const p5 = document.getElementById('precITC2');
p5.innerHTML=pteimp;
const p6 = document.getElementById('precITC3');
p6.innerHTML=pteimp;

const ptot = numeral(pviaje.calculaPrecioTotal()).format('$0,'); //calculamos el valor y luego lo presentamos en las distintas aerolineas
const p7 = document.getElementById('total1');
p7.innerHTML=ptot;
const p8 = document.getElementById('total2');
p8.innerHTML=ptot;
const p9 = document.getElementById('total3');
p9.innerHTML=ptot;


//variamos el tiempo de ida y de vuelta segun sea el caso mediante numeros aleatorios entre las 00 y las 24
const hsalida1 = Math.round(((Math.random()*12)*100)/100);
const hllegada1 = Math.round(((Math.random()*11+12)*100)/100);
const hsalida2 = Math.round(((Math.random()*12)*100)/100);
const hllegada2 = Math.round(((Math.random()*11+12)*100)/100);
const hsalida3 = Math.round(((Math.random()*12)*100)/100);
const hllegada3 = Math.round(((Math.random()*11+12)*100)/100);

const horas1 = document.getElementById("hora1v1");
horas1.innerHTML = hsalida1 + ":00 AM";
const horas2 = document.getElementById("hora2v1");
horas2.innerHTML = hllegada1 + ":00 PM";

const horas3 = document.getElementById("hora1v2");
horas3.innerHTML = hsalida2 + ":00 AM";
const horas4 = document.getElementById("hora2v2");
horas4.innerHTML = hllegada2 + ":00 PM";

const horas5 = document.getElementById("hora1v3");
horas5.innerHTML = hsalida3 + ":00 AM";
const horas6 = document.getElementById("hora2v3");
horas6.innerHTML = hllegada3 + ":00 PM";


const hsvuelta1 = Math.round(((Math.random()*12)*100)/100);
const hsllegada1 = Math.round(((Math.random()*11+12)*100)/100);
const hsvuelta2 = Math.round(((Math.random()*12)*100)/100);
const hsllegada2 = Math.round(((Math.random()*11+12)*100)/100);
const hsvuelta3 = Math.round(((Math.random()*12)*100)/100);
const hsllegada3 = Math.round(((Math.random()*11+12)*100)/100);

if(via.ffin!==null){ //significa que hay viaje de vuelta


const horas7 = document.getElementById("hora4v1");
horas7.innerHTML = hsvuelta1 + ":00 AM";
const horas8 = document.getElementById("hora3v1");
horas8.innerHTML = hsllegada1 + ":00 PM";

const horas9 = document.getElementById("hora4v2");
horas9.innerHTML = hsvuelta2 + ":00 AM";
const horas10 = document.getElementById("hora3v2");
horas10.innerHTML = hsllegada2 + ":00 PM";

const horas11 = document.getElementById("hora4v3");
horas11.innerHTML = hsvuelta3 + ":00 AM";
const horas12 = document.getElementById("hora3v3");
horas12.innerHTML = hsllegada3 + ":00 PM";


}

function DatosViaje (precioF, horaS1, horaLl1, horaS2, horaLl2, aerolinea){
        this.precioF = precioF; //costo total del vuelo;
        this.horaS1 = horaS1; //hora de salida (ida);
        this.horaLl1 = horaLl1; //hora de llegada (ida)
        this.horaS2 = horaS2; //hora de salida (vuelta);
        this.horaLl2 = horaLl2; //hora de llegada(vuelta);
        this.aerolinea = aerolinea; //empresa de viaje contratada
}

const button1 = document.getElementById("comp1");
button1.addEventListener('click', function(){
    const datoViaje = new DatosViaje(pviaje.calculaPrecioTotal(), hsalida1, hllegada1, hsvuelta1, hsllegada1, 1);
    enJSON = JSON.stringify(datoViaje);
    localStorage.setItem("DatosViaje", enJSON);
    //luego de esto pasamos a la siguiente pagina donde cargaremos los datos de las personas y la tarjeta para comprar el pasaje
    document.location.href = "./formularioPyT.html";
});

const button2 = document.getElementById("comp2");
button2.addEventListener('click', function(){
    const datoViaje = new DatosViaje(pviaje.calculaPrecioTotal(), hsalida2, hllegada2, hsvuelta2, hsllegada2, 2);
    enJSON = JSON.stringify(datoViaje);
    localStorage.setItem("DatosViaje", enJSON);
});


const button3 = document.getElementById("comp3");
button3.addEventListener('click', function(){
    const datoViaje = new DatosViaje(pviaje.calculaPrecioTotal(), hsalida3, hllegada3, hsvuelta3, hsllegada3, 3);
    enJSON = JSON.stringify(datoViaje);
    localStorage.setItem("DatosViaje", enJSON);
});


//let interes = Math.round((Math.random()*10 + 15)*100)/100; //Genera un interes aleaotorio entre 10 y 25, con 2 decimales

