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
  const socket = io("http://192.168.100.113:3000");
  //const socket = io("exp://8f-c5j.sytang35.client.exp.direct:80");

  // Might need to assign player index to a board/player
  useEffect(() => {
    //setBoard1(player1.getBoard());
    //setBoard2(player2.getBoard());
    socket.on("actuate", (move) => {
      if (move.player === 1) {
        //player1Attack(move.position);
        player1Attack(move.position);
        setBoard1(player1.getBoard());
      } else {
        player2Attack(move.position);
        setBoard2(player2.getBoard());
      }
    });
  });
  const sendRemoteMove = (player, position) => {
    //if (!player1) {
    socket.emit("actuate", { player, position });
    //}
  };

  // Alternate turns
  const endTurn = (prev) => {
    const next = prev.user === player1.user ? player2.user : player1.user;

    setTurn(next);
  };

  const player1Attack = (position) => {
    player1.receiveAttack(position);
    endTurn(player1);
    // Send move at end of turn
    let player = 1;
    sendRemoteMove(player, position);
  };
  const player2Attack = (position) => {
    player2.receiveAttack(position);
    endTurn(player2);

    let player = 2;
    sendRemoteMove(player, position);
  };
  const autoSet = () => {
    player1.placeShips();
    //player2.placeShips();
  };
  const start = () => {
    autoSet();
    setBoard1(player1.getBoard());
    setGameOver(false);
  };

  const restart = () => {
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        <Text>Player1</Text>
        <Board board={board1} player={player1} onPress={player1Attack} />
      </View>
      <View style={styles.board}>
        <Text>Player2</Text>
        <Board board={board2} player={player2} onPress={player2Attack} />
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
