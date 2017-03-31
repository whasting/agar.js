const Cell = require('./cell');
const Camera = require('./camera');
const HumanPlayer = require('./human_player');
const Board = require('./board');
const Rectangle = require('./rectangle');
const Food = require('./food');
const ComputerPlayer = require('./computer_player');

// settings:
const FPS = 60;
const INTERVAL = 1000/FPS;
const STEP = INTERVAL/1000;

const FOOD = 750;

const WORLD = {
  height: 8000,
  width: 8000,
  boundaryW: 5000,
  boundaryH: 5000,
  board: new Board(8000, 8000)
};

const CONTROLS = {
  left: false,
  right: false,
  up: false,
  down: false,
  x: null,
  y: null
};

class Game {
  constructor(gameCtx, gameCanvas) {
    this.cells = [];
    this.food = [];

    this.gameCtx = gameCtx;
    this.gameCanvas = gameCanvas;

    this.xCenter = $(window).scrollLeft() + $(window).width() / 2;
    this.yCenter = $(window).scrollTop() + $(window).height() / 2;

    this.playerList = [];
    this.eatenFood = [];

    this.squareSize = 75;
    WORLD.board.generate(this.squareSize);

    this.player =
      new HumanPlayer(
        gameCanvas.width,
        gameCanvas.height,
        2400,
        2400
      );

    this.playerList.push(this.player);

    let startingPositions = [
      [2750, 2750],
      [4000, 4000],
      [3000, 4000],
      [4000, 3000],
      [2800, 4800],
      [],
      [],
      [],
    ];

    for (let i = 0; i < 4; i++) {
      this.playerList.push(
        new ComputerPlayer(
          gameCanvas.width,
          gameCanvas.height,
          startingPositions[i][0],
          startingPositions[i][1],
          STEP,
          WORLD,
          i + 2
        )
      );
    }

    this.camera =
      new Camera(
        0,
        0,
        gameCanvas.width,
        gameCanvas.height,
        WORLD.width,
        WORLD.height
      );

    this.camera.follow(
      this.player
    );

    this.generateFood();

    setInterval(() => this.newFood(), 750);
  }

  update() {
    let prevX = this.player.x;
    let prevY = this.player.y;

    this.player.update(STEP, WORLD.boundaryW, WORLD.boundaryH, CONTROLS);

    let food;

    this.playerList.forEach(player => {
      player.senseCells(this.playerList, this.foodStuff);
      food = player.senseFood(this.foodStuff);
      if (food) {
        this.foodStuff.splice(food[1], 1);
        player.cell.newTargetMass(food[0].mass * .75);
        this.eatenFood.push(food[0]);
      }
    });

    this.camera.update();
  }

  draw() {
    this
      .gameCtx
      .clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

    WORLD
      .board.draw(this.gameCtx, this.camera.xView, this.camera.yView);

    this.drawFood();

    let toSort = [];

    this.playerList.forEach((player, idx) => {
      toSort.push([player.cell.mass, idx]);
    });

    //returns [[mass, idx]] sorted on mass
    let drawOrder = this.quickSort(toSort);
    drawOrder.forEach(set => {
      this.playerList[set[1]]
        .draw(this.gameCtx, this.camera.xView, this.camera.yView);
    });
  }

  // [[mass, idx]]
  quickSort(array) {
    if (array.length <= 1) {
      return array;
    }

    let pivot = array[0];
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
      if (array[i][0] <= pivot[0]) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }

    return this.quickSort(left)
      .concat([pivot])
      .concat(this.quickSort(right));
  }

  drawFood() {
    this.foodStuff.forEach(piece => {
      piece.draw(this.gameCtx, this.camera.xView, this.camera.yView);
    });
  }

  generateFood() {
    let randX;
    let randY;
    this.foodCoords = [];
    this.foodStuff = [];

    for (let i = 0; i < FOOD; i++) {
      randX =
        Math.random() *
        (WORLD.boundaryW / 2 + 3) +
        WORLD.boundaryW / 2;
      randY =
        Math.random() *
        (WORLD.boundaryH / 2 + 3) +
        WORLD.boundaryH / 2;

      if (this.foodCoords.includes([randX, randY])) {
        i--;
      } else {
        this.foodCoords.push([randX, randY]);
        this.foodStuff.push(new Food(randX, randY));
      }
    }
  }

  newFood() {
    if (this.foodStuff.length < FOOD) {
      let food =
        this.eatenFood
        .splice(
          Math.floor(Math.random() * this.eatenFood.length),
          1
        )[0];

      this.foodCoords.push([food.x, food.y]);
      this.foodStuff.push(new Food(food.x, food.y));
    }
  }

  run() {
    this.update();
    this.draw();
  }

  add(obj) {
    if (obj instanceof Cell) {
      this.cells.push(obj);
    } else {
      throw "unknown object";
    }
  }

  addCell() {
    this.add(new Cell());
  }

  play() {
    setInterval(() => {
      this.run();
    }, INTERVAL);
  }
}

// TODO: dynamic resize window
// window.addEventListener("resize", () => {
//   WORLD.board.generate()
// })

window.addEventListener("keydown", (e) => {
  switch(e.keyCode) {
    case 37: // left arrow
      CONTROLS.left = true;
      break;
    case 38: // up arrow
      CONTROLS.up = true;
      break;
    case 39: // right arrow
      CONTROLS.right = true;
      break;
    case 40: // down arrow
      CONTROLS.down = true;
      break;
    }
});

window.addEventListener("keyup", (e) => {
  switch(e.keyCode) {
    case 37: // left arrow
      CONTROLS.left = false;
      break;
    case 38: // up arrow
      CONTROLS.up = false;
      break;
    case 39: // right arrow
      CONTROLS.right = false;
      break;
    case 40: // down arrow
      CONTROLS.down = false;
      break;
  }
});

window.addEventListener("mousemove", (e) => {
  CONTROLS.x = e.pageX;
  CONTROLS.y = e.pageY;
});

module.exports = Game;
