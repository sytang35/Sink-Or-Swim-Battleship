import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import PropTypes from "prop-types";

Square.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  status: PropTypes.string,
  //damageCounter: PropTypes.any,
};

let count = 0;
export default function Square({ x, y, status, onPress }) {
  // Selecting square passes the x and y index values back to parent

  const [visible, setVisible] = useState(null);
  const [miss, setMiss] = useState(null);
  //const [count, setCount] = useState(0);

  //const dmg = useContext(damage);
  //let
  // Update state representing HIT or MISS
  const render = (x, y, status) => {
    if (
      status === "s1" ||
      status === "s2" ||
      status === "s3" ||
      status === "s4"
    ) {
      setVisible(true);
      console.log(x, y, status);
    } else if (status === null) {
      setMiss(true);
      console.log(x, y, status);
    }
  };

  // Render HIT
  const displayHit = () => {
    return <Text style={styles.hit}>☠️</Text>;
  };

  // Render MISS
  const displayMiss = () => {
    return <Text style={styles.miss}>😱</Text>;
  };

  return (
    <TouchableNativeFeedback
      onPress={() => {
        render(x, y, status);
      }}
    >
      <View style={styles.square}>
        {visible ? displayHit() : null}
        {miss ? displayMiss() : null}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 40,
    height: 40,
    borderWidth: 1,
  },
  hit: {
    width: 40,
    height: 40,
    fontSize: 25,
    textAlign: "center",
  },
  miss: {
    width: 40,
    height: 40,
    fontSize: 25,
    textAlign: "center",
  },
});
