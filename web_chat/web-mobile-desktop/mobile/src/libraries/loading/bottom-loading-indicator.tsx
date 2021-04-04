import * as React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import colors from 'res/colors';

export interface Props {}

export default class BottomLoadingIndicator extends React.PureComponent<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primaryColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
