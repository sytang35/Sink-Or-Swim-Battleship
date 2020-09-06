import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import produce from "immer";

export default function Board() {
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

  // Count number of total ship HP
  let count = 0;
  const totalHP = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let k = 0; k < board[i].length; k++) {
        if (
          board[i][k] === "s1" ||
          board[i][k] === "s2" ||
          board[i][k] === "s3" ||
          board[i][k] === "s4"
        ) {
          count++;
        }
      }
    }
    return count;
  };

  // Update state representing HIT or MISS
  return (
    <>
      <View>
        <Text style={styles.hp}>Number of Targets: {totalHP(board)}</Text>
      </View>
      <View style={styles.container}>
        {board.map((row, x) =>
          row.map((col, y) => (
            <View style={styles.grid} key={`${x}${y}`}>
              <TouchableNativeFeedback
                key={`${x}${y + 1}`}
                style={styles.grid}
                onPress={() => {
                  if (
                    col === "s1" ||
                    col === "s2" ||
                    col === "s3" ||
                    col === "s4"
                  ) {
                    const newBoard = produce(board, (copyBoard) => {
                      copyBoard[x][y] =
                        board[x][y] === "s1" ||
                        board[x][y] === "s2" ||
                        board[x][y] === "s3" ||
                        board[x][y] === "s4"
                          ? "hit"
                          : null;
                    });
                    setBoard(newBoard);
                  } else if (col === null) {
                    const newBoard = produce(board, (copyBoard) => {
                      copyBoard[x][y] = board[x][y] === null ? "miss" : null;
                    });
                    setBoard(newBoard);
                  }
                }}
              >
                {board[x][y] === "hit" ? (
                  <Text style={styles.hit}>hit</Text>
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
    paddingTop: 10,
  },
  hp: {
    color: "white",
    backgroundColor: "red",
    width: "100%",
    padding: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
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
  hit: {
    width: 40,
    height: 40,
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "red",
  },
  miss: {
    width: 40,
    height: 40,
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "gray",
  },
});
