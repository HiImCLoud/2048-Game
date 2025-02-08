let board;

let score = 0;
let rows = 4;
let columns = 4;

function setGame() {
  board = [
    [0, 2, 2, 0],
    [2, 0, 0, 0],
    [0, 4, 0, 0],
    [0, 4, 0, 0],
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

  //console.log("slideLeft");
}

function slideRight() {
  console.log("slideRight");
}

function slideUp() {
  console.log("slideUp");
}

function slideDown() {
  console.log("slideDown");
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
