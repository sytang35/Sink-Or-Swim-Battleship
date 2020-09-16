import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import PropTypes from "prop-types";

Difficulty.propTypes = {
  navigation: PropTypes.object,
};

export default function Difficulty({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() =>
          navigation.navigate("SingleGame", { difficulty: "easy" })
        }
        style={styles.button}
      >
        <View>
          <Text style={styles.text}>Easy</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() =>
          navigation.navigate("SingleGame", { difficulty: "medium" })
        }
        style={styles.button}
      >
        <View>
          <Text style={styles.text}>Medium</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() =>
          navigation.navigate("SingleGame", { difficulty: "hard" })
        }
        style={styles.button}
      >
        <View>
          <Text style={styles.text}>Hard</Text>
        </View>
      </TouchableHighlight>
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
