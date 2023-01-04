import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";
// Instanciation of the socket.io class
const socket = io({ forceNewConnection: false });

socket.on("my-event", () => {
  console.log("my-event");
});

// Global constants.
const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");
const GAME = {
  width: 640,
  height: 480,
};

let game_object = [];

let mainplayer;
let collectible;

// collectible.display(context);
// player.display(context);

// game_object.push(player);
// game_object.push(collectible);

// The event listener
document.addEventListener("keydown", (event) => {
  move_player(mainplayer, event);
  return;
});

let Width = document.getElementsByClassName("container")[0].clientWidth;

// The game loop function
function gameLoop() {
  if (collectible && mainplayer) {
    // Collision case handling
    if (mainplayer.collision(collectible)) {
      mainplayer.score += collectible.value;
      console.log("Collision");
      // collectible.update(GAME);
      // collectible.distroy();

      socket.emit("collision", { id: mainplayer.id });
    }

    // window min-width media
    if (window.innerWidth >= 800) {
      document.getElementById("nav-bar").style =
        "position: absolute; left: " +
        (Width - 400) / 2 +
        "px; background-color: orange; top: 510px";
    }

    // Clearing the canvas
    context.clearRect(0, 0, GAME.width, GAME.height);

    // Displaying the actual player rank in the nav-bar
    document.getElementById("rank").innerText = mainplayer.calculateRank([
      mainplayer,
    ]);

    // Display the game object's elements
    for (const i of game_object) {
      i.display(context);
    }
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();

// Collision from other players handling
socket.on("collision", (data) => {
  collectible.update(data);
  console.log(data);
});

// New Player connection
socket.on("new_player", (data) => {
  socket.emit("collision", { i: "esfigjhbaojbfg" });
  if (collectible) {
    // console.log("yet had a collectible");
    return;
  }

  if (mainplayer) {
    game_object.push(
      new Player(data.x, data.y, data.id + "_player", 20, 20, img(data.id))
    );
    return;
  }

  // Constructing the collectible with the gotten coordinates
  collectible = new Collectible(
    GAME.width,
    GAME.height,
    data.col_x,
    data.col_y,
    1,
    "coll_object"
  );
  game_object.push(collectible);
  collectible.display(context);

  // Construction of the main player
  mainplayer = new Player(
    data.x,
    data.y,
    data.id + "_player",
    15,
    15,
    img(data.id)
  );
  // console.log(mainplayer);
  game_object.push(mainplayer);
  mainplayer.display(context);

  // Displaying the player's id on the nav-bar
  document.getElementById("player_id").innerText = mainplayer.id;
});

function img(url) {
  let image = new Image();
  image.src = "../assets/images/gost-" + url + ".png";
  image.alt = "player_id_avatar";
  return image;
}

const move_player = (playing, e) => {
  switch (e.key) {
    case "ArrowLeft":
    case "a":
      playing.movePlayer("left", 15);
      break;
    case "ArrowRight":
    case "d":
      playing.movePlayer("right", 15);
      break;
    case "ArrowUp":
    case "w":
      playing.movePlayer("up", 15);
      break;
    case "ArrowDown":
    case "s":
      playing.movePlayer("down", 15);
      break;
    default:
      break;
  }
  return;
};

socket.on("disconnect", (reason) => {
  if (reason === "io server disconnect") {
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.disconnect();
  }
});
