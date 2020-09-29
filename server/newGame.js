const express = require("express");
const app = express();
const http = require("http");
const { env } = require("process");
const server = http.Server(app);
const socketio = require("socket.io");
const io = socketio(server);
const PORT = env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});

const connections = [null, null];
const board = require("./factory/newGame");
let turn = connections[0];

io.on("connection", (socket) => {
  let playerIndex = -1;
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i;
      break;
    }
  }

  socket.emit("player-number", playerIndex);

  if (playerIndex === -1) return;
  console.log(`Player ${playerIndex} connected`);
  connections[playerIndex] = false;

  socket.broadcast.emit("player-connect", playerIndex);

  socket.on("player-ready", () => {
    socket.broadcast.emit("enemy-ready", playerIndex);
    connections[playerIndex] = true;

    for (const i in connections) {
      if (connections[i] === true) {
        socket.broadcast.emit("board-init", board);
        socket.broadcast.emit("player-turn", turn);
      }
    }
  });

  // Handle player hit on board from client side
  // Change turn after move is made
  socket.on("actuate", (data) => {
    const { player, position } = data;
    let selected = null;
    if (player === 0) {
      if (position === "s1" || position === "s2" || position === "s3") {
        selected = true;
        socket.broadcast.emit("result", selected);
      } else {
        selected = false;
      }
      turn = connections[1];
      socket.broadcast.emit("player-turn", turn);
    }
    if (player === 1) {
      if (position === "t1" || position === "t2" || position === "t3") {
        selected = true;
        socket.broadcast.emit("result", selected);
      } else {
        selected = false;
        socket.broadcast.emit("result", selected);
      }
      turn = connections[0];
      socket.broadcast.emit("player-turn", turn);
    }
  });
});
