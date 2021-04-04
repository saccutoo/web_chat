import messaging from '@react-native-firebase/messaging';
import NoInternetComponent from 'libraries/no-internet-component';
import * as React from 'react';
import { AppState, AppStateStatus, StyleSheet, View, StatusBar, Alert } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import { setI18nConfig } from 'res/languages';
import { RootComponentProps } from '../model-root';
import { RootComponentAdapter } from '../model-root/root-component.adapter';
import colors from 'res/colors';
import { KindOfMsg } from 'core/common/types/message';
import NavigationService from 'routers/navigation-service';
import { IncomingCallScreen } from 'routers/screen-name';

export default class RootComponent extends React.PureComponent<RootComponentProps, any> {
  RootComponentAdapter: RootComponentAdapter;
  appState: AppStateStatus = AppState.currentState;
  unsubscribe: any;
  constructor(props: RootComponentProps) {
    super(props);
    StatusBar.setBackgroundColor(colors.white);
    StatusBar.setBarStyle('dark-content');
    setI18nConfig();
    this.RootComponentAdapter = new RootComponentAdapter(this);
  }

  public componentDidMount(): void {
    RNLocalize.addEventListener('change', this.RootComponentAdapter.handleLocalizationChange);
    AppState.addEventListener('change', this.RootComponentAdapter.handleAppStateChange);
    this.unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const msg = JSON.stringify(remoteMessage);
      console.log('FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('onNotificationOpenedApp', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        let msg = JSON.stringify(remoteMessage);
        console.log('getInitialNotification', msg);
        if (remoteMessage?.notification?.body === KindOfMsg.TYPE_VIDEO_CALL_INCOMING) {
          NavigationService.navigate(IncomingCallScreen, {
            type: KindOfMsg.TYPE_VIDEO_CALL_INCOMING,
            user: {},
            chatInfo: {},
            // timeStart: newMessage?.value?.timeStart,
          });
        }
        console.log('getInitialNotification_0', msg);
        console.log('getInitialNotification', remoteMessage?.notification?.body);
      });
  }

  public componentWillUnmount(): void {
    RNLocalize.removeEventListener('change', this.RootComponentAdapter.handleLocalizationChange);
    AppState.removeEventListener('change', this.RootComponentAdapter.handleAppStateChange);
    this.unsubscribe();
  }

  public render() {
    return (
      <View style={styles.container}>
        {this.props.children}
        <NoInternetComponent />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
