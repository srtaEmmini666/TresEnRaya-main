//board
let blockSize=50;//el tamanio de cada bloque
let rows=20;
let cols=20;
let board;
var context;//es lo que usaremos para dibujar. 


//snake
let snakeX=blockSize*5;
let snakeY=blockSize*5;
let snakeBody=[1];//creamos un array que ser'a el cuerpo de la serpiente
//he aniadido uno al array para que la serpiente empiece a crecer a partir de la primera comida que come
snakeBody.push([snakeX - blockSize, snakeY]); //añadir un bloque más a la serpiente verde para que no empiece jugando en desventaja

//food
let foodX;
let foodY;

//speed
let Xvelocity=0;
let Yvelocity=0;
//finish game
let gameOver=false;

// score snake 1
let score1=0;

//score snake 2
let score2=0;

let showScore1= document.getElementById('score1');
let showScore2 = document.getElementById('score2');

let ganador;

const etiqueta=document.getElementById("etiqueta");


// ///////////////
// snake 2
let snake2X = blockSize * 5;
let snake2Y = blockSize * 5;
let snake2Body = [1];
let X2velocity = 0;
let Y2velocity = 0;

let isHardMode = false;
const hardModeButton = document.getElementById("hard-mode-button");

const buttonPhotos=document.querySelectorAll('#board-container img');
console.log(buttonPhotos);

//guardar nombre de juego
const gameName = 'Serpientita'



//esto es lo equivalente a la funci'on draw en p5js
window.onload=function () {//hace que la funci'on ya empiece ejecut'andose al cargar la p'agina
    board=document.getElementById('board');//el lienzo
    board.height=rows*blockSize;//el alto ser'a el numero de filas por el tamanio de bloques
    board.width=cols*blockSize;//lo mismo para el ancho
    context=board.getContext('2d')//se usa para dibujar sobre el lienzo, el board
    placeFood();
    //update();//prepara el juego para c'omo debe iniciar
    document.addEventListener('keyup', direction);//al pulsar una tecla llamamos a la funcion
    setInterval(update, 1000/10);//esto es para que la funci'on se pinte infinitamente, como el draw en p5js a cada 100milisegundos

    //modo dif'icil
    hardModeButton.addEventListener("click", () => {
        isHardMode = !isHardMode;
        hardModeButton.textContent = isHardMode ? "Desactivar Modo Difícil" : "Modo Difícil";
        if (isHardMode) {
        console.log('se ha activado el modo difícil')
        setInterval(update, 600/10);
        } else {
            console.log('se ha desactivado el modo difícil')
            setInterval(update, 1000/10);
        }
      });

    // Mostrar el tablero del juego
    const gameBoard = document.querySelector("canvas");
    gameBoard.style.visibility = "hidden";


}

let partidaGuardada=false;

function update() {
  //prepara el juego para c'omo debe iniciar, esta es literalmente como la funci'on update de p5js

  if (gameOver) {
    return;
  }
  //dibujando el board, tablero
  context.fillStyle = "darkblue"; //color
  context.fillRect(0, 0, board.width, board.height); //el punto 0,0 es la posici'on, luego ponemos el ancho y el alto del lienzo, del board
  //dibujando comida
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);
  //dibujando snake
  context.fillStyle = "lime";
  context.fillRect(snakeX, snakeY, blockSize, blockSize); //estos dos ultimos son el alto y el ancho del cuadrado, mientras que los dos primeros son las cordenadas, por lo que indican la posici'on del cuadrado
  for (let i = 0; i < snakeBody.length; i++) {
    //recorremos el cuerpo invisible de la serpiente y lo pintamos
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
  //condicines para perder
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    //si choca con las paredes
    gameOver = true;
    // alert("Game Over");
  }

  // condiciones para perder Snake 2
  if (
    snake2X < 0 ||
    snake2X > cols * blockSize ||
    snake2Y < 0 ||
    snake2Y > rows * blockSize
  ) {
    //si choca con las paredes
    gameOver = true;
    // alert("Game Over");
  }

  // pintando snake 2
  context.fillStyle = "orange";
  context.fillRect(snake2X, snake2Y, blockSize, blockSize);
  for (let i = 0; i < snake2Body.length; i++) {
    context.fillRect(snake2Body[i][0], snake2Body[i][1], blockSize, blockSize);
  }

  //     console.log(snakeY);
  // }
  //hace gameOver al chocarse en s'i misma, pero tambi'en cuando come la comida
  // for (let i = 0; i < snakeBody.length; i++) {
  //     if (snakeX==snakeBody[i][0]&&snakeY==snakeBody[i][1]) {
  //         gameOver=true;
  //         alert('Game Over, te has mordido a ti misma');
  //     }
  // }

  //movimiento
  snakeX += Xvelocity * blockSize; //le ponemos la velocidad del tamanio del cuadrado, para que as'i se mueva cuadrado por cuadrado por segundo
  snakeY += Yvelocity * blockSize; //por lo que otra forma de aumentar la velocidad ser'ia disminuyendo el n'umero por el que se divien los 1000 en la funci'on setInterval

  //hacer que la serpiente coma la comida
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]); //le decimos que al comer, introduzca en el array el cuadrado food, esto crecer'a a la serpiente donde est'e la comida
    score1++;
    showScore1.innerHTML = score1;
    placeFood();
  }
  //hacer que el cuerpo crecido siga a la serpiente
  for (let i = snakeBody.length - 1; i > 0; i--) {
    //le decimos que empiece a moverse por la cola(la 'ultima posici'on) antes de mover las siguientes partes del cuerpo,para que as'i la cola alcance a la cabeza
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  // manejar el cuerpo de la snake 2
  for (let i = snake2Body.length - 1; i > 0; i--) {
    //le decimos que empiece a moverse por la cola(la 'ultima posici'on) antes de mover las siguientes partes del cuerpo,para que as'i la cola alcance a la cabeza
    snake2Body[i] = snake2Body[i - 1];
  }
  if (snake2Body.length) {
    snake2Body[0] = [snake2X, snake2Y];
  }

  // mover snake 2
  snake2X += X2velocity * blockSize;
  snake2Y += Y2velocity * blockSize;
  // ...
  // snake 2 come la comida
  if (snake2X == foodX && snake2Y == foodY) {
    snake2Body.push([foodX, foodY]);
    score2++;
    showScore2.innerHTML = score2;
    placeFood();
  }
//comprobar ganador
if (gameOver && !partidaGuardada) {
    if (score1 > score2) {
        ganador = player1name.value;
    } else if (score2 > score1) {
        ganador = player2name.value;
    } else {
        ganador = "Empate";
    }
    // alert(`Juego terminado. Ganador: ${ganador}`);
    //guardar el nombre del ganador en el localstorage
    localStorage.setItem("ganador", ganador);
    // alert(`Juego terminado. Ganador: ${ganador}`);
    etiqueta.style.visibility='visible';
    etiqueta.innerHTML=`Fin de juego, el ganador es ${ganador}`

    //creando bot'on 
    const button = document.createElement('button');
    const buttonReload = document.createElement('button');
    button.textContent = 'Restart';
    buttonReload.textContent = 'Salir';
    const container = document.getElementById('etiqueta');
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'row';
    buttonContainer.appendChild(button);
    buttonContainer.appendChild(buttonReload);
    container.appendChild(buttonContainer);
    

button.addEventListener('click', ()=>{resetGame(); etiqueta.style.visibility='hidden'})
buttonReload.addEventListener('click', ()=>{location.reload()})

//  setTimeout(() => {
//   etiqueta.style.visibility='hidden';
//   // Crear button

//   // resetGame(); //reinicia el tablero
//  }, 3000);

    //comprobar que se ha guargado
    let lastWinner = localStorage.getItem("ganador");
    console.log(`Último ganador: ${lastWinner}`);

    // Guardar información de la partida
    let partidas = JSON.parse(localStorage.getItem("partidas")) || [];
    let partida = {
        gameName: gameName,
        player1Name: player1name.value,
        player2Name: player2name.value,
        winner: ganador
    };
    partidas.push(partida);
    localStorage.setItem("partidas", JSON.stringify(partidas));

    partidaGuardada = true;
}
}





function resetGame() {
  // Reiniciar las variables del juego
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;
  snakeBody = [1];
  snakeBody.push([snakeX - blockSize, snakeY]);
  foodX = undefined;
  foodY = undefined;
  Xvelocity = 0;
  Yvelocity = 0;
  gameOver = false;
  score1 = 0;
  score2 = 0;
  showScore1.innerHTML = score1;
  showScore2.innerHTML = score2;
  ganador = undefined;
  
  // Reiniciar las variables de la serpiente 2
  snake2X = blockSize * 5;
  snake2Y = blockSize * 5;
  snake2Body = [1];
  X2velocity = 0;
  Y2velocity = 0;

  // Colocar la comida en una nueva posición
  placeFood();

  // Reiniciar la variable partidaGuardada(sino no muestra el mensaje en la segunda partida)
  partidaGuardada = false;
}




const btnStart = document.getElementById('start-game-button');
console.log(btnStart); // Verificar si el elemento existe

const nameInputs =document.getElementById('name-inputs');

const showingNames = () => {
  if (player1name.value === "" || player2name.value === "") {
    alert("Ingresa ambos nombres antes de jugar, perr@.");
  } else {
    //guardar juego en el localstorage
    localStorage.setItem("gameName", gameName);
    //comprobar
    let savedGameName = localStorage.getItem("gameName");
    console.log(`Nombre del juego guardado: ${savedGameName}`);

    showNames.innerHTML = player1name.value;
    showNames2.innerHTML = player2name.value;
    console.log(player1name.value + "," + player2name.value);

    // Ocultar los campos de entrada de texto
    nameInputs.style.display = "none";

    // Mostrar el tablero del juego
    const gameBoard = document.querySelector("canvas");
    gameBoard.style.visibility = "visible";

    for (let i = 0; i < buttonPhotos.length; i++) {
      buttonPhotos[i].style.visibility = "visible";
    }
  }
}


btnStart.addEventListener('click', showingNames);
let isButtonClicked=false;



function direction(e) {//hacer que la serpiente no pueda ir en marcha atr'as
    if (e.code=='ArrowUp' && Yvelocity!=1) {//si pulsas 'arriba' y la direcci'on no est'a siendo hacia 'abajo'
        Xvelocity=0;
        Yvelocity=-1;
    }else if(e.code=='ArrowDown'&& Yvelocity!=-1){//si pulsas 'abajo' y ahora mismo la direcci'on no est'a siendo hacia 'arriba'
        Xvelocity=0;
        Yvelocity=1;
    }else if(e.code=='ArrowLeft' && Xvelocity!=1){//si pulsas 'izq' y la direcci'on no est'a siendo hacia la 'derecha'
        Xvelocity=-1;
        Yvelocity=0;
    }else if(e.code=='ArrowRight' && Xvelocity!=-1){//si pulsas 'derecha' y la direcci'on no est'a siendo hacia la 'izq' entonces puedes ir a la derecha
        Xvelocity=1;
        Yvelocity=0;
    }


    // move snake 2
if (nameInputs.style.display=='none') { //este condicional es para evitar que al escribir el nombre(si contiene alguna de las letras) la serpiente se mueva
    if (e.code == 'KeyW' && Y2velocity != 1) {
        X2velocity = 0;
        Y2velocity = -1;
    } else if (e.code == 'KeyS' && Y2velocity != -1) {
        X2velocity = 0;
        Y2velocity = 1;
    } else if (e.code == 'KeyA' && X2velocity != 1) {
        X2velocity = -1;
        Y2velocity = 0;
    } else if (e.code == 'KeyD' && X2velocity != -1) {
        X2velocity = 1;
        Y2velocity = 0;
    }
}


}

//crear una posici'on aleatorioa para la comida
function placeFood() {
    foodX=Math.floor(Math.random()*cols)*blockSize;
    foodY=Math.floor(Math.random()*rows)*blockSize;

}

// manejar los inputs
// const player1name= document.getElementById('player1-name');
// const player2name= document.getElementById('player2-name');
// const showNames = document.getElementById('name1');
// const showNames2 = document.getElementById('name2');
// const btnStart = document.getElementById('start-game-button');

const player1name= document.getElementById('player1-name');
console.log(player1name); // Verificar si el elemento existe

const player2name= document.getElementById('player2-name');
console.log(player2name); 

const showNames = document.getElementById('name1');
console.log(showNames); 

const showNames2 = document.getElementById('name2');
console.log(showNames2); 


////////////////////////////////////////////////////////////









