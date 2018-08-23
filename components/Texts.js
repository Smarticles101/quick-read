import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { Icon, List, ListItem, Card, FormInput, FormLabel, FormValidationMessage, Button } from 'react-native-elements';

import Expo from 'expo';

import Reader from './Reader';

export default class Texts extends React.Component {

  state = {
    addText: false,
    reader: false,
    title: null,
    titleEmpty: false,
    titleAlreadyExists: false,
    formData: {
      title: null,
      text: null
    },
    texts: []
  }

  componentWillMount() {
    Expo.SecureStore.getItemAsync('texts').then((texts) => this.setState({ texts: texts? JSON.parse(texts) : [] }))
  }

  formDataAddTitle(title) {
    formData = this.state.formData

    formData.title = title

    this.setState({ formData })
  }

  formDataAddText(text) {
    formData = this.state.formData

    formData.text = text

    this.setState({ formData })
  }

  submitFormData() {
    if (!this.state.formData.title) {
      this.setState({ titleEmpty: true, titleAlreadyExists: false })
    } else if (this.state.texts.findIndex((e) => e.title === this.state.formData.title) !== -1) {
      this.setState({ titleAlreadyExists: true, titleEmpty: false })
    } else {
      texts = this.state.texts

      texts.push(this.state.formData)

      this.setState({
        texts,
        formData: {
          title: null,
          text: null
        },
        addText: false,
        titleEmpty: false,
        titleAlreadyExists: false
      })

      Expo.SecureStore.setItemAsync('texts', JSON.stringify(texts))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <List>
            {
              this.state.texts.map(element =>
                <ListItem
                  key={element.title}
                  title={element.title}
                  onPress={() => this.setState({ title: element.title, reader: true })}
                />

                /*
                  TODO:
                    Open reader in a full-screen view rather than popup?
                */
              )
            }
          </List>
        </ScrollView>

        <View style={styles.fab}>
          <Icon
            reverse
            raised
            name="add"
            onPress={() => this.setState({ addText: true })}
          />
        </View>

        {this.state.addText?
          <Card containerStyle={styles.popup} wrapperStyle={{flex: 1}} title="Add text">
              {
                /*
                  TODO:
                    Exiting focus on FormInput is finnicky
                */
              }
              <View style={{flex: 1}}>
                  <FormLabel>Title</FormLabel>
                  <FormInput inputStyle={{width: undefined}} onChangeText={this.formDataAddTitle.bind(this)} />
                  {this.state.titleEmpty?
                    <FormValidationMessage>A title is required</FormValidationMessage>
                    : this.state.titleAlreadyExists ?
                      <FormValidationMessage>Title already exists</FormValidationMessage>
                  : null}
    
                  <FormLabel>Text</FormLabel>
                  <FormInput multiline maxHeight={200} inputStyle={{width: undefined}} onChangeText={this.formDataAddText.bind(this)} />
              </View>
              
              <Button buttonStyle={styles.popupButton} title="Submit" onPress={this.submitFormData.bind(this)} />
          </Card>
        :
          null
        }

        {
          this.state.reader?
            <Card containerStyle={styles.popup} wrapperStyle={{flex: 1}} title={this.state.title}>
              <Reader paragraph={this.state.texts.find((e) => e.title === this.state.title).text} />
              
              <Button buttonStyle={styles.popupButton} title="Close" onPress={() => this.setState({ reader: false, title: null })} />
            </Card>
          :
            null
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  popup: {
    position: 'absolute',
    top: 0,
    bottom: 10,
    left: 0,
    right: 0,
  },
  popupButton: {
    // TODO:
    //    how to get Button to bottom of card?
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  }
});
