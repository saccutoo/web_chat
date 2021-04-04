/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { ItemUserGroupProps } from './item-user-group.props';
import { ItemUserGroupAdapter } from './item-user-group.adapter';
import colors from 'res/colors';
import { HyperUtils } from 'core/common/hyper-utils';
import { StatusUserTypes } from 'core/common/types/user';
import svgs from 'res/svgs';
import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import { DimensionHelpers } from 'helpers/dimension-helpers';
import { APP_CONFIGS } from 'core/common/app-config';

export class ItemUserGroupComponent extends PureComponent<ItemUserGroupProps> {
  private ItemUserGroupAdapter: ItemUserGroupAdapter;
  constructor(props: ItemUserGroupProps) {
    super(props);
    this.ItemUserGroupAdapter = new ItemUserGroupAdapter(this);
  }

  render() {
    const { item, goToChatDetail, removeUserGr } = this.props;
    console.log('LIST USER GROUP COMPONENTS : ', item);
    
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => goToChatDetail(item)}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.wrapAvatar}>
              {item.user.avatar != '' ? (
                <Image
                  style={styles.avatarStyle}
                  source={{
                    uri: APP_CONFIGS.SERVER_FILE + item.user.avatar,
                  }}
                />
              ) : (
                <View style={styles.avatarStyle}>
                  <Text
                    style={{
                      color: colors.primaryColor,
                      fontSize: 24,
                      fontWeight: '500',
                    }}
                  >
                    {HyperUtils.capitalFirstCharacter(item?.user.userName)}
                  </Text>
                </View>
              )}

              {item.user.status === '1' && <View style={styles.status} />}
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {item.user.userName}
            </Text>
          </View>
          <View>
            <HyperButtonComponent
              img={svgs.ic_delete}
              imgHeight={24}
              imgWidth={24}
              onPress={() => removeUserGr(item)}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    // padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  avatarStyle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.bg1,
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
    marginLeft: 12,
    fontSize: 18,
    color: '#1A2948',
    width: DimensionHelpers.width - 32 - 48 - 12 - 50,
  },
});
