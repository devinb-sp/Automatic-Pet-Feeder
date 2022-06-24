import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
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
    //marginTop: 10,
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
});

const Settings = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {});
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'RobotoBlack', fontSize: 50 }}>Settings</Text>
      <Text>EMAIL: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.textButton}>
        <Text style={styles.textButtonText}>SIGN OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
