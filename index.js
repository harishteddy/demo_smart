/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import SmartechPushReact from 'smartech-push-react-native';

import App from './App';
import { name as appName } from './app.json';

// 🔹 Background / Quit state (Android)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  SmartechPushReact.handlePushNotification(
    remoteMessage.data,
    result => {
      console.log('BG/Quit handled by Smartech:', result);
    }
  );
});

AppRegistry.registerComponent(appName, () => App);


























// import 'react-native-gesture-handler'; 
// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);
