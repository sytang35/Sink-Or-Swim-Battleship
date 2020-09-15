import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { View, StyleSheet, Button } from "react-native";
import { url2 } from "./serverURL.js";
import Board from "./Board";
import Player from "./factory/player";
//import Fleet from "./Fleet.jsx";

export default function Game() {
  // Socket handlers
  const socket = io(url2);
  useEffect(() => {
    socket.on("player-connected", (move) => {
      return move;
      //setBoard(response);
    });
  }, []);
  const sendMove = (board, metadata) => {
    //socket.emit("response", board);
    if (!player2) {
      socket.emit("actuate", { board, metadata });
    }
  };

  const [player1, setPlayer1] = useState(Player("p1"));
  const [player2, setPlayer2] = useState(Player("p2"));
  const [turn, setTurn] = useState();
  const [ship, setShip] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Alternate turns
  const endTurn = (prev) => {
    const next = prev.user === player1.user ? player2.user : player1.user;

    setTurn(next);
  };

  const player1Attack = (position) => {
    player2.receiveAttack(position);
    setPlayer2(player2);
    endTurn(player1);
    // Send move at end of turn
    sendMove();
  };
  const player2Attack = (position) => {
    player1.receiveAttack(position);
    setPlayer1(player1);
    endTurn(player2);
    sendMove();
  };
  const autoSet = () => {
    player1.placeShips();
    player2.placeShips();
  };
  const start = () => {
    autoSet();
    setGameOver(false);
  };

  const restart = () => {
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        <Board
          board={player1.getBoard()}
          player={player1.user}
          onPress={player2Attack}
        />
      </View>
      <View>
        <Board
          board={player2.getBoard()}
          player={player2.user}
          onPress={player1Attack}
        />
      </View>
      <Button title="Start" onPress={start}></Button>
      <Button title="Restart" onPress={restart}></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 60,
    marginVertical: 20,
  },
  board: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
