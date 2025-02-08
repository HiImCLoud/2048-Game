let board;

let score = 0;
let rows = 4;
let columns = 4;

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r + "-" + c;

      let num = board[r][c];
      updateTile(tile, num);

      document.getElementById("board").append(tile);
    }
  }
}

setGame();

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.valie = "";

  tile.classList.add("tile");

  if (num > 0) {
  }
}
