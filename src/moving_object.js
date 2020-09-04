const Util = require("./util");

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
  this.newAngle = options.newAngle;
  this.mouseDir = options.mouseDir;
  this.movObjTyp = options.movObjTyp;
  this.x = options.x;
  this.y = options.y;
}

MovingObject.prototype.collideWith = function collideWith(otherObject) {
  
};

MovingObject.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color;
  if (this.movObjTyp == "Player"){
    ctx.save();
    
    
    ctx.translate(this.pos[0], this.pos[1]);
    
    ctx.rotate(this.newAngle);
    
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(0, 0, 18, Math.PI / 4, 1.74 * Math.PI);
    ctx.stroke();
    ctx.restore();
  } else {
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
};

MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
};

MovingObject.prototype.isWrappable = true;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

MovingObject.prototype.move = function move(timeDelta, playerPos) {
  if (this.movObjTyp === "Enemy") {
    const newPost = playerPos
    const xPos = this.pos[0]
    const yPos = this.pos[1]
    newPost[0] = xPos;
    newPost[1] = yPos;
    const playerVec = Util.scale(Util.dir(newPost), 8);
    this.vel[0] = playerVec[0];
    this.vel[1] = playerVec[1];
    // debugger
  }

  if (this.movObjTyp === "Bullet") {
    // debugger
  }

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

MovingObject.prototype.remove = function remove() {
  this.game.remove(this);
};

module.exports = MovingObject;