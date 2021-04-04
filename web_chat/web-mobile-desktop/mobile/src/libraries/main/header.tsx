import * as React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import BaseIcon from 'libraries/icon/base-icon';
import NavigationService from 'routers/navigation-service';
import { statusBarHeight } from 'helpers/layout-helpers';
import colors from 'res/colors';
import images from 'res/images';

interface Props {
  style?: ViewStyle;
  onLeftPressed?: () => void;
  hideLeft?: boolean;
  text: string;
  noShadow?: boolean;
}

const HEADER_HEIGHT = 50;

const COLOR = '#20252C';

export default class HeaderMyPham extends React.PureComponent<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  static defaultProps = {
    onLeftPressed: () => NavigationService.pop(),
  };

  renderLeft() {
    let { onLeftPressed, hideLeft } = this.props;
    if (!hideLeft) {
      return (
        <View style={styles.leftItem}>
          <BaseIcon
            icon={images.ic_backs}
            onPress={onLeftPressed}
            color="#20252C"
            style={{ paddingHorizontal: 8 }}
            width={20}
          />
        </View>
      );
    }
    return <View style={styles.leftItem} />;
  }

  renderRight() {
    return <View style={styles.rightItem} />;
  }

  public render() {
    let { style, text, noShadow } = this.props;
    return (
      <View
        style={[
          styles.container,
          style,
          {
            shadowOpacity: noShadow ? undefined : 0.5,
            elevation: noShadow ? undefined : 3,
          },
        ]}
      >
        {this.renderLeft()}
        <View style={[styles.centerItem]}>
          <Text style={[styles.textStyle]} numberOfLines={1}>
            {text}
          </Text>
        </View>
        {this.renderRight()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: statusBarHeight() + 10,
    // height: HEADER_HEIGHT,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    shadowOffset: { width: 0, height: 0.5 },
    shadowColor: colors.grey600,
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 5,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  textStyle: {
    color: COLOR,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
