const cardsArray = [
    {
        name: "hotdog",
        photo: "fotos/hotdog.avif"
    },
    {
        name: "cheeseburguer",
        photo: "fotos/cheeseburguer.avif"
    },
    {
        name: "fries",
        photo: "fotos/fries.jpg"
    },
    {
        name: "icecream",
        photo: "fotos/icecream.jpg"
    },
    {
        name: "milkshake",
        photo: "fotos/milkshake.avif"
    },
    {
        name: "pizza",
        photo: "fotos/pizza.avif"
    },
    {
        name: "hotdog",
        photo: "fotos/hotdog.avif"
    },
    {
        name: "cheeseburguer",
        photo: "fotos/cheeseburguer.avif"
    },
    {
        name: "fries",
        photo: "fotos/fries.jpg"
    },
    {
        name: "icecream",
        photo: "fotos/icecream.jpg"
    },
    {
        name: "milkshake",
        photo: "fotos/milkshake.avif"
    },
    {
        name: "pizza",
        photo: "fotos/pizza.avif"
    }
];



const ahri = document.getElementById('ahri');
ahri.style.visibility = 'hidden';
cardsArray.sort(() => 0.5 - Math.random());

let grid = document.getElementById('grid');

const restartButton = document.getElementById('restart');
restartButton.style.visibility = 'hidden';
const show = document.getElementById('show');
const show2 = document.getElementById('show2');
show2.style.visibility = 'hidden';

let ganador;

let scorePlayer1 = 0;
let scorePlayer2 = 0;

pinkCards();

function pinkCards() {
for (let i = 0; i < cardsArray.length; i++) {
    imgPink = document.createElement('img');
    imgPink.setAttribute('src', 'fotos/pink.jpg');
    imgPink.setAttribute('id', i);
    grid.appendChild(imgPink);
    imgPink.addEventListener('click', flipCard);
}
}

let chosenCards = [];
let matchedCards = [];
let cardsWon = [];

function flipCard() {
show.innerHTML = '';

let ids = this.getAttribute('id');
let clickedCard = cardsArray[ids].name;

this.setAttribute('src', cardsArray[ids].photo)
chosenCards.push(clickedCard)
matchedCards.push(ids);

if (chosenCards.length == 2) {
    setTimeout(checkMatch, 700)
    const img = document.querySelectorAll('img');
}
}

let jugadorActual = 1;
let puntuacionJugador1 = 0;
let puntuacionJugador2 = 0;


function checkMatch() {
    const img = document.querySelectorAll('img');
    
    if (matchedCards[0] == matchedCards[1]) {
        show.innerHTML = 'Has pulsado la misma carta'
        img[matchedCards[0]].setAttribute('src', 'fotos/pink.jpg')
    }
    
    if (chosenCards[0] == chosenCards[1] && matchedCards[0] != matchedCards[1]) {
        show.innerHTML = 'Bingo! coinciden'
        img[matchedCards[0]].setAttribute('src', 'fotos/black.png');
        img[matchedCards[1]].setAttribute('src', 'fotos/black.png');
        img[matchedCards[0]].removeEventListener('click', flipCard);
        img[matchedCards[1]].removeEventListener('click', flipCard);
        cardsWon.push(chosenCards[0])
        cardsWon.push(chosenCards[1])
    
        if (jugadorActual == 1) {
            puntuacionJugador1++;
            document.getElementById("puntuacion-jugador-1").textContent = puntuacionJugador1;
        } else {
            puntuacionJugador2++;
            document.getElementById("puntuacion-jugador-2").textContent = puntuacionJugador2;
        }
    } else if (matchedCards[0] != matchedCards[1]) {
        if (jugadorActual == 1) {
            jugadorActual = 2;
            showNames.classList.remove("turno");
            showNames2.classList.add("turno");
        } else {
            jugadorActual = 1;
            showNames.classList.add("turno");
            showNames2.classList.remove("turno");
        }
        img[matchedCards[0]].setAttribute('src', 'fotos/pink.jpg');
        img[matchedCards[1]].setAttribute('src', 'fotos/pink.jpg');
    }
    chosenCards = [];
    matchedCards = [];
    finish();
    }
    
    
let partidas = JSON.parse(localStorage.getItem('partidas')) || [];

function finish() {
if (cardsWon.length == cardsArray.length) {
 let mensaje;
 if (player2name.style.display === "none") {
 document.getElementById("mensaje-final").style.visibility = 'visible';
 mensaje = ` ${player1name.value} has ganado`;
 scorePlayer1++;
 } else if (puntuacionJugador1 > puntuacionJugador2) {
 document.getElementById("mensaje-final").style.visibility = 'visible';
 mensaje = `${player1name.value} ha ganado`;
 scorePlayer1++;
 } else if (puntuacionJugador2 > puntuacionJugador1) {
 document.getElementById("mensaje-final").style.visibility = 'visible';
 mensaje = `${player2name.value} ha ganado`;
 scorePlayer2++;
 } else {
 document.getElementById("mensaje-final").style.visibility = 'visible';
 mensaje= "¡Es un empate! Os repartís el premio";
} document.getElementById("mensaje-final").textContent = mensaje;
show2.style.visibility = 'visible';
money();

if (scorePlayer1 > scorePlayer2) {
    ganador = player1name.value;
   } else if (scorePlayer2 > scorePlayer1) {
    ganador = player2name.value;
   } else {
    // En caso de empate
    ganador = "Empate";
   }
   localStorage.setItem('ganador', ganador); 
localStorage.setItem('ganador', ganador);

console.log(scorePlayer1);
console.log(scorePlayer2);
console.log(ganador);

let partida = {
player1Name: player1name.value,
player2Name: player2name.value,
ganador: ganador,
gameName: gameName
};
partidas.push(partida);
localStorage.setItem('partidas', JSON.stringify(partidas));
}
//comprobar si se guarda el ganador correcto
// localStorage.setItem('ganador', ganador);
// console.log('Ganador guardado en localStorage:', ganador);
}


function reload() {
    location.reload();
    }
    
    const player1name = document.getElementById('player1-name');
    const player2name = document.getElementById('player2-name');
    const showNames = document.getElementById('name1');
    const showNames2 = document.getElementById('name2');
    
    const btnStart = document.getElementById('start-game-button');
    const nameInputs = document.getElementById('name-inputs');
    
    const showingNames = () => {
        if (player1name.value === "") {
          alert("Ingresa ambos nombres antes de jugar, perr@.");
        } else {
          //mostrar los nombres del input
          showNames.innerHTML = player1name.value;
          showNames2.innerHTML = player2name.value;
          //guardar nombres
          localStorage.setItem('player1Name', player1name.value);
          localStorage.setItem('player2Name', player2name.value);
          //cabecera inputs
          nameInputs.style.display = "none";
          // tablero
          const gameBoard = document.querySelector("#container");
          gameBoard.style.visibility = "visible";
        }
      }
      
    
    btnStart.addEventListener('click', showingNames);
    let isButtonClicked = false;
    
    const gameName = 'Memoria';
    
    let isSingleMode = false;
    const singleModeButton = document.getElementById('single-player-mode-button');
    singleModeButton.addEventListener('click', startSingleMode);
    
    function startSingleMode() {
      isSingleMode = !isSingleMode;
      if (isSingleMode) {
        // Activar el modo de un solo jugador
        localStorage.setItem("gameName", gameName);
        player2name.style.display = "none";
        document.querySelector('label[for="player2-name"]').style.display = "none";
        singleModeButton.textContent = "Desactivar Modo solo";
        document.getElementById("puntuacion-jugador-2").style.display = "none";
        document.getElementById("puntuacion-jugador-1").style.display = "none";
        document.getElementById("name1").style.borderBottom='none';
        jugadorActual = 1;
      } else {
        // Desactivar el modo de un solo jugador
        player2name.style.display = "block";
        document.querySelector('label[for="player2-name"]').style.display = "block";
        singleModeButton.textContent = "Modo Solo";
        document.getElementById("puntuacion-jugador-2").style.display = "block";
        document.getElementById("puntuacion-jugador-1").style.display = "block";
      }
    }
    


    //parte del dinero
const body_ = document.querySelector('body');
let time=2;

function createFlakes() {
let flake=document.createElement('i');
let x=innerWidth * Math.random();
let size=(Math.random()*10)+5;
let velocity=(Math.random()*7)*1;

flake.style.left=x +'px';
flake.style.width=size*5+'px';
flake.style.height=size*2+'px';
flake.style.animationDuration=velocity+'s';

body_.appendChild(flake);

setTimeout(() => {
 flake.remove();
}, (velocity*1000)*1.5);
}
function money() {
setInterval(createFlakes, 350);
}