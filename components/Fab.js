import React from 'react';
import { Icon } from 'react-native-elements';

export default class Fab extends React.Component {

    render() {
        return(
            <Icon
                reverse
                {...this.props}
            />
        );
    }
}