import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import produce from "immer";
import { puzzle, answer, answer2, answer3 } from "../../helper/puzzles";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import PropTypes from "prop-types";

Board.propTypes = {
  difficulty: PropTypes.array,
};

export default function Board({ difficulty }) {
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
    for (let i = 0; i < difficulty.length; i++) {
      if (difficulty[i][col] !== null && difficulty[i][col] !== "miss") {
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
    let solution = difficulty;

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
      {end === true ? (
        <View style={styles.gameOver}>
          <Text style={styles.gameText}>You win</Text>
        </View>
      ) : null}
      {end === false ? (
        <View style={styles.gameOver}>
          <Text style={styles.gameText}>Try again</Text>
        </View>
      ) : null}
      <View
        style={{ justifyContent: "space-evenly", flexDirection: "row" }}
      ></View>

      <View style={styles.gridY}>
        {difficulty.map((row) => {
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
        {difficulty.map((_, i) => {
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
      <View
        style={{ marginTop: 10, flexDirection: "row", paddingHorizontal: 10 }}
      >
        <Button
          onPress={() => {
            submit(board);
          }}
          title="Submit"
        ></Button>
        <Button
          onPress={() => {
            setBoard(() => puzzle);
            AsyncStorage.setItem("game_state", JSON.stringify(puzzle));
            setEnd(null);
          }}
          title="Reset"
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
    bottom: "22.5%",
  },
  gridX: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  grid: {
    width: 45,
    height: 45,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "lightskyblue",
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
  gameOver: {
    padding: 30,
    position: "absolute",
    zIndex: 10,
    top: "40%",
    backgroundColor: "gray",
    borderRadius: 15,
  },
  gameText: {
    color: "white",
    fontSize: 35,
  },
});
