import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

import Texts from './components/Texts';
import Reader from './components/Reader';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header centerComponent={{ text: 'Quick Read', style: { color: '#fff' } }}/>
        <Texts />
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
  },
});
