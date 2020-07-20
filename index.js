let canvas, ctx, width, height;

let keyboard = { up: false, down: false, left: false, right: false };
var mouse = { x: 0, y: 0, pressed: false };

document.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 87: keyboard.up = true; break;
    case 83: keyboard.down = true; break;
    case 65: keyboard.left = true; break;
    case 68: keyboard.right = true; break;
  }
});

document.addEventListener('keyup', function (event) {
  switch (event.keyCode) {
    case 87: keyboard.up = false; break;
    case 83: keyboard.down = false; break;
    case 65: keyboard.left = false; break;
    case 68: keyboard.right = false; break;
  }
});

document.addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

document.addEventListener('mousedown', function (event) {
  mouse.pressed = true;
});

document.addEventListener('mouseup', function (event) {
  mouse.pressed = false;
});


function init () {
  canvas = document.getElementById('myCanvas');
  height = canvas.height;
  width = canvas.width;
  ctx = canvas.getContext('2d');

  player.x = width/2;
  player.y = height/2;
}

let tickCallback = function () {
  updateGame(0.01);
  renderGame();
  requestAnimationFrame(tickCallback);
};
requestAnimationFrame(tickCallback);

function updateGame (dt) {
  updatePlayer(dt);
}

function renderGame () {
  renderBackgroud();
  renderPlayer();
}

function renderWall (p1, p2) {
  
}

function renderBackgroud(){
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,width,height);
}