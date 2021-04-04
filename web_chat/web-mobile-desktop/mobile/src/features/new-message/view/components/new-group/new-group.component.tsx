/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NewGroupProps } from './new-group.props';
import { NewGroupAdapter } from './new-group.adapter';
import { SvgXml } from 'react-native-svg';
import svgs from 'res/svgs';
import colors from 'res/colors';
import { translate } from 'res/languages';

export class NewGroupComponent extends PureComponent<NewGroupProps> {
  private NewGroupAdapter: NewGroupAdapter;
  constructor(props: NewGroupProps) {
    super(props);
    this.NewGroupAdapter = new NewGroupAdapter(this);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.goToCreateGr}>
        <View style={styles.container}>
          <View style={styles.wrapNewGr}>
            <SvgXml width="40" height="40" xml={svgs.ic_group} />
            <Text style={styles.txtNewGr}>{translate('createGr.txtCreateGr')}</Text>
          </View>
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  wrapNewGr: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  txtNewGr: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.txtColor,
    fontWeight: '500',
  },
  line: {
    backgroundColor: '#E6E8EB',
    height: 1,
    marginTop: 12,
    width: '100%',
  },
});
