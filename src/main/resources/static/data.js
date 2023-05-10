// Recuperar el arreglo de partidas del localStorage
const partidas = JSON.parse(localStorage.getItem("partidas"));

// Crear la tabla y sus elementos
const table = document.createElement("table");
const headerRow = document.createElement("tr");
const gameNameHeader = document.createElement("th");
const player1NameHeader = document.createElement("th");
const player2NameHeader = document.createElement("th");
const winnerHeader = document.createElement("th");

gameNameHeader.textContent = "Nombre del juego";
player1NameHeader.textContent = "Jugador 1";
player2NameHeader.textContent = "Jugador 2";
winnerHeader.textContent = "Ganador";

headerRow.appendChild(gameNameHeader);
headerRow.appendChild(player1NameHeader);
headerRow.appendChild(player2NameHeader);
headerRow.appendChild(winnerHeader);

table.appendChild(headerRow);


// Recorrer el arreglo de partidas y crear una fila para cada una
for (let i = 0; i < partidas.length; i++) {
    const partida = partidas[i];
    const dataRow = document.createElement("tr");
    const gameNameCell = document.createElement("td");
    const player1NameCell = document.createElement("td");
    const player2NameCell = document.createElement("td");
    const winnerCell = document.createElement("td");
  
    gameNameCell.textContent = partida.gameName;
    player1NameCell.textContent = partida.player1Name;
    player2NameCell.textContent = partida.player2Name || "Ordenador";
    winnerCell.textContent = partida.winner || "Ordenador";
  
    dataRow.appendChild(gameNameCell);
    dataRow.appendChild(player1NameCell);
    dataRow.appendChild(player2NameCell);
    dataRow.appendChild(winnerCell);
  
    table.appendChild(dataRow);
  }
  
  // Agregar la tabla al cuerpo de la página
  document.body.appendChild(table);

