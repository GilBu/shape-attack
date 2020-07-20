let player = { x: 0, y: 0, vx: 0, vy: 0, v: 0, speed: 20, newAngle: 0, angle: 0 };
let PlayerStats = { maxV: 20 };

function updatePlayer(dt) {

  if (keyboard.up) player.y -= player.speed;
  if (keyboard.down) player.y += player.speed;
  if (keyboard.left) player.x -= player.speed;
  if (keyboard.right) player.x += player.speed;

  player.newAngle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
}

function renderPlayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderBackgroud()

  ctx.save();

  ctx.beginPath();

  ctx.lineWidth = 1;

  ctx.translate(player.x, player.y);

  if (player.newAngle !== player.angle) {
    ctx.rotate(player.newAngle - player.angle - 45 * Math.PI / 180);
  }

  ctx.strokeStyle = "cyan";
  ctx.shadowBlur = 30;
  ctx.shadowColor = "blue";
  ctx.arc(0, 0, 18, -1, 2);
  ctx.fill();

  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();

  // ctx.fillStyle = 'black';
  // ctx.fillRect(0, 0, 20, 20);

  ctx.closePath();
  ctx.restore();
}
