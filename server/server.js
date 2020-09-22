const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io")(http);

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

  // Handling player moves
  socket.on("actuate", (data) => {
    const { board, position } = data;

    const move = {
      playerIndex,
      board,
      position,
    };

    // Send move to other player in the room
    socket.broadcast.emit("move", move);
  });
});
// Single player server data

app.listen(3000, () => {
  console.log("server listening on port", 3000);
});
module.exports = app;
