var statusDisplay = document.querySelector(".game-status");
var currentPlayer = "O";
var gameActive = true;
var gameState = ["", "", "", "", "", "", "", "", ""];
var winningMessage = () => `Player ${currentPlayer} has won!`;
var drawMessage = () => `Game ended in a draw!`;
var currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

var winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "O" ? "X" : "O";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  var roundWon = false;
  for (var i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    var a = gameState[winCondition[0]];
    var b = gameState[winCondition[1]];
    var c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }
  var roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  var clickedCell = clickedCellEvent.target;
  var clickedCellIndex = parseInt(clickedCell.getAttribute("cell-index"));
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game-restart")
  .addEventListener("click", handleRestartGame);
