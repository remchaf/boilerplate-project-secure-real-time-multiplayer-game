require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
// const expect = require("chai");
// const socket = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");

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
const avatars = [
  ["blue", null],
  ["green", null],
  ["red", null],
  ["packman", null],
];
const { createServer } = require("http");
const Server = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cookie: {
    name: "io",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  },
});

io.engine.on("initial_headers", (headers, req) => {
  console.log("Request headers.id: " + req.socket.handshake.headers.cookie);
  const idx = avatars.findIndex((a) => !a[-1]);
  avatars[idx][-1] = headers.id.toString(); /* ***** */
  const avatar = avatars[idx][0];

  io.send({ ID: avatar }); /* ************** */
});

io.on("connection", async (socket) => {
  // console.log(socket.handshake.headers.cookie.match(/=(\S+);/).pop());
  // io.send("This is the ID from this socket connection: " + socket.id);

  socket.on("disconnect", (socket) => {
    avatars[avatars.findIndex((a) => a[-1] == socket.id)][-1] = null;
  });
});

io.on("message", (message) => {
  console.log(message);
  return;
});

// io.on("handshake", function() {
//   console.log("Got the msg")
//   return
// })

// called during the handshake
// io.engine.on("initial_headers", (headers, request) => {
//   const id = io.clientsCount();
//   headers["set-cookie"] = serialize("uid", id, { sameSite: "strict" });
// });

// called for each HTTP request (including the WebSocket upgrade)
// io.engine.on("headers", (headers, request) => {
//   if (!request.headers.cookie) return;
//   const cookies = parse(request.headers.cookie);
//   console.log(cookies);
//   if (!cookies.uid) {
//     const id = io.clientsCount();
//     headers["set-cookie"] = serialize("uid", id, { maxAge: 1086400 });
//     console.log("Set the uid cookie !")
//   }
// });

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
