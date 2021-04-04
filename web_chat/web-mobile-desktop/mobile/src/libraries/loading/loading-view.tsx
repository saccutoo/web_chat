import * as React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import colors from 'res/colors';

export interface LoadingViewProps {
  style?: StyleProp<ViewStyle>
}

export default class LoadingView extends React.PureComponent<LoadingViewProps, any> {
  constructor(props: LoadingViewProps) {
    super(props);
  }

  public render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ActivityIndicator
          size="small"
          color={colors.primaryColor}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})