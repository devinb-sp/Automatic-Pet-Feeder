import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import homeStyles from '../stylesheets/homeStyles';
import { ApiHelper } from '../helpers/api_helper';
('../helpers/api_helper');
import * as Progress from 'react-native-progress';
const apiHelper = new ApiHelper();

const Home = ({ tabClicked }) => {
  const [waterLevelPercentage, setWaterLevelPercentage] = useState(0.0);
  const [foodLevelPercentage, setFoodLevelPercentage] = useState(0.0);

  const updateContainerLevels = async () => {
    apiHelper.isGettingLevels = true;
    const waterLevel = await apiHelper.getWaterLevel();
    const foodLevel = await apiHelper.getFoodLevel();
    console.log(`Water level ${waterLevel}`);
    console.log(`Food level ${foodLevel}`);
    if (waterLevel) {
      setWaterLevelPercentage(waterLevel);
    }

    if (foodLevel) {
      setFoodLevelPercentage(foodLevel);
    }

    apiHelper.isGettingLevels = false;
  };

  useEffect(() => {
    if (!apiHelper.isGettingLevels) {
      updateContainerLevels();
    }
  }, []);

  useEffect(() => {
    if (!apiHelper.isGettingLevels) {
      updateContainerLevels();
    }
  }, [tabClicked]);

  const SECONDS_MS = 30000;

  useEffect(() => {
    const interval = setInterval(() => {
      updateContainerLevels();
    }, SECONDS_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.label}>Water Level</Text>
      <Progress.Circle
        showsText={true}
        progress={waterLevelPercentage / 100}
        thickness={15}
        size={200}
        style={homeStyles.progressBar}
        color={homeStyles.progressBar.color}
        unfilledColor={homeStyles.progressBar.unfilledColor}
        strokeCap={'round'}
        direction={'counter-clockwise'}
        borderWidth={0}
      />
      <View style={homeStyles.borderBottom}></View>
      <Text style={homeStyles.label}>Food Level</Text>
      <Progress.Circle
        showsText={true}
        progress={foodLevelPercentage / 100}
        thickness={15}
        size={200}
        style={homeStyles.progressBar}
        color={homeStyles.progressBar.color}
        unfilledColor={homeStyles.progressBar.unfilledColor}
        strokeCap={'round'}
        direction={'counter-clockwise'}
        borderWidth={0}
      />
    </View>
  );
};

export default Home;
