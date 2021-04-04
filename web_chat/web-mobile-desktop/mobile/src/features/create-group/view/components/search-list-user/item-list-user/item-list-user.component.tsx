/* 
    Created by longdq
*/

import React, { PureComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../../../../res/colors';
import { SvgXml } from 'react-native-svg';
import Icon from '../../../../../../res/svgs';
import { StatusUserTypes, User, User2 } from 'core/common/types/user';

export interface itemDataCheck {
  item: User2;
  check: boolean;
}
import { ItemListUserAdapter } from './item-list-user.adapter';
import { ItemListUserProps } from './item-list-user.props';
import { HyperUtils } from 'core/common/hyper-utils';
import { APP_CONFIGS } from 'core/common/app-config';
export class ItemListUserComponent extends PureComponent<ItemListUserProps, { check: boolean }> {
  private ItemListUserAdapter: ItemListUserAdapter;
  constructor(props: ItemListUserProps) {
    super(props);
    this.ItemListUserAdapter = new ItemListUserAdapter(this);
    this.state = {
      check: false,
    };
  }

  onPressItem = () => {
    this.setState(
      {
        check: !this.state.check,
      },
      () => {
        this.addToDataCheck({
          item: this.props.item,
          check: this.state.check,
        });
      }
    );
  };

  addToDataCheck = (item: itemDataCheck) => {
    this.props.addToDataCheck(item);
  };

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        // onPress={() => pushToDetail(mess.data.item)}
        activeOpacity={0.5}
        onPress={this.onPressItem}
      >
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                  <Text style={{ color: Colors.primaryColor, fontSize: 24, fontWeight: '500' }}>
                    {HyperUtils.capitalFirstCharacter(item?.userName)}
                  </Text>
                </View>
              )}
              {parseInt(item.status) === StatusUserTypes.ONLINE ? (
                <View style={styles.status} />
              ) : null}
            </View>
            {/* <View style={styles.userProperty}> */}
            <View style={styles.userProperty}>
              <Text style={styles.name} numberOfLines={1}>
                {item && item.userName}
              </Text>
              <Text style={styles.group} numberOfLines={1}>
                iSoft team
              </Text>
            </View>
            {/* <Text style={styles.group} numberOfLines={1}>
                iSoft team
              </Text> */}
            {/* </View> */}
          </View>
          <View>
            {this.state.check ? (
              <SvgXml width="20" height="20" xml={Icon.ic_check} />
            ) : (
              <SvgXml width="20" height="20" xml={Icon.ic_un_check} />
            )}
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
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
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
    fontWeight: 'bold',
    // width: 0,
  },
  group: {
    marginHorizontal: 12,
    fontSize: 14,
    lineHeight: 21,
    width: 200,
    // flex: 1,
  },
  userProperty: {
    display: 'flex',
    flexDirection: 'column',
  },

  // checkBox: {
  //   padding: 10,
  // },
});
