import { StyleSheet } from 'react-native';

const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
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
  heading1: {
    fontFamily: 'RobotoBlack',
    fontSize: 20,
    width: '90%',
    marginBottom: 20,
    marginLeft: '5%',
  },
  heading2: {
    fontFamily: 'RobotoBold',
    fontSize: 18,
    width: '90%',
    marginBottom: 10,
    marginTop: 20,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '90%',
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  label: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    width: '90%',
    marginBottom: 10,
    marginLeft: '5%',
  },
  field: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: 'RobotoRegular',
    borderColor: 'lightgray',
    borderWidth: 1,
    marginRight: '5%',
    marginLeft: '5%',
  },
  dropdown: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontFamily: 'RobotoRegular',
    borderColor: 'lightgray',
    borderWidth: 1,
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 10,
    borderRadius: 0,
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
    marginTop: 10,
    marginBottom: 10,
    marginRight: '5%',
    marginLeft: '5%',
  },
  buttonText: {
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
    marginBottom: 20,
  },
});

export default settingsStyles;
