import * as React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import cameraStyles from '../stylesheets/cameraStyles';

const Camera = () => {
  let WebViewRef;
  return (
    <>
      <View style={cameraStyles.container}>
        <WebView
          style={cameraStyles.camera}
          ref={(WEBVIEW_REF) => (WebViewRef = WEBVIEW_REF)}
          source={{
            uri: 'http://192.168.1.83:8000/index.html',
          }}
          startInLoadingState={true}
        />
      </View>
    </>
  );
};

export default Camera;
