import { StyleSheet, Platform } from 'react-native';

const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  textButton: {
    marginTop: 2,
  },
  textButtonText: {
    fontFamily: 'RobotoMedium',
    color: '#5363B6',
  },
  fieldsContainer: {
    width: '90%',
  },
  fields: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: 'RobotoRegular',
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  buttons: {
    backgroundColor: '#5363B6',
    paddingVertical: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonsText: {
    fontFamily: 'RobotoRegular',
    color: 'white',
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    left: 0,
  },
  btnDone: {
    right: 0,
  },
  signOutContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default settingsStyles;
