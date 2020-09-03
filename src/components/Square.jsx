import React, { useState } from "react";
import { View, Text, StyleSheet, TextComponent } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

export default function Square({ x, y, status }) {
  // Selecting square passes the x and y index values back to parent

  const [visible, setVisible] = useState(null);
  const [miss, setMiss] = useState(null);

  const render = (x, y, status) => {
    //if (status !== "miss" && status !== "hit") {
    //console.log(x, y, status);
    //}
    if (
      status === "s1" ||
      status === "s2" ||
      status === "s3" ||
      status === "s4"
    ) {
      setVisible(true);
    } else if (status === null) {
      setMiss(true);
    }
  };
  const displayHit = () => {
    return <Text>Hit</Text>;
  };
  const displayMiss = () => {
    return <Text>Miss</Text>;
  };
  //let { x, y, status, onClick } = this.props;
  return (
    <TouchableNativeFeedback onPress={() => render(x, y, status)}>
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
});
