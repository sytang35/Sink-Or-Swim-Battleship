import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Ship from "./Ships";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function Board({}) {
  // Initial state of board
  const [board, setBoard] = useState(() => [
    [null, null, null, null, null, null, null, null, null, null],
    [null, "s1", "s1", null, null, null, null, null, null, null],
    [null, null, null, null, null, "s2", null, null, null, null],
    [null, null, null, null, null, "s2", null, null, null, null],
    [null, null, null, null, null, "s2", null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, "s4", null, null, null, null, null, null, null, null],
    [null, "s4", null, null, null, null, null, "s3", "s3", "s3"],
    [null, "s4", null, null, null, null, null, null, null, null],
    [null, "s4", null, null, null, null, null, null, null, null],
  ]);

  // If square is pressed, check if it is null
  // board[x][y] === null ? "miss" : "hit"
  // setBoard = "O" (miss), else "X" for hit
  function checkGrid(position) {
    if (position !== null) {
      console.log("hit");
    } else {
      console.log("miss");
    }
  }

  return (
    <View style={styles.container}>
      {board.map((row, x) =>
        row.map((col, y) => (
          <TouchableWithoutFeedback onPress={() => checkGrid(board[x][y])}>
            <View key={`${x}${y}`} style={styles.grid}>
              {board[x][y] === "s1" ||
              board[x][y] === "s2" ||
              board[x][y] === "s3" ||
              board[x][y] === "s4" ? (
                <Ship />
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: 10,
  },
  grid: {
    width: 40,
    height: 40,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
