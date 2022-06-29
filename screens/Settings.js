import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../util/styles';
import { ApiHelper } from '../helpers/api_helper';
('../helpers/api_helper');

const apiHelper = new ApiHelper();

const Settings = () => {
  const [foodAmounts, setFoodAmounts] = useState([]);
  const [foodTimes, setFoodTimes] = useState([]);

  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetSchedule = async () => {
    const result = await apiHelper.getFoodSchedule();
    setFoodAmounts(result.food.amounts);
    setFoodTimes(result.food.times);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'RobotoBlack', fontSize: 50 }}>Settings</Text>
      <Text>EMAIL: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.textButton}>
        <Text style={styles.textButtonText}>SIGN OUT</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGetSchedule} style={styles.textButton}>
        <Text style={styles.textButtonText}>Get schedule</Text>
      </TouchableOpacity>
      <Text style={{ fontFamily: 'RobotoBlack', fontSize: 20 }}>Food Schedule</Text>
      {foodAmounts?.map((amount, index) => (
        <AmountAndTimeScheduleInput
          amount={amount}
          time={new Date(Date.parse(foodTimes[index])).toLocaleTimeString() ?? ''}
        />
      ))}
    </View>
  );
};

const AmountAndTimeScheduleInput = (props) => {
  return (
    <View style={styles.center}>
      <View style={styles.rowContainer}>
        <TextInput
          key={props.amount}
          placeholder="Amount"
          value={props.amount.toString()}
          onChangeText={(text) => {}}
          style={styles.input}
        />
        <Text key={props.amount.toString() + 'text'}>Cups</Text>
      </View>
      <TextInput
        key={props.time}
        placeholder="Time"
        value={props.time.toString()}
        onChangeText={(text) => {}}
        style={styles.input}
      />
    </View>
  );
};

export default Settings;
