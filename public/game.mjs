import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600
const game_object = [collectible];


const socket = io();
socket.on("connect", (msg) => {
  console.log("Connected to the server.\n\r ID: " + msg.ID);

  let player = new Player(0, 0, 0, 1);
  game_object.push(player);

  socket.on("disconnecting", (socket) => {
    return;
  });
});

const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");

let collectible = new Collectible(0, 0, 0, 0);
collectible.display(context);

// canvas.addEventListener("keydown", function (event) {
//   console.log(event.code);
// });

function gameLoop(ctx) {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  collectible.display(ctx);
}
