import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

export default class ModalTester extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent:'center' }}>
        <Button title="Show modal" onPress={this.toggleModal} />
        <Modal isVisible={this.state.isModalVisible}
        deviceHeight={300}
        backdropColor={'white'}
        coverScreen={true}
        style={{margin:40}}
        >
          <View style={{ flex: 1 , marginTop:300}}>
            <Text>Hello!</Text>
            <Text>Hello!</Text>
            <Text>Hello!</Text>
            <Button title="Hide modal" onPress={this.toggleModal} />
          </View>
        </Modal>
      </View>
    );
  }
}