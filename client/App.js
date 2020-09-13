import React from "react";
import "react-native-gesture-handler";
import {
  createStackNavigator,
  //StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
//import { StyleSheet } from "react-native";

import MainMenu from "./src/components/MainMenu";
import Board from "./src/components/singlePlayer/Board";
import Multiplayer from "./src/components/multiplayer/Game";
import Chat from "./src/components/multiplayer/Chat";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MainMenu} />
        <Stack.Screen name="Single Player" component={Board} />
        <Stack.Screen name="Multiplayer" component={Multiplayer} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
