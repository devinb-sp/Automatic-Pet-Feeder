import * as React from 'react';
import { View, Text } from 'react-native';
import cameraStyles from '../stylesheets/cameraStyles';

const Camera = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'RobotoBlack', fontSize: 50 }}>Camera</Text>
    </View>
  );
};

export default Camera;
