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
        this.y - this.height / 2 > 0 ? (this.y -= speed) : (this.y = 0);
        break;
      case "down":
        this.y + this.height / 2 < 468 ? (this.y += speed) : (this.y = 465);
        break;
      case "left":
        this.x - this.width / 2 > 0 ? (this.x -= speed) : (this.x = 0);
        break;
      case "right":
        this.x + this.width / 2 < 625 ? (this.x += speed) : (this.x = 625);
        break;

      default:
        break;
    }
    return;
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
      return false;
    }
  }

  calculateRank(arr) {
    if (arr.length == 1) {
      return "1 / 1";
    } else {
      return `${
        arr
          .sort((p1, p2) => p1.score - p2.score)
          .indexOf((p) => p.id.slice(1, -1) == this.id.slice(1, -1)) + 1
      } / ${arr.length}`;
    }
  }

  display(ctx) {
    ctx.drawImage(this.avatar, this.x, this.y, 15, 15);
    return;
  }
}

export default Player;
