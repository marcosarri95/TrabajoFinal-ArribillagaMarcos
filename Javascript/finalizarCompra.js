function rellenaCampos(personas){
    personas.forEach(persona => {
        const formularioP = document.querySelector('.tpersonas');
        ///creamos el primer div que encerrara todo el formulario
        const p1 = document.createElement('div');
        p1.className = "personax";
        formularioP.appendChild(p1);
        ///le asignamos un nombre de clase y lo agregamos a clase tpersonas que englobara los multiples formularios
        /// creamos el primer contenedor que tendra lainformacion correspondiente al nombre
        const p2 = document.createElement('div');
        p2.className = "nomb";
        const p3 = document.createElement('div');
        p3.className = "tituloC";
        p3.innerHTML = "Nombres";
        const p4 = document.createElement('div');
        p4.id = "nombre";
        p4.innerHTML = persona.nombre;
        p2.appendChild(p3);
        p2.appendChild(p4);
        p1.appendChild(p2);
        ///los asignamos como hijos del formulario principal
        /// creamos el primer contenedor que tendra lainformacion correspondiente al apellido
        const p5 = document.createElement('div');
        p5.className = "ape";
        const p6 = document.createElement('div');
        p6.className = "tituloC";
        p6.innerHTML = "Apellido";
        const p7 = document.createElement('div');
        p7.id = "apellido";
        p7.innerHTML = persona.apellido;
        p5.appendChild(p6);
        p5.appendChild(p7);
        p1.appendChild(p5);
        ///los asignamos como hijos del formulario principal
        /// creamos el primer contenedor que tendra lainformacion correspondiente al DNI
        const p8 = document.createElement('div');
        p8.className = "DNI";
        const p9 = document.createElement('div');
        p9.className = "tituloC";
        p9.innerHTML = "DNI:";
        const p10 = document.createElement('div');
        p10.id = "dni";
        p10.innerHTML = persona.DNI;
        p8.appendChild(p9);
        p8.appendChild(p10);
        p1.appendChild(p8);
        ///los asignamos como hijos del formulario principal
    });
        
}


const via = JSON.parse(localStorage.getItem('viaje')); //recuperamos el objeto viaje del local storage
// estructura de viaje:
// {origen: "PARANA, Entre Ríos", destino: "POTRERILLOS, Mendoza", cantidad: "2", fini: "2023-05-25",…}
// cantidad: "2" // cantidad de pasajeros
// clase: "2" // clase de vuelo 1) para turista, 2) para bussines, 3) para primera clase
// destino: "POTRERILLOS, Mendoza" // lugar de destino
// ffin: "2023-05-31" //fecha de salida
// fini: "2023-05-25" //fecha de vuelta
// origen: "PARANA, Entre Ríos" //lugar de salida
// tipo: true //si el viaje es de ida, entonces tipo=false, si el viaje es ida y vuelta, tipo=true
const datosViaje = JSON.parse(localStorage.getItem('DatosViaje')); //recuperamos el objeto datos del viaje del local storage
// estructura de datos viaje:
// //{precioF: 466939, horaS1: 7, horaLl1: 16, horaS2: 6, horaLl2: 18, aerolinea: 1}
// //aerolinea: 1 => el tipo de aerolinea (1 para flybondi, 2 para aerolineas, 3 para latamairlines)
// //horaLl1: 16 //hora de salida para viaje ida
// //horaLl2: 18 //hora de llegada para viaje vuelta
// //horaS1: 7 //hora de salida para viaje idea
// //horaS2: 6 //hora de salida para viaje vuelta
// //precioF: 466939 //preciofinal del viaje
const metodoPago = localStorage.getItem('metodoPago'); //recuperamos el metodo de pago (1) para debito, 2) para 3 cuotas, 3) para 6 cuotas, 4) para 12 cuotas.
const personas = JSON.parse(localStorage.getItem('personas'));
//estructura de datos para personas:
// DNI: "38772580"
// apellido: "Arribillaga"
// fnac: "2023-05-05"
// nacionalidad: "Argentina"
// nombre: "Marcos"
// puede ser un array de objetos, o un objeto simple, depende de la eleecion de la cantidad de pasajes

let preciototal = localStorage.getItem('preciofinal'); //recuperamos el precio final del viaje con elinteres de la tarjeta.

///comenzamos rellenando los campos del viaje:
const p1 = document.getElementById("lugar1");
p1.innerHTML = via.origen;
const p2 = document.getElementById("fecha1");
p2.innerHTML = via.fini;
const p3 = document.getElementById("hora1v1");
p3.innerHTML = datosViaje.horaS1+":00 hs";

const p4 = document.getElementById("lugar2");
p4.innerHTML = via.destino;
const p5 = document.getElementById("fecha2a");
p5.innerHTML = via.fini;
const p6 = document.getElementById("hora2v1");
p6.innerHTML = datosViaje.horaLl1+":00 hs";

// en caso de que el vuelo sea de ida y vuelta, agregamos los valores al formulario, de caso contrario mostramos solo el viaje de ida
if(via.tipo==true){
    const doc = document.querySelector('.vuelos');

    ///creamos el div que contiene los datos de la vuelta
    const l1 = document.createElement('div');
    l1.className = "vuelta";
    doc.appendChild(l1);
    //creamos el div que tendra los datos del origen de la vuelta
    const l2 = document.createElement('div');
    l2.className = "origenx";
    l1.appendChild(l2);
    //agregamos 3 div con los campos del origen, fecha y hora de salida
    const l3 = document.createElement('div');
    const l4 = document.createElement('div');
    const l5 = document.createElement('div');
    l3.id = "lugar1";
    l3.innerHTML = via.origen;
    l4.id = "fecha1b";
    l4.innerHTML = via.ffin;
    l5.id = "hora3v1";
    l5.innerHTML = datosViaje.horaLl2+":00 hs";
    l2.appendChild(l3);
    l2.appendChild(l4);
    l2.appendChild(l5);

    //agregamos la imagen correspondiente:
    const t1 = document.createElement('div');
    t1.className="simbx";
    t1.innerHTML = `<img src="./imagenes/vuelo.png">`;
    l1.appendChild(t1);

    //creamos el div que tendra los datos del origen de la vuelta
    const t2 = document.createElement('div');
    t2.className = "destinox";
    l1.appendChild(t2);

    //agregamos 3 div con los campos del destino, fecha y hora de salida
    const l6 = document.createElement('div');
    const l7 = document.createElement('div');
    const l8 = document.createElement('div');
    l6.id = "lugar2";
    l6.innerHTML = via.destino;
    l7.id = "fecha2b";
    l7.innerHTML = via.ffin;
    l8.id = "hora4v1";
    l8.innerHTML = datosViaje.horaS2+":00 hs";
    t2.appendChild(l6);
    t2.appendChild(l7);
    t2.appendChild(l8);

}

//cambiamos el simbolo de la empresa segun cual sea
const icono = document.querySelector('.simb');
switch(datosViaje.aerolinea){
    case 1:
        icono.innerHTML = '<img src="./imagenes/flyBondi.png">';
    break;
    case 2:
        icono.innerHTML = '<img src="./imagenes/aerolineas.png">';
    break;
    default:
        icono.innerHTML = '<img src="./imagenes/latamAirlines.png">';
    break;
}

//luego rellenamos los campos de los pasajeros en funcion de los datos de las personas almacenadas en el vector
rellenaCampos(personas);


//completamos los campos del precio final y del metodo de pago
const mpago = document.getElementById("mselec");
switch(metodoPago){
    case '1':
        mpago.innerHTML = "Debito";
    break;
    case '2':
        mpago.innerHTML = "Credito en 3 cuotas de $ "+ (Math.round(preciototal/3)*100);
    break;
    case '3':
        mpago.innerHTML = "Credito en 6 cuotas de $ "+ Math.round(preciototal/6);
    break;
    default:
        mpago.innerHTML = "Credito en 12 cuotas de $ "+ Math.round(preciototal/12);
    break;
}

const precioF = document.getElementById("precio");
precioF.innerHTML = "$ "+preciototal;
console.log(preciototal);


///por ultimo agregamos la funcionalidad al boton finalizar para que vuelva a la primer pagina
const btn = document.getElementById("finalizar");
btn.addEventListener("click",function(){
    document.location.href = "./index.html";
});