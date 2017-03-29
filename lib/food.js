const MASSES = [1, 2, 3];

class Food {
  constructor() {
    this.mass = MASSES[Math.floor(Math.random() * MASSES.length)];
  }

  draw() {

  }
}
