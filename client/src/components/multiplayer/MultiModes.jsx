import React from "react";
import { View, Text, TouchableNativeFeedback, StyleSheet } from "react-native";
import PropTypes from "prop-types";

MultiModes.propTypes = {
  navigation: PropTypes.object,
};

export default function MultiModes({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        style={styles.button}
        onPress={() => {
          navigation.navigate("Classic");
        }}
      >
        <Text style={styles.text}>Classic (Under Construction)</Text>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback
        style={styles.button}
        onPress={() => {
          navigation.navigate("Fog");
        }}
      >
        <Text style={styles.text}>Friendly Fire (Under Construction)</Text>
      </TouchableNativeFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    //flex: 0.5,
    flex: 1,
    backgroundColor: "cornflowerblue",
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: "deepskyblue",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
