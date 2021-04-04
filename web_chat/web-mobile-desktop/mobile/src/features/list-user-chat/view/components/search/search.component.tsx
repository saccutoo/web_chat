/* 
    Created by longdq
*/

import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchAdapter } from './search.adapter';
import { SearchProps } from './search.props';



export class SearchComponent extends PureComponent<SearchProps> {
  private SearchAdapter: SearchAdapter;
  constructor(props: SearchProps) {
    super(props);
    this.SearchAdapter = new SearchAdapter(this);
  }

  render() {
    const { goToSearch } = this.props;
    return (
      <>
        <View style={styles.searchBarStyle}>
          <HyperButtonComponent
            activeOpacity={0.8}
            onPress={goToSearch}
            containerStyles={styles.searchBarInputStyle}
            text="Tìm kiếm..."
            textStyle={styles.searchBarTextStyle}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  searchBarStyle: {
    width: '100%',
    height: 60,
    padding: 8,
  },
  searchBarInputStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: '#dcdcdc',
    alignItems: 'center',
    paddingLeft: 16,
  },
  searchBarTextStyle: {
    marginLeft: 8,
    fontSize: 16,
    color: 'gray',
  },
});
