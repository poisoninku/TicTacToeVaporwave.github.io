const PLAYER_X_CLASS= 'x';
const PLAYER_O_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const turnIndicator = document.getElementById('currentTurn');
const displayPlayerOneWins = document.getElementById('player1Wins');
const displayPlayerTwoWins = document.getElementById('player2Wins');

let isPlayer_O_Turn;
let player1Wins = 0;
let player2Wins = 0;

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  isPlayer_O_Turn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(PLAYER_O_CLASS, PLAYER_X_CLASS, 'winning-cell')
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  });

  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
  winningMessageTextElement.innerText = '';
  displayCurrentTurn();
  restartButton.disabled = true;
}
function handleClick(e) {
  const cell = e.target;
  const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
      endGame(false);
  } else if (isDraw()) {
      endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
    displayCurrentTurn(); //added current turn//
  }
}
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Its a Draw!';
  } else {
    if (isPlayer_O_Turn) {
      player2Wins++;
      winningMessageTextElement.innerText = "Player O's Wins!";
    } else {
      winningMessageTextElement.innerText = `Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`
      player1Wins++;
      winningMessageTextElement.innerText = "Player x's Wins!";
    }
    displayWinCounts();
  }
  winningMessageElement.classList.add('show');
  restartButton.disabled = false; // Enable the restart button after the game ends
}
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS);
  });
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
 isPlayer_O_Turn = !isPlayer_O_Turn
}
function setBoardHoverClass() {
  board.classList.remove(PLAYER_X_CLASS)
  board.classList.remove(PLAYER_O_CLASS)
  if (isPlayer_O_Turn) {
    board.classList.add(PLAYER_O_CLASS)
  } else {
    board.classList.add(PLAYER_X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    const isWin = combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });

    if (isWin) {
      combination.forEach(index => {
        cellElements[index].classList.add('winning-cell');
      });
    }
    return isWin;
  });
}

function displayCurrentTurn() {
  if (isPlayer_O_Turn) {
    displayPlayerTwoWins.style.fontWeight = 'bold';
    displayPlayerOneWins.style.fontWeight = 'normal';
  } else {
    displayPlayerOneWins.style.fontWeight = 'bold';
    displayPlayerTwoWins.style.fontWeight = 'normal';
  }
}

function displayWinCounts() {
  displayPlayerOneWins.textContent = `Player 1 Total Wins: ${player1Wins}`;
  displayPlayerTwoWins.textContent = `Player 2 Total Wins: ${player2Wins}`;
}
