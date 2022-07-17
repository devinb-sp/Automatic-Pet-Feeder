import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import homeStyles from '../stylesheets/homeStyles';
import { ApiHelper } from '../helpers/api_helper';
('../helpers/api_helper');
import * as Progress from 'react-native-progress';
const apiHelper = new ApiHelper();

const Home = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'RobotoBlack', fontSize: 50 }}>Home</Text>
      <Progress.Bar progress={0.3} width={200} />
    </View>
  );
};

export default Home;
