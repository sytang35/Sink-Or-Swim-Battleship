const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const port = 8080;

//const connections = [null, null];
let rooms = 0;

io.on("connection", (socket) => {
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
  //let playerIndex = -1;
  //for (let i in connections) {
  //if (connections[i] === null) {
  //playerIndex = i;
  //}
  //}
  //socket.emit("player-number", playerIndex);
  //console.log("player-number", playerIndex);

  //// Ignore additional players
  //if (playerIndex === -1) return;
  //connections[playerIndex] = socket;
  ////console.log(socket);

  //socket.broadcast.emit("player-connected", playerIndex);

  //socket.on("actuate", (data) => {
  //const { playerIndex, board } = data;

  //const move = {
  //playerIndex,
  //board,
  //};
  //console.log(move.board);
  //// Send move to everyone
  //socket.broadcast.emit("move", move);
  ////console.log(socket.broadcast.emit("player-move", move));

  //// Handle disconnect - clear socket of that player
  //socket.on("disconnect", () => {
  //console.log(`Player ${playerIndex} disconnected`);
  //connections[playerIndex] = null;
  //});
  //});
});
server.listen(port, () => console.log("server running on port:", port));
