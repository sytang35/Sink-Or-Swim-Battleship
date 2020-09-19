const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io")(http);

const singlePlayer = require("./singlePlayer");
app.use(express.json());
app.use(cors());

let players = [null, null];
io.on("connect", (socket) => {
  // Test socket connection
  let playerIndex = 0;
  for (let i in players) {
    if (players[i] === null) {
      playerIndex = i + 1;
    }
  }
  console.log(`Player ${playerIndex} connected`);

  socket.emit("Player-number", playerIndex);

  if (playerIndex === 0) return;
  players[playerIndex] = socket;

  socket.broadcast.emit("Player-connect", playerIndex);
});
// Single player server data

app.use("/", singlePlayer);

app.listen(3000, () => {
  console.log("server listening on port", 3000);
});
module.exports = app;
