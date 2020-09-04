// import {player} from "./game"
// import Player from './player'
const Util = require("./util");
const MovingObject = require("./moving_object");
const Player = require("./player");
const Bullet = require("./bullet");

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 25,
  SPEED: 4
};

function Enemy(options) {
  options = options || {};
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.randomPosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
  options.movObjTyp = "Enemy";
  MovingObject.call(this, options);
}

Util.inherits(Enemy, MovingObject);

Enemy.prototype.collideWith = function collideWith(otherObject) {
  if (otherObject instanceof Player) {
    otherObject.relocate();
    return true;
  } else if (otherObject instanceof Bullet) {
    this.remove();
    otherObject.remove();
    return true;
  }
  return false;
};


module.exports = Enemy;