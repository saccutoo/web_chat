// @ts-nocheck
import React, { useState } from "react";
import jitsiVidelCall from "./video-call.adapter";
import jitsiState from "./video-call.state"
import { IChat } from "../../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/main/conversation.props"
import { ENUM_KIND_OF_MESSAGE } from '../../Enum/message'
import { ENUM_KIND_OF_STATUS } from '../../Enum/status'
import { ENUM_KIND_OF_MESSAGE_VIDEO_CALL, ENUM_TYPE_STATUS_VIDEO_CALL } from '../../Enum/video-call'
import { ENUM_KIND_OF_TYPE_VIDEO_CALL } from '../../Enum/type-video-call'
import videoCallServices from "./video-call.services";
import ReconnectingWebSocket from 'reconnecting-websocket';
import * as Default from './defaults'
import { ENUM_KIND_OF_VIDEO_CALL } from '../../Enum/video-call'
import { APP_CONFIGS } from "../../../helpers/api/app-config";

var config = require('./config.js')
var interfaceConfig = require('./interface_config.js')

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

var startDateCurrent;
var isListenCurrent=false;
var isInsertMissed=false;
var isInsertClose=false;

const VideoConference = () => {

   const url_string=window.location.href;
   var url = new URL(url_string);
   const [roomId, setRoomId] = useState();
   const [roomName, setRoomName] = useState(url.searchParams.get("roomName"));
   const [userId, setUserId] = useState(url.searchParams.get("userId"));
   const [isCall, setIsCall] = useState(url.searchParams.get("isCall"));
   const [isListen, setIsListen] = useState(false);
   const [loading, setLoading] = useState(true)
   const [startDate, setStartDate] = useState();
   const [endDate, setEndDate] = useState();
   const [jitsi, setJitsi] = useState({});

   const {
      sendMessage,
      getUserById,
      sendMessageVideo
   } = videoCallServices()

   const data = {
      roomName: roomName,
      width: "100%",
      height: "100%",
      setJitsi: setJitsi
   }

   const setStartDateFuntion=(value:any)=>{
      setStartDate(value);
   }

   const setListenFuntion=(value:any)=>{
      setIsListen(value);
   }

   const sendMessageFunction= ()=>{
      // const time = (new Date() - startDateCurrent);
      let messageSend: IChat = {
         message: "",
         messageType: ENUM_KIND_OF_MESSAGE.VIDEO_CALL,
         messageStatus: ENUM_KIND_OF_STATUS.ACTIVE,
         userId: userId,
         user: {
            userName: "",
            status: ENUM_KIND_OF_STATUS.ACTIVE,
            id: userId,
         },
         chatRoomId: roomName,
         createdAt: new Date(),
         attachments: [],
         startTimeVideo: startDateCurrent,
         endTimeVideo:new Date(),
         statusVideoCall:""
      }

      if (isCall === "1" && (isListenCurrent || isListen) && !isInsertClose) {
         messageSend.message=ENUM_KIND_OF_MESSAGE_VIDEO_CALL.RETURN_CALL_VIDEO;
         messageSend.statusVideoCall=ENUM_TYPE_STATUS_VIDEO_CALL.LISTEN_CALL_VIDEO;
         (async () => {
            sendMessageVideo(messageSend);
            messageSend.statusVideoCall=ENUM_TYPE_STATUS_VIDEO_CALL.CLOSE_CALL_VIDEO;
            sendMessage(messageSend);
            isInsertClose=true;
         })();
      }
      else if(isCall === "1" && !isListenCurrent && !isInsertMissed){
         messageSend.message=ENUM_KIND_OF_MESSAGE_VIDEO_CALL.MISSED_CALL_VIDEO
         messageSend.statusVideoCall=ENUM_TYPE_STATUS_VIDEO_CALL.MISSED_CALL_VIDEO
         isInsertMissed=true;
         (async () => {
            sendMessageVideo(messageSend);
            sendMessage(messageSend);
         })();
      }
      else if(isCall==="0" && (isListenCurrent || isListen)){
         messageSend.message=ENUM_KIND_OF_MESSAGE_VIDEO_CALL.RETURN_CALL_VIDEO
         messageSend.statusVideoCall=ENUM_TYPE_STATUS_VIDEO_CALL.CLOSE_CALL_VIDEO;
         (async () => {
            sendMessage(messageSend);
         })();
      }
      return 1
      
   }

   const loadJitsiScript = async () => {
      let resolveLoadJitsiScriptPromise: any | null = null;

      const loadJitsiScriptPromise = new Promise(resolve => {
         resolveLoadJitsiScriptPromise = resolve;
      });

      const script = document.createElement("script");
      script.src = ENUM_KIND_OF_VIDEO_CALL.LINK_JITSI_MEET_JS;
      script.async = true;
      script.onload = () => resolveLoadJitsiScriptPromise(true);
      document.body.appendChild(script);
      return loadJitsiScriptPromise;
   };

   React.useEffect(() => {
      (async () => {
         if (!window.JitsiMeetExternalAPI) {
            await loadJitsiScript();
         }

         // Lấy thông tin người đăng nhập  
         const response = await getUserById(userId);

         const _jitsi = new window.JitsiMeetExternalAPI(ENUM_KIND_OF_VIDEO_CALL.LINK_JITSI_MEET, {
            roomName: roomName,
            // jwt: '<jwt_token>',
            devices: {
               audioInput: '<deviceLabel>',
               audioOutput: '<deviceLabel>',
               videoInput: '<deviceLabel>'
            },
            configOverwrite: { startWithAudioMuted: true, enableClosePage: false },
            interfaceConfigOverwrite: interfaceConfig,
            parentNode: document.getElementById("jitsi-container-id")
         });

         //set tên người tham gia phòng chat
         if(response && response.data){
            _jitsi.executeCommand('displayName', response.data.lastName + " " + response.data.firstName);
            //set email người tham gia phòng chat
            _jitsi.executeCommand('email', response.data.email);
         }
       
         //hành động tắt cuộc gọi
         _jitsi.addEventListener('readyToClose', function () { 
            var result= sendMessageFunction();
            if(isCall=="0"){
               setTimeout(function(){
                  window.close()
               }, 2500);
               _jitsi?.dispose?.();
            }
         });

         if(isCall==="1"){
            //Bật hoặc tắt chế độ sảnh đợi.
            _jitsi.executeCommand('toggleVideo');
         }

         window.onbeforeunload = closingCode;

         function closingCode(){
            // do something...
            var result= sendMessageFunction();
         }

         let messageSend: IChat = {
            message: ENUM_KIND_OF_MESSAGE_VIDEO_CALL.CREATE_CALL_VIDEO,
            messageType: ENUM_KIND_OF_MESSAGE.VIDEO_CALL,
            messageStatus: ENUM_KIND_OF_STATUS.ACTIVE,
            userId: userId,
            chatRoomId: roomName,
            typeVideoCall: ENUM_KIND_OF_TYPE_VIDEO_CALL.PRIVATE
         }
         
         if (isCall === "0") {
            messageSend.statusVideoCall = ENUM_TYPE_STATUS_VIDEO_CALL.LISTEN_CALL_VIDEO
            isListenCurrent=true
         }

         await sendMessage(messageSend)

         socket.onmessage = (message) => {
            var data = JSON.parse(decodeURIComponent(JSON.parse(message.data).text));

            //không nhận cuộc gọi video
            if (data.value.statusVideoCall === ENUM_TYPE_STATUS_VIDEO_CALL.NOT_LISTEN_CALL_VIDEO) {
               _jitsi?.dispose?.();
               setTimeout(function(){
                  window.close()
               }, 2500);

            }
             //thông báo khi có người nghe nhận cuộc gọi
            if (data.value.statusVideoCall === ENUM_TYPE_STATUS_VIDEO_CALL.LISTEN_CALL_VIDEO && isCall === "1") {
               _jitsi.executeCommand('toggleVideo');
               setStartDateFuntion(new Date());
               startDateCurrent=new Date();
               isListenCurrent=true;
            }

            //thông báo khi có người nghe tắt cuộc gọi
            if (data.value.statusVideoCall === ENUM_TYPE_STATUS_VIDEO_CALL.CLOSE_CALL_VIDEO && isCall === "1") {
                 sendMessageFunction()
                _jitsi?.dispose?.();
                setTimeout(function(){
                  window.close()
               }, 2500);
            }

            //thông báo khi có người nghe tắt cuộc gọi
            if (data.value.statusVideoCall === ENUM_TYPE_STATUS_VIDEO_CALL.CLOSE_CALL_VIDEO && isCall === "1" && data.value.userId!==localStorage.getItem('userId'))  {
               sendMessageFunction();
              _jitsi?.dispose?.();
              setTimeout(function(){
                  window.close()
               }, 2500);
          }
         };

      })();

      return () => jitsi?.dispose?.();

   }, []);

   return (
      <div id="jitsi-container-id" style={{ height: window.outerHeight, width: "100%" }} />
   )
};

export default VideoConference;
