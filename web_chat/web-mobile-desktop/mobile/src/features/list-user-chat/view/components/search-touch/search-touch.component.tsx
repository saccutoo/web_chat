/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SearchTouchProps } from './search-touch.props';
import { SearchTouchAdapter } from './search-touch.adapter';
import { SvgXml } from 'react-native-svg';
import svgs from 'res/svgs';
import { translate } from 'res/languages';

export class SearchTouchComponent extends PureComponent<SearchTouchProps> {
  private SearchTouchAdapter: SearchTouchAdapter;
  constructor(props: SearchTouchProps) {
    super(props);
    this.SearchTouchAdapter = new SearchTouchAdapter(this);
  }

  render() {
    const { goToSearch } = this.props;
    return (
      <TouchableOpacity onPress={goToSearch}>
        <View style={styles.container}>
          <View style={styles.wrapIconSearch}>
            <SvgXml width="24" height="24" xml={svgs.ic_search} />
          </View>
          <View style={styles.wraptxtSearch}>
            <Text style={styles.txtSearch}>{translate('search.search')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 14,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCFD6',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 4,
  },
  wrapIconSearch: {
    marginLeft: 10,
  },
  wraptxtSearch: {
    marginLeft: 10,
  },
  txtSearch: {
    fontSize: 14,
    color: '#B3B8C2',
  },
});
