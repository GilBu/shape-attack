// const Enemy = require("./enemy");
import Enemy from "./enemy";
// const Bullet = require("./bullet");
import Bullet from "./bullet";
// const Player = require("./player");
import Player from "./player";
const Util = require("./util");

// const BG_COLOR = "#000000";
// const DIM_X = 1920;
// const DIM_Y = 1080;
// const FPS = 32;
// const NUM_ENEMIES = 6;

// class Game {
//   constructor () {
//     this.enemies = [];
//     this.bullets = [];
//     this.players = [];
//     this.score = 0;
//     this.addEnemies();
//   }

//   add(object) {
//     if (object instanceof Enemy) {
//       this.enemies.push(object);
//     } else if (object instanceof Bullet) {
//       this.bullets.push(object);
//     } else if (object instanceof Player) {
//       this.players.push(object);
//     } else {
//       throw new Error("unknown type of object");
//     }
//   };
  
//   addEnemies() {
//     for (let i = 0; i < NUM_ENEMIES; i++) {
//       this.add(new Enemy({ game: this }));
//     }
//   };
  
//   addPlayer() {
//     const player = new Player({
//       pos: [DIM_X / 2,
//         DIM_Y / 2],
//       game: this
//     });
  
//     this.add(player);
  
//     return player;
//   };
  
//   allObjects() {
//     return [].concat(this.players, this.enemies, this.bullets);
//   };
  
//   checkCollisions() {
//     const allObjects = this.allObjects();
//     for (let i = 0; i < allObjects.length; i++) {
//       for (let j = 0; j < allObjects.length; j++) {
//         const obj1 = allObjects[i];
//         const obj2 = allObjects[j];
  
//         if (obj1.isCollidedWith(obj2)) {
//           const collision = obj1.collideWith(obj2);
//           if (obj1 instanceof Enemy && obj2 instanceof Bullet && collision) {
//             this.score += 10
//           }
//           if (collision) return;
//         }
//       }
//     }
//   };
  
//   draw(ctx) {
//     ctx.clearRect(0, 0, DIM_X, DIM_Y);
//     ctx.fillStyle = BG_COLOR;
//     ctx.fillRect(0, 0, DIM_X, DIM_Y);
    
//     ctx.beginPath();
//     ctx.fillStyle = "white";
//     ctx.font = 'bold 36px "Roboto Slab"';
//     ctx.textAlign = "center";
//     ctx.fillText(`Lives: ${this.players[0].lives}`, 100, 50);
//     ctx.fill();
//     ctx.closePath();
  
  
//     ctx.beginPath();
//     ctx.fillStyle = "white";
//     ctx.font = 'bold 36px "Roboto Slab"';
//     ctx.textAlign = "center";
//     ctx.fillText(`Score: ${this.score}`, 980, 50);
//     ctx.fill();
//     ctx.closePath();
  
//     this.allObjects().forEach(function (object) {
//       object.draw(ctx);
//     });
//   };
  
//   isOutOfBounds(pos) {
//     return (pos[0] < 0) || (pos[1] < 0) ||
//       (pos[0] > DIM_X) || (pos[1] > DIM_Y);
//   };
  
//   moveObjects(delta) {
//     const playerPos = this.players[0].pos;
//     this.allObjects().forEach(function (object) {
//       object.move(delta, playerPos);
//     });
//   };
  
//   randomPosition() {
//     return [
//       DIM_X * Math.random(),
//       DIM_Y * Math.random()
//     ];
//   };
  
//   remove(object) {
//     if (object instanceof Bullet) {
//       this.bullets.splice(this.bullets.indexOf(object), 1);
//     } else if (object instanceof Enemy) {
//       this.enemies.splice(this.enemies.indexOf(object), 1);
//     } else if (object instanceof Player) {
//       this.players.splice(this.players.indexOf(object), 1);
//     } else {
//       throw new Error("unknown type of object");
//     }
//   };
  
//   removeAll() {
//       this.bullets = [];
//       this.enemies = [];
//       this.players = [];
//   };
  
//   gameOver() {
//     // if (this.players[0].lives == 0) {
//       this.removeAll();
//     // }
//   }
  
//   step(delta) {
//     this.moveObjects(delta);
//     this.checkCollisions();
//     if(this.enemies.length <= 0) {
//       this.addEnemies();
//       NUM_ENEMIES += 1;
//     }
//   };
  
//   wrap(pos) {
//     return [
//       Util.wrap(pos[0], DIM_X), Util.wrap(pos[1], DIM_Y)
//     ];
//   };
// }

// export default Game;


function Game() {
  this.enemies = [];
  this.bullets = [];
  this.players = [];
  this.score = 0;
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
    pos: [Game.DIM_X / 2, Game.DIM_Y / 2],
    game: this,
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
        if (obj1 instanceof Enemy && obj2 instanceof Bullet && collision) {
          this.score += 10;
        }
        if (collision) return;
      }
    }
  }
};

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 36px "Roboto Slab"';
  ctx.textAlign = "center";
  ctx.fillText(`Lives: ${this.players[0].lives}`, 100, 50);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 36px "Roboto Slab"';
  ctx.textAlign = "center";
  ctx.fillText(`Score: ${this.score}`, 980, 50);
  ctx.fill();
  ctx.closePath();

  this.allObjects().forEach(function (object) {
    object.draw(ctx);
  });
};

Game.prototype.isOutOfBounds = function isOutOfBounds(pos) {
  return pos[0] < 0 || pos[1] < 0 || pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y;
};

Game.prototype.moveObjects = function moveObjects(delta) {
  const playerPos = this.players[0].pos;
  this.allObjects().forEach(function (object) {
    object.move(delta, playerPos);
  });
};

Game.prototype.randomPosition = function randomPosition() {
  return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
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

Game.prototype.removeAll = function removeAll() {
  this.bullets = [];
  this.enemies = [];
  this.players = [];
};

Game.prototype.gameOver = function gameOver() {
  // if (this.players[0].lives == 0) {
  this.removeAll();
  // }
};

Game.prototype.step = function step(delta) {
  this.moveObjects(delta);
  this.checkCollisions();
  if (this.enemies.length <= 0) {
    this.addEnemies();
    Game.NUM_ENEMIES += 1;
  }
};

Game.prototype.wrap = function wrap(pos) {
  return [Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)];
};

export default Game;