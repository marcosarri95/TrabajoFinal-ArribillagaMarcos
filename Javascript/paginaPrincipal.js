///clase viaje
class Viaje{
    constructor(origen, destino, cantidad, fini, ffin, clase, tipo){
        this.origen=origen; //lugar de destino
        this.destino=destino; //lugar de destino
        this.cantidad = cantidad; //cantidad de pasajes a comprar
        this.fini = fini; //fecha de salida
        this.ffin = ffin; //fecha de vuelta en el caso de que sea ida y vuelta
        this.clase = clase; //valor para determinar la clase en la que el usuario viajara(1-turista, 2-Bussines, 3-Primera Clase)
        this.tipo = tipo; //valor booleano para saber si es un viaje solo de ida(false), o si es ida y vuelta (true)
    }

}

//creamos el objeto viaje, y generamos un valor de dolar turista, para luego almacenarlos en el localStorage y poder utilizarlos en la proxima pagina
function creaViaje(origen, destino, cantidad, clase, fini, ffin, tipo){
    const viaje = new Viaje(origen,destino,cantidad,fini,ffin,clase, tipo);
    const dolar=valordolar();
    localStorage.setItem('dolarTurista', dolar);
    enJSON = JSON.stringify(viaje);
    localStorage.setItem("viaje", enJSON);
    //luego de esto pasamos a la siguiente pagina donde compraremos el vuelo segun su precio
    document.location.href = "./compraPasajes.html";
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
        pfechaf.value = "yyyy-MM-dd";
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
        pfechaf.value = "yyyy-MM-dd";
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

//funcion para enviar el mensaje de error con la libreria SweetAlert
function mensajeError(palabra){
    swal({
        title: "Ha ocurrido un error!",
        text: `${palabra}`,
        icon: "error",
        button: "Aceptar",
      });
}


//funcion para rellenar los select luego de obtener los datos de las ciudades de la API Georef
function obtenerLocalidades(arrib){
    
    //rellenamos el input con las ciudades de vuelo
const menu1 = document.getElementById("origen");
for (let i = 0; i < arrib.length; i++) {
    const option = document.createElement('option');
    option.value = arrib[i];
    option.text = arrib[i];
    menu1.appendChild(option);    
}

//rellenamos el input con las ciudades de vuelo
const menu2 = document.getElementById("destino");
for (let i = 0; i < arrib.length; i++) {
    const option = document.createElement('option');
    option.value = arrib[i];
    option.text = arrib[i];
    menu2.appendChild(option);    
}
}

let fin = false;
let opcion;
let pasajes;
let tipo = false;
let pago;
let key;
let cambio = false;
let origen;
let destino;
let malaEleccion = false;
let bandera = false;
let idprovincias = [];
const clases = ["Turista", "Bussines", "Primera clase"];
let arrib = [];

//funcion asincrona para alternar imagenes de promociones (de a 3 imagenes)

setInterval(() => {
    const img1 = document.getElementById("img1");
    while (img1.firstChild) {
        img1.removeChild(img1.firstChild);
      }
    const img2 = document.getElementById("img2");
    while (img2.firstChild) {
        img2.removeChild(img2.firstChild);
      }
    const img3 = document.getElementById("img3");
    while (img3.firstChild) {
        img3.removeChild(img3.firstChild);
      }
         if(cambio==false){
            img1.innerHTML = '<img src="./imagenes/ImgM1.png">';
            img2.innerHTML = '<img src="./imagenes/ImgM2.png">';
            img3.innerHTML = '<img src="./imagenes/ImgM3.png">';
            cambio=true;
         }
         else{
            img1.innerHTML = '<img src="./imagenes/ImgM4.png">';
            img2.innerHTML = '<img src="./imagenes/ImgM5.png">';
            img3.innerHTML = '<img src="./imagenes/ImgM6.png">';
            cambio=false;
         }
    
}, 5000)


// nos conectamos con la API Georef (una api del gobierno nacional) para obtener distintas localidades y con ello simular distintas ciudades para ofrecerle al usuario
fetch('https://apis.datos.gob.ar/georef/api/localidades?orden=nombre&aplanar=true&max=5000&exacto=true&formato=json')
    .then( (resp) => resp.json() )
    .then( (data) => {
        //console.log(data);
        data.localidades.forEach(el => {   arrib.push(el.nombre+", "+el.provincia_nombre);
        });
        //console.log(arrib);
                obtenerLocalidades(arrib);
        })
        .catch(err => console.log(err))


 // manejo del DOM para poder filtrar la ciudad que el usuario desee     
const prueba1 = document.getElementById("filtraro");
prueba1.addEventListener('input', function(){
    const lista = document.getElementById("origen");
    filtrar(lista, arrib, prueba1.value.toUpperCase());
});
prueba1.addEventListener('click',function(){
    if (prueba1.value == "Filtrar por nombre"){prueba1.value="";}
});

const prueba2 = document.getElementById("filtrard");
prueba2.addEventListener('input', function(){
    const lista = document.getElementById("destino");
    filtrar(lista, arrib, prueba2.value.toUpperCase());
});
prueba2.addEventListener('click',function(){
    if (prueba2.value == "Filtrar por nombre"){prueba2.value="";}
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
    option.value = i+1;
    option.text = clases[i];
    clase.appendChild(option);    
}

//generamos el evento para seleccionar si el tipo de viaje es de ida, o ida y vuelta
const ele1 = document.getElementById("circi");
const ele2 = document.getElementById("circiv");
 //inicializamos con un valor       
 inicializarVarios(ele1, tipo);
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

// mediante el boton verificamos que esten seleccionados o completos los campos, para luego pasar a la siguiente pagina, o mediante la libreria SweetAlert
// notificarle que campos son los que debe completar para poder seguir con la compra de los boletos.
btn = document.getElementById("buscar");
btn.addEventListener('click',function(){
    let errores="";
    let error = false;
    const origen = document.getElementById("origen");
    if(origen.value=="origen"){
        errores = errores + "Debe ingresar un lugar de salida valido.";
        error = true;
    }
    const destino = document.getElementById("destino");
    if(destino.value=="destino"){
        errores = errores + " Debe ingresar un lugar de arribo valido.";
        error = true;
    } 
    const cantp = document.getElementById("cant");
    if(cantp.value=="cant"){
        errores = errores + " Debe indicar cuantas personas viajan.";
        error = true;
    } 
    const clase = document.getElementById("clase");
    if(clase.value=="clase"){
        errores = errores + " Debe indicar la clase en la que quiere viajar.";
        error = true;
    }
    if(error==true){
        mensajeError(errores);
    }
    else{
        const fechai = document.getElementById('ini');
        const fechaf = document.getElementById('fin');
        creaViaje(origen.value,destino.value,cantp.value,clase.value,fechai.value,fechaf.value, tipo);
    }
});


// Mediante esta funcion nos aseguramos que el usuario siempre elija como minimo un vuelo de vuelta el mismo dia del de partida.
// y no que pueda elegir un vuelo de ida posterior al de vuelta.
const fechai = document.getElementById('ini');
const fechaf = document.getElementById('fin');
fechai.addEventListener('change',function(){
    if(tipo==true){
    fechaf.value = fechai.value;
    }
});