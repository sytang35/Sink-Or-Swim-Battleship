import React from "react";
import { View, StyleSheet } from "react-native";
import Square from "./Square";
import PropTypes from "prop-types";

Board.propTypes = {
  player: PropTypes.string,
  board: PropTypes.array,
  turn: PropTypes.bool,
  onPress: PropTypes.func,
};

function Board({ player, board, turn, onPress }) {
  return (
    <View style={styles.grid}>
      {board.map((row, x) =>
        row.map((col, y) => {
          return (
            <Square
              key={Math.random()}
              onPress={onPress}
              player={player}
              turn={turn}
              position={[x, y]}
              gridVal={col}
            />
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Board;
