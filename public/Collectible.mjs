class Collectible {
  constructor(x = 15, y = 15, value = 0, id = 1) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.id = id;
    this.avatar = document.getElementById("collectible");
    this.height = 15;
    this.width = 15;
  }

  display(ctx) {
    ctx.drawImage(this.avatar, this.x, this.y, this.width, this.height);
    return;
  }

  update(g) {
    this.x = Math.round(Math.random() * (g.width - 10) + 5);
    this.y = Math.round(Math.random() * (g.height - 10) + 5);
  }
}

/*
  Note: Attempt to export this for use
  in server.js
*/
try {
  module.exports = Collectible;
} catch (e) {}

export default Collectible;
