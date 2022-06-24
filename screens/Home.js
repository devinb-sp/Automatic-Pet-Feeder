import * as React from 'react';
import { View, Text } from 'react-native';
import styles from '../util/styles';

apiHelper = ApiHelper();

const Home = () => {
  const handleStartMotor = () => {
    apiHelper.startMotor();
  };

  const handleStopMotor = () => {
    apiHelper.stopMotor();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'RobotoBlack', fontSize: 50 }}>Home</Text>
      <TouchableOpacity onPress={handleStartMotor} style={styles.button}>
        <Text style={styles.buttonText}>Start Motor</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleStopMotor} style={styles.button}>
        <Text style={styles.buttonText}>Start Motor</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
