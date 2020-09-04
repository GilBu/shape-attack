const Util = require("./util");
const MovingObject = require("./moving_object");

function Bullet(options) {
  options.radius = Bullet.RADIUS;
  options.movObjTyp = "Bullet";
  MovingObject.call(this, options);
}

Bullet.RADIUS = 2;
Bullet.SPEED = 25;

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;

module.exports = Bullet;