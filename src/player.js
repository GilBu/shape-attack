import MovingObject from "./moving_object";
const Util = require("./util");
import Bullet from "./bullet";

const RADIUS = 15;

class Player extends MovingObject {
  constructor(options) {
    super(options);
    this.radius = RADIUS;
    this.vel = options.vel || [0, 0];
    this.mouseDir = options.mouseDir || [0, 0];
    this.color = "cyan";
    this.consSpeed = 20;
    this.movObjTyp = "Player";
    this.laserSound = new Audio("./assets/sounds/laser1.wav");
    this.cooldown = false;
    this.lives = 3;
    this.score = 0;
    this.multiplier = 1;
  }
  
  sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
      this.sound.play();
    };
    this.stop = function () {
      this.sound.pause();
    };
  }
  
  fireBullet() {
    if (this.cooldown == false) {
      let x = 0;
      let y = 0;
  
      if (
        Math.abs(this.mouseDir[0] - this.pos[0]) >
        Math.abs(this.mouseDir[1] - this.pos[1])
      ) {
        x =
          (this.mouseDir[0] - this.pos[0]) /
          Math.abs(this.mouseDir[1] - this.pos[1]);
        y =
          (this.mouseDir[1] - this.pos[1]) /
          Math.abs(this.mouseDir[1] - this.pos[1]);
      } else {
        x =
          (this.mouseDir[0] - this.pos[0]) /
          Math.abs(this.mouseDir[0] - this.pos[0]);
        y =
          (this.mouseDir[1] - this.pos[1]) /
          Math.abs(this.mouseDir[0] - this.pos[0]);
      }

  
      const relVel = Util.scale(Util.dir([x, y]), Bullet.SPEED);
  
      const bulletVel = [relVel[0] + x, relVel[1] + y];
  
      const bullet = new Bullet({
        pos: this.pos,
        vel: bulletVel,
        mouseDir: this.mouseDir,
        color: this.color,
        game: this.game,
      });
  
      this.game.add(bullet);
  
      this.laserSound.play();
      this.cooldown = true;
      setTimeout(() => (this.cooldown = false), 300);
    }
  }
  
  power(impulse) {
    this.mouseDir[0] = impulse[0];
    this.mouseDir[1] = impulse[1];
  }
  
  relocate() {
    this.pos = [1920 / 2, 1080 / 2];
    this.vel = [0, 0];
  }
}


export default Player;