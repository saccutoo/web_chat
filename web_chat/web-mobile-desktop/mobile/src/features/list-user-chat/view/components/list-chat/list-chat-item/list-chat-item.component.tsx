/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import { ListChatItemProps } from './list-chat-item.props';
import { ListChatItemAdapter } from './list-chat-item.adapter';
import moment from 'moment';
import 'moment/locale/vi';
import { MessageTypes } from '../../../../../../core/common/types/message';
import { StatusUserTypes } from 'core/common/types/user';
import colors from '../../../../../../res/colors';
import { HyperUtils } from 'core/common/hyper-utils';
import { APP_CONFIGS } from 'core/common/app-config';
// import 'intl'
const screenWidth = Dimensions.get('window').width;
export class ListChatItemComponent extends PureComponent<ListChatItemProps> {
  private ListChatItemAdapter: ListChatItemAdapter;
  constructor(props: ListChatItemProps) {
    super(props);
    this.ListChatItemAdapter = new ListChatItemAdapter(this);
    // console.log('TIME ZONE: ', Intl.DateTimeFormat().resolvedOptions().timeZone);

    moment.locale('vi');
  }

  render() {
    const { item, goToChatDetail } = this.props;
    // const new_msg = item?.chats[0]?.message;
    console.log('test_item_room_chat: ', item)
    const user_name = item?.title;
    return (
      <TouchableOpacity onPress={() => goToChatDetail(item)} activeOpacity={0.5}>
        <View style={styles.container}>
          {/* Avartar */}
          <View style={styles.wrapAvatar}>
            {HyperUtils.isNotEmpty(item.avatar) ? (
              <Image
                style={styles.avatarStyle}
                source={{
                  uri: APP_CONFIGS.SERVER_FILE + item.avatar,
                }}
              />
            ) : (
              <View style={styles.avatarStyle}>
                <Text style={styles.title}>
                  {user_name && HyperUtils.capitalFirstCharacter(user_name)}
                </Text>
              </View>
            )}
            {/* TODO */}
            {parseInt(item.status) === StatusUserTypes.ONLINE ? (
              <View style={styles.status} />
            ) : null}
          </View>

          {/* Username */}
          <View style={styles.messStyle}>
            <View style={styles.wrapName}>
              {item?.type === MessageTypes.CHAT_GROUP ? (
                <View style={styles.wrapTitleGr}>
                  <Text style={styles.groupTextStyle} numberOfLines={1}>
                    {user_name}
                  </Text>
                  <View style={styles.wrapGr}>
                    <Text style={styles.grTxt}>NHÓM</Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.userTextStyle} numberOfLines={1}>
                  {user_name}
                </Text>
              )}
              {item?.chats?.length === 0 ? (
                <Text />
              ) : (
                <Text
                  // style={
                  //   checkUserSeenMessage(mess.data.item.messengers[0].seenId) === true
                  //     ? styles.textTimeStyle
                  //     : styles.textTimeStyleUnRead
                  // }
                  style={{ fontSize: 14, color: '#808999' }}
                >
                  {/* TODO */}
                  {/* {moment(item.chats[0].updatedAt, 'YYYY-MM-DD HH:mm:ss').format('MMM DD')} */}
                </Text>
              )}
              {/* TODO: time */}
              <Text>
                {/* {moment(item.chats[0]?.createdAt || null)
                  .utcOffset(Intl.DateTimeFormat().resolvedOptions().timeZone)
                  .fromNow()} */}
                {/* {moment(item.lastUpdateAt, 'YYYY-MM-DD HH:mm:ss').format('MMM DD')} */}
              </Text>
            </View>

            {/* Time, new message */}
            <View style={styles.wrapTime}>
              {item && item?.chats && item?.chats?.length === 0 ? (
                <Text />
              ) : (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  // style={
                  //   checkUserSeenMessage(mess.data.item.messengers[0].seenId) === true
                  //     ? styles.contentTextStyle
                  //     : styles.contentTextStyleUnRead
                  // }
                  style={{ fontSize: 14, color: '#667085' }}
                >
                  {/* TODO */}
                  {/* {new_msg} */}
                  {item.chats[0].message}
                </Text>
              )}

              {/* Unread message */}
              {/* <View style={styles.wrapNumberMess}>
                <Text style={{ fontSize: 12, color: '#fff' }}>1</Text>
              </View> */}
            </View>
          </View>
        </View>
        {/* <View style={styles.timeStyle}>
          {item.messengers.length === 0 ? (
            <Text />
          ) : (
            <Text
              // style={
              //   checkUserSeenMessage(mess.data.item.messengers[0].seenId) === true
              //     ? styles.textTimeStyle
              //     : styles.textTimeStyleUnRead
              // }
              style={{}}
            >
              {moment(item.messengers[0].updatedAt, 'YYYY-MM-DD HH:mm:ss').format('MMM DD')}
            </Text>
          )}
        </View> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapAvatar: {
    width: 56,
    height: 56,
  },
  avatarStyle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.bg1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.primaryColor,
    fontSize: 24,
    fontWeight: '500',
  },
  status: {
    width: 16,
    height: 16,
    backgroundColor: '#33CC7F',
    position: 'absolute',
    borderRadius: 8,
    bottom: 0,
    right: 0,
    borderColor: '#fff',
    borderWidth: 3,
  },
  wrapName: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapTime: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  wrapNumberMess: {
    backgroundColor: '#FF7F08',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messStyle: {
    marginLeft: 12,
    width: screenWidth - 32 - 68,
  },
  timeStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 80,
  },
  userTextStyle: {
    fontSize: 18,
    color: '#1A2948',
    width: '75%',
  },
  groupTextStyle: {
    fontSize: 18,
    color: '#1A2948',
    // fontWeight: 'bold',
  },
  contentTextStyle: {
    fontSize: 14,
    color: '#909090',
  },
  contentTextStyleUnRead: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  textTimeStyle: {
    width: '100%',
    textAlign: 'right',
    color: '#909090',
  },
  textTimeStyleUnRead: {
    width: '100%',
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'black',
  },
  wrapTitleGr: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapGr: {
    backgroundColor: colors.primaryColor,
    borderRadius: 4.5,
    marginLeft: 12,
  },
  grTxt: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '500',
    padding: 4,
  },
});
