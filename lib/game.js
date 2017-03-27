const Cell = require('./cell');
const Camera = require('./camera');
const HumanPlayer = require('./human_player');
const Board = require('./board');

// settings:
const INTERVAL = 1000/60;
const STEP = INTERVAL/1000;

class Game {
  constructor(backgroundCtx, cellCtx) {
    this.cells = [];
    this.food = [];

    this.backgroundCtx = backgroundCtx;
    this.cellCtx = cellCtx;

    this.xCenter = $(window).scrollLeft() + $(window).width() / 2;
    this.yCenter = $(window).scrollTop() + $(window).height() / 2;

    this.board = new Board();
    this.player = new HumanPlayer();
    this.camera =
      new Camera(
        0,
        0,
        cellCtx.canvas.width,
        cellCtx.canvas.height,
        5000,
        5000
      );
  }

  update() {
    this.player.update(STEP, 5000, 5000);
    this.camera.update();
  }

  draw() {
    this.cellCtx.clearRect(0, 0, 5000, 5000);

    player.draw(this.cellCtx, )
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
}
