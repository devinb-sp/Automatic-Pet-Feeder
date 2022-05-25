import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import "./services/firebase_config";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Firebase SDK version {firebase.SDK_VERSION}</Text>
      <Text>User is signed in: {firebaseAuth.getAuth().currentUser == null ? "False" : "True"} </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
