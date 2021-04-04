/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListUserProps } from './list-user.props';
import { ListUserAdapter } from './list-user.adapter';
import { ListUserItemComponent } from './list-user-item/list-user-item.component';

export class ListUserComponent extends PureComponent<ListUserProps> {
  private ListUserAdapter: ListUserAdapter;
  constructor(props: ListUserProps) {
    super(props);
    this.ListUserAdapter = new ListUserAdapter(this);
    console.log('LIST USER DATA: ',this.props.dataListUser);
    
  }

  render() {
    const { dataListUser, goToChatDetail } = this.props;
    return (
      <View>
        {dataListUser && dataListUser.length > 0 && (
          <FlatList
            data={dataListUser}
            renderItem={({ item }) => (
              <ListUserItemComponent goToChatDetail={() => goToChatDetail(item)} item={item} />
            )}
            horizontal
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
