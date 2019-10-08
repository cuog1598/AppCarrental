import React, {Component} from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

export default class List extends Component {
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          padding: 16,
          backgroundColor: 'yellow',
          width: '100%',
          height: 100,
        }}>
        <Text>{item.key}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[{ key: 1 }, { key: 2 }, { key: 3 }]}
          renderItem={this._renderItem}
          horizontal={true}
                ItemSeparatorComponent={() => <View style={{margin: 4}}/>}
                keyExtractor={() => Math.random().toString(36).substr(2, 9)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flex: 1,
  },
});
