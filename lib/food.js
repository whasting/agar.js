const MASSES = [1, 2];
const FILLS = [['#ff2033', '#9e140f'],
               ['#fff133', '#ffc70d'],
               ['#4a4dff', '#2f3fcf'],
               ['#6e3bb5', '#431b75'],
               ['#cfa532', '#d18b35']];

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.mass = MASSES[Math.floor(Math.random() * MASSES.length)];
    this.color = FILLS[Math.floor(Math.random() * FILLS.length)];
  }

  draw(ctx, xView, yView) {
    ctx.fillStyle = this.color[0];
    ctx.beginPath();

    this.relativeX = this.x - xView;
    this.relativeY = this.y - yView;

    ctx.beginPath();
    ctx.arc(this.relativeX, this.relativeY, this.mass * 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color[1];
    ctx.stroke();
  }
}

module.exports = Food;
