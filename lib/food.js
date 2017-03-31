const MASSES = [1, 2];
const FILLS = [['#ff2033', '#9e140f'],
               ['#fff133', '#ffc70d'],
               ['#4a4dff', '#2f3fcf'],
               ['#6e3bb5', '#5c01a1'],
               ['#ffab03', '#d18d06']];

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.targetX = x;
    this.targetY = y;

    this.mass = MASSES[Math.floor(Math.random() * MASSES.length)];
    this.color = FILLS[Math.floor(Math.random() * FILLS.length)];

    // setInterval(() => this.meander(), 50);
  }

  meander() {
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let randX = Math.random() * plusOrMinus * 0.1;
    let randY = Math.random() * plusOrMinus * 0.1;

    this.x += randX;
    this.y += randY;

    // TODO: increment slowly towards target
  }

  draw(ctx, xView, yView) {
    ctx.fillStyle = this.color[0];
    ctx.beginPath();

    this.relativeX = this.x - xView;
    this.relativeY = this.y - yView;

    // enforce world bounds

    ctx.beginPath();
    ctx.arc(this.relativeX, this.relativeY, this.mass * 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color[1];
    ctx.stroke();
  }
}

module.exports = Food;
