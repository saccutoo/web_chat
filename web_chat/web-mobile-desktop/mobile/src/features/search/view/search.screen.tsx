/* 
    Created by longdq
*/

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchAdapter } from '../model-search/search.adapter';
import { SearchProps } from '../model-search/search.props';
import { SearchStates } from '../model-search/search.states';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchListUserComponent } from './components/search-list-user/search-list-user.component';
import { isIphoneX } from 'helpers/layout-helpers';

export default class SearchContainer extends React.PureComponent<SearchProps, SearchStates> {
  SearchAdapter: SearchAdapter;
  //Local States

  page: number = 1;
  ITEM_PAGE = 15;

  constructor(props: SearchProps) {
    super(props);
    this.SearchAdapter = new SearchAdapter(this);
    this.state = {
      dataSearchUser: [],
      loading: false,
      txt: '',
    };
  }

  componentDidMount = () => {
    this.SearchAdapter.searchUser();
  };

  render() {
    const { dataSearchUser } = this.state;
    return (
      // <ContainerComponent
      //   style={styles.container}
      //   headerType={HeaderTypes.BACK_TITLE}
      //   title={translate('search.title')}
      // >
      <View style={{ flex: 1, marginTop: isIphoneX() ? 44 : 0 }}>
        <SearchInputComponent
          search={this.SearchAdapter.setTxtSearch}
          goBack={this.SearchAdapter.goBack}
        />
        <SearchListUserComponent
          dataSearchUser={dataSearchUser}
          goToChatDetail={this.SearchAdapter.goToChatDetail}
          loading={this.state.loading}
          onEndReached={this.SearchAdapter.onEndReached}
          onRefresh={this.SearchAdapter.onRefresh}
          page={this.page}
          ITEM_PAGE={this.ITEM_PAGE}
        />
        {/* </ContainerComponent> */}
      </View>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {},
});
