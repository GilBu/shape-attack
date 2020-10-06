const Util = require("./util");
import MovingObject from "./moving_object";

class Bullet extends MovingObject {
  
  constructor(options) {
    this.radius = RADIUS;
    this.movObjTyp = "Bullet";
    this.isWrappable = false;
  }
}

const RADIUS = 2;
const SPEED = 25;

export default Bullet;

// const Util = require("./util");
// const MovingObject = require("./moving_object");
// import MovingObject from "./moving_object"

// function Bullet(options) {
//   options.radius = Bullet.RADIUS;
//   options.movObjTyp = "Bullet";
//   MovingObject.call(this, options);
// }

// Bullet.RADIUS = 2;
// Bullet.SPEED = 25;

// Util.inherits(Bullet, MovingObject);

// Bullet.prototype.isWrappable = false;

// module.exports = Bullet;