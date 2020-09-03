import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

export default function Ship({}) {
  // Should check if square is true, only colour that square

  return <View style={styles.hit}></View>;
}
const styles = StyleSheet.create({
  ship: {
    backgroundColor: "#2E66E6",
    width: 40,
    height: 40,
  },
  hit: {
    backgroundColor: "black",
    width: 40,
    height: 40,
  },
});
