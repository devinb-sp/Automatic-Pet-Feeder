import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, TouchableHighlight, Modal } from 'react-native';
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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('one');
  const [items, setItems] = useState([
    { label: 'Once a day', value: 'one' },
    { label: 'Twice a day', value: 'two' },
    { label: 'Three times a day', value: 'three' },
  ]);

  // NOTE: FINISH THIS FUNCTION => NEED TO ACCOUNT FOR TWICE AND THREE TIMES A DAY
  const handleUpdateSchedule = async () => {
    const times = [];
    const amounts = [];

    if (value === 'one') {
      times[0] = time1;
      amounts[0] = parseFloat(value1);
    }

    apiHelper.updateFoodSchedule(amounts, times);
  };

  return (
    <View style={settingsStyles.container}>
      <Text style={{ fontFamily: 'RobotoBlack', fontSize: 20, width: '90%', marginBottom: 20, marginLeft: '5%' }}>
        Food Schedule
      </Text>

      <View style={{ zIndex: 1000 }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={settingsStyles.dropdowns}
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
          <View style={{ zIndex: 900 }}>
            <AmountsDropDown handleAmountChange={handleAmountChange1} index={0} />
          </View>
          <TimeSelect handleTimeChange={handleTimeChange1} index={0} />
        </>
      ) : value === 'two' ? (
        <>
          <View style={{ zIndex: 900 }}>
            <AmountsDropDown handleAmountChange={handleAmountChange1} index={0} />
          </View>
          <TimeSelect handleTimeChange={handleTimeChange1} index={0} />

          <View style={{ zIndex: 800 }}>
            <AmountsDropDown handleAmountChange={handleAmountChange2} index={1} />
          </View>
          <TimeSelect handleTimeChange={handleTimeChange2} index={1} />
        </>
      ) : value === 'three' ? (
        <>
          <View style={{ zIndex: 900 }}>
            <AmountsDropDown handleAmountChange={handleAmountChange1} index={0} />
          </View>
          <TimeSelect handleTimeChange={handleTimeChange1} index={0} />

          <View style={{ zIndex: 800 }}>
            <AmountsDropDown handleAmountChange={handleAmountChange2} index={1} />
          </View>
          <TimeSelect handleTimeChange={handleTimeChange2} index={1} />

          <View style={{ zIndex: 700 }}>
            <AmountsDropDown handleAmountChange={handleAmountChange3} index={2} />
          </View>
          <TimeSelect handleTimeChange={handleTimeChange3} index={2} />
        </>
      ) : null}

      <View style={settingsStyles.fieldsContainer}>
        <TouchableOpacity onPress={handleUpdateSchedule} style={settingsStyles.buttons}>
          <Text style={settingsStyles.buttonsText}>Save Schedule</Text>
        </TouchableOpacity>
      </View>

      <View style={settingsStyles.signOutContainer}>
        <Text>Signed in as {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut} style={settingsStyles.textButton}>
          <Text style={settingsStyles.textButtonText}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
