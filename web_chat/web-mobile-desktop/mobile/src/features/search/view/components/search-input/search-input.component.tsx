/*
    Created by longdq
*/

import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import _ from 'lodash';
import React, { PureComponent } from 'react';
import { StyleSheet, TextInput, View, Dimensions } from 'react-native';
import colors from 'res/colors';
import svgs from 'res/svgs';
import { SearchInputAdapter } from './search-input.adapter';
import { SearchInputProps } from './search-input.props';
import { translate } from 'res/languages';

const screenWidth = Dimensions.get('window').width;
export class SearchInputComponent extends PureComponent<SearchInputProps> {
  private SearchInputAdapter: SearchInputAdapter;
  private onChangeTextDelayed: (text: string) => void;
  constructor(props: SearchInputProps) {
    super(props);
    this.SearchInputAdapter = new SearchInputAdapter(this);
    this.onChangeTextDelayed = _.debounce(this.onChangeValue, 1000);
  }

  onChangeValue = (text: string) => {
    this.SearchInputAdapter.onChangeText(text);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBarStyle}>
          <View style={styles.wrapBtn}>
            <HyperButtonComponent onPress={this.props.goBack} img={svgs.ic_back_black} />
          </View>
          <View style={styles.wrapInput}>
            <TextInput
              placeholder={translate('search.enterSearch')}
              style={styles.searchBarInputStyle}
              placeholderTextColor="#99A0AD"
              onChangeText={this.onChangeTextDelayed}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden', paddingBottom: 5 },
  searchBarStyle: {
    width: '100%',
    height: 56,
    backgroundColor: colors.white,
    // paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  searchBarInputStyle: {
    color: colors.txtColor,
    fontSize: 14,
  },
  wrapBtn: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapInput: {
    width: screenWidth - 56 - 16,
    height: 56,
    justifyContent: 'center',
  },
});
