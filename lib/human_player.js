const Cell = require('./cell');

class HumanPlayer {
  constructor(x, y) {
    // (x, y) represents the center of the player's cell
    // the players position in the world, NOT THE CANVAS
    this.x = x;
    this.y = y;

    // TODO
    // update this to be dynamic based on cursor position relative to
    // cell
    this.speed = 200;
    this.width = 100;
    this.height = 100;

    this.playerCell = new Cell();
  }

  // step = time (seconds) between frames
  update(step, worldW, worldH, controls) {
    // basic player movement control
    if (controls.left) {
      this.x -= this.speed * step;
    }

    if (controls.right) {
      console.log(this.x);
      this.x += this.speed * step;
    }

    if (controls.up) {
      this.y -= this.speed * step;
    }

    if (controls.down) {
      this.y += this.speed * step;
    }

    // mouse controlled player movement
    if (controls.x && controls.y) {
      // console.log(controls.y - this.y / controls.x - this.x);
    }

    // enforce world boundaries
    if (this.x - this.width < 0) {
      this.x = this.width;
    }

    if (this.y - this.height < 0) {
      this.y = this.height;
    }

    if (this.x > worldW) {
      this.x = worldW;
    }

    if (this.y > worldH) {
      this.y = worldH;
    }

  }

  draw(ctx, xView, yView) {
    ctx.save();

    let xCent = (this.x - this.width / 2) - xView;
    let yCent = (this.y - this.height / 2) - yView;

    this.playerCell.draw(ctx, xCent, yCent);

    ctx.restore();
  }
}

module.exports = HumanPlayer;
