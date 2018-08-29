import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { Icon, List, ListItem, Card, FormInput, FormLabel, FormValidationMessage, Button } from 'react-native-elements';

import Expo from 'expo';
import { FileSystem } from 'expo';

import Reader from './Reader';

import EPub from 'epub-rn';

export default class Texts extends React.Component {

  state = {
    addText: false,
    reader: false,
    edit: false,
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
    Expo.SecureStore.getItemAsync('texts').then((texts) => this.setState({ texts: texts ? JSON.parse(texts) : [] }))
  }

  componentDidUpdate(oldProps, oldState) {
    //console.log(this.state.texts.length);
    //console.log(oldState.texts.length);
    //if (this.state.texts != oldState.texts) {
    //  console.log('Saving')
    Expo.SecureStore.setItemAsync('texts', JSON.stringify(this.state.texts))
    //}

    // Not sure why this doesn't work????
    // Let's just save all the time ;)
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
    }
  }

  editTitleSubmitFormData() {
    if (!this.state.formData.title) {
      this.setState({ titleEmpty: true, titleAlreadyExists: false })
    } else {
      textIndex = this.state.texts.findIndex((e) => e.title === this.state.title)
      texts = this.state.texts

      texts.splice(textIndex, 1, this.state.formData)

      this.setState({ edit: false, formData: {}, titleEmpty: false, title: this.state.formData.title, texts })
    }
  }

  deleteTitle() {
    textIndex = this.state.texts.findIndex((e) => e.title === this.state.title)
    texts = this.state.texts

    texts.splice(textIndex, 1)

    this.setState({ edit: false, formData: {}, titleEmpty: false, title: null, reader: false, texts })
  }

  async downloadEpub() {
    await Expo.DocumentPicker.getDocumentAsync({type: "application/epub+zip"}).then(async (dat) => {
      console.log(dat.uri)
      epub = new EPub(dat.uri)
      epub.parse()
      texts = []
      epub.on('end', async () => {

        this.formDataAddTitle(epub.metadata.title)
        
        for (var i = 0; i < epub.flow.length; i++) {
          var done = new Promise((res, rej) => {

            epub.getChapter(epub.flow[i].id, (err, txt) => {
              texts[i] = txt.replace(/<[^>]+>/g, '')
              res()
              console.log('yee')
            })
          });
          
          await done
        }

        this.formDataAddText(texts.join(" "))
      })
    })
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
              )
            }
          </List>
        </ScrollView>

        <View style={styles.fabRight}>
          <Icon
            reverse
            raised
            name="add"
            onPress={() => this.setState({ addText: true })}
          />
        </View>

        {this.state.addText ?
          <Card containerStyle={styles.popup} wrapperStyle={{ flex: 1 }} title="Add text">
            {
              /*
                TODO:
                  Exiting focus on FormInput is finnicky
              */
            }
            <View style={{ flex: 1 }}>
              <FormLabel>Title</FormLabel>
              <FormInput inputStyle={{ width: undefined }} value={this.state.formData.title} onChangeText={this.formDataAddTitle.bind(this)} />
              {this.state.titleEmpty ?
                <FormValidationMessage>A title is required</FormValidationMessage>
                : this.state.titleAlreadyExists ?
                  <FormValidationMessage>Title already exists</FormValidationMessage>
                  : null}

              <FormLabel>Text</FormLabel>
              <FormInput multiline maxHeight={200} inputStyle={{ width: undefined }} value={this.state.formData.text} onChangeText={this.formDataAddText.bind(this)} />
            </View>
            
            <View style={styles.fabCenter}>
              <Icon 
                name='folder'
                color='orange'
                reverse
                onPress={this.downloadEpub.bind(this)}
              />
            </View>

            <Icon
              containerStyle={styles.fabLeft}
              reverse
              color='red'
              name="clear"
              onPress={() => this.setState({ addText: false, formData: {} })}
            />
            <Icon
              containerStyle={styles.fabRight}
              reverse
              color='green'
              name="done"
              onPress={this.submitFormData.bind(this)}
            />
          </Card>
          :
          null
        }

        {
          this.state.reader ?
            <Card containerStyle={styles.popup} wrapperStyle={{ flex: 1 }} title={this.state.title}>
              {!this.state.edit ?
                <View style={{ flex: 1 }}>
                  <Reader paragraph={this.state.texts.find((e) => e.title === this.state.title).text} />

                  <Icon
                    containerStyle={styles.fabRight}
                    reverse
                    name="clear"
                    onPress={() => this.setState({ reader: false, title: null })}
                  />

                  <Icon
                    containerStyle={styles.fabLeft}
                    reverse
                    color="orange"
                    name="edit"
                    onPress={() => this.setState({ edit: true, formData: { title: this.state.title, text: this.state.texts.find((e) => e.title === this.state.title).text } })}
                  />
                </View>
                :
                <View style={{ flex: 1 }}>
                  <FormLabel>Title</FormLabel>
                  <FormInput inputStyle={{ width: undefined }} value={this.state.formData.title} onChangeText={this.formDataAddTitle.bind(this)} />
                  {this.state.titleEmpty ?
                    <FormValidationMessage>A title is required</FormValidationMessage>
                    : null}

                  <FormLabel>Text</FormLabel>
                  <FormInput multiline maxHeight={200} inputStyle={{ width: undefined }} value={this.state.formData.text} onChangeText={this.formDataAddText.bind(this)} />
                  
                  <Icon
                    containerStyle={styles.fabLeft}
                    reverse
                    color="red"
                    name="delete"
                    onPress={this.deleteTitle.bind(this)}
                  />

                  <Icon
                    containerStyle={styles.fabRight}
                    reverse
                    color="green"
                    name="done"
                    onPress={this.editTitleSubmitFormData.bind(this)}
                  />
                </View>
              }
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
  fabRight: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  fabLeft: {
    position: 'absolute',
    left: 10,
    bottom: 10
  },
  fabCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  popup: {
    position: 'absolute',
    top: 0,
    bottom: 10,
    left: 0,
    right: 0,
  },
  popupButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  }
});
