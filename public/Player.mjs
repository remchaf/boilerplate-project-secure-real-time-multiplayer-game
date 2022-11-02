class Player {
  constructor({ x, y, score, id }) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
  }

  movePlayer(dir, speed) {
    switch (dir) {
      case "up":
        this.y -= speed;
        break;
      case "down":
        this.y += speed;
        break;
      case "left":
        this.x -= speed;
        break;
      case "right":
        this.x += speed;
        break;

      default:
        true;
        break;
    }
  }

  collision(item) {}

  calculateRank(arr) {
    let sorted = arr.sort((p1, p2) => p2.score - p1.score);
    return `${sorted.indexOf()}/${arr.lenght}`
  }
}

export default Player;
