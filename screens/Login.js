import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import petFeederImage from '../assets/images/petfeeder.png';

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

const Login = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.welcomeText}>WELCOME</Text>
      <Text style={styles.subtext}>To your automatic pet feeder</Text>
      <Image style={styles.image} source={petFeederImage}></Image>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          //value={}
          //onChangeText={text => }
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          //value={}
          //onChangeText={text => }
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.signUpQuestion}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => {}} style={styles.textButton}>
          <Text style={styles.textButtonText}>SIGN UP NOW</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
