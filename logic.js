let board;

let score = 0;
let rows = 4;
let columns = 4;

function setGame() {
  board = [
    [0, 0, 0, 0],
    [2, 0, 0, 0],
    [2, 2, 4, 2],
    [4, 2, 2, 2],
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
  tile.classList.value = "";

  tile.classList.add("tile");

  if (num > 0) {
    tile.innerText = num;
  }

  if (num <= 4096) {
    tile.classList.add("x" + num);
  } else {
    tile.classList.add("x8192");
  }
}

window.onload -= function () {
  setGame();
};

function handleSlide(event) {
  if (
    ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.code)
  ) {
    if (event.code === "ArrowLeft") {
      slideLeft();
    } else if (event.code === "ArrowRight") {
      slideRight();
    } else if (event.code === "ArrowUp") {
      slideUp();
    } else if (event.code === "ArrowDown") {
      slideDown();
    }
  }
}
document.addEventListener("keydown", handleSlide);

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);

    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r + "-" + c);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r].slice();
    row.reverse();
    row = slide(row);
    row.reverse();

    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r + "-" + c);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let col = board.map((row) => row[c]);

    col = slide(col);

    for (let r = 0; r < rows; r++) {
      board[r][c] = col[r];
      let tile = document.getElementById(r + "-" + c);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let col = board.map((row) => row[c]);

    col.reverse();
    col = slide(col);
    col.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = col[r];
      let tile = document.getElementById(r + "-" + c);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function filterZero(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  row = filterZero(row);

  for (let i = 0; i < row.length; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }

  row = filterZero(row);
  while (row.length < columns) {
    row.push(0);
  }

  return row;
}
function hasEmptyTiles() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] === 0) {
        return true;
      }
    }
  }
  return false;
}

function setOne() {
  if (!hasEmptyTiles) {
    return;
  }

  let found = false;
  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] === 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r + "-" + c);
      updateTile(tile, board[r][c]);

      found = true;
    }
  }
}
