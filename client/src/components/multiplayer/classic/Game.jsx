import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { View, StyleSheet, Button, Text } from "react-native";
import Board from "./Board";
import Player from "../factory/player";
//import Fleet from "./Fleet.jsx";

export default function Game() {
  const [player, setPlayer] = useState("Player 1");
  const [player2, setPlayer2] = useState("Waiting for challenger");
  const [turn, setTurn] = useState("Player 1 turn");
  const [board1, setBoard1] = useState([]);
  const [board2, setBoard2] = useState([]);
  // const [board, setBoard] = useState([]);

  // Currently using preset placement
  const [gameOver, setGameOver] = useState(false);
  // Socket handlers
  //const socket = io("exp://8f-c5j.sytang35.client.exp.direct:80");
  const socket = io("http://192.168.0.39:3000");
  let playerNum = 0;

  // Update boards when a player makes a move
  useEffect(() => {
    // Second player connected
    socket.on("player-connect", (num) => {
      console.log(`Player number ${num} has connected/disconnected`);
    });

    players();
  });

  // Initialize boards when both players connected and component mounts
  useEffect(() => {
    socket.on("player-turn", (turn) => {
      if (turn === 0) {
        setTurn("Player 1 turn");
      } else {
        setTurn("Player 2 turn");
      }
    });
  });

  const players = () => {
    socket.on("player-number", (num) => {
      if (num === -1) {
        console.log("game is full");
      } else {
        playerNum = parseInt(num);
        if (playerNum === 1) setPlayer2("Player 2");
      }
      socket.emit("player-ready");
      initBoard();
    });
  };

  // Render boards when both players have connected
  const initBoard = () => {
    socket.on("game-init", (game) => {
      setBoard1(game.board1);
      setBoard2(game.board2);

      setPlayer2("Player 2");
      // setBoard(game.gameboard);
    });
  };

  // Alternate turns
  const endTurn = (prev) => {
    const next = prev.user === player.user ? player2.user : player.user;

    setTurn(next);
  };

  const sendAttack = (position) => {
    if (position) socket.emit("actuate", { player: 0, position: position });
  };

  const player1Attack = (position) => {
    // console.log(position);
    // sendAttack(position);
    if (position) {
      socket.emit("actuate", { player: 0, position: position });
      console.log("sent");
    }
    socket.on("move", (move) => {
      if (move) {
        console.log(move.player);
        if (move.player === 0) {
          setBoard2(move.board);
        } else {
          setBoard1(move.board);
        }
      } else {
        console.log("waiting for move");
      }
    });
    return position;
  };
  const player2Attack = (position) => {
    socket.emit("actuate", { player: 1, position: position });
    console.log(position);
    // player2.receiveAttack(position);
    // endTurn(player2);
  };

  const restart = () => {
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.turn}>{turn}</Text>
      </View>
      <View style={styles.board}>
        <Text>{player}</Text>
        <Board board={board1} onPress={(position) => player1Attack(position)} />
      </View>

      <View style={styles.board}>
        <Text>{player2}</Text>
        <Board board={board2} onPress={player2Attack} />
      </View>

      <Button title="Start"></Button>
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
  turn: {
    color: "black",
  },
});
