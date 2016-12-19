const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

function Asteroid(pos) {
  MovingObject.call(this, {
    pos: pos,
    vel: Util.randomVec(2),
    color: Asteroid.COLOR,
    radius: Asteroid.RADIUS
  });
}

Util.inherits(Asteroid, MovingObject);

// Move to moving object
Asteroid.prototype.move = function() {
  if (this.pos[1] + this.vel[1] > 600)
    this.pos[1] = 0;
  else if (this.pos[1] + this.vel[1] < 0)
    this.pos[1] = 600;
  else
    this.pos[1] += this.vel[1];

  if (this.pos[0] + this.vel[0] > 600)
    this.pos[0] = 0;
  else if (this.pos[0] + this.vel[0] < 0)
    this.pos[0] = 600;
  else
    this.pos[0] += this.vel[0];
};

Asteroid.COLOR = "darksalmon";
Asteroid.RADIUS = 20;

module.exports = Asteroid;
