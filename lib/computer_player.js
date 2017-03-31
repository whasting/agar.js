const Cell = require('./cell');
const Util = require('./util');
const HumanPlayer = require('./human_player');

class ComputerPlayer {
  constructor(canvasW, canvasH, x, y, step, world, id) {
    this.x = x;
    this.y = y;

    this.step = step;
    this.world = world;

    this.id = id;

    this.cell = new Cell();
    this.util = new Util();

    this.cursor = [0, 40];
  }

  ai(playerList, foodStuff) {
    let radius = this.cell.realMass;
    let computerCoords = [this.x, this.y];
    let distance;
    let coords;
    let eatObj = null;
    this.nearbyPlayer = false;

    playerList.forEach(obj => {
      coords = [obj.x, obj.y];
      distance = this.util.dist(computerCoords, coords);
      if ((obj instanceof ComputerPlayer ||
          obj instanceof HumanPlayer) &&
          obj.id !== this.id &&
          distance < 350 + this.cell.realMass / 2) {

        if (distance <= radius &&
            obj.cell.realMass < this.cell.realMass) {
          eatObj = obj;
        } else if (distance > radius &&
                   obj.cell.realMass > this.cell.realMass) {
          // RUN
          this.nearbyPlayer = true;

          this.run(obj, obj.x, obj.y);
        } else if (distance > radius &&
                   obj.cell.realMass < this.cell.realMass) {
          // CHASE
          this.nearbyPlayer = true;

          this.chase(obj);
        }
      } else {
        this.nearbyPlayer = false;
      }
    });

    if (!this.nearbyPlayer) {
      this.chaseFood(foodStuff);
    }

    return eatObj;
  }

  run(player, otherX, otherY) {
    let checkX, checkY, rads;
    let checkCoords = [];
    let wallNorth = false;
    let wallEast = false;
    let wallSouth = false;
    let wallWest = false;
    let wallSense = 200;

    if (this.x + wallSense > 5000) {
      wallEast = true;
    }

    if (this.x - wallSense < 2500) {
      wallWest = true;
    }

    if (this.y + wallSense > 5000) {
      wallSouth = true;
    }

    if (this.y - wallSense < 2500) {
      wallNorth = true;
    }

    for (let i = 0; i <= 360; i += 15) {
      rads = i * Math.PI / 180;
      checkX = 50 * Math.cos(rads);
      checkY = 50 * Math.sin(rads);

      if (wallNorth && wallWest) {
        if (i === 90 || i === 360) {
          checkCoords.push([checkX, checkY]);
        }
      } else if (wallWest && wallSouth) {
        if (i === 360 || i === 270) {
          checkCoords.push([checkX, checkY]);
        }
      } else if (wallSouth && wallEast) {
        if (i === 180 || i === 270) {
          checkCoords.push([checkX, checkY]);
        }
      } else if (wallEast && wallNorth) {
        if (i === 90 || i === 180) {
          checkCoords.push([checkX, checkY]);
        }
      } else if (wallNorth && (i < 180 || i > 0)) {
        checkCoords.push([checkX, checkY]);
      } else if (wallWest && (i < 90 || i > 270)) {
        checkCoords.push([checkX, checkY]);
      } else if (wallSouth && (i < 360 && i > 180)) {
        checkCoords.push([checkX, checkY]);
      } else if (wallEast && (i < 270 || i > 90)) {
        checkCoords.push([checkX, checkY]);
      } else if (!wallEast && !wallSouth && !wallNorth && !wallWest) {
        checkCoords.push([checkX, checkY]);
      }
    }

    let maxDistance, maxDistanceCoords, distance;

    checkCoords.forEach(set => {
      distance =
        this
          .util
          .dist([player.x, player.y], [set[0] + this.x, set[1] + this.y]);
      if (!maxDistance || distance >= maxDistance) {
        maxDistance = distance;
        maxDistanceCoords = set;
      }
    });

    this.cursor = maxDistanceCoords;

    this.x += maxDistanceCoords[0] * this.step * 2;
    this.y += maxDistanceCoords[1] * this.step * 2;

    this.enforceBarrier();
  }

  chase(target) {
    let rads, checkX, checkY;
    let checkCoords = [];

    for (let i = 0; i <= 360; i += 15) {
      rads = i * Math.PI / 180;
      checkX = 50 * Math.cos(rads);
      checkY = 50 * Math.sin(rads);
      checkCoords.push([checkX, checkY]);
    }

    let minDistanceCoords, minDistance, distance;

    checkCoords.forEach(set => {
      distance =
      this.util.dist(
        [set[0] + this.x, set[1] + this.y],
        [target.x, target.y]);
      if (!minDistance || distance < minDistance) {
        minDistance = distance;
        minDistanceCoords = set;
      }
    });

    this.cursor = minDistanceCoords;

    this.x += minDistanceCoords[0] * this.step * 1.5;
    this.y += minDistanceCoords[1] * this.step * 1.5;

    this.enforceBarrier();
  }

  enforceBarrier() {
    if (this.x - this.cell.realMass / 2 < 2500) {
      this.x = this.cell.realMass / 2 + 2500;
    } else if (this.x + this.cell.realMass / 2 > 5000) {
      this.x = 5000 - this.cell.realMass / 2;
    }

    if (this.y - this.cell.realMass / 2 < 2500) {
      this.y = this.cell.realMass / 2 + 2500;
    } else if (this.y + this.cell.realMass / 2 > 5000) {
      this.y = 5000 - this.cell.realMass / 2;
    }
  }

  chaseFood(foodStuff) {
    if (!this.nearbyPlayer) {
      let rads, checkX, checkY;
      let checkCoords = [];

      for (let i = 0; i <= 360; i += 15) {
        rads = i * Math.PI / 180;
        checkX = 50 * Math.cos(rads);
        checkY = 50 * Math.sin(rads);
        checkCoords.push([checkX, checkY]);
      }

      let minDistanceCoords, minDistance, distance;

      checkCoords.forEach(set => {
        if (this.nearbyPlayer) {
          return;
        }
        foodStuff.forEach(food => {
          if (this.nearbyPlayer) {
            return;
          }
          distance =
          this.util.dist(
            [set[0] + this.x, set[1] + this.y],
            [food.x, food.y]);
            if (!minDistance || distance < minDistance) {
              minDistance = distance;
              minDistanceCoords = set;
            }
        });
      });


      this.cursor = minDistanceCoords;

      this.x += minDistanceCoords[0] * this.step * 1.5;
      this.y += minDistanceCoords[1] * this.step * 1.5;

      this.enforceBarrier();
    } else {
      return;
    }
  }

  senseFood(foodStuff) {
    // computerCell.mass returns the radius of the cell
    let radius = this.cell.realMass;
    let computerCoords = [this.x, this.y];
    let distance;
    let coords;
    let foodReturn = null;

    foodStuff.forEach((food, idx) => {
      coords = [food.x, food.y];
      distance = this.util.dist(computerCoords, coords);
      if (distance <= radius) {
        foodReturn = [food, idx];
      }
    });
    return foodReturn;
  }

  draw(ctx, xView, yView) {
    ctx.save();

    let relativeX = (this.x) - xView;
    let relativeY = (this.y) - yView;

    this.cell.draw(ctx, relativeX, relativeY);

    ctx.restore();
  }
}

module.exports = ComputerPlayer;
