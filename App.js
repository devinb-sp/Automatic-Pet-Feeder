import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { ApiHelper } from './helpers/api_helper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './screens/Home';
import Camera from './screens/Camera';
import Settings from './screens/Settings';
import Login from './screens/Login';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const apiHelper = new ApiHelper();

const AfterLogin = () => {
  const [isStopped, setIsStopped] = useState(true);
  const [tabClicked, setTabClicked] = useState(false);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (isStopped == false) {
              setIsStopped(true);
              apiHelper.stopCameraFeed();
            }
            setTabClicked(!tabClicked);
          },
        })}
        children={() => <Home tabClicked={tabClicked} />}
      />
      <Tab.Screen
        name="Camera"
        component={Camera}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            setIsStopped(false);
            apiHelper.initializeCameraFeed();
          },
        })}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (isStopped == false) {
              setIsStopped(true);
              apiHelper.stopCameraFeed();
            }
          },
        })}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [fontsLoaded] = useFonts({
    RobotoBlack: require('./assets/fonts/Roboto/Roboto-Black.ttf'),
    RobotoBold: require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    RobotoMedium: require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    RobotoRegular: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    RobotoLight: require('./assets/fonts/Roboto/Roboto-Light.ttf'),
    RobotoThin: require('./assets/fonts/Roboto/Roboto-Thin.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen name="After Login" component={AfterLogin} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
