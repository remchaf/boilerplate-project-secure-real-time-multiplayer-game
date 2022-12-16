class Player {
  constructor(x, y, id, width, height, avatar) {
    this.x = x;
    this.y = y;
    this.score = 0;
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
      item.x + item.width / 2 - 5 >= this.x - this.width / 2 &&
      item.x - item.width / 2 + 5 <= this.x + this.width / 2 &&
      item.y + item.height / 2 - 5 >= this.y - this.height &&
      item.y - item.height / 2 + 5 <= this.y + this.height / 2
    ) {
      return true;
    } else {
      // console.log(false);
      return false;
    }
  }

  calculateRank(arr) {
    return `${arr
      .sort((p1, p2) => p2.score - p1.score)
      .indexOf((p) => p.id == this.id)}/${arr.lenght}`;
  }

  display(ctx) {
    ctx.drawImage(this.avatar, this.x, this.y, 15, 15);
    return;
  }
}

export default Player;
