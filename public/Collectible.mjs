class Collectible {
  constructor(game_width, game_height, x, y, value = 1, id = "game colletible") {
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
    this.x = random_position(g.width);
    this.y = random_position(g.height);
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

const random_position = (param) => Math.round(Math.random() * (param - 10) + 5)