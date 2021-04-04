/* 
    Created by thaolt
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { HyperButtonProps } from './hyper-button.props';
import { HyperButtonAdapter } from './hyper-button.adapter';
import { SvgXml } from 'react-native-svg';

export class HyperButtonComponent extends PureComponent<HyperButtonProps> {
  private HyperButtonAdapter: HyperButtonAdapter;
  constructor(props: HyperButtonProps) {
    super(props);
    this.HyperButtonAdapter = new HyperButtonAdapter(this);
  }

  render() {
    const {
      containerStyles,
      onPress,
      imgWidth = 24,
      imgHeight = 24,
      img = {},
      imgStyle,
      text,
      textStyle,
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, containerStyles && { ...containerStyles }]}
        onPress={onPress && onPress}
      >
        {text ? (
          <Text style={[styles.textStyle, textStyle && { ...textStyle }]}>{text}</Text>
        ) : (
          <SvgXml
            width={imgWidth}
            height={imgHeight}
            xml={img}
            style={[styles.imgStyle, imgStyle && { ...imgStyle }]}
          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  imgStyle: {},
  textStyle: {},
});
