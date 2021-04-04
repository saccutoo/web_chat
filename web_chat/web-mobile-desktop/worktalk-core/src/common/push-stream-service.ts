// import { store } from '../redux/store/store';
// import { showMessage } from 'react-native-flash-message';
import ReconnectingWebSocket from 'reconnecting-websocket';
import EventBus, { EventBusName } from './event-bus';
import { IHyperMessage, INewUserChat } from './types/message';
import { PushStreamTypes } from './types/push-stream-types';
import { User } from './types/user';
// import { ApiService } from '../service/ApiService';
import { HyperUtils } from './hyper-utils';
import { APP_CONFIGS } from './app-config';

var sockets: ReconnectingWebSocket[] = [];
var socket: ReconnectingWebSocket;
const options = {
  WebSocket: WebSocket, // custom WebSocket constructor
  connectionTimeout: 1000,
  maxRetries: 10,
};

const pushStreamService = {
  subAllChats: (userChats: User[]) => {
    pushStreamService.closeAllSocket();
    for (let i = 0; i < userChats.length; i++) {
      pushStreamService.subChat(userChats[i].id);
    }
  },

  subChannelSystem: () => {
    pushStreamService.subChat('CHANNEL_ACTIVITIES');
  },

  subChat: (userID: string) => {
    console.log('test_socket_initial:', userID, '__', APP_CONFIGS.URL_PUSH_STREAM);
    socket = new ReconnectingWebSocket(
      `ws://${APP_CONFIGS.URL_PUSH_STREAM}/ws?Channels=` + userID,
      [],
      options
    );
    socket.onopen = () => {
      // connection opened
      console.log('test_socket_user_id:', userID);
      console.log(
        `test_ws://${APP_CONFIGS.URL_PUSH_STREAM}/ws?Channels=` +
          userID
      );
    };
    socket.onmessage = (e) => {
      pushStreamService.messageReceived(decodeURIComponent(JSON.parse(e.data).text));
    };

    socket.onerror = (e) => {
      // an error occurred
      console.log('test_socket_err: ', e);
      // socket.close();
      // clearInterval();
      // setTimeout(function() {
      //   pushStreamService.subChat(chatId);
      // }, 1000);
    };

    socket.onclose = (e) => {
      console.log('test_Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    };
    // sockets.push(ws);
  },
  closeSocket: () => {
    console.log('test_closeSocket');
    socket.close();
  },
  closeAllSocket: () => {
    console.log('test_closeAllSocket');
    sockets.map((s) => s.close());
  },
  // Handler xử lý message lắng nghe từ PushStream khi có message mới
  messageReceived: async (text) => {
    let newMessage = JSON.parse(text);
    console.log('test_messageReceived_1' + JSON.stringify(newMessage));
    if (HyperUtils.isNotEmpty(newMessage)) {
      switch (newMessage.type) {
        // case PushStreamTypes.NEW_MESSENGER: {
        //   let mes: IHyperMessage = {};
        //   let user: User = {};
        //   if (newMessage && newMessage.value) {
        //     user.id = newMessage.value?.user?.id;
        //     user._id = newMessage.value?.user?.id;
        //     user.username = newMessage.value?.user?.username;
        //     user.avatar_url = 'https://placeimg.com/960/540/any';
        //     mes._id = newMessage.value?.id;
        //     mes.chatId = newMessage.value?.chatId;
        //     mes.createdAt = newMessage.value?.modifiedDate;
        //     mes.type = newMessage.value?.type;
        //     mes.user = user;
        //     mes.path = newMessage.value?.path;
        //     mes.reply = newMessage.value?.replyMess;
        //     mes.fileExtension = newMessage.value?.fileExtension;
        //     mes.attachment = newMessage.value.attachment;

        //     if (newMessage.value.type === KindOfMsg.TYPE_IMAGE) {
        //       mes.image = `http://172.16.40.43:9000/preview/+${newMessage.value?.path}`;
        //       mes.text = newMessage?.value?.message;
        //     } else {
        //       mes.text = newMessage?.value?.message;
        //     }
        //   }

        //   const state = store?.getState();
        //   const myId = state.userInfo?.user?.id;
        //   switch (mes?.type) {
        //     case KindOfMsg.TYPE_VIDEO_CALL_INCOMING:
        //       const otherId = user.id || user._id;
        //       console.log('test_TYPE_VIDEO_CALL_INCOMING:', otherId, '__', myId);
        //       if (myId != otherId) {
        //         NavigationService.navigate(IncomingCallScreen, {
        //           type: KindOfMsg.TYPE_VIDEO_CALL_INCOMING,
        //           user: user,
        //           chatInfo: mes,
        //           timeStart: newMessage?.value?.timeStart,
        //         });
        //       }
        //       break;
        //     case KindOfMsg.TYPE_VIDEO_CALL_ACCEPT:
        //       console.log(
        //         'test_TYPE_VIDEO_CALL_ACCEPT: ',
        //         newMessage,
        //         ', isMe: ',
        //         myId === newMessage.value?.receiverId
        //       );
        //       if (myId === newMessage.value?.receiverId) {
        //         NavigationService.navigate(VideoCallScreen, {
        //           chatInfo: {
        //             ...state.userInfo?.user,
        //             ...{ chatId: newMessage.value?.chatId },
        //             ...{ senderId: newMessage.value?.senderId },
        //           },
        //           link: newMessage.value?.link,
        //         });
        //       }
        //       break;
        //     case KindOfMsg.TYPE_VIDEO_CALL_DENY:
        //       console.log('test_TYPE_VIDEO_CALL_DENY: ', newMessage);
        //       if (myId === newMessage.value?.receiverId) {
        //         StatusBar.setBarStyle('dark-content');
        //         NavigationService.pop();
        //       }
        //       break;
        //     case KindOfMsg.TYPE_VIDEO_CALL_FINISH:
        //       console.log('test_TYPE_VIDEO_CALL_FINISH: ', newMessage, ', myId: ', myId);
        //       StatusBar.setBarStyle('dark-content');
        //       if (myId === newMessage.value?.receiverId) {
        //         NavigationService.pop();
        //       } else {
        //         NavigationService.popMany(2);
        //       }
        //       break;
        //     default:
        //       EventBus.getInstance().post({
        //         type: EventBusName.INCOMING_MESSAGE,
        //         payload: mes,
        //       });
        //       break;
        //   }

        //   break;
        // }
        case PushStreamTypes.NEW_MESSENGER: {
          // let mes: IHyperMessage = {};
          // let user: User = {};
          let mes: any = {};
          let user: any = {};
          if (newMessage && newMessage.value) {
            // user.id = newMessage.value?.user?.id;
            // user._id = newMessage.value?.user?.id;
            // user.username = newMessage.value?.user?.username;
            // user.avatar_url = 'https://placeimg.com/960/540/any';
            user.id = newMessage.value?.user;
            user._id = newMessage.value?.user;
            user.username = 'web';

            // mes._id = newMessage.value?.id;
            mes._id = HyperUtils.genRandomID(16);
            mes.chatId = newMessage.value?.chatId;
            mes.createdAt = newMessage.value?.createdAt;
            // mes.type = newMessage.value?.type;
            mes.user = user;
            // mes.path = newMessage.value?.path;
            // mes.reply = newMessage.value?.replyMess;
            // mes.fileExtension = newMessage.value?.fileExtension;
            // mes.attachment = newMessage.value.attachment;

            // if (newMessage.value.type === KindOfMsg.TYPE_IMAGE) {
            //   mes.image = `http://172.16.40.43:9000/preview/+${newMessage.value?.path}`;
            //   mes.text = newMessage?.value?.message;
            // } else {
            mes.text = newMessage?.value?.message;
            // }
          }
          EventBus.getInstance().post({
            type: EventBusName.INCOMING_MESSAGE,
            payload: mes,
          });
          break;
        }
        case PushStreamTypes.UPDATED_STATUS_USER:
          EventBus.getInstance().post({
            type: EventBusName.UPDATE_STATUS_USER,
            payload: newMessage.value,
          });
          break;
        case PushStreamTypes.NEW_USER_CHAT:
          const new_user_chat: INewUserChat = newMessage?.value;
          const userId = new_user_chat.userId || -1;
          if (userId === -1) break;

          EventBus.getInstance().post({
            type: EventBusName.NEW_USER_CHAT,
            payload: new_user_chat,
          });
          break;
        case PushStreamTypes.TYPE_DELETED_MESSENGER:
          const remove_msg = newMessage?.value;
          EventBus.getInstance().post({
            type: EventBusName.TYPE_DELETED_MESSENGER,
            payload: remove_msg,
          });
          //Reload list user chat
          EventBus.getInstance().post({
            type: EventBusName.RELOAD_LIST_CHAT,
            payload: {},
          });
          break;
        default: {
          break;
        }
      }
    }
  },
};

export { pushStreamService };
