import { StyleSheet } from 'react-native';

const TextFormPopupStyles = StyleSheet.create({
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

  export default TextFormPopupStyles;