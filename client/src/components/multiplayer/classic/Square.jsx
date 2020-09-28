import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import io from "socket.io-client";

Square.propTypes = {
  position: PropTypes.array,
  gridVal: PropTypes.object,
  onPress: PropTypes.func,
};

export default function Square({ position, gridVal, onPress }) {
  // onPress needs to pass position and handle the check

  const isOccupied = gridVal.isEmpty === false ? true : null;
  const isSelected = gridVal.isSelected === true ? true : false;

  let value = "";
  if (isSelected) {
    if (isOccupied) {
      value = <Text>X</Text>;
    } else {
      value = <Text>O</Text>;
    }
  }

  return (
    <TouchableNativeFeedback
      onPress={() => {
        onPress(position);
        console.log(gridVal);
        // console.log(position);
      }}
    >
      <View style={styles.square}>
        <Text style={styles.hit}>{value}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 27,
    height: 27,
    borderWidth: 1,
  },
  hit: {
    width: 30,
    height: 30,
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "pink",
  },
});
