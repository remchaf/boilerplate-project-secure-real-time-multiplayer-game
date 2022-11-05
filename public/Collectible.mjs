class Collectible {
  constructor({ x = 10, y = 10, value, id = 1 }) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.id = id;
  }

  coll = document.getElementById("collectible");

  display(ctx, game_width, game_height) {
    // Random position of the collectible
    const x = Math.round(Math.random() * (game_width - 20) + 10);
    const y = Math.round(Math.random() * (game_height - 20) + 10);

    // Then display the collectible
    ctx.drawImage(coll, x, y, 10, 10);
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
