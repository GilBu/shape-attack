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
  const clickHandler = (e) => {
    gameView.start(e);
    canvasEl.removeEventListener("click", clickHandler);
  }

  const keydownHandler = (e) => {
    gameView.start(e);
    if (e.keyCode === 13){
      page.removeEventListener("keydown", keydownHandler);
    }
  };

  canvasEl.addEventListener("click", clickHandler);
  page.addEventListener("keydown", keydownHandler);
  title.drawTitle();
});