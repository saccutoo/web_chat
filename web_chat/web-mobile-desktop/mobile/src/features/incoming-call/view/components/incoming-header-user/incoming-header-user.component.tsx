/* 
    Created by thaolt
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { IncomingHeaderUserProps } from './incoming-header-user.props';
import { IncomingHeaderUserAdapter } from './incoming-header-user.adapter';
import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import svgs from 'res/svgs';
import { translate } from 'res/languages';
import { KindOfMsg } from 'core/common/types/message';
import { DimensionHelpers } from '../../../../../helpers/dimension-helpers';
import { HyperUtils } from 'core/common/hyper-utils';
import colors from 'res/colors';

export class IncomingHeaderUserComponent extends PureComponent<IncomingHeaderUserProps> {
  private IncomingHeaderUserAdapter: IncomingHeaderUserAdapter;
  constructor(props: IncomingHeaderUserProps) {
    super(props);
    this.IncomingHeaderUserAdapter = new IncomingHeaderUserAdapter(this);
  }

  render() {
    const { onBack, userInfo, typeCall } = this.props;
    const callingText =
      typeCall === KindOfMsg.TYPE_VIDEO_CALL_OUTGOING
        ? translate('videoCall.outGoing')
        : translate('videoCall.inComing');
    const avatar = userInfo?.avatar_url;

    return (
      <>
        <View style={styles.header}>
          <HyperButtonComponent imgWidth={24} imgHeight={24} img={svgs.ic_back} onPress={onBack} />
        </View>
        <View style={styles.containerHeader}>
          {avatar ? (
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.avatar}
            />
          ) : (
            <View style={[styles.avatar, { justifyContent: 'center' }]}>
              <Text style={styles.textName}>
                {HyperUtils.capitalFirstCharacter(userInfo?.username)}
              </Text>
            </View>
          )}
          <Text style={styles.name} numberOfLines={1}>
            {userInfo?.username}
          </Text>
          <Text style={styles.txtComing}>{callingText}</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 56,
    width: '100%',
    justifyContent: 'center',
    marginLeft: 16,
  },
  containerHeader: {
    marginTop: 50,
    alignItems: 'center',
  },
  avatar: {
    width: 126,
    height: 126,
    borderRadius: 63,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 19,
    color: '#fff',
    width: DimensionHelpers.width * 0.8,
  },
  txtComing: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  textName: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 28,
  },
});
