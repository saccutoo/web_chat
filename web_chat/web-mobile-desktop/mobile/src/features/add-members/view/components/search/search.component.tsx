/* 
    Created by longdq
*/

import _ from 'lodash';
import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import colors from 'res/colors';
import svgs from 'res/svgs';
import { SearchAdapter } from './search.adapter';
import { SearchProps } from './search.props';
import { translate } from 'res/languages';
const screenWidth = Dimensions.get('window').width;

export class SearchComponent extends PureComponent<SearchProps> {
  private SearchAdapter: SearchAdapter;
  private onChangeTextDelayed: (text: string) => void;

  constructor(props: SearchProps) {
    super(props);
    this.SearchAdapter = new SearchAdapter(this);
    this.onChangeTextDelayed = _.debounce(this.onChangeValue, 1000);
    this.state = {
      emptyInput: true,
    };
  }

  onChangeValue = (text: string) => {
    this.SearchAdapter.onChangeText(text);
  };

  render() {
    return (
      <>
        {/* <Text style={{ fontSize: 12, color: '#808999', marginLeft: 16, marginTop: 10 }}>
          {translate('createGr.choseMember')}
        </Text> */}
        <View style={styles.container}>
          <View style={styles.wrapIconSearch}>
            <SvgXml width="24" height="24" xml={svgs.ic_search} />
          </View>
          <View style={styles.wraptxtSearch}>
            <TextInput
              placeholder={translate('search.searchUser')}
              placeholderTextColor="#B3B8C2"
              style={{
                fontSize: 14,
                color: colors.txtColor,
              }}
              onChangeText={this.onChangeTextDelayed}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
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
    width: screenWidth - 16 - 14 - 24 - 32 - 16,
  },
  txtSearch: {
    fontSize: 14,
    color: '#B3B8C2',
  },
});
