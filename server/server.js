const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.Server(app);
const io = require("socket.io")(server);

const Gameboard = require("./factory/gameboard");
const Player = require("./factory/player");
const gameboard = require("./factory/gameboard");
app.use(express.json());
app.use(cors());
// Create different events for client to receive/respond to
// Manage state of the board on server side
// client will send position coordinates to server and update board and then send back
// Size game down to one board that renders for each player on connection
// When both connections are complete, auto place the ships

// Keep track of two players
const players = [null, null];

io.on("connection", (socket) => {
  // Find player
  let playerIndex = -1;
  for (const i in players) {
    if (players[i] === null) {
      playerIndex = i;
      break;
    }
  }

  // Tell client what player number they are
  socket.emit("player-number", playerIndex);
  // Ignore additional players
  if (playerIndex === -1) return;
  console.log(`Player ${playerIndex} connected`);

  players[playerIndex] = false;

  // Create player object
  let player1 = Player(players[0]);
  let player2 = Player(players[1]);

  // Tells everyone in room who connected
  socket.broadcast.emit("player-connect", playerIndex);

  // Player turn starts as player 1 then listens for turn made and updates it
  let turn = playerIndex[0];

  socket.on("player-ready", () => {
    // Assign players connected to a Player object
    socket.broadcast.emit("enemy-ready", playerIndex);
    players[playerIndex] = true;
    player1.placeShips();
    player2.placeShips();

    // Assign player a board
    const board1 = player1.getBoard();
    const board2 = player2.getBoard();

    // Send initial game to client side to be rendered
    const game = {
      player1,
      board1,
      player2,
      board2,
    };

    //Currently emits the object but the object may be too big
    socket.broadcast.emit("game-init", game);
  });

  // Handling player moves and updating the board
  socket.on("actuate", (data) => {
    const { player, position } = data;

    console.log(data.player);
    console.log(data.position);
    let board;
    if (player === 0) {
      player1.receiveAttack(position);
      board = player1.getBoard();
    } else if (player === 1) {
      player2.receiveAttack(position);
      board = player2.getBoard();
    }

    const move = {
      player,
      board,
    };

    console.log("move", board);
    socket.broadcast.emit("move", move);
  });

  // When player disconnects
  socket.on("disconnect", () => {
    console.log(`Player ${playerIndex} has disconnected`);
    players[playerIndex] = null;

    //Notify room who disconnected
    socket.broadcast.emit("player-connect", playerIndex);
  });
});

server.listen(3000, () => {
  console.log("server listening on port", 3000);
});
//module.exports = app;
