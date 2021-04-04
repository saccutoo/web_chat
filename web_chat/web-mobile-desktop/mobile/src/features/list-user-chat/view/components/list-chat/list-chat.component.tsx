/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ListChatProps } from './list-chat.props';
import { ListChatAdapter } from './list-chat.adapter';
import { ListChatItemComponent } from './list-chat-item/list-chat-item.component';
import { SvgXml } from 'react-native-svg';
import svgs from 'res/svgs';
import BottomLoadingIndicator from 'libraries/loading/bottom-loading-indicator';

export class ListChatComponent extends PureComponent<ListChatProps> {
  private ListChatAdapter: ListChatAdapter;
  constructor(props: ListChatProps) {
    super(props);
    this.ListChatAdapter = new ListChatAdapter(this);
    this.state = {
      // loading: false,
    };
  }

  renderListEmpty = () => {
    return (
      <View style={{ flex: 1, marginTop: 54, alignItems: 'center' }}>
        <SvgXml height="301" width="250" xml={svgs.ic_empty_list_chat} />
      </View>
    );
  };

  renderFooter = () => {
    const { dataListChat, loading, isFinish } = this.props;
    if (isFinish) return null;
    return <BottomLoadingIndicator />;
  };

  render() {
    const { dataListChat, goToChatDetail, loading, onEndReached, onRefresh } = this.props;
    console.log('test_list_chat_component: ', dataListChat);

    return (
      <View style={styles.container}>
        {dataListChat && dataListChat.length > 0 && (
          <FlatList
            data={dataListChat}
            renderItem={({ item }) => (
              <ListChatItemComponent item={item} goToChatDetail={goToChatDetail} />
            )}
            keyExtractor={(item) => item.id}
            // ListFooterComponent={renderListFooter}
            // onEndReachedThreshold={0.4}
            // onEndReached={handleLoadMore}
            ListHeaderComponent={() => <View style={{ height: 12, width: '100%' }} />}
            ItemSeparatorComponent={() => <View style={{ height: 20, width: '100%' }} />}
            // ListFooterComponent={() => <View style={{ height: 32, width: '100%' }}></View>}
            ListEmptyComponent={this.renderListEmpty}
            refreshing={loading}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
