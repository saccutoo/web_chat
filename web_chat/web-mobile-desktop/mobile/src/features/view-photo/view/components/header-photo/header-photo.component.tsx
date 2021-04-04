/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { HeaderPhotoProps } from './header-photo.props';
import { HeaderPhotoAdapter } from './header-photo.adapter';
import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import svgs from 'res/svgs';
import colors from 'res/colors';

export class HeaderPhotoComponent extends PureComponent<HeaderPhotoProps> {
  private HeaderPhotoAdapter: HeaderPhotoAdapter;
  constructor(props: HeaderPhotoProps) {
    super(props);
    this.HeaderPhotoAdapter = new HeaderPhotoAdapter(this);
  }

  render() {
    const { userInfo } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <HyperButtonComponent
            imgWidth={24}
            imgHeight={24}
            img={svgs.ic_back}
            onPress={this.HeaderPhotoAdapter.goBack}
          />
          <Text style={styles.title}>{userInfo && userInfo.username}</Text>
        </View>
        <HyperButtonComponent imgWidth={24} imgHeight={24} img={svgs.ic_download} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: colors.txtColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
