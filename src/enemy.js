const Util = require("./util");
const MovingObject = require("./moving_object");
const Player = require("./player");
const Bullet = require("./bullet");

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 25,
  SPEED: 3
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

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

Enemy.prototype.move = function move(timeDelta, playerPos) {
  const newPost = Array.from(playerPos)
  newPost[0] -= this.pos[0];
  newPost[1] -= this.pos[1];
  const playerVec = Util.scale(Util.dir(newPost), DEFAULTS.SPEED);
  this.vel[0] = playerVec[0];
  this.vel[1] = playerVec[1];
  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.vel[0] * velocityScale,
    offsetY = this.vel[1] * velocityScale;
  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  if (this.game.isOutOfBounds(this.pos)) {
    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.remove();
    }
  }
};


module.exports = Enemy;