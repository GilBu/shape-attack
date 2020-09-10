import Game from "./game"
import Title from "./title"
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function () {
  const startScreen = document.getElementById("start-screen")
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx)
  const title = new Title(ctx, canvasEl);
  title.drawStartClick()
  canvasEl.addEventListener('click', gameView.start())
  startScreen.addEventListener('keydown', gameView.start())
  title.drawTitle(140)
  // new GameView(game, ctx).start();
});