import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { Icon, List, ListItem, Card, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';

export default class Texts extends React.Component {

  state = {
    addText: false,
    formData: {},
    texts: [
      {
        "title": "pariatur",
        "story": "Pariatur ex adipisicing incididunt duis consectetur cupidatat cupidatat consectetur pariatur reprehenderit deserunt quis. Qui non reprehenderit minim consectetur. Cupidatat consequat adipisicing eu aliqua et do duis eu. Elit est amet eu incididunt officia laborum duis anim nulla et in tempor excepteur.\r\n"
      },
      {
        "title": "consectetur",
        "story": "Sunt culpa enim labore ex sunt id adipisicing pariatur occaecat consectetur. Est ad ad sunt deserunt incididunt aliquip tempor sunt do adipisicing laboris id sit. Mollit et nostrud adipisicing deserunt adipisicing nostrud nisi est pariatur sunt. Incididunt officia sunt voluptate laborum laboris non cupidatat fugiat cillum magna quis. Exercitation fugiat do officia qui fugiat sit Lorem sint reprehenderit esse.\r\n"
      },
      {
        "title": "duis",
        "story": "Sunt nostrud officia laboris nostrud ad ex elit cupidatat eiusmod sint reprehenderit qui. Ex enim irure do consequat aute magna. Velit ex nulla aliqua aliqua tempor incididunt sint nulla. Ut amet tempor pariatur et amet sunt id consequat voluptate elit.\r\n"
      },
      {
        "title": "consequat",
        "story": "Non ea occaecat sunt non ea velit ex. Consectetur ullamco occaecat velit eu esse sit proident proident ex irure irure laborum. Aute nulla laborum velit ullamco dolore esse aute reprehenderit. Cillum nostrud id sit laborum fugiat dolore aute fugiat.\r\n"
      },
      {
        "title": "enim",
        "story": "Proident id labore qui ullamco dolore labore irure culpa Lorem laboris consequat. Id ut mollit nostrud deserunt aute ipsum consectetur occaecat et deserunt sit commodo tempor aliqua. Commodo duis est sit duis ut commodo enim eiusmod occaecat sunt aliquip laborum esse ullamco. Irure aliqua et officia ex cupidatat proident ullamco do enim eiusmod dolore. Ullamco nostrud incididunt laborum irure dolor.\r\n"
      },
      {
        "title": "cupidatat",
        "story": "Ut anim aute qui dolore cupidatat magna nisi consequat excepteur. Sit occaecat amet nulla exercitation dolor ullamco voluptate consequat mollit nulla culpa. Nostrud laborum deserunt Lorem officia eu ea labore velit. Esse dolore anim amet duis esse aliquip non aute veniam est. Tempor dolore eiusmod mollit occaecat quis.\r\n"
      },
      {
        "title": "ipsum",
        "story": "Sint sunt veniam est aliqua amet anim minim ipsum eu eiusmod. Reprehenderit nostrud nulla voluptate pariatur magna culpa dolor mollit voluptate. Et incididunt anim sit enim ipsum aliquip aliqua do reprehenderit magna ea cillum.\r\n"
      },
      {
        "title": "esse",
        "story": "Excepteur ex quis ex mollit incididunt non. Sint magna id magna reprehenderit cillum elit esse Lorem ullamco pariatur aute elit. Aliquip do nisi irure exercitation sint officia aute amet nostrud duis non. Nulla minim esse est id sunt Lorem cupidatat commodo excepteur officia nulla in eiusmod eu. Aliqua exercitation duis elit fugiat fugiat in incididunt voluptate fugiat ea aute eu cupidatat. Sint cillum non sit et consectetur est minim sit occaecat aliqua officia culpa. Aute irure eiusmod cupidatat excepteur do ullamco dolore est fugiat non exercitation occaecat.\r\n"
      },
      {
        "title": "minim",
        "story": "Magna eu Lorem ad ea nisi deserunt elit sit velit do anim est. Laboris id minim elit ea nisi Lorem velit. Amet ullamco amet nisi laborum sint reprehenderit tempor mollit elit elit incididunt. Ad nulla eu esse commodo.\r\n"
      }
    ]
  }

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <ScrollView>
          <List>
            {
              this.state.texts.map(element =>
                <ListItem
                  key={element.title}
                  title={element.title}
                  onPress={() => this.setState()}
                />
              )
            }
          </List>
        </ScrollView>

        <View style={styles.button}>
          <Icon
            reverse
            raised
            name="add"
            onPress={() => this.setState({ addText: true })}
          />
        </View>

        {this.state.addText?
          <Card containerStyle={styles.popup} title="Add text">
              <FormLabel>Title</FormLabel>
              <FormInput inputStyle={{width: undefined}}/>
              <FormValidationMessage>A title is required</FormValidationMessage>
              <FormLabel>Text</FormLabel>
              <FormInput multiline inputStyle={{width: undefined}}/>
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
  button: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  popup: {
    zIndex: 10,
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 10,
    left: 0,
    right: 0
  },
});
