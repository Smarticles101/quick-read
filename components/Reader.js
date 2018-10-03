import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

import { Slider, Icon, List, ListItem } from 'react-native-elements';

const dateformat = require('dateformat');

export default class Reader extends React.Component {
  state = {
    word: null,
    pause: true,
    wpm: 250
  }

  index = 0
  paragraph = null

  componentWillMount() {

    if (this.props.book.text) {
      this.paragraph = this.props.book.text.split(" ")
    } else if (this.props.book.chapters) {
      this.paragraph = this.props.book.chapters.map((chap) => chap.text).join(" ").split(" ")
    }

    if (!this.timeout) {
      this.timeout = setTimeout(this.tick.bind(this), 1 / (this.state.wpm / 60) * 1000)
    }

    if (this.state.word === null) {
      do {
        word = this.paragraph[this.index++]
      } while (word === '')

      this.setState({ word })
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearInterval(this.timeout)
    }
  }

  tick() {
    time = 1 / (this.state.wpm / 60) * 1000
    word = this.state.word
    
    if (!this.state.pause) {
      do {
        word = this.paragraph[this.index++]
      } while (word === '')

      this.setState({ word })

      if (this.index >= this.paragraph.length) {
        // restart for now when we end the story
        this.index = 0;
      }
    }
    
    this.timeout = setTimeout(this.tick.bind(this), new RegExp(/\.$|!$|\?$|\;$|\,$/).test(word) ? time * 2 : time)
  }

  pause() {
    this.setState({ pause: true });
  }

  resume() {
    this.setState({ pause: false });
  }

  back() {
    regexp = new RegExp(/\.$|!$|\?$/)
    var i;

    for (i = this.index - 2; i >= 0; i--) {
      if (regexp.test(this.paragraph[i])) {
        this.index = i + 1;
        break;
      }
    }

    if (i <= -1) {
      this.index = 0;
    }

    word = null
      
    do {
      word = this.paragraph[this.index]
      if (word === '') this.index++
    } while (word === '')

    this.setState({ word });
  }

  forward() {
    regexp = new RegExp(/\.$|!$|\?$/)
    var i;

    for (i = this.index; i < this.paragraph.length; i++) {
      if (regexp.test(this.paragraph[i])) {
        this.index = i + 1;
        break;
      }
    }

    word = null
      
    do {
      word = this.paragraph[this.index++]
    } while (word === '')

    this.setState({ word });
  }

  updateWPM(wpm) {
    ms = 1 / (wpm / 60) * 1000;

    this.setState({ wpm });
  }

  timeLeft() {
    wordsPerSeconds = this.state.wpm / 60;

    timeLeft = Math.round((this.paragraph.length - this.index)/wordsPerSeconds);

    timeLeft = new Date(timeLeft * 1000);

    response = dateformat(timeLeft, "UTC:hh:MM:ss");

    if(timeLeft < 3600 * 1000) {
      response = response.replace("12", "00");
    }

    return response;
  }

  centerWord(word) {
      ind = Math.floor(word.length / 2)
      if (ind % 2 === 0)
        ind -= 1

      return {
          center: word.charAt(ind),
          left: word.substring(0, ind),
          right: word.substring(ind+1)
      }
  }

  render() {
    centeredWord = this.centerWord(this.state.word)

    return (
      <View style={styles.container}>
        {this.props.book.chapters? 
        <ScrollView
          style={styles.chapterScroll}
        >
          <List>
            {
              this.props.book.chapters.map((chap, ind, arr) => 
                chap.title ?
                <ListItem
                  key={chap.id}
                  title={chap.title}
                  onPress={() => {
                    index = 0;

                    for (var i = 0; i < ind; i++) {
                      index += arr[i].text.split(" ").length
                    }

                    this.index = index
                    this.setState({ word: this.paragraph[index] })
                  }}
                />
                :
                null
              )
            }
          </List>
        </ScrollView>
        :
        null
        }

        <View style={{marginTop: 50, marginBottom: 20, flexDirection: 'row'}}>
          <Text style={{...styles.paragraph, flex: 1, textAlign: 'right'}}>{centeredWord.left}</Text>
          <Text style={{...styles.paragraph, color: 'red'}}>{centeredWord.center}</Text>
          <Text style={{...styles.paragraph, flex: 1, textAlign: 'left'}}>{centeredWord.right}</Text>
        </View>

        <View style={styles.buttonBar}>
          <Icon size={30} name="fast-rewind" onPress={this.back.bind(this)} />
          {!this.state.pause ?
            <Icon size={30} name="pause" onPress={this.pause.bind(this)} />
            :
            <Icon size={30} name="play-arrow" onPress={this.resume.bind(this)} />
          }
          <Icon size={30} name="fast-forward" onPress={this.forward.bind(this)} />
        </View>

        <Slider
          minimumValue={50}
          maximumValue={1000}
          step={5}
          value={this.state.wpm}
          onValueChange={this.updateWPM.bind(this)}
        />

        <Text style={styles.statusText}>
          {`${this.state.wpm}wpm\n${this.index}/${this.paragraph.length}\n${this.timeLeft()}`}
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: 'stretch',
    flex: 1
  },
  paragraph: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusText: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 24
  },
  chapterScroll: {
    height: 50,
    flexGrow: 0
  }
};
