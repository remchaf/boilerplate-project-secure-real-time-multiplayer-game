import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const socket = io();
socket.on("connect", async function () {
  console.log("Connected to the server.\n\r\r\r ID: " + socket.id);

  const canvas = document.getElementById("game-window");
  const context = canvas.getContext("2d");
  
  
  let player = await socket.on("message", (message) => {
    console.log(message);
    return new Player(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      0,
      socket.id,
      15,
      15,
      message.ID
    );
  });
  let collectible = new Collectible();
  collectible.update(GAME_WIDTH, GAME_HEIGHT);
  collectible.display(context);
  player.display(context);

  socket.on("disconnecting", (socket) => {
    socket.send("Bye !");
    return;
  });
});

// canvas.addEventListener("keydown", function (event) {
//   console.log(event.code);
// });

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
