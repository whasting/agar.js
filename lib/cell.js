

class Cell {
  constructor() {
    this.mass = 50;
  }

  draw(ctx, x, y) {

    ctx.fillStyle = "red";

    ctx.beginPath();
    ctx.arc(
      x, y, this.mass, 0, 2 * Math.PI
    );
    ctx.fill();
  }
}

module.exports = Cell;
