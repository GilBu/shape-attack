const Util = require("./util");

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

class MovingObject {
  constructor(options) {
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
    this.isWrappable = true;
  }

  collideWith(otherObject) {}

  draw(ctx) {
    ctx.fillStyle = this.color;
    if (this.movObjTyp == "Player") {
      ctx.save();

      ctx.translate(this.pos[0], this.pos[1]);

      ctx.rotate(this.newAngle);

      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.strokeStyle = this.color;
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.arc(0, 0, 12, Math.PI / 4, 1.74 * Math.PI);
      ctx.stroke();
      ctx.restore();
    } else if (this.movObjTyp == "Enemy") {
      ctx.beginPath();
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.strokeStyle = this.color;
      ctx.arc(this.pos[0], this.pos[1], 15, 0, 2 * Math.PI, true);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
      ctx.fill();
    }
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < this.radius + otherObject.radius;
  }

  move(timeDelta) {
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
  }

  remove() {
    this.game.remove(this);
  }
}


export default MovingObject;