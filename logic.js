// board will contain the current state of the board.
let board;
let score = 0;

let rows = 4;
let columns = 4;

// we are going to contain array of arrays in board, nested array, 2d array, matrix

// function that will set the gameboard:
function setGame() {
  // How can we initalize a 4x4 game board with all tiles set to 0
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // create the game board on the HTML document

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");

      tile.id = r + "-" + c;

      let num = board[r][c];

      updateTile(tile, num);

      document.getElementById("board").append(tile);
    }
  }

  // This will set two randome tile into 2
  setOne();
  setOne();
}

// function to update appearance of a tile based on its number

function updateTile(tile, num) {
  // clear the tile:
  tile.innerText = "";

  // cleaer the classList to avoid multiple classes
  tile.classList.value = "";

  tile.classList.add("tile");

  if (num > 0) {
    tile.innerText = num;

    if (num <= 4096) {
      tile.classList.add("x" + num);
    } else {
      tile.classList.add("x8192");
    }
  }
}

// event that triggers when the web page finishes loading. Its like saying "wait until everythin on the page is ready"
window.onload = function () {
  setGame();
};

// function that handle the user's keyboard input when they press certain arrow keys.
function handleSlide(event) {
  // console.log(event.code);
  event.preventDefault();

  if (
    ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.code)
  ) {
    // If statement that will be bsed on which arrow key was pressed.
    if (event.code == "ArrowLeft") {
      slideLeft();
      setOne();
    } else if (event.code == "ArrowRight") {
      slideRight();
      setOne();
    } else if (event.code == "ArrowUp") {
      slideUp();
      setOne();
    } else if (event.code == "ArrowDown") {
      slideDown();
      setOne();
    }
  }
}

// EventListener
document.addEventListener("keydown", handleSlide);

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    // current array from the row
    let row = board[r]; //[0, 2, 2, 8] => [4, 8, 0, 0] / [16, 0, 0, 0]

    //[2, 0, 2, 4] => [4, 4, 0, 0]
    row = slide(row);

    // updating the current state of the board.
    board[r] = row;

    // add for loop that will change the tiles.
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r + "-" + c);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    // [4, 2, 2, 0] => [0, 0, 4, 4]
    let row = board[r];

    //[0, 2, 2, 4]
    row = row.reverse();

    // [4, 4, 0, 0]
    row = slide(row);

    //[0, 0, 4, 4]
    row = row.reverse();

    board[r] = row;

    // Update the tiles
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r + "-" + c);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    // the elements of the col from the current iteration?
    let col = board.map((row) => row[c]);

    col = slide(col);

    // update the id of the title
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

    col = col.reverse();

    col = slide(col);

    col = col.reverse();

    // update the id of the title
    for (let r = 0; r < rows; r++) {
      board[r][c] = col[r];

      let tile = document.getElementById(r + "-" + c);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function filterZero(row) {
  // this filter will remove the zero element from our array
  return row.filter((num) => num != 0);
}

function slide(row) {
  //[2, 0, 2, 4] => [4, 4, 0, 0]
  // getting rid of the zeros
  row = filterZero(row);
  // [2, 2, 4] => [4, 0, 4];

  // [2, 2, 4]
  //this for loop will check if there 2 adjacent numbers that are equal and will combine then and change the value of the second number to 0.
  for (let i = 0; i < row.length; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }
  //[4, 0, 4] => [4, 4] => [4, 4, 0, 0]

  // [4,4]
  row = filterZero(row);

  // [4,4]
  // add zeroes back
  while (row.length < columns) {
    row.push(0);
  }

  // 4,4,0,0

  return row;
}

// Create a function that will check if there is an empty or none in the board.
// Return boolean.
function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }

  return false;
}

// Create a function called setOne()
// It will randomly create/add tile in the board
function setOne() {
  // early exit if there is no available slot for the tile:
  if (!hasEmptyTile()) {
    return;
  }

  // found variable will if we are able to find a slot or position or cordinate for the tile that will be added
  let found = false;

  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r + "-" + c);
      updateTile(tile, board[r][c]);

      found = true;
    }
  }

  console.log(board);
}
