import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

import Reader from './components/Reader';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Reader />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  },
});
