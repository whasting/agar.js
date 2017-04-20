/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const FILLS = [['#ff2033', '#9e140f'],
               ['#fff133', '#ffc70d'],
               ['#4a4dff', '#2f3fcf'],
               ['#6e3bb5', '#5c01a1'],
               ['#ffab03', '#d18d06']];

class Cell {
  constructor() {
    this.mass = 50;
    this.targetMass = 50;
    this.realMass = this.mass * 0.8;
    this.color = FILLS[Math.floor(Math.random() * FILLS.length)];

    setInterval(() => this.grow(), 50);
  }

  newTargetMass(amt) {
    this.targetMass += amt;
  }

  grow() {
    this.atrophy();
    let growthAmt = .5;

    if (this.mass + growthAmt < this.targetMass) {
      this.mass += growthAmt;
    } else if (this.mass + growthAmt >= this.targetMass) {
      this.mass = this.targetMass;
    }
    this.realMass = this.mass * 0.8;
  }

  atrophy() {
    if (this.targetMass > 50) {
      this.targetMass -= this.mass * 0.001;
    }
  }

  draw(ctx, x, y) {
    ctx.fillStyle = this.color[0];
    ctx.beginPath();
    ctx.arc(x, y, this.realMass, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.color[1];
    ctx.stroke();
  }
}

module.exports = Cell;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.image = null;
  }

  generate(squareSize) {
    let ctx = document.createElement('canvas').getContext('2d');

    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;

    ctx.save();
    let bw = this.width;
    let bh = this.height;
    let p = 0;

    // longitude
    for (let i = 0; i <= bw; i += squareSize) {
      ctx.moveTo(0.5 + i + p, p);
      ctx.lineTo(0.5 + i + p, bh + p);
    }

    // latitude
    for (let i = 0; i <= bh; i += squareSize) {
      ctx.moveTo(p, 0.5 + i + p);
      ctx.lineTo(bw + p, 0.5 + i + p);
    }

    ctx.strokeStyle = 'rgba(78, 81, 82, 0.5)';
    ctx.stroke();
    ctx.restore();

    // takes canvas drawing and converts it to an image
    this.image = new Image();
    this.image.src = ctx.canvas.toDataURL("image/png");

    // clear ctx
    ctx = null;
  }


  // xMove/yMove represent change in cell pos
  // draw(ctx, xMove, yMove, squareSize) {
  //
  //   let xStart = xMove % squareSize;
  //   let yStart = yMove % squareSize;
  //
  //   let bw = this.width;
  //   let bh = this.height;
  //   let p = 0;
  //
  //   // longitude
  //   for (let i = xStart; i <= bw; i += squareSize) {
  //     ctx.moveTo(0.5 + (i) + p, p);
  //     ctx.lineTo(0.5 + (i) + p, bh + p);
  //   }
  //
  //   // latitude
  //   for (let i = yStart; i <= bh; i += squareSize) {
  //     ctx.moveTo(p, 0.5 + (i) + p);
  //     ctx.lineTo(bw + p, 0.5 + (i) + p);
  //   }
  //
  //   ctx.strokeStyle = 'rgba(78, 81, 82, 0.5)';
  //   ctx.stroke();
  // }


  // old
  draw(ctx, xView, yView) {
    // d = destination
    // s = source
    // technically crops the background image

    let sx, sy, dx, dy;
    let sWidth, sHeight, dWidth, dHeight;

    sx = xView;
    sy = yView;

    sWidth = ctx.canvas.width;
    sHeight = ctx.canvas.height;

    if (this.image.width - sx < sWidth) {
      sWidth = this.image.width - sx;
    }

    if (this.image.height - sy < sHeight) {
      sHeight = this.image.height - sy;
    }

    dx = 0;
    dy = 0;

    dWidth = sWidth;
    dHeight = sHeight;

    ctx.drawImage(
      this.image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
  }
}

module.exports = Board;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Cell = __webpack_require__(0);
const Camera = __webpack_require__(6);
const HumanPlayer = __webpack_require__(3);
const Board = __webpack_require__(1);
const Rectangle = __webpack_require__(4);
const Food = __webpack_require__(7);
const ComputerPlayer = __webpack_require__(9);

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

    let food, eatObj;

    this.playerList.forEach(player => {
      if (player instanceof ComputerPlayer) {
        eatObj = player.ai(this.playerList, this.foodStuff);
        food = player.senseFood(this.foodStuff);
      } else {
        eatObj = player.senseCells(this.playerList);
        food = player.senseFood(this.foodStuff);
      }
      if (eatObj) {
        this.playerList.forEach((playerCheck, idx) => {
          if (playerCheck.id === eatObj.id) {
            let eaten = this.playerList.splice(idx, 1);
            player.cell.newTargetMass(eaten[0].cell.realMass);
            eaten = null;
            if (playerCheck.id === 1) {
              document.getElementById('lose').style.display = "flex";
            }
          }
        });
        if (this.playerList.length === 1 && this.playerList[0].id === 1) {
          document.getElementById('win').style.display = "flex";
        }
      }
      if (food) {
        this.foodStuff.splice(food[1], 1);
        player.cell.newTargetMass(food[0].mass * .75);
        this.eatenFood.push(food[0]);
      }
    });

    this.camera.update();
  }

  updatePlayerCoords() {
    this.player.updateCoords();
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
      food = null;
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
    this.playerLoop = setInterval(() => {
      this.run();
    }, INTERVAL);
  }
}

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Cell = __webpack_require__(0);
const Util = __webpack_require__(8);

class HumanPlayer {
  constructor(canvasW, canvasH, x, y) {
    // (x, y) represents the center of the player's cell

    // the players position in the world, NOT THE CANVAS
    this.x = x;
    this.y = y;

    this.id = 1;

    this.xView = 0;
    this.yView = 0;

    // cell position relative to top left viewport corner
    this.relativeX = 0;
    this.relativeY = 0;

    // relative mouse pos
    this.mouseX = null;
    this.mouseY = null;

    // canvas witdth and height
    this.canvasW = canvasW;
    this.canvasH = canvasH;

    this.cell = new Cell();
    this.util = new Util();

    // this.cell.realMass * 2 = this.cell.realMass * 2;
    // this.cell.realMass * 2 = this.cell.realMass * 2;
  }

  senseCells(cellList) {
    // console.log(cellList);
    let radius = this.cell.realMass;
    let humanCoords = [this.x, this.y];
    let distance;
    let coords;
    let foodReturn = null;
    let eat = null;

    cellList.forEach(player => {
      if (player.id !== this.id) {
        coords = [player.x, player.y];
        distance = this.util.dist(humanCoords, coords);
        if (distance <= radius &&
            player.cell.realMass < this.cell.realMass) {
          eat = player;
        }
      }
    });

    return eat;
  }

  senseFood(foodStuff) {
    // playerCell.mass returns the radius of the cell
    let radius = this.cell.realMass;
    let playerCoords = [this.x, this.y];
    let distance;
    let coords;
    let foodReturn = null;

    foodStuff.forEach((food, idx) => {
      coords = [food.x, food.y];
      distance = this.util.dist(playerCoords, coords);
      if (distance <= radius) {
        foodReturn = [food, idx];
      }
    });
    return foodReturn;
  }

  updateCoords() {
    this.canvasW = $(window).width();
    this.canvasH = $(window).height();
  }

  // step = time (seconds) between frames
  update(step, worldW, worldH, controls) {
    // basic player movement control
    if (controls.left) {
      this.x -= this.speed * step;
    }

    if (controls.right) {
      this.x += this.speed * step;
    }

    if (controls.up) {
      this.y -= this.speed * step;
    }

    if (controls.down) {
      this.y += this.speed * step;
    }

    // mouse controlled player movement
    // ********************************
    //
    // grabs the position of the camera's top left corner
    this.xView = this.x - this.canvasW / 2;
    this.yView = this.y - this.canvasH / 2;

    if (controls.x && controls.y) {
      this.mouseX = controls.x;
      this.mouseY = controls.y;

      this.relativeX = this.x - this.xView;
      this.relativeY = this.y - this.yView;

      this.relativeXDirection = this.mouseX - this.relativeX;
      this.relativeYDirection = this.mouseY - this.relativeY;

      // limits movement to a max of 3 and min of -3
      this.xMovement =
        Math.min(Math.max(this.relativeXDirection * step, -3), 3);
      this.yMovement =
        Math.min(Math.max(this.relativeYDirection * step, -3), 3);

      this.x += this.xMovement;
      this.y += this.yMovement;

      // console.log(this.relativeXDirection, this.relativeYDirection);
    }

    // enforce world boundaries inside main world
    if (this.x - this.cell.realMass / 2 < 2500) {
      this.x = this.cell.realMass / 2 + 2500;
    } else if (this.x + this.cell.realMass / 2 > worldW) {
      this.x = worldW - this.cell.realMass / 2;
    }

    if (this.y - this.cell.realMass / 2 < 2500) {
      this.y = this.cell.realMass / 2 + 2500;
    } else if (this.y + this.cell.realMass / 2 > worldH) {
      this.y = worldH - this.cell.realMass / 2;
    }
  }

  draw(ctx, xView, yView) {
    ctx.save();

    let xCent = (this.x) - xView;
    let yCent = (this.y) - yView;

    this.cell.draw(ctx, xCent, yCent);

    ctx.restore();
  }
}

module.exports = HumanPlayer;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Rectangle {
  constructor(left, top, width, height) {
    this.left = left || 0;
    this.top = top || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  set(left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width || this.width;
    this.height = height || this.height;
    this.right = (this.left + this.width);
    this.bottom = (this.top + this.height);
  }

  within(r) {
    return (
      r.left <= this.left &&
      r.right >= this.right &&
      r.top <= this.top &&
      r.bottom >= this.bottom
    );
  }

  overlaps(r) {
    return (
      this.left < r.right &&
      r.left < this.right &&
      this.top < r.bottom &&
      r.top < this.bottom
    );
  }
}

module.exports = Rectangle;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(1);
const Cell = __webpack_require__(0);
const HumanPlayer = __webpack_require__(3);
const Game = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", () => {
  const gameElement = document.getElementById('game-canvas');
  const gameCtx = gameElement.getContext('2d');

  gameElement.width = $(window).width();
  gameElement.height = $(window).height();

  let board = new Board(8000, 8000);
  board.generate(75);
  board.draw(gameCtx, 2500, 2500);

  let game;

  $(window).resize(() => {
    gameElement.width = $(window).width();
    gameElement.height = $(window).height();
    if (board) {
      board.draw(gameCtx, 2500, 2500);
    }
    if (game) {
      game.updatePlayerCoords();
    }
  });

  // document.getElementById('win-button').addEventListener('click', () => {
  //   document.getElementById('win').style.display = 'none';
  //   game = new Game(gameCtx, gameElement);
  //   game.play();
  // });
  //
  // document.getElementById('lose-button').addEventListener('click', () => {
  //   document.getElementById('lose').style.display = 'none';
  //   game = new Game(gameCtx, gameElement);
  //   game.play();
  // });

  document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-menu').style.display = "none";
    game = new Game(gameCtx, gameElement);
    game.play();
    board = null;
  });


});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const Rectangle = __webpack_require__(4);

const AXIS = {
  NONE: "none",
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
  BOTH: "both"
};

class Camera {
  constructor(xView, yView, canvasW, canvasH, worldW, worldH) {
    // corner of camera
    this.xView = xView || 0;
    this.yView = yView || 0;

    // Don't need dead zone

    this.wView = canvasW;
    this.hView = canvasH;
    this.worldW = worldW;
    this.worldH = worldH;

    this.axis = AXIS.BOTH;
    this.followed = null;
    this.viewportRect =
      new Rectangle(this.xView, this.yView, this.wView, this.hView);
    this.worldRect = new Rectangle(0, 0, worldW, worldH);
  }

  follow(gameObj) {
    this.followed = gameObj;
  }

  update() {
    if (this.followed !== null) {
      // wView = canvas width
      // hView = canvas height
      // xView, yView = position of camera's top left corner
      let windowWidth = $(window).width();
      let windowHeight = $(window).height();

      if ((this.followed.x - windowWidth / 2) > 0 &&
            (this.followed.x) < this.worldW) {
          this.xView = this.followed.x - windowWidth / 2;
      }

      if ((this.followed.y - windowHeight / 2) > 0 &&
            (this.followed.y) < this.worldH) {
        this.yView = this.followed.y - windowHeight / 2;
      }

      this.viewportRect.set(this.xView, this.yView);

      if (!this.viewportRect.within(this.worldRect)) {
        if (this.viewportRect.left < this.worldRect.left) {
          this.xView = this.worldRect.left;
        }

        if (this.viewportRect.top < this.worldRect.top) {
          this.yView = this.worldRect.top;
        }

        if (this.viewportRect.right > this.worldRect.right) {
          this.xView = this.worldRect.right - this.wView;
        }

        if (this.viewportRect.bottom > this.worldRect.bottom) {
          this.yView = this.worldRect.bottom - this.hView;
        }
      }
    }
  }
}

module.exports = Camera;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

const MASSES = [1, 2];
const FILLS = [['#ff2033', '#9e140f'],
               ['#fff133', '#ffc70d'],
               ['#4a4dff', '#2f3fcf'],
               ['#6e3bb5', '#5c01a1'],
               ['#ffab03', '#d18d06']];

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.targetX = x;
    this.targetY = y;

    this.mass = MASSES[Math.floor(Math.random() * MASSES.length)];
    this.color = FILLS[Math.floor(Math.random() * FILLS.length)];

    // setInterval(() => this.meander(), 50);
  }

  meander() {
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let randX = Math.random() * plusOrMinus * 0.1;
    let randY = Math.random() * plusOrMinus * 0.1;

    this.x += randX;
    this.y += randY;
  }

  draw(ctx, xView, yView) {
    ctx.fillStyle = this.color[0];
    ctx.beginPath();

    this.relativeX = this.x - xView;
    this.relativeY = this.y - yView;

    // enforce world bounds

    ctx.beginPath();
    ctx.arc(this.relativeX, this.relativeY, this.mass * 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color[1];
    ctx.stroke();
  }
}

module.exports = Food;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

class Util {
  // Normalize the length of the vector to 1, maintaining direction.
  dir (vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  }
  // Find distance between two points.
  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  }
  // Find the length of the vector.
  norm (vec) {
    return Util.dist([0, 0], vec);
  }

  // Return a randomly oriented vector with the given length.
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  }

  genVec (length) {
    const deg = 2 * Math.PI;
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  }

  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
}

module.exports = Util;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Cell = __webpack_require__(0);
const Util = __webpack_require__(8);
const HumanPlayer = __webpack_require__(3);

class ComputerPlayer {
  constructor(canvasW, canvasH, x, y, step, world, id) {
    this.x = x;
    this.y = y;

    this.step = step;
    this.world = world;

    this.id = id;

    this.cell = new Cell();
    this.util = new Util();

    this.cursor = [0, 40];
  }

  ai(playerList, foodStuff) {
    let radius = this.cell.realMass;
    let computerCoords = [this.x, this.y];
    let distance;
    let coords;
    let eatObj = null;
    this.nearbyPlayer = false;

    playerList.forEach(obj => {
      coords = [obj.x, obj.y];
      distance = this.util.dist(computerCoords, coords);
      if ((obj instanceof ComputerPlayer ||
          obj instanceof HumanPlayer) &&
          obj.id !== this.id &&
          distance < 350 + this.cell.realMass / 2) {

        if (distance <= radius &&
            obj.cell.realMass < this.cell.realMass) {
          eatObj = obj;
        } else if (distance > radius &&
                   obj.cell.realMass > this.cell.realMass) {
          // RUN
          this.nearbyPlayer = true;

          this.run(obj, obj.x, obj.y);
        } else if (distance > radius &&
                   obj.cell.realMass < this.cell.realMass) {
          // CHASE
          this.nearbyPlayer = true;

          this.chase(obj);
        }
      } else {
        this.nearbyPlayer = false;
      }
    });

    if (!this.nearbyPlayer) {
      this.chaseFood(foodStuff);
    }

    return eatObj;
  }

  run(player, otherX, otherY) {
    let checkX, checkY, rads;
    let checkCoords = [];
    let wallNorth = false;
    let wallEast = false;
    let wallSouth = false;
    let wallWest = false;
    let wallSense = 200;

    if (this.x + wallSense > 5000) {
      wallEast = true;
    }

    if (this.x - wallSense < 2500) {
      wallWest = true;
    }

    if (this.y + wallSense > 5000) {
      wallSouth = true;
    }

    if (this.y - wallSense < 2500) {
      wallNorth = true;
    }

    for (let i = 0; i <= 360; i += 15) {
      rads = i * Math.PI / 180;
      checkX = 50 * Math.cos(rads);
      checkY = 50 * Math.sin(rads);

      if (wallNorth && wallWest) {
        if (i === 90 || i === 360) {
          checkCoords.push([checkX, checkY]);
        }
      } else if (wallWest && wallSouth) {
        if (i === 360 || i === 270) {
          checkCoords.push([checkX, checkY]);
        }
      } else if (wallSouth && wallEast) {
        if (i === 180 || i === 270) {
          checkCoords.push([checkX, checkY]);
        }
      } else if (wallEast && wallNorth) {
        if (i === 90 || i === 180) {
          checkCoords.push([checkX, checkY]);
        }
      } else if (wallNorth && (i < 180 || i > 0)) {
        checkCoords.push([checkX, checkY]);
      } else if (wallWest && (i < 90 || i > 270)) {
        checkCoords.push([checkX, checkY]);
      } else if (wallSouth && (i < 360 && i > 180)) {
        checkCoords.push([checkX, checkY]);
      } else if (wallEast && (i < 270 || i > 90)) {
        checkCoords.push([checkX, checkY]);
      } else if (!wallEast && !wallSouth && !wallNorth && !wallWest) {
        checkCoords.push([checkX, checkY]);
      }
    }

    let maxDistance, maxDistanceCoords, distance;

    checkCoords.forEach(set => {
      distance =
        this
          .util
          .dist([player.x, player.y], [set[0] + this.x, set[1] + this.y]);
      if (!maxDistance || distance >= maxDistance) {
        maxDistance = distance;
        maxDistanceCoords = set;
      }
    });

    this.cursor = maxDistanceCoords;

    this.x += maxDistanceCoords[0] * this.step * 2;
    this.y += maxDistanceCoords[1] * this.step * 2;

    this.enforceBarrier();
  }

  chase(target) {
    let rads, checkX, checkY;
    let checkCoords = [];

    for (let i = 0; i <= 360; i += 15) {
      rads = i * Math.PI / 180;
      checkX = 50 * Math.cos(rads);
      checkY = 50 * Math.sin(rads);
      checkCoords.push([checkX, checkY]);
    }

    let minDistanceCoords, minDistance, distance;

    checkCoords.forEach(set => {
      distance =
      this.util.dist(
        [set[0] + this.x, set[1] + this.y],
        [target.x, target.y]);
      if (!minDistance || distance < minDistance) {
        minDistance = distance;
        minDistanceCoords = set;
      }
    });

    this.cursor = minDistanceCoords;

    this.x += minDistanceCoords[0] * this.step * 1.5;
    this.y += minDistanceCoords[1] * this.step * 1.5;

    this.enforceBarrier();
  }

  enforceBarrier() {
    if (this.x - this.cell.realMass / 2 < 2500) {
      this.x = this.cell.realMass / 2 + 2500;
    } else if (this.x + this.cell.realMass / 2 > 5000) {
      this.x = 5000 - this.cell.realMass / 2;
    }

    if (this.y - this.cell.realMass / 2 < 2500) {
      this.y = this.cell.realMass / 2 + 2500;
    } else if (this.y + this.cell.realMass / 2 > 5000) {
      this.y = 5000 - this.cell.realMass / 2;
    }
  }

  chaseFood(foodStuff) {
    if (!this.nearbyPlayer) {
      let rads, checkX, checkY;
      let checkCoords = [];

      for (let i = 0; i <= 360; i += 15) {
        rads = i * Math.PI / 180;
        checkX = 50 * Math.cos(rads);
        checkY = 50 * Math.sin(rads);
        checkCoords.push([checkX, checkY]);
      }

      let minDistanceCoords, minDistance, distance;

      checkCoords.forEach(set => {
        if (this.nearbyPlayer) {
          return;
        }
        foodStuff.forEach(food => {
          if (this.nearbyPlayer) {
            return;
          }
          distance =
          this.util.dist(
            [set[0] + this.x, set[1] + this.y],
            [food.x, food.y]);
            if (!minDistance || distance < minDistance) {
              minDistance = distance;
              minDistanceCoords = set;
            }
        });
      });


      this.cursor = minDistanceCoords;

      this.x += minDistanceCoords[0] * this.step * 1.5;
      this.y += minDistanceCoords[1] * this.step * 1.5;

      this.enforceBarrier();
    } else {
      return;
    }
  }

  senseFood(foodStuff) {
    // computerCell.mass returns the radius of the cell
    let radius = this.cell.realMass;
    let computerCoords = [this.x, this.y];
    let distance;
    let coords;
    let foodReturn = null;

    foodStuff.forEach((food, idx) => {
      coords = [food.x, food.y];
      distance = this.util.dist(computerCoords, coords);
      if (distance <= radius) {
        foodReturn = [food, idx];
      }
    });
    return foodReturn;
  }

  draw(ctx, xView, yView) {
    ctx.save();

    let relativeX = (this.x) - xView;
    let relativeY = (this.y) - yView;

    this.cell.draw(ctx, relativeX, relativeY);

    ctx.restore();
  }
}

module.exports = ComputerPlayer;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map