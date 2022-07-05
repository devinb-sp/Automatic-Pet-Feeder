import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../util/styles';
import { ApiHelper } from '../helpers/api_helper';
('../helpers/api_helper');
import DropDownPicker from 'react-native-dropdown-picker';

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

  const handleUpdateSchedule = async (amounts, times) => {
    apiHelper.updateFoodSchedule(amounts, times);
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
          key={amount}
          amount={amount}
          time={new Date(Date.parse(foodTimes[index])).toLocaleTimeString() ?? ''}
        />
      ))}
      <FoodFrequencyDropdown />
      <TouchableOpacity onPress={handleUpdateSchedule} style={styles.textButton}>
        <Text style={styles.textButtonText}>Update Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

const FoodFrequencyDropdown = (_) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('one');
  const [items, setItems] = useState([
    { label: 'Once a day', value: 'one' },
    { label: 'Twice a day', value: 'two' },
    { label: 'Three times a day', value: 'three' },
  ]);

  let fields = <Text>Empty</Text>;
  let stuff = 'one';

  switch (value) {
    case 'one':
      fields = (
        <View>
          <SelectTimeAndAmount key={0} index={0} />
        </View>
      );
      break;
    case 'two':
      fields = (
        <View>
          <SelectTimeAndAmount key={0} index={0} />
          <SelectTimeAndAmount key={1} index={1} />
        </View>
      );
      break;
    case 'three':
      fields = (
        <View>
          <SelectTimeAndAmount key={0} index={0} />
          <SelectTimeAndAmount key={1} index={1} />
          <SelectTimeAndAmount key={2} index={2} />
        </View>
      );
      break;
    default:
      break;
  }

  return (
    <View style={styles.dropdown}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      {fields}
    </View>
  );
};

// For the Time Picker please look into https://github.com/henninghall/react-native-date-picker
const SelectTimeAndAmount = (props) => {
  return (
    <View style={styles.center}>
      <Text key={props.index}>Setting {props.index + 1}</Text>
      <View style={styles.rowContainer}>
        <TextInput key={'amount'} placeholder="Amount" onChangeText={(text) => {}} style={styles.input} />
        <TextInput key={'time'} placeholder="Time picker" onChangeText={(text) => {}} style={styles.input} />
      </View>
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
