
import React , { useState } from 'react';
import CircleAvatarScreen from '../../libraries/Features/circle-avtar/circle-avatar.screen';
import ModalScreen from '../../libraries/Features/modal/modal.screen';
import videoCallService from './video-call.service';
import "./video-calls.scss";
import {ENUM_KIND_OF_MESSAGE_TYPE} from '../../libraries/Enum/messageType'
import { IChat } from "../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/main/conversation.props"
import ReconnectingWebSocket from 'reconnecting-websocket';
import { ENUM_KIND_OF_MESSAGE_VIDEO_CALL,ENUM_TYPE_STATUS_VIDEO_CALL } from '../../libraries/Enum/video-call';
import { ENUM_KIND_OF_MESSAGE } from '../../libraries/Enum/message';
import { ENUM_KIND_OF_STATUS } from '../../libraries/Enum/status';
import playAudio from '../../libraries/Features/video-call/audio.screen'
import videoAdapter from './video-call.adapter'
import { APP_CONFIGS } from "../../helpers/api/app-config";
import { IHCM_MESSAGE } from '../../libraries/Enum/ihcm-message';

var sockets: ReconnectingWebSocket[] = [];
var socket: ReconnectingWebSocket;
const options = {
  WebSocket: WebSocket, // custom WebSocket constructor
  connectionTimeout: 1000,
  maxRetries: 10,
};
socket = new ReconnectingWebSocket(
  `${APP_CONFIGS.URL_PUSH_STREAM}/ws?Channels=` + localStorage.getItem('userId'),
  [],
  options
);

const VideoCallScreen = (props: any) => {
  return (
    <div className="videocall-container">
      <div className="videocall-top">
        <CircleAvatarScreen
          isOnline={false}
          src={"https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"}
          class=""
          width="90px"
          height="90px"
        ></CircleAvatarScreen>
      </div>
      <div className="div-subheading-semibold">
        <span className="subheading-semibold">
          {props.userName}
        </span>
      </div>
      
      <div className="div-subtitle-hint">
        <span className="subtitle-hint">Đang gọi tới</span>
      </div>
      <div className="videocall-bottom flex-center">
        <button className="btn-outline"  onClick={props.closeCallVideo}>Từ chối</button>

        <button onClick={props.start}>Trả lời</button>
      </div>
      
    </div>
  )
}

function VideoCallsScreen(props: any) {
  // state
  const [videoCallsIsDisplayed , setVideoCallsIsDisplayed] = useState<boolean>(false);
  const [name , setName] = useState<string>("");
  const [img , setImg] = useState<string>("");
  const [data , setData] = useState<any>();

  const {
    openAudio,
    pauseAudio
  } = videoAdapter()

  const {
    sendMessageVideo
  } = videoCallService()

  React.useEffect(() => {
    openAudio();  
    socket.onmessage = (message) => {
      var json = JSON.parse(decodeURIComponent(JSON.parse(message.data).text));
      if (localStorage.getItem('userId') !== json.value.userId && json.type && json.type===ENUM_KIND_OF_MESSAGE_TYPE.VIDEO_CALL && !json.value.statusVideoCall) {
        setVideoCallsIsDisplayed(true)
        setName(json.value.userName)
        setData(json) 
        openAudio();      
        //added by tuda
        window.parent.postMessage(IHCM_MESSAGE.OPEN_VIDEO_CALL, "*");
      }
      else if (json.value.statusVideoCall===ENUM_TYPE_STATUS_VIDEO_CALL.MISSED_CALL_VIDEO) {
        setVideoCallsIsDisplayed(false)
        //added by tuda
        window.parent.postMessage(IHCM_MESSAGE.CLOSE_VIDEO_CALL, "*");
      }
      else if (json.value.statusVideoCall===ENUM_TYPE_STATUS_VIDEO_CALL.LISTEN_CALL_VIDEO) {
        setVideoCallsIsDisplayed(false)
        pauseAudio();
        //added by tuda
        window.parent.postMessage(IHCM_MESSAGE.CLOSE_VIDEO_CALL, "*");
      }
    };
  });

  
  const start = () => {
    setVideoCallsIsDisplayed(false)
    if (localStorage.getItem('userId') !== data.value.userId) {
      pauseAudio()
      window.open(window.location.protocol + "/video-call?roomName=" + data.value.chatRoomId + "&userId=" + data.value.userId + "&isCall=0", "_blank", "width=1000,height=1000");
    }
    //added by tuda
    window.parent.postMessage(IHCM_MESSAGE.CLOSE_VIDEO_CALL, "*");
  }

  const closeCallVideo = () => {
    pauseAudio()
    let messageSend: IChat = {
        message: ENUM_KIND_OF_MESSAGE_VIDEO_CALL.NOT_LISTEN_CALL_VIDEO,
        messageType: ENUM_KIND_OF_MESSAGE.VIDEO_CALL,
        messageStatus:ENUM_KIND_OF_STATUS.ACTIVE,
        userId: data.value.USER_ID_CALL,
        statusVideoCall:ENUM_TYPE_STATUS_VIDEO_CALL.NOT_LISTEN_CALL_VIDEO,
        user: {
            userName: "",
            status: ENUM_KIND_OF_STATUS.ACTIVE,
            id: data.value.userId,
        },
        chatRoomId: data.value.chatRoomId,
        createdAt: new Date(),
        attachments: [],
    }
    sendMessageVideo(messageSend);
    setVideoCallsIsDisplayed(false)
   //added by tuda
   window.parent.postMessage(IHCM_MESSAGE.CLOSE_VIDEO_CALL, "*");
  }

  const eleContextSignout = (close: any) => {
    return (
      <VideoCallScreen  start={start} userName={name} closeCallVideo={closeCallVideo} close={close}></VideoCallScreen>
    )
  }

  return (

    <ModalScreen
      headerContent={"Cuộc gọi video tới"}
      hasPadding={true}
      contextHasClose={eleContextSignout}
      open={videoCallsIsDisplayed}
      funtionCloseNew={closeCallVideo}
    >
      <></>
    </ModalScreen>
  );
}

export default VideoCallsScreen;



