Function.prototype.inherits = function(parent) {
  function Surrogate() {}
  Surrogate.prototype = parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function MovingObject () {}
MovingObject.prototype.move = function() {
  console.log("I'm moving");
};

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

console.log(new Ship().move());
console.log(new Ship().constructor);
console.log(new Asteroid().move());
console.log(new Asteroid().constructor);
