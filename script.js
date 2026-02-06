var jugadorUno = document.getElementById('jugadorUno');
var jugadorDosOCPU = document.getElementById('jugadorDosOCPU');
var añadirSegundoJugador = document.getElementById('añadirSegundoJugador');
var nombreJugadorUno = document.getElementById('nombreJugador1');
var nombreJugadorDosOCPU = document.getElementById('jugadorDosOCpu');
var vidasJugadorUno = document.getElementById('vidasJugadorUno');
var vidasJugadorDos = document.getElementById('vidasJugadorDos');
var totalJugadorUnoElement = document.getElementById('totalJugadorUno');
var totalJugadorDosElement = document.getElementById('totalJugadorDos');
var cartaJugadorUno = document.getElementById('cartaJugadorUno');
var cartaJugadorDos = document.getElementById('cartaJugadorDos');
var btnStart = document.getElementById('start');
var btnReiniciar = document.getElementById('reiniciar');
var isCPU = true; // Por defecto jugamos contra la CPU
var totalJugadorUno = 0;
var totalJugadorDos = 0;
var vidasJugadorUnoCount = 5;
var vidasJugadorDosCount = 5;

// Baraja de cartas
var baraja = [
    { nombre: '1 de oros', valor: 1 }, { nombre: '2 de oros', valor: 2 }, { nombre: '3 de oros', valor: 3 }, 
    { nombre: '4 de oros', valor: 4 }, { nombre: '5 de oros', valor: 5 }, { nombre: '6 de oros', valor: 6 }, 
    { nombre: '7 de oros', valor: 7 }, { nombre: '10 de oros', valor: 0.5 }, { nombre: '11 de oros', valor: 0.5 }, 
    { nombre: '12 de oros', valor: 0.5 }, { nombre: '1 de copas', valor: 1 }, { nombre: '2 de copas', valor: 2 }, 
    { nombre: '3 de copas', valor: 3 }, { nombre: '4 de copas', valor: 4 }, { nombre: '5 de copas', valor: 5 }, 
    { nombre: '6 de copas', valor: 6 }, { nombre: '7 de copas', valor: 7 }, { nombre: '10 de copas', valor: 0.5 }, 
    { nombre: '11 de copas', valor: 0.5 }, { nombre: '12 de copas', valor: 0.5 }, { nombre: '1 de espadas', valor: 1 }, 
    { nombre: '2 de espadas', valor: 2 }, { nombre: '3 de espadas', valor: 3 }, { nombre: '4 de espadas', valor: 4 }, 
    { nombre: '5 de espadas', valor: 5 }, { nombre: '6 de espadas', valor: 6 }, { nombre: '7 de espadas', valor: 7 }, 
    { nombre: '10 de espadas', valor: 0.5 }, { nombre: '11 de espadas', valor: 0.5 }, { nombre: '12 de espadas', valor: 0.5 }, 
    { nombre: '1 de bastos', valor: 1 }, { nombre: '2 de bastos', valor: 2 }, { nombre: '3 de bastos', valor: 3 }, 
    { nombre: '4 de bastos', valor: 4 }, { nombre: '5 de bastos', valor: 5 }, { nombre: '6 de bastos', valor: 6 }, 
    { nombre: '7 de bastos', valor: 7 }, { nombre: '10 de bastos', valor: 0.5 }, { nombre: '11 de bastos', valor: 0.5 }, 
    { nombre: '12 de bastos', valor: 0.5 }
];

// Función para mezclar y sacar una carta
function mezclarYSacarCarta() {
    var barajaMezclada = _.shuffle(baraja);
    var carta = barajaMezclada.pop();
    return carta;
}

// Inicialización del juego
vidasJugadorUno.innerHTML = '5';
vidasJugadorDos.innerHTML = '5';

btnStart.addEventListener('click', () => {
    totalJugadorUno = 0;
    totalJugadorDos = 0;
    totalJugadorUnoElement.innerHTML = '0';
    totalJugadorDosElement.innerHTML = '0';
    jugadorUno.disabled = false;
    jugadorDosOCPU.disabled = true;
    btnStart.disabled = true;

    // Turno de la CPU
    if (isCPU) {
        turnoCPU();
    }
});

// Turno de la CPU
function turnoCPU() {
    do {
        let carta = mezclarYSacarCarta();
        totalJugadorDos += carta.valor;
        cartaJugadorDos.innerHTML = carta.nombre;
        totalJugadorDosElement.innerHTML = totalJugadorDos.toFixed(1);
    } while (totalJugadorDos < 5.1);
    
    // Verificar si la CPU se pasa
    if (totalJugadorDos > 7.5) {
        alert('La CPU se ha pasado con un total de ' + totalJugadorDos + '. ¡Gana Jugador Uno!');
        vidasJugadorUnoCount++; // Jugador Uno gana una vida
        vidasJugadorDosCount -= 2; // CPU pierde dos vidas
        reiniciar();
    } else {
        jugadorUno.disabled = false; // Permitir que el jugador tire después de la CPU
    }
}

// Turno del Jugador Uno
jugadorUno.addEventListener('click', () => {
    let carta = mezclarYSacarCarta();
    totalJugadorUno += carta.valor;
    cartaJugadorUno.innerHTML = carta.nombre;
    totalJugadorUnoElement.innerHTML = totalJugadorUno.toFixed(1);

    // Verificar si el Jugador Uno se pasa
    if (totalJugadorUno > 7.5) {
        alert('Jugador Uno se ha pasado con un total de ' + totalJugadorUno + '. ¡Gana CPU!');
        vidasJugadorUnoCount -= 2; // Jugador Uno pierde dos vidas
        vidasJugadorDosCount++; // CPU gana una vida
        reiniciar();
    }
});

// Plantarse del Jugador Uno
document.getElementById('plantarseJugadorUno').addEventListener('click', () => {
    jugadorUno.disabled = true; // El jugador no puede seguir jugando

    // Compara los totales después del turno del jugador
    compararResultados();
});

// Comparar resultados entre Jugador Uno y CPU
function compararResultados() {
    if (totalJugadorUno === totalJugadorDos) {
        alert('Empate, nadie gana ni pierde. ¡Pasemos a la siguiente ronda!');
    } else if (totalJugadorUno > totalJugadorDos && totalJugadorUno <= 7.5) {
        alert('¡Jugador Uno es el ganador con un total de ' + totalJugadorUno + '!');
        // No se gana vida en este caso
        vidasJugadorDosCount--; // CPU pierde una vida
    } else if (totalJugadorDos > totalJugadorUno && totalJugadorDos <= 7.5) {
        alert('¡CPU es el ganador con un total de ' + totalJugadorDos + '!');
        vidasJugadorUnoCount--; // Jugador Uno pierde una vida
        // No se gana vida en este caso
    } else {
        alert('Nadie puede ganar porque ambos se han pasado de 7.5.');
    }

    // Actualiza las vidas mostradas en la interfaz
    vidasJugadorUno.innerHTML = vidasJugadorUnoCount;
    vidasJugadorDos.innerHTML = vidasJugadorDosCount;

    // Verifica si algún jugador ha perdido todas sus vidas
    if (vidasJugadorUnoCount <= 0) {
        alert('¡Jugador Uno ha perdido todas sus vidas! Fin del juego.');
        reiniciarJuego();
    } else if (vidasJugadorDosCount <= 0) {
        alert('¡CPU ha perdido todas sus vidas! Fin del juego.');
        reiniciarJuego();
    } else {
        reiniciar();
    }
}

// Reinicia la partida para la siguiente manga
function reiniciar() {
    totalJugadorUno = 0;
    totalJugadorDos = 0;
    cartaJugadorUno.innerHTML = '#';
    cartaJugadorDos.innerHTML = '#';
    totalJugadorUnoElement.innerHTML = '0';
    totalJugadorDosElement.innerHTML = '0';
    jugadorUno.disabled = true;
    jugadorDosOCPU.disabled = true;
    btnStart.disabled = false;
}

// Reinicia el juego por completo
function reiniciarJuego() {
    vidasJugadorUnoCount = 5;
    vidasJugadorDosCount = 5;
    vidasJugadorUno.innerHTML = '5';
    vidasJugadorDos.innerHTML = '5';
    reiniciar();
}

btnReiniciar.addEventListener('click', reiniciarJuego);