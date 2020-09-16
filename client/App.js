import React from "react";
import "react-native-gesture-handler";
import {
  createStackNavigator,
  //StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
//import { StyleSheet } from "react-native";

import MainMenu from "./src/components/MainMenu";

import Difficulty from "./src/components/singlePlayer/Difficulty";
import Game from "./src/components/singlePlayer/Game";

import MultiModes from "./src/components/multiplayer/MultiModes";
import Chat from "./src/components/multiplayer/Chat";
import Rooms from "./src/components/multiplayer/fogMode/Rooms";
import Multiplayer from "./src/components/multiplayer/classic/Game";
import Fog from "./src/components/multiplayer/fogMode/Game";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MainMenu} />

        <Stack.Screen name="Single Player" component={Difficulty} />
        <Stack.Screen name="SingleGame" component={Game} />

        <Stack.Screen name="MultiModes" component={MultiModes} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Classic" component={Multiplayer} />
        <Stack.Screen name="Rooms" component={Rooms} />
        <Stack.Screen name="Fog" component={Fog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
