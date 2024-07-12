document.addEventListener("DOMContentLoaded", function () {
  var Image = localStorage.getItem("selectedImage");

  var mario = document.querySelector(".mario");
  mario.style.background = `url(${Image}) no-repeat`;
  mario.style.backgroundSize = `contain`;
});

var gameBoard = document.querySelector(".game-board");
var mario = document.createElement("div");
mario.classList.add("mario");
gameBoard.appendChild(mario);

var bird = document.createElement("div");
bird.classList.add("bird");
gameBoard.appendChild(bird);

var pipe = document.createElement("div");
pipe.classList.add("pipe");
gameBoard.appendChild(pipe);

var pipe2 = document.createElement("div");
pipe2.classList.add("pipe2");
gameBoard.appendChild(pipe2);

var pipe3 = document.createElement("div");
pipe3.classList.add("pipe3");
gameBoard.appendChild(pipe3);

var coin = document.createElement("div");
coin.classList.add("coin");
gameBoard.appendChild(coin);

var scoreDom = document.querySelector(".score span");
var highestScoreDom = document.querySelector(".highest-Score span");

var jumpaudio = new Audio("./img/mario_jump.mp3");
var coinAudio = new Audio("./img/5mis.m4a");
var deathaudio = new Audio("./img/out.m4a");

var grid = [];
var rows = 10;
var cols = 30;

var score = 0;
var highestScore = localStorage.getItem("highestScore") || 0;

scoreDom.textContent = score;
highestScoreDom.textContent = highestScore;

function updateScore(x = 1) {
  score += x;
  scoreDom.textContent = score;
  if (score > highestScore) {
    highestScore = score;
    localStorage.setItem("highestScore", highestScore);
  }
  highestScoreDom.textContent = highestScore;
}

function generateRow() {
  let randomNumber = Math.floor(Math.random() * 3) + 1;

  if (randomNumber === 1) {
    return 9;
  } else if (randomNumber === 2) {
    return 7;
  } else {
    return 5;
  }
}

function showGameOver() {
  var gameOverDiv = document.querySelector(".game-over");
  gameOverDiv.style.display = "block";
}

for (var i = 0; i < rows; i++) {
  var row = [];
  for (var j = 0; j < cols; j++) {
    row.push(null);
  }
  grid.push(row);
}

var marioPosition = { row: 9, col: 1 };
var pipePosition = { row: 9, col: 30 };
var pipe2Position = { row: 9, col: 20 };
var pipe3Position = { row: 8, col: 20 };
var birdPosition = { row: 5, col: 15 };
var coinPosition = { row: generateRow(), col: 30 };

grid[marioPosition.row][marioPosition.col] = "mario";
grid[pipePosition.row][pipePosition.col] = "pipe";
grid[pipe2Position.row][pipe2Position.col] = "pipe2";
grid[pipe3Position.row][pipe3Position.col] = "pipe3";
grid[birdPosition.row][birdPosition.col] = "bird";
grid[coinPosition.row][coinPosition.col] = "coin";

function render() {
  mario.style.gridColumn = marioPosition.col + 1;
  mario.style.gridRow = marioPosition.row + 1;
  pipe.style.gridColumn = pipePosition.col + 1;
  pipe.style.gridRow = pipePosition.row + 1;
  pipe2.style.gridColumn = pipe2Position.col + 1;
  pipe2.style.gridRow = pipe2Position.row + 1;
  pipe3.style.gridColumn = pipe3Position.col + 1;
  pipe3.style.gridRow = pipe3Position.row + 1;
  bird.style.gridColumn = birdPosition.col + 1;
  bird.style.gridRow = birdPosition.row + 1;
  coin.style.gridColumn = coinPosition.col + 1;
  coin.style.gridRow = coinPosition.row + 1;
}

var jumpCount = 0;

function jump() {
  if (jumpCount < 2) {
    var jumpHeight = 2;
    marioPosition.row -= jumpHeight;
    jumpaudio.play();
    render();
    jumpCount++;
    setTimeout(function () {
      marioPosition.row += jumpHeight;
      render();
      jumpCount = 0;
    }, 500);
  }
}

function startGame() {
  var myinter = setInterval(function () {
    pipePosition.col--;
    pipe2Position.col--;
    pipe3Position.col--;
    birdPosition.col--;
    coinPosition.col--;

    if (pipePosition.col < 0) {
      updateScore();
      pipePosition.col = 30;
    }

    if (pipe2Position.col < 0) {
      updateScore();
      pipe2Position.col = 30;
    }

    if (pipe3Position.col < 0) {
      pipe3Position.col = 30;
    }

    if (birdPosition.col < 0) {
      birdPosition.col = 30;
    }

    if (coinPosition.col < 0) {
      coinPosition.row = generateRow();
      coinPosition.col = 30;
    }

    if (
      coinPosition.col === marioPosition.col &&
      coinPosition.row === marioPosition.row
    ) {
      mario.style.width = "500px";
      mario.style.height = "500px";
      setTimeout(() => {
        mario.style.width = "150px";
        mario.style.height = "150px";
      }, 1000);

      coinAudio.play();
      updateScore(10);
      coin.style.display = "none";

      coinPosition = { row: generateRow(), col: cols };
      coin.style.gridColumn = coinPosition.col + 1;
      coin.style.gridRow = coinPosition.row + 1;
      coin.style.display = "block";
    }

    if (
      (pipePosition.col === marioPosition.col &&
        pipePosition.row === marioPosition.row) ||
      (pipe2Position.col === marioPosition.col &&
        pipe2Position.row <= marioPosition.row &&
        marioPosition.row <= pipe2Position.row + 2) ||
      (pipe3Position.col === marioPosition.col &&
        pipe3Position.row <= marioPosition.row &&
        marioPosition.row <= pipe3Position.row + 2) ||
      (birdPosition.col === marioPosition.col &&
        birdPosition.row === marioPosition.row)
    ) {
      showGameOver();
      deathaudio.play();
      mario.style.backgroundImage = "url(img/game-over.png)";
      clearInterval(myinter);
    }

    render();
  }, 100);
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
});

render();
startGame();
