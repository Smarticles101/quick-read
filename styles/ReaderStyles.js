import { StyleSheet } from 'react-native';

const ReaderStyles = {
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
  
  export default ReaderStyles;