var jugadorUno = document.getElementById('jugadorUno');
var jugadorDosOCPU = document.getElementById('jugadorDosOCPU');
var nombreJugadorUno = document.getElementById('nombreJugador1');
var vidasJugador = document.getElementById('vidasJugadorUno');
var vidasCPU = document.getElementById('vidasJugadorDos');
var totalJugador= document.getElementById('totalJugadorUno');
var totalCPU = document.getElementById('totalJugadorDos');
var cartaJugador = document.getElementById('cartaJugadorUno');
var cartaCPU = document.getElementById('cartaJugadorDos');
var btnStart = document.getElementById('start');
var btnReiniciar = document.getElementById('reiniciar');
var contenedorTexto = document.getElementById('contenedorTexto');
var plantarse = document.getElementById('plantarseJugadorUno');
var btnSiguienteManga=document.getElementById('siguienteManga');
var btnNombre=document.getElementById('nombres');
var partidasGanadas=document.getElementById('partidasGanadas');
var partidasPerdidas=document.getElementById('partidasPerdidas');
var contenedorCarta=document.getElementById('contenedorCartasCPU');
var contenedorCartaJugador=document.getElementById('contenedorCartasJugador');

jugadorDosOCPU.disabled=true;
totalJugador.innerHTML = 0;
totalCPU.innerHTML = 0;
var totalCPUElement = 0;
var totalJugadorElement = 0;
vidasJugador.innerHTML = 7;
var vidasCPUcount = 7;
var vidasJugadorcount = 7;
vidasCPU.innerHTML = 7;
jugadorUno.disabled = true;
btnNombre.disabled=false;
var partidasGanadasElemento=0;
var partidasPerdidasElemento=0;

var baraja = [
    { nombre: 'corazones', numero:"1", valor: 1,  }, { nombre:'corazones', numero:"2", valor: 2 }, { nombre:'corazones', numero:"3", valor: 3 }, 
    { nombre:'corazones', numero:"4", valor: 4 }, { nombre: 'corazones', numero:"5", valor: 5 }, { nombre:'corazones', numero:"6", valor: 6 }, 
    { nombre: 'corazones', numero:"7", valor: 7 }, { nombre: 'corazones', numero:"10", valor: 0.5 }, { nombre: 'corazones', numero:"j", valor: 0.5 }, 
    { nombre: 'corazones', numero:"k", valor: 0.5 }, { nombre: 'diamantes', numero:"1", valor: 1 }, { nombre: 'diamantes', numero:"2", valor: 2 }, 
    {nombre: 'diamantes', numero:"3", valor: 3 }, { nombre: 'diamantes', numero:"4", valor: 4 }, { nombre: 'diamantes', numero:"5", valor: 5 }, 
    { nombre: 'diamantes', numero:"6", valor: 6 }, { nombre: 'diamantes', numero:"7", valor: 7 }, { nombre: 'diamantes', numero:"10", valor: 0.5 }, 
    { nombre: 'diamantes', numero:"j", valor: 0.5 }, { nombre: 'diamantes', numero:"k", valor: 0.5 }, { nombre: 'picas',numero:'1', valor: 1 }, 
    { nombre: 'picas',numero:'2', valor: 2 }, { nombre: 'picas',numero:'3', valor: 3 }, {nombre: 'picas',numero:'4', valor: 4 }, 
    { nombre: 'picas',numero:'5', valor: 5 }, { nombre: 'picas',numero:'6', valor: 6 }, { nombre: 'picas',numero:'7', valor: 7 }, 
    {nombre: 'picas',numero:'10', valor: 0.5 }, {nombre: 'picas',numero:'j', valor: 0.5 }, { nombre: 'picas', numero:'k', valor: 0.5 }, 
    { nombre: 'treboles', numero:'1', valor: 1 }, { nombre: 'treboles', numero:'2', valor: 2 }, { nombre: 'treboles', numero:'3', valor: 3 }, 
    { nombre: 'treboles', numero:'4', valor: 4 }, { nombre: 'treboles', numero:'5', valor: 5 }, { nombre: 'treboles', numero:'6', valor: 6 }, 
    { nombre: 'treboles', numero:'7', valor: 7 }, { nombre: 'treboles', numero:'10', valor: 0.5 }, { nombre: 'treboles', numero:'j', valor: 0.5 }, 
    { nombre: 'treboles', numero:'k', valor: 0.5 } 
];

btnNombre.addEventListener('click', ()=>nombreJugadorUno.innerHTML=prompt('INTRODUCE TU NOMBRE'));

btnStart.addEventListener('click', () => {
    contenedorTexto.innerHTML = '¡VOY!';
    CPU();
    btnStart.disabled = true;
    btnSiguienteManga.disabled=true;
    btnNombre.disabled=true;
});

function mezclarYSacarCarta() {
    var barajaMezclada = _.shuffle(baraja);  
    var carta = barajaMezclada.pop();
    return carta;
}

function CPU() {
    function sacarCarta() {
        let carta = mezclarYSacarCarta();
        totalCPUElement += carta.valor;
        totalCPU.innerHTML = totalCPUElement;
        cartaCPUSrcElement="cartas/"+carta.nombre+"/"+carta.numero+".png";
        cartaCPU.src=cartaCPUSrcElement;
        nuevaCarta=document.createElement('img');
        nuevaCarta.src=cartaCPUSrcElement;
        nuevaCarta.classList.add('nuevaCarta');
        contenedorCarta.appendChild(nuevaCarta);
    if(totalCPUElement<=5){
        setTimeout(sacarCarta, 1000);
    }
    else{ 
        if(totalCPUElement > 5.1 && totalCPUElement <= 7.5) {
        contenedorTexto.innerHTML = 'TU TURNO, A VER SI ERES CAPAZ DE SUPERARME';
        jugadorUno.disabled = false;
    }
    if (totalCPUElement === 7.5) {
        vidasCPUcount++;
        vidasCPU.innerHTML = vidasCPUcount;
        contenedorTexto.innerHTML += ' ¡Y ME SUMO UNA VIDA POR SACAR 7.5! ';
    }else if (totalCPUElement > 7.5) {
        contenedorTexto.innerHTML = 'UPS, ME PASÉ!';
        vidasCPUcount -= 2;
        vidasCPU.innerHTML = vidasCPUcount;
        plantarse.disabled=true;
        jugadorUno.disabled=true;
        setTimeout(() => {
            btnSiguienteManga.disabled = false;
        }, 0); 
    }
}
}
sacarCarta()
}

function jugador() {
    plantarse.disabled=false;
    let carta = mezclarYSacarCarta();
    totalJugadorElement += carta.valor;
    cartaJugadorSrcElement="cartas/"+carta.nombre+"/"+carta.numero+".png";
    cartaJugador.src=cartaJugadorSrcElement;
    totalJugador.innerHTML = totalJugadorElement;
    nuevaCarta=document.createElement('img');
    nuevaCarta.src=cartaJugadorSrcElement;
    nuevaCarta.classList.add('nuevaCarta');
    contenedorCartaJugador.appendChild(nuevaCarta);

    if (totalJugadorElement === 7.5) {
        vidasJugadorcount++;
        vidasJugador.innerHTML=vidasJugadorcount;
        contenedorTexto.innerHTML += ' ¡TE SUMAS UNA VIDA POR SACAR 7.5! ';
    }
    
    if (totalJugadorElement > 7.5) {
        contenedorTexto.innerHTML = 'TE PASASTE! ME LA LLEVO!';
        vidasJugadorcount -= 2;
        vidasJugador.innerHTML = vidasJugadorcount;
        plantarse.disabled=true;
        jugadorUno.disabled=true;
        btnSiguienteManga.disabled=false;
    }
}

jugadorUno.addEventListener('click', jugador);

function actualizarMarcadores() {
    if (totalCPUElement > totalJugadorElement && totalCPUElement <= 7.5) {
        contenedorTexto.innerHTML = 'HE SACADO MÁS QUE TÚ, GANO ESTA RONDA!';
        vidasJugadorcount--;
        vidasJugador.innerHTML = vidasJugadorcount;
    } else if (totalJugadorElement > totalCPUElement && totalJugadorElement <= 7.5) {
        contenedorTexto.innerHTML = '¡HAS GANADO ESTA RONDA!';
        vidasCPUcount--;
        vidasCPU.innerHTML = vidasCPUcount;

    }else if(totalJugadorElement===totalCPUElement){
        contenedorTexto.innerHTML = '¡EMPATE, NADIE SUMA, NADIE RESTA!';

    }
}

plantarse.addEventListener('click', () => {
    actualizarMarcadores();
    comprobarSiHayGanador();
    plantarse.disabled=true;
    btnSiguienteManga.disabled=false;
});

function comprobarSiHayGanador() {
    if (vidasCPUcount <= 0) {
        contenedorTexto.innerHTML = '¡HAS GANADO LA PARTIDA! ME HE QUEDADO SIN VIDAS.';
        reiniciarJuego();
        partidasGanadasElemento+=1;
        partidasGanadas.innerHTML=partidasGanadasElemento;
    } else if (vidasJugadorcount <= 0) {
        reiniciarJuego();
        partidasPerdidasElemento+=1;
        partidasPerdidas.innerHTML=partidasPerdidasElemento;
        contenedorTexto.innerHTML = 'HE GANADO LA PARTIDA, TE HAS QUEDADO SIN VIDAS.';
    }
}

function siguienteManga() {
    totalJugador.innerHTML = 0;
    totalCPU.innerHTML = 0;
    totalCPUElement = 0;
    totalJugadorElement = 0;
    jugadorUno.disabled = true;
    btnStart.disabled = false;
    comprobarSiHayGanador();
    btnSiguienteManga.disabled=true;
    while(contenedorCarta.firstChild){
        contenedorCarta.removeChild(contenedorCarta.firstChild);
    }
    while(contenedorCartaJugador.firstChild){
        contenedorCartaJugador.removeChild(contenedorCartaJugador.firstChild);
    }
}

btnSiguienteManga.addEventListener('click', siguienteManga);

function reiniciarJuego() {
    totalJugador.innerHTML = 0;
    totalCPU.innerHTML = 0;
    totalCPUElement = 0;
    totalJugadorElement = 0;
    vidasJugador.innerHTML = 7;
    vidasCPUcount = 7;
    vidasJugadorcount = 7;
    vidasCPU.innerHTML = 7;
    siguienteManga();
}
btnReiniciar.addEventListener('click', reiniciarJuego);



