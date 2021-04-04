/* 
    Created by thaolt
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { AppStatusBarProps } from './app-status-bar.props';
import { AppStatusBarAdapter } from './app-status-bar.adapter';
import colors from 'res/colors';
import { isIphoneX } from 'helpers/layout-helpers';

export class AppStatusBarComponent extends PureComponent<AppStatusBarProps> {
  private AppStatusBarAdapter: AppStatusBarAdapter;
  constructor(props: AppStatusBarProps) {
    super(props);
    this.AppStatusBarAdapter = new AppStatusBarAdapter(this);
  }

  render() {
    const { containerStyles } = this.props;

    return <View style={[styles.container, containerStyles && { ...containerStyles }]} />;
  }
}

const styles = StyleSheet.create({
  container: {
    // height: Platform.OS === 'android' ? 0 : 44,
    height: isIphoneX() ? 44 : 12,
    backgroundColor: colors.primaryColor,
  },
});
