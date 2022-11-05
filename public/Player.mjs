class Player {
  constructor({ x, y, score, id, width, height, avatar }) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
    this.width = width;
    this.height = height;
    this.avatar = avatar;
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
        break;
    }
  }

  collision(item) {
    if (
      item.x + item.width >= this.x &&
      item.x <= this.x + this.width &&
      item.y + item.height >= this.y &&
      item.y <= this.y + this.height
    ) {
      return true;
    } else {
      return false
    }
  }

  calculateRank(arr) {
    return `${arr
      .sort((p1, p2) => p2.score - p1.score)
      .indexOf((p) => p.id == this.id)}/${arr.lenght}`;
  }

  display(ctx) {
    return ctx.drawImage(this.avatar, this.x, this.y, this.width, this.height);
  }
}

export default Player;
