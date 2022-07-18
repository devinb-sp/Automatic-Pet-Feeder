import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import homeStyles from '../stylesheets/homeStyles';
import { ApiHelper } from '../helpers/api_helper';
('../helpers/api_helper');
import * as Progress from 'react-native-progress';
const apiHelper = new ApiHelper();

const Home = () => {
  const [waterLevelPercentage, setWaterLevelPercentage] = useState(0.0);
  const [foodLevelPercentage, setFoodLevelPercentage] = useState(0.0);

  const updateContainerLevels = async () => {
    const waterLevel = await apiHelper.getWaterLevel();
    const foodLevel = await apiHelper.getFoodLevel();
    console.log(`JOSE: Water level ${waterLevel}`);
    console.log(`JOSE: Food level ${foodLevel}`);
    setWaterLevelPercentage(waterLevel);
    setFoodLevelPercentage(foodLevel);
  };

  useEffect(() => {
    updateContainerLevels();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
      <Text style={{ fontSize: 20, marginTop: 60 }}>Water Level</Text>
      <Progress.Bar
        progress={waterLevelPercentage / 100}
        width={300}
        height={20}
        style={homeStyles.progressBar}
        color={homeStyles.progressBar.color}
      />
      <Text style={{ fontSize: 16 }}>{waterLevelPercentage}%</Text>
      <Text style={{ fontSize: 20, marginTop: 20 }}>Food Level</Text>
      <Progress.Bar
        progress={foodLevelPercentage / 100}
        width={300}
        height={20}
        style={homeStyles.progressBar}
        color={homeStyles.progressBar.color}
      />
      <Text style={{ fontSize: 16, marginBottom: 60 }}>{foodLevelPercentage}%</Text>
      <TouchableOpacity onPress={updateContainerLevels} style={homeStyles.button}>
        <Text style={homeStyles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
