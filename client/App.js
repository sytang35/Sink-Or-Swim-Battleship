import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import MainMenu from "./src/components/MainMenu";

import Difficulty from "./src/components/singlePlayer/Difficulty";
import Game from "./src/components/singlePlayer/Game";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MainMenu} />

        <Stack.Screen name="Single Player" component={Difficulty} />
        <Stack.Screen name="SingleGame" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
