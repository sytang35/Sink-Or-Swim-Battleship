import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

MainMenu.propTypes = {
  navigation: PropTypes.object,
};

export default function MainMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        style={styles.button}
        onPress={() => {
          navigation.navigate("Game");
        }}
      >
        <Text style={styles.text}>Solitary Mode</Text>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback
        style={styles.button}
        onPress={() => {
          navigation.navigate("");
        }}
      >
        <Text style={styles.text}>Multiplayer (Under Construction)</Text>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
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
