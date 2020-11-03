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

  drawInstructions() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.font = 'bold 20px "Roboto Slab"';
    this.ctx.textAlign = "center";
    this.ctx.fillText("Controls", (this.canvas.width / 2), 375);
    this.ctx.fillText("Movement - WASD for Movement", (this.canvas.width / 2), 400);
    this.ctx.fillText("Aim - Move mouse to a the direction for aim", (this.canvas.width / 2), 425);
    this.ctx.fillText("Shoot - Click on left mouse button to shoot", (this.canvas.width / 2), 450);
    this.ctx.fillText("How to Play", (this.canvas.width / 2), 500);
    this.ctx.fillText("A wave of enemies will spawn in chasing the player", (this.canvas.width / 2), 525);
    this.ctx.fillText("Use your weapon to defeat them as many as possible and obtain an high score", (this.canvas.width / 2), 550);
    this.ctx.fill();
    this.ctx.closePath();
  }

}

export default Title;