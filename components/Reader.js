import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Button, Slider, Icon } from 'react-native-elements';

export default class Reader extends React.Component {
  state = {
    word: null,
    pause: true,
    wpm: 250
  }

  index = 0
  paragraph = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then".split(" ")

  componentDidMount() {
    if (!this.interval) {
      this.interval = setInterval(this.nextWord.bind(this), 1 / (this.state.wpm/ 60) * 1000 )
    }

    if (this.state.word === null) {
      this.setState({ word: this.paragraph[this.index++] })
    }
  }

  nextWord() {
    if (!this.state.pause) {
      this.setState({ word: this.paragraph[this.index++] })

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
    var i;

    for (i = this.index - 2; i >= 0; i--) {
      if (this.paragraph[i].endsWith('.')) {
        this.index = i + 1;
        break;
      }
    }

    if (i <= -1) {
      this.index = 0;
    }

    this.setState({ word: this.paragraph[this.index] })
  }

  forward() {
    var i;

    for (i = this.index; i < this.paragraph.length; i++) {
      if (this.paragraph[i].endsWith('.')) {
        this.index = i + 1;
        break;
      }
    }
    
    this.setState({ word: this.paragraph[this.index] });
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
          <Icon reverse name="fast-rewind" onPress={this.back.bind(this)} />
          {!this.state.pause?
            <Icon reverse name="pause" onPress={this.pause.bind(this)} />
          :
            <Icon reverse name="play-arrow" onPress={this.resume.bind(this)} />
          }
          <Icon reverse name="fast-forward" onPress={this.forward.bind(this)} />
        </View>

        <Text style={styles.statusText}>
          WPM: {this.state.wpm}
        </Text>

        <Slider
          minimumValue={50}
          maximumValue={1000}
          step={50}
          value={this.state.wpm}
          onValueChange={this.updateWPM.bind(this)}
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e', 
  },
  statusText: {
    textAlign: 'center',
    fontSize: 20,
    margin: 5    
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
