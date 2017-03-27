

class Cell {
  constructor() {
    this.mass = 50;
  }

  move() {

  }

  draw(ctx, x, y) {
    ctx.canvas.width = 5000;
    ctx.canvas.height = 5000;

    ctx.clearRect(0, 0, ctx.width, ctx.height);

    ctx.fillStyle = "red";

    ctx.beginPath();
    ctx.arc(
      x, y, this.mass, 0, 2 * Math.PI
    );
    ctx.fill();
  }
}

module.exports = Cell;
