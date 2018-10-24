import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { Icon, List, ListItem, Card, FormInput, FormLabel, FormValidationMessage, Button } from 'react-native-elements';

import Expo from 'expo';
import { FileSystem } from 'expo';

import Reader from './Reader';

import EPub from 'epub-rn';
import TextFormPopup from './TextFormPopup';
import Fab from './Fab';

export default class Texts extends React.Component {

  state = {
    addText: false,
    addFab: false,
    reader: false,
    edit: false,
    title: null,
    texts: []
  }

  componentWillMount() {
    Expo.SecureStore.getItemAsync('texts').then((texts) => this.setState({ texts: texts ? JSON.parse(texts) : [] }))
  }

  componentDidUpdate(oldProps, oldState) {
    if (this.state.texts != oldState.texts) {
      Expo.SecureStore.setItemAsync('texts', JSON.stringify(this.state.texts))
    }
  }

  submitFormData(formData) {
    title = formData.title
    inc = 1
    while (this.state.texts.findIndex((e) => e.title === title) !== -1) {
      title = `${formData.title} ${inc++}`
    }
      
    texts = JSON.parse(JSON.stringify(this.state.texts))

    texts.push({...formData, title})

    this.setState({ texts })
  }

  deleteTitle() {
    textIndex = this.state.texts.findIndex((e) => e.title === this.state.title)
    texts = JSON.parse(JSON.stringify(this.state.texts))

    texts.splice(textIndex, 1)

    this.setState({ edit: false, formData: {}, titleEmpty: false, title: null, reader: false, texts })
  }

  async downloadEpub() {
    await Expo.DocumentPicker.getDocumentAsync({type: "application/epub+zip"}).then(async (dat) => {
      epub = new EPub(dat.uri)
      epub.parse()
      chapters = []
      epub.on('end', async () => {
        
        
        for (var i = 0; i < epub.flow.length; i++) {
        
          chapters[i] = {}
        
          var done = new Promise((res, rej) => {
            epub.getChapter(epub.flow[i].id, (err, txt) => {
              chapters[i].text = txt.replace(/<[^>]+>/g, '').replace(/\r|\n|\t/g, " ")
              
              while (chapters[i].text.indexOf("  ") !== -1) {
                chapters[i].text = chapters[i].text.replace("  ", " ")
              }

              chapters[i].text = chapters[i].text.trim()
              
              chapters[i].title = epub.flow[i].title
              chapters[i].id = epub.flow[i].id
              res()
            })
          });
          
          await done
        }

        this.submitFormData({ title: epub.metadata.title, chapters, type: 'epub' })
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
          {this.state.addFab?
            <View>
              <Fab
                name="edit"
                color="orange"
                onPress={() => this.setState({ addText: true, addFab: false })}
              />
              <Fab
                name="folder"
                color="darkorchid"
                onPress={() => {this.setState({ addFab: false }); this.downloadEpub()}}
              />
            </View>
          :null}

          <Fab
            raised
            name="add"
            onPress={() => this.setState({ addFab: !this.state.addFab })}
          />
        </View>

        {this.state.addText ?
          <TextFormPopup 
            title="Add text"
            fabLeft={{
              name: 'clear',
              color: 'red'
            }}
            onLeftFab={() => this.setState({ addText: false })}
            onSubmit={(formData) => {this.submitFormData({...formData, type: 'raw'}); this.setState({ addText: false })}}
          />
          : null
        }

        {
          this.state.reader ?
            <Card containerStyle={styles.popup} wrapperStyle={{ flex: 1 }} title={this.state.title}>
              {!this.state.edit ?
                <View style={{ flex: 1 }}>
                
                  <Reader book={this.state.texts.find((e) => e.title === this.state.title)} />

                  <Fab
                    containerStyle={styles.fabLeft}
                    name="delete"
                    color="red"
                    onPress={this.deleteTitle.bind(this)}
                  />

                  <Fab
                    containerStyle={styles.fabRight}
                    name="clear"
                    onPress={() => this.setState({ reader: false, title: null })}
                  />
                </View>
                :
                null
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
  popup: {
    position: 'absolute',
    top: 0,
    bottom: 10,
    left: 0,
    right: 0,
  }
});
