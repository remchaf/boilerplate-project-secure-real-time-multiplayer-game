require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
// const expect = require("chai");
// const socket = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
// const game = require("./public/game_const.mjs");

const fccTestingRoutes = require("./routes/fcctesting.js");
const runner = require("./test-runner.js");

const app = express();

app.use("/public", express.static(process.cwd() + "/public"));
app.use("/assets", express.static(process.cwd() + "/assets"));
app.use("/", express.static(process.cwd() + "/node_modules/socket.io-client"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({ origin: "*" }));

// Security
app.use(
  helmet.noSniff(),
  helmet.xssFilter(),
  helmet.noCache(),
  function (req, res, next) {
    res.setHeader("X-Powered-By", "PHP 7.4.3");
    next();
  }
);

// Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//For FCC testing purposes
fccTestingRoutes(app);

// 404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

// Socket
const { createServer } = require("http");
const Server = require("socket.io");

const httpServer = createServer(app);

const io = Server(httpServer, {
  pingTimeout: 18000,
  pingInterval: 25000,
});

// Addresses
var addresses = [];

const avatars = [
  ["blue", null],
  ["green", null],
  ["red", null],
  ["packman", null],
];

io.on("connection", async (socket) => {
  // Get the address of the incoming connection.
  const address = socket.handshake.address;

  // Pushing the new player's address in addresses array.
  if (addresses.indexOf(address) == -1) {
    addresses.push(address);
  }

  // Handling disconnection of a socket.
  socket.on("disconnect", (socket) => {
    avatars[avatars.findIndex((a) => a[-1] == socket.id)][-1] = null;
  });
});

io.engine.on("initial_headers", (headers, req) => {
  // Defining the object to be emitted.
  const object = {
    x: randomPlace(800),
    y: randomPlace(600),
  };
  object.col_x = randomPlace(800);
  object.col_y = randomPlace(400);

  // Set the player's avatar
  avatars[avatars.length - addresses.length - 1][1] = address;
  object.avatar = avatars[avatars.length - addresses.length - 1];

  // Emition of the "new player" event to all connected sockets.
  io.emit("new player", object);
});

// Random place defining function.
const randomPlace = (param) => Math.round(Math.random() * (param - 20) + 10);

const portNum = process.env.PORT || 3000;
// Set up server and tests
httpServer.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV === "test") {
    console.log("Running Tests...");
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log("Tests are not valid:");
        console.error(error);
      }
    }, 1500);
  }
});

module.exports = app; // For testing
