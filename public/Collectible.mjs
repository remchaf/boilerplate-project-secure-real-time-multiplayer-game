class Collectible {
  constructor(x = 10, y = 10, value = 0, id = 1) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.id = id;
  }

  display(ctx) {
    const collectible_avatar = document.getElementById("collectible");
    ctx.drawImage(collectible_avatar, this.x, this.y, 10, 10);
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
