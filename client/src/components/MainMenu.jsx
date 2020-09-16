import React from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import PropTypes from "prop-types";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Logo from "./Logo";
import { Easing } from "react-native-reanimated";

MainMenu.propTypes = {
  navigation: PropTypes.object,
};

export default function MainMenu({ navigation }) {
  // Animate logo rotation
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Add custom buttons to direct to game mode stacks
  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Logo />
      </Animated.View>
      <TouchableNativeFeedback
        style={styles.button}
        onPress={() => {
          navigation.navigate("Single Player");
        }}
      >
        <Text style={styles.text}>Single Player</Text>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback
        style={styles.button}
        onPress={() => {
          navigation.navigate("MultiModes");
        }}
      >
        <Text style={styles.text}>Multiplayer (Under Construction)</Text>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback
        style={styles.button}
        onPress={() => {
          navigation.navigate("Chat");
        }}
      >
        <Text style={styles.text}>Chat (Under Construction)</Text>
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
  animation: {
    flex: 0,
  },
});
