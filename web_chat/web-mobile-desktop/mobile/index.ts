/**
 * @format
 */

import { AppRegistry, Linking } from 'react-native';
import codePush from 'react-native-code-push';
import 'react-native-gesture-handler';
import App from './app.tsx';
// import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import navigationServices from './src/routers/navigation-service';
import { IncomingCallScreen } from 'routers/screen-name';
import EventBus, { EventBusName } from './src/core/common/event-bus';
import AsyncStorageHelpers, { StorageKey } from 'helpers/async-storage-helpers';

console.disableYellowBox = true;

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

let RootComponent = codePush(codePushOptions)(App);

if (__DEV__) {
  RootComponent = App;
}

console.log('test_setBackgroundMessageHandler_1');
// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('test_setBackgroundMessageHandler_0', JSON.stringify(remoteMessage));
  const data = JSON.stringify(remoteMessage);
  AsyncStorageHelpers.save(StorageKey.VIDEO_CALL_INFO, data);
  // Linking.openURL('app://testApp');
  Linking.openURL('app://testApp').then((rs) => {
    console.log('test_open_url_sucess: ', rs, '__', data);
  });
});

// AppRegistry.registerComponent(appName, () => RootComponent);
AppRegistry.registerComponent('WorkTalkV2', () => RootComponent);
