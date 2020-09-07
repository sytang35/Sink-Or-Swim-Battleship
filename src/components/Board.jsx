import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import produce from "immer";
import { puzzle } from "../helper/puzzles";

export default function Board() {
  // Initial state of board
  const [board, setBoard] = useState(() => puzzle);
  const [end, setEnd] = useState(false);

  // Count number of total ship HP currently on board
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

  useEffect(() => {
    if (count === 0) {
      setEnd(true);
    } else {
      setEnd(false);
    }
  });

  // Update state representing HIT or MISS
  return (
    <View style={styles.screen}>
      {end ? (
        <View style={{ backgroundColor: "white" }}>
          <Text>You win!</Text>
        </View>
      ) : null}

      <View style={{ justifyContent: "space-evenly", flexDirection: "row" }}>
        <Text style={styles.hp}>Number of Targets: {totalHP(board)}</Text>
        <Button
          onPress={() => {
            setBoard(() => puzzle);
          }}
          title="Reset"
        ></Button>
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  hp: {
    color: "white",
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 85,
    padding: 2,
    marginRight: 250,
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
