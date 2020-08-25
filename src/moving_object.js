const Util = require("./util");

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
  this.newAngle = options.newAngle;
  this.angle = options.angle;

}

MovingObject.prototype.collideWith = function collideWith(otherObject) {
  
};

MovingObject.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();

    // ctx.save();
    // ctx.translate(this.pos[0], this.pos[1])
    // if(this.newAngle !== this.angle){
    //   ctx.rotate(this.newAngle - this.angle - 45 * Math.PI / 180);
    //   this.angle = this.newAngle

    // }
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 1.5 * Math.PI, true
    );
    // ctx.translate(-this.pos[0], -this.pos[1])
    // ctx.restore();

  ctx.fill();
};

MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
};

MovingObject.prototype.isWrappable = true;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
MovingObject.prototype.move = function move(timeDelta) {
  
  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.vel[0],
    offsetY = this.vel[1];
  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

  if (this.game.isOutOfBounds(this.pos)) {
    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.remove();
    }
  }
};

MovingObject.prototype.remove = function remove() {
  this.game.remove(this);
};

module.exports = MovingObject;