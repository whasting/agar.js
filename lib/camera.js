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
    console.log(this.xView, this.yView);
    this.viewportRect =
      new Rectangle(this.xView, this.yView, this.wView, this.hView);

    this.worldRect = new Rectangle(0, 0, worldW, worldH);
  }

  follow(gameObj) {
    this.followed = gameObj;
  }

  update() {
    if (this.followed !== null) {

      // wView = canvas width
      // hView = canvas height
      // xView, yView = position of camera's top left corner

      if (this.axis === AXIS.HORIZONTAL || this.axis === AXIS.BOTH) {
        //camera moves on horiz axis based on cell position

        // player cells x pos - (0) xView > canvas width
        // then set xView = to the cells x pos - the canvas width
        // else if the cells x pos is < xView, set xView to the cells x pos

        this.xView = this.followed.x - $(window).width() / 2;

        // if (this.followed.x - this.xView > this.wView) {
        //   this.xView = this.followed.x - (this.wView);
        // } else if (this.followed.x < this.xView) {
        //   this.xView = this.followed.x;
        // }
      }

      if (this.axis === AXIS.VERTICAL || this.axis === AXIS.BOTH) {
        //camera moves on vert axis based on cell pos

        this.yView = this.followed.y - $(window).height() / 2;

        // if (this.followed.y - this.yView > this.hView) {
        //   this.yView = this.followed.y - (this.hView);
        // } else if (this.followed.y < this.yView) {
        //   this.yView = this.followed.y;
        // }
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
    console.log(this.xView, this.yView);
  }
}

module.exports = Camera;
