import React from 'react';
import { View } from 'react-native';

import { Card, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
import Fab from './Fab';
import TextFormPopupStyles from '../styles/TextFormPopupStyles';

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
        <Card containerStyle={TextFormPopupStyles.popup} wrapperStyle={{ flex: 1 }} title={this.props.title}>
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
                containerStyle={TextFormPopupStyles.fabLeft}
                {...this.props.fabLeft}
                onPress={() => this.setState({ formData: {} }, this.props.onLeftFab)}
            />
            <Fab
                containerStyle={TextFormPopupStyles.fabRight}
                color="green"
                name="done"
                onPress={this.submitFormData.bind(this)}
            />
        </Card>

    );
  }
}
