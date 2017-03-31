const FILLS = [['#ff2033', '#9e140f'],
               ['#fff133', '#ffc70d'],
               ['#4a4dff', '#2f3fcf'],
               ['#6e3bb5', '#5c01a1'],
               ['#ffab03', '#d18d06']];

class Cell {
  constructor() {
    this.mass = 50;
    this.targetMass = 50;
    this.realMass = this.mass * 0.8;
    this.color = FILLS[Math.floor(Math.random() * FILLS.length)];

    setInterval(() => this.grow(), 50);
  }

  newTargetMass(amt) {
    this.targetMass += amt;
  }

  grow() {
    this.atrophy();
    let growthAmt = .5;

    if (this.mass + growthAmt < this.targetMass) {
      this.mass += growthAmt;
    } else if (this.mass + growthAmt >= this.targetMass) {
      this.mass = this.targetMass;
    }
    this.realMass = this.mass * 0.8;
  }

  atrophy() {
    if (this.targetMass > 50) {
      this.targetMass -= this.mass * 0.001;
    }
  }

  draw(ctx, x, y) {
    ctx.fillStyle = this.color[0];
    ctx.beginPath();
    ctx.arc(x, y, this.realMass, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.color[1];
    ctx.stroke();
  }
}

module.exports = Cell;
