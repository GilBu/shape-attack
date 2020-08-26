const MovingObject = require("./moving_object");
const Util = require("./util");
const Bullet = require("./bullet");

function Player(options) {
  options.radius = Player.RADIUS;
  options.vel = options.vel || [0, 0];
  options.color = "blue";
  options.consSpeed = 20;

  MovingObject.call(this, options);
}

Player.RADIUS = 15;

Util.inherits(Player, MovingObject);

Player.prototype.fireBullet = function fireBullet() {

  const relVel = Util.scale(
    Util.dir(this.vel),
    Bullet.SPEED
  );

  const bulletVel = [
    relVel[0] + this.vel[0], relVel[1] + this.vel[1]
  ];

  const bullet = new Bullet({
    pos: this.pos,
    vel: bulletVel,
    color: this.color,
    game: this.game
  });

  this.game.add(bullet);
};

Player.prototype.power = function power(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Player.prototype.relocate = function relocate() {
  this.pos = [1920 / 2,
  1080 / 2];
  this.vel = [0, 0];
};

module.exports = Player;


// let player = { x: 0, y: 0, vx: 0, vy: 0, v: 0, speed: 20, newAngle: 0, angle: 0 };
// let PlayerStats = { maxV: 20 };

// function updatePlayer() {

//   if (keyboard.up) player.y -= player.speed;
//   if (keyboard.down) player.y += player.speed;
//   if (keyboard.left) player.x -= player.speed;
//   if (keyboard.right) player.x += player.speed;

//   player.newAngle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
// }

// function renderPlayer() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   renderBackgroud()

//   ctx.save();

//   ctx.beginPath();

//   ctx.lineWidth = 1;

//   ctx.translate(player.x, player.y);

//   if (player.newAngle !== player.angle) {
//     ctx.rotate(player.newAngle - player.angle - 45 * Math.PI / 180);
//   }

//   ctx.strokeStyle = "cyan";
//   ctx.shadowBlur = 30;
//   ctx.shadowColor = "blue";
//   ctx.arc(0, 0, 18, -1, 2);
//   ctx.fill();

//   ctx.stroke();
//   ctx.closePath();

//   ctx.beginPath();

//   // ctx.fillStyle = 'black';
//   // ctx.fillRect(0, 0, 20, 20);

//   ctx.closePath();
//   ctx.restore();
// }
