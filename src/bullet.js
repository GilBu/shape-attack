const Util = require("./util");
import MovingObject from "./moving_object";

class Bullet extends MovingObject {
  constructor(options) {
    super(options);
    this.radius = RADIUS;
    this.movObjTyp = "Bullet";
    this.isWrappable = false;
  }
  static get SPEED() {
    return 25;
  }
}

const RADIUS = 2;

export default Bullet;