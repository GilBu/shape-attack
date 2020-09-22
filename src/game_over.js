class GameOver {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.startCounter = 0;
  }

  drawGameOver() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    this.ctx.font = 'bold 72px "Roboto Slab"';
    this.ctx.textAlign = "center";
    this.ctx.fillText("Game Over", (this.canvas.width / 2), 140);
    this.ctx.fill();
    this.ctx.closePath();
  }

}

export default GameOver;