const MASSES = [1, 2, 3];

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.mass = MASSES[Math.floor(Math.random() * MASSES.length)];
  }

  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    // ctx.moveTo(2500, 2500);
    // ctx.lineTo(100,50);
    // ctx.lineTo(50, 100);
    // ctx.lineTo(0, 90);
    // ctx.closePath();
    // ctx.fill();
    ctx.beginPath();
    ctx.arc(2500, 2500, this.mass * 3, 0, 2 * Math.PI);
    ctx.fill();
  }
}

module.exports = Food;
