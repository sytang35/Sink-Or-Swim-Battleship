import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

HitPoints.propTypes = {
  board: PropTypes.array,
};

export default function HitPoints({ board }) {
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
  return <Text style={styles.hp}>Number of Targets: {totalHP(board)}</Text>;
}
const styles = StyleSheet.create({
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
});
