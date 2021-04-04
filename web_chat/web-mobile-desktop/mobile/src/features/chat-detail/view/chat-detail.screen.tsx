/* 
    Created by longdq
*/

import EventBus, { EventBusName, EventBusType } from 'core/common/event-bus';
import { ContainerComponent } from 'libraries/main/container/container.component';
import * as React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedbackComponent,
} from 'react-native';
import { Subscription } from 'rxjs';
import { HeaderTypes } from 'types/header-types';
import { IHyperMessage } from '../../../core/common/types/message';
import ChatDetailAdapter from 'core/model-chat-detail/chat-detail.adapter';
import {
  ChatDetailProps,
  ChatInfoParams,
  TypeParam,
} from 'core/model-chat-detail/chat-detail.props';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Composer,
  Send,
  Message,
  MessageText,
  Bubble,
} from 'react-native-gifted-chat';
import { ListChatModel } from 'core/model-list-user-chat/list-user-chat.props';
import colors from 'res/colors';
import { InputToolBarComponent } from './components/input-tool-bar/input-tool-bar.component';
import { CustomViewMessageComponent } from './components/custom-view-message/custom-view-message.component';
import { MessageContainerComponent } from './components/message-container/message-container.component';
import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import svgs from 'res/svgs';
import { ChatActionsComponent } from './components/chat-actions/chat-actions.component';
import { ReplyMessageComponent } from './components/chat-actions/components/reply-message/reply-message.component';
// import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
//@ts-ignore
import { Picker } from 'emoji-mart-native';
import { TouchableWithoutFeedback } from 'react-native';
import MenuPopup from 'libraries/menubox/menubox.component';

function ChatDetailContainer(props: ChatDetailProps) {
  const { navigation, userInfo } = props;
  const chatInfo: ChatInfoParams = navigation.getParam('chatInfo');
  const {
    dataListMessage,
    currentMessage,
    showHi,
    goToVideoCall,
    showMessageActions,
    checkSendMessage,
    sayHi,
    onHideFooter,
    roomId,
    refChatActionsComponent,
    isVisibleEmojiPicker,
    setIsVisibleEmojiPicker,
    addEmoji,
  } = ChatDetailAdapter(props, chatInfo);

  console.log('CHAT DETAIL :', chatInfo, '-----', userInfo);
  console.log('CHAT DETAIL LIST MESSAGE :', dataListMessage);

  // subscriptions = new Subscription();
  // chatInfo: ChatInfoParams;
  // didFocus: any = null;

  //Local States

  // const refChatActionsComponent = React.createRef<ChatActionsComponent>();
  // navigation: NavigationScreenProp<NavigationState, NavigationParams>
  // constructor(props: ChatDetailProps) {
  //   super(props);
  //   this.ChatDetailAdapter = new ChatDetailAdapter(this);
  //   this.state = {
  //     dataListMessage: [],
  //     currentMessage: null,
  //     showHi: false,
  //   };

  //   this.navigation = props.navigation
  //   this.chatInfo = this.navigation.getParam('chatInfo');
  // }

  // componentDidMount = () => {
  //   this.onEventBusSubscribe();
  //   this.didFocus = this.navigation.addListener('didFocus', () => {
  //     if (Platform.OS === 'android') {
  //       setTimeout(() => {
  //         StatusBar.setBarStyle('dark-content');
  //       }, 500);
  //     }
  //   });
  //   this.chatInfo = this.navigation.getParam('chatInfo');
  //   console.log('test_chatInfo_1: ', this.chatInfo);
  //   if (this.chatInfo && this.chatInfo.type === TypeParam.FORM_MESSAGE) {
  //     this.roomId = this.chatInfo?.data?.id;
  //     this.ChatDetailAdapter.getListMessage(this.roomId);
  //   }
  //   if (this.chatInfo && this.chatInfo.type === TypeParam.FROM_USER) {
  //     const id = this.chatInfo.data && this.chatInfo.data.id;
  //     if (id) {
  //       this.ChatDetailAdapter.requestToUser(id);
  //     }
  //   }
  // };

  // private onEventBusSubscribe = () => {
  //   this.subscriptions.add(
  //     EventBus.getInstance().events.subscribe((res: EventBusType) => {
  //       const payload = res?.payload;
  //       if (payload) {
  //         switch (res?.type) {
  //           case EventBusName.INCOMING_MESSAGE:
  //             this.ChatDetailAdapter.appendMessage(payload);
  //             break;
  //           case EventBusName.TYPE_DELETED_MESSENGER:
  //             this.ChatDetailAdapter.onDeleteMessageSuccess(null, { _id: payload.msgId });
  //             break;
  //           case EventBusName.CHAT_DETAIL_ACTION_ANSWER:
  //             this.ChatDetailAdapter.onAnswer();
  //             break;
  //           case EventBusName.CHAT_DETAIL_ACTION_EDIT:
  //             this.ChatDetailAdapter.onEdit();
  //             break;
  //           case EventBusName.CHAT_DETAIL_ACTION_COPY:
  //             this.ChatDetailAdapter.onCopy();
  //             break;
  //           case EventBusName.CHAT_DETAIL_ACTION_REMOVE:
  //             this.ChatDetailAdapter.onRemove();
  //             break;
  //         }
  //       }
  //     })
  //   );
  // };

  // componentWillUnmount() {
  //   this.subscriptions?.unsubscribe();
  //   if (this.didFocus) this.didFocus.remove();
  // }

  const renderMessage = (props: any) => {
    console.log(
      'test_render_message: ',
      props.currentMessage.user?._id,
      '___',
      userInfo.user?.id,
      props.currentMessage.text,
      props.currentMessage.user?._id == userInfo.user?.id
    );
    return (
      <Message
        {...props}
        // renderDay={() => <Text>Date</Text>}
        containerStyle={{
          left: {},
          right: {},
        }}
      />
    );
  };

  const renderMessageText = (props) => (
    <MessageText
      {...props}
      containerStyle={{
        left: {},
        right: {},
      }}
      textStyle={{
        left: { color: 'black' },
        right: { color: 'white' },
      }}
      linkStyle={{
        left: { color: 'blue' },
        right: { color: 'blue' },
      }}
      customTextStyle={{ fontSize: 14, lineHeight: 24 }}
    />
  );

  const renderEmojiPopup = () => (
    <Picker
      style={{
        display: isVisibleEmojiPicker ? null : 'none',
      }}
      showPreview={false}
      showSkinTones={false}
      set={'google'}
      onSelect={addEmoji}
    />
  );

  const onpenEmoji = () => {
    console.log('ÇHAT DETAIL OPEN EMOJI');

    setIsVisibleEmojiPicker(true);
  };

  // menu popup

  const menuRef = React.createRef<MenuPopup>();

  const onMenuPress = () => {
    menuRef.current?.open();
  };


  return (
    <ContainerComponent
      title={chatInfo.data.title}
      headerType={HeaderTypes.CHAT_DETAIL}
      chatInfo={chatInfo}
      videoCall={goToVideoCall}
      noKeyboardAvoidingView
      onPressRight = {onMenuPress}
    >
      {/* Chat */}
      {/* <TouchableWithoutFeedbackComponent onPress={() => setIsVisibleEmojiPicker(false)}> */}
      <GiftedChat
        // renderMessageVideo={() => console.log('hehe')}
        onLongPress={showMessageActions}
        messages={dataListMessage}
        onSend={checkSendMessage}
        user={{
          _id: userInfo.user.id,
          name: userInfo.user.userName,
          avatar: userInfo.user.avatar,
        }}
        // showUserAvatar
        renderInputToolbar={(propsInput: InputToolbar['props']) => (
          <InputToolBarComponent
            propsInput={propsInput}
            roomId={chatInfo.data.id}
            userId={userInfo.user.id}
            onpenEmoji={onpenEmoji}
          />
        )}
        // renderChatFooter={() => <View style={styles.footer} />}
        renderChatFooter={() => {
          return currentMessage ? (
            <ReplyMessageComponent
              userName={currentMessage?.user?.userName}
              message={currentMessage?.message}
              onHideFooter={onHideFooter}
            />
          ) : (
            <View />
          );
        }}
        renderCustomView={(propCustom: Bubble<any>['props']) => (
          <CustomViewMessageComponent propCustom={propCustom} />
        )}
        renderBubble={(propBubble: Bubble<any>['props']) => (
          <MessageContainerComponent propBubble={propBubble} />
        )}
        renderChatEmpty={() => {
          if (showHi) {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{ scaleY: -1 }],
                }}
              >
                <HyperButtonComponent
                  img={svgs.ic_hi}
                  imgHeight={150}
                  imgWidth={150}
                  onPress={sayHi}
                />
                <Text>Hi</Text>
              </View>
            );
          }
          return null;
        }}
        // renderMessage = {()=>renderMessage(props)}
      />

      {/* Modal */}
      <ChatActionsComponent ref={refChatActionsComponent} />
      {/* </TouchableWithoutFeedbackComponent> */}
      {renderEmojiPopup()}
      <MenuPopup ref={menuRef}/>
    </ContainerComponent>
  );
}

//Styles
const styles = StyleSheet.create({
  container: {},
  footer: {
    // height: 8,
    backgroundColor: 'red',
    width: '100%',
    // position:'absolute',
    // bottom:20
  },
});

export default ChatDetailContainer;
