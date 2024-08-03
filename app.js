// let titulo = document.getElementById('tituloJuego');
// titulo.innerHTML = 'Juego del número secreto';

// let parrafo = document.querySelector('p');
// parrafo.innerHTML = 'Elige un número del 1 al 10';

let numeroSecreto = 0
let intentos = 0;
let listaNumerosSorteados = [];
let intentosMaximos = 10;

function verificarIntento() {
    
    let numeroUsuario = parseInt(document.getElementById('valorIntento').value);
            
    if (numeroUsuario === numeroSecreto) { 
        asignarTextosGenericos ('mensaje',  `Felicitaciones, acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}!!`);
        document.getElementById ('reiniciar').removeAttribute ('hidden');

       } else if (numeroUsuario < numeroSecreto) {
           asignarTextosGenericos ('mensaje', 'El número secreto es mayor');
       } else { 
           asignarTextosGenericos ('mensaje', 'El número secreto es menor');
        }
        intentos++;
        limpiarInput();  
    return;
}

/*
    MODO 1
function limpiarInput() {
    let caja = document.querySelector('#valorIntento');
    caja.value = '';  
}*/
//MODO 2

function limpiarInput() {
    document.querySelector('#valorIntento').value = '';
}

function asignarTextosGenericos (id,texto){
    let elementoHTML = document.getElementById (id); 
    elementoHTML.innerHTML = texto;
    return;
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*intentosMaximos)+1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Cuando ya se jugaron todos los números posibles:

    if (listaNumerosSorteados.length == intentosMaximos){
        asignarTextosGenericos ('mensaje', 'Ya se jugaron todos los números posibles. Por favor apretá F5')
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();        
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    
    asignarTextosGenericos ('mensaje', `Elige un número del 1 al ${intentosMaximos}`);     
    asignarTextosGenericos ('titulo', 'Juego del número secreto');
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    // console.log(numeroSecreto);
}


function reiniciarJuego (){
    /*
    1 . Limpiar el input
    2. Reiniciar indicaciones de juego
    3. Reiniciar cantidad de intentos
    4. Reiniciar número secreto
    5. Deshabilitar botón Nuevo Juego
    */
   //1 
   limpiarInput ();
   //2
   
   //3
   condicionesIniciales();
   //4
   
   //5
   document.querySelector('#reiniciar').setAttribute('hidden','true');  
}

condicionesIniciales();

//Evento 'Enter'
document.getElementById('valorIntento').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        verificarIntento();
    }
})