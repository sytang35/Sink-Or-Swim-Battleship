import React from "react";
import { Text, View, StyleSheet } from "react-native";
import io from "socket.io-client";
import { TextInput } from "react-native-gesture-handler";

class Chat extends React.Component {
  state = {
    chatMessage: "",
    chatMessages: [],
  };
  submitChatMessage() {
    this.socket.emit("response", this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  componentDidMount() {
    //this.socket = io("http://127.0.0.1:3000");
    this.socket = io("http://192.168.100.110:3000");
    this.socket.on("response", (msg) => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  }
  render() {
    const chatMessages = this.state.chatMessages.map((chatMessage) => (
      <Text style={{ borderWidth: 2, top: 200, justifyContent: "center" }}>
        {chatMessage}
      </Text>
    ));
    return (
      <View style={styles.container}>
        {chatMessages}
        <TextInput
          style={{ height: 40, borderWidth: 2, top: 300 }}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={(chatMessage) => {
            this.setState({ chatMessage });
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
});

export default Chat;
