class BulletManager {
  constructor (){
    this.canSpawn = true;
    this.frames = 0;
    this.bullets = [];
    this.indexesToDelete = [];
  }

  update () {

    if (this.canSpawn && !player.dead) {

      if (mouse.pressed) {

        for (var i = -3; i <= 3; i++) {
          var bullet = new Bullet(i);
          this.bullets.push(bullet);
        }

        this.canSpawn = false;
      }

    } else {
      this.frames++;

      if (this.frames >= 60) {
        this.frames = 0;
        this.canSpawn = true;
      }
    }

    this.indexesToDelete = [];
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();

      if (this.bullets[i].markToDelete) {
        this.indexesToDelete.push(i);
      }
    }

    for (var i = 0; i < this.indexesToDelete.length; i++) {
      this.bullets.splice(this.indexesToDelete[i], 1);
    }
  };

  render () {
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].render();
    }
  };

}

export default bulletManager;