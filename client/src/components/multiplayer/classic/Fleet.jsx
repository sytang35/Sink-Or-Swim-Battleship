import React from "react";
import Ships from "./factory/ships";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

// Show list of ships
export default function Fleet() {
  const shipName = [
    "carrier",
    "battleship",
    "cruiser",
    "submarine",
    "destroyer",
  ];

  let fleet = [];
  const ships = shipName.forEach((ship) => {
    fleet.push(Ships(ship));
  });
  //console.log(fleet);

  const renderItem = fleet.forEach((item) => (
    <View style={styles.fleet}>{item.getName()}</View>
  ));

  return (
    <View style={styles.fleet}>
      <FlatList
        //style={styles.fleet}
        key={ships}
        data={fleet}
        renderItem={renderItem}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  fleet: {
    fontSize: 30,
    color: "black",
    justifyContent: "center",
    flex: 1,
  },
});
