

class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.image = null;
  }

  generate(ctx) {
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;

    ctx.save();
    let bw = this.width;
    let bh = this.height;
    let p = 10;

    // longitude
    for (let i = 0; i <= bw; i += 50) {
      ctx.moveTo(0.5 + i + p, p);
      ctx.lineTo(0.5 + i + p, bh + p);
    }

    // latitude
    for (let i = 0; i <= bh; i += 50) {
      ctx.moveTo(p, 0.5 + i + p);
      ctx.lineTo(bw + p, 0.5 + i + p);
    }

    ctx.strokeStyle = 'rgba(78, 81, 82, 0.5)';
    ctx.stroke();
    ctx.restores();

    // takes canvas drawing and converts it to an image
    this.image = new Image();
    this.image.src = ctx.canvas.toDataURL("image/png");

    // clear ctx
    ctx = null;
  }

  draw(ctx, xView, yView) {

  }
}

module.exports = Board;
