class Cliente{
    constructor(nombre, apellido, DNI, fnac ,nacionalidad){
        this.nombre = nombre;
        this.apellido = apellido;
        this.DNI = DNI;
        this.fnac = fnac;
        this.nacionalidad = nacionalidad;
    }
    
}

//Objeto para almacenar los datos de contacto
function DatosContacto (email, telefono){
    this.email = email; //email de contacto;
    this.telefono = telefono; //telefono de contacto;
    }

//Objeto para almacenar los datos de la tarjeta
function Tarjeta(nTarjeta, NTitular, fVenc, codSeg){
            this.nTarjeta = nTarjeta;
            this.fVenc = fVenc;
            this.NTitular = NTitular;
            this.codSeg = codSeg;
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

//funcion para anexar formularios para que la cantidad de pasajes comprados puedan llenar sus datos,
function rellenaCampos(cantidad){
    for(let i=0;i<cantidad;i++){
        const formularioP = document.querySelector('.tpersonas');
        ///creamos el primer div que encerrara todo el formulario
        const p1 = document.createElement('div');
        p1.className = "fpersonas";
        formularioP.appendChild(p1);
        ///le asignamos un nombre de clase y lo agregamos a clase tpersonas que englobara los multiples formularios
        /// creamos el primer contenedor que tendra lainformacion correspondiente al nombre
        const p2 = document.createElement('div');
        p2.className = "nombres";
        const p3 = document.createElement('div');
        p3.className = "tituloC";
        p3.innerHTML = "Nombres";
        const p4 = document.createElement('input');
        p4.id = "nombre"+(i+1);
        p4.type = "text";
        p4.maxlength = "30";
        p4.minlength = "3"
        p2.appendChild(p3);
        p2.appendChild(p4);
        p1.appendChild(p2);
        ///los asignamos como hijos del formulario principal
        /// creamos el primer contenedor que tendra lainformacion correspondiente al apellido
        const p5 = document.createElement('div');
        p5.className = "apellidos";
        const p6 = document.createElement('div');
        p6.className = "tituloC";
        p6.innerHTML = "Apellidos";
        const p7 = document.createElement('input');
        p7.id = "apellido"+(i+1);
        p7.type = "text";
        p7.maxlength = "30";
        p7.minlength = "3"
        p5.appendChild(p6);
        p5.appendChild(p7);
        p1.appendChild(p5);
        ///los asignamos como hijos del formulario principal
        /// creamos el primer contenedor que tendra lainformacion correspondiente al pais de residencia
        const p8 = document.createElement('div');
        p8.className = "paiss";
        const p9 = document.createElement('div');
        p9.className = "tituloC";
        p9.innerHTML = "Pais de residencia:";
        const p10 = document.createElement('input');
        p10.id = "pais"+(i+1);
        p10.type = "text";
        p10.maxlength = "30";
        p10.minlength = "3"
        p8.appendChild(p9);
        p8.appendChild(p10);
        p1.appendChild(p8);
        ///los asignamos como hijos del formulario principal
        /// creamos el primer contenedor que tendra lainformacion correspondiente al DNI
        const p11 = document.createElement('div');
        p11.className = "doc";
        const p12 = document.createElement('div');
        p12.className = "tituloC";
        p12.innerHTML = "DNI:";
        const p13 = document.createElement('input');
        p13.id = "dni"+(i+1);
        p13.type = "number";
        p13.max = "99999999";
        p13.min = "500000"
        p11.appendChild(p12);
        p11.appendChild(p13);
        p1.appendChild(p11);
        ///los asignamos como hijos del formulario principal
        /// creamos el primer contenedor que tendra lainformacion correspondiente a la fecha de nacimiento
        const p14 = document.createElement('div');
        p14.className = "fnaci";
        const p15 = document.createElement('div');
        p15.className = "tituloC";
        p15.innerHTML = "Fecha de nacimiento:";
        const p16 = document.createElement('input');
        p16.id = "fnac"+(i+1);
        p16.type = "date";
        p16.min = "1900-01-01"
        p14.appendChild(p15);
        p14.appendChild(p16);
        p1.appendChild(p14);
        ///los asignamos como hijos del formulario principal
        }
}


//funcion para determinar si el usuario relleno correctamente los campos con sus/los datos personales y lo almacena en el local storage
function evaluaCamposNombre(cantidad){
    let cont = 0;
    let personas=[];
    for(let i=1;i<=cantidad;i++){
        const nombre = document.getElementById("nombre"+i);
        const apellido = document.getElementById("apellido"+i);
        const pais = document.getElementById("pais"+i);
        const dni = document.getElementById("dni"+i);
        const fnac = document.getElementById("fnac"+i);
        const cliente = new Cliente(nombre.value.trim().toUpperCase(),apellido.value.trim().toUpperCase(),dni.value,fnac.value,pais.value.trim().toUpperCase());
        personas.push(cliente);
    }
    personas.forEach(el => {
        if((el.nombre.trim()!="")&&(el.apellido.trim()!="")&&(el.DNI!="")&&(el.fnac!="")&&(el.nacionalidad.trim()!="")){
            cont++; // si el formulario cumple lo debido, incrementara el contador
        }
    });


if(cont==cantidad){
    enJSON = JSON.stringify(personas);
        localStorage.setItem("personas", enJSON);
return true; //si el contador es menor a la cantidad de personas, quiere decir que se rellenaron de forma correcta todos los campos
}
else{
    return false; //
}

    
}

//funcion para determinar si se eligio correctamente un medio de pago valido y lo almacena en el local storage
function evaluaCamposMedioPago(){
    const selec = document.getElementById("opcompra");
    const metodoPago = selec.value;
    if(selec.value!='0'){
        localStorage.setItem('metodoPago', metodoPago);
        return true;
    }
}



//funcion para determinar si el usuario ingreso los campos de mail y de correo y los guarda en el local storage
function evaluaCamposCorreo(){
    const mail = document.getElementById("mail");
    const telefono = document.getElementById("telef");
    if((mail.value.trim()!="")&&(telefono.value.trim()!="")){
        const datoContacto = new DatosContacto(mail.value.trim().toLowerCase(), telefono.value)
        enJSON = JSON.stringify(datoContacto);
        localStorage.setItem("DatosContacto", enJSON);
        return true;
    }
    else{
        return false;
    }
    
}

//funcion para determinar si el usuario ingreso los campos de la tarjeta y los guarda en el local storage
function evaluaCamposTarjeta(){
    const nroTarjeta = document.getElementById("ntarj");
    const nTitular = document.getElementById("ntitular");
    const fVenc = document.getElementById("fvenc");
    const cSeg = document.getElementById("csegu");

    if((nroTarjeta.value!="")&&(nTitular.value.trim()!="")&&(fVenc.value.trim()!="")&&(cSeg.value.trim()!="")){
        const nTarjeta = new Tarjeta(nroTarjeta.value, nTitular.value.trim().toUpperCase(), fVenc.value, cSeg.value)
        enJSON = JSON.stringify(nTarjeta);
        localStorage.setItem("tarjetaPago", enJSON);
        return true;
    }
    else{return false;}

}

const via = JSON.parse(localStorage.getItem('viaje')); //recuperamos el objeto viaje del local storage
const datosViaje = JSON.parse(localStorage.getItem('DatosViaje')); //recuperamos el objeto datos del viaje del local storage
const interes = Math.round((Math.random()*10 + 15)*100)/100; //Genera un interes aleaotorio entre 10 y 25, con 2 decimales


rellenaCampos(via.cantidad); //llamamos la funcion para que pueda rellenar los campos;

///rellenamos los campos para que el usuario pueda elegir como pagar
const tipoPago = ["Debito sin interes","3 cuotas","6 cuotas","12 cuotas"];
const selec = document.getElementById("opcompra");
for (let j = 0; j < tipoPago.length ; j++) {
    const option = document.createElement('option');
    option.value = j+1;
    option.text = tipoPago[j];
    selec.appendChild(option);    
}
//le mostramos el costo del viaje
let precioF = document.getElementById("precioF");
precioF.innerHTML = "Costo viaje $ "+datosViaje.precioF;    




//evento para cambiar el valor de las cuotas en funcion de la eleccion del usuario
let preciototal;
selec.addEventListener('change', function(){
    const cuota = document.getElementById("cuotaF");
    switch(selec.value){
        case '0':
            cuota.innerHTML = "Seleccione una opcion correcta de pago";
        break;
        case '1':
             preciototal = datosViaje.precioF;
             localStorage.setItem("preciofinal", preciototal);
            cuota.innerHTML = "";
        break;
        case '2':
            preciototal = Math.round(datosViaje.precioF*(1+(interes/100)));
            cuota.innerHTML = "3 cuotas de $"+ Math.round(preciototal/3);
            precioF.innerHTML = "Costo viaje $ "+preciototal;
            localStorage.setItem("preciofinal", preciototal);
        break;
        case '3':
            preciototal = Math.round(datosViaje.precioF*(1+(interes/100)));
            cuota.innerHTML = "6 cuotas de $"+ Math.round(preciototal/6);
            precioF.innerHTML = "Costo viaje $ "+preciototal;
            localStorage.setItem("preciofinal", preciototal);
        break;
        default:
            preciototal = Math.round(datosViaje.precioF*(1+(interes/100)));
                cuota.innerHTML = "12 cuotas de $"+ Math.round(preciototal/12);
                precioF.innerHTML = "Costo viaje $ "+preciototal;
                localStorage.setItem("preciofinal", preciototal);
        break;
    }
    
});

const btn = document.getElementById("comprar");
btn.addEventListener('click', function(){
    let respuesta="";
    let enviarMensaje = false;
    const ok1 = evaluaCamposNombre(via.cantidad);
    if(ok1==false){
        respuesta+="Verifique que todos los campos de los datos personales estan completos. "
        enviarMensaje = true;
    }
    const ok2 = evaluaCamposCorreo();
    if(ok2==false){
        respuesta+="Verifique que todos los campos de contacto estan completos. "
        enviarMensaje = true;
    }
    const ok3 = evaluaCamposTarjeta();
    if(ok3==false){
        respuesta+="Verifique que todos los campos de la tarejeta estan completos. "
        enviarMensaje = true;
    }
    const ok4 = evaluaCamposMedioPago();
    if(ok4==false){
        respuesta+="Verifique que selecciono una forma de pago. "
        enviarMensaje = true;
    }
    if(enviarMensaje==true){mensajeError(respuesta)}
    else{
        document.location.href = "./finalizarCompra.html";
        
    }

});