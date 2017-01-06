const Util = require('./utils.js');

function MovingObject(opts = {}) {
  this.pos = opts.pos;
  this.vel = opts.vel;
  this.radius = opts.radius;
  this.color = opts.color;
}
MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI
  );

  ctx.fill();
};
MovingObject.prototype.isCollidedWith = function(otherObject) {
  let dist = Util.dist(this.pos, otherObject.pos);
  return (dist < (this.radius + otherObject.radius));
};

module.exports = MovingObject;
