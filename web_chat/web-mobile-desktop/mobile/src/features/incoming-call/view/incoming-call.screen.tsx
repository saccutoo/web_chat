/* 
    Created by longdq
*/

import * as React from 'react';
import { ImageBackground, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from '../../../helpers/layout-helpers';
import colors from '../../../res/colors';
import { KindOfMsg } from '../../../core/common/types/message';
import IncomingCallAdapter from 'core/model-incoming-call/incoming-call.adapter';
import { IncomingCallProps } from 'core/model-incoming-call/incoming-call.props';
import { IncomingHeaderUserComponent } from './components/incoming-header-user/incoming-header-user.component';
import { IncommingFooterComponent } from './components/incomming-footer/incomming-footer.component';
import { OutgoingFooterComponent } from './components/outgoing-footer/outgoing-footer.component';
import { useEffect } from 'react';
import { StatusVideoCallParams } from 'features/video-call/model-video-call/video-call.props';
import { processRequestRespository } from 'core/common/networking/api-helper';
import IncomingCallServices from 'core/model-incoming-call/incoming-call.services';
import { HyperUtils } from 'core/common/hyper-utils';
import { showAlert, TYPE } from 'libraries/dropdown-alert';
import { VideoCallScreen } from 'routers/screen-name';
import NavigationService from 'routers/navigation-service';

export const IncomingCallContainer = (props: IncomingCallProps) => {
  // IncomingCallAdapter: IncomingCallAdapter;
  // userInfo: User;
  // typeCall: KindOfMsg;
  // chatInfo: ChatInfoParams;
  // timeStart: string;
  // //Local States
  // navigation: NavigationScreenProp<NavigationState, NavigationParams>
  // constructor(props: IncomingCallProps) {
  //   super(props);
  //   this.IncomingCallAdapter = new IncomingCallAdapter(this);
  //   this.state = {};

  //   this.navigation = props.navigation
  //   this.userInfo = this.navigation.getParam('user');
  //   this.typeCall = this.navigation.getParam('type') ;
  //   this.chatInfo = this.navigation.getParam('chatInfo') || {};
  //   this.timeStart = this.navigation.getParam('timeStart') || 0;

  //   console.log('test_video_call_user: ', this.userInfo, '__',this.typeCall);
  // }

  const {
    // goBack,
    // userInfo,
    // typeCall,
    // onCancelCall,
    // onFinishCall,
    // updateStatusVideoCall,
  } = IncomingCallAdapter(props);

  const navigation = props.navigation
  const userInfo = navigation.getParam('user');
  const typeCall = navigation.getParam('type');
  const chatInfo = navigation.getParam('chatInfo') || {};
  const timeStart = navigation.getParam('timeStart') || 0;

  // logic

  function onCancelCall() {
    const params: StatusVideoCallParams = {
      chatId: chatInfo?.chatId || chatInfo?._id,
      type: KindOfMsg.TYPE_VIDEO_CALL_DENY,
      senderId: props.userInfo?.id,
      receiverId: chatInfo?.user?.id,
      timeStart: timeStart,
    };

    processRequestRespository(
      IncomingCallServices.getInstance().updateStatusVideoCall(params),
      () => {
        NavigationService.pop();
      },
      undefined,
      false,
      false
    );
  }

  //VideoCall
  function updateStatusVideoCall() {
    const params: StatusVideoCallParams = {
      chatId: chatInfo?.chatId || chatInfo?._id,
      type: KindOfMsg.TYPE_VIDEO_CALL_ACCEPT,
      link: 'https://meet.hyperlogy.com/' + HyperUtils.genRandomID(16),
      senderId: props.userInfo?.id,
      receiverId: chatInfo?.user?.id,
      timeStart: timeStart,
    };

    processRequestRespository(
      IncomingCallServices.getInstance().updateStatusVideoCall(params),
      () => updateStatusVideoCallSuccess(params?.link),
      undefined,
      false,
      false
    );
  }

  function updateStatusVideoCallSuccess(link: string) {
    console.log('test_updateStatusVideoCallSuccess');
    NavigationService.navigate(VideoCallScreen, {
      chatInfo: chatInfo,
      link,
    });
  }

  function onFinishCall() {
    showAlert(TYPE.WARN, 'Finish call:', props.userInfo?.id);
    console.log('test_onFinishCall: ', props);
    const chatId = chatInfo?.chatId || chatInfo?._id || chatInfo?.data?.id;
    const params: StatusVideoCallParams = {
      chatId: chatId,
      type: KindOfMsg.TYPE_VIDEO_CALL_FINISH,
      senderId: props.userInfo?.id,
      receiverId: chatInfo?.user?.id || chatInfo?.data?.contact?.id,
      timeStart: timeStart,
    };

    processRequestRespository(
      IncomingCallServices.getInstance().updateStatusVideoCall(params),
      () => {
        NavigationService.pop();
      },
      undefined,
      false,
      false
    );
  }

  function goBack() {
    NavigationService.goBack();
  }




  // componentDidMount() {
  //   StatusBar.setBarStyle('light-content');
  //   StatusBar.setBackgroundColor(colors.black);
  // }

  // componentWillUnmount() {
  //   StatusBar.setBarStyle('dark-content');
  //   StatusBar.setBackgroundColor(colors.white);
  // }

  useEffect(() => {
    console.log('test_incoming_call_screen...')
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(colors.black);

    return () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(colors.white);
    };
  }, []);

  // render() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          {
            // uri: 'https://wallpapercave.com/wp/wp5489131.jpg',
          }
        }
        style={styles.imgBg}
      >
        <View style={styles.wrapContent}>
          {Platform.OS === 'ios' && <View style={styles.statusBar} />}
          {/* Header user */}
          <IncomingHeaderUserComponent onBack={goBack} userInfo={userInfo} typeCall={typeCall} />
        </View>
        {/* Footer */}
        {typeCall === KindOfMsg.TYPE_VIDEO_CALL_OUTGOING ? (
          <OutgoingFooterComponent onFinishCall={onFinishCall} />
        ) : (
          <IncommingFooterComponent onCancel={onCancelCall} onAnswer={updateStatusVideoCall} />
        )}
      </ImageBackground>
    </View>
  );
};
// }

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.black,
    opacity: 0.9,
  },
  wrapContent: {
    flex: 1,
    alignItems: 'center',
  },
  statusBar: {
    width: '100%',
    height: getStatusBarHeight(),
  },
});
