import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";
// Instanciation of the socket.io class
const socket = io({ forceNewConnection: false });

// Global constants.
const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");
const GAME_WIDTH = 400;
const GAME_HEIGHT = 300;

let player = new Player(160, 50, 0, "myId", 30, 30, "blue");
let collectible = new Collectible(140, 30, 0, "dj", 10, 10);

collectible.display(context);
player.display(context);

// The event listener
document.addEventListener("keydown", (event) => {
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
      player.movePlayer("down", 15);
      break;
    default:
      // alert("INVALID KEY ! Use 'W' 'A' 'S' 'D' arrow keys.");
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowRight":
    case "ArrowUp":
    case "ArrowDown":
    case "a":
    case "w":
    case "s":
    case "d":
      canvas.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      break;
    case "default":
      break;
  }
});

function gameLoop() {
  // Clearing the canvas
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Display the game object's elements
  collectible.display(context);
  player.display(context);

  requestAnimationFrame(gameLoop);
}

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

// About the game loop
// function gameLoop(timestamp) {
//   const dt = timestamp - lastTime;
//   lastTime = timestamp;

//   // Clearing the canvas
//   context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

//   // Display the game object's elements
//   collectible.display(context);
//   player.display(context);

// if (player) {
//   player.display(context);
//   requestAnimationFrame(gameLoop);
// }
// }

// if (!player) {
//   console.log("No Player !");
//   player = new Player(
//     GAME_WIDTH / 2,
//     GAME_HEIGHT / 2,
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
//     collectible.update(GAME_WIDTH, GAME_HEIGHT);
//     socket.emit("collision", { player: player.ID });
//   }
// }
