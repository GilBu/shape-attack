const Enemy = require("./enemy");
const Bullet = require("./bullet");
const Player = require("./player");
const Util = require("./util");

function Game() {
  this.enemies = [];
  this.bullets = [];
  this.players = [];

  this.addEnemies();
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1920;
Game.DIM_Y = 1080;
Game.FPS = 32;
Game.NUM_ENEMIES = 6;

Game.prototype.add = function add(object) {
  if (object instanceof Enemy) {
    this.enemies.push(object);
  } else if (object instanceof Bullet) {
    this.bullets.push(object);
  } else if (object instanceof Player) {
    this.players.push(object);
  } else {
    throw new Error("unknown type of object");
  }
};

Game.prototype.addEnemies = function addEnemies() {
  for (let i = 0; i < Game.NUM_ENEMIES; i++) {
    this.add(new Enemy({ game: this }));
  }
};

Game.prototype.addPlayer = function addPlayer() {
  const player = new Player({
    pos: [Game.DIM_X / 2,
      Game.DIM_Y / 2],
    game: this
  });

  this.add(player);

  return player;
};

Game.prototype.allObjects = function allObjects() {
  return [].concat(this.players, this.enemies, this.bullets);
};

Game.prototype.checkCollisions = function checkCollisions() {
  const allObjects = this.allObjects();
  for (let i = 0; i < allObjects.length; i++) {
    for (let j = 0; j < allObjects.length; j++) {
      const obj1 = allObjects[i];
      const obj2 = allObjects[j];

      if (obj1.isCollidedWith(obj2)) {
        const collision = obj1.collideWith(obj2);
        if (collision) return;
      }
    }
  }
};

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function (object) {
    object.draw(ctx);
  });
};

Game.prototype.isOutOfBounds = function isOutOfBounds(pos) {
  return (pos[0] < 0) || (pos[1] < 0) ||
    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
};

Game.prototype.moveObjects = function moveObjects(delta) {
  const playerPos = this.players[0].pos;
  this.allObjects().forEach(function (object) {
    object.move(delta, playerPos);
  });
};

Game.prototype.randomPosition = function randomPosition() {
  return [
    Game.DIM_X * Math.random(),
    Game.DIM_Y * Math.random()
  ];
};

Game.prototype.remove = function remove(object) {
  if (object instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(object), 1);
  } else if (object instanceof Enemy) {
    this.enemies.splice(this.enemies.indexOf(object), 1);
  } else if (object instanceof Player) {
    this.players.splice(this.players.indexOf(object), 1);
  } else {
    throw new Error("unknown type of object");
  }
};

Game.prototype.step = function step(delta) {
  this.moveObjects(delta);
  this.checkCollisions();
  if(this.enemies.length <= 0) {
    this.addEnemies();
    Game.NUM_ENEMIES += 1;
  }
};

Game.prototype.wrap = function wrap(pos) {
  return [
    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
  ];
};

module.exports = Game;