/* 
    Created by thaolt
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActionMenuItemProps } from './action-menu-item.props';
import { ActionMenuItemAdapter } from './action-menu-item.adapter';
import colors from 'res/colors';
import { SvgXml } from 'react-native-svg';
import svgs from 'res/svgs';

export class ActionMenuItemComponent extends PureComponent<ActionMenuItemProps> {
  private ActionMenuItemAdapter: ActionMenuItemAdapter;
  constructor(props: ActionMenuItemProps) {
    super(props);
    this.ActionMenuItemAdapter = new ActionMenuItemAdapter(this);
  }

  render() {
    const { item } = this.props;
    return (
      <View style={{ alignItems: 'center', width: this.props.itemWidth }}>
        <TouchableOpacity
          style={styles.btn_container}
          onPress={() => this.ActionMenuItemAdapter.onItem(item)}
        >
          {/* <Image style={styles.icon} source={iconImage} /> */}
          <SvgXml width={32} height={32} xml={item.icon} />
          <Text numberOfLines={1} style={styles.text}>
            {item.text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  btn_container: {
    alignItems: 'center',
  },

  // icon: {
  //   height: 32,
  //   width: 32,
  // },

  text: {
    // fontFamily: 'Roboto',
    fontSize: 12,
    color: colors.text,
    marginTop: 6,
    textAlign: 'center',
  },
});
