const startGameButton = document.getElementById("start-game-button");

//almacenar nombre del juego en el localstorage
const gameName='tres en raya';

startGameButton.addEventListener("click", () => {
  const player1Name = document.getElementById("player1-name").value;
  const player2Name = document.getElementById("player2-name").value;
  if (player1Name === "" || player2Name === "") {
    alert("Ingresa ambos nombres antes de jugar, perr@");
  } else {
    localStorage.setItem("player1Name", player1Name);
    localStorage.setItem("player2Name", player2Name);
    initGame();
    //guardando el nombre del juego en el localstorage
    localStorage.setItem("gameName", gameName);

    //comprobar que se ha guardado correctamente
    const storedValue = localStorage.getItem("gameName");

    console.log(storedValue, gameName);
  }
});


// variables para el cron'ometro
let turnTimeLeft = 3;
let turnTimer = null;
let turnInterval = null;

// modo dif'icil
let isHardMode = false;

//modo solo
let isSinglePlayerMode = false;

//puntuaci'on
let scorePlayer1=0;
let scorePlayer2=0;


//ganador almacenado en el localstorage
let ganador; 

// variable para indicar si el juego ha terminado
let isGameOver = false;



// controlador de eventos para el botón modo solo
const singlePlayerModeButton_ = document.getElementById("single-player-mode-button");
singlePlayerModeButton_.addEventListener("click", () => {
 isSinglePlayerMode = !isSinglePlayerMode;
 singlePlayerModeButton_.textContent = isSinglePlayerMode ? "Desactivar Modo Solo" : "Modo Solo";

 

 // Ocultar o mostrar el segundo campo de entrada y su etiqueta
 const player2Input = document.getElementById("player2-name");
 const player2Label = document.querySelector("label[for='player2-name']");
 if (isSinglePlayerMode) {
 player2Input.style.display = "none";
 player2Label.style.display = "none";
 } else {
 player2Input.style.display = "block";
 player2Label.style.display = "block";
 }
});

//número de partidas
let num_partidas = 0;
console.log(num_partidas);
//Variable que guarda el botón pulsado de las partidas
let boton_partida;
let boton_uno = document.getElementById("una_partida");
let boton_tres = document.getElementById("tres_partidas");
let boton_cinco = document.getElementById("cinco_partidas");

boton_uno.addEventListener("click", function(){
  boton_uno.innerText
  boton_partida = boton_uno.innerText;
  console.log(boton_partida)
})
boton_tres.addEventListener("click", function(){
  boton_tres.innerText
  boton_partida = boton_tres.innerText;
  console.log(boton_partida)
})
boton_cinco.addEventListener("click", function(){
  boton_cinco.innerText
  boton_partida = boton_cinco.innerText;
  console.log(boton_partida)
})

//variable etiqueta
let winner_message = document.getElementById("etiqueta")



function initGame() {
  // controlador de eventos para el bot'on de modo difícil
  const hardModeButton = document.getElementById("hard-mode-button");
  hardModeButton.addEventListener("click", () => {
  isHardMode = !isHardMode;
  hardModeButton.textContent = isHardMode ? "Desactivar Modo Difícil" : "Modo Difícil";
  if (isHardMode) {
  // Inicializar el cronómetro del turno
  turnTimeLeft = 3;
  updateTurnTimerDisplay();
  turnTimer = setTimeout(handleTurnTimeout, 3000);
  turnInterval = setInterval(() => {
  turnTimeLeft--;
  updateTurnTimerDisplay();
  if (turnTimeLeft === 0) {
  clearInterval(turnInterval);
  }
  }, 1000);
  } else {
  // Detener el cronómetro del turno
  turnTimeLeft = 3;
  updateTurnTimerDisplay();
  clearTimeout(turnTimer);
  clearInterval(turnInterval);
  }
  });
 
  
 
 
 
  // Inicializar el temporizador del turno (cron'ometro)
  // turnTimeLeft = 3;
  // updateTurnTimerDisplay();
  // turnTimer = setTimeout(handleTurnTimeout, 5000);
  // turnInterval = setInterval(() => {
  // turnTimeLeft--;
  // updateTurnTimerDisplay();
  // if (turnTimeLeft === 0) {
  // clearInterval(turnInterval);
  // }
  // }, 1000);
 
  // Mostrar el tablero del juego
  const gameBoard = document.querySelector("table");
  gameBoard.style.display = "table";
 
  // Ocultar los campos de entrada de texto
  const nameInputs = document.getElementById("name-inputs");
  nameInputs.style.display = "none";
 
  // Mostrar los nombres de los jugadores
  const player1Name = localStorage.getItem("player1Name");
  const player2Name = localStorage.getItem("player2Name");
  const player1Element = document.getElementById("player1");
  const player2Element = document.getElementById("player2");
  player1Element.textContent = `${player1Name} (X)`;
  player2Element.textContent = `${player2Name} (O)`;
  // Agregar la clase player1-turn para mostrar la línea debajo del nombre del jugador 1
  player1Element.classList.add("player1-turn");
 
  // Inicializar el tablero y el turno actual

  turn = "X";
  cells.forEach((cell) => {
  cell.textContent = "";
  cell.classList.remove("winner");
  cell.addEventListener("click", handleCellClick);
  });
 
  // Inicializar el temporizador del turno
  turnTimer = setTimeout(handleTurnTimeout, 3000);
 
  // Reiniciar la variable isGameOver a false al iniciar un nuevo juego
  isGameOver=false;
 }
 
 function handleCellClick(event) {
  if (!isGameOver) { 
  if (event.target.textContent === "") {
  event.target.textContent = turn;
  checkWin();
  checkDraw();
  turn = turn === "X" ? "O" : "X";
 
 
 
  // add o eliminar clases para mostrar u ocultar la línea debajo del nombre del jugador
  const player1Element = document.getElementById("player1");
  const player2Element = document.getElementById("player2");
  if (turn === "X") {
  player1Element.classList.add("player1-turn");
  player2Element.classList.remove("player2-turn");
  } else {
  player1Element.classList.remove("player1-turn");
  player2Element.classList.add("player2-turn");
  }
 
  
  if (!isGameOver && isSinglePlayerMode) { 
  makeComputerMove();
  }
 
  }
  }
 
 }
 
 function makeComputerMove() {
 
  let availableCells=[];
  cells.forEach((cell,index)=>{
  if(cell.textContent===""){
  availableCells.push(index);
  }
  });
  let randomIndex=Math.floor(Math.random()*availableCells.length);
  let chosenCellIndex=availableCells[randomIndex];
 
  setTimeout(()=>{
  cells[chosenCellIndex].textContent=turn;
  checkWin();
  checkDraw();
  turn=turn==="X"?"O":"X";

  
 const player1Element=document.getElementById('player1');
 const player2Element=document.getElementById('player2');
 if(turn==="X"){
 player1Element.classList.add('player1-turn');
 player2Element.classList.remove('player2-turn');
 }else{
 player1Element.classList.remove('player1-turn');
 player2Element.classList.add('player2-turn');
 }
 },500);

}

function handleTurnTimeout() {

 if(isHardMode){
 clearTimeout(turnTimer);
 clearInterval(turnInterval);
 turnTimeLeft=3;
 updateTurnTimerDisplay();
 turnTimer=setTimeout(handleTurnTimeout,3000);
 turnInterval=setInterval(()=>{
 turnTimeLeft--;
 updateTurnTimerDisplay();
 if(turnTimeLeft===0){
 clearInterval(turnInterval);
 }
 },1000);

 
 turn=turn==="X"?"O":"X";
 }

 
 const player1Element=document.getElementById('player1');
 const player2Element=document.getElementById('player2');
 if(turn==="X"){
 player1Element.classList.add('player1-turn');
 player2Element.classList.remove('player2-turn');
 }else{
 player1Element.classList.remove('player1-turn');
 player2Element.classList.add('player2-turn');
 }
}



let turn="X";

const cells=document.querySelectorAll('td');

let winningCombination=null;


function checkWin(){
  const winCombinations=[
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
  ];
  
  for(let combination of winCombinations){
  const [a,b,c]=combination;
  if(cells[a].textContent&&cells[a].textContent===cells[b].textContent&&cells[a].textContent===cells[c].textContent){
  winningCombination=combination;
  showWinningCombination();
  return;
  }
  }
  }
  
  function showWinningCombination(){
  winningCombination.forEach((cellIndex)=>{
  cells[cellIndex].classList.add('winner');
  });
  
  const winner=cells[winningCombination[0]].textContent;
  const winnerName=winner==="X"?localStorage.getItem('player1Name'):localStorage.getItem('player2Name');
  
  if(winner==="X"){
  scorePlayer1++;
  console.log('score jugador 1: '+scorePlayer1)
  }else{
  scorePlayer2++;
  console.log('score jugador 2: '+scorePlayer2)
  }
  
  
  localStorage.setItem('scorePlayer1',scorePlayer1);
  localStorage.setItem('scorePlayer2',scorePlayer2);
  
  const storedScorePlayer1=localStorage.getItem('scorePlayer1');
  const storedScorePlayer2=localStorage.getItem('scorePlayer2');
  
  console.log(storedScorePlayer1,scorePlayer1); 
  console.log(storedScorePlayer2,scorePlayer2);
  
  
  if(scorePlayer1>scorePlayer2){
  ganador=localStorage.getItem('player1Name');
}else{
ganador=localStorage.getItem('player2Name');
}
///////////////////
localStorage.setItem('ganador',ganador);

const storedWinner=localStorage.getItem('ganador');

console.log(storedWinner,ganador); 
let partidas=JSON.parse(localStorage.getItem('partidas'))||[];

let partida={
gameName:gameName,
player1Name:localStorage.getItem('player1Name'),
player2Name:localStorage.getItem('player2Name'),
winner:ganador
};

partidas.push(partida);

localStorage.setItem('partidas',JSON.stringify(partidas));
/////////////////////////
setTimeout(()=>{
// alert(`${winnerName} ha ganado!`);
winner_message.innerHTML= "Ha ganado" + winnerName;
winner_message.style.visibility="visible";
setTimeout(() => {
winner_message.innerHTML= "" ;
winner_message.style.visibility="hidden";
}, 2000);

num_partidas ++;
console.log(num_partidas);
/*location.reload(); Hay que eliminar esta función reservada porque no queremos que se recargue la página
*/
if (num_partidas == 3 && boton_partida == "3 partidas") {
  location.reload();
} else if(num_partidas == 1 && boton_partida == "1 partida") {
 setTimeout(() => {
  location.reload(); 
 }, 2000);
}else if(num_partidas == 5 && boton_partida == "5 partidas"){
location.reload();
}
initGame()

},500);

isGameOver=true;
}





function checkDraw(){
let isDraw=true;
cells.forEach((cell)=>{
if(cell.textContent===""){
isDraw=false;
}
});

if(isDraw){
setTimeout(()=>{
alert("Empate");

// location.reload();
initGame();

},500);
isGameOver=true;
}
}

function updateTurnTimerDisplay(){
const turnTimerElement=document.getElementById('turn-timer');
turnTimerElement.textContent=`Tiempo restante: ${turnTimeLeft}`;
}