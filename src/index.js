import Game from "./game"
import GameView from "./game_view";
import Title from "./title"
// const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function () {
  const page = document.getElementById("page");
  const canvasEl = document.getElementById("canvas");
  // const startScreen = document.getElementById("start-screen")
  // const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx, canvasEl, page)
  const title = new Title(ctx, canvasEl);
  title.drawStartClick();
  canvasEl.addEventListener('click', gameView.start.bind(gameView));
  page.addEventListener("keydown", gameView.start.bind(gameView));
  // gameView.start();
  title.drawTitle();
  // new GameView(game, ctx).start();
});