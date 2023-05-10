const startGameButton = document.getElementById("start-game-button");
const container = document.querySelector(".container");
const inputs = document.getElementById("name-inputs");

//variable que guarda el nombre
const gameName='Piedra papel tijera';


startGameButton.addEventListener("click", () => {
  const player1Name = document.getElementById("player1-name").value;
  localStorage.setItem("player1Name", player1Name);
  console.log("click");
  inputs.style.display = "none";
  container.style.visibility = "visible";
  initGame();

   //guardando el nombre del juego en el localstorage
 localStorage.setItem("gameName", gameName);

 //comprobar que se ha guardado correctamente
 const storedValue = localStorage.getItem("gameName");

console.log(storedValue, gameName); 
});

function initGame() {
  const player1Name = document.getElementById("player1-name").value;
  const player1Element = document.getElementById("player1");
  player1Element.textContent = player1Name;

  const opciones = ["piedra", "papel", "tijera"];
  const eleccionComputadora =
    opciones[Math.floor(Math.random() * opciones.length)];
  const resultado = document.getElementById("resultado");

  document.getElementById("piedra").addEventListener("click", () => {
    jugar("piedra");

    document.getElementById("piedra").disabled = true;
    document.getElementById("papel").disabled = true;
    document.getElementById("tijera").disabled = true;
  });

  document.getElementById("papel").addEventListener("click", () => {
    jugar("papel");

    document.getElementById("piedra").disabled = true;
    document.getElementById("papel").disabled = true;
    document.getElementById("tijera").disabled = true;
  });

  document.getElementById("tijera").addEventListener("click", () => {
    jugar("tijera");

    document.getElementById("piedra").disabled = true;
    document.getElementById("papel").disabled = true;
    document.getElementById("tijera").disabled = true;
  });

  document.getElementById("reiniciar").addEventListener("click", () => {
    document.getElementById("piedra").disabled = false;
document.getElementById("papel").disabled = false;
document.getElementById("tijera").disabled = false;

    document.getElementById("eleccionUsuario").src = "ppt.gif";
    document.getElementById("eleccionComputadora").src = "ppt.gif";
    resultado.textContent = "";
    document.getElementById("reiniciar").style.display = "none";
    initGame();
  });

  function jugar(eleccionUsuario) {
    document.getElementById("eleccionUsuario").src = eleccionUsuario + ".png";
    document.getElementById("eleccionComputadora").src =
      eleccionComputadora + ".png";

    if (eleccionUsuario === eleccionComputadora) {
      console.log("Empate");
      resultado.innerHTML = `Empate`;
    } else if (
      (eleccionUsuario === "piedra" && eleccionComputadora === "tijera") ||
      (eleccionUsuario === "papel" && eleccionComputadora === "piedra") ||
      (eleccionUsuario === "tijera" && eleccionComputadora === "papel")
    ) {
      console.log("Ganaste");
      resultado.innerHTML = `Ganaste`;
    } else {
      console.log("Perdiste");
      resultado.innerHTML = `Perdiste`;
    }

    if (resultado.innerHTML=='Ganaste') {
        ganador=localStorage.getItem('player1Name');
    }else if(resultado.innerHTML=='Perdiste'){
        ganador=localStorage.getItem('player2Name');

    }else{
      let empate='empate';
      ganador=localStorage.setItem('empate', empate);
      ganador=localStorage.getItem('empate');
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


    document.getElementById("reiniciar").style.display = "block";
  }
}
