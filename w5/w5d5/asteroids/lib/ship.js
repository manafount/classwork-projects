const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

function Ship() {
  MovingObject.call(this, {
    pos: [300, 300],
    vel: 0,
    color: Ship.COLOR,
    radius: Ship.RADIUS
  });
}
Util.inherits(Ship, MovingObject);

Ship.RADIUS = 15;
Ship.COLOR = "lightsalmon";

module.exports = Ship;
