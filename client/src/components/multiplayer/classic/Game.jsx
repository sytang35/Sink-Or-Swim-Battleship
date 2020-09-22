import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { View, StyleSheet, Button, Text } from "react-native";
import { url } from "../serverURL";
import Board from "./Board";
import Player from "../factory/player";
//import Fleet from "./Fleet.jsx";

export default function Game() {
  const [player1, setPlayer1] = useState(Player("1"));
  const [player2, setPlayer2] = useState(Player("0"));
  const [turn, setTurn] = useState();
  const [board1, setBoard1] = useState(() => player1.getBoard());
  const [board2, setBoard2] = useState(() => player2.getBoard());

  // Currently using preset placement
  //const [ship, setShip] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  // Socket handlers
  const socket = io(url);

  useEffect(() => {
    socket.on("actuate", (move) => {
      if (move.playerIndex === 1) {
        //setBoard1(move.board);
        setBoard1(player1.getBoard());
      } else {
        //setBoard2(move.board);
        setBoard2(player2.getBoard());
      }
    });
  });
  const sendRemoteMove = (board) => {
    if (!player1) {
      socket.emit("response", { board });
    }
  };
  const handleRemote = (move) => {
    const board = move.board;
    setBoard2(board);
  };

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
    // Currently returns [x, y] coordinates
  };
  const player2Attack = (position) => {
    player1.receiveAttack(position);
    setPlayer1(player1);
    endTurn(player2);
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
        <Text>Player1</Text>
        <Board board={board1} player={player1.user} onPress={player2Attack} />
      </View>
      <View style={styles.board}>
        <Text>Player2</Text>
        <Board board={board2} player={player2.user} onPress={player1Attack} />
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
