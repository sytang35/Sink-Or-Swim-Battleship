const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.Server(app);
const io = require("socket.io")(server);

app.use(express.json());
app.use(cors());

const players = [null, null];
io.on("connection", (socket) => {
  // Test socket connection
  let playerIndex = -1;
  for (let i in players) {
    if (players[i] === null) {
      playerIndex = i;
    }
  }
  console.log(`Player ${playerIndex} connected`);

  socket.emit("Player-number", playerIndex);

  if (playerIndex === -1) return;
  players[playerIndex] = socket;

  socket.broadcast.emit("Player-connect", playerIndex);

  // Handling player moves
  socket.on("actuate", (data) => {
    const { position } = data;

    const move = {
      playerIndex,
      position,
    };

    console.log(move);
    // Send move to other player in the room
    socket.broadcast.emit("move", move);
  });

  // When player disconnects
  socket.on("disconnect", () => {
    console.log(`Player ${playerIndex} has disconnected`);
    players[playerIndex] = null;
  });
});

server.listen(3000, () => {
  console.log("server listening on port", 3000);
});
//module.exports = app;
