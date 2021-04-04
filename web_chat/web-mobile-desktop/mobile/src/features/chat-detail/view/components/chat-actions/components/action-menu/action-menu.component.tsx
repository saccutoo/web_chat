/* 
    Created by thaolt
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { FlatList, StyleSheet, View , Text} from 'react-native';
import { ActionMenuProps, MenuItem } from './action-menu.props';
import { ActionMenuAdapter } from './action-menu.adapter';
import { DimensionHelpers } from '../../../../../../../helpers/dimension-helpers';
import { ActionMenuItemComponent } from '../action-menu-item/action-menu-item.component';

export class ActionMenuComponent extends PureComponent<ActionMenuProps> {
  private ActionMenuAdapter: ActionMenuAdapter;
  private paddingMenu = 10;
  private itemWidth = 0;

  constructor(props: ActionMenuProps) {
    super(props);
    this.ActionMenuAdapter = new ActionMenuAdapter(this);
  }

  checkView = () => {
    if (this.props.listItem.length <= 5) {
      const window_width = DimensionHelpers.width;
      const itemWidth = (window_width - this.paddingMenu * 2) / this.props.listItem.length;
      this.itemWidth = itemWidth;
    } else {
      this.itemWidth = 90;
    }
  };

  renderItem = (item: MenuItem) => {
    this.checkView();
    return (
      <ActionMenuItemComponent item={item} itemWidth={this.itemWidth} />
    );
  };

  render() {
    return (
      <View style={[styles.container, { paddingHorizontal: this.paddingMenu }]}>
        <FlatList
          data={this.props.listItem}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => this.renderItem(item)}
          horizontal={true}
          scrollEnabled={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 9,
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    // backgroundColor: '#fff',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    paddingBottom: 12,
    // marginTop: 10,
  },
});
