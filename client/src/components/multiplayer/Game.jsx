import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { View, StyleSheet } from "react-native";
import { url2 } from "./serverURL.js";
import Board from "./Board";
import Player from "./factory/player";
//import Fleet from "./Fleet.jsx";

export default function Game() {
  const [player, setPlayer] = useState(Player("player"));

  const socket = io(url2);
  useEffect(() => {
    socket.on("response", (response) => {
      return response;
      //setBoard(response);
    });
  });
  const sendMove = (board) => {
    socket.emit("response", board);
  };

  return (
    <View>
      <Board board={player.getBoard()} player={player.player} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 10,
    //marginHorizontal: 15,
  },
  grid: {
    width: 45,
    height: 45,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
