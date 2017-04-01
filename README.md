# Agar.js

[Agar.js Live][github]

[github]: https://whasting.github.io/agar.js/

Agar.js is a pure front-end implementation of the popular massively multiplayer
game Agar.io. The entire project was created using vanilla JavaScript and
HTML5 canvas.

## Instructions

Play the game by following the live link above.

Directions:
- [ ] Big cells eat the little ones
- [ ] Navigate the board by moving your cursor towards your desired destination

## Technologies Used

- [ ] JavaScript
- [ ] HTML5 Canvas

## Features

### Panning Camera

The `Background` class first generates a grid on a fresh canvas using two
separate loops to draw the longitude and latitude lines:


    // longitude
    for (let i = 0; i <= bw; i += squareSize) {
      ctx.moveTo(0.5 + i + p, p);
      ctx.lineTo(0.5 + i + p, bh + p);
    }

    // latitude
    for (let i = 0; i <= bh; i += squareSize) {
      ctx.moveTo(p, 0.5 + i + p);
      ctx.lineTo(bw + p, 0.5 + i + p);
    }

It then crops the grid image when Board.draw
is invoked in the `Game` class:

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

Where `sx` and `sy` are the top-left coordinates of the viewport (camera),
`sWidth` and `sHeight` are the source images dimensions,
`dx` and `dy` are the coordinates where the the top-left corner of the
image is drawn, and `dWidth`/`dHeight` represent the scaling of the image.

An object is then set to follow in the `Camera` class. By keeping track of
the `followed` object's (x, y) coordinates, it's able to update the
coordinates (`xView, yView` a.k.a. `sx, sy` above) of where it's
top-left corner should be. The player is kept centered in the `Camera` by
setting `xView` and `yView` equal to the `Player`'s `x` and `y` positions
less half the window's current height:

    if ((this.followed.x - windowWidth / 2) > 0 &&
          (this.followed.x) < this.worldW) {
        this.xView = this.followed.x - windowWidth / 2;
    }

    if ((this.followed.y - windowHeight / 2) > 0 &&
          (this.followed.y) < this.worldH) {
      this.yView = this.followed.y - windowHeight / 2;
    }

## The Future

 1. Implement a better AI
 2. Fix win/lose screens
 3. Add splitting
 4. Add custom skins
 5. Add viruses
