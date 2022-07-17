import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, TouchableHighlight, Modal } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { ApiHelper } from '../helpers/api_helper';
('../helpers/api_helper');
import DropDownPicker from 'react-native-dropdown-picker';
import settingsStyles from '../stylesheets/settingsStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const apiHelper = new ApiHelper();

const Settings = () => {
  const [time, setTime] = useState([]);
  const [displayTime, setDisplayTime] = useState([]);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [donePressed, setDonePressed] = useState(false);

  // Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('0.25');
  const [items, setItems] = useState([
    { label: '1/4 Cup', value: '0.25' },
    { label: '1/2 Cup', value: '0.5' },
    { label: '1 Cup', value: '1' },
  ]);

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

  useEffect(() => {
    changeDisplayTime();
  }, []);

  const showDateTime = async () => {
    setShow(!show);

    if (!donePressed) {
      const result = await apiHelper.getFoodSchedule();
      var tempDate = moment(result.food.times[0]);
      let tempTime = tempDate.format('h:mm A');

      setDisplayTime(tempTime);
      setDate(new Date(result.food.times[0]));
    }
  };

  const changeDateTime = (event, selectedDate) => {
    let tempTime = moment(selectedDate, 'h:mm A').format('h:mm A');

    let convertToISO =
      selectedDate.getFullYear() +
      '-' +
      ('0' + (selectedDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + selectedDate.getDate()).slice(-2) +
      'T' +
      ('0' + selectedDate.getHours()).slice(-2) +
      ':' +
      ('0' + selectedDate.getMinutes()).slice(-2) +
      ':00.000000';

    setTime(convertToISO);
    setDate(selectedDate);
    setDisplayTime(tempTime);
  };

  const changeDisplayTime = async () => {
    const result = await apiHelper.getFoodSchedule();
    var tempDate = moment(result.food.times[0]);
    let tempTime = tempDate.format('h:mm A');

    setValue(result.food.amounts[0].toString());
    setDisplayTime(tempTime);
  };

  const onPressCancel = async () => {
    setShow(false);
    const result = await apiHelper.getFoodSchedule();
    var tempDate = moment(result.food.times[0]);
    let tempTime = tempDate.format('h:mm A');

    setDisplayTime(tempTime);
    setDate(new Date(result.food.times[0]));
  };

  const onPressDone = async () => {
    setShow(false);
    setDonePressed(true);
  };

  const handleUpdateSchedule = async () => {
    apiHelper.updateFoodSchedule([parseFloat(value)], [time]);
  };

  return (
    <View style={settingsStyles.container}>
      {/* <Text style={{ fontFamily: 'RobotoBlack', fontSize: 50 }}>Settings</Text> */}
      <Text style={{ fontFamily: 'RobotoBlack', fontSize: 20, width: '90%', marginBottom: 20 }}>Food Schedule</Text>

      {/* <FoodFrequencyDropdown /> */}

      <DropDownPicker
        style={settingsStyles.dropdowns}
        dropDownContainerStyle={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          fontFamily: 'RobotoRegular',
          borderColor: 'lightgray',
          borderWidth: 1,
          width: '90%',
          marginRight: '5%',
          marginLeft: '5%',
          marginBottom: 20,
        }}
        placeholder="Select amount of food"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />

      <View style={settingsStyles.fieldsContainer}>
        <TouchableHighlight underlayColor={'transparent'} activeOpacity={0} onPress={() => showDateTime()}>
          <View>
            <Text style={settingsStyles.fields}>{displayTime}</Text>
            <Modal
              transparent={true}
              animationType="slide"
              visible={show}
              supportedOrientations={['portrait']}
              onRequestClose={() => setShow(false)}
            >
              <View style={{ flex: 1 }}>
                <TouchableHighlight
                  underlayColor={'transparent'}
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                  }}
                  activeOpacity={1}
                  visible={show}
                  onPress={() => setShow(false)}
                >
                  <TouchableHighlight
                    underlayColor={'#FFFFFF'}
                    style={{
                      flex: 1,
                      borderTopColor: '#E9E9E9',
                      borderTopWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#FFFFFF',
                        height: 256,
                        overflow: 'hidden',
                      }}
                    >
                      <View style={{ marginTop: 20 }}>
                        <DateTimePicker
                          value={date}
                          mode="time"
                          display="spinner"
                          is24Hour={false}
                          onChange={changeDateTime}
                          textColor="black"
                        />
                      </View>

                      <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={onPressCancel}
                        style={[settingsStyles.btnText, settingsStyles.btnCancel]}
                      >
                        <Text>Cancel</Text>
                      </TouchableHighlight>

                      <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={onPressDone}
                        style={[settingsStyles.btnText, settingsStyles.btnDone]}
                      >
                        <Text>Done</Text>
                      </TouchableHighlight>
                    </View>
                  </TouchableHighlight>
                </TouchableHighlight>
              </View>
            </Modal>
          </View>
        </TouchableHighlight>
      </View>

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
    <View style={settingsStyles.dropdown}>
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
    <View style={settingsStyles.center}>
      <Text key={props.index}>Setting {props.index + 1}</Text>
      <View style={settingsStyles.rowContainer}>
        <TextInput
          key={'amount'}
          placeholder="Amount"
          onChangeText={(val) => setAmount(val)}
          style={settingsStyles.input}
        />
        <TextInput
          key={'time'}
          placeholder="Time picker"
          onChangeText={(val) => setTime(val)}
          style={settingsStyles.input}
        />
      </View>
    </View>
  );
};

const AmountAndTimeScheduleInput = (props) => {
  return (
    <View style={settingsStyles.center}>
      <View style={settingsStyles.rowContainer}>
        <TextInput
          key={props.amount}
          placeholder="Amount"
          value={props.amount.toString()}
          onChangeText={(text) => {}}
          style={settingsStyles.input}
        />
        <Text key={props.amount.toString() + 'text'}>Cups</Text>
      </View>
      <TextInput
        key={props.time}
        placeholder="Time"
        value={props.time.toString()}
        onChangeText={(text) => {}}
        style={settingsStyles.input}
      />
    </View>
  );
};

export default Settings;
