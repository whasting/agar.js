const Cell = require('./cell');

class HumanPlayer {
  constructor(canvasW, canvasH, x, y) {
    // (x, y) represents the center of the player's cell
    // the players position in the world, NOT THE CANVAS
    this.x = x;
    this.y = y;

    this.xView = 0;
    this.yView = 0;

    // cell position relative to top left viewport corner
    this.relativeX = 0;
    this.relativeY = 0;

    // relative mouse pos
    this.relativeMouseX = null;
    this.relativeMouseY = null;

    // canvas witdth and height
    this.canvasW = canvasW;
    this.canvasH = canvasH;

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
      this.relativeX = this.x - this.xView;
      this.relativeY = this.y - this.yView;
      this.relativeMouseX = controls.x;
      this.relativeMouseY = controls.y;

      this.relativeXDirection = this.relativeMouseX - this.relativeX;
      this.relativeYDirection = this.relativeMouseY - this.relativeY;

      // limits movement to a max of 3 and min of -3
      let xMovement =
        Math.min(Math.max(this.relativeXDirection * step, -3), 3);
      let yMovement =
        Math.min(Math.max(this.relativeYDirection * step, -3), 3);

      this.x += xMovement;
      this.y += yMovement;

      // console.log(this.relativeXDirection, this.relativeYDirection);
    }

    // enforce world boundaries inside main world
    if (this.x - this.width/ 2 < 2500) {
      this.x = this.width / 2 + 2500;
    } else if (this.x + this.width / 2 > worldW) {
      this.x = worldW - this.width / 2;
    }

    if (this.y - this.height / 2 < 2500) {
      this.y = this.height / 2 + 2500;
    } else if (this.y + this.height / 2 > worldH) {
      this.y = worldH - this.height / 2;
    }
  }

  draw(ctx, xView, yView) {
    ctx.save();

    let xCent = (this.x) - xView;
    let yCent = (this.y) - yView;

    this.playerCell.draw(ctx, xCent, yCent);

    ctx.restore();
  }
}

module.exports = HumanPlayer;
