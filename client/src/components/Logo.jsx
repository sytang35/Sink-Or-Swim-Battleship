import React from "react";
import { View, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.a]} />
      <View style={[styles.circle, styles.b]} />
      <View style={[styles.circle, styles.c]} />
      <View style={[styles.circle, styles.d]} />
    </View>
  );
}

const size = 100;
const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    flexDirection: "row",
    flexWrap: "wrap",
    transform: [{ rotate: "45deg" }],
  },
  circle: {
    width: size / 2.5,
    height: size / 2.5,
    borderRadius: 25,
    borderColor: "white",
  },
  a: {
    backgroundColor: "red",
  },
  b: {
    backgroundColor: "green",
  },
  c: {
    backgroundColor: "deepskyblue",
  },
  d: {
    backgroundColor: "yellow",
  },
});
