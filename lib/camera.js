const Game = require('./game');
const Rectangle = require('./rectangle');

const AXIS = {
  NONE: "none",
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
  BOTH: "both"
};

class Camera {
  constructor(xView, yView, canvasW, canvasH, worldW, worldH) {
    this.xView = xView || 0;
    this.yView = yView || 0;

    // Don't need dead zone

    this.wView = canvasW;
    this.hView = canvasH;

    this.axis = AXIS.BOTH;

    this.followed = null;

    this.viewportRect =
      new Game.Rectangle(this.xView, this.yView, this.wView, this.hView);

    this.worldRect = new Game.Rectangle(0, 0, worldW, worldH);
  }

  follow(gameObj) {
    this.followed = gameObj;
  }

  update() {
    if (this.followed !== null) {

      if (this.axis === AXIS.HORIZONTAL || this.axis === AXIS.BOTH) {
        //camera moves on horiz axis based on cell position
        if (this.followed.x - this.xView > this.wView) {
          this.xView = this.followed.x - (this.wView);
        } else if (this.followed.x < this.xView) {
          this.xView = this.followed.x;
        }
      }

      if (this.axis === AXIS.VERTICAL || this.axis === AXIS.BOTH) {
        //camera moves on vert axis based on cell pos
        if (this.followed.y - this.yView > this.hView) {
          this.yView = this.followed.y - (this.hView);
        } else if (this.followed.y < this.yView) {
          this.yView = this.followed.y;
        }
      }

      this.viewportRect.set(this.xView, this.yView);

      if (!this.viewportRect.within(this.worldRect)) {
        if (this.viewportRect.left < this.worldRect.left) {
          this.xView = this.worldRect.left;
        }

        if (this.viewportRect.top < this.worldRect.top) {
          this.yView = this.worldRect.top;
        }

        if (this.viewportRect.right < this.worldRect.right) {
          this.xView = this.worldRect.right;
        }

        if (this.viewportRect.bottom < this.worldRect.bottom) {
          this.yView = this.worldRect.bottom;
        }
      }
    }
  }
}

module.exports = Camera;
