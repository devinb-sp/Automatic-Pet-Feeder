import { StyleSheet, Platform } from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 30,
  },
  label: {
    fontFamily: 'RobotoBlack',
    fontSize: 30,
    marginBottom: 20,
  },
  progressBar: {
    color: '#5363B6',
    unfilledColor: 'lightgray',
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  borderBottom: {
    //borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '90%',
    marginBottom: 40,
    marginTop: 40,
  },
});

export default homeStyles;
