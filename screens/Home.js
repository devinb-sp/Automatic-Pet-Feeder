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
    console.log(`JOSE: Water level ${waterLevel}`);
    console.log(`JOSE: Food level ${foodLevel}`);
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

  return (
    <View style={{ flex: 1, alignItems: 'center', margin: 20 }}>
      <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 10 }}>Water Level</Text>
      <Progress.Bar
        progress={waterLevelPercentage / 100}
        width={350}
        height={25}
        style={homeStyles.progressBar}
        color={homeStyles.progressBar.color}
      />
      <Text style={{ fontSize: 16, marginTop: 10 }}>{waterLevelPercentage}%</Text>
      <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 10 }}>Food Level</Text>
      <Progress.Bar
        progress={foodLevelPercentage / 100}
        width={350}
        height={25}
        style={homeStyles.progressBar}
        color={homeStyles.progressBar.color}
      />
      <Text style={{ fontSize: 16, marginBottom: 20, marginTop: 10 }}>{foodLevelPercentage}%</Text>
    </View>
  );
};

export default Home;
