const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io").listen(server);
const port = 8080;

io.on("connection", (socket) => {
  socket.on("response", (response) => {
    console.log(response);
    io.emit("response", response);
  });
});

server.listen(port, () => console.log("server running on port:", port));
