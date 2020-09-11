class Title {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.startCounter = 0;
  }

  drawTitle() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    this.ctx.font = 'bold 72px "Roboto Slab"';
    this.ctx.textAlign = "center";
    this.ctx.fillText("Shape Attack", (this.canvas.width / 2), 140);
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawStartClick() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.font = 'bold 36px "Roboto Slab"';
    this.ctx.textAlign = "center";
    this.ctx.fillText("Click or Press Enter to Start", (this.canvas.width / 2), 300);
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Title;