import { StyleSheet, Platform } from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: 'RobotoBlack',
    fontSize: 50,
    marginBottom: 0,
    marginTop: 40,
  },
  subtext: {
    fontFamily: 'RobotoRegular',
    marginTop: -10,
    marginBottom: 40,
  },
  image: {
    resizeMode: 'contain',
    height: '30%',
    width: '100%',
    marginBottom: 40,
  },
  inputContainer: {
    width: '90%',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: 'RobotoRegular',
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  buttonContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5363B6',
    paddingVertical: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: 'RobotoRegular',
    color: 'white',
  },
  signUpQuestion: {
    fontFamily: 'RobotoRegular',
    color: 'gray',
    marginTop: 20,
    fontSize: 12,
  },
  textButton: {
    marginTop: 2,
  },
  textButtonText: {
    fontFamily: 'RobotoMedium',
    color: '#5363B6',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  dropdown: {
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  progressBar: {
    color: '#5363B6',
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default homeStyles;
