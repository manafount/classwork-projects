const Util = require('./utils.js');
const Asteroid = require('./asteroid');
const Ship = require('./ship.js');

function Game() {
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship();
}
Game.DIM_X = 600;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(
      Util.randomPos(Game.DIM_X, Game.DIM_Y)
    ));
  }
};
Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, 600, 600);
  this.asteroids.forEach(asteroid => asteroid.draw(ctx));
};
Game.prototype.moveObjects = function() {
  this.asteroids.forEach(asteroid => asteroid.move());
  this.checkCollisions();
};

Game.prototype.checkCollisions = function() {
  let toBeDestroyed = [];
  this.asteroids.forEach((asteroid, i) => {
    this.asteroids.forEach((asteroid2, j) => {
      if ((i !== j) && (asteroid.isCollidedWith(asteroid2))){
        toBeDestroyed.push(asteroid, asteroid2);
        console.log("Collisision!");
      }
    });
  });
  toBeDestroyed.forEach(asteroid => {
    let idx = this.asteroids.indexOf(asteroid);
    if (idx > -1) {
      this.asteroids.splice(idx, 1);
    }
  });
};

module.exports = Game;
