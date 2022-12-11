import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";
// Instanciation of the socket.io class
const socket = io({ forceNewConnection: false });

// Global constants.
const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");
const GAME_WIDTH = 400;
const GAME_HEIGHT = 300;
let lastTime = 0;

let player;
let collectible;

// The event listener
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      alert("LEFT");
      break;
    case "ArrowRight":
    case "d":
      alert("RIGHT");
      break;
    case "ArrowUp":
    case "w":
      alert("UP");
      break;
    case "ArrowDown":
    case "s":
      alert("DOWN");
      break;
    default:
      // alert("INVALID KEY ! Use 'W' 'A' 'S' 'D' arrow keys.");
      break;
  }
});

// Handling a new connection to the game
socket.on("new_player", (object) => {
  if (!collectible) {
    collectible = new Collectible(object.col_x, object.col_y);
    console.log(collectible);
  }

  // Player
  if (!player) {
    player = new Player(object.x, object.y, 0, "myId", 15, 15, "blue");
    console.log(player);
  }
  return;
});

socket.on("connect", function () {
  if (collectible) {
    gameLoop(0);
  }
});

// About the game loop
function gameLoop(timestamp) {
  const dt = timestamp - lastTime;
  lastTime = timestamp;

  // Clearing the canvas
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Display the game object's elements
  collectible.display(context);
  player.display(context);

  // if (player) {
  //   player.display(context);
  //   requestAnimationFrame(gameLoop);
  // }
}

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
