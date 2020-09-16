import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { battlefield } from "../../../helper/fog";
import produce from "immer";
import { url, url2 } from "../serverURL.js";

export default function Game() {
  const [board, setBoard] = useState(() => battlefield);

  const socket = io.connect(url);

  useEffect(() => {
    socket.on("actuate", (response) => {
      setBoard(response);
    });
  });

  const sendMove = (board) => {
    socket.emit("actuate", board);
    setBoard(board);
  };

  return (
    <>
      <View>
        <Text>Testing</Text>
      </View>
      <View style={styles.container}>
        {board.map((row, x) =>
          row.map((_, y) => (
            <View style={styles.grid} key={`${x}${y}`}>
              <TouchableNativeFeedback
                key={`${x}${y + 1}`}
                style={styles.grid}
                onPress={() => {
                  const newBoard = produce(board, (copyBoard) => {
                    copyBoard[x][y] = board[x][y] ? null : "ship";
                  });
                  setBoard(newBoard);
                  sendMove(newBoard);
                }}
              >
                {board[x][y] === "ship" ? (
                  <Image
                    style={styles.hit}
                    source={require("../../../game-assets/battleship.png")}
                  ></Image>
                ) : null}
                {board[x][y] === "miss" ? (
                  <Text style={styles.miss}>miss</Text>
                ) : null}
              </TouchableNativeFeedback>
            </View>
          ))
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 15,
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
  hit: {
    width: 40,
    height: 40,
  },
  miss: {
    width: 40,
    height: 40,
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "gray",
  },
});
