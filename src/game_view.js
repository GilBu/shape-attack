function GameView(game, ctx, canvasEl, page) {
  this.ctx = ctx;
  this.game = game;
  this.player = this.game.addPlayer();
  this.canvasEl = canvasEl;
  this.page = page;
}

let keyboard = { up: false, down: false, left: false, right: false };
let mouse = { x: 0, y: 0, pressed: false };

document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 87:
      keyboard.up = true;
      break;
    case 83:
      keyboard.down = true;
      break;
    case 65:
      keyboard.left = true;
      break;
    case 68:
      keyboard.right = true;
      break;
  }
});

document.addEventListener("keyup", function (event) {
  switch (event.keyCode) {
    case 87:
      keyboard.up = false;
      break;
    case 83:
      keyboard.down = false;
      break;
    case 65:
      keyboard.left = false;
      break;
    case 68:
      keyboard.right = false;
      break;
  }
});

document.addEventListener("mousemove", function (event) {
  const canvas = document.getElementById("canvas");
  const rect = canvas.getBoundingClientRect();

  window.addEventListener("resize", () => {
    rect = canvas.getBoundingClientRect();
  });

  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
});

document.addEventListener("mousedown", function (event) {
  mouse.pressed = true;
});

document.addEventListener("mouseup", function (event) {
  mouse.pressed = false;
});

GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
  const player = this.player;
  const mouseDir = [mouse.x, mouse.y];
  player.consSpeed = 10;
  if (keyboard.up) player.pos[1] -= player.consSpeed;
  if (keyboard.down) player.pos[1] += player.consSpeed;
  if (keyboard.left) player.pos[0] -= player.consSpeed;
  if (keyboard.right) player.pos[0] += player.consSpeed;
  player.newAngle = Math.atan2(
    mouse.y - player.pos[1],
    mouse.x - player.pos[0]
  );

  if (mouse.pressed == true) {
    player.fireBullet();
    player.power(mouseDir);
  }
};

GameView.prototype.animateGame = function animateGame(time) {
  let timeDelta = time - this.lastTime;
  this.bindKeyHandlers();
  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  requestAnimationFrame(this.animateGame.bind(this));
};

GameView.prototype.start = function start(e) {
  if (e.keyCode === 13 || e.button === 0) {
    console.log('start Called')
    this.canvasEl.removeEventListener("click", this.start);
    this.page.removeEventListener("keydown", this.start);
  this.lastTime = 0;
  requestAnimationFrame(this.animateGame.bind(this));
  } 
};


module.exports = GameView;