const FILLS = ['red', 'yellow', 'blue', 'purple'];

class Cell {
  constructor() {
    this.mass = 50;
    this.color = FILLS[Math.floor(Math.random() * FILLS.length)];
  }

  draw(ctx, x, y) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, this.mass, 0, 2 * Math.PI);
    ctx.fill();
  }
}

module.exports = Cell;
