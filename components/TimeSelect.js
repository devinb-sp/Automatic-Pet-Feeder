import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, Modal } from 'react-native';
import { ApiHelper } from '../helpers/api_helper';
('../helpers/api_helper');
import settingsStyles from '../stylesheets/settingsStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const apiHelper = new ApiHelper();

const TimeSelect = ({ handleTimeChange, index }) => {
  const [displayTime, setDisplayTime] = useState([]);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [donePressed, setDonePressed] = useState(false);

  useEffect(() => {
    changeDisplayTime();
  }, []);

  const showDateTime = async () => {
    const result = await apiHelper.getFoodSchedule();
    setShow(!show);

    if (result.food.times[index]) {
      if (!donePressed) {
        var tempDate = moment(result.food.times[index]);
        let tempTime = tempDate.format('h:mm A');

        setDisplayTime(tempTime);
        setDate(new Date(result.food.times[index]));
      }
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

    handleTimeChange(convertToISO);
    setDate(selectedDate);
    setDisplayTime(tempTime);
  };

  const changeDisplayTime = async () => {
    const result = await apiHelper.getFoodSchedule();

    if (result.food.times[index]) {
      var tempDate = moment(result.food.times[index]);
      let tempTime = tempDate.format('h:mm A');

      setDisplayTime(tempTime);
      handleTimeChange(result.food.times[index]);
    }
  };

  const onPressCancel = async () => {
    setShow(false);
    const result = await apiHelper.getFoodSchedule();
    var tempDate = moment(result.food.times[index]);
    let tempTime = tempDate.format('h:mm A');

    setDisplayTime(tempTime);
    setDate(new Date(result.food.times[index]));
  };

  const onPressDone = async () => {
    setShow(false);
    setDonePressed(true);
  };
  return (
    <View>
      <TouchableHighlight underlayColor={'transparent'} activeOpacity={0} onPress={() => showDateTime()}>
        <View>
          {/* <Text style={settingsStyles.fields}> */}
          {displayTime.length === 0 ? (
            <Text style={settingsStyles.field}>Select a time</Text>
          ) : (
            <Text style={settingsStyles.field}>{displayTime}</Text>
          )}
          {/* </Text> */}
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
  );
};

export default TimeSelect;
