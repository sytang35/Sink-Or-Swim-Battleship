import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

GameEnd.propTypes = {
  end: PropTypes.bool,
};

export default function GameEnd({ end }) {
  return (
    <>
      {end === true ? (
        <View style={styles.gameWin}>
          <Text style={styles.gameText}>You win</Text>
        </View>
      ) : null}
      {end === false ? (
        <View style={styles.gameOver}>
          <Text style={styles.gameText}>Try again</Text>
        </View>
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({
  gameWin: {
    padding: 30,
    position: "absolute",
    zIndex: 10,
    top: "40%",
    backgroundColor: "gray",
    borderRadius: 15,
  },
  gameOver: {
    padding: 30,
    position: "absolute",
    zIndex: 10,
    top: "3%",
    backgroundColor: "gray",
    borderRadius: 15,
  },
  gameText: {
    color: "white",
    fontSize: 35,
  },
});
