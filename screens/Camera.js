import * as React from 'react';
import { View, Text, Linking, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import settingsStyles from '../stylesheets/settingsStyles';
import { ApiHelper } from '../helpers/api_helper';

const apiHelper = new ApiHelper();

const Camera = () => {
  apiHelper.initializeCameraFeed();
  let WebViewRef;
  return (
    <>
      <WebView
        ref={(WEBVIEW_REF) => (WebViewRef = WEBVIEW_REF)}
        source={{
          uri: 'http://192.168.1.83:8000/index.html',
        }}
        style={{ width: '90%', marginRight: 'auto', marginLeft: 'auto', marginTop: 20 }}
        startInLoadingState={true}
      />
      <View style={settingsStyles.container}>
        <View style={settingsStyles.fieldsContainer}>
          <TouchableOpacity
            onPress={() => {
              apiHelper.initializeCameraFeed();
            }}
            style={settingsStyles.buttons}
          >
            <Text style={settingsStyles.buttonsText}>Start Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              apiHelper.stopCameraFeed();
            }}
            style={settingsStyles.buttons}
          >
            <Text style={settingsStyles.buttonsText}>Stop Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onpress={() => {
              WebViewRef && WebViewRef.reload();
            }}
            style={settingsStyles.buttons}
          >
            <Text style={settingsStyles.buttonsText}>Reload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Camera;
