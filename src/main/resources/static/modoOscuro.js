const buttonDark = document.getElementById('btnDarkMode');
const body = document.querySelector('body');
const td = document.querySelectorAll('table td');
const panel=document.querySelector('.panel');
const btnHardMode=document.querySelector('#hard-mode-button');
const nameGame=document.querySelector('.name-game');
const singlePlayerModeButton=document.getElementById('single-player-mode-button');

let contador = 0;

buttonDark.addEventListener('click', modoOscuro)

function modoOscuro() {
  if (contador == 0) {
    body.classList.add('dark');
    panel.classList.add('dark');
    buttonDark.classList.add('dark');
    btnHardMode.classList.add('dark');
    nameGame.classList.add('dark');
    singlePlayerModeButton.classList.add('dark');

    td.forEach(element => {
      element.classList.add('dark');
    });

    contador = 1;
    buttonDark.innerHTML='Modo Claro';
  } else {
    body.classList.remove('dark');
    panel.classList.remove('dark');
    buttonDark.classList.remove('dark');
    btnHardMode.classList.remove('dark');
    nameGame.classList.remove('dark');
    singlePlayerModeButton.classList.remove('dark');



    td.forEach(element => {
      element.classList.remove('dark');
    });

    contador = 0;
    buttonDark.innerHTML='Modo Oscuro';
  }
}
