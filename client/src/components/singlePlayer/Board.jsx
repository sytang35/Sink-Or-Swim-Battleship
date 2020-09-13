import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import produce from "immer";
import { puzzle, answer } from "../../helper/puzzles";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Board() {
  // Initial state of board
  const [board, setBoard] = useState(() => puzzle);
  const [end, setEnd] = useState(null);

  // Add game board axes

  const yCol = (num) => {
    let countY = 0;
    for (let i = 0; i < num.length; i++) {
      if (num[i] !== null && num[i] !== "miss") {
        countY++;
      }
    }
    return countY;
  };

  const xRow = (col) => {
    let countX = 0;
    for (let i = 0; i < answer.length; i++) {
      if (answer[i][col] !== null && answer[i][col] !== "miss") {
        countX++;
      }
    }
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

  // Win and lose conditions
  const submit = (board) => {
    let question = board.slice();
    let solution = answer;

    for (let i = 0; i < solution.length; i++) {
      for (let k = 0; k < solution[i].length; k++) {
        if (question[i][k] !== solution[i][k]) {
          setEnd(false);
          return false;
        }
      }
    }
    setEnd(true);
  };

  // Get last saved state when screen is in focus
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("game_state")
        .then((response) => {
          if (response) {
            setBoard(JSON.parse(response));
          }
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    })
  );

  // Update state representing HIT or MISS
  return (
    <View style={styles.screen}>
      {end === true ? <Text style={{ color: "white" }}>You win</Text> : null}
      {end === false ? <Text style={{ color: "white" }}>Try again</Text> : null}
      <View style={{ justifyContent: "space-evenly", flexDirection: "row" }}>
        <Button
          onPress={() => {
            setBoard(() => puzzle);
            AsyncStorage.setItem("game_state", JSON.stringify(puzzle));
            setEnd(null);
          }}
          title="Reset"
        ></Button>
      </View>

      <View style={styles.gridY}>
        {answer.map((row) => {
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
        {answer.map((_, i) => {
          return xRow(i);
        })}
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
                  AsyncStorage.setItem("game_state", JSON.stringify(newBoard));
                }}
              >
                {board[x][y] === "ship" ? (
                  <Image
                    style={styles.hit}
                    source={require("../../game-assets/battleship.png")}
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
      <View style={{ marginTop: 20 }}>
        <Button
          onPress={() => {
            submit(board);
          }}
          title="Submit"
        ></Button>
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
    marginTop: 10,
    marginHorizontal: 15,
  },
  gridY: {
    width: 230,
    position: "absolute",
    left: "-20%",
    bottom: "22%",
  },
  gridX: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-evenly",
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
