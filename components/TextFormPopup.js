import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Card, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
import Fab from './Fab';

export default class TextFormPopup extends React.Component {

  state = {
      formData: {
          title: null,
          text: null
      }
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
        this.setState({ titleEmpty: true })
    } else {
        this.props.onSubmit(this.state.formData);
    }
  }

  render() {
    return (
        <Card containerStyle={styles.popup} wrapperStyle={{ flex: 1 }} title={this.props.title}>
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
                : null}

                <FormLabel>Text</FormLabel>
                <FormInput multiline maxHeight={200} inputStyle={{ width: undefined }} value={this.state.formData.text} onChangeText={this.formDataAddText.bind(this)} />
            </View>

            <Fab
                containerStyle={styles.fabLeft}
                {...this.props.fabLeft}
                onPress={() => this.setState({ formData: {} }, this.props.onLeftFab)}
            />
            <Fab
                containerStyle={styles.fabRight}
                color="green"
                name="done"
                onPress={this.submitFormData.bind(this)}
            />
        </Card>

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
