import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import petFeederImage from '../assets/images/petfeeder.png';
import loginStyles from '../stylesheets/loginStyles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('After Login');
        const uid = user.uid;
      } else {
        // User is signed out
        navigation.navigate('Login');
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={loginStyles.container} behavior="padding">
      <Image style={loginStyles.image} source={petFeederImage}></Image>
      <View style={loginStyles.inputContainer}>
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
        <TouchableOpacity onPress={handleLogin} style={loginStyles.button}>
          <Text style={loginStyles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={loginStyles.signUpQuestion}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignUp} style={loginStyles.textButton}>
          <Text style={loginStyles.textButtonText}>SIGN UP NOW</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
