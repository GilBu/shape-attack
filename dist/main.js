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

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nconst DEFAULTS = {\n  COLOR: \"red\",\n  RADIUS: 25,\n  SPEED: 3\n};\n\nfunction Enemy(options) {\n  options = options || {};\n  options.color = DEFAULTS.COLOR;\n  options.pos = options.pos || options.game.randomPosition();\n  options.radius = DEFAULTS.RADIUS;\n  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);\n  options.movObjTyp = \"Enemy\";\n  MovingObject.call(this, options);\n}\n\nUtil.inherits(Enemy, MovingObject);\n\nEnemy.prototype.collideWith = function collideWith(otherObject) {\n  if (otherObject instanceof Player) {\n    otherObject.relocate();\n    otherObject.lives -= 1;\n    this.remove();\n    return true;\n  } else if (otherObject instanceof Bullet) {\n    this.remove();\n    otherObject.remove();\n    return true;\n  }\n  return false;\n};\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nEnemy.prototype.move = function move(timeDelta, playerPos) {\n  const newPost = Array.from(playerPos)\n  newPost[0] -= this.pos[0];\n  newPost[1] -= this.pos[1];\n  const playerVec = Util.scale(Util.dir(newPost), DEFAULTS.SPEED);\n  this.vel[0] = playerVec[0];\n  this.vel[1] = playerVec[1];\n  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n    offsetX = this.vel[0] * velocityScale,\n    offsetY = this.vel[1] * velocityScale;\n  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n  if (this.game.isOutOfBounds(this.pos)) {\n    if (this.isWrappable) {\n      this.pos = this.game.wrap(this.pos);\n    } else {\n      this.remove();\n    }\n  }\n};\n\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction Game() {\n  this.enemies = [];\n  this.bullets = [];\n  this.players = [];\n  this.score = 0;\n  this.addEnemies();\n}\n\nGame.BG_COLOR = \"#000000\";\nGame.DIM_X = 1920;\nGame.DIM_Y = 1080;\nGame.FPS = 32;\nGame.NUM_ENEMIES = 6;\n\nGame.prototype.add = function add(object) {\n  if (object instanceof Enemy) {\n    this.enemies.push(object);\n  } else if (object instanceof Bullet) {\n    this.bullets.push(object);\n  } else if (object instanceof Player) {\n    this.players.push(object);\n  } else {\n    throw new Error(\"unknown type of object\");\n  }\n};\n\nGame.prototype.addEnemies = function addEnemies() {\n  for (let i = 0; i < Game.NUM_ENEMIES; i++) {\n    this.add(new Enemy({ game: this }));\n  }\n};\n\nGame.prototype.addPlayer = function addPlayer() {\n  const player = new Player({\n    pos: [Game.DIM_X / 2,\n      Game.DIM_Y / 2],\n    game: this\n  });\n\n  this.add(player);\n\n  return player;\n};\n\nGame.prototype.allObjects = function allObjects() {\n  return [].concat(this.players, this.enemies, this.bullets);\n};\n\nGame.prototype.checkCollisions = function checkCollisions() {\n  const allObjects = this.allObjects();\n  for (let i = 0; i < allObjects.length; i++) {\n    for (let j = 0; j < allObjects.length; j++) {\n      const obj1 = allObjects[i];\n      const obj2 = allObjects[j];\n\n      if (obj1.isCollidedWith(obj2)) {\n        const collision = obj1.collideWith(obj2);\n        if (collision) return;\n      }\n    }\n  }\n};\n\nGame.prototype.draw = function draw(ctx) {\n  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  ctx.fillStyle = Game.BG_COLOR;\n  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  \n  ctx.beginPath();\n  ctx.fillStyle = \"white\";\n  ctx.font = 'bold 36px \"Roboto Slab\"';\n  ctx.textAlign = \"center\";\n  ctx.fillText(`Lives: ${this.players[0].lives}`, 100, 50);\n  ctx.fill();\n  ctx.closePath();\n\n  this.allObjects().forEach(function (object) {\n    object.draw(ctx);\n  });\n};\n\nGame.prototype.isOutOfBounds = function isOutOfBounds(pos) {\n  return (pos[0] < 0) || (pos[1] < 0) ||\n    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);\n};\n\nGame.prototype.moveObjects = function moveObjects(delta) {\n  const playerPos = this.players[0].pos;\n  this.allObjects().forEach(function (object) {\n    object.move(delta, playerPos);\n  });\n};\n\nGame.prototype.randomPosition = function randomPosition() {\n  return [\n    Game.DIM_X * Math.random(),\n    Game.DIM_Y * Math.random()\n  ];\n};\n\nGame.prototype.remove = function remove(object) {\n  if (object instanceof Bullet) {\n    this.bullets.splice(this.bullets.indexOf(object), 1);\n  } else if (object instanceof Enemy) {\n    this.enemies.splice(this.enemies.indexOf(object), 1);\n  } else if (object instanceof Player) {\n    this.players.splice(this.players.indexOf(object), 1);\n  } else {\n    throw new Error(\"unknown type of object\");\n  }\n};\n\nGame.prototype.removeAll = function removeAll() {\n    this.bullets = [];\n    this.enemies = [];\n    this.players = [];\n};\n\nGame.prototype.gameOver = function gameOver() {\n  if (this.players[0].lives == 0) {\n    this.removeAll();\n    console.log(\"hi\")\n  }\n}\n\nGame.prototype.step = function step(delta) {\n  this.moveObjects(delta);\n  this.checkCollisions();\n  this.gameOver();\n  if(this.enemies.length <= 0) {\n    this.addEnemies();\n    Game.NUM_ENEMIES += 1;\n  }\n};\n\nGame.prototype.wrap = function wrap(pos) {\n  return [\n    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)\n  ];\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView(game, ctx, canvasEl, page) {\n  this.ctx = ctx;\n  this.game = game;\n  this.player = this.game.addPlayer();\n  this.canvasEl = canvasEl;\n  this.page = page;\n}\n\nlet keyboard = { up: false, down: false, left: false, right: false };\nlet mouse = { x: 0, y: 0, pressed: false };\n\ndocument.addEventListener(\"keydown\", function (event) {\n  switch (event.keyCode) {\n    case 87:\n      keyboard.up = true;\n      break;\n    case 83:\n      keyboard.down = true;\n      break;\n    case 65:\n      keyboard.left = true;\n      break;\n    case 68:\n      keyboard.right = true;\n      break;\n  }\n});\n\ndocument.addEventListener(\"keyup\", function (event) {\n  switch (event.keyCode) {\n    case 87:\n      keyboard.up = false;\n      break;\n    case 83:\n      keyboard.down = false;\n      break;\n    case 65:\n      keyboard.left = false;\n      break;\n    case 68:\n      keyboard.right = false;\n      break;\n  }\n});\n\ndocument.addEventListener(\"mousemove\", function (event) {\n  const canvas = document.getElementById(\"canvas\");\n  const rect = canvas.getBoundingClientRect();\n\n  // window.addEventListener(\"resize\", () => {\n  //   rect = canvas.getBoundingClientRect();\n  // });\n\n  mouse.x = event.clientX - rect.left;\n  mouse.y = event.clientY - rect.top;\n});\n\ndocument.addEventListener(\"mousedown\", function (event) {\n  mouse.pressed = true;\n});\n\ndocument.addEventListener(\"mouseup\", function (event) {\n  mouse.pressed = false;\n});\n\nGameView.prototype.bindKeyHandlers = function bindKeyHandlers() {\n  const player = this.player;\n  const mouseDir = [mouse.x, mouse.y];\n  player.consSpeed = 10;\n  if (keyboard.up) player.pos[1] -= player.consSpeed;\n  if (keyboard.down) player.pos[1] += player.consSpeed;\n  if (keyboard.left) player.pos[0] -= player.consSpeed;\n  if (keyboard.right) player.pos[0] += player.consSpeed;\n  player.newAngle = Math.atan2(\n    mouse.y - player.pos[1],\n    mouse.x - player.pos[0]\n  );\n\n  if (mouse.pressed == true) {\n    player.fireBullet();\n    player.power(mouseDir);\n  }\n};\n\nGameView.prototype.animateGame = function animateGame(time) {\n  let timeDelta = time - this.lastTime;\n  this.bindKeyHandlers();\n  this.game.step(timeDelta);\n  this.game.draw(this.ctx);\n  this.lastTime = time;\n\n  requestAnimationFrame(this.animateGame.bind(this));\n};\n\nGameView.prototype.start = function start(e) {\n  if (e.keyCode === 13 || e.button === 0) {\n    this.canvasEl.removeEventListener(\"click\", this.start);\n    this.page.removeEventListener(\"keydown\", this.start);\n  this.lastTime = 0;\n  requestAnimationFrame(this.animateGame.bind(this));\n  }\n};\n\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_game__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_game_view__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./title */ \"./src/title.js\");\n\n\n\n// const GameView = require(\"./game_view\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const page = document.getElementById(\"page\");\n  const canvasEl = document.getElementById(\"canvas\");\n  // const startScreen = document.getElementById(\"start-screen\")\n  // const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  canvasEl.width = _game__WEBPACK_IMPORTED_MODULE_0___default.a.DIM_X;\n  canvasEl.height = _game__WEBPACK_IMPORTED_MODULE_0___default.a.DIM_Y;\n  const ctx = canvasEl.getContext(\"2d\");\n  const game = new _game__WEBPACK_IMPORTED_MODULE_0___default.a();\n  const gameView = new _game_view__WEBPACK_IMPORTED_MODULE_1___default.a(game, ctx, canvasEl, page)\n  const title = new _title__WEBPACK_IMPORTED_MODULE_2__[\"default\"](ctx, canvasEl);\n  title.drawStartClick();\n  const clickHandler = (e) => {\n    gameView.start(e);\n    canvasEl.removeEventListener(\"click\", clickHandler);\n  }\n\n  const keydownHandler = (e) => {\n    gameView.start(e);\n    if (e.keyCode === 13){\n      page.removeEventListener(\"keydown\", keydownHandler);\n    }\n  };\n\n  canvasEl.addEventListener(\"click\", clickHandler);\n  page.addEventListener(\"keydown\", keydownHandler);\n  // gameView.start();\n  title.drawTitle();\n  // new GameView(game, ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction MovingObject(options) {\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.game = options.game;\n  this.newAngle = options.newAngle;\n  this.mouseDir = options.mouseDir;\n  this.movObjTyp = options.movObjTyp;\n  this.x = options.x;\n  this.y = options.y;\n}\n\nMovingObject.prototype.collideWith = function collideWith(otherObject) {\n  \n};\n\nMovingObject.prototype.draw = function draw(ctx) {\n  ctx.fillStyle = this.color;\n  if (this.movObjTyp == \"Player\"){\n    ctx.save();\n    \n    \n    ctx.translate(this.pos[0], this.pos[1]);\n    \n    ctx.rotate(this.newAngle);\n    \n    ctx.shadowBlur = 10;\n    ctx.shadowColor = this.color;\n    ctx.strokeStyle = this.color;\n    ctx.beginPath();\n    ctx.lineWidth = 1;\n    ctx.arc(0, 0, 18, Math.PI / 4, 1.74 * Math.PI);\n    ctx.stroke();\n    ctx.restore();\n  } else if(this.movObjTyp == \"Enemy\"){\n    ctx.beginPath();\n    ctx.shadowBlur = 10;\n    ctx.shadowColor = this.color;\n    ctx.strokeStyle = this.color;\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n    ctx.stroke();\n  }else {\n    ctx.beginPath();\n    ctx.arc(\n      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n  }\n};\n\nMovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {\n  const centerDist = Util.dist(this.pos, otherObject.pos);\n  return centerDist < (this.radius + otherObject.radius);\n};\n\nMovingObject.prototype.isWrappable = true;\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nMovingObject.prototype.move = function move(timeDelta) {\n \n  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n    offsetX = this.vel[0] * velocityScale,\n    offsetY = this.vel[1] * velocityScale;\n  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n  if (this.game.isOutOfBounds(this.pos)) {\n    if (this.isWrappable) {\n      this.pos = this.game.wrap(this.pos);\n    } else {\n      this.remove();\n    }\n  }\n};\n\nMovingObject.prototype.remove = function remove() {\n  this.game.remove(this); \n};\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nfunction Player(options) {\n  options.radius = Player.RADIUS;\n  options.vel = options.vel || [0, 0];\n  options.mouseDir = options.mouseDir || [0, 0];\n  options.color = \"cyan\";\n  options.consSpeed = 20;\n  options.movObjTyp = \"Player\";\n  this.laserSound = new Audio(\"./assets/sounds/laser1.wav\");\n  this.cooldown = false;\n  this.lives = 3;\n  MovingObject.call(this, options);\n}\n\nPlayer.RADIUS = 15;\n\nUtil.inherits(Player, MovingObject);\n\nPlayer.prototype.sound = function sound(src) {\n  this.sound = document.createElement(\"audio\");\n  this.sound.src = src;\n  this.sound.setAttribute(\"preload\", \"auto\");\n  this.sound.setAttribute(\"controls\", \"none\");\n  this.sound.style.display = \"none\";\n  document.body.appendChild(this.sound);\n  this.play = function () {\n    this.sound.play();\n  };\n  this.stop = function () {\n    this.sound.pause();\n  };\n}\n\nPlayer.prototype.fireBullet = function fireBullet() {\n\n  if (this.cooldown == false) {\n    let x = 0;\n    let y = 0;\n    \n    if (Math.abs(this.mouseDir[0] - this.pos[0]) > Math.abs(this.mouseDir[1] - this.pos[1]) ){\n      x = (this.mouseDir[0] - this.pos[0]) / Math.abs(this.mouseDir[1] - this.pos[1]);\n      y = (this.mouseDir[1] - this.pos[1]) / Math.abs(this.mouseDir[1] - this.pos[1]);\n    } else {\n      x = (this.mouseDir[0] - this.pos[0]) / Math.abs(this.mouseDir[0] - this.pos[0]);\n      y = (this.mouseDir[1] - this.pos[1]) / Math.abs(this.mouseDir[0] - this.pos[0]);\n    }\n    \n    const relVel = Util.scale(\n      Util.dir([x,y]),\n      Bullet.SPEED\n    );\n  \n    const bulletVel = [\n      relVel[0] + x, relVel[1] + y\n    ];\n  \n    const bullet = new Bullet({\n      pos: this.pos,\n      vel: bulletVel,\n      mouseDir: this.mouseDir,\n      color: this.color,\n      game: this.game\n    });\n    \n    this.game.add(bullet);\n  \n    this.laserSound.play();\n    this.cooldown = true;\n    setTimeout(() => (this.cooldown = false), 300);\n  }\n};\n\nPlayer.prototype.power = function power(impulse) {\n  // this.vel[0] += impulse[0];\n  // this.vel[1] += impulse[1];\n  this.mouseDir[0] = impulse[0];\n  this.mouseDir[1] = impulse[1];\n};\n\nPlayer.prototype.relocate = function relocate() {\n  this.pos = [1920 / 2,\n  1080 / 2];\n  this.vel = [0, 0]; \n};\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/title.js":
/*!**********************!*\
  !*** ./src/title.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Title {\n  constructor(ctx, canvas) {\n    this.ctx = ctx;\n    this.canvas = canvas;\n    this.startCounter = 0;\n  }\n\n  drawTitle() {\n    this.ctx.beginPath();\n    this.ctx.fillStyle = \"rgba(255, 255, 255, 0.95)\";\n    this.ctx.font = 'bold 72px \"Roboto Slab\"';\n    this.ctx.textAlign = \"center\";\n    this.ctx.fillText(\"Shape Attack\", (this.canvas.width / 2), 140);\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n\n  drawStartClick() {\n    this.ctx.beginPath();\n    this.ctx.fillStyle = \"red\";\n    this.ctx.font = 'bold 36px \"Roboto Slab\"';\n    this.ctx.textAlign = \"center\";\n    this.ctx.fillText(\"Click or Press Enter to Start\", (this.canvas.width / 2), 300);\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Title);\n\n//# sourceURL=webpack:///./src/title.js?");

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