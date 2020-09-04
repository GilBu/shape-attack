const Enemy = require("./enemy");
const Bullet = require("./bullet");
const Player = require("./player");
const Util = require("./util");

class Game {
  constructor() {
    this.enemies = [];
    this.bullets = [];
    this.players = [];

    this.addEnemies();
  }

  BG_COLOR = "#000000";
  DIM_X = 1920;
  DIM_Y = 1080;
  FPS = 32;
  NUM_ENEMIES = 10;

  add = function add(object) {
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
  
  addEnemies = function addEnemies() {
    for (let i = 0; i < Game.NUM_ENEMIES; i++) {
      this.add(new Enemy({ game: this }));
    }
  };
  
  addPlayer = function addPlayer() {
    const player = new Player({
      pos: [Game.DIM_X / 2,
        Game.DIM_Y / 2],
      game: this
    });
  
    this.add(player);
  
    return player;
  };
  
  allObjects = function allObjects() {
    return [].concat(this.players, this.enemies, this.bullets);
  };
  
  checkCollisions = function checkCollisions() {
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

  draw = function draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };
  
  isOutOfBounds = function isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };
  
  moveObjects = function moveObjects(delta) {
    this.allObjects().forEach(function (object) {
      object.move(delta);
    });
  };
  
  randomPosition = function randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };
  
  remove = function remove(object) {
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
  
  step = function step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  };
  
  wrap = function wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  };

}



export default Game;