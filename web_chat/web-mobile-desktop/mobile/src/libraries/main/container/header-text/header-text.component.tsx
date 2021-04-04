/* 
    Created by thaolt
*/

import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from 'res/colors';
import svgs from 'res/svgs';
import { HeaderTextAdapter } from './header-text.adapter';
import { HeaderTextProps } from './header-text.props';

export class HeaderTextComponent extends PureComponent<HeaderTextProps> {
  private HeaderTextAdapter: HeaderTextAdapter;
  constructor(props: HeaderTextProps) {
    super(props);
    this.HeaderTextAdapter = new HeaderTextAdapter(this);
  }

  render() {
    const { style, onBack, title = '' } = this.props;
    return (
      <View style={style}>
        {onBack && (
          <HyperButtonComponent
            onPress={onBack}
            containerStyles={styles.backStyle}
            imgHeight={18}
            imgWidth={18}
            img={svgs.ic_back}
          />
        )}
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backStyle: {
    marginLeft: 13,
  },
  notiStyle: {
    marginRight: 13,
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
    fontWeight: '600',
    marginRight: 20,
    color: colors.white,
  },
  imgRight: {
    marginLeft: -20,
    marginRight: 13,
  },
});
