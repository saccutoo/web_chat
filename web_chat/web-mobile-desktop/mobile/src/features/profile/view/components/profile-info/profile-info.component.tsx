/* 
    Created by longdq
*/

import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import colors from 'res/colors';
import svgs from 'res/svgs';
import { translate } from '../../../../../res/languages';
import { ProfileInfoAdapter } from './profile-info.adapter';
import { ProfileInfoProps } from './profile-info.props';
import CodePushVerion from 'libraries/code-push-version/code-push-version';
import { HyperUtils } from 'core/common/hyper-utils';
import { User2 } from 'core/common/types/user';
import { NotifiOnOffComponent } from 'libraries/notifi-on-off/notifi-on-off.component';
import { MoveLanguageComponent } from 'libraries/move-language/move-language.component';
import { APP_CONFIGS } from 'core/common/app-config';

const screenWidth = Dimensions.get('window').width;

export class ProfileInfoComponent extends PureComponent<ProfileInfoProps> {
  private ProfileInfoAdapter: ProfileInfoAdapter;
  constructor(props: ProfileInfoProps) {
    super(props);
    this.ProfileInfoAdapter = new ProfileInfoAdapter(this);
    console.log('PROFILE COMPONENTS: ', props);
  }

  render() {
    const { userInfo, goBack } = this.props;
    const username = userInfo && userInfo.userName;
    return (
      <View>
        <View style={styles.wrapInfo}>
          <View style={styles.bgInfo}>
            <View style={styles.wrapHeader}>
              <HyperButtonComponent onPress={goBack} img={svgs.ic_back} />
              {/* <HyperButtonComponent onPress={goBack} img={svgs.ic_pen_24} /> */}
            </View>
          </View>
          <View style={styles.wrapAvatar}>
            {userInfo.avatar != '' ? (
              <Image
                source={{
                  uri: APP_CONFIGS.SERVER_FILE + userInfo.avatar,
                }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                }}
              />
            ) : (
              <Text style={styles.txtName}>{HyperUtils.capitalFirstCharacter(username)}</Text>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.userName}>{username}</Text>
          <Text style={styles.txtEmail}>{userInfo && userInfo.email}</Text>
        </View>

        {/* Code push */}
        <CodePushVerion />
        <NotifiOnOffComponent />
        <MoveLanguageComponent />

        {/* Logout */}
        <HyperButtonComponent
          onPress={this.props.logout}
          containerStyles={{ marginTop: 12 }}
          textStyle={styles.txtLogout}
          text={translate('logout.txtLogout')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  wrapInfo: {
    height: 235,
    width: '100%',
  },
  bgInfo: {
    height: 175,
    width: '100%',
    backgroundColor: colors.primaryColor,
  },
  wrapHeader: {
    height: 56,
    width: '100%',
    // marginTop: 44,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapAvatar: {
    width: 120,
    height: 120,
    position: 'absolute',
    left: 0.5 * screenWidth - 60,
    bottom: 20,
    borderRadius: 60,
    backgroundColor: colors.bg1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  txtName: {
    fontSize: 32,
    fontWeight: '500',
    color: colors.primaryColor,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.txtColor,
    textAlign: 'center',
    marginTop: 12,
  },
  txtEmail: {
    fontSize: 14,
    color: '#4D5971',
    textAlign: 'center',
    marginTop: 8,
  },
  txtLogout: {
    textAlign: 'center',
    color: colors.errorRed,
    fontSize: 16,
    fontWeight: '500',
  },
});
