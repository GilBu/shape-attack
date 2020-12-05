const Util = require("./util");
import MovingObject from "./moving_object";
import Player from "./player";
import Bullet from "./bullet";

const COLOR = "red",
  RADIUS = 25,
  SPEED = 3,
  NORMAL_FRAME_TIME_DELTA = 1000 / 60;

class Enemy extends MovingObject {
  constructor(options, shape) {
    super(options)
    options = options || {};
    this.color = COLOR;
    this.pos = options.pos || options.game.randomPosition();
    this.radius = RADIUS;
    this.vel = options.vel || Util.randomVec(SPEED);
    this.movObjTyp = "Enemy";
    //pass player pos pointer in
    this.enemyType = shape || "circle";
  }

  collideWith(otherObject) {
    if (otherObject instanceof Player) {
      otherObject.relocate();
      otherObject.lives -= 1;
      this.remove();
      return true;
    } else if (otherObject instanceof Bullet) {
      this.remove();
      otherObject.remove();
      return true;
    }
    return false;
  }

  move(timeDelta, playerPos) {
    const newPost = Array.from(playerPos);
    newPost[0] -= this.pos[0];
    newPost[1] -= this.pos[1];
    const playerVec = Util.scale(Util.dir(newPost), SPEED);
    this.vel[0] = playerVec[0];
    this.vel[1] = playerVec[1];
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let offsetX = this.vel[0] * velocityScale;
    let offsetY = this.vel[1] * velocityScale;
    if (this.enemyType == "circle"){
      // offsetX = this.vel[0] * Math.cos(Math.tan(this.vel[0]/this.vel[1])) 
      // offsetY = this.vel[1] * Math.sin(Math.tan(this.vel[0]/this.vel[1]))
      offsetX = Math.sin(this.vel[0])  * velocityScale * 4;
      offsetY = Math.sin(this.vel[1])  * velocityScale * 4;
      // this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    } else if (this.enemyType == "square"){
      // this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    } else if (this.enemyType == "triangle"){
      // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // ctx.beginPath();
      // ctx.fillStyle = "rgba(0,204,142,0.5)";
      // ctx.moveTo(x,y);
      // ctx.lineTo(x + 150, y + (-180));
      // ctx.lineTo(x + 300, y);
      // ctx.scale(1,1);
      // ctx.rotate(Math.PI / 1);
      // ctx.fill();
    }
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  }
}

export default Enemy;