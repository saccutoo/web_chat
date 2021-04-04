/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { SearchListUserProps } from './search-list-user.props';
import { SearchListUserAdapter } from './search-list-user.adapter';
import { ItemListUserComponent } from './item-list-user/item-list-user.component';
import { SvgXml } from 'react-native-svg';
import svgs from 'res/svgs';
import colors from 'res/colors';
import { translate } from 'res/languages';
import BottomLoadingIndicator from 'libraries/loading/bottom-loading-indicator';
import { InfinityScrollComponent } from 'libraries/infinity-scroll/infinity-scroll.component';
import { User2 } from 'core/common/types/user';
import NewMessageServices from 'core/model-new-message/new-message.services';

export class SearchListUserComponent extends PureComponent<SearchListUserProps> {
  private SearchListUserAdapter: SearchListUserAdapter;
  constructor(props: SearchListUserProps) {
    super(props);
    this.SearchListUserAdapter = new SearchListUserAdapter(this);
  }

  renderListEmpty = () => {
    return (
      <View style={styles.wrapEmpty}>
        <SvgXml height={200} width={200} xml={svgs.ic_search_empty} />
        <Text style={styles.txtEmpty}>{translate('search.empty')}</Text>
      </View>
    );
  };

  renderFooter = () => {
    const { dataSearchUser, loading, page, ITEM_PAGE } = this.props;
    if (dataSearchUser.length < page * ITEM_PAGE) return null;
    return <BottomLoadingIndicator />;
  };

  renderItem = (item: User2) => {
    return <ItemListUserComponent item={item} goToChatDetail={this.props.goToChatDetail} />;
  };

  param = { value: this.props.value };

  render() {
    const { dataSearchUser, goToChatDetail, onEndReached, onRefresh, loading } = this.props;
    return (
      <View style={styles.container}>
        <InfinityScrollComponent
          renderItem={this.renderItem}
          param={this.param}
          serviceGetData={NewMessageServices.getInstance().searchUser}
        />
        {/* <FlatList
          data={dataSearchUser}
          renderItem={({ item }) => (
            <ItemListUserComponent item={item} goToChatDetail={goToChatDetail} />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 24, width: '100%' }} />}
          ListHeaderComponent={() => <View style={{ width: '100%', height: 12 }} />}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderListEmpty}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          refreshing={loading}
          onEndReachedThreshold={0.5}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapEmpty: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80,
  },
  txtEmpty: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.txtColor,
    marginTop: 12,
  },
});
