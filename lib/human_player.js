const Cell = require('./cell');
const Util = require('./util');

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
