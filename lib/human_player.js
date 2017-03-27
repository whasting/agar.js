const Cell = require('./cell');
const Game = require('./game');

class HumanPlayer {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // update this to be dynamic based on cursor position relative to
    // cell
    this.speed = 200;

    this.playerCell = new Cell();
  }

  // step = time (seconds) between frames
  update(step, worldW, worldH) {

    // basic players controls
    if (Game.controls.left) {
      this.x -= this.speed * step;
    }

    if (Game.controls.right) {
      this.x += this.speed * step;
    }

    if (Game.controls.up) {
      this.y -= this.speed * step;
    }

    if (Game.controls.down) {
      this.y += this.speed * step;
    }


    // enforce world boundaries
    if (this.x - this.width / 2 < 0) {
      this.x = this.width / 2;
    }

    if (this.y - this.height / 2 < 0) {
      this.y = this.height / 2;
    }

    if (this.x - this.width / 2 > worldW) {
      this.x = worldW - this.width / 2;
    }

    if (this.y - this.height / 2 > worldH) {
      this.y = worldH - this.height / 2;
    }
  }

  draw(ctx) {
    ctx.save();

    this.playerCell.draw(ctx, this.x, this.y);

    ctx.restore();
  }
}

module.exports = HumanPlayer;
