import React from 'react';
import { StyleSheet, View } from 'react-native';

import Texts from './components/Texts';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header centerComponent={{ text: 'Quick Read', style: { color: '#fff' } }} />
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
