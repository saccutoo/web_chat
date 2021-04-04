import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from 'res/colors';
import svgs from 'res/svgs';
import { BackProps } from './back.props';

export class BackComponent extends PureComponent<BackProps> {
  render() {
    console.log('BACK COMPONET :',this.props);
    
    const { style, goBack, title = '', iconRight, onPressRight } = this.props;
    console.log('test_iconRight', iconRight);
    return (
      <View style={style}>
        <HyperButtonComponent
          onPress={goBack}
          containerStyles={styles.backStyle}
          img={svgs.ic_back_black}
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>

        {iconRight ? (
          <FastImage resizeMode="contain" source={iconRight} style={styles.imgRight} />
        ) : null}
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
    fontWeight: '500',
    marginRight: 20,
    color: colors.txtColor,
    fontSize: 18,
  },
  imgRight: {
    marginRight: 8,
  },
});
