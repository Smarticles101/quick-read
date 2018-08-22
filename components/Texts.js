import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { Icon, List, ListItem, Card, FormInput, FormLabel, FormValidationMessage, Button } from 'react-native-elements';

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
    texts: [
      {
        "title": "pariatur",
        "text": "Pariatur ex adipisicing incididunt duis consectetur cupidatat cupidatat consectetur pariatur reprehenderit deserunt quis. Qui non reprehenderit minim consectetur. Cupidatat consequat adipisicing eu aliqua et do duis eu. Elit est amet eu incididunt officia laborum duis anim nulla et in tempor excepteur.\r\n"
      },
      {
        "title": "consectetur",
        "text": "Sunt culpa enim labore ex sunt id adipisicing pariatur occaecat consectetur. Est ad ad sunt deserunt incididunt aliquip tempor sunt do adipisicing laboris id sit. Mollit et nostrud adipisicing deserunt adipisicing nostrud nisi est pariatur sunt. Incididunt officia sunt voluptate laborum laboris non cupidatat fugiat cillum magna quis. Exercitation fugiat do officia qui fugiat sit Lorem sint reprehenderit esse.\r\n"
      },
      {
        "title": "duis",
        "text": "Sunt nostrud officia laboris nostrud ad ex elit cupidatat eiusmod sint reprehenderit qui. Ex enim irure do consequat aute magna. Velit ex nulla aliqua aliqua tempor incididunt sint nulla. Ut amet tempor pariatur et amet sunt id consequat voluptate elit.\r\n"
      },
      {
        "title": "consequat",
        "text": "Non ea occaecat sunt non ea velit ex. Consectetur ullamco occaecat velit eu esse sit proident proident ex irure irure laborum. Aute nulla laborum velit ullamco dolore esse aute reprehenderit. Cillum nostrud id sit laborum fugiat dolore aute fugiat.\r\n"
      },
      {
        "title": "enim",
        "text": "Proident id labore qui ullamco dolore labore irure culpa Lorem laboris consequat. Id ut mollit nostrud deserunt aute ipsum consectetur occaecat et deserunt sit commodo tempor aliqua. Commodo duis est sit duis ut commodo enim eiusmod occaecat sunt aliquip laborum esse ullamco. Irure aliqua et officia ex cupidatat proident ullamco do enim eiusmod dolore. Ullamco nostrud incididunt laborum irure dolor.\r\n"
      },
      {
        "title": "cupidatat",
        "text": "Ut anim aute qui dolore cupidatat magna nisi consequat excepteur. Sit occaecat amet nulla exercitation dolor ullamco voluptate consequat mollit nulla culpa. Nostrud laborum deserunt Lorem officia eu ea labore velit. Esse dolore anim amet duis esse aliquip non aute veniam est. Tempor dolore eiusmod mollit occaecat quis.\r\n"
      },
      {
        "title": "ipsum",
        "text": "Sint sunt veniam est aliqua amet anim minim ipsum eu eiusmod. Reprehenderit nostrud nulla voluptate pariatur magna culpa dolor mollit voluptate. Et incididunt anim sit enim ipsum aliquip aliqua do reprehenderit magna ea cillum.\r\n"
      },
      {
        "title": "esse",
        "text": "Excepteur ex quis ex mollit incididunt non. Sint magna id magna reprehenderit cillum elit esse Lorem ullamco pariatur aute elit. Aliquip do nisi irure exercitation sint officia aute amet nostrud duis non. Nulla minim esse est id sunt Lorem cupidatat commodo excepteur officia nulla in eiusmod eu. Aliqua exercitation duis elit fugiat fugiat in incididunt voluptate fugiat ea aute eu cupidatat. Sint cillum non sit et consectetur est minim sit occaecat aliqua officia culpa. Aute irure eiusmod cupidatat excepteur do ullamco dolore est fugiat non exercitation occaecat.\r\n"
      },
      {
        "title": "minim",
        "text": "Magna eu Lorem ad ea nisi deserunt elit sit velit do anim est. Laboris id minim elit ea nisi Lorem velit. Amet ullamco amet nisi laborum sint reprehenderit tempor mollit elit elit incididunt. Ad nulla eu esse commodo.\r\n"
      },
      {
        "title": "Lorem ipsum",
        "text": "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then"
      }
    ]
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
          <Card containerStyle={styles.popup} title="Add text">
              {
                /*
                  TODO:
                    Exiting focus on FormInput is finnicky
                */
              }

              <FormLabel>Title</FormLabel>
              <FormInput inputStyle={{width: undefined}} onChangeText={this.formDataAddTitle.bind(this)} />
              {this.state.titleEmpty?
                <FormValidationMessage>A title is required</FormValidationMessage>
                : this.state.titleAlreadyExists ?
                  <FormValidationMessage>Title already exists</FormValidationMessage>
              : null}

              <FormLabel>Text</FormLabel>
              <FormInput multiline inputStyle={{width: undefined}} onChangeText={this.formDataAddText.bind(this)} />

              <Button buttonStyle={styles.popupButton} title="Submit" onPress={this.submitFormData.bind(this)} />
          </Card>
        :
          null
        }

        {
          this.state.reader?
            <Card containerStyle={styles.popup} title={this.state.title}>
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
    alignItems: 'stretch'
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
    alignItems: 'stretch',
    flex: 1
  },
  popupButton: {
    // TODO:
    //    how to get Button to bottom of card?
    borderRadius: 0, 
    marginLeft: 0, 
    marginRight: 0, 
    marginBottom: 0,
    marginTop: 10
  }
});