/* 
    Created by longdq
*/

import { ChatInfoParams } from 'core/model-chat-detail/chat-detail.props';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import NavigationService from 'routers/navigation-service';
import { ListUserChatScreen } from 'routers/screen-name';
import { VideoCallAdapter } from '../model-video-call/video-call.adapter';
import { VideoCallProps } from '../model-video-call/video-call.props';
import { VideoCallStates } from '../model-video-call/video-call.states';

export default class VideoCallContainer extends React.PureComponent<
  VideoCallProps,
  VideoCallStates
> {
  VideoCallAdapter: VideoCallAdapter;
  chatInfo: ChatInfoParams;
  link: string = '';
  //Local States

  constructor(props: VideoCallProps) {
    super(props);
    this.VideoCallAdapter = new VideoCallAdapter(this);
    this.state = {};
    this.chatInfo = props.navigation.getParam('chatInfo');
    this.link = props.navigation.getParam('link');
    console.log('test_video_call_chatInfo: ', this.chatInfo);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      StatusBar.setHidden(false, 'none');
      StatusBar.setTranslucent(false);
    }

    setTimeout(() => {
      const title = this.chatInfo?.data?.nameTitle || '';
      // const url = 'https://meet.hyperlogy.com/'+ title; // can also be only room name and will connect to jitsi meet servers
      // const url = 'https://meet.hyperlogy.com/' + HyperUtils.genRandomID(16);
      // const url = 'https://meet.jit.si/exemple';
      const userInfo = {
        displayName: this.chatInfo?.data?.nameTitle || '',
        email: this.chatInfo?.data?.contact?.email || this.chatInfo?.data?.email || '',
        avatar: this.chatInfo?.data?.contact?.avatar_url || this.chatInfo?.data?.avatar_url || '',
      };
      // console.log('test_user_info_1: ', userInfo);
      // console.log('test_user_info_2: ', this.chatInfo);
      JitsiMeet.call(this.link, userInfo);
      /* You can also use JitsiMeet.audioCall(url) for audio only call */
      /* You can programmatically end the call with JitsiMeet.endCall() */
    }, 1000);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content');
    JitsiMeet.endCall();
    this.VideoCallAdapter.onFinishCall();
  }

  onConferenceTerminated = (nativeEvent: any) => {
    /* Conference terminated event */
    console.log('test_onConferenceTerminated: ', nativeEvent);
    NavigationService.navigate(ListUserChatScreen);
  };

  onConferenceJoined = (nativeEvent: any) => {
    /* Conference joined event */
    console.log('test_onConferenceJoined: ', nativeEvent);
    StatusBar.setHidden(false, 'none');
    StatusBar.setTranslucent(false);
  };

  onConferenceWillJoin = (nativeEvent: any) => {
    /* Conference will join event */
    console.log('test_onConferenceWillJoin: ', nativeEvent);
  };

  render() {
    return (
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <JitsiMeetView
          onConferenceTerminated={this.onConferenceTerminated}
          onConferenceJoined={this.onConferenceJoined}
          onConferenceWillJoin={this.onConferenceWillJoin}
          style={{ flex: 1, height: '100%', width: '100%' }}
        />
      </View>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {},
});
