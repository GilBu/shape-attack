/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nfunction Bullet(options) {\n  options.radius = Bullet.RADIUS;\n  options.movObjTyp = \"Bullet\";\n  MovingObject.call(this, options);\n}\n\nBullet.RADIUS = 2;\nBullet.SPEED = 25;\n\nUtil.inherits(Bullet, MovingObject);\n\nBullet.prototype.isWrappable = false;\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// import {player} from \"./game\"\n// import Player from './player'\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nconst DEFAULTS = {\n  COLOR: \"#505050\",\n  RADIUS: 25,\n  SPEED: 4\n};\n\nfunction Enemy(options) {\n  options = options || {};\n  options.color = DEFAULTS.COLOR;\n  options.pos = options.pos || options.game.randomPosition();\n  options.radius = DEFAULTS.RADIUS;\n  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);\n  options.movObjTyp = \"Enemy\";\n  MovingObject.call(this, options);\n}\n\nUtil.inherits(Enemy, MovingObject);\n\nEnemy.prototype.collideWith = function collideWith(otherObject) {\n  if (otherObject instanceof Player) {\n    otherObject.relocate();\n    return true;\n  } else if (otherObject instanceof Bullet) {\n    this.remove();\n    otherObject.remove();\n    return true;\n  }\n  return false;\n};\n\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction Game() {\n  this.enemies = [];\n  this.bullets = [];\n  this.players = [];\n\n  this.addEnemies();\n}\n\nGame.BG_COLOR = \"#000000\";\nGame.DIM_X = 1920;\nGame.DIM_Y = 1080;\nGame.FPS = 32;\nGame.NUM_ENEMIES = 2;\n\nGame.prototype.add = function add(object) {\n  if (object instanceof Enemy) {\n    this.enemies.push(object);\n  } else if (object instanceof Bullet) {\n    this.bullets.push(object);\n  } else if (object instanceof Player) {\n    this.players.push(object);\n  } else {\n    throw new Error(\"unknown type of object\");\n  }\n};\n\nGame.prototype.addEnemies = function addEnemies() {\n  for (let i = 0; i < Game.NUM_ENEMIES; i++) {\n    this.add(new Enemy({ game: this }));\n  }\n};\n\nGame.prototype.addPlayer = function addPlayer() {\n  const player = new Player({\n    pos: [Game.DIM_X / 2,\n      Game.DIM_Y / 2],\n    game: this\n  });\n\n  this.add(player);\n\n  return player;\n};\n\nGame.prototype.allObjects = function allObjects() {\n  return [].concat(this.players, this.enemies, this.bullets);\n};\n\nGame.prototype.checkCollisions = function checkCollisions() {\n  const allObjects = this.allObjects();\n  for (let i = 0; i < allObjects.length; i++) {\n    for (let j = 0; j < allObjects.length; j++) {\n      const obj1 = allObjects[i];\n      const obj2 = allObjects[j];\n\n      if (obj1.isCollidedWith(obj2)) {\n        const collision = obj1.collideWith(obj2);\n        if (collision) return;\n      }\n    }\n  }\n};\n\nGame.prototype.draw = function draw(ctx) {\n  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  ctx.fillStyle = Game.BG_COLOR;\n  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n\n  this.allObjects().forEach(function (object) {\n    object.draw(ctx);\n  });\n};\n\nGame.prototype.isOutOfBounds = function isOutOfBounds(pos) {\n  return (pos[0] < 0) || (pos[1] < 0) ||\n    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);\n};\n\nGame.prototype.moveObjects = function moveObjects(delta) {\n  const pos = this.players[0].pos;\n  this.allObjects().forEach(function (object) {\n    object.move(delta, pos);\n  });\n};\n\nGame.prototype.randomPosition = function randomPosition() {\n  return [\n    Game.DIM_X * Math.random(),\n    Game.DIM_Y * Math.random()\n  ];\n};\n\nGame.prototype.remove = function remove(object) {\n  if (object instanceof Bullet) {\n    this.bullets.splice(this.bullets.indexOf(object), 1);\n  } else if (object instanceof Enemy) {\n    this.enemies.splice(this.enemies.indexOf(object), 1);\n  } else if (object instanceof Player) {\n    this.players.splice(this.players.indexOf(object), 1);\n  } else {\n    throw new Error(\"unknown type of object\");\n  }\n};\n\nGame.prototype.step = function step(delta) {\n  this.moveObjects(delta);\n  this.checkCollisions();\n};\n\nGame.prototype.wrap = function wrap(pos) {\n  return [\n    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)\n  ];\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView(game, ctx) {\n  this.ctx = ctx;\n  this.game = game;\n  this.player = this.game.addPlayer();\n}\n\nlet keyboard = { up: false, down: false, left: false, right: false };\nlet mouse = { x: 0, y: 0, pressed: false };\n\ndocument.addEventListener('keydown', function (event) {\n  switch (event.keyCode) {\n    case 87: keyboard.up = true; break;\n    case 83: keyboard.down = true; break;\n    case 65: keyboard.left = true; break;\n    case 68: keyboard.right = true; break;\n  }\n});\n\ndocument.addEventListener('keyup', function (event) {\n  switch (event.keyCode) {\n    case 87: keyboard.up = false; break;\n    case 83: keyboard.down = false; break;\n    case 65: keyboard.left = false; break;\n    case 68: keyboard.right = false; break;\n  }\n});\n\ndocument.addEventListener('mousemove', function (event) {\n  mouse.x = event.clientX;\n  mouse.y = event.clientY;\n});\n\ndocument.addEventListener('mousedown', function (event) {\n  mouse.pressed = true;\n});\n\ndocument.addEventListener('mouseup', function (event) {\n  mouse.pressed = false;\n});\n\nGameView.prototype.bindKeyHandlers = function bindKeyHandlers() {\n  const player = this.player;\n  const mouseDir = [mouse.x, mouse.y];\n  player.consSpeed = 20;\n  if (keyboard.up) player.pos[1] -= player.consSpeed;\n  if (keyboard.down) player.pos[1] += player.consSpeed;\n  if (keyboard.left) player.pos[0] -= player.consSpeed;\n  if (keyboard.right) player.pos[0] += player.consSpeed;\n  player.newAngle = Math.atan2(mouse.y - player.pos[1], mouse.x - player.pos[0]);\n  \n  if (mouse.pressed == true) {\n    player.fireBullet();\n    player.power(mouseDir);\n  }\n};\n\nGameView.prototype.start = function start() {\n  this.bindKeyHandlers();\n  this.lastTime = 0;\n  requestAnimationFrame(this.animate.bind(this));\n};\n\nGameView.prototype.animate = function animate(time) {\n  const timeDelta = time - this.lastTime;\n  this.bindKeyHandlers();\n  this.game.step(timeDelta);\n  this.game.draw(this.ctx);\n  this.lastTime = time;\n\n  requestAnimationFrame(this.animate.bind(this));\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_game__WEBPACK_IMPORTED_MODULE_0__);\n\n// const Game = require(\"./game\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  canvasEl.width = _game__WEBPACK_IMPORTED_MODULE_0___default.a.DIM_X;\n  canvasEl.height = _game__WEBPACK_IMPORTED_MODULE_0___default.a.DIM_Y;\n\n  const ctx = canvasEl.getContext(\"2d\");\n  const game = new _game__WEBPACK_IMPORTED_MODULE_0___default.a();\n  new GameView(game, ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction MovingObject(options) {\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.game = options.game;\n  this.newAngle = options.newAngle;\n  this.mouseDir = options.mouseDir;\n  this.movObjTyp = options.movObjTyp;\n  this.x = options.x;\n  this.y = options.y;\n}\n\nMovingObject.prototype.collideWith = function collideWith(otherObject) {\n  \n};\n\nMovingObject.prototype.draw = function draw(ctx) {\n  ctx.fillStyle = this.color;\n  if (this.movObjTyp == \"Player\"){\n    ctx.save();\n    \n    \n    ctx.translate(this.pos[0], this.pos[1]);\n    \n    ctx.rotate(this.newAngle);\n    \n    ctx.shadowBlur = 10;\n    ctx.shadowColor = this.color;\n    ctx.strokeStyle = this.color;\n    ctx.beginPath();\n    ctx.lineWidth = 1;\n    ctx.arc(0, 0, 18, Math.PI / 4, 1.74 * Math.PI);\n    ctx.stroke();\n    ctx.restore();\n  } else {\n    ctx.beginPath();\n    ctx.arc(\n      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n  }\n};\n\nMovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {\n  const centerDist = Util.dist(this.pos, otherObject.pos);\n  return centerDist < (this.radius + otherObject.radius);\n};\n\nMovingObject.prototype.isWrappable = true;\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nMovingObject.prototype.move = function move(timeDelta, playerPos) {\n  if (this.movObjTyp === \"Enemy\") {\n    const newPost = playerPos\n    const xPos = this.pos[0]\n    const yPos = this.pos[1]\n    newPost[0] = xPos;\n    newPost[1] = yPos;\n    const playerVec = Util.scale(Util.dir(newPost), 8);\n    this.vel[0] = playerVec[0];\n    this.vel[1] = playerVec[1];\n    // debugger\n  }\n\n  if (this.movObjTyp === \"Bullet\") {\n    // debugger\n  }\n\n  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n    offsetX = this.vel[0] * velocityScale,\n    offsetY = this.vel[1] * velocityScale;\n  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n  if (this.game.isOutOfBounds(this.pos)) {\n    if (this.isWrappable) {\n      this.pos = this.game.wrap(this.pos);\n    } else {\n      this.remove();\n    }\n  }\n};\n\nMovingObject.prototype.remove = function remove() {\n  this.game.remove(this);\n};\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nfunction Player(options) {\n  options.radius = Player.RADIUS;\n  options.vel = options.vel || [0, 0];\n  options.mouseDir = options.mouseDir || [0, 0];\n  options.color = \"cyan\";\n  options.consSpeed = 20;\n  options.movObjTyp = \"Player\";\n  MovingObject.call(this, options);\n}\n\nPlayer.RADIUS = 15;\n\nUtil.inherits(Player, MovingObject);\n\nPlayer.prototype.fireBullet = function fireBullet() {\n  // const norm = Util.norm(this.mouseDir);\n  // if (norm === 0) {\n  //   // Can't fire unless moving.\n  //   return;\n  // }\n  \n  let x = 0;\n  let y = 0;\n  \n  if (Math.abs(this.mouseDir[0] - this.pos[0]) > Math.abs(this.mouseDir[1] - this.pos[1]) ){\n    x = (this.mouseDir[0] - this.pos[0]) / Math.abs(this.mouseDir[1] - this.pos[1]);\n    y = (this.mouseDir[1] - this.pos[1]) / Math.abs(this.mouseDir[1] - this.pos[1]);\n  } else {\n    x = (this.mouseDir[0] - this.pos[0]) / Math.abs(this.mouseDir[0] - this.pos[0]);\n    y = (this.mouseDir[1] - this.pos[1]) / Math.abs(this.mouseDir[0] - this.pos[0]);\n  }\n  \n  const relVel = Util.scale(\n    Util.dir([x,y]),\n    Bullet.SPEED\n  );\n\n  const bulletVel = [\n    relVel[0] + x, relVel[1] + y\n    // relVel[0] + this.vel[0], relVel[1] + this.vel[1]\n  ];\n\n  const bullet = new Bullet({\n    pos: this.pos,\n    vel: bulletVel,\n    mouseDir: this.mouseDir,\n    color: this.color,\n    game: this.game\n  });\n  this.game.add(bullet);\n};\n\nPlayer.prototype.power = function power(impulse) {\n  // this.vel[0] += impulse[0];\n  // this.vel[1] += impulse[1];\n  this.mouseDir[0] = impulse[0];\n  this.mouseDir[1] = impulse[1];\n};\n\nPlayer.prototype.relocate = function relocate() {\n  this.pos = [1920 / 2,\n  1080 / 2];\n  this.vel = [0, 0];\n};\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n\n  dir(vec) {\n    const norm = Util.norm(vec);\n    return Util.scale(vec, 1 / norm);\n  },\n  \n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n  \n  norm(vec) {\n    return Util.dist([0, 0], vec);\n  },\n  \n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n  inherits(ChildClass, BaseClass) {\n    ChildClass.prototype = Object.create(BaseClass.prototype);\n    ChildClass.prototype.constructor = ChildClass;\n  },\n\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - (coord % max);\n    } else if (coord > max) {\n      return coord % max;\n    } else {\n      return coord;\n    }\n  }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });