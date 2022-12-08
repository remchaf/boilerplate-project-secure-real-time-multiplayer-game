import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";
// Instanciation of the socket.io class
const socket = io();

// Global constants.
const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let player = null;
let collectible = null;

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
      alert("INVALID KEY ! Use 'W' 'A' 'S' 'D' arrow keys.");
      break;
  }
});

socket.on("new player", (data) => {
  console.log(data);
  if (!collectible) {
    collectible = new Collectible({ x: data.col_x, y: data.col_y });
  }

  if (!player) {
    player = new Player(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      0,
      "only_player",
      15,
      15,
      data.avatar
    );
  }
});

socket.on("connect", async function (socket) {
  console.log(socket);

  // About the game loop
  // let lastTime = 0;
  // function gameLoop(timestamp) {
  //   // Clearing the canvas
  //   context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  //   const dt = timestamp - lastTime;
  //   lastTime = timestamp;

  //   collectible.display(context);
  //   player.display(context);
  // }

  // requestAnimationFrame(gameLoop);

  // socket.on("disconnecting", (socket) => {
  //   socket.send("Bye !");
  //   return;
  // });
});

// function gameLoop(ctx, player) {
//   ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
//   collectible.display(context, GAME_WIDTH, GAME_HEIGHT);
//   player.display(context);

//   if (player.collision(collectible)) {
//     player.score++;
//     collectible.update(GAME_WIDTH, GAME_HEIGHT);
//     socket.emit("collision", { player: player.ID });
//   }
// }

// function user_input() {
//   document.onkeydown((event) => {
//     switch (event.key.toUppercase()) {
//       case "W":
//       case "VK_UP":
//         return "up";
//       case "A":
//       case "VK_LEFT":
//         return "left";
//       case "S":
//       case "VK_DOWN":
//         return "down";
//       case "D":
//       case "VK_RIGHT":
//         return "right";
//     }
//   });
// }

