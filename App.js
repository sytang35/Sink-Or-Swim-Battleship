import React from "react";
import "react-native-gesture-handler";
import {
  createStackNavigator,
  //StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
//import { StyleSheet } from "react-native";

import MainMenu from "./src/components/MainMenu";
import Board from "./src/components/Board";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MainMenu} />
        <Stack.Screen name="Game" component={Board} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//const styles = StyleSheet.create({
//container: {
//flex: 1,
//backgroundColor: "black",
//alignItems: "center",
//justifyContent: "center",
//},
//text: {
//color: "white",
//},
//});
