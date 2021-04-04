import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
import { translate } from 'res/languages';
import colors from 'res/colors';
import images from 'res/images';

interface IProps {}

interface IState {
  isConnected: boolean;
}

class NoInternetComponent extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isConnected: true,
    };
  }

  async componentDidMount() {
    await NetInfo.addEventListener((state) => {
      this.handleConnectivityChange(state.isConnected);
    });
  }

  handleConnectivityChange = (isConnected: boolean) => {
    if (this.state.isConnected != isConnected) {
      this.setState({ isConnected });
    }
  };

  render() {
    const { isConnected } = this.state;
    if (isConnected) return null;
    return (
      <View style={styles.offlineContainer}>
        <FastImage
          source={images.bg_cannot_connect}
          style={styles.imageStyle}
          resizeMode={FastImage.resizeMode.contain}
        />

        <Text style={styles.textStyle}>{translate('netInfo.noInternetConnection')}</Text>
        <Text style={styles.subTextStyle}>
          {translate('netInfo.checkInternetConnection')}
        </Text>
        {/* <ButtonApp
          position
          IStyle={{
            width: '80%',
            alignSelf: 'center',
          }}
          IProps={{
            onPress: () => Linking.openURL('app-settings:'),
          }}
          text={translate('netInfo.openSetting')}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    zIndex: 9999,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offlineText: { color: colors.white },

  textStyle: {
    fontSize: 20,
    color: 'black',
    marginTop: 30,
  },

  subTextStyle: {
    fontSize: 16,
    marginVertical: 10,
  },

  imageStyle: {
    width: '80%',
    height: 200,
  },
});

export default NoInternetComponent;
