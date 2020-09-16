const MovingObject = require("./moving_object");
const Util = require("./util");
const Bullet = require("./bullet");

function Player(options) {
  options.radius = Player.RADIUS;
  options.vel = options.vel || [0, 0];
  options.mouseDir = options.mouseDir || [0, 0];
  options.color = "cyan";
  options.consSpeed = 20;
  options.movObjTyp = "Player";
  MovingObject.call(this, options);
}

Player.RADIUS = 15;

Util.inherits(Player, MovingObject);

Player.prototype.fireBullet = function fireBullet() {

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