import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";
// Instanciation of the socket.io class
const socket = io({ forceNewConnection: false });

// Global constants.
const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");
const GAME = {
  width: 640,
  height: 480,
};

let game_object = [];

let player = new Player(160, 50, "myId", 30, 30, img("blue"));
let collectible = new Collectible(140, 30, 1, "dj", 10, 10);

collectible.display(context);
player.display(context);

game_object.push(player);
game_object.push(collectible);

// The event listener
document.addEventListener("keydown", (event) => {
  context.clearRect(0, 0, GAME.width, GAME.height);
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      player.movePlayer("left", 15);
      break;
    case "ArrowRight":
    case "d":
      player.movePlayer("right", 15);
      break;
    case "ArrowUp":
    case "w":
      player.movePlayer("up", 15);
      break;
    case "ArrowDown":
    case "s":
      player.movePlayer("down", 15); //
      break; //
    default:
      break;
  }
  return;
});

// Displayement of the player's id on the nav-bar
document.getElementById("player_id").innerText = player.id;

function gameLoop() {
  // Collision case handling
  if (player.collision(collectible)) {
    collectible.update(GAME);
    player.score += collectible.value;
  }

  // Clearing the canvas
  context.clearRect(0, 0, GAME.width, GAME.height);

  // Displaying the actual player rank in the nav-bar
  document.getElementById("rank").innerText = player.calculateRank([player]);
  document.getElementById("Instructions").innerText = player.score;

  // Display the game object's elements
  for (const i of game_object) {
    i.display(context);
  }

  requestAnimationFrame(gameLoop);
}
// 778552291 mamadou
gameLoop();

// Handling a new connection to the game
// socket.on("new_player", (object) => {
//   if (!collectible) {
//     collectible = new Collectible(object.col_x, object.col_y);
//     console.log(collectible);
//   }

//   // Player
//   if (!player) {
//     player = new Player(object.x, object.y, 0, "myId", 15, 15, "blue");
//     console.log(player);
//   }
//   return;
// });

// socket.on("connect", function () {
//   if (collectible) {
//     gameLoop(0);
//   }
// });

// }

// if (!player) {
//   console.log("No Player !");
//   player = new Player(
//     GAME.width / 2,
//     GAME.height / 2,
//     0,
//     "only_player",
//     15,
//     15,
//     data.avatar
//   );
// }
// function gameLoop(ctx, player) {
//   if (player.collision(collectible)) {
//     player.score++;
//     collectible.update(GAME.width, GAME.height);
//     socket.emit("collision", { player: player.ID });
//   }
// }

function img(url) {
  let image = new Image();
  image.src = "../assets/images/gost-" + url + ".png";
  image.alt = "player_id_avatar";
  return image;
}
