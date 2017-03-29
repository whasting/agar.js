class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.image = null;
  }

  generate() {
    let ctx = document.createElement('canvas').getContext('2d');

    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;

    ctx.save();
    let bw = this.width;
    let bh = this.height;
    let p = 0;

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
    ctx.restore();

    // takes canvas drawing and converts it to an image
    this.image = new Image();
    this.image.src = ctx.canvas.toDataURL("image/png");

    // clear ctx
    ctx = null;
  }

  draw(ctx, xView, yView) {
    // d = destination
    // s = source
    // technically crops the background image

    let sx, sy, dx, dy;
    let sWidth, sHeight, dWidth, dHeight;

    sx = xView;
    sy = yView;

    sWidth = ctx.canvas.width;
    sHeight = ctx.canvas.height;

    if (this.image.width - sx < sWidth) {
      sWidth = this.image.width- sx;
    }

    if (this.image.height - sy < sHeight) {
      sHeight = this.image.height - sy;
    }

    dx = 0;
    dy = 0;

    dWidth = sWidth;
    dHeight = sHeight;

    ctx.drawImage(
      this.image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
  }
}

module.exports = Board;
