/* 
    Created by thaolt
*/

import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from 'res/colors';
import svgs from 'res/svgs';
import { HeaderChatDtlProps } from './header-chat-dtl.props';
import { DimensionHelpers } from '../../../../helpers/dimension-helpers';
import { HeaderChatDtlAdapter } from './header-chat-dtl.adapter';
import { StatusUserTypes } from 'core/common/types/user';
import { translate } from '../../../../res/languages';
import { HyperUtils } from '../../../../core/common/hyper-utils';
import { APP_CONFIGS } from 'core/common/app-config';
export class HeaderChatDtlComponent extends PureComponent<HeaderChatDtlProps> {
  private HeaderChatDtlAdapter: HeaderChatDtlAdapter;
  constructor(props: HeaderChatDtlProps) {
    super(props);
    this.HeaderChatDtlAdapter = new HeaderChatDtlAdapter(this);
  }

  // render title chat

  render() {
    const { style, goBack, title = '', iconRight, onPressRight, chatInfo, videoCall } = this.props;
    const isOnline = parseInt(chatInfo?.data?.status) === StatusUserTypes.ONLINE;
    const statusText = isOnline ? translate('chatDetail.online') : translate('chatDetail.offline');
    console.log('test_statusText_2', chatInfo, '__', isOnline, '__', statusText);
    return (
      <View style={styles.wrapShadow}>
        <View style={[styles.container, style && { ...style }]}>
          <HyperButtonComponent onPress={goBack} img={svgs.ic_back_black} />
          {/* UserInfo */}
          <View style={styles.containerUser}>
            <View style={styles.wrapInfo}>
              {/* Avatar */}
              <TouchableOpacity onPress={this.HeaderChatDtlAdapter.goToProfile}>
                {/* <TouchableOpacity> */}
                <View style={styles.wrapAvatar}>
                  {chatInfo?.data.avatar != '' ? (
                    <Image
                      source={{ uri: APP_CONFIGS.SERVER_FILE + chatInfo?.data.avatar }}
                      style={styles.avatar}
                    />
                  ) : (
                    <View style={styles.avatar}>
                      <Text style={{ color: colors.primaryColor, fontSize: 20, fontWeight: '500' }}>
                        {/* {HyperUtils.capitalFirstCharacter(this.HeaderChatDtlAdapter.getTitleAvt())} */}
                        {HyperUtils.capitalFirstCharacter(
                          chatInfo?.data.title || chatInfo?.data.userName
                        )}
                      </Text>
                    </View>
                  )}
                  {isOnline && <View style={styles.status} />}
                </View>
              </TouchableOpacity>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.name} numberOfLines={1}>
                  {/* {this.HeaderChatDtlAdapter.getTitle()} */}
                  {chatInfo?.data.title || chatInfo?.data.userName}
                </Text>
                <Text style={styles.txtStatus}>{statusText}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <HyperButtonComponent
              imgWidth={40}
              imgHeight={40}
              img={svgs.ic_call}
              onPress={videoCall}
            />
            <HyperButtonComponent
              imgWidth={40}
              imgHeight={40}
              img={svgs.ic_more}
              containerStyles={{ marginLeft: 12 }}
              onPress={onPressRight}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapShadow: {
    overflow: 'hidden',
    paddingBottom: 5,
  },
  container: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    // alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  backStyle: {
    marginLeft: 16,
  },
  notiStyle: {
    marginRight: 13,
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
    fontWeight: '600',
    marginRight: 20,
    color: colors.black,
    fontSize: 18,
  },
  imgRight: {
    marginRight: 8,
  },
  containerUser: {
    flexDirection: 'row',
    // marginHorizontal: 16,
    // marginTop: 12,
    // justifyContent: 'space-between',
    width: DimensionHelpers.width - 32 - 24 - 40 - 12 - 40,
    paddingHorizontal: 12,
  },
  wrapInfo: {
    flexDirection: 'row',
    width: '67%',
  },
  wrapAvatar: {
    width: 40,
    height: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bg1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#33CC5E',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 18,
    color: '#1A2948',
    fontWeight: '500',
    width: DimensionHelpers.width * 0.4,
  },
  txtStatus: {
    fontSize: 12,
    color: '#667085',
    marginTop: 2,
  },
});
