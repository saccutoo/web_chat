/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, ViewBase, Text, TouchableOpacity, Image } from 'react-native';
import { ItemUserCheckProps } from './item-user-check.props';
import { ItemUserCheckAdapter } from './item-user-check.adapter';
import Colors from '../../../../../../res/colors';
import { SvgXml } from 'react-native-svg';
import Icon from '../../../../../../res/svgs';
import { APP_CONFIGS } from 'core/common/app-config';

export class ItemUserCheckComponent extends PureComponent<ItemUserCheckProps> {
  private ItemUserCheckAdapter: ItemUserCheckAdapter;
  constructor(props: ItemUserCheckProps) {
    super(props);
    this.ItemUserCheckAdapter = new ItemUserCheckAdapter(this);
  }

  render() {
    const { itemUserCheck, removeUserCheck } = this.props;
    return (
      <View style={styles.container}>
        {itemUserCheck.item.avatar != '' ? (
          <Image
            source={{ uri: APP_CONFIGS.SERVER_FILE + itemUserCheck.item.avatar }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.name}>
              {itemUserCheck &&
                itemUserCheck.item &&
                itemUserCheck.item.userName &&
                itemUserCheck.item.userName[0]}
            </Text>
          </View>
        )}

        <View style={styles.wrapIcon}>
          <TouchableOpacity onPress={() => removeUserCheck(itemUserCheck)}>
            <SvgXml width="16" height="16" xml={Icon.ic_close} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.bg1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.primaryColor,
  },
  wrapIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
