const Cell = require('./cell');
const Camera = require('./camera');
const HumanPlayer = require('./human_player');
const Board = require('./board');
const Rectangle = require('./rectangle');

// settings:
const FPS = 30;
const INTERVAL = 1000/FPS;
const STEP = INTERVAL/1000;

const WORLD = {
  height: 5000,
  width: 5000,
  board: new Board(5000, 5000)
};

const CONTROLS = {
  left: false,
  right: false,
  up: false,
  down: false
};

class Game {
  constructor(gameCtx, gameCanvas) {
    this.cells = [];
    this.food = [];

    this.gameCtx = gameCtx;
    this.gameCanvas = gameCanvas;

    this.xCenter = $(window).scrollLeft() + $(window).width() / 2;
    this.yCenter = $(window).scrollTop() + $(window).height() / 2;

    WORLD.board.generate(gameCtx);

    this.player = new HumanPlayer(2000, 2000);
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
      this.player,
      gameCanvas.width / 2,
      gameCanvas.height / 2
    );
  }

  update() {
    this.player.update(STEP, WORLD.width, WORLD.height, CONTROLS);
    this.camera.update();
  }

  draw() {
    this
      .gameCtx
      .clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

    WORLD
      .board.draw(this.gameCtx, this.camera.xView, this.camera.yView);

    this.player
      .draw(this.gameCtx, this.camera.xView, this.camera.yView);
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

window.addEventListener("keydown", function(e){
	switch(e.keyCode)
	{
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
}, false);

window.addEventListener("keyup", function(e){
	switch(e.keyCode)
	{
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
}, false);

module.exports = Game;
