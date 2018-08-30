import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Slider, Icon } from 'react-native-elements';

export default class Reader extends React.Component {
  state = {
    word: null,
    pause: true,
    wpm: 250
  }

  index = 0
  paragraph = null

  componentWillMount() {

    this.paragraph = this.props.paragraph.split(/ |\n/g)

    if (!this.interval) {
      this.interval = setInterval(this.nextWord.bind(this), 1 / (this.state.wpm / 60) * 1000)
    }

    if (this.state.word === null) {
      this.setState({ word: this.paragraph[this.index++] })
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  nextWord() {
    if (!this.state.pause) {
      word = null
      
      do {
        word = this.paragraph[this.index++]
      } while (word === '')

      this.setState({ word })

      if (this.index >= this.paragraph.length) {
        // restart for now when we end the story
        this.index = 0;
      }
    }
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

    clearInterval(this.interval);
    this.interval = setInterval(this.nextWord.bind(this), ms)

    this.setState({ wpm });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {this.state.word}
        </Text>

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
          step={50}
          value={this.state.wpm}
          onValueChange={this.updateWPM.bind(this)}
        />

        <Text style={styles.statusText}>
          {`${this.state.wpm}wpm\n${this.index}/${this.paragraph.length}`}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    marginTop: 50,
    flex: 1
  },
  paragraph: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  statusText: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 24
  }
});
