class Collectible {
  constructor(x = 15, y = 15, value = 0, id = 1) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.id = id;
    this.avatar = document.getElementById("collectible");
  }

  display(ctx) {
    ctx.drawImage(this.avatar, this.x, this.y, 15, 15);
    return;
  }

  update(param_object) {
    this.x = param_object.x;
    this.y = param_object.y;
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
