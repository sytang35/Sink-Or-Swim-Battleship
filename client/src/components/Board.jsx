import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import produce from "immer";
import { puzzle, answer } from "../helper/puzzles";
//import Marker from "../game-assets/captains_wheel.svg";
//import SvgUri from "react-native-svg-uri";
//import Svg, { Image } from "react-native-svg";

export default function Board() {
  // Initial state of board
  const [board, setBoard] = useState(() => puzzle);
  const [end, setEnd] = useState(null);

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

  // Update state representing HIT or MISS
  return (
    <View style={styles.screen}>
      {end === true ? <Text style={{ color: "white" }}>You win</Text> : null}
      {end === false ? <Text style={{ color: "white" }}>Try again</Text> : null}
      <View style={{ justifyContent: "space-evenly", flexDirection: "row" }}>
        <Text style={styles.hp}>Number of Targets: {totalHP(board)}</Text>
        <Button
          onPress={() => {
            setBoard(() => puzzle);
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
                }}
              >
                {board[x][y] === "ship" ? (
                  <Image
                    style={styles.hit}
                    source={require("../game-assets/battleship.png")}
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
    //fontSize: 25,
    //textAlign: "center",
    //backgroundColor: "red",
  },
  miss: {
    width: 40,
    height: 40,
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "gray",
  },
});
