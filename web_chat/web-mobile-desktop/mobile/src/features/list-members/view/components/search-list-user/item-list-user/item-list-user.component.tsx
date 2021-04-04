/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';
import { ItemListUserProps } from './item-list-user.props';
import { ItemListUserAdapter } from './item-list-user.adapter';
import Colors from '../../../../../../res/colors';
import { StatusUserTypes } from 'core/common/types/user';
import { HyperUtils } from 'core/common/hyper-utils';
import { APP_CONFIGS } from 'core/common/app-config';
export class ItemListUserComponent extends PureComponent<ItemListUserProps> {
  private ItemListUserAdapter: ItemListUserAdapter;
  constructor(props: ItemListUserProps) {
    super(props);
    this.ItemListUserAdapter = new ItemListUserAdapter(this);
  }

  render() {
    const { item, goToChatDetail } = this.props;
    console.log('test_render_member:', item);
    console.log('test avatar :', APP_CONFIGS.SERVER_FILE + item.avatar);

    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => goToChatDetail(item)}>
        <View style={styles.container}>
          <View style={styles.wrapAvatar}>
            {HyperUtils.isNotEmpty(item.avatar) ? (
              <Image
                style={styles.avatarStyle}
                source={{
                  // uri: 'https://placeimg.com/128/128/any',
                  uri: APP_CONFIGS.SERVER_FILE + item.avatar,
                }}
              />
            ) : (
              <View style={styles.avatarStyle}>
                <Text style={{ color: Colors.primaryColor, fontSize: 24, fontWeight: '500' }}>
                  {HyperUtils.capitalFirstCharacter(item?.userName)}
                </Text>
              </View>
            )}

            {/* TODO */}
            {parseInt(item.status) === StatusUserTypes.ONLINE ? (
              <View style={styles.status} />
            ) : null}
          </View>
          <View style={styles.userProperty}>
            <Text style={styles.name} numberOfLines={1}>
              {item && item.userName}
            </Text>
            <Text style={styles.group} numberOfLines={1}>
              iSoft team
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12
  },
  avatarStyle: {
    width: 48,
    height: 48,
    borderRadius: 28,
    backgroundColor: Colors.bg1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  wrapAvatar: {
    width: 48,
    height: 48,
  },
  status: {
    width: 14,
    height: 14,
    backgroundColor: '#33CC7F',
    position: 'absolute',
    borderRadius: 7,
    bottom: 0,
    right: 0,
    borderColor: '#fff',
    borderWidth: 2,
  },
  name: {
    marginHorizontal: 12,
    fontSize: 18,
    color: '#1A2948',
    marginBottom: 4,
    fontWeight: '500',
    width: 300,
  },
  group: {
    marginHorizontal: 12,
    fontSize: 14,
    lineHeight: 21,
    width: 300,
    // flex: 1,
  },
  userProperty: {
    display: 'flex',
    flexDirection: 'column',
  },
});
