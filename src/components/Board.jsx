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

  // Win game condition state toggle
  useEffect(() => {
    if (count === 0) {
      setEnd(true);
    } else {
      setEnd(false);
    }
  });

  // Add game board axes
  const boardRow = board.slice();

  const yCol = (num) => {
    let countY = 0;
    for (let i = 0; i < num.length; i++) {
      if (num[i] !== null && num[i] !== "miss") {
        countY++;
      }
    }
    return countY;
  };

  const xRow = () => {
    let countX = 0;
    let col = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i][col] !== null && board[i][col] !== "miss") {
        countX++;
      }
    }
    console.log("X axis", countX);
    return (
      <View
        key={Math.random()}
        style={{
          color: "white",
          paddingHorizontal: 90,
        }}
      >
        <Text style={{ color: "white", fontSize: 35 }}>{countX}</Text>
      </View>
    );
  };

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
      <View style={styles.gridY}>
        {boardRow.map((row) => {
          return (
            <View
              key={Math.random()}
              style={{
                color: "white",
                paddingHorizontal: 90,
              }}
            >
              <Text style={{ color: "white", fontSize: 35 }}>{yCol(row)}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.gridX}>
        {board.map(() => {
          return xRow();
        })}
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
    marginHorizontal: 15,
  },
  gridY: {
    width: 250,
    position: "absolute",
    left: "-20%",
    bottom: "18%",
  },
  gridX: {
    width: 250,
    flexDirection: "row",
    justifyContent: "space-evenly",
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
