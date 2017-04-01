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
    // corner of camera
    this.xView = xView || 0;
    this.yView = yView || 0;

    // Don't need dead zone

    this.wView = canvasW;
    this.hView = canvasH;
    this.worldW = worldW;
    this.worldH = worldH;

    this.axis = AXIS.BOTH;
    this.followed = null;
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
      let windowWidth = $(window).width();
      let windowHeight = $(window).height();

      if ((this.followed.x - windowWidth / 2) > 0 &&
            (this.followed.x) < this.worldW) {
          this.xView = this.followed.x - windowWidth / 2;
      }

      if ((this.followed.y - windowHeight / 2) > 0 &&
            (this.followed.y) < this.worldH) {
        this.yView = this.followed.y - windowHeight / 2;
      }

      this.viewportRect.set(this.xView, this.yView);

      if (!this.viewportRect.within(this.worldRect)) {
        if (this.viewportRect.left < this.worldRect.left) {
          this.xView = this.worldRect.left;
        }

        if (this.viewportRect.top < this.worldRect.top) {
          this.yView = this.worldRect.top;
        }

        if (this.viewportRect.right > this.worldRect.right) {
          this.xView = this.worldRect.right - this.wView;
        }

        if (this.viewportRect.bottom > this.worldRect.bottom) {
          this.yView = this.worldRect.bottom - this.hView;
        }
      }
    }
  }
}

module.exports = Camera;
