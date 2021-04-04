/* 
    Created by longdq
*/

import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colors from 'res/colors';
import svgs from 'res/svgs';
import { StatusUserTypes } from 'core/common/types/user';
import { HyperButtonComponent } from '../../../../../libraries/hyper-button/hyper-button.component';
import { UserInfoAdapter } from './user-info.adapter';
import { UserInfoProps } from './user-info.props';
import { translate } from '../../../../../res/languages';
import { HyperUtils } from 'core/common/hyper-utils';
import { APP_CONFIGS } from 'core/common/app-config';

const screenWidth = Dimensions.get('window').width;
export class UserInfoComponent extends PureComponent<UserInfoProps> {
  private UserInfoAdapter: UserInfoAdapter;
  constructor(props: UserInfoProps) {
    super(props);
    this.UserInfoAdapter = new UserInfoAdapter(this);
  }

  render() {
    const { userInfo, goToProfile, goToNewMess, goToNotifi } = this.props;
    // const isOnline = userInfo?.statusUser === StatusUserTypes.ONLINE
    const isOnline = StatusUserTypes.ONLINE;
    const statusText = isOnline ? translate('chatDetail.online') : translate('chatDetail.offline');
    console.log('LIST USER: ', userInfo);
    return (
      <View style={styles.container}>
        <View style={styles.wrapInfo}>
          <TouchableOpacity onPress={goToProfile}>
            <View style={styles.wrapAvatar}>
              {userInfo?.avatar != '' ? (
                <Image
                  source={{
                    uri: APP_CONFIGS.SERVER_FILE + userInfo?.avatar,
                  }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatar}>
                  <Text style={{ color: colors.primaryColor, fontSize: 20, fontWeight: '500' }}>
                    {HyperUtils.capitalFirstCharacter(userInfo?.userName)}
                  </Text>
                </View>
              )}
              {isOnline && <View style={styles.status} />}
            </View>
          </TouchableOpacity>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.name} numberOfLines={1}>
              {userInfo?.userName}
            </Text>
            <Text style={styles.txtStatus}>{statusText}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <HyperButtonComponent
            imgWidth={40}
            imgHeight={40}
            img={svgs.ic_bell}
            onPress={goToNotifi}
          />
          <HyperButtonComponent
            imgWidth={40}
            imgHeight={40}
            img={svgs.ic_pen}
            containerStyles={{ marginLeft: 12 }}
            onPress={goToNewMess}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    justifyContent: 'space-between',
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
    width: 0.67 * screenWidth - 84,
  },
  txtStatus: {
    fontSize: 12,
    color: '#667085',
    marginTop: 2,
  },
});
