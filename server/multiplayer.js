const express = require("express");
const app = express();
const router = express.Router();

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const port = 8080;
//Socket configuration
const connections = [null, null];
let rooms = 0;
io.on("connection", (socket) => {
  // Room set up
  socket.on("createGame", (data) => {
    socket.join("room" + ++rooms);
    socket.emit("new game", { name: data.name, room: "room-" + rooms });
  });
  socket.on("joinGame", (data) => {
    let room = io.nsps["/"].adapter.rooms[data.room];
    if (room && room.length == 1) {
      socket.join(data.room);
      socket.broadcast.to(data.room).emit("player1", {});
      socket.emit("player2", { name: data.name, room: data.room });
    } else {
      socket.emit("error", { message: "Room is full" });
    }
  });
  socket.on("playTurn", (data) => {
    socket.broadcast.to(data.room).emit("turnPlayed", {
      tile: data.tile,
      room: data.room,
    });
  });
  socket.on("gameOver", (data) => {
    socket.broadcast.to(data.room).emit("gameOver", data);
  });

  // Find player
  let playerindex = -1;
  for (let i in connections) {
    if (connections[i] === null) {
      playerindex = i;
    }
  }
  socket.emit("player-number", playerindex);
  console.log("player-number", playerindex);

  // ignore additional players
  if (playerindex === -1) return;
  connections[playerindex] = socket;
  //console.log(socket);

  // Notify everyone in the room player has connected
  socket.broadcast.emit("player-connected", playerindex);

  socket.on("actuate", (data) => {
    const { playerindex, board } = data;

    const move = {
      playerindex,
      board,
    };
    console.log(move.board);
    // send move to everyone
    socket.broadcast.emit("move", move);
    //console.log(socket.broadcast.emit("player-move", move));

    // handle disconnect - clear socket of that player
    socket.on("disconnect", () => {
      console.log(`player ${playerindex} disconnected`);
      connections[playerindex] = null;
    });
  });
});
server.listen(port, () => console.log("server running on port:", port));
exports.module = router;
