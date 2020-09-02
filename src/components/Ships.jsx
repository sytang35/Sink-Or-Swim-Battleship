import React from "react";
import { View, StyleSheet } from "react-native";

export default function Ship() {
  return <View style={styles.ship}></View>;
}

const styles = StyleSheet.create({
  ship: {
    backgroundColor: "#2E66E6",
    width: 40,
    height: 40,
  },
});
