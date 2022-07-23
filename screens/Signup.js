import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import petFeederImage from '../assets/images/petfeeder.png';
import loginStyles from '../stylesheets/loginStyles';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };

  const goBack = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView style={loginStyles.container} behavior="padding">
      <Image style={loginStyles.image} source={petFeederImage}></Image>
      <View style={loginStyles.inputContainer}>
        <TextInput placeholder="First Name" style={loginStyles.input} />
        <TextInput placeholder="Last Name" style={loginStyles.input} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={loginStyles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={loginStyles.input}
          secureTextEntry
        />
      </View>

      <View style={loginStyles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={loginStyles.button}>
          <Text style={loginStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={loginStyles.signUpQuestion}>Already have an account?</Text>
        <TouchableOpacity onPress={goBack} style={loginStyles.textButton}>
          <Text style={loginStyles.textButtonText}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
