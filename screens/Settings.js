import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { ApiHelper } from '../helpers/api_helper';
('../helpers/api_helper');
import DropDownPicker from 'react-native-dropdown-picker';
import settingsStyles from '../stylesheets/settingsStyles';
import TimeSelect from '../components/TimeSelect';
import AmountsDropDown from '../components/AmountsDropDown';

const apiHelper = new ApiHelper();

const Settings = () => {
  const [time1, setTime1] = useState(null);
  const [time2, setTime2] = useState(null);
  const [time3, setTime3] = useState(null);

  // Dropdown
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);

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

  const handleAmountChange1 = (amount) => {
    setValue1(amount);
  };

  const handleTimeChange1 = (time) => {
    setTime1(time);
  };

  const handleAmountChange2 = (amount) => {
    setValue2(amount);
  };

  const handleTimeChange2 = (time) => {
    setTime2(time);
  };

  const handleAmountChange3 = (amount) => {
    setValue3(amount);
  };
  const handleTimeChange3 = (time) => {
    setTime3(time);
  };

  useEffect(() => {
    checkAPI();
  }, []);

  const checkAPI = async () => {
    const result = await apiHelper.getFoodSchedule();

    if (result.food.times.length === 1) {
      setValue('one');
    } else if (result.food.times.length === 2) {
      setValue('two');
    } else if (result.food.times.length === 3) {
      setValue('three');
    } else {
      setValue(null);
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Once a day', value: 'one' },
    { label: 'Twice a day', value: 'two' },
    { label: 'Three times a day', value: 'three' },
  ]);

  const handleUpdateSchedule = async () => {
    let times = [];
    let amounts = [];

    if (value === 'one') {
      if (time1 === null || value1 === null) {
        console.log('ERROR1');
        return;
      } else {
        times = [time1];
        amounts = [parseFloat(value1)];
      }
    } else if (value === 'two') {
      if (time1 === null || value1 === null || time2 === null || value2 === null) {
        console.log('ERROR2');
        return;
      } else {
        times = [time1, time2];
        amounts = [parseFloat(value1), parseFloat(value2)];
      }
    } else if (value === 'three') {
      if (time1 === null || value1 === null || time2 === null || value2 === null || time3 === null || value3 === null) {
        console.log('ERROR3');
        return;
      } else {
        times = [time1, time2, time3];
        amounts = [parseFloat(value1), parseFloat(value2), parseFloat(value3)];
      }
    } else {
      console.log('***ERROR: ARRAYS NOT PROPERLY SET***');
      return;
    }

    apiHelper.updateFoodSchedule(amounts, times);
  };

  return (
    <SafeAreaView style={settingsStyles.container}>
      <ScrollView>
        <Text style={settingsStyles.heading1}>Food Schedule</Text>
        <Text style={settingsStyles.label}>Frequency</Text>
        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            listMode="SCROLLVIEW"
            style={settingsStyles.dropdown}
            dropDownContainerStyle={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              fontFamily: 'RobotoRegular',
              borderColor: 'lightgray',
              borderWidth: 1,
              width: '90%',
              marginBottom: 20,
              marginRight: '5%',
              marginLeft: '5%',
            }}
          />
        </View>

        {value === 'one' ? (
          <>
            <Text style={settingsStyles.label}>Serving Size</Text>
            <View style={{ zIndex: 900 }}>
              <AmountsDropDown handleAmountChange={handleAmountChange1} index={0} />
            </View>

            <Text style={settingsStyles.label}>Time</Text>
            <TimeSelect handleTimeChange={handleTimeChange1} index={0} />
          </>
        ) : value === 'two' ? (
          <>
            <View style={settingsStyles.borderBottom}>
              <Text style={settingsStyles.heading2}>Setting 1</Text>
            </View>
            <Text style={settingsStyles.label}>Serving Size</Text>
            <View style={{ zIndex: 900 }}>
              <AmountsDropDown handleAmountChange={handleAmountChange1} index={0} />
            </View>

            <Text style={settingsStyles.label}>Time</Text>
            <TimeSelect handleTimeChange={handleTimeChange1} index={0} />

            <View style={settingsStyles.borderBottom}>
              <Text style={settingsStyles.heading2}>Setting 2</Text>
            </View>
            <Text style={settingsStyles.label}>Serving Size</Text>
            <View style={{ zIndex: 800 }}>
              <AmountsDropDown handleAmountChange={handleAmountChange2} index={1} />
            </View>

            <Text style={settingsStyles.label}>Time</Text>
            <TimeSelect handleTimeChange={handleTimeChange2} index={1} />
          </>
        ) : value === 'three' ? (
          <>
            <View style={settingsStyles.borderBottom}>
              <Text style={settingsStyles.heading2}>Setting 1</Text>
            </View>

            <Text style={settingsStyles.label}>Serving Size</Text>
            <View style={{ zIndex: 900 }}>
              <AmountsDropDown handleAmountChange={handleAmountChange1} index={0} />
            </View>

            <Text style={settingsStyles.label}>Time</Text>
            <TimeSelect handleTimeChange={handleTimeChange1} index={0} />

            <View style={settingsStyles.borderBottom}>
              <Text style={settingsStyles.heading2}>Setting 2</Text>
            </View>
            <Text style={settingsStyles.label}>Serving Size</Text>
            <View style={{ zIndex: 800 }}>
              <AmountsDropDown handleAmountChange={handleAmountChange2} index={1} />
            </View>

            <Text style={settingsStyles.label}>Time</Text>
            <TimeSelect handleTimeChange={handleTimeChange2} index={1} />

            <View style={settingsStyles.borderBottom}>
              <Text style={settingsStyles.heading2}>Setting 3</Text>
            </View>
            <Text style={settingsStyles.label}>Serving Size</Text>
            <View style={{ zIndex: 700 }}>
              <AmountsDropDown handleAmountChange={handleAmountChange3} index={2} />
            </View>
            <Text style={settingsStyles.label}>Time</Text>
            <TimeSelect handleTimeChange={handleTimeChange3} index={2} />
          </>
        ) : null}

        <View style={settingsStyles.fieldsContainer}>
          <TouchableOpacity onPress={handleUpdateSchedule} style={settingsStyles.button}>
            <Text style={settingsStyles.buttonText}>Save Schedule</Text>
          </TouchableOpacity>
        </View>

        <View style={settingsStyles.signOutContainer}>
          <Text>Signed in as {auth.currentUser?.email}</Text>
          <TouchableOpacity onPress={handleSignOut} style={settingsStyles.textButton}>
            <Text style={settingsStyles.textButtonText}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
