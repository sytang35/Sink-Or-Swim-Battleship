import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Board({}) {
  // Initial state of board
  const [board, setBoard] = useState(() => [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {board.map((row, x) =>
        row.map((col, y) => <View style={styles.grid}></View>)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    width: 50,
    height: 50,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "lightsalmon",
    justifyContent: "center",
    alignItems: "center",
  },
});
