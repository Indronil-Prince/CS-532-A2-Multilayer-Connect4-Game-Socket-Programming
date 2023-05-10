const board = [[], [], [], [], [], [], []];
let currentPlayer = 1;

const cells = document.querySelectorAll("td");

function handleClick(event) {
  const cell = event.target;
  const column = Array.from(cell.parentNode.children).indexOf(cell);
  if (board[column].length >= 6) {
    return;
  }
  board[column].push(currentPlayer);
  cell.classList.add(currentPlayer === 1 ? "red" : "yellow");
  checkForWin();
  switchPlayer();
}

function checkForWin() {
  // Check for horizontal win
  for (let row = 0; row < board[0].length; row++) {
    for (let col = 0; col < board.length - 3; col++) {
      if (
        board[col][row] &&
        board[col][row] === board[col + 1][row] &&
        board[col][row] === board[col + 2][row] &&
        board[col][row] === board[col + 3][row]
      ) {
        endGame();
      }
    }
  }

  // Check for vertical win
  for (let col = 0; col < board.length; col++) {
    for (let row = 0; row < board[col].length - 3; row++) {
      if (
        board[col][row] &&
        board[col][row] === board[col][row + 1] &&
        board[col][row] === board[col][row + 2] &&
        board[col][row] === board[col][row + 3]
      ) {
        endGame();
      }
    }
  }

  // Check for diagonal win (top left to bottom right)
  for (let col = 0; col < board.length - 3; col++) {
    for (let row = 0; row < board[col].length - 3; row++) {
      if (
        board[col][row] &&
        board[col][row] === board[col + 1][row + 1] &&
        board[col][row] === board[col + 2][row + 2] &&
        board[col][row] === board[col + 3][row + 3]
      ) {
        endGame();
      }
    }
  }

  // Check for diagonal win (top right to bottom left)
  for (let col = 3; col < board.length; col++) {
    for (let row = 0; row < board[col].length - 3; row++) {
      if (
        board[col][row] &&
        board[col][row] === board[col - 1][row + 1] &&
        board[col][row] === board[col - 2][row + 2] &&
        board[col][row] === board[col - 3][row + 3]
      ) {
        endGame();
      }
    }
  }
}

function endGame() {
  cells.forEach((cell) => cell.removeEventListener("click", handleClick));
  alert('Player ${currentPlayer} has won!');
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
