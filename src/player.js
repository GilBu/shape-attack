const MovingObject = require("./moving_object");
import MovingObject from "./moving_object";
const Util = require("./util");
const Bullet = require("./bullet");

function Player(options) {
  options.radius = Player.RADIUS;
  options.vel = options.vel || [0, 0];
  options.mouseDir = options.mouseDir || [0, 0];
  options.color = "cyan";
  options.consSpeed = 20;
  options.movObjTyp = "Player";
  this.laserSound = new Audio("./assets/sounds/laser1.wav");
  this.cooldown = false;
  this.lives = 3;
  this.score = 0;
  MovingObject.call(this, options);
}

Player.RADIUS = 15;

Util.inherits(Player, MovingObject);

Player.prototype.sound = function sound(src) {
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

Player.prototype.fireBullet = function fireBullet() {

  if (this.cooldown == false) {
    let x = 0;
    let y = 0;
    
    if (Math.abs(this.mouseDir[0] - this.pos[0]) > Math.abs(this.mouseDir[1] - this.pos[1]) ){
      x = (this.mouseDir[0] - this.pos[0]) / Math.abs(this.mouseDir[1] - this.pos[1]);
      y = (this.mouseDir[1] - this.pos[1]) / Math.abs(this.mouseDir[1] - this.pos[1]);
    } else {
      x = (this.mouseDir[0] - this.pos[0]) / Math.abs(this.mouseDir[0] - this.pos[0]);
      y = (this.mouseDir[1] - this.pos[1]) / Math.abs(this.mouseDir[0] - this.pos[0]);
    }
    
    const relVel = Util.scale(
      Util.dir([x,y]),
      Bullet.SPEED
    );
  
    const bulletVel = [
      relVel[0] + x, relVel[1] + y
    ];
  
    const bullet = new Bullet({
      pos: this.pos,
      vel: bulletVel,
      mouseDir: this.mouseDir,
      color: this.color,
      game: this.game
    });
    
    this.game.add(bullet);
  
    this.laserSound.play();
    this.cooldown = true;
    setTimeout(() => (this.cooldown = false), 300);
  }
};

Player.prototype.power = function power(impulse) {
  // this.vel[0] += impulse[0];
  // this.vel[1] += impulse[1];
  this.mouseDir[0] = impulse[0];
  this.mouseDir[1] = impulse[1];
};

Player.prototype.relocate = function relocate() {
  this.pos = [1920 / 2,
  1080 / 2];
  this.vel = [0, 0]; 
};

module.exports = Player;