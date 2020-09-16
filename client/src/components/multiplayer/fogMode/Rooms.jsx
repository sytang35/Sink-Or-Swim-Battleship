import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import io from "socket.io-client";
import { url } from "../serverURL";
import Game from "./Game";

export default function Rooms() {
  const p1 = "p1";
  const p2 = "p2";

  const [name, setName] = useState("");
  const [codeName, setCodeName] = useState("");

  let socket = io.connect(url),
    player,
    game;

  const newGame = () => {
    socket.emit("createGame", { name: name });
    player = p1;
  };
  const joinGame = () => {
    socket.emit("joinGame", { name: codeName });
    player = p2;
  };
  socket.on("newGame", (data) => {
    game = Game(data.room);
  });
  //socket.on("player1",data=>{

  //})

  return (
    <View>
      <View>
        <Text>Friendly Fire Mode</Text>
      </View>

      <View>
        <Text>Create a Room</Text>
        <TextInput
          onChangeText={(text) => setName(text)}
          value={name}
        ></TextInput>
        <Button title="New Room" onPress={newGame}></Button>
      </View>

      <View>
        <Text>Join a Room</Text>
        <TextInput
          onChangeText={(text) => setCodeName(text)}
          value={codeName}
        ></TextInput>
        <Button title="Join Room" onPress={joinGame}></Button>
      </View>
    </View>
  );
}
