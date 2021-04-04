/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MessageContainerProps } from './message-container.props';
import { MessageContainerAdapter } from './message-container.adapter';
import { Bubble } from 'react-native-gifted-chat';
import colors from '../../../../../res/colors';

export class MessageContainerComponent extends PureComponent<MessageContainerProps> {
  private MessageContainerAdapter: MessageContainerAdapter;
  constructor(props: MessageContainerProps) {
    super(props);
    this.MessageContainerAdapter = new MessageContainerAdapter(this);
  }

  renderNormalBubble = () => {
    return (
      <Bubble
        {...this.props.propBubble}
        // renderTime={() => <Text>Time</Text>}
        // renderTicks={() => <Text>Ticks</Text>}
        // renderMessageText={()=><View style={{backgroundColor:'grey', width:20, height:20}}/>}
        // renderCustomView ={()=><Text>MSg</Text>}
        containerStyle={{
          left: {},
          right: {},
        }}
        wrapperStyle={{
          left: { backgroundColor: colors.msgNormal },
          right: { backgroundColor: colors.primaryColor },
        }}
        bottomContainerStyle={{
          left: {},
          right: {},
        }}
        tickStyle={{}}
        // usernameStyle={{ color: 'gray', fontWeight: '200', fontSize: 12 }}
        // containerToNextStyle={{
        //   left: {borderColor: 'navy', borderWidth: 1},
        //   right: {},
        // }}
        // containerToPreviousStyle={{
        //   left: {borderColor: 'red', borderWidth: 1},
        //   right: {},
        // }}
      />
    );
  };

  renderAttachment = () => {
    return (
      <Bubble
        {...this.props.propBubble}
        renderTime={() => null}
        // renderTicks={() => <Text>Ticks</Text>}
        containerStyle={{
          left: {},
          right: {},
        }}
        wrapperStyle={{
          left: {},
          right: {
            backgroundColor: '#fff',
          },
        }}
        bottomContainerStyle={{
          left: {},
          right: {},
        }}
        tickStyle={{}}
        // usernameStyle={{ color: 'gray', fontWeight: '200', fontSize: 12 }}
        // containerToNextStyle={{
        //   left: {borderColor: 'navy', borderWidth: 1},
        //   right: {},
        // }}
        // containerToPreviousStyle={{
        //   left: {borderColor: 'red', borderWidth: 1},
        //   right: {},
        // }}
      />
    );
  };

  checkRender = () => {
    const { currentMessage, previousMessage } = this.props.propBubble;
    console.log('test_CHECK_RENDER :', currentMessage);

    if (currentMessage?.attachment !== undefined && currentMessage?.attachment?.length != 0) {
      console.log('test_check_render_current_msg_0:', currentMessage?.attachment?.length);
      return this.renderAttachment();
    } else {
      console.log('test_check_render_current_msg_1:', currentMessage?.attachment?.length);
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

      // // console.log('test_sameUserInPrevMessage: ', sameUserInPrevMessage);

      // console.log(
      //   'test_sameUserInPrevMessage :',
      //   currentMessage?.text,
      //   '__',
      //   currentMessage?.user?._id,
      //   ', __prev:',
      //   previousMessage?.user?._id,
      //   '__',
      //   sameUserInPrevMessage
      //   // ', prev: ',
      //   // this.props.previousMessage.user._id,
      //   // ', current: ',
      //   // this.props.currentMessage.user._id
      // );

      // if (sameUserInPrevMessage) {
      //   // if (sameDate) {
      //   //   return <View style={{ backgroundColor: 'green', width: 100, height: 100 }} />;
      //   // }
      //   return <View style={{ backgroundColor: 'grey', width: 100, height: 100 }} />;
      // }
      return this.renderNormalBubble();
    }
  };

  render() {
    const { propBubble } = this.props;
    console.log('test_propBubble: ', propBubble);
    return this.checkRender();
  }
}

const styles = StyleSheet.create({
  container: {},
});
