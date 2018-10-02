import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';

import Texts from './components/Texts';
import AppStyles from './styles/AppStyles';

export default class App extends React.Component {
  render() {
    return (
      <View style={AppStyles.container}>
        <Header centerComponent={{ text: 'Quick Read', style: AppStyles.header }} />
        <Texts />
      </View>
    );
  }
}
