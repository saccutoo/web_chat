/* 
    Created by longdq
*/

import { processRequestRespository, deletes } from 'core/common/networking/api-helper';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import NavigationService from 'routers/navigation-service';
import { IncomingCallScreen } from 'routers/screen-name';
import { IHyperMessage, KindOfMsg } from 'core/common/types/message';
import { translate } from '../../res/languages';
import ChatDetailServices from './chat-detail.services';
import { User } from '../common/types/user';
import {
  ChatDetailProps,
  ChatInfoParams,
  RemoveMessageParams,
  TypeParam,
} from './chat-detail.props';
import { Clipboard, Platform, StatusBar } from 'react-native';
import { createRef, useCallback, useEffect, useState } from 'react';
import EventBus, { EventBusName, EventBusType } from 'core/common/event-bus';
import { Subscription } from 'rxjs';
// import { GetMessagesReq } from '../common/redux/base-request';
import { GetMessagesRes } from 'core/common/types/base-response';
import { ChatActionsComponent } from 'features/chat-detail/view/components/chat-actions/chat-actions.component';
import { GetMessagesReq } from 'core/common/types/base-request';
import { HyperUtils } from 'core/common/hyper-utils';
import { PushStreamTypes } from 'core/common/types/push-stream-types';

function ChatDetailAdapter(props: ChatDetailProps, chatInfo: ChatInfoParams) {
  const { userInfo, navigation } = props;
  const refChatActionsComponent = createRef<ChatActionsComponent>();

  var tmpMessage: IHyperMessage = null;
  var isCreateRoom: boolean = false;
  var firstMessage: IHyperMessage[] = [];

  const subscriptions = new Subscription();
  var didFocus: any = null;
  var roomId: string = '';
  const [dataListMessage, setDataListMessage] = useState<any>();
  // const [currentMessage, setCurrentMessage] = useState<Object>();
  const [currentMessage, setCurrentMessage] = useState<GetMessagesRes>();
  const [showHi, setShowHi] = useState<boolean>(false);
  const [isVisibleEmojiPicker, setIsVisibleEmojiPicker] = useState<boolean>(false);

  //Callback
  useEffect(() => {
    console.log('test_chat_dtl_adapter');
    registerSubscriber();
    didFocus = navigation.addListener('didFocus', () => {
      if (Platform.OS === 'android') {
        setTimeout(() => {
          StatusBar.setBarStyle('dark-content');
        }, 500);
      }
    });
    // chatInfo = navigation.getParam('chatInfo');
    console.log('test_chatInfo_1: ', chatInfo);
    if (chatInfo && chatInfo.type === TypeParam.FORM_MESSAGE) {
      roomId = chatInfo?.data?.id;
      getListMessage({ chatId: roomId });
    }
    if (chatInfo && chatInfo.type === TypeParam.FROM_USER) {
      const id = chatInfo.data && chatInfo.data.id;
      if (id) {
        requestToUser(id);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      subscriptions.unsubscribe();
      if (didFocus) didFocus.remove();
    };
  }, []);

  // test ---

  // useEffect(() => {
  //   console.log('SET OPEN POPUP :', isVisibleEmojiPicker);
  // });

  const registerSubscriber = () => {
    subscriptions.add(
      EventBus.getInstance().events.subscribe((res: EventBusType) => {
        const payload = res?.payload;
        console.log('test_INCOMING_MESSAGE: ', payload, '__type:', res?.type);
        if (payload) {
          switch (res?.type) {
            case PushStreamTypes.CREATE_CHAT_ROOM:
              appendMessage(payload);
              break;
            case EventBusName.TYPE_DELETED_MESSENGER:
              onDeleteMessageSuccess(null, { _id: payload?.msgId });
              break;
            case EventBusName.CHAT_DETAIL_ACTION_ANSWER:
              onAnswer();
              break;
            case EventBusName.CHAT_DETAIL_ACTION_EDIT:
              onEdit();
              break;
            case EventBusName.CHAT_DETAIL_ACTION_COPY:
              onCopy();
              break;
            case EventBusName.CHAT_DETAIL_ACTION_REMOVE:
              onRemove();
              break;
          }
        }
      })
    );
  };

  const goBack = () => {
    NavigationService.goBack();
  };

  //say Hi!
  const sayHi = () => {
    const newMess = {
      _id: null,
      text: 'Hi!',
      createdAt: null,
      user: null,
      image: null,
      video: null,
      audio: null,
      system: null,
      sent: null,
      received: null,
      pending: null,
      quickReplies: null,
      type: null,
      path: null,
      reply: null,
      fileExtension: null,
      attachment: null,
      deleted: null,
    };
    checkSendMessage([newMess], null);
  };

  // Messages
  const onDeleteMessage = (msg: IHyperMessage) => {
    console.log('test_delete_msg: ', msg);
    const params: RemoveMessageParams = {
      msgId: msg?._id,
      senderId: msg.user?._id,
      chatId: roomId,
    };
    processRequestRespository(ChatDetailServices.getInstance().removeMessage(params), (rs) =>
      onDeleteMessageSuccess(rs, msg)
    );
  };

  const onDeleteMessageSuccess = (rs: any, msg: IHyperMessage) => {
    console.log('test_onDeleteMessageSuccess: ', rs, '__', msg);
    const filter = dataListMessage.filter((message) => message._id !== msg._id);
    setDataListMessage(filter);
    // this.ChatDetailContainer.setState((previousState) => ({
    //   dataListMessage: previousState.dataListMessage.filter((message) => message._id !== msg._id),
    // }));
  };

  const showMessageActions = (context: any, message: IHyperMessage) => {
    console.log('test_showActionMessage:', message);
    const myId = userInfo?.user?.id;
    const msgId = message?.user.id || message?.user._id;
    const isMe = myId === msgId;
    // this.ChatDetailContainer.refChatActionsComponent?.current?.openModal(isMe);
    // openModal?.(isMe);
    refChatActionsComponent?.current?.openModal(isMe);
    // openModal?.(isMe);
    tmpMessage = message;
  };

  const goToVideoCall = () => {
    NavigationService.navigate(IncomingCallScreen, {
      type: KindOfMsg.TYPE_VIDEO_CALL_OUTGOING,
      user: chatInfo?.data?.contact,
      chatInfo: chatInfo,
    });

    // const msg: IHyperMessage[] = [{ text: KindOfMsg.TYPE_VIDEO_CALL_INCOMING }];
    const msg: IHyperMessage[] = [{ text: KindOfMsg.VIDEO_CALL }];

    // checkSendMessage(msg, KindOfMsg.TYPE_VIDEO_CALL_INCOMING);
    checkSendMessage(msg, KindOfMsg.VIDEO_CALL);

    // call api
    let messageSend = {
      message: 'test cuộc gọi đến',
      messageType: 'video call',
      messageStatus: 'edit',
      userId: userInfo.user.id,
      chatRoomId: chatInfo.data.id,
      typeVideoCall: 'private',
    };
    ChatDetailServices.getInstance().callVideo(messageSend);
  };

  const requestToUser = (id: string) => {
    processRequestRespository(
      ChatDetailServices.getInstance().requestToUser(id),
      requestToUserSuccess
    );
  };

  const requestToUserSuccess = (res: any) => {
    if (res && res.chatId) {
      getListMessage({ chatId: res.chatId });
      roomId = res.chatId;
    } else {
      isCreateRoom = true;
    }
  };

  const createRoom = (id: string, typeMsg: KindOfMsg) => {
    processRequestRespository(ChatDetailServices.getInstance().createRomChat(id), (res) =>
      createRoomSuccess(res, typeMsg)
    );
  };

  const createRoomSuccess = (res: any, typeMsg: KindOfMsg) => {
    if (res && res.chatId) {
      // this.getListMessage(res.chatId);
      roomId = res.chatId;
      isCreateRoom = false;
      sendMessage(firstMessage, res.chatId, typeMsg);
    }
  };

  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  // }, [])

  const appendMessage = useCallback((messages = []) => {
    switch (messages[0]?.type) {
      // case KindOfMsg.TYPE_VIDEO_CALL_INCOMING:
      case KindOfMsg.VIDEO_CALL:
        break;
      default:
        // setDataListMessage(GiftedChat.append(dataListMessage, msg));
        // setDataListMessage((prevState)=>({
        //   GiftedChat.append(prevState.dataListMessage, msg)
        // }))
        setDataListMessage((previousMessages: []) => {
          console.log('test_append_prev_msg: ', previousMessages);
          console.log('test_append_currrent_msg: ', messages);
          return GiftedChat.append(previousMessages, messages);
        });

        // this.ChatDetailContainer.setState((previousState) => ({
        //   // @ts-ignore
        //   dataListMessage: GiftedChat.append(previousState.dataListMessage, msg),
        // }));
        break;
    }
  }, []);

  useEffect(() => {
    console.log('test_append_new_list', dataListMessage);
  }, [dataListMessage]);

  // const appendMessage = (msg: IHyperMessage) => {
  //   console.log('test_incoming_call_append_msg: ', msg, '__', userInfo.user.id);
  //   switch (msg.type) {
  //     case KindOfMsg.TYPE_VIDEO_CALL_INCOMING:
  //       break;
  //     default:
  //       // setDataListMessage(GiftedChat.append(dataListMessage, msg));
  //       // setDataListMessage((prevState)=>({
  //       //   GiftedChat.append(prevState.dataListMessage, msg)
  //       // }))
  //       const tmpMsg: [] = [msg]
  //       setDataListMessage((prevMessage:[])=>({
  //         // console.log('test_prev_state: ', prevState)
  //         dataListMessage: GiftedChat.append(prevMessage, tmpMsg),
  //       }))

  //       // this.ChatDetailContainer.setState((previousState) => ({
  //       //   // @ts-ignore
  //       //   dataListMessage: GiftedChat.append(previousState.dataListMessage, msg),
  //       // }));
  //       break;
  //   }
  // };

  const getListMessage = (params: GetMessagesReq) => {
    processRequestRespository(
      ChatDetailServices.getInstance().getListMessage(params),
      getListMessageSuccess
    );
  };

  const getListMessageSuccess = (res: any[]) => {
    console.log('test_RESPONSE MESS:', res);

    var arrMess: IHyperMessage[] = [];
    if (res.length > 0) {
      res.forEach((element) => {
        let mes: IHyperMessage = {};
        let user: User = {};
        user._id = element?.user?.id;
        user.username = element?.user?.username;
        user.avatar = HyperUtils.getAvatar(element?.user?.avatar);
        mes._id = element?.id;
        mes.createdAt = element?.createdAt;
        mes.type = element?.messageType;
        mes.path = element?.path;
        mes.fileExtension = element?.fileExtension;
        mes.reply = element?.replyMess;
        mes.user = user;
        mes.attachment = element?.attachments;

        switch (mes.type) {
          // case KindOfMsg.TYPE_IMAGE:
          case KindOfMsg.ATTACHMENT:
            // ChatDetailServices.getInstance().getUrlAttachment('c6da0a02-b3cd-430a-bd68-5f71c1eca77f-17a5b2b4-daa0-4ed2-81dd-354db623dbd9');
            // mes.image =
            //   'http://172.20.80.19:9002/api/file/GetFileStreamById?guid=' +
            //   element.attachments[0].name;
            // mes.image = `http://172.16.40.43:9000/preview/+${element?.path}`;
          mes.text = '';
            break;
          // case KindOfMsg.TYPE_VIDEO_CALL_INCOMING:
          case KindOfMsg.VIDEO_CALL:
            console.log('test_incoming_call: ', element, '__', userInfo?.user?.id);
            mes.text =
              element.user.id === userInfo?.user?.id
                ? translate('videoCall.titleOutGoingCall')
                : translate('videoCall.titleIncomingCall');
            break;
          default:
            mes.text = element?.message;
            break;
        }

        //Check header, footer
        // let sameUserInPrevMessage = false;
        // let sameDate = false;
        // if (previousMessage) {
        //   const d1 = currentMessage?.createdAt?.split('T')[0];
        //   const d2 = previousMessage?.createdAt?.split('T')[0];
        //   sameDate = d1 === d2;
        //   previousMessage?.user?._id === currentMessage?.user?._id
        //     ? (sameUserInPrevMessage = true)
        //     : (sameUserInPrevMessage = false);
        // }

        console.log('test_mes_text: ', mes.text);
        arrMess.push(mes);
      });
    }
    if (arrMess && arrMess.length < 1) {
      setShowHi(true);
    }
    setDataListMessage(arrMess);
  };

  const checkSendMessage = (
    newMessages: IHyperMessage[] = [],
    // typeMsg: KindOfMsg = KindOfMsg.TYPE_TEXT
    typeMsg: KindOfMsg = KindOfMsg.TEXT
  ) => {
    let chatId = '';
    console.log('test_chat_info_0: ', newMessages, typeMsg);
    console.log('test_chat_info: ', chatInfo, '__isCreateRoom: ', isCreateRoom);
    if (chatInfo && chatInfo.type === 'FORM_MESSAGE') {
      chatId = chatInfo.data && chatInfo.data.id;
      sendMessage(newMessages, chatId, typeMsg);
    }
    if (chatInfo && chatInfo.type === 'FROM_USER') {
      if (!isCreateRoom) {
        chatId = roomId;
        sendMessage(newMessages, chatId, typeMsg);
      }
      // if (isCreateRoom) {
      //   const id = chatInfo.data && chatInfo.data.id;
      //   firstMessage = newMessages;
      //   createRoom(id, typeMsg);
      // }
    }
  };

  // TODO
  const sendMessage = (newMessages: IHyperMessage[] = [], chatId: string, typeMsg: KindOfMsg) => {
    let sendReplyId = '';
    // if (replyData && replyData.isReply) {
    //   sendReplyId = replyData.itemMessage && replyData.itemMessage._id;
    // }

    console.log(
      'SEND MESSAGE :',
      newMessages,
      '----- chatId: ',
      chatId,
      '------ typeMsg:',
      typeMsg
    );

    if (chatId) {
      // TODO
      // sendReplyId = this.ChatDetailContainer.state.currentMessage?._id || '';
      // const postData = {
      //   chatId: ,
      //   message: newMessages[0].text,
      //   replyId: sendReplyId,
      //   type: typeMsg,
      // };

      const postData = {
        chatRoomId: chatId,
        message: newMessages[0].text,
        messageStatus: '1',
        messageType: typeMsg,
        // user: { userName: 'Test 1', status: '1' },
        // userId: '7JBbXOtJhieqbSpq0k00103E',
        userId: userInfo.user.id,
      };

      console.log('test_param_send message: ', postData);
      console.log('test_param_current message: : ', currentMessage);

      processRequestRespository(
        ChatDetailServices.getInstance().insertMessage(postData),
        () => sendMessageSuccess(newMessages[0]),
        undefined,
        false,
        false
      );
      onCloseReply();
    }
  };

  // const sendMessage = (newMessages: IHyperMessage[] = [], chatId: string, typeMsg: KindOfMsg) => {
  //   let sendReplyId = '';
  //   // if (replyData && replyData.isReply) {
  //   //   sendReplyId = replyData.itemMessage && replyData.itemMessage._id;
  //   // }

  //   console.log(
  //     'SEND MESSAGE :',
  //     newMessages,
  //     '----- chatId: ',
  //     chatId,
  //     '------ typeMsg:',
  //     typeMsg
  //   );

  //   if (chatId) {
  //     // TODO
  //     // sendReplyId = this.ChatDetailContainer.state.currentMessage?._id || '';
  //     // const postData = {
  //     //   chatId: ,
  //     //   message: newMessages[0].text,
  //     //   replyId: sendReplyId,
  //     //   type: typeMsg,
  //     // };

  //     const postData = {
  //       chatRoomId: chatId,
  //       message: newMessages[0].text,
  //       messageStatus: '1',
  //       messageType: typeMsg,
  //       // user: { userName: 'Test 1', status: '1' },
  //       // userId: '7JBbXOtJhieqbSpq0k00103E',
  //       userId : userInfo.user.id
  //     };

  //     // const msg = {
  //     //   _id: 2,
  //     //   text: 'Hello developer',
  //     //   createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
  //     //   user: {
  //     //     _id: 2,
  //     //     name: 'React Native',
  //     //     avatar: 'https://placeimg.com/140/140/any',
  //     //   }
  //     // }

  //     // const msg = {
  //     //   _id: "9htO0tqukeaz000Gt5004001",
  //     //   text: 'Hello developer',
  //     //   createdAt: "2021-03-13T10:37:33.846Z",
  //     //   type: "0",
  //     //   chatId: undefined,
  //     //   user: {
  //     //     _id: 2,
  //     //     name: 'React Native',
  //     //     avatar: 'https://placeimg.com/140/140/any',
  //     //   }
  //     // }

  //     const msg = {
  //       _id: "9htO0tqukeam020Gt5004001",
  //       chatId: undefined,
  //       createdAt: "2021-03-13T10:37:33.846Z",
  //       text: "ui",
  //       type: "0",
  //       user:{
  //         // id: "7JBbXOtJhieqbSpq0k00103E",
  //         // username: undefined,
  //         name: 'React Native',
  //         // _id: "7JBbXOtJhieqbSpq0k00103E"
  //         _id: "7JBbXOtJhieqbSpq0k00103E"
  //         // _id:2
  //       }
  //     }

  //     console.log('test_param_send message: ', postData);
  //     console.log('test_param_current message: : ', currentMessage);

  //     setDataListMessage((previousMessages: []) => GiftedChat.append(previousMessages, msg));

  //     // processRequestRespository(
  //     //   ChatDetailServices.getInstance().insertMessage(postData),
  //     //   () => sendMessageSuccess(newMessages[0]),
  //     //   undefined,
  //     //   false,
  //     //   false
  //     // );
  //     onCloseReply();
  //   }
  // };

  const onCloseReply = () => {
    // const reply = {
    //   itemMessage: undefined,
    //   isReply: false,
    // };
    // dispatch(changeReplyMessage(reply));
  };

  const sendMessageSuccess = (msg: IHyperMessage) => {
    currentMessage && closePopup();
    // this.appendMessage(msg);
  };

  // Send Files
  const sendFile = (data: any) => {
    var pathFileList;
    ChatDetailServices.getInstance()
      .uploadFile(data)
      .then((res) => {
        pathFileList = res.data;
        console.log('Path File List :', pathFileList);
      });
  };

  // Answer, edit, copy, remove
  const onAnswer = () => {
    closePopup();
    setCurrentMessage(tmpMessage);
  };
  const onEdit = () => {
    closePopup();
  };
  const onCopy = () => {
    Clipboard.setString(tmpMessage?.text);
    closePopup();
  };

  const onHideFooter = () => {
    closePopup();
  };

  const onRemove = () => {
    console.log('test_onRemove');
    closePopup();
    onDeleteMessage(tmpMessage);
  };

  const closePopup = () => {
    refChatActionsComponent.current?.refModalChatActions.current?.close();
    setCurrentMessage(null);
  };

  // add emoji to message
  const addEmoji = (event: any) => {
    let sym = event.unified.split('-');
    let codesArray: any = [];
    sym.forEach((el: any) => codesArray.push('0x' + el));
    let emoji: string = String.fromCodePoint(...codesArray);
    // setMessage((prev) => prev + emoji);
    console.log('Current Message :', emoji);
  };

  const clickOutSide = () => {};

  return {
    dataListMessage,
    currentMessage,
    showHi,
    sayHi,
    roomId,
    goToVideoCall,
    showMessageActions,
    checkSendMessage,
    onHideFooter,
    sendFile,
    refChatActionsComponent,
    isVisibleEmojiPicker,
    setIsVisibleEmojiPicker,
    addEmoji,
  };
}

export default ChatDetailAdapter;
